/* DSA part 3 of 3 - Greedy & DP, Advanced & competitive */
(function () {
  var LC = function (t, d, slug) { return { t: t, p: 'LC', d: d, u: 'https://leetcode.com/problems/' + slug + '/' }; };
  var X = function (p, t, d) { return { t: t, p: p, d: d }; };

  PREP.add({
    id: 'dsa',
    levels: [
      {
        name: 'Level 3 · Greedy & dynamic programming',
        topics: [
          /* ---------------- GREEDY ---------------- */
          {
            id: 'greedy',
            title: 'Greedy algorithms',
            est: '4–5 days',
            why: "Shows up as a 'clever' medium in most loops (jump game, gas station, task scheduler). Interviewers probe whether you can justify the greedy choice or recognise when it fails and DP is needed.",
            learn: [
              "Greedy-choice property + optimal substructure: a locally optimal choice is part of some global optimum.",
              "<b>Exchange argument</b>: take any optimal solution, swap in the greedy choice, show it is no worse.",
              "<b>Stays-ahead argument</b>: after every step greedy is at least as good as any other algorithm.",
              "Sort-then-scan patterns: sort by end time (activity selection), by ratio (fractional knapsack), by custom comparator (largest number).",
              "Reach / frontier greedy: Jump Game (max reach), Jump Game II (BFS-by-levels on ranges).",
              "Running-deficit greedy: Gas Station (reset start when tank &lt; 0; total &gt;= 0 means answer exists).",
              "Counting / slot greedy: Task Scheduler formula <code>(maxFreq-1)*(n+1)+countMax</code>.",
              "Two-pass greedy for neighbour constraints (Candy: left pass then right pass).",
              "Heap-driven greedy: pick best available option over time (IPO, refueling stops, course schedule III).",
              "When greedy fails: 0/1 knapsack, coin change with arbitrary denominations ({1,3,4}, amount 6) - prove with a counter-example, switch to DP."
            ],
            practice: [
              LC('Assign Cookies', 'E', 'assign-cookies'),
              LC('Lemonade Change', 'E', 'lemonade-change'),
              X('GFG', 'N meetings in one room', 'E'),
              X('GFG', 'Fractional Knapsack', 'M'),
              X('CSES', 'Movie Festival', 'E'),
              LC('Jump Game', 'M', 'jump-game'),
              LC('Jump Game II', 'M', 'jump-game-ii'),
              LC('Gas Station', 'M', 'gas-station'),
              LC('Boats to Save People', 'M', 'boats-to-save-people'),
              LC('Two City Scheduling', 'M', 'two-city-scheduling'),
              LC('Hand of Straights', 'M', 'hand-of-straights'),
              LC('Valid Parenthesis String', 'M', 'valid-parenthesis-string'),
              LC('Task Scheduler', 'M', 'task-scheduler'),
              LC('Largest Number', 'M', 'largest-number'),
              LC('Queue Reconstruction by Height', 'M', 'queue-reconstruction-by-height'),
              X('CSES', 'Tasks and Deadlines', 'M'),
              LC('Candy', 'H', 'candy'),
              LC('Minimum Number of Refueling Stops', 'H', 'minimum-number-of-refueling-stops'),
              LC('IPO', 'H', 'ipo')
            ],
            notes: [
              "Signals: 'minimum number of X to cover/reach', 'maximum non-overlapping', 'schedule', 'can you reach the end', sorting makes the problem obvious.",
              "Recipe: (1) guess the greedy rule, (2) try to break it with 2-3 tiny counter-examples, (3) state an exchange argument in one sentence to the interviewer.",
              "Activity selection: sort by <b>end</b> time, take every interval whose start &gt;= last end. Sorting by start or length is wrong.",
              "Jump Game II: treat each jump as a BFS level; <code>curEnd</code> = end of current level, <code>far</code> = furthest reach; when <code>i == curEnd</code>, jumps++.",
              "Gas Station: if total gas &gt;= total cost an answer exists; the start is the index after the last point the running tank went negative.",
              "Task Scheduler: answer = <code>max(len(tasks), (maxFreq-1)*(n+1) + countOfMaxFreq)</code>.",
              "Heap greedy: 'pick the best option currently available' over a time/resource sweep - push candidates as they unlock, pop the best when you must choose.",
              "Complexity is usually O(n log n) from the sort or heap; the scan itself is O(n)."
            ],
            cases: [
              "Ties in sort keys (equal end times) - make sure the comparator is consistent.",
              "Custom comparator in Python needs <code>functools.cmp_to_key</code> (Largest Number); answer '00' must become '0'.",
              "Jump Game with a single element is already at the end (True / 0 jumps).",
              "Gas Station: never restart the scan from the failed start - jump to i+1, keeps it O(n).",
              "Greedy coin change is only correct for canonical coin systems - don't assume it.",
              "Candy: both passes needed; taking max in the second pass, not overwrite.",
              "Off-by-one with closed vs open intervals (touching endpoints overlap or not?)."
            ],
            qa: [
              { q: "How do you prove a greedy algorithm is correct?", a: "Exchange argument: take an optimal solution that differs from greedy at the first choice, swap in greedy's choice and show cost does not get worse; induct. Or stays-ahead: show greedy's partial solution is never behind any other after each step." },
              { q: "Why sort by end time in activity selection?", a: "Finishing earliest leaves the maximum remaining time for future activities; any optimal schedule's first activity can be swapped with the earliest-ending one without conflict." },
              { q: "Give a case where greedy fails and what you use instead.", a: "Coins {1,3,4}, amount 6: greedy picks 4+1+1 (3 coins) but 3+3 is 2. 0/1 knapsack by value/weight ratio also fails. Use DP over amount/capacity." }
            ],
            code: `# Activity selection / max non-overlapping
def max_activities(iv):
    iv.sort(key=lambda x: x[1])
    cnt, end = 0, float('-inf')
    for s, e in iv:
        if s >= end:
            cnt, end = cnt + 1, e
    return cnt

# Jump Game II (BFS levels)
def jump(nums):
    jumps = cur_end = far = 0
    for i in range(len(nums) - 1):
        far = max(far, i + nums[i])
        if i == cur_end:
            jumps, cur_end = jumps + 1, far
    return jumps

# Gas Station
def can_complete(gas, cost):
    if sum(gas) < sum(cost): return -1
    tank = start = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            tank, start = 0, i + 1
    return start`
          },

          /* ---------------- DP FUNDAMENTALS / 1D ---------------- */
          {
            id: 'dp-1d',
            title: 'DP fundamentals & 1D DP',
            est: '4–5 days',
            why: "The foundation for every DP question. Interviewers expect you to go recursion → memo → tabulation → O(1) space and explain the state clearly.",
            learn: [
              "Two conditions for DP: overlapping subproblems + optimal substructure.",
              "Write the brute-force recursion first; identify the parameters that change - those are the <b>state</b>.",
              "Top-down memoisation with <code>@lru_cache</code> / dict; complexity = #states × work per state.",
              "Bottom-up tabulation: base cases, fill order so dependencies are computed first.",
              "Space optimisation: keep only the last k rows/values (rolling variables, rolling array).",
              "State definition styles: 'answer ending at i' vs 'answer for prefix i' vs 'answer from i to end'.",
              "Take / skip pattern (House Robber), count-ways pattern (Climbing Stairs, Decode Ways), partition pattern (Word Break).",
              "Circular variants: solve twice excluding first / last element (House Robber II).",
              "Reconstructing the actual solution by storing choices / backtracking through the table."
            ],
            practice: [
              LC('Fibonacci Number', 'E', 'fibonacci-number'),
              LC('Climbing Stairs', 'E', 'climbing-stairs'),
              LC('Min Cost Climbing Stairs', 'E', 'min-cost-climbing-stairs'),
              X('AC', 'Frog 1 (Educational DP Contest A)', 'E'),
              X('AC', 'Frog 2 (Educational DP Contest B)', 'E'),
              X('CSES', 'Dice Combinations', 'E'),
              LC('House Robber', 'M', 'house-robber'),
              LC('House Robber II', 'M', 'house-robber-ii'),
              LC('Delete and Earn', 'M', 'delete-and-earn'),
              LC('Decode Ways', 'M', 'decode-ways'),
              LC('Word Break', 'M', 'word-break'),
              LC('Perfect Squares', 'M', 'perfect-squares'),
              LC('Maximum Product Subarray', 'M', 'maximum-product-subarray'),
              LC('Domino and Tromino Tiling', 'M', 'domino-and-tromino-tiling'),
              LC('Knight Dialer', 'M', 'knight-dialer'),
              X('CSES', 'Removing Digits', 'M'),
              LC('Decode Ways II', 'H', 'decode-ways-ii'),
              LC('Count Vowels Permutation', 'H', 'count-vowels-permutation')
            ],
            notes: [
              "Signals: 'number of ways', 'minimum/maximum cost', 'is it possible', 'longest/shortest', choices at each step that affect the future, n up to ~10^5 with simple transitions.",
              "Say the state out loud: <code>dp[i]</code> = <i>exactly what</i>, for <i>which prefix</i>. Most bugs come from a vague state.",
              "Transition = enumerate the last decision. Stairs: last step was 1 or 2. Robber: rob i (dp[i-2]+a[i]) or skip (dp[i-1]).",
              "Decode Ways: <code>dp[i] = (s[i-1]!='0')*dp[i-1] + (10&lt;=int(s[i-2:i])&lt;=26)*dp[i-2]</code>.",
              "Word Break: <code>dp[i]</code> = prefix of length i is segmentable; check every word ending at i (or every j with s[j:i] in set).",
              "Max product subarray: track both max and min ending here (negative × negative).",
              "Interview flow: brute recursion (exponential) → memo (O(states)) → table → rolling variables. Each step is a talking point.",
              "Complexity: 1D DP typically O(n) or O(n·k) time, O(1) space after optimisation."
            ],
            cases: [
              "Base cases: dp[0] for an empty prefix is usually 1 (ways) or 0 (cost) - decide deliberately.",
              "Decode Ways: '0', '06', '100', '30' → 0 ways; a leading zero kills the string.",
              "House Robber II with n == 1: return nums[0] (both sub-ranges are empty otherwise).",
              "Python recursion limit (~1000) - use iterative DP or <code>sys.setrecursionlimit</code> for deep memo.",
              "Modulo answers: apply <code>% MOD</code> on every addition, not just at the end.",
              "lru_cache on a method with mutable args (lists) fails - pass indices / tuples.",
              "Space optimisation breaks reconstruction - keep the full table if the path is needed."
            ],
            qa: [
              { q: "Memoisation vs tabulation - when do you prefer each?", a: "Memo is easier to derive and only visits reachable states, but has recursion overhead/depth limits. Tabulation is faster, iterative and enables space optimisation, but you must know a valid fill order and may compute unused states." },
              { q: "How do you identify the DP state?", a: "Write the brute-force recursion; the arguments that change between calls (index, remaining capacity, last choice, flags) form the state. Minimise it by dropping anything derivable from the others." },
              { q: "What is the time complexity of a memoised solution?", a: "Number of distinct states × cost of computing one state from its sub-states (e.g. Word Break: n states × n splits × substring cost)." }
            ],
            code: `from functools import lru_cache

# 1) recursion + memo
def rob_memo(a):
    @lru_cache(None)
    def f(i):                 # best from a[i:]
        if i >= len(a): return 0
        return max(f(i + 1), a[i] + f(i + 2))
    return f(0)

# 2) tabulation -> O(1) space
def rob(a):
    prev2 = prev1 = 0         # dp[i-2], dp[i-1]
    for x in a:
        prev2, prev1 = prev1, max(prev1, prev2 + x)
    return prev1

def num_decodings(s):
    if not s or s[0] == '0': return 0
    p2, p1 = 1, 1             # dp[i-2], dp[i-1]
    for i in range(1, len(s)):
        cur = p1 if s[i] != '0' else 0
        if 10 <= int(s[i-1:i+1]) <= 26: cur += p2
        p2, p1 = p1, cur
    return p1`
          },

          /* ---------------- GRID DP ---------------- */
          {
            id: 'dp-grid',
            title: '2D / grid DP',
            est: '2–3 days',
            why: "Very common warm-up DP (unique paths, min path sum) and a natural follow-up to harder variants (obstacles, dungeon, cherry pickup).",
            learn: [
              "<code>dp[r][c]</code> = answer for reaching (r,c) from start (or from (r,c) to the end).",
              "Fill order follows allowed moves: right/down moves → row-major forward iteration.",
              "Obstacles / blocked cells → dp = 0 (ways) or inf (cost).",
              "Rolling 1D array: <code>dp[c] = dp[c] + dp[c-1]</code> reuses the previous row.",
              "Reverse-direction DP when the constraint depends on the future (Dungeon Game: compute from bottom-right).",
              "Square / rectangle DP: <code>dp = 1 + min(up, left, diag)</code> (Maximal Square).",
              "Multi-agent grid DP: two walkers in lock-step, state (step, r1, r2) (Cherry Pickup).",
              "Memo DFS on grids with arbitrary moves (Longest Increasing Path - DAG implied by strict order)."
            ],
            practice: [
              LC('Unique Paths', 'M', 'unique-paths'),
              LC('Unique Paths II', 'M', 'unique-paths-ii'),
              LC('Minimum Path Sum', 'M', 'minimum-path-sum'),
              LC('Triangle', 'M', 'triangle'),
              LC('Minimum Falling Path Sum', 'M', 'minimum-falling-path-sum'),
              X('GFG', 'Gold Mine Problem', 'M'),
              X('CSES', 'Grid Paths', 'M'),
              X('AC', 'Grid 1 (Educational DP Contest H)', 'M'),
              LC('Maximal Square', 'M', 'maximal-square'),
              LC('Out of Boundary Paths', 'M', 'out-of-boundary-paths'),
              LC('Count Square Submatrices with All Ones', 'M', 'count-square-submatrices-with-all-ones'),
              LC('Dungeon Game', 'H', 'dungeon-game'),
              LC('Longest Increasing Path in a Matrix', 'H', 'longest-increasing-path-in-a-matrix'),
              LC('Cherry Pickup II', 'H', 'cherry-pickup-ii'),
              LC('Cherry Pickup', 'H', 'cherry-pickup')
            ],
            notes: [
              "Signals: grid + only right/down (or down/diagonal) moves + count ways / min cost → grid DP. Arbitrary 4-dir moves with positive costs → Dijkstra instead.",
              "Unique Paths has a closed form <code>C(m+n-2, m-1)</code> - mention it.",
              "Dungeon Game: forward DP fails because you need both path sum and min-prefix; go backward with <code>need[r][c] = max(1, min(need[r+1][c], need[r][c+1]) - d[r][c])</code>.",
              "Cherry Pickup: model two people going forward simultaneously; state (k, r1, r2), c = k - r; if same cell count once.",
              "Triangle: bottom-up from last row gives O(n) extra space and no boundary checks.",
              "Complexity: O(m·n) time, O(n) space with rolling row."
            ],
            cases: [
              "Obstacle at start or end → 0 paths.",
              "First row/column initialisation: in Unique Paths II, cells after an obstacle in row 0 are 0, not 1.",
              "Using inf for unreachable: guard <code>inf + x</code> comparisons; in Python inf is fine, in Java/C++ overflow.",
              "1×1 grid, single row, single column.",
              "Dungeon: hp must stay ≥ 1 at all times, including on the starting cell.",
              "Out of Boundary Paths needs modulo 10^9+7."
            ],
            qa: [
              { q: "Why can't Dungeon Game be solved top-left to bottom-right?", a: "The minimum initial HP depends on future cells; a forward state would need both current HP and the lowest point so far. Going backward, the needed HP at a cell depends only on the needed HP of its successors." },
              { q: "When would you use Dijkstra instead of grid DP?", a: "When moves can go in any direction (cycles possible), so there is no topological fill order. With only right/down moves the grid is a DAG and DP suffices." }
            ],
            code: `def min_path_sum(g):
    m, n = len(g), len(g[0])
    dp = [float('inf')] * n
    dp[0] = 0
    for r in range(m):
        dp[0] += g[r][0]
        for c in range(1, n):
            dp[c] = g[r][c] + min(dp[c], dp[c-1])   # up, left
    return dp[-1]

def calculate_minimum_hp(d):
    m, n = len(d), len(d[0])
    INF = float('inf')
    need = [[INF] * (n + 1) for _ in range(m + 1)]
    need[m][n-1] = need[m-1][n] = 1
    for r in range(m - 1, -1, -1):
        for c in range(n - 1, -1, -1):
            need[r][c] = max(1, min(need[r+1][c], need[r][c+1]) - d[r][c])
    return need[0][0]`
          },

          /* ---------------- KNAPSACK ---------------- */
          {
            id: 'dp-knapsack',
            title: 'Knapsack family',
            est: '4–5 days',
            why: "Subset sum, partition, coin change and target sum are among the most asked DP problems; recognising the knapsack shape unlocks dozens of disguised questions.",
            learn: [
              "0/1 knapsack: <code>dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt]+val)</code>.",
              "1D compression: iterate capacity <b>downwards</b> for 0/1, <b>upwards</b> for unbounded.",
              "Subset sum / partition equal subset sum as boolean knapsack (target = total/2).",
              "Unbounded knapsack: coin change (min coins), rod cutting, perfect squares.",
              "Counting combinations vs permutations: coins outer loop → combinations (Coin Change II); amount outer loop → permutations (Combination Sum IV).",
              "Target Sum reduction: P - N = target, P + N = total → count subsets with sum (total+target)/2.",
              "Multi-dimensional capacity (Ones and Zeroes: dp[zeros][ones]).",
              "Swap state and value when weights are huge but values small (AtCoder Knapsack 2: dp[value] = min weight).",
              "Bitset subset sum optimisation and meet-in-the-middle for n ≈ 40."
            ],
            practice: [
              X('GFG', '0 - 1 Knapsack Problem', 'M'),
              X('GFG', 'Subset Sum Problem', 'M'),
              X('AC', 'Knapsack 1 (Educational DP Contest D)', 'M'),
              LC('Partition Equal Subset Sum', 'M', 'partition-equal-subset-sum'),
              LC('Coin Change', 'M', 'coin-change'),
              LC('Coin Change II', 'M', 'coin-change-ii'),
              LC('Combination Sum IV', 'M', 'combination-sum-iv'),
              LC('Target Sum', 'M', 'target-sum'),
              LC('Last Stone Weight II', 'M', 'last-stone-weight-ii'),
              LC('Ones and Zeroes', 'M', 'ones-and-zeroes'),
              LC('Number of Dice Rolls With Target Sum', 'M', 'number-of-dice-rolls-with-target-sum'),
              X('CSES', 'Book Shop', 'M'),
              X('CSES', 'Coin Combinations II', 'M'),
              X('CSES', 'Money Sums', 'M'),
              X('AC', 'Knapsack 2 (Educational DP Contest E)', 'H'),
              LC('Profitable Schemes', 'H', 'profitable-schemes'),
              LC('Partition Array Into Two Arrays to Minimize Sum Difference', 'H', 'partition-array-into-two-arrays-to-minimize-sum-difference')
            ],
            notes: [
              "Signals: pick a subset of items with a budget/target; 'can we make sum S', 'split into two groups with equal/min difference', 'number of ways to reach amount', '+/- signs on each number'.",
              "Classify first: each item used at most once (0/1) or unlimited (unbounded)? Counting, boolean or optimisation?",
              "0/1 → <code>for item: for w in range(W, wt-1, -1)</code>. Unbounded → <code>for item: for w in range(wt, W+1)</code>.",
              "Coin Change (min): <code>dp[a] = min(dp[a], dp[a-c]+1)</code>, init inf, dp[0]=0.",
              "Last Stone Weight II = minimise |S1 - S2| = partition closest to total/2.",
              "Complexity: O(n·W) pseudo-polynomial - fine when W ≤ ~10^5; NP-hard in general, so mention meet-in-the-middle when n ≤ 40 and W is huge.",
              "Profitable Schemes: 3D state (members used, profit capped at minProfit) - capping a dimension is a common trick."
            ],
            cases: [
              "Wrong loop direction silently turns 0/1 into unbounded (or vice versa).",
              "Coin Change: amount 0 → 0 coins; unreachable → return -1 (check dp[amount] == inf).",
              "Target Sum: if (total + target) is odd or |target| &gt; total → 0 ways. Zeros in the array double the count - DP handles it, the formula must not skip them.",
              "Partition: odd total → False immediately.",
              "Combinations vs permutations loop order - Coin Change II with amount-outer loop overcounts.",
              "Counting problems overflow in Java/C++ - use modulo or long."
            ],
            qa: [
              { q: "Why iterate capacity backwards in 1D 0/1 knapsack?", a: "dp[w-wt] must still hold the value from the previous item row. Going downward ensures it has not yet been updated with the current item, so each item is used at most once. Going upward allows reuse → unbounded knapsack." },
              { q: "Coin Change II vs Combination Sum IV - what differs?", a: "Same recurrence, different loop order. Coins outer, amount inner counts each multiset once (combinations). Amount outer, coins inner counts ordered sequences (permutations)." },
              { q: "Is knapsack polynomial?", a: "No - O(nW) is pseudo-polynomial because W is exponential in its bit-length. 0/1 knapsack is NP-hard." }
            ],
            code: `def knapsack01(wt, val, W):
    dp = [0] * (W + 1)
    for w_i, v_i in zip(wt, val):
        for w in range(W, w_i - 1, -1):     # downward: each item once
            dp[w] = max(dp[w], dp[w - w_i] + v_i)
    return dp[W]

def can_partition(nums):
    s = sum(nums)
    if s % 2: return False
    t = s // 2
    dp = [True] + [False] * t
    for x in nums:
        for w in range(t, x - 1, -1):
            dp[w] = dp[w] or dp[w - x]
    return dp[t]

def coin_change(coins, amount):           # unbounded, min
    INF = float('inf')
    dp = [0] + [INF] * amount
    for c in coins:
        for a in range(c, amount + 1):      # upward: reuse allowed
            dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != INF else -1

def change(amount, coins):                # combinations count
    dp = [1] + [0] * amount
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
    return dp[amount]`
          },

          /* ---------------- STRING DP ---------------- */
          {
            id: 'dp-strings',
            title: 'DP on strings & subsequences',
            est: '5–6 days',
            why: "LCS, edit distance, LIS and palindrome DPs are interview staples at product companies; wildcard/regex matching are classic hard rounds.",
            learn: [
              "Two-string DP: <code>dp[i][j]</code> = answer for prefixes s[:i], t[:j]; match → diagonal, mismatch → combine left/up.",
              "LCS and its derivatives: min deletions, shortest common supersequence, min ASCII delete sum.",
              "Edit distance: insert (left), delete (up), replace (diag) + 1.",
              "LIS O(n²) DP and O(n log n) patience sorting with <code>bisect_left</code> on tails.",
              "LIS variants: count of LIS, Russian Doll Envelopes (sort w asc, h desc), longest string chain.",
              "Palindromes: substring via expand-around-centre or <code>dp[i][j] = s[i]==s[j] and dp[i+1][j-1]</code>; subsequence via LCS(s, reverse(s)) or interval DP.",
              "Pattern matching: wildcard (<code>*</code> matches any sequence) and regex (<code>x*</code> = zero or more x).",
              "Distinct subsequences (counting): <code>dp[i][j] = dp[i-1][j] + (s[i-1]==t[j-1])*dp[i-1][j-1]</code>.",
              "Space optimisation to two rows (or one row + diag variable)."
            ],
            practice: [
              LC('Is Subsequence', 'E', 'is-subsequence'),
              LC('Longest Common Subsequence', 'M', 'longest-common-subsequence'),
              X('AC', 'LCS (Educational DP Contest F)', 'M'),
              LC('Delete Operation for Two Strings', 'M', 'delete-operation-for-two-strings'),
              LC('Minimum ASCII Delete Sum for Two Strings', 'M', 'minimum-ascii-delete-sum-for-two-strings'),
              LC('Longest Increasing Subsequence', 'M', 'longest-increasing-subsequence'),
              LC('Number of Longest Increasing Subsequence', 'M', 'number-of-longest-increasing-subsequence'),
              LC('Longest String Chain', 'M', 'longest-string-chain'),
              LC('Longest Palindromic Substring', 'M', 'longest-palindromic-substring'),
              LC('Palindromic Substrings', 'M', 'palindromic-substrings'),
              LC('Longest Palindromic Subsequence', 'M', 'longest-palindromic-subsequence'),
              LC('Edit Distance', 'M', 'edit-distance'),
              LC('Interleaving String', 'M', 'interleaving-string'),
              LC('Russian Doll Envelopes', 'H', 'russian-doll-envelopes'),
              LC('Shortest Common Supersequence', 'H', 'shortest-common-supersequence'),
              LC('Distinct Subsequences', 'H', 'distinct-subsequences'),
              LC('Wildcard Matching', 'H', 'wildcard-matching'),
              LC('Regular Expression Matching', 'H', 'regular-expression-matching')
            ],
            notes: [
              "Signals: two strings + 'common', 'convert', 'minimum operations', 'interleave', 'match pattern' → <code>dp[i][j]</code> on prefixes. One string + 'palindrome' → <code>dp[i][j]</code> on substrings.",
              "Use 1-indexed dp of size (m+1)×(n+1) so row/col 0 represent empty prefixes - removes boundary checks.",
              "Edit distance: <code>dp[i][j] = dp[i-1][j-1] if a[i-1]==b[j-1] else 1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])</code>.",
              "LIS O(n log n): <code>tails[k]</code> = smallest tail of an increasing subsequence of length k+1; bisect_left for strict, bisect_right for non-decreasing. tails is NOT the LIS itself.",
              "Regex: if p[j-1]=='*': <code>dp[i][j] = dp[i][j-2] or (match(i, j-1) and dp[i-1][j])</code>; else diagonal if chars match or '.'.",
              "Wildcard: '*' → <code>dp[i][j] = dp[i][j-1] (empty) or dp[i-1][j] (consume one)</code>.",
              "Longest palindromic substring: expand-around-centre O(n²) time O(1) space is the expected answer; Manacher O(n) as bonus.",
              "Complexity: O(m·n) time, O(min(m,n)) space with rolling rows."
            ],
            cases: [
              "Empty strings: edit distance to '' is the other length; regex '' vs 'a*' is True (initialise dp[0][j] for patterns like a*b*).",
              "Interleaving String: len(s1)+len(s2) != len(s3) → False upfront.",
              "Distinct subsequences can be huge - LC guarantees fits in 32-bit, but intermediate values may not; use modulo if asked.",
              "LIS strict vs non-decreasing → bisect_left vs bisect_right.",
              "Russian Doll: sort heights descending for equal widths, otherwise same-width envelopes nest incorrectly.",
              "Rolling 1-row edit distance needs a saved <code>prev_diag</code> variable before overwriting.",
              "Palindrome DP fill order: by increasing length, or i from n-1 down to 0 and j from i up."
            ],
            qa: [
              { q: "Explain the O(n log n) LIS.", a: "Maintain tails[k] = minimum possible tail of an increasing subsequence of length k+1. For each x, binary search the first tail ≥ x and replace it (or append). tails stays sorted; its length is the LIS length." },
              { q: "Longest palindromic subsequence vs substring?", a: "Subsequence may skip characters: dp[i][j] = 2+dp[i+1][j-1] if equal else max(dp[i+1][j], dp[i][j-1]) (= LCS with reverse). Substring must be contiguous: expand around centre or boolean dp." },
              { q: "How do you reconstruct the LCS string?", a: "Keep the full table, start at (m,n): if chars equal, take it and go diagonal; else move toward the larger of up/left. Reverse the collected chars." }
            ],
            code: `from bisect import bisect_left

def lcs(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = dp[i-1][j-1] + 1 if a[i-1] == b[j-1] \\
                       else max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

def edit_distance(a, b):
    prev = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        cur = [i] + [0] * len(b)
        for j in range(1, len(b) + 1):
            if a[i-1] == b[j-1]: cur[j] = prev[j-1]
            else: cur[j] = 1 + min(prev[j], cur[j-1], prev[j-1])
        prev = cur
    return prev[-1]

def lis(nums):
    tails = []
    for x in nums:
        k = bisect_left(tails, x)
        if k == len(tails): tails.append(x)
        else: tails[k] = x
    return len(tails)

def is_match(s, p):                       # regex . and *
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    for j in range(2, n + 1):
        dp[0][j] = p[j-1] == '*' and dp[0][j-2]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == '*':
                dp[i][j] = dp[i][j-2] or (p[j-2] in (s[i-1], '.') and dp[i-1][j])
            else:
                dp[i][j] = p[j-1] in (s[i-1], '.') and dp[i-1][j-1]
    return dp[m][n]`
          },

          /* ---------------- INTERVAL DP ---------------- */
          {
            id: 'dp-interval',
            title: 'Interval / partition DP (MCM pattern)',
            est: '3–4 days',
            why: "Burst Balloons, Palindrome Partitioning II and matrix-chain style questions are favourite hard rounds at top product companies; the pattern is reusable once internalised.",
            learn: [
              "State <code>dp[i][j]</code> = best answer for the subarray/substring i..j.",
              "Transition: try every split point k in (i, j) and combine dp[i][k], dp[k][j] + cost(i,k,j).",
              "Fill by increasing interval length (or i descending, j ascending).",
              "Matrix Chain Multiplication as the template: <code>dp[i][j] = min(dp[i][k]+dp[k+1][j]+p[i-1]p[k]p[j])</code>.",
              "'Last operation' thinking: Burst Balloons chooses the <b>last</b> balloon k burst in (i, j) so neighbours are fixed at i and j.",
              "Prefix partition DP: Palindrome Partitioning II - <code>cuts[i] = min(cuts[j-1]+1)</code> for palindromic s[j..i], with precomputed palindrome table.",
              "Game-theory interval DP: Stone Game / Predict the Winner (score difference).",
              "Knuth / divide-and-conquer optimisations exist for O(n³)→O(n²) (awareness only)."
            ],
            practice: [
              LC('Predict the Winner', 'M', 'predict-the-winner'),
              LC('Stone Game', 'M', 'stone-game'),
              X('AC', 'Deque (Educational DP Contest L)', 'M'),
              X('GFG', 'Matrix Chain Multiplication', 'M'),
              LC('Minimum Score Triangulation of Polygon', 'M', 'minimum-score-triangulation-of-polygon'),
              LC('Minimum Cost Tree From Leaf Values', 'M', 'minimum-cost-tree-from-leaf-values'),
              LC('Guess Number Higher or Lower II', 'M', 'guess-number-higher-or-lower-ii'),
              X('GFG', 'Boolean Parenthesization', 'H'),
              X('AC', 'Slimes (Educational DP Contest N)', 'H'),
              LC('Palindrome Partitioning II', 'H', 'palindrome-partitioning-ii'),
              LC('Minimum Cost to Cut a Stick', 'H', 'minimum-cost-to-cut-a-stick'),
              LC('Burst Balloons', 'H', 'burst-balloons'),
              LC('Strange Printer', 'H', 'strange-printer'),
              LC('Minimum Cost to Merge Stones', 'H', 'minimum-cost-to-merge-stones'),
              LC('Remove Boxes', 'H', 'remove-boxes')
            ],
            notes: [
              "Signals: 'merge adjacent', 'burst/remove and neighbours change', 'parenthesise', 'cut a stick/string at positions', 'two players take from either end', n ≤ 500.",
              "Ask: what is the <b>first</b> or <b>last</b> action inside [i, j] that splits it into independent subproblems? Burst Balloons and Cut Stick become easy with 'last'.",
              "Pad the array (balloons with 1 on both ends, cuts with 0 and n) so boundaries are uniform.",
              "Two-player games: <code>dp[i][j]</code> = max (my score - opponent score) on a[i..j] = max(a[i]-dp[i+1][j], a[j]-dp[i][j-1]).",
              "Palindrome Partitioning II is O(n²) with a pal[i][j] table - not O(n³) interval DP.",
              "Complexity: O(n²) states × O(n) splits = O(n³); n ≈ 500 is the usual upper bound."
            ],
            cases: [
              "Wrong fill order (row-major i ascending) reads uncomputed dp[k+1][j] - iterate by length.",
              "Off-by-one in inclusive vs exclusive interval ends - pick one convention and stick to it.",
              "Burst Balloons with dp over open interval (i, j): base case j - i &lt; 2 → 0.",
              "Minimum Cost to Merge Stones: impossible when (n-1) % (k-1) != 0 → -1.",
              "Recursive memo with n=500 → 125M ops in Python is too slow; prefer bottom-up and mention constant factors.",
              "Strange Printer: compress consecutive duplicate chars first."
            ],
            qa: [
              { q: "Why choose the last balloon rather than the first in Burst Balloons?", a: "If k is the first burst, its removal makes i..k-1 and k+1..j adjacent, so subproblems are not independent. If k is the last burst in (i, j), its neighbours are exactly i and j, and the two sides are independent: dp[i][k] + dp[k][j] + a[i]a[k]a[j]." },
              { q: "What is the time complexity of matrix-chain multiplication DP and can it be improved?", a: "O(n³) time, O(n²) space. Hu-Shing achieves O(n log n); Knuth optimisation applies to problems with the quadrangle inequality (e.g. optimal BST)." }
            ],
            code: `def mcm(p):                       # p: dims, matrices = len(p)-1
    n = len(p) - 1
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = min(dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]
                           for k in range(i, j))
    return dp[0][n-1]

def max_coins(nums):              # Burst Balloons
    a = [1] + nums + [1]
    n = len(a)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n):            # open interval (i, j)
        for i in range(n - length):
            j = i + length
            dp[i][j] = max(dp[i][k] + dp[k][j] + a[i]*a[k]*a[j]
                           for k in range(i + 1, j))
    return dp[0][n-1]

def min_cut(s):                   # Palindrome Partitioning II
    n = len(s)
    pal = [[False] * n for _ in range(n)]
    cuts = list(range(n))
    for i in range(n):
        for j in range(i + 1):
            if s[i] == s[j] and (i - j < 2 or pal[j+1][i-1]):
                pal[j][i] = True
                cuts[i] = 0 if j == 0 else min(cuts[i], cuts[j-1] + 1)
    return cuts[-1]`
          },

          /* ---------------- TREE / GRAPH DP ---------------- */
          {
            id: 'dp-trees-graphs',
            title: 'DP on trees & DAGs',
            est: '3–4 days',
            why: "Tree DP (house robber III, cameras, max path sum) is a common hard; rerooting and DAG DP show up in Google/competitive-style rounds.",
            learn: [
              "Post-order DFS: compute a node's state from its children's returned states.",
              "Return a tuple of states per node (rob / not rob; covered / has camera / not covered).",
              "'Answer through node' vs 'value returned to parent' - diameter and max path sum update a global with both arms but return one arm.",
              "Tree diameter via DP (top two child depths) and via double BFS.",
              "<b>Rerooting</b>: compute answer for root, then push to children: <code>ans[child] = ans[parent] - size[child] + (n - size[child])</code> (Sum of Distances).",
              "DP on DAG: topological order (Kahn) or memo DFS; longest path, number of paths, critical path (Parallel Courses III).",
              "Counting structures: unique BSTs (Catalan) as DP over root choice.",
              "Iterative DFS / explicit stack for deep trees (n = 10^5) to avoid recursion limits."
            ],
            practice: [
              LC('Unique Binary Search Trees', 'M', 'unique-binary-search-trees'),
              LC('House Robber III', 'M', 'house-robber-iii'),
              LC('Longest ZigZag Path in a Binary Tree', 'M', 'longest-zigzag-path-in-a-binary-tree'),
              LC('Distribute Coins in Binary Tree', 'M', 'distribute-coins-in-binary-tree'),
              X('CSES', 'Subordinates', 'E'),
              X('CSES', 'Tree Diameter', 'M'),
              X('AC', 'Longest Path (Educational DP Contest G)', 'M'),
              X('AC', 'Independent Set (Educational DP Contest P)', 'M'),
              X('CSES', 'Tree Matching', 'M'),
              LC('Longest Increasing Path in a Matrix', 'H', 'longest-increasing-path-in-a-matrix'),
              LC('Parallel Courses III', 'H', 'parallel-courses-iii'),
              LC('Longest Path With Different Adjacent Characters', 'H', 'longest-path-with-different-adjacent-characters'),
              LC('Binary Tree Cameras', 'H', 'binary-tree-cameras'),
              LC('Maximum Sum BST in Binary Tree', 'H', 'maximum-sum-bst-in-binary-tree'),
              X('CSES', 'Tree Distances II', 'H'),
              LC('Sum of Distances in Tree', 'H', 'sum-of-distances-in-tree')
            ],
            notes: [
              "Signals: tree + 'choose nodes with constraint on adjacent nodes', 'max/min over all paths', 'answer for every node as root' (→ rerooting).",
              "House Robber III: return (rob, skip): rob = val + L.skip + R.skip; skip = max(L) + max(R).",
              "Binary Tree Cameras greedy-DP: states 0 = not covered, 1 = has camera, 2 = covered without camera; place camera at parent of uncovered leaf.",
              "Rerooting template: DFS1 computes subtree info (size, down-sum), DFS2 propagates parent contribution top-down - O(n) total for all roots.",
              "DAG DP: process in topological order; <code>dist[v] = max(dist[v], dist[u] + w)</code>. Longest path is NP-hard on general graphs but linear on DAGs.",
              "Longest Increasing Path in Matrix: strict increase makes the grid a DAG → memo DFS, no visited set needed.",
              "Complexity: O(n) for tree DP (each edge visited twice), O(V+E) for DAG DP."
            ],
            cases: [
              "Null children return neutral states (e.g. (0,0), or depth -1/0 by convention) - decide consistently.",
              "Max path sum with all negative values: don't clamp the node itself, only the child arms at 0.",
              "Skewed tree of 10^5 nodes exceeds Python recursion - iterative post-order or raise the limit + threading stack size.",
              "Undirected tree adjacency: pass parent to avoid going back up.",
              "Cycles mean it's not a DAG - detect (Kahn's count &lt; n) before DP.",
              "Rerooting formulas assume n = total nodes; recompute carefully when edges have weights."
            ],
            qa: [
              { q: "What is rerooting and when do you need it?", a: "When you need a DP value for every node as the root. Compute it once for an arbitrary root, then shift the root across each edge in O(1) using the parent's answer and the child's subtree info, giving O(n) instead of O(n²)." },
              { q: "Why is longest path easy on a DAG but hard in general?", a: "A DAG has a topological order so each vertex's best value depends only on predecessors (no cycles to revisit). On general graphs longest simple path is NP-hard (Hamiltonian path reduces to it)." }
            ],
            code: `def rob_tree(root):                # House Robber III
    def dfs(node):
        if not node: return (0, 0)          # (rob, skip)
        l, r = dfs(node.left), dfs(node.right)
        return (node.val + l[1] + r[1], max(l) + max(r))
    return max(dfs(root))

def sum_of_distances(n, edges):     # rerooting
    g = [[] for _ in range(n)]
    for a, b in edges: g[a].append(b); g[b].append(a)
    size, ans = [1] * n, [0] * n
    order, parent = [0], [-1] * n
    for u in order:                         # BFS order
        for v in g[u]:
            if v != parent[u]: parent[v] = u; order.append(v)
    for u in reversed(order):               # post-order: sizes + root ans
        if parent[u] >= 0:
            size[parent[u]] += size[u]
            ans[0] += size[u]                # each edge contributes size[u]
    for u in order[1:]:                     # top-down reroot
        ans[u] = ans[parent[u]] - size[u] + (n - size[u])
    return ans`
          },

          /* ---------------- BITMASK & DIGIT DP ---------------- */
          {
            id: 'dp-bitmask-digit',
            title: 'Bitmask & digit DP',
            est: '3–4 days',
            why: "Less frequent but a strong differentiator in Google / competitive-leaning rounds; constraints like n ≤ 16 or 'count numbers ≤ N with property' are dead giveaways.",
            learn: [
              "Bitmask as a set: <code>mask &amp; (1&lt;&lt;i)</code>, add <code>mask | 1&lt;&lt;i</code>, iterate submasks <code>sub = (sub-1) &amp; mask</code>.",
              "Subset DP: <code>dp[mask]</code> = best answer using exactly the elements in mask.",
              "TSP / Hamiltonian path: <code>dp[mask][last]</code>, O(2^n · n²).",
              "Assignment problems: dp[mask] where popcount(mask) = number of people already assigned.",
              "Partition into k subsets: dp[mask] = current fill of the open bucket (mod target).",
              "Submask enumeration over all masks is O(3^n).",
              "Digit DP state: (pos, tight, started/leading-zero, extra state like sum or used-digits mask).",
              "Count in [L, R] = f(R) - f(L-1)."
            ],
            practice: [
              LC('Beautiful Arrangement', 'M', 'beautiful-arrangement'),
              LC('Matchsticks to Square', 'M', 'matchsticks-to-square'),
              LC('Partition to K Equal Sum Subsets', 'M', 'partition-to-k-equal-sum-subsets'),
              LC('Can I Win', 'M', 'can-i-win'),
              LC('Count Numbers with Unique Digits', 'M', 'count-numbers-with-unique-digits'),
              X('AC', 'Matching (Educational DP Contest O)', 'H'),
              X('CSES', 'Hamiltonian Flights', 'H'),
              LC('Shortest Path Visiting All Nodes', 'H', 'shortest-path-visiting-all-nodes'),
              LC('Find the Shortest Superstring', 'H', 'find-the-shortest-superstring'),
              LC('Smallest Sufficient Team', 'H', 'smallest-sufficient-team'),
              LC('Number of Ways to Wear Different Hats to Each Other', 'H', 'number-of-ways-to-wear-different-hats-to-each-other'),
              LC('Parallel Courses II', 'H', 'parallel-courses-ii'),
              LC('Number of Digit One', 'H', 'number-of-digit-one'),
              LC('Numbers At Most N Given Digit Set', 'H', 'numbers-at-most-n-given-digit-set'),
              LC('Non-negative Integers without Consecutive Ones', 'H', 'non-negative-integers-without-consecutive-ones'),
              LC('Count Special Integers', 'H', 'count-special-integers'),
              X('AC', 'Digit Sum (Educational DP Contest S)', 'H'),
              X('CSES', 'Counting Numbers', 'H')
            ],
            notes: [
              "Signals for bitmask: n ≤ 20 (2^20 ≈ 10^6), 'visit all', 'assign each X to a distinct Y', 'partition into groups', 'order matters among a small set'.",
              "If one side is small (hats ≤ 40, people ≤ 10), put the <b>small</b> side in the mask.",
              "BFS on (node, mask) for shortest path visiting all nodes - unweighted so BFS beats DP+Dijkstra.",
              "Signals for digit DP: 'count integers in [L, R] such that digits ...', N up to 10^18.",
              "Digit DP: tight = prefix equals N's prefix so far (limits next digit to N[pos]); memoise only when not tight (or include tight in key).",
              "Leading-zero flag matters when the property involves digits used (unique digits) or nonzero counts.",
              "Complexity: bitmask O(2^n · n) or O(2^n · n²); digit DP O(len · states · 10)."
            ],
            cases: [
              "Python operator precedence: <code>1 &lt;&lt; i &amp; mask</code> - parenthesise shifts.",
              "2^n · n² for n = 20 is 4·10^8 - too slow in Python; check limits before choosing state.",
              "Memo key must include every changing variable (forgetting 'tight' or 'started' gives wrong counts).",
              "Digit DP for f(L-1) when L = 0 → handle negative / zero explicitly.",
              "Partition k subsets: early exit if total % k != 0 or max element &gt; target; sort descending to prune.",
              "Can I Win: if sum(1..n) &lt; desiredTotal → False; desiredTotal ≤ 0 → True."
            ],
            qa: [
              { q: "How do you recognise a bitmask DP problem?", a: "Small n (≤ 20) and a state that depends on which subset of items is used/visited, not just how many - e.g. TSP, assignment, partition into groups. Exponential in n but polynomial otherwise." },
              { q: "Explain the 'tight' flag in digit DP.", a: "While building the number digit by digit from the most significant, tight=True means all previous digits equal N's, so the current digit is bounded by N[pos]; once you place a smaller digit, the rest are free (0-9) and tight becomes False." }
            ],
            code: `from functools import lru_cache

def tsp(dist):                       # min Hamiltonian cycle from 0
    n = len(dist); FULL = 1 << n; INF = float('inf')
    dp = [[INF] * n for _ in range(FULL)]
    dp[1][0] = 0
    for mask in range(FULL):
        for u in range(n):
            if dp[mask][u] == INF or not (mask >> u) & 1: continue
            for v in range(n):
                if (mask >> v) & 1: continue
                nm = mask | (1 << v)
                dp[nm][v] = min(dp[nm][v], dp[mask][u] + dist[u][v])
    return min(dp[FULL-1][u] + dist[u][0] for u in range(n))

def count_digit_sum_mod(N, D):        # count 1..N with digit sum % D == 0
    s = str(N); MOD = 10**9 + 7
    @lru_cache(None)
    def f(pos, rem, tight):
        if pos == len(s): return int(rem == 0)
        hi = int(s[pos]) if tight else 9
        return sum(f(pos+1, (rem+d) % D, tight and d == hi)
                   for d in range(hi + 1)) % MOD
    return (f(0, 0, True) - 1) % MOD   # exclude 0`
          },

          /* ---------------- STOCKS / STATE MACHINE ---------------- */
          {
            id: 'dp-stocks-state',
            title: 'DP on stocks & state machines',
            est: '2–3 days',
            why: "The stock series (I–IV, cooldown, fee) is asked constantly; the state-machine framing also solves paint-house / attendance / vowel-permutation style problems.",
            learn: [
              "Model each day with states (hold / not hold / cooldown) and transitions between them.",
              "Stock I: track min price so far (one transaction).",
              "Stock II: unlimited transactions = sum of positive differences (or hold/cash DP).",
              "Stock III / IV: state (transactions used, holding) → <code>buy[k], sell[k]</code> arrays.",
              "Cooldown: three states hold, sold, rest; fee: subtract fee on sell.",
              "Stock IV with k ≥ n/2 degenerates to Stock II (avoid O(nk) blow-up).",
              "General state machines: last colour (Paint House), absent count + trailing late count (Student Attendance II).",
              "Matrix exponentiation for linear state machines with huge n (awareness)."
            ],
            practice: [
              LC('Best Time to Buy and Sell Stock', 'E', 'best-time-to-buy-and-sell-stock'),
              LC('Best Time to Buy and Sell Stock II', 'M', 'best-time-to-buy-and-sell-stock-ii'),
              LC('Best Time to Buy and Sell Stock with Transaction Fee', 'M', 'best-time-to-buy-and-sell-stock-with-transaction-fee'),
              LC('Best Time to Buy and Sell Stock with Cooldown', 'M', 'best-time-to-buy-and-sell-stock-with-cooldown'),
              X('AC', 'Vacation (Educational DP Contest C)', 'M'),
              X('GFG', 'Geek\'s Training', 'M'),
              LC('Minimum Swaps To Make Sequences Increasing', 'H', 'minimum-swaps-to-make-sequences-increasing'),
              LC('Best Time to Buy and Sell Stock III', 'H', 'best-time-to-buy-and-sell-stock-iii'),
              LC('Best Time to Buy and Sell Stock IV', 'H', 'best-time-to-buy-and-sell-stock-iv'),
              LC('Student Attendance Record II', 'H', 'student-attendance-record-ii'),
              LC('Paint House III', 'H', 'paint-house-iii'),
              LC('Number of Ways to Paint N × 3 Grid', 'H', 'number-of-ways-to-paint-n-3-grid')
            ],
            notes: [
              "Signals: sequence of days/positions, a small set of 'modes' you can be in (holding, cooling, last colour), constraints on mode transitions.",
              "Draw the state diagram first, then each state's update is max over incoming edges - mention this to the interviewer.",
              "Cooldown: <code>hold = max(hold, rest - p); sold = hold_prev + p; rest = max(rest, sold_prev)</code>.",
              "Stock III/IV: <code>buy[j] = max(buy[j], sell[j-1] - p); sell[j] = max(sell[j], buy[j] + p)</code> for j = 1..k.",
              "Fee: subtract on sell (or buy) - consistently, once per transaction.",
              "Complexity: O(n · states) time, O(states) space."
            ],
            cases: [
              "Initialise hold/buy states with <code>-inf</code> (or -prices[0]), not 0 - you cannot sell before buying.",
              "Updating states in the wrong order within a day can allow buy+sell on the same day; use temps from the previous day when it matters (cooldown).",
              "Stock IV: k = 0 or len(prices) &lt; 2 → 0; k ≥ n/2 → greedy Stock II.",
              "Monotonically decreasing prices → profit 0, never negative.",
              "Attendance II needs modulo 10^9+7 and states (A count ≤ 1, trailing L ≤ 2)."
            ],
            qa: [
              { q: "Why can Stock II be solved greedily?", a: "With unlimited transactions any increasing run's profit equals the sum of consecutive positive differences, so taking every positive day-to-day gain is optimal." },
              { q: "Describe the state machine for Stock with Cooldown.", a: "States: hold (own a share), sold (just sold today), rest (no share, free to buy). hold ← max(hold, rest - p); sold ← hold + p; rest ← max(rest, sold). Answer max(sold, rest)." }
            ],
            code: `def max_profit_k(k, prices):          # Stock IV (III is k=2)
    if not prices or k == 0: return 0
    if k >= len(prices) // 2:
        return sum(max(0, b - a) for a, b in zip(prices, prices[1:]))
    buy = [float('-inf')] * (k + 1)
    sell = [0] * (k + 1)
    for p in prices:
        for j in range(1, k + 1):
            buy[j] = max(buy[j], sell[j-1] - p)
            sell[j] = max(sell[j], buy[j] + p)
    return sell[k]

def max_profit_cooldown(prices):
    hold, sold, rest = float('-inf'), 0, 0
    for p in prices:
        hold, sold, rest = max(hold, rest - p), hold + p, max(rest, sold)
    return max(sold, rest)`
          }
        ]
      },

      {
        name: 'Level 4 · Advanced & competitive',
        topics: [
          /* ---------------- SEGMENT / FENWICK ---------------- */
          {
            id: 'segment-fenwick',
            title: 'Segment tree & Fenwick tree (BIT)',
            est: '4–5 days',
            why: "Range queries with updates appear in Google/competitive rounds and as the 'optimal' solution to count-smaller / reverse-pairs / calendar problems.",
            learn: [
              "Prefix sums handle static range sums; updates need a tree structure (O(log n) both).",
              "Fenwick tree: <code>i &amp; -i</code> lowbit, point update + prefix query, 1-indexed.",
              "Fenwick variants: range update + point query (difference array in BIT), range update + range query (two BITs).",
              "Segment tree (array of size 4n): build, point update, range query for any associative op (sum, min, max, gcd).",
              "Lazy propagation for range updates (range add / range assign) with range queries.",
              "Inversion count / count smaller after self: coordinate-compress values, sweep with BIT.",
              "Segment tree on coordinates / dynamic (sparse) segment tree for huge ranges (My Calendar III, Range Module).",
              "Merge sort alternative for inversion-type problems; order-statistic queries via BIT binary lifting.",
              "Sweep line + segment tree (Rectangle Area II, Skyline) as advanced application."
            ],
            practice: [
              LC('Range Sum Query - Immutable', 'E', 'range-sum-query-immutable'),
              X('CSES', 'Static Range Sum Queries', 'E'),
              LC('Range Sum Query - Mutable', 'M', 'range-sum-query-mutable'),
              X('CSES', 'Dynamic Range Sum Queries', 'M'),
              X('CSES', 'Dynamic Range Minimum Queries', 'M'),
              X('GFG', 'Count Inversions', 'M'),
              X('CSES', 'Range Update Queries', 'M'),
              X('CSES', 'Hotel Queries', 'M'),
              LC('Count of Smaller Numbers After Self', 'H', 'count-of-smaller-numbers-after-self'),
              LC('Reverse Pairs', 'H', 'reverse-pairs'),
              LC('Count of Range Sum', 'H', 'count-of-range-sum'),
              LC('Create Sorted Array through Instructions', 'H', 'create-sorted-array-through-instructions'),
              LC('My Calendar III', 'H', 'my-calendar-iii'),
              LC('Range Module', 'H', 'range-module'),
              LC('Falling Squares', 'H', 'falling-squares'),
              X('CSES', 'Range Updates and Sums', 'H'),
              LC('Longest Increasing Subsequence II', 'H', 'longest-increasing-subsequence-ii'),
              LC('Rectangle Area II', 'H', 'rectangle-area-ii')
            ],
            notes: [
              "Signals: many queries (10^5) mixing 'update element/range' and 'query range sum/min/max'; 'count elements smaller/greater to the right'; values up to 10^9 → compress.",
              "Choose BIT when the op is invertible (sum, xor) and you need short code; segment tree for min/max/gcd, lazy range updates, or custom merges.",
              "Count smaller after self: iterate right-to-left, answer = BIT.query(rank-1), then BIT.add(rank, 1).",
              "Lazy propagation: store pending update at a node; push down before visiting children.",
              "LIS II (difference ≤ k): segment tree over values storing best LIS ending at value v; query max on [v-k, v-1].",
              "Complexity: build O(n), update/query O(log n), memory O(n) for BIT, O(4n) for segment tree."
            ],
            cases: [
              "BIT is 1-indexed - shifting by +1 avoids an infinite loop at index 0.",
              "Coordinate compression must include all values that will be queried (e.g. v-k bounds, prefix sums ± bounds in Count of Range Sum).",
              "Segment tree array size 4n, not 2n, for the recursive version.",
              "Lazy assign vs lazy add have different composition rules - don't mix without care.",
              "Integer overflow on sums in Java/C++ (use long).",
              "Python recursion in segment tree is slow - iterative bottom-up tree for performance-sensitive cases."
            ],
            qa: [
              { q: "Fenwick tree vs segment tree?", a: "BIT: simpler, less memory, great for prefix sums/invertible ops and point updates. Segment tree: supports any associative op (min/max), range updates with lazy propagation, and custom node merges, at the cost of more code and memory." },
              { q: "How does lazy propagation keep updates O(log n)?", a: "A range update stops at the O(log n) nodes that fully cover the range and stores a pending tag; children are updated only when a later operation needs to descend into them (push-down)." },
              { q: "How do you count inversions in O(n log n)?", a: "Merge sort counting cross-pairs during merge, or compress values and sweep with a BIT counting how many previous elements are greater than the current one." }
            ],
            code: `class BIT:
    def __init__(self, n): self.n, self.t = n, [0] * (n + 1)
    def add(self, i, d):            # 1-indexed
        while i <= self.n: self.t[i] += d; i += i & -i
    def sum(self, i):
        s = 0
        while i > 0: s += self.t[i]; i -= i & -i
        return s

def count_smaller(nums):
    rank = {v: i + 1 for i, v in enumerate(sorted(set(nums)))}
    bit, res = BIT(len(rank)), []
    for x in reversed(nums):
        res.append(bit.sum(rank[x] - 1)); bit.add(rank[x], 1)
    return res[::-1]

class SegTree:                       # range add, range sum (lazy)
    def __init__(self, n):
        self.n, self.s, self.lz = n, [0] * 4 * n, [0] * 4 * n
    def _push(self, o, l, r):
        if self.lz[o]:
            m = (l + r) // 2
            for c, lo, hi in ((2*o, l, m), (2*o+1, m+1, r)):
                self.s[c] += self.lz[o] * (hi - lo + 1); self.lz[c] += self.lz[o]
            self.lz[o] = 0
    def update(self, ql, qr, v, o=1, l=0, r=None):
        if r is None: r = self.n - 1
        if qr < l or r < ql: return
        if ql <= l and r <= qr:
            self.s[o] += v * (r - l + 1); self.lz[o] += v; return
        self._push(o, l, r); m = (l + r) // 2
        self.update(ql, qr, v, 2*o, l, m); self.update(ql, qr, v, 2*o+1, m+1, r)
        self.s[o] = self.s[2*o] + self.s[2*o+1]
    def query(self, ql, qr, o=1, l=0, r=None):
        if r is None: r = self.n - 1
        if qr < l or r < ql: return 0
        if ql <= l and r <= qr: return self.s[o]
        self._push(o, l, r); m = (l + r) // 2
        return self.query(ql, qr, 2*o, l, m) + self.query(ql, qr, 2*o+1, m+1, r)`
          },

          /* ---------------- STRING ALGORITHMS ---------------- */
          {
            id: 'string-algorithms',
            title: 'Advanced string algorithms (KMP, Z, Rabin-Karp, Manacher)',
            est: '3–4 days',
            why: "Asked as the follow-up to 'implement strStr' or palindrome questions, and needed for hard string problems (shortest palindrome, longest duplicate substring).",
            learn: [
              "Naive matching is O(n·m); goal is O(n + m).",
              "<b>Prefix function</b> (KMP LPS array): <code>pi[i]</code> = length of longest proper prefix of s[:i+1] that is also a suffix.",
              "KMP search: run prefix function on <code>pattern + '#' + text</code>, or the classic two-pointer match.",
              "Applications of pi: smallest period (<code>n - pi[n-1]</code>), longest happy prefix, shortest palindrome via <code>s + '#' + rev(s)</code>.",
              "<b>Z-algorithm</b>: <code>z[i]</code> = longest substring starting at i that matches a prefix; maintain [l, r] window.",
              "<b>Rabin-Karp</b> rolling hash: polynomial hash mod large prime, O(1) window slide; double hashing to reduce collisions.",
              "Binary search + rolling hash for longest duplicate / common substring.",
              "<b>Manacher</b>: all palindromic radii in O(n) using mirrored centres on the '#'-interleaved string.",
              "Awareness: suffix array / suffix automaton / Aho-Corasick for multi-pattern."
            ],
            practice: [
              LC('Find the Index of the First Occurrence in a String', 'E', 'find-the-index-of-the-first-occurrence-in-a-string'),
              LC('Repeated Substring Pattern', 'E', 'repeated-substring-pattern'),
              LC('Rotate String', 'E', 'rotate-string'),
              X('CSES', 'String Matching', 'M'),
              X('CSES', 'Finding Borders', 'M'),
              X('CSES', 'Finding Periods', 'M'),
              LC('Repeated String Match', 'M', 'repeated-string-match'),
              LC('Longest Palindromic Substring', 'M', 'longest-palindromic-substring'),
              X('GFG', 'Search Pattern (Rabin-Karp Algorithm)', 'M'),
              LC('Longest Happy Prefix', 'H', 'longest-happy-prefix'),
              LC('Shortest Palindrome', 'H', 'shortest-palindrome'),
              LC('Sum of Scores of Built Strings', 'H', 'sum-of-scores-of-built-strings'),
              LC('Distinct Echo Substrings', 'H', 'distinct-echo-substrings'),
              LC('Longest Duplicate Substring', 'H', 'longest-duplicate-substring'),
              X('CSES', 'Longest Palindrome', 'H')
            ],
            notes: [
              "Signals: 'find pattern in text' with large n·m, 'repeated/period', 'longest prefix which is also suffix', 'add chars in front to make palindrome', 'longest repeated substring'.",
              "KMP: on mismatch, fall back <code>j = pi[j-1]</code> instead of restarting - amortised O(n).",
              "Z-function directly gives 'score' of each suffix vs whole string (Sum of Scores of Built Strings = sum(z) + n).",
              "Rolling hash slide: <code>h = (h - s[i]*base^(m-1)) * base + s[i+m]</code> mod p; verify on hash match to rule out collisions.",
              "Longest Duplicate Substring: binary search length L (monotone), check duplicates of length L via rolling hash set → O(n log n).",
              "Manacher returns, for each centre, max palindrome radius - gives longest palindromic substring and count of palindromic substrings in O(n).",
              "Complexity: KMP/Z/Manacher O(n+m); Rabin-Karp expected O(n+m), worst O(n·m) with collisions if you verify."
            ],
            cases: [
              "Empty pattern → index 0 by convention (strStr).",
              "Separator character for concatenation tricks must not appear in either string.",
              "Hash collisions: use mod ~10^9+7 with random base, or double hashing; Python big ints avoid overflow but are slower - still take mod.",
              "Negative values after subtraction in modular arithmetic - add p before %.",
              "Off-by-one in Manacher index mapping back to the original string.",
              "Period from prefix function divides n only if <code>n % (n - pi[-1]) == 0</code> (Repeated Substring Pattern)."
            ],
            qa: [
              { q: "Why is KMP linear?", a: "The text pointer never moves backward; the pattern pointer j increases by at most 1 per character and each fallback decreases it, so total fallbacks ≤ total increases ≤ n. Hence O(n + m)." },
              { q: "Rabin-Karp vs KMP in practice?", a: "KMP is deterministic O(n+m). Rabin-Karp is simpler to extend to multiple patterns of the same length, 2D matching and substring-equality queries (e.g. binary search + hash), but is probabilistic and needs collision handling." },
              { q: "How do you find the shortest palindrome by adding chars in front?", a: "Find the longest palindromic prefix: compute the prefix function of s + '#' + reverse(s); the last pi value is its length. Prepend reverse of the remaining suffix." }
            ],
            code: `def prefix_function(s):
    pi = [0] * len(s)
    for i in range(1, len(s)):
        j = pi[i-1]
        while j and s[i] != s[j]: j = pi[j-1]
        if s[i] == s[j]: j += 1
        pi[i] = j
    return pi

def kmp_find(text, pat):
    if not pat: return 0
    pi = prefix_function(pat + '\\x00' + text)
    m = len(pat)
    for i in range(2 * m, len(pi)):
        if pi[i] == m: return i - 2 * m
    return -1

def z_function(s):
    n = len(s); z = [0] * n; l = r = 0
    for i in range(1, n):
        if i < r: z[i] = min(r - i, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]: z[i] += 1
        if i + z[i] > r: l, r = i, i + z[i]
    return z

def manacher(s):                      # longest palindromic substring
    t = '#' + '#'.join(s) + '#'
    n = len(t); p = [0] * n; c = r = 0
    for i in range(n):
        if i < r: p[i] = min(r - i, p[2*c - i])
        while i-p[i]-1 >= 0 and i+p[i]+1 < n and t[i-p[i]-1] == t[i+p[i]+1]:
            p[i] += 1
        if i + p[i] > r: c, r = i, i + p[i]
    k = max(range(n), key=p.__getitem__)
    return s[(k - p[k]) // 2:(k + p[k]) // 2]`
          },

          /* ---------------- SPARSE TABLE / LCA ---------------- */
          {
            id: 'sparse-table-lca',
            title: 'Sparse table / RMQ & binary lifting (LCA)',
            est: '2–3 days',
            why: "Rare in standard interviews but expected in Google / competitive-flavoured rounds; binary lifting is the go-to for k-th ancestor and path queries on trees.",
            learn: [
              "Sparse table: <code>st[j][i]</code> = op over a[i .. i+2^j-1], built in O(n log n).",
              "O(1) RMQ for idempotent ops (min, max, gcd) using two overlapping blocks of size 2^k, <code>k = log2(r-l+1)</code>.",
              "Non-idempotent ops (sum) need O(log n) decomposition - prefer prefix sums / BIT.",
              "Binary lifting: <code>up[j][v]</code> = 2^j-th ancestor of v; k-th ancestor in O(log n).",
              "LCA via binary lifting: equalise depths, then lift both while ancestors differ.",
              "Path aggregates with lifting (max edge weight on path, counts per weight).",
              "Alternatives: Euler tour + RMQ for O(1) LCA; Tarjan offline LCA with DSU.",
              "Binary lifting on functional graphs (k-th successor, ball passing game)."
            ],
            practice: [
              LC('Lowest Common Ancestor of a Binary Tree', 'M', 'lowest-common-ancestor-of-a-binary-tree'),
              X('CSES', 'Static Range Minimum Queries', 'E'),
              X('CSES', 'Company Queries I', 'M'),
              X('CSES', 'Company Queries II', 'M'),
              X('CSES', 'Distance Queries', 'M'),
              X('CSES', 'Planets Queries I', 'M'),
              X('GFG', 'Range Minimum Query', 'M'),
              LC('Kth Ancestor of a Tree Node', 'H', 'kth-ancestor-of-a-tree-node'),
              LC('Minimum Edge Weight Equilibrium Queries in a Tree', 'H', 'minimum-edge-weight-equilibrium-queries-in-a-tree'),
              LC('Maximize Value of Function in a Ball Passing Game', 'H', 'maximize-value-of-function-in-a-ball-passing-game'),
              X('CSES', 'Counting Paths', 'H')
            ],
            notes: [
              "Signals: many (10^5) range min/max queries on a <b>static</b> array → sparse table; many ancestor / LCA / path queries on a static tree → binary lifting.",
              "If the array changes, switch to a segment tree - sparse table cannot be updated efficiently.",
              "Distance between u and v = depth[u] + depth[v] - 2·depth[LCA].",
              "Path counting with difference on tree: add +1 at u, v, -1 at LCA and parent(LCA), then subtree sums.",
              "k-th successor on a functional graph with k up to 10^9: jump table of log k levels.",
              "Complexity: build O(n log n) time/memory, query O(1) (RMQ) or O(log n) (lifting)."
            ],
            cases: [
              "Root's ancestor: set <code>up[0][root] = root</code> (or -1 with checks) so lifting doesn't index out of range.",
              "Use precomputed log table or <code>int.bit_length()-1</code> rather than float log2 (precision).",
              "Deep trees: compute depth/parent with iterative BFS/DFS.",
              "LOG must satisfy 2^LOG &gt; max depth (or max k).",
              "Kth ancestor beyond root → -1.",
              "1-indexed vs 0-indexed nodes in CSES inputs."
            ],
            qa: [
              { q: "Why does sparse table give O(1) queries only for idempotent ops?", a: "The query covers [l, r] with two overlapping power-of-two blocks; overlap is harmless for min/max/gcd (x op x = x) but would double count for sum." },
              { q: "Explain LCA with binary lifting.", a: "Precompute up[j][v]. Lift the deeper node by the depth difference (bits of diff). If equal, done. Otherwise for j from high to low, if up[j][u] != up[j][v], move both. Answer is up[0][u]. O(log n) per query." }
            ],
            code: `class SparseMin:
    def __init__(self, a):
        n = len(a); self.st = [a[:]]
        j = 1
        while (1 << j) <= n:
            p, h = self.st[-1], 1 << (j - 1)
            self.st.append([min(p[i], p[i + h]) for i in range(n - (1 << j) + 1)])
            j += 1
    def query(self, l, r):            # inclusive
        k = (r - l + 1).bit_length() - 1
        return min(self.st[k][l], self.st[k][r - (1 << k) + 1])

class LCA:
    def __init__(self, n, adj, root=0):
        self.LOG = max(1, n.bit_length())
        self.depth = [0] * n
        up0 = [root] * n
        order, seen = [root], [False] * n; seen[root] = True
        for u in order:
            for v in adj[u]:
                if not seen[v]:
                    seen[v] = True; up0[v] = u
                    self.depth[v] = self.depth[u] + 1; order.append(v)
        self.up = [up0]
        for j in range(1, self.LOG):
            prev = self.up[-1]
            self.up.append([prev[prev[v]] for v in range(n)])
    def query(self, u, v):
        if self.depth[u] < self.depth[v]: u, v = v, u
        d = self.depth[u] - self.depth[v]
        for j in range(self.LOG):
            if d >> j & 1: u = self.up[j][u]
        if u == v: return u
        for j in range(self.LOG - 1, -1, -1):
            if self.up[j][u] != self.up[j][v]:
                u, v = self.up[j][u], self.up[j][v]
        return self.up[0][u]`
          },

          /* ---------------- MATH ---------------- */
          {
            id: 'math-interviews',
            title: 'Math for interviews (combinatorics, probability, randomisation)',
            est: '3–4 days',
            why: "nCr mod p, fast power, reservoir sampling and Fisher-Yates are frequent at Google/Meta and especially in AI/ML-flavoured rounds where probability questions are common.",
            learn: [
              "Modular arithmetic: (a+b)%m, (a·b)%m, why 10^9+7 (prime, fits in int32, product fits in int64).",
              "Fast exponentiation (binary exponentiation) O(log n); Python <code>pow(a, b, m)</code>.",
              "Modular inverse via Fermat: <code>a^(p-2) mod p</code> for prime p.",
              "nCr mod p: precompute factorials and inverse factorials in O(n); Pascal's triangle for small n; Lucas theorem for huge n, small p.",
              "Counting tools: stars and bars, Catalan numbers, permutations with repetition, derangements.",
              "Inclusion-exclusion: |A∪B∪C| formula; count numbers divisible by any of a set (with lcm).",
              "Sieve of Eratosthenes, gcd/lcm, prime factorisation.",
              "Probability: expected value linearity, geometric distribution, DP over probabilities (New 21 Game, Knight Probability).",
              "Randomised algorithms: reservoir sampling (size k from stream), Fisher-Yates shuffle, weighted pick via prefix sums + binary search, rejection sampling (rand7 → rand10)."
            ],
            practice: [
              LC('Pascal\'s Triangle', 'E', 'pascals-triangle'),
              LC('Pow(x, n)', 'M', 'powx-n'),
              LC('Count Primes', 'M', 'count-primes'),
              LC('Super Pow', 'M', 'super-pow'),
              X('CSES', 'Exponentiation', 'E'),
              X('CSES', 'Binomial Coefficients', 'M'),
              LC('Linked List Random Node', 'M', 'linked-list-random-node'),
              LC('Random Pick Index', 'M', 'random-pick-index'),
              LC('Shuffle an Array', 'M', 'shuffle-an-array'),
              LC('Random Pick with Weight', 'M', 'random-pick-with-weight'),
              LC('Implement Rand10() Using Rand7()', 'M', 'implement-rand10-using-rand7'),
              LC('Ugly Number III', 'M', 'ugly-number-iii'),
              LC('Knight Probability in Chessboard', 'M', 'knight-probability-in-chessboard'),
              LC('New 21 Game', 'M', 'new-21-game'),
              LC('Soup Servings', 'M', 'soup-servings'),
              LC('Count All Valid Pickup and Delivery Options', 'H', 'count-all-valid-pickup-and-delivery-options'),
              LC('Random Pick with Blacklist', 'H', 'random-pick-with-blacklist'),
              LC('Number of Music Playlists', 'H', 'number-of-music-playlists')
            ],
            notes: [
              "Signals: 'return answer modulo 10^9+7' (counting with combinatorics/DP), 'uniformly at random', 'stream of unknown length', 'probability that', 'expected number'.",
              "Reservoir sampling (k=1): keep the i-th item with probability 1/i - each item ends up with probability 1/n.",
              "Fisher-Yates: for i from n-1 down to 1, swap a[i] with a[randint(0, i)] - produces all n! permutations equally.",
              "Rejection sampling: rand7 → uniform in 1..49 via <code>(rand7()-1)*7 + rand7()</code>, reject &gt; 40, return x % 10 + 1.",
              "Inclusion-exclusion + binary search: count of numbers ≤ x divisible by a, b or c = x/a + x/b + x/c - x/lcm(a,b) - ... + x/lcm(a,b,c).",
              "Probability DP: often forward (distribute probability to next states) or backward with a sliding-window sum (New 21 Game) for O(n).",
              "Complexity: factorial precompute O(n), each nCr O(1); sieve O(n log log n); fast pow O(log e)."
            ],
            cases: [
              "Modular subtraction can go negative in C++/Java - add MOD before %.",
              "Division under modulo needs the inverse - you cannot just divide.",
              "Pow(x, n) with negative n → 1 / x^(-n); n = INT_MIN overflow in Java/C++ when negating.",
              "Naive shuffle <code>swap(a[i], a[rand(0, n-1)])</code> is biased (n^n outcomes not divisible by n!).",
              "Soup Servings: for large n the answer converges to 1 - cap n (e.g. n &gt; 4800 → 1).",
              "Floating-point probabilities: compare with tolerance; avoid accumulating error with huge loops.",
              "Weighted pick: bisect on prefix sums with target in [1, total] (or [0, total) - be consistent)."
            ],
            qa: [
              { q: "Prove reservoir sampling is uniform.", a: "Item i is chosen with probability 1/i and survives each later step j with probability (1 - 1/j). Product = 1/i · i/(i+1) · ... · (n-1)/n = 1/n." },
              { q: "How do you compute nCr mod 10^9+7 for many queries with n ≤ 10^6?", a: "Precompute fact[i] and inv_fact[i] (inv_fact[n] = pow(fact[n], MOD-2, MOD), then go downward). nCr = fact[n]·inv_fact[r]·inv_fact[n-r] mod p, O(1) per query." },
              { q: "Expected number of rand7 calls in rand10 via rejection?", a: "Each round uses 2 calls and succeeds with probability 40/49, so expected 2 · 49/40 ≈ 2.45 calls (lower with reuse of rejected values)." }
            ],
            code: `import random
MOD = 10**9 + 7

def build_ncr(n):
    fact = [1] * (n + 1)
    for i in range(1, n + 1): fact[i] = fact[i-1] * i % MOD
    inv = [1] * (n + 1)
    inv[n] = pow(fact[n], MOD - 2, MOD)
    for i in range(n, 0, -1): inv[i-1] = inv[i] * i % MOD
    return lambda a, b: 0 if b < 0 or b > a else fact[a] * inv[b] % MOD * inv[a-b] % MOD

def reservoir(stream, k):
    res = []
    for i, x in enumerate(stream):
        if i < k: res.append(x)
        else:
            j = random.randint(0, i)
            if j < k: res[j] = x
    return res

def fisher_yates(a):
    for i in range(len(a) - 1, 0, -1):
        j = random.randint(0, i)
        a[i], a[j] = a[j], a[i]
    return a

def sieve(n):
    is_p = [True] * (n + 1); is_p[0:2] = [False, False]
    for i in range(2, int(n ** 0.5) + 1):
        if is_p[i]: is_p[i*i::i] = [False] * len(range(i*i, n + 1, i))
    return is_p`
          },

          /* ---------------- DESIGN DATA STRUCTURES ---------------- */
          {
            id: 'design-ds-hard',
            title: 'Hard design-data-structure problems',
            est: '3–4 days',
            why: "LRU cache is one of the most asked questions anywhere; LFU, median stream, time-based KV and randomised set test whether you can combine structures to hit O(1)/O(log n) per op.",
            learn: [
              "Start from required operations + target complexity; pick a combination of structures for each.",
              "<b>LRU</b>: hashmap key → node + doubly linked list (most recent at head); or OrderedDict with move_to_end.",
              "<b>LFU</b>: key → (val, freq), freq → OrderedDict of keys, track minFreq; all ops O(1).",
              "<b>All O(1)</b>: doubly linked list of count-buckets, each holding a set of keys.",
              "<b>Median stream</b>: max-heap of lower half + min-heap of upper half, balanced sizes.",
              "<b>Insert/Delete/GetRandom O(1)</b>: array + value→index map; delete by swapping with last.",
              "<b>Time-based KV</b>: key → list of (timestamp, value), binary search since timestamps increase.",
              "<b>Skiplist</b>: multi-level linked lists with random promotion (p=1/2), expected O(log n).",
              "Lazy deletion in heaps (sliding window median, stock price fluctuation).",
              "Thread-safety / concurrency follow-ups: locks, sharding, TTL eviction (talking points for AI-infra roles)."
            ],
            practice: [
              LC('Design Browser History', 'M', 'design-browser-history'),
              LC('LRU Cache', 'M', 'lru-cache'),
              LC('Insert Delete GetRandom O(1)', 'M', 'insert-delete-getrandom-o1'),
              LC('Time Based Key-Value Store', 'M', 'time-based-key-value-store'),
              LC('Snapshot Array', 'M', 'snapshot-array'),
              LC('Design Twitter', 'M', 'design-twitter'),
              LC('Stock Price Fluctuation', 'M', 'stock-price-fluctuation'),
              LC('Design a Food Rating System', 'M', 'design-a-food-rating-system'),
              LC('Exam Room', 'M', 'exam-room'),
              LC('Find Median from Data Stream', 'H', 'find-median-from-data-stream'),
              LC('LFU Cache', 'H', 'lfu-cache'),
              LC('All O`one Data Structure', 'H', 'all-oone-data-structure'),
              LC('Insert Delete GetRandom O(1) - Duplicates allowed', 'H', 'insert-delete-getrandom-o1-duplicates-allowed'),
              LC('Maximum Frequency Stack', 'H', 'maximum-frequency-stack'),
              LC('Sliding Window Median', 'H', 'sliding-window-median'),
              LC('Data Stream as Disjoint Intervals', 'H', 'data-stream-as-disjoint-intervals'),
              LC('Design Skiplist', 'H', 'design-skiplist')
            ],
            notes: [
              "Signals: 'design a class', 'each operation in O(1) / O(log n) average', 'evict least recently/frequently used', 'stream'.",
              "Interview flow: list operations → state target complexities → choose structures → walk through each op on a small example before coding.",
              "Doubly linked list with dummy head/tail sentinels removes all null-edge cases.",
              "Hash map + linked list = O(1) ordered access; hash map + heap = O(log n) best-element with lazy deletion; array + map = O(1) random access.",
              "LFU tie-break by recency within the same freq - per-freq OrderedDict handles it.",
              "Maximum Frequency Stack: freq map + map freq → stack of keys + maxFreq.",
              "Mention real-world analogues: LRU in CPU/Redis caches, KV-cache eviction in LLM serving, median for monitoring percentiles."
            ],
            cases: [
              "LRU <code>put</code> on an existing key must update value AND move to front, without changing size.",
              "Capacity 0 in LFU/LRU → put is a no-op.",
              "LFU: when inserting a new key, minFreq resets to 1; after incrementing, bump minFreq only if the old bucket became empty and was minFreq.",
              "GetRandom delete: when removing the last element, the swap is with itself - update map before popping.",
              "Median heaps: Python has only min-heap - negate values for the max-heap.",
              "Time-based KV: no timestamp ≤ query → return ''.",
              "Lazy deletion: always clean the heap top before reading it."
            ],
            qa: [
              { q: "Why a doubly linked list for LRU rather than a singly linked list?", a: "Removing an arbitrary node (on access) in O(1) needs its predecessor; the hashmap gives the node, and prev pointers give the predecessor without traversal." },
              { q: "How do you get O(1) for every LFU operation?", a: "Map key → (value, freq) and freq → ordered set of keys (insertion order = recency). Keep minFreq. Access moves a key from bucket f to f+1; eviction pops the oldest from bucket minFreq." },
              { q: "How would you make the LRU cache thread-safe and scalable?", a: "Global lock is simplest; for scale, shard by key hash into independent LRUs each with its own lock, or use approximate LRU (CLOCK / sampled eviction like Redis)." }
            ],
            code: `class Node:
    __slots__ = 'k', 'v', 'prev', 'next'
    def __init__(self, k=0, v=0): self.k, self.v = k, v

class LRUCache:
    def __init__(self, cap):
        self.cap, self.map = cap, {}
        self.head, self.tail = Node(), Node()
        self.head.next, self.tail.prev = self.tail, self.head
    def _remove(self, n): n.prev.next, n.next.prev = n.next, n.prev
    def _add_front(self, n):
        n.next, n.prev = self.head.next, self.head
        self.head.next.prev = n; self.head.next = n
    def get(self, k):
        if k not in self.map: return -1
        n = self.map[k]; self._remove(n); self._add_front(n)
        return n.v
    def put(self, k, v):
        if self.cap == 0: return
        if k in self.map: self._remove(self.map[k])
        n = self.map[k] = Node(k, v); self._add_front(n)
        if len(self.map) > self.cap:
            lru = self.tail.prev; self._remove(lru); del self.map[lru.k]

import heapq
class MedianFinder:
    def __init__(self): self.lo, self.hi = [], []   # max-heap (neg), min-heap
    def addNum(self, x):
        heapq.heappush(self.lo, -x)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))
    def findMedian(self):
        if len(self.lo) > len(self.hi): return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2`
          },

          /* ---------------- MOCK / MIXED HARD ---------------- */
          {
            id: 'interview-simulation',
            title: 'Interview simulation · mixed hard problems',
            est: '2–3 weeks (ongoing)',
            why: "Real rounds don't tell you the topic. Timed mixed practice (45 min, 1 medium + 1 hard or 1 hard) builds pattern recognition and communication under pressure - the actual skill being graded.",
            learn: [
              "Timebox: ~5 min clarify + examples, ~5-10 min approach, ~20 min code, ~5-10 min dry-run + tests.",
              "Clarify: input size, value ranges, negatives/duplicates, empty input, sorted?, return format, in-place allowed?",
              "Work 1-2 examples by hand, including one edge case, before designing.",
              "State the brute force and its complexity first - it anchors the conversation and is a fallback.",
              "Optimise using constraints: n ≤ 20 → exponential; 10^3 → O(n²); 10^5 → O(n log n); 10^7+ → O(n).",
              "Get agreement on the approach before coding; narrate trade-offs.",
              "Code cleanly: meaningful names, helper functions, no premature micro-optimisation.",
              "Dry-run on your example line by line; then test edge cases (empty, single, duplicates, extremes).",
              "State final time/space complexity and possible follow-ups (streaming, distributed, memory-limited).",
              "Do weekly full mocks (Pramp / peers / interviewing.io) and keep an error log of misses."
            ],
            practice: [
              LC('Longest Consecutive Sequence', 'M', 'longest-consecutive-sequence'),
              LC('Product of Array Except Self', 'M', 'product-of-array-except-self'),
              LC('Trapping Rain Water', 'H', 'trapping-rain-water'),
              LC('Median of Two Sorted Arrays', 'H', 'median-of-two-sorted-arrays'),
              LC('Largest Rectangle in Histogram', 'H', 'largest-rectangle-in-histogram'),
              LC('Sliding Window Maximum', 'H', 'sliding-window-maximum'),
              LC('Minimum Window Substring', 'H', 'minimum-window-substring'),
              LC('Word Ladder', 'H', 'word-ladder'),
              LC('Merge k Sorted Lists', 'H', 'merge-k-sorted-lists'),
              LC('First Missing Positive', 'H', 'first-missing-positive'),
              LC('Longest Valid Parentheses', 'H', 'longest-valid-parentheses'),
              LC('Serialize and Deserialize Binary Tree', 'H', 'serialize-and-deserialize-binary-tree'),
              LC('Word Search II', 'H', 'word-search-ii'),
              LC('Maximal Rectangle', 'H', 'maximal-rectangle'),
              LC('Basic Calculator', 'H', 'basic-calculator'),
              LC('Text Justification', 'H', 'text-justification'),
              LC('Integer to English Words', 'H', 'integer-to-english-words'),
              LC('The Skyline Problem', 'H', 'the-skyline-problem'),
              LC('Reverse Nodes in k-Group', 'H', 'reverse-nodes-in-k-group'),
              LC('Max Points on a Line', 'H', 'max-points-on-a-line')
            ],
            notes: [
              "Pick problems at random (don't look at the tag); set a 45-minute timer; talk out loud or record yourself.",
              "<b>Clarify</b> first - interviewers often hide a constraint (sorted input, k ≤ n, ASCII only). Repeat the problem in your own words.",
              "<b>Examples</b>: build a small non-trivial one; use it later for dry-run.",
              "<b>Brute force</b>: say it and its complexity in one sentence even if obviously slow.",
              "<b>Optimise</b>: ask 'what work is repeated?' → precompute / hash / sort / monotonic structure / DP / binary search on answer.",
              "<b>Code</b>: write top-down - main function first with helper stubs; keep the interviewer in the loop.",
              "<b>Dry-run</b> your code (not your idea) on the example; then <b>test</b> edge cases and fix bugs calmly.",
              "If stuck for &gt; 5 min: restate constraints, try a smaller case, think of the related classic problem, or ask for a hint - silence is worse than a hint.",
              "After each mock: log pattern, mistake type (logic / edge case / time), and redo it in 3 and 7 days."
            ],
            cases: [
              "Jumping into code without confirming the approach - most common rejection reason.",
              "Forgetting empty input / single element / all duplicates / negative numbers.",
              "Integer overflow and off-by-one at window/array boundaries.",
              "Mutating input when the interviewer expected it untouched (or vice versa).",
              "Not stating complexity, or stating the wrong one (e.g. hidden O(n) slicing in Python loops).",
              "Running out of time on a perfect solution - a working O(n log n) beats an unfinished O(n).",
              "Ignoring hints - they are steering you to the expected solution."
            ],
            qa: [
              { q: "What do interviewers grade in a coding round?", a: "Problem solving (approach, optimisation), coding (correct, clean, idiomatic), verification (testing, catching own bugs) and communication (clarifying, explaining trade-offs, taking hints)." },
              { q: "You can't find the optimal solution - what do you do?", a: "Implement the best solution you have (clearly communicated as such), analyse its complexity, then discuss where the bottleneck is and possible optimisations. A correct, tested sub-optimal solution scores better than an incomplete optimal one." },
              { q: "How do constraints hint at the expected complexity?", a: "Roughly 10^8 simple ops/sec: n ≤ 12 → O(n!), ≤ 20 → O(2^n), ≤ 500 → O(n³), ≤ 5000 → O(n²), ≤ 10^6 → O(n log n), larger → O(n) or O(log n)." }
            ],
            code: `# Mock checklist (paste at top of the editor)
# 1. Clarify:  n range? values range / negatives? duplicates? empty? sorted?
#              return what? modify input allowed?
# 2. Examples: normal ->            edge ->
# 3. Brute:    idea ->              O(?) time  O(?) space
# 4. Optimise: bottleneck ->        idea ->     O(?) / O(?)
# 5. Code:     main fn + helpers
# 6. Dry-run:  walk example through the CODE
# 7. Test:     empty / single / duplicates / extremes / negatives
# 8. Wrap-up:  final complexity, follow-ups (stream? huge data? parallel?)

# Example: Trapping Rain Water - two pointers, O(n) / O(1)
def trap(h):
    l, r, lmax, rmax, water = 0, len(h) - 1, 0, 0, 0
    while l < r:
        if h[l] < h[r]:
            lmax = max(lmax, h[l]); water += lmax - h[l]; l += 1
        else:
            rmax = max(rmax, h[r]); water += rmax - h[r]; r -= 1
    return water`
          }
        ]
      }
    ]
  });
})();
