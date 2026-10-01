PREP.add({
  id: "cn",
  order: 90,
  group: "Core CS",
  title: "Computer Networks",
  short: "Networks",
  blurb: "From OSI layers to what happens when you type a URL.",
  intro: [
    "Networks questions cluster around a few anchors. <b>OSI/TCP-IP layers</b>, <b>TCP vs UDP and the handshake</b>, <b>\"what happens when you type a URL\"</b>, <b>DNS</b>, <b>HTTP versions and HTTPS/TLS</b>, and subnetting numericals in written tests.",
    "For product and AI roles, the Advanced level matters most: WebSockets vs SSE (LLM token streaming uses SSE), CORS, load balancers, CDNs. These also feed straight into system-design rounds.",
    "Practise the URL question as a 3-minute story, then be ready to zoom into any layer when the interviewer interrupts."
  ],
  resources: [
    { n: "Kurose & Ross - Computer Networking: A Top-Down Approach", d: "The standard textbook. The top-down order (application layer first) matches how interviews flow." },
    { n: "GFG Computer Networks", u: "https://www.geeksforgeeks.org/computer-network-tutorials/", d: "Notes plus GATE PYQs and subnetting practice." },
    { n: "Neso Academy - Computer Networks", u: "https://www.youtube.com/@nesoacademy", d: "Structured video course with solved numericals." },
    { n: "Gate Smashers - CN playlist", u: "https://www.youtube.com/@GateSmashers", d: "Quick revision videos, good for subnetting and the layers." },
    { n: "Cloudflare Learning Center", u: "https://www.cloudflare.com/learning/", d: "Excellent short explainers on DNS, TLS, CDN, DDoS and HTTP/3. Interview-grade clarity." },
    { n: "High Performance Browser Networking", u: "https://hpbn.co/", d: "Free book by Ilya Grigorik on TCP, TLS, HTTP/2, WebSocket and latency. Gives deep, practical answers." }
  ],
  levels: [
    {
      name: "Beginner",
      desc: "Layer models and devices, the URL journey, IP addressing and subnetting, DNS.",
      topics: [
        {
          id: "osi-tcpip",
          title: "OSI vs TCP/IP model, encapsulation & network devices",
          est: "1-2 days",
          why: "Almost always the first CN question. You need to place every protocol and device at the right layer without hesitating.",
          learn: [
            "<b>OSI 7 layers</b>: Physical, Data Link, Network, Transport, Session, Presentation, Application, with the responsibility of each.",
            "<b>TCP/IP model</b> (4 or 5 layers): Link, Internet, Transport, Application, and how it maps to OSI.",
            "PDU names: bits, <b>frame</b> (L2), <b>packet</b> (L3), <b>segment / datagram</b> (L4), data/message (L7).",
            "Encapsulation and decapsulation: each layer adds a header (and the L2 trailer, FCS).",
            "Addressing per layer: MAC (L2), IP (L3), port (L4).",
            "Devices: <b>hub</b> (L1, broadcast to all ports, one collision domain), <b>switch</b> (L2, MAC table, per-port collision domain), <b>router</b> (L3, separates broadcast domains), bridge, repeater, gateway, L3 switch.",
            "Placing protocols: HTTP, DNS, SMTP, FTP (L7); TLS (between L4 and L7, often called L6/L5); TCP, UDP (L4); IP, ICMP (L3); ARP (L2/L3 boundary); Ethernet, Wi-Fi (L2).",
            "Topologies (bus, star, ring, mesh) and LAN/MAN/WAN briefly. Unicast, broadcast, multicast, anycast."
          ],
          practice: [
            { t: "GFG: Layers of OSI Model", p: "GFG", d: "E" },
            { t: "GFG: TCP/IP Model", p: "GFG", d: "E" },
            { t: "GFG: Network Devices (Hub, Switch, Router, Bridge, Gateway)", p: "GFG", d: "E" },
            { t: "Draw the encapsulation of an HTTP GET from the app down to Ethernet frame bits, with header fields", p: "BUILD", d: "M" },
            { t: "Count collision and broadcast domains in a topology with 2 hubs, 1 switch and 1 router (GATE style)", p: "GFG", d: "M" },
            { t: "Kurose & Ross Ch. 1 (Computer Networks and the Internet)", p: "BOOK", d: "E" },
            { t: "Gate Smashers: OSI model video", p: "YT", d: "E" }
          ],
          notes: [
            "Mnemonic (L1 to L7): <b>\"Please Do Not Throw Sausage Pizza Away\"</b>. Top-down: \"All People Seem To Need Data Processing\".",
            "Hub: one collision domain and one broadcast domain. Switch: one collision domain <b>per port</b>, one broadcast domain. Router: one broadcast domain <b>per interface</b>.",
            "MAC addresses are 48-bit and change at every hop (rewritten per link). IP addresses stay end to end (except through NAT).",
            "Session-layer jobs (dialog control, checkpoints) and presentation-layer jobs (encoding, encryption, compression) are folded into the application layer in TCP/IP.",
            "A switch learns MAC to port mappings from <b>source</b> addresses and floods unknown destinations. VLANs split broadcast domains on one switch.",
            "Header sizes: Ethernet 14 B + 4 B FCS, IPv4 20-60 B, IPv6 40 B fixed, TCP 20-60 B, UDP 8 B. Ethernet MTU 1500 B, so TCP MSS = 1460 B."
          ],
          cases: [
            "\"Which layer does TLS belong to?\" There is no clean answer. It sits on top of TCP and below HTTP, and is usually described as L6 (presentation) or a \"transport security\" layer. Say so.",
            "ARP is often asked as an L2 or L3 question. It resolves L3 to L2 and is carried directly in Ethernet frames (not IP), so call it a link-layer protocol serving L3.",
            "A router also does L2 (it must frame packets on each link). Devices work at <b>their layer and all below</b>.",
            "Load balancers are \"L4\" or \"L7\" by which headers they read, not by physical placement.",
            "OSI is a reference model. The internet actually runs TCP/IP."
          ],
          qa: [
            { q: "Explain the OSI model.", a: "Seven layers, each serving the one above. <b>Physical</b> (bits on the medium), <b>Data link</b> (framing, MAC, error detection on one link), <b>Network</b> (logical addressing and routing across networks, IP), <b>Transport</b> (end-to-end delivery, ports, reliability, TCP/UDP), <b>Session</b> (dialog management), <b>Presentation</b> (encoding, encryption, compression), <b>Application</b> (HTTP, DNS, SMTP)." },
            { q: "OSI vs TCP/IP model?", a: "OSI is a 7-layer conceptual reference model. TCP/IP is the practical 4-layer model the internet uses (Link, Internet, Transport, Application). TCP/IP merges OSI's session, presentation and application layers into Application, and physical plus data link into Link." },
            { q: "Hub vs switch vs router?", a: "A <b>hub</b> (L1) repeats bits to every port, so all devices share one collision domain. A <b>switch</b> (L2) learns MAC addresses and forwards frames only to the right port, giving each port its own collision domain. A <b>router</b> (L3) forwards packets between networks by IP address using a routing table and separates broadcast domains." }
          ]
        },
        {
          id: "url-journey",
          title: "What happens when you type a URL and press Enter",
          est: "1 day",
          why: "Possibly the single most-asked networking question at every level. It is a chance to show breadth (DNS, TCP, TLS, HTTP, rendering) and depth when probed.",
          learn: [
            "Browser parses the URL (scheme, host, port, path, query) and checks HSTS preload and its caches (HTTP cache, service worker).",
            "<b>DNS resolution</b>: browser cache, OS cache / hosts file, stub resolver, recursive resolver, then root, TLD and authoritative servers. A/AAAA record.",
            "Before sending: ARP for the default gateway's MAC (if not cached), routing to the internet through NAT.",
            "<b>TCP 3-way handshake</b> (or QUIC over UDP for HTTP/3).",
            "<b>TLS handshake</b>: ClientHello with SNI and ALPN, ServerHello, certificate, key exchange (ECDHE), Finished. 1-RTT in TLS 1.3.",
            "HTTP request (method, headers, cookies), possibly through CDN, load balancer, reverse proxy, app server, DB/cache, then the response.",
            "Response handling: status code, redirects (301/302 to https), caching headers, compression (gzip/br).",
            "Browser rendering: parse HTML into the DOM, CSS into the CSSOM, build the render tree, layout, paint, composite. Subresource fetches, JS execution, connection reuse."
          ],
          practice: [
            { t: "Write out the full answer in 15 bullet points and say it aloud in 3 minutes", p: "BUILD", d: "M" },
            { t: "Trace a real request: <code>curl -v https://example.com</code> and identify the DNS, TCP, TLS and HTTP steps", p: "BUILD", d: "E" },
            { t: "Open Chrome DevTools, go to Network, open a request's Timing tab and map each phase (DNS, Initial connection, SSL, TTFB)", p: "BUILD", d: "E" },
            { t: "GitHub: alex/what-happens-when (read the whole thing)", p: "DOC", d: "M", u: "https://github.com/alex/what-happens-when" },
            { t: "Cloudflare Learning: What is DNS? / What happens in a TLS handshake?", p: "DOC", d: "E", u: "https://www.cloudflare.com/learning/" }
          ],
          notes: [
            "Story skeleton: <b>URL parse, cache check, DNS, TCP, TLS, HTTP request, server side (LB, app, DB), response, render</b>.",
            "Latency budget for a new HTTPS connection over TCP + TLS 1.3: DNS (0-several RTT) + TCP 1 RTT + TLS 1 RTT + request 1 RTT, about <b>3 RTT</b> before the first byte. HTTP/3 (QUIC) merges transport and TLS into 1 RTT (0-RTT on resumption).",
            "HSTS forces https without first hitting http, which prevents SSL-stripping.",
            "SNI tells the server which certificate to present (many sites on one IP). ALPN negotiates h2 or http/1.1 during TLS.",
            "Connection reuse (keep-alive, HTTP/2 multiplexing) and DNS/TLS session caching make subsequent requests much cheaper.",
            "Rendering: CSS is render-blocking. Synchronous JS blocks parsing (use <code>defer</code>/<code>async</code>)."
          ],
          cases: [
            "Mention that the browser may skip network entirely: service worker or HTTP cache (fresh) means no request at all.",
            "Do not forget the <b>server side</b>. Interviewers for backend roles want LB, reverse proxy, app, cache and DB, not just the client.",
            "DNS uses UDP 53 normally, TCP for large responses and zone transfers, and DoH/DoT (encrypted) in modern browsers.",
            "Typing \"google.com\" without a scheme makes the browser try https first (modern) or decide between search and URL.",
            "Follow-up: \"How would you make this page load faster?\" Answer with CDN, caching headers, HTTP/2 or 3, compression, fewer round trips, preconnect and dns-prefetch, lazy loading."
          ],
          qa: [
            { q: "What happens when you type https://www.google.com into a browser?", a: "The browser parses the URL and checks HSTS and caches. It resolves the domain via DNS (browser, OS, recursive resolver, then root, .com TLD and Google's authoritative server) to an IP. It opens a TCP connection (3-way handshake) and does a TLS handshake (verifying the certificate, agreeing keys, ALPN h2). It sends an HTTP GET with headers and cookies. Google's edge (anycast, LB, reverse proxy) routes to backends, which return a response with status, headers and an HTML body. The browser parses HTML and CSS, builds the DOM and CSSOM, runs JS, fetches subresources over the same connection, then lays out, paints and composites." },
            { q: "How many round trips before you get the first byte over HTTPS?", a: "With a cold DNS cache, DNS adds 1 or more RTT. Then TCP takes 1 RTT, TLS 1.3 1 RTT (TLS 1.2: 2 RTT), and the HTTP request/response 1 RTT, so about 3-4 RTT. HTTP/3 over QUIC combines transport and crypto setup into 1 RTT, or 0-RTT on resumption." },
            { q: "Where can caching happen along this path?", a: "Browser memory or disk cache and service worker, OS DNS cache, recursive resolver DNS cache, CDN or edge cache, reverse proxy cache (Varnish/Nginx), application cache (Redis), and the DB buffer pool. TLS session tickets and kept-alive connections also cache handshake work." }
          ]
        },
        {
          id: "ip-addressing",
          title: "IP addressing, subnetting/CIDR, private vs public, NAT, IPv4 vs IPv6",
          est: "2-3 days",
          why: "Subnetting numericals are common in written tests and fundamentals rounds. NAT and private ranges come up in cloud/VPC discussions.",
          learn: [
            "IPv4: 32 bits, dotted decimal, network vs host portion. Classful history (A/B/C/D/E) and why it was replaced.",
            "<b>CIDR</b> notation /n, subnet mask, network address, broadcast address, usable hosts = 2^(32-n) - 2.",
            "Subnetting and supernetting (route aggregation), VLSM.",
            "<b>Private ranges</b> (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Loopback 127.0.0.0/8, link-local 169.254.0.0/16, CGNAT 100.64.0.0/10.",
            "<b>NAT</b>: SNAT/DNAT, PAT (many to one using ports), NAT traversal problems (P2P, STUN/TURN).",
            "<b>IPv6</b>: 128 bits, hex notation and :: compression, no broadcast (multicast instead), SLAAC, no NAT needed, fixed 40 B header, extension headers.",
            "IPv4 header fields: version, IHL, TTL, protocol, checksum, fragmentation (ID, flags, offset).",
            "Fragmentation and MTU, Path MTU discovery, DF bit."
          ],
          practice: [
            { t: "Subnetting: for 192.168.10.77/27 find network, broadcast, first and last host, number of hosts", p: "GFG", d: "E" },
            { t: "Subnetting: divide 172.16.0.0/16 into subnets of at least 500 hosts each (find the prefix)", p: "GFG", d: "M" },
            { t: "VLSM: allocate subnets for 100, 50, 20 and 2 hosts from 192.168.1.0/24", p: "GFG", d: "M" },
            { t: "Supernet 4 contiguous /24s into one prefix", p: "GFG", d: "M" },
            { t: "GATE PYQs: IP addressing and subnetting (10 questions)", p: "GFG", d: "H" },
            { t: "Validate IP Address", p: "LC", d: "M", u: "https://leetcode.com/problems/validate-ip-address/" },
            { t: "Restore IP Addresses", p: "LC", d: "M", u: "https://leetcode.com/problems/restore-ip-addresses/" },
            { t: "Design an AWS VPC CIDR plan: VPC /16, public and private /24 per AZ, NAT gateway", p: "BUILD", d: "M" },
            { t: "Gate Smashers / Neso: subnetting videos", p: "YT", d: "E" }
          ],
          notes: [
            "Hosts per subnet = <b>2^(host bits) - 2</b> (network and broadcast reserved). /31 is a special case for point-to-point links (RFC 3021). AWS reserves 5 IPs per subnet.",
            "Block size trick: for /27, mask 255.255.255.224, block = 256 - 224 = <b>32</b>. Networks start at 0, 32, 64, 96... so 192.168.10.77/27 lies in .64-.95 (network .64, broadcast .95, hosts .65-.94).",
            "Number of subnets when borrowing s bits = 2^s.",
            "CIDR to mask: /8 = 255.0.0.0, /16 = 255.255.0.0, /20 = 255.255.240.0, /24 = 255.255.255.0, /26 = .192, /28 = .240, /30 = .252.",
            "IPv6 compression: drop leading zeros per group and replace <b>one</b> run of zero groups with ::. Example: 2001:0db8:0000:0000:0000:0000:0000:0001 becomes 2001:db8::1.",
            "PAT/NAPT: the router maps (private IP, port) to (public IP, unique port) in a translation table, so one public IP serves thousands of devices.",
            "Fragment offset is in units of <b>8 bytes</b>, a frequent GATE trap. IPv6 routers never fragment; only the source does."
          ],
          cases: [
            "Network and broadcast addresses are not assignable to hosts (except /31 and /32).",
            "172.32.x.x is <b>public</b>. The private block is 172.16.0.0-172.31.255.255.",
            "NAT is not a firewall, though it incidentally blocks unsolicited inbound traffic.",
            "IPv6 has no broadcast. ARP is replaced by NDP (ICMPv6 neighbour discovery).",
            "TTL counts hops (decremented by each router), not seconds in practice. It prevents routing loops, and traceroute exploits it.",
            "Overlapping VPC CIDRs cannot be peered, so plan address space early (a real cloud gotcha)."
          ],
          qa: [
            { q: "What is subnetting and why is it used?", a: "Dividing an IP network into smaller networks by borrowing host bits for the network portion. It shrinks broadcast domains, improves security and isolation (separate VLANs or subnets), uses address space efficiently, and simplifies routing and aggregation." },
            { q: "Given 10.1.5.130/26, find network, broadcast and usable range.", a: "/26 means mask 255.255.255.192, block 64, so the subnets are .0, .64, .128, .192. 130 lies in .128-.191: network <b>10.1.5.128</b>, broadcast <b>10.1.5.191</b>, usable .129-.190 (62 hosts)." },
            { q: "What is NAT and why is it needed?", a: "Network Address Translation rewrites IP addresses (and ports, for PAT) in packets crossing a router, typically mapping many private addresses to one public IP. It was a response to IPv4 address exhaustion and hides internal topology. Downsides: it breaks end-to-end connectivity, which complicates P2P, VoIP and inbound connections (needs port forwarding or STUN/TURN)." },
            { q: "IPv4 vs IPv6?", a: "IPv4 is 32-bit (about 4.3B addresses), uses broadcast and ARP, has a variable header with checksum, and routers can fragment. IPv6 is 128-bit, uses multicast and NDP, has a fixed 40 B header with no checksum, only the source fragments, it supports SLAAC autoconfiguration, and has enough addresses that NAT is unnecessary." }
          ]
        },
        {
          id: "dns",
          title: "DNS in depth: resolution, records, caching, TTL",
          est: "1-2 days",
          why: "Part of the URL question and a standard follow-up (\"recursive vs iterative?\", \"what is a CNAME?\"). It is also central to CDN, failover and system-design discussions.",
          learn: [
            "Hierarchy: root (.), TLD (.com, .in), authoritative name servers, zones and delegation (NS records plus glue).",
            "<b>Recursive vs iterative</b> resolution. Stub resolver, recursive resolver (ISP, 8.8.8.8, 1.1.1.1).",
            "Record types: <b>A, AAAA, CNAME, MX, NS, TXT, SOA, PTR, SRV, CAA</b>. ALIAS/ANAME at the apex.",
            "Caching at every level, <b>TTL</b>, negative caching (NXDOMAIN, SOA minimum).",
            "Transport: UDP 53 (and TCP 53 for large responses and zone transfers), EDNS0, DNS over HTTPS/TLS (DoH/DoT).",
            "DNS for load balancing and failover: round-robin, GeoDNS/latency-based routing (Route 53), health checks. Limitations of DNS LB.",
            "Security: DNS spoofing and cache poisoning, DNSSEC (signatures, chain of trust), DNS amplification DDoS.",
            "Reverse DNS (in-addr.arpa, PTR) and its use in email deliverability."
          ],
          practice: [
            { t: "Run <code>dig +trace www.example.com</code> and explain each step (root, TLD, authoritative)", p: "BUILD", d: "E" },
            { t: "Use <code>dig</code> / <code>nslookup</code> to query A, AAAA, MX, TXT, NS and CNAME records of a real domain", p: "BUILD", d: "E" },
            { t: "GFG: DNS in Computer Network", p: "GFG", d: "E" },
            { t: "GFG: Recursive vs Iterative DNS queries", p: "GFG", d: "E" },
            { t: "Cloudflare Learning: What is DNS? + DNS record types + DNS cache poisoning", p: "DOC", d: "E", u: "https://www.cloudflare.com/learning/dns/what-is-dns/" },
            { t: "Kurose & Ross Sec. 2.4 (DNS)", p: "BOOK", d: "M" }
          ],
          notes: [
            "Client to recursive resolver is a <b>recursive</b> query (\"give me the final answer\"). Resolver to root, TLD and authoritative servers are <b>iterative</b> (\"here is who to ask next\").",
            "There are 13 root server <i>names</i> (a-m.root-servers.net), but hundreds of instances via <b>anycast</b>.",
            "<b>CNAME</b> cannot coexist with other records at the same name, so it cannot be used at the zone apex (example.com). That is why ALIAS/ANAME/CNAME-flattening exist.",
            "MX points to a hostname (not an IP) with a priority, where lower is preferred.",
            "Low TTL gives fast failover and changes but more queries and latency. High TTL gives the reverse. Lower the TTL <b>before</b> a migration.",
            "TXT is used for SPF, DKIM, DMARC and domain verification (Google, ACM).",
            "DNS LB is coarse. Clients and resolvers cache and ignore TTLs, and there is no health awareness without a smart DNS provider."
          ],
          cases: [
            "\"DNS uses only UDP\" is wrong. TCP is used for responses over 512 B (without EDNS0) or truncated ones, zone transfers (AXFR) and DoT.",
            "DNS changes are not \"instantly global\". Propagation is really cache expiry at resolvers.",
            "The <code>/etc/hosts</code> file overrides DNS (and is checked first by default on most systems).",
            "In Kubernetes, <code>ndots:5</code> causes several search-domain lookups per external name, which slows things down (a real debugging story).",
            "Cache poisoning (Kaminsky) is mitigated by source-port randomization plus random transaction IDs, and fully fixed by DNSSEC."
          ],
          qa: [
            { q: "How does DNS resolution work?", a: "The app asks the OS stub resolver, which checks its cache and the hosts file and then asks a recursive resolver. On a miss, the resolver asks a root server (which refers it to the .com TLD servers), then the TLD (which refers it to the domain's authoritative NS), then the authoritative server, which returns the A/AAAA record. The resolver caches every answer for its TTL and returns the IP." },
            { q: "Recursive vs iterative query?", a: "Recursive: the server must return the final answer (or an error), doing the work itself. Clients send these to their resolver. Iterative: the server returns the best answer it has, often a referral to another server, and the asker continues. Resolvers use these with root, TLD and authoritative servers." },
            { q: "A vs CNAME vs ALIAS records?", a: "A maps a name to an IPv4 address (AAAA to IPv6). CNAME maps a name to another name (an alias); the resolver then resolves that name. It cannot sit at the apex or alongside other records. ALIAS/ANAME (provider feature) behaves like a CNAME at the apex by resolving the target server-side and returning A records." },
            { q: "Why is DNS mostly over UDP?", a: "Queries and responses are small and single request/response. UDP avoids the handshake RTT and connection state on very busy servers. Reliability is handled by client retries. TCP is used when responses are large or truncated and for zone transfers." }
          ]
        }
      ]
    },
    {
      name: "Intermediate",
      desc: "Transport (TCP/UDP, flow and congestion control), HTTP versions, TLS, and core network-layer protocols.",
      topics: [
        {
          id: "tcp-udp",
          title: "TCP vs UDP, 3-way handshake, teardown, TIME_WAIT",
          est: "2 days",
          why: "TCP vs UDP and the 3-way handshake are asked in nearly every CN round. TIME_WAIT and SYN floods show depth.",
          learn: [
            "<b>TCP</b>: connection-oriented, reliable, ordered byte stream, flow and congestion control. <b>UDP</b>: connectionless datagrams, no guarantees, 8 B header, low latency.",
            "Ports and sockets: a connection is the 4-tuple (src IP, src port, dst IP, dst port) plus protocol. Well-known (0-1023) vs ephemeral ports.",
            "TCP header: seq number, ack number, flags (SYN, ACK, FIN, RST, PSH, URG), window, checksum, options (MSS, window scale, SACK, timestamps).",
            "<b>3-way handshake</b>: SYN (seq = x), SYN-ACK (seq = y, ack = x+1), ACK (ack = y+1). Why 3 and not 2: both sides' ISNs must be synchronized and confirmed, and old duplicate SYNs must be rejected.",
            "<b>4-way teardown</b>: FIN, ACK, FIN, ACK. Half-close. RST for abort.",
            "TCP state machine: LISTEN, SYN_SENT, SYN_RCVD, ESTABLISHED, FIN_WAIT_1/2, CLOSE_WAIT, LAST_ACK, <b>TIME_WAIT</b>, CLOSED.",
            "Reliability mechanisms: sequence numbers, cumulative ACKs, retransmission timeout (RTO from SRTT/RTTVAR), fast retransmit (3 duplicate ACKs), SACK.",
            "When to use UDP: DNS, VoIP, video calls, gaming, QUIC, streaming telemetry. Reliability can be built on top (QUIC)."
          ],
          practice: [
            { t: "GFG: TCP 3-Way Handshake Process", p: "GFG", d: "E" },
            { t: "GFG: Differences between TCP and UDP", p: "GFG", d: "E" },
            { t: "GFG: TCP Connection Termination", p: "GFG", d: "E" },
            { t: "Capture a handshake in Wireshark (<code>tcp.flags.syn==1</code>) and read the seq/ack numbers", p: "BUILD", d: "M" },
            { t: "Run <code>ss -tan</code> / <code>netstat -an</code> on a busy machine and explain the TIME_WAIT and CLOSE_WAIT counts", p: "BUILD", d: "M" },
            { t: "GATE PYQs: TCP sequence numbers, wrap-around time (5 questions)", p: "GFG", d: "H" },
            { t: "HPBN Ch. 2-3 (Building blocks of TCP, UDP)", p: "BOOK", d: "M", u: "https://hpbn.co/" }
          ],
          notes: [
            "SYN and FIN each <b>consume one sequence number</b>; pure ACKs do not.",
            "<b>TIME_WAIT</b> lasts <b>2 × MSL</b> (60 s on Linux) on the side that closes <b>first</b>. Purpose: resend the final ACK if lost, and let old duplicate segments die so they do not corrupt a new connection with the same 4-tuple.",
            "Many TIME_WAITs on a client or proxy can exhaust ephemeral ports. Fixes: connection pooling and keep-alive, <code>tcp_tw_reuse</code> (for outgoing connections), more source IPs. Avoid the removed <code>tcp_tw_recycle</code>.",
            "Many <b>CLOSE_WAIT</b> sockets mean <i>your</i> application received a FIN but never called close(): a bug, usually a leaked connection.",
            "SYN flood: half-open connections fill the backlog. Mitigated by <b>SYN cookies</b> (encode state in the ISN).",
            "Sequence-number wrap-around time = 2^32 bytes / bandwidth. At 10 Gbps that is about 3.4 s, which is why PAWS uses timestamps.",
            "UDP header: src port, dst port, length, checksum (8 B). No handshake, no ordering, no congestion control (the app must be careful)."
          ],
          cases: [
            "\"Why not a 2-way handshake?\" The server could not confirm that the client received its ISN, and delayed old SYNs would create ghost connections.",
            "TCP is a <b>byte stream</b>: message boundaries are not preserved, so applications need framing (length prefix, delimiter). UDP preserves datagram boundaries.",
            "TCP head-of-line blocking: one lost segment stalls delivery of all later bytes. HTTP/3 moved to QUIC over UDP partly for this reason.",
            "RST vs FIN: RST aborts immediately (connection refused, or a process crash), while FIN is graceful.",
            "TCP keepalive (the socket option) is different from HTTP keep-alive (connection reuse). A common confusion."
          ],
          qa: [
            { q: "TCP vs UDP?", a: "TCP is connection-oriented (handshake), reliable (ACKs, retransmissions), ordered, and has flow and congestion control. It suits web, email, file transfer and DB connections. UDP is connectionless, best-effort, unordered, with low overhead and latency, and preserves message boundaries. It suits DNS, real-time voice and video, gaming and QUIC." },
            { q: "Explain the TCP 3-way handshake.", a: "The client sends SYN with its initial sequence number x. The server replies SYN-ACK with its ISN y and ack = x+1. The client sends ACK with ack = y+1. Both sides have now agreed on initial sequence numbers and confirmed two-way reachability, and can negotiate options (MSS, window scaling, SACK). Data can flow from the third packet (TFO allows data in the SYN)." },
            { q: "What is TIME_WAIT and why does it exist?", a: "The state the actively closing side enters after sending the last ACK, lasting 2×MSL. It lets the side retransmit the final ACK if the peer's FIN is retransmitted, and ensures delayed segments from the old connection expire before the same 4-tuple is reused. Too many TIME_WAITs on high-churn clients exhaust ephemeral ports; use connection pooling." },
            { q: "How does TCP guarantee reliable delivery?", a: "Sequence numbers for ordering and duplicate detection, a checksum for corruption, cumulative ACKs (plus SACK), retransmission on timeout (adaptive RTO) or on 3 duplicate ACKs (fast retransmit), and flow and congestion control so the receiver and network are not overwhelmed." }
          ]
        },
        {
          id: "tcp-flow-congestion",
          title: "TCP flow control & congestion control: sliding window, slow start, AIMD",
          est: "2 days",
          why: "Common follow-up to TCP basics in product companies. Window-size and throughput numericals appear in GATE-style tests.",
          learn: [
            "<b>Flow control</b> (do not overwhelm the <i>receiver</i>): receive window (rwnd) advertised in each ACK, zero window and window probes, window scaling.",
            "<b>Sliding window</b> protocols: Stop-and-Wait, <b>Go-Back-N</b>, <b>Selective Repeat</b>, window-size constraints with sequence-number space.",
            "<b>Congestion control</b> (do not overwhelm the <i>network</i>): congestion window (cwnd). Effective window = min(cwnd, rwnd).",
            "<b>Slow start</b> (cwnd doubles each RTT until ssthresh), <b>congestion avoidance</b> (+1 MSS per RTT), <b>AIMD</b>.",
            "Loss reactions: timeout sets ssthresh = cwnd/2 and cwnd = 1 MSS (Tahoe/Reno). 3 duplicate ACKs trigger fast retransmit and <b>fast recovery</b> (Reno: cwnd = ssthresh).",
            "Modern algorithms: <b>CUBIC</b> (Linux default) and <b>BBR</b> (model-based, bandwidth × RTT). Bufferbloat.",
            "Bandwidth-delay product (BDP) and why throughput ≤ window / RTT. Long fat networks need window scaling.",
            "Nagle's algorithm and delayed ACK interaction, and <code>TCP_NODELAY</code> for latency-sensitive apps."
          ],
          practice: [
            { t: "Numerical: link 10 Mbps, RTT 80 ms; find the window size for full utilization (BDP)", p: "GFG", d: "E" },
            { t: "Numerical: Stop-and-Wait efficiency with Tt and Tp (η = 1 / (1 + 2a))", p: "GFG", d: "M" },
            { t: "Numerical: Go-Back-N / Selective Repeat with k-bit sequence numbers, max window sizes", p: "GFG", d: "M" },
            { t: "Numerical: trace cwnd over RTTs with ssthresh = 16, a timeout at RTT 9 (Tahoe vs Reno)", p: "GFG", d: "H" },
            { t: "GATE PYQs: sliding window and congestion control (10 questions)", p: "GFG", d: "H" },
            { t: "Kurose & Ross Sec. 3.4-3.7 (reliable data transfer, TCP, congestion control)", p: "BOOK", d: "M" },
            { t: "HPBN Ch. 2 (TCP slow start, BDP, head-of-line blocking)", p: "BOOK", d: "M", u: "https://hpbn.co/building-blocks-of-tcp/" }
          ],
          notes: [
            "<b>BDP = bandwidth × RTT</b>. You need window ≥ BDP for full utilization. Max throughput ≈ <b>window / RTT</b>. Example: 64 KB window, 100 ms RTT gives about 5.2 Mbps whatever the link speed.",
            "Stop-and-Wait efficiency <b>η = Tt / (Tt + 2Tp) = 1 / (1 + 2a)</b> where a = Tp/Tt. With window W, η = min(1, W / (1 + 2a)).",
            "With k-bit sequence numbers: Go-Back-N sender window ≤ <b>2^k - 1</b>, receiver window = 1. Selective Repeat window ≤ <b>2^(k-1)</b> for both sender and receiver.",
            "Slow start is exponential (1, 2, 4, 8 MSS per RTT) up to ssthresh, then linear growth. \"Slow\" means it starts small, not that it grows slowly.",
            "Tahoe: on any loss cwnd = 1. Reno: on 3 duplicate ACKs cwnd = ssthresh = cwnd/2 (fast recovery), on timeout cwnd = 1.",
            "A loss on a timeout is treated as worse than duplicate ACKs, because duplicate ACKs prove segments are still getting through.",
            "Initial cwnd is 10 MSS in modern Linux (RFC 6928), about 14 KB, which is why keeping critical HTML under ~14 KB helps first paint."
          ],
          cases: [
            "Do not mix up flow control (rwnd, receiver-driven) and congestion control (cwnd, sender-inferred from loss or delay).",
            "TCP on lossy wireless links treats random loss as congestion and over-throttles. BBR or QUIC help.",
            "Nagle plus delayed ACK can add about 40-200 ms latency for small writes. Set TCP_NODELAY for RPC and gaming.",
            "In GBN numericals, a lost packet means retransmitting it <b>and all later</b> packets in the window. SR retransmits only the lost one.",
            "Throughput formula questions: check whether the window is given in bytes or segments, and whether RTT includes transmission time."
          ],
          qa: [
            { q: "Flow control vs congestion control?", a: "Flow control protects the <b>receiver</b>: the receiver advertises its free buffer (rwnd) and the sender never has more unacknowledged data than that. Congestion control protects the <b>network</b>: the sender keeps a congestion window (cwnd) adjusted from loss or delay signals. The sender's effective window is min(rwnd, cwnd)." },
            { q: "Explain slow start and congestion avoidance.", a: "A new connection starts with a small cwnd (about 10 MSS) and increases it by 1 MSS per ACK, which doubles it every RTT (slow start) until it reaches ssthresh or sees loss. After that it grows by about 1 MSS per RTT (congestion avoidance, additive increase). On loss it cuts back (multiplicative decrease): halving on 3 duplicate ACKs, or resetting to 1 MSS on timeout. That is AIMD." },
            { q: "Go-Back-N vs Selective Repeat?", a: "Both are sliding-window ARQ. <b>Go-Back-N</b>: the receiver accepts only in-order packets and sends cumulative ACKs; on loss the sender resends that packet and everything after it. It is simple, but wastes bandwidth. <b>Selective Repeat</b>: the receiver buffers out-of-order packets and ACKs each one, and the sender resends only the missing ones. It is more efficient, but needs buffers and window ≤ half the sequence space." },
            { q: "What is the bandwidth-delay product?", a: "Link bandwidth × RTT: the amount of data that can be in flight. To use the link fully, the TCP window must be at least the BDP. Example: 1 Gbps × 50 ms = 6.25 MB, which needs window scaling beyond 64 KB." }
          ]
        },
        {
          id: "http",
          title: "HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC), methods, status codes, headers, cookies, caching",
          est: "3 days",
          why: "Daily-work networking for any backend or AI engineer building APIs. Asked as theory (versions, idempotency) and practically (which status code, caching strategy).",
          learn: [
            "Request and response structure: method, path, version, headers, body. Statelessness.",
            "<b>Methods</b>: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS. <b>Safe</b> vs <b>idempotent</b> methods.",
            "<b>Status codes</b>: 1xx, 2xx (200, 201, 202, 204), 3xx (301, 302, 304, 307, 308), 4xx (400, 401, 403, 404, 405, 409, 422, 429), 5xx (500, 502, 503, 504).",
            "Headers: Host, Content-Type, Content-Length, Transfer-Encoding: chunked, Accept, Authorization, User-Agent, Content-Encoding.",
            "<b>Cookies</b>: Set-Cookie attributes (HttpOnly, Secure, SameSite=Lax/Strict/None, Domain, Path, Max-Age). Sessions vs tokens (JWT).",
            "<b>Caching</b>: Cache-Control (max-age, no-cache, no-store, private, public, s-maxage, immutable), ETag/If-None-Match, Last-Modified/If-Modified-Since, giving 304. Vary.",
            "<b>Keep-alive</b> and persistent connections, pipelining (and why it failed).",
            "<b>HTTP/2</b>: binary framing, multiplexed streams over one TCP connection, HPACK header compression, server push (deprecated). <b>HTTP/3</b>: over <b>QUIC</b> (UDP), no TCP head-of-line blocking, 1-RTT/0-RTT, connection migration, QPACK."
          ],
          practice: [
            { t: "GFG: HTTP status codes / HTTP methods", p: "GFG", d: "E" },
            { t: "GFG: Difference between HTTP/1.1 and HTTP/2", p: "GFG", d: "E" },
            { t: "Use <code>curl -I</code> and <code>curl -H 'If-None-Match: ...'</code> to observe ETag and 304 behaviour on a real site", p: "BUILD", d: "E" },
            { t: "Build a FastAPI endpoint returning proper 201/204/404/409/422 codes and ETag-based caching", p: "BUILD", d: "M" },
            { t: "Check a site's protocol in DevTools (h2 / h3) and compare waterfalls", p: "BUILD", d: "E" },
            { t: "MDN: HTTP caching guide", p: "DOC", d: "M", u: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching" },
            { t: "HPBN Ch. 11-12 (HTTP/1.x, HTTP/2)", p: "BOOK", d: "M", u: "https://hpbn.co/" },
            { t: "Cloudflare Learning: What is HTTP/3?", p: "DOC", d: "E", u: "https://www.cloudflare.com/learning/performance/what-is-http3/" }
          ],
          notes: [
            "Safe (no state change): GET, HEAD, OPTIONS. Idempotent (same effect if repeated): those plus <b>PUT and DELETE</b>. <b>POST is neither</b>, and PATCH is not guaranteed idempotent.",
            "<b>401</b> = not authenticated (\"who are you?\"). <b>403</b> = authenticated but not allowed. <b>404</b> may also hide a 403.",
            "<b>502</b> Bad Gateway: the upstream returned an invalid response or refused the connection. <b>503</b>: overloaded or in maintenance (add Retry-After). <b>504</b>: the upstream timed out.",
            "301/308 are permanent, 302/307 temporary. 307 and 308 <b>preserve the method and body</b>; 301 and 302 may change POST to GET.",
            "<code>no-cache</code> means \"store but revalidate every time\". <code>no-store</code> means \"never store\". People mix these up.",
            "Static asset strategy: fingerprinted filenames plus <code>Cache-Control: public, max-age=31536000, immutable</code>. HTML: <code>no-cache</code> with an ETag.",
            "HTTP/1.1 head-of-line blocking happens at the HTTP level, so browsers open about 6 connections per host. HTTP/2 fixes it at the HTTP level, but TCP-level HOL blocking remains. HTTP/3 removes that with independent QUIC streams.",
            "LLM streaming responses use chunked transfer encoding / SSE (<code>text/event-stream</code>) over HTTP/1.1 or HTTP/2."
          ],
          cases: [
            "Retrying a POST can double-charge. Use <b>idempotency keys</b> (the Stripe pattern) for safe retries.",
            "Do not return 200 with an error body for failures. Clients, monitoring and caches rely on status codes.",
            "HTTP/2 multiplexing means domain sharding and sprite tricks from the HTTP/1 era become anti-patterns.",
            "Cookies without SameSite or HttpOnly are open to CSRF and XSS cookie theft. SameSite=None requires Secure.",
            "QUIC runs over UDP 443, and some corporate firewalls block it. Browsers fall back to HTTP/2 over TCP.",
            "422 vs 400: 400 means malformed syntax, 422 means well-formed but semantically invalid (FastAPI uses 422 for validation errors)."
          ],
          qa: [
            { q: "Difference between HTTP/1.1, HTTP/2 and HTTP/3?", a: "<b>HTTP/1.1</b>: text-based, one outstanding request per connection (pipelining unused), so browsers open several connections; head-of-line blocking at the request level. <b>HTTP/2</b>: binary framing, many concurrent streams multiplexed over one TCP connection, HPACK header compression; but TCP packet loss still stalls all streams. <b>HTTP/3</b>: runs over QUIC on UDP with TLS 1.3 built in, independent streams with no TCP HOL blocking, faster 1-RTT/0-RTT setup, and connection migration across networks." },
            { q: "What is idempotency and which methods are idempotent?", a: "An operation is idempotent if applying it several times has the same effect on server state as applying it once. GET, HEAD, OPTIONS, PUT and DELETE are idempotent by spec. POST is not, and PATCH is not guaranteed. It matters for safe retries: make POST retry-safe with idempotency keys." },
            { q: "How does HTTP caching work?", a: "The server sends <code>Cache-Control</code> (max-age, public/private, no-cache, no-store) to say how long a response is fresh. When it goes stale, the client revalidates with <code>If-None-Match</code> (ETag) or <code>If-Modified-Since</code>; if unchanged, the server returns <b>304 Not Modified</b> with no body. Shared caches (CDN) honour s-maxage and Vary." },
            { q: "Cookies vs sessions vs JWT?", a: "A cookie is a client-side storage and transport mechanism sent automatically per domain. A server session stores state server-side and keys it by a session-id cookie, so revocation is easy. A JWT is a signed, self-contained token (in a cookie or Authorization header), so validation is stateless, but revocation is hard (use short expiry plus refresh tokens)." },
            { q: "What is the difference between 502, 503 and 504?", a: "All are proxy/gateway-side errors. 502 means the upstream returned an invalid response or the connection failed (app crashed). 503 means the service is unavailable (overloaded, maintenance, no healthy backends). 504 means the upstream did not respond within the proxy's timeout." }
          ]
        },
        {
          id: "tls",
          title: "HTTPS & TLS handshake, certificates, symmetric vs asymmetric crypto",
          est: "2 days",
          why: "\"How does HTTPS work?\" is a top-5 networking question, and certificate and mTLS issues are common in production.",
          learn: [
            "Goals: <b>confidentiality, integrity, authentication</b>.",
            "<b>Symmetric</b> (AES-GCM, ChaCha20: fast, shared key) vs <b>asymmetric</b> (RSA, ECDSA, ECDH: key exchange and signatures, slow). TLS uses asymmetric crypto to agree a symmetric session key.",
            "Hashing vs encryption vs signing. MAC/HMAC, AEAD.",
            "<b>TLS 1.2 handshake</b> (2-RTT) vs <b>TLS 1.3</b> (1-RTT, 0-RTT resumption, only forward-secret ECDHE suites, encrypted certificate).",
            "<b>Certificates</b>: X.509, the chain of trust (leaf, intermediate, root CA in the trust store), SAN, expiry, revocation (CRL, OCSP, OCSP stapling), Certificate Transparency.",
            "<b>Forward secrecy</b> via ephemeral Diffie-Hellman: a stolen private key cannot decrypt past traffic.",
            "SNI, ALPN, session resumption (tickets, PSK).",
            "<b>mTLS</b> (client certificates) for service-to-service auth (service meshes, Istio). TLS termination at the load balancer. Let's Encrypt with ACME."
          ],
          practice: [
            { t: "Cloudflare Learning: What happens in a TLS handshake?", p: "DOC", d: "E", u: "https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/" },
            { t: "GFG: Symmetric vs Asymmetric Key Cryptography", p: "GFG", d: "E" },
            { t: "Run <code>openssl s_client -connect example.com:443 -servername example.com</code> and read the chain, protocol and cipher", p: "BUILD", d: "M" },
            { t: "Create a local CA, sign a server cert, and serve HTTPS from Python/Nginx", p: "BUILD", d: "H" },
            { t: "Capture a TLS 1.3 handshake in Wireshark and identify ClientHello (SNI, ALPN, key_share)", p: "BUILD", d: "M" },
            { t: "HPBN Ch. 4 (Transport Layer Security)", p: "BOOK", d: "M", u: "https://hpbn.co/transport-layer-security-tls/" }
          ],
          notes: [
            "TLS 1.3 flow: <b>ClientHello</b> (supported ciphers, key_share, SNI, ALPN), then <b>ServerHello</b> (chosen cipher and key_share), {EncryptedExtensions, Certificate, CertificateVerify, Finished}, then client <b>Finished</b>. Application data flows after 1 RTT.",
            "Both sides derive the same secret from ECDHE shares and never send it. The certificate plus CertificateVerify signature proves the server owns the private key matching the certificate.",
            "Browser certificate check: the chain leads to a trusted root, the hostname matches the SAN, it is within validity dates, it is not revoked, and (Chrome) it has CT logs.",
            "Asymmetric crypto is about 100-1000× slower than symmetric, so it is used only for the handshake.",
            "0-RTT data can be <b>replayed</b>, so only send idempotent requests in it.",
            "HTTPS hides the path, query, headers and body. The <b>hostname leaks</b> via SNI and DNS (ECH and DoH fix this). The IP is always visible."
          ],
          cases: [
            "\"Is HTTPS encrypted with the server's public key?\" Not in modern TLS. RSA key transport was removed in 1.3. The keys come from ephemeral (EC)DHE, and the cert key only signs.",
            "Missing intermediate certificate: works in some browsers (AIA fetching or cache) and fails in curl, Java and mobile clients.",
            "TLS termination at the LB means traffic from LB to backend is plaintext unless re-encrypted. Mention this for compliance.",
            "Self-signed certificates in dev, and <code>verify=False</code> left in production code, are a classic security finding.",
            "Clock skew on a server or client causes \"certificate not yet valid\" errors."
          ],
          qa: [
            { q: "How does HTTPS work?", a: "HTTP runs over TLS. During the TLS handshake the client and server agree on a cipher suite, exchange ephemeral Diffie-Hellman key shares to derive a shared symmetric session key, and the server proves its identity with a certificate chained to a trusted CA plus a signature over the handshake. All HTTP data is then encrypted and integrity-protected with fast symmetric AEAD (AES-GCM)." },
            { q: "Symmetric vs asymmetric encryption, and why use both?", a: "Symmetric uses one shared key. It is fast and suits bulk data, but has a key-distribution problem. Asymmetric uses a public/private pair. It solves key exchange and enables signatures, but is slow. TLS uses asymmetric crypto (ECDHE plus certificate signatures) to establish and authenticate a symmetric session key, then encrypts data symmetrically." },
            { q: "What is a certificate authority and the chain of trust?", a: "A CA is a trusted entity that signs certificates binding a public key to a domain after validating ownership. Browsers and OSes ship a set of trusted root CAs. Servers present leaf plus intermediate certificates. The client verifies each signature up to a trusted root and checks hostname, validity and revocation." },
            { q: "What is forward secrecy?", a: "A property where compromise of the server's long-term private key does not expose past sessions, because each session key came from an ephemeral Diffie-Hellman exchange that is discarded afterwards. It is mandatory in TLS 1.3." }
          ]
        },
        {
          id: "network-layer-protocols",
          title: "ARP, DHCP, ICMP & routing basics (static, RIP, OSPF, BGP)",
          est: "2 days",
          why: "Supporting protocols that appear in the URL question and in standalone questions (\"how does a device get an IP?\", \"how does ping work?\"). Routing intuition helps with cloud networking.",
          learn: [
            "<b>ARP</b>: IP to MAC on the local link. Broadcast request, unicast reply, ARP cache. Gratuitous ARP. ARP spoofing.",
            "<b>DHCP</b>: <b>DORA</b> (Discover, Offer, Request, Acknowledge) over UDP 67/68. Lease, renewal, relay agent. What you get: IP, mask, gateway, DNS.",
            "<b>ICMP</b>: echo request/reply (ping), destination unreachable, time exceeded (traceroute), fragmentation needed (PMTUD).",
            "Forwarding vs routing: the forwarding table, <b>longest prefix match</b>, default route.",
            "Static vs dynamic routing. Interior (IGP) vs exterior (EGP) protocols.",
            "<b>RIP</b>: distance vector, hop count (max 15), Bellman-Ford, count-to-infinity, split horizon and poison reverse.",
            "<b>OSPF</b>: link state, Dijkstra, areas, fast convergence.",
            "<b>BGP</b>: path vector between autonomous systems, policy-based. BGP hijacks and leaks (real outages)."
          ],
          practice: [
            { t: "GFG: How ARP works", p: "GFG", d: "E" },
            { t: "GFG: DHCP (DORA process)", p: "GFG", d: "E" },
            { t: "GFG: Distance Vector vs Link State Routing", p: "GFG", d: "E" },
            { t: "Numerical: longest-prefix-match on a forwarding table (GATE style, 3 questions)", p: "GFG", d: "M" },
            { t: "Numerical: distance-vector table update after one round", p: "GFG", d: "M" },
            { t: "Run <code>arp -a</code>, <code>ipconfig /all</code> or <code>ip addr</code>, then release and renew DHCP and observe it in Wireshark", p: "BUILD", d: "M" },
            { t: "Network Delay Time (Dijkstra = OSPF intuition)", p: "LC", d: "M", u: "https://leetcode.com/problems/network-delay-time/" },
            { t: "Cloudflare Learning: What is BGP? / BGP hijacking", p: "DOC", d: "E", u: "https://www.cloudflare.com/learning/security/glossary/what-is-bgp/" }
          ],
          notes: [
            "To send to an IP outside the subnet, the host ARPs for the <b>default gateway's MAC</b>, not the destination's. The destination IP stays, and the destination MAC is the router.",
            "DHCP Discover is a broadcast from 0.0.0.0 to 255.255.255.255, because the client has no IP yet. A relay agent forwards it across subnets.",
            "Longest prefix match: among matching routes, the one with the longest mask wins (/24 beats /16 beats /0 default).",
            "Distance vector means \"tell your neighbours about the whole world\" (RIP). Link state means \"tell the whole world about your neighbours\" (OSPF).",
            "RIP: max 15 hops, 16 = infinity, updates every 30 s, slow convergence and count-to-infinity. Fixes: split horizon, poison reverse, hold-down timers.",
            "BGP runs over <b>TCP 179</b>. OSPF runs directly over IP (protocol 89). RIP uses UDP 520.",
            "Ping uses ICMP, so it has <b>no port</b>. Many clouds block ICMP, so a failed ping does not mean the host is down."
          ],
          cases: [
            "\"Does ping use TCP or UDP?\" Neither: ICMP, which is carried directly in IP.",
            "Blocking all ICMP breaks Path MTU Discovery (black-hole connections where large packets hang).",
            "ARP spoofing enables MITM on a LAN. Mitigations: dynamic ARP inspection, static entries, TLS everywhere.",
            "Two DHCP servers on one LAN (a rogue router) cause random IP conflicts. A classic office outage story.",
            "BGP has no built-in origin validation. RPKI is the fix. Mention the Facebook 2021 outage (BGP withdrawal cut off its DNS)."
          ],
          qa: [
            { q: "How does a device get an IP address when it joins a network?", a: "Through DHCP's DORA: the client broadcasts <b>Discover</b>, servers reply with an <b>Offer</b> (IP, mask, gateway, DNS, lease), the client broadcasts a <b>Request</b> for one offer, and the server confirms with an <b>Ack</b>. The client renews at 50% of the lease (T1). IPv6 can also autoconfigure via SLAAC." },
            { q: "What is ARP and how does it work?", a: "Address Resolution Protocol maps an IPv4 address to a MAC address on the local network. The host broadcasts \"who has 192.168.1.1? tell me\". The owner replies with its MAC by unicast, and the host caches the mapping. It is needed because frames on a LAN are delivered by MAC address." },
            { q: "Distance vector vs link state routing?", a: "Distance vector (RIP): each router shares its distance table with neighbours and uses Bellman-Ford. It is simple, but converges slowly and suffers count-to-infinity. Link state (OSPF): each router floods its link information to all routers, builds the full topology and runs Dijkstra. It converges fast and scales with areas, at the cost of more CPU and memory." },
            { q: "How do ping and traceroute work?", a: "Ping sends ICMP Echo Request and measures the Echo Reply round-trip time. Traceroute sends packets (UDP or ICMP) with TTL = 1, 2, 3... Each router that drops a packet at TTL 0 returns ICMP Time Exceeded, revealing its address hop by hop until the destination replies." }
          ]
        }
      ]
    },
    {
      name: "Advanced",
      desc: "Real-time web transports, web security, CDNs and load balancers, and hands-on tooling. This overlaps with system design.",
      topics: [
        {
          id: "realtime-web",
          title: "WebSockets, Server-Sent Events, long polling",
          est: "1-2 days",
          why: "Asked in system-design-flavoured rounds (chat, notifications, live dashboards), and directly relevant to AI work: LLM token streaming is SSE.",
          learn: [
            "<b>Short polling</b> (periodic requests, simple but wasteful) vs <b>long polling</b> (the server holds the request until data or timeout).",
            "<b>Server-Sent Events (SSE)</b>: one long-lived HTTP response, <code>text/event-stream</code>, server to client only, auto-reconnect with Last-Event-ID, text only.",
            "<b>WebSockets</b>: HTTP Upgrade handshake (101 Switching Protocols), full-duplex frames over TCP, binary or text, ws:// and wss://.",
            "WebTransport / WebRTC (peer-to-peer media over UDP, STUN/TURN) at a high level.",
            "Scaling persistent connections: sticky sessions, connection limits, pub/sub fan-out (Redis, Kafka), heartbeats or ping-pong, reconnection with back-off.",
            "Proxy and LB concerns: idle timeouts, buffering (disable for SSE: <code>X-Accel-Buffering: no</code>), HTTP/2 and SSE connection limits.",
            "Choosing: notifications or token streams mean SSE; chat, collaboration or games mean WebSocket; rare updates or simple infrastructure mean long polling."
          ],
          practice: [
            { t: "Build a FastAPI SSE endpoint that streams LLM tokens and consume it with EventSource / fetch", p: "BUILD", d: "M" },
            { t: "Build a WebSocket chat room with FastAPI + Redis pub/sub across 2 workers", p: "BUILD", d: "H" },
            { t: "Inspect the WebSocket upgrade handshake in DevTools (101, Sec-WebSocket-Key/Accept)", p: "BUILD", d: "E" },
            { t: "MDN: Using server-sent events", p: "DOC", d: "E", u: "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events" },
            { t: "HPBN Ch. 16-17 (Server-Sent Events, WebSocket)", p: "BOOK", d: "M", u: "https://hpbn.co/" },
            { t: "GFG: Difference between WebSocket and HTTP", p: "GFG", d: "E" }
          ],
          notes: [
            "SSE wire format: lines <code>data: ...</code>, optional <code>event:</code>, <code>id:</code>, <code>retry:</code>, events separated by a <b>blank line</b>. OpenAI and Anthropic streaming APIs use this.",
            "SSE over HTTP/1.1 is limited to about 6 connections per domain per browser. HTTP/2 removes that limit through multiplexing.",
            "A WebSocket starts as HTTP GET with <code>Upgrade: websocket</code>. The server answers <b>101</b> with Sec-WebSocket-Accept (SHA-1 of the key plus a GUID). After that it is no longer HTTP.",
            "WebSockets are stateful: the LB must keep a connection pinned to one server for its lifetime. Broadcasting needs a pub/sub backplane.",
            "Long polling adds latency of one RTT per message plus reconnect overhead, but works everywhere (corporate proxies).",
            "Heartbeats detect dead connections (NAT and LB idle timeouts are often 60-350 s)."
          ],
          cases: [
            "Nginx or an API gateway buffering responses breaks SSE (tokens arrive all at once). Disable proxy buffering.",
            "WebSocket auth: browsers cannot set custom headers on the WebSocket constructor. Use cookies, a token in the first message, or a short-lived token in the query string (beware logs).",
            "Choosing WebSockets for one-way server pushes is over-engineering. SSE is simpler, works over plain HTTP and reconnects automatically.",
            "Mobile networks drop idle connections. Always implement reconnect with jittered exponential back-off.",
            "Deployments disconnect every WebSocket. Plan graceful draining and client resume."
          ],
          qa: [
            { q: "WebSockets vs SSE vs long polling?", a: "<b>Long polling</b>: the client sends a request and the server responds when data arrives, then the client re-requests. Works everywhere but has overhead. <b>SSE</b>: one long-lived HTTP response streaming server-to-client text events, with auto-reconnect. Simple, proxy-friendly, one-way. <b>WebSocket</b>: an upgraded full-duplex TCP channel for low-latency two-way messaging (chat, games, collaboration). More complex to scale and secure." },
            { q: "How would you stream LLM responses to a browser?", a: "Use SSE: the endpoint returns <code>Content-Type: text/event-stream</code> and writes <code>data: {token}\\n\\n</code> for each chunk from the model's streaming API, with proxy buffering disabled and a heartbeat for long generations. The client reads it with EventSource or a fetch ReadableStream (needed for POST bodies). Use WebSockets only if you need two-way messaging mid-stream (cancel, tool calls)." },
            { q: "How do you scale WebSocket connections to millions of users?", a: "Run many stateless-logic gateway nodes holding connections (tuned for file descriptors and memory, async I/O), use an L4 LB or consistent hashing for stickiness, a pub/sub backplane (Redis, Kafka, NATS) to route messages to the node holding each user, a presence store, heartbeats, and graceful reconnect with resume tokens." }
          ]
        },
        {
          id: "web-security",
          title: "Network & web security: firewalls, VPN, CORS, CSRF, XSS, DDoS",
          est: "2 days",
          why: "CORS errors and CSRF/XSS are everyday engineering issues and common interview questions. Security awareness is expected for anyone shipping APIs.",
          learn: [
            "<b>Firewalls</b>: packet filter (stateless), stateful, application-layer (WAF). Security groups vs NACLs in AWS.",
            "<b>VPN</b>: IPsec vs TLS/SSL VPN vs WireGuard. Tunnelling and encapsulation. Site-to-site vs remote access. Zero-trust as the modern alternative.",
            "<b>Same-origin policy</b>: origin = scheme + host + port.",
            "<b>CORS</b>: simple vs preflighted requests (OPTIONS), Access-Control-Allow-Origin/Methods/Headers/Credentials, and why <code>*</code> plus credentials is disallowed.",
            "<b>CSRF</b>: a forged cross-site request rides on the victim's cookies. Defences: SameSite cookies, CSRF tokens, Origin/Referer checks.",
            "<b>XSS</b>: stored, reflected, DOM-based. Defences: output encoding, CSP, HttpOnly cookies, sanitization.",
            "Other attacks: SQL injection (parameterized queries), MITM, ARP or DNS spoofing, SSRF (very relevant for LLM agents fetching URLs), clickjacking (X-Frame-Options / frame-ancestors).",
            "<b>DDoS</b>: volumetric (UDP/DNS amplification), protocol (SYN flood), application layer (HTTP flood). Mitigations: anycast scrubbing, rate limiting, CDN/WAF, SYN cookies, autoscaling."
          ],
          practice: [
            { t: "Reproduce a CORS error between a localhost:3000 front end and a localhost:8000 FastAPI backend, then fix it with CORSMiddleware", p: "BUILD", d: "E" },
            { t: "PortSwigger Web Security Academy: CORS, CSRF and XSS labs (apprentice level)", p: "DOC", d: "M", u: "https://portswigger.net/web-security" },
            { t: "OWASP Top 10: read and map each item to a defence in your stack", p: "DOC", d: "M", u: "https://owasp.org/www-project-top-ten/" },
            { t: "GFG: Difference between Firewall and VPN / Types of firewalls", p: "GFG", d: "E" },
            { t: "Cloudflare Learning: What is a DDoS attack? + DNS amplification", p: "DOC", d: "E", u: "https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/" },
            { t: "Add an SSRF guard to an LLM tool that fetches URLs (block private IP ranges and metadata 169.254.169.254)", p: "BUILD", d: "H" }
          ],
          notes: [
            "<b>CORS is enforced by the browser</b>, not the server. The server only sends headers. curl and Postman ignore CORS. CORS relaxes the SOP; it does not protect your API.",
            "Preflight is triggered by non-simple methods (PUT, DELETE, PATCH), custom headers (Authorization, X-*), or a Content-Type other than form or text/plain (e.g. application/json).",
            "<b>CSRF exploits the site's trust in the browser</b> (automatic cookies). <b>XSS exploits the user's trust in the site</b> (injected script runs as the site).",
            "SameSite=Lax (the modern browser default) blocks cookies on cross-site POSTs, which removes most CSRF. Token auth in an Authorization header is not CSRF-prone.",
            "XSS defeats CSRF tokens, because the script can read them. Fix XSS first. A CSP like <code>script-src 'self'</code> blocks inline injection.",
            "Amplification factor: a small spoofed request causes a large response to the victim (DNS ANY, NTP monlist, memcached reached 50,000×).",
            "Stateless firewall / NACL: needs explicit return rules (ephemeral ports). Stateful / security group: return traffic is allowed automatically."
          ],
          cases: [
            "\"Fixing\" CORS with <code>Access-Control-Allow-Origin: *</code> on an authenticated API: credentials will not be sent, and reflecting any Origin with credentials is a vulnerability.",
            "CORS does not prevent CSRF. A simple form POST does not need a preflight, and the side effect happens even if the response is unreadable.",
            "Storing JWTs in localStorage exposes them to XSS. HttpOnly cookies expose them to CSRF, so add SameSite. There are trade-offs both ways.",
            "LLM-specific: prompt injection leading to tool calls that cause SSRF or data exfiltration. Apply network egress allowlists to agents.",
            "A VPN encrypts traffic up to the VPN endpoint, not end to end to the website."
          ],
          qa: [
            { q: "What is CORS and why do CORS errors happen?", a: "Browsers enforce the same-origin policy: a script from origin A cannot read responses from origin B. CORS lets B opt in by returning headers like <code>Access-Control-Allow-Origin: A</code>. For non-simple requests the browser first sends an OPTIONS preflight. Errors occur when the server does not return matching headers. Fix it on the server by allowlisting the exact origins, methods and headers (and Allow-Credentials if cookies are needed)." },
            { q: "CSRF vs XSS?", a: "<b>CSRF</b>: a malicious site makes the victim's browser send an authenticated request (cookies attached automatically) to your site, e.g. a transfer. Defend with SameSite cookies, CSRF tokens and Origin checks. <b>XSS</b>: an attacker injects script that runs in your site's origin and can steal data or act as the user. Defend with output encoding, sanitization, CSP and HttpOnly cookies." },
            { q: "How do you mitigate a DDoS attack?", a: "Absorb and filter at the edge: an anycast CDN or scrubbing provider (Cloudflare, AWS Shield), rate limiting and WAF rules for L7 floods, SYN cookies for SYN floods, no open resolvers or amplifiers, autoscaling with caching to soak up load, and no exposed origin IPs. Detect with traffic baselines." },
            { q: "Stateful vs stateless firewall?", a: "A stateless (packet-filter) firewall evaluates each packet independently against rules (IP, port, protocol), so return traffic needs explicit rules. A stateful firewall tracks connections, so reply packets of allowed connections pass automatically. AWS security groups are stateful; NACLs are stateless." }
          ]
        },
        {
          id: "cdn-lb-proxy",
          title: "CDNs, anycast, load balancers (L4 vs L7), reverse proxies",
          est: "2 days",
          why: "The bridge from networking to system design. \"L4 vs L7 load balancer\" and \"how does a CDN work?\" are standard, and AI inference serving relies on LBs and gateways.",
          learn: [
            "<b>Forward proxy</b> (client side: corporate proxy, VPN-like) vs <b>reverse proxy</b> (server side: Nginx, Envoy, HAProxy) and their jobs: TLS termination, caching, compression, routing, auth, rate limiting.",
            "<b>L4 load balancer</b>: routes by IP and port (TCP/UDP), fast, protocol-agnostic, no content awareness (AWS NLB).",
            "<b>L7 load balancer</b>: understands HTTP: path or host routing, header-based routing, cookies, retries, TLS termination, WAF (AWS ALB, Nginx, Envoy).",
            "LB algorithms: round robin, weighted, least connections, least response time, IP hash, consistent hashing, power of two choices.",
            "Health checks (active vs passive), connection draining, sticky sessions and their downsides.",
            "<b>CDN</b>: edge PoPs, cache hit or miss to the origin, TTLs and purge/invalidation, origin shield, dynamic acceleration, edge compute.",
            "<b>Anycast</b>: the same IP announced from many locations via BGP, so users reach the nearest PoP. Used by DNS root servers, CDNs and DDoS absorption.",
            "Global load balancing: GeoDNS vs anycast. API gateways vs service meshes (pointer to system design)."
          ],
          practice: [
            { t: "Cloudflare Learning: What is a CDN? / What is anycast? / What is load balancing?", p: "DOC", d: "E", u: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/" },
            { t: "Configure Nginx as a reverse proxy + round-robin LB over 2 FastAPI instances with health checks", p: "BUILD", d: "M" },
            { t: "Add path-based routing (/api to the app, /static to cache) and gzip in Nginx", p: "BUILD", d: "M" },
            { t: "GFG: Layer 4 vs Layer 7 Load Balancing", p: "GFG", d: "E" },
            { t: "Read the AWS docs comparing ALB vs NLB vs GLB", p: "DOC", d: "E" },
            { t: "Explain how you would load-balance GPU inference servers with variable request lengths (least-outstanding-requests)", p: "BUILD", d: "H" }
          ],
          notes: [
            "L4 LB: sees the 5-tuple and forwards packets or connections (often via NAT or DSR). It cannot route by URL and is very fast. L7 LB: terminates the client connection, parses HTTP, and opens its own connection upstream.",
            "Least-connections or least-outstanding-requests beats round robin when request costs vary a lot (LLM inference, file uploads).",
            "Sticky sessions break even distribution and failover. Prefer stateless apps with shared session stores.",
            "CDN cache key = URL plus selected headers (Vary). Fingerprinted asset URLs avoid the need to purge.",
            "Anycast routes to the topologically nearest PoP (BGP shortest AS path), not always the geographically nearest.",
            "Reverse proxy benefits: hides backend IPs, terminates TLS once, handles slow clients (buffering), adds caching, auth and rate limiting at the edge.",
            "Consistent hashing in LBs keeps cache affinity when backends are added or removed (only about 1/N of keys move)."
          ],
          cases: [
            "An L7 LB with HTTP/1.1 upstreams can become a bottleneck. HTTP/2 or gRPC needs L7 awareness to balance per request (L4 balances per connection, so long-lived gRPC connections get pinned).",
            "Health checks that only test \"process is up\" miss dependency failures. Use a readiness endpoint, and avoid cascading failure when the DB is down.",
            "CDN caching personalised responses (Set-Cookie, Authorization) leaks data. Use <code>Cache-Control: private</code>.",
            "LB idle timeout shorter than a long LLM request or SSE stream kills the connection. Tune timeouts or send heartbeats.",
            "Client IP is lost behind proxies. Use X-Forwarded-For or the PROXY protocol, and trust it only from your own proxies."
          ],
          qa: [
            { q: "L4 vs L7 load balancer?", a: "An <b>L4</b> LB balances at the transport layer using IP and port. It is fast, works for any TCP/UDP protocol, and cannot inspect content (AWS NLB). An <b>L7</b> LB terminates HTTP(S) and routes on content (host, path, headers, cookies). It can do TLS termination, retries, rewrites, auth and WAF, and balances per request, at higher CPU cost (ALB, Nginx, Envoy)." },
            { q: "How does a CDN work?", a: "A CDN places caching servers (PoPs) near users. DNS or anycast routes a user to the nearest edge. On a cache hit the edge serves the content directly. On a miss it fetches from the origin (often through an origin shield), caches it according to Cache-Control/TTL, and serves it. Benefits: lower latency, origin offload, DDoS absorption, TLS at the edge." },
            { q: "Reverse proxy vs forward proxy?", a: "A forward proxy acts for <b>clients</b>: clients send requests through it to the internet (corporate filtering, anonymity). A reverse proxy acts for <b>servers</b>: clients talk to it thinking it is the server, and it forwards to backends (load balancing, TLS termination, caching, security). Nginx is usually deployed as a reverse proxy." },
            { q: "What is anycast?", a: "One IP address announced via BGP from many locations. Internet routing delivers each packet to the \"closest\" announcement by routing metrics. It gives low latency, automatic failover when a site withdraws its route, and spreads DDoS traffic across PoPs. It is used by DNS roots, 1.1.1.1, 8.8.8.8 and CDNs." }
          ]
        },
        {
          id: "sockets-tools",
          title: "Socket programming & tools: netstat/ss, curl, tcpdump/Wireshark, traceroute",
          est: "1-2 days",
          why: "Practical debugging skill (\"the service cannot reach the DB, how do you debug it?\") is increasingly asked in product and SRE-ish rounds, and sockets make TCP concrete.",
          learn: [
            "Socket API lifecycle. Server: <code>socket, bind, listen, accept, recv/send, close</code>. Client: <code>socket, connect, send/recv, close</code>.",
            "Blocking vs non-blocking sockets, <code>select/poll/epoll</code>, the event-loop servers behind Nginx and uvicorn. The C10K problem.",
            "Socket options: SO_REUSEADDR, TCP_NODELAY, SO_KEEPALIVE, backlog (SYN queue vs accept queue).",
            "<b>netstat / ss</b>: listening ports, connection states, owning process (<code>ss -tlnp</code>).",
            "<b>curl</b>: <code>-v</code>, <code>-I</code>, <code>-w</code> timing breakdown, <code>--resolve</code>, <code>-k</code> (and why not to use it), HTTP/2 or 3 flags.",
            "<b>tcpdump / Wireshark</b>: capture filters vs display filters, following a TCP stream, spotting retransmissions, RSTs and handshake failures.",
            "<b>traceroute / tracert / mtr</b>, <b>ping</b>, <b>dig / nslookup</b>, <b>nc (netcat)</b> for port checks, <b>ip / ifconfig / ipconfig</b>, <code>openssl s_client</code>.",
            "A debugging ladder for \"cannot connect\": DNS resolves? Route exists? Port open (nc)? Firewall or security group? TLS OK? App listening on 0.0.0.0 rather than 127.0.0.1?"
          ],
          practice: [
            { t: "Write a TCP echo server and client in Python with the socket module", p: "BUILD", d: "E" },
            { t: "Upgrade the echo server to handle many clients with selectors / asyncio", p: "BUILD", d: "M" },
            { t: "Write a simple HTTP/1.1 server from raw sockets that serves a static file", p: "BUILD", d: "M" },
            { t: "Use <code>curl -w</code> to print dns/connect/tls/ttfb timings for 3 sites", p: "BUILD", d: "E" },
            { t: "Capture traffic with <code>tcpdump -i any port 443 -w out.pcap</code> and analyse it in Wireshark", p: "BUILD", d: "M" },
            { t: "Run <code>traceroute</code> / <code>mtr</code> to a far host and interpret the * * * hops", p: "BUILD", d: "E" },
            { t: "Beej's Guide to Network Programming", p: "DOC", d: "M", u: "https://beej.us/guide/bgnet/" },
            { t: "Julia Evans zines/blog on networking tools", p: "DOC", d: "E", u: "https://jvns.ca/" }
          ],
          notes: [
            "\"Connection refused\" (RST) means the host is reachable but nothing listens on the port. \"Timeout\" means packets are dropped (firewall or SG, routing, host down).",
            "A server bound to <code>127.0.0.1</code> is unreachable from other hosts and from outside a Docker container. Bind to <code>0.0.0.0</code>. This is a very common Docker bug.",
            "<code>curl -w \"dns:%{time_namelookup} connect:%{time_connect} tls:%{time_appconnect} ttfb:%{time_starttransfer} total:%{time_total}\\n\" -o /dev/null -s URL</code>",
            "<code>ss -tlnp</code> lists TCP listening sockets with numeric ports and process. <code>ss -tan state time-wait | wc -l</code> counts TIME_WAIT.",
            "SO_REUSEADDR lets a restarted server bind while old connections sit in TIME_WAIT (otherwise \"Address already in use\").",
            "Wireshark display filters: <code>tcp.analysis.retransmission</code>, <code>tcp.flags.reset==1</code>, <code>http</code>, <code>dns</code>, <code>tls.handshake.type==1</code> (ClientHello).",
            "<code>recv()</code> may return fewer bytes than requested. TCP is a stream, so loop until you have a full message (length-prefixed framing)."
          ],
          cases: [
            "* * * in traceroute does not mean a broken path. Many routers rate-limit or drop ICMP replies while still forwarding traffic.",
            "Assuming one <code>send()</code> equals one <code>recv()</code> on TCP is a classic framing bug.",
            "A full accept queue (slow accept or a small backlog) causes connection drops and timeouts under load even though the app looks fine.",
            "On Windows use <code>netstat -ano</code>, <code>tracert</code>, <code>Test-NetConnection host -Port 443</code>.",
            "The Docker or K8s network namespace means you must debug from inside the container (<code>kubectl exec</code>, ephemeral debug containers)."
          ],
          qa: [
            { q: "Walk through the socket calls for a TCP server and client.", a: "Server: <code>socket()</code> creates an endpoint, <code>bind()</code> attaches it to IP:port, <code>listen()</code> marks it passive with a backlog, <code>accept()</code> blocks until a client completes the handshake and returns a new connected socket. Then <code>recv/send</code> and <code>close</code>. Client: <code>socket()</code>, then <code>connect()</code> (which triggers the 3-way handshake), then <code>send/recv</code>, then <code>close</code> (FIN)." },
            { q: "My service cannot connect to the database. How do you debug it?", a: "Go layer by layer. Check the hostname resolves (<code>dig</code>/<code>nslookup</code>). Check the port is reachable (<code>nc -vz host 5432</code>): refused means nothing is listening or the bind address is wrong, a timeout means a firewall, security group or routing issue. Check the DB listens on the right interface and allows the client IP (pg_hba). Check TLS or credential errors in the logs. Check connection-pool exhaustion or max_connections. Capture with tcpdump if still unclear." },
            { q: "How does epoll help servers handle many connections?", a: "Instead of one thread per connection, or scanning every fd with select/poll (O(n) per call), epoll lets the kernel track interest in many fds and return only the ready ones (O(ready)). A single-threaded event loop can then multiplex tens of thousands of connections. Nginx, Node.js, uvicorn and Redis work this way." }
          ],
          code: `# Minimal TCP echo server + client (Python)
import socket

def server(host="0.0.0.0", port=9000):            # 0.0.0.0, not 127.0.0.1, inside Docker
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((host, port))
        s.listen(128)                              # backlog
        while True:
            conn, addr = s.accept()                # 3-way handshake done
            with conn:
                while data := conn.recv(4096):     # may return partial data
                    conn.sendall(data)             # sendall loops for you

def client(msg=b"hello", host="127.0.0.1", port=9000):
    with socket.create_connection((host, port), timeout=5) as c:
        c.sendall(msg)
        print(c.recv(4096))

# curl timing breakdown:
# curl -o /dev/null -s -w "dns:%{time_namelookup} tcp:%{time_connect} tls:%{time_appconnect} ttfb:%{time_starttransfer}\\n" https://example.com`
        }
      ]
    }
  ]
});
