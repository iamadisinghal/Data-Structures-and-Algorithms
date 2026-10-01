// Free "Read & watch" references for System Design fundamentals ('sd') and HLD case studies ('hld').
// Entries without `u` become a YouTube / web search from `n`.

(function () {
const SDP = 'https://github.com/donnemartin/system-design-primer';
const SDP_SOL = 'https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/';

PREP.add({ id: 'sd', refs: {
  'web-basics': [
    { n: 'system-design-primer — DNS, CDN and "how the web works" sections', u: SDP, k: 'notes', d: 'concise overview with diagrams + links' },
    { n: 'Cloudflare Learning — What is DNS?', u: 'https://www.cloudflare.com/learning/dns/what-is-dns/', k: 'article', d: 'resolver, root, TLD, authoritative; record types' },
    { n: 'Cloudflare Learning — What happens in a TLS handshake?', u: 'https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/', k: 'article' },
    { n: 'Cloudflare Learning — What is a CDN?', u: 'https://www.cloudflare.com/learning/cdn/what-is-a-cdn/', k: 'article' },
    { n: 'High Performance Browser Networking (Ilya Grigorik, free online)', u: 'https://hpbn.co/', k: 'book', d: 'TCP, TLS, HTTP/1.1, HTTP/2 chapters — the deep written source' },
    { n: 'ByteByteGo — What happens when you type a URL into your browser?', k: 'video' },
    { n: 'Hussein Nasser — HTTP/1.1 vs HTTP/2 vs HTTP/3', k: 'video', d: 'protocol-level detail, QUIC' }
  ],
  'api-design': [
    { n: 'Google Cloud API Design Guide', u: 'https://cloud.google.com/apis/design', k: 'docs', d: 'resource-oriented design, naming, pagination, errors' },
    { n: 'Microsoft REST API Guidelines', u: 'https://github.com/microsoft/api-guidelines', k: 'docs', d: 'versioning, long-running ops, pagination' },
    { n: 'Stripe Engineering — Designing robust and predictable APIs with idempotency', u: 'https://stripe.com/blog/idempotency', k: 'blog', d: 'idempotency keys done right' },
    { n: 'gRPC docs — Introduction to gRPC', u: 'https://grpc.io/docs/what-is-grpc/introduction/', k: 'docs' },
    { n: 'GraphQL — Learn', u: 'https://graphql.org/learn/', k: 'docs' },
    { n: 'ByteByteGo — REST vs GraphQL vs gRPC (top API architecture styles)', k: 'video' },
    { n: 'Hussein Nasser — gRPC crash course', k: 'video', d: 'HTTP/2 framing and streaming modes' }
  ],
  'scalability-estimation': [
    { n: 'system-design-primer — Back-of-the-envelope calculations, powers of two, latency numbers', u: SDP, k: 'notes' },
    { n: 'Latency Numbers Every Programmer Should Know (Jeff Dean / Jonas Bonér gist)', u: 'https://gist.github.com/jboner/2841832', k: 'notes' },
    { n: 'DDIA (Martin Kleppmann) — Chapter 1: Reliable, Scalable, and Maintainable Applications', k: 'book', d: 'load parameters, percentiles, Twitter fan-out example' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 1 Scale from Zero to Millions & Ch 2 Back-of-the-envelope Estimation (book, optional)', k: 'book' },
    { n: 'Gaurav Sen — Horizontal vs Vertical Scaling | System Design', k: 'video' },
    { n: 'ByteByteGo — Back-of-the-envelope estimation', k: 'video' },
    { n: 'Hello Interview — Numbers to know (system design)', k: 'article', d: 'modern hardware numbers for estimates' }
  ],
  'load-balancing': [
    { n: 'system-design-primer — Load balancer & reverse proxy sections', u: SDP, k: 'notes' },
    { n: 'Cloudflare Learning — What is load balancing?', u: 'https://www.cloudflare.com/learning/performance/what-is-load-balancing/', k: 'article' },
    { n: 'Sam Rose — Load Balancing (interactive visual essay, samwho.dev)', k: 'visual', d: 'round robin vs least-connections vs PEWMA animated' },
    { n: 'The Power of Two Random Choices (Mitzenmacher) — explained', k: 'paper' },
    { n: 'Hussein Nasser — Layer 4 vs Layer 7 Load Balancing', k: 'video' },
    { n: 'Gaurav Sen — What is Load Balancing? | System Design', k: 'video' },
    { n: 'ByteByteGo — Top load balancing algorithms', k: 'video' }
  ],
  'caching': [
    { n: 'system-design-primer — Cache section (cache-aside, write-through, write-behind, refresh-ahead)', u: SDP, k: 'notes' },
    { n: 'Redis docs — Key eviction (maxmemory policies, approximated LRU/LFU)', u: 'https://redis.io/docs/', k: 'docs' },
    { n: 'Scaling Memcache at Facebook (NSDI 2013 paper)', k: 'paper', d: 'leases for thundering herd, invalidation at scale' },
    { n: 'AWS — Caching best practices / Caching strategies for ElastiCache', k: 'docs' },
    { n: 'ByteByteGo — Cache systems every developer should know', k: 'video' },
    { n: 'Gaurav Sen — What is Distributed Caching? Explained with Redis', k: 'video' },
    { n: 'Arpit Bhayani — cache stampede / thundering herd', k: 'video' }
  ],
  'databases': [
    { n: 'DDIA (Martin Kleppmann) — Ch 2 Data Models and Query Languages & Ch 3 Storage and Retrieval', k: 'book', d: 'B-trees vs LSM-trees, column stores — the key theory' },
    { n: 'system-design-primer — Database section (RDBMS, NoSQL, SQL vs NoSQL)', u: SDP, k: 'notes' },
    { n: 'Use The Index, Luke! (Markus Winand)', u: 'https://use-the-index-luke.com/', k: 'book', d: 'free book on how B-tree indexes really work' },
    { n: 'CMU 15-445 Intro to Database Systems (Andy Pavlo) — storage & indexing lectures', k: 'playlist' },
    { n: 'Bigtable: A Distributed Storage System for Structured Data (Google, OSDI 2006)', k: 'paper', d: 'origin of the wide-column model' },
    { n: 'ByteByteGo — How to choose the right database', k: 'video' },
    { n: 'Hussein Nasser — SQL vs NoSQL explained', k: 'video' }
  ],
  'replication': [
    { n: 'DDIA (Martin Kleppmann) — Chapter 5: Replication', k: 'book', d: 'leader/follower, lag anomalies, multi-leader, leaderless quorums' },
    { n: 'Martin Kleppmann — Distributed Systems (Cambridge) lecture 5: Replication', k: 'playlist', d: 'free 8-lecture series + PDF notes' },
    { n: 'MIT 6.824 / 6.5840 Distributed Systems — Primary/backup replication lecture', u: 'https://pdos.csail.mit.edu/6.824/', k: 'course' },
    { n: 'system-design-primer — Availability patterns: master-slave & master-master replication', u: SDP, k: 'notes' },
    { n: 'Dynamo: Amazon\'s Highly Available Key-value Store (SOSP 2007)', u: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf', k: 'paper', d: 'sloppy quorum, hinted handoff' },
    { n: 'ByteByteGo — Database replication explained', k: 'video' },
    { n: 'Arpit Bhayani — Database replication (sync vs async)', k: 'video' }
  ],
  'sharding': [
    { n: 'DDIA (Martin Kleppmann) — Chapter 6: Partitioning', k: 'book', d: 'range vs hash, secondary indexes, rebalancing' },
    { n: 'system-design-primer — Sharding & federation', u: SDP, k: 'notes' },
    { n: 'Wikipedia — Consistent hashing', u: 'https://en.wikipedia.org/wiki/Consistent_hashing', k: 'article' },
    { n: 'Instagram Engineering — Sharding & IDs at Instagram', u: 'https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c', k: 'blog', d: 'logical shards on Postgres schemas' },
    { n: 'Gaurav Sen — What is Consistent Hashing and Where is it used?', k: 'video' },
    { n: 'ByteByteGo — Consistent hashing explained', k: 'video' },
    { n: 'Arpit Bhayani — Sharding and partitioning', k: 'video' }
  ],
  'queues-streaming': [
    { n: 'Jay Kreps — The Log: What every software engineer should know about real-time data\'s unifying abstraction', u: 'https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying', k: 'blog', d: 'why Kafka is a log, not a queue' },
    { n: 'DDIA (Martin Kleppmann) — Chapter 11: Stream Processing', k: 'book', d: 'brokers vs logs, delivery semantics, CDC' },
    { n: 'Apache Kafka documentation — Design section', u: 'https://kafka.apache.org/documentation/', k: 'docs', d: 'partitions, ISR, acks, exactly-once' },
    { n: 'system-design-primer — Asynchronism: message queues, task queues, back pressure', u: SDP, k: 'notes' },
    { n: 'ByteByteGo — Why is Kafka fast?', k: 'video' },
    { n: 'Gaurav Sen — What is a Message Queue and Where is it used?', k: 'video' },
    { n: 'Hussein Nasser — Apache Kafka crash course', k: 'video' }
  ],
  'storage': [
    { n: 'The Google File System (SOSP 2003)', k: 'paper', d: 'chunkservers, master, append-heavy design' },
    { n: 'AWS — Amazon S3 strong consistency', u: 'https://aws.amazon.com/s3/consistency/', k: 'docs' },
    { n: 'Alex Xu, System Design Interview Vol 2 — Ch 9 S3-like Object Storage (book, optional)', k: 'book' },
    { n: 'Finding a needle in Haystack: Facebook\'s photo storage (OSDI 2010)', k: 'paper' },
    { n: 'MIT 6.824 / 6.5840 — GFS lecture', u: 'https://pdos.csail.mit.edu/6.824/', k: 'course' },
    { n: 'ByteByteGo — Block vs File vs Object storage', k: 'video' },
    { n: 'Databricks / Delta Lake — What is a data lakehouse?', k: 'article' }
  ],
  'cap-consistency': [
    { n: 'Jepsen — Consistency Models (clickable map)', u: 'https://jepsen.io/consistency', k: 'notes', d: 'linearizable, sequential, causal, snapshot... precise definitions' },
    { n: 'DDIA (Martin Kleppmann) — Chapter 9: Consistency and Consensus', k: 'book', d: 'linearizability vs causality, why CAP is narrow' },
    { n: 'Martin Kleppmann — Distributed Systems (Cambridge) lectures 7: Replica consistency', k: 'playlist' },
    { n: 'Martin Kleppmann — Please stop calling databases CP or AP (blog post)', k: 'blog' },
    { n: 'Daniel Abadi — Consistency Tradeoffs in Modern Distributed Database System Design (PACELC, IEEE Computer 2012)', k: 'paper' },
    { n: 'Wikipedia — CAP theorem', u: 'https://en.wikipedia.org/wiki/CAP_theorem', k: 'article' },
    { n: 'ByteByteGo — CAP theorem simplified', k: 'video' }
  ],
  'distributed-transactions': [
    { n: 'DDIA (Martin Kleppmann) — Ch 7 Transactions & Ch 9 (Atomic commit and 2PC section)', k: 'book' },
    { n: 'microservices.io (Chris Richardson) — Saga pattern', u: 'https://microservices.io/patterns/data/saga.html', k: 'article' },
    { n: 'microservices.io (Chris Richardson) — Transactional outbox', u: 'https://microservices.io/patterns/data/transactional-outbox.html', k: 'article' },
    { n: 'Stripe Engineering — Designing robust and predictable APIs with idempotency', u: 'https://stripe.com/blog/idempotency', k: 'blog' },
    { n: 'Wikipedia — Two-phase commit protocol', u: 'https://en.wikipedia.org/wiki/Two-phase_commit_protocol', k: 'article' },
    { n: 'Martin Kleppmann — Distributed Systems (Cambridge) lecture on two-phase commit', k: 'video' },
    { n: 'ByteByteGo — Distributed transactions: 2PC vs Saga', k: 'video' }
  ],
  'consensus-coordination': [
    { n: 'Raft — official site + paper "In Search of an Understandable Consensus Algorithm"', u: 'https://raft.github.io/', k: 'paper', d: 'paper, interactive visualisation, talks' },
    { n: 'The Secret Lives of Data — Raft visualised', u: 'https://thesecretlivesofdata.com/raft/', k: 'visual' },
    { n: 'Leslie Lamport — Paxos Made Simple', u: 'https://lamport.azurewebsites.net/pubs/paxos-simple.pdf', k: 'paper' },
    { n: 'DDIA (Martin Kleppmann) — Chapter 8 (The Trouble with Distributed Systems) & Ch 9 (Consensus)', k: 'book', d: 'fencing tokens, leases, ZooKeeper' },
    { n: 'Martin Kleppmann — How to do distributed locking', u: 'https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html', k: 'blog', d: 'why Redlock is unsafe; fencing tokens' },
    { n: 'MIT 6.824 / 6.5840 — Raft lectures + labs', u: 'https://pdos.csail.mit.edu/6.824/', k: 'course' },
    { n: 'Martin Kleppmann — Distributed Systems (Cambridge) lecture 6: Consensus (Raft)', k: 'video' }
  ],
  'rate-limiting': [
    { n: 'Stripe Engineering — Scaling your API with rate limiters', u: 'https://stripe.com/blog/rate-limiters', k: 'blog', d: '4 limiter types used in production' },
    { n: 'Cloudflare Learning — What is rate limiting?', u: 'https://www.cloudflare.com/learning/bots/what-is-rate-limiting/', k: 'article' },
    { n: 'Wikipedia — Token bucket', u: 'https://en.wikipedia.org/wiki/Token_bucket', k: 'article' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 4 Design a Rate Limiter (book, optional)', k: 'book' },
    { n: 'ByteByteGo — Rate limiting algorithms (token bucket, sliding window)', k: 'video' },
    { n: 'Gaurav Sen — Rate Limiting system design', k: 'video' }
  ],
  'reliability': [
    { n: 'AWS Builders\' Library — Timeouts, retries, and backoff with jitter', u: 'https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/', k: 'article' },
    { n: 'AWS Architecture Blog (Marc Brooker) — Exponential Backoff and Jitter', u: 'https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/', k: 'blog' },
    { n: 'Martin Fowler — Circuit Breaker', u: 'https://martinfowler.com/bliki/CircuitBreaker.html', k: 'article' },
    { n: 'Google SRE Book — Addressing Cascading Failures', u: 'https://sre.google/sre-book/addressing-cascading-failures/', k: 'book' },
    { n: 'Google SRE Book — Handling Overload', u: 'https://sre.google/sre-book/handling-overload/', k: 'book', d: 'load shedding, retry budgets, criticality' },
    { n: 'ByteByteGo — Circuit breaker / resiliency patterns', k: 'video' },
    { n: 'Hussein Nasser — timeouts and retries in backend engineering', k: 'video' }
  ],
  'observability': [
    { n: 'Google SRE Book — Service Level Objectives', u: 'https://sre.google/sre-book/service-level-objectives/', k: 'book' },
    { n: 'Google SRE Book — Monitoring Distributed Systems (four golden signals)', u: 'https://sre.google/sre-book/monitoring-distributed-systems/', k: 'book' },
    { n: 'Brendan Gregg — The USE Method', u: 'https://www.brendangregg.com/usemethod.html', k: 'article' },
    { n: 'OpenTelemetry docs — Observability primer, traces, metrics, logs', u: 'https://opentelemetry.io/docs/', k: 'docs' },
    { n: 'Dapper, a Large-Scale Distributed Systems Tracing Infrastructure (Google, 2010)', k: 'paper' },
    { n: 'ByteByteGo — Logging vs Metrics vs Tracing', k: 'video' },
    { n: 'Gil Tene — How NOT to Measure Latency', k: 'video', d: 'percentiles and coordinated omission' }
  ],
  'security': [
    { n: 'OAuth 2.0 — oauth.net', u: 'https://oauth.net/2/', k: 'docs', d: 'flows, PKCE, client credentials' },
    { n: 'jwt.io — Introduction to JSON Web Tokens', u: 'https://jwt.io/introduction', k: 'docs' },
    { n: 'OWASP Cheat Sheet — Password Storage', u: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html', k: 'docs' },
    { n: 'system-design-primer — Security section', u: SDP, k: 'notes' },
    { n: 'ByteByteGo — OAuth 2.0 explained / Session vs JWT', k: 'video' },
    { n: 'OktaDev — An Illustrated Guide to OAuth and OpenID Connect', k: 'video' },
    { n: 'Hussein Nasser — TLS / HTTPS explained', k: 'video' }
  ],
  'search-geo': [
    { n: 'Introduction to Information Retrieval (Manning, Raghavan, Schütze — free online, Stanford NLP)', k: 'book', d: 'Ch 1-2 inverted index, Ch 6 tf-idf scoring' },
    { n: 'Wikipedia — Inverted index', u: 'https://en.wikipedia.org/wiki/Inverted_index', k: 'article' },
    { n: 'Elasticsearch guide — shards, replicas, near-real-time search (elastic.co)', k: 'docs' },
    { n: 'Uber Engineering — H3: Uber\'s Hexagonal Hierarchical Spatial Index', u: 'https://www.uber.com/blog/h3/', k: 'blog' },
    { n: 'H3 documentation', u: 'https://h3geo.org/', k: 'docs' },
    { n: 'Wikipedia — Geohash', u: 'https://en.wikipedia.org/wiki/Geohash', k: 'article' },
    { n: 'ByteByteGo — Proximity service / geohash vs quadtree', k: 'video' }
  ]
}});

PREP.add({ id: 'hld', refs: {
  'url-shortener': [
    { n: 'Hello Interview — System design breakdown: Bit.ly (URL shortener)', k: 'article', d: 'free, modern interview-style write-up' },
    { n: 'system-design-primer — Design Pastebin.com (or Bit.ly) solution', u: SDP_SOL + 'pastebin/README.md', k: 'notes' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 8 Design a URL Shortener (book, optional)', k: 'book' },
    { n: 'Hello Interview — Design a URL shortener (Bit.ly) mock walkthrough', k: 'video' },
    { n: 'Gaurav Sen / ByteByteGo — TinyURL system design', k: 'video' },
    { n: 'Instagram Engineering — Sharding & IDs at Instagram', u: 'https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c', k: 'blog', d: 'ID generation that maps to short codes' }
  ],
  'pastebin': [
    { n: 'system-design-primer — Design Pastebin.com solution', u: SDP_SOL + 'pastebin/README.md', k: 'notes', d: 'full worked solution with estimates' },
    { n: 'AWS — Amazon S3 strong consistency (store paste bodies in object storage)', u: 'https://aws.amazon.com/s3/consistency/', k: 'docs' },
    { n: 'Exponent — Design Pastebin (system design mock interview)', k: 'video' },
    { n: 'Jordan has no life — TinyURL + PasteBin systems design', k: 'video' },
    { n: 'Hello Interview — Bit.ly breakdown (same key-generation core)', k: 'article' }
  ],
  'rate-limiter-service': [
    { n: 'Stripe Engineering — Scaling your API with rate limiters', u: 'https://stripe.com/blog/rate-limiters', k: 'blog' },
    { n: 'Cloudflare Blog — How we built rate limiting capable of scaling to millions of domains', k: 'blog', d: 'sliding-window counter in production' },
    { n: 'Hello Interview — Design a distributed rate limiter', k: 'article' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 4 Design a Rate Limiter (book, optional)', k: 'book' },
    { n: 'ByteByteGo — Design a rate limiter', k: 'video' },
    { n: 'Jordan has no life — Rate limiter systems design', k: 'video' }
  ],
  'kv-store': [
    { n: 'Dynamo: Amazon\'s Highly Available Key-value Store (SOSP 2007)', u: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf', k: 'paper', d: 'the source design: ring, N/R/W, vector clocks, Merkle trees' },
    { n: 'DDIA (Martin Kleppmann) — Ch 5 (leaderless replication) & Ch 6 (partitioning)', k: 'book' },
    { n: 'Cassandra — A Decentralized Structured Storage System (Lakshman & Malik, 2009)', k: 'paper' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 6 Design a Key-Value Store (book, optional)', k: 'book' },
    { n: 'MIT 6.824 / 6.5840 — Dynamo / key-value lectures', u: 'https://pdos.csail.mit.edu/6.824/', k: 'course' },
    { n: 'Jordan has no life — Distributed key-value store / Cassandra deep dive', k: 'video' },
    { n: 'ByteByteGo — Design a key-value store', k: 'video' }
  ],
  'unique-id-generator': [
    { n: 'Twitter Engineering — Announcing Snowflake', u: 'https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake', k: 'blog' },
    { n: 'Instagram Engineering — Sharding & IDs at Instagram', u: 'https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c', k: 'blog' },
    { n: 'Wikipedia — Snowflake ID', u: 'https://en.wikipedia.org/wiki/Snowflake_ID', k: 'article' },
    { n: 'Flickr Code — Ticket Servers: Distributed Unique Primary Keys on the Cheap', k: 'blog' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 7 Unique ID Generator in Distributed Systems (book, optional)', k: 'book' },
    { n: 'ByteByteGo — Design a unique ID generator', k: 'video' }
  ],
  'notification-system': [
    { n: 'Hello Interview — notification / push system patterns (real-time updates pattern)', k: 'article' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 10 Design a Notification System (book, optional)', k: 'book' },
    { n: 'Firebase Cloud Messaging docs — architecture overview', k: 'docs' },
    { n: 'Uber Engineering — Uber\'s real-time push platform (RAMEN)', k: 'blog' },
    { n: 'ByteByteGo — Design a notification system', k: 'video' },
    { n: 'Exponent — Design a notification service (mock interview)', k: 'video' }
  ],
  'news-feed': [
    { n: 'system-design-primer — Design the Twitter timeline and search', u: SDP_SOL + 'twitter/README.md', k: 'notes' },
    { n: 'Hello Interview — System design breakdown: Facebook News Feed', k: 'article' },
    { n: 'DDIA (Martin Kleppmann) — Ch 1 Twitter home timeline (fan-out on write vs read)', k: 'book' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 11 Design a News Feed System (book, optional)', k: 'book' },
    { n: 'Raffi Krikorian — Timelines at Scale (InfoQ talk, Twitter)', k: 'video', d: 'real fan-out + celebrity hybrid' },
    { n: 'Gaurav Sen — Twitter / Instagram news feed system design', k: 'video' },
    { n: 'Jordan has no life — Twitter / news feed systems design', k: 'video' }
  ],
  'chat-app': [
    { n: 'Discord Blog — How Discord Stores Trillions of Messages', u: 'https://discord.com/blog/how-discord-stores-trillions-of-messages', k: 'blog', d: 'Cassandra to ScyllaDB, data services, hot partitions' },
    { n: 'Discord Blog — How Discord Stores Billions of Messages', u: 'https://discord.com/blog/how-discord-stores-billions-of-messages', k: 'blog', d: 'partition key (channel, bucket) design' },
    { n: 'Hello Interview — System design breakdown: WhatsApp', k: 'article' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 12 Design a Chat System (book, optional)', k: 'book' },
    { n: 'Slack Engineering — Real-time messaging architecture', k: 'blog' },
    { n: 'Gaurav Sen — WhatsApp system design', k: 'video' },
    { n: 'Hello Interview — Design WhatsApp walkthrough', k: 'video' }
  ],
  'photo-sharing': [
    { n: 'Instagram Engineering — Sharding & IDs at Instagram', u: 'https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c', k: 'blog' },
    { n: 'Finding a needle in Haystack: Facebook\'s photo storage (OSDI 2010)', k: 'paper', d: 'why not one file per photo' },
    { n: 'Hello Interview — System design breakdown: Instagram', k: 'article' },
    { n: 'system-design-primer — Design a social network / scaling on AWS', u: SDP, k: 'notes' },
    { n: 'Gaurav Sen — Instagram system design', k: 'video' },
    { n: 'Exponent — Design Instagram (mock interview)', k: 'video' }
  ],
  'video-streaming': [
    { n: 'Netflix Open Connect (Netflix\'s own CDN)', u: 'https://openconnect.netflix.com/', k: 'docs' },
    { n: 'Netflix TechBlog — encoding / per-title encode optimization posts', k: 'blog' },
    { n: 'Wikipedia — Adaptive bitrate streaming (HLS / DASH)', u: 'https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming', k: 'article' },
    { n: 'Hello Interview — System design breakdown: YouTube', k: 'article' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 14 Design YouTube (book, optional)', k: 'book' },
    { n: 'Gaurav Sen — Netflix / YouTube system design', k: 'video' },
    { n: 'ByteByteGo — Design YouTube / how Netflix streams', k: 'video' }
  ],
  'ride-sharing': [
    { n: 'Uber Engineering — H3: Uber\'s Hexagonal Hierarchical Spatial Index', u: 'https://www.uber.com/blog/h3/', k: 'blog' },
    { n: 'H3 documentation', u: 'https://h3geo.org/', k: 'docs' },
    { n: 'Hello Interview — System design breakdown: Uber', k: 'article', d: 'driver location index, no double-assign locking' },
    { n: 'Matt Ranney — Scaling Uber\'s Real-time Market Platform (talk, ringpop)', k: 'video' },
    { n: 'Alex Xu, System Design Interview Vol 2 — Ch 1 Proximity Service & Ch 2 Nearby Friends (book, optional)', k: 'book' },
    { n: 'Gaurav Sen — Uber system design', k: 'video' },
    { n: 'Hello Interview — Design Uber walkthrough', k: 'video' }
  ],
  'typeahead': [
    { n: 'Wikipedia — Trie', u: 'https://en.wikipedia.org/wiki/Trie', k: 'article' },
    { n: 'Hello Interview — Design search autocomplete / typeahead', k: 'article' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 13 Design a Search Autocomplete System (book, optional)', k: 'book' },
    { n: 'LinkedIn Engineering — Cleo: the open source technology behind LinkedIn\'s typeahead search', k: 'blog' },
    { n: 'Gaurav Sen — Autocomplete / typeahead system design', k: 'video' },
    { n: 'ByteByteGo — Design search autocomplete', k: 'video' }
  ],
  'web-crawler': [
    { n: 'system-design-primer — Design a web crawler solution', u: SDP_SOL + 'web_crawler/README.md', k: 'notes' },
    { n: 'Hello Interview — System design breakdown: Web Crawler', k: 'article' },
    { n: 'Mercator: A Scalable, Extensible Web Crawler (Heydon & Najork)', k: 'paper', d: 'URL frontier and politeness queues' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 9 Design a Web Crawler (book, optional)', k: 'book' },
    { n: 'Wikipedia — Bloom filter (URL-seen test)', u: 'https://en.wikipedia.org/wiki/Bloom_filter', k: 'article' },
    { n: 'Hello Interview — Design a web crawler walkthrough', k: 'video' },
    { n: 'Jordan has no life — Web crawler systems design', k: 'video' }
  ],
  'file-storage-sync': [
    { n: 'Hello Interview — System design breakdown: Dropbox', k: 'article', d: 'pre-signed URLs, chunking, sync' },
    { n: 'Dropbox Tech Blog — Rewriting the heart of our sync engine (Nucleus)', k: 'blog' },
    { n: 'Dropbox Tech Blog — Streaming file synchronization', k: 'blog' },
    { n: 'Wikipedia — rsync (rolling checksum delta sync)', u: 'https://en.wikipedia.org/wiki/Rsync', k: 'article' },
    { n: 'Alex Xu, System Design Interview Vol 1 — Ch 15 Design Google Drive (book, optional)', k: 'book' },
    { n: 'Gaurav Sen / ByteByteGo — Dropbox / Google Drive system design', k: 'video' }
  ],
  'distributed-mq': [
    { n: 'Kafka: a Distributed Messaging System for Log Processing (Kreps, Narkhede, Rao, NetDB 2011)', k: 'paper' },
    { n: 'Jay Kreps — The Log: What every software engineer should know about real-time data\'s unifying abstraction', u: 'https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying', k: 'blog' },
    { n: 'Apache Kafka documentation — Design (persistence, replication, delivery semantics)', u: 'https://kafka.apache.org/documentation/', k: 'docs' },
    { n: 'Alex Xu, System Design Interview Vol 2 — Ch 4 Distributed Message Queue (book, optional)', k: 'book' },
    { n: 'Jordan has no life — Kafka / stream processing deep dive', k: 'video' },
    { n: 'ByteByteGo — Design a distributed message queue', k: 'video' }
  ],
  'payment-system': [
    { n: 'Stripe Engineering — Designing robust and predictable APIs with idempotency', u: 'https://stripe.com/blog/idempotency', k: 'blog' },
    { n: 'Airbnb Engineering — Avoiding Double Payments in a Distributed Payments System', k: 'blog' },
    { n: 'Hello Interview — System design breakdown: Payment system (Stripe)', k: 'article' },
    { n: 'Alex Xu, System Design Interview Vol 2 — Ch 11 Payment System & Ch 12 Digital Wallet (book, optional)', k: 'book' },
    { n: 'Uber Engineering — Uber\'s payments platform / ledger posts', k: 'blog' },
    { n: 'ByteByteGo — Design a payment system', k: 'video' },
    { n: 'Exponent — Design a payment system (mock interview)', k: 'video' }
  ],
  'ticket-booking': [
    { n: 'Hello Interview — System design breakdown: Ticketmaster', k: 'article', d: 'seat holds with TTL, virtual waiting room' },
    { n: 'Alex Xu, System Design Interview Vol 2 — Ch 7 Hotel Reservation System (book, optional)', k: 'book', d: 'same concurrency problem: optimistic vs pessimistic locking' },
    { n: 'DDIA (Martin Kleppmann) — Chapter 7: Transactions (write skew, SELECT FOR UPDATE)', k: 'book' },
    { n: 'Hello Interview — Design Ticketmaster walkthrough', k: 'video' },
    { n: 'Gaurav Sen / Exponent — BookMyShow / ticket booking system design', k: 'video' }
  ],
  'collab-editing': [
    { n: 'Figma Blog — How Figma\'s multiplayer technology works', u: 'https://www.figma.com/blog/how-figmas-multiplayer-technology-works/', k: 'blog' },
    { n: 'crdt.tech — CRDT resources (Kleppmann et al.)', u: 'https://crdt.tech/', k: 'notes' },
    { n: 'Wikipedia — Operational transformation', u: 'https://en.wikipedia.org/wiki/Operational_transformation', k: 'article' },
    { n: 'Martin Kleppmann — CRDTs: The Hard Parts (talk)', k: 'video' },
    { n: 'Hello Interview — System design breakdown: Google Docs', k: 'article' },
    { n: 'Jordan has no life / Gaurav Sen — Google Docs collaborative editing system design', k: 'video' }
  ],
  'search-engine': [
    { n: 'Brin & Page — The Anatomy of a Large-Scale Hypertextual Web Search Engine', u: 'http://infolab.stanford.edu/~backrub/google.html', k: 'paper' },
    { n: 'Introduction to Information Retrieval (Manning, Raghavan, Schütze — free online)', k: 'book', d: 'index construction, distributed indexing, scoring' },
    { n: 'Wikipedia — Inverted index', u: 'https://en.wikipedia.org/wiki/Inverted_index', k: 'article' },
    { n: 'Elasticsearch guide — how search and scoring (BM25) work', k: 'docs' },
    { n: 'Twitter Engineering — Earlybird: real-time search at Twitter', k: 'blog' },
    { n: 'Jordan has no life — Search index / Elasticsearch systems design', k: 'video' }
  ],
  'ad-click-topk': [
    { n: 'Hello Interview — System design breakdown: Ad Click Aggregator', k: 'article' },
    { n: 'Hello Interview — System design breakdown: Top K (YouTube top videos)', k: 'article' },
    { n: 'Wikipedia — Count-min sketch', u: 'https://en.wikipedia.org/wiki/Count%E2%80%93min_sketch', k: 'article' },
    { n: 'DDIA (Martin Kleppmann) — Chapter 11: Stream Processing (windows, late events, exactly-once)', k: 'book' },
    { n: 'Alex Xu, System Design Interview Vol 2 — Ch 6 Ad Click Event Aggregation (book, optional)', k: 'book' },
    { n: 'Hello Interview — Design an ad click aggregator walkthrough', k: 'video' },
    { n: 'ByteByteGo / Jordan has no life — Top K heavy hitters system design', k: 'video' }
  ],
  'job-scheduler': [
    { n: 'Hello Interview — System design breakdown: Distributed Job Scheduler', k: 'article' },
    { n: 'Airbnb Engineering — Dynein: Building a distributed delayed job queueing system', k: 'blog' },
    { n: 'Martin Kleppmann — How to do distributed locking (avoid duplicate runs)', u: 'https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html', k: 'blog' },
    { n: 'Large-scale cluster management at Google with Borg (EuroSys 2015)', k: 'paper' },
    { n: 'Jordan has no life — Distributed job scheduler systems design', k: 'video' },
    { n: 'Hello Interview — Design a job scheduler walkthrough', k: 'video' }
  ],
  'stock-exchange': [
    { n: 'Martin Fowler — The LMAX Architecture', u: 'https://martinfowler.com/articles/lmax.html', k: 'article', d: 'single-threaded matching + event sourcing' },
    { n: 'Wikipedia — Order book', u: 'https://en.wikipedia.org/wiki/Order_book', k: 'article' },
    { n: 'Alex Xu, System Design Interview Vol 2 — Ch 13 Stock Exchange (book, optional)', k: 'book' },
    { n: 'Jane Street Tech Talks — how exchanges / low-latency trading systems work', k: 'video' },
    { n: 'ByteByteGo — Design a stock exchange', k: 'video' },
    { n: 'Hello Interview — Robinhood / stock trading breakdown', k: 'article' }
  ],
  'food-delivery': [
    { n: 'Uber Engineering — H3: Uber\'s Hexagonal Hierarchical Spatial Index', u: 'https://www.uber.com/blog/h3/', k: 'blog' },
    { n: 'Swiggy Bytes / Zomato tech blog — delivery partner assignment & ETA prediction posts', k: 'blog' },
    { n: 'DoorDash Engineering — ETA prediction / dispatch optimisation posts', k: 'blog' },
    { n: 'Hello Interview — System design breakdown: Uber (dispatch core)', k: 'article' },
    { n: 'Alex Xu, System Design Interview Vol 2 — Ch 1 Proximity Service (book, optional)', k: 'book' },
    { n: 'Exponent / Gaurav Sen — Design Swiggy / DoorDash food delivery', k: 'video' }
  ]
}});
})();
