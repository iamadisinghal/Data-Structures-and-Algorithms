/* Free "Read & watch" references for the ML System Design (mlsd) and Career (career) tabs. */
PREP.add({ id: 'mlsd', refs: {
  'ml-lifecycle-framing': [
    { n: 'Chip Huyen — Machine Learning Interviews book (ML system design chapters)', u: 'https://huyenchip.com/ml-interviews-book/', k: 'book', d: 'free online; framing, design questions and what interviewers look for' },
    { n: 'Google — Rules of Machine Learning (Martin Zinkevich)', u: 'https://developers.google.com/machine-learning/guides/rules-of-ml', k: 'article', d: 'rule #1: do not be afraid to launch without ML; objectives, heuristics, phases' },
    { n: 'Google — Introduction to ML Problem Framing', u: 'https://developers.google.com/machine-learning/problem-framing', k: 'course', d: 'business goal to ML objective; when not to use ML' },
    { n: 'Stanford CS329S — Machine Learning Systems Design (Chip Huyen)', u: 'https://stanford-cs329s.github.io/', k: 'course', d: 'lecture notes/slides on the full ML lifecycle' },
    { n: 'Full Stack Deep Learning 2022 — Lecture: Development to Deployment / Project Management', u: 'https://fullstackdeeplearning.com/course/2022/', k: 'course', d: 'free lectures + notes on scoping and ML project lifecycle' },
    { n: 'Exponent — ML System Design Interview: framework walkthrough', k: 'video', d: 'how to structure the 45-minute ML design round' },
    { n: 'ByteByteGo — Machine Learning System Design Interview framework', k: 'video', d: 'clarify → frame → data → model → eval → serve → monitor' }
  ],
  'data-feature-store': [
    { n: 'Feast — documentation (concepts: offline/online store, registry, point-in-time joins)', u: 'https://docs.feast.dev/', k: 'docs' },
    { n: 'Made With ML — Feature Store lesson', u: 'https://madewithml.com/courses/mlops/feature-store/', k: 'notes', d: 'why feature stores exist, training-serving skew' },
    { n: 'Chip Huyen — Real-time machine learning: challenges and solutions', u: 'https://huyenchip.com/2022/01/02/real-time-machine-learning-challenges-and-solutions.html', k: 'blog', d: 'online features, streaming pipelines, batch vs stream' },
    { n: 'Uber Engineering — Meet Michelangelo: Uber’s Machine Learning Platform', u: 'https://www.uber.com/blog/michelangelo-machine-learning-platform/', k: 'blog', d: 'origin of the feature-store idea (Palette)' },
    { n: 'Google — Rules of ML: training-serving skew rules (#29–#37)', u: 'https://developers.google.com/machine-learning/guides/rules-of-ml', k: 'article' },
    { n: 'Stanford CS329S — Lecture: Data engineering & feature engineering', k: 'video' },
    { n: 'Full Stack Deep Learning — Lecture: Data Management', k: 'video' }
  ],
  'experiment-tracking-registry': [
    { n: 'MLflow — documentation (Tracking, Model Registry, aliases)', u: 'https://mlflow.org/docs/latest/index.html', k: 'docs' },
    { n: 'Weights & Biases — documentation (runs, sweeps, artifacts, registry)', u: 'https://docs.wandb.ai/', k: 'docs' },
    { n: 'Made With ML — Experiment Tracking lesson', u: 'https://madewithml.com/courses/mlops/experiment-tracking/', k: 'notes', d: 'MLflow hands-on' },
    { n: 'Full Stack Deep Learning 2022 — Lecture 2: Development Infrastructure & Tooling', u: 'https://fullstackdeeplearning.com/course/2022/', k: 'course', d: 'experiment management section' },
    { n: 'MLflow tutorial for beginners — end-to-end tracking and model registry', k: 'video' },
    { n: 'Weights & Biases (YouTube) — Intro to experiment tracking with W&B', k: 'video' }
  ],
  'model-serving': [
    { n: 'Chip Huyen — Machine learning is going real-time', u: 'https://huyenchip.com/2020/12/27/real-time-machine-learning.html', k: 'blog', d: 'batch vs online prediction; latency trade-offs' },
    { n: 'Made With ML — Serving lesson', u: 'https://madewithml.com/courses/mlops/serving/', k: 'notes' },
    { n: 'NVIDIA Triton Inference Server — documentation (dynamic batching, model repository)', k: 'docs' },
    { n: 'KServe — documentation (InferenceService, autoscaling, canary)', k: 'docs' },
    { n: 'Full Stack Deep Learning 2022 — Lecture 5: Deployment', u: 'https://fullstackdeeplearning.com/course/2022/', k: 'course', d: 'model-in-service vs model-as-service, batching, edge' },
    { n: 'Stanford CS329S — Lecture: Model deployment & prediction service', k: 'video' },
    { n: 'ByteByteGo — How ML models are served in production', k: 'video' }
  ],
  'containers-orchestration-cicd': [
    { n: 'Docker — Get started guide (images, layers, multi-stage builds)', u: 'https://docs.docker.com/get-started/', k: 'docs' },
    { n: 'Kubernetes — Concepts documentation (pods, deployments, services, HPA)', u: 'https://kubernetes.io/docs/concepts/', k: 'docs' },
    { n: 'Kubeflow — documentation (Pipelines)', u: 'https://www.kubeflow.org/docs/', k: 'docs' },
    { n: 'Apache Airflow — documentation (DAGs, operators, scheduling)', u: 'https://airflow.apache.org/docs/', k: 'docs' },
    { n: 'Google Cloud — MLOps: Continuous delivery and automation pipelines in machine learning', u: 'https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning', k: 'article', d: 'MLOps maturity levels 0/1/2 — classic interview reference' },
    { n: 'TechWorld with Nana — Docker Tutorial for Beginners / Kubernetes Tutorial for Beginners', k: 'video' },
    { n: 'Made With ML — CI/CD for ML lesson', u: 'https://madewithml.com/', k: 'course', d: 'see the MLOps course: testing, CI/CD, orchestration' }
  ],
  'ml-monitoring': [
    { n: 'Chip Huyen — Data Distribution Shifts and Monitoring', u: 'https://huyenchip.com/2022/02/07/data-distribution-shifts-and-monitoring.html', k: 'blog', d: 'the definitive free write-up: covariate/label/concept shift, detection' },
    { n: 'Evidently AI — documentation (data drift, presets, test suites)', u: 'https://docs.evidentlyai.com/', k: 'docs' },
    { n: 'Made With ML — Monitoring lesson', u: 'https://madewithml.com/courses/mlops/monitoring/', k: 'notes' },
    { n: 'Wikipedia — Concept drift', u: 'https://en.wikipedia.org/wiki/Concept_drift', k: 'article' },
    { n: 'Sculley et al. — Hidden Technical Debt in Machine Learning Systems (NeurIPS 2015)', k: 'paper', d: 'feedback loops, monitoring, why ML systems rot' },
    { n: 'Stanford CS329S — Lecture: Data distribution shifts & monitoring', k: 'video' },
    { n: 'Evidently AI (YouTube) — ML monitoring / Open-source ML observability course', k: 'playlist' }
  ],
  'cloud-ml-gpu-cost': [
    { n: 'AWS — Amazon SageMaker documentation', u: 'https://docs.aws.amazon.com/sagemaker/', k: 'docs', d: 'endpoints: real-time, serverless, async, batch transform' },
    { n: 'Microsoft Learn — Azure Machine Learning documentation', u: 'https://learn.microsoft.com/en-us/azure/machine-learning/', k: 'docs' },
    { n: 'Google Cloud — Vertex AI documentation', u: 'https://cloud.google.com/vertex-ai/docs', k: 'docs' },
    { n: 'Tim Dettmers — Which GPU(s) to Get for Deep Learning', u: 'https://timdettmers.com/2023/01/30/which-gpu-for-deep-learning/', k: 'blog', d: 'memory, tensor cores, cost per performance' },
    { n: 'Full Stack Deep Learning 2022 — Lecture 2: compute & GPU section', u: 'https://fullstackdeeplearning.com/course/2022/', k: 'course' },
    { n: 'Exponent / ByteByteGo — SageMaker vs Vertex AI vs Azure ML overview', k: 'video' }
  ],
  'recsys-design': [
    { n: 'Covington et al. — Deep Neural Networks for YouTube Recommendations (RecSys 2016)', k: 'paper', d: 'candidate generation + ranking funnel; must-read' },
    { n: 'Google — Recommendation Systems course', u: 'https://developers.google.com/machine-learning/recommendation', k: 'course', d: 'candidate generation, scoring, re-ranking, two-tower' },
    { n: 'Eugene Yan — System Design for Recommendations and Search', u: 'https://eugeneyan.com/writing/system-design-for-discovery/', k: 'blog', d: 'offline/online, retrieval/ranking split across companies' },
    { n: 'eugeneyan/applied-ml — curated papers & blogs (recsys section)', u: 'https://github.com/eugeneyan/applied-ml', k: 'notes' },
    { n: 'Cheng et al. — Wide & Deep Learning for Recommender Systems', u: 'https://arxiv.org/abs/1606.07792', k: 'paper' },
    { n: 'Netflix Tech Blog — recommendations / personalization posts', k: 'blog' },
    { n: 'Exponent — Design a YouTube/Netflix recommendation system (ML system design mock)', k: 'video' }
  ],
  'search-ranking': [
    { n: 'Haldar et al. — Applying Deep Learning To Airbnb Search', u: 'https://arxiv.org/abs/1810.09591', k: 'paper', d: 'honest journey from GBDT to NN ranking' },
    { n: 'Grbovic & Cheng — Real-time Personalization using Embeddings for Search Ranking at Airbnb (KDD 2018)', k: 'paper' },
    { n: 'Wikipedia — Learning to rank (pointwise / pairwise / listwise)', u: 'https://en.wikipedia.org/wiki/Learning_to_rank', k: 'article' },
    { n: 'Burges — From RankNet to LambdaRank to LambdaMART: An Overview (Microsoft Research)', k: 'paper' },
    { n: 'Eugene Yan — System Design for Recommendations and Search', u: 'https://eugeneyan.com/writing/system-design-for-discovery/', k: 'blog' },
    { n: 'Stanford CS276 — Information Retrieval and Web Search lectures (BM25, LTR)', k: 'course' },
    { n: 'Exponent — Design a search ranking system (ML system design)', k: 'video' }
  ],
  'ads-ctr': [
    { n: 'He et al. — Practical Lessons from Predicting Clicks on Ads at Facebook (ADKDD 2014)', k: 'paper', d: 'GBDT + LR, calibration, data freshness' },
    { n: 'Naumov et al. — Deep Learning Recommendation Model (DLRM)', u: 'https://arxiv.org/abs/1906.00091', k: 'paper' },
    { n: 'Guo et al. — DeepFM: A Factorization-Machine based Neural Network for CTR Prediction', u: 'https://arxiv.org/abs/1703.04247', k: 'paper' },
    { n: 'Wang et al. — Deep & Cross Network for Ad Click Predictions', u: 'https://arxiv.org/abs/1708.05123', k: 'paper' },
    { n: 'scikit-learn — Probability calibration user guide', u: 'https://scikit-learn.org/stable/modules/calibration.html', k: 'docs', d: 'Platt / isotonic, reliability diagrams' },
    { n: 'Chip Huyen — ML Interviews book (ads / CTR examples)', u: 'https://huyenchip.com/ml-interviews-book/', k: 'book' },
    { n: 'ByteByteGo / Exponent — Design an ad click prediction system', k: 'video' }
  ],
  'fraud-detection': [
    { n: 'Stripe Engineering — How we built it: Stripe Radar', k: 'blog', d: 'ML + rules + manual review in the payment path' },
    { n: 'imbalanced-learn — documentation (resampling, class imbalance)', u: 'https://imbalanced-learn.org/stable/', k: 'docs' },
    { n: 'Google — Imbalanced datasets (ML Crash Course)', u: 'https://developers.google.com/machine-learning/crash-course', k: 'course', d: 'see the datasets / class imbalance module' },
    { n: 'Uber Engineering / PayPal Tech blog — fraud detection with ML posts', k: 'blog' },
    { n: 'eugeneyan/applied-ml — fraud detection section', u: 'https://github.com/eugeneyan/applied-ml', k: 'notes' },
    { n: 'Exponent — Design a fraud detection system (ML system design)', k: 'video' },
    { n: 'StatQuest — ROC and AUC / Precision-Recall explained', k: 'video', d: 'operating points and PR-AUC under imbalance' }
  ],
  'feed-ranking': [
    { n: 'Meta AI — Powered by AI: Instagram’s Explore recommender system', k: 'blog', d: 'multi-stage retrieval + ranking at Instagram scale' },
    { n: 'LinkedIn Engineering — feed ranking / homepage feed posts', k: 'blog' },
    { n: 'Eugene Yan — System Design for Recommendations and Search', u: 'https://eugeneyan.com/writing/system-design-for-discovery/', k: 'blog' },
    { n: 'Google — Recommendation Systems course (re-ranking, freshness, diversity)', u: 'https://developers.google.com/machine-learning/recommendation', k: 'course' },
    { n: 'eugeneyan/applied-ml — feed / recsys papers', u: 'https://github.com/eugeneyan/applied-ml', k: 'notes' },
    { n: 'Exponent — Design a news feed ranking system (ML system design mock)', k: 'video' }
  ],
  'eta-prediction': [
    { n: 'Uber Engineering — DeepETA: How Uber Predicts Arrival Times Using Deep Learning', u: 'https://www.uber.com/blog/deepeta-how-uber-predicts-arrival-times/', k: 'blog' },
    { n: 'DoorDash Engineering — delivery time / ETA prediction posts', k: 'blog' },
    { n: 'Swiggy Bytes / Zomato tech blog — delivery time prediction', k: 'blog', d: 'Indian food-delivery context' },
    { n: 'Derrow-Pinion et al. — ETA Prediction with Graph Neural Networks in Google Maps', u: 'https://arxiv.org/abs/2108.11482', k: 'paper' },
    { n: 'eugeneyan/applied-ml — forecasting / ETA section', u: 'https://github.com/eugeneyan/applied-ml', k: 'notes' },
    { n: 'Exponent — Design an ETA prediction system (ML system design)', k: 'video' }
  ],
  'content-moderation': [
    { n: 'Meta AI — Harmful content detection / Few-Shot Learner blog posts', k: 'blog' },
    { n: 'Inan et al. — Llama Guard: LLM-based Input-Output Safeguard', u: 'https://arxiv.org/abs/2312.06674', k: 'paper' },
    { n: 'Perspective API (Jigsaw) — toxicity scoring', u: 'https://perspectiveapi.com/', k: 'docs' },
    { n: 'Chip Huyen — ML Interviews book (classification design, metrics)', u: 'https://huyenchip.com/ml-interviews-book/', k: 'book' },
    { n: 'eugeneyan/applied-ml — content moderation / spam section', u: 'https://github.com/eugeneyan/applied-ml', k: 'notes' },
    { n: 'ByteByteGo / Exponent — Design a harmful content detection system', k: 'video' }
  ],
  'enterprise-rag': [
    { n: 'Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', u: 'https://arxiv.org/abs/2005.11401', k: 'paper' },
    { n: 'Eugene Yan — Patterns for Building LLM-based Systems & Products', u: 'https://eugeneyan.com/writing/llm-patterns/', k: 'blog', d: 'RAG, evals, guardrails, caching' },
    { n: 'Chip Huyen — Building A Generative AI Platform', u: 'https://huyenchip.com/2024/07/25/genai-platform.html', k: 'blog', d: 'context construction, guardrails, router, cache, observability' },
    { n: 'Hugging Face — Advanced RAG (Open-Source AI Cookbook)', k: 'notes' },
    { n: 'Pinecone Learning Center — chunking strategies / RAG guides', k: 'article' },
    { n: 'Jerry Liu (LlamaIndex) — Building production RAG talks', k: 'video' },
    { n: 'ByteByteGo — How RAG works / Design an enterprise RAG system', k: 'video' }
  ],
  'llm-serving-platform': [
    { n: 'Kwon et al. — Efficient Memory Management for LLM Serving with PagedAttention (vLLM)', u: 'https://arxiv.org/abs/2309.06180', k: 'paper' },
    { n: 'vLLM — documentation', u: 'https://docs.vllm.ai/', k: 'docs', d: 'continuous batching, quantization, OpenAI-compatible server' },
    { n: 'Chip Huyen — Building A Generative AI Platform (gateway, routing, caching)', u: 'https://huyenchip.com/2024/07/25/genai-platform.html', k: 'blog' },
    { n: 'Hugging Face — Text Generation Inference (TGI) docs', k: 'docs' },
    { n: 'Anyscale blog — How continuous batching enables 23x throughput in LLM inference', k: 'blog' },
    { n: 'Stanford CS336 / CMU LLM systems — inference & serving lecture', k: 'video' },
    { n: 'Umar Jamil — KV cache / LLM inference explained', k: 'video' }
  ],
  'agent-platform': [
    { n: 'Anthropic — Building effective agents', u: 'https://www.anthropic.com/research/building-effective-agents', k: 'article', d: 'workflows vs agents, routing, orchestrator-workers' },
    { n: 'Chip Huyen — Agents', u: 'https://huyenchip.com/2025/01/07/agents.html', k: 'blog', d: 'tools, planning, failure modes, evaluation' },
    { n: 'Yao et al. — ReAct: Synergizing Reasoning and Acting in Language Models', u: 'https://arxiv.org/abs/2210.03629', k: 'paper' },
    { n: 'Lilian Weng — LLM Powered Autonomous Agents', u: 'https://lilianweng.github.io/posts/2023-06-23-agent/', k: 'blog' },
    { n: 'Hugging Face — AI Agents Course', u: 'https://huggingface.co/learn/agents-course', k: 'course' },
    { n: 'OWASP — Top 10 for LLM Applications (prompt injection, excessive agency)', k: 'docs' },
    { n: 'Andrew Ng / DeepLearning.AI — Agentic design patterns talk', k: 'video' }
  ],
  'llm-eval-platform': [
    { n: 'Hamel Husain — Your AI Product Needs Evals', u: 'https://hamel.dev/blog/posts/evals/', k: 'blog', d: 'unit tests, LLM-as-judge, human review, data flywheel' },
    { n: 'Eugene Yan — Task-Specific LLM Evals that Do & Don’t Work', u: 'https://eugeneyan.com/writing/evals/', k: 'blog' },
    { n: 'Eugene Yan — Evaluating the Effectiveness of LLM-Evaluators (LLM-as-judge)', u: 'https://eugeneyan.com/writing/llm-evaluators/', k: 'blog' },
    { n: 'Zheng et al. — Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena', u: 'https://arxiv.org/abs/2306.05685', k: 'paper' },
    { n: 'MLflow — LLM evaluation & tracing docs', u: 'https://mlflow.org/docs/latest/index.html', k: 'docs' },
    { n: 'Hamel Husain & Shreya Shankar — LLM evals talks / office hours', k: 'video' }
  ],
  'semantic-visual-search': [
    { n: 'Radford et al. — CLIP: Learning Transferable Visual Models From Natural Language Supervision', u: 'https://arxiv.org/abs/2103.00020', k: 'paper' },
    { n: 'Jing et al. — Visual Search at Pinterest', u: 'https://arxiv.org/abs/1505.07647', k: 'paper' },
    { n: 'Malkov & Yashunin — HNSW: Efficient and robust approximate nearest neighbor search', u: 'https://arxiv.org/abs/1603.09320', k: 'paper' },
    { n: 'FAISS — GitHub repo & wiki (IVF, PQ, HNSW indexes)', u: 'https://github.com/facebookresearch/faiss', k: 'docs' },
    { n: 'Pinecone Learning Center — Faiss / vector search tutorials', k: 'article' },
    { n: 'ByteByteGo / Exponent — Design a visual search system', k: 'video' },
    { n: 'James Briggs — vector search / HNSW explained', k: 'video' }
  ]
}});

