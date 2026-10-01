PREP.add({
  id: "hld",
  order: 50,
  group: "Design",
  title: "High-Level Design (HLD)",
  short: "HLD case studies",
  blurb: "Classic design problems, solved with a repeatable framework.",
  intro: [
    "Use the same framework every time: <b>1. Requirements</b> (functional: 3-5 core features, explicitly out-of-scope the rest; non-functional: scale, latency, availability vs consistency, durability) &rarr; <b>2. Estimates</b> (QPS read/write, storage, bandwidth; only the numbers that change the design) &rarr; <b>3. API</b> (3-5 endpoints) &rarr; <b>4. Data model</b> (entities, keys, store choice) &rarr; <b>5. High-level diagram</b> (a simple version that satisfies the functional requirements end to end) &rarr; <b>6. Deep dives</b> (2-3 hardest parts, driven by non-functional requirements) &rarr; <b>7. Bottlenecks & trade-offs</b> (failure modes, scaling the next 10x, monitoring).",
    "Time-box a 45-60 minute round: requirements 5 min, estimates 3-5 min, API + data model 5-8 min, high-level design 10 min, deep dives 15-20 min, wrap-up 3-5 min. Get to a working end-to-end design by the halfway mark; a beautiful sharding scheme for a design that doesn't yet post a tweet scores poorly. At SDE-2 the interviewer drives deep dives; at senior level <b>you</b> are expected to pick them and steer.",
    "What interviewers grade: <b>problem navigation</b> (scoping, asking the right questions), <b>solution design</b> (a coherent, working architecture), <b>technical depth</b> (knowing how the components actually behave, with numbers), <b>trade-off reasoning</b> (stating alternatives and why you rejected them), and <b>communication</b> (thinking aloud, diagrams that match the words, responding to hints). Practice each case study aloud with a timer and a whiteboard tool (Excalidraw); then compare against a reference solution and note what you missed in the 'cases to remember' list."
  ],
  resources: [
    { n: "System Design Interview Vol 1 (Alex Xu)", u: "https://www.amazon.in/System-Design-Interview-insiders-Second/dp/B08CMF2CQF", d: "Framework chapter plus rate limiter, KV store, ID generator, URL shortener, crawler, notification, news feed, chat, autocomplete, YouTube, Google Drive." },
    { n: "System Design Interview Vol 2 (Alex Xu & Sahn Lam)", u: "https://www.amazon.in/System-Design-Interview-Insiders-Guide/dp/1736049119", d: "Proximity service, nearby friends, Google Maps, message queue, metrics, ad click aggregation, hotel reservation, email, S3, leaderboard, payment, digital wallet, stock exchange." },
    { n: "Hello Interview - problem breakdowns", u: "https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction", d: "Written by ex-FAANG interviewers; breakdowns follow the exact framework and show what is expected per level." },
    { n: "ByteByteGo", u: "https://bytebytego.com/", d: "Alex Xu's course with all book chapters and animated diagrams." },
    { n: "system-design-primer (GitHub)", u: "https://github.com/donnemartin/system-design-primer", d: "Free worked solutions: Pastebin, URL shortener, Twitter timeline, web crawler, Mint, social graph, KV cache." },
    { n: "Exponent - system design mock interviews", u: "https://www.tryexponent.com/", d: "Recorded mock interviews; good for seeing pacing and communication." },
    { n: "Grokking the System Design Interview (DesignGurus)", u: "https://www.designgurus.io/course/grokking-the-system-design-interview", d: "Classic set of case studies; useful for breadth." },
    { n: "Designing Data-Intensive Applications (Kleppmann)", u: "https://dataintensive.net/", d: "The depth behind every deep dive; read alongside the case studies." },
    { n: "Hello Interview / Exponent YouTube channels", u: "https://www.youtube.com/@hello_interview", d: "Full-length mock walkthroughs of common designs." },
    { n: "Pramp / interviewing.io", u: "https://interviewing.io/", d: "Live mock interviews with engineers; do at least 3-5 system design mocks before real rounds." }
  ],
  levels: [
    {
      name: "Level 1 · Warm-up designs",
      desc: "Smaller, well-bounded systems. Use them to drill the framework until it is automatic; each also appears as a sub-component of bigger designs.",
      topics: [
        {
          id: "url-shortener",
          title: "URL shortener (TinyURL / bit.ly)",
          est: "1 day",
          why: "The most common warm-up design; tests ID generation, read-heavy caching and redirects.",
          learn: [
            "Requirements: shorten, redirect, custom alias, expiry; optional analytics. NFR: very read-heavy (100:1), low-latency redirects, high availability, short codes unpredictable",
            "Estimates: 100M new URLs/day ~ 1.2k writes/s, ~120k reads/s; 5 years ~ 180B URLs x 500 B ~ 90 TB",
            "API: <code>POST /urls {long_url, alias?, expires_at?}</code> &rarr; short_code; <code>GET /{code}</code> &rarr; 301/302",
            "Data model: <code>code (PK), long_url, user_id, created_at, expires_at</code> in a KV/wide-column store or sharded SQL",
            "Code generation options: hash (MD5/SHA) + truncate + collision check; base62 of a unique counter; pre-generated key service (KGS)",
            "Length math: base62^7 ~ 3.5 trillion codes; 7 characters is plenty",
            "Deep dive: caching redirects (Redis + CDN), 301 vs 302 trade-off, analytics via async click events to Kafka",
            "Deep dive: scaling the counter (ranges allocated per server from ZooKeeper/DB, or Snowflake IDs)"
          ],
          practice: [
            { t: "Hello Interview: Design a URL shortener (Bitly)", p: "HELLO", d: "E", u: "https://www.hellointerview.com/learn/system-design/problem-breakdowns/bitly" },
            { t: "system-design-primer: URL shortener / Pastebin solution", p: "DOC", d: "E", u: "https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/pastebin/README.md" },
            { t: "Alex Xu Vol 1, Ch 8: Design a URL shortener", p: "BOOK", d: "E" },
            { t: "Build a URL shortener with base62 counter ranges, Redis cache, 302 redirect", p: "BUILD", d: "M" }
          ],
          notes: [
            "Counter + base62 guarantees uniqueness with no collision checks; hand out ranges of 1,000-1M IDs per app server so there is no per-request coordination.",
            "Sequential codes are guessable; shuffle with a bijective function (e.g. multiply by a large prime mod 62^7, or Feistel cipher) if unpredictability matters.",
            "301 (permanent) lets browsers cache, reducing load but losing analytics; 302 (temporary) keeps every click visible. Most real shorteners use 302 for analytics.",
            "Redirect path: CDN/edge cache &rarr; Redis &rarr; DB. 20% of URLs get 80% of traffic, so a modest cache gives a very high hit rate.",
            "Custom aliases need a uniqueness check: conditional insert (<code>INSERT ... IF NOT EXISTS</code>) on the same key space.",
            "Analytics: emit click events asynchronously (Kafka) and aggregate in a stream processor; never block the redirect on writes.",
            "Store is a simple KV access pattern: DynamoDB/Cassandra fit well; sharded Postgres works too."
          ],
          cases: [
            "Hash truncation collisions: need check-and-retry, which costs a read per write.",
            "Same long URL shortened twice: decide whether to dedupe (extra index on long_url hash) or not.",
            "Viral link = hot key: CDN and in-process cache absorb it.",
            "Expired links: lazy deletion on read + background cleanup; do not reuse codes immediately.",
            "Abuse: phishing/malware links; integrate URL reputation checks and rate limiting per user.",
            "KGS as a single point of failure: replicate it and hand out batches so app servers survive outages.",
            "Follow-up: 'how do you build click analytics by country/hour?' Kafka &rarr; Flink aggregation &rarr; OLAP store (ClickHouse/Druid)."
          ],
          qa: [
            { q: "How do you generate short codes without collisions at 1k+ writes/s across many servers?", a: "Use a distributed counter: each app server leases a range (e.g. 1M IDs) from a coordination service or DB row, increments locally and base62-encodes the ID. No collisions, no per-write coordination; unused IDs in a crashed server's range are simply skipped. Optionally permute IDs so codes are not sequential." },
            { q: "301 or 302 redirect?", a: "301 is cached by browsers and proxies, reducing load and latency, but subsequent clicks bypass your servers so analytics and link edits are lost. 302 keeps all traffic flowing through you for analytics and updatable/expiring links. Choose 302 if analytics matter, 301 for pure performance." },
            { q: "How would you scale reads to 100k+ QPS?", a: "Cache aggressively: CDN or edge workers for popular codes, a Redis cluster in front of the DB, and replicas or a horizontally scaled KV store behind it. The data is immutable (or rarely changed), so caching is safe with long TTLs." }
          ]
        },
        {
          id: "pastebin",
          title: "Pastebin",
          est: "0.5-1 day",
          why: "Variant of the URL shortener that adds blob storage and larger payloads; tests metadata vs content separation.",
          learn: [
            "Requirements: create paste (text up to e.g. 10 MB), read by URL, expiry, visibility (public/unlisted/private), optional syntax highlighting",
            "Estimates: 10M pastes/day x 10 KB avg ~ 100 GB/day ~ 36 TB/year; reads 10x writes",
            "API: <code>POST /pastes</code>, <code>GET /pastes/{id}</code>, <code>DELETE /pastes/{id}</code>",
            "Data model: metadata in DB (<code>id, owner, size, expires_at, visibility, s3_key</code>), content in object storage",
            "ID generation reused from URL shortener",
            "Deep dive: serving content via CDN, compression, size limits",
            "Deep dive: expiry cleanup with lifecycle policies and TTL indexes"
          ],
          practice: [
            { t: "system-design-primer: Design Pastebin", p: "DOC", d: "E", u: "https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/pastebin/README.md" },
            { t: "Design Pastebin end to end in 30 minutes, timed", p: "SELF", d: "E" },
            { t: "Implement paste upload via pre-signed URL to MinIO with expiry", p: "BUILD", d: "M" }
          ],
          notes: [
            "Key difference from a URL shortener: payloads are large, so put bytes in object storage and keep only metadata in the DB.",
            "Small pastes (&lt; ~10 KB) can be stored inline in the DB to save an extra hop; mention this hybrid as an optimisation.",
            "Immutable content makes caching trivial; serve through a CDN with the paste ID as cache key.",
            "Expiry: S3 lifecycle rules or a TTL index (DynamoDB TTL, MongoDB TTL index) plus a check at read time.",
            "Compress text (gzip/zstd, 3-10x) before storing; store content hash for dedup if desired.",
            "Private pastes cannot be cached publicly; use signed URLs with short expiry."
          ],
          cases: [
            "Metadata written but blob upload failed (or vice versa): status field and reconciliation job.",
            "Abuse: storing malware or leaked credentials; scanning pipeline and takedown flow.",
            "Huge pastes DoS the service: enforce size limits at the gateway.",
            "Expired paste still cached at CDN: short CDN TTL for pastes with expiry, or purge on expiry.",
            "Follow-up: 'how do you show view counts?' Approximate async counters, not a DB write per view."
          ],
          qa: [
            { q: "Why separate metadata and content stores?", a: "Content is large, immutable and accessed by key, which object storage handles cheaply and durably; metadata is small, queried by multiple fields (owner, expiry) and updated, which a DB handles well. It also keeps DB size small and lets a CDN serve content directly." },
            { q: "How do you implement expiry efficiently?", a: "Check expires_at on every read (correctness), and delete asynchronously via TTL indexes, lifecycle rules, or a periodic sweeper on an index over expires_at (cleanup). Do not run a cron that scans the whole table." },
            { q: "How would you support private pastes?", a: "Visibility field on metadata; authorise on read; serve content through short-lived signed URLs instead of public CDN URLs; never cache private content at shared caches." }
          ]
        },
        {
          id: "rate-limiter-service",
          title: "Rate limiter as a service",
          est: "1 day",
          why: "Asked as a standalone design at Stripe-style API companies and as a component of every public API design.",
          learn: [
            "Requirements: limit by user/IP/API key/endpoint, configurable rules, low latency (&lt; 1-2 ms overhead), distributed across many gateways, informative 429s",
            "Estimates: e.g. 1M RPS through the gateway, 100M active keys x ~50 B state ~ 5 GB in Redis",
            "API: internal <code>shouldAllow(key, rule) &rarr; {allowed, remaining, reset_at}</code>; rules config API",
            "Algorithm choice: token bucket vs sliding window counter vs sliding log",
            "Placement: API gateway middleware vs sidecar vs central service",
            "Deep dive: atomic Redis Lua script, Redis Cluster sharding by key, replication",
            "Deep dive: local cache + async sync for very high QPS; multi-region quotas",
            "Deep dive: rule storage and hot reload; fail-open vs fail-closed"
          ],
          practice: [
            { t: "Alex Xu Vol 1, Ch 4: Design a rate limiter", p: "BOOK", d: "M" },
            { t: "Stripe: Scaling your API with rate limiters", p: "BLOG", d: "M", u: "https://stripe.com/blog/rate-limiters" },
            { t: "Envoy: global rate limiting", p: "DOC", d: "M", u: "https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/other_features/global_rate_limiting" },
            { t: "Implement a Redis Lua token bucket and benchmark with 100 concurrent clients", p: "BUILD", d: "M" }
          ],
          notes: [
            "Embed the limiter in the gateway (library calling Redis) to avoid an extra network hop; a separate service adds latency but centralises logic.",
            "Token bucket in a Redis hash <code>{tokens, last_ts}</code>, updated in a single Lua script for atomicity.",
            "For extreme QPS, approximate: each gateway node holds a local bucket with an allotted share and syncs counts every 100 ms; accept small over-admission.",
            "Rules cached in memory on every gateway, distributed via config service/watch; changes apply within seconds.",
            "Return 429 with <code>Retry-After</code>, <code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>.",
            "Multi-tier limits: per-second burst + per-day quota + concurrency limit.",
            "Fail open for general traffic (availability), fail closed for sensitive endpoints (login, OTP, payments)."
          ],
          cases: [
            "Redis shard down: limiter must not take the whole API down (timeouts + fail-open policy).",
            "Race conditions without atomic scripts lead to over-admission.",
            "Hot key: a single giant customer saturates one Redis shard; local pre-aggregation.",
            "Clock differences across gateways when computing windows: use Redis server time inside the script.",
            "Multi-region users bouncing between regions get double the quota unless synchronised.",
            "Follow-up: 'how do you rate limit by LLM tokens rather than requests?' Weighted cost per request in token bucket; reconcile actual tokens post-response."
          ],
          qa: [
            { q: "Where do you place the rate limiter and why?", a: "At the API gateway/edge so abusive traffic is rejected before reaching services, with shared state in Redis so all gateway nodes enforce the same limit. Internal services may also have their own concurrency limits for protection." },
            { q: "How do you keep latency low at 1M RPS?", a: "Co-locate Redis with gateways, use pipelined Lua scripts (one round trip), shard keys across a Redis cluster, cache rules locally, and for the highest-volume keys use local buckets with periodic global sync, accepting slight inaccuracy." },
            { q: "What happens when Redis is unavailable?", a: "Calls time out quickly (a few ms) and the limiter falls back to policy: fail open with local in-memory approximate limits for most endpoints, fail closed for security-sensitive ones. Alert on fallback mode." }
          ]
        },
        {
          id: "kv-store",
          title: "Distributed key-value store (Dynamo-style)",
          est: "1-2 days",
          why: "Tests the core distributed-systems toolbox in one design: partitioning, replication, quorums, conflict resolution, failure detection.",
          learn: [
            "Requirements: <code>get(key)</code>, <code>put(key, value)</code>, small values (&lt; 10 KB), high availability, tunable consistency, horizontal scale",
            "Partitioning with consistent hashing + virtual nodes",
            "Replication to N successors on the ring; quorum reads/writes (N, R, W)",
            "Conflict resolution: vector clocks or LWW; read repair",
            "Failure handling: sloppy quorum + hinted handoff (temporary), Merkle-tree anti-entropy (permanent)",
            "Membership and failure detection: gossip protocol",
            "Storage engine per node: commit log + memtable + SSTables (LSM) + Bloom filters + compaction",
            "Read/write paths end to end via a coordinator node"
          ],
          practice: [
            { t: "Amazon Dynamo paper", p: "BLOG", d: "H", u: "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf" },
            { t: "Alex Xu Vol 1, Ch 6: Design a key-value store", p: "BOOK", d: "M" },
            { t: "Cassandra architecture overview", p: "DOC", d: "M", u: "https://cassandra.apache.org/doc/latest/cassandra/architecture/overview.html" },
            { t: "Build a 3-node in-memory KV store with consistent hashing and N=3, W=2, R=2", p: "BUILD", d: "H" }
          ],
          notes: [
            "This design is essentially 'explain Cassandra/Dynamo': it is a fundamentals checklist, so name each mechanism and why.",
            "N=3, W=2, R=2 is the classic balanced configuration; mention W=1 for write-heavy and R=1 for read-heavy needs.",
            "Gossip spreads membership/heartbeat state in O(log n) rounds without a central coordinator.",
            "Hinted handoff keeps writes available when a replica is down; Merkle trees let replicas compare large key ranges cheaply and sync only differences.",
            "LSM storage: writes are sequential appends; reads check memtable then SSTables (Bloom filters avoid useless disk reads).",
            "Vector clocks expose concurrent writes to the client to merge (Dynamo shopping cart); LWW is simpler but loses data under concurrency.",
            "If strong consistency is required, the design shifts to Raft per partition (like TiKV/CockroachDB)."
          ],
          cases: [
            "Concurrent writes to the same key on different replicas: siblings to resolve.",
            "Node flapping causes repeated data movement; delay rebalancing after failure detection.",
            "Hot key overloads its N replicas: client-side caching or key splitting.",
            "Tombstones and deletes resurrecting data if a replica missed the delete beyond gc_grace.",
            "Clock skew with LWW drops the newer write.",
            "Follow-up: 'how would you make it strongly consistent?' Consensus group per partition or W+R&gt;N with strict quorums and no sloppy quorum, at availability cost."
          ],
          qa: [
            { q: "Walk through a write in a Dynamo-style store.", a: "Client hashes the key, sends to a coordinator (any node or the key's owner). Coordinator identifies N replicas on the ring, sends the write with a version, and returns success after W acks. Each replica appends to its commit log and memtable. Unavailable replicas get a hinted handoff on another node to be delivered later." },
            { q: "How do replicas detect and fix divergence?", a: "Read repair fixes stale replicas encountered during reads; anti-entropy runs in the background comparing Merkle trees of key ranges and syncing only differing ranges, which is efficient for large datasets." },
            { q: "How does a node learn about failures without a master?", a: "Gossip: each node periodically exchanges membership lists with heartbeat counters with random peers. A node whose heartbeat hasn't increased for a threshold is suspected down (phi-accrual detection in Cassandra)." }
          ]
        },
        {
          id: "unique-id-generator",
          title: "Unique ID generator (Twitter Snowflake)",
          est: "0.5-1 day",
          why: "Short design asked on its own and needed inside URL shortener, chat, feed and payments designs.",
          learn: [
            "Requirements: globally unique, 64-bit, roughly time-sortable, 10k+ IDs/s per node, no central coordination on the hot path",
            "Options: DB auto-increment (single point), multi-master with step, UUID v4 (128-bit, unordered), ticket server (Flickr), UUID v7/ULID, Snowflake",
            "Snowflake layout: 1 sign bit, 41 bits timestamp (ms since custom epoch, ~69 years), 10 bits machine ID, 12 bits sequence (4,096 IDs/ms/node)",
            "Machine ID assignment via ZooKeeper/etcd or config",
            "Clock issues: NTP moving clock backwards, waiting or refusing",
            "Why time-sortable IDs help B-tree inserts and cursor pagination"
          ],
          practice: [
            { t: "Twitter: Announcing Snowflake", p: "BLOG", d: "E", u: "https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake" },
            { t: "Instagram: Sharding & IDs at Instagram", p: "BLOG", d: "M", u: "https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c" },
            { t: "Alex Xu Vol 1, Ch 7: Design a unique ID generator", p: "BOOK", d: "E" },
            { t: "Implement a Snowflake generator with clock-backwards handling and a uniqueness test across threads", p: "BUILD", d: "M" }
          ],
          notes: [
            "Snowflake: 4,096 IDs per ms per node = ~4M IDs/s per node; 1,024 nodes.",
            "IDs are k-sorted (roughly ordered by time) which keeps B-tree inserts at the right edge and gives free 'created_at' ordering.",
            "UUIDv4 is random: no coordination but 128 bits, poor index locality. UUIDv7 / ULID are time-ordered 128-bit alternatives.",
            "Instagram variant: 41 bits time + 13 bits logical shard ID + 10 bits per-shard sequence generated inside Postgres.",
            "If the sequence overflows within a millisecond, spin until the next millisecond.",
            "Discord message IDs are Snowflakes; IDs double as time-based cursors."
          ],
          cases: [
            "Clock moves backwards (NTP correction): refuse to generate (or wait) until the clock catches up to the last timestamp.",
            "Duplicate machine IDs after misconfiguration produce duplicate IDs; assign via lease in ZooKeeper/etcd.",
            "Epoch exhaustion after ~69 years; choose a recent custom epoch.",
            "IDs leak information (creation time, volume); acceptable for most, not for some security contexts.",
            "Follow-up: 'how to get strictly ordered IDs globally?' Requires a single sequencer (bottleneck) or TrueTime-like clocks; Snowflake is only roughly ordered."
          ],
          qa: [
            { q: "Describe the Snowflake ID format and its limits.", a: "64 bits: sign bit, 41-bit ms timestamp from a custom epoch (~69 years), 10-bit worker ID (1,024 workers), 12-bit sequence (4,096 per ms per worker). IDs are unique and roughly time-sorted without coordination, as long as worker IDs are unique and clocks don't go backwards." },
            { q: "Why not just use UUIDs?", a: "UUIDv4 is 128 bits and random, so it's larger in every index and causes random B-tree inserts with page splits and poor cache locality; it also isn't sortable by time. Snowflake/UUIDv7 give compactness and ordering." },
            { q: "How do you handle the clock going backwards?", a: "Track the last timestamp; if current &lt; last, either wait until it passes (small drifts) or fail the request and alert (large drifts). Run NTP in slew mode to avoid jumps." }
          ],
          code: "import time, threading\n\nclass Snowflake:\n    EPOCH = 1704067200000  # 2024-01-01 in ms\n    def __init__(self, worker_id):\n        assert 0 <= worker_id < 1024\n        self.worker, self.seq, self.last = worker_id, 0, -1\n        self.lock = threading.Lock()\n    def next_id(self):\n        with self.lock:\n            ts = int(time.time() * 1000)\n            if ts < self.last:\n                raise RuntimeError('clock moved backwards')\n            if ts == self.last:\n                self.seq = (self.seq + 1) & 0xFFF\n                if self.seq == 0:\n                    while ts <= self.last:\n                        ts = int(time.time() * 1000)\n            else:\n                self.seq = 0\n            self.last = ts\n            return ((ts - self.EPOCH) << 22) | (self.worker << 12) | self.seq"
        },
        {
          id: "notification-system",
          title: "Notification system (push, SMS, email)",
          est: "1 day",
          why: "Common at Indian product companies (Swiggy, Flipkart, PhonePe); tests queues, retries, third-party integration and user preferences.",
          learn: [
            "Requirements: multi-channel (APNs/FCM push, SMS, email, in-app), templates, user preferences/opt-out, scheduling, priority (OTP vs marketing), delivery tracking",
            "Estimates: e.g. 100M notifications/day, marketing bursts of 10M in minutes",
            "API: <code>POST /notifications {user_ids|segment, template_id, params, channels, priority, send_at}</code>",
            "Data model: user device tokens, preferences, templates, notification log with status",
            "Pipeline: API &rarr; validation & preferences &rarr; per-channel queues &rarr; channel workers &rarr; third-party providers",
            "Deep dive: retries with backoff, provider failover (multiple SMS vendors), DLQ",
            "Deep dive: dedup and idempotency, rate limiting per user (no spam) and per provider",
            "Deep dive: priority isolation (separate queues for transactional vs promotional), scheduled sends"
          ],
          practice: [
            { t: "Alex Xu Vol 1, Ch 10: Design a notification system", p: "BOOK", d: "M" },
            { t: "Firebase Cloud Messaging architecture overview", p: "DOC", d: "E", u: "https://firebase.google.com/docs/cloud-messaging/fcm-architecture" },
            { t: "Design a notification system for a food delivery app, timed 45 min", p: "SELF", d: "M" },
            { t: "Build a worker that consumes from a queue, sends email via a mock provider, retries with backoff and moves failures to a DLQ", p: "BUILD", d: "M" }
          ],
          notes: [
            "Separate queues per channel and per priority so a 10M-user marketing blast never delays an OTP.",
            "Delivery is at-least-once; dedupe with a notification ID (idempotency key) at the worker before calling the provider.",
            "Third-party providers are the bottleneck and failure point: per-provider rate limits, circuit breakers, multi-vendor failover for SMS.",
            "Fan-out for segments: a job expands the segment into user batches, rather than a single huge request.",
            "Respect preferences, quiet hours and frequency caps (e.g. max 3 promos/day) in a filter stage.",
            "Track lifecycle: queued, sent, delivered, opened, failed; provider webhooks update status asynchronously.",
            "Stale device tokens: remove on provider 'unregistered' responses."
          ],
          cases: [
            "Duplicate notification on retry after a worker crash post-send; idempotency check before send.",
            "Provider outage: queue grows; circuit breaker + failover vendor + alert on lag.",
            "Time zones and quiet hours for scheduled campaigns.",
            "OTP latency SLA (&lt; 5-10 s) violated during marketing bursts without priority isolation.",
            "Thundering herd: push to 50M users at once triggers app opens that overload backend; stagger delivery.",
            "Follow-up: 'how do you guarantee a notification is delivered?' You can't fully (devices offline); you guarantee handoff to the provider and track delivery receipts, with in-app inbox as durable fallback."
          ],
          qa: [
            { q: "How do you prevent a marketing blast from delaying OTPs?", a: "Priority isolation: separate topics/queues and worker pools per priority, with dedicated provider quotas for transactional traffic. Marketing jobs are throttled and paced; transactional queues are kept near-empty with autoscaled consumers." },
            { q: "How do you avoid sending duplicates?", a: "Assign a unique notification ID at creation; workers check-and-set it in a dedup store (Redis SETNX with TTL or a DB unique key) before calling the provider, and record the result. Combined with at-least-once queues this gives effectively-once sending (except a crash between provider call and record, which is rare and tolerable)." },
            { q: "How do you handle a slow or failing SMS vendor?", a: "Timeouts and circuit breakers per vendor, automatic failover to a secondary vendor, retries with exponential backoff and jitter, DLQ after N attempts, and monitoring of delivery-rate per vendor to route traffic dynamically." }
          ]
        }
      ]
    },
    {
      name: "Level 2 · Popular product designs",
      desc: "The designs asked most often at product companies. Each has one or two signature deep dives you must know cold.",
      topics: [
        {
          id: "news-feed",
          title: "News feed / Twitter timeline",
          est: "2 days",
          why: "One of the most asked designs; the fan-out-on-write vs read trade-off and the celebrity problem are the signature deep dives.",
          learn: [
            "Requirements: post (text/media), follow, home timeline (reverse-chron or ranked), user timeline; NFR: timeline load &lt; 200-500 ms, eventual consistency OK, very read-heavy",
            "Estimates: 300M DAU, 50 timeline reads/day ~ 170k QPS; 500M posts/day ~ 6k writes/s; avg 200 followers, some with 100M",
            "API: <code>POST /posts</code>, <code>POST /follow</code>, <code>GET /feed?cursor=</code>",
            "Data model: posts (by post_id, Snowflake), follow graph (follower, followee both directions), timeline cache per user (list of post IDs)",
            "Fan-out on write (push): on post, append post_id to followers' timelines in Redis",
            "Fan-out on read (pull): merge recent posts of followees at read time",
            "Deep dive: hybrid for celebrities (pull their posts at read time, push for normal users)",
            "Deep dive: ranking pipeline (candidate generation, features, ML ranking), media via CDN, pagination by cursor"
          ],
          practice: [
            { t: "system-design-primer: Twitter timeline and search", p: "DOC", d: "M", u: "https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/twitter/README.md" },
            { t: "Alex Xu Vol 1, Ch 11: Design a news feed system", p: "BOOK", d: "M" },
            { t: "Hello Interview: Design Facebook News Feed", p: "HELLO", d: "M" },
            { t: "Facebook TAO: The power of the graph (USENIX ATC 2013)", p: "BLOG", d: "H", u: "https://www.usenix.org/conference/atc13/technical-sessions/presentation/bronson" },
            { t: "Twitter: The infrastructure behind Twitter: scale", p: "BLOG", d: "M", u: "https://blog.twitter.com/engineering/en_us/topics/infrastructure/2017/the-infrastructure-behind-twitter-scale" }
          ],
          notes: [
            "Push makes reads O(1) (pre-computed timeline) but writes O(followers); pull makes writes O(1) but reads O(followees). Hybrid gives the best of both.",
            "Celebrity threshold (e.g. &gt; 100k followers): don't fan out; merge their recent posts at read time from a hot cache.",
            "Timelines store only post IDs (8 bytes) capped at ~800 entries per user; hydrate post bodies and user info from caches in a batch.",
            "Only fan out to active users (logged in in last 30 days); inactive users get pull on return.",
            "Fan-out is async via a queue; the poster sees their own post immediately via read-your-writes on their own timeline.",
            "Ranked feed: candidate generation (followees + recommendations) &rarr; lightweight filter &rarr; heavy ML ranker &rarr; diversity rules. Cache the ranked page per user for a few minutes.",
            "Counters (likes, retweets) are eventually consistent and sharded; never a hot row per post."
          ],
          cases: [
            "Celebrity post with 100M followers: push fan-out takes minutes and overloads Redis; use hybrid.",
            "Unfollow/block must remove posts from the timeline: filter at read time and lazily clean.",
            "Deleted post still in timelines: hydrate step drops missing/deleted posts.",
            "Thundering herd on a viral post's like counter: sharded counters, batching.",
            "Timeline cache loss: rebuild from the graph + posts on demand (pull path) as fallback.",
            "New user with no follows: cold start with popular/recommended content.",
            "Follow-up: 'how do you add ads and ranking?' Separate ranking service; ad server inserts into slots post-ranking."
          ],
          qa: [
            { q: "Fan-out on write vs fan-out on read?", a: "Write fan-out precomputes each follower's timeline when a post is made: fast reads, expensive writes, wasteful for inactive users and terrible for celebrities. Read fan-out computes on demand: cheap writes, slow reads for users following many accounts. Production systems use a hybrid: push for regular users, pull for celebrities, merged at read time." },
            { q: "How is the home timeline served in &lt; 200 ms?", a: "Read the precomputed list of post IDs from Redis, merge in recent posts from followed celebrities (cached), then batch-hydrate post objects and author profiles from caches (multi-get), apply filters (blocked, deleted), and return a page with a cursor. All data is in memory; DB is only hit on cache misses." },
            { q: "How do you store the follow graph?", a: "Two tables/indices: followers(followee_id &rarr; follower_ids) for fan-out and following(follower_id &rarr; followee_ids) for pull/merge, sharded by the leading ID, plus counts. Facebook uses TAO, a graph-aware cache over sharded MySQL." }
          ]
        },
        {
          id: "chat-app",
          title: "Chat app (WhatsApp / Messenger / Slack)",
          est: "2 days",
          why: "Top-3 most asked; tests real-time connections, message ordering, delivery guarantees, presence and offline sync.",
          learn: [
            "Requirements: 1:1 and group chat (cap e.g. 256-1,000 members), online/last seen, delivery and read receipts, offline delivery, media, multi-device; NFR: low latency (&lt; 200 ms), no message loss, ordering per conversation",
            "Estimates: 500M DAU x 40 messages = 20B/day ~ 230k msg/s; each server holds ~100k-1M persistent connections",
            "Connection layer: WebSocket gateways (stateful); session registry of user &rarr; gateway (Redis)",
            "API: WebSocket events <code>send_message</code>, <code>ack</code>, <code>typing</code>; REST for history and media upload",
            "Data model: messages partitioned by conversation_id (+ time bucket), clustered by message_id (Snowflake); inbox/sync state per device",
            "Message flow: sender &rarr; gateway &rarr; chat service (persist, assign ID) &rarr; lookup recipient gateway &rarr; push; else store for offline + push notification",
            "Deep dive: delivery guarantees with client-generated message IDs, acks and retries (at-least-once + dedupe)",
            "Deep dive: group fan-out, presence at scale, multi-device sync, end-to-end encryption (Signal protocol) at a high level"
          ],
          practice: [
            { t: "Hello Interview: Design WhatsApp", p: "HELLO", d: "M", u: "https://www.hellointerview.com/learn/system-design/problem-breakdowns/whatsapp" },
            { t: "Alex Xu Vol 1, Ch 12: Design a chat system", p: "BOOK", d: "M" },
            { t: "Discord: How Discord stores trillions of messages", p: "BLOG", d: "M", u: "https://discord.com/blog/how-discord-stores-trillions-of-messages" },
            { t: "Slack: Real-time messaging architecture", p: "BLOG", d: "M", u: "https://slack.engineering/real-time-messaging/" },
            { t: "Build a WebSocket chat server with Redis pub/sub across 2 instances", p: "BUILD", d: "M" }
          ],
          notes: [
            "Stateless chat service + stateful gateway tier; the session registry maps user/device to gateway so any service instance can route a message.",
            "Cross-gateway routing via Redis pub/sub or a direct gateway RPC; Kafka between persistence and fan-out for durability.",
            "Ordering: per-conversation sequence assigned by the server (single writer per conversation partition), not client clocks.",
            "Client-generated message ID makes resend idempotent; server acks after persisting, then client shows one tick.",
            "Offline users: messages stay in the store; on reconnect the device syncs from its last seen sequence number (per-device cursor).",
            "WhatsApp famously ran ~2M connections per server on Erlang/FreeBSD; a good talking point for connection density.",
            "Presence: heartbeat every ~30 s with TTL in Redis; publish changes only to users currently viewing that contact (lazy) to avoid fan-out storms.",
            "Groups: small groups fan out on write to members' inboxes; very large channels (Slack/Discord) fan out on read."
          ],
          cases: [
            "Gateway crash drops 1M connections: clients reconnect with jittered backoff to avoid a reconnect storm.",
            "Message sent twice due to retry after lost ack: dedupe by client message ID.",
            "Out-of-order delivery across devices: order by server sequence, not arrival.",
            "Large group (1,000+ members) message fan-out amplification; batch and use read fan-out for huge channels.",
            "Presence storms when a celebrity comes online: lazy subscriptions.",
            "Multi-device with E2E encryption: messages encrypted per device key; adding a device requires key distribution.",
            "Follow-up: 'how do read receipts work in groups?' Per-member last-read sequence; aggregate lazily."
          ],
          qa: [
            { q: "How does a message reach a recipient connected to a different server?", a: "The sender's gateway forwards to the chat service, which persists the message, then looks up the recipient's active gateways in the session registry (Redis) and forwards over an internal channel (pub/sub or RPC). That gateway pushes over the recipient's WebSocket. If no session exists, a push notification is sent and the message waits for sync." },
            { q: "How do you guarantee no message loss and no duplicates?", a: "Client assigns a unique message ID and retries until it receives a server ack, which is sent only after durable persistence. Server dedupes by (sender, client_msg_id). Delivery to recipients is at-least-once with acks; recipient devices dedupe by message ID and order by server sequence." },
            { q: "Which database would you use for messages?", a: "A wide-column store (Cassandra/ScyllaDB/HBase) partitioned by (conversation_id, time bucket) and clustered by message ID: high write throughput, efficient 'latest N messages' range reads, and linear horizontal scaling. Discord moved from MongoDB to Cassandra to ScyllaDB for this access pattern." },
            { q: "How do you implement 'last seen' and online status?", a: "Gateways update a presence key with TTL on connect and heartbeat; disconnect or TTL expiry marks offline with last_seen timestamp. Clients subscribe to presence of contacts currently on screen; updates are pushed via the same real-time channel, debounced to avoid flapping." }
          ]
        },
        {
          id: "photo-sharing",
          title: "Instagram / photo sharing",
          est: "1-2 days",
          why: "Combines media upload/storage/CDN with a feed; good test of read-heavy media architecture.",
          learn: [
            "Requirements: upload photos/videos with captions, follow, feed, likes/comments, profile grid; NFR: high availability, fast feed, durable media",
            "Estimates: 100M uploads/day x 2 MB ~ 200 TB/day raw; multiple resized variants; reads &gt;&gt; writes",
            "API: <code>POST /media/upload-url</code>, <code>POST /posts</code>, <code>GET /feed</code>, <code>POST /posts/{id}/like</code>",
            "Data model: posts metadata (sharded by user_id), media objects in S3, likes/comments tables, follow graph",
            "Upload flow: pre-signed URL &rarr; object storage &rarr; event &rarr; processing (resize, thumbnails, EXIF strip, moderation) &rarr; CDN",
            "Feed reuses news-feed design (hybrid fan-out)",
            "Deep dive: image variants and responsive delivery (WebP/AVIF), CDN strategy",
            "Deep dive: like counts at scale, comment pagination, hashtag/explore"
          ],
          practice: [
            { t: "Instagram: Sharding & IDs at Instagram", p: "BLOG", d: "M", u: "https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c" },
            { t: "Design Instagram (Grokking / ByteByteGo chapter)", p: "BYTEBYTEGO", d: "M" },
            { t: "Facebook: Finding a needle in Haystack (photo storage, OSDI 2010)", p: "BLOG", d: "H", u: "https://www.usenix.org/legacy/event/osdi10/tech/full_papers/Beaver.pdf" },
            { t: "Build an upload + thumbnail pipeline with S3 events and a worker", p: "BUILD", d: "M" }
          ],
          notes: [
            "Media bytes never pass through app servers; pre-signed upload directly to object storage, then async processing.",
            "Generate a few fixed variants (thumbnail, 320, 640, 1080) at upload, or resize on the fly at the edge with caching.",
            "Facebook Haystack: packing many small photos into large files to avoid per-file filesystem metadata overhead; nice depth point.",
            "Post metadata sharded by user_id gives fast profile grids; post IDs embed shard ID (Instagram scheme).",
            "Like counts: write likes to a sharded store; maintain approximate counters via async aggregation; show exact count only when small.",
            "Content moderation (ML classifiers) runs asynchronously before or shortly after publishing depending on policy.",
            "Storage tiering: older, rarely viewed media to cheaper storage classes."
          ],
          cases: [
            "Post created but processing fails: post stays in 'processing' state, hidden; retries via queue.",
            "Viral post: CDN offload; hot like-counter sharded.",
            "User deletes a post: remove from feeds lazily, purge CDN, delete media asynchronously (GDPR deadlines).",
            "Duplicate uploads on retry: idempotency key on post creation.",
            "Large videos: chunked resumable upload and transcoding (see YouTube design).",
            "Follow-up: 'design the Explore page' Candidate generation from engagement graph + embeddings, ranking model, heavy caching."
          ],
          qa: [
            { q: "Walk through the photo upload path.", a: "Client requests an upload URL; server creates a pending post/media record and returns a pre-signed URL. Client uploads to object storage. An object-created event enqueues processing: validate, strip EXIF, resize variants, run moderation, write variant URLs to metadata, mark the post published and trigger feed fan-out. Reads come from the CDN." },
            { q: "How do you scale like counts for viral posts?", a: "Don't update a single counter row per like. Append like events (user, post) to a sharded store for dedupe, increment sharded counters or buffer in Redis and flush periodically, and serve an approximate cached count. Exact uniqueness lives in the likes table keyed by (post_id, user_id)." },
            { q: "Where do you store photos and how are they served?", a: "Object storage (S3) with replication/erasure coding for durability, multiple size variants, served via a CDN with long cache TTLs since images are immutable (new versions get new keys)." }
          ]
        },
        {
          id: "video-streaming",
          title: "YouTube / Netflix video streaming",
          est: "2 days",
          why: "Classic media-scale design: upload pipeline, transcoding, adaptive bitrate streaming and CDN economics.",
          learn: [
            "Requirements: upload, watch with adaptive quality, search/browse, view counts; NFR: smooth playback (low rebuffering), global scale, durable storage",
            "Estimates: 500 hours uploaded/min; 1B hours watched/day; egress bandwidth dominates cost",
            "API: <code>POST /videos</code> (resumable upload session), <code>GET /videos/{id}/manifest</code>, <code>GET /videos/{id}</code> metadata",
            "Data model: video metadata (SQL/Vitess), chunks and renditions in object storage, view events in analytics store",
            "Upload pipeline: chunked resumable upload &rarr; raw storage &rarr; DAG of tasks (split, transcode per resolution/codec in parallel, thumbnails, captions) &rarr; packaging",
            "Adaptive bitrate streaming: HLS/DASH, segments of 2-10 s, manifest with multiple renditions, client switches by bandwidth",
            "Deep dive: CDN strategy (Netflix Open Connect appliances inside ISPs), cache popular content, long tail from origin",
            "Deep dive: view counting at scale, recommendations, DRM"
          ],
          practice: [
            { t: "Hello Interview: Design YouTube", p: "HELLO", d: "M" },
            { t: "Alex Xu Vol 1, Ch 14: Design YouTube", p: "BOOK", d: "M" },
            { t: "Netflix Open Connect", p: "DOC", d: "M", u: "https://openconnect.netflix.com/" },
            { t: "Netflix Tech Blog (encoding, per-title optimisation)", p: "BLOG", d: "M", u: "https://netflixtechblog.com/" },
            { t: "Vitess (YouTube's MySQL sharding)", p: "DOC", d: "M", u: "https://vitess.io/" },
            { t: "Use ffmpeg to produce an HLS ladder (240p-1080p) and play it in a browser", p: "BUILD", d: "M" }
          ],
          notes: [
            "Transcoding is the expensive write path: split video into segments and transcode in parallel workers (DAG scheduler); a 1-hour video can be ready in minutes.",
            "ABR: client measures throughput and buffer, requests next segment at the best sustainable bitrate; startup at low bitrate for fast first frame.",
            "CDN egress is the main cost; Netflix places caches in ISP networks and pre-positions popular titles during off-peak hours.",
            "Long-tail videos are served from regional origins; popular ones from edges. Popularity follows a power law.",
            "Metadata (titles, owners) is small and relational; YouTube scaled MySQL with Vitess.",
            "View counts: aggregate events in streaming jobs; fraud/bot filtering before public counts.",
            "Separate raw upload storage from processed renditions; keep raw for re-encoding with new codecs (AV1)."
          ],
          cases: [
            "Upload interrupted at 90% on mobile: resumable chunked uploads.",
            "Transcoding worker dies mid-task: idempotent tasks re-queued from the DAG state.",
            "Viral video overwhelms edge: request coalescing at CDN, origin shield.",
            "Copyright and moderation checks (Content ID fingerprinting) before publishing.",
            "Live streaming is different: low-latency ingest (RTMP/SRT), real-time transcoding, short segments (LL-HLS).",
            "Follow-up: 'how do you reduce startup latency?' Pre-fetch first segments, low initial bitrate, edge proximity, warm manifests."
          ],
          qa: [
            { q: "Explain adaptive bitrate streaming.", a: "Each video is encoded into multiple renditions (resolution/bitrate) and cut into short segments. A manifest (HLS m3u8 / DASH MPD) lists them. The player downloads segments over HTTP, monitors bandwidth and buffer level, and picks the rendition for each next segment, switching quality without interrupting playback. Plain HTTP segments make it CDN-friendly." },
            { q: "How would you design the transcoding pipeline?", a: "Upload completion triggers a workflow: validate, split into GOP-aligned chunks, fan out chunk x rendition tasks to a worker pool via a queue, then merge/package into HLS/DASH, generate thumbnails, and update metadata. A DAG scheduler tracks task state for retries; tasks are idempotent and outputs are written to object storage." },
            { q: "Why does Netflix put servers inside ISPs?", a: "Video egress is enormous; serving from appliances inside ISP networks cuts transit cost, reduces latency and congestion, and improves quality. Popular content is pre-positioned during off-peak hours based on predicted demand." }
          ]
        },
        {
          id: "ride-sharing",
          title: "Uber / Ola ride sharing",
          est: "2 days",
          why: "Tests geospatial indexing of moving objects, matching under contention, and real-time location updates.",
          learn: [
            "Requirements: rider requests ride, sees ETA and fare, matched to nearby driver, live tracking, trip lifecycle, payment; NFR: matching &lt; few seconds, no double-assigning a driver, high availability",
            "Estimates: 5M active drivers sending location every 4 s ~ 1.25M updates/s; rides ~ 1k-10k requests/s at peak",
            "API: <code>POST /rides/estimate</code>, <code>POST /rides</code>, <code>PATCH /drivers/location</code>, <code>POST /rides/{id}/accept</code>",
            "Data model: drivers' live location (in-memory geo index), trips (SQL, state machine), driver status",
            "Location service: Redis GEO / geohash / H3 cells sharded by region, TTL for stale entries",
            "Matching service: query nearby available drivers, rank by ETA, offer to one driver at a time with timeout",
            "Deep dive: consistency in matching (driver locked via conditional update / distributed lock with TTL)",
            "Deep dive: ETA via routing engine, surge pricing, trip state machine, live tracking via WebSocket"
          ],
          practice: [
            { t: "Hello Interview: Design Uber", p: "HELLO", d: "M", u: "https://www.hellointerview.com/learn/system-design/problem-breakdowns/uber" },
            { t: "Uber H3: hexagonal hierarchical spatial index", p: "BLOG", d: "M", u: "https://www.uber.com/blog/h3/" },
            { t: "Alex Xu Vol 2, Ch 1-2: Proximity service, Nearby friends", p: "BOOK", d: "M" },
            { t: "Uber Engineering blog", p: "BLOG", d: "M", u: "https://www.uber.com/blog/engineering/" },
            { t: "Build a nearby-drivers service with Redis GEOADD/GEOSEARCH and a load generator", p: "BUILD", d: "M" }
          ],
          notes: [
            "Location updates are write-heavy and ephemeral: keep current location in memory (Redis GEO or a custom grid), shard by city/cell; persist the trail asynchronously (Kafka) only for trips.",
            "Reduce update load: adaptive frequency (less when stationary), batch updates, only active drivers.",
            "Matching must not double-book: set driver status with compare-and-set (<code>UPDATE drivers SET status='offered' WHERE id=? AND status='available'</code>) or Redis lock with TTL = offer timeout.",
            "Offer to the best driver, wait ~10-15 s, then move to the next; or offer to a few in parallel with first-accept-wins semantics.",
            "ETA uses a road-graph routing engine (contraction hierarchies) plus live traffic; straight-line distance is only for pre-filtering.",
            "Trip is a state machine (requested, matched, arriving, in_progress, completed, cancelled) in a strongly consistent store; transitions are idempotent.",
            "Surge pricing: supply/demand per H3 cell computed in near-real-time by a stream processor."
          ],
          cases: [
            "Two riders matched to the same driver concurrently: atomic status transition.",
            "Driver accepts after the offer timed out and was given to another driver: versioned offer IDs.",
            "Dense hotspots (airport, stadium): cell sizes adaptive, queue-based matching at airports.",
            "Driver app loses connectivity mid-trip: buffer locations on device, reconcile on reconnect.",
            "Regional data centre failure: Uber used client-side state replication to recover trips.",
            "Follow-up: 'how do you handle 10x demand at New Year?' Pre-scale, queue requests, degrade non-critical features, surge pricing to balance."
          ],
          qa: [
            { q: "How do you find nearby drivers fast with 1M+ location updates per second?", a: "Keep only the latest location per driver in an in-memory geospatial index (geohash/H3 cells in Redis or a custom service), sharded by geography. Each update overwrites the driver's cell membership with a TTL. A query looks up the rider's cell and neighbouring cells, filters available drivers, then ranks by road ETA." },
            { q: "How do you ensure a driver isn't assigned two rides?", a: "Make assignment an atomic compare-and-set on the driver's status (available &rarr; offered with ride_id and expiry) in a strongly consistent store, or a lock with TTL equal to the offer window. Acceptance validates the offer ID is still current. Losers move to the next candidate." },
            { q: "How does live tracking work?", a: "Driver app sends location every few seconds to the location service; for active trips, updates are published (via pub/sub) to the rider's connection gateway and pushed over WebSocket/SSE. Trail is persisted asynchronously for fare calculation and audits." }
          ]
        },
        {
          id: "typeahead",
          title: "Typeahead / search autocomplete",
          est: "1 day",
          why: "Tests read-latency optimisation with precomputed data structures (tries, top-K) and offline/online pipeline split.",
          learn: [
            "Requirements: top 5-10 suggestions per prefix, ranked by popularity (optionally personalised), &lt; 100 ms end to end, update daily or near-real-time",
            "Estimates: 10M DAU x 10 searches x ~6 keystrokes ~ 600M requests/day ~ 7k QPS avg, 20k+ peak",
            "API: <code>GET /suggest?q=pre&amp;limit=10</code>",
            "Data structure: trie with top-K cached at each node; or prefix &rarr; top-K map in a KV store",
            "Offline pipeline: query logs &rarr; aggregation (Spark) &rarr; build trie/prefix table &rarr; publish snapshot",
            "Serving: in-memory trie servers sharded by prefix range; CDN/browser caching of popular prefixes",
            "Deep dive: real-time trending (stream processing with time-decayed counts)",
            "Deep dive: client optimisations (debounce, cancel stale requests, local cache), filtering offensive terms"
          ],
          practice: [
            { t: "Alex Xu Vol 1, Ch 13: Design a search autocomplete system", p: "BOOK", d: "M" },
            { t: "Implement Trie (LeetCode 208)", p: "LC", d: "M", u: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
            { t: "Design Search Autocomplete System (LeetCode 642)", p: "LC", d: "H", u: "https://leetcode.com/problems/design-search-autocomplete-system/" },
            { t: "Build a trie with cached top-5 per node from a query log; serve via HTTP", p: "BUILD", d: "M" }
          ],
          notes: [
            "Precompute: storing top-K at every trie node turns a query into O(prefix length) with no subtree traversal.",
            "Separate data collection (logs, async aggregation) from serving (read-only snapshots swapped atomically).",
            "Simplest scalable store: prefix (up to ~20 chars) &rarr; top-10 list in Redis/KV; prefixes are a bounded key space.",
            "Cache short prefixes aggressively (CDN/browser, TTL minutes); 1-2 character prefixes are the hottest.",
            "Shard by prefix with care: 's' is far bigger than 'x'; shard by hashed prefix or by measured load.",
            "Trending: Flink job with sliding windows and exponential decay; merge with the daily batch scores.",
            "Client debounce (~100-200 ms) cuts request volume dramatically."
          ],
          cases: [
            "Uneven shard load by first letter; balance using historical distributions.",
            "Offensive or legally blocked suggestions: filter layer + blocklist applied at serve time for fast removal.",
            "Sudden trending event not reflected by daily batch: real-time layer.",
            "Multi-language / Unicode normalisation and typo tolerance (fuzzy matching).",
            "Personalisation increases cache misses; blend a global list with a small personal list on the client/server.",
            "Follow-up: 'how do you update the trie without downtime?' Build new snapshot offline, load on new servers, swap traffic (blue-green)."
          ],
          qa: [
            { q: "How do you return top suggestions in under 100 ms?", a: "Serve from memory: a trie (or prefix &rarr; top-K table) with precomputed top-K at each node, built offline from aggregated query frequencies. Lookup is O(length of prefix). Add CDN/browser caching for common prefixes and client-side debouncing." },
            { q: "How is the trie kept up to date?", a: "Query logs flow into a batch job that aggregates counts (with time decay) weekly/daily and builds a new trie snapshot, which is deployed by swapping. For freshness, a streaming job computes trending queries over recent windows and merges them at serve time." },
            { q: "Trie vs prefix table in a KV store?", a: "A trie is memory-efficient and supports prefix traversal; a prefix table (every prefix up to N chars &rarr; top-K) uses more space but works on any KV store, shards trivially by key and is simpler to operate. At interview scale both are fine; state the trade-off." }
          ]
        },
        {
          id: "web-crawler",
          title: "Web crawler",
          est: "1-2 days",
          why: "Tests large-scale distributed work scheduling, politeness, dedup and fault tolerance.",
          learn: [
            "Requirements: crawl billions of pages from seed URLs, extract links, store content, respect robots.txt and politeness, recrawl for freshness; NFR: scalable, robust to traps and failures",
            "Estimates: 1B pages/month ~ 400 pages/s; 100 KB avg ~ 100 TB/month",
            "Components: URL frontier, fetchers (with DNS cache), parser/extractor, content dedup, URL filter/dedup, storage",
            "URL frontier: priority queues (importance) + per-host politeness queues (one host per queue, delay between requests)",
            "Dedup: URL normalisation + seen-URL set (Bloom filter or KV); content fingerprint (SimHash for near-duplicates)",
            "Deep dive: politeness and robots.txt caching, rate per domain",
            "Deep dive: crawler traps, infinite URL spaces, max depth, URL length limits",
            "Deep dive: recrawl scheduling based on change frequency; checkpointing frontier state"
          ],
          practice: [
            { t: "Hello Interview: Design a web crawler", p: "HELLO", d: "M" },
            { t: "system-design-primer: Design a web crawler", p: "DOC", d: "M", u: "https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/web_crawler/README.md" },
            { t: "Alex Xu Vol 1, Ch 9: Design a web crawler", p: "BOOK", d: "M" },
            { t: "Web Crawler Multithreaded (LeetCode 1242)", p: "LC", d: "M", u: "https://leetcode.com/problems/web-crawler-multithreaded/" },
            { t: "Build a polite async crawler (asyncio + per-host semaphore + robots.txt)", p: "BUILD", d: "M" }
          ],
          notes: [
            "Frontier design (Mercator): front queues by priority, back queues per host; a heap of next-allowed-fetch times enforces politeness.",
            "Partition the frontier by hash(hostname) so each worker owns a set of hosts; politeness becomes local, no global locks.",
            "Bloom filter for seen URLs: ~10 bits per URL for 1% false positives; 10B URLs ~ 12 GB. False positives only skip a few pages.",
            "Content dedup: exact via SHA-256 of normalised content; near-duplicate via SimHash with Hamming distance.",
            "DNS resolution is a hidden bottleneck; cache aggressively.",
            "Store raw pages in object storage (WARC files), metadata and crawl state in a KV store.",
            "Use a queue (Kafka) between stages so fetchers, parsers and indexers scale independently."
          ],
          cases: [
            "Spider traps (calendar pages, session IDs in URLs): normalise URLs, cap depth and per-host page counts.",
            "Hammering a small site: per-host delay and concurrency=1; honour Crawl-delay.",
            "Worker crash loses in-flight URLs: frontier persisted with leases/visibility timeouts.",
            "Hot hosts (Wikipedia) dominate a partition; split very large hosts across workers with shared rate limit.",
            "JavaScript-rendered pages need headless browsers, which are 10-100x more expensive; separate pool.",
            "Follow-up: 'how do you prioritise which pages to crawl?' PageRank-like importance, freshness, domain authority."
          ],
          qa: [
            { q: "How do you enforce politeness at scale?", a: "Partition URLs by host to workers; within a worker, keep one queue per host and a min-heap of next-allowed fetch times. A host is fetched only when its time arrives, with delay based on robots.txt Crawl-delay or response time. Cache robots.txt per host." },
            { q: "How do you avoid crawling the same URL twice?", a: "Normalise URLs (lowercase host, remove fragments, sort query params, strip tracking params), then check a distributed seen set: a Bloom filter in memory for the fast path backed by a KV store for exactness if needed. Content fingerprints catch the same content at different URLs." },
            { q: "How does the system recover if a crawler node dies?", a: "Frontier state is durable (Kafka/queue with offsets, or KV-backed queues); in-flight URLs have leases that expire and are reassigned. Host partitions are reassigned via consistent hashing/coordination service. Fetches are idempotent so re-crawling a few pages is harmless." }
          ]
        },
        {
          id: "file-storage-sync",
          title: "Dropbox / Google Drive (file storage & sync)",
          est: "2 days",
          why: "Tests chunking, dedup, metadata consistency, sync conflicts and large file transfer.",
          learn: [
            "Requirements: upload/download files, sync across devices, share, version history; NFR: durability (no data loss), large files (up to 50 GB), resumable, efficient on bandwidth",
            "Estimates: 100M users x 10 GB avg ~ 1 EB stored; dedup and compression matter",
            "API: <code>POST /files/upload-session</code>, chunk upload via pre-signed URLs, <code>POST /files/commit</code>, <code>GET /changes?cursor=</code>",
            "Data model: file metadata (path, version, owner, chunk list of hashes) in a strongly consistent DB; chunks in object storage keyed by content hash",
            "Chunking: fixed (4 MB) or content-defined chunking (Rabin fingerprint) for delta sync",
            "Sync: client watcher &rarr; compute changed chunks &rarr; upload missing chunks &rarr; commit new version &rarr; notify other devices (long poll / WebSocket)",
            "Deep dive: conflict resolution (conflicted copies), version history, deletes/trash",
            "Deep dive: dedup across users, encryption, sharing permissions"
          ],
          practice: [
            { t: "Hello Interview: Design Dropbox", p: "HELLO", d: "M", u: "https://www.hellointerview.com/learn/system-design/problem-breakdowns/dropbox" },
            { t: "Alex Xu Vol 1, Ch 15: Design Google Drive", p: "BOOK", d: "M" },
            { t: "Dropbox: Inside the Magic Pocket", p: "BLOG", d: "H", u: "https://dropbox.tech/infrastructure/inside-the-magic-pocket" },
            { t: "Build a CLI that chunks a file into 4 MB pieces, hashes them and uploads only new chunks", p: "BUILD", d: "M" }
          ],
          notes: [
            "Chunk + hash = resumable uploads, parallel transfer, delta sync (only changed chunks) and dedup (same hash stored once).",
            "Content-defined chunking keeps boundaries stable when bytes are inserted, so small edits change only one or two chunks.",
            "Metadata must be strongly consistent (sharded SQL, e.g. Dropbox's Edgestore on MySQL); blocks can live in eventually consistent blob storage since they're immutable and content-addressed.",
            "Commit protocol: client uploads chunks first, then commits metadata referencing hashes; server verifies all chunks exist before committing (no dangling references).",
            "Change notification: devices hold a long poll / WebSocket to a notification service, then fetch deltas via a cursor-based changes API.",
            "Conflicts: optimistic concurrency with a base version; if the server version moved, save as 'conflicted copy' rather than silently overwriting.",
            "Cold storage tiering and erasure coding for cost at exabyte scale."
          ],
          cases: [
            "Two devices edit offline and sync: conflicted copy.",
            "Upload interrupted: resume missing chunks via the upload session.",
            "Chunks uploaded but commit never happens: garbage-collect unreferenced chunks after a grace period.",
            "Deleting a deduplicated chunk referenced by others: reference counting or mark-and-sweep GC.",
            "Hash collision paranoia: SHA-256 makes it practically impossible; mention and move on.",
            "Shared folder with 10k members: notification fan-out per change batched.",
            "Follow-up: 'how do you support 50 GB files?' Multipart parallel upload, per-chunk checksums, long-lived upload sessions."
          ],
          qa: [
            { q: "Why split files into chunks?", a: "Chunking enables resumable and parallel uploads, delta sync (only modified chunks are transferred), and deduplication via content hashes, and keeps individual objects within storage limits. Metadata stores the ordered list of chunk hashes per file version." },
            { q: "How do other devices learn about changes?", a: "Each device keeps a long-poll or WebSocket connection to a notification service. When a commit happens for a namespace the device subscribes to, it gets a 'changed' signal and calls the changes API with its cursor to get the list of updated files, then downloads missing chunks." },
            { q: "How do you handle concurrent edits to the same file?", a: "Commits include the base version the client edited. If it matches the latest, commit; otherwise the server rejects, and the client saves its version as a conflicted copy for the user to resolve. Real-time co-editing needs OT/CRDT instead (Google Docs)." }
          ]
        }
      ]
    },
    {
      name: "Level 3 · Advanced designs",
      desc: "Designs with hard correctness requirements (money, inventory, ordering) or heavy distributed-systems internals. Common at senior and staff level.",
      topics: [
        {
          id: "distributed-mq",
          title: "Distributed message queue (design Kafka)",
          est: "2 days",
          why: "Tests deep knowledge of logs, replication, partitioning and consumer coordination; asked at infra-heavy companies.",
          learn: [
            "Requirements: producers publish to topics, consumers in groups, retention (time/size), ordering per partition, at-least-once by default, high throughput (GB/s), durability",
            "Core abstraction: append-only partitioned log; offset as consumer position",
            "Broker storage: segment files, sparse offset index, sequential IO, page cache, zero-copy (<code>sendfile</code>)",
            "Replication: leader + followers per partition, ISR, high-water mark, <code>acks</code> settings, <code>min.insync.replicas</code>",
            "Metadata & coordination: controller (ZooKeeper or KRaft) for partition leadership",
            "Consumer groups: partition assignment, rebalancing protocol, committed offsets stored in an internal topic",
            "Deep dive: delivery semantics, idempotent producer (producer ID + sequence), transactions",
            "Deep dive: retention, log compaction, tiered storage to S3"
          ],
          practice: [
            { t: "Alex Xu Vol 2, Ch 4: Distributed message queue", p: "BOOK", d: "H" },
            { t: "Kafka documentation: Design", p: "DOC", d: "H", u: "https://kafka.apache.org/documentation/#design" },
            { t: "Jay Kreps: The Log", p: "BLOG", d: "M", u: "https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying" },
            { t: "Build a single-node append-only log with segment files and an offset index", p: "BUILD", d: "H" }
          ],
          notes: [
            "Throughput comes from sequential disk writes, batching + compression on the producer, OS page cache, and zero-copy transfer to consumers.",
            "Ordering only within a partition; partitions are the unit of parallelism and replication.",
            "A write is committed when all ISR replicas have it; consumers only see messages up to the high-water mark, so they never read data that could be lost on failover.",
            "<code>acks=all</code> + <code>min.insync.replicas=2</code> + RF=3 tolerates one broker loss without data loss.",
            "Consumers pull (not push): they control their pace, batch efficiently, and replay by resetting offsets.",
            "Idempotent producer dedupes retries per partition using (producer ID, sequence number).",
            "Tiered storage moves old segments to object storage, decoupling retention from broker disk."
          ],
          cases: [
            "Leader fails before followers replicate: with <code>acks=1</code> messages are lost; with <code>acks=all</code> they are not.",
            "Unclean leader election (out-of-sync replica becomes leader) trades data loss for availability.",
            "Consumer rebalance storms stop processing; use cooperative/incremental rebalancing and static membership.",
            "Hot partition from skewed keys; repartition or salt keys (loses per-key order).",
            "Slow consumer falls behind retention and loses data; monitor lag.",
            "Follow-up: 'how do you support delayed messages or priorities?' Not native; separate topics per delay tier or a scheduler service."
          ],
          qa: [
            { q: "Why is Kafka so fast?", a: "Append-only sequential writes to segment files, reliance on the OS page cache, batching and compression of messages, zero-copy transfer from page cache to socket, and partitioning across brokers for parallelism. Consumers pull in large batches." },
            { q: "How does Kafka avoid data loss when a broker dies?", a: "Each partition is replicated; the leader tracks in-sync replicas. With acks=all, a write is acknowledged only after all ISR replicas have it and min.insync.replicas is met. On leader failure, the controller elects a new leader from the ISR, which has every committed message." },
            { q: "How are partitions assigned to consumers?", a: "A group coordinator broker manages membership; when members join/leave, a rebalance assigns partitions (range, round robin, sticky, cooperative-sticky). Each partition goes to exactly one consumer in the group; committed offsets are stored in the __consumer_offsets topic so a new owner resumes where the old one left off." }
          ]
        },
        {
          id: "payment-system",
          title: "Payment system (UPI / Stripe-style)",
          est: "2-3 days",
          why: "Asked heavily in Indian fintech (PhonePe, Razorpay, Paytm, CRED) and at Stripe/Amazon; correctness, idempotency and reconciliation are everything.",
          learn: [
            "Requirements: pay-in (customer to merchant), payouts, refunds, statuses, ledger; NFR: exactly-once effect, strong consistency for money, auditability, high availability",
            "Estimates: e.g. 10k TPS peak (UPI handles &gt; 10B transactions/month)",
            "API: <code>POST /payments</code> with Idempotency-Key, <code>GET /payments/{id}</code>, webhooks to merchants",
            "Components: payment service, payment executor, PSP/bank connectors, ledger, wallet/balances, reconciliation, risk/fraud",
            "Data model: payment orders with state machine, double-entry ledger (immutable entries, debits = credits)",
            "Deep dive: idempotency end to end (client to service to PSP)",
            "Deep dive: handling timeouts/unknown status with PSP: status polling, webhooks, reconciliation with settlement files",
            "Deep dive: distributed transaction across wallet and ledger: outbox + saga; retries with DLQ"
          ],
          practice: [
            { t: "Alex Xu Vol 2, Ch 11-12: Payment system, Digital wallet", p: "BOOK", d: "H" },
            { t: "Stripe: Designing robust and predictable APIs with idempotency", p: "BLOG", d: "M", u: "https://stripe.com/blog/idempotency" },
            { t: "Airbnb: Avoiding double payments in a distributed payments system", p: "BLOG", d: "H", u: "https://medium.com/airbnb-engineering/avoiding-double-payments-in-a-distributed-payments-system-2981f6b070bb" },
            { t: "Modern Treasury: Accounting for developers (double-entry ledger)", p: "BLOG", d: "M", u: "https://www.moderntreasury.com/journal/accounting-for-developers-part-i" },
            { t: "Build a double-entry ledger in Postgres with idempotent transfers and a balance invariant check", p: "BUILD", d: "H" }
          ],
          notes: [
            "Money correctness beats availability: use a relational DB with ACID transactions for payment state and ledger.",
            "Payment state machine: CREATED &rarr; PROCESSING &rarr; SUCCEEDED/FAILED (&rarr; REFUNDED); transitions are idempotent and logged.",
            "Double-entry ledger: every movement writes balanced debit/credit entries; balances are derived (or cached with the invariant enforced in the same transaction). Never update balances without ledger entries.",
            "Timeouts with the PSP mean UNKNOWN, not failed: never retry blindly with a new ID; query status with the same idempotency key, rely on webhooks, and reconcile.",
            "Reconciliation: daily compare internal ledger with PSP/bank settlement files; mismatches go to a manual queue. This is the safety net every real system has.",
            "Use exactly-once <i>effect</i>: at-least-once messaging + idempotency keys + unique constraints.",
            "Talking point: store amounts as integers in minor units (paise) with currency, never floats."
          ],
          cases: [
            "User double-taps 'Pay': same idempotency key dedupes.",
            "PSP charged the user but our service timed out: status UNKNOWN, resolve via polling/webhook, never charge again.",
            "Webhook delivered twice or out of order: idempotent handler, state machine rejects invalid transitions.",
            "Partial refunds exceeding original amount: invariant checks in the transaction.",
            "Wallet balance going negative under concurrent debits: row lock or conditional update (<code>WHERE balance &gt;= amount</code>).",
            "Currency rounding and FX rates at time of payment stored with the transaction.",
            "Follow-up: 'how do you guarantee a merchant is paid exactly once?' Payout idempotency keys, ledger-based payable state, reconciliation with bank statements."
          ],
          qa: [
            { q: "How do you prevent double charging?", a: "Client sends an idempotency key per payment intent; the service atomically records it with a unique constraint and returns the stored result on retries. The same key (or a derived one) is passed to the PSP, which also dedupes. Payment state transitions are conditional updates, so duplicate events don't re-execute." },
            { q: "What do you do when the call to the bank times out?", a: "Mark the payment PENDING/UNKNOWN, not failed. Retry the status query (not a new charge) with the same reference, listen for the PSP webhook, and if still unresolved, rely on end-of-day reconciliation. Show the user 'processing' and auto-refund if later found debited but unfulfilled." },
            { q: "Why a double-entry ledger?", a: "Every transaction records equal and opposite entries across accounts, so the sum of all entries is always zero. That gives an immutable, auditable history, makes errors detectable (imbalances), and lets balances be recomputed. Corrections are new reversing entries, never edits." },
            { q: "Which consistency model and database?", a: "Strong consistency with ACID transactions: a relational DB (Postgres/MySQL, sharded by account or merchant) or a distributed SQL DB (Spanner/CockroachDB/TiDB). Asynchronous parts (notifications, analytics) are eventually consistent via outbox + Kafka." }
          ]
        },
        {
          id: "ticket-booking",
          title: "Ticket booking (BookMyShow / Ticketmaster) with concurrency",
          est: "2 days",
          why: "Classic concurrency design asked across Indian product companies; tests seat locking, contention and flash-sale traffic.",
          learn: [
            "Requirements: browse events/shows, view seat map, hold seats, pay, confirm booking; NFR: never double-book, handle flash traffic (big concert, IPL), seat map reasonably fresh",
            "Estimates: normal load modest; on-sale spike of millions of users for ~50k seats",
            "API: <code>GET /shows/{id}/seats</code>, <code>POST /holds {show_id, seat_ids}</code>, <code>POST /bookings {hold_id, payment}</code>",
            "Data model: shows, seats per show with status (available/held/booked), hold_id, hold_expires_at, version",
            "Seat hold: atomic conditional update or Redis lock with TTL (~10 min); release on expiry or payment failure",
            "Booking: payment with idempotency, then confirm seats in the same transaction as booking record",
            "Deep dive: virtual waiting queue for on-sale spikes (admission control, tokens)",
            "Deep dive: seat map caching and real-time updates, search for events (Elasticsearch)"
          ],
          practice: [
            { t: "Hello Interview: Design Ticketmaster", p: "HELLO", d: "M", u: "https://www.hellointerview.com/learn/system-design/problem-breakdowns/ticketmaster" },
            { t: "Alex Xu Vol 2, Ch 7: Hotel reservation system", p: "BOOK", d: "M" },
            { t: "Postgres docs: explicit locking (SELECT FOR UPDATE, SKIP LOCKED)", p: "DOC", d: "M", u: "https://www.postgresql.org/docs/current/explicit-locking.html" },
            { t: "Simulate 1,000 concurrent users booking 100 seats; prove zero double-bookings with conditional updates", p: "BUILD", d: "M" }
          ],
          notes: [
            "Hold seats with a single atomic statement: <code>UPDATE seats SET status='HELD', hold_id=?, expires_at=now()+10m WHERE show_id=? AND seat_id IN (...) AND status='AVAILABLE'</code>; success only if rowcount equals requested seats (in a transaction).",
            "Pessimistic locking (<code>SELECT ... FOR UPDATE</code>) vs optimistic (version column): optimistic works when contention is low; for hot shows prefer atomic conditional updates or a Redis-based hold with TTL.",
            "Expiry: lazy (treat expired holds as available in the WHERE clause) plus a sweeper; no cron precision needed.",
            "Flash sales: put users in a virtual queue (Redis sorted set / Cloudflare-style waiting room), admit at a rate the system can handle, issue signed admission tokens.",
            "Seat map reads are cacheable for seconds; final truth is the hold step, which may fail and refresh the map.",
            "Payment after hold; on payment success, transition HELD &rarr; BOOKED only if the hold is still valid; otherwise refund.",
            "Partition by show_id: contention is per show, so a single show's seats live on one shard and can use local transactions."
          ],
          cases: [
            "Two users click the same seat simultaneously: one conditional update wins, the other gets 'seat taken'.",
            "Payment succeeds after hold expired and seat resold: refund automatically; or extend hold while payment is in progress.",
            "Bots grabbing seats: CAPTCHA, per-user limits, queue tokens.",
            "Hold service (Redis) failure losing holds: keep DB as source of truth for final booking.",
            "Thundering herd at on-sale time hitting the DB: waiting room + cached reads.",
            "Partial seat group availability (want 4 together): all-or-nothing in one transaction.",
            "Follow-up: 'how do you show live seat availability?' Push seat status changes via WebSocket/SSE per show, or poll a cached map every few seconds."
          ],
          qa: [
            { q: "How do you guarantee no double booking?", a: "Make the state transition atomic at the source of truth: a conditional UPDATE on seats where status is AVAILABLE (or not expired HELD) inside a transaction, checking affected rows. Alternatively a unique constraint on (show_id, seat_id) in a bookings table. Distributed locks alone are insufficient without the DB check." },
            { q: "How do temporary holds work?", a: "On selection, seats move to HELD with hold_id and expires_at in one atomic update. The user has ~10 minutes to pay. Availability queries treat expired holds as available; a background sweeper resets them. Booking confirms only if the hold is still valid." },
            { q: "How do you handle 5M users at on-sale for 50k seats?", a: "A virtual waiting room in front: users get a queue position (randomised or FIFO), are admitted at a controlled rate with signed tokens, and only admitted users can call hold APIs. Static content and seat maps are served from cache/CDN. This protects the booking DB and gives fairness." }
          ]
        },
        {
          id: "collab-editing",
          title: "Google Docs collaborative editing",
          est: "2 days",
          why: "Tests real-time sync and conflict resolution (OT vs CRDT), a favourite senior-level question.",
          learn: [
            "Requirements: multiple users edit the same document concurrently, see others' cursors, offline edits, version history; NFR: low latency (&lt; 100 ms local echo), convergence (all replicas end identical)",
            "Conflict resolution: Operational Transformation (server-ordered, transform concurrent ops) vs CRDTs (commutative ops, unique positions)",
            "Architecture: WebSocket to a document session server; one authoritative server per document (sharded by doc_id)",
            "Data model: document snapshot + operation log (append-only), periodic snapshots/compaction",
            "Client flow: apply op locally, send with base revision; server transforms against concurrent ops, assigns revision, broadcasts",
            "Presence/cursors: ephemeral, broadcast but not persisted",
            "Deep dive: offline editing and merge; version history from op log",
            "Deep dive: scaling sessions (consistent hashing doc_id &rarr; session server), failover"
          ],
          practice: [
            { t: "Hello Interview: Design Google Docs", p: "HELLO", d: "H" },
            { t: "Figma: How Figma's multiplayer technology works", p: "BLOG", d: "M", u: "https://www.figma.com/blog/how-figmas-multiplayer-technology-works/" },
            { t: "Martin Kleppmann: CRDTs and the quest for distributed consistency (talk)", p: "YT", d: "H", u: "https://www.youtube.com/watch?v=B5NULPSiOGw" },
            { t: "Yjs documentation (CRDT library)", p: "DOC", d: "M", u: "https://docs.yjs.dev/" },
            { t: "Build a shared text editor with Yjs + WebSocket provider", p: "BUILD", d: "M" }
          ],
          notes: [
            "OT: requires a central server to order ops; each client op is transformed against ops it hadn't seen. Google Docs uses OT. Simpler data, complex transform logic.",
            "CRDT: each character gets a unique, ordered ID so concurrent inserts commute; works peer-to-peer and offline. Higher metadata overhead (mitigated by modern libraries like Yjs/Automerge).",
            "Route all editors of a document to the same session server (sticky by doc_id) so ordering is local and cheap.",
            "Persist the op log durably before acking; snapshots every N ops so load time is bounded.",
            "Local echo: apply your own op immediately, reconcile when the server acks (optimistic UI).",
            "Figma uses a server-authoritative, simplified CRDT-like approach (last-writer-wins per property) because design docs are trees of objects, not text.",
            "Cursors and selections are transient; send via the same channel but don't store."
          ],
          cases: [
            "Two users insert at the same position: OT transform or CRDT tie-break by site ID ensures same order everywhere.",
            "Session server crash: clients reconnect to new owner, which rebuilds state from snapshot + op log; clients resend unacked ops.",
            "Long offline session generates huge divergence; CRDT merge or OT replay; UX for surprising merges.",
            "Very popular doc (1,000 editors) overloading one server: limit editors, read-only viewers via broadcast fan-out tier.",
            "Undo in collaborative context: undo only your own ops (selective undo).",
            "Follow-up: 'how do you implement comments anchored to text?' Anchor to stable character IDs/positions that are transformed with ops."
          ],
          qa: [
            { q: "OT vs CRDT?", a: "OT transforms concurrent operations against each other so they can be applied in different orders and still converge; it relies on a central server for ordering and has tricky transform functions. CRDTs design data types whose operations commute (e.g. unique position IDs for characters), converging without coordination, enabling offline and P2P, at the cost of metadata size. Server-centric products often use OT; local-first apps use CRDTs." },
            { q: "How does an edit propagate?", a: "Client applies the op locally and sends it with its base revision over WebSocket to the doc's session server. The server transforms it against ops committed since that revision, appends it to the op log with a new revision, acks the sender, and broadcasts the transformed op to other clients, who transform against their pending local ops and apply." },
            { q: "How do you scale to millions of documents?", a: "Shard documents across session servers using consistent hashing on doc_id; a document is 'owned' by one server at a time (lease in a coordination service). Op logs and snapshots live in a durable store. Inactive documents are unloaded from memory." }
          ]
        },
        {
          id: "search-engine",
          title: "Search engine (web or product search)",
          est: "2 days",
          why: "Tests indexing pipelines, inverted index sharding, ranking and query fan-out; product search is common at e-commerce companies (Flipkart, Amazon).",
          learn: [
            "Requirements: keyword search over documents/products, ranking by relevance, filters/facets, typo tolerance, freshness; NFR: p99 &lt; 200-300 ms, high QPS",
            "Pipeline: crawl/ingest &rarr; parse &rarr; tokenize/normalise &rarr; build inverted index &rarr; serve",
            "Index partitioning: document-partitioned (each shard has a subset of docs, query fans out) vs term-partitioned",
            "Query path: parse, spell-correct, retrieve candidates from each shard, score (BM25 + signals), merge top-K, re-rank with ML",
            "Ranking signals: text relevance, popularity/PageRank, freshness, personalisation, conversion (for products)",
            "Index updates: batch rebuild vs incremental near-real-time segments",
            "Deep dive: semantic/vector search and hybrid retrieval",
            "Deep dive: caching popular queries, tail-latency control in fan-out"
          ],
          practice: [
            { t: "The Anatomy of a Large-Scale Hypertextual Web Search Engine (Brin & Page)", p: "BLOG", d: "H", u: "http://infolab.stanford.edu/~backrub/google.html" },
            { t: "Introduction to Information Retrieval (Manning et al., free online)", p: "BOOK", d: "H", u: "https://nlp.stanford.edu/IR-book/" },
            { t: "Elasticsearch: from the bottom up", p: "BLOG", d: "M", u: "https://www.elastic.co/blog/found-elasticsearch-from-the-bottom-up" },
            { t: "Build product search over a CSV with Elasticsearch/OpenSearch including facets and synonyms", p: "BUILD", d: "M" }
          ],
          notes: [
            "Document-partitioned index is standard: writes are local to a shard; every query fans out to all shards and merges top-K. Replicate shards for QPS.",
            "Tail latency: with 100 shards, p99 of the query is roughly the p99.99 of a shard; use hedged requests, partial results with timeouts.",
            "Two-stage ranking: cheap retrieval of ~1,000 candidates (BM25/ANN) then expensive ML re-ranking of the top ~100.",
            "Postings lists are compressed (delta + variable-byte encoding) and stored in sorted order for fast intersection.",
            "Freshness: separate small real-time index merged with the large batch index at query time.",
            "Product search: structured filters (price, brand) via doc values/facets; business rules (boost in-stock items).",
            "For AI roles: hybrid BM25 + dense vectors with reciprocal rank fusion, then a cross-encoder re-ranker."
          ],
          cases: [
            "Hot query spikes (breaking news): query result cache with short TTL.",
            "One slow shard dominating latency: hedging, replicas, timeouts returning partial results.",
            "Index drift from source of truth: CDC + periodic full rebuilds.",
            "Spam/SEO manipulation in web search: link analysis and quality signals.",
            "Zero results for misspellings: fuzzy matching, spelling correction, synonyms.",
            "Follow-up: 'how do you measure search quality?' Offline (NDCG, MRR with labelled sets) and online (CTR, conversion, A/B tests)."
          ],
          qa: [
            { q: "Document-partitioned vs term-partitioned index?", a: "Document partitioning gives each shard a full index of its documents: easy updates and balanced load, but every query hits every shard. Term partitioning stores each term's postings on one shard: queries touch only shards for their terms, but multi-term queries need cross-shard intersection and hot terms create hotspots. Most systems use document partitioning with replication." },
            { q: "How does a query get executed?", a: "A frontend parses and normalises the query, checks the cache, and fans out to one replica of every shard. Each shard retrieves matching docs from postings lists, scores with BM25 and static signals, and returns its local top-K. The aggregator merges, applies an ML re-ranker and business rules, and returns results." },
            { q: "How do you make new documents searchable quickly?", a: "Index new docs into small in-memory segments refreshed every ~1 s (Lucene near-real-time), merged into larger segments in the background; or a separate real-time index queried alongside the main one." }
          ]
        },
        {
          id: "ad-click-topk",
          title: "Ad click aggregation / top-K heavy hitters",
          est: "2 days",
          why: "Tests stream processing, windowing, exactly-once aggregation and approximate algorithms; asked at ad-tech and analytics-heavy companies.",
          learn: [
            "Requirements: count clicks per ad per minute, query aggregates for last N minutes, top-K most clicked ads, data accurate for billing; NFR: latency of a few minutes, handle late/duplicate events",
            "Estimates: 1B clicks/day ~ 12k/s avg, 50k/s peak; 2M ads",
            "Pipeline: click logs &rarr; Kafka &rarr; stream processor (Flink) with windowed aggregation &rarr; OLAP store (ClickHouse/Druid/Pinot) &rarr; query service",
            "Windowing: tumbling vs sliding, event time vs processing time, watermarks, late events",
            "Exactly-once aggregation: Flink checkpoints + transactional/idempotent sinks; dedupe click IDs",
            "Top-K: per-partition heaps merged; approximate with Count-Min Sketch + heap for unbounded keys",
            "Deep dive: Lambda vs Kappa architecture; reconciliation with batch for billing accuracy",
            "Deep dive: hot ads (key skew) and pre-aggregation"
          ],
          practice: [
            { t: "Hello Interview: Design an ad click aggregator", p: "HELLO", d: "H" },
            { t: "Alex Xu Vol 2, Ch 6: Ad click event aggregation", p: "BOOK", d: "H" },
            { t: "Top K Frequent Elements (LeetCode 347)", p: "LC", d: "M", u: "https://leetcode.com/problems/top-k-frequent-elements/" },
            { t: "Apache Flink: timely stream processing (event time & watermarks)", p: "DOC", d: "M", u: "https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/time/" },
            { t: "Implement a Count-Min Sketch + min-heap top-K and compare with exact counts", p: "BUILD", d: "M" }
          ],
          notes: [
            "Use event time with watermarks; allow lateness (e.g. 1-5 min) and route very late events to a correction path.",
            "Exactly-once in Flink: Kafka source offsets and operator state are checkpointed together; sinks are transactional (two-phase commit sink) or idempotent upserts keyed by (ad_id, window).",
            "Dedupe clicks by click_id (from the ad server) within a window to stop double counting and some fraud.",
            "Billing-grade accuracy: streaming for near-real-time dashboards plus a daily batch recomputation from raw logs in S3 as the source of truth (reconcile).",
            "Top-K over huge key spaces: Count-Min Sketch gives approximate counts in fixed memory (overestimates only); keep a heap of top-K candidates. Exact top-K: aggregate per partition then merge.",
            "Hot ad keys: pre-aggregate in mappers (local combiner) before the shuffle, or salt keys and merge.",
            "Store raw events immutably for replay; recompute aggregates when bugs are found."
          ],
          cases: [
            "Duplicate events from client retries: dedupe by click_id.",
            "Late events after window closed: allowed lateness or correction job.",
            "Stream job crash: restore from checkpoint; no double counting due to transactional sinks.",
            "Skewed hot ad overloads one task: combiner, salting.",
            "Click fraud / bots inflating counts: filtering stage, anomaly detection.",
            "Timezone confusion in reporting windows: store in UTC.",
            "Follow-up: 'how would you get top-K over the last 24 hours, updated every minute?' Per-minute buckets of per-ad counts, sliding sum, heap over aggregates; or approximate sketches merged per bucket."
          ],
          qa: [
            { q: "How do you guarantee exactly-once counting?", a: "Deduplicate at source by click_id, use Kafka with an idempotent producer, process in Flink with checkpointing so source offsets and aggregation state are consistent, and write to the sink transactionally or idempotently (upsert by ad_id + window). Reconcile with batch recomputation for billing." },
            { q: "How do you compute top-K heavy hitters on a stream with millions of keys?", a: "Exact: partition by key, count per partition in windowed state, each partition emits its local top-K, merge into global top-K (correct because each key lives on one partition). Approximate at lower memory: Count-Min Sketch for counts plus a min-heap of size K, or Space-Saving algorithm." },
            { q: "Lambda vs Kappa architecture?", a: "Lambda runs a batch layer (accurate, slow) and a speed layer (fast, approximate) and merges them; it duplicates logic. Kappa uses one streaming pipeline and handles reprocessing by replaying the log. With mature exactly-once stream processors, Kappa is common, often with a batch reconciliation job for billing." }
          ]
        },
        {
          id: "job-scheduler",
          title: "Distributed job scheduler (cron at scale)",
          est: "1-2 days",
          why: "Tests leader election, exactly-once-ish execution, time-based indexing and retries; common infra design.",
          learn: [
            "Requirements: schedule one-off and recurring (cron) jobs, run at the right time (within seconds), retries, job status/history, priorities; NFR: no missed jobs, avoid duplicate runs, scale to millions of jobs/day",
            "API: <code>POST /jobs {cron|run_at, payload, retry_policy}</code>, <code>GET /jobs/{id}/executions</code>, cancel",
            "Data model: jobs (definition), executions (job_id, scheduled_time, status, attempt, worker)",
            "Scheduler: poll for due executions by time index (<code>WHERE run_at &lt;= now() AND status='PENDING'</code>) and enqueue",
            "Claiming: <code>SELECT ... FOR UPDATE SKIP LOCKED</code> or conditional update so one scheduler claims each execution",
            "Workers pull from queues; heartbeats/leases; visibility timeout for crashed workers",
            "Deep dive: time partitioning (buckets per minute) for scale; recurring job materialisation",
            "Deep dive: idempotency, at-least-once execution, retries with backoff, DLQ"
          ],
          practice: [
            { t: "Hello Interview: Design a distributed job scheduler", p: "HELLO", d: "H" },
            { t: "Temporal: durable execution concepts", p: "DOC", d: "M", u: "https://docs.temporal.io/workflows" },
            { t: "Airbnb: Dynein, distributed delayed job queueing system", p: "BLOG", d: "M", u: "https://medium.com/airbnb-engineering/dynein-building-a-distributed-delayed-job-queueing-system-93ab10f05f99" },
            { t: "Build a scheduler on Postgres using SKIP LOCKED with multiple workers", p: "BUILD", d: "M" }
          ],
          notes: [
            "Separate scheduling (deciding what is due) from execution (workers via a queue); scale each independently.",
            "Store executions indexed by (scheduled_time) or bucketed by minute; schedulers scan only the current bucket.",
            "Multiple schedulers without leader election: partition the time buckets / job IDs across them, or use <code>SKIP LOCKED</code> so they never claim the same row.",
            "Exactly-once execution is impossible in general; guarantee at-least-once with leases and make jobs idempotent (pass execution_id as idempotency key).",
            "Recurring jobs: when one execution is created/completed, materialise the next occurrence; store timezone with the cron expression.",
            "Short delays (seconds) can use a delay queue (SQS delay, Redis sorted set by timestamp); long delays live in the DB.",
            "Expose observability: lag between scheduled_time and start_time is the key SLI."
          ],
          cases: [
            "Worker dies mid-job: lease expires, job retried, so it must be idempotent.",
            "Scheduler down for 10 minutes: on recovery, catch up missed executions (or skip per misfire policy).",
            "Thundering herd at midnight (everyone schedules 00:00): jitter, priority queues, autoscaling workers.",
            "DST changes and timezones causing skipped or double runs.",
            "Long-running jobs exceeding lease: heartbeat to extend.",
            "Follow-up: 'how do you support DAG dependencies (Airflow-like)?' Store edges, trigger downstream when upstream succeeds, track run state per DAG run."
          ],
          qa: [
            { q: "How do you ensure a job isn't executed twice by two schedulers?", a: "Claim executions atomically: conditional update (status PENDING &rarr; CLAIMED with owner and lease) or SELECT FOR UPDATE SKIP LOCKED in a transaction. Only the winner enqueues. Since workers can still crash and retry, jobs receive an execution ID to make side effects idempotent." },
            { q: "How do you scale to millions of jobs per hour?", a: "Partition executions by time bucket and job-ID hash; assign partitions to scheduler instances (via a coordinator or consistent hashing); push due jobs into a partitioned queue (Kafka/SQS) consumed by an autoscaled worker fleet. Keep the hot table small by archiving completed executions." },
            { q: "How are retries handled?", a: "On failure, record the attempt, compute next run with exponential backoff and jitter per the job's retry policy, and create a new pending execution; after max attempts, mark failed, send to DLQ and alert the owner." }
          ]
        },
        {
          id: "stock-exchange",
          title: "Stock exchange / order matching engine",
          est: "2 days",
          why: "Advanced design asked at trading firms and fintech (Zerodha-style brokers); tests deterministic single-threaded design, low latency and event sourcing.",
          learn: [
            "Requirements: place/cancel limit and market orders, match by price-time priority, publish trades and market data, risk checks; NFR: microsecond-to-millisecond latency, strict ordering, fairness, no lost orders",
            "Components: gateway (auth, validation), risk/pre-trade checks, sequencer, matching engine per symbol, market data publisher, reporter/clearing",
            "Order book: per symbol, bids (max-heap/price levels) and asks (min-heap), each price level a FIFO queue",
            "Sequencer assigns a global sequence number; matching engine is single-threaded and deterministic",
            "Event sourcing: input log of sequenced orders; state can be rebuilt by replay; hot-standby replicas replay the same log",
            "Market data: L1/L2 feeds via multicast/UDP, candlestick aggregation",
            "Deep dive: low latency techniques (in-memory, ring buffer/LMAX Disruptor, avoid GC, kernel bypass)",
            "Deep dive: failover with deterministic replay; broker-side (Zerodha-like) vs exchange-side design"
          ],
          practice: [
            { t: "Alex Xu Vol 2, Ch 13: Stock exchange", p: "BOOK", d: "H" },
            { t: "Martin Fowler: The LMAX Architecture", p: "BLOG", d: "H", u: "https://martinfowler.com/articles/lmax.html" },
            { t: "LMAX Disruptor", p: "DOC", d: "H", u: "https://lmax-exchange.github.io/disruptor/" },
            { t: "Implement an order book with price-time priority supporting limit, market and cancel orders", p: "BUILD", d: "H" }
          ],
          notes: [
            "Matching per symbol is sequential by nature; a single thread per symbol (or group of symbols) avoids locks and is very fast (millions of ops/s).",
            "Order book structure: price level map (sorted tree / array indexed by tick) + doubly linked list of orders per level + hash map order_id &rarr; node for O(1) cancel.",
            "Determinism: same input sequence produces same output, so replicas replaying the sequenced log are exact hot standbys.",
            "Persist the input journal before processing (or replicate it to standbys) to never lose orders; snapshots speed up recovery.",
            "Partition by symbol across matching engines; the sequencer can be per partition.",
            "Fairness: everyone's orders enter the same sequencer; colocation and equal cable lengths in real exchanges.",
            "Broker system (Zerodha/Groww) is different: it routes to the exchange, handles user portfolios, margins, and huge read traffic on market open."
          ],
          cases: [
            "Matching engine crash: standby promoted at the exact sequence number by replaying the journal.",
            "Hot symbol on a volatile day (all orders on one thread): it is designed for that throughput; partitioning doesn't help a single symbol.",
            "Cancel arriving after fill: processed in sequence; cancel rejected.",
            "Market data consumers slow: publish via multicast, consumers request retransmits; never backpressure the engine.",
            "Clock synchronisation for audit timestamps (PTP).",
            "Follow-up: 'how do you handle market open spikes for a broker app?' Pre-scale, cache quotes, queue orders with rate limits, WebSocket fan-out for prices."
          ],
          qa: [
            { q: "Why is the matching engine single-threaded?", a: "Matching for a symbol must process orders in strict sequence; concurrency would require locking that adds latency and nondeterminism. A single-threaded, in-memory engine with no locks processes millions of orders per second and is deterministic, which enables replication by replay." },
            { q: "Which data structures make up the order book?", a: "For each side, a sorted map of price &rarr; price level (best bid = max, best ask = min), each level a FIFO doubly linked list of orders for time priority, and a hash map from order ID to its list node for O(1) cancel/modify. Matching walks from the best price until the incoming order is filled or no longer crosses." },
            { q: "How do you achieve high availability without losing orders?", a: "All inputs pass through a sequencer that writes them to a replicated journal. Primary and hot standby engines consume the same sequenced stream deterministically; if the primary fails, the standby has identical state and takes over at the next sequence number. Snapshots bound replay time." }
          ]
        },
        {
          id: "food-delivery",
          title: "Zomato / Swiggy food delivery with ETA",
          est: "2 days",
          why: "Very common at Indian product companies; combines search/discovery, ordering, delivery partner assignment and ETA prediction.",
          learn: [
            "Requirements: discover restaurants by location, menu, cart and order, payment, restaurant acceptance, delivery partner assignment, live tracking, ETA; NFR: high availability at lunch/dinner peaks, accurate ETAs, orders never lost",
            "Estimates: e.g. 2M orders/day with 3-5x peaks at meal times; 300k delivery partners sending location every 5-10 s",
            "API: <code>GET /restaurants?lat&amp;lng&amp;filters</code>, <code>POST /orders</code> (idempotent), <code>GET /orders/{id}/track</code>",
            "Data model: restaurants & menus (SQL + search index with geo), orders (state machine), partner live locations (in-memory geo index)",
            "Discovery: geo-filtered serviceable restaurants (delivery radius polygons), ranking by relevance/ETA/rating, cached per geohash",
            "Order flow: create order &rarr; payment &rarr; restaurant accepts &rarr; assign partner &rarr; pickup &rarr; deliver; events via Kafka",
            "Deep dive: delivery partner assignment (batching, matching nearby partners by predicted arrival vs food-ready time)",
            "Deep dive: ETA prediction (ML on prep time + travel time + historical data), updated as the order progresses"
          ],
          practice: [
            { t: "Design Swiggy/Zomato end to end in 45 minutes, timed", p: "SELF", d: "H" },
            { t: "Alex Xu Vol 2, Ch 1: Proximity service (restaurant discovery)", p: "BOOK", d: "M" },
            { t: "Uber Eats / DoorDash engineering blogs (dispatch & ETA)", p: "BLOG", d: "M", u: "https://careersatdoordash.com/engineering-blog/" },
            { t: "Swiggy Bytes engineering blog", p: "BLOG", d: "M", u: "https://bytes.swiggy.com/" },
            { t: "Build a toy dispatcher that assigns orders to nearest free partners using Redis GEO and a greedy/batched matcher", p: "BUILD", d: "M" }
          ],
          notes: [
            "Three distinct sub-systems with different needs: discovery (read-heavy, cacheable, eventual), ordering/payment (strongly consistent, idempotent), logistics (real-time, write-heavy locations).",
            "Serviceability: restaurants have delivery polygons; precompute geohash &rarr; serviceable restaurant list and cache it, refreshed when partner supply changes (rain, peak).",
            "Assignment is an optimisation problem: batch orders over a short window (e.g. 30 s) and solve matching (Hungarian / greedy with cost = partner arrival time vs food ready time, multi-order batching).",
            "Dispatch timing matters: assign so the partner arrives when food is ready; minimise partner idle time at the restaurant.",
            "ETA = prep time (restaurant, dish, current load) + partner to restaurant + restaurant to customer (road graph + live traffic); ML model trained on historical deliveries, re-predicted at each state change.",
            "Order state machine events on Kafka drive notifications, tracking, analytics, partner payouts.",
            "Peak handling: autoscale, degrade non-essential features (recommendations), surge fees, temporarily shrink delivery radius."
          ],
          cases: [
            "Restaurant doesn't accept within N minutes: auto-cancel and refund, or call restaurant.",
            "Partner cancels after pickup assignment: re-dispatch with priority.",
            "Payment success but order creation failed: idempotent order creation keyed on payment intent; reconciliation.",
            "Rain in one city: supply drops, ETAs balloon; dynamic serviceability and surge.",
            "Stale menu/price in cache vs checkout: re-validate cart at checkout against source of truth.",
            "Location pings missing in poor network areas: dead-reckoning, interpolation on the map.",
            "Follow-up: 'how do you evaluate ETA quality?' MAE vs actual delivery time, % within promised window, bias by city/time."
          ],
          qa: [
            { q: "How do you show only restaurants that can deliver to the user?", a: "Each restaurant has a delivery polygon/radius that changes with supply. Precompute a mapping from geohash/H3 cell to serviceable restaurant IDs, cache it, and at query time look up the user's cell, then rank (relevance, rating, ETA, personalisation) and paginate. Refresh mappings as serviceability changes." },
            { q: "How do you assign delivery partners to orders?", a: "Collect pending orders in short time windows per zone, compute candidate partners from the live geo index, estimate cost (partner arrival vs food ready time, distance, batching potential), and solve a matching (greedy or Hungarian). Offer to the chosen partner with timeout; atomically mark them assigned to prevent double assignment." },
            { q: "How do you predict delivery ETA?", a: "Decompose: food prep time (model on restaurant, items, current queue, time of day), partner pickup travel and delivery travel (routing engine with live traffic, historical speeds), plus handover buffers. A gradient-boosted or deep model trained on historical orders combines these features; recompute at every order event and smooth changes shown to the user." }
          ]
        }
      ]
    }
  ]
});
