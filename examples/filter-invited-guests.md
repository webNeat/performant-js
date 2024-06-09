# Filter invited guests

## The problem

```js
const guests = [
  {name: 'foo', ...otherFields},
  {name: 'bar', ...otherFields},
  // ...
]
const invitations = [
  {guestName: 'foo', ...},
  {guestName: 'lorem', ...},
  // ...
]

const invitedGuests = ?? // list of guests that have at least one invitation with their name
```

## Slow solution

```js
const invitedGuests = guests.filter(guest => {
  const invitation = invitations.find(x => x.guestName === guest.name)
  return invitation ? true : false
})
```

**Why is this slow?**

The methods `.filter` and `.find` are both loops, so the code has nested loops which is slow.

**Benchmark**

```js
const guests = [];
const invitations = [];
for (let i = 1; i < 100000; i++) guests.push({ name: `guest-${i}` });
for (let i = 1; i < 50000; i++) invitations.push({ guestName: `guest-${i * 2}` });

const start = performance.now();
const invitedGuests = guests.filter((guest) => {
  const invitation = invitations.find((x) => x.guestName === guest.name);
  return invitation ? true : false;
});
const duration = performance.now() - start;
```

[Run in Codesandbox](https://codesandbox.io/p/sandbox/filter-invited-guests-slow-xhrx7x?file=%2Fsrc%2Findex.mjs%3A7%2C5-18%2C48)

**Duration: 10 seconds**

## Faster solution

```js
const invitedNames = new Set(invitations.map(x => x.guestName))
const invitedGuests = guests.filter(guest => invitedNames.has(guest.name))
```

[Run in Codesandbox](https://codesandbox.io/p/sandbox/filter-invited-guests-fast-rck7zr?file=%2Fsrc%2Findex.mjs%3A4%2C38)

**Duration: 10 ms** (1000 times faster!)

