PREP.add({
  id: 'py',
  order: 100,
  group: 'AI / ML',
  title: 'Python for Engineers',
  short: 'Python',
  blurb: 'Language depth that AI/ML and backend interviews probe.',
  intro: [
    "AI/ML and GenAI engineer loops rarely have a pure 'Python round', but Python depth leaks into every round: the DSA round (idiomatic, correct complexity), the ML coding round (NumPy/pandas fluency), the system/LLD round (async services, concurrency, FastAPI) and the resume deep-dive ('how did you parallelise inference?').",
    "Typical probes: <b>mutability and references</b>, <b>mutable default args</b>, <b>closures and late binding</b>, <b>generators vs lists</b>, <b>decorators</b>, <b>context managers</b>, <b>GIL and threading vs multiprocessing vs asyncio</b>, <b>broadcasting</b> and <b>pandas groupby/merge</b>. Aim to explain the <i>why</i> (CPython internals) in one or two sentences, then write the code without hesitation.",
    "Plan: Beginner topics are a fast refresh (a few days). Spend most time on Intermediate decorators/memory model and Advanced concurrency + NumPy/pandas, because those are where interviewers separate seniors from juniors."
  ],
  resources: [
    { n: 'Fluent Python, 2nd ed. (Luciano Ramalho)', u: 'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/', d: 'The single best book on the Python data model, iterators, decorators, concurrency. Read chapters 1-3, 7-9, 17, 19-21.' },
    { n: 'Python official docs', u: 'https://docs.python.org/3/', d: 'Language reference, data model (3.3), itertools/functools/asyncio/concurrent.futures pages.' },
    { n: 'Python data model reference', u: 'https://docs.python.org/3/reference/datamodel.html', d: 'Dunder methods, descriptors, __slots__ - the source of truth.' },
    { n: 'Real Python', u: 'https://realpython.com/', d: 'Practical tutorials: decorators, asyncio, GIL, packaging, pytest.' },
    { n: 'Effective Python, 3rd ed. (Brett Slatkin)', u: 'https://effectivepython.com/', d: '125 focused items; great for idioms and gotchas interviewers love.' },
    { n: 'NumPy docs - broadcasting', u: 'https://numpy.org/doc/stable/user/basics.broadcasting.html', d: 'Exact broadcasting rules; also see the NumPy user guide.' },
    { n: 'pandas user guide', u: 'https://pandas.pydata.org/docs/user_guide/index.html', d: 'groupby, merge/join, reshaping, copy-on-write.' },
    { n: 'Python Tutor (visualiser)', u: 'https://pythontutor.com/', d: 'Step through code to SEE references, aliasing and closures. Perfect for memory-model questions.' },
    { n: 'HackerRank - Python domain', u: 'https://www.hackerrank.com/domains/python', d: 'Short drills covering built-ins, collections, itertools, decorators, NumPy.' },
    { n: 'LeetCode - 30 Days of Pandas', u: 'https://leetcode.com/studyplan/30-days-of-pandas/', d: 'Pandas problems with SQL-style questions; mirrors DS/ML screening rounds.' }
  ],
  levels: [
    {
      name: 'Beginner',
      desc: 'Core data model, functions and iteration - the idioms you must write without thinking.',
      topics: [
        {
          id: 'py-data-model',
          title: 'Data model & core types',
          est: '2-3 days',
          why: 'Complexity and mutability questions appear in almost every coding round ("what is the cost of x in list?", "why can a list not be a dict key?").',
          learn: [
            "Everything is an object with identity (<code>id</code>), type and value; variables are <b>names bound to objects</b>, not boxes.",
            "Mutable (<code>list, dict, set, bytearray</code>, user classes) vs immutable (<code>int, float, str, tuple, frozenset, bytes</code>). A tuple holding a list is immutable in shape but its contents can change.",
            "<b>list</b> = dynamic array of pointers: index O(1), append amortised O(1), insert/pop(0) O(n), <code>in</code> O(n). Use <code>collections.deque</code> for O(1) both ends.",
            "<b>dict</b> = open-addressing hash table, insertion-ordered since 3.7; get/set/del average O(1), worst O(n). Keys must be hashable (<code>__hash__</code> + <code>__eq__</code> consistent).",
            "<b>set</b> = hash table without values; membership O(1) average; set algebra (<code>| & - ^</code>) cost proportional to sizes.",
            "<b>str</b> is immutable Unicode; repeated <code>s += x</code> in a loop is O(n^2) in the worst case - use <code>''.join(parts)</code>. Know slicing, <code>split/strip/find</code>, f-strings.",
            "<code>collections</code>: <code>Counter, defaultdict, deque, OrderedDict (move_to_end), namedtuple</code>; <code>heapq</code> is a min-heap on a list.",
            "Dunder methods power built-ins: <code>__len__, __getitem__, __iter__, __contains__, __eq__, __hash__, __repr__</code> - the basis of 'Pythonic' classes.",
            "Integer caching (-5..256) and string interning are CPython implementation details - never rely on <code>is</code> for value comparison."
          ],
          practice: [
            { t: 'Collections.Counter()', p: 'HR', d: 'E', u: 'https://www.hackerrank.com/challenges/collections-counter/problem' },
            { t: 'DefaultDict Tutorial', p: 'HR', d: 'E', u: 'https://www.hackerrank.com/challenges/defaultdict-tutorial/problem' },
            { t: 'Collections.deque()', p: 'HR', d: 'E', u: 'https://www.hackerrank.com/challenges/py-collections-deque/problem' },
            { t: 'Design HashMap', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/design-hashmap/' },
            { t: 'LRU Cache (with OrderedDict, then dict + doubly linked list)', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/lru-cache/' },
            { t: 'Group Anagrams (tuple/sorted keys)', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/group-anagrams/' },
            { t: 'Implement a Vector2D class supporting +, *, ==, hash, repr, abs, iteration', p: 'BUILD', d: 'M' },
            { t: 'Time list.insert(0,x) vs deque.appendleft(x) for 1e5 items with timeit', p: 'BUILD', d: 'E' }
          ],
          notes: [
            "Hashable rule: if <code>a == b</code> then <code>hash(a) == hash(b)</code>. Defining <code>__eq__</code> without <code>__hash__</code> sets <code>__hash__ = None</code> (unhashable).",
            "Dict internals (3.6+): compact layout - a sparse index array plus a dense entries array, which is why ordering is preserved and memory is lower.",
            "List over-allocates (growth ~1.125x + constant) so appends are amortised O(1); <code>sys.getsizeof</code> shows the jumps.",
            "<code>sorted()</code> / <code>list.sort()</code> use Timsort: O(n log n), stable, O(n) on already-sorted data. <code>key=</code> is called once per element.",
            "Membership: <code>x in list</code> O(n), <code>x in set/dict</code> O(1) average. Converting a list to a set once before many lookups is the classic optimisation.",
            "<code>a * n</code> on a list of lists copies references: <code>[[0]*3]*3</code> creates 3 references to the SAME inner list. Use <code>[[0]*3 for _ in range(3)]</code>.",
            "Slicing creates a shallow copy (O(k)); <code>memoryview</code> / NumPy views avoid copies."
          ],
          cases: [
            "<code>grid = [[0]*n]*m</code> then <code>grid[0][0] = 1</code> changes every row - classic bug.",
            "Modifying a dict/set while iterating raises <code>RuntimeError</code>; iterate over <code>list(d)</code> or build a new dict.",
            "<code>0.1 + 0.2 != 0.3</code>: use <code>math.isclose</code> or <code>decimal.Decimal</code> for money.",
            "<code>True == 1</code> and <code>hash(True) == hash(1)</code>, so <code>{1: 'a', True: 'b'}</code> has ONE key.",
            "Tuple with a list inside is not hashable: <code>hash((1, [2]))</code> raises <code>TypeError</code>.",
            "Follow-up: 'Worst case of dict lookup?' - O(n) with many collisions (hash-flooding; CPython randomises str hashes via PYTHONHASHSEED)."
          ],
          qa: [
            { q: 'Why can a list not be a dict key but a tuple can?', a: "Dict keys must be hashable with a hash that never changes. Lists are mutable, so their hash would change after mutation and the key would be 'lost' in the table; list defines <code>__hash__ = None</code>. Tuples are immutable, so they are hashable <i>if all their elements are hashable</i>." },
            { q: 'How is a Python dict implemented and what are its complexities?', a: "An open-addressing hash table with a compact layout (sparse index + dense entries array, insertion ordered). Average O(1) get/set/delete, O(n) worst case due to collisions; resizes when about 2/3 full, so insert is amortised O(1)." },
            { q: 'list vs tuple vs set - when to use which?', a: "list: ordered, mutable sequence, duplicates allowed. tuple: immutable record / fixed-size, hashable, slightly smaller and faster to create. set: unordered unique items with O(1) membership and set algebra." },
            { q: 'Why is string concatenation in a loop slow?', a: "Strings are immutable, so each <code>+=</code> may allocate a new string and copy both parts, giving O(n^2) total. <code>''.join(list_of_parts)</code> computes the total size once and copies each part once: O(n). (CPython sometimes optimises in-place, but do not rely on it.)" }
          ],
          code: String.raw`from collections import Counter, defaultdict, deque, OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.od = OrderedDict()

    def get(self, key):
        if key not in self.od:
            return -1
        self.od.move_to_end(key)          # mark as most recent
        return self.od[key]

    def put(self, key, value):
        self.od[key] = value
        self.od.move_to_end(key)
        if len(self.od) > self.cap:
            self.od.popitem(last=False)   # evict least recent

# Pythonic class via dunders
class Vec:
    __slots__ = ('x', 'y')
    def __init__(self, x, y): self.x, self.y = x, y
    def __repr__(self): return f'Vec({self.x!r}, {self.y!r})'
    def __eq__(self, o): return isinstance(o, Vec) and (self.x, self.y) == (o.x, o.y)
    def __hash__(self): return hash((self.x, self.y))
    def __add__(self, o): return Vec(self.x + o.x, self.y + o.y)
    def __iter__(self): yield self.x; yield self.y
    def __abs__(self): return (self.x ** 2 + self.y ** 2) ** 0.5`
        },
        {
          id: 'py-functions',
          title: 'Functions, scope (LEGB) & closures',
          est: '2 days',
          why: 'Mutable default args and late-binding closures are the two most-asked Python gotchas; args/kwargs are needed for every decorator.',
          learn: [
            "Parameter kinds: positional-only (<code>/</code>), positional-or-keyword, <code>*args</code>, keyword-only (after <code>*</code>), <code>**kwargs</code>. Signature: <code>def f(a, /, b, *args, c, **kw)</code>.",
            "Arguments are passed by <b>object reference</b> ('call by sharing'): rebinding a parameter does not affect the caller, mutating it does.",
            "Default values are evaluated <b>once at def time</b> - hence the mutable default argument bug; use <code>None</code> sentinel.",
            "Scope resolution LEGB: Local, Enclosing, Global, Built-in. Assignment anywhere in a function makes the name local for the whole function (<code>UnboundLocalError</code>).",
            "<code>global</code> and <code>nonlocal</code> to rebind outer names; closures capture variables (cells), not values.",
            "Functions are first-class objects: attributes like <code>__name__, __doc__, __defaults__, __closure__</code>; <code>lambda</code> is just an anonymous single-expression function.",
            "Unpacking: <code>f(*seq, **mapping)</code>, extended unpacking <code>first, *rest = xs</code>, merging dicts <code>{**a, **b}</code> or <code>a | b</code> (3.9+).",
            "<code>functools.partial</code>, <code>operator.itemgetter/attrgetter</code> as cleaner alternatives to lambdas."
          ],
          practice: [
            { t: 'Python: Default Arguments (debug the mutable default)', p: 'HR', d: 'E', u: 'https://www.hackerrank.com/challenges/default-arguments/problem' },
            { t: 'Map and Lambda Function', p: 'HR', d: 'E', u: 'https://www.hackerrank.com/challenges/map-and-lambda-expression/problem' },
            { t: 'Write make_counter() using a closure + nonlocal; then the same with a class', p: 'BUILD', d: 'E' },
            { t: 'Fix: [lambda: i for i in range(3)] returns 2,2,2 - give two fixes', p: 'BUILD', d: 'E' },
            { t: 'Write a function enforcing keyword-only and positional-only args; call it every legal/illegal way', p: 'BUILD', d: 'E' },
            { t: 'Implement memoize(f) by hand using a closure dict, compare with functools.lru_cache', p: 'BUILD', d: 'M' }
          ],
          notes: [
            "Mutable default fix: <code>def f(x, acc=None): acc = [] if acc is None else acc</code>.",
            "Late binding: closures look up the variable when called, not when defined. Fix with a default arg <code>lambda i=i: i</code> or <code>functools.partial</code>.",
            "<code>x += 1</code> inside a function without <code>nonlocal/global</code> raises <code>UnboundLocalError</code>, because assignment makes <code>x</code> local.",
            "<code>f.__closure__[0].cell_contents</code> shows a captured variable - useful to explain closures concretely.",
            "Keyword-only args (<code>*, timeout</code>) are good API design for flags; positional-only (<code>/</code>) lets you rename params without breaking callers.",
            "Comprehensions have their own scope (the loop variable does not leak in Py3); class bodies do NOT create an enclosing scope for methods."
          ],
          cases: [
            "<code>def add(item, bucket=[])</code> - list persists between calls; interviewers expect you to spot and explain 'evaluated once at definition'.",
            "Same trap with <code>def f(ts=datetime.now())</code> - the timestamp is frozen at import time.",
            "Rebinding a list parameter (<code>xs = xs + [1]</code>) does not affect caller; <code>xs += [1]</code> or <code>xs.append(1)</code> DOES (in-place).",
            "Shadowing built-ins (<code>list = [...]</code>, <code>id = 5</code>) breaks later calls in the same scope.",
            "Follow-up: 'Is Python pass-by-value or pass-by-reference?' - neither; pass by object reference (assignment semantics)."
          ],
          qa: [
            { q: 'What is the mutable default argument problem?', a: "Default values are evaluated once when <code>def</code> executes and stored in <code>f.__defaults__</code>. A mutable default (list/dict) is shared across calls, so mutations accumulate. Use <code>None</code> as the default and create the object inside the function." },
            { q: 'What is a closure?', a: "A function object that remembers variables from its enclosing scope even after that scope has returned. The captured variables live in cell objects (<code>__closure__</code>). Used for factories, decorators and callbacks; use <code>nonlocal</code> to rebind them." },
            { q: 'Explain *args and **kwargs.', a: "<code>*args</code> collects extra positional arguments into a tuple, <code>**kwargs</code> collects extra keyword arguments into a dict. At call sites <code>*</code>/<code>**</code> unpack sequences/mappings. They let wrappers (decorators) forward any signature." },
            { q: 'Why does [lambda: i for i in range(3)] give 2, 2, 2?', a: "Each lambda closes over the same variable <code>i</code> and reads it when called, by which time the loop finished with <code>i = 2</code>. Bind at definition: <code>lambda i=i: i</code>." }
          ],
          code: String.raw`def make_counter(start=0):
    count = start
    def inc(step=1):
        nonlocal count
        count += step
        return count
    return inc

c = make_counter()
c(); c()          # 1, 2
print(c.__closure__[0].cell_contents)   # 2

# mutable default fix
def append_to(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket

# full signature
def api(a, b, /, c, *args, timeout=5, **extra):
    return a, b, c, args, timeout, extra`
        },
        {
          id: 'py-iter',
          title: 'Comprehensions, iterators, generators, itertools & functools',
          est: '2-3 days',
          why: 'Generators are the idiomatic answer to "process a 50 GB file / stream tokens"; itertools/functools make DSA solutions concise.',
          learn: [
            "List / dict / set comprehensions and generator expressions; nested comprehension order matches nested for loops.",
            "Iterable (has <code>__iter__</code>) vs iterator (has <code>__iter__</code> + <code>__next__</code>, single pass, raises <code>StopIteration</code>).",
            "Generators: <code>yield</code> makes a function lazy; state is frozen between calls. Memory O(1) vs list O(n).",
            "<code>yield from</code> delegation; <code>send()</code>, <code>close()</code> and generator-based pipelines.",
            "<code>itertools</code>: <code>count, cycle, repeat, chain, islice, groupby (needs sorted input), accumulate, product, permutations, combinations, pairwise (3.10), batched (3.12), zip_longest, tee</code>.",
            "<code>functools</code>: <code>lru_cache / cache, partial, reduce, wraps, total_ordering, cached_property, singledispatch</code>.",
            "Built-ins that consume iterators lazily: <code>zip, map, filter, enumerate, reversed, any, all, sum, min/max(key=)</code>.",
            "Writing a custom iterator class vs a generator function - and when to use each."
          ],
          practice: [
            { t: 'itertools.product()', p: 'HR', d: 'E', u: 'https://www.hackerrank.com/challenges/itertools-product/problem' },
            { t: 'itertools.combinations()', p: 'HR', d: 'E', u: 'https://www.hackerrank.com/challenges/itertools-combinations/problem' },
            { t: 'Compress the String! (itertools.groupby)', p: 'HR', d: 'M', u: 'https://www.hackerrank.com/challenges/compress-the-string/problem' },
            { t: 'Iterables and Iterators', p: 'HR', d: 'M', u: 'https://www.hackerrank.com/challenges/iterables-and-iterators/problem' },
            { t: 'Reduce Function', p: 'HR', d: 'M', u: 'https://www.hackerrank.com/challenges/reduce-function/problem' },
            { t: 'Flatten Nested List Iterator (solve with a generator)', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/flatten-nested-list-iterator/' },
            { t: 'Peeking Iterator', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/peeking-iterator/' },
            { t: 'Generator pipeline: read a huge log file lazily, filter ERROR lines, parse, count by service', p: 'BUILD', d: 'M' },
            { t: 'Write batched(iterable, n) yourself (pre-3.12) and a sliding_window(iterable, k) with deque', p: 'BUILD', d: 'M' },
            { t: 'Write a chunked token-stream generator that yields text pieces like an LLM streaming API', p: 'BUILD', d: 'E' }
          ],
          notes: [
            "Generator expression <code>sum(x*x for x in data)</code> uses O(1) memory; list comprehension materialises everything first.",
            "An iterator is exhausted after one pass: <code>g = (x for x in xs); list(g); list(g)</code> gives [] the second time.",
            "<code>groupby</code> only groups <b>consecutive</b> equal keys - sort by the same key first.",
            "<code>lru_cache</code> requires hashable args; it holds strong references (memory leak risk on methods - cache keeps <code>self</code> alive).",
            "Comprehensions are usually faster than equivalent <code>for</code> + <code>append</code> (fewer attribute lookups, specialised bytecode); still, readability first.",
            "<code>yield</code> inside <code>try/finally</code> - finally runs on <code>close()</code> or garbage collection, which is how generator-based context managers clean up."
          ],
          cases: [
            "Passing a generator to two consumers - the second gets nothing; use <code>itertools.tee</code> or a list.",
            "<code>StopIteration</code> raised inside a generator becomes <code>RuntimeError</code> (PEP 479).",
            "Recursion + <code>lru_cache</code> on deep inputs can still hit the recursion limit (default 1000); <code>sys.setrecursionlimit</code> or go iterative.",
            "<code>max([])</code> raises <code>ValueError</code> - use <code>default=</code>.",
            "Follow-up: 'How would you process a file larger than RAM?' - iterate the file object line by line / in chunks with generators, or pandas <code>chunksize</code>, never <code>read()</code>."
          ],
          qa: [
            { q: 'Difference between an iterable, an iterator and a generator?', a: "Iterable: any object that returns an iterator from <code>iter()</code> (list, dict, file). Iterator: object with <code>__next__</code> that yields items once and raises <code>StopIteration</code>. Generator: a convenient iterator created by a function with <code>yield</code> (or a generator expression), with its execution state suspended between items." },
            { q: 'When would you use a generator instead of a list?', a: "When data is large/infinite or streamed, when you only need one pass, or to build lazy pipelines - memory is O(1) and the first result arrives immediately. Use a list when you need random access, len, or multiple passes." },
            { q: 'What does yield from do?', a: "Delegates to a sub-iterator: yields all its values, forwards <code>send()</code>/<code>throw()</code> and returns the sub-generator's return value. Simplifies recursive generators (e.g. tree traversal)." },
            { q: 'How does functools.lru_cache work?', a: "Wraps a function with a dict keyed by the (hashable) arguments, plus a doubly linked list for LRU eviction when <code>maxsize</code> is reached; <code>cache</code> is unbounded. Thread-safe for its own bookkeeping. Gives memoisation for DP in one line." }
          ],
          code: String.raw`from itertools import islice, groupby, accumulate, chain
from collections import deque

def read_errors(path):
    with open(path) as f:
        for line in f:                     # lazy, one line in memory
            if 'ERROR' in line:
                yield line.rstrip()

def batched(it, n):
    it = iter(it)
    while batch := list(islice(it, n)):
        yield batch

def sliding_window(it, k):
    it = iter(it)
    win = deque(islice(it, k), maxlen=k)
    if len(win) == k:
        yield tuple(win)
    for x in it:
        win.append(x)
        yield tuple(win)

def flatten(nested):
    for x in nested:
        if isinstance(x, list):
            yield from flatten(x)
        else:
            yield x

# run-length encoding with groupby
rle = [(k, len(list(g))) for k, g in groupby('aaabccdd')]
prefix = list(accumulate([3, 1, 4, 1, 5]))   # [3, 4, 8, 9, 14]`
        }
      ]
    },
    {
      name: 'Intermediate',
      desc: 'Decorators, context managers, exceptions, typing and the memory model - the senior-level Python questions.',
      topics: [
        {
          id: 'py-decorators',
          title: 'Decorators (incl. with arguments & functools.wraps)',
          est: '2 days',
          why: 'Writing a decorator live (timer, retry, cache, rate-limit) is one of the most common Python interview tasks for backend/ML engineers.',
          learn: [
            "A decorator is a callable taking a function and returning a replacement: <code>@d def f</code> is <code>f = d(f)</code>.",
            "Wrapper pattern with <code>*args, **kwargs</code> forwarding and returning the result.",
            "<code>functools.wraps</code> copies <code>__name__, __doc__, __module__, __qualname__, __wrapped__</code> - needed for debugging, docs, pytest, FastAPI signature inspection.",
            "Decorators with arguments = decorator factory: three levels <code>def retry(n): def deco(f): def wrapper(...)</code>.",
            "Stacking order: <code>@a @b def f</code> is <code>a(b(f))</code> - b is applied first, a runs outermost.",
            "Class-based decorators (<code>__call__</code>) for stateful decorators; decorating classes (e.g. <code>@dataclass</code>).",
            "Decorating methods: wrapper receives <code>self</code> in <code>args</code>; built-ins <code>@property, @staticmethod, @classmethod</code>.",
            "Async-aware decorators: wrapper must be <code>async def</code> and <code>await</code> the function if it is a coroutine function (<code>inspect.iscoroutinefunction</code>)."
          ],
          practice: [
            { t: 'Decorators 2 - Name Directory', p: 'HR', d: 'M', u: 'https://www.hackerrank.com/challenges/decorators-2-name-directory/problem' },
            { t: 'Standardize Mobile Number Using Decorators', p: 'HR', d: 'E', u: 'https://www.hackerrank.com/challenges/standardize-mobile-number-using-decorators/problem' },
            { t: 'Write a @timer decorator that logs function name and wall time', p: 'BUILD', d: 'E' },
            { t: 'Write a retry decorator with exponential backoff + jitter and an exceptions filter', p: 'BUILD', d: 'M' },
            { t: 'Write @rate_limit(calls, period) (token bucket) that is thread-safe', p: 'BUILD', d: 'H' },
            { t: 'Make the retry decorator work for both sync and async functions', p: 'BUILD', d: 'H' },
            { t: 'Write a @validate_types decorator using inspect.signature + type hints', p: 'BUILD', d: 'M' }
          ],
          notes: [
            "Decorator code runs at <b>import/definition time</b>; the wrapper runs at call time. Registration decorators (Flask/FastAPI routes) exploit this.",
            "Without <code>@wraps</code>, every decorated function is named 'wrapper', which breaks logging, pickling and frameworks that introspect signatures.",
            "Exponential backoff: <code>delay = base * 2**attempt</code>, cap it, add jitter <code>random.uniform(0, delay)</code> to avoid thundering herd - exactly what LLM API clients need for 429/5xx.",
            "Only retry <b>idempotent</b>, transient errors (timeouts, 429, 503) - not validation errors.",
            "<code>__wrapped__</code> lets you reach the original function (e.g. to test it without the cache)."
          ],
          cases: [
            "Forgetting to <code>return func(*args, **kwargs)</code> - decorated function silently returns None.",
            "Writing <code>@retry</code> when the decorator expects args (<code>@retry()</code>) or vice versa - support both by checking <code>callable(arg)</code>.",
            "Using <code>time.sleep</code> in a decorator applied to an async function blocks the whole event loop - use <code>await asyncio.sleep</code>.",
            "Shared mutable state in a decorator (e.g. call counter) is not thread-safe without a lock.",
            "Follow-up: 'How would you test a decorated function?' - test the wrapper behaviour with mocks and call <code>f.__wrapped__</code> for the core logic."
          ],
          qa: [
            { q: 'What is a decorator and why use functools.wraps?', a: "A higher-order callable that takes a function and returns a new one, adding behaviour (logging, caching, auth, retry) without changing the function body. <code>wraps</code> copies metadata (name, docstring, signature via <code>__wrapped__</code>) so introspection, debugging and frameworks still see the original function." },
            { q: 'How do you write a decorator that takes arguments?', a: "Add an outer factory: <code>def retry(times): def deco(fn): @wraps(fn) def wrapper(*a, **k): ... return wrapper; return deco</code>. <code>@retry(3)</code> first calls the factory, which returns the real decorator." },
            { q: 'In what order are stacked decorators applied?', a: "Bottom-up at definition (closest to the function first), so <code>@a @b def f</code> equals <code>f = a(b(f))</code>; at call time a's wrapper runs first (outermost)." }
          ],
          code: String.raw`import functools, random, time, asyncio, inspect

def retry(times=3, base=0.5, cap=10.0, exceptions=(Exception,)):
    def deco(fn):
        if inspect.iscoroutinefunction(fn):
            @functools.wraps(fn)
            async def awrapper(*args, **kwargs):
                for attempt in range(times):
                    try:
                        return await fn(*args, **kwargs)
                    except exceptions:
                        if attempt == times - 1:
                            raise
                        await asyncio.sleep(random.uniform(0, min(cap, base * 2 ** attempt)))
            return awrapper

        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return fn(*args, **kwargs)
                except exceptions:
                    if attempt == times - 1:
                        raise
                    time.sleep(random.uniform(0, min(cap, base * 2 ** attempt)))  # full jitter
        return wrapper
    return deco

def timer(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        try:
            return fn(*args, **kwargs)
        finally:
            print(f'{fn.__name__} took {time.perf_counter() - t0:.3f}s')
    return wrapper

@retry(times=5, exceptions=(TimeoutError, ConnectionError))
def call_llm(prompt): ...`
        },
        {
          id: 'py-context-exceptions',
          title: 'Context managers & exceptions',
          est: '1-2 days',
          why: 'Resource handling (files, DB sessions, GPU memory, locks) and error-handling design come up in LLD and code-review style rounds.',
          learn: [
            "<code>with</code> protocol: <code>__enter__</code> returns the resource, <code>__exit__(exc_type, exc, tb)</code> always runs; returning True suppresses the exception.",
            "<code>contextlib.contextmanager</code>: generator with a single <code>yield</code> inside <code>try/finally</code>.",
            "<code>contextlib</code> helpers: <code>suppress, closing, ExitStack, nullcontext, redirect_stdout</code>; async versions <code>asynccontextmanager, AsyncExitStack</code>.",
            "Exception hierarchy: <code>BaseException</code> > <code>Exception</code>; do not catch <code>BaseException</code> (KeyboardInterrupt, SystemExit).",
            "<code>try / except / else / finally</code> semantics: <code>else</code> runs only if no exception; <code>finally</code> always.",
            "Raising and chaining: <code>raise NewError(...) from e</code> (explicit cause), <code>raise</code> to re-raise preserving traceback.",
            "Custom exception classes for domain errors; EAFP (try/except) vs LBYL (check first) styles.",
            "<code>ExceptionGroup</code> and <code>except*</code> (3.11) - used with <code>asyncio.TaskGroup</code>."
          ],
          practice: [
            { t: 'Exceptions', p: 'HR', d: 'E', u: 'https://www.hackerrank.com/challenges/exceptions/problem' },
            { t: 'Write a Timer context manager both as a class and with @contextmanager', p: 'BUILD', d: 'E' },
            { t: 'Write a transaction() context manager that commits on success, rolls back on exception', p: 'BUILD', d: 'M' },
            { t: 'Use ExitStack to open a variable number of files safely', p: 'BUILD', d: 'M' },
            { t: 'Design an exception hierarchy for an LLM client (RateLimitError, TimeoutError, ContentFilterError) and map HTTP codes to it', p: 'BUILD', d: 'M' }
          ],
          notes: [
            "The <code>with</code> statement guarantees cleanup even on exceptions/returns - the Pythonic RAII.",
            "In <code>@contextmanager</code>, wrap <code>yield</code> in <code>try/finally</code> or cleanup will not run on errors.",
            "Catch the narrowest exception possible; a bare <code>except:</code> also swallows KeyboardInterrupt.",
            "<code>raise ... from None</code> hides the original context - use sparingly.",
            "Use <code>logger.exception(...)</code> inside except blocks to log the traceback."
          ],
          cases: [
            "<code>return</code> inside <code>finally</code> swallows the exception silently.",
            "<code>except Exception as e</code>: <code>e</code> is deleted at the end of the except block (avoids reference cycles) - referencing it afterwards raises NameError.",
            "Catching an exception and doing <code>raise e</code> works but <code>raise</code> alone is cleaner for re-raising.",
            "Using exceptions for normal control flow in hot loops is slower than a check when the exception is common.",
            "Follow-up: 'How do you ensure a GPU/DB resource is released if inference crashes?' - context manager / finally, plus timeouts."
          ],
          qa: [
            { q: 'How does a context manager work?', a: "<code>with cm as x</code> calls <code>cm.__enter__()</code> (result bound to x), runs the block, then always calls <code>cm.__exit__(type, value, tb)</code> - with None values if no exception. If <code>__exit__</code> returns truthy, the exception is suppressed. <code>@contextmanager</code> builds one from a generator: code before yield is enter, after yield is exit." },
            { q: 'What is the purpose of else in try/except?', a: "Code in <code>else</code> runs only when the try block raised nothing; it keeps the try block minimal so you do not accidentally catch exceptions from code you did not intend to protect." },
            { q: 'EAFP vs LBYL?', a: "EAFP (easier to ask forgiveness): try the operation and catch the exception - Pythonic, avoids race conditions (e.g. file deleted between check and open). LBYL (look before you leap): check conditions first - better when failure is common and exceptions would be expensive." }
          ],
          code: String.raw`import time
from contextlib import contextmanager

class Timer:
    def __enter__(self):
        self.t0 = time.perf_counter()
        return self
    def __exit__(self, exc_type, exc, tb):
        self.elapsed = time.perf_counter() - self.t0
        return False            # do not suppress exceptions

@contextmanager
def transaction(conn):
    cur = conn.cursor()
    try:
        yield cur
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        cur.close()

class LLMError(Exception): pass
class RateLimitError(LLMError): pass

try:
    ...
except KeyError as e:
    raise LLMError('bad response schema') from e`
        },
        {
          id: 'py-oop',
          title: 'OOP in Python (pointer - see the OOP / LLD tab)',
          est: '1 day',
          why: 'Python-specific OOP details (MRO, dunder methods, properties, ABCs) are asked even when the LLD round uses general OOP principles.',
          learn: [
            "Full OOP principles, SOLID and design patterns live in the <b>OOP / LLD</b> tab - here only Python-specific mechanics.",
            "Instance vs class attributes; mutable class attribute shared across instances.",
            "<code>@property</code> (getter/setter), <code>@classmethod</code> (alternative constructors), <code>@staticmethod</code>.",
            "Inheritance, <code>super()</code> and the <b>MRO</b> (C3 linearisation) for multiple inheritance / mixins: <code>Cls.__mro__</code>.",
            "Abstract base classes (<code>abc.ABC</code>, <code>@abstractmethod</code>) vs duck typing vs <code>typing.Protocol</code>.",
            "<code>__slots__</code> to save memory and block dynamic attributes; <code>__new__</code> vs <code>__init__</code> (singletons, immutable subclasses).",
            "Name mangling (<code>__x</code> becomes <code>_Cls__x</code>) - convention-based privacy, not real.",
            "Descriptors (<code>__get__/__set__</code>) power property, methods and ORMs; metaclasses exist but are rarely the right answer."
          ],
          practice: [
            { t: 'Classes: Dealing with Complex Numbers', p: 'HR', d: 'M', u: 'https://www.hackerrank.com/challenges/class-1-dealing-with-complex-numbers/problem' },
            { t: 'Build a plugin registry with a base class + __init_subclass__ auto-registration', p: 'BUILD', d: 'M' },
            { t: 'Model an abstract BaseLLM with OpenAI/HF subclasses and a Protocol-based alternative', p: 'BUILD', d: 'M' },
            { t: 'Diamond inheritance: predict MRO for class D(B, C) and verify', p: 'BUILD', d: 'E' }
          ],
          notes: [
            "<code>super()</code> follows the MRO, not 'the parent' - with cooperative multiple inheritance every class should call <code>super()</code>.",
            "Prefer composition over inheritance; prefer <code>Protocol</code> for structural typing across libraries.",
            "<code>__repr__</code> for developers (unambiguous), <code>__str__</code> for users; if only one, implement <code>__repr__</code>.",
            "<code>__init_subclass__</code> is the lightweight alternative to metaclasses for registries/validation.",
            "Use <code>@functools.cached_property</code> for expensive lazily computed attributes; <code>@property</code> recomputes on every access."
          ],
          cases: [
            "<code>class A: items = []</code> - every instance appends to the same list.",
            "Defining <code>__eq__</code> makes the class unhashable unless you also define <code>__hash__</code>.",
            "Calling an overridden method in <code>__init__</code> of a base class runs the subclass version before the subclass is fully initialised.",
            "Follow-up: 'Difference between classmethod and staticmethod?' - classmethod gets <code>cls</code> (factories that respect subclasses), staticmethod gets nothing."
          ],
          qa: [
            { q: 'What is the MRO?', a: "Method Resolution Order: the linearised list of classes Python searches for attributes, computed by C3 linearisation (children before parents, left-to-right order of bases preserved). See <code>Cls.__mro__</code>; <code>super()</code> moves to the next class in this order." },
            { q: '__new__ vs __init__?', a: "<code>__new__</code> is a static method that creates and returns the instance (used for immutable types like subclasses of int/str/tuple, singletons, caching). <code>__init__</code> initialises an already-created instance and returns None." },
            { q: 'ABC vs Protocol?', a: "ABC: nominal typing - classes must inherit and implement abstract methods, enforced at instantiation. Protocol: structural typing - any class with matching methods satisfies it for type checkers, no inheritance needed (optionally <code>@runtime_checkable</code>)." }
          ]
        },
        {
          id: 'py-typing',
          title: 'Typing, dataclasses & pydantic',
          est: '1-2 days',
          why: 'Modern AI codebases (FastAPI, LangChain, structured LLM outputs) are built on type hints and pydantic models; expected in take-homes.',
          learn: [
            "Type hints are not enforced at runtime; checked by mypy/pyright. Basics: <code>list[int], dict[str, float], tuple[int, ...], X | None</code> (3.10).",
            "<code>Optional, Union, Literal, Any, Callable[[int], str], TypeVar</code>, generics, <code>TypedDict</code>, <code>Protocol</code>, <code>Self</code>.",
            "<code>@dataclass</code>: auto <code>__init__, __repr__, __eq__</code>; options <code>frozen, slots, order, kw_only</code>; <code>field(default_factory=list)</code>.",
            "<code>NamedTuple</code> vs dataclass vs dict vs pydantic - trade-offs (immutability, validation, speed).",
            "Pydantic v2: <code>BaseModel</code>, runtime validation and coercion, <code>Field</code> constraints, <code>model_validate</code>, <code>model_dump</code>, <code>field_validator</code>, JSON schema generation.",
            "Pydantic for LLM structured output: the model's JSON schema guides the LLM; validation catches malformed responses; retry on <code>ValidationError</code>.",
            "<code>pydantic-settings</code> for config from env vars."
          ],
          practice: [
            { t: 'Convert a dict-heavy script to dataclasses and run mypy --strict until clean', p: 'BUILD', d: 'M' },
            { t: 'Define a pydantic model for an LLM extraction result (with enums, constraints) and validate 5 messy JSON outputs', p: 'BUILD', d: 'M' },
            { t: 'Write a generic TypeVar-based function first(xs: Sequence[T]) -> T | None', p: 'BUILD', d: 'E' },
            { t: 'Build a frozen, slotted dataclass and show it is hashable and blocks new attributes', p: 'BUILD', d: 'E' }
          ],
          notes: [
            "<code>field(default_factory=list)</code> is the dataclass fix for mutable defaults (a plain <code>= []</code> raises ValueError).",
            "dataclass = no validation, fast, stdlib; pydantic = validation/parsing at boundaries (APIs, config, LLM output).",
            "<code>frozen=True</code> makes instances immutable and hashable (if eq is true).",
            "Use <code>from __future__ import annotations</code> or string annotations for forward references.",
            "Pydantic v2 core is written in Rust (pydantic-core) - much faster than v1; API changed (<code>.dict()</code> became <code>model_dump()</code>)."
          ],
          cases: [
            "Assuming type hints validate input at runtime - they do not (unless pydantic/beartype).",
            "Mutable default in a dataclass field must use <code>default_factory</code>.",
            "Pydantic coerces by default ('1' becomes 1) - use strict mode when that matters.",
            "Follow-up: 'How do you get reliable JSON out of an LLM?' - schema from pydantic, structured outputs/function calling, validate, retry with the error message."
          ],
          qa: [
            { q: 'dataclass vs pydantic BaseModel?', a: "dataclass generates boilerplate (init, repr, eq) with no runtime validation - ideal for internal data. Pydantic validates and coerces types at runtime, serialises to/from JSON and generates JSON Schema - ideal at system boundaries (API requests, configs, LLM outputs)." },
            { q: 'Are type hints enforced at runtime?', a: "No. They are stored in <code>__annotations__</code> and used by static checkers, IDEs and libraries (pydantic, FastAPI) that choose to read them. CPython itself ignores them for execution." },
            { q: 'What is a Protocol?', a: "A typing construct for structural subtyping (static duck typing): a class conforms if it has the required methods/attributes, without inheriting. Great for decoupling, e.g. any object with <code>embed(texts) -> list[list[float]]</code> counts as an Embedder." }
          ],
          code: String.raw`from dataclasses import dataclass, field
from typing import Literal, Protocol
from pydantic import BaseModel, Field, ValidationError

@dataclass(frozen=True, slots=True)
class Chunk:
    doc_id: str
    text: str
    tags: tuple[str, ...] = ()

@dataclass
class Batch:
    items: list[Chunk] = field(default_factory=list)

class Ticket(BaseModel):
    category: Literal['billing', 'tech', 'other']
    priority: int = Field(ge=1, le=5)
    summary: str = Field(max_length=200)

class Embedder(Protocol):
    def embed(self, texts: list[str]) -> list[list[float]]: ...

raw = '{"category": "tech", "priority": "3", "summary": "GPU OOM"}'
try:
    t = Ticket.model_validate_json(raw)     # priority coerced to 3
except ValidationError as e:
    print(e.errors())                       # feed back to the LLM and retry
print(Ticket.model_json_schema())`
        },
        {
          id: 'py-memory',
          title: 'Memory model: references, GC, is vs ==, copy',
          est: '1-2 days',
          why: 'Aliasing bugs and "how does Python manage memory?" are standard questions; memory leaks in long-running inference services are real-world follow-ups.',
          learn: [
            "Names are references; assignment never copies. <code>b = a</code> makes two names for one object.",
            "<code>is</code> compares identity (same object), <code>==</code> compares value (<code>__eq__</code>). Use <code>is</code> only for singletons: <code>None, True, False</code>, sentinels.",
            "CPython memory management: <b>reference counting</b> (immediate free when count hits 0) + <b>cyclic garbage collector</b> (generational: gen 0/1/2) for reference cycles.",
            "<code>sys.getrefcount</code>, <code>gc.collect()</code>, <code>gc.get_objects</code>, <code>weakref</code> (references that do not keep objects alive - caches, observers).",
            "Shallow copy (<code>copy.copy</code>, <code>list(x)</code>, <code>x[:]</code>, <code>dict.copy()</code>) copies the container only; <code>copy.deepcopy</code> recursively copies (handles cycles via memo).",
            "pymalloc small-object allocator and arenas - why RSS may not shrink after freeing objects.",
            "Tools: <code>tracemalloc</code>, <code>memory_profiler</code>, <code>objgraph</code>; <code>sys.getsizeof</code> is shallow.",
            "<code>__del__</code> pitfalls; prefer context managers or <code>weakref.finalize</code>."
          ],
          practice: [
            { t: 'Predict outputs of 10 aliasing / copy / is-vs-== snippets, then verify in Python Tutor', p: 'BUILD', d: 'E', u: 'https://pythontutor.com/' },
            { t: 'Create a reference cycle, show refcount does not free it, free it with gc.collect()', p: 'BUILD', d: 'M' },
            { t: 'Find a memory leak with tracemalloc snapshots (e.g. a growing global cache)', p: 'BUILD', d: 'M' },
            { t: 'Implement a cache using weakref.WeakValueDictionary', p: 'BUILD', d: 'M' }
          ],
          notes: [
            "Refcounting gives deterministic cleanup in CPython (files closed when last reference dies) - but other implementations (PyPy) differ, so still use <code>with</code>.",
            "Cycles (e.g. parent <-> child, objects referencing themselves via closures/tracebacks) are only freed by the cyclic GC.",
            "<code>a is b</code> for small ints / interned strings may be True by accident (caching) - never rely on it.",
            "Deepcopy of objects holding locks, files or sockets fails or is meaningless; define <code>__deepcopy__</code> if needed.",
            "Common leaks in ML services: unbounded caches/dicts, keeping tensors in lists for logging, holding references to exceptions/tracebacks, lru_cache on methods."
          ],
          cases: [
            "<code>a = [1, 2]; b = a; b.append(3)</code> - <code>a</code> changes too.",
            "Shallow copy of nested lists: <code>c = a.copy(); c[0].append(9)</code> also mutates <code>a[0]</code>.",
            "<code>x = 1000; y = 1000; x is y</code> can be True or False depending on context (same code object constants) - interviewer wants 'implementation detail'.",
            "<code>if x == None</code> works but is wrong style and can be fooled by custom <code>__eq__</code> (NumPy arrays!) - use <code>is None</code>.",
            "Follow-up: 'Why does my Python process memory not go down after deleting a big list?' - allocator keeps arenas; freed memory is reused but not always returned to the OS."
          ],
          qa: [
            { q: 'How does Python manage memory?', a: "CPython uses reference counting: each object tracks how many references point to it and is freed immediately when the count hits zero. A generational cyclic garbage collector periodically finds and frees unreachable reference cycles. Small objects are allocated from pymalloc pools/arenas on a private heap." },
            { q: 'is vs ==?', a: "<code>==</code> calls <code>__eq__</code> and compares values; <code>is</code> checks whether both names refer to the very same object (same id). Use <code>is</code> for None and sentinels, <code>==</code> for everything else." },
            { q: 'Shallow vs deep copy?', a: "A shallow copy creates a new container whose elements are the same objects as the original (nested mutables are shared). A deep copy recursively copies everything, so the result shares no mutable state with the original; it is slower and uses a memo dict to handle cycles." },
            { q: 'What is a weak reference and when would you use it?', a: "A reference that does not increase the refcount, so the object can still be garbage-collected. Useful for caches, observer/callback registries and parent pointers to avoid keeping large objects alive or creating leaks." }
          ],
          code: String.raw`import copy, gc, sys, weakref

a = [[1, 2], [3, 4]]
s = copy.copy(a); d = copy.deepcopy(a)
a[0].append(99)
print(s[0], d[0])          # [1, 2, 99] [1, 2]

class Node:
    def __init__(self): self.other = None
x, y = Node(), Node()
x.other, y.other = y, x    # reference cycle
del x, y
print(gc.collect())        # cyclic GC frees them

cache = weakref.WeakValueDictionary()

import tracemalloc
tracemalloc.start()
snap1 = tracemalloc.take_snapshot()
# ... run workload ...
snap2 = tracemalloc.take_snapshot()
for stat in snap2.compare_to(snap1, 'lineno')[:5]:
    print(stat)`
        }
      ]
    },
    {
      name: 'Advanced',
      desc: 'Concurrency, asyncio, performance, NumPy/pandas fluency and production tooling - what GenAI / ML platform roles actually probe.',
      topics: [
        {
          id: 'py-concurrency',
          title: 'Concurrency: GIL, threading vs multiprocessing vs asyncio',
          est: '3-4 days',
          why: 'The #1 advanced Python question: "How would you speed up calling an LLM API 10,000 times / preprocessing 1M images?" The answer depends on I/O-bound vs CPU-bound.',
          learn: [
            "The <b>GIL</b>: in standard CPython only one thread executes Python bytecode at a time; it is released during blocking I/O and by many C extensions (NumPy, PyTorch ops).",
            "<b>I/O-bound</b> work (HTTP, DB, disk) - threads or asyncio give real speedups. <b>CPU-bound</b> pure-Python work - use multiprocessing (separate interpreters, no shared GIL) or vectorised/native code.",
            "<code>threading</code>: <code>Thread, Lock, RLock, Event, Condition, Semaphore, Queue</code>; race conditions still happen with the GIL (<code>x += 1</code> is not atomic).",
            "<code>multiprocessing</code>: <code>Process, Pool, Queue, shared_memory</code>; arguments/results are pickled; start methods fork/spawn/forkserver (spawn default on Windows/macOS).",
            "<code>concurrent.futures</code>: <code>ThreadPoolExecutor / ProcessPoolExecutor</code>, <code>submit</code>, <code>map</code>, <code>as_completed</code> - the simplest high-level API.",
            "asyncio: single-threaded cooperative concurrency for thousands of concurrent I/O tasks; see the asyncio topic.",
            "<b>Free-threaded Python (PEP 703)</b>: 3.13 ships an experimental no-GIL build (<code>python3.13t</code>); in 3.14 it became officially supported but still optional - the default build keeps the GIL. Single-thread performance overhead and C-extension compatibility are the trade-offs.",
            "Also know: subinterpreters (PEP 734, <code>concurrent.interpreters</code> in 3.14), and that PyTorch DataLoader uses worker processes for exactly the GIL reason.",
            "Classic sync problems: producer-consumer with <code>queue.Queue</code>, deadlock (lock ordering), starvation, thread-safe singletons."
          ],
          practice: [
            { t: 'Print in Order', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/print-in-order/' },
            { t: 'Print FooBar Alternately', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/print-foobar-alternately/' },
            { t: 'Print Zero Even Odd', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/print-zero-even-odd/' },
            { t: 'Building H2O', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/building-h2o/' },
            { t: 'Fizz Buzz Multithreaded', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/fizz-buzz-multithreaded/' },
            { t: 'The Dining Philosophers', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/the-dining-philosophers/' },
            { t: 'Web Crawler Multithreaded (premium)', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/web-crawler-multithreaded/' },
            { t: 'Benchmark: download 50 URLs sequentially vs ThreadPoolExecutor vs asyncio+httpx', p: 'BUILD', d: 'M' },
            { t: 'Benchmark: CPU-bound prime counting with threads vs ProcessPoolExecutor - explain results', p: 'BUILD', d: 'M' },
            { t: 'Thread-safe bounded producer-consumer with queue.Queue and poison-pill shutdown', p: 'BUILD', d: 'M' },
            { t: 'Try the free-threaded build (3.13t/3.14t) on the CPU benchmark and compare', p: 'BUILD', d: 'H' }
          ],
          notes: [
            "Decision rule: I/O-bound + many tasks -> asyncio (or threads if libraries are sync); I/O-bound + few tasks / sync libs -> ThreadPoolExecutor; CPU-bound Python -> ProcessPoolExecutor / vectorise / numba; CPU-bound in NumPy/PyTorch -> threads often fine since C code releases the GIL.",
            "Why the GIL exists: makes reference counting thread-safe cheaply and simplifies C extensions; cost is no parallel bytecode execution.",
            "Multiprocessing overhead: process start-up, pickling inputs/outputs (large arrays are expensive - use <code>shared_memory</code> or memory-mapped files), no shared state by default.",
            "On spawn platforms, guard entry code with <code>if __name__ == '__main__':</code> or child processes re-import and recurse.",
            "Thread-safety: the GIL makes single bytecodes atomic, not compound operations; <code>list.append</code> is safe, <code>counter += 1</code> is not.",
            "Amdahl's law: speedup bounded by the serial fraction; measure before parallelising."
          ],
          cases: [
            "Saying 'Python cannot do parallelism' - wrong: multiprocessing, C extensions releasing the GIL, and the free-threaded build all run in parallel.",
            "Using threads for CPU-bound pure-Python loops and expecting speedup - it gets slower due to contention.",
            "Passing lambdas or local functions to ProcessPoolExecutor fails - they are not picklable.",
            "Forgetting the <code>__main__</code> guard on Windows - infinite process spawning / RuntimeError.",
            "Deadlock: two locks acquired in different orders; fix with consistent ordering or timeouts.",
            "Follow-up: 'Your FastAPI endpoint calls a sync SDK and latency explodes under load - why?' - blocking call inside async def blocks the event loop; use a sync def endpoint (threadpool), <code>asyncio.to_thread</code>, or the async SDK."
          ],
          qa: [
            { q: 'What is the GIL and how does it affect performance?', a: "The Global Interpreter Lock is a mutex in CPython that lets only one thread execute Python bytecode at a time. CPU-bound pure-Python code gets no speedup from threads, but I/O-bound code does, because the GIL is released while waiting on I/O (and inside many C extensions). For CPU parallelism use multiprocessing, native/vectorised code, or the free-threaded build (optional since 3.13, officially supported in 3.14)." },
            { q: 'threading vs multiprocessing vs asyncio - when to use which?', a: "asyncio: very many concurrent I/O operations (API calls, websockets) with async-compatible libraries, lowest overhead per task. threading: I/O-bound work with blocking libraries, or C-extension work that releases the GIL; shared memory but needs locks. multiprocessing: CPU-bound Python work; true parallelism across cores at the cost of process start-up and pickling." },
            { q: 'How would you make 10,000 LLM API calls as fast as possible?', a: "It is I/O-bound: use asyncio with an async HTTP client (or the provider's async SDK), bound concurrency with an <code>asyncio.Semaphore</code> to respect rate limits, retry 429/5xx with exponential backoff + jitter, add timeouts, and stream results to disk as they complete (<code>as_completed</code>). Consider batch APIs if latency is not critical." },
            { q: 'Is x += 1 thread-safe in Python?', a: "No. It compiles to several bytecodes (load, add, store), and a thread switch can occur between them, losing updates. Protect it with a <code>threading.Lock</code> or use thread-safe structures like <code>queue.Queue</code>." }
          ],
          code: String.raw`from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor, as_completed
import threading, queue

def fetch(url): ...            # I/O-bound
def crunch(chunk): ...         # CPU-bound, top-level => picklable

if __name__ == '__main__':
    urls = [...]
    with ThreadPoolExecutor(max_workers=32) as ex:
        futs = {ex.submit(fetch, u): u for u in urls}
        for f in as_completed(futs):
            try:
                print(futs[f], f.result())
            except Exception as e:
                print('failed', futs[f], e)

    with ProcessPoolExecutor() as ex:          # defaults to os.cpu_count()
        results = list(ex.map(crunch, chunks, chunksize=16))

# producer-consumer
q = queue.Queue(maxsize=100)
STOP = object()
def worker():
    while (item := q.get()) is not STOP:
        ...                                    # process item
        q.task_done()
    q.task_done()

lock = threading.Lock()
counter = 0
def safe_inc():
    global counter
    with lock:
        counter += 1`
        },
        {
          id: 'py-asyncio',
          title: 'asyncio deep dive',
          est: '3 days',
          why: 'GenAI services are async end-to-end (FastAPI, streaming LLM responses, parallel tool calls, async vector DB clients). Expect to write an async fan-out with limits.',
          learn: [
            "Coroutines (<code>async def</code>), <code>await</code> suspends until the awaitable completes and yields control to the <b>event loop</b>.",
            "The event loop: single thread, runs ready callbacks, polls OS selectors (epoll/kqueue/IOCP) for I/O readiness. <code>asyncio.run(main())</code> creates and closes it.",
            "Tasks: <code>asyncio.create_task</code> schedules a coroutine concurrently; keep a reference or it may be garbage-collected.",
            "<code>asyncio.gather</code> (results in order, <code>return_exceptions=True</code>), <code>asyncio.TaskGroup</code> (3.11, structured concurrency, cancels siblings on failure), <code>as_completed</code>, <code>wait</code>.",
            "Timeouts and cancellation: <code>asyncio.timeout()</code> (3.11), <code>wait_for</code>, <code>CancelledError</code> must not be swallowed.",
            "Concurrency limits: <code>asyncio.Semaphore</code>, <code>asyncio.Queue</code> worker pools; async locks/events.",
            "Async generators (<code>async def ... yield</code>) and <code>async for</code> - token streaming; async context managers (<code>async with</code>).",
            "Bridging sync code: <code>asyncio.to_thread</code> / <code>loop.run_in_executor</code> for blocking calls; never call <code>time.sleep</code> or blocking requests in a coroutine.",
            "uvloop as a faster drop-in loop; debug mode (<code>PYTHONASYNCIODEBUG=1</code>) reports slow callbacks and never-awaited coroutines."
          ],
          practice: [
            { t: 'Async fan-out: call a mock LLM 1000 times with Semaphore(20), timeouts and retries; collect results in order', p: 'BUILD', d: 'M' },
            { t: 'Rewrite with TaskGroup and show sibling cancellation on the first failure', p: 'BUILD', d: 'M' },
            { t: 'Async worker pool with asyncio.Queue (N workers, graceful shutdown)', p: 'BUILD', d: 'M' },
            { t: 'Async generator that streams tokens and a consumer that prints them as they arrive', p: 'BUILD', d: 'E' },
            { t: 'Async rate limiter (token bucket) shared by all tasks', p: 'BUILD', d: 'H' },
            { t: 'Show the event loop freeze: time.sleep(2) in one task vs await asyncio.sleep(2)', p: 'BUILD', d: 'E' },
            { t: 'Async web crawler with bounded concurrency and a visited set (BFS)', p: 'BUILD', d: 'H' }
          ],
          notes: [
            "Concurrency, not parallelism: tasks interleave only at <code>await</code> points, so no data races between awaits - but any blocking call stalls ALL tasks.",
            "Calling a coroutine function without <code>await</code> just creates a coroutine object; nothing runs (warning: 'coroutine was never awaited').",
            "<code>gather</code> without <code>return_exceptions</code> propagates the first exception but does NOT cancel the other tasks; TaskGroup does cancel them.",
            "Sequential awaits in a loop (<code>for u in urls: await fetch(u)</code>) are serial - create tasks or gather to run concurrently.",
            "CPU-heavy code in a coroutine (tokenising 100 MB, JSON of huge payloads) blocks the loop - offload to a process pool.",
            "In FastAPI: <code>async def</code> endpoints run on the loop (must not block); plain <code>def</code> endpoints run in a threadpool."
          ],
          cases: [
            "Fire-and-forget <code>create_task</code> without storing the task - it can be garbage-collected mid-flight and exceptions are lost.",
            "Swallowing <code>CancelledError</code> in a broad <code>except Exception</code> (it is BaseException since 3.8, but <code>except BaseException</code>/bare except still catch it).",
            "Using <code>requests</code> inside async code - blocks the loop; use httpx/aiohttp.",
            "Calling <code>asyncio.run</code> inside an already-running loop (Jupyter) raises RuntimeError - just <code>await</code> in notebooks.",
            "Unbounded <code>gather</code> of 100k coroutines - memory spike and rate-limit bans; bound with Semaphore/queue.",
            "Follow-up: 'How does await actually work?' - coroutines are generator-like; await yields a future up to the loop, which resumes the coroutine when the future completes."
          ],
          qa: [
            { q: 'How does the asyncio event loop work?', a: "It is a single-threaded scheduler. Coroutines run until they hit an <code>await</code> on something not ready; they then yield control and the loop runs other ready tasks. The loop uses the OS selector to wait for I/O readiness and timers, then resumes the corresponding coroutines. Throughput comes from overlapping waiting, not from parallel CPU work." },
            { q: 'gather vs TaskGroup vs as_completed?', a: "<code>gather</code>: run awaitables concurrently, return results in input order; on error the first exception propagates (others keep running) unless <code>return_exceptions=True</code>. <code>TaskGroup</code>: structured concurrency - waits for all, cancels the rest on the first failure and raises an ExceptionGroup. <code>as_completed</code>: iterate results in completion order, good for streaming progress." },
            { q: 'How do you call blocking code from async code?', a: "Offload it with <code>await asyncio.to_thread(fn, *args)</code> (or <code>loop.run_in_executor</code>, with a ProcessPoolExecutor for CPU-bound work), so the event loop stays responsive. Better still, use an async-native library." },
            { q: 'How do you limit concurrency in asyncio?', a: "Wrap the call in <code>async with semaphore:</code> where <code>semaphore = asyncio.Semaphore(N)</code>, or run N worker tasks consuming an <code>asyncio.Queue</code>. Combine with timeouts and backoff for rate-limited APIs." }
          ],
          code: String.raw`import asyncio, random

async def call_llm(prompt: str) -> str:
    await asyncio.sleep(random.random())       # stand-in for an HTTP call
    return prompt.upper()

async def bounded(sem, prompt, retries=3):
    async with sem:
        for attempt in range(retries):
            try:
                async with asyncio.timeout(10):
                    return await call_llm(prompt)
            except (TimeoutError, ConnectionError):
                if attempt == retries - 1:
                    raise
                await asyncio.sleep(2 ** attempt + random.random())

async def main(prompts):
    sem = asyncio.Semaphore(20)
    async with asyncio.TaskGroup() as tg:
        tasks = [tg.create_task(bounded(sem, p)) for p in prompts]
    return [t.result() for t in tasks]           # input order

async def stream_tokens(text):
    for tok in text.split():
        await asyncio.sleep(0.05)
        yield tok

async def consume():
    async for tok in stream_tokens('hello from the model'):
        print(tok, end=' ', flush=True)

results = asyncio.run(main([f'q{i}' for i in range(100)]))`
        },
        {
          id: 'py-perf',
          title: 'Performance: profiling, vectorisation, numba / cython',
          est: '2 days',
          why: '"This preprocessing job takes 6 hours - how do you speed it up?" Interviewers want measure-first thinking, then the right tool.',
          learn: [
            "Measure first: <code>timeit</code> for micro-benchmarks, <code>cProfile</code> + <code>pstats</code>/snakeviz for function-level hot spots, <code>line_profiler</code> (<code>@profile</code>, <code>kernprof -l</code>) for line-level, <code>py-spy</code> for sampling running processes without code changes.",
            "Memory profiling: <code>tracemalloc</code>, <code>memory_profiler</code>, scalene (CPU + memory + GPU).",
            "Algorithmic wins first (O(n^2) to O(n log n), set lookups, caching), then avoiding Python-level loops.",
            "Vectorisation with NumPy: push loops into C; typical 10-100x speedups. Avoid <code>np.vectorize</code> (it is a loop in disguise).",
            "Micro-optimisations: local variable binding, built-ins (<code>sum, map, sorted</code>), comprehensions, avoiding repeated attribute lookups, <code>str.join</code>.",
            "<b>numba</b> <code>@njit</code>: JIT-compiles numeric Python + NumPy loops to machine code; <code>parallel=True</code> + <code>prange</code>; first call pays compile time.",
            "<b>Cython</b>: compile typed Python-like code to C extensions; good for wrapping C/C++ libs. Also know PyO3/Rust (pydantic-core, tokenizers, polars).",
            "Data-tool choices: polars / DuckDB / PyArrow for large tabular data; batching for GPU inference."
          ],
          practice: [
            { t: 'Profile a slow script with cProfile, sort by cumulative time, fix the top hotspot', p: 'BUILD', d: 'M' },
            { t: 'Pairwise Euclidean distances: Python loops vs NumPy broadcasting vs numba - benchmark', p: 'BUILD', d: 'M' },
            { t: 'Use line_profiler on a feature-engineering function and halve its runtime', p: 'BUILD', d: 'M' },
            { t: 'Rewrite a pandas apply(axis=1) pipeline with vectorised ops and measure', p: 'BUILD', d: 'M' },
            { t: 'Attach py-spy to a running process and read the flame graph', p: 'BUILD', d: 'E' }
          ],
          notes: [
            "Optimisation order: correct algorithm -> right data structure -> vectorise/batch -> parallelise -> compile (numba/cython) -> hardware.",
            "cProfile adds overhead and distorts very small functions; use it for where, then timeit for how much.",
            "numba works best on loops over NumPy arrays and scalars; it does not speed up pandas or arbitrary Python objects.",
            "Vectorised code may use more memory (temporaries); <code>out=</code> arguments, in-place ops or chunking help.",
            "<code>timeit</code> disables GC by default and repeats runs; report min/median, not a single run."
          ],
          cases: [
            "Optimising without profiling - often the bottleneck is I/O or one O(n^2) line.",
            "Benchmarking numba including the first (compile) call - warm up first.",
            "<code>np.vectorize</code> and <code>df.apply</code> are not real vectorisation.",
            "Micro-benchmarks on tiny inputs mislead; NumPy has per-call overhead and loses to plain Python for very small arrays.",
            "Follow-up: 'Your tokenisation step is CPU-bound in a FastAPI service - what do you do?' - batch, use the fast (Rust) tokenizer, move it to a process pool / separate worker, cache repeated inputs."
          ],
          qa: [
            { q: 'How do you find why a Python program is slow?', a: "Reproduce with realistic data, then profile: cProfile (function-level cumulative time) to find hotspots, line_profiler on the hot function, py-spy for production processes, tracemalloc if memory is the issue. Fix the biggest item, re-measure, repeat." },
            { q: 'Why is NumPy faster than Python loops?', a: "NumPy arrays store homogeneous typed data contiguously, and operations run in compiled C loops (often SIMD, sometimes multi-threaded BLAS) without per-element interpreter overhead, boxing or type checks. A Python loop does dynamic dispatch and object allocation for every element." },
            { q: 'numba vs cython?', a: "numba: JIT decorator, no build step, excellent for numeric loops over NumPy arrays, limited Python feature support. Cython: ahead-of-time compiled extension with static types, needs a build step, supports more of Python and easy C/C++ interop. Choose numba for quick numeric kernels, Cython for libraries and wrapping native code." }
          ],
          code: String.raw`import cProfile, pstats, numpy as np
from numba import njit, prange

def pairwise_loop(X):
    n = len(X)
    D = [[0.0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            D[i][j] = sum((a - b) ** 2 for a, b in zip(X[i], X[j])) ** 0.5
    return D

def pairwise_numpy(X):                       # (n,1,d) - (1,n,d) -> (n,n,d)
    sq = (X ** 2).sum(1)
    D2 = sq[:, None] + sq[None, :] - 2 * X @ X.T   # memory-friendly identity
    return np.sqrt(np.maximum(D2, 0))

@njit(parallel=True, cache=True)
def pairwise_numba(X):
    n, d = X.shape
    D = np.empty((n, n))
    for i in prange(n):
        for j in range(n):
            s = 0.0
            for k in range(d):
                t = X[i, k] - X[j, k]
                s += t * t
            D[i, j] = s ** 0.5
    return D

cProfile.run('pairwise_numpy(np.random.rand(2000, 64))', 'out.prof')
pstats.Stats('out.prof').sort_stats('cumulative').print_stats(10)`
        },
        {
          id: 'py-numpy-pandas',
          title: 'NumPy & pandas for interviews',
          est: '4-5 days',
          why: 'ML coding rounds ("implement X in NumPy") and DS screening (pandas/SQL-style questions on LeetCode/StrataScratch) depend on this fluency.',
          learn: [
            "NumPy arrays: <code>dtype, shape, ndim, strides</code>; views vs copies (slicing gives views, fancy/boolean indexing gives copies); <code>reshape, transpose, np.newaxis</code>.",
            "<b>Broadcasting rules</b>: align shapes from the right; dims are compatible if equal or one of them is 1; missing dims treated as 1.",
            "Vectorised ops & ufuncs, <code>axis</code> semantics in reductions (<code>sum(axis=0)</code> collapses rows), <code>keepdims=True</code>.",
            "Indexing: boolean masks, fancy indexing, <code>np.where, np.argsort, np.argpartition (top-k), np.unique(return_counts=True), np.bincount, np.cumsum</code>.",
            "Linear algebra: <code>@</code>/<code>matmul</code>, <code>einsum</code>, <code>np.linalg.norm/solve/inv/svd/eig</code>; numerical stability (log-sum-exp, softmax shift).",
            "pandas core: <code>Series/DataFrame</code>, <code>loc</code> (labels) vs <code>iloc</code> (positions), boolean filtering, <code>assign</code>, method chaining, dtypes (category, datetime, nullable Int64).",
            "<b>groupby</b> split-apply-combine: <code>agg</code> (named aggregation), <code>transform</code> (same shape - e.g. per-group normalisation), <code>filter</code>, <code>apply</code>; <code>rank</code>, <code>cumcount</code>, <code>shift</code> for lag features.",
            "<b>merge/join</b>: inner/left/right/outer, <code>on, left_on/right_on, suffixes, indicator=True, validate='one_to_one'</code>; <code>concat</code>; <code>pivot_table, melt, stack/unstack</code>.",
            "Time series in pandas: <code>to_datetime, resample, rolling, expanding, shift, dt accessor</code>.",
            "Pitfalls: <code>apply(axis=1)</code> slowness, SettingWithCopyWarning / chained assignment (copy-on-write default in pandas 3.0), NaN semantics in comparisons and groupby (<code>dropna=False</code>)."
          ],
          practice: [
            { t: 'Arrays (NumPy)', p: 'HR', d: 'E', u: 'https://www.hackerrank.com/challenges/np-arrays/problem' },
            { t: 'Shape and Reshape (NumPy)', p: 'HR', d: 'E', u: 'https://www.hackerrank.com/challenges/np-shape-reshape/problem' },
            { t: 'LeetCode 30 Days of Pandas (full study plan)', p: 'LC', d: 'M', u: 'https://leetcode.com/studyplan/30-days-of-pandas/' },
            { t: 'Reshape Data: Pivot', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/reshape-data-pivot/' },
            { t: 'Reshape Data: Melt', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/reshape-data-melt/' },
            { t: 'Drop Duplicate Rows', p: 'LC', d: 'E', u: 'https://leetcode.com/problems/drop-duplicate-rows/' },
            { t: 'Department Top Three Salaries (solve in pandas)', p: 'LC', d: 'H', u: 'https://leetcode.com/problems/department-top-three-salaries/' },
            { t: 'Rank Scores (pandas rank method=dense)', p: 'LC', d: 'M', u: 'https://leetcode.com/problems/rank-scores/' },
            { t: 'StrataScratch Python (pandas) interview questions - filter by company', p: 'SS', d: 'M', u: 'https://platform.stratascratch.com/coding' },
            { t: 'Deep-ML NumPy / linear algebra problems (matrix ops, reshape, broadcasting)', p: 'DML', d: 'E', u: 'https://www.deep-ml.com/' },
            { t: 'Implement softmax, log-softmax, one-hot, and cosine-similarity top-k in NumPy without loops', p: 'BUILD', d: 'M' },
            { t: 'Build lag/rolling features per user with groupby + shift + rolling on a sales dataset', p: 'BUILD', d: 'M' }
          ],
          notes: [
            "Broadcasting example: <code>(64, 1, 3) + (8, 3)</code> -> (64, 8, 3). <code>(3,) + (4,)</code> fails.",
            "Row-normalise: <code>X / X.sum(axis=1, keepdims=True)</code>; standardise columns: <code>(X - X.mean(0)) / X.std(0)</code>.",
            "Stable softmax: subtract max per row before <code>exp</code>; log-sum-exp: <code>m + log(sum(exp(x - m)))</code>.",
            "Top-k without full sort: <code>np.argpartition(-s, k)[:k]</code> then sort those k - O(n + k log k).",
            "<code>transform</code> returns a result aligned with the original rows; <code>agg</code> returns one row per group - pick by whether you need to join back.",
            "SQL to pandas mapping: WHERE = boolean mask, GROUP BY = groupby().agg, JOIN = merge, window functions = groupby().rank/shift/cumsum/transform, DISTINCT = drop_duplicates, ORDER BY = sort_values.",
            "Use <code>np.select</code> / <code>np.where</code> / <code>Series.map</code> instead of row-wise apply for conditional columns.",
            "Memory: downcast numerics, <code>category</code> dtype for low-cardinality strings, read with <code>usecols</code>/<code>dtype</code>/<code>chunksize</code>; switch to polars/DuckDB when data does not fit."
          ],
          cases: [
            "Shapes <code>(n,)</code> vs <code>(n,1)</code>: <code>y - y_hat</code> with shapes (n,) and (n,1) silently broadcasts to (n,n) - huge wrong loss. Check shapes!",
            "Modifying a slice view changes the original array; boolean-indexed results are copies, so assignment to them does not propagate.",
            "Integer overflow in NumPy int32/int64 is silent; mixing int arrays with float results can truncate on in-place ops (<code>a += 0.5</code> on int array raises/casts).",
            "<code>NaN != NaN</code>; <code>df[df.col == np.nan]</code> returns nothing - use <code>isna()</code>.",
            "Merge on keys with duplicates explodes rows (many-to-many); use <code>validate=</code> and check row counts.",
            "<code>groupby</code> drops NaN keys by default; <code>value_counts</code> drops NaN unless <code>dropna=False</code>.",
            "Chained assignment <code>df[df.a > 0]['b'] = 1</code> may not modify df - use <code>df.loc[mask, 'b'] = 1</code>.",
            "Follow-up: 'Why is apply slow and what do you use instead?' - Python function per row; use vectorised column ops, np.where/np.select, map, or groupby built-ins."
          ],
          qa: [
            { q: 'Explain NumPy broadcasting.', a: "A way to operate on arrays of different shapes without copying data. Shapes are compared from the trailing dimension backwards; two dims are compatible if equal or one is 1 (missing leading dims count as 1). Size-1 dims are virtually stretched. E.g. (n,d) minus (d,) subtracts a row vector from every row." },
            { q: 'View vs copy in NumPy?', a: "Basic slicing and reshape (when possible) return views sharing memory with the original - modifying them changes the source. Fancy indexing and boolean masks return copies. Check with <code>np.shares_memory(a, b)</code> or <code>b.base is a</code>." },
            { q: 'groupby agg vs transform vs apply?', a: "<code>agg</code> reduces each group to one row (sum, mean, named aggregations). <code>transform</code> returns a same-length result aligned to the original index (e.g. <code>x - group mean</code>, group-wise fill). <code>apply</code> is the flexible, slow fallback that calls Python per group and can return anything." },
            { q: 'How do you find the top 3 salaries per department in pandas?', a: "<code>df['r'] = df.groupby('dept')['salary'].rank(method='dense', ascending=False)</code> then filter <code>df[df.r <= 3]</code>. Dense rank handles ties like SQL DENSE_RANK; alternatively <code>sort_values</code> + <code>groupby().head(3)</code> if ties should not be shared." },
            { q: 'Why should you avoid df.apply(axis=1)?', a: "It calls a Python function once per row, constructing a Series each time - roughly as slow as a Python loop. Vectorised column arithmetic, <code>np.where/np.select</code>, <code>.map</code>, <code>.str</code>/<code>.dt</code> accessors and groupby built-ins run in C and are often 10-100x faster." }
          ],
          code: String.raw`import numpy as np, pandas as pd

def softmax(z, axis=-1):
    z = z - z.max(axis=axis, keepdims=True)    # stability
    e = np.exp(z)
    return e / e.sum(axis=axis, keepdims=True)

def one_hot(y, k):
    out = np.zeros((y.size, k)); out[np.arange(y.size), y] = 1
    return out

def cosine_topk(Q, D, k=5):                    # Q:(q,d) D:(n,d)
    Qn = Q / np.linalg.norm(Q, axis=1, keepdims=True)
    Dn = D / np.linalg.norm(D, axis=1, keepdims=True)
    S = Qn @ Dn.T                              # (q,n)
    idx = np.argpartition(-S, k, axis=1)[:, :k]
    order = np.argsort(-np.take_along_axis(S, idx, 1), axis=1)
    return np.take_along_axis(idx, order, 1)

# pandas idioms
df = pd.DataFrame({'dept': list('aabbb'), 'emp': list('vwxyz'),
                   'salary': [10, 20, 30, 30, 10]})
df['rnk'] = df.groupby('dept')['salary'].rank(method='dense', ascending=False)
top3 = df[df.rnk <= 3]
summary = df.groupby('dept').agg(n=('emp', 'count'), avg=('salary', 'mean'))
df['dept_share'] = df.salary / df.groupby('dept').salary.transform('sum')
df['band'] = np.select([df.salary >= 30, df.salary >= 20], ['high', 'mid'], 'low')
# lag features per user (sorted by time):
# df['prev'] = df.sort_values('ts').groupby('user')['amt'].shift(1)
# df['roll7'] = df.groupby('user')['amt'].transform(lambda s: s.rolling(7, 1).mean())`
        },
        {
          id: 'py-tooling',
          title: 'Packaging & tooling: venv/uv/poetry, pytest, logging, FastAPI',
          est: '2-3 days',
          why: 'Take-home assignments and "walk me through how you ship a model service" questions judge engineering hygiene: reproducible envs, tests, logs, a clean API.',
          learn: [
            "Virtual environments: <code>python -m venv .venv</code>; why global installs break; <code>pip freeze</code> vs lock files.",
            "<b>uv</b> (fast Rust-based installer + project manager: <code>uv init, uv add, uv sync, uv run, uv.lock</code>); poetry (<code>pyproject.toml</code> + <code>poetry.lock</code>); conda for CUDA/system deps.",
            "<code>pyproject.toml</code> as the single config (PEP 621): dependencies, build backend, tool configs (ruff, mypy, pytest).",
            "Code quality: ruff (lint + format), mypy/pyright, pre-commit hooks.",
            "<b>pytest</b>: plain asserts, fixtures (scope, yield fixtures for teardown), <code>parametrize</code>, <code>monkeypatch</code>, <code>tmp_path</code>, <code>pytest.raises</code>, mocking with <code>unittest.mock</code>, coverage; testing ML code (shapes, determinism with seeds, small golden datasets).",
            "<b>logging</b>: loggers per module (<code>logging.getLogger(__name__)</code>), levels, handlers/formatters, structured JSON logs, never <code>print</code> in services; lazy formatting <code>log.info('x=%s', x)</code>.",
            "<b>FastAPI</b>: path/query/body params, pydantic request/response models, dependency injection (<code>Depends</code>), async vs sync endpoints, <code>lifespan</code> for loading models once, background tasks, streaming responses (SSE for tokens), automatic OpenAPI docs; run with uvicorn (+ gunicorn workers).",
            "Config & secrets via env vars (pydantic-settings), Dockerising a Python service (slim image, layer caching, non-root)."
          ],
          practice: [
            { t: 'Create a project with uv: add numpy/fastapi, a lock file, ruff + mypy + pytest in pyproject.toml', p: 'BUILD', d: 'E' },
            { t: 'Write pytest tests with fixtures + parametrize + monkeypatch for an LLM client wrapper (mock the HTTP call)', p: 'BUILD', d: 'M' },
            { t: 'Configure structured JSON logging with request IDs for a FastAPI app', p: 'BUILD', d: 'M' },
            { t: 'FastAPI /predict endpoint: load a scikit-learn model in lifespan, pydantic I/O, health check, Dockerfile', p: 'BUILD', d: 'M' },
            { t: 'FastAPI streaming endpoint that streams LLM tokens with StreamingResponse (SSE)', p: 'BUILD', d: 'M' },
            { t: 'FastAPI official tutorial', p: 'DOC', d: 'E', u: 'https://fastapi.tiangolo.com/tutorial/' },
            { t: 'pytest getting started + fixtures docs', p: 'DOC', d: 'E', u: 'https://docs.pytest.org/en/stable/' },
            { t: 'uv documentation', p: 'DOC', d: 'E', u: 'https://docs.astral.sh/uv/' }
          ],
          notes: [
            "Reproducibility = pinned lock file + Python version + (for ML) CUDA/driver versions + random seeds + data version.",
            "Load models once at startup (lifespan), not per request; keep heavy CPU/GPU inference off the event loop (threadpool, separate worker, or a model server like Triton/vLLM).",
            "Fixture scopes: function (default), class, module, session - share expensive setup (a loaded model) with session scope.",
            "Mock at the boundary you own (your client wrapper), not deep inside third-party libraries.",
            "Logging config belongs in the application entry point, not in library modules (libraries only call <code>getLogger(__name__)</code>).",
            "FastAPI <code>async def</code> + blocking call = event-loop stall; plain <code>def</code> endpoints are run in a threadpool automatically."
          ],
          cases: [
            "Loading the model inside the request handler - seconds of latency per request and memory spikes.",
            "Using <code>print</code> for logs in production - no levels, no timestamps, lost in multiprocess servers.",
            "Tests that hit real external APIs - flaky and costly; mock them and keep a few marked integration tests.",
            "Unpinned dependencies - a transitive upgrade (e.g. numpy 2.x) breaks prod builds.",
            "Multiple uvicorn workers each load the model - memory multiplied; plan worker count with model size.",
            "Follow-up: 'How would you version and roll back a model service?' - image tags + model registry versions, canary/blue-green deploys, health and metric checks."
          ],
          qa: [
            { q: 'Why use virtual environments and lock files?', a: "Virtual environments isolate each project's dependencies from the system and from each other. Lock files (uv.lock, poetry.lock) pin exact versions of every transitive dependency, so builds are reproducible across machines and CI, and upgrades are deliberate." },
            { q: 'What is a pytest fixture?', a: "A function decorated with <code>@pytest.fixture</code> that provides setup (and teardown after a <code>yield</code>) to tests that request it by parameter name. Fixtures compose, have scopes (function to session) and replace setUp/tearDown boilerplate." },
            { q: 'How do you serve an ML model with FastAPI properly?', a: "Define pydantic request/response schemas, load the model once in the lifespan handler, keep inference off the event loop (sync def endpoint or run_in_executor; batching or a dedicated model server for GPUs), add health/readiness endpoints, structured logging, timeouts, input validation, and containerise with pinned dependencies; scale with multiple workers/replicas behind a load balancer." },
            { q: 'async def vs def endpoints in FastAPI?', a: "<code>async def</code> endpoints run directly on the event loop - great for awaiting async I/O, but any blocking call freezes all requests. Plain <code>def</code> endpoints are executed in a threadpool, so blocking libraries are safe there (limited by threadpool size)." }
          ],
          code: String.raw`# app.py
from contextlib import asynccontextmanager
import logging, joblib
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

log = logging.getLogger(__name__)
state = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    state['model'] = joblib.load('model.joblib')     # load once
    log.info('model loaded')
    yield
    state.clear()

app = FastAPI(lifespan=lifespan)

class Req(BaseModel):
    features: list[float]

class Resp(BaseModel):
    score: float

@app.post('/predict', response_model=Resp)
def predict(req: Req):                                # sync def -> threadpool
    return Resp(score=float(state['model'].predict_proba([req.features])[0, 1]))

@app.get('/stream')
async def stream():
    async def gen():
        for tok in ['hello', 'world']:
            yield f'data: {tok}\n\n'
    return StreamingResponse(gen(), media_type='text/event-stream')

# test_app.py
import pytest
@pytest.mark.parametrize('x, expected', [(1, 2), (2, 3)])
def test_inc(x, expected):
    assert x + 1 == expected

@pytest.fixture
def fake_llm(monkeypatch):
    monkeypatch.setattr('mypkg.client.call_llm', lambda p: 'ok')
    yield`
        }
      ]
    }
  ]
});
