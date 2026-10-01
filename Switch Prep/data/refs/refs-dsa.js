/* Read & watch references for the DSA tab (topics in dsa-1.js, dsa-2.js, dsa-3.js).
   All free. Videos without a URL become a YouTube search on the name. */
PREP.add({ id: "dsa", refs: {

  /* ---------------- dsa-1 ---------------- */
  "complexity": [
    { n: "CSES Handbook (Antti Laaksonen) — Ch. 2 Time complexity", u: "https://cses.fi/book/book.pdf", k: "book", d: "short, precise chapter incl. estimating from constraints" },
    { n: "USACO Guide — Time Complexity", u: "https://usaco.guide/bronze/time-comp", k: "article", d: "n-limit to complexity table, constant factors" },
    { n: "Wikipedia — Amortized analysis", u: "https://en.wikipedia.org/wiki/Amortized_analysis", k: "article", d: "aggregate / accounting / potential methods (dynamic array)" },
    { n: "Wikipedia — Master theorem (analysis of algorithms)", u: "https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)", k: "article", d: "recurrences for divide and conquer" },
    { n: "take U forward (Striver) — Time and Space Complexity | Strivers A2Z DSA Course", k: "video", d: "interview-style counting of loops" },
    { n: "Abdul Bari — Asymptotic Notations Big Oh, Omega, Theta", k: "video", d: "formal definitions with examples" },
    { n: "Big-O Cheat Sheet", u: "https://www.bigocheatsheet.com/", k: "notes", d: "complexities of common DS operations and sorts" }
  ],
  "lang-toolkit": [
    { n: "Python Wiki — TimeComplexity", u: "https://wiki.python.org/moin/TimeComplexity", k: "docs", d: "cost of list / dict / set / deque operations" },
    { n: "Python docs — collections (Counter, defaultdict, deque, OrderedDict)", u: "https://docs.python.org/3/library/collections.html", k: "docs" },
    { n: "Python docs — heapq", u: "https://docs.python.org/3/library/heapq.html", k: "docs", d: "min-heap API + priority queue implementation notes" },
    { n: "Python docs — bisect", u: "https://docs.python.org/3/library/bisect.html", k: "docs", d: "lower/upper bound on sorted lists" },
    { n: "Python docs — functools (cache, lru_cache, cmp_to_key)", u: "https://docs.python.org/3/library/functools.html", k: "docs" },
    { n: "NeetCode — Python for Coding Interviews - Everything you need to Know", k: "video", d: "one-video tour of the interview Python toolkit" },
    { n: "Luv — C++ STL for competitive programming playlist", k: "playlist", d: "vector, map, set, priority_queue, sort comparators (C++ notes)" }
  ],
  "math-basics": [
    { n: "CP-Algorithms — Euclidean algorithm for GCD", u: "https://cp-algorithms.com/algebra/euclid-algorithm.html", k: "article" },
    { n: "CP-Algorithms — Sieve of Eratosthenes", u: "https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html", k: "article", d: "incl. linear sieve and segmented sieve" },
    { n: "CSES Handbook — Ch. 21 Number theory", u: "https://cses.fi/book/book.pdf", k: "book", d: "primes, factors, modular arithmetic" },
    { n: "take U forward (Striver) — Basic Maths | Strivers A2Z DSA Course", k: "video", d: "digits, palindrome, Armstrong, divisors, primes, GCD" },
    { n: "Luv — Number theory for competitive programming playlist", k: "playlist", d: "sieve, divisors, prime factorisation" },
    { n: "GeeksforGeeks — Sieve of Eratosthenes", k: "article", d: "beginner-friendly with code in many languages" }
  ],
  "recursion-basics": [
    { n: "Jeff Erickson — Algorithms, Ch. 1 Recursion (free book)", u: "https://jeffe.cs.illinois.edu/teaching/algorithms/", k: "book", d: "the 'recursion fairy' / leap-of-faith framing" },
    { n: "take U forward (Striver) — Recursion playlist (Strivers A2Z)", k: "playlist", d: "call stack, parameterised vs functional recursion" },
    { n: "Aditya Verma — Recursion playlist", k: "playlist", d: "IBH (induction-base-hypothesis) method, input-output tree" },
    { n: "VisuAlgo — Recursion tree / DAG visualiser", u: "https://visualgo.net/en/recursion", k: "visual", d: "draw the recursion tree of any function" },
    { n: "Reducible — 5 Simple Steps for Solving Any Recursive Problem", k: "video", d: "clear mental model" },
    { n: "GeeksforGeeks — Introduction to Recursion", k: "article" }
  ],
  "arrays-hashing": [
    { n: "VisuAlgo — Hash Table (chaining, linear/quadratic probing)", u: "https://visualgo.net/en/hashtable", k: "visual" },
    { n: "Tech Interview Handbook — Array cheatsheet", u: "https://www.techinterviewhandbook.org/algorithms/array/", k: "notes", d: "corner cases + techniques" },
    { n: "Tech Interview Handbook — Hash table cheatsheet", u: "https://www.techinterviewhandbook.org/algorithms/hash-table/", k: "notes" },
    { n: "NeetCode — Arrays & Hashing problems (NeetCode 150 playlist)", k: "playlist", d: "Two Sum, Group Anagrams, Top K, Longest Consecutive" },
    { n: "take U forward (Striver) — Hashing | Maps | Time Complexity | Collisions", k: "video", d: "how hashing and collisions work" },
    { n: "MIT 6.006 (Spring 2020) — Lecture 4: Hashing", u: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", k: "course", d: "universal hashing, expected O(1)" }
  ],
  "prefix-sums": [
    { n: "USACO Guide — Introduction to Prefix Sums", u: "https://usaco.guide/silver/prefix-sums", k: "article", d: "1D/2D prefix sums with problems" },
    { n: "CSES Handbook — Ch. 9 Range queries (prefix sums, difference arrays)", u: "https://cses.fi/book/book.pdf", k: "book" },
    { n: "take U forward (Striver) — Count Subarray sum Equals K", k: "video", d: "prefix sum + hash map pattern" },
    { n: "NeetCode — Subarray Sum Equals K - Prefix Sums - Leetcode 560", k: "video" },
    { n: "Errichto — Prefix Sums (Algorithms explained)", k: "video", d: "difference arrays and 2D prefix sums" },
    { n: "GeeksforGeeks — Difference Array | Range update query in O(1)", k: "article" }
  ],
  "two-pointers": [
    { n: "USACO Guide — Two Pointers", u: "https://usaco.guide/silver/two-pointers", k: "article" },
    { n: "Tech Interview Handbook — Array: two pointers / sliding window techniques", u: "https://www.techinterviewhandbook.org/algorithms/array/", k: "notes" },
    { n: "NeetCode — Two Pointers problems (NeetCode 150 playlist)", k: "playlist", d: "Valid Palindrome, 3Sum, Container With Most Water, Trapping Rain Water" },
    { n: "take U forward (Striver) — 3 Sum | Brute - Better - Optimal", k: "video" },
    { n: "Errichto — Two pointers technique", k: "video", d: "when and why it works (monotonicity)" },
    { n: "GeeksforGeeks — Two Pointers Technique", k: "article" }
  ],
  "sliding-window": [
    { n: "Aditya Verma — Sliding Window playlist", k: "playlist", d: "fixed vs variable window templates; best for the pattern" },
    { n: "take U forward (Striver) — Sliding Window & Two Pointer playlist", k: "playlist", d: "longest/shortest/count-subarrays variants" },
    { n: "NeetCode — Sliding Window problems (NeetCode 150 playlist)", k: "playlist", d: "Longest Substring w/o Repeat, Min Window Substring" },
    { n: "CP-Algorithms — Minimum stack / Minimum queue", u: "https://cp-algorithms.com/data_structures/stack_queue_modification.html", k: "article", d: "sliding window min/max with a deque" },
    { n: "USACO Guide — Two Pointers (sliding window section)", u: "https://usaco.guide/silver/two-pointers", k: "article" },
    { n: "GeeksforGeeks — Window Sliding Technique", k: "article" }
  ],
  "sorting": [
    { n: "VisuAlgo — Sorting (bubble, selection, insertion, merge, quick, counting, radix)", u: "https://visualgo.net/en/sorting", k: "visual" },
    { n: "CSES Handbook — Ch. 3 Sorting", u: "https://cses.fi/book/book.pdf", k: "book", d: "lower bound, counting sort, comparators" },
    { n: "take U forward (Striver) — Sorting playlist (Merge Sort, Quick Sort)", k: "playlist" },
    { n: "Abdul Bari — Merge Sort / Quick Sort Algorithm", k: "video", d: "analysis incl. worst case of quicksort" },
    { n: "MIT 6.006 (Spring 2020) — Lecture 3: Sorting + Lecture 5: Linear Sorting", u: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", k: "course" },
    { n: "Python docs — Sorting HOW TO (key functions, stability, cmp_to_key)", u: "https://docs.python.org/3/howto/sorting.html", k: "docs" },
    { n: "USACO Guide — Custom Comparators and Coordinate Compression", u: "https://usaco.guide/silver/sorting-custom", k: "article" }
  ],
  "binary-search": [
    { n: "CP-Algorithms — Binary search", u: "https://cp-algorithms.com/num_methods/binary_search.html", k: "article", d: "invariants, predicate search, search on answer" },
    { n: "USACO Guide — Binary Search", u: "https://usaco.guide/silver/binary-search", k: "article", d: "binary search on the answer" },
    { n: "take U forward (Striver) — Binary Search playlist", k: "playlist", d: "bounds, rotated arrays, answer-space problems (Koko, ship capacity)" },
    { n: "Aditya Verma — Binary Search playlist", k: "playlist", d: "pattern recognition across ~20 variants" },
    { n: "Errichto — Binary search tutorial (C++ and Python)", k: "video", d: "first-true predicate template" },
    { n: "NeetCode — Binary Search problems (NeetCode 150 playlist)", k: "playlist" }
  ],
  "strings": [
    { n: "Tech Interview Handbook — String cheatsheet", u: "https://www.techinterviewhandbook.org/algorithms/string/", k: "notes", d: "anagram / palindrome techniques, corner cases" },
    { n: "take U forward (Striver) — Strings (Strivers A2Z, basic + medium)", k: "playlist" },
    { n: "NeetCode — Valid Anagram / Group Anagrams / Longest Palindromic Substring", k: "video", d: "expand-around-centre palindrome" },
    { n: "Python docs — str methods", u: "https://docs.python.org/3/library/stdtypes.html#string-methods", k: "docs" },
    { n: "GeeksforGeeks — String Data Structure", k: "article" }
  ],
  "linked-list": [
    { n: "VisuAlgo — Linked List, Stack, Queue, Deque", u: "https://visualgo.net/en/list", k: "visual" },
    { n: "Tech Interview Handbook — Linked list cheatsheet", u: "https://www.techinterviewhandbook.org/algorithms/linked-list/", k: "notes", d: "dummy node, fast/slow, reversal" },
    { n: "take U forward (Striver) — Linked List playlist", k: "playlist", d: "reverse, cycle (Floyd), merge, reverse in k-group" },
    { n: "NeetCode — Linked List problems (NeetCode 150 playlist)", k: "playlist" },
    { n: "Wikipedia — Cycle detection (Floyd tortoise and hare)", u: "https://en.wikipedia.org/wiki/Cycle_detection", k: "article", d: "why the meeting point finds the cycle start" },
    { n: "Back To Back SWE — Reverse A Linked List", k: "video" }
  ],
  "stacks-queues": [
    { n: "VisuAlgo — Stack / Queue / Deque", u: "https://visualgo.net/en/list", k: "visual" },
    { n: "Aditya Verma — Stack playlist", k: "playlist", d: "next greater / smaller, stock span, histogram" },
    { n: "take U forward (Striver) — Stack and Queue playlist", k: "playlist", d: "monotonic stack, min stack, sliding window maximum" },
    { n: "NeetCode — Stack problems (NeetCode 150 playlist)", k: "playlist", d: "Daily Temperatures, Largest Rectangle in Histogram" },
    { n: "CP-Algorithms — Minimum stack / Minimum queue", u: "https://cp-algorithms.com/data_structures/stack_queue_modification.html", k: "article" },
    { n: "Wikipedia — Shunting yard algorithm", u: "https://en.wikipedia.org/wiki/Shunting_yard_algorithm", k: "article", d: "infix expression evaluation" }
  ],
  "intervals": [
    { n: "Tech Interview Handbook — Interval cheatsheet", u: "https://www.techinterviewhandbook.org/algorithms/interval/", k: "notes" },
    { n: "NeetCode — Intervals problems (Merge, Insert, Non-overlapping, Meeting Rooms II)", k: "playlist" },
    { n: "take U forward (Striver) — Merge Overlapping Subintervals", k: "video" },
    { n: "CSES Handbook — Ch. 4.2/6 Sweep line and greedy scheduling", u: "https://cses.fi/book/book.pdf", k: "book", d: "events sorting, activity selection" },
    { n: "USACO Guide — Greedy Algorithms with Sorting", u: "https://usaco.guide/silver/greedy-sorting", k: "article", d: "sort-by-end exchange argument" },
    { n: "Errichto — Sweep line (Algorithms explained)", k: "video" }
  ],
  "matrix": [
    { n: "Tech Interview Handbook — Matrix cheatsheet", u: "https://www.techinterviewhandbook.org/algorithms/matrix/", k: "notes", d: "direction arrays, transpose, rotation" },
    { n: "take U forward (Striver) — Rotate Matrix / Spiral Traversal / Set Matrix Zeroes", k: "video" },
    { n: "NeetCode — Spiral Matrix / Rotate Image / Set Matrix Zeroes", k: "video" },
    { n: "USACO Guide — Flood Fill", u: "https://usaco.guide/silver/flood-fill", k: "article", d: "grid traversal with direction arrays" },
    { n: "GeeksforGeeks — Matrix Data Structure", k: "article" }
  ],
  "bit-manipulation": [
    { n: "CP-Algorithms — Bit manipulation", u: "https://cp-algorithms.com/algebra/bit-manipulation.html", k: "article", d: "set/clear/toggle, lowbit, popcount, submasks" },
    { n: "CSES Handbook — Ch. 10 Bit manipulation", u: "https://cses.fi/book/book.pdf", k: "book" },
    { n: "VisuAlgo — Bitmask", u: "https://visualgo.net/en/bitmask", k: "visual" },
    { n: "take U forward (Striver) — Bit Manipulation playlist", k: "playlist", d: "single number variants, subsets via bits, XOR tricks" },
    { n: "Errichto — Bitwise operations tutorial (XOR, shifts, subsets)", k: "video" },
    { n: "Sean Anderson — Bit Twiddling Hacks", u: "https://graphics.stanford.edu/~seander/bithacks.html", k: "notes", d: "reference for clever tricks" }
  ],

  /* ---------------- dsa-2 ---------------- */
  "backtracking": [
    { n: "Jeff Erickson — Algorithms, Ch. 2 Backtracking (free book)", u: "https://jeffe.cs.illinois.edu/teaching/algorithms/", k: "book", d: "N-queens, subset sum, game trees" },
    { n: "take U forward (Striver) — Recursion & Backtracking playlist", k: "playlist", d: "subsets, combination sum I/II, permutations, N-Queens, Sudoku" },
    { n: "Aditya Verma — Recursion playlist (input-output method)", k: "playlist", d: "subsets, permutations with spaces/case change" },
    { n: "NeetCode — Backtracking problems (NeetCode 150 playlist)", k: "playlist" },
    { n: "CSES Handbook — Ch. 5 Complete search", u: "https://cses.fi/book/book.pdf", k: "book", d: "generating subsets/permutations, pruning, meet in the middle" },
    { n: "VisuAlgo — Recursion tree visualiser", u: "https://visualgo.net/en/recursion", k: "visual" }
  ],
  "binary-trees": [
    { n: "take U forward (Striver) — Binary Trees playlist (Tree Series)", k: "playlist", d: "traversals, views, diameter, LCA, serialize" },
    { n: "NeetCode — Trees problems (NeetCode 150 playlist)", k: "playlist" },
    { n: "Tech Interview Handbook — Tree cheatsheet", u: "https://www.techinterviewhandbook.org/algorithms/tree/", k: "notes" },
    { n: "Back To Back SWE — Binary Tree Traversals / Level Order", k: "video" },
    { n: "Wikipedia — Tree traversal (incl. Morris)", u: "https://en.wikipedia.org/wiki/Tree_traversal", k: "article" },
    { n: "GeeksforGeeks — Binary Tree Data Structure", k: "article" }
  ],
  "bst": [
    { n: "VisuAlgo — Binary Search Tree / AVL", u: "https://visualgo.net/en/bst", k: "visual", d: "insert, delete, successor, rotations" },
    { n: "take U forward (Striver) — Binary Search Tree playlist", k: "playlist", d: "validate, kth smallest, LCA, BST iterator" },
    { n: "Abdul Bari — Binary Search Trees / AVL Tree Rotations", k: "video" },
    { n: "MIT 6.006 (Spring 2020) — Lectures 6-7: Binary Trees, AVL", u: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", k: "course" },
    { n: "NeetCode — Validate Binary Search Tree / Kth Smallest Element in a BST", k: "video" },
    { n: "GeeksforGeeks — Binary Search Tree", k: "article" }
  ],
  "heaps": [
    { n: "VisuAlgo — Binary Heap", u: "https://visualgo.net/en/heap", k: "visual", d: "sift-up/down and O(n) build" },
    { n: "Python docs — heapq (incl. priority queue implementation notes)", u: "https://docs.python.org/3/library/heapq.html", k: "docs" },
    { n: "Aditya Verma — Heap playlist", k: "playlist", d: "Top-K / K-closest pattern recognition" },
    { n: "take U forward (Striver) — Heaps playlist (Strivers A2Z)", k: "playlist" },
    { n: "NeetCode — Heap / Priority Queue problems (NeetCode 150 playlist)", k: "playlist", d: "Kth largest, Median from Data Stream, Task Scheduler" },
    { n: "Abdul Bari — Heap - Heap Sort - Heapify - Priority Queues", k: "video", d: "why heapify is O(n)" },
    { n: "William Fiset — Priority Queue (Data Structures playlist)", k: "video" }
  ],
  "tries": [
    { n: "take U forward (Striver) — Trie playlist", k: "playlist", d: "implement, count prefixes, max XOR with binary trie" },
    { n: "NeetCode — Implement Trie / Design Add and Search Words / Word Search II", k: "video" },
    { n: "Tech Interview Handbook — Trie cheatsheet", u: "https://www.techinterviewhandbook.org/algorithms/trie/", k: "notes" },
    { n: "CP-Algorithms — Aho-Corasick (trie construction section)", u: "https://cp-algorithms.com/string/aho_corasick.html", k: "article", d: "deeper: trie + failure links" },
    { n: "VisuAlgo — Suffix Tree (trie of suffixes)", u: "https://visualgo.net/en/suffixtree", k: "visual" },
    { n: "Wikipedia — Trie", u: "https://en.wikipedia.org/wiki/Trie", k: "article" }
  ],
  "graph-bfs-dfs": [
    { n: "VisuAlgo — Graph traversal (DFS/BFS)", u: "https://visualgo.net/en/dfsbfs", k: "visual" },
    { n: "CP-Algorithms — Breadth-first search", u: "https://cp-algorithms.com/graph/breadth-first-search.html", k: "article" },
    { n: "CP-Algorithms — Depth First Search", u: "https://cp-algorithms.com/graph/depth-first-search.html", k: "article", d: "entry/exit times, edge classification" },
    { n: "USACO Guide — Graph Traversal", u: "https://usaco.guide/silver/graph-traversal", k: "article" },
    { n: "take U forward (Striver) — Graph Series playlist", k: "playlist", d: "islands, rotten oranges, bipartite, cycle detection" },
    { n: "William Fiset — Graph Theory playlist (BFS, DFS, grids)", k: "playlist" },
    { n: "Jeff Erickson — Algorithms, Ch. 5 Basic Graph Algorithms", u: "https://jeffe.cs.illinois.edu/teaching/algorithms/", k: "book" }
  ],
  "topological-sort": [
    { n: "CP-Algorithms — Topological Sorting", u: "https://cp-algorithms.com/graph/topological-sort.html", k: "article" },
    { n: "USACO Guide — Topological Sort", u: "https://usaco.guide/gold/toposort", k: "article", d: "Kahn + DP on DAGs" },
    { n: "take U forward (Striver) — Topological Sort (DFS) / Kahn Algorithm (G-21, G-22)", k: "video" },
    { n: "William Fiset — Topological Sort Algorithm | Graph Theory", k: "video" },
    { n: "NeetCode — Course Schedule I & II / Alien Dictionary", k: "video" },
    { n: "Jeff Erickson — Algorithms, Ch. 6 Depth-First Search (DAGs, topological order)", u: "https://jeffe.cs.illinois.edu/teaching/algorithms/", k: "book" }
  ],
  "shortest-paths": [
    { n: "CP-Algorithms — Dijkstra Algorithm", u: "https://cp-algorithms.com/graph/dijkstra.html", k: "article", d: "proof + heap implementation" },
    { n: "CP-Algorithms — 0-1 BFS", u: "https://cp-algorithms.com/graph/01_bfs.html", k: "article" },
    { n: "CP-Algorithms — Bellman-Ford / Floyd-Warshall", u: "https://cp-algorithms.com/graph/bellman_ford.html", k: "article", d: "negative cycles; see also all-pair-shortest-path-floyd-warshall" },
    { n: "USACO Guide — Shortest Paths with Non-Negative Edge Weights", u: "https://usaco.guide/gold/shortest-paths", k: "article" },
    { n: "VisuAlgo — Single-Source Shortest Paths", u: "https://visualgo.net/en/sssp", k: "visual" },
    { n: "take U forward (Striver) — Dijkstra / Bellman Ford / Floyd Warshall (Graph Series G-32..G-42)", k: "playlist" },
    { n: "William Fiset — Dijkstra's Shortest Path Algorithm | Graph Theory", k: "video", d: "lazy vs eager Dijkstra" }
  ],
  "union-find": [
    { n: "CP-Algorithms — Disjoint Set Union", u: "https://cp-algorithms.com/data_structures/disjoint_set_union.html", k: "article", d: "rank/size + path compression, applications" },
    { n: "USACO Guide — Disjoint Set Union", u: "https://usaco.guide/gold/dsu", k: "article" },
    { n: "VisuAlgo — Union-Find Disjoint Sets", u: "https://visualgo.net/en/ufds", k: "visual" },
    { n: "take U forward (Striver) — Disjoint Set | Union by Rank | Union by Size | Path Compression (G-46)", k: "video", d: "best intuition-first walkthrough" },
    { n: "William Fiset — Union Find playlist", k: "playlist", d: "kruskal + path compression animations" },
    { n: "NeetCode — Redundant Connection / Number of Connected Components", k: "video" }
  ],
  "mst": [
    { n: "CP-Algorithms — Minimum spanning tree: Kruskal (with DSU)", u: "https://cp-algorithms.com/graph/mst_kruskal_with_dsu.html", k: "article" },
    { n: "CP-Algorithms — Minimum spanning tree: Prim", u: "https://cp-algorithms.com/graph/mst_prim.html", k: "article", d: "dense O(n²) and sparse heap versions" },
    { n: "USACO Guide — Minimum Spanning Trees", u: "https://usaco.guide/gold/mst", k: "article" },
    { n: "VisuAlgo — Minimum Spanning Tree", u: "https://visualgo.net/en/mst", k: "visual" },
    { n: "Abdul Bari — Prim's and Kruskal's Algorithms", k: "video", d: "classic whiteboard explanation" },
    { n: "take U forward (Striver) — Prim's Algorithm / Kruskal's Algorithm (G-45, G-47)", k: "video" },
    { n: "Jeff Erickson — Algorithms, Ch. 7 Minimum Spanning Trees (cut property)", u: "https://jeffe.cs.illinois.edu/teaching/algorithms/", k: "book" }
  ],
  "advanced-graphs": [
    { n: "CP-Algorithms — Finding bridges in a graph in O(N+M)", u: "https://cp-algorithms.com/graph/bridge-searching.html", k: "article", d: "tin/low derivation" },
    { n: "CP-Algorithms — Finding articulation points in O(N+M)", u: "https://cp-algorithms.com/graph/cutpoints.html", k: "article" },
    { n: "CP-Algorithms — Strongly connected components (Kosaraju)", u: "https://cp-algorithms.com/graph/strongly-connected-components.html", k: "article" },
    { n: "take U forward (Striver) — Bridges in Graph (Tarjan) / Articulation Point / Kosaraju (G-54..G-56)", k: "video" },
    { n: "William Fiset — Bridges and Articulation points / Tarjan's Strongly Connected Components", k: "video" },
    { n: "CodeNCode — Graph theory: bridges, articulation points, SCC lectures", k: "playlist", d: "deeper CP-level treatment" },
    { n: "CSES Handbook — Ch. 17 Strong connectivity", u: "https://cses.fi/book/book.pdf", k: "book", d: "Kosaraju + 2-SAT" }
  ],

  /* ---------------- dsa-3 ---------------- */
  "greedy": [
    { n: "Jeff Erickson — Algorithms, Ch. 4 Greedy Algorithms (exchange arguments)", u: "https://jeffe.cs.illinois.edu/teaching/algorithms/", k: "book", d: "rigorous proofs of correctness" },
    { n: "USACO Guide — Greedy Algorithms with Sorting", u: "https://usaco.guide/silver/greedy-sorting", k: "article" },
    { n: "CSES Handbook — Ch. 6 Greedy algorithms", u: "https://cses.fi/book/book.pdf", k: "book", d: "coin problem, scheduling, Huffman" },
    { n: "take U forward (Striver) — Greedy Algorithms playlist", k: "playlist", d: "jump game, gas station, N meetings, job sequencing" },
    { n: "NeetCode — Greedy problems (NeetCode 150 playlist)", k: "playlist" },
    { n: "Abdul Bari — Greedy Method: Job Sequencing / Huffman Coding", k: "video" },
    { n: "Errichto — Greedy algorithms: how to prove them", k: "video", d: "deeper: exchange / stays-ahead intuition" }
  ],
  "dp-1d": [
    { n: "CP-Algorithms — Introduction to Dynamic Programming", u: "https://cp-algorithms.com/dynamic_programming/intro-to-dp.html", k: "article" },
    { n: "USACO Guide — Introduction to DP", u: "https://usaco.guide/gold/intro-dp", k: "article" },
    { n: "Jeff Erickson — Algorithms, Ch. 3 Dynamic Programming", u: "https://jeffe.cs.illinois.edu/teaching/algorithms/", k: "book", d: "how to design the recurrence" },
    { n: "take U forward (Striver) — Dynamic Programming playlist (DP Series)", k: "playlist", d: "memo → tabulation → space optimisation; climbing stairs, house robber, LIS" },
    { n: "NeetCode — 1-D Dynamic Programming problems (NeetCode 150 playlist)", k: "playlist" },
    { n: "Errichto — Dynamic Programming lecture #1 (Fibonacci, staircase)", k: "video", d: "deeper: state design thinking" },
    { n: "MIT 6.006 (Spring 2020) — Lectures 15-18: Dynamic Programming (SRTBOT)", u: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", k: "course" }
  ],
  "dp-grid": [
    { n: "USACO Guide — Paths on Grids", u: "https://usaco.guide/gold/paths-grids", k: "article" },
    { n: "take U forward (Striver) — DP on Grids (DP 8-13: unique paths, min path sum, triangle, cherry pickup)", k: "playlist" },
    { n: "NeetCode — Unique Paths / Minimal Path Sum / Maximal Square", k: "video" },
    { n: "CSES Handbook — Ch. 7 Dynamic programming (paths in a grid)", u: "https://cses.fi/book/book.pdf", k: "book" },
    { n: "Aditya Verma — Dynamic Programming playlist", k: "playlist", d: "space-optimised table filling intuition" },
    { n: "GeeksforGeeks — Min Cost Path | DP", k: "article" }
  ],
  "dp-knapsack": [
    { n: "CP-Algorithms — Knapsack Problem", u: "https://cp-algorithms.com/dynamic_programming/knapsack.html", k: "article", d: "0/1, unbounded, bounded via binary splitting" },
    { n: "USACO Guide — Knapsack DP", u: "https://usaco.guide/gold/knapsack", k: "article" },
    { n: "Aditya Verma — Dynamic Programming playlist (0/1 & unbounded knapsack family)", k: "playlist", d: "subset sum, equal partition, target sum, coin change, rod cutting" },
    { n: "take U forward (Striver) — DP on Subsequences (DP 14-24)", k: "playlist" },
    { n: "Abdul Bari — 0/1 Knapsack Problem - Dynamic Programming", k: "video" },
    { n: "Pepcoding — Coin Change Combinations vs Permutations", k: "video", d: "loop order explained" },
    { n: "Errichto — Knapsack DP (Dynamic Programming lecture)", k: "video", d: "deeper source" }
  ],
  "dp-strings": [
    { n: "take U forward (Striver) — DP on Strings (DP 25-34: LCS, edit distance, wildcard)", k: "playlist" },
    { n: "Aditya Verma — Dynamic Programming playlist (LCS family)", k: "playlist", d: "LCS → SCS, min insert/delete, LPS, print LCS" },
    { n: "NeetCode — 2-D Dynamic Programming problems (LCS, Edit Distance, Distinct Subsequences)", k: "playlist" },
    { n: "CP-Algorithms — Longest increasing subsequence", u: "https://cp-algorithms.com/sequences/longest_increasing_subsequence.html", k: "article", d: "O(n log n) patience sort" },
    { n: "Jeff Erickson — Algorithms, Ch. 3 (edit distance section)", u: "https://jeffe.cs.illinois.edu/teaching/algorithms/", k: "book" },
    { n: "Wikipedia — Levenshtein distance", u: "https://en.wikipedia.org/wiki/Levenshtein_distance", k: "article" },
    { n: "Back To Back SWE — Edit Distance / LCS", k: "video" }
  ],
  "dp-interval": [
    { n: "USACO Guide — Range DP", u: "https://usaco.guide/plat/range-dp", k: "article", d: "deeper: fill by length, classic problems" },
    { n: "Aditya Verma — Dynamic Programming playlist (Matrix Chain Multiplication family)", k: "playlist", d: "MCM, palindrome partitioning, boolean parenthesisation, egg drop" },
    { n: "take U forward (Striver) — Partition DP (DP 48-54: MCM, burst balloons, min cost to cut)", k: "playlist" },
    { n: "Abdul Bari — Matrix Chain Multiplication - Dynamic Programming", k: "video" },
    { n: "NeetCode — Burst Balloons - Dynamic Programming - Leetcode 312", k: "video" },
    { n: "GeeksforGeeks — Matrix Chain Multiplication | DP", k: "article" }
  ],
  "dp-trees-graphs": [
    { n: "USACO Guide — DP on Trees - Introduction", u: "https://usaco.guide/gold/dp-trees", k: "article" },
    { n: "USACO Guide — Topological Sort (DP on DAGs section)", u: "https://usaco.guide/gold/toposort", k: "article" },
    { n: "take U forward (Striver) — Maximum Path Sum / Diameter of Binary Tree (Tree Series)", k: "video", d: "'answer through node' vs 'return to parent'" },
    { n: "NeetCode — House Robber III / Binary Tree Cameras", k: "video" },
    { n: "Aditya Verma — DP on Trees playlist", k: "playlist", d: "general syntax for diameter / max path sum" },
    { n: "Colin Galen — Tree DP / rerooting tutorial", k: "video", d: "deeper source" },
    { n: "CSES Handbook — Ch. 14 Tree algorithms (dynamic programming)", u: "https://cses.fi/book/book.pdf", k: "book" }
  ],
  "dp-bitmask-digit": [
    { n: "CP-Algorithms — Enumerating submasks of a bitmask", u: "https://cp-algorithms.com/algebra/all-submasks.html", k: "article", d: "O(3ⁿ) submask iteration proof" },
    { n: "USACO Guide — Bitmask DP (Platinum module)", k: "article", d: "deeper: TSP, assignment, SOS" },
    { n: "CSES Handbook — Ch. 10.5 Dynamic programming with bitmasks", u: "https://cses.fi/book/book.pdf", k: "book", d: "permutations to subsets, SOS DP" },
    { n: "Errichto — Bitmask DP / Traveling Salesman (Dynamic Programming lecture)", k: "video" },
    { n: "Codeforces blog — Digit DP tutorial (by ashpool / errorgorn)", k: "blog", d: "tight flag, leading zeros, memo state" },
    { n: "CodeNCode — Digit DP playlist", k: "playlist", d: "deeper: count numbers in [L,R] with property" },
    { n: "take U forward (Striver) — Bit Manipulation playlist (subsets / masks)", k: "playlist" }
  ],
  "dp-stocks-state": [
    { n: "take U forward (Striver) — DP on Stocks (DP 35-40: Buy and Sell Stock I-IV, cooldown, fee)", k: "playlist" },
    { n: "NeetCode — Best Time to Buy and Sell Stock with Cooldown - Leetcode 309", k: "video", d: "state-machine diagram" },
    { n: "LeetCode Discuss — Most consistent ways of dealing with the series of stock problems (fun4LeetCode)", k: "blog", d: "classic unifying write-up T[i][k][0/1]" },
    { n: "Back To Back SWE — Best Time to Buy and Sell Stock", k: "video" },
    { n: "GeeksforGeeks — Maximum profit by buying and selling a share at most k times", k: "article" }
  ],
  "segment-fenwick": [
    { n: "CP-Algorithms — Segment Tree", u: "https://cp-algorithms.com/data_structures/segment_tree.html", k: "article", d: "deeper: lazy propagation, merge-sort tree, persistent" },
    { n: "CP-Algorithms — Fenwick Tree", u: "https://cp-algorithms.com/data_structures/fenwick.html", k: "article", d: "range update / range query variants" },
    { n: "USACO Guide — Point Update Range Sum", u: "https://usaco.guide/gold/PURS", k: "article" },
    { n: "VisuAlgo — Segment Tree", u: "https://visualgo.net/en/segmenttree", k: "visual" },
    { n: "VisuAlgo — Fenwick Tree", u: "https://visualgo.net/en/fenwicktree", k: "visual" },
    { n: "take U forward (Striver) — Segment Tree playlist (lazy propagation)", k: "playlist" },
    { n: "Errichto — Segment tree tutorial (CP lecture)", k: "video", d: "deeper: iterative and lazy trees" }
  ],
  "string-algorithms": [
    { n: "CP-Algorithms — Prefix function. Knuth-Morris-Pratt", u: "https://cp-algorithms.com/string/prefix-function.html", k: "article" },
    { n: "CP-Algorithms — Z-function", u: "https://cp-algorithms.com/string/z-function.html", k: "article" },
    { n: "CP-Algorithms — Rabin-Karp / String Hashing", u: "https://cp-algorithms.com/string/string-hashing.html", k: "article", d: "polynomial rolling hash, collision odds" },
    { n: "CP-Algorithms — Manacher's Algorithm", u: "https://cp-algorithms.com/string/manacher.html", k: "article" },
    { n: "Abdul Bari — KMP Algorithm (Knuth Morris Pratt) Pattern Matching", k: "video" },
    { n: "take U forward (Striver) — KMP / Z-Function / Rabin Karp (Strings playlist)", k: "video" },
    { n: "Errichto — Hashing / KMP lectures (Algorithms Live)", k: "video", d: "deeper source" }
  ],
  "sparse-table-lca": [
    { n: "CP-Algorithms — Sparse Table", u: "https://cp-algorithms.com/data_structures/sparse-table.html", k: "article", d: "O(1) idempotent RMQ + O(log n) sums" },
    { n: "CP-Algorithms — Lowest Common Ancestor - Binary Lifting", u: "https://cp-algorithms.com/graph/lca_binary_lifting.html", k: "article" },
    { n: "USACO Guide — Binary Jumping", u: "https://usaco.guide/plat/binary-jump", k: "article", d: "deeper: kth ancestor, LCA, jump tables" },
    { n: "CSES Handbook — Ch. 9 Range queries + Ch. 18 Tree queries", u: "https://cses.fi/book/book.pdf", k: "book" },
    { n: "Errichto — Binary Lifting (Kth Ancestor, Lowest Common Ancestor)", k: "video" },
    { n: "William Fiset — Sparse Table", k: "video" },
    { n: "CodeNCode — LCA using binary lifting", k: "video" }
  ],
  "math-interviews": [
    { n: "CP-Algorithms — Binary Exponentiation", u: "https://cp-algorithms.com/algebra/binary-exp.html", k: "article" },
    { n: "CP-Algorithms — Modular Multiplicative Inverse", u: "https://cp-algorithms.com/algebra/module-inverse.html", k: "article" },
    { n: "CP-Algorithms — Binomial Coefficients", u: "https://cp-algorithms.com/combinatorics/binomial-coefficients.html", k: "article", d: "nCr mod p with factorial tables" },
    { n: "Wikipedia — Reservoir sampling", u: "https://en.wikipedia.org/wiki/Reservoir_sampling", k: "article" },
    { n: "CSES Handbook — Ch. 22 Combinatorics + Ch. 24 Probability", u: "https://cses.fi/book/book.pdf", k: "book" },
    { n: "Luv — Binary exponentiation / modular arithmetic (Number theory playlist)", k: "playlist" },
    { n: "NeetCode — Random Pick with Weight / Linked List Random Node", k: "video" }
  ],
  "design-ds-hard": [
    { n: "take U forward (Striver) — LRU Cache / LFU Cache implementation", k: "video" },
    { n: "NeetCode — LRU Cache / Find Median from Data Stream / Design Twitter", k: "video" },
    { n: "Python docs — collections.OrderedDict (move_to_end, popitem)", u: "https://docs.python.org/3/library/collections.html#collections.OrderedDict", k: "docs" },
    { n: "Back To Back SWE — Implement An LRU Cache", k: "video" },
    { n: "Wikipedia — Cache replacement policies (LRU, LFU)", u: "https://en.wikipedia.org/wiki/Cache_replacement_policies", k: "article" },
    { n: "GeeksforGeeks — LFU Cache implementation O(1)", k: "article" }
  ],
  "interview-simulation": [
    { n: "Tech Interview Handbook — Coding interview techniques / best practices", u: "https://www.techinterviewhandbook.org/", k: "notes", d: "clarify, communicate, test" },
    { n: "Tech Interview Handbook — Algorithms study cheatsheet", u: "https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/", k: "notes" },
    { n: "NeetCode — Roadmap (NeetCode 150 by pattern)", u: "https://neetcode.io/roadmap", k: "course", d: "mixed practice sets" },
    { n: "take U forward (Striver) — SDE Sheet / mock interview videos", k: "video" },
    { n: "Google Careers — How to: Work at Google — Example Coding/Engineering Interview", k: "video", d: "what a real interviewer expects" },
    { n: "Errichto — How to practice / solve hard problems", k: "video" }
  ]

}});
