/* DSA part 4 - Level 5 (optional): competitive extras */
(function () {
  var LC = function (t, d, slug) { return { t: t, p: 'LC', d: d, u: 'https://leetcode.com/problems/' + slug + '/' }; };
  var X = function (p, t, d) { return { t: t, p: p, d: d }; };
  var U = function (p, t, d, u) { return { t: t, p: p, d: d, u: u }; };
  var CPA = 'https://cp-algorithms.com/';
  var CSES_BOOK = 'https://cses.fi/book/book.pdf';

  PREP.add({
    id: 'dsa',
    levels: [
      {
        name: 'Level 5 · Optional · Competitive extras',
        desc: 'Rare in typical interviews but asked at some top companies / for strong candidates and in OAs with hard constraints. Do these after Levels 0–4.',
        topics: [
          /* ---------------- SQRT DECOMPOSITION / MO ---------------- */
          {
            id: 'sqrt-mo',
            title: "Sqrt decomposition & Mo's algorithm",
            est: '3–4 days',
            why: "Shows up in hard OAs (Codeforces-style rounds at trading firms, Google OA) where n, q ≤ 10^5 and the query is awkward for a segment tree (distinct count, mode, 'frequency of frequencies'). Also a good fallback when you can't remember lazy propagation.",
            learn: [
              "Block decomposition: split the array into ~√n blocks, keep an aggregate per block; a query = partial left block + full blocks + partial right block → O(√n).",
              "Point update O(1) / O(√n) (rebuild one block); range update with a per-block lazy tag.",
              "Choosing block size: balance the two costs (e.g. B = √(n log n) when each block is sorted for 'count ≤ x' queries with binary search).",
              "<b>Mo's algorithm</b> (offline): sort queries by (l / B, r), move two pointers with <code>add(i)</code> / <code>remove(i)</code>; total pointer moves O((n + q)√n).",
              "Hilbert-order or odd-even (zig-zag) sorting of r to cut the constant factor roughly in half.",
              "Mo with updates (time as a third dimension, B ≈ n^(2/3)) and Mo on trees (Euler tour flattening) - awareness level.",
              "Sqrt on queries: buffer updates and rebuild every √q operations ('sqrt-batching').",
              "Heavy/light split by threshold √n (e.g. small step sizes precomputed, large steps brute-forced - LC 1714 style).",
              "When NOT to use: if the operation is associative and mergeable, a segment tree / BIT is faster and online."
            ],
            practice: [
              LC('Range Sum Query - Mutable (solve with √n blocks)', 'M', 'range-sum-query-mutable'),
              X('CSES', 'Static Range Minimum Queries (block version)', 'E'),
              X('GFG', 'Sqrt (or Square Root) Decomposition Technique', 'M'),
              X('SPOJ', 'GIVEAWAY - Give Away', 'M'),
              X('CSES', 'Distinct Values Queries', 'M'),
              X('SPOJ', 'DQUERY - D-query', 'M'),
              LC('Online Majority Element In Subarray', 'H', 'online-majority-element-in-subarray'),
              LC('Sum Of Special Evenly-Spaced Elements In Array', 'H', 'sum-of-special-evenly-spaced-elements-in-array'),
              X('CF', '220B - Little Elephant and Array', 'M'),
              X('CF', '86D - Powerful array', 'H'),
              X('CF', '617E - XOR and Favorite Number', 'H'),
              X('CF', '13E - Holes', 'H'),
              X('CF', '940F - Machine Learning (Mo with updates)', 'H'),
              X('SPOJ', 'COT2 - Count on a tree II (Mo on trees)', 'H')
            ],
            notes: [
              "Signals: offline queries on ranges, answer depends on counts/frequencies inside the window (distinct, mode, pairs with equal value), n, q ≤ 2·10^5, no clean merge of two halves.",
              "If you can maintain the answer when adding/removing ONE element in O(1), Mo's gives O((n + q)√n) overall.",
              "Sort key: <code>(l // B, r if (l // B) % 2 == 0 else -r)</code> - zig-zag ordering.",
              "Block decomposition for 'count of values ≤ x in [l, r]' with updates: keep each block sorted, bisect inside full blocks → O(√n log n) per query.",
              "Threshold trick: for parameter k ≤ √n precompute all answers; for k &gt; √n there are ≤ n/k ≤ √n steps, so brute force.",
              "Complexity: block query/update O(√n); Mo's O((n + q)√n · cost(add/remove)); memory O(n + q).",
              "Python warning: 10^5 · 316 ≈ 3·10^7 ops is borderline - use arrays, local variables, avoid function-call overhead in add/remove."
            ],
            cases: [
              "Block size of 0 when n is tiny - use <code>max(1, int(n ** 0.5))</code>.",
              "In Mo's, expand before shrinking (move r out / l in before removing) so the window is never 'negative'.",
              "Remember to store the original query index and write answers back in input order.",
              "Mo's is offline - it cannot answer queries that depend on previous answers (forced-online / XOR-with-last-answer problems).",
              "Partial blocks when l and r fall in the same block - handle with a single brute-force loop.",
              "Lazy tags per block must be applied when you touch individual elements of that block."
            ],
            qa: [
              { q: "Why is Mo's algorithm O((n + q)√n)?", a: "Queries are grouped by the block of l. Inside a block, r moves monotonically → O(n) per block × √n blocks = O(n√n). l moves at most O(B) per query → O(q√n). Sum is O((n + q)√n)." },
              { q: "When would you pick sqrt decomposition over a segment tree?", a: "When the per-range information is not mergeable in O(1)/O(log n) (distinct counts, modes), when queries are offline and add/remove of one element is cheap, or when a simpler implementation is worth the √n factor." },
              { q: "What is the threshold / heavy-light trick?", a: "Split by a parameter at √n: small cases are precomputed (≤ √n tables of size n), large cases have few elements and are brute-forced, giving O(n√n) total." }
            ],
            code: `from math import isqrt

# Mo's algorithm: number of distinct values in a[l..r] (0-indexed, inclusive)
def mo_distinct(a, queries):
    n = len(a)
    B = max(1, isqrt(n))
    order = sorted(range(len(queries)),
                   key=lambda i: (queries[i][0] // B,
                                  queries[i][1] if (queries[i][0] // B) % 2 == 0 else -queries[i][1]))
    # compress values so cnt can be a list
    comp = {v: i for i, v in enumerate(sorted(set(a)))}
    b = [comp[x] for x in a]
    cnt = [0] * len(comp)
    distinct = 0
    cur_l, cur_r = 0, -1
    ans = [0] * len(queries)
    for qi in order:
        l, r = queries[qi]
        while cur_r < r:                 # expand first
            cur_r += 1; cnt[b[cur_r]] += 1
            if cnt[b[cur_r]] == 1: distinct += 1
        while cur_l > l:
            cur_l -= 1; cnt[b[cur_l]] += 1
            if cnt[b[cur_l]] == 1: distinct += 1
        while cur_r > r:                 # then shrink
            cnt[b[cur_r]] -= 1
            if cnt[b[cur_r]] == 0: distinct -= 1
            cur_r -= 1
        while cur_l < l:
            cnt[b[cur_l]] -= 1
            if cnt[b[cur_l]] == 0: distinct -= 1
            cur_l += 1
        ans[qi] = distinct
    return ans

# Plain sqrt decomposition: point update, range sum
class SqrtSum:
    def __init__(self, a):
        self.a = a[:]; self.B = max(1, isqrt(len(a)))
        self.blk = [0] * (len(a) // self.B + 1)
        for i, x in enumerate(a): self.blk[i // self.B] += x
    def update(self, i, v):
        self.blk[i // self.B] += v - self.a[i]; self.a[i] = v
    def query(self, l, r):               # inclusive
        s, B = 0, self.B
        while l <= r and l % B: s += self.a[l]; l += 1
        while l + B - 1 <= r: s += self.blk[l // B]; l += B
        while l <= r: s += self.a[l]; l += 1
        return s`,
            refs: [
              { n: 'CP-Algorithms: Sqrt Decomposition (incl. Mo\'s algorithm)', u: CPA + 'data_structures/sqrt_decomposition.html', k: 'article', d: 'blocks, Mo ordering, Hilbert order tips' },
              { n: 'USACO Guide: Square Root Decomposition', u: 'https://usaco.guide/plat/sqrt', k: 'course', d: 'curated problems with solutions' },
              { n: 'CSES Handbook (Laaksonen) - Ch. 27 Square root algorithms', u: CSES_BOOK, k: 'book', d: 'short rigorous intro + Mo\'s' },
              { n: "CodeNCode - Mo's Algorithm (Query Square Root Decomposition)", k: 'video', d: 'step-by-step with SPOJ DQUERY' },
              { n: "Codeforces blog - An alternative sorting order for Mo's algorithm (Hilbert curve)", k: 'blog', d: 'constant-factor speed-up' },
              { n: "GFG - MO's Algorithm (Query Square Root Decomposition) | Set 1", k: 'article', d: 'beginner-friendly walkthrough' }
            ]
          },

          /* ---------------- FLOWS & MATCHING ---------------- */
          {
            id: 'flows-matching',
            title: 'Network flow & bipartite matching',
            est: '5–6 days',
            why: "Rare as a coding question but a classic 'strong candidate' topic: assignment problems, max-matching on grids, and min-cut modelling come up at Google/quant firms and in hard OAs. Knowing when a problem reduces to flow is the real skill.",
            learn: [
              "Flow network: capacities, source/sink, conservation; <b>residual graph</b> with reverse edges that let you 'undo' flow.",
              "<b>Ford-Fulkerson</b>: repeatedly find any augmenting path (DFS) - O(E · maxflow), only for small integer capacities.",
              "<b>Edmonds-Karp</b>: BFS shortest augmenting paths → O(V E^2).",
              "<b>Dinic</b>: BFS level graph + DFS blocking flow with current-edge pointers → O(V^2 E), O(E√V) on unit-capacity / bipartite graphs.",
              "<b>Max-flow = min-cut</b> theorem; recover the cut as vertices reachable from s in the final residual graph.",
              "Bipartite matching: <b>Kuhn</b> (DFS augmenting, O(VE)) and <b>Hopcroft-Karp</b> (O(E√V)); König's theorem: max matching = min vertex cover in bipartite graphs.",
              "Modelling tricks: vertex capacities (split node in/out), multiple sources/sinks (super source), edge-disjoint vs vertex-disjoint paths, project selection / closure via min-cut.",
              "Assignment problem: Hungarian algorithm O(n^3) or min-cost max-flow; for n ≤ 15 interview versions, bitmask DP is enough.",
              "Min-cost flow intuition: augment along shortest (by cost) paths with Bellman-Ford/SPFA or Dijkstra with potentials.",
              "Grid matching: colour cells like a chessboard → bipartite (dominoes, 'remove adjacent ones', seat students)."
            ],
            practice: [
              X('GFG', 'Maximum Bipartite Matching', 'M'),
              X('GFG', 'Ford-Fulkerson Algorithm for Maximum Flow Problem', 'M'),
              X('CSES', 'Download Speed', 'M'),
              X('CSES', 'School Dance', 'M'),
              X('CSES', 'Police Chase (min cut)', 'M'),
              X('CSES', 'Distinct Routes (edge-disjoint paths)', 'H'),
              U('AC', 'AtCoder Library Practice - D Maxflow (grid dominoes)', 'M', 'https://atcoder.jp/contests/practice2/tasks/practice2_d'),
              LC('Maximum Compatibility Score Sum (assignment, bitmask DP)', 'M', 'maximum-compatibility-score-sum'),
              LC('Campus Bikes II (assignment)', 'M', 'campus-bikes-ii'),
              LC('Minimum XOR Sum of Two Arrays (assignment)', 'H', 'minimum-xor-sum-of-two-arrays'),
              LC('Maximum Number of Accepted Invitations (bipartite matching)', 'M', 'maximum-number-of-accepted-invitations'),
              LC('Maximum Students Taking Exam (max independent set via matching)', 'H', 'maximum-students-taking-exam'),
              LC('Minimum Operations to Remove Adjacent Ones in Matrix (min vertex cover)', 'H', 'minimum-operations-to-remove-adjacent-ones-in-matrix'),
              LC('Maximum AND Sum of Array (min-cost flow / bitmask)', 'H', 'maximum-and-sum-of-array'),
              U('AC', 'AtCoder Library Practice - E MinCostFlow', 'H', 'https://atcoder.jp/contests/practice2/tasks/practice2_e')
            ],
            notes: [
              "Signals: 'assign each X to at most one Y', 'maximum number of disjoint paths', 'minimum edges/vertices to remove to disconnect', grid with two-colourable adjacency, n ≤ 500 with pairing constraints.",
              "Reverse edges are what make greedy augmenting correct: pushing flow back on a reverse edge cancels an earlier bad decision.",
              "Dinic in practice: BFS builds levels, DFS only follows level+1 edges, <code>it[u]</code> pointer avoids re-scanning saturated edges.",
              "Bipartite graph: max matching = min vertex cover (König); max independent set = V - max matching.",
              "Edge-disjoint paths = max flow with unit capacities; vertex-disjoint = split each vertex into in → out with capacity 1.",
              "Assignment with n ≤ 12-15: bitmask DP O(n · 2^n) is the expected interview answer; mention Hungarian O(n^3) as the scalable one.",
              "Complexities: Edmonds-Karp O(VE^2); Dinic O(V^2 E), O(E√V) for unit networks; Kuhn O(VE); Hopcroft-Karp O(E√V); Hungarian O(n^3)."
            ],
            cases: [
              "Forgetting the reverse edge (capacity 0) or mismatching its index - the most common bug.",
              "Undirected edge with capacity c = two directed edges each with capacity c (can share the reverse slot).",
              "Recursive DFS in Python hits recursion limits on big graphs - raise the limit or make it iterative.",
              "Kuhn: reset <code>visited</code> for every left vertex you try to augment from.",
              "Min-cut edges are the saturated edges from the reachable set S to T, not all saturated edges.",
              "Integer capacities guarantee integer max flow - which is why matching via flow returns a valid 0/1 assignment."
            ],
            qa: [
              { q: "Explain the max-flow min-cut theorem in one minute.", a: "Any s-t cut bounds the flow from above (all flow must cross it). When no augmenting path exists in the residual graph, the vertices reachable from s form a cut whose edges are all saturated, so flow = that cut's capacity - therefore max flow = min cut." },
              { q: "How do you reduce bipartite matching to max flow?", a: "Source → every left vertex (cap 1), left → right for allowed pairs (cap 1), every right vertex → sink (cap 1). Max flow = maximum matching; edges with flow 1 form the matching." },
              { q: "Why is Dinic faster than Edmonds-Karp?", a: "Instead of one BFS per augmenting path, Dinic does one BFS per phase and then pushes a whole blocking flow with DFS; the s-t distance strictly increases each phase so there are at most V phases." }
            ],
            code: `from collections import deque

class Dinic:
    def __init__(self, n):
        self.n, self.g = n, [[] for _ in range(n)]   # edge = [to, cap, rev_index]
    def add_edge(self, u, v, c):
        self.g[u].append([v, c, len(self.g[v])])
        self.g[v].append([u, 0, len(self.g[u]) - 1])
    def _bfs(self, s, t):
        self.lvl = [-1] * self.n; self.lvl[s] = 0
        q = deque([s])
        while q:
            u = q.popleft()
            for v, c, _ in self.g[u]:
                if c > 0 and self.lvl[v] < 0:
                    self.lvl[v] = self.lvl[u] + 1; q.append(v)
        return self.lvl[t] >= 0
    def _dfs(self, u, t, f):
        if u == t: return f
        while self.it[u] < len(self.g[u]):
            e = self.g[u][self.it[u]]
            v, c, r = e
            if c > 0 and self.lvl[v] == self.lvl[u] + 1:
                d = self._dfs(v, t, min(f, c))
                if d:
                    e[1] -= d; self.g[v][r][1] += d
                    return d
            self.it[u] += 1
        return 0
    def max_flow(self, s, t):
        flow = 0
        while self._bfs(s, t):
            self.it = [0] * self.n
            f = self._dfs(s, t, float('inf'))
            while f:
                flow += f; f = self._dfs(s, t, float('inf'))
        return flow

# Kuhn's bipartite matching: adj[u] = list of right vertices for left vertex u
def kuhn(n_left, n_right, adj):
    match_r = [-1] * n_right
    def try_kuhn(u, seen):
        for v in adj[u]:
            if not seen[v]:
                seen[v] = True
                if match_r[v] == -1 or try_kuhn(match_r[v], seen):
                    match_r[v] = u
                    return True
        return False
    return sum(try_kuhn(u, [False] * n_right) for u in range(n_left))`,
            refs: [
              { n: 'CP-Algorithms: Maximum flow - Dinic\'s algorithm', u: CPA + 'graph/dinic.html', k: 'article', d: 'proof of phase bound + clean code' },
              { n: 'CP-Algorithms: Ford-Fulkerson and Edmonds-Karp', u: CPA + 'graph/edmonds_karp.html', k: 'article', d: 'residual graph and min-cut explained' },
              { n: 'CP-Algorithms: Kuhn\'s Algorithm for Maximum Bipartite Matching', u: CPA + 'graph/kuhn_maximum_bipartite_matching.html', k: 'article' },
              { n: 'William Fiset - Network Flow playlist (Ford-Fulkerson, Edmonds-Karp, Dinic, bipartite matching)', k: 'playlist', d: 'best visual intuition for residual graphs' },
              { n: 'MIT 6.046J (OCW) - Incremental Improvement: Max Flow, Min Cut (Srini Devadas)', k: 'video', d: 'theory lecture with proofs' },
              { n: 'CSES Handbook (Laaksonen) - Ch. 20 Flows and cuts', u: CSES_BOOK, k: 'book', d: 'matching, path covers, König' },
              { n: 'CP-Algorithms: Hungarian algorithm for the assignment problem', u: CPA + 'graph/hungarian-algorithm.html', k: 'article', d: 'optional - O(n^3) assignment' }
            ]
          },

          /* ---------------- GAME THEORY ---------------- */
          {
            id: 'game-theory',
            title: 'Game theory (Nim, Sprague-Grundy, minimax)',
            est: '3 days',
            why: "LeetCode's Stone Game family, Can I Win and Predict the Winner are real interview questions (Google, Amazon, Bloomberg). Nim/Grundy is the 'aha' follow-up for strong candidates and common in OAs.",
            learn: [
              "Impartial vs partisan games; normal play (last move wins). Positions are <b>winning</b> if some move leads to a losing position, <b>losing</b> if all moves lead to winning ones.",
              "Minimax as DP: <code>win(state) = any(not win(next))</code>; memoise on state (often a bitmask or (i, j) interval).",
              "Score-difference formulation for two-player optimal play: <code>f(i, j) = max(a[i] - f(i+1, j), a[j] - f(i, j-1))</code> - avoids tracking whose turn it is.",
              "<b>Nim</b>: first player wins iff XOR of pile sizes ≠ 0; winning move makes the XOR 0.",
              "<b>Sprague-Grundy</b>: every impartial game position has a Grundy number = mex of Grundy numbers of its options; a sum of games has Grundy = XOR of parts.",
              "Computing Grundy numbers by DP and spotting periodic patterns (subtraction games, Grundy's game).",
              "Variants: misère Nim, staircase Nim (only odd steps matter), Moore's Nim-k awareness.",
              "Parity / pairing / mirror-strategy arguments (Stone Game I always true, Divisor Game parity, Chalkboard XOR).",
              "Games on graphs with cycles: retrograde analysis BFS from terminal states (Cat and Mouse)."
            ],
            practice: [
              LC('Nim Game', 'E', 'nim-game'),
              LC('Divisor Game', 'E', 'divisor-game'),
              LC('Predict the Winner', 'M', 'predict-the-winner'),
              LC('Stone Game', 'M', 'stone-game'),
              LC('Stone Game VII', 'M', 'stone-game-vii'),
              LC('Can I Win', 'M', 'can-i-win'),
              LC('Stone Game II', 'M', 'stone-game-ii'),
              X('AC', 'Educational DP Contest - K Stones', 'M'),
              X('CSES', 'Nim Game I', 'M'),
              X('CSES', 'Stair Game', 'M'),
              LC('Flip Game II (Sprague-Grundy)', 'M', 'flip-game-ii'),
              LC('Stone Game III', 'H', 'stone-game-iii'),
              LC('Stone Game IV', 'H', 'stone-game-iv'),
              X('CSES', "Grundy's Game", 'H'),
              LC('Cat and Mouse', 'H', 'cat-and-mouse')
            ],
            notes: [
              "Signals: 'two players play optimally', 'Alice and Bob take turns', 'return true if the first player wins', 'maximum score difference'.",
              "Win/lose DP: a state is winning if ANY move leads to a losing state; terminal states are base cases.",
              "Score-difference DP removes the turn variable - the opponent's best becomes minus your gain.",
              "For a sum of independent impartial games (several piles/boards), compute Grundy for each and XOR.",
              "Grundy via mex: <code>g(x) = mex{ g(y) : y reachable from x }</code>; mex of a small set by scanning 0, 1, 2, ...",
              "Brute-force small n, print results, look for a pattern (n % 4 for Nim Game, even n for Divisor Game) - then prove it.",
              "Complexity: interval games O(n^2) states × O(1) moves; bitmask games O(2^n · n); Grundy table O(N · moves)."
            ],
            cases: [
              "Can I Win: if sum(1..max) &lt; desiredTotal no one can win → false; desiredTotal ≤ 0 → true.",
              "Memo key must capture the full state (used-mask alone suffices only if the running total is derivable from it).",
              "Misère Nim differs only when all piles are size 1 - then parity of pile count decides.",
              "Cycles in the game graph (Cat and Mouse): plain DFS memo can be wrong - use retrograde BFS with degree counting and draws.",
              "Stone Game II's M parameter changes the state space: dp over (i, M) with suffix sums.",
              "Python recursion depth for n ≈ 10^4 interval DPs - use iterative bottom-up."
            ],
            qa: [
              { q: "Why does XOR decide Nim?", a: "If XOR is 0, every move changes exactly one pile and makes XOR non-zero. If XOR is non-zero, take its highest set bit; some pile has that bit, reduce it to pile ⊕ X, which is smaller, making XOR 0. Terminal position (all zeros) has XOR 0 and is losing, so XOR 0 positions are exactly the losing ones." },
              { q: "What does the Sprague-Grundy theorem say?", a: "Every impartial normal-play game position is equivalent to a Nim pile of size g = mex of its options' Grundy values. A position is losing iff g = 0, and the Grundy value of a sum of games is the XOR of the parts." },
              { q: "How would you solve Predict the Winner?", a: "dp[i][j] = best score difference the current player can force on a[i..j] = max(a[i] - dp[i+1][j], a[j] - dp[i][j-1]); player 1 wins iff dp[0][n-1] ≥ 0. O(n^2) time, O(n) space with a rolling array." }
            ],
            code: `from functools import lru_cache

# Score-difference minimax on an interval (Predict the Winner / Stone Game VII style)
def first_player_wins(a):
    n = len(a)
    dp = a[:]                         # dp[i] for intervals of length 1
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i] = max(a[i] - dp[i + 1], a[j] - dp[i])
    return dp[0] >= 0

# Win/lose DP over a bitmask (Can I Win)
def can_i_win(max_choice, total):
    if max_choice * (max_choice + 1) // 2 < total: return False
    @lru_cache(None)
    def win(mask, remaining):
        for x in range(1, max_choice + 1):
            bit = 1 << x
            if not mask & bit:
                if x >= remaining or not win(mask | bit, remaining - x):
                    return True
        return False
    return total <= 0 or win(0, total)

# Grundy numbers for a subtraction game with allowed moves S
def grundy_table(n, moves):
    g = [0] * (n + 1)
    for x in range(1, n + 1):
        seen = {g[x - m] for m in moves if m <= x}
        mex = 0
        while mex in seen: mex += 1
        g[x] = mex
    return g

def nim_first_wins(piles):
    x = 0
    for p in piles: x ^= p
    return x != 0`,
            refs: [
              { n: 'CP-Algorithms: Sprague-Grundy theorem. Nim', u: CPA + 'game_theory/sprague-grundy-nim.html', k: 'article', d: 'proofs + misère and variants' },
              { n: 'CP-Algorithms: Games on arbitrary graphs (retrograde analysis)', u: CPA + 'game_theory/games_on_graphs.html', k: 'article', d: 'for Cat and Mouse style cycles' },
              { n: 'CSES Handbook (Laaksonen) - Ch. 25 Game theory', u: CSES_BOOK, k: 'book', d: 'win/lose states, Nim, Grundy' },
              { n: 'Wikipedia - Sprague–Grundy theorem', u: 'https://en.wikipedia.org/wiki/Sprague%E2%80%93Grundy_theorem', k: 'article' },
              { n: 'Errichto - Game Theory (Nim, Grundy numbers) lecture', k: 'video', d: 'competitive-programming angle' },
              { n: 'NeetCode - Stone Game II / Stone Game III (LeetCode)', k: 'video', d: 'interview-style minimax DP' },
              { n: 'Thomas S. Ferguson - Game Theory (free UCLA lecture notes), Part I Impartial Combinatorial Games', k: 'notes', d: 'classic rigorous notes' }
            ]
          },

          /* ---------------- GEOMETRY ---------------- */
          {
            id: 'geometry',
            title: 'Computational geometry basics',
            est: '3–4 days',
            why: "Occasional at Google/Uber/mapping teams (Erect the Fence, Max Points on a Line, rectangle overlap) and in OAs. Mostly tests whether you can use cross products cleanly and avoid floating-point traps.",
            learn: [
              "Vectors as tuples; dot product (angle/projection) and <b>cross product</b> <code>ax·by - ay·bx</code> (signed area, turn direction).",
              "<b>Orientation</b> of (a, b, c): sign of cross(b - a, c - a) → counter-clockwise / clockwise / collinear.",
              "<b>Segment intersection</b>: opposite orientations on both segments, plus collinear-overlap special cases (on-segment bounding-box check).",
              "Polygon area by the <b>shoelace formula</b>; Pick's theorem for lattice points (A = I + B/2 - 1).",
              "<b>Convex hull</b>: Andrew's monotone chain (sort, build lower and upper) O(n log n); Graham scan (sort by polar angle) as the alternative.",
              "<b>Point in polygon</b>: ray casting / winding number for general polygons; O(log n) binary search for convex polygons.",
              "Slopes as reduced fractions <code>(dy/g, dx/g)</code> with normalised sign instead of floats (Max Points on a Line).",
              "<b>Sweep line</b> ideas: closest pair of points (sort by x, active set by y), rectangle union area, segment intersection detection.",
              "Axis-aligned rectangles: overlap via interval overlap on both axes; area via coordinate compression + sweep.",
              "Precision: prefer integers; when floats are unavoidable compare with epsilon (1e-9)."
            ],
            practice: [
              LC('Valid Boomerang', 'E', 'valid-boomerang'),
              LC('Check If It Is a Straight Line', 'E', 'check-if-it-is-a-straight-line'),
              LC('Largest Triangle Area', 'E', 'largest-triangle-area'),
              LC('Rectangle Overlap', 'E', 'rectangle-overlap'),
              X('CSES', 'Point Location Test', 'E'),
              X('CSES', 'Line Segment Intersection', 'M'),
              X('CSES', 'Polygon Area', 'M'),
              X('CSES', 'Point in Polygon', 'M'),
              LC('Minimum Area Rectangle', 'M', 'minimum-area-rectangle'),
              LC('Convex Polygon', 'M', 'convex-polygon'),
              X('CSES', 'Convex Hull', 'M'),
              X('CSES', 'Polygon Lattice Points', 'H'),
              LC('Max Points on a Line', 'H', 'max-points-on-a-line'),
              LC('Erect the Fence', 'H', 'erect-the-fence'),
              X('CSES', 'Minimum Euclidean Distance (closest pair, sweep)', 'H')
            ],
            notes: [
              "Signals: points/coordinates, 'collinear', 'fence/hull', 'inside the polygon', 'do these segments cross', 'area covered'.",
              "Almost everything reduces to the cross product sign - write <code>cross(o, a, b)</code> once and reuse it.",
              "Andrew's chain: sort points; for lower hull pop while cross(h[-2], h[-1], p) ≤ 0; repeat on reversed list for upper hull; concatenate.",
              "Keep collinear hull points (Erect the Fence) by popping only when cross &lt; 0, and de-duplicate the result.",
              "Ray casting: count crossings of a horizontal ray with edges using the half-open rule <code>(y1 &gt; y) != (y2 &gt; y)</code>.",
              "Twice the polygon area is an integer for integer coordinates - keep it as 2A until the end.",
              "Complexity: hull O(n log n); max points on a line O(n^2) with gcd-normalised slopes; closest pair O(n log n) with sweep."
            ],
            cases: [
              "Duplicate points (Max Points on a Line, hull) - count them separately or de-dup first.",
              "Vertical lines: dx = 0 → represent slope as (1, 0) after normalisation, never divide.",
              "Collinear overlapping segments are 'intersecting' - the orientation test alone says 0, you need the on-segment check.",
              "All points collinear: the hull degenerates to a line - make sure the algorithm doesn't double-count.",
              "Point exactly on the polygon boundary: decide inside/outside/boundary explicitly before ray casting.",
              "Coordinates up to 10^9 → cross products up to ~10^18 (fine in Python, use long long / __int128 in C++)."
            ],
            qa: [
              { q: "How do you check if two segments intersect?", a: "Compute o1 = orient(a, b, c), o2 = orient(a, b, d), o3 = orient(c, d, a), o4 = orient(c, d, b). General case: o1 ≠ o2 and o3 ≠ o4. Special cases: if any orientation is 0 and the corresponding point lies within the other segment's bounding box, they touch." },
              { q: "Explain Andrew's monotone chain convex hull.", a: "Sort points by (x, y). Sweep left to right keeping a stack; pop the top while the last two stack points and the new point make a non-left turn. That gives the lower hull; do the same right to left for the upper hull and join. O(n log n) for the sort, O(n) for the scan." },
              { q: "Why avoid floating-point slopes?", a: "Rounding makes equal slopes compare unequal (and vice versa) and vertical lines divide by zero. Use the reduced pair (dy/g, dx/g) with a fixed sign convention as a hash key instead." }
            ],
            code: `from math import gcd

def cross(o, a, b):                       # >0 left turn, <0 right turn, 0 collinear
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

def on_segment(p, q, r):                  # r collinear with pq: is it inside the box?
    return min(p[0], q[0]) <= r[0] <= max(p[0], q[0]) and min(p[1], q[1]) <= r[1] <= max(p[1], q[1])

def segments_intersect(a, b, c, d):
    d1, d2 = cross(c, d, a), cross(c, d, b)
    d3, d4 = cross(a, b, c), cross(a, b, d)
    if ((d1 > 0) != (d2 > 0)) and ((d3 > 0) != (d4 > 0)) and d1 and d2 and d3 and d4:
        return True
    return ((d1 == 0 and on_segment(c, d, a)) or (d2 == 0 and on_segment(c, d, b)) or
            (d3 == 0 and on_segment(a, b, c)) or (d4 == 0 and on_segment(a, b, d)))

def convex_hull(pts, keep_collinear=False):   # Andrew's monotone chain
    pts = sorted(set(map(tuple, pts)))
    if len(pts) <= 2: return pts
    bad = (lambda v: v < 0) if keep_collinear else (lambda v: v <= 0)
    def half(points):
        h = []
        for p in points:
            while len(h) >= 2 and bad(cross(h[-2], h[-1], p)): h.pop()
            h.append(p)
        return h
    lower, upper = half(pts), half(pts[::-1])
    return list(dict.fromkeys(lower[:-1] + upper[:-1]))

def area2(poly):                          # twice the signed area (shoelace)
    return sum(poly[i - 1][0] * poly[i][1] - poly[i][0] * poly[i - 1][1] for i in range(len(poly)))   # >0 if CCW

def point_in_polygon(p, poly):            # ray casting; boundary not handled separately
    x, y, inside = p[0], p[1], False
    for i in range(len(poly)):
        (x1, y1), (x2, y2) = poly[i - 1], poly[i]
        if (y1 > y) != (y2 > y):
            xi = x1 + (y - y1) * (x2 - x1) / (y2 - y1)
            if x < xi: inside = not inside
    return inside

def slope_key(p, q):                      # exact slope for hashing
    dx, dy = q[0] - p[0], q[1] - p[1]
    g = gcd(dx, dy) or 1
    dx, dy = dx // g, dy // g
    if dx < 0 or (dx == 0 and dy < 0): dx, dy = -dx, -dy
    return (dx, dy)`,
            refs: [
              { n: 'CP-Algorithms: Basic Geometry', u: CPA + 'geometry/basic-geometry.html', k: 'article', d: 'dot/cross products, lines, projections' },
              { n: 'CP-Algorithms: Convex Hull construction', u: CPA + 'geometry/convex-hull.html', k: 'article', d: 'Graham scan + monotone chain' },
              { n: 'CP-Algorithms: Check if two segments intersect', u: CPA + 'geometry/check-segments-intersection.html', k: 'article' },
              { n: 'CSES Handbook (Laaksonen) - Ch. 29 Geometry and Ch. 30 Sweep line algorithms', u: CSES_BOOK, k: 'book', d: 'covers every CSES geometry task' },
              { n: 'USACO Guide - Geometry Primitives (Platinum)', k: 'course', d: 'cross product, segment intersection, point in polygon' },
              { n: 'Victor Lecomte - Handbook of geometry for competitive programmers (free PDF)', k: 'book', d: 'the best free deep dive, integer-first' },
              { n: 'William Fiset / Abdul Bari - Convex Hull (Graham scan) explained', k: 'video' }
            ]
          },

          /* ---------------- SUFFIX STRUCTURES / AHO-CORASICK ---------------- */
          {
            id: 'suffix-aho',
            title: 'Suffix structures & multi-pattern matching',
            est: '4–5 days',
            why: "Hard string problems (Stream of Characters, Longest Duplicate Substring, Construct String with Minimum Cost) and search-infra discussions. Rarely coded fully in interviews, but knowing Aho-Corasick and suffix arrays lets you give the optimal answer and its complexity.",
            learn: [
              "Trie recap: insert/search O(L), children map vs array of 26, end-of-word marks, counting prefixes.",
              "<b>Aho-Corasick</b>: trie of all patterns + failure links (longest proper suffix that is a trie node) built by BFS; output/dictionary links to report every match.",
              "Aho-Corasick search runs in O(text + Σ|patterns| + matches); goto-automaton version precomputes transitions.",
              "Reverse-trie trick for 'suffix of the stream matches a word' (Stream of Characters) as the interview-friendly alternative.",
              "<b>Suffix array</b>: sorted order of all suffixes; O(n log^2 n) prefix-doubling by sorting rank pairs (O(n log n) with radix sort).",
              "<b>LCP array</b> with Kasai O(n); applications: number of distinct substrings = n(n+1)/2 - ΣLCP, longest repeated substring = max LCP.",
              "Longest common substring of two strings: SA of <code>s + '#' + t</code>, max LCP of adjacent suffixes from different strings.",
              "<b>Suffix automaton</b> intro: minimal DFA of all substrings, ≤ 2n states, link tree; counts distinct substrings and occurrences in O(n).",
              "Compare with hashing + binary search (simpler, probabilistic) and Z/KMP (single pattern)."
            ],
            practice: [
              LC('Implement Trie (Prefix Tree)', 'M', 'implement-trie-prefix-tree'),
              LC('Index Pairs of a String', 'E', 'index-pairs-of-a-string'),
              LC('Word Search II', 'H', 'word-search-ii'),
              LC('Stream of Characters', 'H', 'stream-of-characters'),
              X('CSES', 'Finding Patterns', 'M'),
              X('CSES', 'Counting Patterns', 'M'),
              X('CSES', 'Pattern Positions', 'M'),
              LC('Number of Distinct Substrings in a String', 'M', 'number-of-distinct-substrings-in-a-string'),
              X('CSES', 'Distinct Substrings', 'M'),
              X('CSES', 'Repeating Substring', 'M'),
              LC('Longest Duplicate Substring', 'H', 'longest-duplicate-substring'),
              X('SPOJ', 'LCS - Longest Common Substring (suffix automaton)', 'H'),
              X('CSES', 'Substring Order I', 'H'),
              LC('Construct String with Minimum Cost', 'H', 'construct-string-with-minimum-cost'),
              LC('Longest Common Subpath', 'H', 'longest-common-subpath')
            ],
            notes: [
              "Signals: many patterns searched in one text (or a stream), 'count/locate all occurrences of every word', 'distinct substrings', 'longest repeated / common substring', total length ≤ 10^5-10^6.",
              "Aho-Corasick failure link of node v (reached by char c from parent p): follow fail(p) until a node with child c exists; that child is fail(v).",
              "Store at each node the output link (nearest terminal node on the fail chain) so reporting matches is O(1) per match.",
              "Suffix array by doubling: rank by first 2^k chars, sort by (rank[i], rank[i + 2^k]); stop when all ranks distinct.",
              "Kasai: process suffixes in text order, LCP decreases by at most 1 each step → O(n).",
              "Suffix automaton: each state = set of end positions (endpos class); <code>len[v] - len[link[v]]</code> = substrings it adds → sum = distinct substrings.",
              "Complexities: AC build O(Σ|P| · σ) with goto table; SA O(n log n) - O(n log^2 n); LCP O(n); SAM O(n) states and transitions."
            ],
            cases: [
              "Aho-Corasick: patterns that are suffixes of other patterns are missed without output/dictionary links.",
              "Duplicate patterns - store a count/list at the terminal node, not a boolean.",
              "Suffix array separator must be a character smaller than (or not in) the alphabet, distinct per concatenated string.",
              "Python sorting-based SA is O(n log^2 n) with big constants - fine for 10^5, not for 10^6.",
              "Memory: Aho-Corasick with dict children is safer than 26-arrays when the alphabet is large.",
              "Stream of Characters: cap the stored stream at the max word length to keep queries O(L)."
            ],
            qa: [
              { q: "How does Aho-Corasick differ from running KMP for each pattern?", a: "KMP per pattern costs O(k · n) for k patterns. Aho-Corasick merges all patterns into one trie with failure links (a generalised prefix function), so the text is scanned once: O(n + Σ|P| + matches)." },
              { q: "How do you count distinct substrings of a string?", a: "Build the suffix array and LCP array: answer = n(n+1)/2 - Σ LCP[i]. Each suffix contributes its length minus the prefix shared with the previous suffix in sorted order. Alternatively sum len[v] - len[link[v]] over suffix-automaton states." },
              { q: "Suffix array vs suffix tree vs suffix automaton?", a: "Suffix tree: compressed trie of suffixes, O(n) but heavy to implement. Suffix array + LCP: compact, simulates most suffix-tree queries. Suffix automaton: O(n) DFA of all substrings, great for counting and longest-common-substring of many strings." }
            ],
            code: `from collections import deque

class AhoCorasick:
    def __init__(self, patterns):
        self.nxt, self.fail, self.out = [{}], [0], [[]]
        for idx, p in enumerate(patterns):
            u = 0
            for ch in p:
                if ch not in self.nxt[u]:
                    self.nxt[u][ch] = len(self.nxt)
                    self.nxt.append({}); self.fail.append(0); self.out.append([])
                u = self.nxt[u][ch]
            self.out[u].append(idx)
        q = deque(self.nxt[0].values())
        while q:                              # BFS builds failure links
            u = q.popleft()
            for ch, v in self.nxt[u].items():
                f = self.fail[u]
                while f and ch not in self.nxt[f]: f = self.fail[f]
                self.fail[v] = self.nxt[f].get(ch, 0)
                self.out[v] = self.out[v] + self.out[self.fail[v]]   # merge outputs
                q.append(v)
    def search(self, text):                   # yields (end_index, pattern_index)
        u = 0
        for i, ch in enumerate(text):
            while u and ch not in self.nxt[u]: u = self.fail[u]
            u = self.nxt[u].get(ch, 0)
            for idx in self.out[u]: yield i, idx

def suffix_array(s):                          # O(n log^2 n) prefix doubling
    n, k = len(s), 1
    rank = [ord(c) for c in s]
    sa = list(range(n))
    while True:
        key = lambda i: (rank[i], rank[i + k] if i + k < n else -1)
        sa.sort(key=key)
        new = [0] * n
        for j in range(1, n):
            new[sa[j]] = new[sa[j - 1]] + (key(sa[j]) != key(sa[j - 1]))
        rank = new
        if rank[sa[-1]] == n - 1: return sa
        k <<= 1

def lcp_kasai(s, sa):                         # lcp[i] = LCP(sa[i], sa[i-1])
    n = len(s); rank = [0] * n; lcp = [0] * n; h = 0
    for i, p in enumerate(sa): rank[p] = i
    for i in range(n):
        if rank[i]:
            j = sa[rank[i] - 1]
            while i + h < n and j + h < n and s[i + h] == s[j + h]: h += 1
            lcp[rank[i]] = h
            if h: h -= 1
        else:
            h = 0
    return lcp

def distinct_substrings(s):
    sa = suffix_array(s)
    return len(s) * (len(s) + 1) // 2 - sum(lcp_kasai(s, sa))`,
            refs: [
              { n: 'CP-Algorithms: Aho-Corasick algorithm', u: CPA + 'string/aho_corasick.html', k: 'article', d: 'failure + output links, automaton version' },
              { n: 'CP-Algorithms: Suffix Array', u: CPA + 'string/suffix-array.html', k: 'article', d: 'O(n log n) construction + applications' },
              { n: 'CP-Algorithms: Suffix Automaton', u: CPA + 'string/suffix-automaton.html', k: 'article', d: 'the definitive free explanation' },
              { n: 'William Fiset - Suffix Array / LCP array / Longest common substring videos', k: 'playlist', d: 'visual intro to SA + LCP' },
              { n: 'CSES Handbook (Laaksonen) - Ch. 26 String algorithms', u: CSES_BOOK, k: 'book', d: 'tries, hashing, Z, suffix arrays' },
              { n: 'Niema Moshiri / Ben Langmead - Aho-Corasick and suffix array lectures (Johns Hopkins, free)', k: 'video', d: 'clear academic treatment' },
              { n: 'USACO Guide - String Suffix Structures (Advanced)', k: 'course', d: 'problems ordered by difficulty' }
            ]
          },

          /* ---------------- ORDERED SETS / BALANCED BST ---------------- */
          {
            id: 'ordered-sets',
            title: 'Balanced BST & ordered sets',
            est: '3–4 days',
            why: "Many 'hard' design questions (sliding window median, MK average, rank tracker, calendar booking) need an ordered multiset with O(log n) insert/delete/k-th. Interviewers expect you to name TreeMap / SortedList and explain how it stays balanced.",
            learn: [
              "Why balance matters: an unbalanced BST degrades to O(n); balanced trees keep height O(log n).",
              "<b>AVL</b> intuition: height difference ≤ 1, fix with single/double rotations; strictly balanced, faster lookups.",
              "<b>Red-black</b> intuition: colour rules ⇒ height ≤ 2 log(n+1); fewer rotations on insert/delete - used by Java TreeMap, C++ std::map.",
              "<b>Treap</b>: BST by key + heap by random priority; split/merge make insert, erase, range ops easy; expected O(log n).",
              "Order statistics: store subtree sizes → k-th smallest and rank(x) in O(log n).",
              "Order statistics with a <b>BIT over compressed values</b>: rank = prefix sum, k-th = binary lifting on the BIT (offline values).",
              "Language tools: Python <code>sortedcontainers.SortedList</code> (allowed on LeetCode), Java <code>TreeMap/TreeSet</code> (floor/ceiling/higher/lower), C++ <code>std::set</code> + GNU PBDS <code>tree</code> with <code>find_by_order/order_of_key</code>.",
              "Two-heap and lazy-deletion heap alternatives (median, sliding window) and when they suffice.",
              "Implicit treap (key = position) for split/merge array operations - awareness level."
            ],
            practice: [
              LC('My Calendar I', 'M', 'my-calendar-i'),
              LC('Stock Price Fluctuation', 'M', 'stock-price-fluctuation'),
              LC('Design a Number Container System', 'M', 'design-a-number-container-system'),
              LC('Avoid Flood in The City', 'M', 'avoid-flood-in-the-city'),
              X('CSES', 'Josephus Problem II', 'M'),
              X('CSES', 'List Removals', 'M'),
              X('CSES', 'Salary Queries', 'M'),
              LC('Contains Duplicate III', 'H', 'contains-duplicate-iii'),
              LC('Sliding Window Median', 'H', 'sliding-window-median'),
              X('CSES', 'Sliding Window Median', 'M'),
              LC('Data Stream as Disjoint Intervals', 'H', 'data-stream-as-disjoint-intervals'),
              LC('Odd Even Jump', 'H', 'odd-even-jump'),
              LC('Sequentially Ordinal Rank Tracker', 'H', 'sequentially-ordinal-rank-tracker'),
              LC('Finding MK Average', 'H', 'finding-mk-average'),
              LC('Count Good Triplets in an Array', 'H', 'count-good-triplets-in-an-array')
            ],
            notes: [
              "Signals: need 'next greater key', 'floor/ceiling', 'k-th smallest in a dynamic set', 'median of a window', 'rank of an element' with interleaved inserts/deletes.",
              "Python: <code>from sortedcontainers import SortedList</code> → add/remove O(log n) amortised, <code>sl[k]</code>, <code>bisect_left</code> for rank.",
              "Without libraries: offline-compress all values, then a BIT gives insert/delete (±1), rank (prefix sum) and k-th (binary lifting) in O(log n).",
              "Treap split(t, k) → (keys &lt; k, keys ≥ k); merge(a, b) assumes all keys of a &lt; keys of b; insert = split + merge.",
              "TreeMap floor/ceiling pattern solves calendar/interval-merging: check the neighbour on each side.",
              "AVL vs red-black: AVL is more rigidly balanced (better for read-heavy), RB does fewer rotations (better for write-heavy, standard library choice).",
              "Complexity: all ops O(log n) (treap expected, AVL/RB worst case, SortedList amortised with √-buckets)."
            ],
            cases: [
              "Duplicates: use a multiset (SortedList allows them; TreeMap needs a count map).",
              "SortedList.remove raises if the value is absent - use discard or check first.",
              "BIT order statistics needs every value known up front (offline) - online with unbounded values needs a treap/PBDS.",
              "Sliding Window Median with even k - average of two middles; beware int overflow in Java/C++.",
              "Contains Duplicate III: bucket approach also works in O(n) - mention it as an alternative.",
              "Recursive treap in Python can be slow; for interviews explain it and use SortedList in code."
            ],
            qa: [
              { q: "How does a red-black tree guarantee O(log n) height?", a: "No red node has a red child and every root-to-null path has the same number of black nodes. So the longest path (alternating red/black) is at most twice the shortest (all black), giving height ≤ 2 log2(n + 1)." },
              { q: "How would you find the k-th smallest in a dynamic set without a library?", a: "Augment a balanced BST (treap/AVL) with subtree sizes and walk down comparing k with the left size, or compress values offline and binary-lift on a Fenwick tree of counts - both O(log n)." },
              { q: "Why does a treap stay balanced?", a: "Priorities are random, so the treap has the same shape as a BST built by inserting keys in random order, whose expected depth is O(log n). Split and merge each walk one root-to-leaf path." }
            ],
            code: `import random

# Order-statistic multiset over known (compressed) values using a BIT
class BITOrderSet:
    def __init__(self, values):
        self.vals = sorted(set(values)); self.idx = {v: i + 1 for i, v in enumerate(self.vals)}
        self.n = len(self.vals); self.t = [0] * (self.n + 1); self.size = 0
        self.LOG = self.n.bit_length()
    def add(self, v, d=1):                 # d = -1 to remove
        i = self.idx[v]; self.size += d
        while i <= self.n: self.t[i] += d; i += i & -i
    def rank(self, v):                     # number of elements < v
        i, s = self.idx[v] - 1, 0
        while i > 0: s += self.t[i]; i -= i & -i
        return s
    def kth(self, k):                      # 0-indexed k-th smallest
        pos, rem = 0, k + 1
        for b in range(self.LOG, -1, -1):
            nxt = pos + (1 << b)
            if nxt <= self.n and self.t[nxt] < rem:
                pos = nxt; rem -= self.t[nxt]
        return self.vals[pos]

# Minimal treap with split / merge (keys may repeat)
class Node:
    __slots__ = ('key', 'pri', 'left', 'right', 'size')
    def __init__(self, key):
        self.key, self.pri, self.left, self.right, self.size = key, random.random(), None, None, 1

def sz(t): return t.size if t else 0
def upd(t): t.size = 1 + sz(t.left) + sz(t.right)

def split(t, key):                         # (< key, >= key)
    if not t: return None, None
    if t.key < key:
        l, r = split(t.right, key); t.right = l; upd(t); return t, r
    l, r = split(t.left, key); t.left = r; upd(t); return l, t

def merge(a, b):
    if not a or not b: return a or b
    if a.pri > b.pri:
        a.right = merge(a.right, b); upd(a); return a
    b.left = merge(a, b.left); upd(b); return b

def insert(t, key):
    l, r = split(t, key); return merge(merge(l, Node(key)), r)

def kth(t, k):                             # 0-indexed
    while t:
        if k < sz(t.left): t = t.left
        elif k == sz(t.left): return t.key
        else: k -= sz(t.left) + 1; t = t.right

# In interviews (Python): from sortedcontainers import SortedList`,
            refs: [
              { n: 'CP-Algorithms: Treap (Cartesian tree)', u: CPA + 'data_structures/treap.html', k: 'article', d: 'split/merge, implicit treap' },
              { n: 'Grant Jenks - Sorted Containers documentation (SortedList)', u: 'https://grantjenks.com/docs/sortedcontainers/', k: 'docs', d: 'API + why it is fast' },
              { n: 'Codeforces blog - C++ STL: Policy based data structures (order statistics tree)', k: 'blog', d: 'find_by_order / order_of_key' },
              { n: 'Abdul Bari - AVL Tree Insertion and Rotations', k: 'video', d: 'rotation cases made simple' },
              { n: 'MIT 6.006 (OCW) - Lecture: Binary Trees, Part 2: AVL (Erik Demaine / Jason Ku)', k: 'video', d: 'subtree augmentation for order statistics' },
              { n: 'Wikipedia - Red–black tree', u: 'https://en.wikipedia.org/wiki/Red%E2%80%93black_tree', k: 'article', d: 'invariants and height proof' },
              { n: 'SecondThread - Treaps (competitive programming tutorial)', k: 'video' }
            ]
          },

          /* ---------------- TREE DECOMPOSITIONS ---------------- */
          {
            id: 'tree-decomp',
            title: 'Tree decompositions (Euler tour, HLD, centroid, small-to-large)',
            est: '5–6 days',
            why: "Trees with path/subtree queries appear in hard OAs and at a few top companies (Google, quant). Euler tour + BIT and small-to-large merging are the most interview-usable; HLD and centroid show depth.",
            learn: [
              "<b>Euler tour</b> (tin/tout): subtree of v = contiguous range [tin[v], tout[v]] → subtree sum/update with a BIT or segment tree.",
              "Path queries from root via Euler tour + range update/point query; path(u, v) = root(u) + root(v) - 2·root(lca) (+ lca value).",
              "<b>Heavy-light decomposition</b>: heavy child = largest subtree; any root-to-leaf path crosses O(log n) light edges → path query in O(log^2 n) with a segment tree over the HLD order.",
              "HLD order also keeps subtrees contiguous - one base array supports both path and subtree queries.",
              "<b>Centroid decomposition</b>: centroid splits tree into parts of size ≤ n/2; recursion depth O(log n); count paths with property via 'paths through the centroid'.",
              "Centroid tree for 'nearest marked node' queries (each node has O(log n) centroid ancestors).",
              "<b>Small-to-large</b> (DSU on tree): merge children's sets into the largest one → each element moves O(log n) times → O(n log n) (or O(n log^2 n) with sets).",
              "Rerooting DP as a cousin technique (sum of distances to all nodes).",
              "Iterative DFS in Python for n ≈ 2·10^5 (avoid recursion limits)."
            ],
            practice: [
              X('CSES', 'Subtree Queries', 'M'),
              X('CSES', 'Path Queries', 'M'),
              X('CSES', 'Finding a Centroid', 'E'),
              X('CSES', 'Distinct Colors (small-to-large)', 'M'),
              LC('Kth Ancestor of a Tree Node', 'H', 'kth-ancestor-of-a-tree-node'),
              LC('Sum of Distances in Tree (rerooting)', 'H', 'sum-of-distances-in-tree'),
              LC('Smallest Missing Genetic Value in Each Subtree', 'H', 'smallest-missing-genetic-value-in-each-subtree'),
              LC('Minimize the Total Price of the Trips', 'H', 'minimize-the-total-price-of-the-trips'),
              LC('Minimum Edge Weight Equilibrium Queries in a Tree', 'H', 'minimum-edge-weight-equilibrium-queries-in-a-tree'),
              X('CF', '600E - Lomsat gelral (DSU on tree)', 'H'),
              X('CSES', 'Path Queries II (HLD)', 'H'),
              X('SPOJ', 'QTREE - Query on a tree (HLD)', 'H'),
              X('CSES', 'Fixed-Length Paths I (centroid)', 'H'),
              X('CSES', 'Fixed-Length Paths II', 'H'),
              X('CF', '342E - Xenia and Tree (centroid tree)', 'H')
            ],
            notes: [
              "Signals: tree with n, q ≤ 2·10^5 and 'update node value, query path max/sum' (HLD), 'subtree sum' (Euler tour), 'count pairs/paths with length k or sum ≤ k' (centroid), 'for every subtree, distinct/most frequent value' (small-to-large).",
              "Euler tour: tin[v] when entering, tout[v] = last tin in its subtree; v is ancestor of u iff tin[v] ≤ tin[u] ≤ tout[v].",
              "HLD query(u, v): while heads differ, take the deeper head, query [pos[head], pos[u]], jump to parent[head]; finish with the segment on the same chain.",
              "Centroid: compute sizes, walk to a child with size &gt; n/2 until none; mark removed and recurse on each component.",
              "Small-to-large: <code>if len(big) &lt; len(small): swap</code>, then insert small into big - always keep the child's largest container.",
              "Edge values in HLD: store each edge's weight on its child node and skip the LCA node in the final segment.",
              "Complexity: Euler tour O(n) + O(log n) per op; HLD O(log^2 n) per path op; centroid O(n log n) (× inner cost); small-to-large O(n log n)."
            ],
            cases: [
              "Python recursion on a path-shaped tree of 2·10^5 nodes crashes - use an explicit stack.",
              "HLD: the segment tree must be built on the HLD order (pos[]), not the original labels.",
              "Centroid decomposition must recompute subtree sizes inside each component (sizes from the original root are wrong).",
              "Small-to-large: returning a reference to the child's container and then mutating it - fine, but don't reuse it elsewhere.",
              "Off-by-one between edge-weighted and node-weighted path queries.",
              "Forest input (multiple roots) - run the decomposition on each component."
            ],
            qa: [
              { q: "Why does heavy-light decomposition give O(log n) chains per path?", a: "Moving from a node across a light edge to its parent at least doubles the subtree size, so any root-to-node path has at most log2 n light edges and therefore touches O(log n) heavy chains." },
              { q: "What problem is centroid decomposition good for?", a: "Counting or optimising over all paths in a tree (e.g. number of paths of length k). Every path passes through exactly one 'highest' centroid, so you count paths through each centroid and recurse on the pieces, which have size ≤ n/2 - total O(n log n)." },
              { q: "Explain small-to-large merging.", a: "When merging children's data sets, always insert elements of the smaller set into the larger. An element moves only when its set at least doubles, so it moves O(log n) times - total O(n log n) insertions." }
            ],
            code: `def euler_tour(n, adj, root=0):            # iterative, returns tin, tout, parent, order
    tin, tout, par = [0] * n, [0] * n, [-1] * n
    order, timer, stack = [], 0, [(root, False)]
    while stack:
        v, done = stack.pop()
        if done: tout[v] = timer - 1; continue
        tin[v] = timer; timer += 1; order.append(v)
        stack.append((v, True))
        for u in adj[v]:
            if u != par[v]: par[u] = v; stack.append((u, False))
    return tin, tout, par, order            # subtree(v) = [tin[v], tout[v]]

class HLD:
    def __init__(self, n, adj, root=0):
        tin, tout, par, order = euler_tour(n, adj, root)
        size, heavy = [1] * n, [-1] * n
        self.depth = [0] * n
        for v in order[1:]: self.depth[v] = self.depth[par[v]] + 1
        for v in reversed(order):
            if par[v] >= 0:
                size[par[v]] += size[v]
        for v in order:
            best = 0
            for u in adj[v]:
                if u != par[v] and size[u] > best: best, heavy[v] = size[u], u
        self.par, self.head, self.pos = par, [0] * n, [0] * n
        cur, stack = 0, [root]
        while stack:                         # chains get consecutive positions
            h = stack.pop(); v = h
            while v != -1:
                self.head[v], self.pos[v] = h, cur; cur += 1
                for u in adj[v]:
                    if u != par[v] and u != heavy[v]: stack.append(u)
                v = heavy[v]
    def path_segments(self, u, v):           # list of [l, r] ranges in pos-order covering path u..v
        res = []
        while self.head[u] != self.head[v]:
            if self.depth[self.head[u]] < self.depth[self.head[v]]: u, v = v, u
            res.append((self.pos[self.head[u]], self.pos[u])); u = self.par[self.head[u]]
        a, b = sorted((self.pos[u], self.pos[v]))
        res.append((a, b))
        return res                           # query each range on a segment tree

def centroid_decomposition(n, adj):           # returns centroid-tree parent array
    removed, sz, cpar = [False] * n, [0] * n, [-1] * n
    def sizes(root):
        order, stack, p = [], [(root, -1)], {}
        while stack:
            v, pr = stack.pop(); order.append(v); p[v] = pr
            for u in adj[v]:
                if u != pr and not removed[u]: stack.append((u, v))
        for v in reversed(order):
            sz[v] = 1 + sum(sz[u] for u in adj[v] if u != p[v] and not removed[u])
        return order, p
    stack = [(0, -1)]
    while stack:
        start, parent_c = stack.pop()
        order, p = sizes(start); total = sz[start]; c = start
        while True:
            nxt = next((u for u in adj[c] if u != p[c] and not removed[u] and sz[u] * 2 > total), None)
            if nxt is None: break
            c = nxt
        removed[c], cpar[c] = True, parent_c
        for u in adj[c]:
            if not removed[u]: stack.append((u, c))
    return cpar

def small_to_large_distinct(n, adj, color, root=0):   # distinct colours per subtree
    _, _, par, order = euler_tour(n, adj, root)
    sets, ans = [None] * n, [0] * n
    for v in reversed(order):
        big = {color[v]}
        for u in adj[v]:
            if u != par[v]:
                s = sets[u]
                if len(s) > len(big): big, s = s, big
                big |= s
        sets[v] = big; ans[v] = len(big)
    return ans`,
            refs: [
              { n: 'CP-Algorithms: Heavy-light decomposition', u: CPA + 'graph/hld.html', k: 'article', d: 'proof + path query implementation' },
              { n: 'USACO Guide: Heavy-Light Decomposition', u: 'https://usaco.guide/plat/hld', k: 'course' },
              { n: 'USACO Guide: Centroid Decomposition', u: 'https://usaco.guide/plat/centroid', k: 'course', d: 'Xenia and Tree walkthrough' },
              { n: 'USACO Guide: Euler Tour Technique', u: 'https://usaco.guide/gold/tree-euler', k: 'course', d: 'subtree queries with BIT' },
              { n: 'CSES Handbook (Laaksonen) - Ch. 18 Tree queries', u: CSES_BOOK, k: 'book', d: 'tree traversal arrays, LCA, offline' },
              { n: 'Codeforces blog (Arpa) - [Tutorial] Sack (dsu on tree)', k: 'blog', d: 'small-to-large explained with variants' },
              { n: 'CodeNCode - Heavy Light Decomposition / Centroid Decomposition series', k: 'playlist', d: 'slow, thorough walkthroughs' }
            ]
          },

          /* ---------------- HASHING & RANDOMISED ---------------- */
          {
            id: 'hashing-random',
            title: 'Hashing & randomised techniques',
            est: '3 days',
            why: "Rolling hash is the practical answer to many hard string problems (longest duplicate substring, distinct echo substrings). Randomised algorithms (reservoir sampling, random pivot, shuffles) and sketches (Bloom filter, Count-Min) bridge into system-design and ML-infra interviews.",
            learn: [
              "Polynomial hash <code>h(s) = Σ s[i]·B^i mod M</code>; prefix hashes give any substring hash in O(1): <code>(H[r] - H[l]·B^(r-l)) mod M</code>.",
              "Collision probability ≈ n^2 / M (birthday bound) - use <b>double hashing</b> (two mods) or a 61-bit Mersenne mod.",
              "<b>Anti-hash pitfalls</b>: fixed base with mod 2^64 is breakable (Thue-Morse strings); randomise the base at runtime; Python dict/set of ints can be attacked in CF (hash-hacking tests).",
              "Binary search + hashing for 'longest substring with property' (monotone in length).",
              "<b>Zobrist hashing</b>: random 64-bit value per (position, piece), XOR to update in O(1) - board states, set hashing, 'sum/XOR hashing' of multisets.",
              "Randomised algorithms: random pivot quickselect/quicksort (expected O(n) / O(n log n)), Fisher-Yates shuffle, reservoir sampling, rejection sampling.",
              "<b>Bloom filter</b>: k hash functions into an m-bit array; no false negatives, false-positive rate ≈ (1 - e^(-kn/m))^k, optimal k = (m/n) ln 2.",
              "<b>Count-Min sketch</b>: d rows × w counters, estimate = min over rows; overestimates by ≤ εN with probability 1 - δ (w = e/ε, d = ln 1/δ).",
              "Las Vegas vs Monte Carlo algorithms; awareness of HyperLogLog and consistent hashing (system design)."
            ],
            practice: [
              LC('Repeated DNA Sequences', 'M', 'repeated-dna-sequences'),
              LC('Shuffle an Array', 'M', 'shuffle-an-array'),
              LC('Linked List Random Node (reservoir sampling)', 'M', 'linked-list-random-node'),
              LC('Random Pick with Weight', 'M', 'random-pick-with-weight'),
              LC('Insert Delete GetRandom O(1)', 'M', 'insert-delete-getrandom-o1'),
              LC('Kth Largest Element in an Array (random-pivot quickselect)', 'M', 'kth-largest-element-in-an-array'),
              X('CSES', 'String Matching (with rolling hash)', 'E'),
              X('CSES', 'Finding Borders', 'M'),
              LC('Longest Happy Prefix', 'H', 'longest-happy-prefix'),
              LC('Shortest Palindrome', 'H', 'shortest-palindrome'),
              LC('Distinct Echo Substrings', 'H', 'distinct-echo-substrings'),
              X('CSES', 'Palindrome Queries (hash + BIT)', 'H'),
              LC('Longest Duplicate Substring', 'H', 'longest-duplicate-substring'),
              LC('Longest Common Subpath', 'H', 'longest-common-subpath'),
              X('BUILD', 'Implement a Bloom filter and a Count-Min sketch; measure false-positive rate vs theory', 'M')
            ],
            notes: [
              "Signals: compare many substrings for equality fast, 'longest repeated/common substring', palindromic checks under updates, 'return a random element with equal probability', streaming counts with limited memory.",
              "Prefix hash: <code>H[i+1] = H[i]·B + s[i]</code>; substring <code>get(l, r) = H[r] - H[l]·P[r-l]</code> mod M.",
              "Pick B randomly in [256, M-1] at startup; M = 10^9+7 and 10^9+9 (double) or 2^61-1.",
              "Hash comparison says 'probably equal' - for correctness-critical code, verify a candidate with direct comparison.",
              "Reservoir sampling: keep the i-th item with probability 1/i - uniform over a stream of unknown length.",
              "Bloom filters answer 'definitely not present' cheaply (cache/DB lookups, crawlers); Count-Min estimates heavy hitters in streams.",
              "Complexity: hash precompute O(n), substring hash O(1); binary search + hash O(n log n); quickselect expected O(n); Bloom/CMS O(k) per op."
            ],
            cases: [
              "Negative values after subtraction in mod arithmetic (C++/Java) - add M before taking % (Python's % is already non-negative).",
              "Mapping 'a' → 0 makes 'a' and 'aa' collide on prefix-free comparisons - map to 1..26.",
              "Single 32-bit mod with ~10^5 substrings: birthday collisions are likely - use double hashing.",
              "Overflow: B·H must fit - fine in Python, needs 128-bit or Mersenne trick in C++.",
              "Shuffle: <code>random.randint(i, n-1)</code> must include i, otherwise the distribution is biased.",
              "Bloom filters can't delete without counting bloom filters; false-positive rate grows as you insert beyond capacity."
            ],
            qa: [
              { q: "How do you reduce rolling-hash collisions?", a: "Use a large prime modulus (or 2^61-1), a random base chosen at runtime, and two independent (base, mod) pairs combined as a tuple; optionally verify matches directly. Collision chance falls to about n^2 / (M1·M2)." },
              { q: "How does a Bloom filter work and what are its trade-offs?", a: "Insert sets k bits chosen by k hash functions; query checks all k bits. If any is 0 the item is definitely absent; if all are 1 it is probably present. It is tiny and fast but has tunable false positives and no deletions (without counters)." },
              { q: "Explain reservoir sampling.", a: "Keep the first item; for the i-th item (1-indexed) replace the kept one with probability 1/i. By induction each of the n items ends up kept with probability 1/n, using O(1) memory and one pass." }
            ],
            code: `import random

class DoubleHash:
    M1, M2 = 1_000_000_007, 1_000_000_009
    def __init__(self, s):
        self.B = random.randint(911, 10**6)          # random base defeats anti-hash tests
        n = len(s)
        self.h1, self.h2 = [0] * (n + 1), [0] * (n + 1)
        self.p1, self.p2 = [1] * (n + 1), [1] * (n + 1)
        for i, ch in enumerate(s):
            c = ord(ch)
            self.h1[i + 1] = (self.h1[i] * self.B + c) % self.M1
            self.h2[i + 1] = (self.h2[i] * self.B + c) % self.M2
            self.p1[i + 1] = self.p1[i] * self.B % self.M1
            self.p2[i + 1] = self.p2[i] * self.B % self.M2
    def get(self, l, r):                              # hash of s[l:r]
        return ((self.h1[r] - self.h1[l] * self.p1[r - l]) % self.M1,
                (self.h2[r] - self.h2[l] * self.p2[r - l]) % self.M2)

def longest_dup_substring(s):                         # binary search on length + hashing
    H = DoubleHash(s)
    def find(L):
        seen = set()
        for i in range(len(s) - L + 1):
            h = H.get(i, i + L)
            if h in seen: return i
            seen.add(h)
        return -1
    lo, hi, best = 1, len(s) - 1, (0, 0)
    while lo <= hi:
        mid = (lo + hi) // 2
        i = find(mid)
        if i >= 0: best, lo = (i, mid), mid + 1
        else: hi = mid - 1
    return s[best[0]: best[0] + best[1]]

def reservoir_sample(stream):
    pick = None
    for i, x in enumerate(stream, 1):
        if random.randrange(i) == 0: pick = x
    return pick

def quickselect(a, k):                                # k-th smallest, 0-indexed, expected O(n)
    while True:
        pivot = random.choice(a)
        lo = [x for x in a if x < pivot]; eq = [x for x in a if x == pivot]
        if k < len(lo): a = lo
        elif k < len(lo) + len(eq): return pivot
        else: k -= len(lo) + len(eq); a = [x for x in a if x > pivot]

class BloomFilter:
    def __init__(self, m, k):
        self.m, self.k, self.bits = m, k, bytearray(m)
        self.seeds = [random.getrandbits(32) for _ in range(k)]
    def _idx(self, item):
        return [hash((s, item)) % self.m for s in self.seeds]
    def add(self, item):
        for i in self._idx(item): self.bits[i] = 1
    def __contains__(self, item):
        return all(self.bits[i] for i in self._idx(item))`,
            refs: [
              { n: 'CP-Algorithms: String Hashing', u: CPA + 'string/string-hashing.html', k: 'article', d: 'polynomial hash, collision probability, applications' },
              { n: 'USACO Guide: String Hashing', u: 'https://usaco.guide/gold/hashing', k: 'course', d: 'includes anti-hash discussion' },
              { n: 'Codeforces blog - Anti-hash test (Thue-Morse) and how to defend with a random base', k: 'blog' },
              { n: 'Wikipedia - Bloom filter', u: 'https://en.wikipedia.org/wiki/Bloom_filter', k: 'article', d: 'false-positive math, variants' },
              { n: 'Wikipedia - Count–min sketch', u: 'https://en.wikipedia.org/wiki/Count%E2%80%93min_sketch', k: 'article' },
              { n: 'Wikipedia - Zobrist hashing', u: 'https://en.wikipedia.org/wiki/Zobrist_hashing', k: 'article' },
              { n: 'Errichto - Rolling hash / string hashing explained', k: 'video', d: 'competitive-programming perspective' }
            ]
          },

          /* ---------------- MATRIX EXPO & ADVANCED MATH ---------------- */
          {
            id: 'matrix-expo-math',
            title: 'Matrix exponentiation & advanced math',
            est: '3–4 days',
            why: "Hard counting problems with n up to 10^9 or 10^15 (Knight Dialer follow-ups, String Transformation, character transformations) need matrix power. Modular inverse, CRT and totient underpin every 'answer mod 1e9+7' combinatorics question in OAs.",
            learn: [
              "Binary exponentiation for numbers and matrices: O(log n) multiplications.",
              "Linear recurrence <code>f(n) = Σ c_i f(n-i)</code> → k×k companion matrix; f(n) in O(k^3 log n).",
              "DP transitions that are linear and position-independent (counting walks of length n in a graph = A^n) → matrix power.",
              "<b>Modular inverse</b>: Fermat <code>a^(M-2) mod M</code> for prime M; extended Euclid for any coprime modulus; precompute factorials + inverse factorials for nCr.",
              "Extended Euclid: solve ax + by = gcd(a, b); linear Diophantine equations and congruences.",
              "<b>Chinese Remainder Theorem</b>: combine x ≡ a_i (mod m_i) for pairwise coprime moduli (and the general non-coprime merge).",
              "<b>Euler's totient</b> φ(n) by factorisation or sieve; Euler's theorem <code>a^φ(m) ≡ 1</code>; reducing huge exponents (Super Pow).",
              "Sieve of Eratosthenes / linear sieve with smallest prime factor for fast factorisation.",
              "<b>Miller-Rabin</b> intuition: write n-1 = d·2^s, test witnesses; deterministic bases for 64-bit; Pollard rho awareness."
            ],
            practice: [
              LC('Fibonacci Number (do it with matrix power)', 'E', 'fibonacci-number'),
              LC('N-th Tribonacci Number', 'E', 'n-th-tribonacci-number'),
              LC('Pow(x, n)', 'M', 'powx-n'),
              LC('Count Primes', 'M', 'count-primes'),
              LC('Super Pow', 'M', 'super-pow'),
              X('CSES', 'Exponentiation II (Fermat / totient)', 'M'),
              X('CSES', 'Binomial Coefficients (factorials + inverses)', 'M'),
              X('CSES', 'Fibonacci Numbers (n ≤ 10^18)', 'M'),
              LC('Knight Dialer', 'M', 'knight-dialer'),
              X('CSES', 'Throwing Dice (matrix expo)', 'M'),
              LC('Count Vowels Permutation', 'H', 'count-vowels-permutation'),
              X('CSES', 'Graph Paths I (A^k)', 'H'),
              X('SPOJ', 'PON - Prime or Not (Miller-Rabin)', 'H'),
              LC('Total Characters in String After Transformations II', 'H', 'total-characters-in-string-after-transformations-ii'),
              LC('String Transformation', 'H', 'string-transformation')
            ],
            notes: [
              "Signals: n up to 10^9-10^18 with a small fixed number of DP states; 'number of ways of length n'; answer mod 1e9+7; exponents themselves huge.",
              "Building the matrix: state vector v(n) = M · v(n-1); entry M[i][j] = ways to go from state j to state i in one step.",
              "Matrix power cost O(k^3 log n): fine for k ≤ ~50-100 in C++, k ≤ ~26-30 in Python.",
              "nCr mod p: precompute fact[], inv_fact[n] = pow(fact[n], p-2, p) and fill downwards - O(n) preprocessing, O(1) per query.",
              "Python has <code>pow(a, -1, m)</code> (3.8+) for modular inverse and <code>pow(a, e, m)</code> for fast modpow.",
              "CRT merge: x = a1 + m1 · ((a2 - a1) · inv(m1, m2) mod m2), new modulus m1·m2 (coprime case).",
              "Complexities: modpow O(log e); sieve O(n log log n); φ(n) O(√n); Miller-Rabin O(k log^3 n); matrix power O(k^3 log n)."
            ],
            cases: [
              "Fermat inverse needs a prime modulus and a ≢ 0; otherwise use extended Euclid and check gcd = 1.",
              "Reduce exponents mod φ(m) only when gcd(a, m) = 1 (or use the generalised Euler theorem with +φ(m)).",
              "Identity matrix for exponent 0; f(0) / f(1) base cases off-by-one when mapping n to the power.",
              "Take mod after every multiplication-add to keep numbers small (and fast) even in Python.",
              "Negative intermediate results in C++/Java modular subtraction.",
              "Miller-Rabin with random bases is probabilistic; use the fixed base set {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37} for n &lt; 3.3·10^24."
            ],
            qa: [
              { q: "How do you compute the n-th Fibonacci number for n = 10^18?", a: "[[F(n+1)], [F(n)]] = [[1, 1], [1, 0]]^n · [[1], [0]]. Raise the 2×2 matrix to n by repeated squaring - O(log n) matrix multiplications, all mod M. (Fast doubling is an equivalent shortcut.)" },
              { q: "How do you compute a modular inverse?", a: "If M is prime, a^(M-2) mod M by Fermat's little theorem. In general, extended Euclid finds x with a·x + M·y = 1 when gcd(a, M) = 1; x mod M is the inverse." },
              { q: "What is the Chinese Remainder Theorem used for?", a: "Given remainders modulo pairwise coprime moduli it reconstructs a unique value modulo their product - used to combine results computed under several small moduli, or to solve simultaneous congruences." },
              { q: "Give the intuition for Miller-Rabin.", a: "For prime n, the only square roots of 1 mod n are ±1. Write n-1 = d·2^s and look at a^d, a^(2d), ...; if this sequence reaches 1 without passing through -1 (or never reaches 1), n is composite. Each random base catches a composite with probability ≥ 3/4." }
            ],
            code: `MOD = 10**9 + 7

def mat_mul(A, B, mod=MOD):
    n, m, p = len(A), len(B), len(B[0])
    C = [[0] * p for _ in range(n)]
    for i in range(n):
        Ai, Ci = A[i], C[i]
        for k in range(m):
            a = Ai[k]
            if a:
                Bk = B[k]
                for j in range(p): Ci[j] = (Ci[j] + a * Bk[j]) % mod
    return C

def mat_pow(M, e, mod=MOD):
    n = len(M)
    R = [[int(i == j) for j in range(n)] for i in range(n)]
    while e:
        if e & 1: R = mat_mul(R, M, mod)
        M = mat_mul(M, M, mod); e >>= 1
    return R

def linear_recurrence(coeffs, init, n, mod=MOD):
    # f(n) = coeffs[0]*f(n-1) + ... + coeffs[k-1]*f(n-k); init = [f(0), ..., f(k-1)]
    k = len(coeffs)
    if n < k: return init[n] % mod
    T = [coeffs[:]] + [[int(j == i) for j in range(k)] for i in range(k - 1)]
    P = mat_pow(T, n - k + 1, mod)
    state = [[x] for x in reversed(init)]           # [f(k-1), ..., f(0)]
    return mat_mul(P, state, mod)[0][0]

def ext_gcd(a, b):
    if b == 0: return a, 1, 0
    g, x, y = ext_gcd(b, a % b)
    return g, y, x - (a // b) * y

def mod_inv(a, m):
    g, x, _ = ext_gcd(a % m, m)
    if g != 1: raise ValueError('no inverse')
    return x % m                                      # or pow(a, -1, m) in Python 3.8+

def crt(rems, mods):                                  # pairwise coprime moduli
    x, m = 0, 1
    for a, mi in zip(rems, mods):
        x = x + m * ((a - x) * mod_inv(m, mi) % mi)
        m *= mi
    return x % m, m

def phi(n):
    res, p = n, 2
    while p * p <= n:
        if n % p == 0:
            while n % p == 0: n //= p
            res -= res // p
        p += 1
    if n > 1: res -= res // n
    return res

def is_prime(n):                                      # deterministic Miller-Rabin for 64-bit
    if n < 2: return False
    small = (2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37)
    for p in small:
        if n % p == 0: return n == p
    d, s = n - 1, 0
    while d % 2 == 0: d //= 2; s += 1
    for a in small:
        x = pow(a, d, n)
        if x in (1, n - 1): continue
        for _ in range(s - 1):
            x = x * x % n
            if x == n - 1: break
        else:
            return False
    return True

def ncr_table(N, mod=MOD):
    fact = [1] * (N + 1)
    for i in range(1, N + 1): fact[i] = fact[i - 1] * i % mod
    inv = [1] * (N + 1); inv[N] = pow(fact[N], mod - 2, mod)
    for i in range(N, 0, -1): inv[i - 1] = inv[i] * i % mod
    return lambda n, r: 0 if r < 0 or r > n else fact[n] * inv[r] % mod * inv[n - r] % mod`,
            refs: [
              { n: 'CP-Algorithms: Binary Exponentiation (incl. matrix power)', u: CPA + 'algebra/binary-exp.html', k: 'article', d: 'applications section covers linear recurrences' },
              { n: 'CP-Algorithms: Modular Multiplicative Inverse', u: CPA + 'algebra/module-inverse.html', k: 'article', d: 'Fermat, ext. Euclid, inverses of 1..n in O(n)' },
              { n: 'CP-Algorithms: Chinese Remainder Theorem', u: CPA + 'algebra/chinese-remainder-theorem.html', k: 'article' },
              { n: 'CP-Algorithms: Euler\'s totient function', u: CPA + 'algebra/phi-function.html', k: 'article' },
              { n: 'CP-Algorithms: Primality tests (Fermat, Miller-Rabin)', u: CPA + 'algebra/primality_tests.html', k: 'article', d: 'deterministic base sets for 64-bit' },
              { n: 'CSES Handbook (Laaksonen) - Ch. 21 Number theory and Ch. 23 Matrices', u: CSES_BOOK, k: 'book' },
              { n: 'Errichto - Matrix Exponentiation (lecture)', k: 'video', d: 'how to turn a DP into a matrix' }
            ]
          }
        ]
      }
    ]
  });
})();
