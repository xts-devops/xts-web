/* eslint-disable @typescript-eslint/no-explicit-any -- stand-in DB handles arbitrary document shapes */
/**
 * Local preview database: an in-memory stand-in for the slice of the
 * firebase-admin Firestore API this app uses, so the UI can run on localhost
 * without Firebase credentials. Data persists to .local-preview/db.json.
 *
 * Only active when LOCAL_PREVIEW=true and NODE_ENV !== 'production'
 * (see lib/local-preview.ts). Never used in deployed builds.
 */
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { buildSeed } from './local-seed';

type Data = Record<string, any>;

const STORE_DIR = path.join(process.cwd(), '.local-preview');
const STORE_FILE = path.join(STORE_DIR, 'db.json');

// collection path ("chats" or "chats/abc/messages") -> doc id -> data
type Store = Map<string, Map<string, Data>>;

/** Mimics firebase-admin's Timestamp for reads (`.toDate()`, `.toMillis()`). */
class LocalTimestamp {
  constructor(private readonly ms: number) {}
  toDate() { return new Date(this.ms); }
  toMillis() { return this.ms; }
  get seconds() { return Math.floor(this.ms / 1000); }
  get nanoseconds() { return (this.ms % 1000) * 1e6; }
  toJSON() { return { _seconds: this.seconds, _nanoseconds: this.nanoseconds }; }
}

// ---------- persistence ----------

function encode(v: any): any {
  if (v instanceof Date) return { __date: v.toISOString() };
  if (Array.isArray(v)) return v.map(encode);
  if (v && typeof v === 'object') {
    const o: Data = {};
    for (const [k, x] of Object.entries(v)) o[k] = encode(x);
    return o;
  }
  return v;
}

function decode(v: any): any {
  if (v && typeof v === 'object' && !Array.isArray(v) && typeof v.__date === 'string') {
    return new Date(v.__date);
  }
  if (Array.isArray(v)) return v.map(decode);
  if (v && typeof v === 'object') {
    const o: Data = {};
    for (const [k, x] of Object.entries(v)) o[k] = decode(x);
    return o;
  }
  return v;
}

function loadStore(): Store {
  const store: Store = new Map();
  let raw: Record<string, Record<string, Data>>;
  if (fs.existsSync(STORE_FILE)) {
    raw = JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'));
  } else {
    raw = encode(buildSeed());
  }
  for (const [col, docs] of Object.entries(raw)) {
    store.set(col, new Map(Object.entries(docs).map(([id, d]) => [id, decode(d)])));
  }
  if (!fs.existsSync(STORE_FILE)) persist(store);
  return store;
}

function persist(store: Store) {
  const raw: Record<string, Record<string, Data>> = {};
  for (const [col, docs] of store) raw[col] = Object.fromEntries([...docs].map(([id, d]) => [id, encode(d)]));
  fs.mkdirSync(STORE_DIR, { recursive: true });
  fs.writeFileSync(STORE_FILE, JSON.stringify(raw, null, 2));
}

// Survive Next.js hot reloads: one store per server process.
const g = globalThis as unknown as { __xtsLocalStore?: Store };
function store(): Store {
  if (!g.__xtsLocalStore) g.__xtsLocalStore = loadStore();
  return g.__xtsLocalStore;
}

function docsOf(col: string): Map<string, Data> {
  const s = store();
  if (!s.has(col)) s.set(col, new Map());
  return s.get(col)!;
}

// ---------- value helpers ----------

function clone(v: any): any {
  if (v instanceof Date) return new Date(v.getTime());
  if (Array.isArray(v)) return v.map(clone);
  if (v && typeof v === 'object' && v.constructor === Object) {
    const o: Data = {};
    for (const [k, x] of Object.entries(v)) if (x !== undefined) o[k] = clone(x);
    return o;
  }
  return v;
}

/** Dates become Timestamp-like objects on read, like real Firestore. */
function toReadShape(v: any): any {
  if (v instanceof Date) return new LocalTimestamp(v.getTime());
  if (Array.isArray(v)) return v.map(toReadShape);
  if (v && typeof v === 'object') {
    const o: Data = {};
    for (const [k, x] of Object.entries(v)) o[k] = toReadShape(x);
    return o;
  }
  return v;
}

