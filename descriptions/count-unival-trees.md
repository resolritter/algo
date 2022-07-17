A unival tree (which stands for “universal value”) is a tree where all nodes have the same value.

---

Example 1:

```
  a
 / \
a   a
    /\
   a  a
       \
        A
```

This tree has 3 unival subtrees: the two ‘a’ leaves and the one ‘A’ leaf. The
‘A’ leaf causes all its parents to not be counted as a unival tree.

---

Example 2:

```
  a
 / \
c   b
    /\
   b  b
        \
         b
```

This tree has 5 unival subtrees: the leaf at ‘c’, and every ‘b’.

---

Given the root to a binary tree, count the number of unival subtrees.
