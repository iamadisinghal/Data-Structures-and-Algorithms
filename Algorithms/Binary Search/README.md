A simple use case of third way could be to find the index of kth smallest number - O(1) after sorting

# Binary Search Interview Questions & Answers

## 1. What is Binary Search?

**Answer:**
Search algorithm that repeatedly halves the search space. Works only on sorted data (or a monotonic search space). Time Complexity: **O(log n)**.

---

## 2. What are the prerequisites for Binary Search?

**Answer:**
- Sorted array (ascending or descending with modified logic)
- Random access (arrays/vectors)
- Monotonic property

---

## 3. What are the time and space complexities?

**Answer:**
- Best: **O(1)**
- Average: **O(log n)**
- Worst: **O(log n)**
- Iterative Space: **O(1)**
- Recursive Space: **O(log n)**

---

## 4. Why is Binary Search O(log n)?

**Answer:**
Search space becomes half every iteration.

```
n → n/2 → n/4 → n/8 → ... → 1
```

Number of halvings = **log₂n**

---

## 5. Why do we write

```cpp
mid = low + (high - low) / 2;
```

instead of

```cpp
(low + high) / 2;
```

**Answer:**
Avoid integer overflow.

---

## 6. Can Binary Search work on an unsorted array?

**Answer:**
No. Sort first or use Linear Search.

---

## 7. Can Binary Search work on descending arrays?

**Answer:**
Yes. Reverse the comparison conditions.

---

## 8. Iterative vs Recursive Binary Search?

**Answer:**

Iterative:
- O(1) space
- Faster
- Preferred

Recursive:
- Cleaner
- O(log n) recursion stack

---

## 9. When is Linear Search better?

**Answer:**
- Small arrays
- One-time search
- Unsorted data
- Data changes frequently

---

## 10. Why is Binary Search not suitable for Linked Lists?

**Answer:**
No random access.
Finding the middle takes O(n).

---

## 11. Why is random access important?

**Answer:**
Need direct access to the middle element in O(1).

---

## 12. Why is Binary Search considered Divide and Conquer?

**Answer:**
Divides the search space into two halves and continues in one half.

---

## 13. How do you find the first occurrence of an element?

**Answer:**
Store answer.
Move left.

```
arr[mid] == target
ans = mid
high = mid - 1
```

---

## 14. How do you find the last occurrence?

**Answer:**
Store answer.
Move right.

```
arr[mid] == target
ans = mid
low = mid + 1
```

---

## 15. How do you count occurrences?

**Answer:**

```
lastOccurrence - firstOccurrence + 1
```

---

## 16. What is lower_bound()?

**Answer:**
First element **>= target**.

---

## 17. What is upper_bound()?

**Answer:**
First element **> target**.

---

## 18. Difference between lower_bound() and upper_bound()?

**Answer:**

```
lower_bound : >= x
upper_bound : > x
```

---

## 19. What does std::binary_search() return?

**Answer:**
Boolean.
Only checks existence.

---

## 20. What happens if the target is absent?

**Answer:**
Loop terminates.
Return -1 or insertion position depending on the problem.

---

## 21. How do you find the insertion position?

**Answer:**
Use lower_bound().

---

## 22. How do you find Floor and Ceil?

**Answer:**

Floor:
Largest element <= target

Ceil:
Smallest element >= target

---

## 23. Search in a Rotated Sorted Array?

**Answer:**
One half is always sorted.
Check which half is sorted.
Discard the other.

Complexity:
O(log n)

---

## 24. Find the minimum element in a Rotated Sorted Array?

**Answer:**
Compare middle with high.

Minimum lies in unsorted half.

---

## 25. How do you find the number of rotations?

**Answer:**
Index of minimum element.

---

## 26. Search in a Nearly Sorted Array?

**Answer:**
Check

```
mid
mid-1
mid+1
```

Then move by two positions.

---

## 27. Search in an Infinite Sorted Array?

**Answer:**
Expand range exponentially.

```
1
2
4
8
16
...
```

Then Binary Search.

---

## 28. How do you find a Peak Element?

**Answer:**
Compare with neighbors.

Peak always exists.

Binary Search.

O(log n)

---

## 29. What is a Bitonic Array?

**Answer:**
Strictly increasing then strictly decreasing.

---

## 30. Search in a Bitonic Array?

**Answer:**
- Find peak
- Binary Search left
- Binary Search right (descending)

---

## 31. What is Binary Search on Answer?

**Answer:**
Binary Search on the answer space instead of the array.

Search over possible answers.

---

## 32. When can Binary Search on Answer be applied?

**Answer:**
Whenever the answer satisfies a monotonic property.

Example:

```
Possible
Possible
Possible
Impossible
Impossible
```

or

```
False False False True True
```

---

## 33. Common Binary Search on Answer problems?

**Answer:**
- Koko Eating Bananas
- Aggressive Cows
- Allocate Books
- Painter Partition
- Ship Packages
- Split Array Largest Sum
- Minimum Days to Make Bouquets
- Minimum Speed to Arrive on Time

---

## 34. Can Binary Search be applied to floating-point numbers?

**Answer:**
Yes.

Use precision (epsilon) instead of equality.

---

## 35. Can Binary Search be applied to strings?

**Answer:**
Yes.

Lexicographical comparison.

---

## 36. Can Binary Search be applied outside arrays?

**Answer:**
Yes.

Examples:
- Answer Space
- Databases
- Search Engines
- Version Control
- Optimization Problems

---

## 37. Why doesn't Binary Search always return the first duplicate?

**Answer:**
Stops at first match found.

Need modified Binary Search for first/last occurrence.

---

## 38. What are the most common Binary Search mistakes?

**Answer:**
- Array not sorted
- Overflow while computing mid
- Infinite loop
- Wrong loop condition
- Incorrect boundary updates
- Off-by-one errors
- Forgetting duplicates
- Mixing lower_bound and upper_bound
- Wrong answer initialization

---

## 39. Binary Search vs Linear Search?

**Answer:**

Linear:
- O(n)
- No sorting needed

Binary:
- O(log n)
- Requires sorted data

---

## 40. Binary Search vs Hashing?

**Answer:**

Hashing:
- Average O(1)
- No ordering

Binary Search:
- O(log n)
- Maintains sorted order
- Supports range queries, floor/ceil, lower/upper bound

---

## 41. Binary Search vs Balanced BST?

**Answer:**

Binary Search:
- Static data
- O(log n)
- Better cache locality

BST:
- Dynamic insert/delete/search
- O(log n)
- Ordered structure

---

## 42. Which STL algorithms are based on Binary Search?

**Answer:**
- `binary_search()`
- `lower_bound()`
- `upper_bound()`
- `equal_range()`