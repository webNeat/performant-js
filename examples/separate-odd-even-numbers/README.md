# Separate odd and even numbers

## The problem

You have a list of integers:
```js
const integers = [1, 42, 7, 37, 2, ...]
```

Your goal is to separate odd and even numbers:

```js
const separated = {
  odd: [1, 7, 37, ...],
  odd: [42, 2, ...],
}
```

## Slow solution

```ts
function slow_solution(integers) {
  return integers.reduce(
    ({ odd, even }, n) => {
      if (n % 2 === 0) return { odd, even: [...even, n] };
      return { odd: [...odd, n], even };
    },
    { odd: [], even: [] }
  );
}
```

**Why is this slow?**

We are creating a new array and new object on each iteration of the reduce callback.

## Faster reduce solution

```ts
function faster_reduce_solution(integers) {
  return integers.reduce(
    (res, n) => {
      if (n % 2 === 0) res.even.push(n);
      else res.odd.push(n);
      return res;
    },
    { odd: [], even: [] }
  );
}
```

**Why is that faster?**

This mutates the arrays instead of creating new ones. So **we avoided creating unneeded objects** successfully.

## Alternative solution without mutation

if your coding style forces you not to mutate variables. You can avoid using `.reduce` and use `.filter` instead. Which is cleaner in my opinion:

```
function faster_filter_solution(integers) {
  return {
    odd: integers.filter((n) => n % 2 === 1),
    even: integers.filter((n) => n % 2 === 0),
  };
}
```

## Benchmark

<table><tr><td></td><td>slow_solution</td><td>faster_reduce_solution</td><td>faster_filter_solution</td></tr><tr><td>1k integers</td><td>2.401 ms</td><td>0.196 ms</td><td>0.248 ms</td></tr><tr><td>10k integers</td><td>79.784 ms</td><td>0.635 ms</td><td>0.730 ms</td></tr><tr><td>100k integers</td><td>26236.635 ms</td><td>2.246 ms</td><td>3.256 ms</td></tr></table>

_Benchmark run on Github actions_
