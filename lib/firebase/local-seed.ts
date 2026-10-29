/* eslint-disable @typescript-eslint/no-explicit-any -- stand-in DB handles arbitrary document shapes */
/**
 * Sample data for local preview mode (lib/firebase/local-db.ts).
 * Delete .local-preview/db.json to reset to this seed.
 */

import { sampleAssets } from '../sample-assets';

const ADMIN_INBOX = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@xts.com';

const daysAgo = (d: number, h = 0) => new Date(Date.now() - d * 86400000 - h * 3600000);

/** Simple placeholder image as an inline SVG data URI. */
function placeholder(label: string, hue: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
<rect width="800" height="800" fill="hsl(${hue},18%,16%)"/>
<g stroke="hsl(${hue},70%,55%)" stroke-width="3" fill="none" opacity="0.6">
<rect x="200" y="200" width="400" height="400" rx="12"/><circle cx="400" cy="400" r="110"/>
<path d="M200 400h-80M680 400h-80M400 200v-80M400 680v-80"/></g>
<text x="400" y="740" font-family="monospace" font-size="34" fill="hsl(${hue},70%,70%)" text-anchor="middle">${label}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const avatar = (name: string, hue: number) => placeholder(name.split(' ').map((p) => p[0]).join(''), hue);

const users = {
  'preview-admin': { name: 'Ada Admin', email: 'ada.admin@xts.local', role: 'admin', hue: 25 },
  'preview-seller': { name: 'Sam Seller', email: 'sam.seller@xts.local', role: 'seller', hue: 200 },
  'preview-expert': { name: 'Eli Expert', email: 'eli.expert@xts.local', role: 'expert', hue: 140 },
  'preview-member': { name: 'Casey Customer', email: 'casey@xts.local', role: 'member', hue: 280 },
  'preview-member-2': { name: 'Jordan Rivera', email: 'jordan@xts.local', role: 'member', hue: 330 },
};

const products: [string, any][] = [
  ['p-esp32', { name: 'ESP32 DevKit V1', sku: 'XTS-MCU-001', price: 450, stock: 42, category: 'Microcontrollers', tag: 'Bestseller', hue: 25,
    description: 'Dual-core Wi-Fi + Bluetooth microcontroller board for IoT prototypes.',
    specifications: [{ key: 'CPU', value: 'Xtensa LX6 dual-core 240MHz' }, { key: 'Flash', value: '4MB' }, { key: 'Wireless', value: 'Wi-Fi 802.11 b/g/n, BT 4.2' }],
    rating: 4.8, totalSold: 318, seller: true }],
  ['p-nema17', { name: 'NEMA 17 Stepper Motor', sku: 'XTS-MOT-017', price: 780, stock: 18, category: 'Motors', tag: 'New', hue: 200,
    description: '1.8° bipolar stepper, 0.45 Nm holding torque. Ideal for 3D printers and CNC.',
    specifications: [{ key: 'Step angle', value: '1.8°' }, { key: 'Holding torque', value: '0.45 Nm' }, { key: 'Rated current', value: '1.5A' }],
    rating: 4.6, totalSold: 97 }],
  ['p-mg996r', { name: 'MG996R Metal Gear Servo', sku: 'XTS-MOT-996', price: 320, stock: 5, category: 'Motors', tag: 'Low Stock', hue: 210,
    description: 'High-torque metal gear servo for robotics arms and RC builds.',
    specifications: [{ key: 'Torque', value: '11 kg·cm @ 6V' }, { key: 'Speed', value: '0.17s/60°' }],
    rating: 4.3, totalSold: 210, seller: true }],
  ['p-pla', { name: 'PLA+ Filament 1.75mm (1kg)', sku: 'XTS-FIL-PLA', price: 990, stock: 60, category: '3D Printing', tag: 'Bestseller', hue: 140,
    description: 'Tough, low-warp PLA+ in matte black. ±0.02mm tolerance.',
    specifications: [{ key: 'Diameter', value: '1.75mm' }, { key: 'Print temp', value: '205–225°C' }],
    rating: 4.9, totalSold: 540 }],
  ['p-lidar', { name: 'TF-Luna LiDAR Sensor', sku: 'XTS-SEN-LUN', price: 1650, stock: 0, category: 'Sensors', tag: 'Restocking', hue: 280,
    description: 'Compact single-point ToF LiDAR, 0.2–8m range, UART/I²C.',
    specifications: [{ key: 'Range', value: '0.2–8 m' }, { key: 'Frame rate', value: '1–250 Hz' }],
    rating: 4.7, totalSold: 64 }],
  ['p-bme280', { name: 'BME280 Environment Sensor', sku: 'XTS-SEN-280', price: 380, stock: 33, category: 'Sensors', tag: 'New', hue: 170,
    description: 'Temperature, humidity and pressure sensor breakout, I²C/SPI.',
    specifications: [{ key: 'Interface', value: 'I²C / SPI' }, { key: 'Accuracy', value: '±1 hPa, ±3% RH' }],
    rating: 4.5, totalSold: 151, seller: true }],
  ['p-buck', { name: 'LM2596 Buck Converter', sku: 'XTS-PWR-596', price: 150, stock: 120, category: 'Power', tag: 'Value', hue: 50,
    description: 'Adjustable step-down module, 4–40V in, 1.25–37V out, 3A.',
    specifications: [{ key: 'Input', value: '4–40V' }, { key: 'Output', value: '1.25–37V, 3A' }],
    rating: 4.2, totalSold: 402 }],
  ['p-pi5', { name: 'Raspberry Pi 5 (8GB)', sku: 'XTS-SBC-PI5', price: 5490, stock: 7, category: 'Single-Board Computers', tag: 'Hot', hue: 0,
    description: 'Quad-core Cortex-A76 SBC with PCIe, dual 4K output.',
    specifications: [{ key: 'CPU', value: '4× Cortex-A76 2.4GHz' }, { key: 'RAM', value: '8GB LPDDR4X' }],
    rating: 4.9, totalSold: 88 }],
];

export function buildSeed(): Record<string, Record<string, any>> {
  const seed: Record<string, Record<string, any>> = {};
  const col = (name: string) => (seed[name] ??= {});

  for (const [id, u] of Object.entries(users)) {
    col('users')[id] = {
      name: u.name, email: u.email, role: u.role, image: avatar(u.name, u.hue),
      acceptedTermsAt: daysAgo(30).toISOString(), createdAt: daysAgo(60),
    };
  }

  products.forEach(([id, p], i) => {
    const { seller, ...rest } = p;
    delete rest.hue;
    const asset = sampleAssets.find(asset => asset.id === id);
    col('products')[id] = {
      ...rest,
      imageUrls: asset ? [`/images/products/${asset.file}.webp`] : [],
      ...(seller ? { sellerId: users['preview-seller'].email } : {}),
      createdAt: daysAgo(40 - i * 3),
    };
  });

  col('pickupPoints')['pp-makati'] = { name: 'XTS Hub — Makati', address: '123 Ayala Ave, Makati City', isActive: true, createdAt: daysAgo(50) };
  col('pickupPoints')['pp-qc'] = { name: 'XTS Hub — Quezon City', address: '45 Katipunan Ave, Quezon City', isActive: true, createdAt: daysAgo(45) };

  const casey = users['preview-member'];
  const jordan = users['preview-member-2'];
  const order = (id: string, who: typeof casey, items: [string, number][], status: string, d: number, extra: any = {}) => {
    const lines = items.map(([pid, qty]) => {
      const p = products.find(([x]) => x === pid)![1];
      return { productId: pid, name: p.name, sku: p.sku, category: p.category, price: p.price, quantity: qty };
    });
    const flow = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const history = flow.slice(0, Math.max(1, flow.indexOf(status) + 1)).map((s, i) => ({
      status: s, timestamp: daysAgo(d - i * 0.5).toISOString(), updatedBy: i === 0 ? who.email : users['preview-admin'].email,
    }));
    col('orders')[id] = {
      items: lines, total: lines.reduce((t, l) => t + l.price * l.quantity, 0), status, statusHistory: history,
      customerName: who.name, customerEmail: who.email, deliveryMethod: 'standard', paymentMethod: 'cod',
      paymentStatus: 'pending', createdAt: daysAgo(d), ...extra,
    };
  };
  order('ord-1001', casey, [['p-esp32', 2], ['p-bme280', 1]], 'delivered', 12);
  order('ord-1002', casey, [['p-pla', 3]], 'shipped', 4, { paymentMethod: 'gcash', paymentStatus: 'paid', paidAt: daysAgo(4).toISOString() });
  order('ord-1003', casey, [['p-nema17', 4], ['p-buck', 2]], 'pending', 0.2, {
    deliveryMethod: 'pickup', pickupPointId: 'pp-makati', pickupPointName: 'XTS Hub — Makati',
  });
  order('ord-1004', jordan, [['p-pi5', 1]], 'processing', 2, { paymentMethod: 'gcash', paymentStatus: 'paid', paidAt: daysAgo(2).toISOString() });
  order('ord-1005', jordan, [['p-mg996r', 6]], 'confirmed', 1);

  const chat = (id: string, a: { name: string; email: string }, b: { name: string; email: string }, type: string, msgs: [typeof a, string, number][], extra: any = {}) => {
    const last = msgs[msgs.length - 1];
    col('chats')[id] = {
      participants: [a.email, b.email], participantNames: { [a.email]: a.name, [b.email]: b.name },
      type, lastMessage: last[1], lastMessageAt: daysAgo(last[2]), createdAt: daysAgo(msgs[0][2]), ...extra,
    };
    msgs.forEach(([from, content, d], i) => {
      col(`chats/${id}/messages`)[`m${i + 1}`] = { senderId: from.email, senderName: from.name, content, createdAt: daysAgo(d) };
    });
  };
  const inbox = { name: 'XTS Support', email: ADMIN_INBOX };
  const p1 = products[0][1];
  chat('chat-product', casey, users['preview-seller'], 'product', [
    [casey, 'Hi! Does the ESP32 come with headers soldered?', 3],
    [users['preview-seller'], 'Yes, pre-soldered male headers on both rows.', 2.9],
    [casey, 'Great, ordering two now.', 2.8],
  ], { productRef: { id: 'p-esp32', name: p1.name, price: p1.price, imageUrl: '/images/products/esp32.webp' } });
  chat('chat-pickup', casey, inbox, 'pickup', [
    [casey, 'What time can I pick up order ord-1003 in Makati?', 0.15],
  ], { pickupRef: { pointId: 'pp-makati', pointName: 'XTS Hub — Makati', pointAddress: '123 Ayala Ave, Makati City' } });
  chat('chat-support', jordan, inbox, 'support', [
    [jordan, 'Is the Raspberry Pi 5 covered by warranty?', 1.5],
    [inbox, 'Yes — 1 year manufacturer warranty, handled through us.', 1.4],
  ]);

  col('consultations')['cons-1'] = {
    expertName: users['preview-expert'].name, expertTitle: 'Embedded Systems Engineer', expertPrice: '₱1,500 / hr',
    clientName: casey.name, clientEmail: casey.email, slot: 'Fri 2:00 PM', status: 'confirmed',
    consultationType: 'Firmware review', projectDescription: 'Low-power ESP32 sensor node keeps browning out on battery.',
    requiredSkills: 'ESP-IDF, power design', lastMessage: 'Send me your schematic before the call.', lastMessageAt: daysAgo(1),
    createdAt: daysAgo(5),
  };
  col('consultations/cons-1/messages')['m1'] = { senderId: casey.email, senderName: casey.name, content: 'Looking forward to it!', createdAt: daysAgo(1.2) };
  col('consultations/cons-1/messages')['m2'] = { senderId: users['preview-expert'].email, senderName: users['preview-expert'].name, content: 'Send me your schematic before the call.', createdAt: daysAgo(1) };
  col('consultations')['cons-2'] = {
    expertName: 'Pending Assignment', expertTitle: '', expertPrice: '', clientName: jordan.name, clientEmail: jordan.email,
    slot: '', status: 'pending', consultationType: 'Mechanical design', projectDescription: 'Need help designing a 2-axis camera gimbal.',
    requiredSkills: 'CAD, servo control', createdAt: daysAgo(0.5),
  };

  col('fabrication_jobs')['fab-1'] = {
    name: 'Drone frame arms', files: ['arm_v3.stl', 'arm_mount.stl'], status: 'in-progress', progress: 60,
    customerName: casey.name, customerEmail: casey.email, serviceType: '3d-printing', notes: 'PETG if possible.',
    parameters: { material: 'PETG', infill: '40%', layerHeight: '0.2mm' }, createdAt: daysAgo(6),
  };
  col('fabrication_jobs')['fab-2'] = {
    name: 'Enclosure panel', files: ['panel.dxf'], status: 'queued', progress: 0, customerName: jordan.name,
    customerEmail: jordan.email, serviceType: 'laser-cutting', parameters: { material: '3mm acrylic' }, createdAt: daysAgo(1),
  };
  col('fabrication_jobs')['fab-3'] = {
    name: 'Motor driver PCB', files: ['driver_gerbers.zip'], status: 'completed', progress: 100, customerName: casey.name,
    customerEmail: casey.email, serviceType: 'pcb-fabrication', parameters: { layers: '2', thickness: '1.6mm' }, createdAt: daysAgo(20),
  };

  const post = (id: string, who: { name: string; email: string; hue: number }, uid: string, title: string, content: string, tag: string, d: number, likes: number, pinned = false) => {
    col('posts')[id] = {
      title, content, author: who.name, avatar: avatar(who.name, who.hue), tag, likes, likedBy: [], comments: 0,
      isPinned: pinned, userId: uid, userEmail: who.email, createdAt: daysAgo(d),
    };
  };
  post('post-1', users['preview-admin'], 'preview-admin', 'Welcome to the XTS community', 'Share builds, ask questions, and find collaborators. Be kind!', 'Announcement', 30, 24, true);
  post('post-2', casey, 'preview-member', 'My ESP32 weather station', 'Finally got the BME280 logging to a dashboard. Happy to share the code.', 'Showcase', 3, 9);
  post('post-3', jordan, 'preview-member-2', 'Best stepper driver for quiet CNC?', 'TMC2209 vs TMC2208 — anyone compared them on a desktop CNC?', 'Question', 1, 3);
  col('posts')['post-3'].comments = 1;
  col('posts/post-3/comments')['c1'] = { author: users['preview-expert'].name, content: 'TMC2209 — StealthChop plus UART tuning is worth it.', avatar: 'E', createdAt: daysAgo(0.8) };

  col('applications')['app-1'] = {
    type: 'seller', name: 'Jordan Rivera', expertise: 'Custom PCBs', description: 'I design small-batch sensor boards.',
    userId: 'preview-member-2', userEmail: jordan.email, userName: jordan.name, status: 'pending', createdAt: daysAgo(2),
  };
  col('applications')['app-2'] = {
    type: 'expert', name: 'Casey Customer', expertise: '3D printing', description: 'Five years running a print farm.',
    userId: 'preview-member', userEmail: casey.email, userName: casey.name, status: 'pending', createdAt: daysAgo(1),
  };

  [['ORDER_CREATED', casey.email, 'ord-1003', 3], ['ROLE_CHANGED', users['preview-admin'].email, 'sam.seller → seller', 20], ['PRODUCT_ADDED', users['preview-seller'].email, 'BME280 Environment Sensor', 25]]
    .forEach(([action, actor, target, d], i) => {
      col('audit_logs')[`log-${i + 1}`] = { action, actor, target, details: '', createdAt: daysAgo(d as number) };
    });

  return seed;
}
