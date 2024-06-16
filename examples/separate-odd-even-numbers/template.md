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
{{code_slow_solution}}
```

**Why is this slow?**

We are creating a new array and new object on each iteration of the reduce callback.

## Faster reduce solution

```ts
{{code_faster_reduce_solution}}
```

**Why is that faster?**

This mutates the arrays instead of creating new ones. So **we avoided creating unneeded objects** successfully.

## Alternative solution without mutation

if your coding style forces you not to mutate variables. You can avoid using `.reduce` and use `.filter` instead. Which is cleaner in my opinion:

```
{{code_faster_filter_solution}}
```

## Benchmark

{{benchmark}}
