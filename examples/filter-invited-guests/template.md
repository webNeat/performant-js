# Filter invited guests

## The problem

You have a list of guests. Each guest has a `name` and other properties:
```js
const guests = [
  {name: 'foo', ...otherFields},
  {name: 'bar', ...otherFields},
  // ...
]
```

And you have a list of invitations. Each invitation has a `guestName` property (the name of the guest it was sent to), and other properties.
```js
const invitations = [
  {guestName: 'foo', ...},
  {guestName: 'lorem', ...},
  // ...
]
```

Your goal is to create a list of guests that have an invitation (filter out those who don't have any invitation with their name).

```js
const invitedGuests = ?? // list of guests that have at least one invitation with their name
```

## Slow solution

```ts
{{code_slow_solution}}
```

**Why is this slow?**

The methods `.filter` and `.find` are both loops, so the code has **nested loops** which is slow.

## Faster solution

```ts
{{code_faster_solution}}
```

**Why is that faster?**

The `Set.has` method is not a loop, it's more like accessing a property in an object which is fast. So we avoided the **nested loops** successfully.

## Benchmark

{{benchmark}}