PREP.add({ id: 'career', refs: {
  'self-assessment-targets': [
    { n: 'Tech Interview Handbook — home (career & interview guides)', u: 'https://www.techinterviewhandbook.org/', k: 'notes' },
    { n: 'Julia Evans — Get your work recognized: write a brag document', u: 'https://jvns.ca/blog/brag-documents/', k: 'blog', d: 'list your impact before you write the resume' },
    { n: 'levels.fyi — compare levels and titles across companies', u: 'https://www.levels.fyi/', k: 'docs', d: 'map your level to target companies' },
    { n: 'The Pragmatic Engineer — free posts on the tech job market and tiers of companies', u: 'https://blog.pragmaticengineer.com/', k: 'blog' },
    { n: 'Chip Huyen — ML Interviews book: ML roles and companies chapter', u: 'https://huyenchip.com/ml-interviews-book/', k: 'book', d: 'MLE vs research vs applied scientist vs DS' },
    { n: 'Exponent — How to choose the right tech role / company for you', k: 'video' }
  ],
  'resume': [
    { n: 'Tech Interview Handbook — Resume guide', u: 'https://www.techinterviewhandbook.org/resume/', k: 'notes', d: 'ATS, structure, bullet formula, examples' },
    { n: 'Laszlo Bock (Google) — My personal formula for a winning resume (XYZ formula, LinkedIn)', k: 'article' },
    { n: 'Jeff H Sipe — Software engineer resume tips / resume review videos', k: 'video' },
    { n: 'Dan Croitor — Resume review for software engineers', k: 'video' },
    { n: 'r/EngineeringResumes wiki — guidelines and templates', k: 'notes' },
    { n: 'Overleaf — Jake’s Resume template (free LaTeX)', k: 'docs' }
  ],
  'linkedin-github-portfolio': [
    { n: 'GitHub Docs — Managing your profile README', u: 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme', k: 'docs' },
    { n: 'Tech Interview Handbook — Resume guide (LinkedIn / portfolio tips)', u: 'https://www.techinterviewhandbook.org/resume/', k: 'notes' },
    { n: 'Hugging Face Spaces — documentation (free demo hosting)', u: 'https://huggingface.co/docs/hub/spaces', k: 'docs' },
    { n: 'Jeff H Sipe — How to optimise your LinkedIn profile for recruiters', k: 'video' },
    { n: 'Dan Croitor — LinkedIn tips for software engineers', k: 'video' },
    { n: 'LinkedIn Help — Add, edit or remove the Featured section', k: 'docs' }
  ],
  'signal-projects': [
    { n: 'Hamel Husain — Your AI Product Needs Evals', u: 'https://hamel.dev/blog/posts/evals/', k: 'blog', d: 'add a real eval section to your project' },
    { n: 'Made With ML — end-to-end production ML project course', u: 'https://madewithml.com/', k: 'course', d: 'template for a production-shaped project' },
    { n: 'Eugene Yan — How to Write Design Docs for Machine Learning Systems', u: 'https://eugeneyan.com/writing/ml-design-docs/', k: 'blog', d: 'write a design doc for your project README' },
    { n: 'Full Stack Deep Learning 2022 — LLM Bootcamp / course projects', u: 'https://fullstackdeeplearning.com/course/2022/', k: 'course' },
    { n: 'Chip Huyen — Building LLM applications for production', u: 'https://huyenchip.com/2023/04/11/llm-engineering.html', k: 'blog' },
    { n: 'Andrej Karpathy — Neural Networks: Zero to Hero (build-from-scratch projects)', k: 'playlist' }
  ],
  'referrals-outreach': [
    { n: 'Tech Interview Handbook — Getting referrals / applying for jobs', u: 'https://www.techinterviewhandbook.org/', k: 'notes' },
    { n: 'Jeff H Sipe — How to get a referral at big tech (cold message template)', k: 'video' },
    { n: 'Dan Croitor — How to cold message recruiters and engineers on LinkedIn', k: 'video' },
    { n: 'The Pragmatic Engineer — free posts on hiring and referrals', u: 'https://blog.pragmaticengineer.com/', k: 'blog' },
    { n: 'Exponent — How to network and get referrals for tech jobs', k: 'video' }
  ],
  'portals-recruiters': [
    { n: 'Naukri — job seeker career advice / profile tips (Naukri blog)', k: 'blog' },
    { n: 'Instahyre — job search tips blog', k: 'blog', d: 'curated product-company roles in India' },
    { n: 'Cutshort — blog for tech job seekers', k: 'blog' },
    { n: 'Wellfound (formerly AngelList Talent) — startup jobs', u: 'https://wellfound.com/', k: 'docs' },
    { n: 'LinkedIn Help — Job alerts and Easy Apply', k: 'docs' },
    { n: 'Jeff H Sipe — How to work with tech recruiters', k: 'video' }
  ],
  'notice-period': [
    { n: 'Notice period buyout in India: rules, taxation and negotiation (ClearTax / Economic Times explainer)', k: 'article' },
    { n: 'New Labour Codes and notice period / full and final settlement — explainer (Economic Times / Mint / PIB)', k: 'article', d: 'check current rules on F&F timelines' },
    { n: 'Instahyre / Cutshort blog — How to handle a 90-day notice period when switching jobs', k: 'blog' },
    { n: 'Naukri — How to negotiate early release from notice period', k: 'article' },
    { n: 'Indian HR / career YouTubers — notice period buyout explained', k: 'video' }
  ],
  'application-pipeline': [
    { n: 'Tech Interview Handbook — interview prep timeline & process', u: 'https://www.techinterviewhandbook.org/', k: 'notes' },
    { n: 'interviewing.io blog — data-driven posts on hiring funnels and resumes', u: 'https://interviewing.io/blog', k: 'blog' },
    { n: 'The Pragmatic Engineer — free posts on the state of the tech job market', u: 'https://blog.pragmaticengineer.com/', k: 'blog' },
    { n: 'Dan Croitor — How to track job applications / job search strategy', k: 'video' },
    { n: 'Jeff H Sipe — Job search strategy for software engineers', k: 'video' }
  ],
  'star-story-bank': [
    { n: 'Tech Interview Handbook — Behavioral interview guide', u: 'https://www.techinterviewhandbook.org/behavioral-interview/', k: 'notes', d: 'STAR, story bank, common questions' },
    { n: 'Tech Interview Handbook — Behavioral interview questions list', u: 'https://www.techinterviewhandbook.org/behavioral-interview-questions/', k: 'notes' },
    { n: 'Exponent — How to answer behavioral interview questions (STAR method)', k: 'video' },
    { n: 'A Life Engineered (Steve Huynh) — behavioral interview stories', k: 'video', d: 'ex-Amazon principal; how to structure stories with depth' },
    { n: 'Jeff H Sipe — Behavioral interview tips for software engineers', k: 'video' },
    { n: 'Dan Croitor — Behavioral interview prep', k: 'video' }
  ],
  'amazon-lp-mapping': [
    { n: 'Amazon Jobs — Leadership Principles', u: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles', k: 'docs', d: 'official one-paragraph description of all 16 LPs' },
    { n: 'Amazon Jobs — Interviewing at Amazon (STAR + LP guidance)', k: 'docs' },
    { n: 'A Life Engineered (Steve Huynh) — Amazon Leadership Principles interview videos', k: 'playlist' },
    { n: 'Dan Croitor — Amazon behavioral interview / Leadership Principles', k: 'video' },
    { n: 'Exponent — Amazon behavioral interview mock (Leadership Principles)', k: 'video' },
    { n: 'Tech Interview Handbook — Behavioral interview guide', u: 'https://www.techinterviewhandbook.org/behavioral-interview/', k: 'notes' }
  ],
  'tmay-why-leaving': [
    { n: 'Tech Interview Handbook — Self introduction', u: 'https://www.techinterviewhandbook.org/self-introduction/', k: 'notes' },
    { n: 'Tech Interview Handbook — Behavioral interview guide', u: 'https://www.techinterviewhandbook.org/behavioral-interview/', k: 'notes' },
    { n: 'Exponent — How to answer Tell me about yourself', k: 'video' },
    { n: 'Jeff H Sipe — Tell me about yourself for software engineers', k: 'video' },
    { n: 'Dan Croitor — Why are you leaving your current job? (how to answer)', k: 'video' }
  ],
  'project-deep-dive': [
    { n: 'Eugene Yan — How to Write Design Docs for Machine Learning Systems', u: 'https://eugeneyan.com/writing/ml-design-docs/', k: 'blog', d: 'structure your deep-dive like a design doc' },
    { n: 'Chip Huyen — ML Interviews book (past projects questions)', u: 'https://huyenchip.com/ml-interviews-book/', k: 'book' },
    { n: 'Tech Interview Handbook — Behavioral interview guide (project questions)', u: 'https://www.techinterviewhandbook.org/behavioral-interview/', k: 'notes' },
    { n: 'Excalidraw — free whiteboard for architecture diagrams', u: 'https://excalidraw.com/', k: 'docs' },
    { n: 'Exponent — Project deep dive interview: how to present your past work', k: 'video' },
    { n: 'A Life Engineered — How to talk about your projects in interviews', k: 'video' }
  ],
  'hm-culture-round': [
    { n: 'Tech Interview Handbook — Behavioral interview guide', u: 'https://www.techinterviewhandbook.org/behavioral-interview/', k: 'notes' },
    { n: 'The Pragmatic Engineer — free posts on engineering culture and managers', u: 'https://blog.pragmaticengineer.com/', k: 'blog' },
    { n: 'Exponent — Hiring manager interview mock', k: 'video' },
    { n: 'A Life Engineered — What hiring managers look for', k: 'video' },
    { n: 'Jeff H Sipe — Hiring manager round tips', k: 'video' }
  ],
  'mock-interviews': [
    { n: 'Tech Interview Handbook — Mock interviews', u: 'https://www.techinterviewhandbook.org/mock-interviews/', k: 'notes' },
    { n: 'interviewing.io — free anonymous mock interview recordings', u: 'https://interviewing.io/', k: 'video', d: 'watch real recorded mocks with feedback' },
    { n: 'Pramp (Exponent) — free peer mock interviews', u: 'https://www.pramp.com/', k: 'course' },
    { n: 'Exponent — mock interview videos (coding, system design, ML, behavioral)', k: 'playlist' },
    { n: 'interviewing.io blog — what interviewers actually look for', u: 'https://interviewing.io/blog', k: 'blog' }
  ],
  'questions-to-ask': [
    { n: 'Tech Interview Handbook — Final questions to ask your interviewers', u: 'https://www.techinterviewhandbook.org/final-questions/', k: 'notes' },
    { n: 'Julia Evans — Questions I’m asking in interviews', k: 'blog' },
    { n: 'The Pragmatic Engineer — questions to ask to assess engineering culture', k: 'blog' },
    { n: 'Exponent — Best questions to ask at the end of an interview', k: 'video' },
    { n: 'Jeff H Sipe — Questions to ask your interviewer', k: 'video' }
  ],
  'comp-india': [
    { n: 'Tech Interview Handbook — Understanding compensation', u: 'https://www.techinterviewhandbook.org/understanding-compensation/', k: 'notes', d: 'base, bonus, RSU vesting basics' },
    { n: 'levels.fyi — salaries by company and level (filter India)', u: 'https://www.levels.fyi/', k: 'docs' },
    { n: 'Income Tax Department (India) — official portal: tax calculator, new vs old regime', u: 'https://www.incometax.gov.in/', k: 'docs' },
    { n: 'CTC vs in-hand salary, PF, gratuity explained (ClearTax guide)', k: 'article' },
    { n: 'ESOP vs RSU taxation in India explained (Economic Times / Mint)', k: 'article' },
    { n: 'CTC breakdown and in-hand salary explained (Indian finance YouTube: e.g. CA Rachana Ranade)', k: 'video' }
  ],
  'negotiation': [
    { n: 'Haseeb Qureshi — Ten Rules for Negotiating a Job Offer (freeCodeCamp)', u: 'https://www.freecodecamp.org/news/ten-rules-for-negotiating-a-job-offer-ee17cccbdab6/', k: 'article', d: 'the classic; read with its sequel How not to bomb your offer negotiation' },
    { n: 'Tech Interview Handbook — Negotiation', u: 'https://www.techinterviewhandbook.org/negotiation/', k: 'notes' },
    { n: 'Patrick McKenzie — Salary Negotiation: Make More Money, Be More Valued', u: 'https://www.kalzumeus.com/2012/01/23/salary-negotiation/', k: 'article' },
    { n: 'levels.fyi blog — negotiation guides and offer data', u: 'https://www.levels.fyi/blog/', k: 'blog' },
    { n: 'Jeff H Sipe — How to negotiate a software engineer offer', k: 'video' },
    { n: 'A Life Engineered — Salary negotiation for software engineers', k: 'video' }
  ],
  'bgv-resignation': [
    { n: 'Background verification process in India — what is checked (AuthBridge blog)', k: 'blog' },
    { n: 'Relieving letter vs experience letter, full and final settlement explained (Economic Times / Mint)', k: 'article' },
    { n: 'EPFO — member portal: PF transfer and UAN', u: 'https://www.epfindia.gov.in/', k: 'docs', d: 'transfer PF to the new employer' },
    { n: 'How to write a resignation email and handover document (Naukri career advice)', k: 'article' },
    { n: 'Indian career YouTubers — how to resign professionally and handle BGV', k: 'video' }
  ],
  'first-90-days': [
    { n: 'The Pragmatic Engineer — onboarding and first months at a new job (free posts)', u: 'https://blog.pragmaticengineer.com/', k: 'blog' },
    { n: 'Julia Evans — Get your work recognized: write a brag document', u: 'https://jvns.ca/blog/brag-documents/', k: 'blog', d: 'start the brag doc on day 1' },
    { n: 'Michael Watkins — The First 90 Days (book summary, HBR)', k: 'book' },
    { n: 'Lara Hogan — blog on 1:1s and working with your manager', k: 'blog' },
    { n: 'A Life Engineered — What to do in your first 90 days as a software engineer', k: 'video' },
    { n: 'Exponent — How to succeed in your first months at a new tech job', k: 'video' }
  ]
}});
