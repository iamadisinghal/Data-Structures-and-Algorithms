/* DSA part 1 of 3 — Level 0 (Foundations) + Level 1 (Linear structures & core patterns).
   dsa-2.js / dsa-3.js add further levels to the same tab (merged by id). */
PREP.add({
  id: 'dsa',
  order: 20,
  group: 'Core CS',
  title: 'Data Structures & Algorithms',
  short: 'DSA',
  blurb: 'Pattern-by-pattern, beginner to advanced — learn the idea, solve the set, remember the edge cases.',
  intro: [
    "<b>How to use this tab.</b> Work top to bottom: each level builds on the previous one. Inside a topic, first tick the <b>Learn</b> items (you can explain each idea out loud), then solve the <b>Practice</b> set in order (easy → hard), then read <b>Notes</b> (how to recognise the pattern) and <b>Cases</b> (edge cases to test before you say 'done'). The <b>Q&amp;A</b> checkboxes are the conceptual questions interviewers ask between problems — tick them only when you can answer crisply without looking.",
    "<b>Pattern first, not problem first.</b> Interviews reuse ~20 patterns (two pointers, sliding window, binary search on answer, monotonic stack, BFS/DFS, DP on subsequences, ...). For every problem you solve, write one line in your notes: <i>'signal in the statement → pattern → key invariant'</i>. That sentence is what you will recall in the interview, not the code. The code templates here are starting points — retype them from memory until they are automatic.",
    "<b>Solve routine (25-minute rule).</b> Read → restate the problem and constraints → write 2-3 examples incl. an edge case → state brute force and its complexity → optimise using the constraint table → code → dry-run on your examples. If you are stuck for <b>25 minutes</b> with no new idea, read only the hint / the pattern name, try 10 more minutes, then read the solution, close it, and re-code it from scratch. Mark any problem you needed help on with the <b>★ revisit</b> star.",
    "<b>Spaced revision &amp; targets.</b> Re-solve starred problems after ~3 days, ~1 week and ~1 month (the Revisit list collects them). A realistic switch target is <b>250-350 quality problems</b> (≈ 40% easy, 50% medium, 10% hard) over 3-4 months at 2-3 problems per weekday plus one timed mock contest a week (LeetCode weekly/biweekly). Aim to solve a typical medium in <b>20-25 minutes</b> including talking through the approach — speed and clean communication matter as much as correctness for product-company rounds."
  ],
  resources: [
    { n: 'NeetCode Roadmap / NeetCode 150', u: 'https://neetcode.io/roadmap', d: 'Pattern-ordered roadmap with a video explanation for every problem; the 150 list is the best single core set.' },
    { n: 'Blind 75 (original list)', u: 'https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU', d: 'The classic minimal list; do it first if short on time.' },
    { n: "Striver's A2Z DSA & SDE Sheet (takeuforward)", u: 'https://takeuforward.org/', d: 'Very thorough beginner→advanced sheet popular in Indian product-company prep; great article + video per problem.' },
    { n: 'LeetCode Study Plans (LeetCode 75, Top Interview 150)', u: 'https://leetcode.com/studyplan/', d: 'Structured topic plans inside LeetCode; good for daily streaks.' },
    { n: 'LeetCode Patterns (Sean Prashad)', u: 'https://seanprashad.com/leetcode-patterns/', d: 'Free Grokking-style list filterable by pattern and company.' },
    { n: 'Grokking the Coding Interview (Design Gurus)', u: 'https://www.designgurus.io/course/grokking-the-coding-interview', d: 'Paid, but the canonical pattern-by-pattern course (sliding window, fast/slow pointers, merge intervals, ...).' },
    { n: 'CSES Problem Set', u: 'https://cses.fi/problemset/', d: 'Clean classical problems (sorting, searching, DP, graphs, range queries) — excellent for building fundamentals.' },
    { n: 'CP-Algorithms', u: 'https://cp-algorithms.com/', d: 'Rigorous reference for number theory, strings, graphs and data structures with proofs and code.' },
    { n: 'Abdul Bari (YouTube)', u: 'https://www.youtube.com/@abdul_bari', d: 'Clear whiteboard lectures on complexity, recurrences, sorting, DP and graph algorithms.' },
    { n: 'William Fiset (YouTube)', u: 'https://www.youtube.com/@WilliamFiset-videos', d: 'Data structures and graph theory with animations and code (union-find, segment trees, Fenwick trees).' },
    { n: 'VisuAlgo', u: 'https://visualgo.net/en', d: 'Step-by-step animations of sorting, linked lists, heaps, BSTs, graphs — use when an algorithm will not click.' },
    { n: 'Big-O Cheat Sheet', u: 'https://www.bigocheatsheet.com/', d: 'One-page complexity table of common data structures and sorts for last-minute revision.' }
  ],
  levels: [
    /* ===================================================================== */
    {
      name: 'Level 0 · Foundations',
      desc: 'Complexity analysis, your interview language toolkit, basic math / number theory and recursion — the vocabulary every later topic assumes.',
      topics: [
        {
          id: 'complexity',
          title: 'Complexity analysis (Big-O, amortised, constraints)',
          est: '2–3 days',
          why: 'Every interview ends with "what is the time and space complexity?" — and the constraints tell you which complexity the intended solution has before you write a line.',
          learn: [
            "Big-O, Big-Ω, Big-Θ: upper / lower / tight bounds; drop constants and lower-order terms",
            "Common classes in order: <code>O(1) &lt; O(log n) &lt; O(√n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ) &lt; O(n!)</code>",
            "Counting loops: nested loops multiply, sequential loops add; loop with <code>i *= 2</code> is O(log n)",
            "Space complexity: auxiliary space vs input space; recursion stack counts as space",
            "Best / average / worst case (e.g. quicksort, hash table lookups)",
            "Amortised analysis: dynamic array append is O(1) amortised (doubling), monotonic stack is O(n) total",
            "Recursion tree method for recurrences like <code>T(n)=2T(n/2)+n</code>",
            "Master theorem: <code>T(n)=aT(n/b)+f(n)</code>, compare f(n) with <code>n^(log_b a)</code>",
            "Constraints → complexity table: n ≤ 10 → O(n!), n ≤ 20 → O(2ⁿ), n ≤ 500 → O(n³), n ≤ 5·10³ → O(n²), n ≤ 10⁵–10⁶ → O(n log n), n ≤ 10⁸ → O(n), larger → O(log n)/O(1)",
            "Rule of thumb: ~10⁸ simple ops/sec in C++/Java, ~10⁷ in Python"
          ],
          practice: [
            { t: 'Running Sum of 1d Array', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/running-sum-of-1d-array/' },
            { t: 'Contains Duplicate', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/contains-duplicate/' },
            { t: 'Missing Number', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/missing-number/' },
            { t: 'Find All Numbers Disappeared in an Array', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/' },
            { t: 'Fibonacci Number', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/fibonacci-number/' },
            { t: 'Climbing Stairs', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/climbing-stairs/' },
            { t: 'Sqrt(x)', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/sqrtx/' },
            { t: 'Theatre Square', p: 'CF', d: 'E', u: 'https://codeforces.com/problemset/problem/1/A' },
            { t: 'Weird Algorithm', p: 'CSES', d: 'E' },
            { t: 'Missing Number', p: 'CSES', d: 'E' },
            { t: 'Increasing Array', p: 'CSES', d: 'E' },
            { t: 'Count Primes', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/count-primes/' },
            { t: 'Pow(x, n)', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/powx-n/' }
          ],
          notes: [
            "Read constraints <b>first</b>: they are the biggest hint to the intended algorithm (n = 10⁵ means O(n²) will TLE).",
            "Halving the search space each step → O(log n); doing O(n) work at each of log n levels → O(n log n).",
            "Recursion: time ≈ (number of calls) × (work per call); space ≈ max recursion depth × frame size.",
            "Branching recursion with b branches and depth d → O(bᵈ) calls (naive Fibonacci ≈ O(1.618ⁿ), bounded by O(2ⁿ)).",
            "Master theorem cases: merge sort <code>2T(n/2)+n</code> → n log n; binary search <code>T(n/2)+1</code> → log n; <code>2T(n/2)+1</code> → n.",
            "Amortised ≠ average: amortised is a guarantee over any sequence of operations (no probability involved).",
            "Hash map operations are O(1) <i>expected</i>, O(n) worst case (collisions / adversarial inputs).",
            "Sorting is Ω(n log n) for comparison-based sorts — if you need better, look for counting/bucket/radix or a linear trick.",
            "Mention both time and space, and state what n (and m, k) mean when there are several inputs."
          ],
          cases: [
            "Hidden costs: string concatenation in a loop (O(n²) in Java/Python if naive), <code>list.pop(0)</code> and <code>x in list</code> are O(n).",
            "Slicing <code>arr[1:]</code> in recursion copies O(n) each call → O(n²) total; pass indices instead.",
            "Two inputs → complexity in both: O(n + m), O(n·m) — don't collapse to O(n).",
            "Sorting inside a loop silently adds a log factor (or worse).",
            "Recursion depth can hit limits (Python default 1000) even when time is fine.",
            "Output size counts: generating all subsets is at least O(n·2ⁿ) regardless of cleverness.",
            "Python on 10⁶–10⁷ ops can TLE on strict platforms even with the right Big-O; constant factors matter."
          ],
          qa: [
            { q: 'What does amortised O(1) mean for dynamic array append?', a: 'Most appends are O(1); occasionally the array doubles and copies n elements. Over n appends total copying is n + n/2 + n/4 ... ≤ 2n, so the <b>average cost per operation over any sequence</b> is O(1).' },
            { q: 'Solve T(n) = 2T(n/2) + O(n).', a: 'Recursion tree has log n levels, each doing O(n) total work → <b>O(n log n)</b> (Master theorem case 2: f(n) = Θ(n^(log₂2)) = Θ(n)).' },
            { q: 'Given n ≤ 10⁵, what complexity should you aim for?', a: 'About 10⁸ ops/sec budget → O(n²) = 10¹⁰ is too slow; aim for <b>O(n log n)</b> or O(n) (sorting, heaps, binary search, two pointers, hashing).' },
            { q: 'Is hash map lookup really O(1)?', a: 'Expected / average O(1) with a good hash and load factor; worst case O(n) when many keys collide (Java 8+ HashMap degrades to O(log n) per bucket using trees).' }
          ],
          code: `# Constraints -> target complexity (rough, ~1e8 ops/sec C++, ~1e7 Python)
# n <= 10        O(n!)        permutations / brute force
# n <= 20        O(2^n * n)   subsets / bitmask
# n <= 100-500   O(n^3)       Floyd-Warshall, interval DP
# n <= 5000      O(n^2)       2D DP, all pairs
# n <= 1e5-1e6   O(n log n)   sort, heap, binary search, segment tree
# n <= 1e7-1e8   O(n)         one pass, two pointers, prefix sums
# n >  1e9       O(log n)/O(1) math, binary search on answer

# Master theorem: T(n) = a*T(n/b) + f(n), compare f(n) with n^(log_b a)
#   f smaller  -> T = Theta(n^(log_b a))
#   f equal    -> T = Theta(n^(log_b a) * log n)
#   f larger   -> T = Theta(f(n))`
        },
        {
          id: 'lang-toolkit',
          title: 'Language toolkit for interviews (Python + C++/Java notes)',
          est: '2–3 days',
          why: 'Fluency with the standard library saves 5-10 minutes per problem and avoids bugs; interviewers expect idiomatic use of heaps, maps, sorting with keys.',
          learn: [
            "Python lists: append/pop O(1) at end, insert/pop(0) O(n); slicing copies",
            "<code>dict</code>, <code>set</code>, <code>collections.Counter</code>, <code>defaultdict(list)</code>, <code>OrderedDict</code> (LRU)",
            "<code>collections.deque</code>: O(1) appendleft/popleft — use for queues and BFS",
            "<code>heapq</code> is a <b>min-heap</b>: heappush/heappop/heapify/nlargest; push <code>-x</code> or tuples <code>(-priority, item)</code> for max-heap",
            "<code>bisect_left / bisect_right</code> for lower / upper bound on a sorted list",
            "Sorting: <code>sorted(a, key=lambda x: (x[1], -x[0]))</code>, <code>reverse=True</code>, <code>functools.cmp_to_key</code> for custom comparators; Timsort is stable",
            "<code>sys.setrecursionlimit</code>, <code>functools.lru_cache / cache</code> for memoisation, <code>itertools</code> (accumulate, combinations, permutations, product)",
            "Integers: Python ints are arbitrary precision; Java <code>int</code> overflows at 2³¹-1, use <code>long</code>; C++ use <code>long long</code>",
            "C++ equivalents: <code>vector, unordered_map, map (ordered), set, priority_queue (max-heap by default), deque, lower_bound/upper_bound, sort with lambda</code>",
            "Java equivalents: <code>ArrayList, HashMap, TreeMap (floorKey/ceilingKey), PriorityQueue (min-heap), ArrayDeque, Collections.sort / Arrays.sort with Comparator</code>"
          ],
          practice: [
            { t: 'Valid Anagram', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/valid-anagram/' },
            { t: 'Relative Sort Array', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/relative-sort-array/' },
            { t: 'Sort Array by Increasing Frequency', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/sort-array-by-increasing-frequency/' },
            { t: 'Search Insert Position', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/search-insert-position/' },
            { t: 'Kth Largest Element in a Stream', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
            { t: 'Design HashMap', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/design-hashmap/' },
            { t: 'Group Anagrams', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/group-anagrams/' },
            { t: 'Top K Frequent Elements', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/top-k-frequent-elements/' },
            { t: 'Sort Characters By Frequency', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/sort-characters-by-frequency/' },
            { t: 'Kth Largest Element in an Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
            { t: 'Sort an Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/sort-an-array/' },
            { t: 'Largest Number', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/largest-number/' },
            { t: 'Time Based Key-Value Store', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/time-based-key-value-store/' },
            { t: 'LRU Cache', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/lru-cache/' }
          ],
          notes: [
            "Pick <b>one</b> interview language and stay with it; Python is fastest to write, Java/C++ are fine but know overflow rules.",
            "Counting anything → <code>Counter</code>; grouping → <code>defaultdict(list)</code>; seen-before → <code>set</code>.",
            "'Top k', 'k-th largest', 'merge k' → heap of size k: O(n log k).",
            "Sorted list + 'first ≥ x' / 'count ≤ x' → <code>bisect</code>; in Java use <code>TreeMap/TreeSet</code>, in C++ <code>std::set::lower_bound</code>.",
            "Tuples compare lexicographically — <code>heappush(h, (dist, node))</code> works; add a tie-breaker counter if items are not comparable.",
            "<code>cmp_to_key(lambda a, b: ...)</code> returns negative/zero/positive like Java's Comparator.",
            "Python has no built-in ordered set / TreeMap: use <code>bisect.insort</code> (O(n) insert) or <code>sortedcontainers.SortedList</code> where allowed.",
            "Memoise recursive DP quickly with <code>@cache</code>; mention you would convert to iterative if depth is large."
          ],
          cases: [
            "<code>[[0]*m]*n</code> creates n references to the <b>same</b> row — use <code>[[0]*m for _ in range(n)]</code>.",
            "Mutable default args (<code>def f(a=[])</code>) persist across calls.",
            "<code>heapq</code> with equal priorities compares the next tuple element — may crash on non-comparable objects.",
            "Java: <code>Integer</code> objects compared with <code>==</code> fail outside -128..127; use <code>.equals</code>.",
            "Java/C++: <code>(a + b) / 2</code> and <code>a * b</code> overflow; comparator <code>a - b</code> overflows — use <code>Integer.compare</code>.",
            "C++ <code>priority_queue</code> is max-heap by default; Java <code>PriorityQueue</code> and Python <code>heapq</code> are min-heaps.",
            "Python recursion limit 1000 → <code>RecursionError</code> on deep DFS (e.g. 10⁵ nodes in a line); raise limit or go iterative.",
            "Modifying a dict/set while iterating over it raises an error — iterate over a copy (<code>list(d)</code>)."
          ],
          qa: [
            { q: 'How do you get a max-heap in Python?', a: 'heapq only provides a min-heap, so push negated keys (<code>heappush(h, -x)</code>) or tuples <code>(-priority, item)</code>, and negate when popping.' },
            { q: 'Is Python sort stable and what algorithm is it?', a: 'Yes, <b>Timsort</b> (hybrid merge + insertion sort), stable, O(n log n) worst case, O(n) on already sorted runs. Stability allows multi-key sorts by sorting on secondary key first.' },
            { q: 'Why does Java comparator <code>(a, b) -> a - b</code> sometimes fail?', a: 'Subtraction can overflow for large magnitudes with opposite signs, producing the wrong sign. Use <code>Integer.compare(a, b)</code>.' }
          ],
          code: `from collections import Counter, defaultdict, deque, OrderedDict
import heapq, bisect, sys
from functools import cache, cmp_to_key
sys.setrecursionlimit(10**6)

cnt = Counter(nums)                    # frequency map
groups = defaultdict(list)             # grouping
q = deque([start]); q.popleft()        # O(1) queue

h = []                                 # min-heap; push -x for max-heap
heapq.heappush(h, (dist, node)); d, u = heapq.heappop(h)
top_k = heapq.nlargest(k, cnt.keys(), key=cnt.get)

i = bisect.bisect_left(a, x)           # first index with a[i] >= x
j = bisect.bisect_right(a, x)          # first index with a[j] >  x

people.sort(key=lambda p: (-p[0], p[1]))           # multi-key sort
def cmp(a, b): return -1 if a + b > b + a else 1    # custom comparator
nums_s = sorted(map(str, nums), key=cmp_to_key(cmp))

@cache
def dp(i): ...                        # memoised recursion`
        },
        {
          id: 'math-basics',
          title: 'Basic math & number theory',
          est: '2–3 days',
          why: 'Appears as warm-ups (palindrome number, reverse integer) and as building blocks (mod 1e9+7, fast power, gcd) inside DP/combinatorics problems.',
          learn: [
            "Digit manipulation: extract with <code>n % 10</code>, drop with <code>n // 10</code>; reverse and palindrome checks",
            "GCD by Euclid: <code>gcd(a, b) = gcd(b, a % b)</code>, O(log min(a,b)); <code>lcm = a // gcd(a,b) * b</code>",
            "Primality test in O(√n); counting divisors by pairing d and n/d",
            "Sieve of Eratosthenes O(n log log n); smallest-prime-factor sieve for fast factorisation",
            "Modular arithmetic: (a+b)%m, (a·b)%m, subtraction <code>(a - b + m) % m</code>; why 10⁹+7 (large prime)",
            "Fast exponentiation (binary exponentiation) O(log n), including negative exponents",
            "Modular inverse via Fermat: <code>a^(m-2) mod m</code> when m is prime; nCr mod p with factorials",
            "Overflow awareness: int32 range ±2.1·10⁹, int64 ±9.2·10¹⁸; reverse-integer style bounds checks",
            "Base conversion (binary, base-26 Excel columns), floor vs truncation for negatives"
          ],
          practice: [
            { t: 'Fizz Buzz', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/fizz-buzz/' },
            { t: 'Palindrome Number', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/palindrome-number/' },
            { t: 'Plus One', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/plus-one/' },
            { t: 'Add Binary', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/add-binary/' },
            { t: 'Happy Number', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/happy-number/' },
            { t: 'Ugly Number', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/ugly-number/' },
            { t: 'Find Greatest Common Divisor of Array', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/find-greatest-common-divisor-of-array/' },
            { t: 'Greatest Common Divisor of Strings', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/greatest-common-divisor-of-strings/' },
            { t: 'Excel Sheet Column Title', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/excel-sheet-column-title/' },
            { t: 'Sieve of Eratosthenes', p: 'GFG', d: 'E' },
            { t: 'Reverse Integer', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/reverse-integer/' },
            { t: 'Factorial Trailing Zeroes', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/factorial-trailing-zeroes/' },
            { t: 'Count Primes', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/count-primes/' },
            { t: 'Pow(x, n)', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/powx-n/' },
            { t: 'Multiply Strings', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/multiply-strings/' },
            { t: 'Ugly Number II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/ugly-number-ii/' },
            { t: 'Exponentiation', p: 'CSES', d: 'M' },
            { t: 'Counting Divisors', p: 'CSES', d: 'M' },
            { t: 'Super Pow', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/super-pow/' }
          ],
          notes: [
            "'Return the answer modulo 10⁹+7' → result is huge; reduce after <b>every</b> + and × (and use fast power / modular inverse for division).",
            "'Count primes below n' or many primality queries → sieve; a single query → trial division to √n.",
            "Cycle detection in a numeric process (Happy Number) → set of seen values or Floyd fast/slow.",
            "Trailing zeros of n! = count of factor 5: <code>n//5 + n//25 + ...</code>.",
            "Big-number arithmetic on strings (Add Binary, Multiply Strings) → grade-school algorithm from the right with carry.",
            "Excel column is base-26 <b>without zero</b>: subtract 1 before each <code>% 26</code>.",
            "gcd is associative: gcd of an array = fold gcd; gcd of strings works iff <code>s+t == t+s</code>."
          ],
          cases: [
            "n = 0, n = 1, negative numbers (negative palindrome is false; Python <code>-7 // 2 == -4</code>, <code>-7 % 3 == 2</code> unlike C++/Java).",
            "Reverse Integer: result must fit 32-bit — check bounds <b>before</b> multiplying by 10 in Java/C++.",
            "<code>Pow(x, n)</code> with n = -2³¹: negating overflows in 32-bit; also x = 0 with negative n.",
            "Modular subtraction can go negative in C++/Java — add m before taking %.",
            "Floating point: avoid <code>sqrt</code> equality checks; use integer <code>i * i &lt;= n</code>.",
            "Sieve size n+1 and correct start (<code>i*i</code>), and Count Primes is 'less than n' (strict).",
            "Leading zeros in string arithmetic results ('0' * anything = '0')."
          ],
          qa: [
            { q: 'Why is Euclid\'s algorithm O(log min(a, b))?', a: 'After two steps the larger number at least halves (a % b &lt; a/2 when b ≤ a), so the number of steps is logarithmic — worst case is consecutive Fibonacci numbers.' },
            { q: 'How does binary exponentiation work?', a: 'Write n in binary; square the base each step and multiply into the result when the current bit is 1. x^n = (x^(n/2))² (× x if n odd) → O(log n) multiplications.' },
            { q: 'How do you divide under a prime modulus?', a: 'Multiply by the modular inverse. For prime p and a not divisible by p, Fermat gives <code>a^(p-2) ≡ a⁻¹ (mod p)</code>, computed with fast power. Precompute factorials and inverse factorials for nCr.' },
            { q: 'Why is the sieve O(n log log n)?', a: 'Each prime p crosses out n/p multiples; summing n/p over primes ≤ n gives n·Σ1/p ≈ n log log n.' }
          ],
          code: `MOD = 10**9 + 7

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def power(base, exp, mod=MOD):        # binary exponentiation, O(log exp)
    result, base = 1, base % mod
    while exp > 0:
        if exp & 1:
            result = result * base % mod
        base = base * base % mod
        exp >>= 1
    return result

def sieve(n):                         # primes < n, O(n log log n)
    if n < 3: return []
    is_p = [True] * n
    is_p[0] = is_p[1] = False
    for i in range(2, int(n ** 0.5) + 1):
        if is_p[i]:
            for j in range(i * i, n, i):
                is_p[j] = False
    return [i for i in range(n) if is_p[i]]

inv = lambda a: power(a, MOD - 2)     # modular inverse (MOD prime)`
        },
        {
          id: 'recursion-basics',
          title: 'Recursion basics',
          est: '3–4 days',
          why: 'Recursion is the foundation of trees, backtracking, divide & conquer and DP; interviewers watch whether you can define base cases and trust the recursive call.',
          learn: [
            "Anatomy: base case(s), recursive case, progress toward the base case",
            "The call stack: each call gets a frame; stack overflow when depth is too large",
            "'Leap of faith': assume the function works for smaller input, combine results",
            "Head vs tail recursion; why Python/Java do not optimise tail calls",
            "Parameterised vs functional recursion (pass accumulator down vs return value up)",
            "Multiple recursion and recursion trees (Fibonacci) — overlapping subproblems → memoisation",
            "Pick / not-pick pattern for subsets and subsequences",
            "Divide & conquer: split, solve halves, merge (merge sort, fast power)",
            "Converting recursion to iteration with an explicit stack"
          ],
          practice: [
            { t: 'Fibonacci Number', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/fibonacci-number/' },
            { t: 'Reverse String', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/reverse-string/' },
            { t: 'Power of Two', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/power-of-two/' },
            { t: 'Merge Two Sorted Lists', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
            { t: 'Maximum Depth of Binary Tree', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
            { t: 'Tower of Hanoi', p: 'GFG', d: 'M' },
            { t: 'Pow(x, n)', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/powx-n/' },
            { t: 'K-th Symbol in Grammar', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/k-th-symbol-in-grammar/' },
            { t: 'Find the Winner of the Circular Game', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/find-the-winner-of-the-circular-game/' },
            { t: 'Subsets', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/subsets/' },
            { t: 'Generate Parentheses', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/generate-parentheses/' },
            { t: 'Letter Combinations of a Phone Number', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },
            { t: 'Permutations', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/permutations/' },
            { t: 'Creating Strings', p: 'CSES', d: 'M' },
            { t: 'Different Ways to Add Parentheses', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/different-ways-to-add-parentheses/' }
          ],
          notes: [
            "Signal: the problem is defined in terms of a smaller version of itself (trees, 'all combinations', 'n-th term', nested structures).",
            "Write the function contract first: <i>'f(i) returns ... for the suffix starting at i'</i>. Then base case, then the combine step.",
            "If the same arguments repeat in the recursion tree → memoise (this is top-down DP).",
            "'Generate all ...' → backtracking: choose, recurse, un-choose; complexity is usually output-sized (2ⁿ, n!).",
            "Josephus (Find the Winner): <code>J(n,k) = (J(n-1,k) + k) % n</code> — classic recursion-on-n insight.",
            "Divide and conquer on expressions (Different Ways to Add Parentheses): split at every operator, combine left × right results."
          ],
          cases: [
            "Missing or wrong base case → infinite recursion; check n = 0 and n = 1 separately.",
            "Deep recursion (linked list / skewed tree of 10⁵) → stack overflow in Python/Java; use iteration.",
            "Mutating a shared list in backtracking: append a <b>copy</b> (<code>path[:]</code>) to results.",
            "Exponential blow-up without memoisation (naive Fibonacci n = 50).",
            "Slicing arguments (<code>s[1:]</code>) costs O(n) per call — pass indices.",
            "Negative exponent in Pow and integer division rounding for odd n."
          ],
          qa: [
            { q: 'What is the space complexity of recursive DFS on a tree?', a: 'O(h) for the call stack where h is the height: O(log n) for balanced trees, O(n) for a skewed tree.' },
            { q: 'Recursion vs iteration — when do you prefer each?', a: 'Recursion is clearer for trees, backtracking and divide & conquer. Prefer iteration when depth can be large (stack overflow), in hot loops (call overhead) or when a simple loop suffices. Any recursion can be converted using an explicit stack.' },
            { q: 'What is tail recursion and does Python optimise it?', a: 'A call is tail-recursive if the recursive call is the last operation, so the frame could be reused. Python and Java do <b>not</b> do tail-call optimisation; Scheme / some C++ compilers do.' }
          ],
          code: `# 1) Functional recursion: trust the smaller call
def depth(node):
    if not node:                      # base case
        return 0
    return 1 + max(depth(node.left), depth(node.right))

# 2) Pick / not-pick (subsets) with backtracking
def subsets(nums):
    res, path = [], []
    def go(i):
        if i == len(nums):
            res.append(path[:])       # copy!
            return
        path.append(nums[i]); go(i + 1); path.pop()   # pick
        go(i + 1)                                     # not pick
    go(0)
    return res

# 3) Divide & conquer: fast power
def my_pow(x, n):
    if n < 0: return 1 / my_pow(x, -n)
    if n == 0: return 1.0
    half = my_pow(x, n // 2)
    return half * half * (x if n % 2 else 1)`
        }
      ]
    },

    /* ===================================================================== */
    {
      name: 'Level 1 · Linear structures & core patterns',
      desc: 'Arrays, strings, linked lists, stacks/queues and the core patterns built on them — hashing, prefix sums, two pointers, sliding window, sorting, binary search, intervals, matrices and bits. Roughly half of all interview questions live here.',
      topics: [
        {
          id: 'arrays-hashing',
          title: 'Arrays & hashing',
          est: '4–5 days',
          why: 'The most common interview category; hash maps turn O(n²) pair searches into O(n) and are the first optimisation interviewers expect.',
          learn: [
            "Array operations and their costs: index O(1), insert/delete in middle O(n)",
            "Hash map / hash set: O(1) expected lookup; how hashing and collisions (chaining / open addressing) work",
            "Complement lookup: store what you've seen, check <code>target - x</code> (Two Sum)",
            "Frequency counting and bucket sort by frequency (Top K Frequent in O(n))",
            "Canonical keys for grouping: sorted string or 26-count tuple (Group Anagrams)",
            "Kadane's algorithm for maximum subarray",
            "In-place tricks: index as hash (mark <code>nums[abs(x)-1]</code> negative), cyclic sort for 1..n",
            "Boyer–Moore majority vote (n/2 and n/3 variants)",
            "Next permutation algorithm and array rotation by reversal"
          ],
          practice: [
            { t: 'Two Sum', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/two-sum/' },
            { t: 'Contains Duplicate', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/contains-duplicate/' },
            { t: 'Valid Anagram', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/valid-anagram/' },
            { t: 'Majority Element', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/majority-element/' },
            { t: 'Best Time to Buy and Sell Stock', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
            { t: 'Leaders in an array', p: 'GFG', d: 'E' },
            { t: 'Group Anagrams', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/group-anagrams/' },
            { t: 'Top K Frequent Elements', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/top-k-frequent-elements/' },
            { t: 'Product of Array Except Self', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/product-of-array-except-self/' },
            { t: 'Valid Sudoku', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/valid-sudoku/' },
            { t: 'Encode and Decode Strings', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/encode-and-decode-strings/' },
            { t: 'Longest Consecutive Sequence', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
            { t: 'Maximum Subarray', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/maximum-subarray/' },
            { t: 'Rotate Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/rotate-array/' },
            { t: 'Majority Element II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/majority-element-ii/' },
            { t: 'Next Permutation', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/next-permutation/' },
            { t: 'Insert Delete GetRandom O(1)', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/insert-delete-getrandom-o1/' },
            { t: 'First Missing Positive', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/first-missing-positive/' }
          ],
          notes: [
            "Signals: 'find a pair / duplicate / frequency / exists', 'group by', 'in O(n)' → hash map or set.",
            "Pair-sum in unsorted array → one-pass hash map of value → index; sorted array → two pointers instead.",
            "'Longest consecutive' in O(n) → put all in a set, only start counting from x where <code>x-1</code> is absent.",
            "'Without division' / 'except self' → prefix product × suffix product.",
            "Values in range 1..n and O(1) extra space → use the array itself as the hash (sign marking or cyclic swaps).",
            "Kadane: <code>cur = max(x, cur + x)</code>; best = max(best, cur). Track start index if the subarray is needed.",
            "Top-k by frequency: heap O(n log k) or bucket by count O(n).",
            "Design O(1) insert/delete/random → array + map value→index; delete by swapping with the last element."
          ],
          cases: [
            "Empty array, single element, all identical elements.",
            "Negative numbers and zero (Kadane with all negatives must return the max element, not 0).",
            "Two Sum: same element used twice (check map <b>before</b> inserting current), duplicates like [3,3].",
            "Product except self with one zero vs two or more zeros.",
            "Rotate by k ≥ n → use <code>k % n</code>.",
            "Hash keys: lists are unhashable in Python — use tuples; in Java arrays use <code>Arrays.toString</code> or a string key.",
            "Encode/Decode: strings may contain the delimiter — use length-prefix encoding (<code>len#str</code>).",
            "Integer overflow when summing large values in Java/C++."
          ],
          qa: [
            { q: 'How does a hash map achieve O(1) lookup and what can make it O(n)?', a: 'Keys are hashed to a bucket index; with a good hash and load factor kept below a threshold (resize/rehash when exceeded), buckets stay O(1) in expectation. Many collisions (bad hash or adversarial keys) degrade a bucket to O(n) (Java 8 treeifies to O(log n)).' },
            { q: 'Explain Boyer–Moore majority vote.', a: 'Keep a candidate and count; on a match increment, on a mismatch decrement, and when the count hits 0 take the current element as the new candidate. Pairs of different elements cancel, so a value occurring &gt; n/2 times survives. O(n) time, O(1) space; verify with a second pass if a majority is not guaranteed.' },
            { q: 'Why is Longest Consecutive Sequence O(n) and not O(n²)?', a: 'We only start walking from numbers whose predecessor is absent, so each number is visited by at most one walk — total work is O(n) across all starts.' }
          ],
          code: `def two_sum(nums, target):
    seen = {}                          # value -> index
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i
    return []

def max_subarray(nums):                # Kadane
    best = cur = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best

def top_k_frequent(nums, k):           # bucket sort by frequency, O(n)
    from collections import Counter
    buckets = [[] for _ in range(len(nums) + 1)]
    for x, c in Counter(nums).items():
        buckets[c].append(x)
    res = []
    for c in range(len(buckets) - 1, 0, -1):
        for x in buckets[c]:
            res.append(x)
            if len(res) == k:
                return res
    return res`
        },
        {
          id: 'prefix-sums',
          title: 'Prefix sums & difference arrays',
          est: '2–3 days',
          why: 'Turns range-sum queries into O(1) and powers the very common "count subarrays with sum = k" family (prefix sum + hash map).',
          learn: [
            "Build prefix array <code>P[i+1] = P[i] + a[i]</code>; range sum <code>sum(l..r) = P[r+1] - P[l]</code>",
            "Prefix sum + hash map: count subarrays with sum k using counts of <code>P - k</code>",
            "Store first index of each prefix for 'longest subarray with sum k'",
            "Prefix modulo: subarray sum divisible by k ⇔ equal prefix remainders",
            "Transform trick: map 0 → -1 (Contiguous Array), odd → 1 / even → 0 (Nice Subarrays)",
            "Prefix and suffix products / maxima (Product Except Self, Trapping Rain Water precompute)",
            "2D prefix sums with inclusion–exclusion",
            "Difference array: range add in O(1) via <code>d[l] += v; d[r+1] -= v</code>, then prefix-sum once",
            "Prefix sums on trees (Path Sum III) — same hash map idea along a root-to-node path"
          ],
          practice: [
            { t: 'Running Sum of 1d Array', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/running-sum-of-1d-array/' },
            { t: 'Find Pivot Index', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/find-pivot-index/' },
            { t: 'Range Sum Query - Immutable', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/range-sum-query-immutable/' },
            { t: 'Static Range Sum Queries', p: 'CSES', d: 'E' },
            { t: 'Range Sum Query 2D - Immutable', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/range-sum-query-2d-immutable/' },
            { t: 'Subarray Sum Equals K', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
            { t: 'Longest Sub-Array with Sum K', p: 'GFG', d: 'M' },
            { t: 'Contiguous Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/contiguous-array/' },
            { t: 'Continuous Subarray Sum', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/continuous-subarray-sum/' },
            { t: 'Subarray Sums Divisible by K', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/subarray-sums-divisible-by-k/' },
            { t: 'Count Number of Nice Subarrays', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/count-number-of-nice-subarrays/' },
            { t: 'Corporate Flight Bookings', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/corporate-flight-bookings/' },
            { t: 'Car Pooling', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/car-pooling/' },
            { t: 'Forest Queries', p: 'CSES', d: 'M' },
            { t: 'Path Sum III', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/path-sum-iii/' },
            { t: 'Number of Submatrices That Sum to Target', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/' }
          ],
          notes: [
            "Signals: 'sum of subarray', 'many range queries', 'number of subarrays with sum / count equal to k', 'equal number of 0s and 1s'.",
            "If numbers can be <b>negative</b>, sliding window fails for sum-k problems → prefix sum + hash map is the answer.",
            "Count version: <code>ans += freq[P - k]</code> then <code>freq[P] += 1</code>; seed <code>freq[0] = 1</code>.",
            "Longest version: store <b>first</b> occurrence of each prefix; length = i - first[P - k].",
            "Many range <b>updates</b>, one final read → difference array; interleaved updates and queries → Fenwick / segment tree (later level).",
            "2D: <code>S[r][c] = a + S[r-1][c] + S[r][c-1] - S[r-1][c-1]</code>; query subtracts two strips and adds back the corner.",
            "Submatrix sum = target: fix row pair (O(R²)), compress columns, run 1D subarray-sum-k → O(R²·C)."
          ],
          cases: [
            "Forgetting the seed <code>{0: 1}</code> (count) or <code>{0: -1}</code> (longest) misses subarrays starting at index 0.",
            "Off-by-one: use length n+1 prefix array with P[0] = 0 to avoid special cases.",
            "Negative modulo in Java/C++: normalise with <code>((P % k) + k) % k</code>.",
            "Continuous Subarray Sum requires length ≥ 2 — store first index, not count.",
            "Difference array needs size n+1 (or check <code>r+1 &lt; n</code>).",
            "Overflow of prefix sums in Java/C++ — use long.",
            "k = 0 cases and arrays of all zeros (many overlapping answers)."
          ],
          qa: [
            { q: 'Why does sliding window fail for "subarray sum equals k" with negative numbers?', a: 'Sliding window needs monotonicity: extending the window must never decrease the sum. With negatives, shrinking or growing can move the sum either way, so you cannot decide which pointer to move. Prefix sums + a hash map work for any values in O(n).' },
            { q: 'How does a difference array support range updates?', a: 'Adding v to a[l..r] becomes d[l] += v and d[r+1] -= v (O(1)). Taking the prefix sum of d reconstructs the final array in O(n), so q updates cost O(q + n) instead of O(q·n).' },
            { q: 'Why are subarray sums divisible by k counted by equal remainders?', a: 'sum(i..j) = P[j+1] - P[i]; it is divisible by k iff P[j+1] ≡ P[i] (mod k). So count pairs of equal remainders: for each remainder with count c, add c·(c-1)/2 (or accumulate on the fly).' }
          ],
          code: `def subarray_sum_k(nums, k):           # count subarrays with sum == k
    from collections import defaultdict
    freq = defaultdict(int); freq[0] = 1
    pre = ans = 0
    for x in nums:
        pre += x
        ans += freq[pre - k]
        freq[pre] += 1
    return ans

def range_add(n, updates):              # difference array
    d = [0] * (n + 1)
    for l, r, v in updates:            # inclusive l..r
        d[l] += v
        d[r + 1] -= v
    res, run = [], 0
    for i in range(n):
        run += d[i]
        res.append(run)
    return res

# 2D prefix: S has an extra row/col of zeros
# S[r+1][c+1] = M[r][c] + S[r][c+1] + S[r+1][c] - S[r][c]
# sum(r1..r2, c1..c2) = S[r2+1][c2+1] - S[r1][c2+1] - S[r2+1][c1] + S[r1][c1]`
        },
        {
          id: 'two-pointers',
          title: 'Two pointers',
          est: '3–4 days',
          why: 'Top-5 interview pattern; turns many O(n²) pair/triplet searches on sorted data into O(n) and is the basis of in-place array edits.',
          learn: [
            "Opposite-ends pointers on a sorted array (pair sum, palindrome check)",
            "Same-direction read/write pointers for in-place edits (remove duplicates, move zeroes)",
            "Merging two sorted arrays / lists with one pointer each (fill from the back when in-place)",
            "Reduce k-sum to (k-1)-sum: sort, fix one element, two-pointer the rest (3Sum, 4Sum)",
            "Skipping duplicates correctly after sorting",
            "Greedy pointer moves with a proof: move the shorter side (Container With Most Water)",
            "Dutch national flag (three pointers: low, mid, high)",
            "Two pointers with running max from both ends (Trapping Rain Water in O(1) space)"
          ],
          practice: [
            { t: 'Valid Palindrome', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/valid-palindrome/' },
            { t: 'Merge Sorted Array', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/merge-sorted-array/' },
            { t: 'Remove Duplicates from Sorted Array', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
            { t: 'Move Zeroes', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/move-zeroes/' },
            { t: 'Squares of a Sorted Array', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/squares-of-a-sorted-array/' },
            { t: 'Is Subsequence', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/is-subsequence/' },
            { t: 'Two Sum II - Input Array Is Sorted', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
            { t: 'Sum of Two Values', p: 'CSES', d: 'M' },
            { t: '3Sum', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/3sum/' },
            { t: '3Sum Closest', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/3sum-closest/' },
            { t: 'Container With Most Water', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/container-with-most-water/' },
            { t: 'Sort Colors', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/sort-colors/' },
            { t: 'Remove Duplicates from Sorted Array II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/' },
            { t: 'Boats to Save People', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/boats-to-save-people/' },
            { t: 'Apartments', p: 'CSES', d: 'M' },
            { t: '4Sum', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/4sum/' },
            { t: 'Trapping Rain Water', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/trapping-rain-water/' }
          ],
          notes: [
            "Signals: <b>sorted</b> input (or you can sort), 'pair / triplet with sum', 'in-place', 'O(1) extra space', palindrome, merging.",
            "Opposite ends: if sum &lt; target move left up, if &gt; move right down — each step discards a row/column of the pair matrix.",
            "Read/write: <code>w</code> marks the end of the kept prefix; <code>r</code> scans; copy when the element should be kept.",
            "Allowing at most k duplicates: keep <code>nums[r]</code> if <code>w &lt; k or nums[r] != nums[w-k]</code>.",
            "k-Sum after sorting: O(n^(k-1)); 3Sum is O(n²) — sorting cost O(n log n) is dominated.",
            "Need original indices? Sorting destroys them → store (value, index) pairs or use a hash map instead.",
            "Trapping Rain Water: water at i = min(maxL, maxR) - h[i]; move the side with the smaller max."
          ],
          cases: [
            "Empty array, one element, all equal elements.",
            "Duplicate triplets in 3Sum — skip equal values for the fixed index <b>and</b> after a match for both pointers.",
            "Pointer crossing condition: <code>l &lt; r</code> vs <code>l &lt;= r</code> (same element used twice?).",
            "Merge in place: fill from the end to avoid overwriting unread values; handle leftover of the second array.",
            "Valid Palindrome: skip non-alphanumerics and compare case-insensitively; string of only symbols is true.",
            "Squares of sorted array with negatives — largest squares are at the ends.",
            "4Sum overflow in Java (sum of four ints) — use long."
          ],
          qa: [
            { q: 'Why is it safe to move the shorter line in Container With Most Water?', a: 'Area is limited by the shorter line. Moving the taller line inward can only shrink width while height stays ≤ the shorter line, so no better area exists with the shorter line; we can discard it.' },
            { q: 'How do you avoid duplicate triplets in 3Sum without a set?', a: 'Sort; skip i if nums[i] == nums[i-1]; after finding a triplet, advance l while nums[l] == nums[l-1] and r while nums[r] == nums[r+1].' },
            { q: 'Two pointers vs hash map for Two Sum — trade-offs?', a: 'Hash map: O(n) time, O(n) space, works unsorted and keeps indices. Two pointers: O(1) extra space but needs sorted input (sorting costs O(n log n) and loses indices).' }
          ],
          code: `def pair_sum_sorted(a, target):        # opposite ends
    l, r = 0, len(a) - 1
    while l < r:
        s = a[l] + a[r]
        if s == target: return [l, r]
        if s < target: l += 1
        else: r -= 1
    return []

def three_sum(nums):
    nums.sort(); res = []
    for i in range(len(nums) - 2):
        if i and nums[i] == nums[i - 1]: continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s < 0: l += 1
            elif s > 0: r -= 1
            else:
                res.append([nums[i], nums[l], nums[r]])
                l += 1; r -= 1
                while l < r and nums[l] == nums[l - 1]: l += 1
    return res

def remove_dups(nums):                   # read / write pointers
    w = 0
    for r in range(len(nums)):
        if w == 0 or nums[r] != nums[w - 1]:
            nums[w] = nums[r]; w += 1
    return w`
        },
        {
          id: 'sliding-window',
          title: 'Sliding window (fixed + variable)',
          est: '4–5 days',
          why: 'Extremely common for substring / subarray questions at product companies; interviewers love the "longest / shortest substring with condition" family.',
          learn: [
            "Fixed-size window: add the incoming element, remove the outgoing one (size k)",
            "Variable window for <b>longest</b> valid: expand right, shrink left while invalid, record after shrinking",
            "Variable window for <b>shortest</b> valid: expand right, while valid record and shrink",
            "Window state: counts in a hash map / array of 26, number of distinct, number of 'satisfied' chars",
            "Why it works: monotonic validity (if a window is valid, its sub-windows are too, or vice versa)",
            "'Exactly K' = atMost(K) - atMost(K-1)",
            "Character replacement trick: window valid if <code>len - maxFreq ≤ k</code>",
            "Monotonic deque for window max / min in O(n)"
          ],
          practice: [
            { t: 'Maximum Average Subarray I', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/maximum-average-subarray-i/' },
            { t: 'Contains Duplicate II', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/contains-duplicate-ii/' },
            { t: 'Best Time to Buy and Sell Stock', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
            { t: 'Maximum Number of Vowels in a Substring of Given Length', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/' },
            { t: 'Longest Substring Without Repeating Characters', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
            { t: 'Max Consecutive Ones III', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/max-consecutive-ones-iii/' },
            { t: 'Fruit Into Baskets', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/fruit-into-baskets/' },
            { t: 'Longest K unique characters substring', p: 'GFG', d: 'M' },
            { t: 'Longest Repeating Character Replacement', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
            { t: 'Permutation in String', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/permutation-in-string/' },
            { t: 'Find All Anagrams in a String', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/' },
            { t: 'Minimum Size Subarray Sum', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/minimum-size-subarray-sum/' },
            { t: 'Subarray Product Less Than K', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/subarray-product-less-than-k/' },
            { t: 'Binary Subarrays With Sum', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/binary-subarrays-with-sum/' },
            { t: 'Minimum Window Substring', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/minimum-window-substring/' },
            { t: 'Sliding Window Maximum', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/sliding-window-maximum/' },
            { t: 'Subarrays with K Different Integers', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/subarrays-with-k-different-integers/' }
          ],
          notes: [
            "Signals: <b>contiguous</b> subarray/substring + 'longest / shortest / count / at most k / contains all of' + usually non-negative values.",
            "Fixed window when k is given; variable window when the constraint is a condition (≤ k distinct, sum ≥ target, no repeats).",
            "Count of subarrays satisfying an 'at most' condition: add <code>r - l + 1</code> at each r.",
            "'Exactly k' is not monotonic → compute atMost(k) - atMost(k-1).",
            "Anagram / permutation of p inside s → fixed window of len(p) comparing 26-count arrays (or a 'matches' counter).",
            "Minimum Window Substring: track <code>need</code> counts and <code>formed</code> (chars whose count is met); shrink while formed == required.",
            "Each element enters and leaves the window once → O(n) time even with a nested while loop."
          ],
          cases: [
            "k &gt; n, k = 0, empty string, window never valid (return 0 / '' / -1 as specified).",
            "Negative numbers break sum-based windows — switch to prefix sums or deque.",
            "Updating the answer in the wrong place (before vs after shrinking) → off-by-one.",
            "Removing a key when its count drops to 0 (otherwise <code>len(map)</code> is wrong for 'distinct' checks).",
            "Uppercase/lowercase/unicode characters — 26-array assumption may be wrong; ask.",
            "Product window with k ≤ 1 → answer 0 (avoid infinite shrinking).",
            "Character Replacement: <code>maxFreq</code> need not be decreased when shrinking — the answer is still correct."
          ],
          qa: [
            { q: 'Why is the variable sliding window O(n) despite a nested while loop?', a: 'Both pointers only move forward; left moves at most n times in total across the whole run, so total work is O(2n) = O(n).' },
            { q: 'When does sliding window not apply?', a: 'When validity is not monotonic in window size — e.g. sum = k with negative numbers, or "exactly k" conditions directly. Use prefix sums + hash map, or the atMost(k) - atMost(k-1) trick.' },
            { q: 'How do you get the maximum of every window of size k in O(n)?', a: 'Keep a deque of indices with decreasing values: pop from the back while the new value is ≥ back, pop from the front if it has left the window; the front is the max. Each index is pushed and popped once.' }
          ],
          code: `def longest_valid(s):                   # variable window, longest
    from collections import defaultdict
    cnt = defaultdict(int)
    l = best = 0
    for r, ch in enumerate(s):
        cnt[ch] += 1
        while cnt[ch] > 1:                # 'invalid' condition
            cnt[s[l]] -= 1
            l += 1
        best = max(best, r - l + 1)
    return best

def min_len_sum_at_least(target, nums):  # variable window, shortest
    l = total = 0; best = float('inf')
    for r, x in enumerate(nums):
        total += x
        while total >= target:
            best = min(best, r - l + 1)
            total -= nums[l]; l += 1
    return 0 if best == float('inf') else best

def at_most_k_distinct(nums, k):         # count subarrays; exactly k = f(k) - f(k-1)
    from collections import defaultdict
    cnt = defaultdict(int); l = res = 0
    for r, x in enumerate(nums):
        cnt[x] += 1
        while len(cnt) > k:
            cnt[nums[l]] -= 1
            if cnt[nums[l]] == 0: del cnt[nums[l]]
            l += 1
        res += r - l + 1
    return res`
        },
        {
          id: 'sorting',
          title: 'Sorting algorithms & custom comparators',
          est: '3–4 days',
          why: 'You must be able to implement merge sort / quicksort on a whiteboard, discuss stability and complexity, and use sorting as a preprocessing step in greedy problems.',
          learn: [
            "Simple O(n²) sorts: bubble, selection, insertion (insertion sort is great for nearly sorted data)",
            "Merge sort: divide, sort halves, merge; O(n log n) always, O(n) extra space, stable",
            "Quicksort: partition (Lomuto / Hoare), O(n log n) average, O(n²) worst; randomised pivot",
            "Quickselect for k-th element in O(n) average",
            "Counting sort / bucket sort / radix sort: O(n + k) when the value range is small",
            "Stability: equal keys keep their relative order — why it matters for multi-key sorts",
            "Comparison sort lower bound Ω(n log n) (decision tree argument)",
            "Custom comparators: sort by key tuples, <code>cmp_to_key</code> (Largest Number), Java Comparator / C++ lambda",
            "Merge-sort-based counting: inversions, reverse pairs, count of smaller after self"
          ],
          practice: [
            { t: 'Merge Sorted Array', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/merge-sorted-array/' },
            { t: 'Relative Sort Array', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/relative-sort-array/' },
            { t: 'Distinct Numbers', p: 'CSES', d: 'E' },
            { t: 'Sort Colors', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/sort-colors/' },
            { t: 'Sort an Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/sort-an-array/' },
            { t: 'Insertion Sort List', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/insertion-sort-list/' },
            { t: 'Custom Sort String', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/custom-sort-string/' },
            { t: 'Sort Characters By Frequency', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/sort-characters-by-frequency/' },
            { t: 'H-Index', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/h-index/' },
            { t: 'Largest Number', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/largest-number/' },
            { t: 'Kth Largest Element in an Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
            { t: 'Sort List', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/sort-list/' },
            { t: 'Count Inversions', p: 'GFG', d: 'M' },
            { t: 'Wiggle Sort II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/wiggle-sort-ii/' },
            { t: 'Maximum Gap', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/maximum-gap/' },
            { t: 'Reverse Pairs', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/reverse-pairs/' },
            { t: 'Count of Smaller Numbers After Self', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' }
          ],
          notes: [
            "Ask yourself: 'would sorting first make this easy?' — it often enables two pointers, greedy, binary search, or adjacent comparisons.",
            "'k-th largest / smallest' → heap O(n log k) or quickselect O(n) average; full sort O(n log n) is the safe baseline.",
            "'Count pairs i &lt; j with condition on values' → modified merge sort counts across halves during merge, O(n log n).",
            "Small integer range (e.g. 0..100, letters, 3 colours) → counting sort / Dutch flag O(n).",
            "Linked list sorting → merge sort (no random access needed, O(1) extra space bottom-up).",
            "Largest Number: compare by concatenation <code>a+b &gt; b+a</code>; this ordering is transitive.",
            "Maximum Gap in O(n): pigeonhole buckets of size ⌈(max-min)/(n-1)⌉ — the gap lies between buckets."
          ],
          cases: [
            "Already sorted / reverse-sorted / all-equal input → naive quicksort degrades to O(n²); use random pivot or 3-way partition.",
            "Sort an Array on LeetCode has adversarial tests — fixed-pivot quicksort TLEs.",
            "Stability needed? Python/Java object sort are stable; C++ <code>std::sort</code> is not (use <code>stable_sort</code>).",
            "Largest Number with all zeros must return '0', not '000'.",
            "Comparator must be consistent (transitive, antisymmetric) or sorts may misbehave / throw in Java.",
            "Counting sort with negative numbers → offset by min.",
            "Merge step off-by-one: copying leftovers from both halves."
          ],
          qa: [
            { q: 'Why is quicksort\'s worst case O(n²) and how do you avoid it?', a: 'If the pivot is always the smallest/largest element (e.g. first element on sorted input) partitions are size n-1 and 0 → n levels of O(n) work. Avoid with a random pivot, median-of-three, or introsort (switch to heapsort beyond a depth limit, as C++ std::sort does). 3-way partitioning fixes many-duplicates inputs.' },
            { q: 'Merge sort vs quicksort — which and when?', a: 'Merge sort: guaranteed O(n log n), stable, O(n) extra space, ideal for linked lists and external sorting. Quicksort: in-place, cache-friendly, usually faster in practice, O(n²) worst case, not stable. Most libraries use hybrids (Timsort, introsort).' },
            { q: 'What is a stable sort and when does it matter?', a: 'Elements with equal keys keep their original relative order. It matters when sorting by multiple keys in passes (sort by secondary, then stable-sort by primary) or when records carry other data that must keep order.' },
            { q: 'Can we sort faster than O(n log n)?', a: 'Not with comparisons (decision tree has n! leaves → height ≥ log n! = Θ(n log n)). Non-comparison sorts like counting/radix sort achieve O(n + k) or O(d·(n + b)) when keys are bounded integers.' }
          ],
          code: `def merge_sort(a):
    if len(a) <= 1: return a
    mid = len(a) // 2
    L, R = merge_sort(a[:mid]), merge_sort(a[mid:])
    res, i, j = [], 0, 0
    while i < len(L) and j < len(R):
        if L[i] <= R[j]: res.append(L[i]); i += 1   # <= keeps it stable
        else: res.append(R[j]); j += 1
    res.extend(L[i:]); res.extend(R[j:])
    return res

import random
def quick_select(nums, k):              # k-th smallest (0-based), avg O(n)
    lo, hi = 0, len(nums) - 1
    while True:
        p = random.randint(lo, hi)
        nums[p], nums[hi] = nums[hi], nums[p]
        pivot, store = nums[hi], lo
        for i in range(lo, hi):         # Lomuto partition
            if nums[i] < pivot:
                nums[i], nums[store] = nums[store], nums[i]; store += 1
        nums[store], nums[hi] = nums[hi], nums[store]
        if store == k: return nums[store]
        if store < k: lo = store + 1
        else: hi = store - 1`
        },
        {
          id: 'binary-search',
          title: 'Binary search (index, answer, rotated, bounds)',
          est: '5–6 days',
          why: 'Asked constantly, and "binary search on the answer" is the hidden trick behind many medium/hard problems (Koko, ship packages, split array).',
          learn: [
            "Classic search on a sorted array; loop invariant and termination",
            "Lower bound (first ≥ x) and upper bound (first &gt; x) templates; first/last occurrence",
            "Search space as a predicate: find the first index where <code>ok(i)</code> becomes true (monotonic F...FT...T)",
            "Avoiding overflow: <code>mid = lo + (hi - lo) // 2</code>",
            "Rotated sorted array: one half is always sorted — decide which side to go",
            "Finding minimum / pivot in rotated array; handling duplicates (worst case O(n))",
            "Peak finding: compare <code>mid</code> with <code>mid+1</code>",
            "Binary search on the answer: min capacity / max minimum distance with a greedy feasibility check",
            "Binary search on real numbers (fixed iterations) and on two arrays (median of two sorted arrays)"
          ],
          practice: [
            { t: 'Binary Search', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/binary-search/' },
            { t: 'Search Insert Position', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/search-insert-position/' },
            { t: 'First Bad Version', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/first-bad-version/' },
            { t: 'Sqrt(x)', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/sqrtx/' },
            { t: 'Find First and Last Position of Element in Sorted Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/' },
            { t: 'Find Peak Element', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/find-peak-element/' },
            { t: 'Search in Rotated Sorted Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
            { t: 'Find Minimum in Rotated Sorted Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
            { t: 'Search in Rotated Sorted Array II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/' },
            { t: 'Single Element in a Sorted Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/single-element-in-a-sorted-array/' },
            { t: 'Time Based Key-Value Store', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/time-based-key-value-store/' },
            { t: 'Koko Eating Bananas', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/koko-eating-bananas/' },
            { t: 'Capacity To Ship Packages Within D Days', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/' },
            { t: 'Minimum Number of Days to Make m Bouquets', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/' },
            { t: 'Aggressive Cows', p: 'CN', d: 'M' },
            { t: 'Magnetic Force Between Two Balls', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/magnetic-force-between-two-balls/' },
            { t: 'Allocate Minimum Number of Pages', p: 'GFG', d: 'H' },
            { t: 'Split Array Largest Sum', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/split-array-largest-sum/' },
            { t: 'Median of Two Sorted Arrays', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' }
          ],
          notes: [
            "Signals: sorted / rotated input, 'O(log n)' required, huge n or value range (10⁹), 'minimise the maximum' / 'maximise the minimum'.",
            "Binary search on answer recipe: (1) answer range [lo, hi], (2) <code>feasible(x)</code> is monotonic, (3) feasibility check is greedy O(n) → total O(n log range).",
            "'Minimise the max' (ship capacity, split array, pages) → find first x where feasible is true.",
            "'Maximise the min' (aggressive cows, magnetic balls) → find last x where feasible is true.",
            "Rotated array: if <code>a[lo] ≤ a[mid]</code> left half is sorted; check whether the target lies in it.",
            "Use one template everywhere (half-open <code>[lo, hi)</code> with <code>while lo &lt; hi</code>) to stop off-by-one bugs.",
            "Median of two arrays: binary search the partition of the shorter array so left halves have equal size and max-left ≤ min-right — O(log min(m, n))."
          ],
          cases: [
            "Empty array, single element, target smaller than all / larger than all.",
            "Infinite loop when <code>lo = mid</code> with <code>mid = (lo+hi)//2</code> — use upper mid <code>(lo+hi+1)//2</code> in that case.",
            "Duplicates: plain search returns any index; use lower/upper bound for first/last.",
            "Rotated with duplicates (<code>a[lo] == a[mid] == a[hi]</code>) → shrink both ends; worst case O(n).",
            "Overflow of <code>lo + hi</code> in Java/C++ and of the feasibility sum (use long).",
            "Wrong answer bounds: Koko lo = 1 (not 0 → division by zero), ship lo = max(weights), hi = sum(weights).",
            "Not rotated at all (rotation by 0 or n) must still work.",
            "Bouquets: if m·k &gt; n return -1 before searching (also overflow)."
          ],
          qa: [
            { q: 'What property must hold to binary search on the answer?', a: 'Monotonicity of the feasibility predicate: if x works then every larger x (for minimisation) also works. Then the search space looks like F F F T T T and we binary search for the first T.' },
            { q: 'Lower bound vs upper bound?', a: 'lower_bound(x) = first index with a[i] ≥ x; upper_bound(x) = first index with a[i] &gt; x. Count of x = upper - lower; last occurrence = upper - 1.' },
            { q: 'Why is binary search in a rotated array with duplicates O(n) in the worst case?', a: 'When a[lo] == a[mid] == a[hi] we cannot tell which half is sorted (e.g. [1,1,1,1,0,1,1]), so we can only shrink by one element, degrading to linear time.' }
          ],
          code: `def lower_bound(a, x):                 # first i with a[i] >= x, in [0, n]
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < x: lo = mid + 1
        else: hi = mid
    return lo

def first_true(lo, hi, ok):            # smallest x in [lo, hi] with ok(x); assumes ok(hi)
    while lo < hi:
        mid = (lo + hi) // 2
        if ok(mid): hi = mid
        else: lo = mid + 1
    return lo

# Binary search on answer: Koko Eating Bananas
import math
def min_eating_speed(piles, h):
    return first_true(1, max(piles),
        lambda k: sum(math.ceil(p / k) for p in piles) <= h)

def search_rotated(a, t):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == t: return mid
        if a[lo] <= a[mid]:                       # left half sorted
            if a[lo] <= t < a[mid]: hi = mid - 1
            else: lo = mid + 1
        else:                                     # right half sorted
            if a[mid] < t <= a[hi]: lo = mid + 1
            else: hi = mid - 1
    return -1`
        },
        {
          id: 'strings',
          title: 'Strings (basics, palindromes, anagrams, building)',
          est: '3–4 days',
          why: 'String manipulation is in almost every screening round; parsing and palindrome questions test careful edge-case handling.',
          learn: [
            "Immutability (Python/Java): build with a list + <code>''.join</code> or <code>StringBuilder</code>, not += in a loop",
            "ASCII / ord tricks: <code>ord(c) - ord('a')</code> for 26-array counts; <code>isalnum, lower</code>",
            "Anagram checks: sorted string, Counter, or 26-count array",
            "Isomorphism / pattern matching with two hash maps (bijection)",
            "Palindromes: two pointers, expand-around-center for longest palindromic substring O(n²)",
            "Parsing: atoi with sign, whitespace, overflow; Roman numerals with subtractive pairs",
            "Splitting and reversing words; in-place reverse in char arrays",
            "Substring search: naive O(nm); KMP prefix function and Rabin–Karp rolling hash (overview)",
            "Manacher's algorithm (aware of O(n) longest palindrome; rarely required)"
          ],
          practice: [
            { t: 'Longest Common Prefix', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/longest-common-prefix/' },
            { t: 'Isomorphic Strings', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/isomorphic-strings/' },
            { t: 'Word Pattern', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/word-pattern/' },
            { t: 'Roman to Integer', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/roman-to-integer/' },
            { t: 'Rotate String', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/rotate-string/' },
            { t: 'Valid Palindrome II', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/valid-palindrome-ii/' },
            { t: 'Find the Index of the First Occurrence in a String', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/' },
            { t: 'Reverse Words in a String', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/reverse-words-in-a-string/' },
            { t: 'String Compression', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/string-compression/' },
            { t: 'Integer to Roman', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/integer-to-roman/' },
            { t: 'String to Integer (atoi)', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/string-to-integer-atoi/' },
            { t: 'Zigzag Conversion', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/zigzag-conversion/' },
            { t: 'Count and Say', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/count-and-say/' },
            { t: 'Longest Palindromic Substring', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/longest-palindromic-substring/' },
            { t: 'Palindromic Substrings', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/palindromic-substrings/' },
            { t: 'Shortest Palindrome', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/shortest-palindrome/' },
            { t: 'Text Justification', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/text-justification/' }
          ],
          notes: [
            "Signals: 'anagram / permutation' → counts; 'palindrome' → two pointers or expand around center; 'pattern / mapping' → two maps.",
            "Longest palindromic substring: expand from each of 2n-1 centers (odd and even) — O(n²) time, O(1) space.",
            "Count palindromic substrings: same expansion, count each successful expansion.",
            "Valid Palindrome II: on first mismatch try skipping left <b>or</b> right once.",
            "Rotation check: <code>len(a) == len(b) and b in a + a</code>.",
            "Repeated substring search in O(n + m): KMP (LPS array) — also gives Shortest Palindrome via <code>s + '#' + reverse(s)</code>.",
            "Simulation questions (Zigzag, Text Justification) — plan the index math on paper before coding."
          ],
          cases: [
            "Empty string, single character, all identical characters.",
            "Case sensitivity, spaces, punctuation, unicode — clarify the alphabet.",
            "atoi: leading spaces, '+'/'-', non-digit after digits, overflow clamp to [-2³¹, 2³¹-1], string with only sign.",
            "Reverse Words: multiple / leading / trailing spaces.",
            "Isomorphic: mapping must be one-to-one both ways ('badc' vs 'baba').",
            "String Compression: counts ≥ 10 produce multiple digit characters.",
            "O(n²) from repeated concatenation or slicing in loops."
          ],
          qa: [
            { q: 'Why is string concatenation in a loop O(n²)?', a: 'Strings are immutable in Python/Java, so each <code>s += c</code> may copy the whole string: 1 + 2 + ... + n = O(n²). Use a list and <code>join</code> or a StringBuilder for O(n).' },
            { q: 'How does KMP avoid re-scanning?', a: 'It precomputes the LPS array (longest proper prefix that is also a suffix for each pattern prefix). On a mismatch it falls back to LPS[j-1] in the pattern instead of moving the text pointer back, giving O(n + m).' },
            { q: 'Approaches to check if two strings are anagrams?', a: 'Sort both and compare (O(n log n)); or count characters with a 26-array / hash map and compare (O(n), O(1) space for fixed alphabet).' }
          ],
          code: `def longest_palindrome(s):            # expand around center, O(n^2)
    best_l, best_r = 0, 0
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1; r += 1
        return l + 1, r - 1
    for i in range(len(s)):
        for l, r in (expand(i, i), expand(i, i + 1)):
            if r - l > best_r - best_l:
                best_l, best_r = l, r
    return s[best_l:best_r + 1]

def lps_array(p):                       # KMP prefix function
    lps, j = [0] * len(p), 0
    for i in range(1, len(p)):
        while j and p[i] != p[j]:
            j = lps[j - 1]
        if p[i] == p[j]:
            j += 1
        lps[i] = j
    return lps

def is_anagram(a, b):
    if len(a) != len(b): return False
    cnt = [0] * 26
    for x, y in zip(a, b):
        cnt[ord(x) - 97] += 1; cnt[ord(y) - 97] -= 1
    return not any(cnt)`
        },
        {
          id: 'linked-list',
          title: 'Linked lists',
          est: '4–5 days',
          why: 'A favourite for testing pointer manipulation without bugs; reversal, fast/slow pointers and dummy nodes appear in many variations.',
          learn: [
            "Singly vs doubly linked lists; traversal, insertion, deletion; why no O(1) random access",
            "Dummy (sentinel) head to avoid special-casing the head",
            "Iterative reversal with prev / curr / next; recursive reversal",
            "Fast & slow pointers: middle node, cycle detection (Floyd), cycle start",
            "Two-pointer gap: remove n-th node from end in one pass",
            "Merging two sorted lists; merging k lists with a heap",
            "Composite operations: find middle + reverse second half + merge (Reorder List, Palindrome)",
            "Reversing sublists and k-groups",
            "Copy with random pointer (hash map or interleaving); LRU cache = hash map + doubly linked list"
          ],
          practice: [
            { t: 'Reverse Linked List', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/reverse-linked-list/' },
            { t: 'Merge Two Sorted Lists', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
            { t: 'Middle of the Linked List', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
            { t: 'Linked List Cycle', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/linked-list-cycle/' },
            { t: 'Remove Duplicates from Sorted List', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/' },
            { t: 'Palindrome Linked List', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/palindrome-linked-list/' },
            { t: 'Intersection of Two Linked Lists', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/intersection-of-two-linked-lists/' },
            { t: 'Design Linked List', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/design-linked-list/' },
            { t: 'Remove Nth Node From End of List', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
            { t: 'Linked List Cycle II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
            { t: 'Odd Even Linked List', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/odd-even-linked-list/' },
            { t: 'Add Two Numbers', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/add-two-numbers/' },
            { t: 'Reorder List', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/reorder-list/' },
            { t: 'Rotate List', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/rotate-list/' },
            { t: 'Reverse Linked List II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/reverse-linked-list-ii/' },
            { t: 'Copy List with Random Pointer', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
            { t: 'Find the Duplicate Number', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/find-the-duplicate-number/' },
            { t: 'LRU Cache', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/lru-cache/' },
            { t: 'Merge k Sorted Lists', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
            { t: 'Reverse Nodes in k-Group', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' }
          ],
          notes: [
            "Head might change (delete, insert at front, merge, reverse a part) → start with <code>dummy = ListNode(0, head)</code> and return <code>dummy.next</code>.",
            "'Middle', 'cycle', 'n-th from end', 'palindrome in O(1) space' → fast/slow pointers.",
            "Cycle start: after slow and fast meet, reset one to head; advance both by 1; they meet at the cycle entry.",
            "Find the Duplicate Number (array 1..n, O(1) space, no modification) = cycle detection treating <code>i → nums[i]</code> as a linked list.",
            "Intersection: walk A then B and B then A; pointers meet at the intersection (or both None) after ≤ m + n steps.",
            "Merge k lists: min-heap of heads O(N log k), or pairwise divide & conquer merging.",
            "Draw boxes and arrows; update pointers in an order that never loses the rest of the list (save <code>next</code> first)."
          ],
          cases: [
            "Empty list (<code>head is None</code>), single node, two nodes.",
            "Removing the head node (n == length in Remove Nth From End) → dummy node solves it.",
            "Fast pointer loop condition: <code>while fast and fast.next</code> — avoid None.next errors.",
            "Even vs odd length when splitting for palindrome / reorder (which middle?).",
            "Rotate List with k ≥ length → k % length; k % length == 0 returns head.",
            "Add Two Numbers: leftover carry creates a new node.",
            "Forgetting to cut the list (<code>mid.next = None</code>) creates cycles after reordering.",
            "Reverse in k-Group: last group with fewer than k nodes stays as is."
          ],
          qa: [
            { q: 'Why does Floyd\'s cycle detection find the cycle start?', a: 'Let the distance from head to the cycle start be a, and meeting point b steps into the cycle of length c. Fast travels twice as far: 2(a+b) = a + b + kc ⇒ a = kc - b. So a pointer from head and a pointer from the meeting point, both moving 1 step, meet at the start.' },
            { q: 'Array vs linked list — when would you use a linked list?', a: 'Linked lists give O(1) insert/delete given a node (no shifting) and grow without reallocation, but have O(n) access and poor cache locality. Use for LRU caches, queues, and when frequent splicing is needed; arrays otherwise.' },
            { q: 'How do you design an LRU cache with O(1) get/put?', a: 'Hash map key → node in a doubly linked list ordered by recency. get moves the node to the front; put inserts at front and evicts the tail when over capacity. Both O(1). (Python: OrderedDict with move_to_end / popitem(last=False).)' }
          ],
          code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def reverse(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev, cur = cur, nxt
    return prev

def middle(head):                       # second middle for even length
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    return slow

def cycle_start(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast:
            p = head
            while p is not slow:
                p, slow = p.next, slow.next
            return p
    return None

def merge(a, b):
    dummy = tail = ListNode()
    while a and b:
        if a.val <= b.val: tail.next, a = a, a.next
        else: tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next`
        },
        {
          id: 'stacks-queues',
          title: 'Stacks & queues (incl. monotonic stack / deque)',
          est: '4–5 days',
          why: 'Parentheses, expression evaluation and "next greater element" style questions are very common; the monotonic stack is a high-yield trick for O(n) solutions.',
          learn: [
            "Stack (LIFO) and queue (FIFO) operations; Python list as stack, <code>deque</code> as queue",
            "Balanced parentheses and nested decoding with a stack",
            "Expression evaluation: postfix (RPN), infix with + - * / and parentheses",
            "Design problems: Min Stack (pair each value with current min), queue using two stacks (amortised O(1))",
            "Circular queue with a fixed array and head/size",
            "Monotonic stack: next / previous greater or smaller element in O(n)",
            "Contribution technique: count subarrays where an element is the min/max (Sum of Subarray Minimums)",
            "Largest rectangle in histogram and its 2D extension (Maximal Rectangle)",
            "Monotonic deque for sliding window max/min"
          ],
          practice: [
            { t: 'Valid Parentheses', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/valid-parentheses/' },
            { t: 'Implement Queue using Stacks', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/implement-queue-using-stacks/' },
            { t: 'Next Greater Element I', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/next-greater-element-i/' },
            { t: 'Remove All Adjacent Duplicates In String', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/' },
            { t: 'Min Stack', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/min-stack/' },
            { t: 'Evaluate Reverse Polish Notation', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
            { t: 'Design Circular Queue', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/design-circular-queue/' },
            { t: 'Daily Temperatures', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/daily-temperatures/' },
            { t: 'Next Greater Element II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/next-greater-element-ii/' },
            { t: 'Simplify Path', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/simplify-path/' },
            { t: 'Asteroid Collision', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/asteroid-collision/' },
            { t: 'Decode String', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/decode-string/' },
            { t: 'Online Stock Span', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/online-stock-span/' },
            { t: 'Car Fleet', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/car-fleet/' },
            { t: 'Remove K Digits', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/remove-k-digits/' },
            { t: 'Basic Calculator II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/basic-calculator-ii/' },
            { t: 'Sum of Subarray Minimums', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/sum-of-subarray-minimums/' },
            { t: 'Largest Rectangle in Histogram', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
            { t: 'Maximal Rectangle', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/maximal-rectangle/' },
            { t: 'Basic Calculator', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/basic-calculator/' }
          ],
          notes: [
            "Signals for stack: matching / nesting (brackets, tags, decode 'k[...]'), undo / backtrack the most recent, 'remove adjacent', evaluate expressions.",
            "Signals for monotonic stack: 'next greater / smaller', 'previous ...', 'span', 'how many days until', 'largest rectangle', 'remove k digits to make smallest'.",
            "Next greater: keep a <b>decreasing</b> stack of indices; when a bigger value arrives, it is the answer for everything it pops.",
            "Circular arrays (Next Greater II): iterate 2n indices using <code>i % n</code>.",
            "Histogram: for each bar, width extends between previous smaller and next smaller; pop computes area when a smaller bar arrives (append sentinel 0).",
            "Sum of Subarray Minimums: contribution = a[i] · (i - prevLess) · (nextLessOrEqual - i) — use strict on one side, non-strict on the other to avoid double counting.",
            "Basic Calculator: keep current number, last sign; push onto stack and resolve * and / immediately; for parentheses push (result, sign).",
            "Each index is pushed and popped at most once → O(n)."
          ],
          cases: [
            "Popping/peeking an empty stack — check before <code>stack[-1]</code> (e.g. ')' first in Valid Parentheses).",
            "Leftover items in the stack at the end (unmatched '(' → invalid; remaining bars in histogram).",
            "Equal elements in monotonic stack: strict vs non-strict comparison changes answers.",
            "Integer division truncating toward zero in RPN/calculator: Python needs <code>int(a / b)</code>, not <code>a // b</code>.",
            "Remove K Digits: strip leading zeros; return '0' for empty; k remaining after the loop → remove from the end.",
            "Multi-digit numbers and spaces in calculator parsing.",
            "Asteroid collision: equal sizes destroy both; only right-moving then left-moving collide.",
            "Simplify Path: '..' at root, multiple slashes, '.' segments, names like '...'."
          ],
          qa: [
            { q: 'How do you implement a queue with two stacks and what is the complexity?', a: 'Push onto an <i>in</i> stack; to pop/peek, if the <i>out</i> stack is empty move everything from in to out (reversing order), then pop from out. Each element moves at most once → amortised O(1) per operation.' },
            { q: 'How does Min Stack get the minimum in O(1)?', a: 'Store pairs (value, min so far) or keep a second stack of minimums pushed when value ≤ current min. The top of that holds the current minimum; popping restores the previous one.' },
            { q: 'Why is the monotonic stack approach O(n)?', a: 'Every element is pushed once and popped at most once, so total stack operations are ≤ 2n even though there is an inner while loop.' }
          ],
          code: `def next_greater(nums):                # monotonic decreasing stack of indices
    res = [-1] * len(nums)
    st = []
    for i, x in enumerate(nums):
        while st and nums[st[-1]] < x:
            res[st.pop()] = x
        st.append(i)
    return res

def largest_rectangle(h):
    st, best = [], 0                     # increasing stack of indices
    for i, x in enumerate(h + [0]):      # sentinel flushes the stack
        while st and h[st[-1]] >= x:
            height = h[st.pop()]
            left = st[-1] if st else -1
            best = max(best, height * (i - left - 1))
        st.append(i)
    return best

def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    st = []
    for c in s:
        if c in pairs:
            if not st or st.pop() != pairs[c]: return False
        else:
            st.append(c)
    return not st`
        },
        {
          id: 'intervals',
          title: 'Intervals & sweep line',
          est: '2–3 days',
          why: 'Calendar / meeting-room / scheduling questions are product-company favourites (Google, Amazon, Uber) and test sorting + greedy reasoning.',
          learn: [
            "Representing intervals; closed vs half-open; overlap test <code>a.start ≤ b.end and b.start ≤ a.end</code>",
            "Sort by start then merge overlapping intervals",
            "Insert an interval into a sorted, non-overlapping list in O(n)",
            "Sort by end + greedy for maximum non-overlapping set (activity selection) / minimum removals / arrows",
            "Intersection of two sorted interval lists with two pointers",
            "Minimum rooms: sort starts and ends separately, or min-heap of end times",
            "Sweep line with events (+1 at start, -1 at end) and difference arrays",
            "Ordered structures for dynamic intervals (TreeMap / sorted list: My Calendar, Data Stream as Disjoint Intervals)"
          ],
          practice: [
            { t: 'Summary Ranges', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/summary-ranges/' },
            { t: 'Meeting Rooms', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/meeting-rooms/' },
            { t: 'N meetings in one room', p: 'GFG', d: 'E' },
            { t: 'Merge Intervals', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/merge-intervals/' },
            { t: 'Insert Interval', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/insert-interval/' },
            { t: 'Non-overlapping Intervals', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/non-overlapping-intervals/' },
            { t: 'Minimum Number of Arrows to Burst Balloons', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/' },
            { t: 'Meeting Rooms II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/meeting-rooms-ii/' },
            { t: 'Interval List Intersections', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/interval-list-intersections/' },
            { t: 'Remove Covered Intervals', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/remove-covered-intervals/' },
            { t: 'Car Pooling', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/car-pooling/' },
            { t: 'My Calendar I', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/my-calendar-i/' },
            { t: 'Restaurant Customers', p: 'CSES', d: 'E' },
            { t: 'Movie Festival', p: 'CSES', d: 'E' },
            { t: 'Employee Free Time', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/employee-free-time/' },
            { t: 'Data Stream as Disjoint Intervals', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/data-stream-as-disjoint-intervals/' },
            { t: 'Minimum Interval to Include Each Query', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/' },
            { t: 'The Skyline Problem', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/the-skyline-problem/' }
          ],
          notes: [
            "Signals: pairs [start, end], meetings, bookings, 'overlap', 'merge', 'free time', 'minimum rooms / platforms'.",
            "Merge / insert / free time → sort by <b>start</b>.",
            "Max non-overlapping, min removals, min arrows → sort by <b>end</b> and greedily keep the earliest-finishing interval.",
            "'Max simultaneous' (rooms, platforms, passengers) → sweep line: sort events, process ends before starts at the same time if intervals are half-open.",
            "Min rooms via heap: sort by start; pop the earliest end if it is ≤ current start; push current end; answer = max heap size.",
            "Two sorted lists → two pointers; advance the one that ends first.",
            "Offline queries (Minimum Interval to Include Each Query) → sort queries and intervals, push into a heap as you sweep."
          ],
          cases: [
            "Touching intervals [1,2] and [2,3]: overlap or not? Depends on problem (merge: yes; meeting rooms: usually no). Clarify.",
            "Empty list, single interval, intervals fully contained in another.",
            "Input not sorted — don't assume.",
            "Insert Interval: new interval before all, after all, or covering all.",
            "Arrows: points can be very large / negative — avoid <code>a - b</code> comparator overflow in Java.",
            "Merge: update end with <code>max(end, cur_end)</code>, not just cur_end (nested intervals).",
            "Sweep line tie-breaking at equal coordinates (end before start, or start before end)."
          ],
          qa: [
            { q: 'Why sort by end time for the maximum number of non-overlapping intervals?', a: 'Greedy exchange argument: the interval that finishes first leaves the most room for the rest. Any optimal solution can swap its first interval for the earliest-finishing one without losing count.' },
            { q: 'How do you find the minimum number of meeting rooms?', a: 'Either sort starts and ends separately and sweep with two pointers counting concurrent meetings, or sort by start and maintain a min-heap of end times (reuse a room if heap top ≤ start). Both O(n log n); answer is the peak concurrency.' },
            { q: 'Merge vs insert interval complexities?', a: 'Merge needs a sort: O(n log n). Insert into an already sorted non-overlapping list is O(n): copy intervals ending before the new one, merge all overlapping, copy the rest.' }
          ],
          code: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    res = []
    for s, e in intervals:
        if res and s <= res[-1][1]:          # overlap (touching counts)
            res[-1][1] = max(res[-1][1], e)
        else:
            res.append([s, e])
    return res

def erase_overlap(intervals):             # min removals = n - max kept
    intervals.sort(key=lambda x: x[1])
    kept, end = 0, float('-inf')
    for s, e in intervals:
        if s >= end:
            kept += 1; end = e
    return len(intervals) - kept

import heapq
def min_rooms(intervals):
    intervals.sort()
    ends = []
    for s, e in intervals:
        if ends and ends[0] <= s:
            heapq.heapreplace(ends, e)
        else:
            heapq.heappush(ends, e)
    return len(ends)`
        },
        {
          id: 'matrix',
          title: 'Matrix / 2D array traversal',
          est: '2–3 days',
          why: 'Spiral, rotate and search-in-matrix are common screening questions; clean boundary handling here carries over to grid BFS/DFS and 2D DP.',
          learn: [
            "Row-major indexing, converting between (r, c) and <code>r * cols + c</code>",
            "Direction arrays <code>[(0,1),(1,0),(0,-1),(-1,0)]</code> and bounds checking",
            "Spiral traversal with four shrinking boundaries",
            "Rotate 90° in place: transpose + reverse each row (clockwise)",
            "In-place state encoding (Set Matrix Zeroes using first row/col; Game of Life with 2-bit states)",
            "Diagonal traversal: cells on a diagonal share <code>r - c</code> (or anti-diagonal <code>r + c</code>)",
            "Search in a fully sorted matrix (treat as 1D binary search) vs row/col sorted (staircase from top-right O(m+n))",
            "Binary search on value range for k-th smallest in a sorted matrix"
          ],
          practice: [
            { t: 'Matrix Diagonal Sum', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/matrix-diagonal-sum/' },
            { t: 'Transpose Matrix', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/transpose-matrix/' },
            { t: 'Reshape the Matrix', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/reshape-the-matrix/' },
            { t: 'Toeplitz Matrix', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/toeplitz-matrix/' },
            { t: "Pascal's Triangle", p: 'LC', d: 'E', u: 'https://leetcode.com/problems/pascals-triangle/' },
            { t: 'Lucky Numbers in a Matrix', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/lucky-numbers-in-a-matrix/' },
            { t: 'Row with max 1s', p: 'GFG', d: 'M' },
            { t: 'Spiral Matrix', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/spiral-matrix/' },
            { t: 'Spiral Matrix II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/spiral-matrix-ii/' },
            { t: 'Rotate Image', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/rotate-image/' },
            { t: 'Set Matrix Zeroes', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/set-matrix-zeroes/' },
            { t: 'Search a 2D Matrix', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/search-a-2d-matrix/' },
            { t: 'Search a 2D Matrix II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/search-a-2d-matrix-ii/' },
            { t: 'Valid Sudoku', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/valid-sudoku/' },
            { t: 'Game of Life', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/game-of-life/' },
            { t: 'Diagonal Traverse', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/diagonal-traverse/' },
            { t: 'Kth Smallest Element in a Sorted Matrix', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/' },
            { t: 'Median in a row-wise sorted Matrix', p: 'GFG', d: 'H' }
          ],
          notes: [
            "Signals: 'm x n grid / matrix', 'in place', 'rotate', 'spiral', 'rows and columns sorted'.",
            "Spiral: loop while <code>top ≤ bottom and left ≤ right</code>; after the top row and right column, re-check before the bottom row and left column.",
            "Rotate clockwise = transpose then reverse rows; counter-clockwise = transpose then reverse columns (or reverse rows first).",
            "Sorted matrix where each row starts after the previous row ends → index <code>mid</code> as <code>(mid // n, mid % n)</code>.",
            "Rows and columns sorted independently → start at top-right: go left if too big, down if too small, O(m + n).",
            "O(1) space flags: reuse the first row/column as markers and keep a separate flag for the first column/row itself.",
            "Valid Sudoku box index: <code>(r // 3) * 3 + c // 3</code>."
          ],
          cases: [
            "Empty matrix (<code>[]</code> or <code>[[]]</code>), single row, single column, non-square m × n.",
            "Spiral on a single remaining row or column — double counting if boundaries aren't re-checked.",
            "Rotate Image is only defined for n × n; must be in place.",
            "Set Matrix Zeroes: overwriting markers before reading them; order of the final pass matters.",
            "Game of Life: updates must use the <b>original</b> neighbour states — encode transitions (e.g. 2 = live→dead).",
            "Out-of-bounds when checking neighbours; diagonal neighbours counted?",
            "Reshape: return the original if r·c ≠ m·n."
          ],
          qa: [
            { q: 'How do you rotate an n × n matrix 90° clockwise in place?', a: 'Transpose (swap a[i][j] with a[j][i] for j &gt; i) then reverse each row. O(n²) time, O(1) extra space. Alternative: rotate four cells at a time layer by layer.' },
            { q: 'Search in a row- and column-sorted matrix — best approach?', a: 'Start at the top-right corner: if the value is greater than target move left, if smaller move down. Each step eliminates a row or column → O(m + n).' },
            { q: 'How do you find the k-th smallest element in a sorted matrix?', a: 'Either a min-heap seeded with the first column (O(k log n)) or binary search on the value range, counting elements ≤ mid with the staircase walk (O(n log(max - min))).' }
          ],
          code: `def spiral(mat):
    if not mat or not mat[0]: return []
    top, bot, left, right = 0, len(mat) - 1, 0, len(mat[0]) - 1
    res = []
    while top <= bot and left <= right:
        for c in range(left, right + 1): res.append(mat[top][c])
        top += 1
        for r in range(top, bot + 1): res.append(mat[r][right])
        right -= 1
        if top <= bot:
            for c in range(right, left - 1, -1): res.append(mat[bot][c])
            bot -= 1
        if left <= right:
            for r in range(bot, top - 1, -1): res.append(mat[r][left])
            left += 1
    return res

def rotate(m):                           # 90 degrees clockwise, in place
    n = len(m)
    for i in range(n):
        for j in range(i + 1, n):
            m[i][j], m[j][i] = m[j][i], m[i][j]
    for row in m:
        row.reverse()

DIRS = [(0, 1), (1, 0), (0, -1), (-1, 0)]
def neighbours(r, c, R, C):
    for dr, dc in DIRS:
        nr, nc = r + dr, c + dc
        if 0 <= nr < R and 0 <= nc < C:
            yield nr, nc`
        },
        {
          id: 'bit-manipulation',
          title: 'Bit manipulation',
          est: '2–3 days',
          why: 'Shows up as quick "O(1) space" tricks (Single Number, Missing Number) and inside bitmask DP / subsets; interviewers like the XOR insights.',
          learn: [
            "Binary representation, two's complement for negatives",
            "Operators: <code>&amp; | ^ ~ &lt;&lt; &gt;&gt;</code>; check / set / clear / toggle bit i",
            "XOR properties: <code>x^x = 0</code>, <code>x^0 = x</code>, commutative → cancel pairs",
            "<code>n &amp; (n-1)</code> clears the lowest set bit (count bits, power of two); <code>n &amp; -n</code> isolates it",
            "Counting bits DP: <code>bits[i] = bits[i &gt;&gt; 1] + (i &amp; 1)</code>",
            "Enumerating subsets with bitmasks <code>for mask in range(1 &lt;&lt; n)</code>",
            "Per-bit counting (Single Number II: count each bit mod 3)",
            "Adding without + using XOR (sum) and AND-shift (carry); Python needs a 32-bit mask",
            "Bitwise trie for maximum XOR pair (preview)"
          ],
          practice: [
            { t: 'Number of 1 Bits', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/number-of-1-bits/' },
            { t: 'Single Number', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/single-number/' },
            { t: 'Missing Number', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/missing-number/' },
            { t: 'Counting Bits', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/counting-bits/' },
            { t: 'Power of Two', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/power-of-two/' },
            { t: 'Power of Four', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/power-of-four/' },
            { t: 'Hamming Distance', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/hamming-distance/' },
            { t: 'Reverse Bits', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/reverse-bits/' },
            { t: 'Minimum Flips to Make a OR b Equal to c', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/' },
            { t: 'Single Number II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/single-number-ii/' },
            { t: 'Single Number III', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/single-number-iii/' },
            { t: 'Subsets', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/subsets/' },
            { t: 'Sum of Two Integers', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/sum-of-two-integers/' },
            { t: 'Bitwise AND of Numbers Range', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/bitwise-and-of-numbers-range/' },
            { t: 'Total Hamming Distance', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/total-hamming-distance/' },
            { t: 'XOR Queries of a Subarray', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/xor-queries-of-a-subarray/' },
            { t: 'Gray Code', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/gray-code/' },
            { t: 'Divide Two Integers', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/divide-two-integers/' },
            { t: 'Maximum XOR of Two Numbers in an Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/' }
          ],
          notes: [
            "Signals: 'every element appears twice except one', 'without extra space', 'without + or -', 'power of two', n ≤ 20 subsets, XOR in the statement.",
            "Pairs cancel under XOR → Single Number; Missing Number = XOR of indices and values.",
            "Single Number III: XOR all → <code>x = a ^ b</code>; split numbers by the lowest set bit of x (<code>x &amp; -x</code>) and XOR each group.",
            "Power of two: <code>n &gt; 0 and n &amp; (n-1) == 0</code>; power of four additionally <code>n &amp; 0x55555555</code>.",
            "Range AND: common prefix of left and right — shift both right until equal, then shift back.",
            "Total Hamming Distance: for each bit, ones · zeros pairs differ → O(32n).",
            "Prefix XOR works like prefix sums: <code>xor(l..r) = P[r+1] ^ P[l]</code>.",
            "Gray code: <code>i ^ (i &gt;&gt; 1)</code>."
          ],
          cases: [
            "Negative numbers: Python ints are unbounded, so <code>-1 &gt;&gt; 1 == -1</code> and loops on negatives never end — mask with <code>&amp; 0xFFFFFFFF</code>.",
            "Java: <code>&gt;&gt;</code> is arithmetic, <code>&gt;&gt;&gt;</code> logical (use for unsigned problems like Number of 1 Bits).",
            "Operator precedence: <code>n &amp; 1 == 0</code> parses wrongly in C/Java — parenthesise.",
            "<code>1 &lt;&lt; 31</code> overflows int in Java/C++ — use <code>1L &lt;&lt; 31</code>.",
            "Divide Two Integers: <code>-2³¹ / -1</code> overflows → clamp to 2³¹-1.",
            "n = 0 for power-of-two checks (0 &amp; -1 == 0 but 0 is not a power of two).",
            "Sum of Two Integers in Python: convert the 32-bit result back to signed (<code>~(x ^ 0xFFFFFFFF)</code> if x &gt; 0x7FFFFFFF)."
          ],
          qa: [
            { q: 'Why does <code>n &amp; (n - 1)</code> remove the lowest set bit?', a: 'Subtracting 1 flips the lowest set bit to 0 and all lower zero bits to 1; AND with n then clears those, leaving n without its lowest set bit. Counting how many times you can do this gives the popcount in O(number of set bits).' },
            { q: 'How do you find the single number when others appear three times?', a: 'For each of the 32 bit positions count how many numbers have it set; the count mod 3 is the single number\'s bit. Or use the ones/twos state machine: <code>ones = (ones ^ x) &amp; ~twos; twos = (twos ^ x) &amp; ~ones</code>. O(n) time, O(1) space.' },
            { q: 'How does adding with bits work?', a: 'XOR gives the sum without carries, AND shifted left by 1 gives the carries; repeat until carry is 0. In Python mask to 32 bits to simulate fixed-width overflow.' }
          ],
          code: `def bit_ops(x, i):
    is_set = (x >> i) & 1
    set_i  = x | (1 << i)
    clr_i  = x & ~(1 << i)
    tog_i  = x ^ (1 << i)
    low    = x & -x                     # lowest set bit
    return is_set, set_i, clr_i, tog_i, low

def popcount(n):
    c = 0
    while n:
        n &= n - 1                      # drop lowest set bit
        c += 1
    return c

def single_number(nums):
    r = 0
    for x in nums: r ^= x
    return r

def all_subsets(nums):                  # bitmask enumeration, O(n * 2^n)
    n = len(nums)
    return [[nums[i] for i in range(n) if mask >> i & 1]
            for mask in range(1 << n)]

def get_sum(a, b):                      # add without +, 32-bit semantics
    MASK, MAX = 0xFFFFFFFF, 0x7FFFFFFF
    while b & MASK:
        a, b = (a ^ b) & MASK, ((a & b) << 1) & MASK
    return a if a <= MAX else ~(a ^ MASK)`
        }
      ]
    }
  ]
});
