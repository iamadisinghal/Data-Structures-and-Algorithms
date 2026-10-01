// Free "Read & watch" references for the OOP and LLD tabs.
(function () {
  const RG = "https://refactoring.guru/design-patterns/";
  const PY = "https://docs.python.org/3/";
  const ORA = "https://docs.oracle.com/javase/tutorial/java/";
  const AWE = { n: "awesome-low-level-design (Ashish Pratap Singh, GitHub ashishps1)", u: "https://github.com/ashishps1/awesome-low-level-design", k: "notes" };
  const GROK = { n: "Grokking the Object Oriented Design Interview (free GitHub mirror, tssovi)", u: "https://github.com/tssovi/grokking-the-object-oriented-design-interview", k: "notes" };
  const awe = (d) => Object.assign({}, AWE, { d: d });
  const grok = (d) => Object.assign({}, GROK, { d: d });

  PREP.add({ id: "oop", refs: {
    "classes-objects": [
      { n: "Python docs — Tutorial: Classes", u: PY + "tutorial/classes.html", k: "docs", d: "class vs instance variables, methods, scopes" },
      { n: "Oracle Java Tutorials — Classes and Objects", u: ORA + "javaOO/index.html", k: "docs", d: "constructors, this, static members, nested classes" },
      { n: "Real Python — Object-Oriented Programming (OOP) in Python", u: "https://realpython.com/python3-object-oriented-programming/", k: "article" },
      { n: "cppreference — Classes", u: "https://en.cppreference.com/w/cpp/language/classes", k: "docs", d: "C++ class members, constructors reference" },
      { n: "Corey Schafer — Python OOP Tutorials (Classes and Instances, Class Variables, classmethods and staticmethods)", k: "playlist", d: "best short series for Python OOP basics" },
      { n: "Concept && Coding (Shrayansh Jain) — Java OOPs concepts: classes, objects, constructors", k: "video" }
    ],
    "encapsulation": [
      { n: "Oracle Java Tutorials — Controlling Access to Members of a Class", u: ORA + "javaOO/accesscontrol.html", k: "docs", d: "the private/default/protected/public table" },
      { n: "Python docs — Tutorial: Private Variables (name mangling)", u: PY + "tutorial/classes.html#private-variables", k: "docs" },
      { n: "cppreference — Access specifiers", u: "https://en.cppreference.com/w/cpp/language/access", k: "docs", d: "public/protected/private + friend" },
      { n: "Real Python — Python's property(): Add Managed Attributes to Your Classes", u: "https://realpython.com/python-property/", k: "article", d: "getters/setters done the Pythonic way" },
      { n: "Martin Fowler — Tell Don't Ask", u: "https://martinfowler.com/bliki/TellDontAsk.html", k: "blog", d: "encapsulation as behaviour, not just private fields" },
      { n: "Corey Schafer — Python OOP Tutorial 6: Property Decorators - Getters, Setters, and Deleters", k: "video" }
    ],
    "inheritance": [
      { n: "Oracle Java Tutorials — Interfaces and Inheritance", u: ORA + "IandI/index.html", k: "docs" },
      { n: "Python docs — The Python 2.3 Method Resolution Order (C3 linearization)", u: PY + "howto/mro.html", k: "docs", d: "the definitive MRO / C3 explanation" },
      { n: "Raymond Hettinger — Python's super() considered super!", u: "https://rhettinger.wordpress.com/2011/05/26/super-considered-super/", k: "blog", d: "cooperative multiple inheritance" },
      { n: "isocpp FAQ — Inheritance: Multiple and Virtual Inheritance", u: "https://isocpp.org/wiki/faq/multiple-inheritance", k: "docs", d: "diamond problem + virtual base classes in C++" },
      { n: "Wikipedia — Multiple inheritance (The diamond problem)", u: "https://en.wikipedia.org/wiki/Multiple_inheritance", k: "article" },
      { n: "Raymond Hettinger — Super considered super! (PyCon 2015 talk)", k: "video" },
      { n: "Corey Schafer — Python OOP Tutorial 4: Inheritance - Creating Subclasses", k: "video" }
    ],
    "polymorphism": [
      { n: "Oracle Java Tutorials — Polymorphism", u: ORA + "IandI/polymorphism.html", k: "docs" },
      { n: "Oracle Java Tutorials — Overriding and Hiding Methods", u: ORA + "IandI/override.html", k: "docs", d: "static method hiding vs overriding (classic trick question)" },
      { n: "cppreference — virtual function specifier", u: "https://en.cppreference.com/w/cpp/language/virtual", k: "docs" },
      { n: "Wikipedia — Virtual method table", u: "https://en.wikipedia.org/wiki/Virtual_method_table", k: "article", d: "how vtable/vptr dispatch works" },
      { n: "isocpp FAQ — Inheritance: virtual functions", u: "https://isocpp.org/wiki/faq/virtual-functions", k: "docs" },
      { n: "The Cherno — Virtual Functions in C++", k: "video", d: "clear vtable intuition + cost" },
      { n: "Concept && Coding (Shrayansh Jain) — Polymorphism: method overloading vs overriding in Java", k: "video" }
    ],
    "abstraction": [
      { n: "Oracle Java Tutorials — Abstract Methods and Classes", u: ORA + "IandI/abstract.html", k: "docs", d: "includes abstract class vs interface guidance" },
      { n: "Python docs — abc: Abstract Base Classes", u: PY + "library/abc.html", k: "docs" },
      { n: "PEP 544 — Protocols: Structural subtyping (static duck typing)", u: "https://peps.python.org/pep-0544/", k: "docs", d: "Protocol vs ABC in Python" },
      { n: "Real Python — Implementing an Interface in Python", u: "https://realpython.com/python-interface/", k: "article" },
      { n: "cppreference — Abstract class (pure virtual functions)", u: "https://en.cppreference.com/w/cpp/language/abstract_class", k: "docs" },
      { n: "Telusko — Abstract Class vs Interface in Java", k: "video" }
    ],
    "relationships": [
      { n: "Wikipedia — Composition over inheritance", u: "https://en.wikipedia.org/wiki/Composition_over_inheritance", k: "article" },
      { n: "Real Python — Inheritance and Composition: A Python OOP Guide", u: "https://realpython.com/inheritance-composition-python/", k: "article" },
      { n: "Brandon Rhodes — Python Design Patterns: The Composition Over Inheritance Principle", u: "https://python-patterns.guide/gang-of-four/composition-over-inheritance/", k: "article" },
      { n: "Baeldung — Composition, Aggregation, and Association in Java", k: "article" },
      { n: "CodeAesthetic — The Flaws of Inheritance", k: "video", d: "10-minute case for composition" },
      { n: "Concept && Coding (Shrayansh Jain) — Association, Aggregation and Composition (IS-A vs HAS-A)", k: "video" }
    ],
    "object-lifecycle": [
      { n: "Python docs — copy: Shallow and deep copy operations", u: PY + "library/copy.html", k: "docs" },
      { n: "Python docs — Data model: object.__hash__ and __eq__", u: PY + "reference/datamodel.html#object.__hash__", k: "docs", d: "why defining __eq__ removes __hash__" },
      { n: "Java API — java.lang.Object (equals / hashCode contract)", u: "https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html", k: "docs" },
      { n: "Baeldung — Java equals() and hashCode() Contracts", u: "https://www.baeldung.com/java-equals-hashcode-contracts", k: "article" },
      { n: "Real Python — Python '!=' Is Not 'is not': Comparing Objects in Python", u: "https://realpython.com/python-is-identity-vs-equality/", k: "article", d: "identity vs equality" },
      { n: "Martin Fowler — Value Object", u: "https://martinfowler.com/bliki/ValueObject.html", k: "blog", d: "immutability + value equality" },
      { n: "mCoding — Python shallow vs deep copy / mutable default arguments", k: "video" }
    ],
    "python-oop": [
      { n: "Python docs — Data model (special method names, __slots__, metaclasses)", u: PY + "reference/datamodel.html", k: "docs", d: "the single most important page for dunders" },
      { n: "Python docs — Descriptor HowTo Guide", u: PY + "howto/descriptor.html", k: "docs", d: "how property, classmethod, staticmethod really work" },
      { n: "Python docs — dataclasses", u: PY + "library/dataclasses.html", k: "docs" },
      { n: "Real Python — Python Metaclasses", u: "https://realpython.com/python-metaclasses/", k: "article" },
      { n: "Real Python — Data Classes in Python", u: "https://realpython.com/python-data-classes/", k: "article" },
      { n: "James Powell — So you want to be a Python expert? (PyData Seattle 2017)", k: "video", d: "dunders, metaclasses, decorators, generators, context managers" },
      { n: "mCoding — Python __slots__ / metaclasses explained", k: "video" }
    ],
    "java-cpp-oop": [
      { n: "Oracle Java Tutorials — Interfaces and Inheritance (default methods, Object class, final)", u: ORA + "IandI/index.html", k: "docs" },
      { n: "cppreference — The rule of three/five/zero", u: "https://en.cppreference.com/w/cpp/language/rule_of_three", k: "docs" },
      { n: "isocpp FAQ — Constructors", u: "https://isocpp.org/wiki/faq/ctors", k: "docs" },
      { n: "isocpp FAQ — Destructors", u: "https://isocpp.org/wiki/faq/dtors", k: "docs", d: "virtual destructors, RAII" },
      { n: "isocpp FAQ — Const correctness", u: "https://isocpp.org/wiki/faq/const-correctness", k: "docs" },
      { n: "The Cherno — C++ series (copy constructors, virtual destructors, smart pointers)", k: "playlist" },
      { n: "Concept && Coding (Shrayansh Jain) — Java interview: final, static, String immutability, interfaces", k: "video" }
    ],
    "solid": [
      { n: "Wikipedia — SOLID", u: "https://en.wikipedia.org/wiki/SOLID", k: "article" },
      { n: "DigitalOcean — SOLID: The First 5 Principles of Object Oriented Design", u: "https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design", k: "article", d: "short code example per principle" },
      { n: "Real Python — SOLID Principles: Improve Object-Oriented Design in Python", u: "https://realpython.com/solid-principles-python/", k: "article" },
      { n: "Wikipedia — Liskov substitution principle", u: "https://en.wikipedia.org/wiki/Liskov_substitution_principle", k: "article", d: "pre/postconditions, square-rectangle" },
      { n: "Robert C. Martin (Uncle Bob) — The Single Responsibility Principle (Clean Coder blog)", k: "blog" },
      { n: "Concept && Coding (Shrayansh Jain) — SOLID Principles with Java examples (LLD playlist)", k: "video" },
      { n: "ArjanCodes — Uncle Bob's SOLID Principles Made Easy in Python", k: "video" }
    ],
    "other-principles": [
      { n: "Wikipedia — Law of Demeter", u: "https://en.wikipedia.org/wiki/Law_of_Demeter", k: "article" },
      { n: "Wikipedia — GRASP (object-oriented design)", u: "https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)", k: "article", d: "Information Expert, Creator, Controller, Low Coupling, High Cohesion" },
      { n: "Wikipedia — Don't repeat yourself", u: "https://en.wikipedia.org/wiki/Don%27t_repeat_yourself", k: "article" },
      { n: "Martin Fowler — Yagni", u: "https://martinfowler.com/bliki/Yagni.html", k: "blog" },
      { n: "Wikipedia — Cohesion (computer science)", u: "https://en.wikipedia.org/wiki/Cohesion_(computer_science)", k: "article" },
      { n: "Wikipedia — Coupling (computer programming)", u: "https://en.wikipedia.org/wiki/Coupling_(computer_programming)", k: "article" },
      { n: "Gate Smashers — Coupling and Cohesion in Software Engineering", k: "video" },
    ],
    "uml": [
      { n: "Wikipedia — Class diagram", u: "https://en.wikipedia.org/wiki/Class_diagram", k: "article", d: "relationship arrows and multiplicities" },
      { n: "Wikipedia — Sequence diagram", u: "https://en.wikipedia.org/wiki/Sequence_diagram", k: "article" },
      { n: "Mermaid docs — Class diagrams", u: "https://mermaid.js.org/syntax/classDiagram.html", k: "docs", d: "quick text-based UML for practice" },
      { n: "PlantUML — Class Diagram", u: "https://plantuml.com/class-diagram", k: "docs" },
      { n: "Lucidchart — UML Class Diagram Tutorial", k: "video" },
      { n: "Lucidchart — UML Sequence Diagram Tutorial", k: "video" },
      { n: "Derek Banas — UML 2.0 Tutorial", k: "video" }
    ],
    "errors-di-testability": [
      { n: "Martin Fowler — Inversion of Control Containers and the Dependency Injection pattern", u: "https://martinfowler.com/articles/injection.html", k: "article", d: "the canonical DI article" },
      { n: "Martin Fowler — Mocks Aren't Stubs", u: "https://martinfowler.com/articles/mocksArentStubs.html", k: "article", d: "test doubles vocabulary" },
      { n: "Python docs — Tutorial: Errors and Exceptions", u: PY + "tutorial/errors.html", k: "docs", d: "custom exception classes, chaining" },
      { n: "Python docs — unittest.mock", u: PY + "library/unittest.mock.html", k: "docs" },
      { n: "Oracle Java Tutorials — Exceptions (checked vs unchecked)", u: "https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html", k: "docs" },
      { n: "ArjanCodes — Dependency Injection explained (Python)", k: "video" },
      { n: "CodeAesthetic — Dependency Injection, The Best Pattern", k: "video" }
    ]
  }});

  PREP.add({ id: "lld", refs: {
    "creational-patterns": [
      { n: "Refactoring Guru — Singleton", u: RG + "singleton", k: "article" },
      { n: "Refactoring Guru — Factory Method", u: RG + "factory-method", k: "article" },
      { n: "Refactoring Guru — Abstract Factory", u: RG + "abstract-factory", k: "article" },
      { n: "Refactoring Guru — Builder", u: RG + "builder", k: "article" },
      { n: "Refactoring Guru — Prototype", u: RG + "prototype", k: "article" },
      { n: "Wikipedia — Double-checked locking", u: "https://en.wikipedia.org/wiki/Double-checked_locking", k: "article", d: "why volatile is needed in Java" },
      { n: "Brandon Rhodes — Python Design Patterns: The Singleton Pattern", u: "https://python-patterns.guide/gang-of-four/singleton/", k: "article", d: "Pythonic alternatives (module globals)" },
      { n: "Christopher Okhravi — Design Patterns playlist (Factory Method, Abstract Factory, Singleton, Builder)", k: "playlist" },
      { n: "Concept && Coding (Shrayansh Jain) — Singleton, Factory, Abstract Factory, Builder (LLD playlist)", k: "playlist" }
    ],
    "structural-patterns": [
      { n: "Refactoring Guru — Structural patterns overview", u: RG + "structural-patterns", k: "article" },
      { n: "Refactoring Guru — Adapter", u: RG + "adapter", k: "article" },
      { n: "Refactoring Guru — Decorator", u: RG + "decorator", k: "article" },
      { n: "Refactoring Guru — Facade", u: RG + "facade", k: "article" },
      { n: "Refactoring Guru — Proxy", u: RG + "proxy", k: "article" },
      { n: "Refactoring Guru — Composite", u: RG + "composite", k: "article" },
      { n: "Refactoring Guru — Flyweight", u: RG + "flyweight", k: "article" },
      { n: "Christopher Okhravi — Decorator / Adapter / Facade / Proxy / Composite pattern videos", k: "playlist" },
      { n: "Concept && Coding (Shrayansh Jain) — Decorator, Adapter, Proxy, Composite, Flyweight (LLD playlist)", k: "playlist" }
    ],
    "behavioral-patterns": [
      { n: "Refactoring Guru — Strategy", u: RG + "strategy", k: "article" },
      { n: "Refactoring Guru — Observer", u: RG + "observer", k: "article" },
      { n: "Refactoring Guru — Command", u: RG + "command", k: "article" },
      { n: "Refactoring Guru — State", u: RG + "state", k: "article" },
      { n: "Refactoring Guru — Chain of Responsibility", u: RG + "chain-of-responsibility", k: "article" },
      { n: "Refactoring Guru — Template Method", u: RG + "template-method", k: "article" },
      { n: "Refactoring Guru — Iterator", u: RG + "iterator", k: "article" },
      { n: "Refactoring Guru — Visitor", u: RG + "visitor", k: "article" },
      { n: "Robert Nystrom — Game Programming Patterns (free online book): Command, Observer, State", u: "https://gameprogrammingpatterns.com/", k: "book" },
      { n: "Christopher Okhravi — Strategy / Observer / Command / State / Template Method pattern videos", k: "playlist", d: "Head First based, very intuitive" },
      { n: "Concept && Coding (Shrayansh Jain) — Strategy, Observer, State, Chain of Responsibility (LLD playlist)", k: "playlist" }
    ],
    "lld-concurrency": [
      { n: "OSTEP — Locks (chapter 28)", u: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf", k: "book" },
      { n: "OSTEP — Condition Variables (producer-consumer)", u: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf", k: "book" },
      { n: "Python docs — threading (Lock, RLock, Condition, Semaphore)", u: PY + "library/threading.html", k: "docs" },
      { n: "Oracle Java Tutorials — Concurrency", u: "https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html", k: "docs" },
      { n: "Wikipedia — Optimistic concurrency control", u: "https://en.wikipedia.org/wiki/Optimistic_concurrency_control", k: "article", d: "version-column locking" },
      { n: "Wikipedia — Readers-writers problem", u: "https://en.wikipedia.org/wiki/Readers%E2%80%93writers_problem", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — Java Multithreading, Concurrency and locks playlist", k: "playlist" }
    ],
    "parking-lot": [
      awe("Parking Lot problem: requirements, UML and code in several languages"),
      grok("Design a Parking Lot: use cases, class diagram, code"),
      { n: "Refactoring Guru — Strategy (spot assignment / pricing)", u: RG + "strategy", k: "article" },
      { n: "Refactoring Guru — Factory Method (vehicle / spot creation)", u: RG + "factory-method", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — Design Parking Lot | Low Level Design", k: "video" },
      { n: "Udit Agarwal — Parking Lot machine coding / LLD", k: "video" }
    ],
    "elevator": [
      awe("Elevator System problem with UML and code"),
      { n: "Wikipedia — Elevator algorithm (SCAN / LOOK)", u: "https://en.wikipedia.org/wiki/Elevator_algorithm", k: "article", d: "the scheduling idea behind dispatch" },
      { n: "Refactoring Guru — State (elevator states)", u: RG + "state", k: "article" },
      { n: "Refactoring Guru — Strategy (dispatch strategy)", u: RG + "strategy", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — Design Elevator System | Low Level Design", k: "video" },
      { n: "Soham — Elevator System LLD", k: "video" }
    ],
    "library-management": [
      grok("Design a Library Management System: Book vs BookItem, use cases, class diagram"),
      awe("Library Management System problem with code"),
      { n: "Refactoring Guru — Observer (hold / due-date notifications)", u: RG + "observer", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — Library Management System LLD", k: "video" },
      { n: "Udit Agarwal — Library Management System machine coding", k: "video" }
    ],
    "board-games": [
      awe("Tic Tac Toe, Chess and Snake and Ladder problems with code"),
      grok("Design Chess: pieces, moves, game state"),
      { n: "LeetCode 1275 — Find Winner on a Tic Tac Toe Game", u: "https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game/", k: "article", d: "O(1) win-check via row/col/diag counters" },
      { n: "LeetCode 909 — Snakes and Ladders", u: "https://leetcode.com/problems/snakes-and-ladders/", k: "article" },
      { n: "Robert Nystrom — Game Programming Patterns: Command (undo/redo)", u: "https://gameprogrammingpatterns.com/command.html", k: "book" },
      { n: "Concept && Coding (Shrayansh Jain) — Design Tic Tac Toe | Low Level Design", k: "video" },
      { n: "Concept && Coding (Shrayansh Jain) — Snake and Ladder / Chess LLD", k: "video" }
    ],
    "vending-machine": [
      { n: "Refactoring Guru — State", u: RG + "state", k: "article", d: "the core pattern for this problem" },
      awe("Vending Machine problem with State pattern code"),
      { n: "Robert Nystrom — Game Programming Patterns: State", u: "https://gameprogrammingpatterns.com/state.html", k: "book", d: "finite state machines explained well" },
      { n: "Refactoring Guru — Chain of Responsibility (change dispensing)", u: RG + "chain-of-responsibility", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — Vending Machine LLD using State Design Pattern", k: "video" },
      { n: "Christopher Okhravi — State Pattern", k: "video" }
    ],
    "splitwise": [
      awe("Splitwise problem with code"),
      { n: "Refactoring Guru — Strategy (EQUAL / EXACT / PERCENT split strategies)", u: RG + "strategy", k: "article" },
      { n: "Splitwise debt simplification algorithm explained (min cash flow, greedy with heaps)", k: "article" },
      { n: "GeeksforGeeks — Minimize Cash Flow among a given set of friends who have borrowed money from each other", k: "article" },
      { n: "Udit Agarwal — Splitwise machine coding round / LLD", k: "video" },
      { n: "Concept && Coding (Shrayansh Jain) — Design Splitwise | Low Level Design", k: "video" }
    ],
    "bookmyshow": [
      awe("Movie ticket booking system problem with code"),
      grok("Design a Movie Ticket Booking System: seat reservation, concurrency"),
      { n: "PostgreSQL docs — Explicit Locking (SELECT ... FOR UPDATE, row locks)", u: "https://www.postgresql.org/docs/current/explicit-locking.html", k: "docs", d: "pessimistic seat locking" },
      { n: "Wikipedia — Optimistic concurrency control", u: "https://en.wikipedia.org/wiki/Optimistic_concurrency_control", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — BookMyShow Low Level Design (seat locking)", k: "video" },
      { n: "Udit Agarwal — BookMyShow machine coding / LLD", k: "video" }
    ],
    "rate-limiter-lld": [
      { n: "Stripe Engineering — Scaling your API with rate limiters", u: "https://stripe.com/blog/rate-limiters", k: "blog", d: "token bucket + concurrent-request limiter in production" },
      { n: "Cloudflare Learning Center — What is rate limiting?", u: "https://www.cloudflare.com/learning/bots/what-is-rate-limiting/", k: "article" },
      { n: "Wikipedia — Token bucket", u: "https://en.wikipedia.org/wiki/Token_bucket", k: "article" },
      { n: "system-design-primer (donnemartin)", u: "https://github.com/donnemartin/system-design-primer", k: "notes" },
      awe("Rate Limiter problem with code"),
      { n: "Concept && Coding (Shrayansh Jain) — Rate Limiter design (token bucket, leaky bucket, sliding window)", k: "video" },
      { n: "ByteByteGo — Rate limiting algorithms explained", k: "video" }
    ],
    "lru-cache-lld": [
      { n: "LeetCode 146 — LRU Cache", u: "https://leetcode.com/problems/lru-cache/", k: "article" },
      { n: "LeetCode 460 — LFU Cache", u: "https://leetcode.com/problems/lfu-cache/", k: "article" },
      { n: "Wikipedia — Cache replacement policies", u: "https://en.wikipedia.org/wiki/Cache_replacement_policies", k: "article", d: "LRU, LFU, FIFO, ARC compared" },
      { n: "Python docs — collections.OrderedDict (move_to_end)", u: PY + "library/collections.html#collections.OrderedDict", k: "docs" },
      { n: "Real Python — Caching in Python Using the LRU Cache Strategy", u: "https://realpython.com/lru-cache-python/", k: "article" },
      awe("LRU Cache problem with pluggable eviction policy"),
      { n: "Concept && Coding (Shrayansh Jain) — Design LRU Cache | Low Level Design", k: "video" },
    ],
    "logger-framework": [
      { n: "Python docs — Logging HOWTO (loggers, handlers, formatters, hierarchy)", u: PY + "howto/logging.html", k: "docs", d: "a real-world reference design to copy" },
      { n: "Python docs — logging module", u: PY + "library/logging.html", k: "docs" },
      { n: "Refactoring Guru — Chain of Responsibility (level-based handlers)", u: RG + "chain-of-responsibility", k: "article" },
      { n: "Refactoring Guru — Singleton (logger instance)", u: RG + "singleton", k: "article" },
      { n: "Apache Log4j 2 — Architecture (Loggers, Appenders, Layouts)", k: "docs" },
      awe("Logging Framework problem with code"),
      { n: "Concept && Coding (Shrayansh Jain) — Design Logger | Chain of Responsibility LLD", k: "video" }
    ],
    "kv-store-ttl-txn": [
      { n: "Redis docs — EXPIRE command (how TTLs and lazy + active expiry work)", u: "https://redis.io/docs/latest/commands/expire/", k: "docs" },
      { n: "Redis docs — Transactions (MULTI / EXEC / DISCARD / WATCH)", k: "docs" },
      { n: "Refactoring Guru — Command (undoable operations for rollback)", u: RG + "command", k: "article" },
      { n: "Python docs — heapq (min-heap of expiry times)", u: PY + "library/heapq.html", k: "docs" },
      awe("Key-value store / in-memory database style problems"),
      { n: "Udit Agarwal — In-memory key-value store machine coding", k: "video" },
      { n: "Concept && Coding (Shrayansh Jain) — Design Key-Value Store LLD", k: "video" }
    ],
    "pub-sub-queue": [
      { n: "Wikipedia — Publish-subscribe pattern", u: "https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern", k: "article" },
      { n: "Apache Kafka documentation — Introduction and design (topics, partitions, consumer groups)", u: "https://kafka.apache.org/documentation/", k: "docs" },
      { n: "Refactoring Guru — Observer", u: RG + "observer", k: "article" },
      { n: "Python docs — queue: thread-safe queues", u: PY + "library/queue.html", k: "docs" },
      awe("Pub-Sub system problem with code"),
      { n: "Concept && Coding (Shrayansh Jain) — Design Pub-Sub / Message Queue LLD", k: "video" },
      { n: "Udit Agarwal — Message queue machine coding", k: "video" }
    ],
    "cab-booking": [
      awe("Ride-sharing service (Uber/Ola) problem with code"),
      { n: "Uber Engineering — H3: Uber's Hexagonal Hierarchical Spatial Index", u: "https://www.uber.com/blog/h3/", k: "blog" },
      { n: "Wikipedia — Geohash", u: "https://en.wikipedia.org/wiki/Geohash", k: "article", d: "nearby-driver lookup" },
      { n: "Refactoring Guru — Strategy (matching / fare strategies)", u: RG + "strategy", k: "article" },
      { n: "Refactoring Guru — State (trip lifecycle)", u: RG + "state", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — Uber / Cab booking Low Level Design", k: "video" },
      { n: "Udit Agarwal — Cab booking machine coding", k: "video" }
    ],
    "food-delivery": [
      awe("Food delivery service (Swiggy/Zomato) problem with code"),
      { n: "Refactoring Guru — Observer (order status notifications)", u: RG + "observer", k: "article" },
      { n: "Refactoring Guru — State (order lifecycle)", u: RG + "state", k: "article" },
      { n: "Refactoring Guru — Strategy (delivery partner assignment)", u: RG + "strategy", k: "article" },
      { n: "Swiggy Bytes (engineering blog) — delivery partner assignment / order dispatch posts", k: "blog" },
      { n: "Concept && Coding (Shrayansh Jain) — Zomato / Swiggy Low Level Design", k: "video" }
    ],
    "ecommerce-cart": [
      awe("Online shopping (Amazon) problem with code"),
      grok("Design Amazon - Online Shopping System"),
      { n: "Refactoring Guru — Decorator (stackable discounts)", u: RG + "decorator", k: "article" },
      { n: "Refactoring Guru — Strategy (coupon / pricing rules)", u: RG + "strategy", k: "article" },
      { n: "Refactoring Guru — Chain of Responsibility (coupon validation pipeline)", u: RG + "chain-of-responsibility", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — Amazon / E-commerce Low Level Design", k: "video" },
      { n: "Udit Agarwal — Coupon / cart machine coding", k: "video" }
    ],
    "atm": [
      grok("Design an ATM: use cases, class and activity diagrams"),
      awe("ATM problem with State pattern code"),
      { n: "Refactoring Guru — State (Idle / CardInserted / Authenticated)", u: RG + "state", k: "article" },
      { n: "Refactoring Guru — Chain of Responsibility (2000/500/100 note dispensers)", u: RG + "chain-of-responsibility", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — ATM Low Level Design (State + Chain of Responsibility)", k: "video" },
      { n: "Soham — ATM machine LLD", k: "video" }
    ],
    "hotel-booking": [
      grok("Design a Hotel Management System"),
      awe("Hotel management system problem with code"),
      { n: "PostgreSQL docs — Explicit Locking (prevent double booking of a room-night)", u: "https://www.postgresql.org/docs/current/explicit-locking.html", k: "docs" },
      { n: "Refactoring Guru — Strategy (seasonal / weekend pricing)", u: RG + "strategy", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — Hotel Booking System LLD", k: "video" },
      { n: "Udit Agarwal — Hotel booking machine coding", k: "video" }
    ],
    "task-scheduler": [
      { n: "Java API — ScheduledExecutorService (fixed rate vs fixed delay)", u: "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ScheduledExecutorService.html", k: "docs" },
      { n: "Python docs — sched: Event scheduler", u: PY + "library/sched.html", k: "docs" },
      { n: "Python docs — heapq (priority queue by next run time)", u: PY + "library/heapq.html", k: "docs" },
      { n: "Wikipedia — Cron (cron expression format)", u: "https://en.wikipedia.org/wiki/Cron", k: "article" },
      { n: "CP-Algorithms — Topological sorting (task DAG dependencies)", u: "https://cp-algorithms.com/graph/topological-sort.html", k: "article" },
      awe("Task scheduler problem with code"),
      { n: "Concept && Coding (Shrayansh Jain) — Design Task Scheduler / ScheduledThreadPoolExecutor", k: "video" }
    ],
    "in-memory-file-system": [
      { n: "Refactoring Guru — Composite (File / Directory tree)", u: RG + "composite", k: "article", d: "the core pattern" },
      { n: "Refactoring Guru — Strategy (pluggable, combinable find filters)", u: RG + "strategy", k: "article" },
      { n: "OSTEP — File System Implementation (inodes, directories)", u: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-implementation.pdf", k: "book", d: "background on how real FSes model this" },
      awe("File system style problems with code"),
      { n: "LeetCode 588 — Design In-Memory File System (premium; read discussions)", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — Composite Design Pattern (File System example)", k: "video" }
    ],
    "stackoverflow-feed": [
      grok("Design Stack Overflow: questions, answers, votes, reputation, badges"),
      awe("Stack Overflow and social network problems with code"),
      { n: "LeetCode 355 — Design Twitter (news feed merge of k sorted lists)", u: "https://leetcode.com/problems/design-twitter/", k: "article" },
      { n: "Refactoring Guru — Observer (followers / notifications)", u: RG + "observer", k: "article" },
      { n: "Refactoring Guru — Strategy (feed ranking strategy)", u: RG + "strategy", k: "article" },
      { n: "Concept && Coding (Shrayansh Jain) — Design Stack Overflow | Low Level Design", k: "video" },
      { n: "NeetCode — Design Twitter (LeetCode 355)", k: "video" }
    ]
  }});
})();
