/* DSA part 2 of 3 - recursion, trees, heaps, tries, graphs */
PREP.add({
  id: 'dsa',
  levels: [
    {
      name: 'Level 2 · Recursion, trees & heaps',
      desc: "Backtracking, binary trees, BSTs, heaps and tries - the non-linear structures behind roughly a third of product-company DSA rounds.",
      topics: [
        {
          id: 'backtracking',
          title: 'Backtracking',
          est: '5–6 days',
          why: "Asked whenever the problem says all / every / generate. Tests recursion discipline: choose, explore, un-choose. Common in Amazon, Microsoft, Google phone screens.",
          learn: [
            "Recursion tree mental model: each call = a node, each choice = an edge, leaves = complete candidates.",
            "Template: <b>choose → recurse → un-choose</b> on a shared <code>path</code>; append a <b>copy</b> (<code>path[:]</code>) to results.",
            "Subsets via include/exclude vs via <code>for i in range(start, n)</code> loop - both give 2^n.",
            "Combinations (<code>start</code> index, no reuse) vs combination sum (pass <code>i</code> not <code>i+1</code> to allow reuse).",
            "Permutations with a <code>used[]</code> array vs in-place swapping.",
            "Handling duplicates: sort first, then skip <code>if i &gt; start and a[i] == a[i-1]</code> (subsets/combos) or <code>if used[i-1] is False</code> (permutations).",
            "Pruning: stop early when partial sum exceeds target (needs sorted input), or when remaining slots cannot be filled.",
            "Constraint-satisfaction: N-Queens with column / diagonal (<code>r-c</code>) / anti-diagonal (<code>r+c</code>) sets; Sudoku with row/col/box sets.",
            "Grid backtracking (word search): mark cell visited in-place, restore after recursion.",
            "Complexity analysis: subsets O(n·2^n), permutations O(n·n!), N-Queens ~O(n!); bitmask tricks for N-Queens."
          ],
          practice: [
            { t: 'Subsets', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/subsets/' },
            { t: 'Letter Combinations of a Phone Number', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },
            { t: 'Combinations', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/combinations/' },
            { t: 'Permutations', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/permutations/' },
            { t: 'Generate Parentheses', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/generate-parentheses/' },
            { t: 'Subsets II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/subsets-ii/' },
            { t: 'Combination Sum', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/combination-sum/' },
            { t: 'Combination Sum II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/combination-sum-ii/' },
            { t: 'Combination Sum III', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/combination-sum-iii/' },
            { t: 'Permutations II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/permutations-ii/' },
            { t: 'Rat in a Maze Problem', p: 'GFG', d: 'M' },
            { t: 'Word Search', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/word-search/' },
            { t: 'Palindrome Partitioning', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/palindrome-partitioning/' },
            { t: 'Restore IP Addresses', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/restore-ip-addresses/' },
            { t: 'Matchsticks to Square', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/matchsticks-to-square/' },
            { t: 'Partition to K Equal Sum Subsets', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets/' },
            { t: 'Chessboard and Queens', p: 'CSES', d: 'M' },
            { t: 'N-Queens', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/n-queens/' },
            { t: 'Sudoku Solver', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/sudoku-solver/' },
            { t: 'Expression Add Operators', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/expression-add-operators/' }
          ],
          notes: [
            "<b>Signals:</b> return <i>all</i> combinations / permutations / partitions / placements; n is small (n ≤ 10–20); output size itself is exponential.",
            "If the problem asks for a <i>count</i> or <i>min/max</i> instead of the list, think DP first - backtracking may TLE.",
            "Decide the <b>state</b>: (index, path, remaining). Base case = path complete or index == n.",
            "Order vs no order: combinations use a <code>start</code> index (no going back); permutations scan all indices with <code>used[]</code>.",
            "Reuse allowed → recurse with <code>i</code>; no reuse → <code>i+1</code>.",
            "Duplicates in input → sort + skip same value at the same recursion depth (not across depths).",
            "Pruning makes or breaks the solution: sort descending for partition problems (fail fast), break loop once candidate &gt; remaining.",
            "Grid search: DFS from every cell, 4 directions, mark <code>board[r][c] = '#'</code> and restore - O(m·n·4^L).",
            "N-Queens trick: one queen per row, so recurse on row and only choose column; diagonals identified by <code>r-c</code> and <code>r+c</code>."
          ],
          cases: [
            "Appending <code>path</code> instead of <code>path[:]</code> → every result ends up as the same empty list.",
            "Forgetting to undo state (pop / unset visited) after the recursive call.",
            "Duplicate skip uses <code>i &gt; start</code>, not <code>i &gt; 0</code> - otherwise valid answers like [1,1] get skipped.",
            "Empty input: subsets of [] is [[]], not [].",
            "Restore IP: leading zeros (\"01\" invalid), segment &gt; 255, string length &gt; 12 → prune immediately.",
            "Word search: same cell cannot be reused; a word longer than m·n is impossible - early exit; count char frequency first for big speedups.",
            "Python recursion limit (default 1000) is rarely an issue here because depth ≤ n, but deep grid DFS can hit it.",
            "Sudoku: when backtracking fails, reset the cell to '.' and remove the digit from all three sets."
          ],
          qa: [
            { q: "Backtracking vs plain recursion vs DP?", a: "Backtracking is DFS over a choice tree with state undo and pruning, used to <i>enumerate</i>. DP applies when subproblems overlap and you need an optimum or count - memoise instead of enumerating." },
            { q: "How do you avoid duplicate permutations with repeated elements?", a: "Sort, then at each position skip <code>a[i]</code> if <code>a[i] == a[i-1]</code> and <code>a[i-1]</code> is not currently used - this enforces that equal values are picked in index order." },
            { q: "Time complexity of generating all subsets?", a: "O(n·2^n): 2^n subsets, O(n) to copy each into the result. Space O(n) recursion depth excluding output." }
          ],
          code: `def subsets_with_dup(nums):
    nums.sort()
    res, path = [], []
    def dfs(start):
        res.append(path[:])            # every node is a valid subset
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i-1]:
                continue               # skip duplicate at same depth
            path.append(nums[i])       # choose
            dfs(i + 1)                 # explore (i for reuse)
            path.pop()                 # un-choose
    dfs(0)
    return res

def solve_n_queens(n):
    cols, d1, d2, board, res = set(), set(), set(), [], []
    def place(r):
        if r == n:
            res.append(["." * c + "Q" + "." * (n - c - 1) for c in board]); return
        for c in range(n):
            if c in cols or r - c in d1 or r + c in d2:
                continue
            cols.add(c); d1.add(r - c); d2.add(r + c); board.append(c)
            place(r + 1)
            cols.remove(c); d1.remove(r - c); d2.remove(r + c); board.pop()
    place(0)
    return res`
        },
        {
          id: 'binary-trees',
          title: 'Binary trees',
          est: '6–8 days',
          why: "The single most frequent topic in product-company rounds. Nearly every interview loop has at least one tree problem; recursion skill is judged here.",
          learn: [
            "Node structure, height vs depth, full / complete / perfect / balanced trees.",
            "Recursive preorder, inorder, postorder - and when each order is natural (pre = top-down info, post = bottom-up aggregation).",
            "Iterative traversals with an explicit stack (inorder push-left pattern; postorder via reversed modified preorder or two stacks).",
            "BFS level order with a queue and <code>for _ in range(len(q))</code> to process one level at a time; zigzag variant.",
            "Views: right/left view (first/last per level), top/bottom view (BFS with horizontal distance + dict), vertical order.",
            "Bottom-up \"return height, update global answer\" pattern: diameter, balanced check, max path sum.",
            "Lowest common ancestor in a binary tree (return node if found in left/right; both non-null → current is LCA).",
            "Path sum family: root-to-leaf (top-down), any downward path (prefix-sum hashmap), max path sum (bottom-up).",
            "Construct tree from preorder + inorder (index hashmap, O(n)); why pre + post is not unique.",
            "Serialize / deserialize with preorder + null markers, or BFS; Morris traversal for O(1) space (advanced)."
          ],
          practice: [
            { t: 'Binary Tree Inorder Traversal', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/binary-tree-inorder-traversal/' },
            { t: 'Binary Tree Postorder Traversal', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/binary-tree-postorder-traversal/' },
            { t: 'Maximum Depth of Binary Tree', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
            { t: 'Invert Binary Tree', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/invert-binary-tree/' },
            { t: 'Same Tree', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/same-tree/' },
            { t: 'Symmetric Tree', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/symmetric-tree/' },
            { t: 'Balanced Binary Tree', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/balanced-binary-tree/' },
            { t: 'Diameter of Binary Tree', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
            { t: 'Path Sum', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/path-sum/' },
            { t: 'Binary Tree Level Order Traversal', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
            { t: 'Binary Tree Zigzag Level Order Traversal', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/' },
            { t: 'Binary Tree Right Side View', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
            { t: 'Top View of Binary Tree', p: 'GFG', d: 'M' },
            { t: 'Count Good Nodes in Binary Tree', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/' },
            { t: 'Lowest Common Ancestor of a Binary Tree', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/' },
            { t: 'Path Sum III', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/path-sum-iii/' },
            { t: 'Construct Binary Tree from Preorder and Inorder Traversal', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
            { t: 'All Nodes Distance K in Binary Tree', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/' },
            { t: 'Binary Tree Maximum Path Sum', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
            { t: 'Serialize and Deserialize Binary Tree', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' }
          ],
          notes: [
            "<b>Ask first:</b> does information flow top-down (pass as argument: depth, path sum, max so far) or bottom-up (return value: height, subtree sum)?",
            "<b>Level / depth / closest / minimum depth / view</b> → BFS. <b>Path / subtree / ancestor</b> → DFS.",
            "Global-answer pattern: helper returns the best <i>single-branch</i> value to the parent, while updating a global with the <i>two-branch</i> value (diameter, max path sum).",
            "Distance-K / burning tree: convert tree to undirected graph (parent map) then BFS from target.",
            "Top/bottom view: BFS (not DFS) with (node, hd); top view keeps first seen per hd, bottom view overwrites.",
            "Construct from traversals: preorder[0] is root; inorder index splits left/right sizes. Use a dict for O(1) lookup → O(n) total.",
            "Any downward path summing to k = prefix sums on the root-to-node path with a counter; decrement on backtrack.",
            "All traversals O(n) time; space O(h) for DFS (O(n) skewed, O(log n) balanced), O(w) for BFS where w = max width."
          ],
          cases: [
            "<code>root is None</code> - return 0 / [] / True explicitly; most bugs come from not handling it.",
            "Skewed tree with n = 10^5 → Python recursion depth exceeded. Use <code>sys.setrecursionlimit</code> or iterative traversal.",
            "Minimum depth: a node with one child is <i>not</i> a leaf - do not take min with the missing side (returns 1 wrongly).",
            "Max path sum: clamp negative child gains to 0 (<code>max(0, gain)</code>), and initialise answer to <code>-inf</code>, not 0 (all-negative trees).",
            "Diameter counts <b>edges</b> on LeetCode, nodes on some GFG versions - confirm.",
            "LCA where one node may not exist in the tree - the standard solution assumes both exist; add a found-count if not.",
            "Construct from traversals fails with duplicate values (index map ambiguous) - clarify uniqueness.",
            "Serialization: use explicit null markers and a delimiter; negative and multi-digit values break char-by-char parsing."
          ],
          qa: [
            { q: "Why is recursion space O(h) and when is that O(n)?", a: "The call stack holds one frame per ancestor of the current node, so max depth h. For a skewed (linked-list shaped) tree h = n." },
            { q: "Can a binary tree be uniquely built from preorder and postorder?", a: "Not in general - if a node has a single child you cannot tell left from right. Inorder plus either pre or post is unique (with distinct values); pre+post is unique only for full binary trees." },
            { q: "How do you do inorder traversal in O(1) extra space?", a: "Morris traversal: for each node with a left child, find its inorder predecessor, create a temporary thread to the current node, and remove it on the second visit. O(n) time, O(1) space, tree restored." },
            { q: "BFS vs DFS for minimum depth?", a: "BFS: stops at the first leaf found, so it does not explore the whole tree when the answer is shallow. DFS must visit everything." }
          ],
          code: `from collections import deque

def level_order(root):
    if not root: return []
    q, res = deque([root]), []
    while q:
        level = []
        for _ in range(len(q)):          # one level at a time
            node = q.popleft(); level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res

def inorder_iter(root):
    st, res, cur = [], [], root
    while cur or st:
        while cur: st.append(cur); cur = cur.left
        cur = st.pop(); res.append(cur.val); cur = cur.right
    return res

def max_path_sum(root):
    best = float('-inf')
    def gain(n):                          # best single-branch sum from n down
        nonlocal best
        if not n: return 0
        l, r = max(0, gain(n.left)), max(0, gain(n.right))
        best = max(best, n.val + l + r)   # path bending at n
        return n.val + max(l, r)
    gain(root)
    return best

def lca(root, p, q):
    if not root or root is p or root is q: return root
    l, r = lca(root.left, p, q), lca(root.right, p, q)
    return root if l and r else (l or r)`
        },
        {
          id: 'bst',
          title: 'Binary search trees',
          est: '3–4 days',
          why: "BST property questions (validate, kth smallest, successor, iterator) are favourites because they test whether you exploit ordering instead of brute-forcing the whole tree.",
          learn: [
            "BST invariant: every node in left subtree &lt; node &lt; every node in right subtree (not just immediate children).",
            "Inorder traversal of a BST is sorted - the key to most BST problems.",
            "Search / insert in O(h); iterative versions avoid recursion.",
            "Validate with (low, high) bounds passed down, or by checking inorder is strictly increasing.",
            "Kth smallest via iterative inorder with early stop; follow-up: store subtree sizes for O(h) per query.",
            "Delete node: leaf, one child, two children (replace with inorder successor, then delete successor).",
            "Inorder successor / predecessor without parent pointers: walk from root, remembering last left turn.",
            "BST iterator with a stack of left spine: O(1) amortised <code>next()</code>, O(h) space.",
            "Balanced BSTs (AVL / Red-Black) - only know why they exist (guarantee O(log n)) and that Python lacks a built-in one (<code>sortedcontainers.SortedList</code>)."
          ],
          practice: [
            { t: 'Search in a Binary Search Tree', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/search-in-a-binary-search-tree/' },
            { t: 'Convert Sorted Array to Binary Search Tree', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/' },
            { t: 'Minimum Absolute Difference in BST', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/minimum-absolute-difference-in-bst/' },
            { t: 'Two Sum IV - Input is a BST', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/' },
            { t: 'Floor in BST', p: 'GFG', d: 'E' },
            { t: 'Ceil from BST', p: 'CN', d: 'E' },
            { t: 'Insert into a Binary Search Tree', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/' },
            { t: 'Validate Binary Search Tree', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/validate-binary-search-tree/' },
            { t: 'Kth Smallest Element in a BST', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
            { t: 'Lowest Common Ancestor of a Binary Search Tree', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/' },
            { t: 'Delete Node in a BST', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/delete-node-in-a-bst/' },
            { t: 'Inorder Successor in BST', p: 'GFG', d: 'M' },
            { t: 'Binary Search Tree Iterator', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/binary-search-tree-iterator/' },
            { t: 'Construct Binary Search Tree from Preorder Traversal', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/' },
            { t: 'Trim a Binary Search Tree', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/trim-a-binary-search-tree/' },
            { t: 'Recover Binary Search Tree', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/recover-binary-search-tree/' },
            { t: 'Largest BST', p: 'GFG', d: 'H' },
            { t: 'Maximum Sum BST in Binary Tree', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/' }
          ],
          notes: [
            "<b>Signal:</b> \"BST\" in the statement means you are expected to use ordering - O(h) not O(n). If your solution ignores ordering, rethink.",
            "Sorted order / kth / rank / closest value / range → inorder traversal (possibly early-stopping).",
            "LCA in BST: walk from root; both smaller → go left, both larger → go right, else current node. O(h), no recursion needed.",
            "Successor of x: walk from root; when <code>x.val &lt; node.val</code> record node and go left, else go right.",
            "Two Sum on BST: two BST iterators (forward and reverse) = two pointers on sorted array in O(h) space.",
            "Recover BST: inorder finds the two out-of-order nodes (first violation's prev, last violation's cur); swap values.",
            "Largest BST subtree: postorder returning (is_bst, size, min, max) - classic bottom-up.",
            "Build BST from preorder in O(n) using an upper-bound recursion (no inorder needed)."
          ],
          cases: [
            "Validate: checking only <code>left.val &lt; node.val &lt; right.val</code> is wrong - a deep descendant can violate the ancestor bound.",
            "Use <code>-inf / inf</code> (or None) for initial bounds; node values can equal <code>INT_MIN / INT_MAX</code>.",
            "Duplicates: clarify whether allowed and which side they go to; LeetCode validate requires <b>strict</b> inequality.",
            "Delete root with two children; deleting a key not present should return tree unchanged.",
            "Kth smallest with k &gt; n - define behaviour.",
            "Unbalanced BST from sorted inserts degrades to O(n) per operation - mention when discussing complexity.",
            "Successor of the maximum node is None."
          ],
          qa: [
            { q: "Kth smallest is queried often and tree is modified often - how to optimise?", a: "Augment each node with subtree size. Then at each node compare k with left size: go left, return node, or go right with k - left - 1. O(h) per query and updates maintain sizes along the path." },
            { q: "Why prefer a balanced BST over a hash map?", a: "Ordered operations: floor/ceil, range queries, kth element, in-order iteration - all O(log n). Hash maps give only O(1) point lookup." },
            { q: "Space of BST iterator and amortised time of next()?", a: "O(h) space for the stack. Each node is pushed and popped exactly once over n calls, so amortised O(1) per next()." }
          ],
          code: `def is_valid_bst(root, lo=float('-inf'), hi=float('inf')):
    if not root: return True
    if not (lo < root.val < hi): return False
    return is_valid_bst(root.left, lo, root.val) and is_valid_bst(root.right, root.val, hi)

def delete_node(root, key):
    if not root: return None
    if key < root.val: root.left = delete_node(root.left, key)
    elif key > root.val: root.right = delete_node(root.right, key)
    else:
        if not root.left: return root.right
        if not root.right: return root.left
        s = root.right
        while s.left: s = s.left          # inorder successor
        root.val = s.val
        root.right = delete_node(root.right, s.val)
    return root

class BSTIterator:
    def __init__(self, root):
        self.st = []; self._push(root)
    def _push(self, n):
        while n: self.st.append(n); n = n.left
    def next(self):
        n = self.st.pop(); self._push(n.right); return n.val
    def hasNext(self):
        return bool(self.st)`
        },
        {
          id: 'heaps',
          title: 'Heaps / priority queues',
          est: '3–4 days',
          why: "Top-k, streaming median and scheduling are very common at Amazon, Uber, Flipkart. Heaps also power Dijkstra and k-way merge, so this pays off twice.",
          learn: [
            "Binary heap as an array: parent <code>(i-1)//2</code>, children <code>2i+1, 2i+2</code>; sift-up and sift-down.",
            "Complexities: push/pop O(log n), peek O(1), heapify O(n) (and why it is O(n), not O(n log n)).",
            "Python <code>heapq</code> is a min-heap only: negate for max-heap; push tuples <code>(priority, tiebreak, item)</code>.",
            "Top-k largest: keep a <b>min</b>-heap of size k → O(n log k). Compare with sorting O(n log n) and quickselect O(n) average.",
            "K-way merge: heap of (value, list index, element index) - merge k sorted lists, kth smallest in sorted matrix, smallest range.",
            "Two heaps: max-heap for the lower half, min-heap for the upper half → running median; lazy deletion for sliding window median.",
            "Greedy scheduling with heaps: task scheduler, reorganize string, IPO, single-threaded CPU, meeting rooms (end-time heap).",
            "Lazy deletion and the <code>(value, version)</code> trick when the heap has no decrease-key."
          ],
          practice: [
            { t: 'Last Stone Weight', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/last-stone-weight/' },
            { t: 'Kth Largest Element in a Stream', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
            { t: 'Kth Largest Element in an Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
            { t: 'K Closest Points to Origin', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
            { t: 'Top K Frequent Elements', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/top-k-frequent-elements/' },
            { t: 'Sort Characters By Frequency', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/sort-characters-by-frequency/' },
            { t: 'Merge k Sorted Arrays', p: 'GFG', d: 'M' },
            { t: 'Kth Smallest Element in a Sorted Matrix', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/' },
            { t: 'Find K Pairs with Smallest Sums', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/' },
            { t: 'Task Scheduler', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/task-scheduler/' },
            { t: 'Reorganize String', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/reorganize-string/' },
            { t: 'Single-Threaded CPU', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/single-threaded-cpu/' },
            { t: 'Design Twitter', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/design-twitter/' },
            { t: 'Merge k Sorted Lists', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
            { t: 'Find Median from Data Stream', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/find-median-from-data-stream/' },
            { t: 'Sliding Window Median', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/sliding-window-median/' },
            { t: 'IPO', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/ipo/' },
            { t: 'Meeting Rooms III', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/meeting-rooms-iii/' },
            { t: 'Smallest Range Covering Elements from K Lists', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/' },
            { t: 'Minimum Cost to Hire K Workers', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/minimum-cost-to-hire-k-workers/' }
          ],
          notes: [
            "<b>Signals:</b> \"k largest / smallest / closest / most frequent\", \"stream\", \"repeatedly take the min/max\", \"merge k sorted\", \"median\".",
            "Top-k largest → min-heap of size k (pop when size &gt; k). Top-k smallest → max-heap of size k. Root is the kth element.",
            "If k is close to n or input is static, mention quickselect (O(n) avg) or bucket sort (frequencies bounded by n).",
            "K-way merge: seed heap with the head of each list; pop min, push its successor. O(N log k).",
            "Two heaps median: keep <code>len(lo) == len(hi)</code> or <code>len(lo) == len(hi)+1</code>; always push to lo, move lo's max to hi, rebalance.",
            "Scheduling: sort jobs by start/available time, use a heap keyed by the greedy criterion (shortest duration, max profit, earliest free room).",
            "Exchange-argument greedy + heap: \"choose k items maximising sum × min\" → sort by one key, heap over the other (hire K workers, max performance of team).",
            "Heap of size k from n items: O(n log k) time, O(k) space."
          ],
          cases: [
            "Python heapq compares tuples element-wise - if priorities tie and the next element is an uncomparable object (ListNode) you get a TypeError. Add an index tiebreak.",
            "Max-heap via negation: remember to negate back on pop; negating a tuple requires negating the key only.",
            "<code>heapq.heapify</code> is in-place and returns None.",
            "Sliding window median: removing arbitrary elements is O(k) in heapq; use lazy deletion with a counter or a SortedList.",
            "Median of even count: average of two middles - watch integer vs float division.",
            "k = 0 or k &gt; n; empty heap peek raises IndexError.",
            "Reorganize string impossible when max frequency &gt; (n+1)//2 - check upfront."
          ],
          qa: [
            { q: "Why is building a heap O(n)?", a: "Sift-down from the last internal node: most nodes are near the bottom and sift down only a few levels. Sum of heights = Σ n/2^(h+1)·h = O(n)." },
            { q: "Top-k: heap vs quickselect vs bucket sort?", a: "Heap O(n log k), works on streams, O(k) memory. Quickselect O(n) average / O(n²) worst, needs all data in memory, mutates input. Bucket sort O(n) when keys are bounded (e.g. frequencies ≤ n)." },
            { q: "Heap vs balanced BST as a priority queue?", a: "Heap: O(1) peek, O(log n) push/pop, cache-friendly array, but no efficient arbitrary delete or ordered iteration. BST: O(log n) for everything including delete-any, floor/ceil, min and max together." }
          ],
          code: `import heapq

def top_k_largest(nums, k):
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k: heapq.heappop(h)   # drop smallest
    return h                               # h[0] is kth largest

def merge_k_lists(lists):
    h = [(node.val, i, node) for i, node in enumerate(lists) if node]
    heapq.heapify(h)
    dummy = tail = ListNode(0)
    while h:
        _, i, node = heapq.heappop(h)
        tail.next = node; tail = node
        if node.next: heapq.heappush(h, (node.next.val, i, node.next))
    return dummy.next

class MedianFinder:
    def __init__(self):
        self.lo, self.hi = [], []          # lo: max-heap (negated), hi: min-heap
    def addNum(self, x):
        heapq.heappush(self.lo, -x)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))
    def findMedian(self):
        if len(self.lo) > len(self.hi): return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2`
        },
        {
          id: 'tries',
          title: 'Tries',
          est: '2–3 days',
          why: "Autocomplete, dictionary and prefix problems; Word Search II is a top-asked Hard. XOR trie shows up in Indian product-company OAs and Codeforces-style rounds.",
          learn: [
            "Trie node: children map (dict or array of 26) + <code>is_end</code> flag; root is an empty node.",
            "Insert, search, startsWith - each O(L) where L = word length.",
            "Store extra info per node: prefix count, word count, the full word at the end node, or top-3 suggestions.",
            "Wildcard search (<code>.</code>) via DFS over children.",
            "Delete a word using prefix counts (decrement along the path).",
            "Word Search II: build trie of words, DFS the grid walking the trie in parallel; prune leaf nodes after a match.",
            "Binary (XOR) trie: insert numbers bit by bit from MSB; for max XOR greedily take the opposite bit.",
            "Offline queries with XOR trie: sort queries by limit and insert numbers incrementally.",
            "Space trade-off: array[26] is fast but memory heavy; dict is compact; mention compressed tries / radix trees."
          ],
          practice: [
            { t: 'Longest Common Prefix', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/longest-common-prefix/' },
            { t: 'Implement Trie (Prefix Tree)', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
            { t: 'Implement Trie II', p: 'CN', d: 'M' },
            { t: 'Design Add and Search Words Data Structure', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
            { t: 'Replace Words', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/replace-words/' },
            { t: 'Map Sum Pairs', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/map-sum-pairs/' },
            { t: 'Longest Word in Dictionary', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/longest-word-in-dictionary/' },
            { t: 'Complete String', p: 'CN', d: 'M' },
            { t: 'Search Suggestions System', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/search-suggestions-system/' },
            { t: 'Count Distinct Substrings', p: 'CN', d: 'M' },
            { t: 'Maximum XOR of Two Numbers in an Array', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/' },
            { t: 'Word Search II', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/word-search-ii/' },
            { t: 'Maximum XOR With an Element From Array', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/maximum-xor-with-an-element-from-array/' },
            { t: 'Prefix and Suffix Search', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/prefix-and-suffix-search/' },
            { t: 'Stream of Characters', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/stream-of-characters/' },
            { t: 'Concatenated Words', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/concatenated-words/' },
            { t: 'Palindrome Pairs', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/palindrome-pairs/' }
          ],
          notes: [
            "<b>Signals:</b> many words + prefix queries, autocomplete, \"starts with\", dictionary matching in a grid/stream, or \"maximum XOR of pairs\".",
            "One word lookup → hash set is enough. Many words sharing prefixes searched together → trie (shares work across words).",
            "Word Search II: store the word at its end node, clear it after finding (avoid duplicates) and delete exhausted branches - huge speed-up.",
            "Stream of characters / suffix matching → insert <b>reversed</b> words and walk the stream backwards.",
            "Prefix + suffix search → insert <code>suffix + '#' + word</code> for every suffix.",
            "XOR trie: for each number, walk from bit 31 (or 30) down, prefer child with opposite bit → maximum XOR in O(32) per query.",
            "Complexity: build O(total chars), query O(L). Space O(total chars × alphabet) worst case."
          ],
          cases: [
            "Search vs startsWith: search must check <code>is_end</code>; \"app\" is not found just because \"apple\" exists.",
            "Empty string insert/search - decide whether root counts as a word.",
            "Word Search II: same word found via multiple paths → duplicates in output unless you clear the end marker.",
            "Restore grid cells after DFS; mark visited in-place with a sentinel.",
            "XOR trie: fix bit width (e.g. 31 bits for non-negative ints) and use the same width for insert and query; negative numbers need care.",
            "Max XOR with limit queries: if no number ≤ limit is inserted yet, answer -1.",
            "Recursion on very long words is fine (depth = L), but array-based nodes for 10^5 words × 26 can exceed memory in Python - prefer dict."
          ],
          qa: [
            { q: "Trie vs hash set for a dictionary?", a: "Hash set: O(L) lookup, less memory, but no prefix queries. Trie: O(L) lookup plus prefix queries, autocomplete, lexicographic iteration, and shared-prefix pruning during DFS - at the cost of more memory." },
            { q: "How does a trie make Word Search II faster than searching each word?", a: "All words are explored in one grid DFS; a path is abandoned as soon as the current prefix is not in the trie, so shared prefixes are searched once. Complexity is bounded by m·n·4·3^(L-1) instead of multiplying by the number of words." },
            { q: "Why does greedy work for max XOR in a binary trie?", a: "A higher bit dominates all lower bits combined (2^k &gt; 2^k - 1), so choosing the opposite bit at the highest possible position is always optimal." }
          ],
          code: `class TrieNode:
    __slots__ = ("ch", "end", "word")
    def __init__(self):
        self.ch, self.end, self.word = {}, False, None

class Trie:
    def __init__(self): self.root = TrieNode()
    def insert(self, w):
        n = self.root
        for c in w: n = n.ch.setdefault(c, TrieNode())
        n.end = True; n.word = w
    def _walk(self, s):
        n = self.root
        for c in s:
            if c not in n.ch: return None
            n = n.ch[c]
        return n
    def search(self, w):
        n = self._walk(w); return bool(n and n.end)
    def startsWith(self, p):
        return self._walk(p) is not None

def find_max_xor(nums, B=31):
    root = {}
    for x in nums:                          # insert bits MSB -> LSB
        n = root
        for b in range(B, -1, -1):
            n = n.setdefault((x >> b) & 1, {})
    best = 0
    for x in nums:
        n, cur = root, 0
        for b in range(B, -1, -1):
            bit = (x >> b) & 1
            if 1 - bit in n: cur |= 1 << b; n = n[1 - bit]
            else: n = n[bit]
        best = max(best, cur)
    return best`
        }
      ]
    },
    {
      name: 'Level 2b · Graphs',
      desc: "Traversals, ordering, shortest paths, connectivity and the advanced algorithms that separate strong candidates in senior / FAANG rounds.",
      topics: [
        {
          id: 'graph-bfs-dfs',
          title: 'Graph basics & BFS / DFS',
          est: '5–6 days',
          why: "Grid and graph traversal problems (islands, rotting oranges, word ladder) are among the most asked mediums at every product company.",
          learn: [
            "Representations: adjacency list (default), adjacency matrix, edge list; implicit graphs (grids, word transformations, states).",
            "Directed vs undirected, weighted vs unweighted, dense vs sparse; building adjacency from edges with <code>defaultdict(list)</code>.",
            "DFS (recursive and iterative) and BFS with a <code>visited</code> set; both O(V + E).",
            "Connected components: loop over all nodes, start a traversal from each unvisited one.",
            "Grid as graph: 4/8-direction arrays, bounds checks, in-place marking.",
            "BFS gives shortest path in edges for unweighted graphs; track distance per level.",
            "Multi-source BFS: push all sources at distance 0 (rotting oranges, 01 matrix, walls and gates).",
            "Bipartite check: 2-colouring with BFS/DFS; odd cycle ⇔ not bipartite.",
            "Cycle detection: undirected (visited + parent, or DSU); directed (3 colours: white/grey/black, or Kahn leftover).",
            "Reverse thinking: flood from borders/targets instead of from every cell (surrounded regions, Pacific Atlantic, safe states on reversed graph)."
          ],
          practice: [
            { t: 'Find if Path Exists in Graph', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/find-if-path-exists-in-graph/' },
            { t: 'Flood Fill', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/flood-fill/' },
            { t: 'Counting Rooms', p: 'CSES', d: 'E' },
            { t: 'Number of Islands', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/number-of-islands/' },
            { t: 'Max Area of Island', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/max-area-of-island/' },
            { t: 'Number of Provinces', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/number-of-provinces/' },
            { t: 'Clone Graph', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/clone-graph/' },
            { t: 'Rotting Oranges', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/rotting-oranges/' },
            { t: '01 Matrix', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/01-matrix/' },
            { t: 'Surrounded Regions', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/surrounded-regions/' },
            { t: 'Number of Enclaves', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/number-of-enclaves/' },
            { t: 'Pacific Atlantic Water Flow', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
            { t: 'Detect cycle in an undirected graph', p: 'GFG', d: 'M' },
            { t: 'Detect cycle in a directed graph', p: 'GFG', d: 'M' },
            { t: 'Is Graph Bipartite?', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/is-graph-bipartite/' },
            { t: 'Possible Bipartition', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/possible-bipartition/' },
            { t: 'Find Eventual Safe States', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/find-eventual-safe-states/' },
            { t: 'Shortest Bridge', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/shortest-bridge/' },
            { t: 'Word Ladder', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/word-ladder/' }
          ],
          notes: [
            "<b>Signals:</b> grid of cells, \"connected\", \"islands\", \"regions\", \"spread / infect / minutes until\", relationships between entities, transformations one step at a time.",
            "Minimum steps / fewest moves / nearest in an unweighted setting → <b>BFS</b>. Explore all / count components / path existence → DFS or BFS.",
            "\"Distance from nearest X\" for every cell → multi-source BFS from all X at once - O(m·n) instead of O((m·n)²).",
            "\"Can this cell reach the border/ocean\" → reverse the question and flood from the border.",
            "Implicit graph: generate neighbours on the fly (Word Ladder: change each char, or bucket by wildcard pattern <code>h*t</code>).",
            "Bipartite / two groups / dislike pairs → 2-colouring; must loop over all components.",
            "Directed cycle → DFS with recursion-stack state (grey). Undirected cycle → neighbour visited and not the parent.",
            "Complexity: O(V + E) for adjacency list; grid O(m·n). Adjacency matrix makes it O(V²)."
          ],
          cases: [
            "<b>Disconnected graph</b>: run traversal from every unvisited node, especially for bipartite and cycle checks.",
            "BFS: mark visited <b>when pushing</b>, not when popping - otherwise a node is enqueued many times (TLE / wrong distances).",
            "Recursive DFS on a 1000×1000 grid blows the Python stack - use iterative stack or BFS.",
            "Undirected cycle with parent check fails with <b>parallel edges</b> (two edges between u and v form a cycle) - track edge id instead.",
            "Self-loops: a self-loop is a cycle (directed and undirected) and makes a graph non-bipartite.",
            "Rotting oranges: no fresh oranges → 0; unreachable fresh orange → -1; do not count the final empty level as a minute.",
            "Nodes labelled 1..n vs 0..n-1; nodes with no edges still exist (isolated components).",
            "Clone graph: map old→new before recursing to handle cycles."
          ],
          qa: [
            { q: "Why does BFS give shortest paths in unweighted graphs but DFS does not?", a: "BFS explores in non-decreasing order of distance (level by level), so the first time a node is reached is via a shortest path. DFS can reach a node first via a long path." },
            { q: "How do you detect a cycle in a directed vs undirected graph?", a: "Directed: DFS with three states; reaching a grey (on current recursion stack) node means a back edge → cycle. Or Kahn: if not all nodes get processed, a cycle exists. Undirected: DFS seeing a visited neighbour that is not the parent, or DSU finding both endpoints already in the same set." },
            { q: "Adjacency list vs matrix?", a: "List: O(V + E) space, iterate neighbours in O(deg) - best for sparse graphs. Matrix: O(V²) space, O(1) edge lookup - fine for dense graphs or V ≤ ~1000 (Floyd-Warshall)." }
          ],
          code: `from collections import deque, defaultdict

def build(n, edges, directed=False):
    g = defaultdict(list)
    for u, v in edges:
        g[u].append(v)
        if not directed: g[v].append(u)
    return g

def multi_source_bfs(grid):                 # e.g. rotting oranges
    R, C = len(grid), len(grid[0])
    q = deque((r, c) for r in range(R) for c in range(C) if grid[r][c] == 2)
    fresh = sum(row.count(1) for row in grid)
    mins = 0
    while q and fresh:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1:
                    grid[nr][nc] = 2; fresh -= 1   # mark on push
                    q.append((nr, nc))
        mins += 1
    return -1 if fresh else mins

def is_bipartite(n, g):
    color = [-1] * n
    for s in range(n):                      # every component
        if color[s] != -1: continue
        color[s] = 0; q = deque([s])
        while q:
            u = q.popleft()
            for v in g[u]:
                if color[v] == -1: color[v] = color[u] ^ 1; q.append(v)
                elif color[v] == color[u]: return False
    return True

def has_cycle_directed(n, g):
    state = [0] * n                         # 0 white, 1 grey, 2 black
    def dfs(u):
        state[u] = 1
        for v in g[u]:
            if state[v] == 1 or (state[v] == 0 and dfs(v)): return True
        state[u] = 2; return False
    return any(state[u] == 0 and dfs(u) for u in range(n))`
        },
        {
          id: 'topological-sort',
          title: 'Topological sort',
          est: '2–3 days',
          why: "Course Schedule and Alien Dictionary are classics; dependency ordering also appears in system-design-flavoured coding rounds (build systems, task pipelines, DAG schedulers).",
          learn: [
            "Topological order exists iff the directed graph is a DAG.",
            "Kahn algorithm: compute indegrees, queue all zero-indegree nodes, pop and decrement neighbours.",
            "Cycle detection via Kahn: processed count &lt; n ⇒ cycle.",
            "DFS-based topo sort: append node after exploring all descendants (postorder), then reverse.",
            "Lexicographically smallest order: replace the queue with a min-heap.",
            "Alien dictionary: derive edges from the first differing character of adjacent words.",
            "DP on DAG in topo order: longest path, number of paths, earliest finish time (parallel courses III).",
            "Leaf trimming (Kahn on undirected tree by degree) to find tree centres - minimum height trees."
          ],
          practice: [
            { t: 'Topological sort', p: 'GFG', d: 'M' },
            { t: 'Course Schedule', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/course-schedule/' },
            { t: 'Course Schedule II', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/course-schedule-ii/' },
            { t: 'Course Schedule (CSES)', p: 'CSES', d: 'M' },
            { t: 'Find All Possible Recipes from Given Supplies', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/' },
            { t: 'Course Schedule IV', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/course-schedule-iv/' },
            { t: 'Loud and Rich', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/loud-and-rich/' },
            { t: 'Minimum Height Trees', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/minimum-height-trees/' },
            { t: 'Longest Flight Route', p: 'CSES', d: 'M' },
            { t: 'Alien Dictionary', p: 'GFG', d: 'H' },
            { t: 'Parallel Courses III', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/parallel-courses-iii/' },
            { t: 'Longest Increasing Path in a Matrix', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/' },
            { t: 'Largest Color Value in a Directed Graph', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/largest-color-value-in-a-directed-graph/' },
            { t: 'Build a Matrix With Conditions', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/build-a-matrix-with-conditions/' },
            { t: 'Sort Items by Groups Respecting Dependencies', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/' }
          ],
          notes: [
            "<b>Signals:</b> prerequisites, dependencies, \"must come before\", build order, ordering from pairwise comparisons, \"is it possible to finish\".",
            "Possible to finish? → cycle detection. Give an order → topo sort. Minimum time / semesters → BFS levels of Kahn or DP on topo order.",
            "Edge direction matters: for <code>[a, b]</code> meaning \"b before a\", the edge is <code>b → a</code>. Get this right before coding.",
            "Kahn is iterative (no recursion limit issues) and naturally gives levels; DFS version is shorter but needs cycle states.",
            "Alien dictionary: compare only adjacent words, use first mismatch; then topo sort over all letters seen.",
            "Longest path in DAG = DP in topo order, O(V + E). (Longest path in a general graph is NP-hard.)",
            "Two-level ordering (items within groups) → two topo sorts: one on groups, one on items."
          ],
          cases: [
            "Graph with a cycle → return [] / False; check processed count == n.",
            "Nodes with no edges must still appear in the output (initialise indegree for all n nodes / all letters).",
            "Duplicate edges inflate indegree - either dedupe or ensure decrements match pushes.",
            "Alien dictionary invalid input: word is a prefix of the previous word (\"abc\" before \"ab\") → no valid order.",
            "Self-loop prerequisite <code>[a, a]</code> = cycle.",
            "Multiple valid orders exist - interviewers usually accept any; if not, use a heap for lexicographic order.",
            "Minimum height trees: n = 1 → [0]; n = 2 → [0, 1]."
          ],
          qa: [
            { q: "Kahn vs DFS topological sort?", a: "Both O(V + E). Kahn is BFS-like, iterative, detects cycles by count, and gives level structure (parallel scheduling). DFS uses postorder reversed, needs grey/black states for cycle detection and can hit recursion limits." },
            { q: "How do you find the minimum number of semesters to finish all courses?", a: "Run Kahn level by level: each BFS level is a semester. Answer = number of levels if all nodes are processed, else -1 (cycle)." },
            { q: "Why does a DAG always have at least one topological order?", a: "Every finite DAG has a node with indegree 0 (otherwise following incoming edges forever would revisit a node, forming a cycle). Remove it and repeat by induction." }
          ],
          code: `from collections import deque, defaultdict

def topo_kahn(n, edges):                    # edges: (u, v) meaning u -> v
    g, indeg = defaultdict(list), [0] * n
    for u, v in edges:
        g[u].append(v); indeg[v] += 1
    q = deque(i for i in range(n) if indeg[i] == 0)
    order = []
    while q:
        u = q.popleft(); order.append(u)
        for v in g[u]:
            indeg[v] -= 1
            if indeg[v] == 0: q.append(v)
    return order if len(order) == n else []  # [] => cycle

def alien_order(words):
    g = {c: set() for w in words for c in w}
    indeg = {c: 0 for c in g}
    for a, b in zip(words, words[1:]):
        for x, y in zip(a, b):
            if x != y:
                if y not in g[x]: g[x].add(y); indeg[y] += 1
                break
        else:
            if len(a) > len(b): return ""     # prefix violation
    q = deque(c for c in g if indeg[c] == 0); out = []
    while q:
        c = q.popleft(); out.append(c)
        for d in g[c]:
            indeg[d] -= 1
            if indeg[d] == 0: q.append(d)
    return "".join(out) if len(out) == len(g) else ""`
        },
        {
          id: 'shortest-paths',
          title: 'Shortest paths',
          est: '4–5 days',
          why: "Dijkstra is expected knowledge for any SDE-2+ / FAANG loop; variants (K stops, min effort, probability) are frequent. Choosing the right algorithm is itself an interview signal.",
          learn: [
            "Unweighted → BFS, O(V + E).",
            "0-1 BFS with a deque: weight-0 edges push front, weight-1 push back; O(V + E).",
            "Dijkstra with a min-heap and lazy deletion (<code>if d &gt; dist[u]: continue</code>); O((V + E) log V).",
            "Why Dijkstra fails with negative edges; it works with any monotone cost (max-edge, product of probabilities ≤ 1 via max-heap).",
            "Bellman-Ford: relax all edges V-1 times; a V-th successful relaxation ⇒ negative cycle; O(V·E).",
            "Bounded-edges shortest path (at most K stops): Bellman-Ford with K+1 rounds using a copy of dist, or BFS/Dijkstra on (node, stops) state.",
            "Floyd-Warshall all-pairs: <code>for k, for i, for j</code>; O(V³); negative cycle if <code>dist[i][i] &lt; 0</code>.",
            "Path reconstruction with a parent array; counting shortest paths (ways array updated on equal distance).",
            "State-space Dijkstra: node = (cell, extra state) such as remaining discounts, fuel, keys.",
            "Choosing: unweighted → BFS; weights 0/1 → 0-1 BFS; non-negative → Dijkstra; negative → Bellman-Ford / SPFA; all pairs with small V → Floyd-Warshall."
          ],
          practice: [
            { t: 'Shortest Path in Binary Matrix', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/' },
            { t: 'Open the Lock', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/open-the-lock/' },
            { t: 'Network Delay Time', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/network-delay-time/' },
            { t: 'Shortest Routes I', p: 'CSES', d: 'M' },
            { t: 'Path With Minimum Effort', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/path-with-minimum-effort/' },
            { t: 'Path with Maximum Probability', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/path-with-maximum-probability/' },
            { t: 'Cheapest Flights Within K Stops', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },
            { t: 'Number of Ways to Arrive at Destination', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/' },
            { t: 'Distance from the Source (Bellman-Ford Algorithm)', p: 'GFG', d: 'M' },
            { t: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/' },
            { t: 'Shortest Routes II', p: 'CSES', d: 'M' },
            { t: 'Minimum Obstacle Removal to Reach Corner', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/' },
            { t: 'Minimum Cost to Make at Least One Valid Path in a Grid', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/' },
            { t: 'Swim in Rising Water', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/swim-in-rising-water/' },
            { t: 'Flight Discount', p: 'CSES', d: 'H' },
            { t: 'High Score', p: 'CSES', d: 'H' },
            { t: 'Second Minimum Time to Reach Destination', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/second-minimum-time-to-reach-destination/' },
            { t: 'Minimum Weighted Subgraph With the Required Paths', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/minimum-weighted-subgraph-with-the-required-paths/' }
          ],
          notes: [
            "<b>Signals:</b> \"minimum cost / time / effort to reach\", weighted edges, \"cheapest\", \"network delay\", \"at most K stops\".",
            "Look at the weights first - they decide the algorithm (see last learn item). State the choice and the reason out loud.",
            "Minimise the maximum edge on a path (min effort, swim in water) → Dijkstra with <code>max</code> instead of <code>+</code>, or binary search + BFS, or Kruskal/DSU.",
            "Maximise product of probabilities → Dijkstra with a max-heap (all factors ≤ 1, so it is monotone).",
            "K stops: plain Dijkstra on dist is wrong (a cheaper path with more stops blocks a valid one). Use Bellman-Ford with K+1 rounds or Dijkstra over (node, stops).",
            "Multi-source / via-node problems: run Dijkstra from sources and on the <b>reversed</b> graph from the target, then combine (<code>d1[x] + d2[x] + d3[x]</code>).",
            "Count shortest paths: when <code>nd == dist[v]</code> add ways; when <code>nd &lt; dist[v]</code> reset ways. Use modulo.",
            "Grid with cost 0 for some moves and 1 for others → 0-1 BFS beats Dijkstra."
          ],
          cases: [
            "<b>Dijkstra with negative weights</b> gives wrong answers - a finalised node can later be improved.",
            "Skipping stale heap entries (<code>if d &gt; dist[u]: continue</code>) is required for correct complexity.",
            "Unreachable nodes: dist stays <code>inf</code>; Network Delay must return -1 if any node is unreachable.",
            "Bellman-Ford for K stops: relax from a <b>copy</b> of the previous round, otherwise a single round can chain multiple edges.",
            "Integer overflow / large sums in counting problems - use modulo 10^9+7 (Python is safe, Java/C++ need long).",
            "Floyd-Warshall loop order: <code>k</code> must be the outermost loop.",
            "Parallel edges: keep the minimum; self-loops with non-negative weight are harmless.",
            "Negative cycle reachable from source but not on the path to target - CSES High Score requires checking reachability to n."
          ],
          qa: [
            { q: "Why does Dijkstra fail with negative edges?", a: "It finalises a node when popped, assuming no later path can be shorter because all remaining additions are ≥ 0. A negative edge discovered later can reduce an already finalised distance." },
            { q: "When would you use Bellman-Ford over Dijkstra?", a: "When edges can be negative, when you need negative-cycle detection, or when the number of edges in the path is bounded (K stops). Cost O(V·E) vs O(E log V)." },
            { q: "How does 0-1 BFS work and why is it O(V + E)?", a: "A deque keeps nodes in non-decreasing distance: a 0-weight neighbour has the same distance so goes to the front, a 1-weight neighbour goes to the back. Each node/edge is processed a constant number of times - no heap log factor." },
            { q: "Complexity of Dijkstra with a binary heap vs Fibonacci heap?", a: "Binary heap with lazy deletion: O((V + E) log V). Fibonacci heap: O(E + V log V) thanks to O(1) decrease-key - theoretical, rarely used in practice." }
          ],
          code: `import heapq
from collections import deque

def dijkstra(n, g, src):                     # g[u] = [(v, w)], w >= 0
    dist = [float('inf')] * n; dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue             # stale entry
        for v, w in g[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd; heapq.heappush(pq, (nd, v))
    return dist

def zero_one_bfs(n, g, src):                 # weights are 0 or 1
    dist = [float('inf')] * n; dist[src] = 0
    dq = deque([src])
    while dq:
        u = dq.popleft()
        for v, w in g[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                (dq.appendleft if w == 0 else dq.append)(v)
    return dist

def bellman_ford_k(n, edges, src, dst, k):   # at most k stops
    dist = [float('inf')] * n; dist[src] = 0
    for _ in range(k + 1):
        nxt = dist[:]                        # relax from previous round only
        for u, v, w in edges:
            if dist[u] + w < nxt[v]: nxt[v] = dist[u] + w
        dist = nxt
    return -1 if dist[dst] == float('inf') else dist[dst]

def floyd_warshall(d):                       # d: n x n matrix, inf if no edge
    n = len(d)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if d[i][k] + d[k][j] < d[i][j]: d[i][j] = d[i][k] + d[k][j]
    return d`
        },
        {
          id: 'union-find',
          title: 'Union-find / DSU',
          est: '2–3 days',
          why: "Short to code, very powerful for dynamic connectivity, grouping and offline queries. Accounts Merge and Redundant Connection are frequent at Google, Amazon, Microsoft.",
          learn: [
            "Operations: <code>find(x)</code> returns set representative, <code>union(a, b)</code> merges sets.",
            "Path compression (point nodes directly at root) and union by rank / size.",
            "Amortised complexity O(α(n)) - effectively constant - only with both optimisations.",
            "Track component count (decrement on each successful union) and component size.",
            "Cycle detection in undirected graphs: union returns False when endpoints already share a root.",
            "Mapping non-integer keys (emails, coordinates) to ids with a dict, or using a dict-based parent.",
            "Online grid connectivity: Number of Islands II - add land cells one by one and union with neighbours.",
            "Offline queries: sort edges and queries by weight/limit, union while processing (edge-length-limited paths, good paths).",
            "Limitations: DSU cannot split sets (no delete); reverse time to turn deletions into additions."
          ],
          practice: [
            { t: 'Disjoint set (Union-Find)', p: 'GFG', d: 'E' },
            { t: 'Redundant Connection', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/redundant-connection/' },
            { t: 'Number of Operations to Make Network Connected', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/number-of-operations-to-make-network-connected/' },
            { t: 'Road Construction', p: 'CSES', d: 'M' },
            { t: 'Satisfiability of Equality Equations', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/satisfiability-of-equality-equations/' },
            { t: 'Accounts Merge', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/accounts-merge/' },
            { t: 'Most Stones Removed with Same Row or Column', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/' },
            { t: 'Longest Consecutive Sequence', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
            { t: 'Smallest String With Swaps', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/smallest-string-with-swaps/' },
            { t: 'Lexicographically Smallest Equivalent String', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/lexicographically-smallest-equivalent-string/' },
            { t: 'Regions Cut By Slashes', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/regions-cut-by-slashes/' },
            { t: 'Number Of Islands (online queries / Number of Islands II)', p: 'GFG', d: 'M' },
            { t: 'Redundant Connection II', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/redundant-connection-ii/' },
            { t: 'Making A Large Island', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/making-a-large-island/' },
            { t: 'Remove Max Number of Edges to Keep Graph Fully Traversable', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/' },
            { t: 'Checking Existence of Edge Length Limited Paths', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/' },
            { t: 'Number of Good Paths', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/number-of-good-paths/' }
          ],
          notes: [
            "<b>Signals:</b> \"groups\", \"same component\", \"merge accounts / friends / equations\", edges added over time, \"number of components after each operation\", \"which edge creates a cycle\".",
            "Prefer DSU over BFS/DFS when edges arrive incrementally (online) or when queries can be sorted offline by a threshold.",
            "Components remaining = n - successful unions. Extra edges = total edges - successful unions (network connected).",
            "Stones problem: union row <code>r</code> with column <code>~c</code> (or <code>c + 10001</code>) - answer = stones - components.",
            "Equations: process all <code>==</code> unions first, then check every <code>!=</code>.",
            "Grid DSU: id = <code>r * C + c</code>; Regions Cut By Slashes splits each cell into 4 triangles.",
            "Offline threshold queries: sort edges by weight and queries by limit; for each query union all edges below limit, then check <code>find(p) == find(q)</code>.",
            "Complexity: O((n + m) α(n)) time, O(n) space."
          ],
          cases: [
            "Forgetting to call <code>find</code> on both sides in union (linking non-roots corrupts the structure).",
            "Without union by rank, recursive <code>find</code> with path compression can still recurse O(n) deep on the first call - use iterative find in Python.",
            "Comparing <code>parent[a] == parent[b]</code> instead of <code>find(a) == find(b)</code>.",
            "Redundant Connection II (directed): handle node with two parents <i>and</i> cycle cases separately.",
            "Accounts merge: same name does not mean same person - union by shared email only; sort emails in output.",
            "Number of Islands II: adding the same land cell twice must not increment the count.",
            "1-indexed nodes → allocate n + 1 parents."
          ],
          qa: [
            { q: "What do path compression and union by rank each guarantee?", a: "Union by rank alone bounds tree height to O(log n). Path compression alone gives O(log n) amortised. Together they give O(α(n)) amortised per operation, where α is the inverse Ackermann function (≤ 4 for any practical n)." },
            { q: "DSU vs BFS/DFS for connected components?", a: "Static graph, one query: both O(V + E). DSU wins when edges are added dynamically, when you need many connectivity queries interleaved with additions, or for offline threshold queries. BFS/DFS wins when you need paths or distances." },
            { q: "How would you support deleting edges?", a: "Standard DSU cannot. Process operations in reverse so deletions become additions (offline), or use more advanced structures (DSU with rollback + divide and conquer over time, link-cut trees)." }
          ],
          code: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.count = n                       # number of components
    def find(self, x):                       # iterative + path compression
        root = x
        while self.parent[root] != root: root = self.parent[root]
        while self.parent[x] != root:
            self.parent[x], x = root, self.parent[x]
        return root
    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb: return False            # already connected => cycle edge
        if self.size[ra] < self.size[rb]: ra, rb = rb, ra
        self.parent[rb] = ra; self.size[ra] += self.size[rb]
        self.count -= 1
        return True

def accounts_merge(accounts):
    from collections import defaultdict
    owner, idx = {}, {}
    for name, *emails in accounts:
        for e in emails:
            owner[e] = name; idx.setdefault(e, len(idx))
    d = DSU(len(idx))
    for _, *emails in accounts:
        for e in emails[1:]: d.union(idx[emails[0]], idx[e])
    groups = defaultdict(list)
    for e, i in idx.items(): groups[d.find(i)].append(e)
    return [[owner[g[0]]] + sorted(g) for g in groups.values()]`
        },
        {
          id: 'mst',
          title: 'Minimum spanning tree',
          est: '1–2 days',
          why: "Less frequent than shortest paths but a standard follow-up (\"connect all points / cities at minimum cost\"). Knowing Kruskal vs Prim and the cut property is enough for most rounds.",
          learn: [
            "Definition: spanning tree of a connected, undirected, weighted graph with minimum total weight; has exactly V-1 edges.",
            "Cut property (lightest edge across any cut is in some MST) and cycle property (heaviest edge on a cycle is not needed).",
            "Kruskal: sort edges, add if it joins two different DSU components; O(E log E).",
            "Prim: grow from a node using a min-heap of crossing edges; O(E log V); O(V²) array version for dense/complete graphs.",
            "Which to choose: Kruskal for edge lists / sparse graphs; Prim (O(V²)) for complete graphs like \"connect all points\".",
            "MST is unique if all edge weights are distinct.",
            "Minimax path property: the MST path between u and v minimises the maximum edge (bottleneck path).",
            "Critical vs pseudo-critical edges: exclude-edge and force-edge re-runs of Kruskal."
          ],
          practice: [
            { t: 'Minimum Spanning Tree', p: 'GFG', d: 'M' },
            { t: 'Minimum Spanning Tree (Kruskal and Prim)', p: 'CN', d: 'M' },
            { t: 'Road Reparation', p: 'CSES', d: 'M' },
            { t: 'Min Cost to Connect All Points', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/min-cost-to-connect-all-points/' },
            { t: 'Path With Minimum Effort', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/path-with-minimum-effort/' },
            { t: 'Swim in Rising Water', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/swim-in-rising-water/' },
            { t: 'Remove Max Number of Edges to Keep Graph Fully Traversable', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/' },
            { t: 'Checking Existence of Edge Length Limited Paths', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/' },
            { t: 'Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/' },
            { t: 'Edges in MST', p: 'CF', d: 'H' }
          ],
          notes: [
            "<b>Signals:</b> \"connect all\", \"minimum total cost to link every city/point\", \"network of cables\", undirected and weighted.",
            "Not to confuse with shortest path: MST minimises the <i>sum over the tree</i>, not the distance between two particular nodes.",
            "Complete graph on points (Manhattan distances) → Prim O(V²) without building all edges is best.",
            "Bottleneck / minimise the maximum weight on a path → Kruskal until source and target connect (also solvable with Dijkstra-max or binary search).",
            "Graph may be disconnected → result is a minimum spanning <b>forest</b>; check edges used == V-1.",
            "Complexity: Kruskal O(E log E) (sort dominates); Prim heap O(E log V); Prim array O(V²)."
          ],
          cases: [
            "Disconnected graph: no MST exists - return -1 / \"IMPOSSIBLE\" (CSES Road Reparation).",
            "Prim with heap: skip popped nodes already in the tree (lazy version), or you double count.",
            "Self-loops are never in an MST; parallel edges - only the lightest matters.",
            "MST is for <b>undirected</b> graphs; directed version (arborescence) needs Chu-Liu/Edmonds.",
            "Negative weights are fine for MST (unlike Dijkstra).",
            "Equal weights → multiple MSTs; questions asking \"which edges are in all MSTs\" need careful tie handling."
          ],
          qa: [
            { q: "Kruskal vs Prim?", a: "Kruskal sorts edges and uses DSU - O(E log E), natural for edge lists and sparse graphs. Prim grows one tree with a heap - O(E log V), or O(V²) with an array which is optimal for dense/complete graphs." },
            { q: "Why is Kruskal greedy choice correct?", a: "Cut property: for any cut, the minimum-weight crossing edge belongs to some MST. When Kruskal adds the lightest edge joining two components, that edge is the lightest across the cut separating one component from the rest." },
            { q: "Is the shortest path tree from a source the same as the MST?", a: "No. Example: triangle with edges A-B 2, B-C 2, A-C 3. MST = {AB, BC} (weight 4), but the shortest path from A to C is the direct edge 3, so the SPT from A uses AC." }
          ],
          code: `import heapq

def kruskal(n, edges):                       # edges: (w, u, v)
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]; x = parent[x]
        return x
    total = used = 0
    for w, u, v in sorted(edges):
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv; total += w; used += 1
            if used == n - 1: break
    return total if used == n - 1 else -1   # -1 => disconnected

def prim_dense(points):                      # O(V^2), complete graph
    n = len(points)
    dist = [float('inf')] * n; dist[0] = 0
    in_tree = [False] * n; total = 0
    for _ in range(n):
        u = min((i for i in range(n) if not in_tree[i]), key=dist.__getitem__)
        in_tree[u] = True; total += dist[u]
        for v in range(n):
            if not in_tree[v]:
                d = abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1])
                if d < dist[v]: dist[v] = d
    return total`
        },
        {
          id: 'advanced-graphs',
          title: 'Advanced graphs',
          est: '4–5 days',
          why: "Separates strong candidates at Google / senior rounds: Critical Connections (bridges), Reconstruct Itinerary (Euler path) and bitmask BFS are asked often enough to be worth knowing cold.",
          learn: [
            "DFS discovery time <code>tin</code> and low-link <code>low</code> (lowest tin reachable using tree edges plus one back edge).",
            "Bridges: tree edge (u, v) is a bridge iff <code>low[v] &gt; tin[u]</code>.",
            "Articulation points: non-root u with child v where <code>low[v] ≥ tin[u]</code>; root iff it has ≥ 2 DFS children.",
            "Strongly connected components with Kosaraju: DFS finish order, transpose graph, DFS in reverse finish order.",
            "Tarjan SCC in a single DFS with a stack and on-stack flags; condensation graph is a DAG.",
            "Euler path/circuit conditions: undirected (0 or 2 odd-degree vertices), directed (in = out for all, or one start with out-in = 1 and one end with in-out = 1), plus connectivity.",
            "Hierholzer algorithm: DFS consuming edges, append node on backtrack, reverse at the end - O(E).",
            "Bitmask BFS state-space search: state = (node, mask of visited / keys collected); size V·2^k.",
            "BFS on puzzle states (serialise board as string / tuple) - sliding puzzle, open the lock.",
            "Multi-dimensional BFS states: (r, c, k eliminations left), (player, box) positions."
          ],
          practice: [
            { t: 'Articulation Point - I', p: 'GFG', d: 'H' },
            { t: 'Critical Connections in a Network', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/critical-connections-in-a-network/' },
            { t: 'Strongly Connected Components (Kosaraju’s Algo)', p: 'GFG', d: 'H' },
            { t: 'Flight Routes Check', p: 'CSES', d: 'M' },
            { t: 'Planets and Kingdoms', p: 'CSES', d: 'M' },
            { t: 'Minimum Number of Days to Disconnect Island', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island/' },
            { t: 'Reconstruct Itinerary', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/reconstruct-itinerary/' },
            { t: 'Mail Delivery', p: 'CSES', d: 'H' },
            { t: 'Valid Arrangement of Pairs', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/valid-arrangement-of-pairs/' },
            { t: 'Cracking the Safe', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/cracking-the-safe/' },
            { t: 'Sliding Puzzle', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/sliding-puzzle/' },
            { t: 'Bus Routes', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/bus-routes/' },
            { t: 'Shortest Path in a Grid with Obstacles Elimination', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/' },
            { t: 'Shortest Path Visiting All Nodes', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/shortest-path-visiting-all-nodes/' },
            { t: 'Shortest Path to Get All Keys', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/shortest-path-to-get-all-keys/' },
            { t: 'Minimum Moves to Move a Box to Their Target Location', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/minimum-moves-to-move-a-box-to-their-target-location/' }
          ],
          notes: [
            "<b>Bridges / articulation points signals:</b> \"critical connection\", \"single point of failure\", \"removing this edge/node disconnects\".",
            "<b>SCC signals:</b> \"mutually reachable\", \"can every city reach every other\", grouping in a directed graph, 2-SAT.",
            "<b>Euler path signals:</b> \"use every edge / ticket exactly once\", \"arrange pairs so end matches next start\", De Bruijn sequences (cracking the safe).",
            "<b>Bitmask BFS signals:</b> visit all nodes / collect all keys with n or k ≤ 12–16 → state (pos, mask), BFS since edges are unit weight.",
            "Bus Routes: BFS over routes (or bipartite stop-route graph), not over stops, to avoid O(stops²) edges.",
            "Reconstruct Itinerary: sort adjacency (min-heap or reverse-sorted list + pop) to get lexicographically smallest Euler path.",
            "Minimum days to disconnect island: answer is always 0, 1 or 2 - check connectivity, then try removing each land cell (or articulation points).",
            "Complexities: Tarjan / Kosaraju / Hierholzer O(V + E); bitmask BFS O(V · 2^k · deg)."
          ],
          cases: [
            "Bridges with <b>parallel edges</b>: skip the parent by edge id, not by parent node, or a doubled edge is wrongly reported as a bridge.",
            "Articulation root special case: root is an AP only with ≥ 2 DFS children.",
            "Recursive Tarjan on 10^5 nodes overflows the Python stack - raise recursion limit with threading stack size, or write iteratively.",
            "Disconnected graph: run the DFS from every unvisited vertex for bridges/AP/SCC.",
            "Euler path: check degree conditions <i>and</i> that all edges are in one connected component; pick the correct start node (out - in = 1).",
            "Hierholzer: append node after its edges are exhausted, then reverse; appending on entry gives wrong order.",
            "Bitmask BFS: visited must be over the full state (node, mask), not node alone; start state for visit-all-nodes is every node at once.",
            "Obstacles elimination: if k ≥ m + n - 2 answer is simply m + n - 2 (Manhattan) - early exit avoids huge state space."
          ],
          qa: [
            { q: "Explain low-link values and the bridge condition.", a: "<code>low[u]</code> = smallest discovery time reachable from u subtree using at most one back edge. If a child v cannot reach u or an ancestor (<code>low[v] &gt; tin[u]</code>), removing (u, v) disconnects v subtree → bridge." },
            { q: "Why does Kosaraju work?", a: "In the first DFS, the node with the largest finish time lies in a source SCC of the condensation DAG. In the transposed graph that SCC becomes a sink, so a DFS from it visits exactly that SCC. Repeating in decreasing finish order peels SCCs one by one." },
            { q: "When does a directed graph have an Euler circuit?", a: "Every vertex has in-degree = out-degree and all vertices with non-zero degree belong to a single strongly connected component." },
            { q: "Why BFS and not DFS for bitmask state-space search?", a: "All transitions cost 1 and we want the minimum number of moves - BFS returns the first time the goal state is reached, which is optimal. DFS would need to explore all paths." }
          ],
          code: `import sys
from collections import defaultdict, deque
sys.setrecursionlimit(1 << 20)

def bridges(n, edges):
    g = defaultdict(list)
    for i, (u, v) in enumerate(edges):
        g[u].append((v, i)); g[v].append((u, i))
    tin, low, t, res = [-1] * n, [0] * n, [0], []
    def dfs(u, pe):
        tin[u] = low[u] = t[0]; t[0] += 1
        for v, eid in g[u]:
            if eid == pe: continue                 # skip parent edge, not node
            if tin[v] == -1:
                dfs(v, eid); low[u] = min(low[u], low[v])
                if low[v] > tin[u]: res.append(edges[eid])
            else:
                low[u] = min(low[u], tin[v])
    for s in range(n):
        if tin[s] == -1: dfs(s, -1)
    return res

def kosaraju(n, g):
    seen, order = [False] * n, []
    def dfs1(u):
        seen[u] = True
        for v in g[u]:
            if not seen[v]: dfs1(v)
        order.append(u)
    for u in range(n):
        if not seen[u]: dfs1(u)
    rg = defaultdict(list)
    for u in range(n):
        for v in g[u]: rg[v].append(u)
    comp, c = [-1] * n, 0
    def dfs2(u):
        comp[u] = c
        for v in rg[u]:
            if comp[v] == -1: dfs2(v)
    for u in reversed(order):
        if comp[u] == -1: dfs2(u); c += 1
    return c, comp

def find_itinerary(tickets):                       # Hierholzer
    g = defaultdict(list)
    for a, b in sorted(tickets, reverse=True): g[a].append(b)
    path = []
    def visit(u):
        while g[u]: visit(g[u].pop())
        path.append(u)
    visit("JFK")
    return path[::-1]

def shortest_path_all_nodes(graph):                # bitmask BFS
    n = len(graph); full = (1 << n) - 1
    q = deque((i, 1 << i, 0) for i in range(n))
    seen = {(i, 1 << i) for i in range(n)}
    while q:
        u, mask, d = q.popleft()
        if mask == full: return d
        for v in graph[u]:
            st = (v, mask | (1 << v))
            if st not in seen: seen.add(st); q.append((v, st[1], d + 1))
    return 0`
        }
      ]
    }
  ]
});
