PREP.add({
  id: 'roadmap',
  order: 10,
  group: 'Plan',
  title: 'Roadmap & dashboard',
  short: 'Roadmap',
  blurb: 'A 24-week path across every tab, with your progress and revisit list in one place.',
  widgets: ['dashboard', 'revisit'],
  intro: [
    'The weeks below assume about <b>12–15 hours a week</b>: 1.5 hours on weekdays and 3–4 hours on each weekend day. With less time, stretch every week to 1.5 weeks and keep the order. The order matters more than the speed.',
    '<b>Pick your track first.</b> <i>SDE / backend switch:</i> DSA, HLD and LLD carry the most weight, then DBMS/OS/CN and OOP. <i>AI / ML engineer switch:</i> DSA (medium level is usually enough), ML, Deep learning, GenAI and ML system design carry the most weight, then Python, HLD basics and SQL. <i>Both:</i> behavioral and the project deep-dive decide the final offer more often than people expect.',
    'Each tab has its own progress bar. Tick <b>concepts</b> when you can explain them without notes, <b>practice</b> when you solved it yourself, and <b>questions</b> when you could answer them out loud in an interview. Use ★ for anything you want to redo in 7 days. Starred items collect in the revisit list below.'
  ],
  levels: [
    {
      name: 'Phase 0 · Set up (week 0)',
      desc: 'One week of setup so the rest of the plan runs smoothly.',
      topics: [
        {
          id: 'w0', title: 'Week 0 · Baseline & logistics', est: '6–8 hrs',
          why: 'Know where you stand and what you are aiming for before you start grinding.',
          learn: [
            'Write the target: role (SDE-2 / ML engineer / GenAI engineer), CTC range, 15–25 target companies split into dream / target / safe.',
            'Read 10 job descriptions of your target role; list the skills that repeat. That list sets your priorities across tabs.',
            'Take a baseline: solve 3 LeetCode mediums timed (45 min each) and note where you get stuck.',
            'Resume v1: rewrite your current role bullets with numbers (see the Behavioral tab → Resume).',
            'Create accounts: LeetCode, GFG, Code360, NeetCode, DataLemur, Deep-ML, Pramp / interviewing.io.',
            'Add your first 10 wishlist companies to the application tracker (Behavioral tab).',
            'Block fixed study slots in your calendar and protect them like meetings.'
          ],
          notes: [
            'Your notice period (often 60–90 days in India) sets the timeline. Start applying by around <b>week 12</b> so offers arrive near the end of the plan.',
            'Use one error log for the whole switch: date, tab, problem, why you failed, the key insight. Re-read it every Sunday.'
          ]
        }
      ]
    },
    {
      name: 'Phase 1 · Foundations (weeks 1–6)',
      desc: 'DSA linear patterns every day, plus language and OOP depth. About 70% DSA, 30% everything else.',
      topics: [
        { id: 'w1', title: 'Week 1 · Complexity, arrays & hashing', est: '12–15 hrs',
          learn: ['DSA → Level 0: complexity analysis + language toolkit', 'DSA → Arrays & hashing: learn + 8 problems', 'DSA → Prefix sums: learn + 5 problems', 'Python → data model & core types', 'OOP → four pillars (classes, encapsulation)', 'Sunday: re-solve every ★ problem from this week'] },
        { id: 'w2', title: 'Week 2 · Two pointers, sliding window', est: '12–15 hrs',
          learn: ['DSA → Two pointers: 8 problems', 'DSA → Sliding window: 8 problems (fixed + variable)', 'Python → functions, closures, generators', 'OOP → inheritance & polymorphism', 'One timed mock: 2 mediums in 60 min'] },
        { id: 'w3', title: 'Week 3 · Binary search, sorting', est: '12–15 hrs',
          learn: ['DSA → Sorting: implement merge sort + quick sort from memory', 'DSA → Binary search: index, answer-space, rotated (10 problems)', 'Python → decorators, context managers', 'OOP → abstraction, interfaces, SOLID intro', 'Behavioral → resume v2 + LinkedIn headline'] },
        { id: 'w4', title: 'Week 4 · Linked lists, stacks & queues', est: '12–15 hrs',
          learn: ['DSA → Linked lists: 8 problems', 'DSA → Stacks/queues + monotonic stack: 8 problems', 'OOP → SOLID with examples', 'DBMS → ER model, keys, normalization', 'SQL → foundations: 10 LeetCode SQL problems'] },
        { id: 'w5', title: 'Week 5 · Strings, intervals, matrix, bits', est: '12–15 hrs',
          learn: ['DSA → Strings: 6 problems', 'DSA → Intervals: 5 problems', 'DSA → Matrix + bit manipulation: 6 problems', 'SQL → joins, subqueries, GROUP BY (10 problems)', 'Python → memory model, typing, dataclasses'] },
        { id: 'w6', title: 'Week 6 · Recursion & backtracking, checkpoint', est: '12–15 hrs',
          learn: ['DSA → Backtracking: subsets, permutations, combinations, N-Queens', 'Checkpoint: 4 random mediums from weeks 1–5, timed', 'OS → processes, threads, scheduling', 'Write story #1 and #2 for the behavioral story bank', 'Review the error log and re-do every ★ item'] }
      ]
    },
    {
      name: 'Phase 2 · Core depth (weeks 7–12)',
      desc: 'Trees, graphs and DP; CS fundamentals; the first design concepts and an ML refresh.',
      topics: [
        { id: 'w7', title: 'Week 7 · Trees & BST', est: '12–15 hrs',
          learn: ['DSA → Binary trees: 12 problems (traversals, views, LCA, paths)', 'DSA → BST: 6 problems', 'OS → synchronization, deadlocks', 'System design basics → how the web works, APIs', 'ML → bias-variance, regression, logistic regression (AI track)'] },
        { id: 'w8', title: 'Week 8 · Heaps, tries, graphs I', est: '12–15 hrs',
          learn: ['DSA → Heaps: 6 problems (top-k, k-way merge, two heaps)', 'DSA → Tries: 3 problems', 'DSA → Graph BFS/DFS: 8 problems', 'OS → memory management, virtual memory', 'System design basics → scalability, load balancing, caching'] },
        { id: 'w9', title: 'Week 9 · Graphs II', est: '12–15 hrs',
          learn: ['DSA → Topological sort: 5 problems', 'DSA → Shortest paths (Dijkstra, 0-1 BFS, Bellman-Ford): 5 problems', 'DSA → Union-find + MST: 5 problems', 'CN → OSI/TCP-IP, DNS, TCP vs UDP', 'ML → trees, ensembles, metrics (AI track)'] },
        { id: 'w10', title: 'Week 10 · DP I', est: '12–15 hrs',
          learn: ['DSA → DP fundamentals + 1D DP: 8 problems', 'DSA → 2D/grid DP: 5 problems', 'DSA → Knapsack family: 6 problems', 'CN → HTTP, HTTPS/TLS, what happens when you type a URL', 'System design basics → databases, replication, sharding'] },
        { id: 'w11', title: 'Week 11 · DP II & greedy', est: '12–15 hrs',
          learn: ['DSA → DP on strings/subsequences: 8 problems', 'DSA → Greedy: 6 problems', 'DBMS → transactions, isolation levels, indexing', 'SQL → window functions + CTEs (10 problems)', 'System design basics → queues, CAP, consistency'] },
        { id: 'w12', title: 'Week 12 · Checkpoint & start applying', est: '12–15 hrs',
          learn: ['Full mock: 2 problems in 60 min, with a peer or on Pramp', 'Resume final version reviewed by 2 people', 'Ask for 10 referrals and apply to 10 target companies (log them in the tracker)', 'DSA → interval DP / DP on trees: 4 problems', 'Behavioral → stories #3–#6 written'] }
      ]
    },
    {
      name: 'Phase 3 · Design & specialisation (weeks 13–18)',
      desc: 'HLD, LLD and machine coding, plus deep learning, GenAI and ML system design for the AI track. DSA drops to maintenance: 1 problem a day plus Sunday revision.',
      topics: [
        { id: 'w13', title: 'Week 13 · HLD warm-ups', est: '12–15 hrs',
          learn: ['HLD → framework + URL shortener + rate limiter', 'HLD → key-value store + unique ID generator', 'LLD → creational patterns', 'DL → backprop, PyTorch training loop (AI track)', 'DSA maintenance: 5 mixed problems'] },
        { id: 'w14', title: 'Week 14 · HLD products I', est: '12–15 hrs',
          learn: ['HLD → news feed + chat app', 'HLD → notification system + typeahead', 'LLD → structural + behavioral patterns', 'DL → CNNs, normalisation, optimisation (AI track)', 'DSA maintenance: 5 mixed problems'] },
        { id: 'w15', title: 'Week 15 · LLD problems', est: '12–15 hrs',
          learn: ['LLD → parking lot, elevator, BookMyShow (code them)', 'LLD → splitwise + vending machine', 'DL → attention & transformers (AI track)', 'GenAI → LLM fundamentals, prompting, APIs (AI track)', 'DSA maintenance: segment tree / KMP (advanced, optional)'] },
        { id: 'w16', title: 'Week 16 · Machine coding & GenAI', est: '12–15 hrs',
          learn: ['Machine coding: one 90-minute timed round (KV store or pub-sub)', 'GenAI → embeddings, vector DBs, RAG end to end (AI track)', 'GenAI → build a RAG project and put it on GitHub (AI track)', 'HLD → YouTube + Uber', 'DSA maintenance: 5 mixed problems'] },
        { id: 'w17', title: 'Week 17 · HLD advanced & ML system design', est: '12–15 hrs',
          learn: ['HLD → payment system + ticket booking + distributed queue', 'MLSD → framework + recommendation system (AI track)', 'GenAI → agents, tool use, evaluation (AI track)', 'One HLD mock with a peer (45 min)'] },
        { id: 'w18', title: 'Week 18 · Specialisation depth', est: '12–15 hrs',
          learn: ['MLSD → search ranking + fraud detection + RAG at scale (AI track)', 'GenAI → fine-tuning, inference optimisation (AI track)', 'HLD → Google Docs or search engine', 'Machine coding: second 90-minute timed round', 'Behavioral → project deep-dive script for your top 2 projects'] }
      ]
    },
    {
      name: 'Phase 4 · Interview mode (weeks 19–24)',
      desc: 'Mocks, company-specific prep and offers. Ongoing interviews come first and the rest of the plan fills gaps around them.',
      topics: [
        { id: 'w19', title: 'Weeks 19–20 · Mock loop', est: '15 hrs/wk',
          learn: ['2 DSA mocks per week (interviewing.io / Pramp / a friend)', '1 design mock per week (HLD or MLSD, depending on track)', '1 behavioral mock: 5 stories out loud, recorded', 'Company-specific: LeetCode company-tagged problems (last 6 months) for upcoming interviews', 'Revise every "Cases to remember" box in DSA and HLD'] },
        { id: 'w21', title: 'Weeks 21–22 · Gaps & fundamentals revision', est: '15 hrs/wk',
          learn: ['Rapid revision: OS, CN and DBMS interview questions (tick the ones you can answer)', 'Re-solve the 30 most-starred problems', 'Redo any interview question you got wrong in a real interview, then log it', 'Keep the application pipeline at 5–10 active processes'] },
        { id: 'w23', title: 'Weeks 23–24 · Offers & transition', est: 'as needed',
          learn: ['Collect offers within a 1–2 week window if possible (ask recruiters to align timelines)', 'Negotiate: Behavioral tab → Offer & transition', 'Resign professionally and plan the notice-period handover', 'Thank everyone who referred you, and keep your error log for the next switch'] }
      ]
    },
    {
      name: 'Rules that keep the plan alive',
      desc: 'Reference, not a checklist. Re-read when motivation dips.',
      topics: [
        { id: 'rules', title: 'Weekly routine & rules', why: 'How to study so it sticks.',
          notes: [
            '<b>Weekday (90 min):</b> 15 min revisit ★ items → 60 min new problems / concepts → 15 min write notes in the topic\'s "My notes" box.',
            '<b>Saturday:</b> design or theory tab for 3 hrs plus one timed mock. <b>Sunday:</b> weekly review: re-solve ★, read the error log, plan next week.',
            '<b>25-minute rule:</b> stuck for 25 minutes with no progress? Read only the hint or approach, close it, and code it yourself. Star it and redo it in 7 days.',
            '<b>Quality over count:</b> after each problem, write one line on what the trick was and how to spot it next time. 300 problems with notes beat 800 without.',
            '<b>Speak while solving:</b> practise thinking out loud from week 1. Interviews grade communication.',
            '<b>Apply before you feel ready.</b> Early interviews are practice, and your pipeline needs time to fill.'
          ],
          cases: [
            'Missed a week? Do not try to catch up by doubling. Shift the plan by one week.',
            'Two bad mock scores in a row on the same topic: go back to that tab\'s Learn list before doing more problems.',
            'Keep CAT/GATE or other commitments in mind. During exam weeks, drop to DSA maintenance only (1 problem a day).'
          ]
        }
      ]
    }
  ]
});
