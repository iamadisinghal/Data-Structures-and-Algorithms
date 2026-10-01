// Free "Read & watch" references for the Deep Learning (dl) and GenAI / LLMs (genai) tabs.
// Videos without u are turned into a YouTube search by the app; other entries without u become a web search.

PREP.add({ id: 'dl', refs: {
  'nn-basics': [
    { n: 'Deep Learning book (Goodfellow, Bengio, Courville) — Ch. 6 Deep Feedforward Networks', u: 'https://www.deeplearningbook.org/contents/mlp.html', k: 'book', d: 'XOR example, activations, universal approximation, theory' },
    { n: 'Dive into Deep Learning (d2l.ai) — 5.1 Multilayer Perceptrons', u: 'https://d2l.ai/chapter_multilayer-perceptrons/mlp.html', k: 'book', d: 'MLP with shapes + runnable PyTorch code' },
    { n: 'Stanford CS231n notes — Neural Networks Part 1: Setting up the Architecture', u: 'https://cs231n.github.io/neural-networks-1/', k: 'notes', d: 'neuron model, activation functions compared, layer sizing' },
    { n: 'Understanding Deep Learning (Simon Prince) — Ch. 3 Shallow & Ch. 4 Deep Neural Networks', u: 'https://udlbook.github.io/udlbook/', k: 'book', d: 'free PDF; best figures on why depth and ReLU regions matter' },
    { n: '3Blue1Brown — Neural Networks series (But what is a neural network?)', u: 'https://www.3blue1brown.com/topics/neural-networks', k: 'playlist', d: 'visual intuition for layers, weights, activations' },
    { n: 'StatQuest — The Essential Main Ideas of Neural Networks', k: 'video' },
    { n: 'MIT 6.S191 Introduction to Deep Learning — Lecture 1', u: 'http://introtodeeplearning.com/', k: 'course', d: 'free lectures + slides, perceptron to MLP' }
  ],
  'backprop': [
    { n: 'Andrej Karpathy — The spelled-out intro to neural networks and backpropagation: building micrograd', k: 'video', d: 'the single best backprop explainer; build autograd from scratch' },
    { n: 'Karpathy — micrograd (tiny autograd engine)', u: 'https://github.com/karpathy/micrograd', k: 'notes', d: 'read the ~100 lines of engine.py' },
    { n: 'Chris Olah — Calculus on Computational Graphs: Backpropagation', u: 'https://colah.github.io/posts/2015-08-Backprop/', k: 'blog', d: 'forward vs reverse-mode autodiff, why reverse wins' },
    { n: 'Stanford CS231n notes — Backpropagation, Intuitions', u: 'https://cs231n.github.io/optimization-2/', k: 'notes', d: 'local gradients, gradient gates, vectorised backprop' },
    { n: 'd2l.ai — 5.3 Forward Propagation, Backward Propagation, and Computational Graphs', u: 'https://d2l.ai/chapter_multilayer-perceptrons/backprop.html', k: 'book' },
    { n: '3Blue1Brown — Backpropagation calculus', k: 'video', d: 'chain rule on a tiny network, visually' },
    { n: 'Andrej Karpathy — Building makemore Part 4: Becoming a Backprop Ninja', k: 'video', d: 'manual backprop through BatchNorm, cross-entropy; interview-grade' }
  ],
  'loss-functions': [
    { n: 'Stanford CS231n notes — Linear Classification (SVM loss, Softmax / cross-entropy)', u: 'https://cs231n.github.io/linear-classify/', k: 'notes', d: 'cross-entropy as MLE / KL, numeric stability' },
    { n: 'Deep Learning book — Ch. 6.2 Gradient-Based Learning (cost functions, output units)', u: 'https://www.deeplearningbook.org/contents/mlp.html', k: 'book', d: 'MSE as Gaussian MLE, CE as categorical MLE' },
    { n: 'PyTorch docs — Loss functions (torch.nn)', u: 'https://pytorch.org/docs/stable/nn.html#loss-functions', k: 'docs', d: 'BCEWithLogitsLoss vs CrossEntropyLoss semantics' },
    { n: 'Lin et al. — Focal Loss for Dense Object Detection', u: 'https://arxiv.org/abs/1708.02002', k: 'paper', d: 'focal loss for class imbalance' },
    { n: 'Lilian Weng — Contrastive Representation Learning', u: 'https://lilianweng.github.io/posts/2021-05-31-contrastive/', k: 'blog', d: 'contrastive, triplet, InfoNCE losses in one place' },
    { n: 'StatQuest — Neural Networks Part 6: Cross Entropy', k: 'video' },
    { n: 'Raúl Gómez — Understanding Ranking Loss, Contrastive Loss, Margin Loss, Triplet Loss', k: 'blog' }
  ],
  'pytorch-fundamentals': [
    { n: 'PyTorch Tutorials — Learn the Basics (tensors, datasets, autograd, training loop)', u: 'https://pytorch.org/tutorials/beginner/basics/intro.html', k: 'docs', d: 'official end-to-end intro' },
    { n: 'PyTorch Tutorials — Automatic Differentiation with torch.autograd', u: 'https://pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html', k: 'docs' },
    { n: 'PyTorch docs — torch.utils.data (Dataset, DataLoader, samplers, workers)', u: 'https://pytorch.org/docs/stable/data.html', k: 'docs' },
    { n: 'Daniel Bourke — Learn PyTorch for Deep Learning (free online book)', u: 'https://www.learnpytorch.io/', k: 'book', d: 'workflow, custom datasets, modular code' },
    { n: 'Edward Z. Yang — PyTorch internals', u: 'http://blog.ezyang.com/2019/05/pytorch-internals/', k: 'blog', d: 'strides, views, contiguity, dispatch — for deep questions' },
    { n: 'freeCodeCamp (Daniel Bourke) — PyTorch for Deep Learning & Machine Learning – Full Course', k: 'video' },
    { n: 'Andrej Karpathy — Neural Networks: Zero to Hero', u: 'https://karpathy.ai/zero-to-hero.html', k: 'playlist', d: 'makemore series teaches idiomatic PyTorch' }
  ],
  'optimisation-training': [
    { n: 'Deep Learning book — Ch. 8 Optimization for Training Deep Models', u: 'https://www.deeplearningbook.org/contents/optimization.html', k: 'book', d: 'momentum, Adam, init, batch norm theory' },
    { n: 'Deep Learning book — Ch. 7 Regularization for Deep Learning', u: 'https://www.deeplearningbook.org/contents/regularization.html', k: 'book', d: 'weight decay, dropout, early stopping, augmentation' },
    { n: 'Sebastian Ruder — An overview of gradient descent optimization algorithms', u: 'https://www.ruder.io/optimizing-gradient-descent/', k: 'blog', d: 'SGD to Adam, compared clearly' },
    { n: 'Distill (Gabriel Goh) — Why Momentum Really Works', u: 'https://distill.pub/2017/momentum/', k: 'visual' },
    { n: 'Loshchilov & Hutter — Decoupled Weight Decay Regularization (AdamW)', u: 'https://arxiv.org/abs/1711.05101', k: 'paper', d: 'also: Adam 1412.6980, BatchNorm 1502.03167, He init 1502.01852' },
    { n: 'PyTorch Recipes — Automatic Mixed Precision', u: 'https://pytorch.org/tutorials/recipes/recipes/amp_recipe.html', k: 'docs', d: 'autocast + GradScaler' },
    { n: 'Andrej Karpathy — Building makemore Part 3: Activations & Gradients, BatchNorm', k: 'video', d: 'init, saturation, why BN works — hands on' }
  ],
  'cnns': [
    { n: 'Stanford CS231n notes — Convolutional Neural Networks', u: 'https://cs231n.github.io/convolutional-networks/', k: 'notes', d: 'output-size formula, params, receptive fields' },
    { n: 'd2l.ai — Ch. 7 Convolutional Neural Networks & 8.6 ResNet', u: 'https://d2l.ai/chapter_convolutional-modern/resnet.html', k: 'book' },
    { n: 'Deep Learning book — Ch. 9 Convolutional Networks', u: 'https://www.deeplearningbook.org/contents/convnets.html', k: 'book', d: 'equivariance, pooling, theory' },
    { n: 'Dumoulin & Visin — A guide to convolution arithmetic for deep learning', u: 'https://arxiv.org/abs/1603.07285', k: 'paper', d: 'padding/stride/dilation/transposed conv with diagrams' },
    { n: 'He et al. — Deep Residual Learning for Image Recognition (ResNet)', u: 'https://arxiv.org/abs/1512.03385', k: 'paper' },
    { n: 'PyTorch Tutorials — Transfer Learning for Computer Vision', u: 'https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html', k: 'docs', d: 'fine-tune vs feature extractor' },
    { n: 'Stanford CS231n (2017) lecture videos — Lecture 5 CNNs, Lecture 9 CNN Architectures', k: 'playlist' },
  ],
  'rnns': [
    { n: 'Chris Olah — Understanding LSTM Networks', u: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/', k: 'blog', d: 'the canonical gate-by-gate LSTM explanation' },
    { n: 'Andrej Karpathy — The Unreasonable Effectiveness of Recurrent Neural Networks', u: 'https://karpathy.github.io/2015/05/21/rnn-effectiveness/', k: 'blog' },
    { n: 'd2l.ai — 10.1 Long Short-Term Memory (LSTM) and the Modern RNNs chapter', u: 'https://d2l.ai/chapter_recurrent-modern/lstm.html', k: 'book', d: 'also GRU, seq2seq, beam search sections' },
    { n: 'Deep Learning book — Ch. 10 Sequence Modeling: Recurrent and Recursive Nets', u: 'https://www.deeplearningbook.org/contents/rnn.html', k: 'book', d: 'BPTT, vanishing gradients theory' },
    { n: 'Jay Alammar — Visualizing A Neural Machine Translation Model (seq2seq with attention)', u: 'https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/', k: 'visual' },
    { n: 'Sutskever et al. — Sequence to Sequence Learning with Neural Networks', u: 'https://arxiv.org/abs/1409.3215', k: 'paper', d: 'also Bahdanau attention 1409.0473, GRU 1406.1078' },
    { n: 'StatQuest — Long Short-Term Memory (LSTM), Clearly Explained', k: 'video' },
  ],
  'attention-transformer': [
    { n: 'Jay Alammar — The Illustrated Transformer', u: 'https://jalammar.github.io/illustrated-transformer/', k: 'visual', d: 'start here' },
    { n: 'Harvard NLP — The Annotated Transformer', u: 'https://nlp.seas.harvard.edu/annotated-transformer/', k: 'notes', d: 'paper line-by-line in PyTorch' },
    { n: 'Vaswani et al. — Attention Is All You Need', u: 'https://arxiv.org/abs/1706.03762', k: 'paper' },
    { n: 'd2l.ai — Ch. 11 Attention Mechanisms and Transformers', u: 'https://d2l.ai/chapter_attention-mechanisms-and-transformers/index.html', k: 'book', d: 'scaled dot-product, multi-head, positional encoding with code' },
    { n: 'Lilian Weng — Attention? Attention!', u: 'https://lilianweng.github.io/posts/2018-06-24-attention/', k: 'blog' },
    { n: 'Andrej Karpathy — Let\'s build GPT: from scratch, in code, spelled out', k: 'video', d: 'must-watch; implements causal self-attention' },
    { n: '3Blue1Brown — Attention in transformers, step-by-step', k: 'video' },
  ],
  'modern-architectures': [
    { n: 'Understanding Deep Learning (Simon Prince) — Ch. 12 Transformers, 14-18 GANs, Flows, VAEs, Diffusion', u: 'https://udlbook.github.io/udlbook/', k: 'book', d: 'best free textbook coverage of generative models' },
    { n: 'Jay Alammar — The Illustrated BERT, ELMo, and co.', u: 'https://jalammar.github.io/illustrated-bert/', k: 'visual', d: 'pair with The Illustrated GPT-2' },
    { n: 'Dosovitskiy et al. — An Image is Worth 16x16 Words (ViT)', u: 'https://arxiv.org/abs/2010.11929', k: 'paper', d: 'also BERT 1810.04805, T5 1910.10683, Switch Transformer 2101.03961' },
    { n: 'Hugging Face blog — Mixture of Experts Explained', u: 'https://huggingface.co/blog/moe', k: 'blog' },
    { n: 'Lilian Weng — What are Diffusion Models?', u: 'https://lilianweng.github.io/posts/2021-07-11-diffusion-models/', k: 'blog', d: 'math-first; DDPM paper is 2006.11239' },
    { n: 'Lilian Weng — From Autoencoder to Beta-VAE', u: 'https://lilianweng.github.io/posts/2018-08-12-vae/', k: 'blog', d: 'VAE paper 1312.6114, GAN paper 1406.2661' },
    { n: 'Umar Jamil — Variational Autoencoder: model, ELBO, loss function and maths explained', k: 'video' }
  ],
  'representation-learning': [
    { n: 'Lilian Weng — Contrastive Representation Learning', u: 'https://lilianweng.github.io/posts/2021-05-31-contrastive/', k: 'blog', d: 'SimCLR, MoCo, BYOL, CLIP, triplet/InfoNCE in one survey' },
    { n: 'Jay Alammar — The Illustrated Word2vec', u: 'https://jalammar.github.io/illustrated-word2vec/', k: 'visual', d: 'skip-gram + negative sampling' },
    { n: 'Deep Learning book — Ch. 15 Representation Learning', u: 'https://www.deeplearningbook.org/contents/representation.html', k: 'book' },
    { n: 'Chen et al. — A Simple Framework for Contrastive Learning (SimCLR)', u: 'https://arxiv.org/abs/2002.05709', k: 'paper' },
    { n: 'Radford et al. — Learning Transferable Visual Models From Natural Language Supervision (CLIP)', u: 'https://arxiv.org/abs/2103.00020', k: 'paper', d: 'also DINO 2104.14294, MAE 2111.06377, FaceNet 1503.03832' },
    { n: 'Yannic Kilcher — OpenAI CLIP: Connecting Text and Images (Paper Explained)', k: 'video' },
    { n: 'StatQuest — Word Embedding and Word2Vec, Clearly Explained', k: 'video' }
  ],
  'scaling-efficiency': [
    { n: 'Hugging Face — The Ultra-Scale Playbook: Training LLMs on GPU Clusters', u: 'https://huggingface.co/spaces/nanotron/ultrascale-playbook', k: 'book', d: 'DP, ZeRO, TP, PP, memory math — the best free resource' },
    { n: 'PyTorch Tutorials — Getting Started with Distributed Data Parallel', u: 'https://pytorch.org/tutorials/intermediate/ddp_tutorial.html', k: 'docs', d: 'then the FSDP tutorial' },
    { n: 'Lilian Weng — How to Train Really Large Models on Many GPUs?', u: 'https://lilianweng.github.io/posts/2021-09-25-train-large/', k: 'blog' },
    { n: 'Rajbhandari et al. — ZeRO: Memory Optimizations Toward Training Trillion Parameter Models', u: 'https://arxiv.org/abs/1910.02054', k: 'paper' },
    { n: 'Hinton et al. — Distilling the Knowledge in a Neural Network', u: 'https://arxiv.org/abs/1503.02531', k: 'paper', d: 'also LLM.int8 2208.07339, Lottery Ticket 1803.03635' },
    { n: 'Google DeepMind — How to Scale Your Model (TPU/GPU scaling book)', u: 'https://jax-ml.github.io/scaling-book/', k: 'book', d: 'rooflines, sharding, parallelism math' },
    { n: 'Umar Jamil — Quantization explained with PyTorch: post-training quantization, quantization-aware training', k: 'video' },
  ],
  'debugging-dl': [
    { n: 'Andrej Karpathy — A Recipe for Training Neural Networks', u: 'http://karpathy.github.io/2019/04/25/recipe/', k: 'blog', d: 'the debugging checklist interviewers expect' },
    { n: 'Google Research — Deep Learning Tuning Playbook', u: 'https://github.com/google-research/tuning_playbook', k: 'notes', d: 'systematic hyperparameter tuning process' },
    { n: 'Stanford CS231n notes — Neural Networks Part 3 (gradient checks, sanity checks, babysitting learning)', u: 'https://cs231n.github.io/neural-networks-3/', k: 'notes' },
    { n: 'Deep Learning book — Ch. 11 Practical Methodology', u: 'https://www.deeplearningbook.org/contents/guidelines.html', k: 'book' },
    { n: 'Full Stack Deep Learning (Josh Tobin) — Troubleshooting Deep Neural Networks', k: 'video', d: 'lecture + slide deck' },
    { n: 'Andrej Karpathy — Building makemore Part 3: Activations & Gradients, BatchNorm', k: 'video', d: 'diagnostics: activation/gradient histograms, update ratios' },
    { n: 'Andrew Ng — Machine Learning Yearning (free draft)', k: 'book', d: 'bias/variance and error-analysis workflow' }
  ]
}});

PREP.add({ id: 'genai', refs: {
  'how-llms-work': [
    { n: 'Andrej Karpathy — Deep Dive into LLMs like ChatGPT', k: 'video', d: 'pretraining, tokenization, sampling, post-training in 3.5 h' },
    { n: 'Andrej Karpathy — Let\'s build the GPT Tokenizer', k: 'video', d: 'BPE from scratch + tokenisation quirks' },
    { n: 'Hugging Face LLM Course — Ch. 6 The Tokenizers library (BPE, WordPiece, Unigram)', u: 'https://huggingface.co/learn/llm-course', k: 'course' },
    { n: 'Jay Alammar — The Illustrated GPT-2', u: 'https://jalammar.github.io/illustrated-gpt2/', k: 'visual', d: 'decoder-only, next-token prediction' },
    { n: 'Chip Huyen — Generation configurations: temperature, top-k, top-p, and test time compute', u: 'https://huyenchip.com/2024/01/16/sampling.html', k: 'blog' },
    { n: 'Holtzman et al. — The Curious Case of Neural Text Degeneration (nucleus sampling)', u: 'https://arxiv.org/abs/1904.09751', k: 'paper', d: 'BPE paper: Sennrich 1508.07909' },
    { n: '3Blue1Brown — Transformers, the tech behind LLMs (Deep Learning Ch. 5)', k: 'video' }
  ],
  'prompt-engineering': [
    { n: 'Lilian Weng — Prompt Engineering', u: 'https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/', k: 'blog', d: 'few-shot ordering, CoT, self-consistency, research-backed' },
    { n: 'DAIR.AI — Prompt Engineering Guide', u: 'https://www.promptingguide.ai/', k: 'notes' },
    { n: 'Wei et al. — Chain-of-Thought Prompting Elicits Reasoning in LLMs', u: 'https://arxiv.org/abs/2201.11903', k: 'paper', d: 'also self-consistency 2203.11171' },
    { n: 'Anthropic docs — Prompt engineering overview (Claude)', k: 'docs', d: 'XML structuring, prefill, system prompts' },
    { n: 'Simon Willison — prompt injection posts', u: 'https://simonwillison.net/tags/prompt-injection/', k: 'blog', d: 'why injection is unsolved; indirect injection paper: Greshake et al. 2302.12173' },
    { n: 'Andrej Karpathy — Intro to Large Language Models (LLM security / jailbreak / prompt injection section)', k: 'video' },
    { n: 'DeepLearning.AI (Andrew Ng, Isa Fulford) — ChatGPT Prompt Engineering for Developers', k: 'course', d: 'free short course' }
  ],
  'llm-apis': [
    { n: 'OpenAI Cookbook', u: 'https://cookbook.openai.com/', k: 'docs', d: 'function calling, streaming, rate-limit handling recipes' },
    { n: 'Anthropic docs — Tool use with Claude', k: 'docs', d: 'tool definitions, tool_use/tool_result loop' },
    { n: 'MDN — Using server-sent events', u: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events', k: 'docs', d: 'the protocol behind token streaming' },
    { n: 'Chip Huyen — Building LLM applications for production', u: 'https://huyenchip.com/2023/04/11/llm-engineering.html', k: 'blog', d: 'cost, latency, prompt versioning' },
    { n: 'OpenAI Cookbook — How to handle rate limits', k: 'docs', d: 'exponential backoff with jitter' },
    { n: 'Andrej Karpathy — Intro to Large Language Models (1hr talk)', k: 'video' },
    { n: 'DeepLearning.AI — Functions, Tools and Agents with LangChain', k: 'course', d: 'free short course on function calling' }
  ],
  'embeddings-vector-db': [
    { n: 'Malkov & Yashunin — Efficient and robust ANN search using HNSW graphs', u: 'https://arxiv.org/abs/1603.09320', k: 'paper' },
    { n: 'Johnson, Douze, Jégou — Billion-scale similarity search with GPUs (FAISS)', u: 'https://arxiv.org/abs/1702.08734', k: 'paper' },
    { n: 'FAISS wiki — index types, IVF, PQ, choosing an index', u: 'https://github.com/facebookresearch/faiss/wiki', k: 'docs' },
    { n: 'Pinecone — Faiss: The Missing Manual (IVF, PQ, HNSW chapters)', k: 'article', d: 'best visual explanations of ANN indexes' },
    { n: 'Sentence Transformers (SBERT) docs', u: 'https://www.sbert.net/', k: 'docs', d: 'bi-encoders vs cross-encoders; SBERT paper 1908.10084' },
    { n: 'MTEB leaderboard (Hugging Face)', u: 'https://huggingface.co/spaces/mteb/leaderboard', k: 'docs', d: 'paper 2210.07316; read its caveats' },
    { n: 'Umar Jamil — Retrieval Augmented Generation (RAG) Explained: Embedding, Sentence BERT, Vector Database (HNSW)', k: 'video' }
  ],
  'rag': [
    { n: 'Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', u: 'https://arxiv.org/abs/2005.11401', k: 'paper' },
    { n: 'Anthropic — Introducing Contextual Retrieval', u: 'https://www.anthropic.com/news/contextual-retrieval', k: 'blog', d: 'contextual chunks + BM25 hybrid + reranking, with numbers' },
    { n: 'Hugging Face Cookbook — Advanced RAG on Hugging Face documentation', u: 'https://huggingface.co/learn/cookbook/advanced_rag', k: 'docs' },
    { n: 'Eugene Yan — Patterns for Building LLM-based Systems & Products', u: 'https://eugeneyan.com/writing/llm-patterns/', k: 'blog', d: 'RAG, evals, guardrails, caching patterns' },
    { n: 'Microsoft GraphRAG docs', u: 'https://microsoft.github.io/graphrag/', k: 'docs', d: 'paper 2404.16130; ColBERT 2004.12832; Lost in the Middle 2307.03172' },
    { n: 'DeepLearning.AI — Building and Evaluating Advanced RAG', k: 'course', d: 'free short course: sentence-window, auto-merging, RAG triad' },
    { n: 'Jason Liu — Systematically Improving RAG Applications', k: 'video' }
  ],
  'llm-evaluation': [
    { n: 'Hamel Husain — Your AI Product Needs Evals', u: 'https://hamel.dev/blog/posts/evals/', k: 'blog', d: 'error analysis-first eval workflow' },
    { n: 'Hamel Husain — Creating a LLM-as-a-Judge That Drives Business Results', u: 'https://hamel.dev/blog/posts/llm-judge/', k: 'blog' },
    { n: 'Eugene Yan — Evaluating the Effectiveness of LLM-Evaluators (aka LLM-as-Judge)', u: 'https://eugeneyan.com/writing/llm-evaluators/', k: 'blog', d: 'survey of judge biases and calibration' },
    { n: 'Ragas docs — metrics (faithfulness, answer relevancy, context precision/recall)', u: 'https://docs.ragas.io/', k: 'docs', d: 'paper 2309.15217' },
    { n: 'Zheng et al. — Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena', u: 'https://arxiv.org/abs/2306.05685', k: 'paper', d: 'position / verbosity / self-enhancement bias' },
    { n: 'Applied LLMs — What We Learned from a Year of Building with LLMs', u: 'https://applied-llms.org/', k: 'article' },
    { n: 'Hamel Husain & Shreya Shankar — LLM evals talk / office hours', k: 'video' }
  ],
  'agents': [
    { n: 'Anthropic — Building Effective Agents', u: 'https://www.anthropic.com/engineering/building-effective-agents', k: 'blog', d: 'workflows vs agents; the patterns to name in interviews' },
    { n: 'Lilian Weng — LLM Powered Autonomous Agents', u: 'https://lilianweng.github.io/posts/2023-06-23-agent/', k: 'blog', d: 'planning, memory, tool use survey' },
    { n: 'Yao et al. — ReAct: Synergizing Reasoning and Acting in Language Models', u: 'https://arxiv.org/abs/2210.03629', k: 'paper', d: 'also Reflexion 2303.11366, Toolformer 2302.04761' },
    { n: 'Model Context Protocol — official docs & spec', u: 'https://modelcontextprotocol.io/', k: 'docs' },
    { n: 'Chip Huyen — Agents', u: 'https://huyenchip.com/2025/01/07/agents.html', k: 'blog', d: 'tools, planning, failure modes' },
    { n: 'Hugging Face Agents Course', u: 'https://huggingface.co/learn/agents-course', k: 'course' },
    { n: 'Andrew Ng — What\'s next for AI agentic workflows (Sequoia AI Ascent talk)', k: 'video', d: 'reflection, tool use, planning, multi-agent patterns; DeepLearning.AI free short courses go deeper' }
  ],
  'llm-app-engineering': [
    { n: 'Chip Huyen — Building A Generative AI Platform', u: 'https://huyenchip.com/2024/07/25/genai-platform.html', k: 'blog', d: 'routing, caching, guardrails, observability end to end' },
    { n: 'Applied LLMs — What We Learned from a Year of Building with LLMs', u: 'https://applied-llms.org/', k: 'article', d: 'tactical, operational, strategic lessons' },
    { n: 'Eugene Yan — Patterns for Building LLM-based Systems & Products', u: 'https://eugeneyan.com/writing/llm-patterns/', k: 'blog' },
    { n: 'OWASP — Top 10 for Large Language Model Applications', k: 'docs', d: 'security checklist' },
    { n: 'Anthropic docs — Prompt caching', k: 'docs', d: 'provider prefix caching semantics' },
    { n: 'Full Stack Deep Learning — LLM Bootcamp', u: 'https://fullstackdeeplearning.com/llm-bootcamp/', k: 'course', d: 'free lectures: LLMOps, UX, deployment' },
    { n: 'Full Stack Deep Learning — LLM Bootcamp: LLMOps lecture (Josh Tobin)', k: 'video' }
  ],
  'fine-tuning': [
    { n: 'Hu et al. — LoRA: Low-Rank Adaptation of Large Language Models', u: 'https://arxiv.org/abs/2106.09685', k: 'paper' },
    { n: 'Dettmers et al. — QLoRA: Efficient Finetuning of Quantized LLMs', u: 'https://arxiv.org/abs/2305.14314', k: 'paper', d: 'NF4, double quantisation, paged optimisers' },
    { n: 'Hugging Face PEFT docs', u: 'https://huggingface.co/docs/peft', k: 'docs', d: 'LoRA config, target modules, merging' },
    { n: 'Hugging Face TRL docs — SFTTrainer', u: 'https://huggingface.co/docs/trl', k: 'docs', d: 'chat templates, packing, completion-only loss' },
    { n: 'Sebastian Raschka — LLMs from Scratch (code repo, ch. 6-7 fine-tuning)', u: 'https://github.com/rasbt/LLMs-from-scratch', k: 'notes' },
    { n: 'Sebastian Raschka — Practical Tips for Finetuning LLMs Using LoRA', k: 'blog' },
    { n: 'Umar Jamil — LoRA: Low-Rank Adaptation of Large Language Models, explained visually + PyTorch code from scratch', k: 'video' },
  ],
  'alignment': [
    { n: 'Nathan Lambert — RLHF Book (free online)', u: 'https://rlhfbook.com/', k: 'book', d: 'reward models, PPO, DPO, GRPO in depth' },
    { n: 'Hugging Face blog — Illustrating Reinforcement Learning from Human Feedback (RLHF)', u: 'https://huggingface.co/blog/rlhf', k: 'blog' },
    { n: 'Ouyang et al. — Training language models to follow instructions with human feedback (InstructGPT)', u: 'https://arxiv.org/abs/2203.02155', k: 'paper' },
    { n: 'Rafailov et al. — Direct Preference Optimization', u: 'https://arxiv.org/abs/2305.18290', k: 'paper', d: 'GRPO: DeepSeekMath 2402.03300; Constitutional AI 2212.08073; PPO 1707.06347' },
    { n: 'Chip Huyen — RLHF: Reinforcement Learning from Human Feedback', u: 'https://huyenchip.com/2023/05/02/rlhf.html', k: 'blog' },
    { n: 'Umar Jamil — Reinforcement Learning from Human Feedback explained with math derivations and the PyTorch code', k: 'video' },
    { n: 'Umar Jamil — Direct Preference Optimization (DPO) explained', k: 'video' }
  ],
  'inference-optimisation': [
    { n: 'Kwon et al. — Efficient Memory Management for LLM Serving with PagedAttention (vLLM)', u: 'https://arxiv.org/abs/2309.06180', k: 'paper' },
    { n: 'vLLM docs', u: 'https://docs.vllm.ai/', k: 'docs', d: 'continuous batching, prefix caching, spec decoding, quantisation' },
    { n: 'Lilian Weng — Large Transformer Model Inference Optimization', u: 'https://lilianweng.github.io/posts/2023-01-10-inference-optimization/', k: 'blog' },
    { n: 'kipply — Transformer Inference Arithmetic', u: 'https://kipp.ly/transformer-inference-arithmetic/', k: 'blog', d: 'KV-cache memory and memory-bound decode math' },
    { n: 'Dao et al. — FlashAttention: Fast and Memory-Efficient Exact Attention', u: 'https://arxiv.org/abs/2205.14135', k: 'paper', d: 'FA-2 2307.08691; speculative decoding 2211.17192; GPTQ 2210.17323; AWQ 2306.00978' },
    { n: 'Horace He — Making Deep Learning Go Brrrr From First Principles', u: 'https://horace.io/brrr_intro.html', k: 'blog', d: 'compute vs memory-bandwidth bound' },
    { n: 'Umar Jamil — Flash Attention derived and coded from scratch with Triton', k: 'video' }
  ],
  'transformer-internals': [
    { n: 'Su et al. — RoFormer: Enhanced Transformer with Rotary Position Embedding', u: 'https://arxiv.org/abs/2104.09864', k: 'paper', d: 'YaRN 2309.00071, ALiBi 2108.12409' },
    { n: 'EleutherAI — Rotary Embeddings: A Relative Revolution', u: 'https://blog.eleuther.ai/rotary-embeddings/', k: 'blog' },
    { n: 'Ainslie et al. — GQA: Training Generalized Multi-Query Transformer Models', u: 'https://arxiv.org/abs/2305.13245', k: 'paper', d: 'MQA: Shazeer 1911.02150' },
    { n: 'Lilian Weng — The Transformer Family Version 2.0', u: 'https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/', k: 'blog', d: 'efficient / long-context attention variants' },
    { n: 'EleutherAI — Transformer Math 101', u: 'https://blog.eleuther.ai/transformer-math/', k: 'blog', d: 'params, FLOPs, memory formulas' },
    { n: 'Umar Jamil — LLaMA explained: KV-Cache, Rotary Positional Embedding, RMS Norm, Grouped Query Attention, SwiGLU', k: 'video' },
    { n: 'Stanford CS336 — Language Modeling from Scratch', u: 'https://stanford-cs336.github.io/', k: 'course', d: 'architecture, systems, scaling lectures (free on YouTube)' }
  ],
  'multimodal-reasoning': [
    { n: 'Chip Huyen — Multimodality and Large Multimodal Models (LMMs)', u: 'https://huyenchip.com/2023/10/10/multimodal.html', k: 'blog', d: 'CLIP, Flamingo, LLaVA lineage' },
    { n: 'Hugging Face blog — Vision Language Models Explained', u: 'https://huggingface.co/blog/vlms', k: 'blog' },
    { n: 'Liu et al. — Visual Instruction Tuning (LLaVA)', u: 'https://arxiv.org/abs/2304.08485', k: 'paper' },
    { n: 'DeepSeek-AI — DeepSeek-R1: Incentivizing Reasoning Capability via RL', u: 'https://arxiv.org/abs/2501.12948', k: 'paper', d: 'test-time compute: Snell et al. 2408.03314; process rewards 2305.20050' },
    { n: 'Lilian Weng — Extrinsic Hallucinations in LLMs', u: 'https://lilianweng.github.io/posts/2024-07-07-hallucination/', k: 'blog', d: 'causes, detection, mitigation' },
    { n: 'Umar Jamil — PaliGemma Vision Language Model from scratch', k: 'video' },
    { n: 'Yannic Kilcher — DeepSeek R1 paper explained', k: 'video' }
  ],
  'llm-system-design': [
    { n: 'Chip Huyen — Building A Generative AI Platform', u: 'https://huyenchip.com/2024/07/25/genai-platform.html', k: 'blog', d: 'reference architecture to draw in interviews' },
    { n: 'Eugene Yan — Patterns for Building LLM-based Systems & Products', u: 'https://eugeneyan.com/writing/llm-patterns/', k: 'blog' },
    { n: 'Anthropic — Building Effective Agents', u: 'https://www.anthropic.com/engineering/building-effective-agents', k: 'blog', d: 'for the code-review agent design' },
    { n: 'Applied LLMs — What We Learned from a Year of Building with LLMs', u: 'https://applied-llms.org/', k: 'article' },
    { n: 'LinkedIn Engineering — Musings on building a Generative AI product', k: 'blog', d: 'real-world RAG assistant case study' },
    { n: 'DoorDash Engineering — Path to high-quality LLM-based Dasher support automation', k: 'blog', d: 'support RAG bot with guardrails + judge' },
    { n: 'Full Stack Deep Learning — LLM Bootcamp 2023 (all lectures)', k: 'playlist' },
  ]
}});
