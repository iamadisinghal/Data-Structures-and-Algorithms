/* Switch Prep - Low-Level Design & Machine Coding tab */
PREP.add({
  id: "lld",
  order: 60,
  group: "Design",
  title: "Low-Level Design (LLD) & Machine Coding",
  short: "LLD & machine coding",
  blurb: "Design patterns, then full object models you can code in 90 minutes.",
  intro: [
    "<b>LLD round (45-60 min)</b>: discuss requirements, draw a class diagram, define interfaces, explain patterns and concurrency, write key classes. <b>Machine coding round (90-120 min)</b>: you get a problem statement (often a mini Splitwise / parking lot / cab booking), write <b>working, runnable code</b> in your language, then demo and defend it. Common at Flipkart, Swiggy, Razorpay, PhonePe, Uber, Atlassian, Cred, Meesho, Zeta, Udaan and many Indian product companies.",
    "<b>What is graded</b>: (1) working code for the core flows - a demo via a <code>main</code>/driver or tests; (2) modularity and separation (models / services / repositories / strategies); (3) extensibility - can a new vehicle type, pricing rule or payment method be added without editing existing classes; (4) correct handling of edge cases and invalid input; (5) concurrency awareness where shared state exists; (6) readable naming. In-memory storage is expected - no DB or UI unless asked.",
    "<b>Approach (practise this order until it is automatic)</b>: clarify requirements and scope (5-10 min; write the list of must-have APIs) -> identify entities (nouns) and actions (verbs) -> relationships and multiplicities -> class diagram -> interfaces for variation points -> pick patterns (Strategy for rules, State for lifecycles, Observer for notifications, Factory for creation) -> code models, then services, then the driver -> demo the happy path, then edge cases -> discuss extensions and concurrency.",
    "<b>Time budget for 90 min</b>: 10 clarify + design, 60 code, 10 test/demo, 10 buffer. Get a vertical slice working end-to-end first, then widen. Commit to Python (or Java) and keep a personal skeleton (enums, exceptions, repository, service, driver) memorised."
  ],
  resources: [
    { n: "Refactoring Guru - Design Patterns", u: "https://refactoring.guru/design-patterns", d: "Every GoF pattern with intent, structure, pros/cons and code in Python/Java/C++." },
    { n: "Head First Design Patterns (2nd ed.)", u: "https://www.oreilly.com/library/view/head-first-design/9781492077992/", d: "Most approachable book for patterns and OO principles." },
    { n: "awesome-low-level-design (ashishps1)", u: "https://github.com/ashishps1/awesome-low-level-design", d: "Curated LLD problems with solutions in multiple languages plus pattern notes - the main practice bank." },
    { n: "Concept && Coding (Shrayansh Jain) - LLD playlist", u: "https://www.youtube.com/results?search_query=concept+and+coding+low+level+design", d: "Hindi/English walkthroughs of Indian-interview LLD problems (parking lot, elevator, BookMyShow, Splitwise)." },
    { n: "workat.tech - Machine coding practice", u: "https://workat.tech/machine-coding/practice", d: "Real machine-coding problem statements in the Flipkart/Swiggy style with evaluation criteria." },
    { n: "faif/python-patterns", u: "https://github.com/faif/python-patterns", d: "Idiomatic Python implementations of design patterns." },
    { n: "Python Patterns Guide (Brandon Rhodes)", u: "https://python-patterns.guide/", d: "Which GoF patterns matter in Python and which are replaced by language features." },
    { n: "Design Patterns (GoF) - Gamma, Helm, Johnson, Vlissides", u: "https://www.oreilly.com/library/view/design-patterns-elements/0201633612/", d: "The original catalogue - reference, not first read." },
    { n: "Java Concurrency in Practice", u: "https://jcip.net/", d: "Locks, thread safety and concurrent collections - the background for booking/locking questions." },
    { n: "LeetCode - Design problem list", u: "https://leetcode.com/tag/design/", d: "Small design data-structure problems (LRU, hit counter, parking system) for warm-up." }
  ],
  levels: [
    {
      name: "Level 1 · Design patterns",
      desc: "The GoF patterns that actually appear in LLD answers, plus the concurrency toolkit needed for booking, inventory and parking designs.",
      topics: [
        {
          id: "creational-patterns",
          title: "Creational: Singleton (thread-safe), Factory / Abstract Factory, Builder, Prototype",
          est: "2 days",
          why: "Factory and Singleton appear in nearly every LLD answer; 'make Singleton thread-safe' is a classic follow-up; Builder is the go-to for objects with many optional fields.",
          learn: [
            "<b>Singleton</b>: one instance + global access point. Implementations: eager, lazy, double-checked locking (needs <code>volatile</code> in Java), Bill Pugh holder class, enum singleton (Java, safest), Python module-level instance or <code>__new__</code> + lock.",
            "<b>Simple factory</b>: one function/class that returns a concrete subtype based on input (<code>VehicleFactory.create(type)</code>) - not a GoF pattern but the most used.",
            "<b>Factory Method</b>: superclass defines <code>create_x()</code>, subclasses decide which concrete product to instantiate (framework hooks).",
            "<b>Abstract Factory</b>: interface to create <b>families</b> of related objects (WindowsButton + WindowsCheckbox vs Mac*), ensuring compatibility.",
            "<b>Builder</b>: construct complex objects step by step with a fluent API; avoids telescoping constructors; final <code>build()</code> validates and returns an immutable object.",
            "<b>Prototype</b>: create new objects by cloning an existing configured instance (deep vs shallow copy matters); registry of prototypes.",
            "Python note: many creational patterns collapse into language features - first-class classes as factories, keyword args instead of builders, modules as singletons.",
            "Singleton downsides: global state, hidden dependencies, hard to test, concurrency hot spot - prefer DI with a single instance."
          ],
          practice: [
            { t: "Refactoring Guru - Singleton", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/singleton" },
            { t: "Refactoring Guru - Factory Method", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/factory-method" },
            { t: "Refactoring Guru - Abstract Factory", p: "RG", d: "M", u: "https://refactoring.guru/design-patterns/abstract-factory" },
            { t: "Refactoring Guru - Builder", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/builder" },
            { t: "Refactoring Guru - Prototype", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/prototype" },
            { t: "Implement a thread-safe lazy Singleton in Python and prove it with 50 threads", p: "BUILD", d: "M" },
            { t: "VehicleFactory + registry so new vehicle types register themselves (no if/else)", p: "BUILD", d: "E" },
            { t: "HttpRequest / LLMRequest builder with validation in build()", p: "BUILD", d: "E" }
          ],
          notes: [
            "Singleton: logger, config, connection pool, ID generator, ParkingLot instance in LLD answers. Java: <code>Runtime.getRuntime()</code>.",
            "Factory: <code>Calendar.getInstance()</code>, <code>NumberFormat.getInstance()</code>, JDBC <code>DriverManager.getConnection</code>; payment method / notification channel creation in LLD.",
            "Abstract Factory: UI toolkits per OS, cloud provider SDK families, <code>DocumentBuilderFactory</code>.",
            "Builder: <code>StringBuilder</code>, Lombok <code>@Builder</code>, <code>HttpRequest.newBuilder()</code> (Java 11), OkHttp, pizza/burger order customisation.",
            "Prototype: <code>Object.clone()</code>, spreadsheet copy cell format, game enemies spawned from template, copying a pre-configured LLM prompt template.",
            "Double-checked locking without <code>volatile</code> is broken in Java because of instruction reordering - partially constructed object can be visible.",
            "Enum singleton (Java) is safe against reflection and serialization attacks."
          ],
          cases: [
            "Misuse: Singleton as a global variable bag - hides dependencies and makes tests order-dependent.",
            "Misuse: Factory with a giant switch that must be edited for every new type - use a registry map.",
            "Misuse: Builder for a 2-field object - overkill; use a constructor / dataclass.",
            "Singleton broken by reflection, serialization (needs <code>readResolve</code>) or multiple class loaders.",
            "Prototype with shallow copy shares mutable nested state across clones.",
            "Python <code>__new__</code> singleton still re-runs <code>__init__</code> on every call."
          ],
          qa: [
            { q: "How do you make a Singleton thread-safe?", a: "Java: eager init, synchronized getInstance (slow), double-checked locking with a <code>volatile</code> field, the static holder idiom (lazy + thread-safe via class loading) or an enum. Python: module-level instance (imports are thread-safe), or a class-level <code>threading.Lock</code> around lazy creation with a double check." },
            { q: "Factory Method vs Abstract Factory?", a: "Factory Method is one method, overridden by subclasses, creating one product. Abstract Factory is an object with several factory methods creating a family of related products that must be used together; it is often implemented with factory methods." },
            { q: "Why Builder over a constructor with many parameters?", a: "Avoids telescoping constructors and argument-order bugs, makes optional fields readable, allows validation of the combination in build(), and produces immutable objects." }
          ],
          code: `import threading

class Config:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:            # fast path
            with cls._lock:
                if cls._instance is None:    # double check
                    inst = super().__new__(cls)
                    inst.settings = {}
                    cls._instance = inst
        return cls._instance

# Registry-based factory: new types register themselves (Open/Closed)
class VehicleFactory:
    _registry: dict[str, type] = {}

    @classmethod
    def register(cls, kind: str):
        def deco(klass):
            cls._registry[kind] = klass
            return klass
        return deco

    @classmethod
    def create(cls, kind: str, plate: str):
        try:
            return cls._registry[kind](plate)
        except KeyError:
            raise ValueError(f"unknown vehicle type {kind}")

@VehicleFactory.register("CAR")
class Car:
    def __init__(self, plate): self.plate = plate

class PizzaBuilder:
    def __init__(self, size): self._p = {"size": size, "toppings": []}
    def cheese(self): self._p["cheese"] = True; return self
    def topping(self, t): self._p["toppings"].append(t); return self
    def build(self):
        if self._p["size"] not in ("S", "M", "L"): raise ValueError("bad size")
        return dict(self._p)`
        },
        {
          id: "structural-patterns",
          title: "Structural: Adapter, Decorator, Facade, Proxy, Composite, Flyweight",
          est: "2 days",
          why: "Adapter (third-party integration), Decorator (add-ons, middleware) and Proxy (caching, access control) are frequent in LLD discussions; Composite is required for file systems and menus.",
          learn: [
            "<b>Adapter</b>: convert one interface into another clients expect - wrap a third-party payment SDK behind your <code>PaymentGateway</code> interface.",
            "<b>Decorator</b>: wrap an object implementing the same interface to add behaviour dynamically; stackable (Pizza + Cheese + Olives, logging/retry wrappers).",
            "<b>Facade</b>: one simple entry point over a complex subsystem (<code>OrderFacade.placeOrder()</code> calling inventory, payment, shipping).",
            "<b>Proxy</b>: same interface, controls access: virtual (lazy load), protection (auth), remote (RPC stub), caching, rate-limiting proxy.",
            "<b>Composite</b>: tree of objects where leaves and containers share an interface (File/Directory both have <code>size()</code>).",
            "<b>Flyweight</b>: share intrinsic immutable state across many objects to save memory (glyphs, chess piece types, tree models in a game); extrinsic state passed in.",
            "Also know: <b>Bridge</b> (separate abstraction from implementation hierarchy, e.g. Shape x Renderer) - occasionally asked.",
            "Decorator vs Proxy vs Adapter: decorator adds behaviour (same interface), proxy controls access (same interface), adapter changes interface."
          ],
          practice: [
            { t: "Refactoring Guru - Adapter", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/adapter" },
            { t: "Refactoring Guru - Decorator", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/decorator" },
            { t: "Refactoring Guru - Facade", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/facade" },
            { t: "Refactoring Guru - Proxy", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/proxy" },
            { t: "Refactoring Guru - Composite", p: "RG", d: "M", u: "https://refactoring.guru/design-patterns/composite" },
            { t: "Refactoring Guru - Flyweight", p: "RG", d: "M", u: "https://refactoring.guru/design-patterns/flyweight" },
            { t: "Coffee/pizza pricing with stackable decorators", p: "BUILD", d: "E" },
            { t: "Adapt two payment SDKs with different method names to one PaymentGateway interface", p: "BUILD", d: "E" },
            { t: "Caching proxy in front of a slow LLM client (same interface, TTL)", p: "BUILD", d: "M" }
          ],
          notes: [
            "Decorator: Java I/O - <code>new BufferedReader(new InputStreamReader(new FileInputStream(f)))</code>; Python function decorators; HTTP middleware chains.",
            "Adapter: <code>Arrays.asList</code>, <code>InputStreamReader</code> (bytes -> chars), wrapping legacy SOAP services; LangChain-style wrappers over different LLM vendors.",
            "Facade: SLF4J over logging backends, <code>javax.faces.context.FacesContext</code>, an SDK client hiding many REST calls.",
            "Proxy: Spring AOP / <code>@Transactional</code> proxies, Hibernate lazy-loading entities, <code>java.lang.reflect.Proxy</code>, API gateways.",
            "Composite: file system, org chart, UI component trees, menu with sub-menus, nested discount rules.",
            "Flyweight: <code>Integer.valueOf</code> cache (-128..127), Java String pool, text editor character formatting.",
            "Decorators compose at runtime; subclassing for every combination causes class explosion (2^n)."
          ],
          cases: [
            "Misuse: decorator chains so deep that debugging and ordering become unclear (retry outside or inside timeout matters).",
            "Misuse: Facade becoming a god object with all business logic.",
            "Adapter leaking vendor-specific exceptions - translate them to your domain errors too.",
            "Composite: operations that only make sense on leaves (write content) - either throw on composites or split interfaces (safety vs transparency).",
            "Flyweight with mutable shared state - bug; intrinsic state must be immutable."
          ],
          qa: [
            { q: "Decorator vs inheritance for adding features?", a: "Inheritance fixes features at compile time and needs a subclass per combination. Decorators wrap at runtime, can be stacked in any order and combined freely, keeping each concern in one small class (Open/Closed)." },
            { q: "Proxy vs Decorator - they look identical, what's the difference?", a: "Structurally the same (wrap + same interface). Intent differs: a proxy controls access to the real subject (lazy creation, auth, caching, remoting) and often manages its lifecycle; a decorator adds responsibilities and is composed by the client." },
            { q: "Where does Composite appear in LLD problems?", a: "In-memory file system (File/Directory), menu/category trees in food delivery, organisation hierarchies, and expression trees - any part-whole hierarchy where clients treat single and grouped objects uniformly." }
          ],
          code: `from abc import ABC, abstractmethod

class Beverage(ABC):
    @abstractmethod
    def cost(self) -> int: ...
    @abstractmethod
    def desc(self) -> str: ...

class Espresso(Beverage):
    def cost(self): return 120
    def desc(self): return "Espresso"

class AddOn(Beverage):                    # Decorator base
    def __init__(self, inner: Beverage): self.inner = inner

class Milk(AddOn):
    def cost(self): return self.inner.cost() + 30
    def desc(self): return self.inner.desc() + " + milk"

class Caramel(AddOn):
    def cost(self): return self.inner.cost() + 40
    def desc(self): return self.inner.desc() + " + caramel"

drink = Caramel(Milk(Espresso()))
print(drink.desc(), drink.cost())        # Espresso + milk + caramel 190

# Composite
class Node(ABC):
    @abstractmethod
    def size(self) -> int: ...

class File(Node):
    def __init__(self, n, s): self.name, self.s = n, s
    def size(self): return self.s

class Directory(Node):
    def __init__(self, n): self.name, self.children = n, []
    def add(self, node: Node): self.children.append(node); return self
    def size(self): return sum(c.size() for c in self.children)`
        },
        {
          id: "behavioral-patterns",
          title: "Behavioral: Strategy, Observer, Command, State, Chain of Responsibility, Template Method, Iterator, Visitor",
          est: "3 days",
          why: "Strategy, State and Observer are the backbone of almost every LLD answer (pricing, vending machine, notifications); Chain of Responsibility shows up in ATM/approval/logger designs.",
          learn: [
            "<b>Strategy</b>: family of interchangeable algorithms behind an interface, chosen at runtime (PricingStrategy, SpotAssignmentStrategy, SplitStrategy).",
            "<b>Observer</b>: subject keeps a list of subscribers and notifies them on change (order status -> SMS, email, push; stock price -> displays).",
            "<b>Command</b>: encapsulate a request as an object with <code>execute()</code>/<code>undo()</code> - queues, undo/redo, macro recording, transaction logs.",
            "<b>State</b>: object changes behaviour when its internal state changes; each state is a class handling events (VendingMachine Idle/HasMoney/Dispensing, Order lifecycle, Elevator).",
            "<b>Chain of Responsibility</b>: pass a request along handlers until one handles it (ATM cash dispenser 2000->500->100, approval workflows, logger levels, middleware).",
            "<b>Template Method</b>: base class defines algorithm skeleton, subclasses fill steps (data pipeline: read -> transform -> write; game turn loop).",
            "<b>Iterator</b>: sequential access without exposing internals (Python <code>__iter__</code>/generators, Java <code>Iterator</code>).",
            "<b>Visitor</b>: add operations to a stable class hierarchy without modifying it via double dispatch (AST traversals, tax calculation over item types).",
            "Also useful: <b>Mediator</b> (central coordinator - chat room, air traffic control), <b>Memento</b> (snapshot for undo).",
            "Strategy vs State: strategy is chosen by the client and rarely changes itself; states transition each other in response to events."
          ],
          practice: [
            { t: "Refactoring Guru - Strategy", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/strategy" },
            { t: "Refactoring Guru - Observer", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/observer" },
            { t: "Refactoring Guru - Command", p: "RG", d: "M", u: "https://refactoring.guru/design-patterns/command" },
            { t: "Refactoring Guru - State", p: "RG", d: "M", u: "https://refactoring.guru/design-patterns/state" },
            { t: "Refactoring Guru - Chain of Responsibility", p: "RG", d: "M", u: "https://refactoring.guru/design-patterns/chain-of-responsibility" },
            { t: "Refactoring Guru - Template Method", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/template-method" },
            { t: "Refactoring Guru - Iterator", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/iterator" },
            { t: "Refactoring Guru - Visitor", p: "RG", d: "H", u: "https://refactoring.guru/design-patterns/visitor" },
            { t: "Text editor with Command-based undo/redo (two stacks)", p: "BUILD", d: "M" },
            { t: "LeetCode - Flatten Nested List Iterator", p: "LC", d: "M", u: "https://leetcode.com/problems/flatten-nested-list-iterator/" }
          ],
          notes: [
            "Strategy: <code>Comparator</code> passed to <code>sort</code>, payment methods, routing algorithms (fastest/cheapest), LLM retry/backoff policies.",
            "Observer: Java <code>PropertyChangeListener</code>, GUI event listeners, Kafka/pub-sub at the system level, Django signals.",
            "Command: <code>Runnable</code> submitted to an executor, task queues (Celery jobs), undo in editors, remote-control buttons.",
            "State: TCP connection states, order/booking lifecycles, vending machine, traffic light, document workflow (Draft/Review/Published).",
            "Chain: servlet filters, Spring Security filter chain, logging level handlers, support ticket escalation, ATM note dispensing.",
            "Template Method: <code>AbstractList</code>, JUnit setUp/test/tearDown, <code>HttpServlet.service()</code> calling <code>doGet</code>/<code>doPost</code>.",
            "Visitor: compilers (AST visitors), Python <code>ast.NodeVisitor</code>, exporting shapes to XML/JSON.",
            "In Python, a Strategy can just be a function or callable - mention this, then use classes when the strategy has config/state."
          ],
          cases: [
            "Misuse: State pattern for 2 states with trivial behaviour - an enum + if is clearer.",
            "Observer pitfalls: memory leaks from never-unsubscribed listeners, notification order assumptions, exceptions in one observer stopping others, synchronous slow observers blocking the subject.",
            "Chain with no terminal handler - request silently dropped; always define a default.",
            "Visitor makes adding a new element type expensive (every visitor changes) - only use when the hierarchy is stable.",
            "Template Method overuse leads to deep inheritance - Strategy (composition) is often better.",
            "Command undo for non-reversible actions (sent email) - need compensating commands."
          ],
          qa: [
            { q: "Strategy vs State pattern?", a: "Same structure (context delegates to an interface). Strategy: the client picks an algorithm and the strategies don't know each other. State: the context's behaviour changes with internal state and the state objects themselves trigger transitions to other states." },
            { q: "How would you implement undo/redo?", a: "Command pattern: each action is a command with execute() and undo(). Keep an undo stack; on new command clear the redo stack. Undo pops from undo, calls undo(), pushes to redo; redo does the reverse. Alternative: Memento snapshots for complex state." },
            { q: "Where would you use Chain of Responsibility in an LLD?", a: "ATM cash dispensing (2000 -> 500 -> 200 -> 100 handlers each dispensing what they can), approval workflows by amount, request validation/auth middleware, and log level routing." }
          ],
          code: `from abc import ABC, abstractmethod

# Observer
class OrderEvents:
    def __init__(self): self._subs = []
    def subscribe(self, fn): self._subs.append(fn)
    def publish(self, order_id, status):
        for fn in list(self._subs):
            try: fn(order_id, status)
            except Exception as e: print("observer failed:", e)  # isolate failures

# Chain of Responsibility: ATM note dispenser
class NoteHandler:
    def __init__(self, note: int, nxt: "NoteHandler | None" = None):
        self.note, self.nxt = note, nxt
    def dispense(self, amount: int, out: dict) -> int:
        n, amount = divmod(amount, self.note)
        if n: out[self.note] = n
        return self.nxt.dispense(amount, out) if self.nxt else amount

chain = NoteHandler(2000, NoteHandler(500, NoteHandler(100)))
out = {}; left = chain.dispense(3700, out)
assert left == 0 and out == {2000: 1, 500: 3, 100: 2}

# Command with undo
class Command(ABC):
    @abstractmethod
    def execute(self): ...
    @abstractmethod
    def undo(self): ...

class Insert(Command):
    def __init__(self, doc: list, text: str): self.doc, self.text = doc, text
    def execute(self): self.doc.append(self.text)
    def undo(self): self.doc.pop()`
        },
        {
          id: "lld-concurrency",
          title: "Concurrency in LLD: thread safety, locks, producer-consumer, read-write locks, optimistic locking",
          est: "2 days",
          why: "Every booking/inventory/parking design gets 'what if two users book the same seat at once?'. Senior machine-coding evaluators check for synchronised shared state.",
          learn: [
            "Race condition, critical section, atomicity; check-then-act bugs (<code>if seat.free: seat.book()</code>).",
            "Mutex / <code>threading.Lock</code> / Java <code>synchronized</code> / <code>ReentrantLock</code>; lock granularity: global lock vs per-entity lock (per show, per seat, per parking floor).",
            "Deadlock conditions (mutual exclusion, hold-and-wait, no preemption, circular wait); prevent by ordering locks (sort seat ids) and timeouts (<code>tryLock</code>).",
            "Producer-consumer with a bounded blocking queue (<code>queue.Queue</code>, <code>ArrayBlockingQueue</code>), condition variables (<code>wait/notify</code>, <code>Condition</code>).",
            "Read-write lock: many concurrent readers, exclusive writer (<code>ReentrantReadWriteLock</code>) - for read-heavy caches/catalogues.",
            "Optimistic locking: version number / CAS; update succeeds only if version unchanged (<code>UPDATE ... WHERE id=? AND version=?</code>), retry on conflict. Pessimistic: <code>SELECT ... FOR UPDATE</code>.",
            "Atomic variables and concurrent collections: <code>AtomicInteger</code>, <code>ConcurrentHashMap.computeIfAbsent</code>; Python GIL does not make compound operations atomic.",
            "Temporary holds with expiry: seat lock with TTL, released by a scheduler or lazily on read - BookMyShow pattern.",
            "Thread pools / executors for async work (notifications) so the request path stays fast."
          ],
          practice: [
            { t: "LeetCode - Design Bounded Blocking Queue", p: "LC", d: "M", u: "https://leetcode.com/problems/design-bounded-blocking-queue/" },
            { t: "LeetCode - Print in Order", p: "LC", d: "E", u: "https://leetcode.com/problems/print-in-order/" },
            { t: "LeetCode - The Dining Philosophers", p: "LC", d: "M", u: "https://leetcode.com/problems/the-dining-philosophers/" },
            { t: "LeetCode - Web Crawler Multithreaded", p: "LC", d: "M", u: "https://leetcode.com/problems/web-crawler-multithreaded/" },
            { t: "Book the same seat from 100 threads; show double booking, then fix with per-show lock", p: "BUILD", d: "M" },
            { t: "Implement optimistic locking with a version field and retry loop on an in-memory inventory", p: "BUILD", d: "M" },
            { t: "Implement a read-write lock using Condition in Python", p: "BUILD", d: "H" }
          ],
          notes: [
            "Interview line: 'Shared mutable state is the seat map; I'll guard each show's seats with a lock so different shows don't contend, and acquire seat locks in sorted order to avoid deadlock.'",
            "Pessimistic locking when contention is high (hot seats, flash sales); optimistic when conflicts are rare (profile updates, low-contention inventory).",
            "In distributed systems the in-memory lock becomes a DB row lock, Redis <code>SET NX PX</code> lock or a unique constraint - mention it as the scaling path.",
            "Idempotency for retries: the same booking request id must not create two bookings.",
            "Java <code>ConcurrentHashMap</code> segments/bins lock per bucket; Python <code>dict</code> single ops are atomic under the GIL but read-modify-write is not.",
            "Prefer immutable value objects and confinement (one owner thread) to reduce locking."
          ],
          cases: [
            "Check-then-act outside the lock -> two bookings both see 'available'.",
            "Holding a lock while calling a slow external service (payment) - instead lock seat with TTL, release lock, process payment, then confirm.",
            "Lock leaks on exceptions - always <code>with lock:</code> / try-finally.",
            "Deadlock when two users lock seats A,B and B,A - sort ids before locking.",
            "Optimistic retry storms under high contention - add backoff and max retries.",
            "Lost wake-up: using <code>if</code> instead of <code>while</code> around <code>condition.wait()</code> (spurious wakeups)."
          ],
          qa: [
            { q: "Two users try to book the same seat simultaneously. How do you handle it?", a: "Make 'check availability + mark locked' atomic: per-show lock (or CAS on seat status) so only one transitions AVAILABLE -> LOCKED with a TTL and owner id. The loser gets SeatUnavailable. On payment success the lock owner confirms (LOCKED -> BOOKED); on failure/timeout it reverts to AVAILABLE. At scale use DB row locks / unique constraint on (show, seat) or Redis SETNX." },
            { q: "Optimistic vs pessimistic locking?", a: "Pessimistic acquires a lock before reading/updating, blocking others - safe under heavy contention, risks deadlocks and lower throughput. Optimistic reads freely and validates a version at write time, retrying on conflict - high throughput when conflicts are rare." },
            { q: "How do you avoid deadlock when booking multiple seats?", a: "Acquire locks in a global order (sorted seat ids), or use a single coarser lock per show, or tryLock with timeout and release-all-on-failure." }
          ],
          code: `import threading, time, uuid
from enum import Enum

class SeatStatus(Enum):
    AVAILABLE = 1; LOCKED = 2; BOOKED = 3

class SeatLockManager:
    def __init__(self, ttl_sec=300, clock=time.monotonic):
        self._lock = threading.Lock()          # per-show instance
        self._holds = {}                       # seat_id -> (user, expiry)
        self._booked = set()
        self.ttl, self.clock = ttl_sec, clock

    def _free(self, seat, now):
        if seat in self._booked: return False
        h = self._holds.get(seat)
        return h is None or h[1] <= now        # expired holds are free

    def lock(self, user, seats: list[str]) -> bool:
        with self._lock:                       # check + act atomically
            now = self.clock()
            if not all(self._free(s, now) for s in seats):
                return False
            for s in seats:
                self._holds[s] = (user, now + self.ttl)
            return True

    def confirm(self, user, seats) -> bool:
        with self._lock:
            now = self.clock()
            if any(self._holds.get(s, (None, 0))[0] != user or self._holds[s][1] <= now for s in seats):
                return False                   # hold expired or not owner
            for s in seats:
                del self._holds[s]; self._booked.add(s)
            return True`
        }
      ]
    },
    {
      name: "Level 2 · Classic LLD problems",
      desc: "The 10 problems asked most often in 45-60 min LLD rounds. For each: requirements to clarify, entities, patterns, concurrency and extension points - then code the core in under 90 minutes.",
      topics: [
        {
          id: "parking-lot",
          title: "Parking lot",
          est: "1 day",
          why: "The single most-asked LLD question in India; a test of entity modelling, Strategy for pricing/allocation and concurrency on spot assignment.",
          learn: [
            "Clarify: number of floors, spot types (bike/compact/large/EV), vehicle types, entry/exit gates, pricing model (hourly, per type, first-hour flat), payment modes, display boards, reservation?",
            "Entities: <code>ParkingLot</code>, <code>Floor</code>, <code>ParkingSpot</code>{id, type, status}, <code>Vehicle</code>{plate, type}, <code>Ticket</code>{id, spot, vehicle, entryTime}, <code>EntryGate</code>/<code>ExitGate</code>, <code>Payment</code>, <code>DisplayBoard</code>.",
            "Enums: <code>VehicleType</code>, <code>SpotType</code>, <code>SpotStatus</code>, <code>PaymentStatus</code>; mapping VehicleType -> allowed SpotTypes.",
            "Interfaces: <code>SpotAllocationStrategy</code> (nearest to gate, lowest floor first, random), <code>PricingStrategy</code> (hourly, per-type, weekend surge), <code>PaymentProcessor</code>.",
            "Patterns: Singleton (ParkingLot), Factory (vehicle/spot creation), Strategy (pricing, allocation), Observer (display boards update on spot change).",
            "Concurrency: two entry gates may assign the same spot - atomic allocate (lock per floor/spot type, or a concurrent free-spot queue per type).",
            "Data structures: per-type min-heap or deque of free spots per floor for O(log n) / O(1) allocation; map ticketId -> Ticket, plate -> Ticket.",
            "Extensibility: new vehicle type (EV with charging), new pricing rule, reservations, multiple lots - all without editing ParkingLot."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: park(vehicle) -> Ticket, unpark(ticketId) -> fee, availability per floor/type, demo driver", p: "BUILD", d: "M" },
            { t: "Add EV spots with charging fee using a new PricingStrategy (no edits to ParkingLot)", p: "BUILD", d: "M" },
            { t: "Simulate 2 gates on threads and prove no spot is double assigned", p: "BUILD", d: "H" },
            { t: "LeetCode - Design Parking System", p: "LC", d: "E", u: "https://leetcode.com/problems/design-parking-system/" },
            { t: "awesome-low-level-design - problem list (parking lot)", p: "GH", d: "M", u: "https://github.com/ashishps1/awesome-low-level-design" },
            { t: "Concept && Coding - Parking lot LLD", p: "YT", d: "M", u: "https://www.youtube.com/results?search_query=concept+and+coding+parking+lot+low+level+design" }
          ],
          notes: [
            "Sketch: <code>ParkingLot</code>(singleton) -> <code>Floor[]</code> -> <code>ParkingSpot{id, type, status, vehicle}</code>; <code>Ticket{id, vehicle, spot, entryTime}</code>; <code>ParkingService.park/unpark</code>; <code>SpotAllocationStrategy</code>, <code>PricingStrategy</code>, <code>PaymentProcessor</code> (Strategy).",
            "Separate model (Spot, Ticket) from services (ParkingService, PricingService) and repositories (TicketRepo).",
            "Inject a Clock into pricing so fee logic is testable.",
            "Compatibility table: BIKE -> {BIKE, COMPACT, LARGE}? Clarify whether a bike may take a car spot.",
            "Fee = PricingStrategy.calculate(ticket, exitTime) - strategy chosen by vehicle type or lot policy.",
            "DisplayBoard as Observer on spot status changes; avoids polling.",
            "Don't model gate hardware deeply; a Gate just calls the service."
          ],
          cases: [
            "Lot full / no compatible spot -> clear error, no ticket created.",
            "Same vehicle trying to park twice (plate already active).",
            "Lost ticket: lookup by plate, flat penalty fee.",
            "Payment failure at exit: spot stays occupied, ticket stays ACTIVE, retry allowed.",
            "Concurrent allocation of last spot from two gates.",
            "Spot under maintenance (OUT_OF_SERVICE status) skipped by allocation.",
            "Exit before minimum billing unit / overnight across day boundary."
          ],
          qa: [
            { q: "How do you add a new vehicle type, e.g. electric truck?", a: "Add an enum value and a spot compatibility entry (config), register a Vehicle subclass in the factory if behaviour differs, and add a PricingStrategy implementation. ParkingService and allocation code don't change - that's OCP via Strategy + Factory." },
            { q: "How do you find a free spot quickly?", a: "Keep per-floor, per-spot-type collections of free spots (min-heap by distance or a deque). Allocation pops from the first floor with a free compatible spot - O(floors + log n). Unpark pushes the spot back. Guard with a lock per (floor, type)." },
            { q: "How would this change for multiple lots in a city?", a: "Introduce a ParkingLotRegistry (no singleton), each lot with its own locks; a search service queries availability counts; reservations become a separate service with holds that expire - moves toward HLD." }
          ],
          code: `from enum import Enum
from dataclasses import dataclass, field
import threading, time, uuid

class VehicleType(Enum): BIKE = 1; CAR = 2; TRUCK = 3
class SpotType(Enum): SMALL = 1; MEDIUM = 2; LARGE = 3
FITS = {VehicleType.BIKE: [SpotType.SMALL, SpotType.MEDIUM],
        VehicleType.CAR: [SpotType.MEDIUM], VehicleType.TRUCK: [SpotType.LARGE]}

@dataclass
class Spot:
    id: str; type: SpotType; vehicle: str | None = None

@dataclass
class Ticket:
    id: str; plate: str; vtype: VehicleType; spot: Spot; entry: float

class PricingStrategy:
    def fee(self, t: Ticket, exit_ts: float) -> int: raise NotImplementedError

class HourlyPricing(PricingStrategy):
    RATE = {VehicleType.BIKE: 20, VehicleType.CAR: 50, VehicleType.TRUCK: 100}
    def fee(self, t, exit_ts):
        hours = max(1, -(-int(exit_ts - t.entry) // 3600))   # ceil, min 1h
        return hours * self.RATE[t.vtype]

class ParkingLot:
    def __init__(self, spots: list[Spot], pricing: PricingStrategy, clock=time.time):
        self.free = {st: [s for s in spots if s.type == st] for st in SpotType}
        self.active: dict[str, Ticket] = {}
        self.pricing, self.clock = pricing, clock
        self.lock = threading.Lock()

    def park(self, plate: str, vtype: VehicleType) -> Ticket:
        with self.lock:
            if any(t.plate == plate for t in self.active.values()):
                raise ValueError("already parked")
            for st in FITS[vtype]:
                if self.free[st]:
                    spot = self.free[st].pop(); spot.vehicle = plate
                    t = Ticket(uuid.uuid4().hex[:8], plate, vtype, spot, self.clock())
                    self.active[t.id] = t
                    return t
            raise RuntimeError("no spot available")

    def unpark(self, ticket_id: str) -> int:
        with self.lock:
            t = self.active.pop(ticket_id, None)
            if t is None: raise KeyError("invalid ticket")
            t.spot.vehicle = None; self.free[t.spot.type].append(t.spot)
        return self.pricing.fee(t, self.clock())`
        },
        {
          id: "elevator",
          title: "Elevator system",
          est: "1 day",
          why: "Tests State pattern, scheduling strategy and handling of concurrent requests; popular at Uber, Atlassian, Microsoft India.",
          learn: [
            "Clarify: number of elevators and floors, capacity/weight limit, request types (hall call up/down vs cabin call to floor), scheduling goal (min wait, energy), emergency/maintenance mode, VIP/express?",
            "Entities: <code>Building</code>, <code>ElevatorCar</code>{id, currentFloor, direction, state, stops}, <code>Request</code>{floor, direction, type}, <code>ElevatorController</code>/<code>Dispatcher</code>, <code>Door</code>, <code>Display</code>, <code>Button</code> (hall/cabin).",
            "States: IDLE, MOVING_UP, MOVING_DOWN, DOORS_OPEN, MAINTENANCE - State pattern or enum-driven state machine.",
            "Scheduling: SCAN/LOOK (elevator algorithm - serve all requests in current direction, then reverse); dispatch strategy picks a car (nearest idle, same direction & approaching, least loaded).",
            "Per-car stop sets: two sorted sets / heaps - up-stops (min-heap) and down-stops (max-heap).",
            "Patterns: Strategy (dispatch algorithm), State (car), Observer (displays/floor panels), Command (requests queued), Singleton (controller).",
            "Concurrency: requests arrive from many floors while cars move - thread-safe request queue per car; simulation tick or one thread per car.",
            "Extensibility: different dispatch strategies for peak hours, express elevators serving subset of floors, weight sensor."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: hall/cabin requests, LOOK scheduling per car, dispatcher choosing car, step() simulation with logs", p: "BUILD", d: "H" },
            { t: "Add a new dispatch strategy (zone-based for peak hours) via Strategy", p: "BUILD", d: "M" },
            { t: "Add MAINTENANCE state - car removed from dispatch, pending requests reassigned", p: "BUILD", d: "M" },
            { t: "awesome-low-level-design - elevator system", p: "GH", d: "M", u: "https://github.com/ashishps1/awesome-low-level-design" },
            { t: "Concept && Coding - Elevator LLD", p: "YT", d: "M", u: "https://www.youtube.com/results?search_query=concept+and+coding+elevator+system+low+level+design" }
          ],
          notes: [
            "Sketch: <code>ElevatorController</code> -> <code>ElevatorCar[]</code>{floor, direction, state: ElevatorState, upStops(minheap), downStops(maxheap)}; <code>DispatchStrategy.select(cars, request)</code>; <code>Request{floor, dir, source: HALL|CABIN}</code>.",
            "Hall request goes through dispatcher; cabin request goes directly to that car.",
            "LOOK step: if moving up and upStops non-empty go to min(upStops) >= floor; else switch direction; idle if both empty.",
            "Cost function for dispatch: distance + penalty if moving away or opposite direction + load.",
            "Keep simulation discrete (tick) for machine coding - real time threads complicate the demo.",
            "Use an enum Direction {UP, DOWN, IDLE}."
          ],
          cases: [
            "Request for the floor the car is currently on with doors open.",
            "Duplicate requests (same floor pressed many times) - set semantics.",
            "Overweight - doors stay open, no movement.",
            "All cars in maintenance - queue requests or reject.",
            "Request in the opposite direction from a car passing by - don't stop.",
            "Starvation: far floors never served under nearest-first strategy."
          ],
          qa: [
            { q: "Which scheduling algorithm would you use and why?", a: "LOOK (variant of SCAN): keep moving in the current direction while there are stops ahead, then reverse. It avoids starvation of nearest-first and the useless end-travel of SCAN. Dispatcher assigns hall calls to the car with lowest cost (approaching in same direction > idle > others)." },
            { q: "How is the State pattern used here?", a: "Each car delegates <code>handle_request</code> and <code>step</code> to its current state object (Idle, MovingUp, MovingDown, DoorsOpen, Maintenance). Transitions live in states, so adding e.g. FireMode is a new class instead of more if/else." }
          ]
        },
        {
          id: "library-management",
          title: "Library management system",
          est: "0.5-1 day",
          why: "Classic entry-level LLD: tests entity modelling (Book vs BookItem), fines, reservations and notifications.",
          learn: [
            "Clarify: members and librarians, search by title/author/subject, borrow limit per member, loan period, renewals, reservations/holds, fines, multiple copies, notifications.",
            "Entities: <code>Book</code>{isbn, title, authors} vs <code>BookItem</code>{barcode, status, rack} (physical copy), <code>Member</code>, <code>Librarian</code>, <code>Loan</code>{item, member, issueDate, dueDate, returnDate}, <code>Reservation</code>, <code>Fine</code>, <code>Catalog</code>.",
            "Enums: <code>BookStatus</code> (AVAILABLE, LOANED, RESERVED, LOST), <code>AccountStatus</code>.",
            "Search: Catalog with indexes (dict title -> books, author -> books) - Facade over search.",
            "Patterns: Strategy (FinePolicy per member type), Observer (notify reserved member when item returned), Factory (user types).",
            "Concurrency: two members borrowing the last copy; reservation queue per Book (FIFO).",
            "Extensibility: e-books, different member tiers (student/faculty limits), new fine policies."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: add book/copies, search, checkout with limits, return with fine, reserve + notify", p: "BUILD", d: "M" },
            { t: "Add faculty members with different limits/fines without touching LoanService", p: "BUILD", d: "E" },
            { t: "awesome-low-level-design - library management", p: "GH", d: "E", u: "https://github.com/ashishps1/awesome-low-level-design" }
          ],
          notes: [
            "Sketch: <code>Library</code> -> <code>Catalog</code>(search) -> <code>Book</code> 1..* <code>BookItem</code>; <code>Member</code> 0..5 <code>Loan</code>; <code>LoanService.checkout/return/renew</code>; <code>FinePolicy</code> (Strategy); <code>ReservationQueue</code> per Book.",
            "Book vs BookItem is the key insight interviewers look for (metadata vs physical copy).",
            "Fine = FinePolicy.calculate(loan, returnDate) - inject clock.",
            "Reservation: on return, if queue non-empty, mark item RESERVED for the head member and notify.",
            "Keep Librarian operations as a role/permission rather than deep inheritance."
          ],
          cases: [
            "Member at borrow limit or with unpaid fines.",
            "Renewal not allowed when someone has reserved the book.",
            "Reserved item not collected within N days - pass to next in queue.",
            "Lost book - fine equals price, status LOST.",
            "Returning an item that was not loaned / wrong member."
          ],
          qa: [
            { q: "Why separate Book and BookItem?", a: "Book is catalogue metadata (ISBN, title) shared by all copies; BookItem is a physical copy with its own barcode, status and location. Loans and reservations act on items (or books, for reservations), and search works on books." },
            { q: "How would you notify members when a reserved book is available?", a: "Observer: ReturnService publishes ItemReturned; ReservationService subscribes, assigns the item to the next reservation and calls a NotificationService (Strategy for email/SMS) asynchronously." }
          ]
        },
        {
          id: "board-games",
          title: "Game design: Tic-tac-toe, Chess, Snake & Ladder",
          est: "1 day",
          why: "Very common machine-coding prompts at Flipkart, Swiggy, PhonePe; tests clean game loop, extensibility (board size, rules) and O(1) win checks.",
          learn: [
            "Clarify: board size (N x N?), number of players, win condition (K in a row?), human vs bot, undo, game history; Snake & Ladder: board size, multiple dice, snakes/ladders config, what happens on 6 / exact finish.",
            "Common entities: <code>Game</code>, <code>Board</code>, <code>Player</code>{id, name, symbol/piece}, <code>Move</code>, <code>GameStatus</code>, <code>Dice</code> (Snake & Ladder).",
            "Tic-tac-toe O(1) win check: row/col/diag counters (+1 for X, -1 for O) - LeetCode 348 idea.",
            "Chess: <code>Piece</code> abstract with <code>canMove(board, from, to)</code> per subclass (polymorphism), <code>Cell</code>, move validation, check/checkmate detection, special moves (castling, en passant, promotion).",
            "Snake & Ladder: board as map position -> jump target (snakes and ladders unified as <code>Jump{start,end}</code>), turn queue of players (deque), Dice with configurable count.",
            "Patterns: Strategy (player move strategy: Human/Random/Minimax bot, win rule), Factory (pieces), Command/Memento (undo), Observer (UI updates), State (game status).",
            "Game loop: while status == IN_PROGRESS: player = turns.popleft(); move = player.strategy.next_move(board); validate; apply; check win/draw; turns.append(player)."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: N x N tic-tac-toe with K-in-a-row, 2+ players, invalid move handling, O(1) win check", p: "BUILD", d: "M" },
            { t: "Implement core flow in <=90 min: Snake & Ladder with config input, multiple players and dice, winners ranking", p: "BUILD", d: "M" },
            { t: "Chess: model pieces and move validation for all pieces except special moves", p: "BUILD", d: "H" },
            { t: "LeetCode - Design Tic-Tac-Toe", p: "LC", d: "M", u: "https://leetcode.com/problems/design-tic-tac-toe/" },
            { t: "LeetCode - Design Snake Game", p: "LC", d: "M", u: "https://leetcode.com/problems/design-snake-game/" },
            { t: "workat.tech - Snake and Ladder machine coding", p: "workat.tech", d: "M", u: "https://workat.tech/machine-coding/practice" }
          ],
          notes: [
            "Sketch (TTT): <code>Game{board, players: deque, status, winRule}</code> -> <code>Board{n, grid, rows[], cols[], diag, anti}</code>; <code>Player{name, symbol, strategy: MoveStrategy}</code>.",
            "Sketch (S&L): <code>Game{board, dice, players: deque, winners[]}</code>; <code>Board{size, jumps: dict[int,int]}</code>; <code>Dice{count}.roll()</code>.",
            "Sketch (Chess): <code>Board{cells[8][8]}</code>; <code>Piece{color}</code> -> King/Queen/Rook/Bishop/Knight/Pawn each overriding <code>valid_moves</code>; <code>Game{moves: list[Move], turn}</code>.",
            "Keep I/O (reading input, printing board) out of Game - a separate Console runner makes the logic testable.",
            "Inject Dice/random seed for deterministic tests.",
            "Snake & Ladder: validate config - no cycles, no jump at the last cell, start != end."
          ],
          cases: [
            "Move on occupied cell / out of bounds / wrong player's turn.",
            "Draw detection when board full.",
            "S&L: roll exceeding final cell - stay in place (clarify rule).",
            "S&L: snake head and ladder start on the same cell; chained jumps.",
            "Chess: move that leaves own king in check is illegal.",
            "Game continues for remaining players after first winner (ranking)."
          ],
          qa: [
            { q: "How do you check a tic-tac-toe win in O(1)?", a: "Keep counters per row, per column, diagonal and anti-diagonal. Player 1 adds +1, player 2 adds -1 (or per-player counters for >2 players). After a move at (r,c), check if any of the touched counters reached +n/-n." },
            { q: "How would you add a computer player?", a: "Player holds a MoveStrategy; HumanStrategy reads input, BotStrategy (random / minimax for TTT) computes the move. Game loop just calls <code>player.strategy.next_move(board)</code> - no changes elsewhere." }
          ]
        },
        {
          id: "vending-machine",
          title: "Vending machine (State pattern)",
          est: "0.5-1 day",
          why: "The textbook State pattern question; also tests inventory and change-making logic.",
          learn: [
            "Clarify: coins/notes accepted, card/UPI?, product selection by code, multiple items per transaction, refund/cancel, change availability, admin restock.",
            "Entities: <code>VendingMachine</code>(context), <code>Inventory</code>{slot -> Product, qty}, <code>Product</code>{code, name, price}, <code>Coin</code>/<code>Note</code> enum, <code>CashBox</code>, <code>State</code> interface.",
            "States: Idle -> HasMoney -> ProductSelected/Dispensing -> Idle; plus OutOfService. Each state implements insertMoney, selectProduct, dispense, cancel (invalid ones throw).",
            "Change-making: greedy over denominations works for canonical coin systems; with limited coin counts, check availability before dispensing (or DP).",
            "Patterns: State (core), Strategy (payment method), Singleton (machine), Chain of Responsibility (change dispensing).",
            "Concurrency: single user at a time physically, but admin restock vs purchase - lock the machine operations."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: insert coins, select product, dispense with change, cancel/refund, restock - using State classes", p: "BUILD", d: "M" },
            { t: "Add UPI payment as a new payment strategy", p: "BUILD", d: "E" },
            { t: "Refactoring Guru - State", p: "RG", d: "M", u: "https://refactoring.guru/design-patterns/state" },
            { t: "awesome-low-level-design - vending machine", p: "GH", d: "M", u: "https://github.com/ashishps1/awesome-low-level-design" }
          ],
          notes: [
            "Sketch: <code>VendingMachine{state: State, inventory, balance, cashbox}</code>; <code>State</code> -> IdleState, HasMoneyState, DispensingState, OutOfServiceState; <code>Inventory{slots: dict[code, (Product, qty)]}</code>.",
            "State objects receive the machine (context) and call <code>machine.set_state(...)</code> to transition.",
            "Compute change before dispensing; if impossible, refund and stay consistent.",
            "Use integer paise/rupees, never floats, for money.",
            "Enum-based state machine with a transition table is an acceptable alternative - explain why State classes scale better."
          ],
          cases: [
            "Product sold out after money inserted - refund or choose another.",
            "Insufficient balance - prompt for more money.",
            "Exact change unavailable - refund instead of under-paying.",
            "Cancel in any state with money returns the full balance.",
            "Invalid coin / counterfeit note rejected.",
            "Power failure mid-dispense (follow-up: persist transaction state)."
          ],
          qa: [
            { q: "Why State pattern instead of if/else on a status enum?", a: "Each operation's behaviour differs per state; with if/else, every method has a switch over states and adding a state touches all of them. With State classes each state owns its behaviour and transitions, so new states are new classes (OCP) and invalid operations are explicit." },
            { q: "How do you ensure correct change?", a: "Keep coin counts in a CashBox; compute change greedily from highest denomination considering available counts (DP if non-canonical). If change can't be made, reject the purchase before dispensing and refund." }
          ],
          code: `from abc import ABC, abstractmethod

class State(ABC):
    def __init__(self, m: "VendingMachine"): self.m = m
    def insert(self, amt: int): raise RuntimeError(f"cannot insert in {type(self).__name__}")
    def select(self, code: str): raise RuntimeError(f"cannot select in {type(self).__name__}")
    def cancel(self) -> int: return 0

class Idle(State):
    def insert(self, amt):
        self.m.balance += amt; self.m.state = HasMoney(self.m)

class HasMoney(State):
    def insert(self, amt): self.m.balance += amt
    def select(self, code):
        product, qty = self.m.inventory.get(code, (None, 0))
        if not product or qty == 0: raise ValueError("sold out")
        price = product[1]
        if self.m.balance < price: raise ValueError(f"insert {price - self.m.balance} more")
        self.m.inventory[code] = (product, qty - 1)
        change, self.m.balance = self.m.balance - price, 0
        self.m.state = Idle(self.m)
        return product[0], change
    def cancel(self):
        refund, self.m.balance = self.m.balance, 0
        self.m.state = Idle(self.m); return refund

class VendingMachine:
    def __init__(self, inventory):
        self.inventory = inventory      # code -> ((name, price), qty)
        self.balance = 0
        self.state: State = Idle(self)
    def insert(self, amt): self.state.insert(amt)
    def select(self, code): return self.state.select(code)
    def cancel(self): return self.state.cancel()`
        },
        {
          id: "splitwise",
          title: "Splitwise (expense sharing)",
          est: "1 day",
          why: "A favourite machine-coding problem (Flipkart, PhonePe, Razorpay, workat.tech); tests split strategies, balance bookkeeping and simplify-debts algorithm.",
          learn: [
            "Clarify: users, groups, split types (EQUAL, EXACT, PERCENT, SHARES), who paid (single or multiple payers), show balances per user / per group, settle up, simplify debts, currency, expense edits/deletes.",
            "Entities: <code>User</code>, <code>Group</code>{members, expenses}, <code>Expense</code>{id, paidBy, amount, splits, type}, <code>Split</code>{user, amount} (EqualSplit/ExactSplit/PercentSplit), <code>BalanceSheet</code> (map user -> user -> amount).",
            "Split validation: EXACT sums to total; PERCENT sums to 100; EQUAL handles rounding remainder (assign extra paise to first user).",
            "Patterns: Strategy/Factory for split types (<code>SplitStrategy.compute(amount, participants, params)</code>), Observer for notifications.",
            "Balance update: for each split, <code>balance[split.user][paidBy] += split.amount</code> and the mirror negative, or a net map per pair.",
            "Simplify debts: compute net balance per user; greedily match largest creditor with largest debtor using two heaps -> at most n-1 transactions.",
            "Concurrency: concurrent expense additions to same group - lock per group / balance sheet.",
            "Extensibility: new split type (by shares, by item), multi-currency, recurring expenses."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: commands EXPENSE u1 1000 4 u1 u2 u3 u4 EQUAL / EXACT / PERCENT, SHOW, SHOW u1", p: "BUILD", d: "M" },
            { t: "Add simplify-debts using two heaps and print minimal transactions", p: "BUILD", d: "M" },
            { t: "Add SHARE split type without modifying ExpenseService", p: "BUILD", d: "E" },
            { t: "workat.tech - Splitwise machine coding", p: "workat.tech", d: "M", u: "https://workat.tech/machine-coding/practice" },
            { t: "LeetCode - Optimal Account Balancing", p: "LC", d: "H", u: "https://leetcode.com/problems/optimal-account-balancing/" },
            { t: "Concept && Coding - Splitwise LLD", p: "YT", d: "M", u: "https://www.youtube.com/results?search_query=concept+and+coding+splitwise+low+level+design" }
          ],
          notes: [
            "Sketch: <code>ExpenseService.add(paidBy, amount, participants, SplitType, params)</code> -> <code>SplitStrategyFactory</code> -> <code>Split[]</code>; <code>BalanceSheet{net: dict[(a,b)] -> amount}</code>; <code>Group</code>; <code>SettleService</code>.",
            "Store money as integer paise; EQUAL split of 100 among 3 = 34, 33, 33.",
            "Keep balance as a single signed amount per unordered pair (a<b) to avoid two-entry drift.",
            "Simplify debts greedy is not always the global minimum (that's NP-hard, LC 465 uses backtracking) but is what Splitwise-style apps do.",
            "Expense edit = reverse old splits + apply new ones (keep an audit log)."
          ],
          cases: [
            "Percent splits not summing to 100 / exact amounts not summing to total.",
            "Payer included or excluded from participants.",
            "Rounding remainders with equal split.",
            "User not in group adding expense to group.",
            "Zero balances should not be printed; self-debt ignored.",
            "Deleting an expense after settlement."
          ],
          qa: [
            { q: "How do you minimise the number of transactions?", a: "Compute net balance per user (sum paid - sum owed). Put creditors in a max-heap and debtors in a max-heap by absolute amount; repeatedly settle min(top creditor, top debtor), push back the remainder. At most n-1 transactions; exact minimum requires exponential search (LC 465)." },
            { q: "How do you design split types to be extensible?", a: "SplitStrategy interface with <code>validate</code> and <code>compute(amount, users, meta) -> list[Split]</code>; concrete Equal/Exact/Percent/Share; a factory/registry maps SplitType to strategy. ExpenseService never switches on type." }
          ],
          code: `from collections import defaultdict
import heapq

class SplitStrategy:
    def compute(self, amount: int, users: list[str], meta=None) -> dict[str, int]: ...

class EqualSplit(SplitStrategy):
    def compute(self, amount, users, meta=None):
        base, rem = divmod(amount, len(users))
        return {u: base + (1 if i < rem else 0) for i, u in enumerate(users)}

class ExactSplit(SplitStrategy):
    def compute(self, amount, users, meta):
        if sum(meta) != amount: raise ValueError("exact splits must sum to total")
        return dict(zip(users, meta))

class PercentSplit(SplitStrategy):
    def compute(self, amount, users, meta):
        if sum(meta) != 100: raise ValueError("percent must sum to 100")
        shares = [amount * p // 100 for p in meta]
        shares[0] += amount - sum(shares)
        return dict(zip(users, shares))

STRATEGIES = {"EQUAL": EqualSplit(), "EXACT": ExactSplit(), "PERCENT": PercentSplit()}

class Ledger:
    def __init__(self): self.net = defaultdict(int)     # user -> +owed to them / -they owe
    def add(self, payer, amount, users, kind, meta=None):
        for u, share in STRATEGIES[kind].compute(amount, users, meta).items():
            if u != payer:
                self.net[payer] += share; self.net[u] -= share

    def simplify(self):
        cred = [(-v, u) for u, v in self.net.items() if v > 0]
        debt = [(v, u) for u, v in self.net.items() if v < 0]
        heapq.heapify(cred); heapq.heapify(debt)
        txns = []
        while cred and debt:
            c, cu = heapq.heappop(cred); d, du = heapq.heappop(debt)
            x = min(-c, -d); txns.append((du, cu, x))
            if -c - x: heapq.heappush(cred, (c + x, cu))
            if -d - x: heapq.heappush(debt, (d + x, du))
        return txns`
        },
        {
          id: "bookmyshow",
          title: "BookMyShow (movie ticket booking with seat locking)",
          est: "1-1.5 days",
          why: "Top-3 Indian LLD question; the seat-locking concurrency discussion is the whole point.",
          learn: [
            "Clarify: cities, cinemas, screens, shows, seat categories/pricing, search by city/movie/date, hold timeout (e.g. 5-10 min), payment, cancellation/refunds, offers.",
            "Entities: <code>City</code>, <code>Cinema</code>, <code>Screen</code>{seats}, <code>Seat</code>{id, row, category}, <code>Movie</code>, <code>Show</code>{movie, screen, start, price map}, <code>ShowSeat</code>{show, seat, status}, <code>Booking</code>{id, user, show, seats, status, amount}, <code>Payment</code>.",
            "Seat is physical per screen; ShowSeat holds per-show status (AVAILABLE, LOCKED, BOOKED) - key modelling insight.",
            "Flow: search -> select show -> view seat map -> lock seats (TTL) -> pay -> confirm booking -> notify; on timeout/failure release.",
            "Patterns: Strategy (pricing, payment), Observer (notifications), State (booking lifecycle: CREATED -> PENDING_PAYMENT -> CONFIRMED / CANCELLED / EXPIRED), Factory (payment).",
            "Concurrency: <code>SeatLockProvider</code> interface (in-memory with per-show lock; Redis/DB in production); atomic multi-seat lock; lock owner + expiry.",
            "Extensibility: dynamic pricing, coupons, food add-ons, different seat-lock providers, events/concerts reuse Show/Seat."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: add cinemas/shows, list available seats, lock seats with TTL, confirm on payment, expire holds", p: "BUILD", d: "H" },
            { t: "Run 100 concurrent booking threads on overlapping seats and assert no double booking", p: "BUILD", d: "H" },
            { t: "Swap the in-memory SeatLockProvider for a fake 'Redis' implementation via the interface", p: "BUILD", d: "M" },
            { t: "Concept && Coding - BookMyShow LLD", p: "YT", d: "M", u: "https://www.youtube.com/results?search_query=concept+and+coding+bookmyshow+low+level+design" },
            { t: "awesome-low-level-design - movie ticket booking", p: "GH", d: "M", u: "https://github.com/ashishps1/awesome-low-level-design" }
          ],
          notes: [
            "Sketch: <code>City</code> -> <code>Cinema[]</code> -> <code>Screen[]</code> -> <code>Seat[]</code>; <code>Show{movie, screen, time}</code> -> <code>ShowSeat{status, lockedBy, lockExpiry}</code>; <code>BookingService</code> uses <code>SeatLockProvider</code> + <code>PaymentService</code> + <code>PricingStrategy</code>.",
            "Lock granularity: per-show lock is simple and enough in-memory; DB version would use unique (show_id, seat_id) on bookings or row locks.",
            "Never hold a mutex during payment - the TTL hold is the 'logical lock'.",
            "Expiry handling: lazy check on access (expired = free) plus a background sweeper.",
            "Booking id as idempotency key for payment callbacks."
          ],
          cases: [
            "Two users selecting the same seat concurrently.",
            "Payment succeeds after hold expired and seat re-locked by someone else -> auto-refund.",
            "Payment failure / user abandons -> release seats.",
            "Partial availability when locking multiple seats -> all-or-nothing.",
            "Show cancelled -> refund all bookings, notify.",
            "Leaving single-seat gaps (business rule follow-up)."
          ],
          qa: [
            { q: "How do you prevent double booking?", a: "Seat state lives on ShowSeat. lockSeats(show, seats, user) atomically checks all are AVAILABLE (or expired holds) and marks them LOCKED with owner and expiry, under a per-show lock (or a single atomic DB statement / Redis SETNX per seat). Confirm verifies the lock is still owned and unexpired before marking BOOKED." },
            { q: "What happens if payment succeeds but the lock expired?", a: "Confirm fails the ownership check; the booking is marked FAILED and a refund is triggered (idempotently via payment id). Alternatively extend the hold when payment is initiated. Mention reconciliation jobs for gateway callbacks." },
            { q: "How would you scale beyond one server?", a: "Move seat locks to Redis (SET key NX PX ttl per seat or Lua script for multi-seat) or DB row-level locks; shard by show/cinema; seat maps cached; booking writes go to a transactional DB." }
          ]
        },
        {
          id: "rate-limiter-lld",
          title: "Rate limiter (LLD)",
          est: "0.5-1 day",
          why: "Bridges LLD and HLD; asked at Razorpay, PhonePe, Atlassian. Tests algorithm knowledge plus clean Strategy-based design and thread safety.",
          learn: [
            "Clarify: limit per user/API key/IP/endpoint, limits configurable per tier, algorithm, hard reject vs queue, distributed or single node, response headers (remaining, retry-after).",
            "Algorithms: fixed window counter, sliding window log, sliding window counter (weighted), token bucket (bursty, refill rate), leaky bucket (smooth outflow).",
            "Entities: <code>RateLimiter</code> interface <code>allow(key) -> bool</code>; implementations TokenBucket, SlidingWindowLog, FixedWindow; <code>RateLimitConfig</code>{capacity, window, refillRate}; <code>RateLimiterRegistry</code> (key/tier -> limiter); <code>Clock</code>.",
            "Patterns: Strategy (algorithm), Factory (from config), Decorator/Proxy (wrap a service/handler with limiting), Singleton registry.",
            "Concurrency: per-key lock or atomic ops; <code>ConcurrentHashMap.computeIfAbsent</code> for lazy bucket creation; avoid one global lock.",
            "Memory: evict idle keys (TTL/LRU) - otherwise unbounded growth with many users.",
            "Distributed: Redis INCR + EXPIRE (fixed window) or Lua script for token bucket; mention but implement in-memory."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: token bucket and sliding-window-log limiters behind one interface, per-user config, thread-safe, injectable clock, tests", p: "BUILD", d: "M" },
            { t: "LeetCode - Logger Rate Limiter", p: "LC", d: "E", u: "https://leetcode.com/problems/logger-rate-limiter/" },
            { t: "LeetCode - Design Hit Counter", p: "LC", d: "M", u: "https://leetcode.com/problems/design-hit-counter/" },
            { t: "Wrap an HTTP handler with a RateLimit decorator returning 429 + Retry-After", p: "BUILD", d: "M" }
          ],
          notes: [
            "Sketch: <code>RateLimiter</code>(interface) -> TokenBucketLimiter{capacity, refillPerSec, buckets: key -> (tokens, lastTs)}, SlidingWindowLimiter{limit, window, logs: key -> deque}; <code>LimiterFactory.from(config)</code>; <code>RateLimitMiddleware</code>(Decorator).",
            "Token bucket: refill lazily on each call: tokens = min(cap, tokens + (now - last) * rate).",
            "Fixed window has 2x burst at the window boundary; sliding log is exact but O(limit) memory per key; sliding counter approximates with two windows.",
            "Inject a clock to test without sleeping.",
            "LLM-API angle: limit by tokens consumed, not just requests (weighted cost per call)."
          ],
          cases: [
            "Burst at window boundary with fixed window.",
            "Clock skew / non-monotonic time - use monotonic clock.",
            "Unknown key/tier -> default config.",
            "Race when two threads create a bucket for the same new key.",
            "Changing limits at runtime for existing keys.",
            "Memory growth with millions of idle keys."
          ],
          qa: [
            { q: "Token bucket vs leaky bucket vs sliding window?", a: "Token bucket allows bursts up to capacity while enforcing an average rate - most common for APIs. Leaky bucket smooths output to a constant rate (queue). Sliding window log is exact per window at memory cost; sliding window counter approximates with O(1) memory." },
            { q: "How do you make it thread-safe without a global lock?", a: "Per-key state objects each with their own lock (or atomic CAS on a packed state), created via computeIfAbsent / setdefault under a striped lock, so different users never contend." }
          ],
          code: `import threading, time
from abc import ABC, abstractmethod
from collections import deque

class RateLimiter(ABC):
    @abstractmethod
    def allow(self, key: str, cost: int = 1) -> bool: ...

class TokenBucket(RateLimiter):
    def __init__(self, capacity: int, refill_per_sec: float, clock=time.monotonic):
        self.cap, self.rate, self.clock = capacity, refill_per_sec, clock
        self.state: dict[str, list] = {}           # key -> [tokens, last_ts, lock]
        self._create = threading.Lock()

    def _get(self, key):
        s = self.state.get(key)
        if s is None:
            with self._create:
                s = self.state.setdefault(key, [self.cap, self.clock(), threading.Lock()])
        return s

    def allow(self, key, cost=1):
        s = self._get(key)
        with s[2]:
            now = self.clock()
            s[0] = min(self.cap, s[0] + (now - s[1]) * self.rate); s[1] = now
            if s[0] >= cost:
                s[0] -= cost; return True
            return False

class SlidingWindowLog(RateLimiter):
    def __init__(self, limit: int, window_sec: float, clock=time.monotonic):
        self.limit, self.window, self.clock = limit, window_sec, clock
        self.logs: dict[str, deque] = {}; self.lock = threading.Lock()
    def allow(self, key, cost=1):
        with self.lock:
            now, q = self.clock(), self.logs.setdefault(key, deque())
            while q and q[0] <= now - self.window: q.popleft()
            if len(q) + cost > self.limit: return False
            q.extend([now] * cost); return True`
        },
        {
          id: "lru-cache-lld",
          title: "LRU cache (LLD)",
          est: "0.5 day",
          why: "Asked both as a DSA coding problem and as an LLD extension (pluggable eviction policies, thread safety, TTL).",
          learn: [
            "Core: hash map key -> node + doubly linked list ordered by recency; get/put O(1); move-to-front on access, evict tail on capacity.",
            "LLD framing: <code>Cache&lt;K,V&gt;</code> interface; <code>Storage</code> (map) and <code>EvictionPolicy</code> (LRU, LFU, FIFO) as pluggable strategies.",
            "EvictionPolicy interface: <code>key_accessed(k)</code>, <code>key_added(k)</code>, <code>evict() -> k</code>, <code>remove(k)</code>.",
            "LFU: key -> (value, freq) + freq -> ordered set of keys + minFreq pointer; all O(1).",
            "TTL extension: store expiry with value; lazy expiry on get plus periodic sweep (min-heap by expiry).",
            "Thread safety: single lock (simple; get also mutates order so a read-write lock doesn't help for LRU), or segmented/striped caches by key hash.",
            "Python shortcuts: <code>OrderedDict.move_to_end</code>/<code>popitem(last=False)</code>, <code>functools.lru_cache</code> - but interviewers usually want the DLL."
          ],
          practice: [
            { t: "LeetCode - LRU Cache", p: "LC", d: "M", u: "https://leetcode.com/problems/lru-cache/" },
            { t: "LeetCode - LFU Cache", p: "LC", d: "H", u: "https://leetcode.com/problems/lfu-cache/" },
            { t: "Implement core flow in <=90 min: generic Cache with pluggable EvictionPolicy (LRU + LFU), TTL, thread-safe, unit tests", p: "BUILD", d: "M" },
            { t: "LeetCode - Time Based Key-Value Store", p: "LC", d: "M", u: "https://leetcode.com/problems/time-based-key-value-store/" }
          ],
          notes: [
            "Sketch: <code>Cache{storage: Storage, policy: EvictionPolicy, capacity}</code>; <code>LRUPolicy{dll, map key -> node}</code>; <code>LFUPolicy</code>; <code>CacheFactory</code>.",
            "Dummy head/tail sentinels remove null checks in DLL code.",
            "Store the key in the node so eviction can delete from the map.",
            "Put on existing key = update value + move to front, no eviction.",
            "Real examples: Guava/Caffeine caches (W-TinyLFU), Redis allkeys-lru (approximate sampling), CPU caches, KV cache eviction in LLM serving."
          ],
          cases: [
            "Capacity 0 or 1.",
            "put existing key updates recency.",
            "get on missing / expired key.",
            "Concurrent get and put on the same key.",
            "LFU tie-break by recency within same frequency."
          ],
          qa: [
            { q: "Why doubly linked list and not a singly linked list or array?", a: "Removing an arbitrary node (on access) in O(1) needs the previous pointer; an array would need O(n) shifting. The hash map gives O(1) lookup of the node." },
            { q: "How would you make the cache pluggable for LRU/LFU?", a: "Separate storage from policy: Cache calls policy hooks on add/access/remove and asks policy.evict() for a victim when full. New policies implement the interface; Cache code is unchanged (Strategy)." }
          ],
          code: `class Node:
    __slots__ = ("k", "v", "prev", "next")
    def __init__(self, k=None, v=None): self.k, self.v, self.prev, self.next = k, v, None, None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap, self.map = capacity, {}
        self.head, self.tail = Node(), Node()          # sentinels
        self.head.next, self.tail.prev = self.tail, self.head

    def _remove(self, n):
        n.prev.next, n.next.prev = n.next, n.prev
    def _add_front(self, n):
        n.prev, n.next = self.head, self.head.next
        self.head.next.prev = n; self.head.next = n

    def get(self, k):
        n = self.map.get(k)
        if not n: return -1
        self._remove(n); self._add_front(n); return n.v

    def put(self, k, v):
        if self.cap == 0: return
        if k in self.map:
            n = self.map[k]; n.v = v; self._remove(n); self._add_front(n); return
        if len(self.map) == self.cap:
            lru = self.tail.prev; self._remove(lru); del self.map[lru.k]
        n = Node(k, v); self.map[k] = n; self._add_front(n)`
        },
        {
          id: "logger-framework",
          title: "Logger framework",
          est: "0.5 day",
          why: "Tests Chain of Responsibility, Singleton, Strategy (formatters/appenders) and async I/O design - asked at Atlassian, Microsoft, Flipkart.",
          learn: [
            "Clarify: log levels (DEBUG < INFO < WARN < ERROR < FATAL), multiple sinks (console, file, remote), per-logger configuration, formats, async writing, rotation, thread safety.",
            "Entities: <code>Logger</code>{name, level, appenders}, <code>LogMessage</code>{level, ts, msg, thread, context}, <code>Appender</code>/<code>Sink</code> interface (Console, File, DB), <code>Formatter</code> interface (plain, JSON), <code>LoggerFactory</code>/<code>LogManager</code>, <code>LoggerConfig</code>.",
            "Patterns: Singleton (LogManager), Chain of Responsibility (level handlers or hierarchical loggers propagating to parent), Strategy (formatter, appender), Observer (appenders subscribed to logger), Factory.",
            "Async logging: producer-consumer - callers enqueue LogMessage into a bounded queue; a background thread drains to appenders; policy on full queue (block/drop).",
            "Hierarchical loggers: <code>a.b.c</code> inherits level/appenders from <code>a.b</code> (as in Python logging / log4j).",
            "Thread safety: appender writes serialised (lock per appender) to avoid interleaved lines."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: Logger with level filtering, console + file appenders, plain/JSON formatters, async queue, config by name", p: "BUILD", d: "M" },
            { t: "Add a RotatingFileAppender (size-based) without touching Logger", p: "BUILD", d: "M" },
            { t: "Python docs - logging HOWTO (study the real design)", p: "DOC", d: "E", u: "https://docs.python.org/3/howto/logging.html" },
            { t: "awesome-low-level-design - logging framework", p: "GH", d: "E", u: "https://github.com/ashishps1/awesome-low-level-design" }
          ],
          notes: [
            "Sketch: <code>LogManager</code>(singleton) -> <code>Logger{name, level, appenders[]}</code>; <code>Appender{formatter: Formatter}.append(LogMessage)</code>; <code>AsyncAppender</code> decorator wrapping any appender with a queue + worker thread.",
            "Real designs: Python <code>logging</code> (Logger, Handler, Formatter, Filter, propagation), log4j/Logback appenders, SLF4J facade.",
            "Level check first (cheap) before building the message - lazy formatting (<code>log.debug(\"x=%s\", x)</code>).",
            "Async appender must flush on shutdown (atexit / shutdown hook).",
            "Structured JSON logs with correlation/request id are the production default."
          ],
          cases: [
            "Logging from many threads - lines must not interleave.",
            "Disk full / remote sink down - must not crash the app; fallback appender.",
            "Queue full in async mode - block, drop oldest, or drop DEBUG first.",
            "Messages lost at shutdown without flush.",
            "Recursive logging inside an appender (appender logs an error)."
          ],
          qa: [
            { q: "Which patterns would you use in a logging framework?", a: "Singleton/registry for LogManager, Factory for loggers by name, Strategy for formatters and appenders, Chain of Responsibility for level-based handling or parent propagation, Decorator for async/buffered appenders, Observer for multiple appenders on one logger." },
            { q: "How do you keep logging from slowing down requests?", a: "Cheap level check, lazy message formatting, and an async appender: enqueue to a bounded in-memory queue and write on a background thread with batching; define a back-pressure policy and flush on shutdown." }
          ]
        }
      ]
    },
    {
      name: "Level 3 · Machine coding rounds",
      desc: "Full 90-120 minute problems in the style of Flipkart / Swiggy / Razorpay / Uber rounds. Time yourself, write runnable code with a driver and tests, then review against the extensibility checklist.",
      topics: [
        {
          id: "kv-store-ttl-txn",
          title: "In-memory key-value store with TTL & transactions",
          est: "1 day",
          why: "Very common machine-coding prompt (Razorpay, Zeta, Atlassian, Rippling); tests data structure choice, expiry handling and nested transaction semantics.",
          learn: [
            "Clarify: value types (string only or typed attributes), commands (SET, GET, DELETE, EXPIRE/TTL, INCR), TTL precision, transactions (BEGIN/COMMIT/ROLLBACK, nested?), isolation between concurrent clients, search by value/attribute, persistence (no).",
            "Entities: <code>KVStore</code> interface, <code>InMemoryStore</code>, <code>Entry</code>{value, expiresAt}, <code>Transaction</code>{writes: dict, deletes: set}, <code>TransactionManager</code> (stack of transactions), <code>ExpiryManager</code>, <code>Clock</code>, <code>CommandParser</code> (Command pattern).",
            "TTL: lazy expiry on read (treat expired as missing) + active sweep with a min-heap (expiresAt, key) and version check to skip stale heap entries.",
            "Transactions: stack of write-sets (local changes overlay); GET checks stack top-down then base store; COMMIT merges top into parent (or base if outermost); ROLLBACK pops. Use a tombstone for deletes.",
            "Patterns: Command (each CLI command), Strategy (eviction if size-bounded), Decorator (TTL layer / logging layer over a basic store), Singleton (store instance optional).",
            "Concurrency: global RW lock or striped locks per key; per-client transaction context (thread-local / session object) for isolation.",
            "Extensibility: secondary index for 'find keys where attr=value', eviction policy (LRU) when memory-bounded, snapshot/persistence via append-only log."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: SET/GET/DEL with TTL, BEGIN/COMMIT/ROLLBACK nested, command-line driver, tests with fake clock", p: "BUILD", d: "H" },
            { t: "Add secondary index: keys with attribute 'city=Bangalore'", p: "BUILD", d: "M" },
            { t: "Add 50 concurrent clients each with own session/transaction", p: "BUILD", d: "H" },
            { t: "LeetCode - Time Based Key-Value Store", p: "LC", d: "M", u: "https://leetcode.com/problems/time-based-key-value-store/" },
            { t: "LeetCode - Snapshot Array", p: "LC", d: "M", u: "https://leetcode.com/problems/snapshot-array/" },
            { t: "workat.tech - key-value store machine coding", p: "workat.tech", d: "M", u: "https://workat.tech/machine-coding/practice" }
          ],
          notes: [
            "Sketch: <code>KVStore</code> -> <code>InMemoryStore{data: dict[key, Entry], expiry_heap}</code>; <code>Session{txn_stack: list[dict]}</code>; <code>TOMBSTONE</code> sentinel; <code>Command</code> classes Set/Get/Del/Begin/Commit/Rollback parsed by <code>CommandParser</code>.",
            "Nested transactions as overlay stack is the classic answer (Redis MULTI is not nested - clarify which semantics they want).",
            "SET without TTL on an existing key with TTL: clarify whether TTL is cleared (Redis clears it).",
            "Inject Clock; tests advance fake time.",
            "Separate parsing (CLI) from store logic - interviewers penalise logic inside the input loop."
          ],
          cases: [
            "GET on an expired key inside a transaction.",
            "ROLLBACK / COMMIT with no active transaction -> 'NO TRANSACTION'.",
            "DELETE then SET same key inside a transaction (tombstone replaced).",
            "Commit of a nested txn followed by rollback of the outer - nested changes must be undone.",
            "TTL of 0 or negative.",
            "Heap holding stale expiry for a key that was re-set with new TTL."
          ],
          qa: [
            { q: "How do you implement nested transactions?", a: "Each BEGIN pushes an empty write-set dict. Writes go to the top; deletes write a tombstone. Reads scan the stack from top to bottom, then the base store. COMMIT merges the top into the one below (or applies to base if it's the last); ROLLBACK discards the top. All O(depth) reads, O(changes) commits." },
            { q: "How do you expire keys efficiently?", a: "Lazy: check expiresAt on every read and delete if expired. Active: a min-heap of (expiresAt, key, version) drained by a background thread or on each operation, skipping entries whose version no longer matches. Redis does lazy + random sampling." }
          ],
          code: `import heapq, time

TOMBSTONE = object()

class KVStore:
    def __init__(self, clock=time.monotonic):
        self.data: dict[str, tuple] = {}         # key -> (value, expires_at|None)
        self.txns: list[dict] = []               # overlay stack (per session in real impl)
        self.heap: list = []
        self.clock = clock

    def _alive(self, entry):
        return entry is not None and (entry[1] is None or entry[1] > self.clock())

    def set(self, key, value, ttl=None):
        exp = self.clock() + ttl if ttl else None
        entry = (value, exp)
        if self.txns: self.txns[-1][key] = entry
        else:
            self.data[key] = entry
            if exp: heapq.heappush(self.heap, (exp, key))

    def get(self, key):
        for layer in reversed(self.txns):
            if key in layer:
                e = layer[key]
                return None if e is TOMBSTONE or not self._alive(e) else e[0]
        e = self.data.get(key)
        if e and not self._alive(e): del self.data[key]; return None
        return e[0] if e else None

    def delete(self, key):
        if self.txns: self.txns[-1][key] = TOMBSTONE
        else: self.data.pop(key, None)

    def begin(self): self.txns.append({})
    def rollback(self):
        if not self.txns: raise RuntimeError("NO TRANSACTION")
        self.txns.pop()
    def commit(self):
        if not self.txns: raise RuntimeError("NO TRANSACTION")
        top = self.txns.pop()
        if self.txns: self.txns[-1].update(top); return
        for k, e in top.items():
            if e is TOMBSTONE: self.data.pop(k, None)
            else: self.data[k] = e

    def sweep(self):
        now = self.clock()
        while self.heap and self.heap[0][0] <= now:
            _, k = heapq.heappop(self.heap)
            e = self.data.get(k)
            if e and e[1] is not None and e[1] <= now: del self.data[k]`
        },
        {
          id: "pub-sub-queue",
          title: "Pub-sub / message queue",
          est: "1 day",
          why: "Frequently asked at Flipkart, Swiggy, PhonePe machine coding; tests producer-consumer concurrency, offsets and retry/dead-letter design.",
          learn: [
            "Clarify: topics, multiple publishers and subscribers, push vs pull, consumer groups (each message to one consumer per group), ordering guarantees, retention, retries, dead-letter queue, message filtering, at-least-once vs at-most-once.",
            "Entities: <code>Broker</code>/<code>QueueService</code>, <code>Topic</code>{name, messages: list (append-only log), subscribers}, <code>Message</code>{id, payload, ts, headers}, <code>Publisher</code>, <code>Subscriber</code> interface <code>consume(msg)</code>, <code>SubscriptionWorker</code>{offset}, <code>ConsumerGroup</code>.",
            "Kafka-like model: per-topic append-only log + per-subscriber offset; allows replay (reset offset) and independent consumers.",
            "Push model: one worker thread per subscription waits on a Condition until new messages beyond its offset exist, then calls subscriber.consume().",
            "Patterns: Observer (core), Producer-Consumer, Strategy (retry/backoff policy, partitioning), Command (message handlers), Factory.",
            "Concurrency: topic-level lock for append; condition variable to wake workers; per-subscriber thread so slow consumers don't block others.",
            "Reliability: ack after processing, retry N times with backoff, then DLQ; idempotent consumers for at-least-once delivery."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: create topic, publish, subscribe multiple consumers each with own worker thread, offsets, reset offset", p: "BUILD", d: "H" },
            { t: "Add retries with exponential backoff and a dead-letter topic", p: "BUILD", d: "M" },
            { t: "Add consumer groups: one message delivered to exactly one member of a group (round-robin)", p: "BUILD", d: "H" },
            { t: "LeetCode - Design Bounded Blocking Queue", p: "LC", d: "M", u: "https://leetcode.com/problems/design-bounded-blocking-queue/" },
            { t: "Refactoring Guru - Observer", p: "RG", d: "E", u: "https://refactoring.guru/design-patterns/observer" }
          ],
          notes: [
            "Sketch: <code>Broker{topics: dict[name, Topic]}</code>; <code>Topic{log: list[Message], cond: Condition, workers: list[SubscriptionWorker]}</code>; <code>SubscriptionWorker(Thread){subscriber, offset}</code>; <code>Subscriber.consume(msg)</code>.",
            "Storing messages once and per-subscriber offsets is cheaper than copying to per-subscriber queues and gives replay.",
            "Ordering: guaranteed per topic (or per partition) only with a single consumer thread per subscription.",
            "Use <code>while</code> with <code>cond.wait()</code>; notify_all on publish.",
            "Real systems: Kafka (log + offsets + consumer groups), RabbitMQ (queues + acks + DLX), Redis Streams, Google Pub/Sub."
          ],
          cases: [
            "Slow subscriber shouldn't block publisher or other subscribers.",
            "Subscriber throws - retry, then DLQ; don't kill the worker thread.",
            "Unsubscribe while a message is being processed.",
            "Publishing to a non-existent topic.",
            "Unbounded log growth - retention by size/time.",
            "Duplicate delivery on retry -> consumer idempotency by message id."
          ],
          qa: [
            { q: "Push vs pull model?", a: "Push: broker delivers to subscribers - low latency but must handle slow consumers (buffering/back-pressure). Pull: consumers fetch at their own pace using offsets (Kafka) - natural back-pressure and replay, slightly higher latency." },
            { q: "How do you guarantee at-least-once delivery?", a: "Advance the subscriber's offset (ack) only after consume() succeeds; on failure retry with backoff, then move to a DLQ. Consumers must be idempotent since a crash after processing but before ack causes redelivery." }
          ],
          code: `import threading
from dataclasses import dataclass, field
import itertools, time

@dataclass
class Message:
    payload: object
    id: int = field(default_factory=itertools.count().__next__)

class Subscriber:
    def __init__(self, name): self.name = name
    def consume(self, msg: Message): print(self.name, "got", msg.payload)

class Topic:
    def __init__(self, name):
        self.name, self.log = name, []
        self.cond = threading.Condition()

    def publish(self, msg: Message):
        with self.cond:
            self.log.append(msg); self.cond.notify_all()

class SubscriptionWorker(threading.Thread):
    def __init__(self, topic: Topic, sub: Subscriber, max_retries=3):
        super().__init__(daemon=True)
        self.topic, self.sub, self.offset, self.max_retries = topic, sub, 0, max_retries
        self.dlq: list[Message] = []

    def run(self):
        while True:
            with self.topic.cond:
                while self.offset >= len(self.topic.log):
                    self.topic.cond.wait()
                msg = self.topic.log[self.offset]
            for attempt in range(self.max_retries):
                try: self.sub.consume(msg); break
                except Exception: time.sleep(0.01 * 2 ** attempt)
            else:
                self.dlq.append(msg)
            self.offset += 1                     # ack after processing

    def reset_offset(self, n: int):
        with self.topic.cond:
            self.offset = n; self.topic.cond.notify_all()`
        },
        {
          id: "cab-booking",
          title: "Cab booking (Uber / Ola LLD)",
          est: "1-1.5 days",
          why: "Asked at Uber India, Ola, Rapido, Swiggy; tests matching strategy, trip state machine, pricing (surge) and concurrent driver assignment.",
          learn: [
            "Clarify: riders and drivers registration, driver location updates, ride types (mini/sedan/auto), matching rule (nearest within radius), fare (base + per km + per min + surge), trip lifecycle, cancellation fees, ratings, payment.",
            "Entities: <code>Rider</code>, <code>Driver</code>{id, vehicle, location, status: AVAILABLE/ON_TRIP/OFFLINE, rating}, <code>Vehicle</code>{type}, <code>Location</code>{lat, lng}, <code>RideRequest</code>, <code>Trip</code>{id, rider, driver, pickup, drop, status, fare}, <code>Payment</code>.",
            "Interfaces: <code>DriverMatchingStrategy</code> (nearest, highest-rated, least-recently-assigned), <code>FareStrategy</code> (per vehicle type, surge multiplier), <code>LocationIndex</code> (grid/geohash buckets; quadtree mention).",
            "Trip State: REQUESTED -> DRIVER_ASSIGNED -> DRIVER_ARRIVED -> IN_PROGRESS -> COMPLETED; CANCELLED from early states.",
            "Patterns: Strategy (matching, pricing, payment), State (trip), Observer (notify rider/driver of status), Factory (vehicle types), Singleton (service registry).",
            "Concurrency: two requests matched to the same driver - atomic compare-and-set driver status AVAILABLE -> RESERVED; driver offer timeout -> next candidate.",
            "Extensibility: pooling/share rides, scheduled rides, new vehicle category, surge by zone, promo codes."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: add drivers with location, request ride (nearest available within X km), start/end trip, fare calc, rider trip history", p: "BUILD", d: "H" },
            { t: "Add surge pricing as a decorator over FareStrategy based on demand/supply ratio", p: "BUILD", d: "M" },
            { t: "Concurrency test: 20 simultaneous ride requests, 5 drivers - no driver assigned twice", p: "BUILD", d: "H" },
            { t: "workat.tech - cab booking machine coding", p: "workat.tech", d: "M", u: "https://workat.tech/machine-coding/practice" },
            { t: "Concept && Coding - Uber/cab booking LLD", p: "YT", d: "M", u: "https://www.youtube.com/results?search_query=uber+cab+booking+low+level+design" }
          ],
          notes: [
            "Sketch: <code>RideService.request(riderId, pickup, drop, type)</code> -> <code>DriverMatchingStrategy.find(candidates)</code> over <code>LocationIndex</code> -> <code>Trip</code>(State) ; <code>FareStrategy.compute(trip)</code> ; <code>NotificationService</code>(Observer); repositories for Rider/Driver/Trip.",
            "Location index: bucket drivers by grid cell (floor(lat/d), floor(lng/d)); search the cell and neighbours; Haversine for distance.",
            "Separate DriverService (status, location updates) from TripService (lifecycle) from PricingService.",
            "Fare = max(minFare, base + perKm*km + perMin*min) * surge; integer paise.",
            "Mention HLD scaling hooks: geo-sharding, websockets for location, Redis GEO for nearby search."
          ],
          cases: [
            "No driver available within radius - widen radius or return 'no cabs'.",
            "Driver rejects/times out - offer to next candidate.",
            "Rider cancels after driver assigned - cancellation fee rules.",
            "Driver goes offline mid-trip.",
            "Same rider requesting two rides concurrently.",
            "Payment failure after trip completion - mark due, block next ride."
          ],
          qa: [
            { q: "How do you match a rider to the nearest driver efficiently?", a: "Index available drivers in a spatial structure (grid/geohash buckets or quadtree). Query the rider's cell plus neighbours, compute distances, sort/heap by distance (or the strategy's score), then atomically reserve the best candidate. Update the index on location pings and status changes." },
            { q: "How do you avoid assigning a driver to two trips?", a: "Driver status transition AVAILABLE -> RESERVED must be atomic (per-driver lock or CAS on a version). If the CAS fails, try the next candidate. At scale: Redis/DB conditional update." }
          ]
        },
        {
          id: "food-delivery",
          title: "Food delivery (Swiggy / Zomato LLD)",
          est: "1-1.5 days",
          why: "Home-turf question for Swiggy and Zomato interviews and popular elsewhere; combines catalogue, cart, order state machine and delivery assignment.",
          learn: [
            "Clarify: restaurants with menus and timings, search by cuisine/location/rating, cart from single restaurant, order placement and payment, restaurant accept/reject, delivery partner assignment, live status, ratings, coupons, cancellations.",
            "Entities: <code>Restaurant</code>{id, location, menu, isOpen, rating}, <code>Menu</code>/<code>MenuItem</code>{price, available}, <code>Customer</code>, <code>Cart</code>{restaurant, items}, <code>Order</code>{id, items, status, amount, deliveryPartner}, <code>DeliveryPartner</code>{location, status}, <code>Payment</code>, <code>Rating</code>.",
            "Order State: PLACED -> ACCEPTED -> PREPARING -> READY -> PICKED_UP -> DELIVERED; CANCELLED / REJECTED branches.",
            "Interfaces: <code>RestaurantSearchStrategy</code>/filters, <code>DeliveryAssignmentStrategy</code> (nearest free partner to restaurant, batching), <code>PricingStrategy</code> (delivery fee, surge, packaging), <code>PaymentProcessor</code>, <code>NotificationChannel</code>.",
            "Patterns: State (order), Strategy (assignment, pricing, payment), Observer (status to customer/restaurant/partner), Composite (menu categories), Builder (order), Facade (OrderFacade.placeOrder).",
            "Concurrency: item stock/availability updates vs ordering, partner assignment race, order status updates from multiple actors.",
            "Extensibility: grocery (Instamart-style) reusing Cart/Order, scheduled orders, multiple restaurants per order, loyalty."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: onboard restaurants + menus, search, add to cart, place order with payment stub, restaurant accept, assign delivery partner, status updates", p: "BUILD", d: "H" },
            { t: "Add a rating system that updates restaurant averages in O(1)", p: "BUILD", d: "E" },
            { t: "LeetCode - Design a Food Rating System", p: "LC", d: "M", u: "https://leetcode.com/problems/design-a-food-rating-system/" },
            { t: "workat.tech - food ordering machine coding", p: "workat.tech", d: "M", u: "https://workat.tech/machine-coding/practice" },
            { t: "awesome-low-level-design - food delivery", p: "GH", d: "M", u: "https://github.com/ashishps1/awesome-low-level-design" }
          ],
          notes: [
            "Sketch: <code>RestaurantService</code>(catalogue, search) ; <code>CartService</code> ; <code>OrderService.place(cart, payment)</code> -> <code>Order</code>(State) ; <code>DeliveryService</code> uses <code>DeliveryAssignmentStrategy</code> ; <code>NotificationService</code> observes order events.",
            "Cart is single-restaurant: adding from another restaurant -> prompt to clear (classic Swiggy behaviour).",
            "Snapshot item prices into OrderLine at order time - menu price changes later must not affect the order.",
            "Assign delivery partner when restaurant accepts (or near READY) to cut idle time - mention it as a business trade-off.",
            "Keep status transitions validated in one place (State classes or a transition table)."
          ],
          cases: [
            "Restaurant closes / item becomes unavailable between cart and checkout.",
            "Payment success but restaurant rejects -> refund.",
            "No delivery partner available - retry with widening radius, notify customer of delay.",
            "Customer cancels after preparation started - partial/no refund policy.",
            "Duplicate order placement on double-tap -> idempotency key.",
            "Coupon valid for restaurant/min order value only."
          ],
          qa: [
            { q: "How do you model the order lifecycle so new states are easy to add?", a: "State pattern (or a transition table) where each state defines allowed events and next states; OrderService calls order.handle(event). Each transition publishes an OrderStatusChanged event that notification/analytics observers consume." },
            { q: "How do you choose a delivery partner?", a: "DeliveryAssignmentStrategy: candidates = free partners within radius of the restaurant (grid index); score by distance, ETA to restaurant vs food ready time, and fairness; atomically reserve the top one with an offer timeout, then fall back to the next." }
          ]
        },
        {
          id: "ecommerce-cart",
          title: "E-commerce cart + inventory + coupons",
          est: "1 day",
          why: "Flipkart / Meesho / Myntra favourite; tests coupon rule engine extensibility and inventory reservation correctness.",
          learn: [
            "Clarify: product catalogue and variants, inventory per warehouse/SKU, cart operations, price calculation (MRP, discounts, tax, shipping), coupon types (flat, percent with cap, BOGO, category-specific, min cart value, first order), stackable?, checkout and stock reservation, order cancellation.",
            "Entities: <code>Product</code>/<code>SKU</code>, <code>Inventory</code>{sku -> available, reserved}, <code>Cart</code>{user, items: sku -> qty}, <code>CartItem</code>, <code>Coupon</code>{code, rules, validity, usageLimit}, <code>Order</code>, <code>PriceBreakup</code>.",
            "Coupon engine: <code>Coupon</code> = list of <code>Condition</code>s (MinCartValue, CategoryIn, UserFirstOrder, DateRange) + one <code>Discount</code> action (Flat, Percent(cap), BuyXGetY) - Specification + Strategy patterns.",
            "Price pipeline: subtotal -> item-level discounts -> cart coupon -> tax -> shipping; Chain of Responsibility / Decorator of PriceCalculators.",
            "Inventory: reserve on checkout (available -> reserved) with TTL; commit on payment, release on failure/timeout.",
            "Concurrency: last-unit race between two checkouts - atomic decrement under per-SKU lock or optimistic version; coupon usage limit race.",
            "Extensibility: new coupon type = new Condition/Discount class; new tax rule; multiple sellers."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: add/remove items, compute price breakup, apply best coupon among eligible, checkout with inventory reservation", p: "BUILD", d: "H" },
            { t: "Add BuyXGetY and category-specific coupons without editing CouponService", p: "BUILD", d: "M" },
            { t: "Concurrent checkout of last unit by 10 threads - exactly one succeeds", p: "BUILD", d: "M" },
            { t: "Refactoring Guru - Chain of Responsibility", p: "RG", d: "M", u: "https://refactoring.guru/design-patterns/chain-of-responsibility" }
          ],
          notes: [
            "Sketch: <code>CartService</code> ; <code>PricingEngine{calculators: list[PriceStep]}</code> ; <code>Coupon{conditions: list[Condition], discount: Discount}</code> ; <code>InventoryService.reserve/commit/release(sku, qty)</code> ; <code>CheckoutService</code> orchestrates (Facade).",
            "Store money in paise; percent coupon = min(subtotal * pct / 100, cap).",
            "Coupon validation should return a reason (expired, min value not met) - good UX and good interview signal.",
            "Reservation TTL keeps stock from being locked forever by abandoned checkouts.",
            "Price snapshot at checkout; cart is recalculated each time it is viewed."
          ],
          cases: [
            "Quantity exceeding stock; item goes out of stock while in cart.",
            "Coupon expired / usage limit reached concurrently.",
            "Removing an item makes the applied coupon invalid (min cart value).",
            "Discount larger than item price -> floor at 0.",
            "Payment failure -> release reservation.",
            "Multiple coupons stacking rules."
          ],
          qa: [
            { q: "How do you design coupons so marketing can add new types?", a: "Separate eligibility from effect: a Coupon has Condition objects (Specification pattern, composable with AND/OR) and a Discount strategy. New types are new Condition or Discount classes registered in a factory; config/JSON defines coupons, CouponService just evaluates." },
            { q: "How do you avoid overselling?", a: "At checkout atomically move qty from available to reserved (per-SKU lock or conditional update <code>WHERE available >= qty</code>). Confirm on payment success, release on failure or TTL expiry." }
          ]
        },
        {
          id: "atm",
          title: "ATM system",
          est: "0.5-1 day",
          why: "Classic State + Chain of Responsibility problem; asked at banks/fintech (PhonePe, Paytm, Goldman, JPMC India).",
          learn: [
            "Clarify: card + PIN auth, operations (withdraw, balance, deposit, transfer, mini statement), denominations and cash availability, daily limits, wrong PIN attempts, multiple accounts per card, bank network calls.",
            "Entities: <code>ATM</code>{state, cashDispenser, cardReader, keypad, screen}, <code>Card</code>, <code>Account</code>{balance}, <code>BankService</code> (interface to bank), <code>Transaction</code>{type, amount, status}, <code>CashDispenser</code>.",
            "States: Idle -> CardInserted -> Authenticated -> TransactionSelected -> (Dispensing) -> Idle; plus OutOfCash/Maintenance.",
            "Cash dispensing via Chain of Responsibility (2000 -> 500 -> 200 -> 100) with available note counts; verify feasibility before debiting.",
            "Patterns: State (ATM), Chain of Responsibility (dispenser), Strategy (transaction types), Facade (BankService), Command (transactions).",
            "Consistency: debit account and dispense cash must be atomic from the user's view - reserve funds, dispense, then commit; reverse on dispense failure.",
            "Concurrency: joint account withdrawals from two ATMs simultaneously -> bank-side lock / conditional update on balance."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: insert card, PIN (3 attempts), balance, withdraw with denomination chain, eject card - using State classes", p: "BUILD", d: "M" },
            { t: "LeetCode - Design an ATM Machine", p: "LC", d: "M", u: "https://leetcode.com/problems/design-an-atm-machine/" },
            { t: "LeetCode - Simple Bank System", p: "LC", d: "M", u: "https://leetcode.com/problems/simple-bank-system/" },
            { t: "Concept && Coding - ATM LLD", p: "YT", d: "M", u: "https://www.youtube.com/results?search_query=concept+and+coding+atm+low+level+design" }
          ],
          notes: [
            "Sketch: <code>ATM{state: ATMState, dispenser: CashDispenser(chain), bank: BankService}</code>; <code>ATMState</code> -> Idle/HasCard/Authenticated/Dispensing/OutOfService; <code>NoteHandler(2000)->(500)->(100)</code>.",
            "Dispense check is greedy with available counts; if result leaves remainder, reject before touching the account.",
            "Bank calls via an interface so tests use a fake bank.",
            "Card retained after 3 wrong PINs (state transition + event).",
            "Transaction log for audit and reversal."
          ],
          cases: [
            "Amount not a multiple of smallest note.",
            "ATM has enough total cash but wrong denominations.",
            "Network failure after debit, before dispense -> auto-reversal.",
            "Daily limit exceeded.",
            "Card removed / session timeout mid-transaction.",
            "Concurrent withdrawals from the same account."
          ],
          qa: [
            { q: "How do you guarantee the user isn't debited without getting cash?", a: "Two-phase approach: ask the bank to hold/reserve funds, dispense cash, then confirm the debit; if dispensing fails, release the hold. If the ATM crashes, reconciliation from the transaction log reverses unconfirmed holds." },
            { q: "Why Chain of Responsibility for dispensing?", a: "Each denomination handler dispenses as many notes as it can and passes the remainder on; adding/removing denominations is just reconfiguring the chain, and each handler tracks its own note count." }
          ]
        },
        {
          id: "hotel-booking",
          title: "Hotel booking system",
          est: "1 day",
          why: "Tests date-range availability, overlapping reservations and booking concurrency (MakeMyTrip, OYO, Airbnb-style questions).",
          learn: [
            "Clarify: hotels and room types, search by city/dates/guests, pricing per night (weekday/weekend/seasonal), hold during payment, cancellation policy, overbooking allowed?, check-in/out, housekeeping status.",
            "Entities: <code>Hotel</code>, <code>RoomType</code>{capacity, amenities}, <code>Room</code>{number, type, status}, <code>Reservation</code>{id, guest, room/roomType, checkIn, checkOut, status}, <code>Guest</code>, <code>Payment</code>, <code>Invoice</code>.",
            "Availability: either per-room list of booked date intervals (overlap check <code>a.start &lt; b.end and b.start &lt; a.end</code>) or per room-type per-date inventory counts (scales better).",
            "Reservation State: PENDING (held) -> CONFIRMED -> CHECKED_IN -> CHECKED_OUT; CANCELLED/EXPIRED.",
            "Patterns: Strategy (pricing, cancellation policy), State (reservation), Observer (notifications), Factory (room types), Builder (search query).",
            "Concurrency: two bookings for the last room on overlapping dates - lock per (hotel, roomType) or per-date inventory row with conditional decrement for every night.",
            "Extensibility: dynamic pricing, loyalty, add-ons (breakfast), multiple room booking in one reservation."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: add hotel/rooms, search availability for date range, book with hold + confirm, cancel with policy-based refund", p: "BUILD", d: "H" },
            { t: "LeetCode - My Calendar I (interval overlap core)", p: "LC", d: "M", u: "https://leetcode.com/problems/my-calendar-i/" },
            { t: "LeetCode - My Calendar II", p: "LC", d: "M", u: "https://leetcode.com/problems/my-calendar-ii/" },
            { t: "awesome-low-level-design - hotel management", p: "GH", d: "M", u: "https://github.com/ashishps1/awesome-low-level-design" }
          ],
          notes: [
            "Sketch: <code>Hotel</code> -> <code>RoomType</code> -> <code>Room[]</code>; <code>Inventory{(roomType, date) -> available}</code>; <code>ReservationService.hold/confirm/cancel</code>; <code>PricingStrategy.price(roomType, dates)</code>; <code>CancellationPolicy</code>.",
            "Dates are half-open [checkIn, checkOut) - checkout day is free for the next guest.",
            "Assign the specific room at check-in, book room <i>type</i> at reservation time - more flexibility, fewer conflicts.",
            "Booking multiple nights = all-or-nothing decrement across dates.",
            "Use sorted interval lists or a balanced BST (SortedList) per room for overlap queries."
          ],
          cases: [
            "Check-out date before or equal to check-in.",
            "Back-to-back bookings sharing the boundary date.",
            "Hold expiry while payment pending.",
            "Cancellation within free window vs late cancellation fee.",
            "Room under maintenance removed from inventory for some dates.",
            "Timezone of the hotel vs user."
          ],
          qa: [
            { q: "How do you check availability for a date range efficiently?", a: "Keep per room-type per-date available counts; a range query checks min(available) over the nights - O(nights). Booking decrements each night atomically under a per-room-type lock. Per-room interval trees/sorted lists work for assigning specific rooms." },
            { q: "How do you handle concurrent bookings for the last room?", a: "Make 'check all nights available + decrement' atomic: per (hotel, roomType) lock in-memory, or DB conditional updates in one transaction (<code>UPDATE inventory SET avail = avail - 1 WHERE avail > 0</code> for each date, rollback if any fails)." }
          ]
        },
        {
          id: "task-scheduler",
          title: "Task scheduler / cron",
          est: "1 day",
          why: "Tests priority queues, worker threads, condition variables and retries - asked at Atlassian, Rubrik, Nutanix, Uber.",
          learn: [
            "Clarify: one-time vs recurring (fixed rate / fixed delay / cron expression), priorities, number of worker threads, task cancellation, retries and timeouts, task dependencies (DAG), persistence across restarts.",
            "Entities: <code>Task</code> interface <code>run()</code>, <code>ScheduledTask</code>{id, task, nextRunAt, interval/cron, priority, retries}, <code>Scheduler</code>{min-heap by nextRunAt, workers}, <code>Worker</code> thread pool, <code>Trigger</code> (OneTime, FixedRate, Cron), <code>RetryPolicy</code>.",
            "Core loop: dispatcher thread peeks heap; if top due -> pop and submit to worker pool; else <code>cond.wait(timeout=top.nextRunAt - now)</code>; new earlier tasks notify the condition.",
            "Recurring: after run (fixed delay) or at schedule time (fixed rate), compute next time from Trigger and re-push.",
            "Patterns: Command (Task), Strategy (Trigger, RetryPolicy), Observer (task completion listeners), Producer-Consumer (dispatcher -> workers), Singleton.",
            "Concurrency: heap guarded by lock + condition; cancellation flags checked before run; long tasks must not block dispatcher.",
            "Extensibility: DAG dependencies (topological ordering, run when parents complete), distributed scheduling (leader election, DB-backed queue)."
          ],
          practice: [
            { t: "Implement core flow in <=90 min: schedule(task, delay), scheduleAtFixedRate, cancel, N worker threads, dispatcher with condition wait, demo with prints", p: "BUILD", d: "H" },
            { t: "Add retries with backoff and a per-task timeout", p: "BUILD", d: "M" },
            { t: "Add task dependencies (DAG) - run only when all parents succeed", p: "BUILD", d: "H" },
            { t: "LeetCode - Task Scheduler (greedy warm-up)", p: "LC", d: "M", u: "https://leetcode.com/problems/task-scheduler/" },
            { t: "LeetCode - Course Schedule II (DAG ordering)", p: "LC", d: "M", u: "https://leetcode.com/problems/course-schedule-ii/" }
          ],
          notes: [
            "Sketch: <code>Scheduler{heap: [(nextRunAt, seq, ScheduledTask)], cond: Condition, pool: ThreadPoolExecutor}</code>; <code>ScheduledTask{task: Task, trigger: Trigger, cancelled}</code>; <code>Trigger.next(after) -> time</code>.",
            "Add a sequence counter to heap tuples to break ties and avoid comparing Task objects.",
            "Java reference: <code>ScheduledThreadPoolExecutor</code> (DelayedWorkQueue); Python: <code>sched</code>, APScheduler, Celery beat.",
            "Fixed rate vs fixed delay: fixed rate schedules from the planned start (can bunch if slow); fixed delay from completion.",
            "Lazy cancellation: mark cancelled and skip when popped (heap removal is O(n))."
          ],
          cases: [
            "New task earlier than current top - dispatcher must wake (notify).",
            "Task throws - log, retry per policy, don't kill the worker.",
            "Task runs longer than its interval (overlap) - skip or queue next run.",
            "Cancel a task currently running.",
            "Clock changes - use monotonic time for delays.",
            "Graceful shutdown: stop accepting, finish running tasks."
          ],
          qa: [
            { q: "How does the dispatcher avoid busy waiting?", a: "It waits on a condition variable with timeout = time until the earliest task. schedule() pushes to the heap and notifies, so if the new task is earlier the dispatcher wakes and recomputes the wait." },
            { q: "How would you make the scheduler distributed?", a: "Store tasks in a DB/Redis sorted set keyed by nextRunAt; workers poll/claim due tasks atomically (UPDATE ... WHERE status='PENDING' or ZPOPMIN / leases with visibility timeout); leader election for cron materialisation; idempotent tasks for at-least-once execution." }
          ],
          code: `import heapq, itertools, threading, time
from concurrent.futures import ThreadPoolExecutor

class Scheduler:
    def __init__(self, workers=4, clock=time.monotonic):
        self.heap, self.seq = [], itertools.count()
        self.cond = threading.Condition()
        self.pool = ThreadPoolExecutor(max_workers=workers)
        self.clock, self.cancelled, self.running = clock, set(), True
        threading.Thread(target=self._loop, daemon=True).start()

    def schedule(self, fn, delay=0.0, interval=None) -> int:
        tid = next(self.seq)
        with self.cond:
            heapq.heappush(self.heap, (self.clock() + delay, tid, fn, interval))
            self.cond.notify()
        return tid

    def cancel(self, tid):
        with self.cond: self.cancelled.add(tid)

    def _loop(self):
        while self.running:
            with self.cond:
                while not self.heap:
                    self.cond.wait()
                run_at, tid, fn, interval = self.heap[0]
                wait = run_at - self.clock()
                if wait > 0:
                    self.cond.wait(timeout=wait); continue
                heapq.heappop(self.heap)
                if tid in self.cancelled: continue
                if interval:                                  # fixed rate
                    heapq.heappush(self.heap, (run_at + interval, tid, fn, interval))
            self.pool.submit(self._safe, fn)

    @staticmethod
    def _safe(fn):
        try: fn()
        except Exception as e: print("task failed:", e)`
        },
        {
          id: "in-memory-file-system",
          title: "File system (in-memory)",
          est: "1 day",
          why: "Composite pattern showcase; asked at Microsoft, Atlassian, Rubrik, Google; LeetCode has direct versions.",
          learn: [
            "Clarify: operations (mkdir -p, ls, create/read/write/append file, delete, move/rename, find by name/extension/size), path format, permissions, size of directory, search filters combinable?",
            "Entities: <code>FSNode</code> abstract {name, parent, createdAt}, <code>File</code>{content, size}, <code>Directory</code>{children: dict name -> FSNode}, <code>FileSystem</code>{root} with path resolution, <code>Path</code> utility.",
            "Composite: <code>size()</code>, <code>ls()</code>, <code>delete()</code> work uniformly on files and directories.",
            "Search: <code>Filter</code> interface (NameFilter, ExtensionFilter, SizeGreaterThan) composed with And/Or filters - Specification / Strategy; DFS traversal.",
            "Patterns: Composite (tree), Strategy/Specification (search filters), Visitor (size computation, export), Command (operations for undo), Iterator (tree traversal).",
            "Concurrency: RW lock on tree or per-directory locks; move needs locks on both parents in consistent order.",
            "Extensibility: symlinks, permissions (ACL), versioning, quotas."
          ],
          practice: [
            { t: "LeetCode - Design In-Memory File System", p: "LC", d: "H", u: "https://leetcode.com/problems/design-in-memory-file-system/" },
            { t: "LeetCode - Design File System", p: "LC", d: "M", u: "https://leetcode.com/problems/design-file-system/" },
            { t: "Implement core flow in <=90 min: mkdir -p, ls (sorted), write/append/read, rm -r, mv, find with composable filters (ext=.py AND size>1KB)", p: "BUILD", d: "H" },
            { t: "Refactoring Guru - Composite", p: "RG", d: "M", u: "https://refactoring.guru/design-patterns/composite" }
          ],
          notes: [
            "Sketch: <code>FSNode</code>(abstract) -> <code>File{content}</code>, <code>Directory{children: dict}</code>; <code>FileSystem{root}.resolve(path, create=False)</code>; <code>Filter</code> -> NameFilter/ExtFilter/SizeFilter/AndFilter/OrFilter.",
            "Path resolution: split on '/', ignore empty parts, walk children; create intermediate dirs for mkdir -p.",
            "ls on a file returns just that file name (LC 588 detail).",
            "Directory size computed recursively or cached with invalidation up the parent chain.",
            "Real world: Unix inodes separate metadata from names (hard links) - nice depth point."
          ],
          cases: [
            "Path to a file used as a directory (/a/file.txt/b).",
            "Creating a file where a directory with the same name exists.",
            "mv a directory into its own subdirectory.",
            "Delete root / non-empty directory without recursive flag.",
            "Trailing slashes, '.', '..' in paths.",
            "Name collisions on move/rename."
          ],
          qa: [
            { q: "Why Composite here?", a: "Files and directories form a part-whole tree; clients want to call size(), delete(), ls() on either without type checks. A common FSNode interface lets Directory delegate to children recursively." },
            { q: "How do you implement a flexible search (e.g. .py files larger than 1MB)?", a: "Define a Filter interface <code>matches(node)</code> with concrete filters and composite And/Or/Not filters (Specification pattern); a DFS over the tree yields nodes where filter.matches is true. New criteria = new filter class." }
          ],
          code: `from abc import ABC, abstractmethod

class FSNode(ABC):
    def __init__(self, name, parent=None): self.name, self.parent = name, parent
    @abstractmethod
    def size(self) -> int: ...

class File(FSNode):
    def __init__(self, name, parent=None): super().__init__(name, parent); self.content = ""
    def size(self): return len(self.content)

class Directory(FSNode):
    def __init__(self, name, parent=None): super().__init__(name, parent); self.children = {}
    def size(self): return sum(c.size() for c in self.children.values())

class FileSystem:
    def __init__(self): self.root = Directory("")

    def _walk(self, path: str, create_dirs=False) -> FSNode:
        node = self.root
        for part in [p for p in path.split("/") if p]:
            if not isinstance(node, Directory): raise NotADirectoryError(path)
            if part not in node.children:
                if not create_dirs: raise FileNotFoundError(path)
                node.children[part] = Directory(part, node)
            node = node.children[part]
        return node

    def mkdir(self, path): self._walk(path, create_dirs=True)

    def write(self, path, text, append=True):
        *dirs, name = [p for p in path.split("/") if p]
        d = self._walk("/".join(dirs), create_dirs=True)
        f = d.children.setdefault(name, File(name, d))
        if not isinstance(f, File): raise IsADirectoryError(path)
        f.content = f.content + text if append else text

    def ls(self, path="/"):
        n = self._walk(path)
        return [n.name] if isinstance(n, File) else sorted(n.children)

    def find(self, path, pred):
        stack = [self._walk(path)]
        while stack:
            n = stack.pop()
            if pred(n): yield n
            if isinstance(n, Directory): stack.extend(n.children.values())`
        },
        {
          id: "stackoverflow-feed",
          title: "Stack Overflow / social media feed LLD",
          est: "1 day",
          why: "Tests modelling of users, content, votes, reputation and feed generation (fan-out, ranking strategies) - asked at Atlassian, ShareChat, LinkedIn, Microsoft.",
          learn: [
            "Clarify (Stack Overflow): post questions/answers/comments, tags, upvote/downvote (one per user), accept answer, reputation rules, search by tag/keyword, badges, close/flag moderation.",
            "Clarify (feed): follow users, create posts, like/comment, news feed of followed users sorted by time or rank, pagination.",
            "Entities (SO): <code>User</code>{reputation}, <code>Question</code>, <code>Answer</code>, <code>Comment</code>, <code>Tag</code>, <code>Vote</code>{user, target, type}; abstract <code>Post</code>/<code>Votable</code> with votes and author.",
            "Entities (feed): <code>User</code>{followers, following}, <code>Post</code>{id, author, ts, likes}, <code>FeedService</code>, <code>FeedRankingStrategy</code> (chronological, engagement score).",
            "Feed generation: pull (merge k sorted post lists of followees with a heap at read time - LC 355) vs push (fan-out on write to follower timelines) vs hybrid for celebrities.",
            "Patterns: Observer (notify followers / question author on new answer; reputation updates on vote events), Strategy (ranking, reputation rules), Composite (comment threads), Factory.",
            "Concurrency: vote counting races (atomic counters, one vote per user via set), concurrent feed writes."
          ],
          practice: [
            { t: "LeetCode - Design Twitter", p: "LC", d: "M", u: "https://leetcode.com/problems/design-twitter/" },
            { t: "Implement core flow in <=90 min (SO): post question/answer/comment, vote with reputation changes, accept answer, search by tag, top questions", p: "BUILD", d: "H" },
            { t: "Implement core flow in <=90 min (feed): follow/unfollow, post, like, paginated feed with chronological and score-based ranking strategies", p: "BUILD", d: "H" },
            { t: "awesome-low-level-design - Stack Overflow / social network", p: "GH", d: "M", u: "https://github.com/ashishps1/awesome-low-level-design" }
          ],
          notes: [
            "Sketch (SO): <code>Post</code>(abstract: id, author, body, votes) -> <code>Question{title, tags, answers, acceptedAnswer}</code>, <code>Answer</code>; <code>Comment</code>; <code>VoteService</code> emits VoteCast -> <code>ReputationService</code>(Observer); <code>SearchIndex{tag -> questions}</code>.",
            "Sketch (feed): <code>UserService</code>(follow graph) ; <code>PostRepo{author -> list[Post] by time}</code> ; <code>FeedService.get_feed(user, cursor, limit)</code> using heap merge + <code>RankingStrategy</code>.",
            "Votes keyed by (user, post) so a change from up to down is an update, not a second vote.",
            "Cursor-based pagination (last seen ts/id), not offsets, for feeds.",
            "Reputation rules as config (+10 answer upvote, +15 accepted, -2 downvote) - Strategy/table driven."
          ],
          cases: [
            "User voting on own post / voting twice / changing vote.",
            "Accepting an answer then unaccepting - reputation reversal.",
            "Deleted post still in someone's feed cache.",
            "Unfollow should remove posts from subsequent feed pages.",
            "Celebrity with millions of followers (push fan-out too expensive).",
            "Feed ties on timestamp -> secondary sort by id for stable pagination."
          ],
          qa: [
            { q: "Push vs pull feed generation?", a: "Pull (fan-out on read): merge followees' recent posts at request time with a heap - cheap writes, expensive reads. Push (fan-out on write): append post id to each follower's timeline - fast reads, expensive for users with many followers. Hybrid: push for normal users, pull for celebrities at read time." },
            { q: "How do you keep reputation consistent with votes?", a: "VoteService is the single writer of votes (upsert per user/post) and publishes VoteChanged(old, new) events; ReputationService applies the delta for (new - old). Idempotent event handling plus periodic recomputation guard against drift." }
          ]
        }
      ]
    }
  ]
});
