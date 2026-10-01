/* ML System Design & MLOps */
PREP.add({
  id: "mlsd",
  order: 140,
  group: "AI / ML",
  title: "ML System Design & MLOps",
  short: "ML system design",
  blurb: "Designing ML systems end to end — and keeping them alive in production.",
  intro: [
    "ML system design rounds (45–60 min) test whether you can turn a vague business problem into a working, measurable, maintainable ML system. Interviewers grade <b>structure, trade-offs and production sense</b> far more than model novelty. Use the same skeleton every time and say it out loud:",
    "<b>1. Clarify the business goal</b> (who is the user, what does success mean, scale, latency, constraints) → <b>2. Frame as an ML task</b> (input, output, type: classification / ranking / regression / generation; what is the label?) → <b>3. Metrics</b> — offline (AUC, NDCG, recall@k, calibration) and online (CTR, watch time, revenue, guardrail metrics) → <b>4. Data & labels</b> (sources, implicit vs explicit labels, label delay, sampling, privacy) → <b>5. Features</b> (user, item, context, cross features, embeddings; freshness) → <b>6. Model</b> (heuristic / logistic regression baseline first, then GBDT, then deep models) → <b>7. Training pipeline</b> (splits by time, retraining cadence, reproducibility) → <b>8. Serving</b> (batch vs online, latency budget, caching, candidate generation + ranking funnels) → <b>9. Evaluation & A/B testing</b> → <b>10. Monitoring</b> (data drift, prediction drift, business KPIs, alerts) → <b>11. Iteration</b> (error analysis, feedback loops, next experiments).",
    "Budget time roughly: 5–8 min clarifying and framing, 10 min data/features, 10 min model, 10 min serving & scale, 5–10 min evaluation, monitoring and follow-ups. Draw the box diagram early; keep a running list of trade-offs and come back to them. Always state a <b>simple baseline</b> before a fancy model — it is the single most common signal of seniority.",
    "Level 1 builds the MLOps vocabulary every design answer leans on. Level 2 covers the classic product-company designs (recsys, search, ads, fraud, feed, ETA, moderation). Level 3 covers the GenAI designs that AI-first companies and GCCs now ask most."
  ],
  resources: [
    { n: "Designing Machine Learning Systems — Chip Huyen (O'Reilly)", u: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", d: "The best single book on production ML: data, features, deployment, drift, monitoring, infra. Read ch. 1–9 cover to cover." },
    { n: "Machine Learning System Design Interview — Ali Aminian & Alex Xu (ByteByteGo)", d: "Ten worked interview designs (visual search, YouTube recs, ads CTR, harmful content, feed, PYMK...) in exactly the interview format. Do every chapter on paper first." },
    { n: "Made With ML — Goku Mohandas", u: "https://madewithml.com/", d: "Free course that builds an end-to-end ML product: data, training, tracking, testing, serving, CI/CD. Best hands-on MLOps path." },
    { n: "Full Stack Deep Learning", u: "https://fullstackdeeplearning.com/", d: "Lectures on ML projects, infrastructure, deployment, monitoring and LLM apps. Great for the 'how do real teams do it' angle." },
    { n: "Eugene Yan — applied-ml (GitHub)", u: "https://github.com/eugeneyan/applied-ml", d: "Curated papers and engineering blogs on how companies do recsys, search, fraud, forecasting in production. Use it to collect real-world details for each design." },
    { n: "Evidently AI blog", u: "https://www.evidentlyai.com/blog", d: "Clear write-ups on data drift, concept drift, model monitoring and LLM evaluation, plus an ML system design case-study database." },
    { n: "MLflow documentation", u: "https://mlflow.org/docs/latest/index.html", d: "Experiment tracking, model registry, model serving, LLM tracing/evaluation. The default open-source MLOps tool to know." },
    { n: "Google — Rules of Machine Learning (Martin Zinkevich)", u: "https://developers.google.com/machine-learning/guides/rules-of-ml", d: "43 rules from Google production ML. Rules like 'launch with a heuristic', 'watch for training-serving skew' are perfect interview soundbites." }
  ],
  levels: [
    {
      name: "Level 1 · MLOps building blocks",
      desc: "The vocabulary and components every ML design answer is built from: lifecycle, data, tracking, serving, orchestration, monitoring, cloud.",
      topics: [
        {
          id: "ml-lifecycle-framing",
          title: "ML lifecycle & problem framing",
          est: "3–4 days",
          why: "The first 10 minutes of every ML design round. Weak framing (wrong label, wrong metric) sinks the rest of the interview no matter how good the model is.",
          learn: [
            "Memorise the 11-step design framework and practise saying it in under 60 seconds.",
            "Know the ML lifecycle: scoping → data → modelling → deployment → monitoring → iteration, and that it is a loop, not a line.",
            "Decide <b>when NOT to use ML</b>: rules work, no data, no tolerance for error, cannot measure success.",
            "Translate a business goal into an ML objective (e.g. 'increase engagement' → 'predict P(watch &gt; 30s)' ranked by expected watch time).",
            "Pick the ML task type: binary/multi-class/multi-label classification, regression, ranking (pointwise/pairwise/listwise), retrieval, generation.",
            "Separate <b>offline metrics</b> (AUC, log loss, NDCG, MAE) from <b>online metrics</b> (CTR, retention, revenue) and <b>guardrail metrics</b> (latency, complaints, unsubscribes).",
            "Write down functional and non-functional requirements: scale (QPS, users, items), latency p99, freshness, privacy, explainability, cost.",
            "Know the standard clarifying questions and have them as a checklist."
          ],
          practice: [
            { t: "Rules of ML — read rules 1–20 and note five you can quote", p: "DOC", d: "E", u: "https://developers.google.com/machine-learning/guides/rules-of-ml" },
            { t: "Designing ML Systems — ch. 1–2 (overview, project objectives)", p: "BOOK", d: "E" },
            { t: "ML System Design Interview — ch. 1 (the framework)", p: "BOOK", d: "E" },
            { t: "Frame 5 problems in 5 minutes each: churn, spam, job recommendations, demand forecasting, resume screening", p: "BUILD", d: "M" },
            { t: "Made With ML — product and system design lessons", p: "BLOG", d: "E", u: "https://madewithml.com/" },
            { t: "Record yourself framing 'design a news feed ranker' and replay it", p: "BUILD", d: "M" }
          ],
          notes: [
            "<b>Clarifying checklist:</b> business goal? users? scale (DAU, items, QPS)? latency? existing system/baseline? what data and labels exist? constraints (privacy, region, cost, explainability)? cold start? how will we measure success?",
            "<b>Label is the design.</b> 'Click' optimises clickbait, 'watch time' favours long videos, 'like' is sparse. Often combine: multi-task heads (click, like, share, hide) blended into one score with business weights.",
            "Proxy metric vs true goal: you train on a proxy (click) but are judged on a long-term goal (retention). Say this explicitly and propose guardrails.",
            "Ranking problems: pointwise (predict score per item, simplest), pairwise (which of two is better, e.g. RankNet/LambdaMART), listwise (optimise NDCG directly).",
            "Baseline ladder: heuristic (popularity, recency, rules) → logistic regression / GBDT on hand-made features → deep model. Each step must beat the previous one on offline + online metrics.",
            "Non-functional numbers to have ready: p99 &lt; 100–200 ms for ranking APIs, 1M items ranked via a funnel (retrieve ~1k, rank ~100, show ~10).",
            "Close the framing step by restating: 'So the ML task is X, input Y, label Z, optimised for offline metric A, judged online by B, with guardrails C.'"
          ],
          cases: [
            "Jumping straight to 'I'll use a transformer' without a label or metric — instant red flag.",
            "Choosing accuracy on a 1% positive-rate problem; use precision/recall, PR-AUC or cost-weighted metrics instead.",
            "Optimising a proxy that hurts users (clickbait, outrage) — add guardrail metrics and long-term holdouts.",
            "Ignoring label availability: if labels arrive weeks later (fraud chargebacks, loan defaults) your training and evaluation design changes.",
            "Not asking about scale: 10k users and 1B users lead to totally different serving designs.",
            "Over-scoping: pick one surface and one objective; mention extensions at the end."
          ],
          qa: [
            { q: "How do you decide whether a problem needs ML at all?", a: "Check if (1) there is a pattern too complex for rules, (2) enough data/labels exist or can be collected, (3) predictions are repeated at scale so the build cost pays off, (4) mistakes are tolerable and measurable. Otherwise ship rules/heuristics first — Rules of ML #1: don't be afraid to launch without ML." },
            { q: "Offline AUC went up but online CTR did not. Why?", a: "Possible reasons: offline/online metric mismatch (AUC measures global ranking, the product shows top-10 per user), training-serving skew, data leakage inflating offline scores, position/selection bias in logged data, novelty effects, or the test being underpowered. Check per-user ranking metrics, feature parity logs, and A/B power." },
            { q: "How do you pick the label for a video recommender?", a: "Start from the business goal (long-term satisfaction). Clicks are noisy and gameable; watch time is better but biased to long videos; explicit likes are sparse. Use multi-task learning on several signals (click, completion, like, share, dislike) and combine them with tunable weights validated by A/B tests, plus surveys as a quality guardrail." },
            { q: "What non-functional requirements matter in ML systems?", a: "Latency (p99), throughput/QPS, freshness of features and models, availability and fallbacks, cost (GPU hours, storage), privacy/compliance (PII, DPDP Act in India, GDPR), explainability for regulated domains, and fairness." }
          ]
        },
        {
          id: "data-feature-store",
          title: "Data pipelines, feature stores & training-serving skew",
          est: "4–5 days",
          why: "Most production ML failures are data failures. Interviewers probe how features are computed, kept fresh and kept consistent between training and serving.",
          learn: [
            "Batch vs streaming data pipelines: ETL/ELT with Spark/dbt vs Kafka + Flink/Spark Streaming.",
            "Feature types: batch features (daily user stats), near-real-time features (last 10 min clicks), request-time features (device, query).",
            "What a feature store is: offline store (warehouse/parquet for training) + online store (Redis/DynamoDB/Cassandra for low-latency lookups) + registry. Examples: Feast, Tecton, SageMaker/Vertex/Databricks feature stores.",
            "<b>Point-in-time correct joins</b>: build training rows using only feature values available at the event timestamp.",
            "<b>Training-serving skew</b>: causes (different code paths, stale features, different preprocessing) and fixes (shared transformation code, logging served features, feature store).",
            "Data validation: schema checks, null rates, ranges, distribution checks (Great Expectations, TFDV, Pandera).",
            "Data versioning and lineage: DVC, Delta Lake/Iceberg time travel, dataset snapshots tied to model versions.",
            "Sampling and splits: time-based splits, user-level splits to avoid leakage, negative sampling and its correction.",
            "Embeddings as features and how they are refreshed and versioned."
          ],
          practice: [
            { t: "Designing ML Systems — ch. 3–5 (data engineering, training data, feature engineering)", p: "BOOK", d: "M" },
            { t: "Feast quickstart: define an entity, feature view, materialise to online store", p: "BUILD", d: "M", u: "https://docs.feast.dev/" },
            { t: "Write a point-in-time join in pandas (merge_asof) for a churn dataset", p: "BUILD", d: "M" },
            { t: "Add Great Expectations or Pandera checks to a training pipeline", p: "BUILD", d: "M" },
            { t: "Made With ML — data lessons (exploration, preprocessing, versioning)", p: "BLOG", d: "E", u: "https://madewithml.com/" },
            { t: "Read 2 feature-store / ML platform blogs from eugeneyan/applied-ml (e.g. Uber Michelangelo)", p: "BLOG", d: "M", u: "https://github.com/eugeneyan/applied-ml" }
          ],
          notes: [
            "Feature store value prop in one line: <b>define a feature once, use the same values for training (offline) and serving (online), with point-in-time correctness</b>.",
            "Freshness ladder: daily batch (cheap) → hourly → streaming (minutes/seconds, costly). Ask how much freshness actually moves the metric before paying for streaming.",
            "Log-and-wait pattern: log the exact features used at serving time with the request ID, then join with labels later. Gives training data with zero skew.",
            "Leakage sources: features computed after the label time, target encoding without out-of-fold, random splits for time-series, duplicate users across train/test.",
            "Negative sampling for implicit feedback: sample unseen/unclicked items; correct for popularity with log-Q correction or sampling probabilities.",
            "Handle missing features explicitly (default value + missing indicator) and keep the same defaults in serving.",
            "Typical online store latencies: Redis single-digit ms; keep feature lookups within ~10–20 ms of a 100 ms budget, batch them per request."
          ],
          cases: [
            "Feature computed with SQL in training and re-implemented in Java at serving — classic silent skew. Share code or log served features.",
            "Backfilling a new feature with today's values for historical rows = future leakage.",
            "Online store goes down — need defaults/fallback model rather than failing the request.",
            "Upstream schema change (column renamed, units changed from seconds to ms) silently breaks the model; schema contracts and validation catch it.",
            "Highly cardinal IDs (user_id) as one-hot features blow up memory — use embeddings or hashing trick.",
            "Streaming features with late-arriving events need watermarks and windowing decisions."
          ],
          qa: [
            { q: "What is training-serving skew and how do you prevent it?", a: "A difference between the data/feature logic the model saw in training and what it gets in production. Prevent it with one shared feature definition (feature store or shared library), logging served features and training on them, point-in-time joins, schema validation, and monitoring feature distributions online vs training." },
            { q: "Do we need a feature store?", a: "Not always. For a single batch model, a warehouse table is enough. A feature store pays off when many models share features, you need low-latency online lookups, real-time features, and point-in-time correct training sets. Mention Feast (open-source) or the cloud-managed ones." },
            { q: "How do you split data for a recommendation model?", a: "Time-based: train on weeks 1–N, validate on week N+1, test on N+2, so the model never sees the future. For cold-start evaluation, also hold out a set of users/items entirely." },
            { q: "How do you build real-time features like 'transactions in the last 10 minutes'?", a: "Stream events through Kafka into a stream processor (Flink/Spark Structured Streaming) that maintains windowed aggregates per key and writes them to the online store (Redis). For training, compute the same aggregates from the event log with point-in-time logic, ideally with the same code." }
          ]
        },
        {
          id: "experiment-tracking-registry",
          title: "Experiment tracking & model registry (MLflow, W&B)",
          est: "2–3 days",
          why: "Expected hygiene in any ML engineering role; comes up in 'how do you reproduce a model' and 'how do you roll back' questions.",
          learn: [
            "What to track per run: code version (git SHA), data version, hyper-parameters, metrics, artifacts, environment.",
            "MLflow components: Tracking, Models (flavours), Model Registry (versions, aliases), Projects, and LLM tracing/evaluation.",
            "Weights & Biases: runs, sweeps, artifacts, reports; when teams prefer it over MLflow.",
            "Model registry workflow: register → validate → promote (alias like <code>champion</code>/<code>challenger</code> or stages) → deploy → archive.",
            "Reproducibility: seeds, pinned dependencies, containerised training, dataset snapshots.",
            "Hyper-parameter tuning: grid vs random vs Bayesian (Optuna), early stopping, budget.",
            "Model cards / documentation: intended use, data, metrics by slice, limitations."
          ],
          practice: [
            { t: "MLflow tracking quickstart: log params, metrics and a model", p: "DOC", d: "E", u: "https://mlflow.org/docs/latest/index.html" },
            { t: "Register a model, set a 'champion' alias and load it by alias in a serving script", p: "BUILD", d: "M" },
            { t: "Run an Optuna sweep and log every trial to MLflow or W&B", p: "BUILD", d: "M" },
            { t: "Made With ML — experiment tracking & tuning lessons", p: "BLOG", d: "E", u: "https://madewithml.com/" },
            { t: "Write a one-page model card for your current work project", p: "BUILD", d: "E" }
          ],
          notes: [
            "Registry = source of truth for 'which model is in prod'. Deployment pipelines should pull by alias/version, never from a laptop path.",
            "A run is reproducible only if you can rebuild it from: git SHA + data snapshot ID + config + container image.",
            "Promotion gates: offline metric beats champion on overall and key slices, latency within budget, no fairness regression, then shadow/canary/A-B.",
            "Rollback = repoint the alias to the previous version; keep N previous versions warm or easily loadable.",
            "Tag runs with owner, ticket, dataset and purpose so you can search later.",
            "For LLM apps, track prompts, model versions, retrieval configs and eval scores the same way (MLflow/LangSmith/W&B Weave)."
          ],
          cases: [
            "Metrics logged but not data version — you cannot explain why a retrain differs.",
            "Choosing the best run by test set over hundreds of trials — you have overfit the test set; keep a final untouched holdout.",
            "Registry exists but deploys still copy pickles manually — no audit trail.",
            "Pickle files tied to library versions break on load after upgrades — log the environment (conda/pip) with the model."
          ],
          qa: [
            { q: "How would you make an ML experiment reproducible?", a: "Version code (git), data (snapshot/DVC/Delta time travel), config and environment (Docker image, pinned deps), fix seeds, log everything in a tracker, and register the resulting model with links to all of these." },
            { q: "How do you promote a model to production safely?", a: "Automated evaluation vs the current champion on holdout and slices, register as challenger, deploy in shadow mode to compare predictions and latency, then canary/A-B on a small traffic share, monitor, then flip the alias. Rollback by moving the alias back." },
            { q: "MLflow vs W&B?", a: "MLflow is open-source, self-hostable, has a strong registry and integrates with Databricks; W&B is a hosted product with excellent visualisation, sweeps and collaboration. Both track runs; choose by hosting/compliance needs and team preference." }
          ]
        },
        {
          id: "model-serving",
          title: "Model serving: batch, online, streaming & model servers",
          est: "4–5 days",
          why: "Serving architecture is where interviewers check engineering depth: latency budgets, throughput, GPUs, fallbacks. Every design question has a serving section.",
          learn: [
            "<b>Batch</b> (precompute predictions nightly, store in a table/cache), <b>online</b> (synchronous request/response), <b>streaming</b> (consume events, emit predictions asynchronously).",
            "Latency budget breakdown: network, feature fetch, model inference, post-processing; p50 vs p99.",
            "Model servers: NVIDIA Triton (multi-framework, dynamic batching), TorchServe, TF Serving, BentoML, KServe/Seldon on Kubernetes, vLLM / TGI / SGLang for LLMs.",
            "REST vs gRPC: JSON simplicity vs protobuf speed/streaming; gRPC common for internal high-QPS services.",
            "Optimisation: dynamic batching, quantisation (INT8/FP8/4-bit), distillation, pruning, ONNX/TensorRT compilation, caching.",
            "LLM serving specifics: KV cache, continuous batching, PagedAttention (vLLM), tokens/sec, time-to-first-token, speculative decoding.",
            "Deployment strategies: shadow, canary, blue-green, A/B; rollback.",
            "Fallbacks: cached results, simpler model, popularity list, rule-based default.",
            "Edge/on-device serving trade-offs (privacy, latency, model size)."
          ],
          practice: [
            { t: "Serve a scikit-learn or PyTorch model behind FastAPI, load test with Locust", p: "BUILD", d: "M" },
            { t: "Serve an open model with vLLM and measure TTFT and tokens/sec at different concurrency", p: "BUILD", d: "H", u: "https://docs.vllm.ai/" },
            { t: "Triton Inference Server — read the dynamic batching and model ensemble docs", p: "DOC", d: "M", u: "https://github.com/triton-inference-server/server" },
            { t: "Export a model to ONNX and compare latency vs native PyTorch", p: "BUILD", d: "M" },
            { t: "Designing ML Systems — ch. 7 (deployment and prediction service)", p: "BOOK", d: "M" },
            { t: "Made With ML — serving lessons (Ray Serve)", p: "BLOG", d: "M", u: "https://madewithml.com/" }
          ],
          notes: [
            "Rule of thumb: use <b>batch</b> when inputs are known in advance and freshness of hours is fine (daily recommendations, churn scores); <b>online</b> when predictions depend on request context (search query, fraud on a transaction).",
            "Hybrid is common: batch-precompute candidate lists and embeddings, then do light online re-ranking with fresh context.",
            "Dynamic batching trades a few ms of queueing for much higher GPU throughput; set max batch size and max queue delay.",
            "LLM latency = TTFT (prefill, grows with prompt length) + output tokens × inter-token latency. Shorter prompts and prompt caching cut TTFT; smaller/quantised models cut per-token time.",
            "Autoscale on the right signal: GPU utilisation or queue depth / concurrent requests, not CPU.",
            "Shadow deploy: new model gets a copy of traffic, predictions are logged but not used — zero user risk, compares latency and output distribution.",
            "Always design a degraded mode: if the ranker times out at 80 ms, return the candidate generator's order or a cached list."
          ],
          cases: [
            "Batch predictions for users who signed up today don't exist — need online fallback for cold users.",
            "p99 latency explodes under load due to Python GIL / single worker — use multiple workers, async, or a C++ server like Triton.",
            "GPU idle most of the time because requests are served one by one — enable batching or use CPU for small models.",
            "Model loaded per request instead of at startup — huge latency spikes.",
            "Large model cold-start (pulling 20 GB weights) breaks autoscaling — keep warm replicas, use local caches.",
            "Canary on 1% traffic for one hour cannot detect small metric changes — size the experiment properly."
          ],
          qa: [
            { q: "Batch vs real-time inference — how do you choose?", a: "Ask: does the prediction depend on request-time context, how fresh must it be, how many entities, and cost. Batch is cheaper and simpler and serves from a key-value lookup; online handles new context and new users but needs low-latency features and autoscaled serving. Often use a hybrid." },
            { q: "How do you reduce inference latency of a deep model?", a: "Profile first. Then: smaller/distilled model, quantisation, ONNX/TensorRT compile, dynamic batching, GPU instead of CPU (or vice versa for tiny models), cache frequent predictions, precompute embeddings, reduce feature-fetch round trips, and move heavy models later in a funnel so they score fewer items." },
            { q: "Why does vLLM get higher throughput than naive HF generate?", a: "PagedAttention manages the KV cache in fixed-size blocks so memory isn't wasted on fragmentation, which allows many more concurrent sequences; continuous batching adds/removes sequences at every decoding step instead of waiting for a whole batch to finish. Together they keep the GPU busy." },
            { q: "REST or gRPC for a model service?", a: "REST/JSON for external, simple or browser-facing APIs; gRPC with protobuf for internal service-to-service calls where latency, payload size, strict schemas and streaming matter." }
          ]
        },
        {
          id: "containers-orchestration-cicd",
          title: "Containers, orchestration & CI/CD for ML",
          est: "4–5 days",
          why: "AI engineer roles expect you to ship, not just train. Docker + Kubernetes basics + pipeline orchestration come up in screening and design rounds.",
          learn: [
            "Docker: images vs containers, layers and caching, multi-stage builds, slim CUDA base images, <code>.dockerignore</code>.",
            "Kubernetes basics: pod, deployment, service, ingress, configmap/secret, HPA, node pools with GPUs, resource requests/limits.",
            "Workflow orchestration: Airflow (DAGs, operators, scheduling), Kubeflow Pipelines, Prefect/Dagster, cloud-native (SageMaker Pipelines, Vertex Pipelines).",
            "CI for ML: unit tests for feature code, data validation tests, model quality tests (min metric thresholds), linting, container builds.",
            "CD for ML: automatic training pipeline (CT — continuous training), registry promotion, deploy with canary, infra as code (Terraform).",
            "Google's MLOps maturity levels 0 (manual), 1 (pipeline automation), 2 (CI/CD of pipelines).",
            "Secrets and config management for model APIs (API keys, endpoints).",
            "Testing pyramid for ML: code tests, data tests, model behaviour tests (invariance, directional, minimum functionality)."
          ],
          practice: [
            { t: "Dockerise your FastAPI model service with a multi-stage build; get the image under 1 GB", p: "BUILD", d: "M" },
            { t: "Deploy it on a local Kubernetes (kind/minikube) with an HPA", p: "BUILD", d: "H" },
            { t: "Write an Airflow DAG: extract → validate → train → evaluate → register", p: "BUILD", d: "M", u: "https://airflow.apache.org/docs/" },
            { t: "GitHub Actions workflow: run tests + data checks + train small model + fail if metric below threshold", p: "BUILD", d: "M" },
            { t: "Kubeflow Pipelines — read the concepts guide", p: "DOC", d: "E", u: "https://www.kubeflow.org/docs/" },
            { t: "Made With ML — CI/CD and testing lessons", p: "BLOG", d: "M", u: "https://madewithml.com/" }
          ],
          notes: [
            "Two pipelines exist in ML: the <b>training pipeline</b> (data → model artifact) and the <b>serving pipeline</b> (request → prediction). CI/CD applies to both, plus the data.",
            "Airflow is a scheduler/orchestrator, not a compute engine — heavy work runs in Spark, Kubernetes jobs or cloud services triggered by Airflow.",
            "GPU pods: request <code>nvidia.com/gpu</code>, use node selectors/taints for GPU pools, and scale GPU nodes to zero when idle to control cost.",
            "Behaviour tests (from the CheckList paper): invariance (changing a name shouldn't change sentiment), directional (adding 'not' should flip), minimum functionality (simple cases must pass).",
            "Keep training and serving images versioned and tagged with git SHA; the registry entry should point to the image used.",
            "Retraining triggers: schedule (weekly), data volume, drift alert, or performance drop — all start the same automated pipeline."
          ],
          cases: [
            "Image includes the full training dataset or CUDA dev toolkit — multi-GB images slow every deploy.",
            "No resource limits — one pod eats the node's memory and evicts neighbours.",
            "Airflow DAG not idempotent — reruns double-write data; design tasks to be safely re-runnable for a given date partition.",
            "Model quality tests that always pass because the threshold is too low — compare against the current champion, not a fixed number.",
            "Secrets baked into the image or committed to git."
          ],
          qa: [
            { q: "What does CI/CD look like for an ML system?", a: "CI: on every commit run unit tests, data schema/validation tests, a small training run and model behaviour tests, build the container. CD/CT: a scheduled or triggered training pipeline produces a model, it's evaluated against the champion, registered, deployed via shadow/canary, and monitored with automatic rollback." },
            { q: "Airflow vs Kubeflow?", a: "Airflow is a general-purpose DAG scheduler popular for data/ETL and simple ML pipelines. Kubeflow Pipelines is Kubernetes-native, containerises every step, tracks artifacts and suits ML-heavy teams already on Kubernetes. Many teams use Airflow to trigger cloud ML pipelines." },
            { q: "How do you autoscale a GPU model service on Kubernetes?", a: "Use HPA/KEDA on custom metrics such as request queue length, concurrency or GPU utilisation; keep min replicas &gt; 0 for latency-critical services because GPU pods start slowly; use cluster autoscaler for GPU node pools." }
          ]
        },
        {
          id: "ml-monitoring",
          title: "Monitoring: drift, decay, alerting & retraining",
          est: "3–4 days",
          why: "'How do you know your model is still working?' is asked in almost every ML round. Shows you have operated a model, not just trained one.",
          learn: [
            "Types of shift: <b>covariate/data drift</b> P(X) changes, <b>label/prior shift</b> P(Y) changes, <b>concept drift</b> P(Y|X) changes.",
            "What to monitor: system metrics (latency, errors, throughput), data quality (nulls, schema), feature distributions, prediction distribution, model performance when labels arrive, business KPIs.",
            "Drift statistics: PSI, KL/JS divergence, Wasserstein, KS test, chi-square; their weaknesses on large samples.",
            "Monitoring with delayed labels: proxy metrics, prediction drift, partial labels, human-labelled samples.",
            "Alerting design: thresholds, windows, severity, owners, avoiding alert fatigue.",
            "Retraining strategies: scheduled, triggered, online/incremental learning; champion-challenger.",
            "Tools: Evidently, WhyLabs/whylogs, Arize, Fiddler, Prometheus + Grafana for system metrics.",
            "Segment-level monitoring: overall metrics hide drops in one region, device or new-user cohort."
          ],
          practice: [
            { t: "Designing ML Systems — ch. 8 (data distribution shifts and monitoring)", p: "BOOK", d: "M" },
            { t: "Evidently: generate a data drift report between two months of a dataset", p: "BUILD", d: "M", u: "https://github.com/evidentlyai/evidently" },
            { t: "Evidently blog — read the data drift and concept drift explainers", p: "BLOG", d: "E", u: "https://www.evidentlyai.com/blog" },
            { t: "Implement PSI from scratch in numpy and test it on shifted distributions", p: "BUILD", d: "M" },
            { t: "Design a monitoring dashboard (on paper) for a fraud model with 30-day label delay", p: "BUILD", d: "H" }
          ],
          notes: [
            "PSI rule of thumb: &lt; 0.1 stable, 0.1–0.25 moderate shift, &gt; 0.25 significant shift — say these are heuristics, not laws.",
            "Statistical tests flag tiny, harmless shifts when n is huge; prioritise drift on <b>important features</b> and tie alerts to performance impact.",
            "Prediction drift (score distribution, positive rate) is the earliest cheap signal when labels are delayed.",
            "Monitoring stack layers: infra (Prometheus/Grafana) → data quality → drift → model metrics → business KPIs. An incident often shows in one layer first.",
            "Retraining isn't free: each retrain needs validation and can introduce regressions. Prefer scheduled retrains plus drift-triggered retrains with gates.",
            "Feedback loops: the model's own decisions change future training data (e.g. a fraud model blocks transactions so you never see their labels). Keep a small random exploration/holdout.",
            "Write runbooks: for each alert, what to check and the safe action (rollback, fallback, retrain)."
          ],
          cases: [
            "Alerting on every feature with a KS test → hundreds of false alarms, team ignores alerts.",
            "Overall AUC stable but a new city / new app version silently broken — monitor by segment.",
            "Upstream pipeline sends all nulls; model outputs a constant score; no one notices without a prediction-distribution alert.",
            "Seasonality (Diwali sales, IPL season, month-end salary) looks like drift — compare with the same period last year.",
            "Retraining on data shaped by the model's own decisions reinforces its biases.",
            "Labels arrive weeks late, so a real drop is discovered a month after it started."
          ],
          qa: [
            { q: "Explain data drift vs concept drift with an example.", a: "Data drift: the input distribution changes — e.g. a loan app starts getting many younger applicants after a campaign. Concept drift: the relationship between inputs and the label changes — e.g. after a policy or economic change, the same income/profile now defaults at a different rate. Data drift may or may not hurt the model; concept drift almost always does." },
            { q: "How do you monitor a model whose labels arrive 30–60 days late?", a: "Monitor input data quality and feature drift, prediction distribution and decision rates daily; use early proxy labels (e.g. customer complaints, first-payment default); label a small random sample with humans; compute true performance on matured cohorts; set up retraining when matured performance or drift crosses thresholds." },
            { q: "When should you retrain?", a: "Combine a regular schedule tuned to how fast the domain changes (measured by training on old data and testing on newer windows) with triggers on drift or performance drop. Each retrain goes through the same evaluation gates and champion-challenger comparison." },
            { q: "What is PSI?", a: "Population Stability Index: bin a feature (or score), compute Σ (actual% − expected%) × ln(actual%/expected%) over bins between the reference and current windows. It measures distribution shift; common thresholds 0.1 and 0.25." }
          ]
        },
        {
          id: "cloud-ml-gpu-cost",
          title: "Cloud ML platforms, GPUs & cost",
          est: "2–3 days",
          why: "Indian product companies and GCCs run on AWS/Azure/GCP; questions about which managed service, which GPU and how much it costs signal real-world maturity.",
          learn: [
            "AWS SageMaker: training jobs, endpoints (real-time, serverless, async, batch transform), pipelines, model registry; Amazon Bedrock for hosted foundation models.",
            "Azure ML: workspaces, compute clusters, managed online endpoints, prompt flow; Azure OpenAI / AI Foundry for LLMs.",
            "GCP Vertex AI: training, endpoints, pipelines, feature store, Vertex AI Search, Gemini APIs.",
            "GPU landscape: T4/L4 (cheap inference), A10G, A100, H100/H200 and newer (large training and LLM serving); memory size is usually the binding constraint.",
            "Estimate LLM memory: weights ≈ params × bytes per param (7B in FP16 ≈ 14 GB, in 4-bit ≈ 4 GB) + KV cache.",
            "Cost levers: spot/preemptible instances for training, right-sizing, autoscaling to zero, batching, quantisation, caching, reserved capacity.",
            "Build vs buy: managed APIs (OpenAI/Anthropic/Gemini/Bedrock) vs self-hosted open models — cost, latency, data residency, control.",
            "Data residency and compliance for Indian clients (DPDP Act 2023, RBI data localisation for payments)."
          ],
          practice: [
            { t: "Deploy a model to a SageMaker or Azure ML or Vertex AI managed endpoint (free tier / credits)", p: "BUILD", d: "M" },
            { t: "Spreadsheet: cost per 1M requests for an API LLM vs self-hosted 8B model on one GPU", p: "BUILD", d: "M" },
            { t: "Read the docs page on SageMaker inference options (real-time vs serverless vs async vs batch)", p: "DOC", d: "E" },
            { t: "Full Stack Deep Learning — infrastructure & tooling lecture", p: "YT", d: "E", u: "https://fullstackdeeplearning.com/" }
          ],
          notes: [
            "Pick inference type by traffic shape: steady high QPS → real-time endpoint with autoscaling; spiky/low → serverless; large payloads or long jobs → async; offline scoring → batch transform.",
            "GPU memory math: 70B FP16 ≈ 140 GB → multiple GPUs with tensor parallelism; 70B in 4-bit ≈ 35–40 GB fits a single 80 GB GPU with room for KV cache.",
            "Self-hosting only wins on cost when utilisation is high and steady; at low volume, pay-per-token APIs are cheaper and simpler.",
            "Use spot instances for training with checkpointing every N steps so preemption only loses minutes.",
            "Track unit economics: cost per prediction / per 1k tokens / per user per month. Interviewers love it when you bring cost into the design.",
            "Multi-cloud is rarely worth it for a single team; mention it only for vendor lock-in or residency needs."
          ],
          cases: [
            "Leaving a GPU endpoint running 24×7 for a demo — the classic surprise bill. Autoscale to zero or schedule shutdowns.",
            "Choosing a GPU by FLOPs when the model does not fit in its memory.",
            "Sending customer PII to an external LLM API without checking contracts/residency.",
            "Ignoring egress costs when data is in one cloud and GPUs in another."
          ],
          qa: [
            { q: "Would you use a hosted LLM API or self-host an open model?", a: "Depends on volume, latency, data sensitivity and required quality. APIs: best quality, no ops, pay per token, but data leaves your boundary and costs scale linearly. Self-hosting: control, residency, fine-tuning, cheaper at high steady volume, but needs GPU ops and on-call. Many teams start with APIs and move high-volume, narrow tasks to fine-tuned small models." },
            { q: "How much GPU memory do you need to serve an 8B model?", a: "FP16 weights ≈ 16 GB, plus KV cache that grows with batch size × context length, plus overhead — a 24 GB GPU works for modest concurrency; quantising to 8-bit or 4-bit cuts weights to ~8 or ~5 GB and frees memory for more concurrent requests." },
            { q: "How do you cut ML infrastructure cost by 50%?", a: "Measure first (cost per component). Then: autoscale and scale to zero, spot for training, right-size instances, batch and quantise inference, cache repeated predictions, move batchable work offline, distil large models into smaller ones, and remove unused endpoints and stale features." }
          ]
        }
      ]
    },
    {
      name: "Level 2 · Classic ML system designs",
      desc: "The standard product-company designs. For each, walk the full framework: goal → task → metrics → data → features → model → serving → evaluation → monitoring.",
      topics: [
        {
          id: "recsys-design",
          title: "Recommendation system (YouTube / Netflix)",
          est: "5–6 days",
          why: "The most asked ML design question at product companies (Flipkart, Meesho, Swiggy, Netflix, Google, Meta). The candidate-generation → ranking → re-ranking funnel is reused in many other designs.",
          learn: [
            "Clarify: surface (home feed vs 'up next'), objective (watch time, satisfaction), scale (e.g. 100M users, 10M videos), latency (~200 ms), cold start needs.",
            "Frame: given user + context, rank items by predicted engagement value; multi-stage funnel.",
            "Metrics: offline recall@k for retrieval, NDCG/AUC/log-loss for ranking; online watch time, CTR, session length, retention, diversity, dislikes as guardrails.",
            "Data: impressions, clicks, watch time, likes, skips, searches, subscriptions; build positives/negatives from impression logs.",
            "<b>Candidate generation</b>: two-tower model (user tower, item tower, ANN search), item-to-item co-visitation, collaborative filtering/matrix factorisation, trending/popular, subscriptions. Merge sources.",
            "<b>Ranking</b>: richer model (GBDT or deep multi-task network — e.g. Wide & Deep, DLRM-style, MMoE) scoring ~hundreds of candidates with user, item, context and cross features.",
            "<b>Re-ranking</b>: business rules, diversity (MMR, max per creator), freshness, de-duplication, policy filters, exploration slots.",
            "Serving: precomputed item embeddings in an ANN index (FAISS/ScaNN/HNSW), user embedding computed online, feature store lookups, ranker on GPU/CPU, caching.",
            "Evaluation: offline replay, then A/B test with holdouts; long-term holdout for retention effects.",
            "Monitoring & iteration: embedding freshness, catalogue coverage, popularity bias, creator-side metrics."
          ],
          practice: [
            { t: "ML System Design Interview — YouTube video recommendation chapter", p: "BOOK", d: "M" },
            { t: "Paper: Deep Neural Networks for YouTube Recommendations (Covington et al., 2016)", p: "BLOG", d: "M" },
            { t: "Paper: Wide & Deep Learning for Recommender Systems (arXiv 1606.07792)", p: "BLOG", d: "M", u: "https://arxiv.org/abs/1606.07792" },
            { t: "Build a two-tower retrieval model on MovieLens + FAISS index; report recall@50", p: "BUILD", d: "H" },
            { t: "Eugene Yan's blog posts on recsys system design (via applied-ml repo links)", p: "BLOG", d: "M", u: "https://github.com/eugeneyan/applied-ml" },
            { t: "Whiteboard the full design in 40 minutes, timed, then compare with the book chapter", p: "BUILD", d: "H" }
          ],
          notes: [
            "Funnel numbers to quote: 10M items → retrieval ~1–2k (few ms with ANN) → light ranker ~500 → heavy ranker ~100 → re-rank → show ~20.",
            "Two-tower: user tower (history embeddings, demographics, context) and item tower (ID, content, creator) trained with in-batch negatives / sampled softmax; dot product = relevance. Item embeddings precomputed and indexed; user embedding computed at request time.",
            "Ranking features: user (history, demographics, subscriptions), item (age, popularity, category, creator stats, embeddings), context (time, device, location), cross (user-category affinity, user-creator past interactions).",
            "Multi-task ranker predicts P(click), E(watch time), P(like), P(share), P(dislike); final score = weighted combination tuned via A/B.",
            "Watch-time trick from the YouTube paper: weighted logistic regression where positives are weighted by watch time, so odds approximate expected watch time.",
            "Diversity/re-ranking: MMR or determinantal point processes; caps per creator/category; insert fresh and exploration items.",
            "Cold start: new users → popular/trending + onboarding interests + context; new items → content-based embeddings (title, thumbnail, audio) + exploration traffic boost."
          ],
          cases: [
            "<b>Cold start</b> for new users and new items — content features, popularity, explicit onboarding, bandit exploration.",
            "<b>Position bias</b>: items at top get clicked more regardless of relevance — log position, use position as a training feature set to a fixed value at serving, or inverse propensity weighting.",
            "<b>Feedback loops / popularity bias</b>: model only learns from what it showed — reserve exploration traffic, use randomised slots.",
            "Clickbait: optimising CTR alone; add watch-time/satisfaction and dislike signals.",
            "Stale embeddings for trending events (a cricket final) — near-real-time features and frequent retraining of the light layers.",
            "Latency budget blown by the heavy ranker — reduce candidates, distil, cache, move features to precomputed.",
            "Filter bubble and creator fairness — diversity constraints and creator-side metrics."
          ],
          qa: [
            { q: "Why split into candidate generation and ranking?", a: "You cannot run a heavy model over millions of items in 200 ms. Retrieval uses cheap models (ANN on embeddings, co-visitation) optimised for recall to get ~1k candidates; the ranker uses rich features and cross features optimised for precision on that small set. Each stage can be tuned and scaled independently." },
            { q: "How do you train the two-tower model and what negatives do you use?", a: "Positives are engaged (user, item) pairs; negatives are other items in the batch (in-batch negatives) plus random/easy negatives, with log-Q correction because in-batch negatives over-sample popular items. Optionally mine hard negatives (impressed but not clicked)." },
            { q: "How do you handle a new video uploaded 5 minutes ago?", a: "Its ID embedding is untrained, so use the item tower's content features (title/description text embeddings, thumbnail image embedding, creator embedding), give it exploration traffic in a fresh-items slot, and update its stats via real-time features as interactions arrive." },
            { q: "How do you evaluate offline before an A/B test?", a: "Time-based split; retrieval: recall@k/hit rate; ranking: AUC, log loss, NDCG@k computed per user on impression logs; check slices (new users, regions); also counterfactual/off-policy estimates when the logged policy differs. Then A/B on watch time, retention with guardrails." },
            { q: "How do you add diversity without hurting engagement?", a: "Re-rank with MMR (trade relevance vs similarity to already-selected items) or caps per creator/topic, tune the trade-off parameter via A/B; diversity often improves long-term retention even if short-term CTR dips slightly." }
          ]
        },
        {
          id: "search-ranking",
          title: "Search ranking & learning to rank",
          est: "4–5 days",
          why: "Asked at e-commerce (Flipkart, Amazon, Myntra), job platforms (LinkedIn, Naukri), food delivery and any company with a search bar.",
          learn: [
            "Clarify: product search vs document search, query volume, catalogue size, latency (~100–300 ms), languages (English + Hinglish + regional), personalisation.",
            "Pipeline: query understanding (spell correction, tokenisation, intent/category classification, query expansion) → retrieval → ranking → re-ranking/blending.",
            "Retrieval: lexical (BM25 on an inverted index — Elasticsearch/OpenSearch/Solr) + semantic (dense embeddings + ANN) = hybrid; merge with reciprocal rank fusion.",
            "Learning to rank: pointwise, pairwise (RankNet), listwise (LambdaMART/LambdaRank); GBDT LambdaMART is the strong classic baseline.",
            "Labels: human relevance judgements (graded 0–4) vs implicit clicks/add-to-cart/purchase; click models to debias.",
            "Features: query-document text match (BM25 score, embedding similarity), document quality (rating, popularity, price), personalisation, context.",
            "Metrics: NDCG@k, MRR, recall@k offline; CTR, conversion rate, zero-result rate, query reformulation rate, revenue per search online.",
            "Cross-encoders for re-ranking the top-k with high accuracy at higher cost."
          ],
          practice: [
            { t: "Build BM25 + dense hybrid retrieval over a product dataset, compare NDCG@10", p: "BUILD", d: "H" },
            { t: "Train a LambdaMART ranker with LightGBM (objective='lambdarank') on MSLR-WEB10K or a small LTR dataset", p: "BUILD", d: "M" },
            { t: "Read Airbnb's 'Applying Deep Learning to Airbnb Search' paper (find via applied-ml)", p: "BLOG", d: "M", u: "https://github.com/eugeneyan/applied-ml" },
            { t: "Whiteboard: design e-commerce search for an Indian marketplace with Hinglish queries", p: "BUILD", d: "H" }
          ],
          notes: [
            "Hybrid retrieval wins in practice: BM25 nails exact matches (SKUs, brand names, model numbers), dense handles synonyms and vague intent.",
            "Reciprocal rank fusion: score = Σ 1/(k + rank_i) with k≈60 — simple, robust, no score calibration needed.",
            "NDCG@k = DCG/ideal DCG, DCG = Σ (2^rel − 1)/log2(i+1); use graded labels.",
            "Click labels are biased by position and presentation; use click models or interleaving experiments for evaluation.",
            "Interleaving (team-draft) detects ranking improvements with far less traffic than A/B tests.",
            "Query understanding is often the biggest win: spell correction, transliteration and Hinglish handling ('joote' → shoes, 'kurti ladies'), category prediction to filter retrieval.",
            "Latency: inverted index retrieval ~10–30 ms, GBDT ranking of 500 docs few ms, cross-encoder on top-20 ~30–50 ms on GPU."
          ],
          cases: [
            "Zero-result queries — fall back to relaxed matching, spell correction, semantic retrieval; track zero-result rate.",
            "Position bias in click data — inverse propensity weighting or randomised top-k swaps to estimate propensities.",
            "Head vs tail queries behave differently; tail needs semantic retrieval, head can be cached.",
            "Sponsored results blending with organic — separate auctions, guard relevance.",
            "Personalisation overriding query intent (always showing the user's favourite brand).",
            "Out-of-stock or unserviceable items (pincode) must be filtered before ranking."
          ],
          qa: [
            { q: "Pointwise vs pairwise vs listwise LTR?", a: "Pointwise predicts a relevance score per document (regression/classification) — simple but ignores ordering. Pairwise learns which of two documents ranks higher (RankNet) — closer to the goal. Listwise optimises a list metric like NDCG directly (LambdaMART/ListNet). LambdaMART with GBDT is the go-to strong baseline." },
            { q: "How do you get relevance labels?", a: "Human raters with guidelines on a sampled query set (expensive, unbiased, graded), plus implicit signals at scale (click, add-to-cart, purchase, dwell) debiased for position. Use LLM-as-judge with human calibration to scale annotation." },
            { q: "How would you evaluate a new ranker before full launch?", a: "Offline NDCG/MRR on judged queries, slice by head/torso/tail and category; then interleaving for fast sensitivity; then A/B test on conversion, revenue per search, reformulation and zero-result rates with latency guardrails." }
          ]
        },
        {
          id: "ads-ctr",
          title: "Ads click-through-rate (CTR) prediction",
          est: "4–5 days",
          why: "Core to Google, Meta, Amazon ads, Flipkart ads, InMobi, Swiggy/Zomato ads. Tests calibration, huge sparse features and online learning.",
          learn: [
            "Clarify: ad format, auction type, scale (billions of impressions/day), latency (~10–50 ms per ad batch), objective (revenue with user experience guardrails).",
            "Frame: binary classification P(click | user, ad, context); expected value = bid × pCTR (× pCVR for conversion bids) used in the auction.",
            "Why <b>calibration</b> matters: predicted probabilities feed directly into pricing; measure with calibration plots, ECE, normalised cross entropy, predicted/actual CTR ratio.",
            "Features: user (demographics, interests, history), ad (advertiser, creative, category), context (placement, time, device), cross features (user × ad category). Very high cardinality.",
            "Models: logistic regression with hashed crosses (classic), GBDT + LR (Facebook 2014), Factorisation Machines / FFM, Wide & Deep, DeepFM, DCN, DLRM.",
            "Training: huge streaming data, online/incremental learning, negative downsampling with re-calibration.",
            "Metrics: log loss/normalised entropy, AUC, calibration offline; CTR, revenue per mille (RPM), advertiser ROI, user hide rate online.",
            "Serving: candidate ads from targeting + retrieval, pCTR model scores, auction, pacing/budget."
          ],
          practice: [
            { t: "ML System Design Interview — ad click prediction chapter", p: "BOOK", d: "M" },
            { t: "Paper: Practical Lessons from Predicting Clicks on Ads at Facebook (He et al., 2014)", p: "BLOG", d: "M" },
            { t: "Paper: DLRM — Deep Learning Recommendation Model (arXiv 1906.00091)", p: "BLOG", d: "H", u: "https://arxiv.org/abs/1906.00091" },
            { t: "Kaggle Criteo / Avazu CTR: LR with hashed features vs LightGBM vs DeepFM; compare log loss and calibration", p: "KG", d: "H" },
            { t: "Implement negative downsampling and the calibration correction q = p / (p + (1−p)/w)", p: "BUILD", d: "M" }
          ],
          notes: [
            "Negative downsampling with rate w: re-calibrate with q = p / (p + (1 − p)/w). Must mention — otherwise pCTR is inflated.",
            "Normalised entropy (Facebook) = log loss / entropy of the background CTR; lower is better and comparable across days.",
            "Freshness matters a lot: ad CTR models degrade within hours/days; use online learning or frequent incremental training.",
            "Hashing trick handles unbounded IDs; embedding tables for deep models can be hundreds of GB — sharded parameter servers.",
            "Separate models for pCTR and pCVR (post-click conversion) with selection-bias handling (ESMM-style training on the full impression space).",
            "Exploration for new ads: priors from advertiser/category, Thompson sampling or UCB boosts for new creatives."
          ],
          cases: [
            "Miscalibration after downsampling or distribution change → advertisers over/under-charged.",
            "Delayed conversions (purchase 7 days after click) — label delay modelling, attribution windows.",
            "Click fraud and bots inflating CTR — filter invalid traffic before training.",
            "New advertiser / new creative cold start.",
            "Ad fatigue: same ad shown repeatedly — frequency features and caps.",
            "Feedback loop: only shown ads get labels; exploration needed."
          ],
          qa: [
            { q: "Why is calibration more important for ads than for recommendations?", a: "In ads, pCTR multiplies the bid to rank and price ads in an auction; a model that's 20% over-confident overcharges advertisers or misallocates slots. In recsys only relative ordering matters, so AUC/NDCG are enough. Monitor predicted/actual CTR ratio by segment and recalibrate (Platt/isotonic)." },
            { q: "How do you handle billions of sparse features?", a: "Feature hashing into a fixed space, embeddings for ID features with sharded embedding tables, regularisation (L1 for LR, FTRL-Proximal for online sparse LR), frequency thresholds for rare IDs, and cross features learned by FM/DCN instead of manual enumeration." },
            { q: "How often would you retrain?", a: "Measure freshness decay by training on day D and evaluating on D+1, D+2...; ad models usually benefit from daily or online incremental updates, with periodic full retrains and monitoring of calibration after each update." }
          ]
        },
        {
          id: "fraud-detection",
          title: "Fraud detection (payments / transactions)",
          est: "4–5 days",
          why: "Huge in India: UPI/payments (Paytm, PhonePe, Razorpay, Cred), banks and fintech GCCs. Tests imbalance, real-time features, label delay and adversaries.",
          learn: [
            "Clarify: fraud type (card-not-present, account takeover, promo abuse, merchant fraud), decision (block, step-up OTP, review), latency (&lt;100 ms in payment path), cost of FP vs FN.",
            "Frame: binary classification with a risk score + decision thresholds; often rules + ML + human review.",
            "Metrics: precision/recall at operating point, PR-AUC, recall at fixed FPR, <b>₹ fraud loss prevented</b> vs <b>good-user friction</b> (decline rate, OTP challenge rate).",
            "Labels: chargebacks, disputes, confirmed investigations — <b>delayed by weeks</b>; noisy and incomplete.",
            "Features: velocity (txns in last 1 min/1 h/24 h per card/device/IP), amount vs user's usual, new device/location, merchant risk, time of day, graph features (shared devices, accounts).",
            "Models: rules baseline → GBDT (XGBoost/LightGBM) — industry workhorse; graph neural networks or graph features for fraud rings; anomaly detection for new patterns.",
            "Handling imbalance (~0.1% positives): class weights, focal loss, downsampling negatives, threshold tuning on cost; avoid naive SMOTE claims.",
            "Serving: real-time scoring in the payment path with streaming features; async deeper models for post-transaction review.",
            "Human-in-the-loop: review queues, analyst feedback as labels, case management."
          ],
          practice: [
            { t: "Kaggle: Credit Card Fraud Detection or IEEE-CIS Fraud — LightGBM with PR-AUC, cost-based threshold", p: "KG", d: "M" },
            { t: "Build velocity features with a time-window groupby and point-in-time correctness", p: "BUILD", d: "M" },
            { t: "Designing ML Systems — sections on class imbalance (ch. 4)", p: "BOOK", d: "E" },
            { t: "Read 2 fraud system blogs (Stripe Radar, Uber, PayPal) via applied-ml", p: "BLOG", d: "M", u: "https://github.com/eugeneyan/applied-ml" },
            { t: "Whiteboard: design UPI transaction fraud detection with &lt;100 ms latency", p: "BUILD", d: "H" }
          ],
          notes: [
            "Choose the threshold from a <b>cost matrix</b>: FN cost = fraud amount (+ chargeback fees), FP cost = lost sale + customer friction. Different thresholds per segment/amount band.",
            "Three-way decisions: approve / step-up auth (OTP, biometric) / decline-or-review. Step-up reduces FP cost dramatically.",
            "Velocity features in Redis via streaming (Flink/Kafka Streams) keyed by card, device, IP, UPI ID, merchant.",
            "Graph view: users, devices, cards, phone numbers, addresses as nodes; fraud rings share devices/phones. Connected components and degree features are cheap and strong.",
            "Rules still matter: fast to deploy against a new attack, interpretable for regulators; ML handles the long tail. Keep both and track overlap.",
            "Explainability: reason codes (top SHAP features) for analysts and for regulators/customers.",
            "Train on matured labels only (e.g. transactions older than 60 days) or model label delay explicitly."
          ],
          cases: [
            "<b>Class imbalance</b>: accuracy is useless; tune on PR curves and business cost.",
            "<b>Label delay</b>: recent transactions look 'not fraud' just because chargebacks haven't arrived — exclude immature data or use survival-style weighting.",
            "<b>Selective labels / feedback loop</b>: blocked transactions never get labels — keep a tiny random approve-and-monitor holdout or use analyst review.",
            "Adversarial adaptation: fraudsters probe thresholds; drift is fast; retrain often and monitor rule hit rates.",
            "Latency budget in the payment path — model must fit tens of ms; fall back to rules if the model times out.",
            "Festival spikes (Diwali, Big Billion Days) change normal behaviour — don't trigger mass false positives."
          ],
          qa: [
            { q: "How do you handle extreme class imbalance?", a: "Use the right metric (PR-AUC, recall at fixed precision/FPR, cost), class weights or focal loss, downsample negatives with recalibration, ensure enough positives via longer windows, and choose thresholds by expected cost. GBDTs handle imbalance well with scale_pos_weight." },
            { q: "Labels arrive 45 days later. How does this affect your design?", a: "Training uses matured windows; evaluation on recent data is incomplete, so monitor proxies (decline rate, score distribution, analyst-confirmed fraud, early disputes). Retrain on a rolling matured window; consider weighting or separate early-signal models." },
            { q: "How would you catch a brand-new fraud pattern the model has never seen?", a: "Anomaly detection (isolation forest/autoencoders) on behavioural features, graph-based alerts for new dense clusters, rapid rules from analysts, monitoring rule and score distributions, and fast retraining once labels arrive." },
            { q: "How do you explain a decline to an analyst or regulator?", a: "Return reason codes from SHAP/feature contributions (e.g. 'new device + 5 txns in 2 min + amount 8× usual'), keep model documentation, and log every decision with features for audit." }
          ]
        },
        {
          id: "feed-ranking",
          title: "Feed ranking (LinkedIn / Instagram)",
          est: "3–4 days",
          why: "Classic Meta/LinkedIn/ShareChat/Moj question. Similar funnel to recsys but with social graph, freshness and multi-objective trade-offs.",
          learn: [
            "Clarify: whose posts (friends/follows vs recommended), objective (meaningful engagement, time spent, creator health), freshness needs, scale.",
            "Frame: rank inventory of eligible posts per user by a weighted sum of predicted engagement probabilities.",
            "Candidate sources: posts from connections/follows in the last N days, groups, recommended (out-of-network) posts via embeddings, ads inserted separately.",
            "Multi-task model: P(click), P(like), P(comment), P(share), P(dwell &gt; t), P(hide/report); value model = Σ w_i × P_i.",
            "Features: author-viewer affinity (past interactions), post features (type, age, early engagement velocity), viewer features, context.",
            "Fan-out on write vs fan-out on read for building candidate inventories; celebrity problem.",
            "Metrics: offline per-task AUC/log loss; online DAU, sessions, meaningful interactions, creator-side metrics, negative feedback rate.",
            "Integrity filters and re-ranking: diversity by author/type, freshness, demotion of borderline content."
          ],
          practice: [
            { t: "ML System Design Interview — personalised news feed chapter", p: "BOOK", d: "M" },
            { t: "Read LinkedIn / Meta feed ranking engineering blogs (via applied-ml)", p: "BLOG", d: "M", u: "https://github.com/eugeneyan/applied-ml" },
            { t: "Whiteboard the feed design including fan-out choice, timed 40 min", p: "BUILD", d: "H" },
            { t: "Train a small multi-task model (shared bottom, two heads) on an engagement dataset", p: "BUILD", d: "H" }
          ],
          notes: [
            "Value model weights (e.g. comment &gt; share &gt; like &gt; click) encode product strategy; they're tuned by A/B tests, not learned by the model.",
            "Fan-out on write (push posts into followers' inboxes) is fast to read but expensive for celebrities; hybrid: push for normal users, pull for celebrities at read time.",
            "Early engagement velocity (likes in first 30 min) is a strong freshness feature — needs streaming features.",
            "MMoE / PLE architectures share representations across tasks while letting each head specialise; helps when tasks conflict.",
            "Negative signals (hide, unfollow, report) should have large negative weights; they are rare but predictive of churn.",
            "Seen-post filtering via a per-user bloom filter or seen-store."
          ],
          cases: [
            "Engagement-bait and outrage optimisation — integrity classifiers and negative-feedback weights.",
            "Position bias in engagement logs — position feature/IPS.",
            "Creator cold start — out-of-network exploration for new creators.",
            "Showing the same post repeatedly across sessions — seen filtering.",
            "Rich-get-richer for popular creators — fairness/exposure constraints.",
            "Freshness vs relevance: an old highly relevant post vs a new average one; time-decay features."
          ],
          qa: [
            { q: "How do you combine multiple engagement predictions into one ranking score?", a: "Train a multi-task model predicting each action's probability, then compute a value score Σ w_i P_i with weights reflecting business value (and negative weights for hides/reports). Tune weights through online experiments and keep guardrails on negative feedback and long-term retention." },
            { q: "Fan-out on write or read?", a: "Write-time fan-out precomputes inboxes for fast reads but is costly for accounts with millions of followers; read-time fan-out computes on request but is slower. Hybrid: fan-out on write for most users, merge celebrity posts at read time." },
            { q: "How do you measure 'meaningful' engagement rather than time spent?", a: "Define weighted interactions (comments, shares, replies between people), survey-based quality signals ('was this worth your time?'), long-term retention holdouts, and negative feedback rates as guardrails." }
          ]
        },
        {
          id: "eta-prediction",
          title: "ETA prediction (Uber / Swiggy / Zomato)",
          est: "3–4 days",
          why: "Very India-relevant (Swiggy, Zomato, Zepto, Ola, Rapido, Blinkit). Regression with spatio-temporal features, real-time data and asymmetric costs.",
          learn: [
            "Clarify: which ETA (restaurant prep, pickup, delivery, total), when it's shown (before order, after assignment, live), accuracy vs over/under-promise costs.",
            "Frame: regression of time-to-arrival; decompose into components (prep time + rider to restaurant + wait + travel to customer).",
            "Metrics: MAE, MAPE, P90 absolute error, % orders within ±5 min, under-estimation rate; online: conversion, cancellations, CSAT, compensation cost.",
            "Data: historical trips/orders with GPS traces, road graph, traffic, weather, restaurant load, rider supply, time/day, festival/rain flags.",
            "Features: routing engine ETA as a feature, distance, geohash/H3 cells, hour-of-week, real-time traffic speed, restaurant queue length, rider availability.",
            "Models: routing engine + GBDT residual correction (strong baseline), deep models (DeepETA-style transformers), quantile regression for ranges.",
            "Serving: online, low latency (called on every listing/menu view), caching per geohash pair and time bucket.",
            "Updates during the trip: recompute with live location."
          ],
          practice: [
            { t: "Read Uber's DeepETA engineering blog (search 'Uber DeepETA')", p: "BLOG", d: "M" },
            { t: "Read Swiggy / DoorDash delivery-time prediction blogs (via applied-ml)", p: "BLOG", d: "M", u: "https://github.com/eugeneyan/applied-ml" },
            { t: "Kaggle food delivery time dataset: GBDT with H3/geohash + time features; report MAE and P90", p: "KG", d: "M" },
            { t: "Train quantile regression (LightGBM objective='quantile') to output P50 and P90 ETA", p: "BUILD", d: "M" }
          ],
          notes: [
            "Residual modelling: predict actual − routing-engine ETA; the routing engine captures physics, ML captures local patterns (building entry, parking, restaurant delays).",
            "Asymmetric loss: under-promising (late) hurts more than over-promising — use quantile/asymmetric loss and show ranges ('25–30 min').",
            "Spatial encoding: H3 hexagons or geohash at multiple resolutions, embeddings for cells.",
            "Rain and festivals in Indian cities shift ETA massively — weather and event features, plus fast retraining or online calibration.",
            "Restaurant prep time is often the biggest error source — model it separately with kitchen load features.",
            "Evaluate by city, time of day and distance buckets; aggregate MAE hides peak-hour failures."
          ],
          cases: [
            "Label noise: riders marking 'delivered' early or late; GPS jitter — clean with geofences.",
            "Self-fulfilling ETAs: showing longer ETAs changes rider/restaurant behaviour.",
            "New city / new restaurant cold start — hierarchical priors from similar areas.",
            "Sudden events (rain, traffic jam, road closure) — real-time traffic features and quick recalibration.",
            "Feature computed using post-order info (actual route) leaking into training."
          ],
          qa: [
            { q: "Which loss would you use for ETA?", a: "MAE or Huber for robustness to outliers; quantile loss if you want P50/P90 and asymmetric costs; avoid plain MSE which over-weights rare extreme delays. Report MAE, P90 error and % within tolerance." },
            { q: "How do you decompose a food delivery ETA?", a: "Prep time (restaurant, dish count, current orders) + rider assignment/travel to restaurant + wait at restaurant + travel to customer (routing ETA + last-mile correction) + handover time. Separate models give better debugging and can be summed or fed into a final model." },
            { q: "How do you keep ETA accurate during heavy rain?", a: "Real-time features (current average delivery times per zone, traffic speed, rain intensity), short-window online recalibration of residuals, and monitoring of error per zone with alerts; product can widen the displayed range." }
          ]
        },
        {
          id: "content-moderation",
          title: "Content moderation / harmful content detection",
          est: "3–4 days",
          why: "Asked at Meta, Google, ShareChat, Moj, Dream11, and any UGC platform; India adds multilingual and code-mixed content. Also maps to LLM guardrails.",
          learn: [
            "Clarify: content types (text, image, video, live), harm categories (hate, violence, nudity, spam, misinformation, self-harm), languages, actions (remove, demote, blur, human review), latency (pre-publish vs post-publish).",
            "Frame: multi-label classification per policy category with calibrated scores and per-category thresholds.",
            "Metrics: precision/recall per category, prevalence (harmful views per 10k views), proactive detection rate, appeal overturn rate, reviewer workload.",
            "Data: policy-labelled examples from human reviewers, user reports (noisy), appeals; active learning to pick what to label.",
            "Models: per-modality encoders (multilingual text transformer e.g. XLM-R/MuRIL, image CNN/ViT, video frames + audio ASR) fused into a multimodal classifier; LLM classifiers for nuanced policy.",
            "Pipeline: hashing (perceptual hashes for known bad content) → cheap classifiers → heavy multimodal models → human review queue prioritised by severity × reach.",
            "Evaluation: per-language and per-category slices, adversarial tests, fairness across dialects/communities.",
            "Policy changes as label changes: versioned policies and relabelling."
          ],
          practice: [
            { t: "ML System Design Interview — harmful content detection chapter", p: "BOOK", d: "M" },
            { t: "Fine-tune a multilingual model (MuRIL/XLM-R) on a Hindi-English hate speech dataset", p: "BUILD", d: "H" },
            { t: "Read Meta's integrity / content understanding engineering blogs (via applied-ml)", p: "BLOG", d: "M", u: "https://github.com/eugeneyan/applied-ml" },
            { t: "Whiteboard: moderation for a short-video app in 10 Indian languages", p: "BUILD", d: "H" }
          ],
          notes: [
            "Prioritise review queue by expected harm = P(violating) × severity × expected reach (views in next hours).",
            "Multi-task multimodal model shares a backbone across harm types; one head per category with its own threshold.",
            "Late fusion (combine per-modality scores) is simpler and robust; early fusion (joint embedding) catches cross-modal harm (benign image + hateful caption).",
            "Known-bad content is cheaper to catch by perceptual hashing (PhotoDNA/PDQ-style) than by models.",
            "Prevalence is the north-star metric: what fraction of views were of violating content; it captures both detection and reach.",
            "Code-mixed and transliterated text (Hinglish in Latin script) needs specific training data; translate-then-classify loses slang."
          ],
          cases: [
            "Adversarial evasion: misspellings, leetspeak, text in images, emoji codes — OCR, character-level models, continuous red-teaming.",
            "Class imbalance and rare severe categories (CSAM, terrorism) — dedicated models, near-zero tolerance thresholds.",
            "Label noise and reviewer disagreement — clear guidelines, multiple raters, adjudication.",
            "Over-enforcement on specific dialects or communities — fairness slices.",
            "Context dependence (news reporting vs glorification) — include context and LLM reasoning for borderline cases.",
            "Live streams need near-real-time sampling of frames and audio."
          ],
          qa: [
            { q: "How do you decide thresholds for removal vs human review?", a: "Per category, using precision/recall curves: auto-remove above a high-precision threshold, send a middle band to human review sized by reviewer capacity, demote or do nothing below. Severe categories get lower thresholds. Revisit with appeal overturn rates." },
            { q: "How do you handle a new policy (e.g. new misinformation type) with no labels?", a: "Write guidelines, bootstrap labels with LLM zero/few-shot classification plus human verification, active learning to label the most uncertain items, then fine-tune a dedicated head; launch with conservative thresholds and human review." },
            { q: "Pre-publish or post-publish moderation?", a: "Pre-publish for high-severity, high-reach or ads content where a few hundred ms delay is acceptable; post-publish with fast async models for normal UGC to keep posting instant, combined with demotion until reviewed." }
          ]
        }
      ]
    },
    {
      name: "Level 3 · GenAI system designs",
      desc: "Designs that AI-first startups, big tech and GCCs ask for LLM/AI engineer roles: RAG, LLM serving, agents, evaluation, semantic search.",
      topics: [
        {
          id: "enterprise-rag",
          title: "Enterprise RAG assistant at scale",
          est: "5–6 days",
          why: "The most common GenAI design question for AI engineer roles in 2025–26, and it maps directly to services-company project work you can talk about.",
          learn: [
            "Clarify: users (employees, customers), corpus (size, formats: PDF, Confluence, SharePoint, tickets), freshness, languages, access control, latency (~2–5 s), accuracy and citation needs.",
            "Ingestion pipeline: connectors → parsing (layout-aware PDF, tables, OCR) → cleaning → chunking → embedding → index with metadata (source, ACLs, timestamps).",
            "Chunking strategies: fixed-size with overlap, structure-aware (headings/sections), semantic chunking, parent-child (retrieve small, return large).",
            "Retrieval: hybrid BM25 + dense, metadata filters (department, date, ACL), query rewriting / multi-query / HyDE, re-ranking with a cross-encoder.",
            "Generation: grounded prompt with citations, refusal when context lacks the answer, structured output.",
            "<b>Access control</b>: enforce document-level permissions at retrieval time (filter by user groups), never rely on the LLM to hide content.",
            "Evaluation: retrieval (recall@k, MRR), generation (faithfulness/groundedness, answer relevance, correctness), with a golden dataset + LLM-as-judge calibrated against humans.",
            "Serving & scale: vector DB choice (pgvector, OpenSearch, Pinecone, Weaviate, Qdrant, Milvus), caching (semantic cache), streaming responses, cost per query.",
            "Monitoring: user feedback, unanswered queries, retrieval failure analysis, latency/cost per query, hallucination sampling.",
            "Iteration: index freshness via incremental updates, fine-tuned embedding models, agentic/multi-hop retrieval for complex questions."
          ],
          practice: [
            { t: "Build a RAG over 500+ internal-style PDFs with hybrid retrieval + reranker; measure recall@5 before/after", p: "BUILD", d: "H" },
            { t: "Create a 100-question golden set and evaluate with RAGAS (faithfulness, context recall)", p: "BUILD", d: "M", u: "https://docs.ragas.io/" },
            { t: "Add document-level ACL filtering to the vector search and test leakage cases", p: "BUILD", d: "H" },
            { t: "Read Evidently's / Eugene Yan's posts on LLM evaluation and RAG patterns", p: "BLOG", d: "M", u: "https://www.evidentlyai.com/blog" },
            { t: "Whiteboard: RAG assistant for 50k employees across 2M documents, timed 45 min", p: "BUILD", d: "H" }
          ],
          notes: [
            "Architecture: [connectors] → [ingestion queue] → [parser/chunker] → [embedding service] → [vector + keyword index] ↔ [query service: rewrite → retrieve → rerank → prompt build] → [LLM gateway] → [answer + citations] → [feedback/eval store].",
            "Most RAG failures are retrieval failures. Debug in order: is the answer in the corpus? was it parsed correctly? chunked sensibly? retrieved in top-k? ranked high? then the prompt/LLM.",
            "Reranking top-50 with a cross-encoder to top-5 typically gives a big precision jump for small latency (~50–150 ms).",
            "Keep chunk metadata rich: title, section path, date, owner, ACL groups, doc version — enables filters and better citations.",
            "Incremental indexing: change data capture from sources, re-embed only changed docs, tombstone deleted docs (deletion must propagate for compliance).",
            "Cost/latency levers: smaller model for query rewriting, semantic cache for repeated questions, prompt caching for the system prompt, limit context to top-k after reranking.",
            "Guardrails: PII redaction, prompt-injection defence for content inside documents, topic restrictions, output filters."
          ],
          cases: [
            "Permission leakage: a user gets an answer from an HR doc they can't open — filter at retrieval, test with red-team users.",
            "Tables and scanned PDFs parsed badly → wrong answers; use layout-aware parsers/OCR and table-to-text.",
            "Stale or conflicting document versions — prefer latest version via metadata, show dates in citations.",
            "Questions needing aggregation across many docs ('how many policies changed in 2025') — RAG alone fails; route to SQL/analytics tools.",
            "Prompt injection hidden in a retrieved document ('ignore previous instructions').",
            "Embedding model change requires full re-index — version indexes and dual-run during migration.",
            "Hallucinated citations — verify cited chunk IDs exist and support the claim."
          ],
          qa: [
            { q: "How do you choose chunk size?", a: "Empirically against a golden set: try e.g. 256/512/1024 tokens with 10–20% overlap and structure-aware splits; smaller chunks give precise retrieval, larger give context. Parent-child retrieval gets both. Measure recall@k and answer faithfulness, not intuition." },
            { q: "How do you evaluate a RAG system?", a: "Separate retrieval and generation. Retrieval: recall@k/MRR on questions with known source chunks. Generation: faithfulness (claims supported by context), answer relevance, correctness vs reference, citation accuracy — via LLM-as-judge calibrated against human labels on a sample. Track online thumbs up/down, escalation and 'no answer' rates." },
            { q: "How do you handle document-level permissions?", a: "Ingest ACLs as metadata on each chunk, resolve the user's groups at query time (from SSO/AD), and apply them as a pre-filter in the vector/keyword search so unauthorised chunks never reach the prompt. Sync ACL changes quickly and audit with automated leakage tests." },
            { q: "When would you fine-tune instead of RAG?", a: "RAG for knowledge that changes and needs citations; fine-tuning for behaviour, format, tone or domain language, or to make a smaller model cheaper for a narrow task. They combine: fine-tuned embeddings or generator plus RAG." },
            { q: "How would you scale to 10M documents and 1k QPS?", a: "Sharded ANN index (HNSW/IVF-PQ) with replicas, metadata pre-filtering, horizontal query services, async ingestion workers, caching (semantic + results), LLM gateway with rate limits and multiple providers/replicas, and streaming responses to hide latency." }
          ]
        },
        {
          id: "llm-serving-platform",
          title: "LLM serving platform (multi-tenant, autoscaling, cost)",
          est: "4–5 days",
          why: "Asked for platform / infra-leaning AI roles and at companies building internal 'LLM gateways'. Tests GPU systems thinking and cost control.",
          learn: [
            "Clarify: internal platform vs public API, models (hosted APIs + self-hosted open models), tenants, QPS, latency SLOs (TTFT, tokens/sec), budget, compliance.",
            "LLM gateway: single API for many models/providers, auth, per-tenant quotas and rate limits (tokens/min), routing, retries/fallbacks, logging, cost attribution.",
            "Inference engines: vLLM, TGI, TensorRT-LLM, SGLang; continuous batching, PagedAttention, prefix/prompt caching, speculative decoding.",
            "Parallelism: tensor parallelism within a node, pipeline parallelism across nodes; when a model needs multiple GPUs.",
            "Autoscaling on queue depth / pending tokens / KV-cache utilisation; scale-up latency of loading large weights; min replicas.",
            "Multi-tenancy: isolation, priority classes (interactive vs batch), fairness, noisy-neighbour protection, LoRA adapters served on a shared base model (multi-LoRA).",
            "Cost: tokens in/out accounting, model routing (small model first, escalate to large), caching, batch APIs for offline jobs, quantisation.",
            "Observability: TTFT, inter-token latency, tokens/sec, GPU utilisation, error rates, cost per tenant; tracing of prompts with PII controls."
          ],
          practice: [
            { t: "Run vLLM with two LoRA adapters on one base model and benchmark throughput", p: "BUILD", d: "H", u: "https://docs.vllm.ai/" },
            { t: "Build a tiny gateway (FastAPI) with per-key token-bucket rate limiting and provider fallback", p: "BUILD", d: "M" },
            { t: "Read the vLLM docs on PagedAttention, prefix caching and distributed serving", p: "DOC", d: "M", u: "https://docs.vllm.ai/" },
            { t: "Whiteboard: internal LLM platform for 200 teams with a fixed monthly GPU budget", p: "BUILD", d: "H" }
          ],
          notes: [
            "Two SLOs: <b>TTFT</b> (prefill, compute-bound, grows with prompt) and <b>TPOT/ITL</b> (decode, memory-bandwidth-bound). Batching helps throughput but can raise per-request latency.",
            "KV cache size ≈ 2 × layers × KV heads × head_dim × bytes × tokens; it limits concurrency more than weights do for long contexts. GQA models need far less.",
            "Prefix caching shares the KV cache for common system prompts across requests — big savings for RAG/agents with long fixed prompts.",
            "Route by request: classifier or rules send easy requests to a small/cheap model and hard ones to a frontier model (model cascade).",
            "Separate pools for interactive (latency SLO) and batch/offline (throughput, can use spare capacity, preemptible).",
            "Multi-LoRA serving lets dozens of fine-tuned variants share one base model's GPUs.",
            "Fallback chain: primary self-hosted → secondary provider → degraded smaller model, with circuit breakers."
          ],
          cases: [
            "One tenant's batch job saturates GPUs and kills interactive latency — quotas, priority queues, separate pools.",
            "Long-context requests exhaust KV cache and cause preemption/thrashing — max context per tier, chunked prefill.",
            "Cold start of new replicas takes minutes — warm pools, faster weight loading (local NVMe, safetensors), predictive scaling.",
            "Provider outage or rate-limit (429) — multi-provider fallback and retries with backoff.",
            "Logging full prompts with PII — redaction and retention policies.",
            "Cost attribution missing — teams can't see or control their spend."
          ],
          qa: [
            { q: "How do you autoscale LLM inference?", a: "Scale on metrics that reflect load on the engine — pending requests/queue depth, KV-cache utilisation, or tokens/sec per replica — not CPU. Keep min warm replicas for interactive traffic, pre-pull weights, and use a separate preemptible pool for batch jobs." },
            { q: "How do you reduce LLM cost on a platform by 3×?", a: "Model routing/cascades (small model for easy queries), prompt and semantic caching, shorter prompts, prefix caching, quantised self-hosted models for high-volume narrow tasks, batch APIs for offline work, max-token limits, and per-team budgets with visibility." },
            { q: "What is continuous batching?", a: "Instead of static batches that wait for the longest sequence, the scheduler adds new requests and removes finished ones at every decode step, keeping the GPU fully utilised and cutting queueing latency." },
            { q: "How do you guarantee fairness across tenants?", a: "Per-tenant token-rate limits and quotas, weighted fair queueing in the scheduler, priority classes, separate pools for premium/latency-critical tenants, and monitoring per-tenant SLOs." }
          ]
        },
        {
          id: "agent-platform",
          title: "AI agent platform with tools & guardrails",
          est: "4–5 days",
          why: "Agents are the hottest AI engineering area; interviews ask how you'd make them reliable, safe and observable, not just how to call a tool.",
          learn: [
            "Clarify: use case (customer support, internal ops, coding, data analysis), tools/actions (read vs write), autonomy level, latency tolerance, risk of actions.",
            "Agent loop: plan → choose tool → call → observe → repeat until done or budget exhausted; ReAct pattern; function/tool calling with JSON schemas.",
            "Workflows vs agents: deterministic workflows (prompt chains, routers) for predictable tasks, agents only where flexibility is needed.",
            "Tool layer: tool registry with schemas, auth per user (act on behalf of the user with scoped tokens), MCP (Model Context Protocol) servers for standardised tool access.",
            "Memory: short-term (conversation/context), long-term (vector store/profile), state store for multi-step tasks; context management and summarisation.",
            "Guardrails: input filters (prompt injection, PII), tool permissioning, human approval for irreversible/high-value actions, output validation, rate and cost budgets.",
            "Orchestration frameworks: LangGraph, OpenAI Agents SDK, Claude Agent SDK, CrewAI, AutoGen — and when to write your own loop.",
            "Observability: traces of every step (LangSmith, Langfuse, MLflow tracing, OpenTelemetry), tool error rates, steps per task, cost per task.",
            "Evaluation: task success rate on scenario suites, trajectory evaluation, regression tests for prompts/tools."
          ],
          practice: [
            { t: "Build a support agent with 3 tools (order lookup, refund request with human approval, FAQ RAG) using LangGraph or an agents SDK", p: "BUILD", d: "H" },
            { t: "Write an MCP server exposing one internal tool and connect it to an agent", p: "BUILD", d: "M" },
            { t: "Create 30 scenario test cases and measure task success + avg steps + cost", p: "BUILD", d: "M" },
            { t: "Red-team your agent with 10 prompt-injection attempts via tool outputs; fix what breaks", p: "BUILD", d: "H" },
            { t: "Read Anthropic's 'Building effective agents' post", p: "BLOG", d: "E" }
          ],
          notes: [
            "Start with the simplest thing: a single LLM call with retrieval → prompt chain/router → only then an autonomous agent. Say this in the interview.",
            "Least privilege: tools get scoped credentials of the end user; write actions behind confirmation; dangerous tools (payments, deletes) require human-in-the-loop.",
            "Treat all tool outputs and retrieved content as untrusted input — the main prompt-injection vector.",
            "Budgets: max steps, max tokens, max wall-clock and max cost per task; graceful stop with a summary for a human.",
            "Make tools agent-friendly: clear names, descriptions, strict schemas, idempotency keys, helpful error messages the model can recover from.",
            "Durable execution for long tasks: persist state after every step so crashes/resumes don't repeat side effects.",
            "Metrics: task completion rate, human escalation rate, tool-call error rate, mean steps, p95 latency, cost per resolved task, CSAT."
          ],
          cases: [
            "Infinite loops / repeated tool calls — step limits, loop detection, reflection prompts.",
            "Prompt injection through an email or web page the agent reads, leading to data exfiltration.",
            "Non-idempotent tool retried after timeout → double refund; use idempotency keys.",
            "Context window overflow in long tasks — summarise, store state externally, sub-agents with narrow context.",
            "Hallucinated tool arguments (wrong order ID) — validate against schemas and existence checks.",
            "Model upgrade silently changes behaviour — regression suite before switching versions."
          ],
          qa: [
            { q: "When would you use an agent vs a fixed workflow?", a: "Fixed workflows when steps are known and predictable — cheaper, faster, testable. Agents when the path depends on intermediate results and the task space is open-ended. Often a workflow with one agentic step is the right compromise." },
            { q: "How do you stop an agent from taking a harmful action?", a: "Layered: least-privilege scoped tools, allow-lists, policy checks before execution, human approval for irreversible or high-value actions, output validation, budgets, and full audit trails. Never rely only on the system prompt." },
            { q: "How do you evaluate an agent?", a: "Scenario suites with expected outcomes (end state checks, e.g. 'refund created for order X'), trajectory checks (right tools, no unnecessary steps), LLM-as-judge for conversational quality, plus online metrics — completion, escalations, cost per task. Run the suite on every prompt/tool/model change." },
            { q: "What is MCP and why does it matter?", a: "Model Context Protocol is an open standard for exposing tools, resources and prompts to LLM applications through servers; it decouples tool implementations from the agent framework so one integration works across many clients." }
          ]
        },
        {
          id: "llm-eval-platform",
          title: "Evaluation & feedback platform for LLM apps",
          est: "3–4 days",
          why: "Evaluation is the #1 differentiator between demo and production LLM work; interviewers ask 'how do you know your change improved things?' in almost every GenAI round.",
          learn: [
            "Clarify: which apps, what quality dimensions (correctness, faithfulness, safety, tone, format), offline vs online, who labels.",
            "Datasets: golden sets built from real traffic, edge cases, adversarial cases; versioned; stratified by intent.",
            "Evaluators: exact/regex/schema checks, reference-based (similarity, F1), LLM-as-judge (pointwise rubric, pairwise preference), human review.",
            "Calibrating LLM judges: agreement with human labels (Cohen's kappa / accuracy), position and verbosity bias, judge prompts with rubrics and examples.",
            "Online signals: thumbs up/down, regenerations, copy events, escalations, conversation abandonment, implicit satisfaction.",
            "Tracing: capture inputs, retrieved context, tool calls, outputs, latency and cost per request; link feedback to traces.",
            "Experimentation: prompt/model versioning, offline eval gates in CI, A/B tests online.",
            "Feedback-to-improvement loop: triage failures → categorise → add to eval set → fix → re-run."
          ],
          practice: [
            { t: "Set up Langfuse or MLflow tracing for a small LLM app and log user feedback", p: "BUILD", d: "M", u: "https://mlflow.org/docs/latest/index.html" },
            { t: "Write an LLM-as-judge rubric and measure agreement with 50 of your own human labels", p: "BUILD", d: "M" },
            { t: "Add an eval gate in GitHub Actions: block merge if faithfulness drops &gt; 2 points", p: "BUILD", d: "H" },
            { t: "Evidently blog — LLM evaluation guides", p: "BLOG", d: "E", u: "https://www.evidentlyai.com/blog" },
            { t: "Read Hamel Husain's posts on LLM evals ('Your AI product needs evals')", p: "BLOG", d: "E" }
          ],
          notes: [
            "Start with <b>error analysis</b>: read 100 real traces, write failure categories, then build evaluators for the top categories — not generic metrics.",
            "Prefer binary/pass-fail judge criteria with clear rubrics over 1–10 scales; they are more consistent and easier to calibrate.",
            "Pairwise comparisons (A vs B) are more reliable than absolute scores for comparing prompts/models; randomise order to remove position bias.",
            "Eval set hygiene: version it, keep a held-out set you don't tune on, refresh from production every few weeks.",
            "Cost: run cheap deterministic checks on every commit, LLM-judge suites nightly or on release, humans on a small sample weekly.",
            "Architecture: [app SDK → trace collector] → [trace store] → [sampling + evaluators (async workers)] → [metrics DB + dashboards] → [annotation UI] → [datasets for regression/fine-tuning]."
          ],
          cases: [
            "LLM judge prefers longer answers (verbosity bias) or its own model family — calibrate and control.",
            "Eval set doesn't reflect production traffic → green dashboards, unhappy users.",
            "Thumbs-down data is sparse and skewed to angry users — combine with implicit signals and sampling.",
            "PII in traces used for evals — redaction and access controls.",
            "Overfitting prompts to the eval set — keep a hidden holdout."
          ],
          qa: [
            { q: "How do you know a prompt change is an improvement?", a: "Run it against the versioned eval set with the same evaluators as the baseline, compare per-category pass rates (not just the average), check latency and cost, review a sample of diffs manually, then ship behind an A/B or canary and watch online feedback." },
            { q: "Can you trust LLM-as-judge?", a: "Only after calibration: build a human-labelled sample, measure agreement, fix rubric ambiguities, control for position/verbosity bias, and periodically re-check. Use it for scale, humans for ground truth." },
            { q: "What would you log for each LLM request?", a: "Request ID, user/tenant (pseudonymised), prompt template version, model and parameters, retrieved docs IDs, tool calls, output, token counts, latency (TTFT, total), cost, safety flags and any user feedback — with PII redaction and retention limits." }
          ]
        },
        {
          id: "semantic-visual-search",
          title: "Semantic search / visual search",
          est: "3–4 days",
          why: "Asked at Pinterest, Google, Amazon, Myntra, Meesho (search-by-image), and as an embedding/ANN systems question in AI roles.",
          learn: [
            "Clarify: query type (text, image, both), corpus size (e.g. 100M images), latency (~100–200 ms), freshness of new items, what 'similar' means (exact product vs style).",
            "Frame: representation learning + nearest neighbour retrieval; optional re-ranking.",
            "Embedding models: CLIP/SigLIP-style image-text models, fine-tuned with contrastive loss (InfoNCE/triplet) on domain pairs (query–clicked item, same product photos).",
            "ANN indexes: HNSW (graph, high recall, memory heavy), IVF + PQ (compressed, scalable), ScaNN; FAISS, Milvus, Qdrant, OpenSearch k-NN, pgvector.",
            "Trade-offs: recall vs latency vs memory; tuning efSearch/nprobe; quantisation of vectors.",
            "Metrics: recall@k / precision@k / mAP on labelled pairs offline; online CTR, add-to-cart, search-by-image usage.",
            "Pipeline: ingestion → object detection/cropping (for visual search) → embedding → index (with metadata filters) → query embedding → ANN → filter/re-rank → results.",
            "Index updates: incremental adds, periodic rebuilds, re-embedding when the model changes."
          ],
          practice: [
            { t: "ML System Design Interview — visual search system chapter", p: "BOOK", d: "M" },
            { t: "Build image search over a fashion dataset with CLIP + FAISS (HNSW vs IVF-PQ); compare recall/latency/memory", p: "BUILD", d: "H" },
            { t: "FAISS wiki: index types and the guidelines for choosing an index", p: "DOC", d: "M", u: "https://github.com/facebookresearch/faiss/wiki" },
            { t: "Fine-tune a small embedding model with contrastive loss on query–product pairs", p: "BUILD", d: "H" }
          ],
          notes: [
            "Memory math: 100M × 768-dim float32 ≈ 300 GB; PQ to 64 bytes/vector ≈ 6.4 GB — this is why compression/IVF-PQ exists.",
            "HNSW: excellent recall/latency, but large memory and slower builds; IVF-PQ: compact, good at billion scale, needs training and re-ranking with full vectors.",
            "Two-stage: ANN on compressed vectors for top-1000, re-rank with exact vectors or a cross-encoder for top-50.",
            "For visual search, detect and crop the object first (user photo of a dress in a room) before embedding.",
            "Metadata filtering (price, in-stock, category) — pre-filter vs post-filter trade-off; post-filtering can return too few results.",
            "Hard-negative mining (visually similar but different products) improves fine-grained retrieval significantly."
          ],
          cases: [
            "Embedding model upgrade makes old and new vectors incompatible — full re-embed and shadow index, dual-write during migration.",
            "Near-duplicate results crowding the page — dedupe by product/cluster.",
            "Cold-start items not yet indexed — near-real-time incremental indexing.",
            "Domain gap: generic CLIP fails on fine-grained products (saree patterns) — fine-tune on domain data.",
            "Filters too restrictive with post-filtering → empty results; use filtered HNSW or pre-filter partitions."
          ],
          qa: [
            { q: "HNSW or IVF-PQ for 1B vectors?", a: "At 1B scale memory dominates: IVF-PQ (or HNSW over PQ-compressed vectors, or disk-based indexes like DiskANN) to fit in RAM across shards, with re-ranking using full-precision vectors for the top candidates. HNSW is preferred up to tens of millions when memory allows and recall/latency matter most." },
            { q: "How do you train embeddings for 'shop the look' visual search?", a: "Collect positive pairs (user photo crop ↔ catalogue product, same product different photos, query→purchased item), train a dual encoder with contrastive loss and in-batch + hard negatives, evaluate recall@k on held-out pairs, and fine-tune from a CLIP-like backbone." },
            { q: "How do you evaluate an ANN index?", a: "Recall@k against exact (brute-force) neighbours on a sample, p50/p99 latency at target QPS, memory footprint, build time and update cost. Tune efSearch/nprobe for the recall-latency curve." }
          ]
        }
      ]
    }
  ]
});
