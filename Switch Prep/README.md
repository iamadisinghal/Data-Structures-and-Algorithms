# Switch Prep planner

Open `Switch Prep.html` in a browser. Progress, stars, notes and the application
tracker are saved in that browser's localStorage. Use **Export progress** in the
sidebar to back up or move to another machine.

```
Switch Prep/
  Switch Prep.html      page shell (loads everything below)
  assets/app.css        styles (light + dark)
  assets/app.js         rendering, progress, search, notes, tracker
  data/*.js             one file per tab - edit these to change content
```

## Adding / editing content

Each data file calls `PREP.add({...})`. Two calls with the same `id` are merged
(levels with the same `name` are merged too), so a big tab can be split across files.

```js
PREP.add({
  id: 'dsa',                 // tab id - also the URL hash (#dsa)
  order: 20,                 // sidebar order
  group: 'Core CS',          // sidebar group heading
  title: 'Data Structures & Algorithms',
  short: 'DSA',              // sidebar label
  blurb: 'One line shown under the title.',
  intro: ['Paragraph, <b>HTML allowed</b>.'],
  resources: [{ n: 'NeetCode 150', u: 'https://neetcode.io/practice', d: 'why it is useful' }],
  widgets: [],               // optional: 'dashboard', 'revisit', 'applications'
  levels: [
    {
      name: 'Level 1 · Linear structures',   // levels render in file order
      desc: 'What this level covers.',
      topics: [
        {
          id: 'two-pointers',                // unique inside the tab, never rename once used
          title: 'Two pointers',
          est: '3–4 days',                   // optional time estimate
          why: 'Where / how often this shows up in interviews.',
          learn: ['Concept to understand (checkbox). HTML allowed.'],
          practice: [
            // t = title, p = platform code, d = E/M/H, u = url (optional - a search link is generated if missing)
            { t: 'Two Sum II - Input Array Is Sorted', p: 'LC', d: 'M',
              u: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' }
          ],
          notes: ['Key idea / pattern / how to recognise the problem. HTML allowed.'],
          cases: ['Edge case or pitfall to remember. HTML allowed.'],
          qa: [{ q: 'Interview question (checkbox = can answer).', a: 'Crisp model answer. HTML allowed.' }],
          code: 'optional code template (plain text, rendered in <pre>)',
          refs: [
            // free reading / watching. k = video | playlist | article | book | course | docs | paper | notes | visual | blog
            // u optional: without it a YouTube search (video/playlist) or web search is generated from n
            { n: 'CP-Algorithms: Disjoint Set Union', u: 'https://cp-algorithms.com/data_structures/disjoint_set_union.html', k: 'article', d: 'best written explanation' }
          ]
        }
      ]
    }
  ]
});
```

Reading lists can also live in a separate file, keyed by topic id (merged into the tab):

```js
PREP.add({ id: 'dsa', refs: { 'union-find': [ { n: '...', u: '...', k: 'video' } ] } });
```

Platform codes with built-in labels: `LC` LeetCode, `GFG` GeeksforGeeks, `CN` Code360
(Coding Ninjas), `IB` InterviewBit, `HR` HackerRank, `CSES`, `CF` Codeforces, `AC` AtCoder,
`DL` DataLemur, `SS` StrataScratch, `KG` Kaggle, `DML` Deep-ML, `SQLZ` SQLZoo, `BOOK`,
`DOC` documentation, `BUILD` hands-on build. Any other string is shown as-is.

Checkbox progress is keyed on tab id + topic id + item text, so editing an item's
text resets just that item's tick.