function sentinel(v: any): string | null {
  return v && typeof v === 'object' && typeof v.methodName === 'string' && v.methodName.startsWith('FieldValue.')
    ? v.methodName
    : null;
}

function applyValue(current: any, v: any): any {
  switch (sentinel(v)) {
    case 'FieldValue.increment': return (typeof current === 'number' ? current : 0) + v.operand;
    case 'FieldValue.arrayUnion': {
      const arr = Array.isArray(current) ? [...current] : [];
      for (const e of v.elements) if (!arr.some((x) => JSON.stringify(x) === JSON.stringify(e))) arr.push(e);
      return arr;
    }
    case 'FieldValue.arrayRemove': {
      const arr = Array.isArray(current) ? current : [];
      return arr.filter((x) => !v.elements.some((e: any) => JSON.stringify(x) === JSON.stringify(e)));
    }
    case 'FieldValue.serverTimestamp': return new Date();
    case 'FieldValue.delete': return undefined;
    default: return clone(v);
  }
}

function setPath(target: Data, dotted: string, value: any) {
  // Like Firestore update(): dots in keys are nested field paths.
  const parts = dotted.split('.');
  let cur = target;
  for (const p of parts.slice(0, -1)) {
    if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
    cur = cur[p];
  }
  const last = parts[parts.length - 1];
  const next = applyValue(cur[last], value);
  if (next === undefined) delete cur[last];
  else cur[last] = next;
}

function getPath(data: Data, dotted: string): any {
  return dotted.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), data as any);
}

function comparable(v: any): any {
  if (v instanceof Date) return v.getTime();
  if (v instanceof LocalTimestamp) return v.toMillis();
  return v;
}

function compare(a: any, b: any): number {
  const x = comparable(a), y = comparable(b);
  if (x === y) return 0;
  if (x === undefined || x === null) return -1;
  if (y === undefined || y === null) return 1;
  return x < y ? -1 : 1;
}

// ---------- snapshots ----------

class LocalDocSnapshot {
  constructor(public readonly ref: LocalDocRef, private readonly raw: Data | undefined) {}
  get id() { return this.ref.id; }
  get exists() { return this.raw !== undefined; }
  data() { return this.raw === undefined ? undefined : toReadShape(clone(this.raw)); }
  get(field: string) { return this.raw === undefined ? undefined : toReadShape(getPath(this.raw, field)); }
}

class LocalQuerySnapshot {
  constructor(public readonly docs: LocalDocSnapshot[]) {}
  get empty() { return this.docs.length === 0; }
  get size() { return this.docs.length; }
  forEach(fn: (d: LocalDocSnapshot) => void) { this.docs.forEach(fn); }
}

// ---------- refs ----------

class LocalDocRef {
  constructor(public readonly parentPath: string, public readonly id: string) {}
  get path() { return `${this.parentPath}/${this.id}`; }
  collection(name: string) { return new LocalCollectionRef(`${this.path}/${name}`); }
  async get() { return new LocalDocSnapshot(this, docsOf(this.parentPath).get(this.id)); }
  async set(data: Data, opts?: { merge?: boolean }) { this.setSync(data, opts); }
  async update(data: Data) { this.updateSync(data); }
  async delete() { this.deleteSync(); }

  setSync(data: Data, opts?: { merge?: boolean }) {
    const docs = docsOf(this.parentPath);
    const base = opts?.merge ? clone(docs.get(this.id) ?? {}) : {};
    for (const [k, v] of Object.entries(data)) {
      if (v === undefined) continue;
      const next = applyValue(base[k], v);
      if (next === undefined) delete base[k];
      else base[k] = next;
    }
    docs.set(this.id, base);
    persist(store());
  }
  updateSync(data: Data) {
    const docs = docsOf(this.parentPath);
    const existing = docs.get(this.id);
    if (!existing) throw new Error(`NOT_FOUND: No document to update: ${this.path}`);
    const next = clone(existing);
    for (const [k, v] of Object.entries(data)) if (v !== undefined) setPath(next, k, v);
    docs.set(this.id, next);
    persist(store());
  }
  deleteSync() {
    docsOf(this.parentPath).delete(this.id);
    persist(store());
  }
}

type Filter = { field: string; op: string; value: any };

