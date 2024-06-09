# Avoid writing slow JS code

A practical guide to improve the performance of your JS code.

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
2. Avoid **creating new objects** when possible.

Yes, those are all the simple rules I could come up with so far.

Let's apply them on some concrete examples:

- [Filter invited guests](examples/filter-invited-guests.md)