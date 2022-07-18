Given an sequence of `(Parent,Child)` relationships, in a single input line, for example:

`(A,B) (A,C)`

A tree should be produced from the `(Parent,Child)` relationships:

```
    A
  /   \
 B     C
```

The tree should be validated such that

- If circular dependencies are produced, the program prints "Circular dependency" and exits
- If a child has more than one parent, the program prints "Multiple parents" and exits
- If a parent has more than two children, the program prints "More than 2 children" and exits
- If multiple roots are produced, the program prints "Multiple roots" and exits

In all other scenarios, the program should print "OK"
