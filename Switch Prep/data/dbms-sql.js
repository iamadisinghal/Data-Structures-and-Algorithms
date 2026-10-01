PREP.add({
  id: "dbms",
  order: 70,
  group: "Core CS",
  title: "DBMS & SQL",
  short: "DBMS & SQL",
  blurb: "Theory for the CS-fundamentals round, SQL for the coding round.",
  intro: [
    "Indian product companies usually test this in two places. A <b>CS-fundamentals round</b> asks about normalization, ACID, isolation levels and indexing. A <b>coding or online-assessment round</b> gives you 1-3 SQL problems, mostly window functions, joins and GROUP BY.",
    "Order: the concepts level is light, so do it quickly. Then <b>grind SQL</b> (LeetCode SQL 50, then DataLemur medium). Leave internals for the last 1-2 weeks before onsites. For an AI engineer, also be ready to explain how a vector DB or feature store differs from an OLTP RDBMS.",
    "Rule of thumb: if you can write top-N-per-group, gaps-and-islands and retention queries from memory, and explain MVCC plus B+ tree indexes on a whiteboard, you have covered about 90% of what gets asked."
  ],
  resources: [
    { n: "LeetCode SQL 50", u: "https://leetcode.com/studyplan/top-sql-50/", d: "The default SQL grind list. Finish it in about 1-2 weeks." },
    { n: "DataLemur", u: "https://datalemur.com/", d: "Real FAANG-style SQL questions with good write-ups. Strong on window functions and analytics." },
    { n: "StrataScratch", u: "https://www.stratascratch.com/", d: "Large bank of company-tagged SQL and pandas questions." },
    { n: "SQLZoo", u: "https://sqlzoo.net/", d: "Interactive basics. Good if you are rusty on JOIN and GROUP BY." },
    { n: "HackerRank SQL", u: "https://www.hackerrank.com/domains/sql", d: "Many OAs run on HackerRank, so get used to its SQL editor and dialects." },
    { n: "Mode SQL Tutorial", u: "https://mode.com/sql-tutorial/", d: "Clear analytics-oriented tutorial covering window functions and performance." },
    { n: "CMU 15-445 (Andy Pavlo)", u: "https://15445.courses.cs.cmu.edu/", d: "The best free internals course: storage, B+ trees, concurrency control, recovery. Lectures are on YouTube." },
    { n: "Use The Index, Luke", u: "https://use-the-index-luke.com/", d: "Practical indexing for developers: composite indexes, covering indexes, why a query is slow." },
    { n: "GFG DBMS", u: "https://www.geeksforgeeks.org/dbms/", d: "Revision notes and GATE-style questions on normalization, keys and transactions." },
    { n: "Korth - Database System Concepts", d: "Textbook reference (Silberschatz, Korth, Sudarshan). Use it for the chapters on normalization, transactions and recovery." }
  ],
  levels: [
    {
      name: "Beginner · DBMS concepts",
      desc: "Vocabulary and theory that open most DBMS interviews: models, keys, ER, relational algebra and normalization.",
      topics: [
        {
          id: "dbms-basics",
          title: "DBMS basics, ER model, keys & relational algebra",
          est: "2 days",
          why: "Warm-up questions in almost every fundamentals round (\"What is a candidate key?\", \"DBMS vs file system?\"). Quick to learn, and an embarrassing loss if you miss it.",
          learn: [
            "DBMS vs file system: redundancy, inconsistency, concurrent access, atomicity, security, query language, data independence.",
            "Three-schema architecture (external / conceptual / internal), and <b>logical vs physical data independence</b>.",
            "Data models: relational, ER, document, key-value, graph, hierarchical/network (historical).",
            "ER model: entity, weak entity, attributes (composite, multivalued, derived), relationships, cardinality (1:1, 1:N, M:N), participation (total/partial).",
            "Mapping ER to tables: an M:N relationship becomes a junction table, a multivalued attribute becomes a separate table, and a weak entity takes the owner PK plus its partial key.",
            "Keys: super key, candidate key (minimal super key), primary key, alternate key, foreign key, composite key, surrogate vs natural key.",
            "Relational algebra: select (σ), project (π), union, set difference, Cartesian product, rename, join (natural, theta, outer), division.",
            "Integrity constraints: domain, entity integrity (PK not NULL), referential integrity (FK), and ON DELETE CASCADE / SET NULL / RESTRICT."
          ],
          practice: [
            { t: "Draw an ER diagram for a library / food-delivery app and convert it to tables", p: "BUILD", d: "M" },
            { t: "GFG: Types of Keys in Relational Model", p: "GFG", d: "E" },
            { t: "GFG: Introduction of ER Model", p: "GFG", d: "E" },
            { t: "GFG: Relational Algebra in DBMS", p: "GFG", d: "E" },
            { t: "Write relational-algebra expressions for: students enrolled in all courses (division)", p: "BOOK", d: "M" },
            { t: "Find all candidate keys of R(A,B,C,D,E) with FDs A->B, BC->D, D->A", p: "GFG", d: "M" },
            { t: "Korth Ch. 2 & 6 (relational model, ER design) exercises", p: "BOOK", d: "M" }
          ],
          notes: [
            "Every candidate key is a super key, but not every super key is a candidate key. A candidate key is a <b>minimal</b> super key.",
            "Number of super keys when n attributes include one candidate key of 1 attribute: <b>2^(n-1)</b>.",
            "A primary key cannot be NULL. A UNIQUE column in most RDBMSs allows NULL (multiple NULLs in Postgres/MySQL, only one in SQL Server).",
            "A foreign key can be NULL and can reference any UNIQUE/PK column, including one in the same table (self-referencing, e.g. manager_id).",
            "Division (R ÷ S) answers \"for all\" questions. In SQL it is written as a double NOT EXISTS, or as GROUP BY ... HAVING COUNT(DISTINCT x) = (SELECT COUNT(*) ...).",
            "Cartesian product size: |R × S| = |R| · |S| rows, with deg(R)+deg(S) columns.",
            "Surrogate keys (auto-increment, UUID) stay stable when business data changes. Natural keys (email, PAN) carry meaning but can change."
          ],
          cases: [
            "\"Is a primary key always a clustered index?\" It is in MySQL InnoDB and is the SQL Server default. In Postgres, no: tables are heaps and CLUSTER is a one-time operation.",
            "Weak entity: it has no key of its own. It is identified by the owner key plus a partial key (discriminator), e.g. order_id plus line_no.",
            "A 1:1 relationship can be merged into either table. Put the FK on the side with <b>total participation</b> to avoid NULLs.",
            "Natural join silently joins on <b>every</b> same-named column. In real SQL that is a classic bug, so prefer an explicit ON.",
            "Random UUIDv4 as a clustered PK fragments a B+ tree because inserts land at random pages. UUIDv7 or ULID (time-ordered) fixes this."
          ],
          qa: [
            { q: "What advantages does a DBMS have over a file system?", a: "Less redundancy and inconsistency, a declarative query language, <b>concurrent access with isolation</b>, atomicity and crash recovery, integrity constraints, security/access control, and data independence (you can change storage without changing apps)." },
            { q: "Difference between primary key, candidate key and super key?", a: "A <b>super key</b> is any set of attributes that uniquely identifies a tuple. A <b>candidate key</b> is a minimal super key (no subset is a super key). The <b>primary key</b> is the one candidate key you choose; it is NOT NULL and unique. The other candidates become alternate keys." },
            { q: "What is a foreign key and what happens on delete of the referenced row?", a: "A column that references a PK/UNIQUE column of another (or the same) table, which enforces referential integrity. On delete the behaviour is set by the constraint: <code>RESTRICT/NO ACTION</code> (block), <code>CASCADE</code> (delete children), <code>SET NULL</code> or <code>SET DEFAULT</code>." },
            { q: "How do you map an M:N relationship to tables?", a: "Create a junction (associative) table whose columns are FKs to both sides, with a composite PK (a_id, b_id). Relationship attributes such as enrolled_on go in that table." }
          ]
        },
        {
          id: "normalization",
          title: "Functional dependencies & normalization (1NF to BCNF)",
          est: "2-3 days",
          why: "The most-asked DBMS theory topic in India (GATE culture). Expect \"what normal form is this table in?\" and \"why denormalize?\"",
          learn: [
            "Anomalies caused by redundancy: insertion, deletion and update anomalies, each with an example.",
            "Functional dependency X -> Y, trivial vs non-trivial, and Armstrong's axioms (reflexivity, augmentation, transitivity) plus derived rules (union, decomposition, pseudo-transitivity).",
            "Attribute closure X+, used to find candidate keys and test whether an FD holds. Minimal (canonical) cover.",
            "<b>1NF</b>: atomic values, no repeating groups. <b>2NF</b>: 1NF and no partial dependency of a non-prime attribute on part of a candidate key.",
            "<b>3NF</b>: for every non-trivial FD X -> A, either X is a super key or A is prime (no transitive dependency of non-prime attributes).",
            "<b>BCNF</b>: for every non-trivial FD X -> A, X is a super key. It is stricter than 3NF.",
            "Decomposition properties: <b>lossless join</b> (the common attributes form a key of one side) and <b>dependency preservation</b>. 3NF can always get both; BCNF guarantees only lossless.",
            "4NF (multivalued dependencies) and 5NF (join dependencies) at a high level.",
            "Denormalization trade-offs: faster reads and fewer joins (OLAP, read-heavy, star schema) in exchange for write cost and consistency risk."
          ],
          practice: [
            { t: "GFG: Normal Forms in DBMS", p: "GFG", d: "E" },
            { t: "GFG: Finding Attribute Closure and Candidate Keys using Functional Dependencies", p: "GFG", d: "M" },
            { t: "GFG: Lossless Join and Dependency Preserving Decomposition", p: "GFG", d: "M" },
            { t: "GFG: Canonical Cover of Functional Dependencies", p: "GFG", d: "M" },
            { t: "GATE PYQs: identify the highest normal form (10 questions)", p: "GFG", d: "M" },
            { t: "Normalize an unnormalized Orders sheet (order, customer, items, prices) to 3NF/BCNF", p: "BUILD", d: "M" },
            { t: "Gate Smashers: Normalization playlist", p: "YT", d: "E" }
          ],
          notes: [
            "Mnemonic: \"The key (1NF), the whole key (2NF), and nothing but the key (3NF), so help me Codd.\"",
            "Prime attribute = part of <b>any</b> candidate key. 2NF and 3NF talk about <b>non-prime</b> attributes; BCNF does not care.",
            "Candidate-key trick: attributes that never appear on any FD's right-hand side <b>must</b> be in every key. Start the closure from them.",
            "Lossless test for a binary decomposition R1, R2: (R1 ∩ R2) -> R1 or (R1 ∩ R2) -> R2.",
            "If all candidate keys are single attributes, a relation in 1NF is automatically in 2NF.",
            "A relation with only two attributes is always in BCNF.",
            "Classic 3NF-but-not-BCNF example: R(Student, Course, Teacher) with {Student, Course} -> Teacher and Teacher -> Course. Teacher is not a super key, but Course is prime.",
            "OLTP leans toward 3NF/BCNF. OLAP and warehouses use a denormalized star or snowflake schema (fact plus dimension tables)."
          ],
          cases: [
            "Comma-separated values in a column (\"tags = 'a,b,c'\") violate 1NF. JSON arrays technically do too, but modern RDBMSs accept them pragmatically.",
            "A BCNF decomposition may <b>lose an FD</b>, so that FD can then only be enforced with a join or a trigger. That is why 3NF is often the practical target.",
            "\"Is a higher normal form always better?\" No. It means more joins, so read latency goes up. Denormalize deliberately for read-heavy paths and keep a single source of truth.",
            "Do not confuse a transitive dependency (A -> B -> C, with B non-key) with a partial dependency (part of a composite key -> non-prime).",
            "Find <b>all</b> candidate keys before deciding the normal form. Missing one changes which attributes are prime."
          ],
          qa: [
            { q: "Explain 2NF, 3NF and BCNF with the key difference.", a: "2NF removes <b>partial</b> dependencies (a non-prime attribute depends on part of a composite key). 3NF also removes <b>transitive</b> dependencies (non-prime depends on non-prime). BCNF requires that every determinant is a super key, so it also forbids FDs like Teacher -> Course where the RHS is prime." },
            { q: "Why would you denormalize?", a: "To avoid expensive joins on hot read paths (dashboards, feeds, analytics), precompute aggregates, or fit a NoSQL access pattern. Costs: redundant writes, update anomalies, and the need for sync jobs or triggers. Use it when reads far outnumber writes and slight staleness is acceptable." },
            { q: "What is a lossless decomposition?", a: "One where natural-joining the decomposed tables gives back exactly the original relation, with no spurious tuples. It holds for R1, R2 if their common attributes form a super key of at least one of them." },
            { q: "Find the candidate keys of R(A,B,C,D) with A->B, B->C, C->A.", a: "D never appears on a RHS, so it is in every key. AD+ = ABCD, BD+ = ABCD, CD+ = ABCD. The candidate keys are <b>AD, BD and CD</b>." }
          ]
        }
      ]
    },
    {
      name: "Beginner · SQL foundations",
      desc: "Core querying: filtering, aggregation, NULLs, every JOIN type and subqueries. Cover this through LeetCode SQL 50 Easy.",
      topics: [
        {
          id: "sql-select-aggregate",
          title: "SELECT, filtering, aggregates, GROUP BY / HAVING & NULLs",
          est: "2-3 days",
          why: "Every SQL problem builds on this. Getting the logical query order and NULL semantics wrong is the top source of wrong answers in OAs.",
          learn: [
            "Logical execution order: <b>FROM -> JOIN/ON -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> window functions -> ORDER BY -> LIMIT/OFFSET</b>.",
            "WHERE filters rows before grouping. HAVING filters groups after aggregation.",
            "Aggregates: COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col), plus SUM, AVG, MIN, MAX. All except COUNT(*) ignore NULLs.",
            "NULL semantics: three-valued logic (TRUE/FALSE/UNKNOWN); <code>= NULL</code> is never true, so use <code>IS NULL</code>. Also COALESCE/IFNULL and NULLIF.",
            "CASE WHEN for conditional logic and conditional aggregation: <code>SUM(CASE WHEN status='x' THEN 1 ELSE 0 END)</code>.",
            "ORDER BY with multiple keys, ASC/DESC, and NULLS FIRST/LAST. Pagination with LIMIT/OFFSET vs keyset pagination.",
            "String and date functions you will need in OAs: CONCAT, SUBSTRING, LOWER/UPPER, LIKE/REGEXP, DATE_FORMAT/TO_CHAR, DATEDIFF, DATE_ADD/INTERVAL, EXTRACT.",
            "DISTINCT vs GROUP BY, and UNION vs UNION ALL (UNION deduplicates, which costs a sort or hash)."
          ],
          practice: [
            { t: "Recyclable and Low Fat Products", p: "LC", d: "E", u: "https://leetcode.com/problems/recyclable-and-low-fat-products/" },
            { t: "Find Customer Referee", p: "LC", d: "E", u: "https://leetcode.com/problems/find-customer-referee/" },
            { t: "Big Countries", p: "LC", d: "E", u: "https://leetcode.com/problems/big-countries/" },
            { t: "Article Views I", p: "LC", d: "E", u: "https://leetcode.com/problems/article-views-i/" },
            { t: "Invalid Tweets", p: "LC", d: "E", u: "https://leetcode.com/problems/invalid-tweets/" },
            { t: "Not Boring Movies", p: "LC", d: "E", u: "https://leetcode.com/problems/not-boring-movies/" },
            { t: "Classes More Than 5 Students", p: "LC", d: "E", u: "https://leetcode.com/problems/classes-more-than-5-students/" },
            { t: "Duplicate Emails", p: "LC", d: "E", u: "https://leetcode.com/problems/duplicate-emails/" },
            { t: "Queries Quality and Percentage", p: "LC", d: "E", u: "https://leetcode.com/problems/queries-quality-and-percentage/" },
            { t: "Monthly Transactions I", p: "LC", d: "M", u: "https://leetcode.com/problems/monthly-transactions-i/" },
            { t: "Number of Unique Subjects Taught by Each Teacher", p: "LC", d: "E", u: "https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/" },
            { t: "Fix Names in a Table", p: "LC", d: "E", u: "https://leetcode.com/problems/fix-names-in-a-table/" },
            { t: "Group Sold Products By The Date", p: "LC", d: "E", u: "https://leetcode.com/problems/group-sold-products-by-the-date/" },
            { t: "Histogram of Tweets", p: "DL", d: "E" },
            { t: "HackerRank: Aggregation subdomain (Revising Aggregations, Weather Observation Station 1-20)", p: "HR", d: "E" }
          ],
          notes: [
            "You cannot use a SELECT alias in WHERE because WHERE runs before SELECT. MySQL and Postgres <i>do</i> allow aliases in GROUP BY and ORDER BY, but HAVING with aliases is MySQL-only.",
            "<code>AVG(col)</code> ignores NULLs, so its denominator is the non-null count. Use <code>AVG(COALESCE(col,0))</code> if NULL should count as 0.",
            "Ratio trick: <code>AVG(CASE WHEN cond THEN 1.0 ELSE 0 END)</code> gives the fraction directly. In MySQL, <code>AVG(cond)</code> works because booleans are 0/1.",
            "<code>NOT IN (subquery)</code> returns <b>no rows</b> if the subquery yields any NULL. Use NOT EXISTS instead.",
            "Integer division: in Postgres and SQL Server <code>1/2 = 0</code>. Multiply by 1.0 or cast. MySQL returns a decimal.",
            "<code>ROUND(x, 2)</code> is almost always required in LeetCode ratio questions. Read the output spec.",
            "Every non-aggregated SELECT column must be in GROUP BY (standard SQL). MySQL with ONLY_FULL_GROUP_BY off lets you break this, but do not rely on it."
          ],
          cases: [
            "<code>COUNT(col)</code> skips NULLs, so after a LEFT JOIN count a right-table column to get 0 for unmatched rows. <code>COUNT(*)</code> would give 1.",
            "<code>WHERE col &lt;&gt; 'x'</code> drops rows where col is NULL. Add <code>OR col IS NULL</code> if needed (as in Find Customer Referee).",
            "HAVING without GROUP BY treats the whole table as one group.",
            "OFFSET pagination is O(offset + n) and drifts when rows are inserted. Keyset pagination (<code>WHERE id &gt; last_id ORDER BY id LIMIT n</code>) is stable and indexable.",
            "Date filtering: <code>WHERE YEAR(d) = 2024</code> cannot use an index on d. Write a range instead: <code>d &gt;= '2024-01-01' AND d &lt; '2025-01-01'</code>.",
            "DISTINCT applies to the whole selected row, not just the first column."
          ],
          qa: [
            { q: "Difference between WHERE and HAVING?", a: "WHERE filters individual rows <b>before</b> grouping and cannot use aggregates. HAVING filters groups <b>after</b> GROUP BY and can use aggregates. Push whatever you can into WHERE, since it reduces the rows that get grouped." },
            { q: "COUNT(*) vs COUNT(1) vs COUNT(col)?", a: "COUNT(*) and COUNT(1) both count rows, including NULLs, and perform identically in modern engines. COUNT(col) counts non-NULL values of col. COUNT(DISTINCT col) counts unique non-NULL values." },
            { q: "What is the logical order of execution of a SQL query?", a: "FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT (including window functions), DISTINCT, ORDER BY, LIMIT. That is why aliases are not visible in WHERE, and why you filter on a window function from an outer query or CTE." },
            { q: "UNION vs UNION ALL?", a: "UNION removes duplicates, which needs a sort or hash. UNION ALL keeps every row and is faster. Use UNION ALL unless you actually need deduplication." },
            { q: "How does NULL behave in comparisons and aggregates?", a: "Any comparison with NULL is UNKNOWN, which WHERE treats as false. Aggregates skip NULLs, except COUNT(*). GROUP BY puts all NULLs into one group. Use IS [NOT] NULL, COALESCE, or <code>IS DISTINCT FROM</code> (Postgres) for null-safe comparison." }
          ],
          code: `-- Conditional aggregation + ratio (common OA shape)
SELECT
  DATE_FORMAT(trans_date, '%Y-%m')                         AS month,   -- Postgres: TO_CHAR(trans_date,'YYYY-MM')
  country,
  COUNT(*)                                                 AS trans_count,
  SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END)      AS approved_count,
  SUM(amount)                                              AS trans_total_amount,
  SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount,
  ROUND(AVG(CASE WHEN state = 'approved' THEN 1.0 ELSE 0 END), 2) AS approval_rate
FROM Transactions
WHERE trans_date >= '2024-01-01'          -- sargable range, not YEAR(trans_date)=2024
GROUP BY month, country
HAVING COUNT(*) >= 1
ORDER BY month, country;`
        },
        {
          id: "sql-joins",
          title: "JOINs: inner, outer, cross, self, semi & anti join",
          est: "2 days",
          why: "Most SQL interview questions have at least one join. Self joins and anti joins (\"customers who never ordered\") are interview favourites.",
          learn: [
            "INNER JOIN, LEFT/RIGHT OUTER JOIN, FULL OUTER JOIN (MySQL has none, so emulate it with LEFT UNION RIGHT), CROSS JOIN.",
            "<b>Self join</b>: the same table under two aliases, e.g. employee to manager, or comparing a row with the previous day.",
            "<b>Anti join</b>: rows in A with no match in B. Write it as LEFT JOIN ... WHERE b.key IS NULL, or NOT EXISTS.",
            "<b>Semi join</b>: rows in A that have at least one match in B, with no duplication. Write it as EXISTS or IN.",
            "ON vs WHERE in outer joins: a condition on the right table placed in WHERE turns a LEFT JOIN into an INNER JOIN.",
            "Join fan-out: one-to-many joins duplicate left rows, so aggregating afterwards double-counts.",
            "Non-equi joins (BETWEEN, &lt;, &gt;), e.g. price at a given date, or bucketing values into ranges.",
            "CROSS JOIN to generate every combination, e.g. students × subjects, then LEFT JOIN the facts onto it."
          ],
          practice: [
            { t: "Combine Two Tables", p: "LC", d: "E", u: "https://leetcode.com/problems/combine-two-tables/" },
            { t: "Replace Employee ID With The Unique Identifier", p: "LC", d: "E", u: "https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/" },
            { t: "Customer Who Visited but Did Not Make Any Transactions", p: "LC", d: "E", u: "https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/" },
            { t: "Rising Temperature (self join on date)", p: "LC", d: "E", u: "https://leetcode.com/problems/rising-temperature/" },
            { t: "Average Time of Process per Machine", p: "LC", d: "E", u: "https://leetcode.com/problems/average-time-of-process-per-machine/" },
            { t: "Employee Bonus", p: "LC", d: "E", u: "https://leetcode.com/problems/employee-bonus/" },
            { t: "Students and Examinations (cross join + left join)", p: "LC", d: "E", u: "https://leetcode.com/problems/students-and-examinations/" },
            { t: "Managers with at Least 5 Direct Reports", p: "LC", d: "M", u: "https://leetcode.com/problems/managers-with-at-least-5-direct-reports/" },
            { t: "Confirmation Rate", p: "LC", d: "M", u: "https://leetcode.com/problems/confirmation-rate/" },
            { t: "Employees Earning More Than Their Managers", p: "LC", d: "E", u: "https://leetcode.com/problems/employees-earning-more-than-their-managers/" },
            { t: "Customers Who Never Order", p: "LC", d: "E", u: "https://leetcode.com/problems/customers-who-never-order/" },
            { t: "Sales Person", p: "LC", d: "E", u: "https://leetcode.com/problems/sales-person/" },
            { t: "Page With No Likes", p: "DL", d: "E" },
            { t: "SQLZoo: JOIN and More JOIN operations", p: "SQLZ", d: "E", u: "https://sqlzoo.net/" }
          ],
          notes: [
            "LEFT JOIN result rows ≥ left rows (equal only if each left row matches at most once). INNER JOIN can be larger than either side because of fan-out.",
            "Anti-join pattern: <code>FROM a LEFT JOIN b ON a.id = b.a_id WHERE b.a_id IS NULL</code>. Test the <b>join key</b> (or a NOT NULL column) of b for NULL.",
            "Filter the right table <b>inside ON</b> to keep unmatched left rows: <code>LEFT JOIN orders o ON o.cid = c.id AND o.year = 2024</code>.",
            "Self join for hierarchy: <code>FROM Employee e JOIN Employee m ON e.managerId = m.id</code>.",
            "Avoid fan-out double counting: pre-aggregate each child table in a subquery or CTE, then join the aggregates.",
            "Missing combinations (\"show 0 for subjects not attended\"): CROSS JOIN the dimensions, LEFT JOIN the fact table, then COUNT(fact.col)."
          ],
          cases: [
            "<code>LEFT JOIN b ... WHERE b.status = 'x'</code> silently becomes an inner join. Move the predicate into ON.",
            "Joining on a nullable column: NULL = NULL is not true, so those rows never match.",
            "Joining two child tables (orders and payments) to one customer multiplies rows. Sums become wrong, not just duplicated.",
            "RIGHT JOIN is just a LEFT JOIN with the tables swapped. Interviewers like LEFT JOIN for readability.",
            "Follow-up: \"Which is faster, NOT EXISTS or LEFT JOIN IS NULL?\" Modern optimizers turn both into an anti join. NOT IN differs because of NULL semantics."
          ],
          qa: [
            { q: "Explain the different types of joins.", a: "INNER returns matching pairs only. LEFT returns all left rows, with NULLs where the right side has no match. RIGHT is the mirror image. FULL returns all rows from both sides. CROSS is the Cartesian product. SELF joins a table to itself. Semi join (EXISTS) and anti join (NOT EXISTS) are logical patterns, not keywords." },
            { q: "How do you find customers who never placed an order?", a: "<code>SELECT c.name FROM Customers c WHERE NOT EXISTS (SELECT 1 FROM Orders o WHERE o.customerId = c.id)</code>, or a LEFT JOIN with <code>WHERE o.id IS NULL</code>. Avoid NOT IN if Orders.customerId can be NULL." },
            { q: "Why can a LEFT JOIN return more rows than the left table?", a: "When a left row matches several right rows (one-to-many), it appears once per match. LEFT JOIN guarantees at least one row per left row, not exactly one." },
            { q: "How do you emulate FULL OUTER JOIN in MySQL?", a: "<code>SELECT ... FROM a LEFT JOIN b ON ... UNION SELECT ... FROM a RIGHT JOIN b ON ...</code>. Or use UNION ALL, with the second half filtered to <code>WHERE a.id IS NULL</code> so matched rows are not deduplicated incorrectly." }
          ],
          code: `-- Anti join, semi join, and the ON-vs-WHERE trap
-- 1) Customers with no orders in 2024 (anti join)
SELECT c.id, c.name
FROM Customers c
LEFT JOIN Orders o
       ON o.customer_id = c.id
      AND o.order_date >= '2024-01-01' AND o.order_date < '2025-01-01'   -- filter in ON
WHERE o.id IS NULL;

-- 2) Same with NOT EXISTS (NULL-safe, usually same plan)
SELECT c.id, c.name
FROM Customers c
WHERE NOT EXISTS (SELECT 1 FROM Orders o
                  WHERE o.customer_id = c.id
                    AND o.order_date >= '2024-01-01' AND o.order_date < '2025-01-01');

-- 3) All student x subject pairs with attendance count (0 if none)
SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams
FROM Students s
CROSS JOIN Subjects sub
LEFT JOIN Examinations e
       ON e.student_id = s.student_id AND e.subject_name = sub.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
ORDER BY s.student_id, sub.subject_name;`
        },
        {
          id: "sql-subqueries",
          title: "Subqueries, correlated subqueries, EXISTS vs IN",
          est: "1-2 days",
          why: "Second-highest salary, \"above department average\" and \"bought all products\" questions all rely on subqueries. EXISTS vs IN is a standard theory question.",
          learn: [
            "Scalar subquery (returns one value), row/table subquery, derived table (subquery in FROM, needs an alias).",
            "<b>Correlated subquery</b>: refers to the outer row and logically re-runs per row. Optimizers often decorrelate it into a join.",
            "IN / NOT IN, EXISTS / NOT EXISTS, ANY/SOME/ALL comparisons.",
            "EXISTS short-circuits on the first match and does not care about the SELECT list (<code>SELECT 1</code>).",
            "Subquery vs JOIN vs CTE: readability, plus when each is evaluated once and when per row.",
            "Relational division in SQL: \"customers who bought all products\" with GROUP BY plus HAVING COUNT(DISTINCT) equal to the total."
          ],
          practice: [
            { t: "Second Highest Salary", p: "LC", d: "M", u: "https://leetcode.com/problems/second-highest-salary/" },
            { t: "Employees Whose Manager Left the Company", p: "LC", d: "E", u: "https://leetcode.com/problems/employees-whose-manager-left-the-company/" },
            { t: "Customers Who Bought All Products", p: "LC", d: "M", u: "https://leetcode.com/problems/customers-who-bought-all-products/" },
            { t: "Product Price at a Given Date", p: "LC", d: "M", u: "https://leetcode.com/problems/product-price-at-a-given-date/" },
            { t: "Immediate Food Delivery II", p: "LC", d: "M", u: "https://leetcode.com/problems/immediate-food-delivery-ii/" },
            { t: "Game Play Analysis IV", p: "LC", d: "M", u: "https://leetcode.com/problems/game-play-analysis-iv/" },
            { t: "Investments in 2016", p: "LC", d: "M", u: "https://leetcode.com/problems/investments-in-2016/" },
            { t: "Department Highest Salary", p: "LC", d: "M", u: "https://leetcode.com/problems/department-highest-salary/" },
            { t: "Percentage of Users Attended a Contest", p: "LC", d: "E", u: "https://leetcode.com/problems/percentage-of-users-attended-a-contest/" },
            { t: "Employees earning above their department average", p: "SS", d: "M" },
            { t: "Teams Power Users", p: "DL", d: "E" }
          ],
          notes: [
            "\"Return NULL if there is no 2nd highest\" trick: wrap it as a scalar subquery, since <code>SELECT (SELECT ... LIMIT 1 OFFSET 1) AS SecondHighestSalary</code> yields NULL on empty.",
            "Correlated \"above department average\": <code>WHERE salary &gt; (SELECT AVG(salary) FROM emp e2 WHERE e2.dept = e.dept)</code>. A window function <code>AVG() OVER (PARTITION BY dept)</code> is usually cleaner.",
            "Tuple IN works in MySQL and Postgres: <code>WHERE (dept, salary) IN (SELECT dept, MAX(salary) FROM emp GROUP BY dept)</code>.",
            "EXISTS is natural for \"has at least one\". IN is natural for a small static list or an uncorrelated set.",
            "ALL with an empty set is TRUE, and ANY with an empty set is FALSE.",
            "Derived tables in MySQL must have an alias: <code>FROM (SELECT ...) t</code>."
          ],
          cases: [
            "<b>NOT IN with NULLs</b>: <code>x NOT IN (1, NULL)</code> is UNKNOWN for every x, so the result is empty. This is the most common trick question.",
            "A scalar subquery that returns more than one row is a runtime error. Guard it with LIMIT 1 or an aggregate.",
            "\"Is EXISTS always faster than IN?\" Not in modern optimizers, which rewrite both as semi joins. Historically (old MySQL) IN-subqueries were slow.",
            "Duplicates: an IN/EXISTS semi join never duplicates outer rows, but a JOIN does, so switching between them can change counts.",
            "Game Play Analysis IV: the denominator is <b>distinct players</b>, not rows. Find each player's first login with MIN, then check first_login + 1 day."
          ],
          qa: [
            { q: "Difference between EXISTS and IN?", a: "IN compares a value with the result set of a subquery or list. EXISTS tests whether a correlated subquery returns any row and stops at the first match. Semantically they differ only with NULLs: <b>NOT IN breaks when the subquery has NULLs</b>, NOT EXISTS does not. Performance is usually the same in modern optimizers." },
            { q: "What is a correlated subquery?", a: "A subquery that references columns of the outer query, so logically it is evaluated once per outer row (e.g. salary greater than that employee's department average). Optimizers can often decorrelate it into a join or aggregate. If they cannot, it is O(n·m)." },
            { q: "Write the 2nd highest salary query, returning NULL if none.", a: "<code>SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary &lt; (SELECT MAX(salary) FROM Employee);</code> MAX over an empty set returns NULL. An alternative is the OFFSET 1 scalar-subquery form." },
            { q: "Subquery or JOIN, which do you prefer?", a: "Whichever is clearer. Optimizers usually produce the same plan. Use a JOIN when you need columns from both sides, EXISTS for existence checks (no duplication), and a CTE when you reuse a subquery or want readable steps." }
          ],
          code: `-- Second highest distinct salary (NULL if none)
SELECT (
  SELECT DISTINCT salary
  FROM Employee
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;

-- Relational division: customers who bought ALL products
SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);

-- Correlated: employees paid above their department average
SELECT e.name, e.dept_id, e.salary
FROM Employee e
WHERE e.salary > (SELECT AVG(e2.salary) FROM Employee e2 WHERE e2.dept_id = e.dept_id);`
        }
      ]
    },
    {
      name: "Intermediate · SQL for interviews",
      desc: "Window functions, CTEs and the recurring patterns in product-company SQL rounds, plus DDL and database objects.",
      topics: [
        {
          id: "window-functions",
          title: "Window functions: ranking, LAG/LEAD, running totals, frames",
          est: "4-5 days",
          why: "The single most important SQL skill for product and data/AI roles. Most DataLemur and FAANG medium/hard SQL questions are window-function questions.",
          learn: [
            "Syntax: <code>fn() OVER (PARTITION BY ... ORDER BY ... ROWS/RANGE BETWEEN ...)</code>. Unlike GROUP BY, rows are not collapsed.",
            "<b>ROW_NUMBER vs RANK vs DENSE_RANK</b> on ties (1,2,3 vs 1,1,3 vs 1,1,2). Also NTILE, PERCENT_RANK, CUME_DIST.",
            "LAG/LEAD(col, offset, default) for comparing with the previous or next row (day-over-day change, session gaps).",
            "Aggregate windows: running total <code>SUM() OVER (ORDER BY d)</code>, partition totals, % of total, moving average.",
            "Frames: <code>ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</code> vs RANGE. The default frame with ORDER BY is <b>RANGE UNBOUNDED PRECEDING to CURRENT ROW</b>.",
            "FIRST_VALUE / LAST_VALUE / NTH_VALUE, and why LAST_VALUE needs an explicit frame.",
            "You cannot use a window function in WHERE, so wrap it in a CTE or subquery and filter outside (or use QUALIFY in Snowflake/BigQuery/Databricks).",
            "Named windows (<code>WINDOW w AS (...)</code>) and performance: each distinct PARTITION/ORDER needs a sort."
          ],
          practice: [
            { t: "Rank Scores", p: "LC", d: "M", u: "https://leetcode.com/problems/rank-scores/" },
            { t: "Department Top Three Salaries", p: "LC", d: "H", u: "https://leetcode.com/problems/department-top-three-salaries/" },
            { t: "Consecutive Numbers", p: "LC", d: "M", u: "https://leetcode.com/problems/consecutive-numbers/" },
            { t: "Last Person to Fit in the Bus (running sum)", p: "LC", d: "M", u: "https://leetcode.com/problems/last-person-to-fit-in-the-bus/" },
            { t: "Restaurant Growth (7-day moving average)", p: "LC", d: "M", u: "https://leetcode.com/problems/restaurant-growth/" },
            { t: "Exchange Seats", p: "LC", d: "M", u: "https://leetcode.com/problems/exchange-seats/" },
            { t: "Product Sales Analysis III", p: "LC", d: "M", u: "https://leetcode.com/problems/product-sales-analysis-iii/" },
            { t: "Primary Department for Each Employee", p: "LC", d: "E", u: "https://leetcode.com/problems/primary-department-for-each-employee/" },
            { t: "User's Third Transaction", p: "DL", d: "M" },
            { t: "Highest-Grossing Items (top 2 per category)", p: "DL", d: "M" },
            { t: "Odd and Even Measurements", p: "DL", d: "M" },
            { t: "Y-on-Y Growth Rate", p: "DL", d: "H" },
            { t: "Top Three Salaries / Ranking Most Active Guests", p: "SS", d: "M" },
            { t: "Mode SQL: Window Functions lesson", p: "DOC", d: "E", u: "https://mode.com/sql-tutorial/sql-window-functions/" }
          ],
          notes: [
            "Pick the ranking function from the tie rule. \"Top 3 <b>distinct salaries</b>\" means DENSE_RANK. \"Exactly 1 row per group\" means ROW_NUMBER. \"Olympic ranking\" means RANK.",
            "% of total: <code>100.0 * amt / SUM(amt) OVER (PARTITION BY grp)</code>.",
            "Moving 7-day average: <code>AVG(x) OVER (ORDER BY d ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</code>. This assumes one row per day with no gaps. If there are gaps, use RANGE with an INTERVAL (Postgres) or a self join.",
            "Running total with duplicate ORDER BY values: the default RANGE frame includes <b>all peers</b>, so tied rows get the same total. Use ROWS for a strict per-row total.",
            "<code>LAST_VALUE(x) OVER (ORDER BY d)</code> returns the current row because of the default frame. Add <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code>.",
            "LAG with default: <code>LAG(x, 1, 0) OVER (...)</code> avoids NULL on the first row.",
            "Consecutive Numbers: <code>num = LAG(num,1)</code> and <code>num = LAG(num,2)</code>, assuming ids are consecutive. Otherwise use ROW_NUMBER gaps and islands."
          ],
          cases: [
            "Filtering <code>WHERE rn &lt;= 3</code> in the same SELECT fails. Window functions run after WHERE.",
            "ORDER BY inside OVER does not order the final output. Add an outer ORDER BY.",
            "MySQL 5.7 has no window functions (8.0+ does). Some old OA platforms still run 5.7, so know the self-join or variable fallback.",
            "ROW_NUMBER with ties is non-deterministic. Add a tie-breaker column for reproducible results.",
            "Exchange Seats: handle the last odd id, which stays in place.",
            "Interviewers often follow up with \"do it without window functions\" (correlated COUNT of greater salaries, or a self join)."
          ],
          qa: [
            { q: "ROW_NUMBER vs RANK vs DENSE_RANK?", a: "For salaries 100,100,90: ROW_NUMBER gives 1,2,3 (unique, arbitrary on ties), RANK gives 1,1,3 (skips after ties), DENSE_RANK gives 1,1,2 (no gaps). Use DENSE_RANK for \"Nth highest distinct value\" and ROW_NUMBER for deduplication or exactly-one-per-group." },
            { q: "GROUP BY vs window function?", a: "GROUP BY collapses rows to one per group. A window function computes over a set of related rows but <b>keeps every row</b>, so you can show detail and aggregate side by side (salary next to the department average)." },
            { q: "How do you compute a running total and a 7-day rolling average?", a: "<code>SUM(amt) OVER (ORDER BY d ROWS UNBOUNDED PRECEDING)</code> and <code>AVG(amt) OVER (ORDER BY d ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</code>. Mention the ROWS vs RANGE difference for ties or date gaps." },
            { q: "What is the default window frame?", a: "Without ORDER BY: the whole partition. With ORDER BY: <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>, which includes peer rows with the same ORDER BY value. That surprises people with running totals and LAST_VALUE." }
          ],
          code: `-- TOP-N PER GROUP (most asked template)
WITH ranked AS (
  SELECT
    d.name  AS department,
    e.name  AS employee,
    e.salary,
    DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk
  FROM Employee e
  JOIN Department d ON d.id = e.departmentId
)
SELECT department, employee, salary
FROM ranked
WHERE rnk <= 3;                      -- filter OUTSIDE the window query

-- LAG/LEAD: day-over-day change + running total + 7-day moving avg
SELECT
  visited_on,
  amount,
  amount - LAG(amount, 1, 0) OVER (ORDER BY visited_on)                          AS dod_change,
  SUM(amount) OVER (ORDER BY visited_on ROWS UNBOUNDED PRECEDING)                AS running_total,
  ROUND(AVG(amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS ma7,
  100.0 * amount / SUM(amount) OVER ()                                           AS pct_of_total
FROM daily_sales;`
        },
        {
          id: "ctes",
          title: "CTEs & recursive CTEs",
          est: "1-2 days",
          why: "CTEs are how you write readable multi-step interview SQL. Recursive CTEs come up for org charts, hierarchies and generating date series.",
          learn: [
            "<code>WITH a AS (...), b AS (SELECT ... FROM a)</code>: chaining steps, readability, reusing one result several times.",
            "CTE vs subquery vs temp table vs view: scope, materialization, reuse.",
            "Materialization: Postgres before 12 always materialized CTEs (an optimization fence). Since 12 they are inlined unless <code>MATERIALIZED</code> is given.",
            "<b>Recursive CTE</b>: anchor member, UNION ALL, recursive member, termination condition.",
            "Use cases: employee to manager chains (depth, path), category trees, bill of materials, generating number or date series.",
            "Cycle protection: depth limit, a path array, or Postgres <code>CYCLE</code> clause. Also MySQL <code>cte_max_recursion_depth</code>."
          ],
          practice: [
            { t: "Tree Node (root / inner / leaf)", p: "LC", d: "M", u: "https://leetcode.com/problems/tree-node/" },
            { t: "Find the Missing IDs (recursive series, premium)", p: "LC", d: "M", u: "https://leetcode.com/problems/find-the-missing-ids/" },
            { t: "All People Report to the Given Manager (premium)", p: "LC", d: "M", u: "https://leetcode.com/problems/all-people-report-to-the-given-manager/" },
            { t: "Write a recursive CTE: full reporting chain plus depth for every employee", p: "BUILD", d: "M" },
            { t: "Generate a calendar table for 2024 with a recursive CTE, then LEFT JOIN sales to fill zero days", p: "BUILD", d: "M" },
            { t: "Rewrite Department Top Three Salaries as a two-CTE pipeline", p: "BUILD", d: "E" },
            { t: "HackerRank: Advanced Select subdomain (Binary Tree Nodes, New Companies)", p: "HR", d: "M" }
          ],
          notes: [
            "Structure: <code>WITH RECURSIVE r AS (anchor UNION ALL SELECT ... FROM r JOIN t ON ... WHERE depth &lt; N) SELECT * FROM r;</code>",
            "MySQL 8+ and Postgres require the <code>RECURSIVE</code> keyword. SQL Server and Oracle do not.",
            "Use UNION ALL in recursion. UNION also deduplicates, which can stop cycles but costs more.",
            "Date series in Postgres: <code>generate_series('2024-01-01'::date, '2024-12-31', interval '1 day')</code>. Elsewhere use a recursive CTE.",
            "A CTE is visible only within the single statement that defines it.",
            "Interview style: name each CTE after the business step (first_login, day1_returns, cohort_sizes). Interviewers grade readability."
          ],
          cases: [
            "Recursion without a termination predicate loops until the engine limit (MySQL default 1000), then errors.",
            "Tree Node: a node is <b>Inner</b> if it has a parent and appears as someone's parent. Watch NOT IN with a NULL p_id (the root). Filter <code>WHERE p_id IS NOT NULL</code> in the subquery.",
            "Referencing a CTE twice may compute it twice (inlined) or once (materialized), depending on the engine. This matters for expensive or non-deterministic CTEs.",
            "Recursive CTEs cannot use aggregates or LIMIT in the recursive member in most engines."
          ],
          qa: [
            { q: "What is a CTE and when would you use one over a subquery?", a: "A named temporary result set defined with WITH and scoped to one statement. Use it for readability (step-by-step logic), to reference the same derived set several times, and for recursion. Performance is usually equal to a subquery in modern engines." },
            { q: "How does a recursive CTE work?", a: "The anchor query produces the seed rows. The recursive member is joined repeatedly to the rows produced in the previous iteration, and the results are unioned until an iteration returns no rows. Example: start with the CEO, then repeatedly join employees whose manager_id is in the previous level, tracking depth." },
            { q: "CTE vs temp table vs view?", a: "A CTE lives for one statement and has no indexes. A temp table lives for the session, can be indexed and reused across statements, and suits big intermediate results. A view is a stored query, persistent and reusable, recomputed on each use unless materialized." }
          ],
          code: `-- Recursive org chart: every employee with depth and path from CEO
WITH RECURSIVE chain AS (
  SELECT id, name, manager_id, 0 AS depth, CAST(name AS CHAR(1000)) AS path
  FROM Employee
  WHERE manager_id IS NULL                         -- anchor: CEO
  UNION ALL
  SELECT e.id, e.name, e.manager_id, c.depth + 1,
         CONCAT(c.path, ' > ', e.name)
  FROM Employee e
  JOIN chain c ON e.manager_id = c.id              -- recursive member
  WHERE c.depth < 20                               -- safety stop
)
SELECT * FROM chain ORDER BY depth, name;

-- Date series to fill gaps (MySQL 8 / generic)
WITH RECURSIVE days AS (
  SELECT DATE('2024-01-01') AS d
  UNION ALL
  SELECT d + INTERVAL 1 DAY FROM days WHERE d < '2024-01-31'
)
SELECT days.d, COALESCE(SUM(s.amount), 0) AS revenue
FROM days LEFT JOIN Sales s ON s.sale_date = days.d
GROUP BY days.d ORDER BY days.d;`
        },
        {
          id: "sql-patterns",
          title: "Interview patterns: Nth highest, gaps & islands, retention, median, pivot",
          est: "5-7 days",
          why: "Product-company SQL rounds repeat about 8 shapes. Recognising the shape in the first minute is most of the battle.",
          learn: [
            "<b>Nth highest</b>: DENSE_RANK = N, or <code>LIMIT 1 OFFSET N-1</code> on DISTINCT values, or a correlated count of greater distinct values.",
            "<b>Top-N per group</b>: ROW_NUMBER/DENSE_RANK partitioned by group, filtered outside.",
            "<b>Deduplication</b>: keep the latest row per key with ROW_NUMBER, or DELETE with a self join.",
            "<b>Gaps and islands / consecutive streaks</b>: <code>date - ROW_NUMBER()</code> (or <code>id - ROW_NUMBER()</code>) is constant within a streak, so group by it.",
            "<b>Retention / cohort</b>: first activity date per user, then join activity back on day+1 / week N. Day-1 retention = returning users / cohort size.",
            "<b>Median</b>: ROW_NUMBER plus COUNT window and pick the middle row(s), or PERCENTILE_CONT(0.5) WITHIN GROUP where supported (Postgres, not MySQL).",
            "<b>Pivot</b>: conditional aggregation <code>SUM(CASE WHEN month='Jan' THEN revenue END)</code>. <b>Unpivot</b>: UNION ALL of columns.",
            "Session-ization: a new session starts when the gap from LAG(ts) exceeds 30 min. A running SUM of the new-session flag gives the session id.",
            "Funnels and ratios: conditional COUNT DISTINCT per step, and cancellation rate (Trips and Users)."
          ],
          practice: [
            { t: "Nth Highest Salary", p: "LC", d: "M", u: "https://leetcode.com/problems/nth-highest-salary/" },
            { t: "Delete Duplicate Emails", p: "LC", d: "E", u: "https://leetcode.com/problems/delete-duplicate-emails/" },
            { t: "Human Traffic of Stadium (islands of 3+)", p: "LC", d: "H", u: "https://leetcode.com/problems/human-traffic-of-stadium/" },
            { t: "Trips and Users (cancellation rate)", p: "LC", d: "H", u: "https://leetcode.com/problems/trips-and-users/" },
            { t: "Game Play Analysis IV (day-1 retention)", p: "LC", d: "M", u: "https://leetcode.com/problems/game-play-analysis-iv/" },
            { t: "Friend Requests II: Who Has the Most Friends (unpivot)", p: "LC", d: "M", u: "https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/" },
            { t: "Reformat Department Table (pivot)", p: "LC", d: "E", u: "https://leetcode.com/problems/reformat-department-table/" },
            { t: "Rearrange Products Table (unpivot)", p: "LC", d: "E", u: "https://leetcode.com/problems/rearrange-products-table/" },
            { t: "Count Salary Categories", p: "LC", d: "M", u: "https://leetcode.com/problems/count-salary-categories/" },
            { t: "Movie Rating", p: "LC", d: "M", u: "https://leetcode.com/problems/movie-rating/" },
            { t: "Median Employee Salary (premium)", p: "LC", d: "H", u: "https://leetcode.com/problems/median-employee-salary/" },
            { t: "Find the Start and End Number of Continuous Ranges (premium)", p: "LC", d: "M", u: "https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges/" },
            { t: "Active User Retention", p: "DL", d: "H" },
            { t: "Repeated Payments / Uber users' third ride", p: "DL", d: "H" },
            { t: "User streaks / longest consecutive login days", p: "SS", d: "H" }
          ],
          notes: [
            "Gaps and islands key: <code>grp = DATE_SUB(d, INTERVAL ROW_NUMBER() OVER (PARTITION BY user ORDER BY d) DAY)</code>. Consecutive days share the same grp. Streak length = COUNT(*) per (user, grp).",
            "Dedupe before islands if a user can have several rows per day (use DISTINCT or DENSE_RANK).",
            "Median without PERCENTILE: rows where <code>rn IN (FLOOR((cnt+1)/2), FLOOR((cnt+2)/2))</code>, then AVG. This handles odd and even counts.",
            "Nth highest via a function (LC 177): <code>DECLARE M INT; SET M = N-1; RETURN (SELECT DISTINCT salary ... LIMIT 1 OFFSET M);</code>, because MySQL LIMIT cannot take an expression.",
            "Trips and Users: filter <b>both</b> client and driver to unbanned users (two joins or IN), restrict the date range, then <code>ROUND(AVG(status &lt;&gt; 'completed'), 2)</code> per day.",
            "Retention template: <code>first AS (SELECT user, MIN(d) f ...)</code>, then LEFT JOIN activity ON user AND d = f + 1, then COUNT(DISTINCT returned) / COUNT(DISTINCT user).",
            "Pivot is engine-agnostic with CASE. PIVOT exists only in SQL Server, Oracle, Snowflake and BigQuery. crosstab is a Postgres extension."
          ],
          cases: [
            "\"Nth highest\": clarify whether duplicates count. Distinct means DENSE_RANK; positional means ROW_NUMBER. Also clarify what to return if N exceeds the count (NULL).",
            "Human Traffic of Stadium: you need islands of length at least 3 on <b>id</b> (not date) where people ≥ 100. Filter first, then <code>id - ROW_NUMBER()</code>.",
            "Delete Duplicate Emails in MySQL: you cannot DELETE from a table while selecting from it in a subquery. Use a self-join DELETE (<code>DELETE p1 FROM Person p1 JOIN Person p2 ON p1.email = p2.email AND p1.id &gt; p2.id</code>).",
            "Retention denominators are <b>cohort size</b> (distinct users), not activity rows.",
            "Session-ization edge: the first event per user has LAG NULL. Treat it as a new session.",
            "Time zones and DATE(ts) truncation in event tables are a common follow-up."
          ],
          qa: [
            { q: "Find the Nth highest salary in 3 different ways.", a: "(1) <code>SELECT DISTINCT salary ... ORDER BY salary DESC LIMIT 1 OFFSET N-1</code>. (2) DENSE_RANK in a CTE, filter rnk = N. (3) Correlated: <code>WHERE N-1 = (SELECT COUNT(DISTINCT s2.salary) FROM emp s2 WHERE s2.salary &gt; s1.salary)</code>. Wrap each to return NULL when there is no Nth." },
            { q: "How do you find users who logged in on 3+ consecutive days?", a: "Dedupe to one row per user per day. Compute <code>grp = login_date - ROW_NUMBER() OVER (PARTITION BY user ORDER BY login_date)</code>. GROUP BY user, grp HAVING COUNT(*) ≥ 3. Consecutive dates share the same grp." },
            { q: "How do you compute Day-1 retention?", a: "For each user find the first activity date (cohort). Count users who also have activity on cohort_date + 1, divided by the number of users in the cohort. Group by cohort date for a curve, or extend to week N for a cohort table." },
            { q: "How do you pivot rows to columns without a PIVOT keyword?", a: "Conditional aggregation: <code>SELECT id, SUM(CASE WHEN month='Jan' THEN revenue END) AS Jan_Revenue, ... FROM t GROUP BY id</code>. Use MAX instead of SUM for non-numeric values." }
          ],
          code: `-- GAPS & ISLANDS: longest login streak per user
WITH d AS (
  SELECT DISTINCT user_id, DATE(login_ts) AS day FROM logins
),
g AS (
  SELECT user_id, day,
         DATE_SUB(day, INTERVAL ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY day) DAY) AS grp
         -- Postgres: day - (ROW_NUMBER() OVER (...))::int
  FROM d
)
SELECT user_id, MIN(day) AS streak_start, MAX(day) AS streak_end, COUNT(*) AS streak_len
FROM g
GROUP BY user_id, grp
HAVING COUNT(*) >= 3;

-- DAY-1 RETENTION (Game Play Analysis IV)
WITH first_login AS (
  SELECT player_id, MIN(event_date) AS first_day FROM Activity GROUP BY player_id
)
SELECT ROUND(COUNT(DISTINCT a.player_id) / COUNT(DISTINCT f.player_id), 2) AS fraction
FROM first_login f
LEFT JOIN Activity a
       ON a.player_id = f.player_id AND a.event_date = DATE_ADD(f.first_day, INTERVAL 1 DAY);

-- MEDIAN without PERCENTILE_CONT (works for odd and even counts)
WITH r AS (
  SELECT salary,
         ROW_NUMBER() OVER (ORDER BY salary) AS rn,
         COUNT(*)     OVER ()                AS cnt
  FROM Employee
)
SELECT AVG(salary) AS median
FROM r
WHERE rn IN (FLOOR((cnt + 1) / 2), FLOOR((cnt + 2) / 2));

-- PIVOT via conditional aggregation
SELECT id,
       SUM(CASE WHEN month = 'Jan' THEN revenue END) AS Jan_Revenue,
       SUM(CASE WHEN month = 'Feb' THEN revenue END) AS Feb_Revenue
FROM Department
GROUP BY id;`
        },
        {
          id: "ddl-dml-objects",
          title: "DDL/DML, constraints, views, materialized views, procedures & triggers",
          est: "1-2 days",
          why: "Theory rounds ask DELETE vs TRUNCATE vs DROP, view vs materialized view, and what a trigger is. These are quick wins.",
          learn: [
            "Command families: <b>DDL</b> (CREATE, ALTER, DROP, TRUNCATE), <b>DML</b> (INSERT, UPDATE, DELETE, MERGE), <b>DQL</b> (SELECT), <b>DCL</b> (GRANT, REVOKE), <b>TCL</b> (COMMIT, ROLLBACK, SAVEPOINT).",
            "DELETE vs TRUNCATE vs DROP: row-by-row and logged vs deallocating pages vs removing the table. Rollback-ability, triggers, identity reset.",
            "Constraints: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT.",
            "UPSERT: <code>INSERT ... ON CONFLICT DO UPDATE</code> (Postgres), <code>ON DUPLICATE KEY UPDATE</code> (MySQL), MERGE.",
            "Views: security and abstraction. Updatable views and their restrictions. WITH CHECK OPTION.",
            "<b>Materialized views</b>: stored result, refresh strategy (full vs incremental, <code>REFRESH ... CONCURRENTLY</code>), staleness.",
            "Stored procedures vs functions: procedures may manage transactions and return nothing or many result sets; functions return a value and can be used inside SELECT.",
            "Triggers: BEFORE/AFTER, row vs statement level. Uses: audit logs, derived columns. Dangers: hidden logic, cascading triggers, performance."
          ],
          practice: [
            { t: "Swap Salary (single UPDATE with CASE)", p: "LC", d: "E", u: "https://leetcode.com/problems/swap-salary/" },
            { t: "Delete Duplicate Emails", p: "LC", d: "E", u: "https://leetcode.com/problems/delete-duplicate-emails/" },
            { t: "GFG: Difference between DELETE, DROP and TRUNCATE", p: "GFG", d: "E" },
            { t: "GFG: Views in SQL", p: "GFG", d: "E" },
            { t: "Design tables with PK/FK/CHECK for an e-commerce schema and write an UPSERT for inventory", p: "BUILD", d: "M" },
            { t: "Write an AFTER UPDATE trigger that writes to an audit table (Postgres or MySQL)", p: "BUILD", d: "M" },
            { t: "Create a materialized view for daily revenue and schedule its refresh", p: "BUILD", d: "M" }
          ],
          notes: [
            "TRUNCATE is DDL in MySQL and Oracle (implicit commit, cannot be rolled back) but <b>transactional in Postgres and SQL Server</b>. Say \"depends on the engine\".",
            "TRUNCATE does not fire row-level DELETE triggers and resets AUTO_INCREMENT/identity (MySQL, and Postgres with RESTART IDENTITY). It fails if FKs reference the table, unless CASCADE.",
            "A view stores no data (except a materialized view). It is expanded into the query at runtime.",
            "Materialized views are good for expensive aggregations on dashboards. The cost is staleness and refresh time. Postgres REFRESH CONCURRENTLY needs a unique index.",
            "CHECK constraints were parsed but <b>ignored</b> in MySQL before 8.0.16.",
            "Prefer application or stream logic over heavy triggers. Triggers make writes slower and behaviour invisible."
          ],
          cases: [
            "\"Can you roll back a DROP?\" Not in MySQL or Oracle (implicit commit). Postgres DDL is transactional, so yes inside a transaction.",
            "Updating through a view with GROUP BY, DISTINCT, aggregates or joins is generally not allowed.",
            "FK without an index on the child column means slow parent deletes, because each delete scans the child table. MySQL auto-creates the index; Postgres does not.",
            "UNIQUE constraint vs unique index: the constraint is enforced by an index. Constraints are declarative and can be referenced by FKs."
          ],
          qa: [
            { q: "DELETE vs TRUNCATE vs DROP?", a: "<b>DELETE</b>: DML, removes rows matching WHERE, logged per row, fires triggers, can be rolled back. <b>TRUNCATE</b>: removes all rows by deallocating pages. It is much faster, resets identity and does not fire row triggers; rollback depends on the engine. <b>DROP</b>: removes the table definition plus data, indexes and constraints." },
            { q: "View vs materialized view?", a: "A view is a saved query, recomputed on every access, always fresh, with no storage. A materialized view stores the result physically, so it is fast to read but stale until refreshed. Use MVs for expensive aggregates read often and tolerant of slight staleness." },
            { q: "What is a trigger? Give a use case and a downside.", a: "Code the DB runs automatically BEFORE or AFTER an INSERT/UPDATE/DELETE, per row or per statement. Use cases: audit logging, maintaining updated_at, enforcing complex invariants. Downsides: hidden side effects, harder debugging, write latency, and cascades." },
            { q: "Stored procedure vs function?", a: "A function returns a value or table and can be used inside SELECT. It usually cannot commit or have side effects (depending on the engine). A procedure is invoked with CALL, can contain transaction control and many statements, and returns via OUT params or result sets." }
          ],
          code: `-- Constraints + UPSERT + audit trigger (Postgres)
CREATE TABLE inventory (
  sku        TEXT PRIMARY KEY,
  qty        INT  NOT NULL CHECK (qty >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO inventory (sku, qty) VALUES ('A1', 5)
ON CONFLICT (sku) DO UPDATE SET qty = inventory.qty + EXCLUDED.qty, updated_at = now();
-- MySQL: INSERT ... ON DUPLICATE KEY UPDATE qty = qty + VALUES(qty);

CREATE MATERIALIZED VIEW daily_revenue AS
SELECT order_date, SUM(amount) AS revenue FROM orders GROUP BY order_date;
CREATE UNIQUE INDEX ON daily_revenue (order_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY daily_revenue;

-- Swap 'm'/'f' in one UPDATE
UPDATE Salary SET sex = CASE sex WHEN 'm' THEN 'f' ELSE 'm' END;`
        }
      ]
    },
    {
      name: "Advanced · Internals",
      desc: "Transactions, concurrency control, indexing, query execution and recovery: the senior-level theory questions. Pair with CMU 15-445.",
      topics: [
        {
          id: "transactions-isolation",
          title: "Transactions, ACID, isolation levels & MVCC",
          est: "3 days",
          why: "\"Explain ACID\" and \"what isolation level does Postgres/MySQL use and what anomalies can occur\" are near-certain in backend and senior interviews.",
          learn: [
            "Transaction states: active, partially committed, committed, failed, aborted.",
            "<b>ACID</b>: Atomicity (all or nothing, via undo/WAL), Consistency (invariants and constraints hold), Isolation (concurrent transactions appear serial), Durability (committed means survives a crash, via WAL fsync).",
            "Anomalies: <b>dirty read</b>, <b>non-repeatable read</b>, <b>phantom read</b>, lost update, <b>write skew</b>, read skew.",
            "SQL isolation levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE, and which anomalies each prevents.",
            "Defaults: <b>Postgres = READ COMMITTED</b>, <b>MySQL InnoDB = REPEATABLE READ</b>, SQL Server = READ COMMITTED (locking), Oracle = READ COMMITTED.",
            "<b>MVCC</b>: each write creates a new row version with transaction ids. Readers use a snapshot and never block writers. Cleanup is VACUUM (Postgres) or purge of undo logs (InnoDB).",
            "Snapshot isolation (SI) and why it still allows write skew. Serializable Snapshot Isolation (SSI, Postgres SERIALIZABLE).",
            "Schedules: serial vs serializable. Conflict serializability via the precedence graph (acyclic means serializable). View serializability. Recoverable and cascadeless schedules."
          ],
          practice: [
            { t: "GFG: ACID Properties in DBMS", p: "GFG", d: "E" },
            { t: "GFG: Transaction Isolation Levels in DBMS", p: "GFG", d: "M" },
            { t: "GFG: Conflict Serializability (precedence graph) + 5 GATE PYQs", p: "GFG", d: "M" },
            { t: "Reproduce non-repeatable read and phantom in two psql sessions under READ COMMITTED vs REPEATABLE READ", p: "BUILD", d: "M" },
            { t: "Reproduce write skew (two on-call doctors) under REPEATABLE READ, then fix with SERIALIZABLE or SELECT ... FOR UPDATE", p: "BUILD", d: "H" },
            { t: "CMU 15-445: Concurrency Control Theory + MVCC lectures", p: "YT", d: "M", u: "https://15445.courses.cs.cmu.edu/" },
            { t: "Designing Data-Intensive Applications Ch. 7 (Transactions)", p: "BOOK", d: "M" }
          ],
          notes: [
            "Isolation table: RU allows dirty, non-repeatable and phantom reads. RC prevents dirty reads. RR also prevents non-repeatable reads (per the standard; phantoms are allowed). SERIALIZABLE prevents all of them.",
            "InnoDB RR uses consistent snapshots plus <b>next-key (gap) locks</b> for locking reads, so phantoms are largely prevented in practice. Postgres RR is true snapshot isolation (no phantoms in plain reads).",
            "Lost update fix: atomic <code>UPDATE ... SET x = x + 1</code>, <code>SELECT ... FOR UPDATE</code>, optimistic version check, or a higher isolation level.",
            "Write skew: two transactions read the same condition (≥ 1 doctor on call), each updates a <i>different</i> row, and the invariant breaks. SI does not catch it because there is no write-write conflict.",
            "The \"C\" in ACID is partly the application's responsibility. The DB enforces declared constraints only.",
            "Conflicting operations: two operations on the same item from different transactions where at least one is a write (RW, WR, WW).",
            "MVCC cost in Postgres: dead tuples, table bloat, VACUUM and autovacuum tuning, transaction id wraparound."
          ],
          cases: [
            "\"Does REPEATABLE READ prevent phantoms?\" The standard says no. Postgres says yes (snapshot). InnoDB: for consistent reads yes, and locking reads use gap locks. Give the nuanced answer.",
            "Consistency in ACID is not the same as consistency in CAP (linearizability). Interviewers check whether you conflate them.",
            "Long-running transactions in an MVCC DB block VACUUM and cause bloat. Mention this for analytics queries on OLTP primaries.",
            "Autocommit: each statement is its own transaction unless BEGIN is used. ORMs sometimes hide this.",
            "A serializable schedule is not the same as a serial schedule. Serializable only means equivalent to some serial order."
          ],
          qa: [
            { q: "Explain ACID with how a DB implements each.", a: "<b>Atomicity</b>: undo logging / WAL lets an aborted transaction roll back. <b>Consistency</b>: constraints, triggers and application invariants hold before and after. <b>Isolation</b>: locking (2PL) or MVCC snapshots. <b>Durability</b>: the WAL is flushed (fsync) before commit is acknowledged, plus replication." },
            { q: "What are the isolation levels and which anomalies does each prevent?", a: "READ UNCOMMITTED: nothing (dirty reads possible). READ COMMITTED: no dirty reads. REPEATABLE READ: also no non-repeatable reads. SERIALIZABLE: also no phantoms or write skew; the result equals some serial order. Postgres defaults to RC and MySQL InnoDB to RR." },
            { q: "What is MVCC and why is it used?", a: "Multi-Version Concurrency Control keeps several versions of a row tagged with transaction ids. Each transaction reads a consistent snapshot, so <b>readers do not block writers and writers do not block readers</b>. Writers still conflict with writers. The cost is storing old versions and cleaning them up (VACUUM / purge)." },
            { q: "What is write skew? Give an example and a fix.", a: "Two concurrent transactions read an overlapping set, each decide based on it, and write to different rows, which violates an invariant. Example: two doctors both see 2 on call and both go off call. Fixes: SERIALIZABLE (SSI), <code>SELECT ... FOR UPDATE</code> on the rows read, or a materialized conflict row or constraint." },
            { q: "How do you check whether a schedule is conflict serializable?", a: "Build a precedence graph with a node per transaction and an edge Ti -> Tj when an operation of Ti conflicts with and precedes one of Tj. If the graph is acyclic, the schedule is conflict serializable; a topological order gives the equivalent serial schedule." }
          ]
        },
        {
          id: "concurrency-control",
          title: "Concurrency control: locks, 2PL, deadlocks, optimistic vs pessimistic",
          est: "2 days",
          why: "Comes up for backend and system-design-flavoured roles: \"how would you prevent double booking?\", \"what is a deadlock in a DB?\"",
          learn: [
            "Lock types: shared (S) and exclusive (X), the compatibility matrix, intention locks (IS, IX, SIX) for multi-granularity locking.",
            "Granularity: row vs page vs table locks, and lock escalation.",
            "<b>Two-phase locking (2PL)</b>: growing phase then shrinking phase guarantees conflict serializability. <b>Strict 2PL</b> holds X locks until commit (avoids cascading aborts). Rigorous 2PL holds all locks until commit.",
            "Deadlocks in a DBMS: wait-for graph detection plus a victim abort (Postgres, InnoDB), timeouts, and prevention schemes <b>wait-die</b> and <b>wound-wait</b>.",
            "Timestamp-ordering protocol and the Thomas write rule (high level).",
            "<b>Pessimistic locking</b>: <code>SELECT ... FOR UPDATE</code> / FOR SHARE, NOWAIT, SKIP LOCKED (job queues).",
            "<b>Optimistic locking</b>: a version column, <code>UPDATE ... WHERE id = ? AND version = ?</code>, retry when 0 rows are affected.",
            "Application-level patterns: idempotency keys, unique constraints as locks, advisory locks, distributed locks (pointer to system design)."
          ],
          practice: [
            { t: "GFG: Two Phase Locking Protocol", p: "GFG", d: "M" },
            { t: "GFG: Wait-Die and Wound-Wait schemes", p: "GFG", d: "M" },
            { t: "GFG: Lock based concurrency control (S/X compatibility)", p: "GFG", d: "E" },
            { t: "Create a deadlock between two Postgres sessions updating rows in opposite order and read the error log", p: "BUILD", d: "M" },
            { t: "Implement optimistic locking with a version column in a small FastAPI/SQLAlchemy app", p: "BUILD", d: "M" },
            { t: "Build a job queue worker using SELECT ... FOR UPDATE SKIP LOCKED", p: "BUILD", d: "H" }
          ],
          notes: [
            "S-S is compatible. S-X, X-S and X-X conflict.",
            "Basic 2PL guarantees serializability but <b>not</b> freedom from deadlock or from cascading aborts. Strict 2PL fixes cascading aborts; deadlocks are still possible.",
            "Wait-die (non-preemptive): an older transaction waits for a younger one; a younger one requesting from an older one dies. Wound-wait (preemptive): an older transaction wounds (aborts) the younger; a younger one waits. In both, the restarted transaction keeps its <b>original timestamp</b>, so it eventually becomes oldest and there is no starvation.",
            "Deadlock avoidance in application code: always lock rows in a consistent order (e.g. by id), and keep transactions short.",
            "Optimistic locking wins when conflicts are rare (most web apps). Pessimistic wins when contention is high (flash sales, seat booking).",
            "<code>SKIP LOCKED</code> lets several workers pull different queue rows without blocking each other."
          ],
          cases: [
            "Double booking: a check-then-insert race. Fixes: UNIQUE(seat, show) constraint, SELECT FOR UPDATE on the seat row, or SERIALIZABLE plus retry.",
            "Lock escalation (SQL Server) can turn many row locks into a table lock and cause surprise blocking.",
            "Optimistic locking needs retry logic and idempotency, otherwise users see failures under contention.",
            "InnoDB gap locks under RR can deadlock on inserts into the same range, which surprises people. Lowering to RC reduces gap locking.",
            "Advisory locks are not tied to rows. Forgetting to release session-level ones leaks locks."
          ],
          qa: [
            { q: "What is two-phase locking?", a: "A transaction acquires locks in a growing phase and releases them in a shrinking phase, and never acquires after the first release. This guarantees conflict serializability. Strict 2PL holds exclusive locks until commit or abort, which prevents cascading rollbacks. It is what most lock-based DBs do." },
            { q: "How does a database handle deadlocks?", a: "Most detect them: they maintain a wait-for graph (or run periodic checks), and when a cycle appears they abort a victim (cheapest or youngest) and return an error for the app to retry. Alternatives are lock timeouts and prevention by timestamp (wait-die, wound-wait)." },
            { q: "Optimistic vs pessimistic locking, and when to use each?", a: "Pessimistic: lock before reading-to-modify (<code>SELECT FOR UPDATE</code>), so others block. Use it for high contention or when retries are expensive. Optimistic: no lock; check a version or timestamp at write time and retry on conflict. Use it for low contention and better throughput. Most CRUD apps use optimistic." },
            { q: "How would you prevent two users from booking the same seat?", a: "Simplest and strongest: a UNIQUE constraint on (show_id, seat_id) in the bookings table, catching the violation. Or lock the seat row with <code>SELECT ... FOR UPDATE</code> inside a transaction before inserting. Add a short-TTL hold (Redis) for UX at scale." }
          ],
          code: `-- Pessimistic: lock the row, then modify (Postgres/MySQL)
BEGIN;
SELECT qty FROM inventory WHERE sku = 'A1' FOR UPDATE;   -- others block here
UPDATE inventory SET qty = qty - 1 WHERE sku = 'A1' AND qty > 0;
COMMIT;

-- Optimistic: version check, retry in app if 0 rows updated
UPDATE account
SET balance = balance - 100, version = version + 1
WHERE id = 42 AND version = 7;     -- 7 = version read earlier

-- Job queue: many workers, no blocking
BEGIN;
SELECT id, payload FROM jobs
WHERE status = 'pending'
ORDER BY id
LIMIT 10
FOR UPDATE SKIP LOCKED;
-- ... process, then UPDATE jobs SET status='done' WHERE id IN (...)
COMMIT;`
        },
        {
          id: "indexing",
          title: "Indexing: B+ trees, hash, clustered vs non-clustered, composite, covering, EXPLAIN",
          est: "3 days",
          why: "\"Why is this query slow / how would you index it?\" is the most practical DB question for engineers, and B+ tree vs B tree is a fundamentals favourite.",
          learn: [
            "Why indexes: avoid a full scan. Cost: extra storage and slower writes (every insert/update maintains each index).",
            "<b>B+ tree</b>: high fanout, all values in leaves, leaves linked for range scans, height ~3-4 for millions of rows. How it differs from a B tree.",
            "Hash index: O(1) equality only, no range or ORDER BY. Postgres hash indexes and InnoDB adaptive hash index.",
            "<b>Clustered vs non-clustered (secondary)</b>: table rows stored in index order (InnoDB PK) vs a separate structure pointing to rows (heap TID in Postgres, PK value in InnoDB).",
            "Dense vs sparse index, primary / secondary / clustering index (Korth terminology).",
            "<b>Composite index and the leftmost-prefix rule</b>: (a,b,c) serves a, (a,b), (a,b,c), and a = ? ORDER BY b, but not b alone. Range on a stops use of later columns for seeking.",
            "<b>Covering index</b> / index-only scan, INCLUDE columns. Partial and expression indexes.",
            "Reading <code>EXPLAIN / EXPLAIN ANALYZE</code>: Seq Scan, Index Scan, Index Only Scan, Bitmap Heap Scan, rows estimate vs actual, cost; MySQL type = ALL/ref/range/const, Extra: Using index / Using filesort.",
            "Selectivity and cardinality: low-cardinality columns (gender, boolean) rarely benefit from a B+ tree on their own. Mention bitmap indexes in warehouses.",
            "Other index types: GIN (full text, JSONB), GiST, BRIN (huge append-only time series), LSM trees in write-heavy stores, vector indexes (HNSW, IVF) for AI workloads."
          ],
          practice: [
            { t: "Use The Index, Luke: Anatomy of an Index + The Where Clause chapters", p: "DOC", d: "M", u: "https://use-the-index-luke.com/" },
            { t: "GFG: Indexing in Databases", p: "GFG", d: "E" },
            { t: "GFG: Difference between B tree and B+ tree", p: "GFG", d: "E" },
            { t: "GATE numericals: B+ tree order from block size, key size and pointer size (5 problems)", p: "GFG", d: "M" },
            { t: "Load 1M rows into Postgres and compare EXPLAIN ANALYZE before and after a composite index", p: "BUILD", d: "M" },
            { t: "Make a query use an Index Only Scan by adding INCLUDE columns", p: "BUILD", d: "M" },
            { t: "CMU 15-445: B+ Tree Index lectures", p: "YT", d: "M", u: "https://15445.courses.cs.cmu.edu/" }
          ],
          notes: [
            "B+ tree order (GATE): internal node with p pointers and p-1 keys must fit a block, so <b>p·P + (p-1)·K ≤ B</b>. Leaf: <b>n·(K + Pr) + P ≤ B</b> (record pointers plus the next-leaf pointer).",
            "Height ≈ log_fanout(N). Fanout of a few hundred means 3-4 levels for billions of keys, and the top levels stay in the buffer pool.",
            "B tree stores data or pointers in internal nodes too. B+ keeps data only in leaves, which gives higher fanout, a uniform search cost and efficient range scans through linked leaves.",
            "InnoDB secondary indexes store the <b>PK value</b>, so a lookup is secondary index, then PK index (\"double lookup\"). A wide PK bloats every secondary index.",
            "Equality columns first, range column last in a composite index: <code>WHERE status = ? AND created_at &gt; ?</code> wants (status, created_at).",
            "Non-sargable predicates kill index use: functions on the column (<code>LOWER(email)</code>, <code>DATE(ts)</code>), leading wildcard <code>LIKE '%abc'</code>, implicit type casts, OR across different columns (sometimes).",
            "Postgres uses an index when selectivity is low (few rows). For a large fraction of the table a seq scan is cheaper because of random I/O. Statistics come from ANALYZE.",
            "Index-only scans in Postgres need the visibility map to be up to date (VACUUM)."
          ],
          cases: [
            "\"I added an index and the query is still slow.\" Possible causes: non-sargable predicate, wrong column order, low selectivity, stale stats, type mismatch, or the planner choosing a seq scan for good reason.",
            "Too many indexes slow down writes and use memory. Write-heavy tables need minimal indexes.",
            "Index on (a,b) makes a separate index on (a) redundant, but not one on (b).",
            "<code>ORDER BY created_at DESC LIMIT 10</code> can use an index to avoid a sort entirely (\"top-N without filesort\").",
            "Hash index for a range query is the wrong answer. Interviewers expect you to say B+ tree.",
            "Random UUID PKs on InnoDB cause page splits and fragmentation. Use sequential IDs or UUIDv7."
          ],
          qa: [
            { q: "Why do databases use B+ trees rather than binary search trees or hash tables?", a: "Disks and SSDs read whole pages, so a high-fanout tree with page-sized nodes keeps the height at 3-4, which means few I/Os. Leaves are linked, so range scans and ORDER BY are sequential. Hash supports equality only. BSTs are deep (log2 N) and not page-friendly." },
            { q: "Clustered vs non-clustered index?", a: "A clustered index determines the physical order of rows; the leaf level <i>is</i> the table, so there is only one per table (InnoDB PK). A non-clustered index is a separate structure whose leaves hold keys plus a row locator (TID or PK), and a table can have many. Postgres tables are heaps, so all its indexes are secondary." },
            { q: "Explain the leftmost-prefix rule.", a: "A composite B+ tree index on (a,b,c) is sorted by a, then b, then c. It can seek on a, (a,b) or (a,b,c), and on a = x with a range on b. It cannot efficiently seek on b or c alone, and after a range on a the later columns cannot be used for seeking." },
            { q: "What is a covering index?", a: "An index that contains every column a query needs (keys plus INCLUDE columns), so the engine answers from the index alone (Index Only Scan / Using index) without visiting the table. It is great for hot read queries, at the cost of a bigger index." },
            { q: "How do you debug a slow query?", a: "Run EXPLAIN ANALYZE. Look for seq scans on big tables, bad row estimates (stale stats, so ANALYZE), nested loops over large inputs, sorts spilling to disk, and non-sargable predicates. Fix with the right composite or covering index, rewriting the predicate, reducing selected columns, pagination, or caching or denormalizing hot paths." }
          ]
        },
        {
          id: "query-processing",
          title: "Query processing, optimisation & join algorithms",
          est: "1-2 days",
          why: "Asked in senior and backend rounds, and it explains EXPLAIN output. Knowing nested-loop vs hash vs merge join makes your indexing answers credible.",
          learn: [
            "Pipeline: parse, then rewrite (views, subquery unnesting), then optimize (logical to physical plan), then execute (iterator / volcano model, or vectorized).",
            "Cost-based optimisation: statistics (row counts, histograms, distinct values), selectivity estimation, join-order search (dynamic programming / greedy).",
            "Heuristic rules: push selections and projections down, do the most selective joins first, avoid Cartesian products.",
            "<b>Nested loop join</b> (and index nested loop): good when the outer side is small and the inner side is indexed. Block nested loop.",
            "<b>Hash join</b>: build a hash table on the smaller input, probe with the larger. Equi-joins only. Grace hash join when the input exceeds memory.",
            "<b>Sort-merge join</b>: sort both sides, then merge. Good when inputs are already sorted or indexed, or for range and inequality joins in some engines.",
            "External merge sort for ORDER BY or GROUP BY bigger than memory. Hash aggregation vs sort aggregation.",
            "Row store vs column store (OLTP vs OLAP): compression, vectorized execution, why warehouses (BigQuery, Snowflake, ClickHouse) scan fast."
          ],
          practice: [
            { t: "CMU 15-445: Join Algorithms + Query Optimization lectures", p: "YT", d: "M", u: "https://15445.courses.cs.cmu.edu/" },
            { t: "GFG: Join algorithms / Query optimization in relational algebra", p: "GFG", d: "M" },
            { t: "GATE numericals: block transfers for nested-loop vs block nested-loop join", p: "GFG", d: "M" },
            { t: "In Postgres, toggle enable_hashjoin / enable_mergejoin and compare EXPLAIN ANALYZE plans for the same join", p: "BUILD", d: "M" },
            { t: "Korth Ch. 15-16 (Query Processing, Optimization) exercises", p: "BOOK", d: "H" }
          ],
          notes: [
            "Nested loop cost (block transfers, worst case): <b>n_r · b_s + b_r</b>. Block nested loop: <b>b_r · b_s + b_r</b>. With M buffer blocks: <b>⌈b_r/(M-2)⌉ · b_s + b_r</b>. Put the smaller relation outside.",
            "Hash join cost ≈ <b>3(b_r + b_s)</b> block transfers for Grace hash join (partition then probe). Merge join ≈ b_r + b_s plus the sort cost.",
            "Rule of thumb: small × indexed means nested loop; large × large with equality means hash; presorted or range means merge.",
            "Bad cardinality estimates (correlated columns, skew) are the number one cause of bad plans. Postgres offers extended statistics (CREATE STATISTICS).",
            "Volcano model: each operator implements next(). Vectorized engines process batches of values for CPU efficiency.",
            "Columnar storage reads only the needed columns and compresses well (RLE, dictionary). That is why <code>SELECT *</code> is expensive in warehouses."
          ],
          cases: [
            "\"Hash join for a.x &lt; b.y?\" No. Hash join needs equality. Use nested loop or merge (range).",
            "Joining on mismatched types (varchar vs int) can prevent index use and force casts.",
            "Parameterized or prepared statements can get a generic plan that is bad for skewed values.",
            "Planner join-order search explodes with many tables. Postgres switches to the genetic optimizer (GEQO) above about 12 relations."
          ],
          qa: [
            { q: "Explain nested loop, hash and merge joins and when each is chosen.", a: "<b>Nested loop</b>: for each outer row, find matching inner rows. Best when the outer side is small and the inner join key is indexed. <b>Hash</b>: build a hash table on the smaller input's key and probe with the other. Best for large unsorted equi-joins. <b>Merge</b>: both inputs sorted on the key and merged linearly. Best when they are already sorted or indexed, or the output must be sorted." },
            { q: "What does a cost-based optimizer do?", a: "It enumerates equivalent plans (join orders, access paths, join algorithms), estimates each plan's cost from table statistics (row counts, histograms, distinct counts) and a cost model of I/O and CPU, then picks the cheapest. Bad statistics lead to bad estimates and bad plans." },
            { q: "Row store vs column store?", a: "A row store keeps whole rows together. It is fast for OLTP point reads and writes (Postgres, MySQL). A column store keeps each column together. It is fast for analytics scanning a few columns over many rows, with heavy compression and vectorized execution (BigQuery, Redshift, ClickHouse, Parquet). Writes and point updates are slower." }
          ]
        },
        {
          id: "recovery",
          title: "Recovery: WAL, checkpoints, ARIES intuition",
          est: "1 day",
          why: "Explains how Durability and Atomicity actually work. It is asked in senior rounds and GATE-style theory, and is a good follow-up after ACID.",
          learn: [
            "Failure types: transaction failure, system crash (memory lost), media failure (disk lost).",
            "Buffer policies: <b>steal / no-steal</b> (can dirty pages of uncommitted transactions be flushed?) and <b>force / no-force</b> (must pages be flushed at commit?). Real DBs use <b>steal + no-force</b>, which needs both undo and redo.",
            "<b>Write-ahead logging (WAL)</b>: a log record must reach stable storage before the data page it describes. The commit record is flushed before commit is acknowledged.",
            "Log records: LSN, transaction id, before-image (undo) and after-image (redo). Deferred vs immediate update.",
            "<b>Checkpoints</b>: bound the recovery time. Fuzzy checkpoints do not stop the world.",
            "<b>ARIES</b>: three passes, <b>Analysis</b> (find dirty pages and active transactions), <b>Redo</b> (repeat history from the earliest recLSN), <b>Undo</b> (roll back losers, writing CLRs).",
            "Shadow paging as an alternative (copy-on-write pages, as in SQLite's rollback journal or LMDB).",
            "Backups and replication: physical vs logical backups, PITR (base backup plus WAL archive), WAL-based streaming replication, binlog in MySQL."
          ],
          practice: [
            { t: "GFG: Log based recovery in DBMS", p: "GFG", d: "E" },
            { t: "GFG: Checkpoints in DBMS", p: "GFG", d: "E" },
            { t: "GATE PYQs: after a crash with this log, which transactions are redone and which undone?", p: "GFG", d: "M" },
            { t: "CMU 15-445: Logging + Recovery (ARIES) lectures", p: "YT", d: "H", u: "https://15445.courses.cs.cmu.edu/" },
            { t: "Set up a Postgres primary + streaming replica in Docker and watch WAL shipping", p: "BUILD", d: "H" }
          ],
          notes: [
            "Steal requires UNDO (uncommitted data may be on disk). No-force requires REDO (committed data may not be on disk yet).",
            "Recovery rule with checkpoints: transactions committed before the checkpoint need nothing; committed after it need REDO; active at the crash (no commit record) need UNDO.",
            "WAL makes commit cheap: one sequential log fsync instead of random page writes. Group commit batches fsyncs.",
            "ARIES repeats history, including losers, during redo, then undoes losers. CLRs make undo idempotent if it crashes during recovery.",
            "<code>synchronous_commit = off</code> (Postgres) or <code>innodb_flush_log_at_trx_commit = 2</code> trades durability of the last few ms for throughput."
          ],
          cases: [
            "Durability on a single node is only as good as fsync and the disk cache. Write-back caches without battery backup can lie.",
            "Replication is not a backup: a DROP TABLE replicates instantly. You need PITR or snapshots.",
            "Undo order is reverse log order. Redo order is forward.",
            "Common GATE trap: a transaction with a commit record <i>before</i> the checkpoint does not need redo, assuming the checkpoint flushed its pages."
          ],
          qa: [
            { q: "What is write-ahead logging and why is it needed?", a: "Every change is first appended to a sequential log on stable storage before the modified data page is written. On a crash, the DB replays the log to redo committed changes and undo uncommitted ones. This provides atomicity and durability while allowing lazy (no-force) page writes, which perform well." },
            { q: "What is a checkpoint?", a: "A point where the DB records which transactions are active and which pages are dirty (and flushes pages, for non-fuzzy checkpoints), so recovery can start from there instead of the start of the log. This bounds recovery time and lets old log segments be recycled." },
            { q: "Briefly explain ARIES recovery.", a: "Analysis scans from the last checkpoint to rebuild the dirty-page and active-transaction tables. Redo replays all logged changes from the smallest recLSN to restore the crash-time state (repeating history). Undo rolls back transactions that had not committed, in reverse order, writing compensation log records." }
          ]
        },
        {
          id: "nosql",
          title: "NoSQL types, when to use them, CAP pointer",
          est: "1-2 days",
          why: "\"SQL vs NoSQL for this use case?\" bridges into system design. AI engineers should also place vector DBs in the landscape.",
          learn: [
            "<b>Key-value</b> (Redis, DynamoDB): caching, sessions, counters. Lookups by key only.",
            "<b>Document</b> (MongoDB, Couchbase): flexible JSON schema, data accessed as one aggregate, nested reads.",
            "<b>Wide-column</b> (Cassandra, HBase, Bigtable): massive write throughput, time series, partition key plus clustering key design, LSM trees.",
            "<b>Graph</b> (Neo4j, Neptune): relationship traversals (social graphs, fraud, recommendations).",
            "<b>Search / vector</b> (Elasticsearch, OpenSearch, pgvector, Pinecone, Milvus): full-text inverted indexes, ANN similarity search (HNSW).",
            "<b>CAP</b>: during a network partition, choose consistency or availability. PACELC adds the latency vs consistency trade-off when there is no partition. Details are in System Design.",
            "BASE vs ACID, eventual consistency, tunable consistency (Cassandra quorum R + W > N).",
            "Choosing a store: access patterns, consistency needs, join and transaction needs, scale, ops cost. Postgres plus JSONB plus pgvector is often enough."
          ],
          practice: [
            { t: "GFG: Types of NoSQL Databases", p: "GFG", d: "E" },
            { t: "GFG: Difference between SQL and NoSQL", p: "GFG", d: "E" },
            { t: "Model a chat app in Cassandra (partition by conversation_id, cluster by ts DESC)", p: "BUILD", d: "M" },
            { t: "Model the same e-commerce order in Postgres (normalized) and MongoDB (embedded) and compare queries", p: "BUILD", d: "M" },
            { t: "DDIA Ch. 2-3 (Data Models, Storage and Retrieval: LSM vs B-tree)", p: "BOOK", d: "M" }
          ],
          notes: [
            "LSM tree (Cassandra, RocksDB): writes go to memtable plus WAL, flush to sorted SSTables, compaction runs in the background. Fast writes; reads check several levels, helped by Bloom filters.",
            "B-tree vs LSM: B-tree means faster reads and in-place updates. LSM means faster writes, better compression, and write and read amplification trade-offs.",
            "Cassandra modelling rule: <b>design tables per query</b> and denormalize. Avoid hot partitions and unbounded partition growth (bucket by time).",
            "MongoDB has had multi-document ACID transactions since 4.0, but heavy cross-document transactions mean the data is relational.",
            "Quorum: with N replicas, R + W > N gives strongly consistent reads (in the absence of sloppy quorum or edge cases).",
            "Vector DB = ANN index (HNSW/IVF-PQ) plus metadata filtering. pgvector is fine up to millions of vectors; dedicated engines win at larger scale or with heavy filtering."
          ],
          cases: [
            "\"NoSQL scales, SQL does not\" is a weak answer. Postgres and MySQL scale far with read replicas, partitioning and sharding (Vitess, Citus). Talk about access patterns instead.",
            "Picking MongoDB for highly relational data with many-to-many joins leads to painful application-side joins.",
            "Redis as the primary DB: durability depends on the AOF/RDB config. Usually it is a cache or ephemeral store.",
            "\"CA system\" is not a real choice in a distributed system, because partitions will happen. You choose CP or AP during the partition."
          ],
          qa: [
            { q: "When would you choose NoSQL over SQL?", a: "When access patterns are simple and known (key lookups, one aggregate per read), the schema varies or evolves fast, write volume or scale exceeds a single node, and you can accept eventual consistency or limited joins. Choose SQL when you need multi-row transactions, complex queries or joins, and strong integrity." },
            { q: "Explain the CAP theorem briefly.", a: "In a distributed store, when a network partition happens you must choose <b>Consistency</b> (reject or delay some requests so every read sees the latest write) or <b>Availability</b> (answer every request, possibly with stale data). Partition tolerance is not optional. Examples: CP leans toward HBase, ZooKeeper, Spanner; AP toward Cassandra, DynamoDB (default)." },
            { q: "How does an LSM tree differ from a B+ tree?", a: "An LSM tree buffers writes in memory and flushes immutable sorted files, merging them through compaction. Writes are sequential and fast, while reads may check several files (Bloom filters help). A B+ tree updates pages in place, which gives predictable fast reads but random write I/O. LSM suits write-heavy stores, B+ tree suits read-heavy OLTP." }
          ]
        }
      ]
    }
  ]
});
