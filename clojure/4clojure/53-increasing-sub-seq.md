## Solution

Notes:
- The count calls were left in for more expressiveness, instead of adding another variable.
- I may have bumped into another way to solve this which would need some more nested conditionals, but the code would be refactored into normal recursion and thus wouldn't allow the use of `loop` (tail-recursive and better optimized), as the recur macro would no longer be the last form.
- Think of a smaller way of writing this using transducers and sorting out the longest sequence?

```clojure
(fn [initial-seq]
  (loop [[head & remaining-seq] initial-seq
         accumulator []
         longest-accumulator []
         last-value 0
         ongoing-streak? false]
    (if (empty? remaining-seq)
      (let [final-accumulator (if (and
                                    ; check if there is an ongoing streak
                                    ; of increasing numbers
                                    ongoing-streak?
                                    ; check if the last number would form a
                                    ; new increasing sequence
                                    (= (dec head) last-value)
                                    ; check if the sequence about to be created
                                    ; has more elements than the longest 
                                    (>
                                     (inc (count accumulator))
                                     (count longest-accumulator))
                                    )
                                (conj accumulator head)
                                longest-accumulator)]
        (if (> (count final-accumulator) 1)
          final-accumulator
          [])
        )
      (let [will-streak-continue? (= (dec head) last-value)
            new-accumulator (if will-streak-continue?
                              (conj accumulator head)
                              [head])
            longest-accumulator (if (>
                                     (count new-accumulator)
                                     (count longest-accumulator))
                                  new-accumulator
                                  longest-accumulator)]
        (recur
          remaining-seq
          new-accumulator
          longest-accumulator
          head
          will-streak-continue?)
        )
      )))
```

## Description
 
Difficulty:	Hard
Topics:	seqs

Given a vector of integers, find the longest consecutive sub-sequence of increasing numbers. If two sub-sequences have the same length, use the one that occurs first. An increasing sub-sequence must have a length of 2 or greater to qualify.

```clojure
; Test 1
(= (__ [1 0 1 2 3 0 4 5]) [0 1 2 3])

; Test 2
(= (__ [5 6 1 3 2 7]) [5 6])

; Test 3
(= (__ [2 3 3 4 5]) [3 4 5])

; Test 4
(= (__ [7 6 5 4]) [])
```
