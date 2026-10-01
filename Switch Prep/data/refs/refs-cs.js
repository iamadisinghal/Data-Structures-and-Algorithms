// Free "Read & watch" references for CS fundamentals tabs: DBMS/SQL, OS, Computer Networks.
// Textbook chapters (Galvin, Korth, Kurose-Ross) are listed by chapter number for library / college copies.

PREP.add({ id: 'dbms', refs: {
  'dbms-basics': [
    { n: 'Korth, Silberschatz, Sudarshan — Database System Concepts, Ch 1 (Introduction), Ch 2 (Relational Model), Ch 6 (E-R Model)', k: 'book', d: 'the standard text for three-schema architecture, keys, ER diagrams' },
    { n: 'Database System Concepts — free slides by chapter (db-book.com)', u: 'https://www.db-book.com/', k: 'notes', d: 'authors\' official slide decks, chapters 1, 2, 6' },
    { n: 'Gate Smashers — DBMS playlist (ER model, keys, relational algebra)', k: 'playlist', d: 'Hindi, exam-style, very fast to revise' },
    { n: 'Neso Academy — Database Management Systems playlist', k: 'playlist', d: 'slow, careful build-up of ER model and keys' },
    { n: 'Stanford (Jennifer Widom) — Databases: Relational Algebra lectures', k: 'video', d: 'clean university treatment of select, project, join, division' },
    { n: 'Wikipedia — Relational algebra', u: 'https://en.wikipedia.org/wiki/Relational_algebra', k: 'article', d: 'operator reference incl. division and outer joins' },
    { n: 'Wikipedia — Entity-relationship model', u: 'https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model', k: 'article', d: 'notation variants (Chen, crow\'s foot), weak entities' }
  ],
  'normalization': [
    { n: 'Korth — Database System Concepts, Ch 7 (Relational Database Design)', k: 'book', d: 'FDs, closure, canonical cover, BCNF/3NF decomposition, lossless join' },
    { n: 'Gate Smashers — Normalization, Functional Dependency, Closure, Candidate Key videos', k: 'playlist', d: 'GATE-style numericals on finding keys and normal forms' },
    { n: 'Knowledge Gate — Normalization (1NF, 2NF, 3NF, BCNF) full lecture', k: 'video', d: 'covers dependency preservation and lossless decomposition' },
    { n: 'Jenny\'s Lectures — Normalization in DBMS', k: 'video', d: 'beginner-friendly with worked tables' },
    { n: 'Wikipedia — Database normalization', u: 'https://en.wikipedia.org/wiki/Database_normalization', k: 'article', d: 'one running example through every normal form' },
    { n: 'Wikipedia — Boyce-Codd normal form', u: 'https://en.wikipedia.org/wiki/Boyce%E2%80%93Codd_normal_form', k: 'article', d: 'the 3NF-but-not-BCNF example' },
    { n: 'CMU 15-445 (Andy Pavlo) — course site', u: 'https://15445.courses.cs.cmu.edu/', k: 'course', d: 'older offerings (Fall 2017-2019) have a Functional Dependencies / Normal Forms lecture' }
  ],
  'sql-select-aggregate': [
    { n: 'SQLBolt — interactive SQL lessons', u: 'https://sqlbolt.com/', k: 'course', d: 'lessons 1-12: SELECT, WHERE, aggregates, GROUP BY / HAVING, NULLs' },
    { n: 'Mode — SQL Tutorial (basic + intermediate)', u: 'https://mode.com/sql-tutorial/', k: 'course', d: 'aggregates, GROUP BY, HAVING, CASE, DISTINCT with a live editor' },
    { n: 'PostgreSQL docs — Aggregate Functions (tutorial)', u: 'https://www.postgresql.org/docs/current/tutorial-agg.html', k: 'docs', d: 'why WHERE cannot use aggregates and HAVING can' },
    { n: 'PostgreSQL docs — SELECT reference', u: 'https://www.postgresql.org/docs/current/sql-select.html', k: 'docs', d: 'the processing order spelled out step by step' },
    { n: 'Use The Index Luke — The WHERE Clause', u: 'https://use-the-index-luke.com/sql/where-clause', k: 'article', d: 'how filters and NULLs interact with indexes' },
    { n: 'Korth — Database System Concepts, Ch 3 (Introduction to SQL)', k: 'book', d: 'NULLs and three-valued logic, aggregates' },
    { n: 'Gate Smashers — SQL queries playlist (GROUP BY, HAVING, aggregate functions)', k: 'playlist' }
  ],
  'sql-joins': [
    { n: 'PostgreSQL docs — Joins Between Tables (tutorial)', u: 'https://www.postgresql.org/docs/current/tutorial-join.html', k: 'docs', d: 'inner, outer, self joins with examples' },
    { n: 'PostgreSQL docs — Table Expressions (joined tables, LATERAL)', u: 'https://www.postgresql.org/docs/current/queries-table-expressions.html', k: 'docs', d: 'ON vs WHERE on outer joins, NATURAL, USING, CROSS' },
    { n: 'SQLBolt — Multi-table queries with JOINs / OUTER JOINs', u: 'https://sqlbolt.com/', k: 'course', d: 'lessons 6-8, practice in the browser' },
    { n: 'Mode — SQL Tutorial: Joins section', u: 'https://mode.com/sql-tutorial/', k: 'course', d: 'joins with comparison operators, multiple keys, self joins' },
    { n: 'Use The Index Luke — The Join Operation', u: 'https://use-the-index-luke.com/sql/join', k: 'article', d: 'what the database actually does for each join' },
    { n: 'Gate Smashers — Joins in DBMS (natural, inner, outer, self)', k: 'video' },
    { n: 'LeetCode — SQL 50 study plan', u: 'https://leetcode.com/studyplan/top-sql-50/', k: 'course', d: 'Basic Joins section for anti/semi join practice' }
  ],
  'sql-subqueries': [
    { n: 'PostgreSQL docs — Subquery Expressions (EXISTS, IN, NOT IN, ANY, ALL)', u: 'https://www.postgresql.org/docs/current/functions-subquery.html', k: 'docs', d: 'read the NULL caveat on NOT IN carefully' },
    { n: 'Mode — SQL Tutorial: Subqueries', u: 'https://mode.com/sql-tutorial/', k: 'course', d: 'subqueries in FROM, WHERE and joins' },
    { n: 'SQLBolt — interactive lessons (subqueries)', u: 'https://sqlbolt.com/', k: 'course' },
    { n: 'Korth — Database System Concepts, Ch 3.8 (Nested Subqueries)', k: 'book', d: 'scalar, correlated, EXISTS, set comparison' },
    { n: 'Gate Smashers — Nested query and correlated nested query in SQL', k: 'video' },
    { n: 'CMU 15-445 (Andy Pavlo) — Lecture: Modern SQL', k: 'video', d: 'nested queries, lateral joins, CTEs in one fast lecture' },
    { n: 'DataLemur — SQL interview questions', u: 'https://datalemur.com/', k: 'course', d: 'real interview problems; many are cleanest with EXISTS' }
  ],
  'window-functions': [
    { n: 'PostgreSQL docs — Window Functions (tutorial)', u: 'https://www.postgresql.org/docs/current/tutorial-window.html', k: 'docs', d: 'the best short intro to PARTITION BY / ORDER BY / frames' },
    { n: 'PostgreSQL docs — Window Functions reference', u: 'https://www.postgresql.org/docs/current/functions-window.html', k: 'docs', d: 'ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG/LEAD, FIRST_VALUE' },
    { n: 'Mode — SQL Window Functions', u: 'https://mode.com/sql-tutorial/sql-window-functions/', k: 'course', d: 'running totals, ranking and LAG/LEAD with a live editor' },
    { n: 'PostgreSQL docs — SQL syntax: Window Function Calls', u: 'https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS', k: 'docs', d: 'ROWS vs RANGE vs GROUPS frame semantics' },
    { n: 'CMU 15-445 (Andy Pavlo) — Lecture: Modern SQL (window functions part)', k: 'video' },
    { n: 'techTFQ — SQL Window Functions tutorial', k: 'video', d: 'interview-oriented walkthrough of RANK, LAG, frames' },
    { n: 'LeetCode — SQL 50 study plan', u: 'https://leetcode.com/studyplan/top-sql-50/', k: 'course', d: 'Advanced Select and Joins / Advanced String sections' }
  ],
  'ctes': [
    { n: 'PostgreSQL docs — WITH Queries (Common Table Expressions)', u: 'https://www.postgresql.org/docs/current/queries-with.html', k: 'docs', d: 'recursive CTEs, cycle detection, MATERIALIZED / NOT MATERIALIZED' },
    { n: 'Mode — SQL Tutorial (advanced section)', u: 'https://mode.com/sql-tutorial/', k: 'course' },
    { n: 'CMU 15-445 (Andy Pavlo) — Lecture: Modern SQL (CTEs and recursion)', k: 'video' },
    { n: 'techTFQ — Recursive SQL queries tutorial', k: 'video', d: 'org charts and number series with recursive CTEs' },
    { n: 'PostgreSQL Exercises — Recursive queries section', u: 'https://pgexercises.com/', k: 'course', d: 'graded practice on a sample schema' },
    { n: 'Wikipedia — Hierarchical and recursive queries in SQL', u: 'https://en.wikipedia.org/wiki/Hierarchical_and_recursive_queries_in_SQL', k: 'article' }
  ],
  'sql-patterns': [
    { n: 'DataLemur — SQL interview questions', u: 'https://datalemur.com/', k: 'course', d: 'FAANG-style retention, top-N, median problems' },
    { n: 'LeetCode — SQL 50 study plan', u: 'https://leetcode.com/studyplan/top-sql-50/', k: 'course', d: 'Nth highest salary, consecutive numbers, department top 3' },
    { n: 'PostgreSQL Exercises', u: 'https://pgexercises.com/', k: 'course', d: 'aggregation and window sections build pattern fluency' },
    { n: 'Mode — SQL Tutorial: pivoting rows to columns', u: 'https://mode.com/sql-tutorial/', k: 'course', d: 'CASE-based pivots' },
    { n: 'PostgreSQL docs — Aggregate Functions (percentile_cont for median)', u: 'https://www.postgresql.org/docs/current/functions-aggregate.html', k: 'docs' },
    { n: 'techTFQ — SQL interview query problems (gaps and islands, consecutive days)', k: 'playlist' },
    { n: 'Ankit Bansal — SQL interview questions playlist', k: 'playlist', d: 'Indian data-engineering interview problems, many on streaks and retention' }
  ],
  'ddl-dml-objects': [
    { n: 'PostgreSQL docs — Constraints', u: 'https://www.postgresql.org/docs/current/ddl-constraints.html', k: 'docs', d: 'CHECK, UNIQUE, PK, FK with ON DELETE actions' },
    { n: 'PostgreSQL docs — Materialized Views', u: 'https://www.postgresql.org/docs/current/rules-materializedviews.html', k: 'docs', d: 'when to use them, REFRESH behaviour' },
    { n: 'PostgreSQL docs — Trigger Functions (PL/pgSQL)', u: 'https://www.postgresql.org/docs/current/plpgsql-trigger.html', k: 'docs' },
    { n: 'PostgreSQL docs — TRUNCATE', u: 'https://www.postgresql.org/docs/current/sql-truncate.html', k: 'docs', d: 'how TRUNCATE differs from DELETE (MVCC, triggers, identity)' },
    { n: 'SQLBolt — Inserting, updating, deleting rows; creating/altering tables', u: 'https://sqlbolt.com/', k: 'course', d: 'lessons 13-18' },
    { n: 'Korth — Database System Concepts, Ch 4 (Intermediate SQL) and Ch 5 (Advanced SQL)', k: 'book', d: 'views, integrity constraints, authorization, triggers, procedures' },
    { n: 'Gate Smashers — DDL, DML, DCL, TCL commands / DELETE vs TRUNCATE vs DROP', k: 'video' }
  ],
  'transactions-isolation': [
    { n: 'PostgreSQL docs — Transaction Isolation', u: 'https://www.postgresql.org/docs/current/transaction-iso.html', k: 'docs', d: 'the anomaly-by-level table and serialization failures' },
    { n: 'PostgreSQL docs — Concurrency Control (MVCC intro)', u: 'https://www.postgresql.org/docs/current/mvcc.html', k: 'docs' },
    { n: 'The Internals of PostgreSQL (Hironobu Suzuki) — Ch 5 Concurrency Control', u: 'https://www.interdb.jp/pg/pgsql05.html', k: 'book', d: 'xmin/xmax, snapshots, SSI, with diagrams' },
    { n: 'CMU 15-445 (Andy Pavlo) — Lectures: Concurrency Control Theory and Multi-Version Concurrency Control', k: 'video', d: 'serializability, conflict graphs, MVCC design choices' },
    { n: 'Korth — Database System Concepts, Ch 17 (Transactions)', k: 'book', d: 'states, conflict/view serializability, recoverable schedules' },
    { n: 'Martin Kleppmann — Hermitage: testing isolation levels across databases', u: 'https://github.com/ept/hermitage', k: 'article', d: 'what each real DB actually prevents (write skew, lost update)' },
    { n: 'Gate Smashers — Transactions, ACID, schedules and serializability playlist', k: 'playlist', d: 'GATE numericals on conflict serializability' }
  ],
  'concurrency-control': [
    { n: 'CMU 15-445 (Andy Pavlo) — Lectures: Two-Phase Locking and Timestamp Ordering', k: 'video', d: 'strict 2PL, deadlock detection/prevention, intention locks, OCC' },
    { n: 'PostgreSQL docs — Explicit Locking', u: 'https://www.postgresql.org/docs/current/explicit-locking.html', k: 'docs', d: 'table/row lock modes, deadlocks, advisory locks' },
    { n: 'Korth — Database System Concepts, Ch 18 (Concurrency Control)', k: 'book', d: 'lock-based, timestamp, validation protocols, multiple granularity' },
    { n: 'Wikipedia — Two-phase locking', u: 'https://en.wikipedia.org/wiki/Two-phase_locking', k: 'article', d: 'basic vs strict vs strong strict 2PL' },
    { n: 'Gate Smashers — 2PL, strict 2PL, timestamp ordering protocol', k: 'video' },
    { n: 'Knowledge Gate — Concurrency control protocols in DBMS', k: 'video' },
    { n: 'Wikipedia — Optimistic concurrency control', u: 'https://en.wikipedia.org/wiki/Optimistic_concurrency_control', k: 'article', d: 'version columns and compare-and-set in practice' }
  ],
  'indexing': [
    { n: 'Use The Index Luke — Anatomy of an Index', u: 'https://use-the-index-luke.com/sql/anatomy', k: 'book', d: 'free book; B-tree leaf chain, why indexes get slow' },
    { n: 'Use The Index Luke — The WHERE Clause (concatenated keys, functions)', u: 'https://use-the-index-luke.com/sql/where-clause', k: 'book', d: 'composite index column order and leftmost prefix' },
    { n: 'PostgreSQL docs — Index Types', u: 'https://www.postgresql.org/docs/current/indexes-types.html', k: 'docs', d: 'B-tree, hash, GIN, GiST, BRIN' },
    { n: 'PostgreSQL docs — Index-Only Scans and Covering Indexes', u: 'https://www.postgresql.org/docs/current/indexes-index-only-scans.html', k: 'docs' },
    { n: 'PostgreSQL docs — Using EXPLAIN', u: 'https://www.postgresql.org/docs/current/using-explain.html', k: 'docs', d: 'reading cost, rows, seq vs index vs bitmap scans' },
    { n: 'CMU 15-445 (Andy Pavlo) — Lecture: Tree Indexes (B+Trees)', k: 'video', d: 'node layout, splits/merges, clustered indexes' },
    { n: 'USFCA (David Galles) — B+ Tree visualization', u: 'https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html', k: 'visual' }
  ],
  'query-processing': [
    { n: 'CMU 15-445 (Andy Pavlo) — Lectures: Query Execution, Join Algorithms, Query Optimization', k: 'playlist', d: 'iterator/vectorized models, nested loop vs hash vs sort-merge costs' },
    { n: 'PostgreSQL docs — The Path of a Query', u: 'https://www.postgresql.org/docs/current/query-path.html', k: 'docs', d: 'parser, rewriter, planner, executor in a few pages' },
    { n: 'PostgreSQL docs — Planner/Optimizer', u: 'https://www.postgresql.org/docs/current/planner-optimizer.html', k: 'docs', d: 'join-order search, GEQO' },
    { n: 'The Internals of PostgreSQL — Ch 3 Query Processing', u: 'https://www.interdb.jp/pg/pgsql03.html', k: 'book', d: 'cost estimation and the three join methods with diagrams' },
    { n: 'Use The Index Luke — The Join Operation', u: 'https://use-the-index-luke.com/sql/join', k: 'article', d: 'nested loops, hash join, sort merge from an indexing view' },
    { n: 'Korth — Database System Concepts, Ch 15 (Query Processing) and Ch 16 (Query Optimization)', k: 'book' },
    { n: 'Wikipedia — Hash join', u: 'https://en.wikipedia.org/wiki/Hash_join', k: 'article', d: 'classic, grace and hybrid hash join' }
  ],
  'recovery': [
    { n: 'CMU 15-445 (Andy Pavlo) — Lectures: Logging Schemes and Database Recovery (ARIES)', k: 'video', d: 'steal/no-force, WAL, checkpoints, analysis/redo/undo, CLRs' },
    { n: 'PostgreSQL docs — Write-Ahead Logging (WAL)', u: 'https://www.postgresql.org/docs/current/wal-intro.html', k: 'docs' },
    { n: 'The Internals of PostgreSQL — Ch 9 Write Ahead Logging', u: 'https://www.interdb.jp/pg/pgsql09.html', k: 'book', d: 'LSNs, full-page writes, checkpoint and redo walk-through' },
    { n: 'Korth — Database System Concepts, Ch 19 (Recovery System)', k: 'book', d: 'log-based recovery and the ARIES section' },
    { n: 'Wikipedia — ARIES (Algorithms for Recovery and Isolation Exploiting Semantics)', u: 'https://en.wikipedia.org/wiki/Algorithms_for_Recovery_and_Isolation_Exploiting_Semantics', k: 'article' },
    { n: 'Gate Smashers — Log based recovery, checkpoints, immediate vs deferred update', k: 'video' },
    { n: 'OSTEP — Crash Consistency: FSCK and Journaling', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-journaling.pdf', k: 'book', d: 'the same WAL idea from the file-system side' }
  ],
  'nosql': [
    { n: 'Martin Fowler — Introduction to NoSQL (GOTO 2012 talk)', k: 'video', d: 'aggregate-oriented data models, why NoSQL appeared' },
    { n: 'Wikipedia — NoSQL', u: 'https://en.wikipedia.org/wiki/NoSQL', k: 'article', d: 'taxonomy of key-value, document, wide-column, graph' },
    { n: 'Martin Kleppmann — Please stop calling databases CP or AP', u: 'https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html', k: 'blog', d: 'the nuanced view of CAP interviewers like' },
    { n: 'Jepsen — Consistency Models', u: 'https://jepsen.io/consistency', k: 'article', d: 'map of linearizable, sequential, causal, eventual' },
    { n: 'Readings in Database Systems (the Red Book)', u: 'http://www.redbook.io/', k: 'book', d: 'free; chapters on weak isolation and new DBMS architectures' },
    { n: 'CMU 15-445 (Andy Pavlo) — Lecture: Distributed Databases / Database Storage (LSM trees)', k: 'video' },
    { n: 'system-design-primer — SQL or NoSQL section', u: 'https://github.com/donnemartin/system-design-primer', k: 'article' }
  ]
}});

PREP.add({ id: 'os', refs: {
  'os-basics': [
    { n: 'OSTEP — Introduction to Operating Systems (Ch 2)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/intro.pdf', k: 'book', d: 'virtualization, concurrency, persistence: the three pillars' },
    { n: 'OSTEP — Mechanism: Limited Direct Execution (Ch 6)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf', k: 'book', d: 'user vs kernel mode, traps, trap table, system calls' },
    { n: 'Galvin — Operating System Concepts, Ch 1 (Introduction) and Ch 2 (OS Structures)', k: 'book', d: 'kernel architectures, system call categories, booting' },
    { n: 'Neso Academy — Operating System playlist (introduction, system calls, OS structure)', k: 'playlist' },
    { n: 'Gate Smashers — Operating System full course playlist', k: 'playlist', d: 'Hindi, exam-style revision' },
    { n: 'Wikipedia — Booting', u: 'https://en.wikipedia.org/wiki/Booting', k: 'article', d: 'BIOS/UEFI, bootloader, kernel init' },
    { n: 'linux-insides (0xAX) — Booting chapter', u: 'https://github.com/0xAX/linux-insides', k: 'notes', d: 'what Linux actually does from power-on to init' }
  ],
  'processes-threads': [
    { n: 'OSTEP — The Abstraction: The Process (Ch 4)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf', k: 'book', d: 'process states, PCB-like structures' },
    { n: 'OSTEP — Interlude: Process API (Ch 5)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf', k: 'book', d: 'fork, exec, wait with runnable examples' },
    { n: 'OSTEP — Concurrency: An Introduction (Ch 26)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf', k: 'book', d: 'threads vs processes, shared address space' },
    { n: 'Galvin — Operating System Concepts, Ch 3 (Processes) and Ch 4 (Threads and Concurrency)', k: 'book', d: 'PCB, state diagram, user vs kernel thread models' },
    { n: 'Neso Academy — Process states, PCB, threads (Operating System playlist)', k: 'playlist' },
    { n: 'Gate Smashers — Process vs Thread, process state diagram, context switching', k: 'video' },
    { n: 'man7.org — fork(2)', u: 'https://man7.org/linux/man-pages/man2/fork.2.html', k: 'docs', d: 'what the child inherits and what it does not' }
  ],
  'cpu-scheduling': [
    { n: 'OSTEP — Scheduling: Introduction (Ch 7)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf', k: 'book', d: 'FIFO, SJF, STCF, RR with turnaround/response metrics' },
    { n: 'OSTEP — Scheduling: The Multi-Level Feedback Queue (Ch 8)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf', k: 'book', d: 'MLFQ rules and why each one exists' },
    { n: 'OSTEP — Scheduling: Proportional Share (Ch 9)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf', k: 'book', d: 'lottery, stride and Linux CFS' },
    { n: 'Galvin — Operating System Concepts, Ch 5 (CPU Scheduling)', k: 'book', d: 'exponential averaging, multilevel queues, Gantt charts' },
    { n: 'Gate Smashers — CPU Scheduling algorithms with numericals (FCFS, SJF, SRTF, RR, Priority)', k: 'playlist', d: 'the numericals interviewers and GATE ask' },
    { n: 'Neso Academy — CPU Scheduling lectures (Operating System playlist)', k: 'playlist' },
    { n: 'Jenny\'s Lectures — CPU Scheduling algorithms in OS', k: 'playlist' }
  ],
  'synchronization': [
    { n: 'OSTEP — Locks (Ch 28)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf', k: 'book', d: 'Peterson, test-and-set, CAS, spin vs sleep, futex' },
    { n: 'OSTEP — Condition Variables (Ch 30)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf', k: 'book', d: 'why wait() needs a while loop' },
    { n: 'OSTEP — Semaphores (Ch 31)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf', k: 'book' },
    { n: 'Galvin — Operating System Concepts, Ch 6 (Synchronization Tools) and Ch 7 (Synchronization Examples)', k: 'book', d: 'critical-section requirements, monitors' },
    { n: 'Neso Academy — Process Synchronization lectures (critical section, Peterson, semaphores)', k: 'playlist' },
    { n: 'Gate Smashers — Process synchronization, semaphores, mutex playlist', k: 'playlist', d: 'GATE-style semaphore value questions' },
    { n: 'Wikipedia — Peterson\'s algorithm', u: 'https://en.wikipedia.org/wiki/Peterson%27s_algorithm', k: 'article', d: 'proof sketch and the memory-ordering caveat' }
  ],
  'classic-sync-problems': [
    { n: 'OSTEP — Semaphores (Ch 31): producer-consumer, reader-writer, dining philosophers', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf', k: 'book', d: 'shows the broken versions first, then fixes' },
    { n: 'OSTEP — Condition Variables (Ch 30): bounded buffer', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf', k: 'book' },
    { n: 'Allen Downey — The Little Book of Semaphores (free PDF)', k: 'book', d: 'the definitive puzzle book for these problems' },
    { n: 'Galvin — Operating System Concepts, Ch 7 (Synchronization Examples)', k: 'book' },
    { n: 'Neso Academy — Producer-Consumer, Readers-Writers, Dining Philosophers problems', k: 'video' },
    { n: 'Gate Smashers — Producer consumer problem using semaphores', k: 'video' },
    { n: 'Wikipedia — Dining philosophers problem', u: 'https://en.wikipedia.org/wiki/Dining_philosophers_problem', k: 'article', d: 'resource hierarchy, arbitrator, Chandy-Misra solutions' }
  ],
  'deadlocks': [
    { n: 'OSTEP — Common Concurrency Problems (Ch 32)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf', k: 'book', d: 'Coffman conditions and practical prevention (lock ordering)' },
    { n: 'Galvin — Operating System Concepts, Ch 8 (Deadlocks)', k: 'book', d: 'RAG, Banker\'s algorithm, detection, recovery' },
    { n: 'Gate Smashers — Deadlock and Banker\'s algorithm with numericals', k: 'video' },
    { n: 'Neso Academy — Deadlocks lectures (Operating System playlist)', k: 'playlist', d: 'safe state and Banker\'s step by step' },
    { n: 'Knowledge Gate — Deadlock full lecture (OS)', k: 'video' },
    { n: 'Wikipedia — Banker\'s algorithm', u: 'https://en.wikipedia.org/wiki/Banker%27s_algorithm', k: 'article' }
  ],
  'memory-management': [
    { n: 'OSTEP — Address Translation (Ch 15)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-mechanism.pdf', k: 'book', d: 'base/bounds and the MMU' },
    { n: 'OSTEP — Segmentation (Ch 16) and Free-Space Management (Ch 17)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-segmentation.pdf', k: 'book', d: 'external fragmentation, first/best/worst fit (vm-freespace.pdf)' },
    { n: 'OSTEP — Paging: Introduction (Ch 18)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf', k: 'book' },
    { n: 'OSTEP — Paging: Faster Translations (TLBs) (Ch 19)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf', k: 'book', d: 'TLB hit rate, ASIDs, effective access time' },
    { n: 'OSTEP — Paging: Smaller Tables (Ch 20)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-smalltables.pdf', k: 'book', d: 'multi-level and inverted page tables' },
    { n: 'Galvin — Operating System Concepts, Ch 9 (Main Memory)', k: 'book' },
    { n: 'Gate Smashers — Paging, page table size, TLB numericals', k: 'playlist', d: 'address-split and page-table-size calculations' }
  ],
  'virtual-memory': [
    { n: 'OSTEP — Beyond Physical Memory: Mechanisms (Ch 21)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf', k: 'book', d: 'swap space, page faults, the fault-handling flow' },
    { n: 'OSTEP — Beyond Physical Memory: Policies (Ch 22)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf', k: 'book', d: 'OPT, FIFO, LRU, clock, Belady, thrashing' },
    { n: 'OSTEP — Complete Virtual Memory Systems (Ch 23)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-complete.pdf', k: 'book', d: 'how Linux VM really works' },
    { n: 'Galvin — Operating System Concepts, Ch 10 (Virtual Memory)', k: 'book', d: 'EAT with page faults, working set, frame allocation' },
    { n: 'Gate Smashers — Page replacement algorithms (FIFO, Optimal, LRU) with numericals', k: 'video' },
    { n: 'Neso Academy — Virtual memory, demand paging, page replacement', k: 'playlist' },
    { n: 'Wikipedia — Belady\'s anomaly', u: 'https://en.wikipedia.org/wiki/B%C3%A9l%C3%A1dy%27s_anomaly', k: 'article' }
  ],
  'file-systems': [
    { n: 'OSTEP — Files and Directories (Ch 39)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf', k: 'book', d: 'file descriptors, hard vs symbolic links, fsync' },
    { n: 'OSTEP — File System Implementation (Ch 40)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-implementation.pdf', k: 'book', d: 'inodes, indirect blocks, bitmaps, read/write paths' },
    { n: 'OSTEP — Crash Consistency: FSCK and Journaling (Ch 42)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-journaling.pdf', k: 'book', d: 'data vs metadata journaling, ordered mode (ext4 default)' },
    { n: 'OSTEP — Locality and the Fast File System (Ch 41)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-ffs.pdf', k: 'book' },
    { n: 'Galvin — Operating System Concepts, Ch 13 (File-System Interface) and Ch 14 (File-System Implementation)', k: 'book', d: 'allocation methods and free-space management' },
    { n: 'Gate Smashers — File allocation methods, inode numericals', k: 'video', d: 'max file size with direct/indirect pointers' },
    { n: 'Neso Academy — File systems lectures', k: 'playlist' }
  ],
  'io-disk': [
    { n: 'OSTEP — I/O Devices (Ch 36)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-devices.pdf', k: 'book', d: 'polling vs interrupts vs DMA, device drivers' },
    { n: 'OSTEP — Hard Disk Drives (Ch 37)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-disks.pdf', k: 'book', d: 'seek, rotation, transfer; SSTF, SCAN, C-SCAN' },
    { n: 'OSTEP — Flash-based SSDs (Ch 44)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-ssd.pdf', k: 'book' },
    { n: 'Galvin — Operating System Concepts, Ch 11 (Mass-Storage Structure) and Ch 12 (I/O Systems)', k: 'book' },
    { n: 'Gate Smashers — Disk scheduling algorithms (FCFS, SSTF, SCAN, LOOK, C-SCAN)', k: 'video', d: 'head-movement numericals' },
    { n: 'Neso Academy — Disk scheduling lectures', k: 'playlist' },
    { n: 'man7.org — epoll(7)', u: 'https://man7.org/linux/man-pages/man7/epoll.7.html', k: 'docs', d: 'level vs edge triggered readiness' }
  ],
  'ipc': [
    { n: 'Beej\'s Guide to Unix Interprocess Communication', u: 'https://beej.us/guide/bgipc/', k: 'book', d: 'free; pipes, FIFOs, signals, message queues, shm, Unix sockets' },
    { n: 'Galvin — Operating System Concepts, Ch 3.4-3.8 (IPC, pipes, sockets, RPC)', k: 'book' },
    { n: 'man7.org — pipe(7)', u: 'https://man7.org/linux/man-pages/man7/pipe.7.html', k: 'docs', d: 'pipe capacity, atomic writes under PIPE_BUF' },
    { n: 'man7.org — signal(7)', u: 'https://man7.org/linux/man-pages/man7/signal.7.html', k: 'docs', d: 'signal dispositions, SIGKILL/SIGSTOP cannot be caught' },
    { n: 'Python docs — multiprocessing.shared_memory', u: 'https://docs.python.org/3/library/multiprocessing.shared_memory.html', k: 'docs' },
    { n: 'Neso Academy — Inter Process Communication (shared memory, message passing)', k: 'video' },
    { n: 'Gate Smashers — Inter process communication in OS', k: 'video' }
  ],
  'concurrency-practice': [
    { n: 'Real Python — What Is the Python Global Interpreter Lock (GIL)?', u: 'https://realpython.com/python-gil/', k: 'article' },
    { n: 'Real Python — Async IO in Python: A Complete Walkthrough', u: 'https://realpython.com/async-io-python/', k: 'article' },
    { n: 'Python docs — concurrent.futures', u: 'https://docs.python.org/3/library/concurrent.futures.html', k: 'docs', d: 'ThreadPoolExecutor vs ProcessPoolExecutor' },
    { n: 'Python docs — asyncio', u: 'https://docs.python.org/3/library/asyncio.html', k: 'docs' },
    { n: 'David Beazley — Understanding the Python GIL (PyCon talk)', k: 'video', d: 'the classic deep dive on GIL contention' },
    { n: 'Corey Schafer — Python Threading Tutorial / Multiprocessing Tutorial', k: 'video' },
    { n: 'OSTEP — Event-based Concurrency (Ch 33)', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-events.pdf', k: 'book', d: 'the event-loop model behind asyncio' }
  ],
  'containers-virtualization': [
    { n: 'man7.org — namespaces(7)', u: 'https://man7.org/linux/man-pages/man7/namespaces.7.html', k: 'docs', d: 'every namespace type and what it isolates' },
    { n: 'man7.org — cgroups(7)', u: 'https://man7.org/linux/man-pages/man7/cgroups.7.html', k: 'docs', d: 'v1 vs v2, CPU and memory controllers' },
    { n: 'Liz Rice — Containers From Scratch (GOTO / talk)', k: 'video', d: 'builds a container in Go live with namespaces and chroot' },
    { n: 'Julia Evans — What even is a container: namespaces and cgroups', k: 'blog' },
    { n: 'OSTEP — Appendix: Virtual Machine Monitors', k: 'book', d: 'trap-and-emulate, shadow page tables' },
    { n: 'Galvin — Operating System Concepts, Ch 18 (Virtual Machines)', k: 'book', d: 'type 1 vs type 2, paravirtualization, hardware assist' },
    { n: 'Wikipedia — Hypervisor', u: 'https://en.wikipedia.org/wiki/Hypervisor', k: 'article' }
  ],
  'process-memory-advanced': [
    { n: 'OSTEP — Complete Virtual Memory Systems (Ch 23): COW, demand zeroing, Linux VM', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-complete.pdf', k: 'book' },
    { n: 'OSTEP — Interlude: Process API (Ch 5): fork, wait, exec', u: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf', k: 'book', d: 'what happens if the parent never waits' },
    { n: 'man7.org — mmap(2)', u: 'https://man7.org/linux/man-pages/man2/mmap.2.html', k: 'docs', d: 'MAP_SHARED vs MAP_PRIVATE vs MAP_ANONYMOUS' },
    { n: 'Python docs — mmap', u: 'https://docs.python.org/3/library/mmap.html', k: 'docs' },
    { n: 'Wikipedia — Copy-on-write', u: 'https://en.wikipedia.org/wiki/Copy-on-write', k: 'article' },
    { n: 'Wikipedia — Zombie process', u: 'https://en.wikipedia.org/wiki/Zombie_process', k: 'article', d: 'reaping, SIGCHLD, init adopting orphans' },
    { n: 'Gate Smashers — fork() system call numericals (number of child processes)', k: 'video' }
  ]
}});

PREP.add({ id: 'cn', refs: {
  'osi-tcpip': [
    { n: 'Kurose & Ross — Computer Networking: A Top-Down Approach, Ch 1 (Computer Networks and the Internet)', k: 'book', d: 'layering, encapsulation, delay types' },
    { n: 'Kurose-Ross companion site (slides, applets, Wireshark labs)', u: 'https://gaia.cs.umass.edu/kurose_ross/index.php', k: 'course', d: 'free lecture slides and interactive problems' },
    { n: 'Jim Kurose — Computer Networking video lectures (Chapter 1)', k: 'playlist', d: 'the author teaching his own book' },
    { n: 'Neso Academy — Computer Networks playlist (OSI and TCP/IP models)', k: 'playlist' },
    { n: 'Gate Smashers — Computer Networks playlist (OSI model, devices)', k: 'playlist', d: 'hub vs switch vs router, collision/broadcast domains' },
    { n: 'Cloudflare Learning — What is the OSI model?', u: 'https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/', k: 'article' },
    { n: 'Stanford CS144 — Introduction to Computer Networking', u: 'https://cs144.github.io/', k: 'course', d: 'Stanford course; the original CS144 lecture videos are on YouTube' }
  ],
  'url-journey': [
    { n: 'alex/what-happens-when (GitHub)', u: 'https://github.com/alex/what-happens-when', k: 'article', d: 'the famous exhaustive answer, keypress to render' },
    { n: 'MDN — How browsers work / Populating the page', u: 'https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work', k: 'docs', d: 'DNS, TCP, TLS, then parsing and rendering' },
    { n: 'High Performance Browser Networking (Ilya Grigorik) — Primer on Web Performance', u: 'https://hpbn.co/primer-on-web-performance/', k: 'book', d: 'free book; where the time goes in a page load' },
    { n: 'Cloudflare Learning — What is DNS?', u: 'https://www.cloudflare.com/learning/dns/what-is-dns/', k: 'article' },
    { n: 'Cloudflare Learning — What happens in a TLS handshake?', u: 'https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/', k: 'article' },
    { n: 'ByteByteGo — What happens when you type a URL into your browser?', k: 'video' },
    { n: 'Hussein Nasser — What happens when you type google.com', k: 'video', d: 'backend-engineer view incl. connection reuse' }
  ],
  'ip-addressing': [
    { n: 'Kurose & Ross — Ch 4.3 (IPv4 addressing, DHCP, NAT, IPv6)', k: 'book' },
    { n: 'Wikipedia — Classless Inter-Domain Routing', u: 'https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing', k: 'article', d: 'prefix tables and aggregation' },
    { n: 'Wikipedia — Network address translation', u: 'https://en.wikipedia.org/wiki/Network_address_translation', k: 'article', d: 'NAT types, PAT, traversal' },
    { n: 'Cloudflare Learning — What is a subnet?', u: 'https://www.cloudflare.com/learning/network-layer/what-is-a-subnet/', k: 'article' },
    { n: 'Gate Smashers — IP addressing, subnetting and supernetting numericals', k: 'playlist', d: 'subnet mask / host-count questions' },
    { n: 'Neso Academy — IP addressing and subnetting lectures', k: 'playlist' },
    { n: 'Practical Networking (Ed Harmoush) — Subnetting Mastery', k: 'playlist', d: 'the fastest way to subnet in your head' }
  ],
  'dns': [
    { n: 'Cloudflare Learning — What is DNS? / How DNS works', u: 'https://www.cloudflare.com/learning/dns/what-is-dns/', k: 'article', d: 'resolver, root, TLD, authoritative walk-through' },
    { n: 'Cloudflare Learning — DNS records', u: 'https://www.cloudflare.com/learning/dns/dns-records/', k: 'article', d: 'A, AAAA, CNAME, MX, TXT, NS, SOA, SRV, PTR' },
    { n: 'Julia Evans — Mess With DNS (interactive playground)', u: 'https://messwithdns.net/', k: 'visual', d: 'create records and watch real queries arrive' },
    { n: 'Kurose & Ross — Ch 2.4 (DNS: The Internet\'s Directory Service)', k: 'book' },
    { n: 'Wikipedia — Domain Name System', u: 'https://en.wikipedia.org/wiki/Domain_Name_System', k: 'article' },
    { n: 'Gate Smashers — DNS (Domain Name System) in computer networks', k: 'video' },
    { n: 'PowerCert Animated Videos — DNS Explained', k: 'video', d: 'clear animation of recursive vs iterative' }
  ],
  'tcp-udp': [
    { n: 'High Performance Browser Networking — Building Blocks of TCP', u: 'https://hpbn.co/building-blocks-of-tcp/', k: 'book', d: 'handshake cost, slow start, head-of-line blocking' },
    { n: 'High Performance Browser Networking — Building Blocks of UDP', u: 'https://hpbn.co/building-blocks-of-udp/', k: 'book', d: 'NAT traversal and why UDP needs app-level reliability' },
    { n: 'Kurose & Ross — Ch 3 (Transport Layer): 3.3 UDP, 3.5 TCP connection management', k: 'book', d: 'state diagram incl. TIME_WAIT' },
    { n: 'RFC 9293 — Transmission Control Protocol', u: 'https://www.rfc-editor.org/rfc/rfc9293', k: 'docs', d: 'the current TCP spec; read section 3.3 state machine' },
    { n: 'Jim Kurose — Transport layer video lectures (Chapter 3)', k: 'playlist' },
    { n: 'Neso Academy — TCP and UDP lectures (Computer Networks playlist)', k: 'playlist' },
    { n: 'Hussein Nasser — TCP vs UDP crash course', k: 'video', d: 'backend-practical, covers TIME_WAIT and connection costs' }
  ],
  'tcp-flow-congestion': [
    { n: 'Kurose & Ross — Ch 3.4 (Reliable data transfer: GBN, SR), 3.5.5 (flow control), 3.6-3.7 (congestion control)', k: 'book', d: 'the canonical FSM-based treatment' },
    { n: 'Kurose-Ross companion site — interactive GBN / SR animations', u: 'https://gaia.cs.umass.edu/kurose_ross/index.php', k: 'visual' },
    { n: 'High Performance Browser Networking — Building Blocks of TCP (flow control, slow start, congestion avoidance)', u: 'https://hpbn.co/building-blocks-of-tcp/', k: 'book' },
    { n: 'Wikipedia — TCP congestion control', u: 'https://en.wikipedia.org/wiki/TCP_congestion_control', k: 'article', d: 'Reno, NewReno, CUBIC, BBR' },
    { n: 'Gate Smashers — Sliding window protocols (Stop and Wait, GBN, SR) numericals', k: 'playlist', d: 'window size vs sequence bits, efficiency' },
    { n: 'Neso Academy — TCP congestion control lectures', k: 'video' },
    { n: 'Jim Kurose — Principles of congestion control (video lecture)', k: 'video' }
  ],
  'http': [
    { n: 'MDN — HTTP documentation', u: 'https://developer.mozilla.org/en-US/docs/Web/HTTP', k: 'docs', d: 'overview, methods, headers, cookies, caching' },
    { n: 'MDN — HTTP response status codes', u: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', k: 'docs' },
    { n: 'MDN — HTTP caching', u: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching', k: 'docs', d: 'Cache-Control, ETag, 304 revalidation' },
    { n: 'High Performance Browser Networking — HTTP/1.X and HTTP/2 chapters', u: 'https://hpbn.co/http2/', k: 'book', d: 'framing, multiplexing, HPACK, HOL blocking' },
    { n: 'Cloudflare Learning — What is HTTP/3?', u: 'https://www.cloudflare.com/learning/performance/what-is-http3/', k: 'article', d: 'QUIC over UDP, why it fixes TCP HOL blocking' },
    { n: 'Cloudflare Learning — HTTP/2 vs HTTP/1.1', u: 'https://www.cloudflare.com/learning/performance/http2-vs-http1.1/', k: 'article' },
    { n: 'Hussein Nasser — HTTP/1.1 vs HTTP/2 vs HTTP/3', k: 'video' }
  ],
  'tls': [
    { n: 'The Illustrated TLS 1.3 Connection', u: 'https://tls13.xargs.org/', k: 'visual', d: 'every byte of a real handshake explained' },
    { n: 'The Illustrated TLS 1.2 Connection', u: 'https://tls12.xargs.org/', k: 'visual' },
    { n: 'Cloudflare Learning — What happens in a TLS handshake?', u: 'https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/', k: 'article', d: 'RSA vs ephemeral DH, 1.2 vs 1.3' },
    { n: 'High Performance Browser Networking — Transport Layer Security (TLS)', u: 'https://hpbn.co/transport-layer-security-tls/', k: 'book', d: 'chain of trust, OCSP, session resumption' },
    { n: 'Kurose & Ross — Ch 8 (Security in Computer Networks): 8.2-8.3 crypto, 8.6 TLS', k: 'book' },
    { n: 'Computerphile — Public key cryptography / Diffie-Hellman key exchange', k: 'video' },
    { n: 'Hussein Nasser — TLS handshake explained', k: 'video' }
  ],
  'network-layer-protocols': [
    { n: 'Kurose & Ross — Ch 4 (Network Layer: Data Plane) and Ch 5 (Control Plane): link state, distance vector, OSPF, BGP, ICMP', k: 'book' },
    { n: 'Jim Kurose — Network layer control plane video lectures (Chapter 5)', k: 'playlist' },
    { n: 'Wikipedia — Border Gateway Protocol', u: 'https://en.wikipedia.org/wiki/Border_Gateway_Protocol', k: 'article' },
    { n: 'Wikipedia — Dynamic Host Configuration Protocol', u: 'https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol', k: 'article', d: 'DORA message flow' },
    { n: 'Gate Smashers — Routing algorithms (distance vector, link state), ARP, DHCP', k: 'playlist' },
    { n: 'Neso Academy — ARP, ICMP, routing protocols lectures', k: 'playlist' },
    { n: 'Practical Networking (Ed Harmoush) — Packet Traveling series', k: 'playlist', d: 'ARP and routing step by step across hops' }
  ],
  'realtime-web': [
    { n: 'High Performance Browser Networking — WebSocket', u: 'https://hpbn.co/websocket/', k: 'book', d: 'upgrade handshake, framing, performance checklist' },
    { n: 'High Performance Browser Networking — Server-Sent Events (SSE)', u: 'https://hpbn.co/server-sent-events-sse/', k: 'book' },
    { n: 'High Performance Browser Networking — XMLHttpRequest (polling and long polling)', u: 'https://hpbn.co/xmlhttprequest/', k: 'book' },
    { n: 'MDN — The WebSocket API', u: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API', k: 'docs' },
    { n: 'MDN — Using server-sent events', u: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events', k: 'docs', d: 'how LLM token streaming is usually delivered' },
    { n: 'Hussein Nasser — WebSockets, SSE, long polling explained', k: 'video' },
    { n: 'ByteByteGo — Polling vs WebSockets vs SSE', k: 'video' }
  ],
  'web-security': [
    { n: 'MDN — Cross-Origin Resource Sharing (CORS)', u: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS', k: 'docs', d: 'simple vs preflighted requests, credentials' },
    { n: 'MDN — Same-origin policy', u: 'https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy', k: 'docs' },
    { n: 'OWASP — Cross Site Scripting Prevention Cheat Sheet', u: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html', k: 'docs' },
    { n: 'OWASP — Cross-Site Request Forgery Prevention Cheat Sheet', u: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html', k: 'docs', d: 'tokens, SameSite cookies' },
    { n: 'Cloudflare Learning — What is a DDoS attack?', u: 'https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/', k: 'article', d: 'volumetric vs protocol vs application-layer' },
    { n: 'Cloudflare Learning — What is a firewall?', u: 'https://www.cloudflare.com/learning/security/what-is-a-firewall/', k: 'article' },
    { n: 'Hussein Nasser — CORS explained / CSRF explained', k: 'video' }
  ],
  'cdn-lb-proxy': [
    { n: 'Cloudflare Learning — What is a CDN?', u: 'https://www.cloudflare.com/learning/cdn/what-is-a-cdn/', k: 'article' },
    { n: 'Cloudflare Learning — What is a reverse proxy?', u: 'https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/', k: 'article', d: 'forward vs reverse proxy' },
    { n: 'Cloudflare Learning — What is load balancing?', u: 'https://www.cloudflare.com/learning/performance/what-is-load-balancing/', k: 'article' },
    { n: 'NGINX docs — Using nginx as HTTP load balancer', u: 'https://nginx.org/en/docs/http/load_balancing.html', k: 'docs', d: 'round robin, least_conn, ip_hash in config form' },
    { n: 'system-design-primer — Load balancer, reverse proxy, CDN sections', u: 'https://github.com/donnemartin/system-design-primer', k: 'article' },
    { n: 'Hussein Nasser — Layer 4 vs Layer 7 load balancing', k: 'video' },
    { n: 'ByteByteGo — What is a CDN? / Load balancer algorithms', k: 'video' }
  ],
  'sockets-tools': [
    { n: 'Beej\'s Guide to Network Programming', u: 'https://beej.us/guide/bgnet/', k: 'book', d: 'free; socket, bind, listen, accept, select/poll' },
    { n: 'Python docs — Socket Programming HOWTO', u: 'https://docs.python.org/3/howto/sockets.html', k: 'docs' },
    { n: 'Python docs — socket module', u: 'https://docs.python.org/3/library/socket.html', k: 'docs' },
    { n: 'man7.org — ss(8)', u: 'https://man7.org/linux/man-pages/man8/ss.8.html', k: 'docs', d: 'listing sockets and states (TIME_WAIT counts)' },
    { n: 'Wireshark User\'s Guide', u: 'https://www.wireshark.org/docs/wsug_html_chunked/', k: 'docs' },
    { n: 'Kurose-Ross companion site — Wireshark labs', u: 'https://gaia.cs.umass.edu/kurose_ross/index.php', k: 'course', d: 'guided captures of HTTP, DNS, TCP, IP' },
    { n: 'Chris Greer — Wireshark / TCP analysis tutorials', k: 'playlist' }
  ]
}});
