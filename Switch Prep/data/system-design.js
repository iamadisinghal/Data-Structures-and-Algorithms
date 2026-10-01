PREP.add({
  id: "sd",
  order: 40,
  group: "Design",
  title: "System Design Fundamentals",
  short: "System design basics",
  blurb: "The building blocks every HLD answer is made of.",
  intro: [
    "HLD case studies (design Twitter, design Uber) are <b>compositions</b> of a small set of building blocks: load balancers, caches, databases, replication, partitioning, queues, consistency models and reliability patterns. Interviewers at senior level rarely fail you for picking the 'wrong' architecture; they fail you for not being able to justify a block, not knowing its failure modes, or not knowing the numbers. This tab is about the blocks; the HLD tab is about assembling them under time pressure.",
    "Study each concept along three axes: <b>what it is and how it works internally</b>, <b>when to reach for it (and when not to)</b>, and <b>what breaks</b> (hot keys, stampedes, split brain, replication lag, duplicate delivery). For every concept, be able to state one trade-off in one sentence, e.g. 'leaderless replication buys write availability at the cost of read-repair and conflict resolution'.",
    "Suggested order: work through Beginner in a week, then read DDIA chapters 5-9 alongside the Intermediate and Advanced levels. Keep a one-page 'numbers sheet' (latencies, QPS per box, storage per user) and redo back-of-envelope estimates until they take under 3 minutes. Use the BUILD items: implementing consistent hashing, a token bucket or a tiny Raft-like leader election makes the concepts stick far better than reading."
  ],
  resources: [
    { n: "Designing Data-Intensive Applications (Kleppmann)", u: "https://dataintensive.net/", d: "The single best book for replication, partitioning, transactions, consistency and stream processing. Chapters 5-9 are mandatory." },
    { n: "System Design Interview Vol 1 (Alex Xu)", u: "https://www.amazon.in/System-Design-Interview-insiders-Second/dp/B08CMF2CQF", d: "Framework plus 16 classic designs; chapter 2 (back-of-envelope) and chapter 5 (consistent hashing) are fundamentals." },
    { n: "System Design Interview Vol 2 (Alex Xu & Sahn Lam)", u: "https://www.amazon.in/System-Design-Interview-Insiders-Guide/dp/1736049119", d: "Deeper designs: proximity service, payment, stock exchange, S3, metrics monitoring." },
    { n: "ByteByteGo", u: "https://bytebytego.com/", d: "Alex Xu's course with diagrams; the free newsletter/YouTube explain one concept per post." },
    { n: "system-design-primer (GitHub)", u: "https://github.com/donnemartin/system-design-primer", d: "Free, well-organised overview of every fundamental with links to primary sources." },
    { n: "Hello Interview - System Design in a Hurry", u: "https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction", d: "Interviewer-written core concepts, key technologies and patterns; very current." },
    { n: "Gaurav Sen (YouTube)", u: "https://www.youtube.com/@gkcs", d: "Intuitive explanations of consistent hashing, sharding, message queues." },
    { n: "Arpit Bhayani", u: "https://arpitbhayani.me/", d: "Deep dives into database internals and real engineering blog breakdowns; strong for Indian product-company interviews." },
    { n: "High Scalability", u: "http://highscalability.com/", d: "Archive of real architecture write-ups (WhatsApp, Instagram, Netflix)." },
    { n: "Latency Numbers Every Programmer Should Know", u: "https://gist.github.com/jboner/2841832", d: "The canonical numbers sheet (Jeff Dean / Peter Norvig)." },
    { n: "Martin Fowler - Patterns of Distributed Systems", u: "https://martinfowler.com/articles/patterns-of-distributed-systems/", d: "Write-ahead log, leader and followers, quorum, high-water mark, lease, generation clock." },
    { n: "Engineering blogs (Netflix, Uber, Discord, Stripe, Cloudflare)", u: "https://netflixtechblog.com/", d: "Real trade-offs to quote in interviews; also see uber.com/blog/engineering, discord.com/blog, stripe.com/blog/engineering, blog.cloudflare.com." },
    { n: "Jepsen analyses", u: "https://jepsen.io/analyses", d: "How real databases actually violate their consistency claims; great for advanced talking points." }
  ],
  levels: [
    {
      name: "Beginner · Core concepts",
      desc: "How requests travel, how APIs are shaped, how to estimate scale, and the first two scaling tools: load balancers and caches.",
      topics: [
        {
          id: "web-basics",
          title: "Client-server & how the web works (DNS, HTTP/HTTPS, TLS, CDN)",
          est: "1-2 days",
          why: "The 'what happens when you type a URL' question is a common warm-up, and CDN/DNS choices appear in every user-facing design.",
          learn: [
            "DNS resolution path: browser cache, OS resolver, recursive resolver, root, TLD, authoritative; record types <code>A</code>, <code>AAAA</code>, <code>CNAME</code>, <code>NS</code>, <code>MX</code>; TTL trade-off",
            "DNS-based load balancing and GeoDNS / latency-based routing (Route 53); anycast",
            "TCP 3-way handshake, slow start, head-of-line blocking; why connection reuse (keep-alive, pooling) matters",
            "HTTP/1.1 vs HTTP/2 (multiplexing, header compression) vs HTTP/3 (QUIC over UDP, no TCP HOL blocking)",
            "TLS 1.3 handshake (1-RTT, 0-RTT resumption), certificates and chain of trust, TLS termination at the LB",
            "CDN: edge PoPs, pull vs push, cache keys, <code>Cache-Control</code>, invalidation/purge, origin shield",
            "Reverse proxy vs forward proxy vs API gateway",
            "WebSockets, Server-Sent Events, long polling: when each fits"
          ],
          practice: [
            { t: "What happens when you type a URL (alex/what-happens-when)", p: "DOC", d: "E", u: "https://github.com/alex/what-happens-when" },
            { t: "Cloudflare Learning Center: DNS, CDN, TLS", p: "DOC", d: "E", u: "https://www.cloudflare.com/learning/" },
            { t: "High Performance Browser Networking (free online)", p: "BOOK", d: "M", u: "https://hpbn.co/" },
            { t: "Run dig +trace and curl -v against a site; annotate each step", p: "BUILD", d: "E" },
            { t: "Explain HTTP/3 and QUIC in 3 minutes out loud", p: "SELF", d: "M" }
          ],
          notes: [
            "A full cold request costs DNS (~20-100 ms) + TCP (1 RTT) + TLS 1.3 (1 RTT) + request (1 RTT). This is why CDNs and connection reuse dominate latency for global users.",
            "CDNs help in two ways: static asset caching at the edge and terminating TCP/TLS close to the user even for dynamic content.",
            "Low DNS TTL enables fast failover but increases resolver load; many clients ignore TTL anyway, so do not rely on DNS for sub-minute failover.",
            "TLS termination at the LB simplifies certificate management; re-encrypt to backends (or mTLS in a service mesh) for zero-trust networks.",
            "HTTP/2 multiplexes streams over one TCP connection, but a single lost packet still stalls all streams; QUIC fixes this per stream.",
            "WebSockets: bidirectional, stateful connections (chat, games). SSE: server-to-client only over HTTP (feeds, notifications, LLM token streaming). Long polling: fallback.",
            "Cache static assets with content-hashed filenames and long <code>max-age</code>; then 'invalidation' becomes deploying a new filename."
          ],
          cases: [
            "CDN serving stale content after a deploy: use versioned URLs instead of purges.",
            "Cache key includes cookies or query params unintentionally, collapsing hit rate to near zero.",
            "DNS failover is slow because clients and ISPs cache records beyond TTL.",
            "Stateful WebSocket servers: an LB must support connection upgrade, and a deploy drops all connections; plan reconnect with backoff.",
            "Certificate expiry is a classic outage cause; automate renewal (ACME / Let's Encrypt).",
            "Follow-up: 'how would you serve users in India and the US with low latency?' GeoDNS/anycast + CDN + regional deployments."
          ],
          qa: [
            { q: "What happens when you type a URL and press Enter?", a: "DNS resolution (caches then recursive resolver to authoritative), TCP handshake, TLS handshake (cert verification, key exchange), HTTP request, possibly via CDN edge and LB to an app server, response, then browser parses HTML, fetches sub-resources (often HTTP/2 multiplexed), and renders. Mention where caching happens at every layer." },
            { q: "WebSocket vs SSE vs long polling?", a: "WebSocket: full-duplex, best for chat/collab/games, but stateful and harder to scale through proxies. SSE: one-way server push over plain HTTP with auto-reconnect, ideal for notifications and streaming tokens. Long polling: universal fallback with higher overhead per message." },
            { q: "How does a CDN improve latency for dynamic, uncacheable APIs?", a: "Terminating TCP and TLS at a nearby edge saves round trips; the edge keeps warm, persistent connections to origin over an optimised backbone. It also absorbs DDoS and can cache partial responses." },
            { q: "Why is HTTP/3 built on UDP?", a: "TCP is implemented in OS kernels and middleboxes, so it can't evolve and has transport-level head-of-line blocking. QUIC implements reliable, multiplexed, encrypted streams in user space over UDP, with 0/1-RTT setup and connection migration across networks." }
          ]
        },
        {
          id: "api-design",
          title: "APIs: REST vs gRPC vs GraphQL, idempotency, pagination, versioning",
          est: "2 days",
          why: "Every HLD answer has an API step; senior candidates are expected to get idempotency and pagination right without prompting.",
          learn: [
            "REST: resources, HTTP verbs and their safety/idempotency (<code>GET</code>, <code>PUT</code>, <code>DELETE</code> idempotent; <code>POST</code> not), status codes",
            "gRPC: Protobuf, HTTP/2, streaming (unary, server, client, bidi), deadlines; best for internal service-to-service",
            "GraphQL: client-specified shape, single endpoint, N+1 problem and DataLoader, caching difficulty",
            "Idempotency keys for non-idempotent operations (payments, orders): client-generated key, server stores result",
            "Pagination: offset/limit vs cursor (keyset) pagination; why cursors win for large or changing datasets",
            "Versioning: URL (<code>/v1/</code>), header, or field-additive evolution; backward/forward compatibility in Protobuf",
            "Rate limit headers, error format, partial failure, bulk endpoints",
            "API gateway responsibilities: authN, rate limiting, routing, request transformation"
          ],
          practice: [
            { t: "Stripe API: idempotent requests", p: "DOC", d: "M", u: "https://docs.stripe.com/api/idempotent_requests" },
            { t: "Google API Design Guide", p: "DOC", d: "M", u: "https://cloud.google.com/apis/design" },
            { t: "Hello Interview - API design core concept", p: "HELLO", d: "E", u: "https://www.hellointerview.com/learn/system-design/core-concepts/api-design" },
            { t: "Design the API for a ride-booking flow including retries and idempotency", p: "SELF", d: "M" },
            { t: "Implement cursor pagination over a SQL table using (created_at, id)", p: "BUILD", d: "E" }
          ],
          notes: [
            "Default answer: REST/JSON for public APIs, gRPC for internal low-latency calls, GraphQL when many heterogeneous clients need flexible aggregates (BFF pattern).",
            "Cursor pagination: <code>WHERE (created_at, id) &lt; (:c_ts, :c_id) ORDER BY created_at DESC, id DESC LIMIT 20</code>. O(log n) via index; stable under inserts. Offset pagination is O(offset) and skips/duplicates rows when data changes.",
            "Idempotency key flow: client sends <code>Idempotency-Key</code>; server atomically inserts key with status 'in progress'; on retry returns the stored response; keys expire after e.g. 24 h.",
            "Retries are only safe on idempotent operations; make write APIs idempotent so the whole stack can retry freely.",
            "Protobuf evolution: never reuse field numbers, add new optional fields, unknown fields are ignored. That gives rolling-deploy compatibility.",
            "Use <code>202 Accepted</code> + status URL for long-running operations (video transcoding, report generation).",
            "Make the API reflect the functional requirements; in interviews, list 3-5 endpoints with request/response fields and stop."
          ],
          cases: [
            "Client times out on a payment POST and retries: without an idempotency key the user is charged twice.",
            "Two concurrent requests with the same idempotency key: need an atomic insert/lock on the key, not check-then-act.",
            "Offset pagination on a feed where new posts arrive: user sees duplicates on page 2.",
            "GraphQL query that fans out to thousands of resolver calls (N+1) or deeply nested queries used as DoS: add depth/complexity limits.",
            "Breaking change shipped without versioning: old mobile app versions break and cannot be force-updated.",
            "Follow-up: 'how do you handle a partial failure in a batch API?' Return per-item status (207-style) and make each item idempotent."
          ],
          qa: [
            { q: "How do you make a POST /payments endpoint safe to retry?", a: "Require a client-generated idempotency key. In one transaction, insert (key, request hash, status) with a unique constraint; if it already exists, return the stored response (or 409 if the request body differs or it is still in progress). Persist the final response against the key and expire keys after a retention window." },
            { q: "Offset vs cursor pagination?", a: "Offset is simple and supports jumping to page N but is slow for deep pages and unstable under concurrent writes. Cursor/keyset pagination uses an indexed sort key as a bookmark, is O(log n) per page and stable, but only supports next/prev. Feeds and large tables should use cursors." },
            { q: "When would you choose gRPC over REST?", a: "Internal service-to-service calls where you want strongly-typed contracts, compact binary encoding, HTTP/2 multiplexing, streaming and deadlines propagation. REST stays better for public/browser APIs because of tooling, caching and human readability." },
            { q: "Is PUT idempotent? Is PATCH?", a: "PUT replaces the resource, so repeating it yields the same state: idempotent. PATCH may or may not be (e.g. 'increment counter' is not), so treat it as non-idempotent unless designed otherwise." }
          ]
        },
        {
          id: "scalability-estimation",
          title: "Scalability basics & back-of-envelope estimation",
          est: "2-3 days",
          why: "Estimation drives every design decision (one DB or sharded? cache needed?). Interviewers notice when numbers are absent or wildly wrong.",
          learn: [
            "Vertical vs horizontal scaling; limits of each; why stateless services scale horizontally trivially",
            "Moving state out of app servers: sessions to Redis/JWT, files to object storage",
            "Latency numbers: L1 0.5 ns, RAM 100 ns, SSD random read ~100 us, same-DC round trip ~0.5 ms, disk seek ~10 ms, cross-continent RTT ~150 ms",
            "Throughput rules of thumb: a web server ~1-10k RPS, Postgres single node ~10k simple QPS (more for reads), Redis ~100k+ ops/s per node, Kafka partition ~10 MB/s",
            "Powers of two and time: 1 day ~ 86,400 s ~ 10^5 s; 1M req/day ~ 12 RPS; peak = 2-5x average",
            "Storage estimate: users x items/day x bytes x retention x replication factor",
            "Bandwidth estimate and QPS split between reads and writes; read:write ratio drives cache/replica choices",
            "Amdahl's law intuition and identifying the bottleneck (CPU, memory, disk IO, network)"
          ],
          practice: [
            { t: "Latency numbers every programmer should know", p: "DOC", d: "E", u: "https://gist.github.com/jboner/2841832" },
            { t: "Alex Xu Vol 1, Ch 2: Back-of-the-envelope estimation", p: "BOOK", d: "E" },
            { t: "Estimate Twitter: QPS, storage for 5 years, media bandwidth", p: "SELF", d: "M" },
            { t: "Estimate WhatsApp: messages/sec, connections per server, storage", p: "SELF", d: "M" },
            { t: "Load-test a toy service with k6 or wrk and find its saturation point", p: "BUILD", d: "M" }
          ],
          notes: [
            "Shortcut: <b>1M/day ~ 12/s</b>, <b>100M/day ~ 1,200/s</b>, <b>1B/day ~ 12k/s</b>. State average and peak.",
            "Storage: 500M tweets/day x 300 B ~ 150 GB/day ~ 55 TB/year before replication; media dominates (10-100x text).",
            "Read-heavy (100:1) systems want caches and read replicas; write-heavy systems want partitioning, append-only logs, LSM stores.",
            "Memory is cheap enough that hot working sets often fit in RAM: 20% of 100M daily items x 1 KB = 20 GB, fits in one Redis node.",
            "A single modern server has 64+ cores, 256 GB+ RAM, NVMe at 1M IOPS; vertical scaling goes further than people assume. Say this to avoid premature sharding.",
            "Estimates should change the design: tell the interviewer 'this is 50k QPS writes, so a single Postgres primary will not do; we shard'.",
            "Round aggressively and keep units explicit; spend no more than 3-5 minutes on estimates."
          ],
          cases: [
            "Forgetting peak vs average (festive sale, IPL final, New Year's Eve messages) under-provisions by 5-10x.",
            "Forgetting replication factor (x3) and indexes (often +30-100%) in storage estimates.",
            "Sticky sessions block horizontal scaling and make deploys painful.",
            "Bottleneck moves: scale app servers and the DB connection pool explodes (use PgBouncer/connection pooling).",
            "Fan-out math: one celebrity post x 100M followers is 100M writes; estimate fan-out not just requests.",
            "Follow-up: 'what if traffic grows 10x?' Identify which component breaks first."
          ],
          qa: [
            { q: "A service has 200M DAU, each doing 20 reads and 2 writes a day. Estimate QPS.", a: "Reads: 4B/day / 10^5 ~ 40k QPS avg, ~100k peak. Writes: 400M/day ~ 4k QPS avg, ~10k peak. Read-heavy at 10:1, so caching and read replicas are the first lever; writes at 10k peak are near a single primary's limit, so plan to partition." },
            { q: "Why are stateless services easier to scale?", a: "Any instance can serve any request, so you add/remove instances behind an LB, autoscale, and survive instance loss without session migration. State is pushed to purpose-built stores (DB, cache, object store) that have their own scaling strategy." },
            { q: "When is vertical scaling the right answer?", a: "When the workload fits on one large machine with headroom (most databases under a few TB and ~10k write QPS), when operational simplicity and strong consistency matter, and as a first step before sharding. Its limits: hardware ceiling, cost curve, and single point of failure (mitigate with replicas)." }
          ]
        },
        {
          id: "load-balancing",
          title: "Load balancing (L4/L7, algorithms, health checks)",
          est: "1 day",
          why: "Appears in nearly every diagram; follow-ups probe L4 vs L7, sticky sessions and how LBs themselves avoid being a SPOF.",
          learn: [
            "L4 (TCP/UDP, connection-level, e.g. AWS NLB, LVS) vs L7 (HTTP-aware routing, TLS termination, e.g. ALB, Nginx, Envoy)",
            "Algorithms: round robin, weighted RR, least connections, least response time, IP hash, consistent hashing, power of two choices",
            "Health checks: active vs passive, outlier detection, connection draining on deploys",
            "LB high availability: active-passive with VIP (keepalived), DNS across multiple LBs, anycast, managed cloud LBs",
            "Sticky sessions and why to avoid them",
            "Client-side load balancing and service discovery (gRPC, Consul, Kubernetes Services)",
            "Global server load balancing (GSLB) across regions"
          ],
          practice: [
            { t: "NGINX: HTTP load balancing", p: "DOC", d: "E", u: "https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/" },
            { t: "The Power of Two Random Choices (Mitzenmacher, summary)", p: "BLOG", d: "M", u: "https://www.eecs.harvard.edu/~michaelm/postscripts/handbook2001.pdf" },
            { t: "Envoy docs: load balancing and outlier detection", p: "DOC", d: "M", u: "https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/overview" },
            { t: "Put Nginx in front of 3 local app instances; kill one and observe", p: "BUILD", d: "E" }
          ],
          notes: [
            "L4 is faster and protocol-agnostic but blind to URLs/headers; L7 enables path-based routing, canaries, retries, auth, at higher CPU cost.",
            "Least-connections or power-of-two-choices beat round robin when request costs vary (LLM inference, long-polling).",
            "Consistent-hash LB gives cache affinity (same user to same cache node) without full stickiness.",
            "Long-lived connections (WebSocket, gRPC) defeat connection-level balancing; rebalance with periodic reconnects or L7 per-request balancing.",
            "The LB is not a SPOF if you run redundant LBs behind DNS or anycast, or use a managed cloud LB.",
            "Health checks should test dependencies shallowly; deep checks that hit the DB can cause cascading 'all unhealthy' events."
          ],
          cases: [
            "All backends fail a deep health check during a DB blip: LB removes everything. Use fail-open when all are unhealthy.",
            "New instance gets flooded under least-connections (slow start / warm-up needed).",
            "gRPC over L4: one long-lived HTTP/2 connection pins all traffic to one backend.",
            "Sticky sessions cause hot servers and lost sessions on instance death.",
            "Retry storms through an L7 LB amplify load during partial outages; cap retries with a budget.",
            "Follow-up: 'how do you deploy without dropping requests?' Connection draining + readiness probes + rolling/blue-green."
          ],
          qa: [
            { q: "L4 vs L7 load balancer?", a: "L4 balances TCP/UDP connections using IP/port, very fast, cannot inspect content. L7 understands HTTP: path/host/header routing, TLS termination, retries, rate limiting, canary splits, at higher cost. Common setup: L4 at the edge for raw throughput, L7 (Envoy/Nginx/ALB) behind it." },
            { q: "How does the load balancer avoid being a single point of failure?", a: "Run it redundantly: active-passive pair sharing a virtual IP via VRRP, multiple LBs behind DNS round-robin or anycast, or a managed LB that is internally distributed. Also keep it stateless so failover loses nothing." },
            { q: "What is 'power of two choices'?", a: "Pick two backends at random and send to the one with fewer outstanding requests. It gets near-optimal load distribution with O(1) work and no global state, avoiding the herd behaviour of everyone picking the single least-loaded server." }
          ]
        },
        {
          id: "caching",
          title: "Caching (patterns, eviction, TTL, stampede, Redis)",
          est: "2-3 days",
          why: "The most-used lever in HLD; interviewers dig into invalidation, consistency and stampedes.",
          learn: [
            "Where to cache: client, CDN, reverse proxy, application (in-process), distributed cache (Redis/Memcached), DB buffer pool",
            "Patterns: cache-aside (lazy), read-through, write-through, write-behind (write-back), write-around",
            "Eviction: LRU, LFU, FIFO, TTL; Redis approximated LRU/LFU and <code>maxmemory-policy</code>",
            "Invalidation strategies: TTL, delete-on-write, versioned keys, CDC-driven invalidation",
            "Cache stampede / thundering herd: request coalescing (single-flight), locks, probabilistic early expiry, stale-while-revalidate",
            "Hot keys: local L1 cache, key replication with suffixes, read from replicas",
            "Redis data structures (string, hash, list, set, sorted set, stream, HyperLogLog), persistence (RDB/AOF), Redis Cluster (16384 hash slots)",
            "Cache penetration (missing keys) mitigations: negative caching, Bloom filters"
          ],
          practice: [
            { t: "Scaling Memcache at Facebook (NSDI 2013)", p: "BLOG", d: "H", u: "https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf" },
            { t: "Redis docs: key eviction", p: "DOC", d: "E", u: "https://redis.io/docs/latest/develop/reference/eviction/" },
            { t: "Hello Interview - Caching deep dive", p: "HELLO", d: "M", u: "https://www.hellointerview.com/learn/system-design/core-concepts/caching" },
            { t: "LRU Cache (LeetCode 146)", p: "LC", d: "M", u: "https://leetcode.com/problems/lru-cache/" },
            { t: "Implement cache-aside with single-flight request coalescing", p: "BUILD", d: "M" }
          ],
          notes: [
            "Cache-aside is the default: read cache, on miss read DB and populate; on write, update DB then <b>delete</b> the cache key (not update, to avoid race-induced stale values).",
            "Write-through gives fresh cache but adds write latency; write-behind gives fast writes but risks data loss if the cache dies.",
            "Hit ratio math: at 95% hits with 1 ms cache and 20 ms DB, average = 0.95x1 + 0.05x21 ~ 2 ms; DB load drops 20x.",
            "Add jitter to TTLs so keys populated together do not expire together.",
            "Stampede fix: on miss, one request takes a short lock and recomputes; others wait or serve stale. Facebook's memcache 'leases' solve both stampede and stale sets.",
            "Caches are not a source of truth; design so a full cache flush degrades latency but not correctness (and warm up gradually).",
            "Redis is single-threaded per shard for commands, so one hot key saturates one core; that is the hot-key problem in numbers (~100k ops/s)."
          ],
          cases: [
            "Race: reader misses, reads old value from DB; writer updates DB and deletes cache; reader then sets the old value. Mitigations: short TTL, leases, or delayed double delete.",
            "Celebrity profile / viral product = hot key; replicate as <code>key#1..key#N</code> or use an in-process cache with a short TTL.",
            "Mass expiry after a cache restart or synchronized TTLs overloads the DB (thundering herd).",
            "Cache penetration: attackers query non-existent IDs; cache negatives briefly or use a Bloom filter.",
            "Write-behind cache crash loses acknowledged writes.",
            "Inconsistent caches across regions; invalidations must be replicated (e.g. via CDC from the DB binlog).",
            "Follow-up: 'how do you keep cache and DB consistent?' Admit it is eventually consistent; describe delete-on-write + TTL + CDC."
          ],
          qa: [
            { q: "Why delete the cache entry on write instead of updating it?", a: "Two concurrent writers can update the DB in one order and the cache in the other, leaving the cache permanently wrong. Deleting makes the next read repopulate from the source of truth; combined with a TTL it bounds staleness." },
            { q: "What is a cache stampede and how do you prevent it?", a: "When a hot key expires, many concurrent misses hit the DB at once. Prevent with request coalescing (one recomputation, others wait), a mutex/lease in the cache, serving stale while refreshing in the background, probabilistic early refresh, and TTL jitter." },
            { q: "Redis vs Memcached?", a: "Memcached: simple multi-threaded string cache, great for pure key-value caching. Redis: rich data structures (sorted sets for leaderboards, streams, HyperLogLog), persistence, replication, clustering, Lua scripts. Redis is the default unless you only need a very simple cache." },
            { q: "How do you handle a hot key?", a: "Detect it (client-side sampling, Redis <code>--hotkeys</code>), then add an in-process L1 cache with a short TTL, replicate the key under N suffixed names and read a random one, or serve it from replicas. For writes (e.g. like counters), shard the counter and aggregate." }
          ],
          code: "# Cache-aside with stampede protection (pseudo-Python)\ndef get_user(uid):\n    v = redis.get(f'user:{uid}')\n    if v is not None:\n        return v\n    lock = redis.set(f'lock:user:{uid}', 1, nx=True, ex=5)\n    if not lock:\n        time.sleep(0.05)\n        return redis.get(f'user:{uid}') or db.get_user(uid)\n    v = db.get_user(uid)\n    redis.set(f'user:{uid}', v, ex=3600 + random.randint(0, 300))  # TTL jitter\n    redis.delete(f'lock:user:{uid}')\n    return v\n\ndef update_user(uid, data):\n    db.update_user(uid, data)\n    redis.delete(f'user:{uid}')   # delete, do not set"
        }
      ]
    },
    {
      name: "Intermediate · Data & communication",
      desc: "Choosing and scaling data stores, replicating and partitioning them, and decoupling services with queues and streams.",
      topics: [
        {
          id: "databases",
          title: "Databases: SQL vs NoSQL, choosing a store, indexing",
          est: "3 days",
          why: "Every design needs a 'which database and why' answer; senior candidates must justify with access patterns, not buzzwords.",
          learn: [
            "Relational: ACID, joins, schema, transactions, isolation levels (read committed, repeatable read, snapshot, serializable)",
            "NoSQL families: key-value (DynamoDB, Redis), wide-column (Cassandra, HBase, Bigtable), document (MongoDB), graph (Neo4j), time-series (InfluxDB, TimescaleDB), vector (pgvector, Milvus)",
            "Choosing by access pattern: query shapes, read/write ratio, consistency needs, data size and growth, joins",
            "Storage engines: B-tree (read-optimised, in-place) vs LSM-tree (write-optimised, memtable + SSTables + compaction)",
            "Indexes: primary/clustered vs secondary, composite index and leftmost-prefix rule, covering index, cost on writes",
            "Normalisation vs denormalisation; modelling for DynamoDB/Cassandra (query-first, partition key + sort key)",
            "OLTP vs OLAP; row vs columnar storage (Parquet, ClickHouse, BigQuery)",
            "Connection pooling and N+1 queries"
          ],
          practice: [
            { t: "Use The Index, Luke (SQL indexing)", p: "DOC", d: "M", u: "https://use-the-index-luke.com/" },
            { t: "DDIA Ch 2 (data models) and Ch 3 (storage & retrieval)", p: "BOOK", d: "M" },
            { t: "Discord: How Discord stores trillions of messages", p: "BLOG", d: "M", u: "https://discord.com/blog/how-discord-stores-trillions-of-messages" },
            { t: "Amazon DynamoDB: best practices for designing partition keys", p: "DOC", d: "M", u: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html" },
            { t: "Run EXPLAIN ANALYZE before/after adding a composite index in Postgres", p: "BUILD", d: "E" }
          ],
          notes: [
            "Default to a relational DB (Postgres/MySQL) unless there is a concrete reason: massive write throughput, flexible schema, simple key access at huge scale, or specialised queries.",
            "Wide-column (Cassandra/ScyllaDB): high write throughput, partition by key, cluster by sort key. Good for messages, time series, activity logs. Bad for ad-hoc queries and joins.",
            "LSM trees turn random writes into sequential ones; cost is read amplification (check multiple SSTables, mitigated by Bloom filters) and compaction IO.",
            "Composite index <code>(user_id, created_at)</code> serves 'latest posts of a user' with an index range scan; order of columns matters.",
            "Every secondary index adds write cost and storage; in distributed DBs, global secondary indexes are eventually consistent or need cross-shard writes.",
            "Snapshot isolation (Postgres 'repeatable read') prevents non-repeatable reads but allows write skew; use <code>SELECT ... FOR UPDATE</code> or serializable for invariants like 'at least one doctor on call'.",
            "Polyglot persistence is normal: Postgres for orders, Redis for sessions, Elasticsearch for search, S3 for blobs, ClickHouse for analytics. Keep one source of truth per entity."
          ],
          cases: [
            "Hot partition in DynamoDB/Cassandra because the partition key is low-cardinality (e.g. date or country).",
            "Unbounded partitions (all messages of a big channel in one partition): bucket by time, as Discord did.",
            "Lost updates under read-modify-write without locking or compare-and-set.",
            "Write skew under snapshot isolation (double booking).",
            "Adding an index on a large live table locks writes (use <code>CREATE INDEX CONCURRENTLY</code>).",
            "Cassandra tombstones from heavy deletes slowing reads.",
            "Follow-up: 'why not MongoDB for payments?' Need multi-entity ACID transactions and strong consistency; relational is the safer fit."
          ],
          qa: [
            { q: "How do you choose between SQL and NoSQL?", a: "Start from access patterns and requirements: relationships and multi-row transactions favour SQL; very high write throughput, simple key-based access, horizontal scaling and flexible schema favour NoSQL (pick the family by query shape). Also weigh team expertise and operational maturity. Modern SQL scales further than assumed, and NewSQL (Spanner, CockroachDB) offers both." },
            { q: "B-tree vs LSM-tree?", a: "B-trees update pages in place: predictable fast reads, write amplification from page rewrites, good for read-heavy OLTP (Postgres, MySQL InnoDB). LSM trees buffer writes in memory and flush sorted immutable files, compacting later: very high write throughput, more read amplification and compaction overhead (Cassandra, RocksDB)." },
            { q: "What is a covering index?", a: "An index containing all columns a query needs, so the DB answers from the index alone without touching the table rows (index-only scan), saving random IO." },
            { q: "Model a chat message table in Cassandra.", a: "Partition key (channel_id, time_bucket) to bound partition size, clustering key message_id (a time-sortable Snowflake ID) descending. 'Latest 50 messages in channel' is a single-partition range read; writes are appends." }
          ]
        },
        {
          id: "replication",
          title: "Replication (leader-follower, multi-leader, leaderless, quorum)",
          est: "2-3 days",
          why: "Availability and read scaling both come from replication; questions on replication lag and failover separate senior from junior answers.",
          learn: [
            "Single-leader replication: synchronous vs asynchronous vs semi-sync; WAL/binlog shipping",
            "Replication lag anomalies: read-your-writes, monotonic reads, consistent prefix reads; fixes for each",
            "Failover: detecting leader failure, electing a new leader, lost writes with async replication, split brain, fencing",
            "Multi-leader: multi-region writes, conflict resolution (LWW, version vectors, CRDTs, app-level merge)",
            "Leaderless (Dynamo-style): quorums <code>W + R &gt; N</code>, sloppy quorum, hinted handoff, read repair, anti-entropy with Merkle trees",
            "Read replicas for read scaling; replicas for analytics isolation",
            "Change data capture (Debezium) as replication to other systems"
          ],
          practice: [
            { t: "DDIA Ch 5: Replication", p: "BOOK", d: "M" },
            { t: "Amazon Dynamo paper (2007)", p: "BLOG", d: "H", u: "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf" },
            { t: "GitHub: October 21 post-incident analysis (split brain across DCs)", p: "BLOG", d: "M", u: "https://github.blog/news-insights/company-news/oct21-post-incident-analysis/" },
            { t: "Set up Postgres primary + streaming replica in Docker; measure lag", p: "BUILD", d: "M" }
          ],
          notes: [
            "Async replication: fast writes, but a leader crash can lose the last acknowledged writes. Semi-sync (one sync follower) bounds loss to zero for one failure.",
            "Read-your-writes fix: read from the leader for a short window after a user writes, or track the user's last write LSN and route to a replica that has caught up.",
            "Quorum example: N=3, W=2, R=2 tolerates one node down for both reads and writes. W=1, R=N favours writes; W=N, R=1 favours reads.",
            "Quorums are not linearizable by themselves (sloppy quorums, concurrent writes, LWW with clock skew).",
            "Multi-leader is needed for multi-region active-active writes or offline clients (collaborative editing, mobile), but conflicts are inevitable; avoid it if a single-region leader per entity is acceptable.",
            "Fencing tokens (monotonic epoch numbers) prevent a deposed leader from corrupting data after a partition heals.",
            "Replicas improve availability and read throughput, never write throughput; writes need partitioning."
          ],
          cases: [
            "User updates profile then refreshes and sees old data (replica lag): read-your-writes violation.",
            "Split brain: two nodes both think they are leader after a network partition; both accept writes.",
            "Failover promotes a lagging replica; acknowledged writes lost, and auto-increment IDs reused (GitHub 2012 incident with MySQL).",
            "LWW with clock skew silently drops the newer write.",
            "Replica lag spikes under a heavy batch job, causing stale reads site-wide.",
            "Follow-up: 'how do you fail over across regions?' Discuss RPO/RTO, async cross-region replication, and data-loss acceptance."
          ],
          qa: [
            { q: "Explain quorum reads and writes.", a: "With N replicas, a write succeeds after W acks and a read queries R replicas. If W + R &gt; N, every read set overlaps the latest write set, so the reader sees the newest version (using version numbers to pick). Tuning W and R trades write vs read latency and availability." },
            { q: "How do you guarantee read-your-writes with read replicas?", a: "Route reads of data the user just modified to the leader (for e.g. 1 minute or for their own profile), or record the write's log position in the session and only read from replicas that have applied it; otherwise fall back to the leader." },
            { q: "What is split brain and how is it prevented?", a: "Two nodes simultaneously acting as leader after a partition, both accepting conflicting writes. Prevent with a consensus-based election requiring a majority (odd number of nodes), leases with expiry, and fencing tokens checked by storage so the old leader's writes are rejected." }
          ]
        },
        {
          id: "sharding",
          title: "Sharding / partitioning & consistent hashing",
          est: "2-3 days",
          why: "Needed whenever writes or data exceed one node; consistent hashing is a top-5 fundamentals question.",
          learn: [
            "Range partitioning vs hash partitioning vs directory/lookup-based; pros and cons for range scans and hotspots",
            "Choosing a shard key: high cardinality, even distribution, aligned with the dominant query",
            "Consistent hashing ring, virtual nodes, minimal data movement on node add/remove",
            "Alternatives: fixed number of partitions (e.g. 1024) mapped to nodes (Kafka, Elasticsearch, Redis Cluster slots), rendezvous hashing",
            "Rebalancing and resharding without downtime (dual writes, backfill, cutover)",
            "Secondary indexes in partitioned DBs: local (scatter-gather) vs global (term-partitioned)",
            "Cross-shard queries, joins and transactions; why to avoid them via key design",
            "Hot shards and the celebrity problem"
          ],
          practice: [
            { t: "Alex Xu Vol 1, Ch 5: Design consistent hashing", p: "BOOK", d: "M" },
            { t: "Consistent hashing (Gaurav Sen)", p: "YT", d: "E", u: "https://www.youtube.com/watch?v=zaRkONvyGr8" },
            { t: "Instagram: Sharding & IDs at Instagram", p: "BLOG", d: "M", u: "https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c" },
            { t: "Implement consistent hashing with virtual nodes in ~50 lines; measure key movement on adding a node", p: "BUILD", d: "M" },
            { t: "DDIA Ch 6: Partitioning", p: "BOOK", d: "M" }
          ],
          notes: [
            "With mod-N hashing, adding a node remaps almost all keys; with consistent hashing only ~1/N keys move.",
            "Virtual nodes (100-200 per physical node) smooth distribution and let heterogeneous machines take proportional load.",
            "Fixed-partition scheme (many more partitions than nodes) is simpler in practice: rebalancing just moves whole partitions.",
            "Shard key examples: chat by channel_id, orders by user_id (queries are per user), feeds by user_id, time series by (metric, time bucket).",
            "Range partitioning keeps range scans efficient but creates write hotspots on monotonically increasing keys (timestamps); hash partitioning spreads writes but kills range queries.",
            "Instagram trick: thousands of logical shards mapped to fewer physical DBs; IDs embed the logical shard ID.",
            "Shard as late as possible; first try vertical scaling, read replicas, caching, and archiving old data."
          ],
          cases: [
            "Celebrity/hot key: all writes for one key land on one shard. Split the key (key + random suffix) and aggregate on read.",
            "Monotonic key (timestamp, auto-increment) with range partitioning: all writes hit the last shard.",
            "Cross-shard transaction needed after the fact (e.g. transfer between users on different shards): requires saga/2PC.",
            "Resharding live: dual writes drift; need backfill verification and idempotent copy.",
            "Scatter-gather queries on local secondary indexes: tail latency equals the slowest shard.",
            "Follow-up: 'what happens when a node joins the ring?' It takes over ranges from its successors; data streams over; reads may need to check both during transfer."
          ],
          qa: [
            { q: "Explain consistent hashing and why virtual nodes are used.", a: "Hash both nodes and keys onto a ring; each key belongs to the first node clockwise. Adding/removing a node only moves keys in its adjacent range (~K/N keys). With few nodes, ranges are uneven, so each physical node is placed at many points (virtual nodes) to balance load and spread a failed node's load across many others." },
            { q: "How do you pick a shard key for an e-commerce orders table?", a: "Use the dominant access pattern: 'orders of a user' means shard by user_id, so a user's orders are co-located and queries hit one shard. Order lookups by order_id work if the order ID embeds the shard (or via a lookup table). Seller-side queries go to a separate read model (e.g. replicated via CDC)." },
            { q: "How do you reshard without downtime?", a: "Create new shards, enable dual writes (or CDC replication) from old to new, backfill historical data idempotently, verify with checksums, switch reads gradually, then stop writes to the old layout. Using many logical shards from day one makes this a move of whole shards rather than a re-hash." }
          ],
          code: "import bisect, hashlib\n\nclass Ring:\n    def __init__(self, vnodes=150):\n        self.vnodes, self.keys, self.map = vnodes, [], {}\n    def _h(self, s):\n        return int(hashlib.md5(s.encode()).hexdigest(), 16)\n    def add(self, node):\n        for i in range(self.vnodes):\n            h = self._h(f'{node}#{i}')\n            bisect.insort(self.keys, h); self.map[h] = node\n    def remove(self, node):\n        for i in range(self.vnodes):\n            h = self._h(f'{node}#{i}')\n            self.keys.remove(h); del self.map[h]\n    def get(self, key):\n        i = bisect.bisect(self.keys, self._h(key)) % len(self.keys)\n        return self.map[self.keys[i]]"
        },
        {
          id: "queues-streaming",
          title: "Message queues & streaming (Kafka, RabbitMQ, SQS)",
          est: "3 days",
          why: "Async processing, fan-out and event-driven architectures appear in most designs; delivery semantics are a favourite probe.",
          learn: [
            "Why queues: decoupling, load levelling, retries, fan-out, async workflows",
            "Queue (RabbitMQ, SQS: messages deleted after ack, competing consumers) vs log (Kafka, Kinesis, Pulsar: retained, replayable, offset per consumer group)",
            "Kafka internals: topics, partitions, replication (ISR), <code>acks=all</code>, producer idempotence, consumer groups and rebalancing, retention and compaction",
            "Delivery semantics: at-most-once, at-least-once, exactly-once (idempotent consumers or Kafka transactions within Kafka)",
            "Ordering: only per partition; choose the partition key to preserve per-entity order",
            "Dead-letter queues, poison messages, retry topics with delay, visibility timeout (SQS)",
            "Backpressure and consumer lag monitoring",
            "Pub/sub vs point-to-point; fan-out patterns (SNS to SQS)"
          ],
          practice: [
            { t: "Kafka: The Definitive Guide / Kafka documentation design section", p: "DOC", d: "M", u: "https://kafka.apache.org/documentation/#design" },
            { t: "Jay Kreps: The Log - what every software engineer should know", p: "BLOG", d: "M", u: "https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying" },
            { t: "AWS SQS: visibility timeout and dead-letter queues", p: "DOC", d: "E", u: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html" },
            { t: "Uber: Building reliable reprocessing and dead letter queues with Kafka", p: "BLOG", d: "M", u: "https://www.uber.com/blog/reliable-reprocessing/" },
            { t: "Run Kafka locally; produce keyed messages, run 2 consumers in a group, kill one and observe rebalance", p: "BUILD", d: "M" }
          ],
          notes: [
            "Exactly-once end-to-end is really <b>at-least-once delivery + idempotent processing</b> (dedupe by message ID, upserts, conditional writes).",
            "Kafka parallelism = number of partitions; consumers in a group &gt; partitions sit idle. Pick partitions for peak throughput (~10 MB/s per partition rule of thumb) with headroom.",
            "Ordering requires the same partition key (e.g. order_id); a hot key makes a hot partition.",
            "Kafka durability: <code>replication.factor=3</code>, <code>min.insync.replicas=2</code>, <code>acks=all</code>, idempotent producer.",
            "Use Kafka when you need replay, multiple independent consumers, high throughput, or event sourcing; use SQS/RabbitMQ for simple task queues with per-message acks, delays and routing.",
            "Commit offsets after processing (at-least-once), not before (at-most-once).",
            "Queues hide failures: always monitor consumer lag and DLQ size and alert on them."
          ],
          cases: [
            "Consumer processes a message, crashes before committing offset: duplicate on restart. Make handlers idempotent.",
            "Poison message blocks a partition forever: retry N times then route to DLQ.",
            "Consumer group rebalance storms when consumers take longer than <code>max.poll.interval.ms</code>.",
            "Hot partition from a skewed key (one big merchant) creates lag for everyone on that partition.",
            "Retrying with reordering: retry topic breaks per-key ordering; acceptable only if the handler tolerates it.",
            "Dual write problem: writing to DB and then Kafka can lose one of them; use the outbox pattern.",
            "Follow-up: 'how would you guarantee exactly-once charge processing from a queue?' Idempotency key in a DB with unique constraint, inside the same transaction as the effect."
          ],
          qa: [
            { q: "Kafka vs RabbitMQ vs SQS?", a: "Kafka is a distributed, partitioned, replicated log: retention, replay, multiple consumer groups, very high throughput, ordering per partition. RabbitMQ is a broker with flexible routing (exchanges), per-message acks, priorities, lower throughput. SQS is fully managed, near-infinite scale, at-least-once, visibility timeouts and DLQs, no replay. Choose by need for replay/streaming vs task queuing and ops burden." },
            { q: "How do you achieve exactly-once processing?", a: "True exactly-once delivery is impossible across arbitrary systems; achieve exactly-once effect with at-least-once delivery plus idempotent consumers: dedupe on a message/business ID stored transactionally with the side effect, or use upserts/conditional writes. Within Kafka-to-Kafka pipelines, transactions plus idempotent producers give exactly-once semantics." },
            { q: "How is ordering guaranteed in Kafka?", a: "Only within a partition. Use a partition key so all events of an entity go to the same partition, enable the idempotent producer (keeps order on retries), and process each partition sequentially. Global ordering requires a single partition, which caps throughput." },
            { q: "What is a dead-letter queue and when do you use it?", a: "A separate queue for messages that repeatedly fail processing (bad format, bug, missing dependency). After N retries with backoff, move them there so they don't block the main flow; alert on DLQ depth and provide a redrive tool after fixing the cause." }
          ]
        },
        {
          id: "storage",
          title: "Storage: blob/object storage, file systems, data lakes",
          est: "1-2 days",
          why: "Any design with media, files, logs or ML data uses object storage; upload flows with pre-signed URLs are expected knowledge.",
          learn: [
            "Block vs file vs object storage; when each fits",
            "Object storage (S3, GCS, Azure Blob): flat namespace, metadata, 11 nines durability, strong read-after-write consistency (S3 since 2020)",
            "Pre-signed URLs for direct client upload/download; multipart and resumable uploads",
            "Storage classes and lifecycle policies (hot, infrequent, archive/Glacier)",
            "Erasure coding vs replication for durability and cost",
            "Distributed file systems: HDFS/GFS design (NameNode metadata, large chunks, replication)",
            "Data lakes and lakehouses: Parquet, partitioning by date, Iceberg/Delta/Hudi table formats, query engines (Spark, Trino, Athena)",
            "Metadata in DB, bytes in object store; content-addressed storage and dedup by hash"
          ],
          practice: [
            { t: "AWS S3: uploading objects with presigned URLs", p: "DOC", d: "E", u: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html" },
            { t: "The Google File System paper", p: "BLOG", d: "H", u: "https://research.google/pubs/the-google-file-system/" },
            { t: "Alex Xu Vol 2: Design S3-like object storage", p: "BOOK", d: "H" },
            { t: "Build an upload flow: API returns presigned URL, client PUTs to S3/MinIO, S3 event triggers a worker", p: "BUILD", d: "M" }
          ],
          notes: [
            "Never stream large files through your app servers; issue a pre-signed URL and let the client upload directly to object storage, then confirm via callback or event.",
            "Store metadata (owner, size, hash, status, location) in a DB; store bytes in object storage; serve via CDN.",
            "Erasure coding (e.g. 8+4) gives replication-like durability at ~1.5x storage instead of 3x, at the cost of reconstruction CPU and latency.",
            "Lifecycle rules move cold data to cheaper tiers automatically; huge cost saver for logs, backups, old media.",
            "Data lake layout: <code>s3://bucket/events/date=2026-10-01/hour=10/part-000.parquet</code>; partition pruning plus columnar format makes scans cheap.",
            "Table formats (Iceberg/Delta) add ACID commits, schema evolution, time travel on top of files.",
            "Chunking files (e.g. 4 MB) enables resumable uploads, parallelism and block-level dedup (Dropbox)."
          ],
          cases: [
            "Orphaned objects when the upload succeeds but metadata write fails (or vice versa): reconcile with a status field and a cleanup job.",
            "Too many small files in a data lake kill query performance; compact periodically.",
            "Public bucket misconfiguration leaking data; default to private + pre-signed URLs.",
            "Hot object (viral video) hammering the origin: CDN in front, origin shield.",
            "Pre-signed URL abuse: short expiry, content-type and size constraints.",
            "Follow-up: 'how would you support 5 GB uploads on flaky mobile networks?' Multipart/resumable chunked upload with per-chunk checksums."
          ],
          qa: [
            { q: "How should a client upload a large video in your design?", a: "Client asks the API for an upload session; API creates a metadata row (status=pending) and returns pre-signed multipart URLs. Client uploads chunks directly to object storage, retrying failed chunks. On completion, an object-created event triggers processing (transcoding) and the metadata row is updated. App servers never touch the bytes." },
            { q: "Object storage vs block storage vs file storage?", a: "Block (EBS): raw volumes for a single VM, low latency, for databases. File (EFS/NFS): shared hierarchical POSIX file system. Object (S3): HTTP API, flat keys, virtually unlimited and highly durable, cheap, higher latency, immutable objects, ideal for media, backups, data lakes." },
            { q: "How does S3-like storage achieve 11 nines of durability?", a: "Data is erasure-coded or replicated across multiple devices and availability zones, checksummed end to end, continuously scrubbed for bit rot, and automatically repaired when a device fails, so simultaneous loss of enough fragments is astronomically unlikely." }
          ]
        }
      ]
    },
    {
      name: "Advanced · Distributed systems",
      desc: "Consistency, transactions across services, consensus, protection patterns, observability, security and search: the topics that make an answer senior.",
      topics: [
        {
          id: "cap-consistency",
          title: "CAP, PACELC & consistency models",
          est: "2 days",
          why: "Interviewers ask you to justify CP vs AP choices per component; misstating CAP is a common red flag.",
          learn: [
            "CAP precisely: during a network <b>partition</b>, choose consistency (linearizability) or availability; not a choice in normal operation",
            "PACELC: if Partition then A or C; Else Latency or Consistency (e.g. DynamoDB/Cassandra PA/EL, Spanner PC/EC)",
            "Consistency models: linearizable, sequential, causal, read-your-writes, monotonic reads, eventual",
            "Serializability (transactions) vs linearizability (single object recency); strict serializability",
            "Tunable consistency (Cassandra <code>QUORUM</code>, <code>LOCAL_QUORUM</code>, <code>ONE</code>)",
            "Clocks: physical clock skew, NTP, logical (Lamport) clocks, vector clocks, hybrid logical clocks, Spanner TrueTime",
            "CRDTs for convergent eventually consistent data (counters, sets, text)"
          ],
          practice: [
            { t: "Jepsen: Consistency models map", p: "DOC", d: "H", u: "https://jepsen.io/consistency" },
            { t: "DDIA Ch 9: Consistency and consensus", p: "BOOK", d: "H" },
            { t: "Martin Kleppmann: Please stop calling databases CP or AP", p: "BLOG", d: "M", u: "https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html" },
            { t: "Classify components of an e-commerce system as needing strong vs eventual consistency", p: "SELF", d: "M" }
          ],
          notes: [
            "Pick consistency per component, not per system: inventory decrement and payments need strong consistency; likes count, feed, view counts can be eventual.",
            "Partitions are not optional in distributed systems, so the real choice is CP or AP behaviour during partitions.",
            "PACELC is the more useful framing day to day: even without partitions, synchronous replication for consistency costs latency.",
            "Linearizability: once a write completes, all subsequent reads see it, as if one copy. Needed for leader election, locks, uniqueness constraints.",
            "Causal consistency is the strongest model that remains available under partitions; good for comments/replies ordering.",
            "Never order events across machines by wall-clock time alone; use logical clocks, a single sequencer, or TrueTime-style bounded uncertainty.",
            "Talking point: 'Eventual consistency with a bounded staleness of ~1 s is fine for the feed; the follow graph write path is strongly consistent in a single-leader DB.'"
          ],
          cases: [
            "Reply appearing before the original comment (causality violation) in an eventually consistent store.",
            "LWW conflict resolution + clock skew drops newer writes silently.",
            "Uniqueness (username taken) cannot be guaranteed under AP; requires a linearizable check.",
            "Network partition between regions: decide whether to reject writes (CP) or accept and reconcile (AP).",
            "Leap seconds / NTP jumps breaking timeouts and leases; use monotonic clocks for durations.",
            "Follow-up: 'Is your system CP or AP?' Answer per component with justification."
          ],
          qa: [
            { q: "Explain the CAP theorem correctly.", a: "In a distributed system that experiences a network partition, you cannot guarantee both linearizable consistency and availability (every non-failed node responds). Since partitions happen, during one you either refuse some requests (CP) or serve possibly stale/conflicting data (AP). Without partitions you can have both; then PACELC's latency vs consistency trade-off applies." },
            { q: "Linearizability vs serializability?", a: "Linearizability is a recency guarantee on single objects: operations appear to occur atomically at a point between invocation and response, in real-time order. Serializability is an isolation guarantee for multi-object transactions: the result equals some serial order, not necessarily real-time. Strict serializability is both (Spanner)." },
            { q: "Why are vector clocks used?", a: "To detect causality between versions in a multi-writer system: if one vector dominates another, it happened after; if neither dominates, the writes are concurrent and must be merged or resolved. Wall-clock timestamps can't distinguish concurrent from ordered writes." }
          ]
        },
        {
          id: "distributed-transactions",
          title: "Distributed transactions: 2PC, saga, outbox, idempotency keys",
          est: "2-3 days",
          why: "Microservice designs (payments, orders, bookings) live or die on this; 'how do you keep the order and payment consistent?' is near-guaranteed.",
          learn: [
            "Two-phase commit: prepare/commit, coordinator role, blocking on coordinator failure, XA",
            "Saga pattern: sequence of local transactions with compensating actions; orchestration vs choreography",
            "Transactional outbox: write business row + event row in one local transaction; relay (poller or CDC/Debezium) publishes to the broker",
            "Inbox / dedup table on the consumer side for idempotent handling",
            "Idempotency keys end to end (client to API to downstream PSP)",
            "Semantic locks, pending states, and reservations (e.g. 'seat held for 10 min')",
            "Workflow engines: Temporal, AWS Step Functions, Cadence",
            "Event sourcing and CQRS basics"
          ],
          practice: [
            { t: "microservices.io: Saga pattern", p: "DOC", d: "M", u: "https://microservices.io/patterns/data/saga.html" },
            { t: "microservices.io: Transactional outbox", p: "DOC", d: "M", u: "https://microservices.io/patterns/data/transactional-outbox.html" },
            { t: "Debezium: Outbox Event Router", p: "DOC", d: "M", u: "https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html" },
            { t: "Temporal docs: what is a durable workflow", p: "DOC", d: "M", u: "https://docs.temporal.io/workflows" },
            { t: "Implement an order saga (order, payment, inventory) with compensation in a toy app", p: "BUILD", d: "H" }
          ],
          notes: [
            "2PC gives atomicity across resources but blocks if the coordinator dies after prepare; holds locks across network round trips. Rarely used across microservices; used inside databases (Spanner uses 2PC over Paxos groups).",
            "Sagas trade isolation for availability: intermediate states are visible, so design states like PENDING/RESERVED and make compensations idempotent.",
            "Orchestration (central coordinator, e.g. Temporal) is easier to reason about and monitor; choreography (events) is looser coupling but harder to trace.",
            "Outbox solves the dual-write problem: the event is published if and only if the transaction committed (at-least-once, so consumers dedupe).",
            "Not everything can be compensated (an email sent); put irreversible steps last or make them pivot points.",
            "Talking point: 'I will avoid a distributed transaction by co-locating data that must change atomically in one service/DB.'"
          ],
          cases: [
            "Service writes DB then crashes before publishing the event: lost event without outbox.",
            "Publishes event then DB transaction rolls back: phantom event.",
            "Compensation fails (refund API down): need retries, alerting and manual reconciliation queue.",
            "Duplicate events cause double shipment: consumer idempotency via processed-message table.",
            "Saga lacks isolation: two sagas reserve the last item concurrently; use reservation with conditional update.",
            "2PC coordinator crash leaves participants holding locks (in-doubt transactions).",
            "Follow-up: 'payment succeeded at the PSP but your service timed out?' Reconcile via idempotency key status query and PSP webhooks."
          ],
          qa: [
            { q: "2PC vs Saga?", a: "2PC provides atomic commit across participants via a coordinator but is blocking, latency-heavy and couples availability of all participants. Saga breaks the transaction into local transactions with compensations, giving availability and loose coupling but only eventual consistency and no isolation. Microservices generally prefer sagas; 2PC is used within a single database system." },
            { q: "What problem does the transactional outbox solve?", a: "The dual-write problem: you cannot atomically write to a DB and a message broker. Write the event into an outbox table in the same local transaction as the business change; a relay reads the outbox (polling or CDC) and publishes to Kafka, marking rows sent. Delivery is at-least-once, so consumers must be idempotent." },
            { q: "Orchestration vs choreography for sagas?", a: "Orchestration: a central orchestrator issues commands and handles failures; explicit flow, easy monitoring, single place for logic, risk of a 'god service'. Choreography: services react to each other's events; decoupled but the flow is implicit, cyclic dependencies and debugging are harder. Use orchestration for complex flows with many steps (payments, bookings)." }
          ]
        },
        {
          id: "consensus-coordination",
          title: "Consensus & coordination: Raft/Paxos, leader election, ZooKeeper/etcd, locks",
          est: "2-3 days",
          why: "Senior interviews probe leader election, distributed locks and why Redis locks are dangerous; Raft intuition is enough.",
          learn: [
            "The consensus problem: agree on a value / ordered log despite failures; majority quorum (2f+1 nodes tolerate f failures)",
            "Raft: terms, leader election with randomized timeouts, log replication, commit on majority, safety (only up-to-date candidates win)",
            "Paxos intuition: proposers, acceptors, prepare/promise, accept; Multi-Paxos as a replicated log",
            "ZooKeeper (ZAB) and etcd (Raft): ephemeral nodes, watches, leases, compare-and-swap",
            "Leader election via ephemeral sequential znodes or etcd leases",
            "Distributed locks: lease-based, fencing tokens, why Redlock is controversial",
            "Service discovery and configuration management on top of etcd/ZooKeeper/Consul",
            "FLP impossibility intuition: consensus needs timeouts (partial synchrony)"
          ],
          practice: [
            { t: "The Secret Lives of Data: Raft visualisation", p: "DOC", d: "E", u: "http://thesecretlivesofdata.com/raft/" },
            { t: "Raft paper: In Search of an Understandable Consensus Algorithm", p: "BLOG", d: "H", u: "https://raft.github.io/raft.pdf" },
            { t: "Martin Kleppmann: How to do distributed locking", p: "BLOG", d: "M", u: "https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html" },
            { t: "MIT 6.824 Lab 2: implement Raft", p: "BUILD", d: "H", u: "https://pdos.csail.mit.edu/6.824/" },
            { t: "Implement leader election with etcd leases in Go/Python", p: "BUILD", d: "M" }
          ],
          notes: [
            "You rarely implement consensus; you <b>use</b> a consensus system (etcd, ZooKeeper, or a DB built on Raft like CockroachDB, TiKV) for metadata, leader election, locks and config.",
            "Use 3 or 5 nodes: 3 tolerates 1 failure, 5 tolerates 2. Even numbers add cost without extra tolerance.",
            "Raft leader election: followers time out (150-300 ms randomised), become candidates, request votes; majority wins; a term number fences old leaders.",
            "A lock is really a <b>lease</b>: the holder can pause (GC, VM stall) past expiry, so storage must check a monotonically increasing fencing token.",
            "Redis single-instance <code>SET key val NX PX 30000</code> is fine for efficiency locks (avoid duplicate work) but not for correctness locks.",
            "Consensus systems are for low-volume, high-value coordination data (KB-MB, thousands of writes/s), not for bulk data.",
            "Kafka moved from ZooKeeper to KRaft (built-in Raft) for metadata; a nice current talking point."
          ],
          cases: [
            "GC pause: lock holder thinks it still holds an expired lock and writes, corrupting data. Fencing tokens fix it.",
            "Split brain from a minority partition electing its own leader if quorum rules are misconfigured.",
            "Leader flapping due to aggressive election timeouts on a noisy network.",
            "etcd overloaded by too many watches or large values, slowing the whole Kubernetes control plane.",
            "Clock drift breaking lease-based leadership; leases should rely on bounded clock drift and margins.",
            "Follow-up: 'how do you ensure only one instance of a cron job runs?' Leader election via lease in etcd/ZooKeeper/DB row with fencing, plus idempotent jobs."
          ],
          qa: [
            { q: "How does Raft elect a leader?", a: "Each follower has a randomised election timeout. If it hears no heartbeat, it increments its term, votes for itself, and requests votes. Nodes grant one vote per term, only to candidates whose log is at least as up to date. A majority makes it leader; it sends heartbeats to suppress new elections. Higher terms always override, fencing stale leaders." },
            { q: "How would you implement a distributed lock safely?", a: "Use a consensus-backed store (etcd/ZooKeeper) to acquire a lease with TTL, and return a monotonically increasing fencing token (e.g. revision number). The protected resource rejects writes with a token lower than the highest seen. Renew the lease while working; treat lock loss as fatal for the critical section." },
            { q: "Why do consensus clusters use an odd number of nodes?", a: "Progress requires a majority. 3 nodes need 2 (tolerate 1 failure); 4 nodes need 3 (still tolerate only 1). The 4th node adds cost and latency without extra fault tolerance." }
          ]
        },
        {
          id: "rate-limiting",
          title: "Rate limiting algorithms",
          est: "1-2 days",
          why: "Asked both as a fundamentals question and as a full design; algorithm trade-offs and distributed counters are the core.",
          learn: [
            "Token bucket (burst-friendly, rate + capacity) and leaky bucket (smooth output)",
            "Fixed window counter (boundary burst problem), sliding window log (exact, memory heavy), sliding window counter (weighted approximation)",
            "Where to enforce: client, API gateway, service, per-user / per-IP / per-API-key / global",
            "Distributed implementation: Redis with atomic Lua scripts or <code>INCR</code> + <code>EXPIRE</code>; local + global hybrid",
            "Response: HTTP 429, <code>Retry-After</code>, <code>X-RateLimit-Remaining</code> headers",
            "Load shedding vs rate limiting; adaptive concurrency limits",
            "Rate limiter rules config and hot reload"
          ],
          practice: [
            { t: "Alex Xu Vol 1, Ch 4: Design a rate limiter", p: "BOOK", d: "M" },
            { t: "Stripe: Scaling your API with rate limiters", p: "BLOG", d: "M", u: "https://stripe.com/blog/rate-limiters" },
            { t: "Cloudflare: How we built rate limiting capable of scaling to millions of domains", p: "BLOG", d: "M", u: "https://blog.cloudflare.com/counting-things-a-lot-of-different-things/" },
            { t: "Implement token bucket and sliding window counter; write tests for bursts", p: "BUILD", d: "M" }
          ],
          notes: [
            "Token bucket is the default answer: allows bursts up to capacity, steady refill rate; store (tokens, last_refill_ts) per key and refill lazily on each request.",
            "Sliding window counter: <code>count = curr + prev x (1 - elapsed/window)</code>; ~O(1) memory, error is small and acceptable.",
            "Redis ops must be atomic (Lua script) or concurrent requests double-spend tokens.",
            "Calling Redis on every request adds ~1 ms; for very high QPS, keep local token buckets and sync periodically (accept slight over-admission).",
            "Fail open vs fail closed when the limiter store is down: usually fail open for availability, fail closed for expensive or abuse-prone endpoints (OTP, login).",
            "Stripe uses four types: request rate limiter, concurrent requests limiter, fleet usage load shedder, worker utilisation load shedder. Great talking point."
          ],
          cases: [
            "Fixed window allows 2x the limit around the window boundary.",
            "Race conditions with read-then-write counters in Redis.",
            "Clients behind a NAT share an IP and get collectively throttled.",
            "Retry storms from throttled clients without backoff: return <code>Retry-After</code>.",
            "Multi-region: global limits need cross-region sync or per-region quotas.",
            "Follow-up: 'how do you rate-limit LLM APIs?' By tokens not requests; token bucket on tokens/min plus concurrency limits."
          ],
          qa: [
            { q: "Token bucket vs leaky bucket?", a: "Token bucket accumulates tokens at a fixed rate up to a capacity, so it allows bursts while bounding average rate. Leaky bucket queues requests and processes them at a constant rate, smoothing output but adding queueing delay and no burst. APIs usually use token bucket; traffic shaping uses leaky bucket." },
            { q: "How do you implement rate limiting across 50 API servers?", a: "Keep counters in a shared store (Redis cluster sharded by key) updated via an atomic Lua script implementing token bucket or sliding window. For ultra-high QPS, use local buckets with a share of the global quota and periodically reconcile. Decide fail-open vs fail-closed, and return 429 with Retry-After." },
            { q: "What is the boundary problem of fixed windows?", a: "A client can send the full limit at the end of one window and again at the start of the next, getting 2x the limit in a short period. Sliding window log or sliding window counter fixes it." }
          ],
          code: "import time\n\nclass TokenBucket:\n    def __init__(self, rate, capacity):\n        self.rate, self.capacity = rate, capacity   # tokens/sec, max burst\n        self.tokens, self.ts = capacity, time.monotonic()\n\n    def allow(self, cost=1):\n        now = time.monotonic()\n        self.tokens = min(self.capacity, self.tokens + (now - self.ts) * self.rate)\n        self.ts = now\n        if self.tokens >= cost:\n            self.tokens -= cost\n            return True\n        return False\n\n# Distributed: same logic in a Redis Lua script keyed per user, storing tokens and ts in a hash."
        },
        {
          id: "reliability",
          title: "Reliability: timeouts, retries, circuit breakers, bulkheads, degradation",
          est: "2 days",
          why: "Senior candidates are expected to discuss failure handling unprompted; cascading failures are a classic deep-dive.",
          learn: [
            "Timeouts on every network call; deadline propagation across services",
            "Retries with exponential backoff and jitter; retry budgets; retry only idempotent operations",
            "Circuit breaker states: closed, open, half-open; thresholds and cool-down",
            "Bulkheads: isolated thread/connection pools per dependency; cell-based architecture",
            "Load shedding, backpressure, admission control, priority-based shedding",
            "Graceful degradation and fallbacks (cached/stale data, default recommendations, feature flags)",
            "Redundancy: multi-AZ, multi-region active-passive vs active-active; RPO and RTO",
            "Chaos engineering, game days; health checks and auto-healing"
          ],
          practice: [
            { t: "AWS Builders' Library: Timeouts, retries and backoff with jitter", p: "BLOG", d: "M", u: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/" },
            { t: "Martin Fowler: Circuit Breaker", p: "BLOG", d: "E", u: "https://martinfowler.com/bliki/CircuitBreaker.html" },
            { t: "Google SRE Book: Handling overload & Addressing cascading failures", p: "BOOK", d: "M", u: "https://sre.google/sre-book/addressing-cascading-failures/" },
            { t: "AWS Builders' Library: Workload isolation using shuffle sharding", p: "BLOG", d: "H", u: "https://aws.amazon.com/builders-library/workload-isolation-using-shuffle-sharding/" },
            { t: "Implement a circuit breaker with closed/open/half-open states and tests", p: "BUILD", d: "M" }
          ],
          notes: [
            "Full jitter: <code>sleep = random(0, min(cap, base x 2^attempt))</code>; prevents synchronized retry waves.",
            "Retries multiply load: 3 retries at each of 4 layers = up to 4^4 = 256x amplification. Retry at one layer only, with a budget (e.g. retries &lt; 10% of requests).",
            "Timeout should be set from the dependency's p99.9 latency, and the total call chain should fit within the caller's deadline.",
            "Circuit breaker fails fast when a dependency is unhealthy, giving it room to recover and freeing caller threads.",
            "Bulkheads stop one slow dependency from exhausting the shared thread pool (the classic cascading failure).",
            "Degrade, don't die: show cached feed, hide recommendations, disable non-critical features under load.",
            "Shuffle sharding limits blast radius: each customer maps to a random subset of workers, so a poison customer affects few others."
          ],
          cases: [
            "Slow dependency (not down, just slow) exhausts threads; worse than a hard failure. Timeouts + bulkheads.",
            "Retry storm after a brief outage prevents recovery (thundering herd); jitter + circuit breaker + retry budget.",
            "Health-check-induced cascade: overloaded instances marked unhealthy, load shifts to the rest, which then also fail.",
            "Queue grows unbounded during overload, so every request times out (latency collapse); bound queues and shed load (LIFO under overload).",
            "Region failover untested; DNS TTL and capacity in the passive region insufficient.",
            "Metastable failures: system stays broken after trigger is removed because of retries/cache misses.",
            "Follow-up: 'what happens if the recommendation service is down?' Fallback to popular items cached at the edge."
          ],
          qa: [
            { q: "Why add jitter to exponential backoff?", a: "Without jitter, clients that failed together retry together in synchronized waves, repeatedly overloading the recovering service. Randomising the delay spreads retries over time; AWS's analysis shows full jitter minimises total work and completion time." },
            { q: "Explain the circuit breaker pattern.", a: "Wrap calls to a dependency. Closed: calls flow, failures are counted. When failure rate exceeds a threshold, it opens: calls fail fast (or use a fallback) for a cool-down period. Then half-open: a few trial calls; success closes it, failure re-opens. It prevents wasting resources on a failing dependency and gives it time to recover." },
            { q: "How do you prevent cascading failures in a microservice architecture?", a: "Timeouts and deadline propagation on every call, limited retries with backoff/jitter and budgets, circuit breakers, bulkheaded pools per dependency, load shedding at entry points, bounded queues, graceful degradation with fallbacks, and capacity headroom plus autoscaling. Test with chaos experiments." }
          ]
        },
        {
          id: "observability",
          title: "Observability: logs, metrics, traces, SLI/SLO/SLA",
          est: "1-2 days",
          why: "Senior answers end with 'how do we know it works in production'; SLOs and error budgets come up in design reviews and behavioural rounds.",
          learn: [
            "Three pillars: structured logs, metrics (counters, gauges, histograms), distributed traces (spans, trace context propagation)",
            "RED (rate, errors, duration) for services; USE (utilisation, saturation, errors) for resources; Google's four golden signals",
            "Percentiles (p50/p95/p99) vs averages; histograms vs summaries; why you can't average percentiles",
            "SLI (measured), SLO (target, e.g. 99.9% of requests &lt; 300 ms over 30 days), SLA (contract with penalties); error budgets",
            "OpenTelemetry, Prometheus, Grafana, Jaeger/Tempo, ELK/Loki",
            "Alerting on symptoms (SLO burn rate) rather than causes; avoiding alert fatigue",
            "Cardinality limits in metrics; sampling in tracing (head vs tail-based)"
          ],
          practice: [
            { t: "Google SRE Book: Service Level Objectives", p: "BOOK", d: "E", u: "https://sre.google/sre-book/service-level-objectives/" },
            { t: "Google SRE Workbook: Alerting on SLOs (burn rate)", p: "BOOK", d: "M", u: "https://sre.google/workbook/alerting-on-slos/" },
            { t: "OpenTelemetry concepts", p: "DOC", d: "E", u: "https://opentelemetry.io/docs/concepts/" },
            { t: "Instrument a toy service with OpenTelemetry + Prometheus + Grafana; define one SLO", p: "BUILD", d: "M" }
          ],
          notes: [
            "99.9% availability = ~43 minutes downtime/month; 99.99% = ~4.3 minutes/month. Each extra nine is roughly 10x harder.",
            "Error budget = 1 - SLO; if exhausted, freeze risky launches and prioritise reliability work.",
            "Tail latency matters at scale: a page fanning out to 100 services each with 1% slow responses is slow ~63% of the time.",
            "Use structured JSON logs with trace_id so logs, traces and metrics correlate.",
            "Avoid high-cardinality labels (user_id) in Prometheus metrics; put them in logs/traces.",
            "Tail-based sampling keeps all error and slow traces while sampling the rest.",
            "For ML/LLM services also monitor model metrics: latency per token, token usage, drift, eval scores."
          ],
          cases: [
            "Average latency looks fine while p99 is terrible; always look at percentiles.",
            "Metrics cardinality explosion takes down Prometheus.",
            "Alerting on CPU instead of user-facing symptoms: pages at night for non-issues.",
            "Missing trace context propagation across async (Kafka) boundaries breaks traces.",
            "Logging PII or secrets; scrub at source.",
            "Follow-up: 'what metrics would you put on the dashboard for this design?' Golden signals per service + business metrics (orders/min) + queue lag."
          ],
          qa: [
            { q: "SLI vs SLO vs SLA?", a: "SLI is a measured indicator (fraction of requests served successfully under 300 ms). SLO is the internal target for that SLI over a window (99.9% over 30 days). SLA is an external contract with consequences, set looser than the SLO so you breach the SLO first and can react." },
            { q: "Why can't you average p99 latencies across servers?", a: "Percentiles are not additive; the average of per-server p99s isn't the fleet p99. Aggregate the underlying histograms (bucket counts) and compute the percentile from the merged distribution." },
            { q: "How does distributed tracing work?", a: "Each request gets a trace ID; each unit of work is a span with parent span ID, timing and attributes. Context is propagated via headers (W3C traceparent) or message metadata. Spans are exported to a collector and assembled into a trace tree, showing where latency and errors occur across services." }
          ]
        },
        {
          id: "security",
          title: "Security: authN/authZ, OAuth2/OIDC, JWT, encryption",
          est: "2 days",
          why: "Every design needs an auth story; OAuth/JWT questions are common, especially for platform and AI-API roles.",
          learn: [
            "Authentication vs authorisation; sessions (server-side, cookie) vs tokens",
            "Password storage: bcrypt/scrypt/argon2 with salt; MFA",
            "OAuth 2.0 flows: authorization code + PKCE (apps/SPAs), client credentials (service-to-service); access vs refresh tokens",
            "OpenID Connect: ID token, identity layer on OAuth2; SSO",
            "JWT: header.payload.signature, signing (RS256 vs HS256), expiry, revocation problem, key rotation (JWKS)",
            "Authorisation models: RBAC, ABAC, ReBAC (Google Zanzibar), policy engines (OPA)",
            "Encryption in transit (TLS, mTLS) and at rest (KMS, envelope encryption); secrets management (Vault)",
            "OWASP top risks: injection, broken access control (IDOR), SSRF; DDoS protection, WAF"
          ],
          practice: [
            { t: "OAuth 2.0 simplified (Aaron Parecki)", p: "DOC", d: "E", u: "https://aaronparecki.com/oauth-2-simplified/" },
            { t: "OWASP Top 10", p: "DOC", d: "E", u: "https://owasp.org/www-project-top-ten/" },
            { t: "Zanzibar: Google's consistent, global authorization system", p: "BLOG", d: "H", u: "https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/" },
            { t: "AWS KMS: envelope encryption", p: "DOC", d: "M", u: "https://docs.aws.amazon.com/kms/latest/developerguide/kms-cryptography.html#enveloping" },
            { t: "Implement login with OIDC (Google) + short-lived JWT + refresh token rotation", p: "BUILD", d: "M" }
          ],
          notes: [
            "JWTs are stateless and fast to verify, but can't be revoked before expiry; use short-lived access tokens (5-15 min) + refresh tokens stored server-side, or a deny-list.",
            "Verify JWTs at the API gateway with public keys from JWKS; services trust the gateway or re-verify (zero trust).",
            "Use authorization code + PKCE for mobile/SPA; never implicit flow. Client credentials for machine-to-machine.",
            "Envelope encryption: data encrypted with a data key; data key encrypted with a master key in KMS; enables rotation and crypto-shredding.",
            "Broken access control (IDOR) is the most common real vulnerability: always check that the resource belongs to the caller, not just that the caller is logged in.",
            "mTLS between services (often via a service mesh) authenticates both ends.",
            "For multi-tenant SaaS, tenant ID in every query/key and row-level security."
          ],
          cases: [
            "Stolen JWT valid until expiry; mitigate with short TTL, binding, and refresh rotation with reuse detection.",
            "<code>alg: none</code> or HS/RS confusion attacks on naive JWT libraries.",
            "Storing tokens in localStorage exposes them to XSS; httpOnly secure cookies + CSRF protection is safer for web.",
            "IDOR: <code>/orders/123</code> returns another user's order.",
            "SSRF via URL-fetch features (image previews, LLM tools) reaching cloud metadata endpoints.",
            "Key rotation breaking verification when old keys are removed too early.",
            "Follow-up: 'how do you log a user out everywhere?' Revoke refresh tokens, bump a token version per user checked at refresh."
          ],
          qa: [
            { q: "Session cookies vs JWT?", a: "Sessions keep state server-side (store lookup per request) and are easy to revoke. JWTs are self-contained and verifiable without a lookup, good for distributed services, but hard to revoke and larger. Common hybrid: short-lived JWT access tokens + server-side refresh tokens." },
            { q: "Explain the OAuth 2.0 authorization code flow with PKCE.", a: "Client creates a code_verifier and sends its hash (code_challenge) when redirecting the user to the authorization server. User authenticates and consents; the server redirects back with a short-lived code. Client exchanges code + code_verifier for tokens on a back channel. PKCE prevents an intercepted code from being redeemed by an attacker." },
            { q: "OAuth2 vs OIDC?", a: "OAuth2 is delegated authorisation: it issues access tokens to call APIs on a user's behalf. OIDC adds authentication on top: an ID token (JWT) describing who the user is, a userinfo endpoint and standard scopes, enabling SSO/login." }
          ]
        },
        {
          id: "search-geo",
          title: "Search & indexes: inverted index, Elasticsearch, geo-indexes",
          est: "2 days",
          why: "Search bars, typeahead and 'nearby drivers/restaurants' are in many HLD questions (Uber, Zomato, Yelp, e-commerce).",
          learn: [
            "Inverted index: term to postings list (doc IDs, positions, frequencies); tokenisation, stemming, stop words",
            "Ranking: TF-IDF, BM25, plus business signals; learning-to-rank; hybrid with vector search (semantic)",
            "Elasticsearch/OpenSearch architecture: index, shards, replicas, segments, refresh interval (near real-time), merges",
            "Keeping search in sync with the primary DB: CDC to Kafka to indexer; reindexing with aliases",
            "Geohash: interleaved lat/long bits to base32 string; prefix = cell; check neighbours at boundaries",
            "Quadtree (adaptive to density), S2 cells (Google), H3 hexagons (Uber)",
            "PostGIS / Redis GEO (<code>GEOADD</code>, <code>GEOSEARCH</code>) for proximity queries",
            "Vector indexes (HNSW, IVF) for embeddings; relevant for AI roles"
          ],
          practice: [
            { t: "Elasticsearch: from the bottom up (Elastic blog)", p: "BLOG", d: "M", u: "https://www.elastic.co/blog/found-elasticsearch-from-the-bottom-up" },
            { t: "Uber H3: hexagonal hierarchical spatial index", p: "BLOG", d: "M", u: "https://www.uber.com/blog/h3/" },
            { t: "Alex Xu Vol 2, Ch 1: Proximity service", p: "BOOK", d: "M" },
            { t: "Redis GEOSEARCH docs", p: "DOC", d: "E", u: "https://redis.io/docs/latest/commands/geosearch/" },
            { t: "Build a mini inverted index with BM25 scoring over 1,000 documents", p: "BUILD", d: "M" }
          ],
          notes: [
            "Search engines are secondary indexes, not sources of truth; index asynchronously from the DB via CDC and accept ~1 s staleness.",
            "Elasticsearch shard count is fixed at index creation; plan for growth or use rollover + aliases.",
            "Geohash precision: 6 chars ~ 1.2 km x 0.6 km, 7 chars ~ 150 m. Query the cell plus its 8 neighbours to handle edge cases.",
            "Quadtrees adapt to density (split a node when &gt; N points), great for static POIs (Yelp); geohash in Redis is simpler for rapidly moving points (drivers).",
            "Moving objects (drivers updating every 4 s) = very high write rate; keep locations in memory (Redis), not in a disk-based spatial index.",
            "Hybrid search (BM25 + vector, reciprocal rank fusion) is the current best practice for RAG; strong talking point for AI roles.",
            "Pagination deep into results is expensive in ES (from+size); use search_after."
          ],
          cases: [
            "Geohash boundary problem: two nearby points with different prefixes; search neighbouring cells.",
            "Dense areas (Bengaluru centre) vs sparse areas: fixed-size cells unbalanced; adaptive quadtree or dynamic radius.",
            "Index drift: DB and ES disagree after a failed CDC consumer; periodic reconciliation and full reindex path.",
            "Mapping explosion from dynamic fields in Elasticsearch.",
            "Hot shard in ES for a trending query/tenant.",
            "Follow-up: 'how do you update a driver's location 1M times/minute?' In-memory geo index sharded by city/cell, TTL on stale entries, don't persist every ping synchronously."
          ],
          qa: [
            { q: "What is an inverted index?", a: "A map from each term to the list of documents containing it (with positions and frequencies). A query intersects/unions postings lists and ranks results with BM25 and other signals. It makes full-text search sub-linear compared with scanning documents." },
            { q: "Geohash vs quadtree?", a: "Geohash encodes location into a fixed grid string; prefix queries find nearby cells, easy to store in any KV/DB, but cells are fixed-size regardless of density and need neighbour checks. A quadtree recursively splits regions until each has at most N points, adapting to density; usually in-memory and better for read-heavy static POIs, more complex to update." },
            { q: "How do you keep Elasticsearch in sync with your primary database?", a: "Stream changes via CDC (Debezium on the binlog/WAL) or an outbox into Kafka; an indexer consumes and upserts documents idempotently using the DB version for ordering. Periodically reconcile, and rebuild indexes by reindexing into a new index and switching an alias." }
          ]
        }
      ]
    }
  ]
});
