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
function slow_solution({ guests, invitations }) {
  return guests.filter((guest) => {
    const invitation = invitations.find((x) => x.guestName === guest.name);
    return invitation ? true : false;
  });
}
```

**Why is this slow?**

The methods `.filter` and `.find` are both loops, so the code has **nested loops** which is slow.

## Faster solution

```ts
function faster_solution({ guests, invitations }) {
  const invitedNames = new Set(invitations.map((x) => x.guestName));
  return guests.filter((guest) => invitedNames.has(guest.name));
}
```

**Why is that faster?**

The `Set.has` method is not a loop, it's more like accessing a property in an object which is fast. So we avoided the **nested loops** successfully.

## Benchmark

<table><tr><td></td><td>slow_solution</td><td>faster_solution</td></tr><tr><td>1k guests and 500 invitations</td><td>4.506 ms</td><td>0.262 ms</td></tr><tr><td>10k guests and 5k invitations</td><td>445.388 ms</td><td>1.390 ms</td></tr><tr><td>100k guests and 50k invitations</td><td>16936.801 ms</td><td>16.690 ms</td></tr></table>

_Benchmark run on Github actions_
