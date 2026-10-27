const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.warn("Could not create data directory, using memory storage:", err.message);
  }
}

function readJSON(file, fallback) {
  try {
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
  return fallback;
}

function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${file}:`, err.message);
  }
}

class Storage {
  constructor() {
    this.users = readJSON(USERS_FILE, {});
    this.orders = readJSON(ORDERS_FILE, []);
  }

  getUser(userId) {
    return this.users[String(userId)] || null;
  }

  setUser(userId, data) {
    const id = String(userId);
    this.users[id] = {
      ...(this.users[id] || {}),
      ...data,
      userId: id,
      updatedAt: new Date().toISOString()
    };
    writeJSON(USERS_FILE, this.users);
    return this.users[id];
  }

  getUserLanguage(userId) {
    const user = this.getUser(userId);
    return user?.lang || 'ru';
  }

  setUserLanguage(userId, lang) {
    return this.setUser(userId, { lang });
  }

  createOrder(orderData) {
    const orderId = `TK-${Math.floor(100000 + Math.random() * 900000)}`;
    const order = {
      orderId,
      ...orderData,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };
    this.orders.push(order);
    writeJSON(ORDERS_FILE, this.orders);
    return order;
  }

  getUserOrders(userId) {
    const id = String(userId);
    return this.orders.filter(order => String(order.userId) === id);
  }

  getOrder(orderId) {
    return this.orders.find(o => o.orderId === orderId) || null;
  }

  getAllUsers() {
    return Object.values(this.users);
  }

  getAllOrders() {
    return this.orders;
  }

  getStats() {
    const totalRevenue = this.orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    return {
      totalUsers: Object.keys(this.users).length,
      totalOrders: this.orders.length,
      totalRevenue
    };
  }
}

module.exports = new Storage();
