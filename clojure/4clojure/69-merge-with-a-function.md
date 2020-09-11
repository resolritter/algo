## Solution
```clojure
(fn [function & [head & tail]]
  (loop [accumulator_map head
		 remaining_maps tail]
	(if (empty? remaining_maps)
	  accumulator_map
	  (let [[first_remaining & remaining_maps] remaining_maps
			to_be_merged (map (fn [[k v]] (if (contains? accumulator_map k)
							; apply the function to the map
							[k (function (get accumulator_map k) v)]
							; the key is not created so just assoc it into the map
							[k v]))
					  first_remaining)
			new_map (reduce-kv #(assoc %1 %2 %3) accumulator_map (into {} to_be_merged))]
		(recur new_map remaining_maps))))
  )
```

## Description

Write a function which takes a function f and a variable number of maps. Your function should return a map that consists of the rest of the maps conj-ed onto the first. If a key occurs in more than one map, the mapping(s) from the latter (left-to-right) should be combined with the mapping in the result by calling (f val-in-result val-in-latter)

```clojure
; Test 1
(=
   (__ * {:a 2, :b 3, :c 4} {:a 2} {:b 2} {:c 5})
   {:a 4, :b 6, :c 20})

; Test 2
(=
   (__ - {1 10, 2 20} {1 3, 2 10, 3 15})
   {1 7, 2 10, 3 15})

; Test 3
(= 
   (__ concat {:a [3], :b [6]} {:a [4 5], :c [8 9]} {:b [7]})
   {:a [3 4 5], :b [6 7], :c [8 9]})
```
