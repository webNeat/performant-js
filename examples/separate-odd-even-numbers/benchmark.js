const integers = [];
for (let i = 1; i < 100_000; i++) integers.push(i);

export const inputs = {
  "1k integers": integers.slice(0, 1000),
  "10k integers": integers.slice(0, 10_000),
  "100k integers": integers.slice(0, 100_000),
};

function slow_solution(integers) {
  return integers.reduce(
    ({ odd, even }, n) => {
      if (n % 2 === 0) return { odd, even: [...even, n] };
      return { odd: [...odd, n], even };
    },
    { odd: [], even: [] }
  );
}

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

function faster_filter_solution(integers) {
  return {
    odd: integers.filter((n) => n % 2 === 1),
    even: integers.filter((n) => n % 2 === 0),
  };
}

export const fns = {
  slow_solution,
  faster_reduce_solution,
  faster_filter_solution,
};
