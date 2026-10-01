/* Switch Prep - Object-Oriented Programming tab */
PREP.add({
  id: "oop",
  order: 30,
  group: "Core CS",
  title: "Object-Oriented Programming",
  short: "OOP",
  blurb: "Concepts, language specifics and the questions interviewers love to ask.",
  intro: [
    "OOP shows up in three places in the switch loop: <b>CS fundamentals rounds</b> (definitions, pillars, 'what happens when...'), <b>language deep-dives</b> (Python/Java/C++ specifics such as MRO, hashCode contract, virtual destructors) and as the <b>foundation of LLD / machine coding</b>. If you cannot explain composition vs inheritance or SOLID with your own example, the LLD round goes badly regardless of patterns knowledge.",
    "Strategy: for every concept have (1) a one-line definition, (2) a 10-line code example in your main language, (3) a real example from your own work (e.g. 'our LLM provider layer is a Strategy behind an interface'), (4) the classic trap question. Interviewers probe depth with 'why' and 'what if' follow-ups, not definitions.",
    "As an AI engineer, use Python as the primary language but know the Java/C++ answers to the most-asked questions (virtual dispatch, final, interfaces vs abstract classes, Rule of 3/5) because many interviewers come from Java backgrounds."
  ],
  resources: [
    { n: "Refactoring Guru - Design Patterns", u: "https://refactoring.guru/design-patterns", d: "Best free illustrated explanations of OOP patterns with code in Python/Java/C++." },
    { n: "Head First Object-Oriented Analysis & Design", u: "https://www.oreilly.com/library/view/head-first-object-oriented/0596008678/", d: "Requirements to classes - exactly the thinking LLD rounds test." },
    { n: "Head First Design Patterns (2nd ed.)", u: "https://www.oreilly.com/library/view/head-first-design/9781492077992/", d: "Readable intro to OO principles and the GoF patterns." },
    { n: "GeeksforGeeks - OOP concepts (Java)", u: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/", d: "Quick revision of definitions and the standard interview question bank." },
    { n: "GeeksforGeeks - Python OOP concepts", u: "https://www.geeksforgeeks.org/python-oops-concepts/", d: "Python-flavoured revision." },
    { n: "Python tutorial - Classes", u: "https://docs.python.org/3/tutorial/classes.html", d: "Official: scopes, inheritance, private name mangling, iterators." },
    { n: "Python reference - Data model", u: "https://docs.python.org/3/reference/datamodel.html", d: "The source of truth for dunder methods, __hash__/__eq__, __slots__, metaclasses." },
    { n: "Python - Method Resolution Order (C3)", u: "https://docs.python.org/3/howto/mro.html", d: "How C3 linearization works and why." },
    { n: "Python - dataclasses", u: "https://docs.python.org/3/library/dataclasses.html", d: "frozen, eq, order, slots, field(default_factory=...)." },
    { n: "Oracle Java Tutorials - OOP concepts", u: "https://docs.oracle.com/javase/tutorial/java/concepts/", d: "Official Java intro to classes, inheritance, interfaces." },
    { n: "C++ Core Guidelines", u: "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines", d: "Authoritative rules on classes, destructors, rule of zero/five." },
    { n: "cppreference - Rule of three/five/zero", u: "https://en.cppreference.com/w/cpp/language/rule_of_three", d: "Exact semantics of special member functions." },
    { n: "Effective Java (3rd ed.) - Joshua Bloch", u: "https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/", d: "Items on equals/hashCode, immutability, composition over inheritance - frequently quoted in interviews." }
  ],
  levels: [
    {
      name: "Beginner · The four pillars",
      desc: "Classes and objects, then encapsulation, inheritance, polymorphism and abstraction - with the exact trap questions asked in fundamentals rounds.",
      topics: [
        {
          id: "classes-objects",
          title: "Classes, objects, constructors, this/self, static vs instance",
          est: "1 day",
          why: "Opening questions of every OOP round; also tested indirectly when you write classes in machine coding.",
          learn: [
            "Class = blueprint (state + behaviour); object = instance with its own state in memory. Class members vs instance members.",
            "Constructors: default, parameterised, copy (C++), constructor overloading (Java/C++) vs default args / <code>@classmethod</code> alternative constructors (Python).",
            "Python: <code>__new__</code> creates the object, <code>__init__</code> initialises it. <code>__new__</code> is used for immutables and singletons.",
            "<code>this</code> (Java/C++) is implicit; <code>self</code> (Python) is the explicit first parameter - <code>obj.m()</code> is <code>Cls.m(obj)</code>.",
            "Static / class variables are shared by all instances; instance variables per object. Python trap: mutating a class-level list via one instance affects all.",
            "Static methods: no access to instance state, cannot be overridden polymorphically in Java (they are hidden, not overridden).",
            "Constructor chaining: <code>this(...)</code> / <code>super(...)</code> in Java must be the first statement; <code>super().__init__()</code> in Python is explicit and optional.",
            "Object creation cost: Java objects on heap (escape analysis aside), C++ stack or heap, Python everything is a heap object with a refcount."
          ],
          practice: [
            { t: "Write a BankAccount class with deposit/withdraw, a class-level interest rate and an instance counter", p: "BUILD", d: "E" },
            { t: "Add an alternative constructor <code>from_csv_row</code> using @classmethod", p: "BUILD", d: "E" },
            { t: "Reproduce the mutable class attribute bug (shared list) and fix it", p: "BUILD", d: "E" },
            { t: "GFG - Constructors in Java", p: "GFG", d: "E", u: "https://www.geeksforgeeks.org/constructors-in-java/" },
            { t: "Python docs - Class and instance variables", p: "DOC", d: "E", u: "https://docs.python.org/3/tutorial/classes.html#class-and-instance-variables" }
          ],
          notes: [
            "Definition answer: 'A class bundles data and the operations that keep that data valid; an object is a runtime instance with identity, state and behaviour.'",
            "Identity / state / behaviour is the textbook trio for 'what is an object'.",
            "Java has no destructors; <code>finalize()</code> is deprecated - use try-with-resources / <code>AutoCloseable</code>. Python <code>__del__</code> is not a reliable destructor - use context managers.",
            "Private constructor => no outside instantiation: used by Singleton, static factory methods and utility classes.",
            "Python has no constructor overloading; a second <code>def __init__</code> simply replaces the first.",
            "Static method vs class method (Python): classmethod receives <code>cls</code>, so subclass calls build the subclass - use it for factories."
          ],
          cases: [
            "Default constructor disappears in Java/C++ once you declare any constructor.",
            "Calling an overridable method from a constructor: in Java the subclass override runs before the subclass fields are initialised (sees nulls/zeros). In C++ the base version runs (virtual dispatch is disabled during construction).",
            "<code>def __init__(self, items=[])</code> - mutable default argument shared across calls.",
            "Assigning to <code>self.count</code> when <code>count</code> is a class attribute creates an instance attribute that shadows it, it does not update the shared one."
          ],
          qa: [
            { q: "Can a constructor be private? Why would you do that?", a: "Yes. To control instantiation: Singleton, static factory methods (<code>Integer.valueOf</code>), builder-only construction, or utility classes with only static members." },
            { q: "Difference between __new__ and __init__?", a: "<code>__new__</code> is a static method that allocates and returns the instance (can return an existing one); <code>__init__</code> initialises the already-created instance and returns None. Override <code>__new__</code> for immutable subclasses (e.g. of tuple) or instance caching." },
            { q: "Can static methods be overridden in Java?", a: "No - they are resolved at compile time by the reference type. A same-signature static in a subclass <b>hides</b> the parent's; there is no dynamic dispatch." }
          ],
          code: `class Account:
    interest_rate = 0.04          # class attribute (shared)
    _count = 0

    def __init__(self, owner: str, balance: float = 0.0):
        self.owner = owner        # instance attributes
        self._balance = balance
        Account._count += 1

    @classmethod
    def from_csv_row(cls, row: str) -> "Account":
        owner, bal = row.split(",")
        return cls(owner, float(bal))   # works for subclasses too

    @staticmethod
    def is_valid_amount(x: float) -> bool:
        return x > 0

    def deposit(self, amt: float) -> None:
        if not self.is_valid_amount(amt):
            raise ValueError("amount must be positive")
        self._balance += amt`
        },
        {
          id: "encapsulation",
          title: "Encapsulation & access modifiers",
          est: "0.5 day",
          why: "Asked as 'encapsulation vs abstraction' in nearly every fundamentals round; also judged in machine coding (public mutable fields = red flag).",
          learn: [
            "Encapsulation = bundle data with methods and protect invariants by restricting direct access. Information hiding is the goal; access modifiers are the mechanism.",
            "Java: <code>private</code> (class), default/package-private (package), <code>protected</code> (package + subclasses), <code>public</code>.",
            "C++: <code>private</code>, <code>protected</code>, <code>public</code>; <code>friend</code> breaks encapsulation deliberately; struct defaults to public, class to private.",
            "Python: convention only. <code>_x</code> = internal, <code>__x</code> = name mangling to <code>_Class__x</code> (avoids subclass clashes, not security).",
            "Getters/setters vs <code>@property</code>: start with a plain attribute in Python, upgrade to a property later without breaking callers.",
            "Tell, don't ask: expose behaviour (<code>account.withdraw(100)</code>) not state (<code>account.setBalance(account.getBalance()-100)</code>).",
            "Returning internal mutable collections leaks encapsulation - return copies or unmodifiable views."
          ],
          practice: [
            { t: "Refactor a class with public fields into one that enforces 'balance never negative'", p: "BUILD", d: "E" },
            { t: "Return an unmodifiable view of an internal list (Java <code>List.copyOf</code> / Python tuple)", p: "BUILD", d: "E" },
            { t: "Demonstrate Python name mangling and show it can still be accessed", p: "BUILD", d: "E" },
            { t: "GFG - Encapsulation in Java", p: "GFG", d: "E", u: "https://www.geeksforgeeks.org/encapsulation-in-java/" }
          ],
          notes: [
            "Encapsulation hides <b>how data is stored and kept valid</b>; abstraction hides <b>which implementation is used</b>. Encapsulation is implemented with access control; abstraction with interfaces/abstract classes.",
            "A class with all-public getters and setters for every field is not really encapsulated - it is a struct with ceremony (anemic model).",
            "Invariants belong in one place: the constructor plus the mutating methods.",
            "Protected in Java is wider than in C++ - it also grants package access.",
            "Interview phrasing: 'Encapsulation lets me change the internal representation without touching callers.'"
          ],
          cases: [
            "Getter returning a reference to a mutable <code>Date</code>/list lets callers mutate internal state.",
            "Reflection (Java) and <code>obj._Cls__x</code> (Python) bypass access control - it is a design aid, not security.",
            "Setters that skip validation duplicated elsewhere - keep validation in one method.",
            "Exposing fields only for tests - prefer testing via behaviour or package-private access."
          ],
          qa: [
            { q: "Difference between encapsulation and abstraction?", a: "Encapsulation: bundling state with behaviour and restricting access so invariants hold (access modifiers, private fields). Abstraction: exposing only the essential contract and hiding implementation choice (interfaces, abstract classes). Example: <code>List</code> interface is abstraction; ArrayList keeping its array private is encapsulation." },
            { q: "Does Python support private members?", a: "No enforced privacy. Single underscore is a convention; double underscore triggers name mangling to <code>_ClassName__attr</code> to avoid accidental override in subclasses. 'We are all consenting adults.'" }
          ]
        },
        {
          id: "inheritance",
          title: "Inheritance types, diamond problem & MRO",
          est: "1 day",
          why: "Diamond problem and 'why no multiple inheritance in Java' are perennial questions; Python MRO is a favourite for Python roles.",
          learn: [
            "Types: single, multilevel, hierarchical, multiple, hybrid. Java/C# allow multiple inheritance of <b>interfaces</b> (type) but not classes (state).",
            "IS-A relationship; Liskov substitution decides if inheritance is valid, not shared code.",
            "Diamond problem: D inherits B and C, both inherit A - which A method / how many A sub-objects?",
            "C++ solves with <code>virtual</code> inheritance (single shared A sub-object); without it D contains two A copies and calls are ambiguous.",
            "Java 8 default methods reintroduce a mini-diamond: if two interfaces provide the same default, the class must override and may call <code>X.super.m()</code>.",
            "Python resolves with the C3 linearization MRO: <code>D.__mro__</code> = D, B, C, A, object. <code>super()</code> follows the MRO, not the parent.",
            "Cooperative multiple inheritance: every class calls <code>super().__init__(**kwargs)</code> so each runs exactly once.",
            "Method overriding rules: same signature, covariant return allowed (Java), cannot reduce visibility, cannot throw broader checked exceptions."
          ],
          practice: [
            { t: "Build the diamond in Python, print <code>D.__mro__</code>, and show super() calls each init once", p: "BUILD", d: "M" },
            { t: "Create a C3-inconsistent hierarchy that raises TypeError and explain why", p: "BUILD", d: "M" },
            { t: "Java: two interfaces with same default method - resolve the conflict", p: "BUILD", d: "E" },
            { t: "Python docs - MRO (C3) howto", p: "DOC", d: "M", u: "https://docs.python.org/3/howto/mro.html" },
            { t: "GFG - Multiple inheritance in C++ / diamond problem", p: "GFG", d: "M" }
          ],
          notes: [
            "C3 rules: a class comes before its parents, and parent order in the class statement is preserved (local precedence), and the result is monotonic.",
            "Why Java dropped multiple class inheritance: ambiguity of state and implementation, complexity of constructor ordering; interfaces give the type benefits.",
            "Inheritance is white-box reuse - subclasses depend on parent implementation details (fragile base class problem).",
            "Mixins (Python) are small classes adding one capability, placed left of the main base: <code>class View(LoginRequiredMixin, BaseView)</code>.",
            "In C++, the most-derived class constructs the virtual base directly.",
            "Final classes (<code>final</code> Java, <code>final</code> C++11, <code>@typing.final</code> Python hint) prevent inheritance - String is final for security and immutability."
          ],
          cases: [
            "Calling <code>Parent.__init__(self)</code> explicitly in a diamond runs A's init twice; use super().",
            "<code>class X(A, B)</code> where B subclasses A gives an MRO error (A must come after B).",
            "Overriding <code>equals</code> in a subclass that adds fields breaks symmetry with the parent.",
            "Private methods are not overridden - a same-named method in the subclass is a new method."
          ],
          qa: [
            { q: "What is the diamond problem and how do C++, Java and Python handle it?", a: "Ambiguity when a class inherits the same ancestor via two paths. C++: virtual inheritance (one shared base) or explicit qualification. Java: no multiple class inheritance; for conflicting default methods the class must override. Python: C3 MRO gives a single deterministic order and super() walks it." },
            { q: "What does super() do in Python with multiple inheritance?", a: "It returns a proxy that delegates to the <b>next class in the MRO of the instance's type</b>, not necessarily the direct parent. That's why cooperative classes must all call super() and accept **kwargs." },
            { q: "When should you NOT use inheritance?", a: "When the relationship is HAS-A or 'uses', when the subclass would need to disable parent behaviour (LSP violation, e.g. Square extends Rectangle), or just for code reuse - prefer composition." }
          ],
          code: `class A:
    def __init__(self, **kw):
        print("A"); super().__init__(**kw)

class B(A):
    def __init__(self, **kw):
        print("B"); super().__init__(**kw)

class C(A):
    def __init__(self, **kw):
        print("C"); super().__init__(**kw)

class D(B, C):
    def __init__(self, **kw):
        print("D"); super().__init__(**kw)

D()                  # D B C A  (each once)
print([k.__name__ for k in D.__mro__])  # ['D','B','C','A','object']`
        },
        {
          id: "polymorphism",
          title: "Polymorphism: overloading vs overriding, dynamic dispatch, vtable",
          est: "1 day",
          why: "'Compile-time vs run-time polymorphism' and 'how does virtual dispatch work internally' are among the most-asked OOP questions.",
          learn: [
            "Compile-time (static) polymorphism: method overloading, operator overloading, templates/generics. Resolved by the compiler from argument types.",
            "Run-time (dynamic) polymorphism: overriding + base reference to derived object; method chosen by the runtime type.",
            "C++: only <code>virtual</code> functions dispatch dynamically; each polymorphic class has a <b>vtable</b> (array of function pointers) and each object has a hidden <b>vptr</b>.",
            "Java: all non-static, non-private, non-final instance methods are virtual by default (invokevirtual / invokeinterface).",
            "Python: everything is dynamic - attribute lookup through the MRO at call time; duck typing ('if it quacks').",
            "Overloading in Python does not exist natively - use default args, <code>*args</code>, or <code>functools.singledispatch</code> / <code>singledispatchmethod</code>.",
            "Object slicing (C++): assigning a Derived to a Base by value copies only the Base part - polymorphism lost. Use pointers/references.",
            "Fields are not polymorphic in Java - field access uses the reference type."
          ],
          practice: [
            { t: "Shape hierarchy with area(); compute total area of a mixed list via base type", p: "BUILD", d: "E" },
            { t: "Implement <code>__add__</code>, <code>__eq__</code>, <code>__lt__</code> for a Money class (operator overloading)", p: "BUILD", d: "E" },
            { t: "Use functools.singledispatch to 'overload' a serialize() function", p: "BUILD", d: "M" },
            { t: "C++: show object slicing and fix it with references", p: "BUILD", d: "M" },
            { t: "GFG - Method overloading vs overriding in Java", p: "GFG", d: "E" }
          ],
          notes: [
            "Overloading = same name, different parameter lists, same class (return type alone cannot differ). Overriding = same signature in subclass.",
            "vtable cost: one extra indirection per call and prevents inlining; vptr adds a pointer per object.",
            "Virtual call in a constructor (C++) calls the base version because the vptr points at the base vtable during base construction.",
            "Java <code>@Override</code> annotation catches signature typos at compile time - always mention it.",
            "Python <code>typing.Protocol</code> gives static duck typing (structural subtyping) without inheritance.",
            "Polymorphism is what makes Open/Closed possible: add a new subclass, no if/else on type."
          ],
          cases: [
            "Overload resolution with null / autoboxing in Java (<code>m(Object)</code> vs <code>m(String)</code> with <code>null</code> picks String - most specific).",
            "Static methods and private methods are not polymorphic.",
            "Changing a parameter type in the 'override' creates an overload, silently (missing @Override).",
            "C++: forgetting <code>virtual</code> on the base method -> base version called through base pointer."
          ],
          qa: [
            { q: "How does runtime polymorphism work internally in C++?", a: "Each class with virtual functions has a static vtable of function pointers; each object stores a vptr to its class's vtable set by the constructor. A virtual call loads vptr, indexes the slot, and calls indirectly. Derived classes' vtables replace overridden slots." },
            { q: "Can we overload on return type?", a: "No in Java/C++ - the call site may ignore the return value so the compiler can't choose. (The JVM itself distinguishes by descriptor, which is used for bridge methods, but the language forbids it.)" },
            { q: "Is Python polymorphic without inheritance?", a: "Yes - duck typing: any object with the required methods works (<code>len()</code> works on anything with <code>__len__</code>). Protocols/ABCs formalise it." }
          ]
        },
        {
          id: "abstraction",
          title: "Abstraction: abstract classes vs interfaces",
          est: "0.5 day",
          why: "'Abstract class vs interface - when to use which' is asked in almost every Java/OOP round and directly drives LLD choices.",
          learn: [
            "Abstraction: model the essential contract, hide implementation details.",
            "Abstract class: can have state (fields), constructors, concrete + abstract methods; single inheritance; represents an IS-A family with shared code.",
            "Interface (Java 8+): abstract methods, <code>default</code> and <code>static</code> methods, (Java 9+) private methods, only <code>public static final</code> constants; a class can implement many.",
            "C++ has no interface keyword - a class with only pure virtual functions (<code>= 0</code>) plus a virtual destructor acts as one.",
            "Python: <code>abc.ABC</code> with <code>@abstractmethod</code> prevents instantiation until all are implemented; <code>typing.Protocol</code> for structural interfaces.",
            "Program to an interface, not an implementation - depend on <code>PaymentGateway</code>, not <code>RazorpayGateway</code>.",
            "Abstract class can still have a constructor - it runs when a subclass is constructed."
          ],
          practice: [
            { t: "Design a Notifier interface with Email/SMS/Push implementations", p: "BUILD", d: "E" },
            { t: "Abstract base class Report with template method generate() and abstract steps", p: "BUILD", d: "M" },
            { t: "Rewrite an ABC as a typing.Protocol and type-check with mypy", p: "BUILD", d: "M" },
            { t: "GFG - Difference between abstract class and interface in Java", p: "GFG", d: "E" },
            { t: "Python docs - abc module", p: "DOC", d: "E", u: "https://docs.python.org/3/library/abc.html" }
          ],
          notes: [
            "Rule of thumb: interface for a <b>capability/role</b> (Comparable, Payable, Notifier); abstract class for a <b>family sharing state and code</b> (AbstractList, BaseVehicle).",
            "Interfaces are better for extensibility and testing (mock any implementation); abstract classes better when you need protected shared state or a template method.",
            "Adding a method to an interface breaks all implementors - default methods were added to Java 8 to evolve <code>Collection</code> (e.g. <code>forEach</code>, <code>stream</code>).",
            "Marker interfaces (Serializable, Cloneable) carry no methods - mostly replaced by annotations.",
            "Functional interface = one abstract method, usable with lambdas (Runnable, Comparator)."
          ],
          cases: [
            "Can you instantiate an abstract class? No, but you can create an anonymous subclass.",
            "Abstract class with no abstract methods is legal (prevents instantiation).",
            "Python ABC: forgetting to implement one abstract method -> TypeError only at instantiation, not at class definition.",
            "Interface fields are implicitly static final - 'constant interface' anti-pattern."
          ],
          qa: [
            { q: "Abstract class vs interface - when to use which?", a: "Use an interface to define a role many unrelated classes can play and to allow multiple inheritance of type. Use an abstract class when subclasses share state, constructors or a common algorithm skeleton. Often both: interface for the contract plus an abstract skeletal implementation (e.g. <code>List</code> + <code>AbstractList</code>)." },
            { q: "After Java 8 default methods, what's the difference left?", a: "Interfaces still cannot hold instance state or constructors, all members are public, and a class can implement many. Abstract classes can have instance fields, constructors, protected/private members, but only single inheritance." }
          ]
        }
      ]
    },
    {
      name: "Intermediate · Relationships & language details",
      desc: "How objects relate, how they are copied/compared, and the Python/Java/C++ details that separate 'knows OOP' from 'writes OOP daily'.",
      topics: [
        {
          id: "relationships",
          title: "Association, aggregation, composition; composition over inheritance",
          est: "0.5 day",
          why: "Needed to justify every arrow in an LLD class diagram; 'composition vs inheritance' is a top-5 OOP question.",
          learn: [
            "Association: objects know/use each other, independent lifecycles (Teacher - Student). Can be 1-1, 1-N, N-M, uni/bi-directional.",
            "Aggregation: weak HAS-A, whole-part where parts can exist alone (Team has Players). UML hollow diamond.",
            "Composition: strong HAS-A, parts die with the whole (House has Rooms, Order has OrderLines). UML filled diamond.",
            "Dependency: transient use, e.g. a method parameter (OrderService uses PaymentGateway in one method). UML dashed arrow.",
            "Composition over inheritance: build behaviour by holding collaborators behind interfaces and delegating, instead of subclassing.",
            "Why: inheritance is fixed at compile time, exposes parent internals, explodes combinatorially (FlyingSwimmingDuck); composition is swappable at runtime and testable.",
            "Delegation pattern: wrapper forwards calls to a held object - basis for Decorator, Strategy, Proxy."
          ],
          practice: [
            { t: "Model University/Department/Professor/Course and label each relationship", p: "BUILD", d: "E" },
            { t: "Refactor Duck hierarchy (Head First) to FlyBehavior/QuackBehavior composition", p: "BUILD", d: "M" },
            { t: "Replace an InstrumentedHashSet subclass (Effective Java item 18) with a forwarding wrapper", p: "BUILD", d: "M" },
            { t: "GFG - Association, composition and aggregation in Java", p: "GFG", d: "E" }
          ],
          notes: [
            "Quick test: if the part can be shared or outlives the whole -> aggregation; if created and destroyed by the whole -> composition.",
            "In code, composition usually means the whole constructs the part internally; aggregation means it is injected.",
            "Effective Java 'favor composition over inheritance': InstrumentedHashSet counting adds twice because <code>addAll</code> calls <code>add</code> internally - fragile base class.",
            "Inheritance is still right for true IS-A with LSP and when the framework expects it (template method base classes).",
            "In LLD answers, say 'I'll use composition here so the pricing rule can change without touching ParkingLot'."
          ],
          cases: [
            "Bidirectional association: keep both sides consistent (adding a student to a course must update both).",
            "Cascading delete in composition (deleting Order deletes OrderLines) vs not in aggregation.",
            "Composition causes many small forwarding methods - acceptable cost; Python <code>__getattr__</code> can auto-delegate.",
            "Over-using composition for trivial hierarchies adds indirection without benefit."
          ],
          qa: [
            { q: "Aggregation vs composition with an example?", a: "Both are HAS-A. Aggregation: Department has Professors - professors exist without the department. Composition: Building has Rooms - rooms cannot exist independently and are destroyed with the building." },
            { q: "Why prefer composition over inheritance?", a: "Lower coupling (depend on an interface, not a parent's internals), behaviour swappable at runtime, avoids class explosion and fragile base class issues, easier to unit test with fakes." }
          ]
        },
        {
          id: "object-lifecycle",
          title: "Copying, equality vs identity, hash contract, immutability",
          est: "1 day",
          why: "Shallow vs deep copy and equals/hashCode contract are classic; bugs here show up in caches and dict/set keys in LLD code.",
          learn: [
            "Identity: same object in memory (<code>is</code> in Python, <code>==</code> on references in Java). Equality: same value (<code>==</code>/<code>__eq__</code>, <code>equals()</code>).",
            "Shallow copy: new outer object, inner references shared (<code>copy.copy</code>, <code>list[:]</code>, Java <code>clone()</code> default). Deep copy: recursively copies (<code>copy.deepcopy</code>, handles cycles with a memo).",
            "Contract: if <code>a.equals(b)</code> then <code>a.hashCode()==b.hashCode()</code>. Equal hashes need not mean equal objects.",
            "equals must be reflexive, symmetric, transitive, consistent, and <code>x.equals(null)</code> is false.",
            "Python: defining <code>__eq__</code> sets <code>__hash__ = None</code> (unhashable) unless you define <code>__hash__</code>. Hash must be based on immutable fields.",
            "Immutability: final class, private final fields, no setters, defensive copies in and out. Benefits: thread safety, safe as map keys, caching.",
            "Python immutability: <code>@dataclass(frozen=True)</code>, <code>NamedTuple</code>, tuples; note a tuple holding a list is not deeply immutable.",
            "C++: copy constructor / copy assignment; default is member-wise (shallow for raw pointers -> double free)."
          ],
          practice: [
            { t: "Show a shallow-copy bug with nested lists and fix with deepcopy", p: "BUILD", d: "E" },
            { t: "Put a mutable object in a set, mutate its hashed field, and show it can't be found", p: "BUILD", d: "M" },
            { t: "Write an immutable Money value object (Python frozen dataclass and Java final class)", p: "BUILD", d: "E" },
            { t: "Implement equals/hashCode for Point in Java; break it by omitting hashCode and use a HashSet", p: "BUILD", d: "M" },
            { t: "Python docs - copy module", p: "DOC", d: "E", u: "https://docs.python.org/3/library/copy.html" }
          ],
          notes: [
            "Python small-int and string interning make <code>is</code> sometimes 'work' - never use <code>is</code> for value comparison (only for None/sentinels).",
            "Java <code>String a = \"x\"; String b = new String(\"x\")</code> -> <code>a==b</code> false, <code>a.equals(b)</code> true.",
            "Value objects (Money, Coordinate, Range) should be immutable with value equality; entities (User, Order) have identity via id.",
            "Java records (16+) auto-generate equals/hashCode/toString and are shallowly immutable.",
            "Custom <code>__deepcopy__</code>/<code>__copy__</code> to control copying of expensive resources (DB connections must not be copied).",
            "Using <code>getClass()</code> vs <code>instanceof</code> in equals: getClass keeps symmetry across subclasses."
          ],
          cases: [
            "Overriding equals but not hashCode -> HashMap/HashSet treats equal objects as different.",
            "Mutating a key after insertion into a dict/HashMap -> lookups fail, entry 'lost'.",
            "Floating point fields in equals - compare with tolerance or use BigDecimal/Decimal.",
            "Deep copying objects with cycles or shared references - deepcopy keeps shared structure via memo; naive recursion loops forever."
          ],
          qa: [
            { q: "What is the equals/hashCode contract and what breaks if violated?", a: "Equal objects must have equal hash codes (and hashCode must be consistent while the object is unmodified). If violated, hash-based collections put equal objects in different buckets, so contains/get fail and duplicates appear in sets." },
            { q: "How do you make a class immutable in Java?", a: "Make the class final (or private constructor + factories), all fields private final, no setters, initialise in constructor, defensively copy mutable inputs and outputs, and don't leak <code>this</code> during construction." },
            { q: "Why does a class with __eq__ become unhashable in Python?", a: "Python sets <code>__hash__</code> to None when you override <code>__eq__</code> to prevent the default identity-based hash from violating 'equal objects hash equal'. Define <code>__hash__</code> over the same immutable fields, or use <code>@dataclass(frozen=True)</code>." }
          ]
        },
        {
          id: "python-oop",
          title: "Python OOP specifics: dunders, property, ABC, dataclasses, MRO, metaclasses, __slots__",
          est: "2 days",
          why: "AI/ML roles are Python-first; interviewers check that you know the data model, not just class syntax.",
          learn: [
            "Dunder methods: <code>__repr__</code> vs <code>__str__</code>, <code>__len__</code>, <code>__getitem__</code>, <code>__iter__</code>/<code>__next__</code>, <code>__contains__</code>, <code>__call__</code>, <code>__enter__</code>/<code>__exit__</code>, rich comparisons, <code>__bool__</code>.",
            "<code>@property</code> with setter/deleter for computed or validated attributes; properties are data descriptors.",
            "Descriptors (<code>__get__</code>, <code>__set__</code>, <code>__set_name__</code>) power property, classmethod, staticmethod and ORMs.",
            "<code>@classmethod</code> (receives cls; factories, subclass-aware) vs <code>@staticmethod</code> (plain function in class namespace).",
            "<code>abc.ABC</code>, <code>@abstractmethod</code>, <code>register()</code> for virtual subclasses; <code>collections.abc</code> (Iterable, Mapping) give mixin methods for free.",
            "<code>@dataclass</code>: auto <code>__init__/__repr__/__eq__</code>; options <code>frozen</code>, <code>order</code>, <code>slots</code> (3.10+), <code>kw_only</code>; <code>field(default_factory=list)</code> for mutable defaults; <code>__post_init__</code> for validation.",
            "MRO / C3 and <code>super()</code> in multiple inheritance (see Inheritance topic).",
            "Metaclasses: classes are instances of <code>type</code>; a metaclass customises class creation (<code>__new__</code>/<code>__init__</code> of the class). Prefer <code>__init_subclass__</code> or class decorators for plugin registries.",
            "<code>__slots__</code>: fixed attribute set, no per-instance <code>__dict__</code> -> less memory, faster access; no dynamic attributes, and each class in the hierarchy needs its own slots.",
            "Attribute lookup order: data descriptors on type -> instance <code>__dict__</code> -> non-data descriptors/class attrs -> <code>__getattr__</code>."
          ],
          practice: [
            { t: "Build a Vector class supporting +, *, ==, abs(), len(), iteration and a good __repr__", p: "BUILD", d: "M" },
            { t: "Write a context manager class that times a block; then the same with @contextmanager", p: "BUILD", d: "E" },
            { t: "Plugin registry: auto-register subclasses using __init_subclass__ (then with a metaclass)", p: "BUILD", d: "M" },
            { t: "Typed descriptor that validates positive numbers, used on two attributes", p: "BUILD", d: "H" },
            { t: "Measure memory of 1M objects with and without __slots__ (tracemalloc)", p: "BUILD", d: "M" },
            { t: "Python docs - Descriptor HowTo Guide", p: "DOC", d: "H", u: "https://docs.python.org/3/howto/descriptor.html" },
            { t: "Python docs - Data model", p: "DOC", d: "M", u: "https://docs.python.org/3/reference/datamodel.html" }
          ],
          notes: [
            "<code>__repr__</code> is for developers (ideally eval-able), <code>__str__</code> for users; print falls back to repr if no str.",
            "Return <code>NotImplemented</code> (not raise) from binary dunders for unsupported types so Python tries the reflected operation.",
            "Pydantic models (common in AI work) vs dataclasses: pydantic validates/coerces at runtime; dataclasses do not.",
            "<code>functools.cached_property</code> computes once per instance (needs <code>__dict__</code>, so not with slots).",
            "Metaclass one-liner: 'type creates classes; a metaclass is a subclass of type that hooks into class creation - used by ABCMeta, Django models, enums.'",
            "<code>__call__</code> makes instances callable - PyTorch <code>nn.Module.__call__</code> runs hooks then <code>forward</code>.",
            "<code>__getattr__</code> runs only when normal lookup fails; <code>__getattribute__</code> runs on every access (easy infinite recursion)."
          ],
          cases: [
            "dataclass with <code>items: list = []</code> raises ValueError - use default_factory.",
            "frozen dataclass: assignment in <code>__post_init__</code> needs <code>object.__setattr__</code>.",
            "Defining <code>__eq__</code> without <code>__hash__</code> makes instances unhashable.",
            "<code>__slots__</code> with multiple inheritance: two bases with non-empty slots cause layout conflict.",
            "Property name same as backing attribute (<code>self.x = x</code> inside the x setter) -> infinite recursion."
          ],
          qa: [
            { q: "classmethod vs staticmethod - give a real use case of each.", a: "classmethod: alternative constructors like <code>datetime.fromtimestamp</code>, <code>dict.fromkeys</code> - receives cls so subclasses get instances of themselves. staticmethod: a helper logically grouped with the class but needing no class/instance state, e.g. <code>Validator.is_valid_email(s)</code>." },
            { q: "What is a metaclass and when would you use one?", a: "A metaclass is the class of a class (default <code>type</code>). It intercepts class creation to validate, register or modify classes - e.g. ABCMeta, ORMs mapping fields, enforcing that subclasses define certain attributes. Most needs are now met by <code>__init_subclass__</code> or class decorators, which are simpler." },
            { q: "What does __slots__ do and what's the trade-off?", a: "It declares a fixed set of attributes stored in a compact array instead of a per-instance dict: ~40-50% less memory and slightly faster attribute access. Trade-offs: no new attributes at runtime, no <code>__dict__</code> (unless listed), no weakrefs unless <code>__weakref__</code> is listed, and inheritance must also define slots." }
          ],
          code: `from dataclasses import dataclass, field
from abc import ABC, abstractmethod

class Plugin(ABC):
    registry: dict[str, type] = {}
    def __init_subclass__(cls, name: str = "", **kw):
        super().__init_subclass__(**kw)
        Plugin.registry[name or cls.__name__.lower()] = cls
    @abstractmethod
    def run(self, text: str) -> str: ...

class Upper(Plugin, name="upper"):
    def run(self, text): return text.upper()

@dataclass(frozen=True, slots=True)
class Money:
    amount: int          # paise
    currency: str = "INR"
    def __add__(self, other):
        if not isinstance(other, Money): return NotImplemented
        if other.currency != self.currency: raise ValueError("currency mismatch")
        return Money(self.amount + other.amount, self.currency)

@dataclass
class Cart:
    items: list[Money] = field(default_factory=list)
    @property
    def total(self) -> Money:
        return sum(self.items, Money(0))`
        },
        {
          id: "java-cpp-oop",
          title: "Java / C++ specifics most asked",
          est: "1.5 days",
          why: "Even in Python-first roles, interviewers often ask final/static, virtual destructors, Rule of 3/5 and generics vs templates.",
          learn: [
            "Java <code>final</code>: variable (assign once; reference not object), method (no override), class (no subclass). <code>static</code>: belongs to class; static blocks run at class load.",
            "Java <code>final</code> vs <code>finally</code> vs <code>finalize</code> (deprecated) - classic trick question.",
            "C++ virtual destructor: deleting a Derived through a Base* without virtual ~Base is undefined behaviour (derived destructor not called -> leaks).",
            "Rule of 3: if you define destructor, copy ctor or copy assignment, define all three. Rule of 5 adds move ctor and move assignment. Rule of 0: use RAII members (unique_ptr, vector) and define none.",
            "RAII: acquire resources in constructor, release in destructor - deterministic cleanup; Java equivalent is try-with-resources, Python is <code>with</code>.",
            "Java interface default/static/private methods; functional interfaces and lambdas.",
            "Generics (Java) use type erasure: one compiled class, types checked at compile time, no <code>new T()</code>, no primitives, wildcards <code>? extends</code>/<code>? super</code> (PECS).",
            "Templates (C++) are compile-time code generation per type: zero-cost, can specialise, support non-type params, but bloat binaries and give long errors.",
            "C++ access: <code>override</code> and <code>final</code> specifiers (C++11); pure virtual <code>= 0</code>; <code>explicit</code> constructors avoid implicit conversions.",
            "Java String immutability and the string pool; <code>StringBuilder</code> for concatenation in loops."
          ],
          practice: [
            { t: "C++: write a class owning a raw buffer, implement Rule of 5, then rewrite with Rule of 0 (unique_ptr/vector)", p: "BUILD", d: "H" },
            { t: "C++: demonstrate leak with non-virtual base destructor (print in destructors)", p: "BUILD", d: "M" },
            { t: "Java: generic <code>max(List&lt;? extends T&gt;)</code> with Comparable bound; explain PECS", p: "BUILD", d: "M" },
            { t: "cppreference - Rule of three/five/zero", p: "DOC", d: "M", u: "https://en.cppreference.com/w/cpp/language/rule_of_three" },
            { t: "GFG - final, finally and finalize in Java", p: "GFG", d: "E" }
          ],
          notes: [
            "Virtual destructor rule: any class meant to be used polymorphically (has a virtual function) should have a public virtual destructor, or a protected non-virtual one.",
            "Move semantics: steal resources from rvalues (<code>std::move</code>); mark move ctor <code>noexcept</code> so <code>vector</code> uses it on reallocation.",
            "Type erasure consequences: can't overload <code>m(List&lt;String&gt;)</code> and <code>m(List&lt;Integer&gt;)</code>; <code>instanceof List&lt;String&gt;</code> illegal.",
            "Java has pass-by-value only - object references are passed by value (classic 'swap doesn't work' question).",
            "Static nested vs inner class in Java: inner holds an implicit reference to the outer instance (memory leak risk).",
            "Java <code>static</code> methods can't use <code>this</code>; static initialisation order follows textual order."
          ],
          cases: [
            "<code>final List&lt;X&gt; list</code> can still be mutated - final restricts reassignment only.",
            "Self-assignment in C++ copy assignment - use copy-and-swap idiom.",
            "Throwing from a destructor during stack unwinding -> std::terminate.",
            "Raw type use of generics (<code>List</code> without type) loses compile-time checks and causes heap pollution.",
            "Diamond with default methods in Java requires explicit override."
          ],
          qa: [
            { q: "Why should a base class destructor be virtual?", a: "So that <code>delete basePtr</code> dispatches to the most-derived destructor; otherwise only Base's destructor runs (undefined behaviour, resources in Derived leak)." },
            { q: "What is the Rule of 3/5/0?", a: "If a class manages a resource and needs a custom destructor, it almost certainly needs custom copy ctor and copy assignment (3), and in C++11 also move ctor and move assignment (5). Better: wrap resources in RAII types so the compiler-generated members are correct and you write none (0)." },
            { q: "Java generics vs C++ templates?", a: "Java generics are type-erased: compile-time checks, single bytecode, works only with reference types, no specialisation. C++ templates instantiate code per type at compile time: work with primitives, allow specialisation and metaprogramming, zero runtime overhead but larger binaries and slower compiles." },
            { q: "Is Java pass-by-reference?", a: "No, always pass-by-value. For objects the value passed is the reference, so you can mutate the object but reassigning the parameter doesn't affect the caller." }
          ]
        }
      ]
    },
    {
      name: "Advanced · Design principles",
      desc: "SOLID and friends with violations you can spot, UML you can draw on a whiteboard, and design for errors and testability.",
      topics: [
        {
          id: "solid",
          title: "SOLID with examples and violations",
          est: "2 days",
          why: "Asked directly ('explain SOLID with examples') and used to grade every LLD/machine coding submission.",
          learn: [
            "<b>S</b>ingle Responsibility: a class should have one reason to change (one actor). Invoice should not calculate, print and persist itself.",
            "<b>O</b>pen/Closed: open for extension, closed for modification - add a new DiscountStrategy class rather than editing an if/else chain.",
            "<b>L</b>iskov Substitution: subtypes must be usable wherever the base is expected without breaking expectations - preconditions can't be strengthened, postconditions can't be weakened.",
            "<b>I</b>nterface Segregation: clients shouldn't depend on methods they don't use - split fat <code>Machine{print,scan,fax}</code> into Printer, Scanner, Fax.",
            "<b>D</b>ependency Inversion: high-level modules depend on abstractions, not concretions; abstractions owned by the high-level policy. OrderService depends on PaymentGateway interface.",
            "DIP vs DI vs IoC: DIP is the principle, DI is a technique (pass dependencies in), IoC is the broader idea (framework calls you).",
            "Classic LSP violations: Square extends Rectangle (setWidth changes height), Penguin extends Bird with fly() throwing, ReadOnlyList throwing on add.",
            "Spot violations in code: switch on type (OCP), 'and' in class name (SRP), <code>UnsupportedOperationException</code> overrides (LSP/ISP), <code>new ConcreteX()</code> inside business logic (DIP)."
          ],
          practice: [
            { t: "Refactor an Invoice class doing calc + print + save into 3 classes (SRP)", p: "BUILD", d: "E" },
            { t: "Replace a discount if/else chain with Strategy + registry (OCP)", p: "BUILD", d: "M" },
            { t: "Fix Rectangle/Square LSP violation; write a test that fails on the bad version", p: "BUILD", d: "M" },
            { t: "Split a fat Worker interface (work, eat) for Robot implementations (ISP)", p: "BUILD", d: "E" },
            { t: "Inject an LLMClient interface into a RAG service and test it with a fake (DIP)", p: "BUILD", d: "M" },
            { t: "GFG - SOLID principles with real life examples", p: "GFG", d: "E" }
          ],
          notes: [
            "SRP is about <b>reasons to change</b> (stakeholders), not 'one method per class'.",
            "OCP in practice comes from polymorphism + composition: Strategy, Decorator, plugins.",
            "LSP is a behavioural contract, not just type compatibility - think 'design by contract'.",
            "ISP keeps mocks small and avoids recompiling/redeploying unrelated clients.",
            "DIP enables testability: constructor injection of interfaces -> fakes in unit tests.",
            "Don't over-apply: SOLID for code expected to change; a 50-line script doesn't need five interfaces (YAGNI).",
            "Use one example domain for all five in interviews (e.g. payments or notifications) - it sounds lived-in."
          ],
          cases: [
            "Over-splitting for SRP creates anemic classes and indirection.",
            "OCP doesn't mean never edit code - it means the common variation points are extensible.",
            "LSP violations often hide in exceptions thrown by overrides or in changed side effects.",
            "DIP with a single implementation forever is speculative generality - except at I/O boundaries (DB, HTTP, LLM) where it's worth it for tests."
          ],
          qa: [
            { q: "Explain Liskov Substitution with a real violation.", a: "Square extends Rectangle: code that sets width=5, height=4 and expects area 20 gets 16 for a Square because setHeight also changes width. The subtype breaks the base's postconditions, so it isn't substitutable. Fix: separate Shape types or immutable shapes." },
            { q: "How do you apply Open/Closed in a payment system?", a: "Define <code>PaymentMethod</code> interface (<code>pay(amount)</code>); implement UPI, Card, Wallet. Checkout depends on the interface and gets the right one from a factory/registry. Adding NetBanking = new class + registration, no edits to Checkout." },
            { q: "Difference between Dependency Inversion and Dependency Injection?", a: "DIP is a design principle: both high- and low-level modules depend on abstractions. DI is a technique for providing dependencies from outside (constructor/setter/framework) - commonly used to achieve DIP." }
          ],
          code: `from typing import Protocol

class DiscountRule(Protocol):
    def applies(self, cart) -> bool: ...
    def discount(self, cart) -> int: ...

class FlatOff:
    def __init__(self, min_total: int, off: int):
        self.min_total, self.off = min_total, off
    def applies(self, cart): return cart.total >= self.min_total
    def discount(self, cart): return self.off

class PercentOff:
    def __init__(self, pct: int, cap: int):
        self.pct, self.cap = pct, cap
    def applies(self, cart): return True
    def discount(self, cart): return min(cart.total * self.pct // 100, self.cap)

class PricingService:                    # closed for modification
    def __init__(self, rules: list[DiscountRule]):   # DIP: injected
        self.rules = rules
    def best_discount(self, cart) -> int:
        return max((r.discount(cart) for r in self.rules if r.applies(cart)), default=0)`
        },
        {
          id: "other-principles",
          title: "DRY, KISS, YAGNI, Law of Demeter, coupling & cohesion, GRASP",
          est: "1 day",
          why: "Used to defend design trade-offs in LLD discussions and code reviews; GRASP answers 'who should own this method?'.",
          learn: [
            "DRY: every piece of knowledge has one authoritative representation - about knowledge, not identical-looking code.",
            "KISS: simplest design that works; YAGNI: don't build features/abstractions until needed.",
            "Law of Demeter: talk only to your immediate friends - avoid <code>order.getCustomer().getWallet().debit(x)</code>; prefer <code>order.chargeCustomer(x)</code>.",
            "Coupling = degree of dependence between modules (aim low); cohesion = how related the responsibilities inside a module are (aim high).",
            "Types of coupling (worst to best): content, common (globals), control (flags), stamp, data. Cohesion best: functional.",
            "GRASP: Information Expert (assign to the class with the data), Creator (who creates X - the one that contains/aggregates it), Controller, Low Coupling, High Cohesion, Polymorphism, Pure Fabrication, Indirection, Protected Variations.",
            "Separation of concerns; principle of least astonishment; fail fast.",
            "Tension: DRY vs decoupling - two services sharing a 'common' model creates coupling; sometimes duplication is cheaper."
          ],
          practice: [
            { t: "Find and fix Law of Demeter violations in a sample checkout module", p: "BUILD", d: "E" },
            { t: "Apply Information Expert: decide where calculateTotal() lives in Order/OrderLine/Product", p: "BUILD", d: "E" },
            { t: "Review a past project of yours: list 3 high-coupling spots and how to fix them", p: "BUILD", d: "M" },
            { t: "Wikipedia - GRASP (object-oriented design)", p: "DOC", d: "M", u: "https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)" }
          ],
          notes: [
            "'Rule of three': tolerate duplication twice, abstract on the third occurrence.",
            "Boolean flag parameters (<code>render(true)</code>) are control coupling - split into two methods.",
            "Pure Fabrication: invent a class not in the domain (Repository, PricingService) to keep cohesion high.",
            "Protected Variations = put a stable interface around what's likely to change (payment provider, LLM vendor).",
            "Fluent builders and streams look like Demeter violations but aren't - each call returns the same/related abstraction."
          ],
          cases: [
            "Premature abstraction (YAGNI violation) for a feature that never arrives.",
            "DRY across bounded contexts creates a shared library everyone fears to change.",
            "God class - low cohesion, high coupling; typically the Manager/Util class.",
            "Over-applying Demeter creates many trivial wrapper methods."
          ],
          qa: [
            { q: "What is the Law of Demeter and why does it matter?", a: "A method should only call methods on itself, its fields, its parameters and objects it creates - not on objects returned by those calls. It reduces coupling to the internal structure of other objects, so changes stay local." },
            { q: "Coupling vs cohesion?", a: "Coupling measures dependencies between modules; cohesion measures how focused a module is. Good design: low coupling, high cohesion - changes are local and modules are easy to understand and reuse." }
          ]
        },
        {
          id: "uml",
          title: "UML class & sequence diagrams for interviews",
          est: "0.5 day",
          why: "LLD rounds start with a class diagram on a whiteboard / Excalidraw; clean notation saves time and signals seniority.",
          learn: [
            "Class box: name, attributes (<code>- balance: int</code>), methods (<code>+ withdraw(amt): void</code>). Visibility: + public, - private, # protected, ~ package.",
            "Inheritance: solid line, hollow triangle to parent. Interface realisation: dashed line, hollow triangle.",
            "Association: solid line (arrow for direction) with multiplicities <code>1</code>, <code>0..1</code>, <code>*</code>, <code>1..*</code>.",
            "Aggregation: hollow diamond at the whole; composition: filled diamond at the whole; dependency: dashed arrow.",
            "Sequence diagram: lifelines, synchronous messages (solid arrow), returns (dashed), activation bars, alt/loop/opt fragments.",
            "Interview-grade shortcut: boxes with key fields/methods, arrows labelled IS-A / HAS-A 1..*, interfaces marked &lt;&lt;interface&gt;&gt;.",
            "Use a sequence diagram for the main flow (e.g. bookSeat: User -> BookingService -> SeatLockManager -> PaymentService)."
          ],
          practice: [
            { t: "Draw the class diagram for a library system with correct multiplicities", p: "BUILD", d: "E" },
            { t: "Draw the sequence diagram for 'park vehicle and pay on exit'", p: "BUILD", d: "M" },
            { t: "Write the same class diagram in Mermaid classDiagram syntax", p: "BUILD", d: "E" },
            { t: "Mermaid - class diagram syntax", p: "DOC", d: "E", u: "https://mermaid.js.org/syntax/classDiagram.html" }
          ],
          notes: [
            "Don't spend more than 10-15 minutes on diagrams in a 90-min round - enough to agree on entities and relationships.",
            "Show only the important methods; mark patterns with notes (&lt;&lt;Strategy&gt;&gt;).",
            "Multiplicity is the most commonly forgotten part - interviewers notice.",
            "Sequence diagrams expose missing responsibilities and concurrency points (where a lock is needed).",
            "Tools: Excalidraw, draw.io, Mermaid, PlantUML."
          ],
          cases: [
            "Confusing the arrow direction of inheritance (arrow points to the parent).",
            "Drawing every getter/setter - noise.",
            "Mixing composition and aggregation diamonds - put the diamond on the whole side.",
            "Forgetting enums (VehicleType, SeatStatus) which drive much of the logic."
          ],
          qa: [
            { q: "How do you show composition vs aggregation in UML?", a: "Both are a line with a diamond on the whole's end: filled (black) diamond for composition (part lifecycle bound to whole), hollow diamond for aggregation (part can exist independently)." },
            { q: "When would you draw a sequence diagram in an LLD interview?", a: "For the critical flow with multiple collaborators or concurrency - e.g. seat booking with lock, payment and confirmation - to show call order, responsibilities and where failures/rollback happen." }
          ]
        },
        {
          id: "errors-di-testability",
          title: "Exceptions & error-handling design, dependency injection & testability",
          est: "1 day",
          why: "Machine coding is graded on handling invalid input and failures, and on code that could be unit tested; senior roles probe these explicitly.",
          learn: [
            "Exceptions vs return codes vs Result/Either types; checked (Java, recoverable) vs unchecked (programming errors).",
            "Design a domain exception hierarchy: <code>BookingError</code> -> <code>SeatUnavailableError</code>, <code>PaymentFailedError</code>; catch specific, not bare <code>except</code>.",
            "Fail fast: validate inputs at boundaries (constructors, public methods) with clear messages.",
            "Don't swallow exceptions; wrap with context (<code>raise X from e</code>, Java cause chaining).",
            "Resource safety: try-with-resources / <code>with</code> / RAII; compensating actions for multi-step operations (release seat lock on payment failure).",
            "Dependency injection: constructor (preferred, explicit), setter, interface injection; DI containers (Spring, Guice, FastAPI <code>Depends</code>).",
            "Testability: inject clocks, random, ID generators, repositories and external clients; avoid static singletons and <code>datetime.now()</code> buried in logic.",
            "Test doubles: dummy, stub, fake, spy, mock - fakes (in-memory repo) make machine-coding demos easy."
          ],
          practice: [
            { t: "Define an exception hierarchy for a booking service and map each to an HTTP status", p: "BUILD", d: "E" },
            { t: "Refactor a class calling datetime.now() and requests.get() internally to take Clock and HttpClient", p: "BUILD", d: "M" },
            { t: "Write pytest tests for a ParkingLot using an in-memory repository fake", p: "BUILD", d: "M" },
            { t: "Python docs - Errors and exceptions tutorial", p: "DOC", d: "E", u: "https://docs.python.org/3/tutorial/errors.html" }
          ],
          notes: [
            "Exceptions for exceptional paths; expected outcomes (seat already booked) can be a result value - pick one style and be consistent.",
            "Error messages should name the entity and value (<code>SpotNotFound(id=F2-17)</code>).",
            "Constructor injection makes dependencies visible and the object valid after construction.",
            "Singletons hurt testability - inject a single instance instead ('singleton scope' in a container).",
            "Idempotency keys + retries are the error-handling story for payments in LLD/HLD crossover questions."
          ],
          cases: [
            "Catching Exception broadly hides bugs like KeyError/NullPointerException.",
            "Partial state updates when an exception happens mid-method - update state after all checks pass, or roll back.",
            "Exceptions used for control flow in hot loops - slow and unclear.",
            "Logging and re-throwing at every layer -> duplicate logs."
          ],
          qa: [
            { q: "Checked vs unchecked exceptions - which do you prefer?", a: "Checked for recoverable conditions the caller must handle (IO), unchecked for programming errors (null, illegal argument). Modern practice leans to unchecked domain exceptions with clear documentation because checked exceptions leak through layers and don't compose with lambdas." },
            { q: "How do you make a class easy to unit test?", a: "Inject its collaborators via constructor behind interfaces (repo, clock, client), keep it free of static/global state, separate pure logic from I/O, and make side effects observable via return values or fakes." }
          ]
        }
      ]
    }
  ]
});
