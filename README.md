# Avoid writing slow JS code

A couple of rules to improve the performance of your JS code.

## What is this ?

- A consice list of rules to aviod writing slow code.
- Concrete use cases for each rule.
- Benchmarking of slow code vs fast alternative.

## What this is NOT?

- This is not a guide on algorithms or data structures (although they are very important).
- This is not a guide to write the most performant code (but to avoid writing very slow code).
- This is not for competitive programmers, if you know how to calculate the time complexity of your code, and what `malloc` is, then you probably don't need this guide.

## The rules

1. Avoid **nested loops** when possible.

  - **Use a Set.** ex: [Filter invited guests](examples/filter-invited-guests/README.md)
  - **Use an index.** ex: [Group clients with their orders](examples/group-clients-with-orders/README.md)

2. Avoid **creating new objects** when possible.

  - **Mutate the object.** ex: [Separate odd and even numbers](examples/separate-odd-even-numbers/README.md)

Yes, those are all the simple rules I could come up with so far. I will add more rules soon :)

## Contributing

Feel free to open an issue/PR to add new rules or examples. I will be reviewing them and trying to keep the guide concise and each example focused on a single rule.