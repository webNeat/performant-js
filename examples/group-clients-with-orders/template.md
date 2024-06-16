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
{{code_slow_solution}}
```

**Why is this slow?**

The methods `.map` and `.filter` are both loops, so the code has **nested loops** which is slow.

## Faster solution

```ts
{{code_faster_solution}}
```

**Why is that faster?**

We did a single loop to create the index (we assume that `.push` is not a loop, which is mostly true). Then we replaced the `.filter` call with a simple property access. So we avoided the **nested loops** successfully.

## Benchmark

{{benchmark}}
