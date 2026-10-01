PREP.add({
  id: "os",
  order: 80,
  group: "Core CS",
  title: "Operating Systems",
  short: "OS",
  blurb: "Processes, memory, concurrency — the classic fundamentals round.",
  intro: [
    "OS questions in Indian interviews fall into three buckets. <b>Definitions</b>: process vs thread, paging vs segmentation. <b>Numericals</b>: scheduling Gantt charts, page-replacement faults, effective access time. <b>Concurrency</b>: deadlock, semaphores, producer-consumer. Product companies also ask modern versions, such as Python GIL, async vs threads, containers.",
    "Plan: Beginner and Intermediate cover about 85% of what is asked, so get them solid first. For an AI engineer, the Advanced \"modern\" topic is where you stand out. Explain why your inference server uses processes or async, what the GIL does, and how Docker isolates processes.",
    "Practise numericals by hand on paper (Gate Smashers or Neso style). Interviewers sometimes ask you to draw a Gantt chart live."
  ],
  resources: [
    { n: "OSTEP (Operating Systems: Three Easy Pieces)", u: "https://pages.cs.wisc.edu/~remzi/OSTEP/", d: "Free, readable, the best conceptual book. Covers virtualization, concurrency and persistence." },
    { n: "Galvin - Operating System Concepts", d: "Standard textbook (the dinosaur book). Use it for definitions and classic problems." },
    { n: "Neso Academy - Operating Systems", u: "https://www.youtube.com/@nesoacademy", d: "Structured, slow-paced video lectures with solved numericals." },
    { n: "Gate Smashers - OS playlist", u: "https://www.youtube.com/@GateSmashers", d: "Fast Hindi/English explanations. Great for a quick revision before interviews." },
    { n: "GFG Operating Systems", u: "https://www.geeksforgeeks.org/operating-systems/", d: "Topic notes plus GATE PYQs and interview question lists." }
  ],
  levels: [
    {
      name: "Beginner",
      desc: "What an OS does, processes and threads, and CPU scheduling with numericals.",
      topics: [
        {
          id: "os-basics",
          title: "OS basics: kernel vs user mode, system calls, types of OS, booting",
          est: "1-2 days",
          why: "Opening questions (\"What is a kernel?\", \"What happens during a system call?\") that set the tone for the round.",
          learn: [
            "Roles of an OS: resource manager (CPU, memory, I/O), abstraction provider, protection and isolation.",
            "<b>User mode vs kernel mode</b>, the mode bit, privileged instructions, and why the split exists.",
            "<b>System calls</b>: the trap instruction, syscall table, mode switch, return. Categories: process control, file, device, info, communication.",
            "Kernel architectures: monolithic (Linux), microkernel (Minix, QNX), hybrid (Windows NT, macOS XNU), exokernel/unikernel (mention only).",
            "Types of OS: batch, multiprogramming, multitasking/time-sharing, multiprocessing, real-time (hard vs soft), distributed, embedded.",
            "Interrupts vs traps vs exceptions. The interrupt vector and ISR.",
            "Boot process: firmware (BIOS/UEFI), POST, bootloader (GRUB), kernel load, init/systemd (PID 1), user space.",
            "Library calls vs system calls (e.g. <code>printf</code> buffers in user space and eventually calls <code>write</code>)."
          ],
          practice: [
            { t: "GFG: Difference between User Mode and Kernel Mode", p: "GFG", d: "E" },
            { t: "GFG: Introduction of System Call", p: "GFG", d: "E" },
            { t: "GFG: Types of Operating Systems", p: "GFG", d: "E" },
            { t: "Run <code>strace -c ls</code> (Linux/WSL) and list the system calls ls makes", p: "BUILD", d: "E" },
            { t: "Gate Smashers: Introduction to OS + types of OS videos", p: "YT", d: "E" },
            { t: "OSTEP Ch. 2 & 6 (Introduction, Limited Direct Execution)", p: "BOOK", d: "M" }
          ],
          notes: [
            "Mode switch is not context switch. A syscall switches mode (user to kernel) inside the same process. A context switch changes the running process or thread.",
            "Limited direct execution (OSTEP): run user code directly on the CPU, but use traps for privileged work and a timer interrupt so the OS can regain control.",
            "Multiprogramming means several jobs in memory to keep the CPU busy during I/O. Multitasking adds time slicing for interactivity.",
            "Hard real-time: missing a deadline is a failure (airbag, pacemaker). Soft real-time: degraded quality (video streaming).",
            "Syscalls are expensive relative to function calls (mode switch, cache/TLB effects). That is why user-space buffering exists, and vDSO for <code>gettimeofday</code>.",
            "Linux is monolithic but modular (loadable kernel modules)."
          ],
          cases: [
            "\"Is the OS always running?\" No. The kernel runs only on syscalls, interrupts and exceptions. The rest of the time user processes run.",
            "Microkernel benefit: fault isolation (drivers in user space). Cost: IPC overhead.",
            "Dual-mode alone does not stop an infinite loop. The <b>timer interrupt</b> is what lets the OS preempt it.",
            "<code>fork</code>, <code>read</code>, <code>mmap</code> are syscalls. <code>malloc</code> is a library function that uses <code>brk/mmap</code> internally."
          ],
          qa: [
            { q: "What is a system call and how does it work?", a: "The interface through which a user program requests a kernel service. The program puts the syscall number and arguments in registers and executes a trap (<code>syscall</code>/<code>int 0x80</code>). The CPU switches to kernel mode and jumps to the handler, which looks up the syscall table, does the work and returns to user mode with the result." },
            { q: "Why do we need user mode and kernel mode?", a: "Protection. User code cannot execute privileged instructions (I/O, changing page tables, disabling interrupts) or touch kernel memory. So a buggy or malicious process cannot crash the system or read other processes' memory. It must ask the kernel through a syscall." },
            { q: "Monolithic vs microkernel?", a: "A monolithic kernel runs all services (file systems, drivers, networking) in kernel space, which is fast (function calls) but means a driver bug can crash the system (Linux). A microkernel keeps only IPC, scheduling and basic memory in the kernel and runs services as user processes. It is more robust and modular but slower because of message passing." },
            { q: "What happens when you power on a computer?", a: "Firmware (BIOS/UEFI) runs POST and finds a boot device, then loads the bootloader (GRUB). The bootloader loads the kernel and initramfs. The kernel initializes memory, devices and the scheduler, mounts root and starts PID 1 (systemd), which brings up services and the login." }
          ]
        },
        {
          id: "processes-threads",
          title: "Processes vs threads, PCB, process states, context switch, fork/exec",
          est: "2 days",
          why: "\"Process vs thread\" is probably the most-asked OS question in India. fork() output puzzles are common in written tests.",
          learn: [
            "Process: a program in execution. Memory layout: text, data, BSS, heap, stack.",
            "<b>PCB</b>: PID, state, program counter, registers, scheduling info, memory-management info (page table), open files, accounting.",
            "Process states: new, ready, running, waiting/blocked, terminated, plus suspended-ready and suspended-blocked (swapping). Know the transitions.",
            "<b>Threads</b>: they share code, data, heap and open files, and each has its own stack, registers and PC (TCB). User-level vs kernel-level threads and the 1:1, M:1 and M:N models.",
            "<b>Context switch</b>: save state to the PCB, load the next one. Costs: direct (registers) and indirect (cache, TLB flush unless ASID/PCID).",
            "<b>fork()</b> returns 0 in the child and the child PID in the parent. <b>exec()</b> replaces the process image. <b>wait()</b> reaps the child. Copy-on-write.",
            "Schedulers: long-term (admission), short-term (CPU), medium-term (swapping). The dispatcher and dispatch latency.",
            "CPU-bound vs I/O-bound processes."
          ],
          practice: [
            { t: "GFG: Difference between Process and Thread", p: "GFG", d: "E" },
            { t: "GFG: States of a Process", p: "GFG", d: "E" },
            { t: "GFG: fork() in C + output questions (\"how many times is hello printed?\")", p: "GFG", d: "M" },
            { t: "GATE PYQs: fork() count puzzles (5 questions)", p: "GFG", d: "M" },
            { t: "Write a C/Python program: fork, exec ls in the child, wait in the parent, print the exit status", p: "BUILD", d: "M" },
            { t: "Neso Academy: Process Management lectures", p: "YT", d: "E" },
            { t: "OSTEP Ch. 4-5 (Processes, Process API)", p: "BOOK", d: "M" }
          ],
          notes: [
            "n sequential <code>fork()</code> calls create <b>2^n</b> processes in total (2^n - 1 children). Watch for forks inside conditionals (<code>fork() &amp;&amp; fork()</code>) and loops.",
            "Thread creation and switching are cheaper than for processes because the address space is shared: no page-table switch and no TLB flush.",
            "Threads of the same process share heap and globals, so they need synchronization. Processes are isolated and need IPC.",
            "User-level threads (M:1): fast switches but one blocking syscall blocks all of them, and there is no multicore parallelism. Kernel threads (1:1, Linux NPTL): true parallelism.",
            "Linux does not really distinguish: both are tasks created with <code>clone()</code> using different sharing flags.",
            "Running to ready happens on an interrupt or time-slice expiry. Running to waiting happens on an I/O request. Waiting to ready happens on I/O completion. Waiting never goes directly to running."
          ],
          cases: [
            "<code>printf</code> without a newline before <code>fork()</code> can print twice, because the stdio buffer is copied into the child.",
            "A crash in one thread (segfault) kills the whole process. A crashing child process does not kill its parent.",
            "\"Do threads share the stack?\" No. Each thread has its own stack, but stacks live in the shared address space, so a pointer to another thread's stack is valid (and dangerous).",
            "Context-switch cost is dominated by indirect cache and TLB effects, not register save/restore.",
            "Process vs program: one program (e.g. Chrome) can have many processes."
          ],
          qa: [
            { q: "Difference between a process and a thread?", a: "A process is an independent program in execution with its own address space and resources. A thread is a unit of execution inside a process. Threads share code, heap, globals and file descriptors but have their own stack, registers and PC. Threads are lighter to create and switch and can talk through shared memory, but need synchronization. Processes are isolated, so a crash does not spread, but they need IPC." },
            { q: "What is a context switch and what does it cost?", a: "Saving the CPU state (registers, PC, stack pointer) of the running process or thread into its PCB/TCB and restoring another's. Between processes it also switches the page table. Costs: microseconds of kernel time plus indirect costs: cold caches, TLB flushes, branch predictor pollution." },
            { q: "What do fork() and exec() do?", a: "<code>fork()</code> creates a child that is a copy of the parent (copy-on-write pages). It returns 0 in the child and the child PID in the parent. <code>exec()</code> replaces the current process image with a new program and keeps the PID and open fds. A shell does fork, then exec in the child, while the parent waits." },
            { q: "What is a PCB?", a: "Process Control Block: the kernel data structure that represents a process. It holds the PID, state, saved registers and PC, scheduling priority, memory info (page table base), open file table, parent and child links, and accounting. Context switches save to and restore from it." }
          ],
          code: `# fork / exec / wait in Python (POSIX only)
import os, sys

pid = os.fork()
if pid == 0:                          # child
    os.execvp("ls", ["ls", "-l"])     # replaces the child image; never returns on success
    sys.exit(1)
else:                                 # parent
    _, status = os.waitpid(pid, 0)    # reap child -> no zombie
    print("child", pid, "exited with", os.WEXITSTATUS(status))

# Puzzle: how many 'hi'?  fork(); fork(); fork(); print('hi')  -> 2^3 = 8`
        },
        {
          id: "cpu-scheduling",
          title: "CPU scheduling: FCFS, SJF, SRTF, RR, Priority, MLFQ (with numericals)",
          est: "2-3 days",
          why: "Gantt-chart numericals are a staple of written tests and fundamentals rounds. Algorithm trade-offs (starvation, convoy effect) are asked verbally.",
          learn: [
            "Criteria: CPU utilization, throughput, <b>turnaround time</b>, <b>waiting time</b>, <b>response time</b>.",
            "Preemptive vs non-preemptive scheduling.",
            "<b>FCFS</b> and the convoy effect. <b>SJF</b> (optimal average waiting time, non-preemptive) and <b>SRTF</b> (preemptive SJF), plus predicting burst with an exponential average.",
            "<b>Round Robin</b>: time quantum trade-off (too small means context-switch overhead, too large means it becomes FCFS).",
            "<b>Priority scheduling</b>: starvation, fixed by <b>aging</b>. Priority inversion and priority inheritance.",
            "Multilevel queue vs <b>Multilevel Feedback Queue (MLFQ)</b>: rules for demotion, priority boost, gaming prevention.",
            "Multiprocessor scheduling: load balancing, processor affinity. Linux <b>CFS</b> (vruntime, red-black tree) and its successor EEVDF (6.6+) at a high level.",
            "Solve numericals: draw the Gantt chart and compute CT, TAT, WT and RT per process, then the averages."
          ],
          practice: [
            { t: "Solve 3 FCFS numericals with arrival times (include CPU idle gaps)", p: "GFG", d: "E" },
            { t: "Solve 3 SJF and 3 SRTF numericals and compare average WT", p: "GFG", d: "M" },
            { t: "Solve 3 Round Robin numericals (q = 2, q = 4) and count context switches", p: "GFG", d: "M" },
            { t: "Solve 2 preemptive priority numericals (lower number = higher priority)", p: "GFG", d: "M" },
            { t: "Gate Smashers: CPU scheduling numericals playlist", p: "YT", d: "M" },
            { t: "GATE PYQs: CPU scheduling (10 questions)", p: "GFG", d: "H" },
            { t: "Write a Python simulator for FCFS/SJF/RR that prints the Gantt chart and averages", p: "BUILD", d: "M" },
            { t: "OSTEP Ch. 7-9 (Scheduling, MLFQ, Proportional Share)", p: "BOOK", d: "M" }
          ],
          notes: [
            "<b>TAT = CT - AT</b>. <b>WT = TAT - BT</b>. <b>RT = first-run time - AT</b>. For non-preemptive algorithms, RT = WT.",
            "SJF/SRTF give the <b>minimum average waiting time</b>, but they need future burst times and can starve long jobs.",
            "Burst prediction: <b>τ(n+1) = α·t(n) + (1-α)·τ(n)</b>.",
            "RR: a quantum that is too large becomes FCFS; one that is too small is all overhead. Rule of thumb: about 80% of CPU bursts should be shorter than q. RR gives good response time and usually worse TAT than SJF.",
            "RR tie-break convention: when a new process arrives at the same instant as a preempted one re-queues, the <b>new arrival goes first</b> (state your assumption).",
            "Convoy effect (FCFS): short I/O-bound jobs stuck behind one long CPU-bound job, giving low device utilization.",
            "MLFQ rules (OSTEP): new jobs start at top priority; a job that uses its full allotment drops a level; periodically boost all jobs to the top (prevents starvation); account total CPU time per level (prevents gaming by yielding).",
            "CFS picks the task with the smallest <b>vruntime</b> from a red-black tree (O(log n)). Nice values weight how fast vruntime grows."
          ],
          cases: [
            "Do not forget <b>CPU idle time</b> when no process has arrived yet. CT starts from the next arrival.",
            "In SRTF, re-evaluate at <b>every arrival</b>, not only on completion.",
            "Priority inversion (Mars Pathfinder): a low-priority task holds a lock that a high-priority task needs, while a medium task preempts the low one. Fix with priority inheritance.",
            "Context-switch overhead questions: add the switch time δ between slices. CPU efficiency = useful / (useful + overhead).",
            "Response time and waiting time are different under preemptive algorithms. Interviewers check which one you computed."
          ],
          qa: [
            { q: "Compare FCFS, SJF and Round Robin.", a: "<b>FCFS</b>: simple, non-preemptive, suffers the convoy effect and high average WT. <b>SJF/SRTF</b>: optimal average WT, but needs burst estimates and can starve long jobs. <b>RR</b>: preemptive time slicing, fair and with good response time for interactive systems; performance depends on the quantum." },
            { q: "What is starvation and how is it solved?", a: "A ready process waits indefinitely because others always get priority (low priority in priority scheduling, long jobs in SJF). Fix with <b>aging</b>: gradually raise the priority of waiting processes, or with MLFQ periodic boosts." },
            { q: "What is MLFQ and why is it used?", a: "Multilevel Feedback Queue: several RR queues of decreasing priority. Jobs move down when they use their full slice (CPU-bound) and stay high when they yield early (interactive). Periodic priority boosts prevent starvation. It approximates SJF without knowing burst lengths." },
            { q: "Turnaround time vs waiting time vs response time?", a: "Turnaround = completion - arrival (total time in the system). Waiting = turnaround - burst (time spent in the ready queue). Response = first time on CPU - arrival (important for interactivity)." }
          ]
        }
      ]
    },
    {
      name: "Intermediate",
      desc: "Synchronization, classic concurrency problems, deadlocks, memory management and virtual memory, the core of most OS rounds.",
      topics: [
        {
          id: "synchronization",
          title: "Synchronization: race conditions, critical section, mutex, semaphore, monitors, spinlocks",
          est: "3 days",
          why: "Mutex vs semaphore is asked almost everywhere. Concurrency bugs are also real for AI engineers writing async or multithreaded serving code.",
          learn: [
            "<b>Race condition</b>: the outcome depends on interleaving. Example: <code>count++</code> is load, add, store.",
            "Critical-section problem requirements: <b>mutual exclusion, progress, bounded waiting</b>.",
            "Software solutions: Peterson's algorithm (2 processes) and why it needs memory barriers on modern CPUs.",
            "Hardware support: test-and-set, compare-and-swap (CAS), atomic instructions, memory barriers.",
            "<b>Mutex</b> (ownership, lock/unlock by the same thread) vs <b>semaphore</b> (counter, wait/P and signal/V, no ownership). Binary vs counting semaphores.",
            "<b>Spinlock</b> (busy wait, good for short critical sections on multicore) vs a blocking/sleeping lock.",
            "<b>Monitors</b> and <b>condition variables</b>: wait releases the lock atomically. signal vs broadcast. Mesa semantics, hence <code>while</code> not <code>if</code>.",
            "Reader-writer locks, recursive (reentrant) locks, lock-free structures with CAS and the ABA problem (high level)."
          ],
          practice: [
            { t: "Print in Order", p: "LC", d: "E", u: "https://leetcode.com/problems/print-in-order/" },
            { t: "Print FooBar Alternately", p: "LC", d: "M", u: "https://leetcode.com/problems/print-foobar-alternately/" },
            { t: "Print Zero Even Odd", p: "LC", d: "M", u: "https://leetcode.com/problems/print-zero-even-odd/" },
            { t: "Fizz Buzz Multithreaded", p: "LC", d: "M", u: "https://leetcode.com/problems/fizz-buzz-multithreaded/" },
            { t: "GFG: Mutex vs Semaphore", p: "GFG", d: "E" },
            { t: "GFG: Peterson's Algorithm + critical section requirements", p: "GFG", d: "M" },
            { t: "GATE PYQs: semaphore value / possible outputs questions (5)", p: "GFG", d: "H" },
            { t: "Show a race: increment a shared counter from 4 Python threads without a lock (use a read-modify-write with sleep(0)), then fix it with threading.Lock", p: "BUILD", d: "E" },
            { t: "OSTEP Ch. 26-31 (Concurrency: locks, condition variables, semaphores)", p: "BOOK", d: "M" }
          ],
          notes: [
            "Semaphore ops: <code>wait(S): while S &lt;= 0 wait; S--</code> and <code>signal(S): S++</code> (and wake a waiter). Both must be atomic.",
            "Counting semaphore numericals: initial value S, then k P-ops and m V-ops give a final value S - k + m. If it is negative, |value| processes are blocked (in the blocking-queue definition).",
            "Mutex = locking mechanism (\"only I can enter, and only I can unlock\"). Semaphore = signalling mechanism (\"n slots available\" or \"event happened\"). A semaphore can be signalled by a different thread.",
            "Always wait on a condition variable in a <b>while loop</b> because of spurious wakeups and Mesa semantics: another thread may grab the state first.",
            "Spinlocks are fine when the hold time is shorter than the context-switch cost and you are on multicore. On a single core they waste the whole time slice.",
            "Peterson: <code>flag[i] = true; turn = j; while (flag[j] &amp;&amp; turn == j);</code> It satisfies all three requirements, for 2 processes.",
            "Python <code>threading.Lock</code> = mutex, <code>Semaphore</code> / <code>BoundedSemaphore</code>, <code>Condition</code>, <code>Event</code>, <code>RLock</code> (reentrant)."
          ],
          cases: [
            "\"Is a binary semaphore the same as a mutex?\" Not quite. A mutex has ownership (only the owner unlocks) and may support priority inheritance. A binary semaphore has no owner.",
            "Disabling interrupts as a lock works only on a uniprocessor and only in kernel mode.",
            "Forgetting to release a lock on an exception means deadlock. Use <code>with lock:</code> / RAII / try-finally.",
            "The Python GIL does not make <code>x += 1</code> atomic: it is several bytecodes and the thread can switch between them.",
            "Busy waiting is not always bad: spinlocks are used inside kernels for very short sections.",
            "Progress vs bounded waiting: strict alternation satisfies mutual exclusion but fails <b>progress</b>."
          ],
          qa: [
            { q: "Difference between mutex and semaphore?", a: "A mutex is a lock with ownership: one thread acquires it and the same thread must release it, so it protects a critical section. A semaphore is an integer counter with atomic wait/signal and no ownership. A counting semaphore limits concurrent access to N resources; a binary semaphore can be used for signalling between threads (one waits, another signals)." },
            { q: "What are the requirements of a critical-section solution?", a: "<b>Mutual exclusion</b>: at most one process inside at a time. <b>Progress</b>: if none is inside, the choice of who enters next cannot be postponed indefinitely, and only processes wanting to enter take part. <b>Bounded waiting</b>: there is a limit on how many times others can enter before a waiting process gets its turn." },
            { q: "Spinlock vs mutex: when do you use each?", a: "A spinlock busy-waits and suits very short critical sections on multicore, where sleeping and waking would cost more than spinning (kernel code, interrupt context). A blocking mutex puts the waiter to sleep and suits longer or unpredictable hold times and user-space code." },
            { q: "Why must condition-variable waits be in a while loop?", a: "Under Mesa semantics, signal only makes the waiter ready. By the time it reacquires the lock another thread may have changed the condition, and spurious wakeups can also happen. So re-check the predicate: <code>while not cond: cv.wait()</code>." }
          ],
          code: `# Print FooBar Alternately - two semaphores (LeetCode 1115 pattern)
from threading import Semaphore

class FooBar:
    def __init__(self, n):
        self.n = n
        self.foo_turn = Semaphore(1)
        self.bar_turn = Semaphore(0)

    def foo(self, printFoo):
        for _ in range(self.n):
            self.foo_turn.acquire()      # P
            printFoo()
            self.bar_turn.release()      # V -> let bar go

    def bar(self, printBar):
        for _ in range(self.n):
            self.bar_turn.acquire()
            printBar()
            self.foo_turn.release()`
        },
        {
          id: "classic-sync-problems",
          title: "Classic problems: producer-consumer, readers-writers, dining philosophers",
          est: "2 days",
          why: "Interviewers often ask you to code bounded-buffer producer-consumer, or to explain how dining philosophers deadlocks and how to fix it.",
          learn: [
            "<b>Bounded buffer (producer-consumer)</b> with semaphores: <code>empty = N</code>, <code>full = 0</code>, <code>mutex = 1</code>, and why the order of wait calls matters.",
            "Producer-consumer with a mutex plus two condition variables (<code>not_full</code>, <code>not_empty</code>), and with <code>queue.Queue</code>.",
            "<b>Readers-writers</b>: first variant (readers preferred, writers may starve), second variant (writers preferred), fair solution. Using <code>read_count</code> with a mutex.",
            "<b>Dining philosophers</b>: deadlock when everyone picks up the left fork. Fixes: resource ordering (pick the lower-numbered fork first), at most N-1 philosophers seated, pick both forks atomically, waiter/arbitrator.",
            "Sleeping barber and cigarette smokers (awareness only).",
            "Barrier and rendezvous patterns, e.g. Building H2O."
          ],
          practice: [
            { t: "The Dining Philosophers", p: "LC", d: "M", u: "https://leetcode.com/problems/the-dining-philosophers/" },
            { t: "Building H2O", p: "LC", d: "M", u: "https://leetcode.com/problems/building-h2o/" },
            { t: "Design Bounded Blocking Queue (premium)", p: "LC", d: "M", u: "https://leetcode.com/problems/design-bounded-blocking-queue/" },
            { t: "Implement producer-consumer with threading.Condition (bounded buffer of size N)", p: "BUILD", d: "M" },
            { t: "Implement producer-consumer with asyncio.Queue and compare it with the threaded version", p: "BUILD", d: "M" },
            { t: "Implement a readers-writer lock in Python (writer-preferring)", p: "BUILD", d: "H" },
            { t: "GFG: Producer Consumer Problem using Semaphores", p: "GFG", d: "M" },
            { t: "GFG: Readers-Writers Problem", p: "GFG", d: "M" },
            { t: "GFG: Dining Philosopher Problem Using Semaphores", p: "GFG", d: "M" }
          ],
          notes: [
            "Producer: <code>wait(empty); wait(mutex); add; signal(mutex); signal(full);</code> Consumer: <code>wait(full); wait(mutex); remove; signal(mutex); signal(empty);</code>",
            "Swapping <code>wait(mutex)</code> before <code>wait(empty)</code> in the producer can <b>deadlock</b>: the producer holds the mutex while sleeping on a full buffer, so the consumer cannot enter.",
            "Readers-writers (readers preferred): the first reader locks <code>wrt</code> and the last reader unlocks it. <code>read_count</code> is protected by its own mutex.",
            "Dining philosophers with N philosophers: allowing at most N-1 at the table guarantees at least one can get both forks.",
            "Resource ordering breaks <b>circular wait</b>. This is the general technique for avoiding lock-ordering deadlocks in real code.",
            "In production Python, use <code>queue.Queue(maxsize=N)</code>, which is already a thread-safe bounded buffer."
          ],
          cases: [
            "Using <code>if</code> instead of <code>while</code> around <code>cv.wait()</code> with several consumers leads to popping from an empty buffer.",
            "<code>notify()</code> vs <code>notify_all()</code>: with one condition variable shared by producers and consumers, notify may wake the wrong type. Use two CVs or notify_all.",
            "Readers-preferred solutions starve writers under a constant read load. Mention fairness.",
            "Dining-philosopher solutions that avoid deadlock can still allow <b>starvation</b> of one philosopher.",
            "A poison pill or sentinel is needed to shut down consumers cleanly."
          ],
          qa: [
            { q: "Solve the bounded-buffer producer-consumer problem.", a: "Use three semaphores: <code>empty = N</code> (free slots), <code>full = 0</code> (filled slots), <code>mutex = 1</code>. The producer waits on empty, then on mutex, inserts, signals mutex, then signals full. The consumer does the mirror image. The counting semaphores block when the buffer is full or empty, and the mutex protects the buffer indices. Always acquire the counting semaphore before the mutex." },
            { q: "How does dining philosophers deadlock and how do you prevent it?", a: "Each philosopher picks up the left fork, then waits forever for the right one. That is a circular wait. Prevention: number the forks and always pick the lower-numbered one first (breaks the cycle), allow only N-1 philosophers to sit, pick up both forks atomically, or have an asymmetric philosopher pick right first." },
            { q: "Explain the readers-writers problem.", a: "Many readers may read concurrently, but a writer needs exclusive access. In the first solution, a read_count protected by a mutex lets the first reader lock out writers and the last reader release them; writers can starve. The writer-preference variant blocks new readers once a writer is waiting. Real systems use RW locks with fairness policies." }
          ],
          code: `# Bounded buffer with Condition variables
import threading, collections

class BoundedBuffer:
    def __init__(self, cap):
        self.buf = collections.deque()
        self.cap = cap
        self.lock = threading.Lock()
        self.not_full = threading.Condition(self.lock)
        self.not_empty = threading.Condition(self.lock)

    def put(self, item):
        with self.not_full:
            while len(self.buf) == self.cap:   # WHILE, not if
                self.not_full.wait()
            self.buf.append(item)
            self.not_empty.notify()

    def get(self):
        with self.not_empty:
            while not self.buf:
                self.not_empty.wait()
            item = self.buf.popleft()
            self.not_full.notify()
            return item

# Dining philosophers fix: always pick the lower-numbered fork first
def philosopher(i, forks, n):
    a, b = sorted((i, (i + 1) % n))
    with forks[a]:
        with forks[b]:
            pass  # eat`
        },
        {
          id: "deadlocks",
          title: "Deadlocks: conditions, prevention, avoidance (Banker's), detection & recovery",
          est: "2 days",
          why: "The four Coffman conditions and a Banker's-algorithm safe-sequence numerical are frequent in both interviews and OAs.",
          learn: [
            "Deadlock vs starvation vs livelock.",
            "<b>Coffman conditions</b> (all four are necessary): mutual exclusion, hold and wait, no preemption, circular wait.",
            "Resource allocation graph (RAG): with single-instance resources a cycle means deadlock; with multiple instances a cycle means only a possible deadlock.",
            "<b>Prevention</b>: break one condition (request everything up front, preempt resources, impose a global ordering).",
            "<b>Avoidance</b>: safe vs unsafe state, <b>Banker's algorithm</b> (Need = Max - Allocation, safety algorithm, resource-request algorithm).",
            "<b>Detection</b>: wait-for graph (single instance), detection algorithm (multiple instances). <b>Recovery</b>: kill processes, preempt with rollback.",
            "Ostrich approach: most general-purpose OSes ignore deadlocks for user resources.",
            "Practical deadlocks: lock ordering in multithreaded code, DB row-lock deadlocks, distributed deadlocks."
          ],
          practice: [
            { t: "Solve 3 Banker's algorithm safe-sequence numericals", p: "GFG", d: "M" },
            { t: "Resource-request numerical: can request (1,0,2) for P1 be granted immediately?", p: "GFG", d: "M" },
            { t: "GFG: Deadlock prevention and avoidance", p: "GFG", d: "E" },
            { t: "GATE PYQs: minimum resources to avoid deadlock (n processes each needing k)", p: "GFG", d: "M" },
            { t: "Gate Smashers: Banker's algorithm video", p: "YT", d: "E" },
            { t: "Write a Python script that deadlocks two threads with opposite lock order, then fix it with ordering or timeouts", p: "BUILD", d: "E" },
            { t: "Implement Banker's safety algorithm in Python", p: "BUILD", d: "M" }
          ],
          notes: [
            "Deadlock-free condition for n processes, each needing at most k instances of one resource type: R ≥ <b>n(k-1) + 1</b>. Maximum R that can still deadlock = n(k-1).",
            "Safety algorithm: Work = Available. Repeatedly find a process with Need ≤ Work, then Work += its Allocation and mark it finished. If all finish, the state is safe and you have a safe sequence.",
            "An unsafe state is not necessarily deadlocked; it only <b>may</b> lead to deadlock. A safe state guarantees none.",
            "Banker's complexity: O(m·n²) for the safety check (m resource types, n processes).",
            "Circular-wait prevention (lock ordering) is the most practical technique in application code.",
            "Livelock: processes keep changing state in response to each other without making progress (two people stepping aside in a corridor)."
          ],
          cases: [
            "Several valid safe sequences can exist. Any one is accepted, but check every step.",
            "A cycle in the RAG with multi-instance resources is <b>not</b> sufficient for deadlock.",
            "Banker's is rarely used in real OSes: it needs maximum demands in advance and a fixed number of processes.",
            "Hold-and-wait prevention (request everything at once) wastes resources and can starve.",
            "Killing processes to recover: choose victims by priority, work done and resources held, and avoid starving the same victim."
          ],
          qa: [
            { q: "What are the necessary conditions for deadlock?", a: "Mutual exclusion (non-shareable resources), hold and wait (a process holds some resources while waiting for others), no preemption (resources cannot be forcibly taken), and circular wait (a cycle of processes, each waiting for the next). All four must hold at the same time; breaking any one prevents deadlock." },
            { q: "Prevention vs avoidance vs detection?", a: "<b>Prevention</b> designs the system so one Coffman condition can never hold (e.g. lock ordering). <b>Avoidance</b> decides each request dynamically so the system stays in a safe state (Banker's), which needs max demands. <b>Detection</b> lets deadlocks happen, finds cycles periodically, and recovers by killing or preempting." },
            { q: "Explain Banker's algorithm.", a: "Each process declares its max need. Need = Max - Allocation. For a request: if Request ≤ Need and Request ≤ Available, pretend to allocate and run the safety algorithm, which looks for an order in which every process can finish with the available plus released resources. Grant the request only if the resulting state is safe." },
            { q: "How do you avoid deadlocks in multithreaded code?", a: "Acquire locks in a consistent global order, keep critical sections small, avoid holding a lock while calling unknown code or doing I/O, use timeouts or <code>try_lock</code> with back-off, and prefer higher-level constructs (queues, actors) over nested locks." }
          ]
        },
        {
          id: "memory-management",
          title: "Memory management: paging, segmentation, TLB, fragmentation",
          est: "2-3 days",
          why: "Paging vs segmentation, internal vs external fragmentation, and EAT/TLB numericals are standard questions.",
          learn: [
            "Logical vs physical addresses, the MMU, compile, load and execution-time binding.",
            "Contiguous allocation: fixed vs variable partitions, first-fit, best-fit, worst-fit, compaction.",
            "<b>Internal vs external fragmentation</b>.",
            "<b>Paging</b>: pages and frames, page table, address = (page number, offset), page table entry bits (valid, dirty, referenced, protection).",
            "<b>TLB</b>: cache for page-table entries, hit ratio, <b>effective access time</b>, ASID/PCID to avoid flushes.",
            "Page-table structures: multi-level (hierarchical), hashed, inverted page tables. Huge pages.",
            "<b>Segmentation</b>: variable-size logical segments (code, stack, heap), segment table (base, limit). Segmentation with paging (x86 history).",
            "Swapping, plus memory protection and sharing (shared libraries share code pages)."
          ],
          practice: [
            { t: "Numerical: logical address 32-bit, page size 4 KB, PTE 4 B; find page-table size", p: "GFG", d: "M" },
            { t: "Numerical: EAT with TLB hit ratio 0.9, TLB 20 ns, memory 100 ns", p: "GFG", d: "E" },
            { t: "Numerical: multi-level paging, how many levels to make each page table fit in one page", p: "GFG", d: "H" },
            { t: "First-fit / best-fit / worst-fit allocation question", p: "GFG", d: "E" },
            { t: "GFG: Paging in Operating System", p: "GFG", d: "E" },
            { t: "GFG: Difference between Paging and Segmentation", p: "GFG", d: "E" },
            { t: "GATE PYQs: paging and TLB (10 questions)", p: "GFG", d: "H" },
            { t: "OSTEP Ch. 15-20 (Address translation, segmentation, paging, TLBs, smaller tables)", p: "BOOK", d: "M" }
          ],
          notes: [
            "Offset bits = log2(page size). Page number bits = logical address bits - offset bits. Number of pages = 2^(page bits).",
            "Page table size = number of pages × PTE size. Example: 32-bit, 4 KB pages gives 2^20 entries; × 4 B = <b>4 MB per process</b>. That is why multi-level tables exist.",
            "<b>EAT (with TLB)</b> = h·(t + m) + (1-h)·(t + 2m) for single-level paging, where t = TLB time, m = memory time. Example: h = 0.9, t = 20, m = 100 gives 0.9·120 + 0.1·220 = <b>130 ns</b>.",
            "With k-level paging, a TLB miss costs <b>(k+1) memory accesses</b>: k for the tables plus 1 for the data. (Some textbooks ignore TLB lookup time on a miss; state your assumption.)",
            "Paging removes external fragmentation but has internal fragmentation, on average half a page per process. Segmentation has no internal but has external fragmentation.",
            "Inverted page table: one entry per physical frame (memory scales with RAM, not with address space). Lookups are slow without hashing.",
            "Smaller pages mean less internal fragmentation but bigger page tables and more TLB misses. Huge pages (2 MB/1 GB) help large-memory workloads such as ML training and databases."
          ],
          cases: [
            "\"Does paging have fragmentation?\" Yes, <b>internal</b> (last page partly empty). It eliminates <b>external</b> fragmentation.",
            "Best-fit is not always best: it leaves tiny unusable holes. First-fit is usually as good and faster.",
            "TLB flush on context switch unless the TLB is tagged (ASID). That is a hidden cost of process switches compared with thread switches.",
            "The page-table base register (PTBR/CR3) is part of the process context.",
            "Check units in numericals: KB = 2^10 B vs KB = 10^3 B. GATE uses powers of two."
          ],
          qa: [
            { q: "Paging vs segmentation?", a: "Paging splits memory into fixed-size pages and frames, invisible to the programmer. It has no external fragmentation, some internal fragmentation, and simple allocation. Segmentation splits by logical units (code, stack, heap) of variable size, visible to the programmer, with natural protection and sharing per segment, but suffers external fragmentation. Modern x86-64 effectively uses paging only." },
            { q: "What is a TLB and why is it needed?", a: "Translation Lookaside Buffer: a small, fast associative cache of recent virtual-to-physical page translations. Without it every memory access would need one or more extra memory reads to walk the page table. With hit rates of about 99%, translation is nearly free." },
            { q: "Internal vs external fragmentation?", a: "Internal: wasted space <b>inside</b> an allocated block because the block is bigger than requested (the last page of paging, fixed partitions). External: enough total free memory exists but it is split into non-contiguous holes that cannot satisfy a request (variable partitions, segmentation). Fix external fragmentation with compaction or paging." },
            { q: "Why multi-level page tables?", a: "A flat table for a large address space is huge (4 MB per process for 32-bit with 4 KB pages, impossibly large for 64-bit) and mostly empty. Multi-level tables allocate inner tables only for regions actually used, at the cost of extra memory accesses per TLB miss." }
          ]
        },
        {
          id: "virtual-memory",
          title: "Virtual memory: demand paging, page replacement, Belady, thrashing, working set",
          est: "2-3 days",
          why: "Page-replacement fault counting (FIFO/LRU/Optimal) is one of the most common OS numericals, and thrashing is a standard verbal question.",
          learn: [
            "Virtual memory benefits: programs larger than RAM, isolation, more multiprogramming, lazy loading, sharing.",
            "<b>Demand paging</b> and the page-fault handling steps: trap, check validity, find a free frame or victim, disk I/O, update the page table, restart the instruction.",
            "<b>Effective access time with page faults</b>.",
            "Page-replacement algorithms: <b>FIFO, Optimal (OPT/MIN), LRU</b>, LRU approximations (clock / second chance, reference bits), LFU/MFU.",
            "<b>Belady's anomaly</b>: more frames can cause more faults under FIFO. Stack algorithms (LRU, OPT) are immune.",
            "Frame allocation: equal vs proportional, global vs local replacement.",
            "<b>Thrashing</b>: cause, detection (page-fault frequency), fixes. <b>Working-set model</b> and locality of reference.",
            "Dirty bit and write-back, copy-on-write, swap space, Linux OOM killer (practical)."
          ],
          practice: [
            { t: "Fault counting: string 7,0,1,2,0,3,0,4,2,3,0,3,2 with 3 frames under FIFO, LRU and Optimal", p: "GFG", d: "M" },
            { t: "Belady demo: 1,2,3,4,1,2,5,1,2,3,4,5 under FIFO with 3 vs 4 frames (9 vs 10 faults)", p: "GFG", d: "M" },
            { t: "Numerical: EAT with page-fault rate p, memory 200 ns, fault service 8 ms", p: "GFG", d: "M" },
            { t: "GATE PYQs: page replacement (10 questions)", p: "GFG", d: "H" },
            { t: "LRU Cache (the same idea as a data structure)", p: "LC", d: "M", u: "https://leetcode.com/problems/lru-cache/" },
            { t: "Write a Python simulator for FIFO/LRU/OPT fault counts", p: "BUILD", d: "M" },
            { t: "Neso Academy / Gate Smashers: page replacement videos", p: "YT", d: "E" },
            { t: "OSTEP Ch. 21-22 (Swapping mechanisms and policies)", p: "BOOK", d: "M" }
          ],
          notes: [
            "<b>EAT = (1-p)·m + p·(page-fault service time)</b>. Example: m = 200 ns, service = 8 ms, p = 0.001 gives about <b>8.2 µs</b>, a 40× slowdown. Keeping slowdown below 10% needs p &lt; about 2.5 × 10^-6.",
            "Belady string 1,2,3,4,1,2,5,1,2,3,4,5 with FIFO: <b>3 frames = 9 faults, 4 frames = 10 faults</b>.",
            "For the classic string 7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1 with 3 frames: <b>FIFO = 15, LRU = 12, OPT = 9</b> faults.",
            "OPT replaces the page used farthest in the future. It cannot be implemented and serves as a benchmark.",
            "Clock / second chance: a circular pointer. If the reference bit is 1, clear it and move on; if 0, evict. Enhanced clock also uses the dirty bit (prefer clean pages, cheaper to evict).",
            "Thrashing: Σ working sets > available frames, so CPU utilization collapses and the scheduler wrongly adds more processes, which makes it worse.",
            "Working set WS(Δ) = pages referenced in the last Δ references. If Σ WS > frames, suspend a process."
          ],
          cases: [
            "Count the <b>initial compulsory faults</b> when frames start empty (people forget the first k).",
            "LRU on a hit updates recency. FIFO on a hit does nothing. That is the most common mistake in counting.",
            "Belady's anomaly affects FIFO (and some others), never LRU or OPT, which are stack algorithms.",
            "Page fault does not mean error. A <b>segmentation fault</b> is an invalid access; a page fault on a valid page is normal.",
            "Minor vs major faults: minor means the page is already in memory (page cache, shared); major means a disk read."
          ],
          qa: [
            { q: "What is virtual memory?", a: "An abstraction that gives each process a large private address space, mapped by page tables to physical frames or to disk. Only needed pages are kept in RAM (demand paging). This allows programs bigger than RAM, isolation between processes, sharing, and higher multiprogramming." },
            { q: "What happens on a page fault?", a: "The MMU finds the PTE invalid and traps to the kernel. The kernel checks the address is legal (otherwise SIGSEGV), finds a free frame or evicts a victim (writing it back if dirty), schedules disk I/O to read the page (the process blocks), updates the PTE, and restarts the faulting instruction." },
            { q: "What is thrashing and how do you handle it?", a: "The system spends more time paging than executing because processes do not have enough frames for their working sets. Symptoms: high page-fault rate, low CPU use, heavy disk activity. Fixes: lower the degree of multiprogramming (suspend processes), working-set or page-fault-frequency based allocation, more RAM, better locality." },
            { q: "Explain Belady's anomaly.", a: "With FIFO replacement, increasing the number of frames can <b>increase</b> page faults for some reference strings (e.g. 1,2,3,4,1,2,5,1,2,3,4,5: 9 faults with 3 frames, 10 with 4). LRU and Optimal are stack algorithms, so the pages kept with n frames are always a subset of those kept with n+1, and they never show it." }
          ]
        }
      ]
    },
    {
      name: "Advanced",
      desc: "File systems, I/O, IPC and the modern topics product companies like: GIL, async, containers, virtualization, COW, zombies.",
      topics: [
        {
          id: "file-systems",
          title: "File systems: inodes, directories, allocation, journaling, FAT/ext4",
          est: "2 days",
          why: "Asked in senior and backend rounds (\"what is an inode?\", \"hard vs soft link?\") and useful for understanding storage-heavy ML pipelines.",
          learn: [
            "File concepts: attributes, operations, open-file table (per process and system-wide), file descriptors.",
            "Directory structures: single-level, two-level, tree, acyclic graph (links).",
            "Allocation methods: <b>contiguous</b>, <b>linked</b> (FAT), <b>indexed</b> (inode with direct, single, double and triple indirect blocks).",
            "<b>Inode</b>: metadata plus block pointers. It does <i>not</i> store the file name; directories map names to inode numbers.",
            "<b>Hard link vs symbolic (soft) link</b>.",
            "Free-space management: bitmap, linked list, grouping, counting.",
            "<b>Journaling</b>: write-ahead to a journal, metadata vs data journaling, crash consistency. fsck. Copy-on-write file systems (ZFS, Btrfs).",
            "FAT32 vs NTFS vs ext4 (extents, journaling, delayed allocation). VFS layer, page cache, <code>fsync</code>."
          ],
          practice: [
            { t: "Numerical: max file size with 12 direct, 1 single, 1 double, 1 triple indirect, 4 KB blocks, 4 B pointers", p: "GFG", d: "M" },
            { t: "GFG: File Allocation Methods", p: "GFG", d: "E" },
            { t: "GFG: Hard link vs Soft link in Linux", p: "GFG", d: "E" },
            { t: "On Linux/WSL: <code>ln</code> vs <code>ln -s</code>, compare with <code>ls -li</code>, delete the original and observe", p: "BUILD", d: "E" },
            { t: "OSTEP Ch. 39-42 (Files and directories, FS implementation, FFS, crash consistency & journaling)", p: "BOOK", d: "H" },
            { t: "GATE PYQs: file system and disk block questions (5)", p: "GFG", d: "M" }
          ],
          notes: [
            "Max file size (block B, pointer p, so k = B/p pointers per block): <b>(12 + k + k² + k³) × B</b>. For B = 4 KB, p = 4 B: k = 1024, giving about 4 TB from the triple indirect block.",
            "Hard link: another directory entry pointing to the same inode (increments the link count). It cannot cross file systems or (normally) point to directories. Soft link: a separate file containing a path. It can dangle.",
            "A file is freed when the link count = 0 <b>and</b> no process has it open (deleting an open log file does not free space until it is closed).",
            "Journaling order: write the transaction to the journal, commit, checkpoint (write in place), free the journal. Ordered mode (ext4 default) writes data before committing metadata.",
            "<code>write()</code> returns once data is in the page cache, not on disk. Durability needs <code>fsync()</code>, and also an fsync on the directory for new files.",
            "Linked allocation (FAT) gives poor random access. Indexed gives good random access with overhead for small files. Extents (ext4) are contiguous runs, efficient for large files."
          ],
          cases: [
            "\"Where is the filename stored?\" In the directory entry, not the inode.",
            "Disk full but <code>df</code> shows space? You may have run out of <b>inodes</b> (many tiny files). Check <code>df -i</code>.",
            "Renaming within one file system is atomic (just a directory entry change). Across file systems it is copy plus delete.",
            "Journaling protects file-system consistency, not necessarily your application data (unless data journaling is on).",
            "Deleted files still held open by a process keep using disk (<code>lsof | grep deleted</code>)."
          ],
          qa: [
            { q: "What is an inode?", a: "An on-disk structure per file holding metadata (type, permissions, owner, size, timestamps, link count) and pointers to data blocks (direct plus indirect, or extents). It has no name: directories map names to inode numbers, which is what makes hard links possible." },
            { q: "Hard link vs soft link?", a: "A hard link is an extra directory entry pointing to the same inode. All names are equal, and data survives until the last link is removed. It cannot cross file systems. A soft link is a small file storing a path to the target. It can cross file systems and point to directories, but breaks if the target moves or is deleted." },
            { q: "What is journaling?", a: "Before modifying file-system structures in place, the FS writes the intended changes to a journal (a log) and commits them. After a crash it replays committed journal entries and discards incomplete ones, so recovery takes seconds instead of a full fsck scan. It is the same idea as database WAL." }
          ]
        },
        {
          id: "io-disk",
          title: "I/O systems, interrupts, DMA & disk scheduling",
          est: "1-2 days",
          why: "Disk-scheduling numericals (SSTF/SCAN/LOOK) appear in written tests. Interrupts vs polling and DMA are common verbal questions.",
          learn: [
            "I/O methods: <b>programmed I/O (polling)</b>, <b>interrupt-driven I/O</b>, <b>DMA</b>.",
            "Interrupt handling: IRQ, interrupt vector, top half and bottom half (softirq, tasklets), interrupt coalescing.",
            "Device drivers, the kernel I/O subsystem, buffering, caching, spooling.",
            "Blocking vs non-blocking vs asynchronous I/O. select/poll/epoll and io_uring (high level).",
            "Disk structure: platters, tracks, sectors, cylinders. Seek time, rotational latency, transfer time.",
            "<b>Disk scheduling</b>: FCFS, <b>SSTF</b>, <b>SCAN</b> (elevator), <b>C-SCAN</b>, <b>LOOK</b>, <b>C-LOOK</b>. Compute total head movement.",
            "SSDs: no seek, so scheduling matters less. Write amplification, TRIM, wear levelling. NVMe queues.",
            "RAID levels 0, 1, 5, 6, 10 (performance vs redundancy)."
          ],
          practice: [
            { t: "Disk scheduling: queue 98,183,37,122,14,124,65,67 with head at 53; compute movement for FCFS/SSTF/SCAN/C-SCAN/LOOK/C-LOOK", p: "GFG", d: "M" },
            { t: "Numerical: average access time = seek + rotational latency (RPM) + transfer", p: "GFG", d: "E" },
            { t: "GFG: DMA (Direct Memory Access)", p: "GFG", d: "E" },
            { t: "GFG: RAID levels", p: "GFG", d: "E" },
            { t: "Gate Smashers: disk scheduling video", p: "YT", d: "E" },
            { t: "OSTEP Ch. 36-38 (I/O devices, hard disk drives, RAID)", p: "BOOK", d: "M" }
          ],
          notes: [
            "Average rotational latency = <b>½ × (60 / RPM)</b> s. At 7200 RPM a rotation is 8.33 ms, so about 4.17 ms on average.",
            "Classic example (head 53, queue 98,183,37,122,14,124,65,67, cylinders 0-199): <b>FCFS = 640</b>, <b>SSTF = 236</b>. For SCAN, LOOK and C-SCAN, state the direction and whether the return sweep counts.",
            "SSTF can <b>starve</b> far requests. SCAN and LOOK bound waiting time. C-SCAN gives more uniform wait.",
            "LOOK and C-LOOK go only as far as the last request, not to the disk end.",
            "DMA: the CPU sets up the transfer (address, count) and the DMA controller moves the data, interrupting once at the end. It frees the CPU for bulk transfers. Cycle stealing.",
            "Polling beats interrupts for very fast devices or high rates (NVMe, DPDK, NAPI in Linux networking), because interrupt overhead dominates.",
            "RAID 5: N-1 disks of capacity and survives 1 failure. RAID 6 survives 2. RAID 10 is a stripe of mirrors, fast with 50% capacity."
          ],
          cases: [
            "In SCAN numericals, check whether the head goes to the <b>end of the disk</b> (SCAN) or only to the last request (LOOK). That is a common mistake.",
            "C-SCAN return movement: some textbooks count it in total movement and some do not. State your assumption.",
            "RAID is not a backup: it does not protect against deletion or corruption.",
            "Interrupt storm / livelock: at very high packet rates the CPU only services interrupts. NAPI switches to polling."
          ],
          qa: [
            { q: "Polling vs interrupts vs DMA?", a: "Polling: the CPU repeatedly checks device status. It is simple and low-latency for fast devices but wastes CPU. Interrupts: the device signals when ready, so the CPU does other work, but each interrupt has overhead. DMA: for bulk transfers a controller copies data between device and memory directly and interrupts once at completion, so the CPU is not involved per byte." },
            { q: "Explain SSTF vs SCAN.", a: "SSTF serves the request nearest the current head position. Average seek is low but distant requests can starve. SCAN (elevator) moves the head in one direction serving requests until the end, then reverses. Waiting time is bounded and fairer, at a slightly higher average seek. LOOK and C-LOOK are practical variants that turn at the last request." },
            { q: "What is DMA?", a: "Direct Memory Access lets a device controller transfer blocks of data to or from main memory without CPU involvement per word. The CPU only programs the transfer and handles a completion interrupt. It is used by disks, NICs and GPUs (and for PCIe peer-to-peer and GPUDirect in ML)." }
          ]
        },
        {
          id: "ipc",
          title: "IPC: pipes, shared memory, message queues, sockets, signals",
          est: "1-2 days",
          why: "\"How do two processes communicate?\" is common. Practical relevance: multiprocessing data loaders, model servers with worker processes, signals for graceful shutdown.",
          learn: [
            "Two models: <b>shared memory</b> (fast, needs sync) vs <b>message passing</b> (kernel-mediated, simpler, slower).",
            "<b>Pipes</b>: anonymous (parent-child, unidirectional, <code>|</code> in the shell) vs <b>named pipes (FIFOs)</b>.",
            "<b>Shared memory</b>: <code>shm_open/mmap</code>, System V shm. Synchronize with semaphores. Python <code>multiprocessing.shared_memory</code>.",
            "<b>Message queues</b>: POSIX/System V. Message boundaries, priorities.",
            "<b>Sockets</b>: Unix domain sockets (same host, fast) vs TCP/UDP sockets (network).",
            "<b>Signals</b>: SIGINT, SIGTERM, SIGKILL, SIGSEGV, SIGCHLD, SIGHUP. Handlers. Uncatchable SIGKILL/SIGSTOP. Async-signal safety.",
            "Other mechanisms: memory-mapped files, eventfd, D-Bus, and RPC/gRPC as IPC across machines.",
            "Choosing a mechanism: data size, latency, same host vs network, structure, synchronization needs."
          ],
          practice: [
            { t: "GFG: Inter Process Communication (IPC)", p: "GFG", d: "E" },
            { t: "GFG: pipe() system call", p: "GFG", d: "E" },
            { t: "Python: parent/child communication with multiprocessing.Pipe and Queue", p: "BUILD", d: "E" },
            { t: "Python: share a large NumPy array between processes with multiprocessing.shared_memory (no pickling)", p: "BUILD", d: "M" },
            { t: "Write a server that handles SIGTERM gracefully (finish in-flight requests, then exit)", p: "BUILD", d: "M" },
            { t: "Build a Unix-domain-socket echo server and client", p: "BUILD", d: "M" }
          ],
          notes: [
            "Shared memory is the fastest IPC: after setup there are no kernel copies. Pipes, queues and sockets copy user to kernel to user.",
            "Pipe semantics: a read blocks when empty, a write blocks when full (about 64 KB on Linux), and writing to a pipe with no readers raises SIGPIPE. Writes ≤ PIPE_BUF (4 KB) are atomic.",
            "SIGTERM (15) is a polite request that can be handled. SIGKILL (9) cannot be caught or ignored. <code>kill</code> sends SIGTERM by default. Docker stop sends SIGTERM, then SIGKILL after the grace period.",
            "PyTorch DataLoader workers are processes. Tensors move through shared memory, which is why Docker needs <code>--shm-size</code> (/dev/shm too small means a crash).",
            "Python multiprocessing Queue pickles objects, so large objects are slow. Use shared memory or memory-mapped files for big arrays.",
            "Signal handlers must be minimal (set a flag). Calling non-reentrant functions such as malloc or printf inside them is unsafe in C."
          ],
          cases: [
            "PID 1 in a container does not get default signal handling, so SIGTERM may be ignored and the container waits for SIGKILL. Use <code>tini</code> / <code>--init</code> or handle signals yourself.",
            "Anonymous pipes work only between related processes (they share fds through fork). Use FIFOs or sockets otherwise.",
            "Shared memory without synchronization means race conditions. IPC choice does not remove the need for locks.",
            "Unix domain sockets are much faster than TCP over localhost for same-host IPC (no TCP stack)."
          ],
          qa: [
            { q: "What IPC mechanisms exist and how do they compare?", a: "Pipes and FIFOs (byte streams, simple, unidirectional), message queues (discrete messages with priority), shared memory (fastest, zero-copy, needs explicit sync), sockets (bidirectional, Unix domain for local or TCP/UDP across machines), signals (asynchronous notifications only, no data), and memory-mapped files. Choose by data size, latency and locality." },
            { q: "Shared memory vs message passing?", a: "Shared memory maps the same physical pages into both processes. It is very fast with no copies after setup, but processes must synchronize themselves. Message passing goes through the kernel (pipes, queues, sockets). It is easier to reason about and works across machines, but copies data and adds syscall overhead." },
            { q: "Difference between SIGTERM and SIGKILL?", a: "SIGTERM asks a process to terminate. The process can catch it to clean up (flush, close connections, finish requests) or ignore it. SIGKILL is enforced by the kernel immediately and cannot be caught, blocked or ignored, so there is no cleanup. Graceful shutdown sends SIGTERM first, waits, then sends SIGKILL." }
          ]
        },
        {
          id: "concurrency-practice",
          title: "Concurrency in practice: Python GIL, threads vs processes vs async",
          est: "2 days",
          why: "A high-signal question for AI engineers: \"How would you parallelise preprocessing or serve an LLM API efficiently in Python?\" It tests whether you understand the OS beneath the code.",
          learn: [
            "<b>GIL</b> (CPython): only one thread executes Python bytecode at a time. It is released during blocking I/O and by many C extensions (NumPy, PyTorch ops).",
            "<b>CPU-bound</b> work goes to multiprocessing / ProcessPoolExecutor (or native code that releases the GIL). <b>I/O-bound</b> work goes to threads or asyncio.",
            "<b>asyncio</b>: single-threaded event loop, cooperative multitasking, <code>await</code> points, built on epoll/kqueue. One blocking call stalls everything.",
            "Threads vs processes vs coroutines: memory cost, switching cost, isolation, sharing data, failure behaviour.",
            "Free-threaded Python (PEP 703, 3.13+ experimental <code>python3.13t</code>): what changes, and why most production code still assumes the GIL.",
            "Process start methods: fork vs spawn vs forkserver, and why fork with threads or CUDA is dangerous (use spawn).",
            "Server models: thread-per-request, prefork worker processes (gunicorn), event loop (uvicorn/FastAPI), hybrid (gunicorn plus uvicorn workers).",
            "Amdahl's law and parallel speedup limits. Thread pools and bounded concurrency (semaphores for rate limits)."
          ],
          practice: [
            { t: "Benchmark a CPU-bound function with threads vs processes vs sequential and explain the result", p: "BUILD", d: "M" },
            { t: "Benchmark 100 HTTP calls with sequential, ThreadPoolExecutor and asyncio + httpx", p: "BUILD", d: "M" },
            { t: "Rate-limit concurrent LLM API calls with asyncio.Semaphore(10)", p: "BUILD", d: "M" },
            { t: "Find a blocking call inside an async FastAPI endpoint and fix it with run_in_executor / to_thread", p: "BUILD", d: "M" },
            { t: "Web Crawler Multithreaded (premium)", p: "LC", d: "M", u: "https://leetcode.com/problems/web-crawler-multithreaded/" },
            { t: "Python docs: concurrent.futures and asyncio", p: "DOC", d: "E", u: "https://docs.python.org/3/library/asyncio.html" }
          ],
          notes: [
            "Rule: <b>I/O-bound means asyncio or threads. CPU-bound means processes or native code.</b> Mixed workloads use an async front with a process pool for heavy work.",
            "The GIL makes the <i>interpreter</i> thread-safe, not your code. Read-modify-write sequences still need locks.",
            "Amdahl: <b>speedup = 1 / ((1-P) + P/N)</b>. With P = 0.9 the maximum is 10×, however many cores you add.",
            "asyncio tasks cost a few KB each, versus about 8 MB of virtual stack reserved per OS thread, which is why async scales to tens of thousands of connections.",
            "<code>asyncio.to_thread(fn)</code> / <code>loop.run_in_executor</code> offload blocking calls without freezing the event loop.",
            "Processes need pickling for arguments and results. Large data should go through shared memory, memory maps or files.",
            "CUDA plus fork means a broken CUDA context in the child. PyTorch multiprocessing uses spawn for GPU workers."
          ],
          cases: [
            "Calling <code>time.sleep()</code> or <code>requests.get()</code> inside an <code>async def</code> blocks the whole event loop. Use <code>await asyncio.sleep</code> / httpx.AsyncClient.",
            "\"Threads are useless in Python\" is wrong. They are great for I/O, and NumPy or PyTorch release the GIL in heavy ops.",
            "Too many processes means memory blow-up (each loads the model). For model serving use a single process with batching, or several processes with shared weights through COW or mmap.",
            "Forking a process that holds locks in other threads can deadlock the child, because the lock is copied in the locked state.",
            "Async is concurrency, not parallelism: one core, interleaved."
          ],
          qa: [
            { q: "What is the GIL and how does it affect multithreading?", a: "The Global Interpreter Lock is a mutex in CPython that allows only one thread to run Python bytecode at a time, which simplifies memory management (refcounting). So CPU-bound pure-Python threads do not run in parallel. I/O-bound threads still benefit because the GIL is released while waiting, as do C extensions that release it. For CPU parallelism use multiprocessing or native libraries." },
            { q: "Threads vs processes vs async: when do you use each?", a: "<b>Processes</b>: CPU-bound work and isolation; they cost memory and IPC. <b>Threads</b>: I/O-bound work with blocking libraries, or C code releasing the GIL; shared memory needs locks. <b>Async</b>: very many concurrent I/O operations (HTTP calls, websockets) on one thread with low overhead, but every library must be non-blocking." },
            { q: "Concurrency vs parallelism?", a: "Concurrency is structuring a program to deal with many tasks that overlap in time (interleaving, possibly on one core). Parallelism is executing several tasks at the same instant on multiple cores. Asyncio gives concurrency; multiprocessing gives parallelism." },
            { q: "How would you speed up preprocessing 1M images in Python?", a: "The work is CPU-bound, so use ProcessPoolExecutor or multiprocessing with chunked work (imap with chunksize), or vectorized or native libraries (PIL-SIMD, OpenCV, which release the GIL), or GPU decoding (DALI). Read files with threads if I/O is the bottleneck. Measure first and watch memory per worker." }
          ],
          code: `# I/O-bound: bounded concurrency with asyncio
import asyncio, httpx

async def fetch_all(urls, limit=10):
    sem = asyncio.Semaphore(limit)
    async with httpx.AsyncClient(timeout=10) as client:
        async def one(u):
            async with sem:                      # at most 'limit' in flight
                r = await client.get(u)
                return r.status_code
        return await asyncio.gather(*(one(u) for u in urls))

# CPU-bound: process pool
from concurrent.futures import ProcessPoolExecutor

def heavy(x):
    return sum(i * i for i in range(x))

if __name__ == "__main__":                       # required with spawn
    with ProcessPoolExecutor() as ex:
        results = list(ex.map(heavy, [10**6] * 8, chunksize=2))

# Blocking call inside async code -> offload to a thread
# result = await asyncio.to_thread(blocking_fn, arg)`
        },
        {
          id: "containers-virtualization",
          title: "Containers (namespaces, cgroups) & virtualization",
          est: "1-2 days",
          why: "Every AI or backend engineer ships with Docker and Kubernetes. \"Container vs VM\" and \"how does Docker isolate processes?\" connect OS fundamentals to daily work.",
          learn: [
            "<b>Virtualization</b>: the hypervisor. <b>Type 1</b> (bare metal: ESXi, KVM, Xen, Hyper-V) vs <b>Type 2</b> (hosted: VirtualBox, VMware Workstation).",
            "Full virtualization vs paravirtualization vs hardware-assisted (Intel VT-x/AMD-V). Nested page tables (EPT/NPT).",
            "<b>Containers</b> = ordinary processes isolated by kernel features, sharing the host kernel.",
            "<b>Namespaces</b>: PID, NET, MNT, UTS, IPC, USER, CGROUP (what each isolates).",
            "<b>cgroups</b>: limit and account for CPU, memory, I/O, PIDs. cgroups v2. OOM kills inside containers.",
            "Union / overlay file systems (OverlayFS) and image layers. Copy-on-write layers.",
            "Security: capabilities, seccomp, rootless containers. Why containers isolate less strongly than VMs. gVisor and Firecracker microVMs.",
            "GPU in containers: NVIDIA Container Toolkit exposes device files and driver libraries. The host driver is shared."
          ],
          practice: [
            { t: "GFG: Difference between Virtual Machines and Containers", p: "GFG", d: "E" },
            { t: "GFG: Types of Hypervisors", p: "GFG", d: "E" },
            { t: "Run <code>unshare --pid --fork --mount-proc bash</code> and observe ps showing PID 1", p: "BUILD", d: "M" },
            { t: "Run a container with <code>--memory=100m</code>, allocate 200 MB, observe the OOM kill and read the cgroup memory files", p: "BUILD", d: "M" },
            { t: "Inspect image layers with <code>docker history</code> and optimise a Dockerfile's layer caching", p: "BUILD", d: "E" },
            { t: "Talk: \"Containers from scratch\" (Liz Rice) - build a container in Go", p: "YT", d: "M" }
          ],
          notes: [
            "Container vs VM: a container shares the host kernel (MBs, starts in ms, weaker isolation). A VM has its own guest kernel on virtual hardware (GBs, starts in seconds or more, strong isolation).",
            "<b>Namespaces = what you can see</b>. <b>cgroups = how much you can use</b>.",
            "A Linux container cannot run a different kernel. Docker Desktop on Windows/macOS runs a lightweight Linux VM (WSL2 / HyperKit / Virtualization.framework).",
            "Container memory limits are enforced by the cgroup. Exceeding them triggers the OOM killer inside the cgroup (exit code 137 = 128 + SIGKILL 9).",
            "CPU limits use CFS quota/period. Throttling can hurt latency even at low average utilization.",
            "Python inside containers may see the host's CPU count (<code>os.cpu_count()</code>) rather than the cgroup quota, which oversubscribes worker pools. Use <code>os.sched_getaffinity</code> or set worker counts explicitly."
          ],
          cases: [
            "Exit code 137 means killed by SIGKILL, usually the OOM killer. Exit code 143 means SIGTERM.",
            "Root in a container is root on the host (without user namespaces) if it escapes. Run as non-root.",
            "Containers are not lightweight VMs: there is no init by default, signal handling is a PID 1 issue, and the kernel is shared.",
            "Hypervisor type confusion: KVM is a kernel module that turns Linux into a type-1 hypervisor (often debated; the common answer is type 1).",
            "Writes to the container's writable layer are slow (COW) and disappear with the container. Use volumes."
          ],
          qa: [
            { q: "Container vs virtual machine?", a: "A VM virtualizes hardware: a hypervisor runs full guest OSes with their own kernels. Isolation is strong, but VMs are heavy (GBs, slow boot). A container is a process (tree) on the host kernel, isolated with namespaces and limited by cgroups, packaged with its user-space filesystem. It is lightweight and starts fast, but the kernel is shared, so isolation is weaker." },
            { q: "How does Docker isolate a process?", a: "With Linux <b>namespaces</b> (separate PID tree, network stack, mount table, hostname, IPC and user ids, so the process sees its own world), <b>cgroups</b> (limit CPU, memory, I/O and PIDs), an OverlayFS root filesystem from image layers, and capabilities, seccomp and AppArmor or SELinux to restrict syscalls." },
            { q: "Type 1 vs Type 2 hypervisor?", a: "Type 1 runs directly on hardware and manages guests (ESXi, Xen, Hyper-V, KVM). It is used in data centres and clouds. Type 2 runs as an application on a host OS (VirtualBox, VMware Workstation) and is convenient for desktops, with more overhead." }
          ]
        },
        {
          id: "process-memory-advanced",
          title: "Copy-on-write, memory-mapped files, zombie & orphan processes",
          est: "1 day",
          why: "Favourite follow-ups after fork() and virtual memory. mmap and COW also explain how model weights get shared across worker processes.",
          learn: [
            "<b>Copy-on-write (COW)</b>: after fork, parent and child share read-only pages, and the first write triggers a page fault that copies the page. Also used in snapshots and COW file systems.",
            "<b>Memory-mapped files</b> (<code>mmap</code>): map a file into the address space. The page cache backs it, it loads lazily, and MAP_SHARED vs MAP_PRIVATE.",
            "Anonymous mmap (how malloc gets large blocks), and shared anonymous mappings for IPC.",
            "<b>Zombie process</b>: the child exited but the parent has not called wait(). Its entry stays in the process table with state Z.",
            "<b>Orphan process</b>: the parent died first, so the child is re-parented to init/systemd (or a subreaper), which reaps it.",
            "Reaping: wait/waitpid, a SIGCHLD handler, or <code>signal(SIGCHLD, SIG_IGN)</code> for auto-reap.",
            "Daemons: double fork, setsid, detaching from the terminal.",
            "Memory accounting: RSS vs VSZ vs PSS. Why COW-shared pages make RSS misleading."
          ],
          practice: [
            { t: "GFG: Zombie and Orphan Processes in C", p: "GFG", d: "E" },
            { t: "GFG: Copy on Write", p: "GFG", d: "E" },
            { t: "Create a zombie in Python (child exits, parent sleeps), observe <code>ps -o pid,stat,cmd</code> state Z, then fix with waitpid", p: "BUILD", d: "M" },
            { t: "Use numpy.memmap / np.load(mmap_mode='r') to read a 10 GB array without loading it into RAM", p: "BUILD", d: "M" },
            { t: "Load a model before forking gunicorn workers (--preload) and measure memory sharing via COW (PSS)", p: "BUILD", d: "H" },
            { t: "OSTEP Ch. 23 (Complete VM systems: COW, demand zeroing)", p: "BOOK", d: "M" }
          ],
          notes: [
            "fork plus COW makes fork cheap: only page tables are copied up front. exec right after fork throws away the shared pages anyway (vfork / posix_spawn are optimisations).",
            "In Python, COW sharing degrades over time because <b>refcount updates write to object headers</b>, which touches pages and copies them. <code>gc.freeze()</code> helps.",
            "mmap advantages: no read() copy into a user buffer, lazy loading, the OS handles caching, and several processes share one physical copy (safetensors and memory-mapped model weights).",
            "A zombie uses no memory or CPU, only a PID and process-table slot. Many zombies can exhaust PIDs.",
            "You cannot kill a zombie (it is already dead). Kill or fix the <b>parent</b>, so init adopts and reaps it.",
            "Orphans are harmless (init reaps them). Zombies come from parent bugs."
          ],
          cases: [
            "\"How do you kill a zombie?\" Trick question: send SIGCHLD to the parent or kill the parent. <code>kill -9 zombie_pid</code> does nothing.",
            "Containers: if PID 1 is your app and it does not reap, orphaned grandchildren become zombies. Use tini / dumb-init.",
            "MAP_PRIVATE writes are COW and never reach the file. MAP_SHARED writes reach the file (eventually; use msync for durability).",
            "mmap on network file systems, or a file truncated underneath you, gives SIGBUS.",
            "RSS double-counts shared pages across processes. Use PSS (smem) for real memory per worker."
          ],
          qa: [
            { q: "What is copy-on-write?", a: "An optimisation where a resource (memory pages after fork, file blocks in a snapshot) is shared read-only between copies, and duplicated only when one side writes to it. After fork, both processes map the same physical pages marked read-only. A write triggers a page fault and the kernel copies just that page." },
            { q: "Zombie vs orphan process?", a: "Zombie: the process has terminated but its parent has not read its exit status with wait(), so its process-table entry remains (state Z). Orphan: the process is still running but its parent has terminated, so it is adopted by init/systemd, which will reap it when it exits. Zombies are a parent bug; orphans are normal." },
            { q: "What is mmap and when would you use it?", a: "A syscall that maps a file (or anonymous memory) into a process's virtual address space, so file contents are accessed like memory and paged in on demand by the kernel. Use it for large read-mostly files (model weights, embeddings, datasets) without copying, random access into big files, and sharing memory between processes." }
          ]
        }
      ]
    }
  ]
});