class LocalQuery {
  constructor(
    protected readonly colPath: string,
    protected readonly filters: Filter[] = [],
    protected readonly orders: { field: string; dir: 'asc' | 'desc' }[] = [],
    protected readonly lim?: number,
    protected readonly off = 0,
  ) {}
  where(field: string, op: string, value: any) {
    return new LocalQuery(this.colPath, [...this.filters, { field, op, value }], this.orders, this.lim, this.off);
  }
  orderBy(field: string, dir: 'asc' | 'desc' = 'asc') {
    return new LocalQuery(this.colPath, this.filters, [...this.orders, { field, dir }], this.lim, this.off);
  }
  limit(n: number) { return new LocalQuery(this.colPath, this.filters, this.orders, n, this.off); }
  offset(n: number) { return new LocalQuery(this.colPath, this.filters, this.orders, this.lim, n); }
  count() {
    return { get: async () => { const n = this.matching().length; return { data: () => ({ count: n }) }; } };
  }
  private matching(): [string, Data][] {
    let rows = [...docsOf(this.colPath)].filter(([, d]) => this.filters.every((f) => matches(getPath(d, f.field), f)));
    // Firestore drops docs missing an orderBy field.
    for (const o of this.orders) rows = rows.filter(([, d]) => getPath(d, o.field) !== undefined);
    rows.sort(([, a], [, b]) => {
      for (const o of this.orders) {
        const c = compare(getPath(a, o.field), getPath(b, o.field));
        if (c !== 0) return o.dir === 'desc' ? -c : c;
      }
      return 0;
    });
    return rows;
  }
  async get() {
    let rows = this.matching().slice(this.off);
    if (this.lim !== undefined) rows = rows.slice(0, this.lim);
    return new LocalQuerySnapshot(rows.map(([id, d]) => new LocalDocSnapshot(new LocalDocRef(this.colPath, id), d)));
  }
}

function matches(actual: any, f: Filter): boolean {
  const c = () => compare(actual, f.value);
  switch (f.op) {
    case '==': return actual !== undefined && c() === 0;
    case '!=': return actual !== undefined && c() !== 0;
    case '<': return actual !== undefined && c() < 0;
    case '<=': return actual !== undefined && c() <= 0;
    case '>': return actual !== undefined && c() > 0;
    case '>=': return actual !== undefined && c() >= 0;
    case 'array-contains': return Array.isArray(actual) && actual.includes(f.value);
    case 'array-contains-any': return Array.isArray(actual) && f.value.some((v: any) => actual.includes(v));
    case 'in': return f.value.includes(actual);
    case 'not-in': return actual !== undefined && !f.value.includes(actual);
    default: throw new Error(`Local preview DB: unsupported where operator "${f.op}"`);
  }
}

class LocalCollectionRef extends LocalQuery {
  constructor(path: string) { super(path); }
  get id() { return this.colPath.split('/').pop()!; }
  doc(id?: string) { return new LocalDocRef(this.colPath, id ?? randomUUID().replace(/-/g, '').slice(0, 20)); }
  async add(data: Data) {
    const ref = this.doc();
    await ref.set(data);
    return ref;
  }
}

// ---------- db ----------

export const localDb = {
  collection: (name: string) => new LocalCollectionRef(name),
  settings: () => {},
  async runTransaction<T>(fn: (tx: any) => Promise<T>): Promise<T> {
    // Single process, no concurrency: run the body directly.
    const tx = {
      get: (ref: LocalDocRef) => ref.get(),
      set: (ref: LocalDocRef, data: Data, opts?: { merge?: boolean }) => { ref.setSync(data, opts); return tx; },
      update: (ref: LocalDocRef, data: Data) => { ref.updateSync(data); return tx; },
      delete: (ref: LocalDocRef) => { ref.deleteSync(); return tx; },
    };
    return fn(tx);
  },
};

/** Writes uploads to public/local-uploads so they're served at /local-uploads/... */
export const localStorage = {
  bucket: () => ({
    name: 'local-preview',
    file: (fileName: string) => ({
      save: async (buffer: Buffer) => {
        const dest = path.join(process.cwd(), 'public', 'local-uploads', fileName);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, buffer);
      },
      makePublic: async () => {},
    }),
  }),
};
