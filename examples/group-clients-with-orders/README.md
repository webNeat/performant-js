# Group clients with their orders

## The problem

You have a list of clients. Each client has an `id` and other properties:
```js
const clients = [
  {id: 1, ...otherFields},
  {id: 2, ...otherFields},
  // ...
]
```

And you have a list of orders. Each order has a `clientId` property (the id of the client who made the order), and other properties.
```js
const orders = [
  {clientId: 1, ...},
  {clientId: 2, ...},
  // ...
]
```

Your goal is to create a list of objects `{client, orders}`, that groups each client witth their orders.

```js
const grouped = [
  {
    client: {clientId: 1, ...},
    orders: [/* all orders that has clientId == 1 */]
  },
  {
    client: {clientId: 2, ...},
    orders: [/* all orders that has clientId == 2 */]
  },
  ...
]
```

## Slow solution

```ts
function slow_solution({ clients, orders }) {
  return clients.map((client) => {
    return {
      client,
      orders: orders.filter((order) => order.clientId === client.id),
    };
  });
}
```

**Why is this slow?**

The methods `.map` and `.filter` are both loops, so the code has **nested loops** which is slow.

## Faster solution

```ts
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
```

**Why is that faster?**

We did a single loop to create the index (we assume that `.push` is not a loop, which is mostly true). Then we replaced the `.filter` call with a simple property access. So we avoided the **nested loops** successfully.

## Benchmark

<table><tr><td></td><td>slow_solution</td><td>faster_solution</td></tr><tr><td>100 clients and 1k</td><td>4.204 ms</td><td>0.808 ms</td></tr><tr><td>500 clients and 10k orders</td><td>42.440 ms</td><td>10.256 ms</td></tr><tr><td>5k clients and 100k orders</td><td>4119.756 ms</td><td>9.061 ms</td></tr></table>

_Benchmark run on Github actions_
