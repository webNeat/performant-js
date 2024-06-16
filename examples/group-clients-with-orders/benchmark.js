/**
 * @typedef {Object} Client
 * @property {number} id
 */

/**
 * @typedef {Object} Order
 * @property {number} clientId
 */

/**
 * @typedef {Object} Input
 * @property {Client[]} clients
 * @property {Order[]} orders
 */

const clients = [];
const orders = [];
for (let i = 1; i < 5_000; i++) clients.push({ id: i });
for (let i = 1; i < 100_000; i++)
  orders.push({ clientId: Math.floor(5_000 * Math.random()) });

export const inputs = {
  "100 clients and 1k": {
    clients: clients.slice(0, 100),
    orders: orders.slice(0, 1000),
  },
  "500 clients and 10k orders": {
    clients: clients.slice(0, 500),
    orders: orders.slice(0, 10_000),
  },
  "5k clients and 100k orders": {
    clients,
    orders,
  },
};

/**
 * @param {Input} input
 */
function slow_solution({ clients, orders }) {
  return clients.map((client) => {
    return {
      client,
      orders: orders.filter((order) => order.clientId === client.id),
    };
  });
}

/**
 * @param {Input} input
 */
function faster_solution({ clients, orders }) {
  const index = {};
  for (const order of orders) {
    index[order.clientId] ||= [];
    index[order.clientId].push(order);
  }
  return clients.map((client) => {
    return {
      client,
      orders: index[client.id] || [],
    };
  });
}

export const fns = { slow_solution, faster_solution };
