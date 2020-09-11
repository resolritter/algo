## Solution
```clojure
(fn [input-string]
  (->> (clojure.string/split input-string #" ")
      (map #(filter (fn [c] (re-matches #"\w" (str c))) %))
      (map #(clojure.string/join %))
      (sort-by clojure.string/lower-case))
  )
```

## Description

Word Sorting
 
Difficulty:	Medium
Topics:	sorting

Write a function that splits a sentence up into a sorted list of words. Capitalization should not affect sort order and punctuation should be ignored.

```clojure
; Test 1
(= (__  "Have a nice day.")
   ["a" "day" "Have" "nice"])

; Test 2
(= (__  "Clojure is a fun language!")
   ["a" "Clojure" "fun" "is" "language"])

; Test 3
(= (__  "Fools fall for foolish follies.")
   ["fall" "follies" "foolish" "Fools" "for"])
```
