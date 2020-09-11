## Solution (Unofficial, using pmap)
- Dunno why pmap is not allowed but I'll try to wrap these computations in
futures instead.

```clojure
(fn [triangle]
  "
  Find the lowest path down the tree in parallel for each branch in the
  second level.

        [3] +3
       [2 4] +4
      [1 9 3] +3
     [9 9 2 4] +2
    [4 6 6 7 8] +7
   [5 7 3 5 1 4] +1

  Result: 20
  "
  (let [first-value (get-in triangle [0 0] 0)
        subtree-values (atom [])
        second-level-and-below (drop 1 triangle)]
    ; The code below will create N subtree parallel computations for each node
    ; in the second level. Their side-effect will be store the path's value
    ; at the end of the walk in the `subtree-values` atom.
    ; First, realize the parallel computation and wait for it...
    (doall (pmap
      (fn [[subtree-index new-subtree]] 
        (apply
          (fn traverse [current-index
                   subtree
                   accumulated-path-value]
            (if (empty? subtree)
              (swap! subtree-values conj (+ first-value accumulated-path-value))
              (let [current-level (first subtree)
                    remaining-subtree (drop 1 subtree)
                    accumulated-path-value (+ accumulated-path-value
                                              (get current-level current-index 0))]
                ; traverse on the adjacent children nodes
                (traverse current-index remaining-subtree accumulated-path-value)
                (traverse (inc current-index) remaining-subtree accumulated-path-value)
                )
              )
            ) 
          [subtree-index new-subtree 0]
          )) 
      ; Map the second level into pairs of [element-index, tree].
      ; Effectively it makes copies of the level 2 and below, but takes each
      ; node as its "root reference" at a time when processing concurrently above.
      (map #(vec [% second-level-and-below]) (range 0 (count (first second-level-and-below))))
      ))
    ; Return the lowest subtree value when all processes finish.
    (-> @subtree-values
        sort
        first)
    )
  )
```

## Description

Triangle Minimal Path
 
Difficulty:	Hard
Topics:	graph-theory


Write a function which calculates the sum of the minimal path through a triangle. The triangle is represented as a collection of vectors. The path should start at the top of the triangle and move to an adjacent number on the next row until the bottom of the triangle is reached.

```clojure
; Test 1
(= 7 (__ '([1]
          [2 4]
         [5 1 4]
        [2 3 4 5]))) ; 1->2->1->3

; Test 2
(= 20 (__ '([3]
           [2 4]
          [1 9 3]
         [9 9 2 4]
        [4 6 6 7 8]
       [5 7 3 5 1 4]))) ; 3->4->3->2->7->1
```
