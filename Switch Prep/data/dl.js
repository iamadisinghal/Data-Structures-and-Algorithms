/* Deep Learning tab */
PREP.add({
  id: "dl",
  order: 120,
  group: "AI / ML",
  title: "Deep Learning",
  short: "Deep learning",
  blurb: "From the neuron to the transformer — derive it, code it, explain it.",
  intro: [
    "Deep-learning rounds for AI/ML and GenAI roles test three things: can you <b>derive</b> it (backprop, softmax + cross-entropy gradient, attention shapes), can you <b>code</b> it (a clean PyTorch training loop, attention from scratch), and can you <b>debug</b> it (loss not going down, NaNs, overfitting).",
    "Work bottom-up: neuron → MLP → backprop → optimisation tricks → CNN/RNN → attention/Transformer → modern architectures and scaling. For every topic be ready to whiteboard the maths, write ~30 lines of PyTorch, and state the trade-offs with numbers.",
    "Highest ROI for 2026 interviews: backprop by hand, normalisation/initialisation, the Transformer block in full detail (shapes, complexity, RoPE, pre-LN), and distributed training / mixed precision basics."
  ],
  resources: [
    { n: "Dive into Deep Learning (d2l.ai)", u: "https://d2l.ai/", d: "Free interactive book with runnable PyTorch code for every chapter; the best single structured path." },
    { n: "Deep Learning — Goodfellow, Bengio, Courville", u: "https://www.deeplearningbook.org/", d: "The theory reference: optimisation, regularisation, and the math foundations (chapters 6–8 are interview gold)." },
    { n: "Understanding Deep Learning — Simon Prince", u: "https://udlbook.github.io/udlbook/", d: "Modern, beautifully illustrated, covers transformers, diffusion and GNNs; free PDF + notebooks." },
    { n: "Karpathy — Neural Networks: Zero to Hero", u: "https://karpathy.ai/zero-to-hero.html", d: "Build micrograd, makemore and GPT from scratch; the fastest way to truly understand backprop and transformers." },
    { n: "fast.ai — Practical Deep Learning for Coders", u: "https://course.fast.ai/", d: "Top-down, practical training intuition: transfer learning, LR finder, data augmentation." },
    { n: "Stanford CS231n", u: "https://cs231n.github.io/", d: "Classic CNN course notes; backprop, optimisation and conv arithmetic explained cleanly." },
    { n: "Stanford CS224n", u: "https://web.stanford.edu/class/cs224n/", d: "NLP with deep learning: word vectors, RNNs, attention, transformers, pretraining." },
    { n: "PyTorch Tutorials", u: "https://pytorch.org/tutorials/", d: "Official tutorials: autograd, nn.Module, DataLoader, AMP, DDP/FSDP." },
    { n: "3Blue1Brown — Neural Networks series", u: "https://www.3blue1brown.com/topics/neural-networks", d: "Visual intuition for gradient descent, backprop and transformers/attention." }
  ],
  levels: [
    {
      name: "Beginner",
      desc: "Neural network basics, backprop by hand, loss functions and PyTorch fundamentals.",
      topics: [
        {
          id: "nn-basics",
          title: "Neural network basics: perceptron, MLP, activations",
          est: "3–4 days",
          why: "Warm-up questions in almost every DL round: why non-linearity, which activation, what an MLP can represent.",
          learn: [
            "Perceptron: <code>y = sign(w·x + b)</code>, perceptron learning rule, why it fails on XOR (not linearly separable).",
            "MLP forward pass with shapes: <code>h = σ(XW<sub>1</sub> + b<sub>1</sub>)</code>, <code>X: (B, d)</code>, <code>W<sub>1</sub>: (d, h)</code>.",
            "Why non-linearity: stacked linear layers collapse to a single linear map.",
            "Activations: sigmoid, tanh, ReLU, Leaky ReLU, ELU, GELU, SiLU/Swish — formulas, derivatives, ranges.",
            "SwiGLU / gated linear units — why modern LLMs use them in the FFN.",
            "Universal approximation theorem: what it says (one wide hidden layer can approximate continuous functions on compact sets) and what it does not say (learnability, width needed, generalisation).",
            "Depth vs width: deeper nets represent some functions exponentially more efficiently.",
            "Softmax output for multi-class, sigmoid for multi-label; logits vs probabilities."
          ],
          practice: [
            { t: "Implement a 2-layer MLP in NumPy (forward + backward) and solve XOR", p: "BUILD", d: "E" },
            { t: "d2l: Multilayer Perceptrons chapter", p: "BOOK", d: "E", u: "https://d2l.ai/chapter_multilayer-perceptrons/index.html" },
            { t: "3Blue1Brown: But what is a neural network?", p: "YT", d: "E" },
            { t: "Deep-ML: implement sigmoid / softmax / ReLU activations", p: "DML", d: "E", u: "https://www.deep-ml.com/" },
            { t: "Kaggle: Digit Recognizer (MNIST) with an MLP", p: "KG", d: "E", u: "https://www.kaggle.com/competitions/digit-recognizer" },
            { t: "Plot each activation and its derivative; mark saturation regions", p: "BUILD", d: "E" }
          ],
          notes: [
            "Sigmoid derivative <code>σ(1−σ)</code> peaks at <b>0.25</b> — stacking sigmoids shrinks gradients by ≥4x per layer → vanishing gradients.",
            "ReLU: cheap, non-saturating for x&gt;0, sparse activations; downside is <b>dead ReLUs</b> (units stuck at 0, often from high LR or bad init).",
            "GELU <code>x·Φ(x)</code> is the default in BERT/GPT; SiLU <code>x·σ(x)</code> inside SwiGLU is the default in LLaMA-style LLMs.",
            "tanh is zero-centred (better than sigmoid for hidden layers) but still saturates.",
            "Parameter count of a linear layer: <code>d<sub>in</sub>·d<sub>out</sub> + d<sub>out</sub></code>. Be fast at this — interviewers ask for model sizes.",
            "Never apply softmax before <code>nn.CrossEntropyLoss</code> — it expects raw logits."
          ],
          cases: [
            "XOR follow-up: 'Minimum hidden units to solve XOR?' → 2 (with a non-linear activation).",
            "'Why not use a step function?' → zero gradient almost everywhere, no gradient-based learning.",
            "Universal approximation trap: it does not guarantee SGD will find the weights or that the net generalises.",
            "Multi-label (an image can be cat AND dog) → sigmoid per class + BCE, not softmax.",
            "Dead ReLU diagnosis: fraction of units with zero activation across a batch; fix with lower LR, Leaky ReLU, He init."
          ],
          qa: [
            { q: "Why do we need non-linear activation functions?", a: "Without them, a composition of linear layers is itself linear (<code>W<sub>2</sub>W<sub>1</sub>x</code>), so depth adds no expressive power. Non-linearities let networks represent non-linear decision boundaries and functions." },
            { q: "ReLU vs sigmoid vs GELU — when would you use each?", a: "Sigmoid: output layer for binary/multi-label probabilities, gates in LSTMs. ReLU: default hidden activation for CNNs/MLPs, cheap and non-saturating. GELU/SiLU: smooth, slightly better in transformers; SwiGLU is standard in modern LLM FFNs." },
            { q: "What does the universal approximation theorem tell us in practice?", a: "That a single hidden layer with enough units can approximate any continuous function on a compact domain. It says nothing about how many units, whether optimisation will find them, or generalisation — which is why we use depth, architecture priors and regularisation." },
            { q: "How many parameters in an MLP 784→256→10?", a: "784·256 + 256 + 256·10 + 10 = 200,960 + 2,570 = <b>203,530</b>." }
          ]
        },
        {
          id: "backprop",
          title: "Backpropagation & computational graphs",
          est: "4–5 days",
          why: "'Derive the gradient' is the most common DL whiteboard question. Interviewers want chain rule fluency and shapes.",
          learn: [
            "Computational graph: nodes = ops, edges = tensors; forward computes values, backward propagates <code>∂L/∂node</code>.",
            "Chain rule and local gradients; gradient accumulation when a node has multiple consumers (sum of upstream grads).",
            "Reverse-mode vs forward-mode autodiff — why reverse mode is efficient for scalar loss with many parameters.",
            "Matrix gradients: for <code>Y = XW</code>, <code>∂L/∂W = X<sup>T</sup>·∂L/∂Y</code>, <code>∂L/∂X = ∂L/∂Y·W<sup>T</sup></code> (check by shapes).",
            "Derive softmax + cross-entropy gradient: <code>∂L/∂z = p − y</code>.",
            "Derive the sigmoid + BCE gradient: <code>∂L/∂z = σ(z) − y</code>.",
            "Backprop through ReLU (mask), through BatchNorm (outline), through a residual connection (gradient highway).",
            "Gradient checking with finite differences <code>(f(x+ε) − f(x−ε))/2ε</code>.",
            "Memory cost: activations must be stored for backward → activation checkpointing trades compute for memory."
          ],
          practice: [
            { t: "Implement micrograd (scalar autograd engine) from scratch", p: "BUILD", d: "M", u: "https://github.com/karpathy/micrograd" },
            { t: "Karpathy: The spelled-out intro to neural networks and backpropagation", p: "YT", d: "M" },
            { t: "Karpathy: Building makemore Part 4 — Becoming a Backprop Ninja", p: "YT", d: "H" },
            { t: "Derive by hand: gradients of a 2-layer MLP with softmax-CE; verify with gradcheck", p: "BUILD", d: "M" },
            { t: "CS231n: Backpropagation, Intuitions notes", p: "BOOK", d: "E", u: "https://cs231n.github.io/optimization-2/" },
            { t: "d2l: Forward propagation, backward propagation and computational graphs", p: "BOOK", d: "E", u: "https://d2l.ai/chapter_multilayer-perceptrons/backprop.html" },
            { t: "Deep-ML: single neuron with backpropagation", p: "DML", d: "M", u: "https://www.deep-ml.com/" },
            { t: "Write a custom torch.autograd.Function (e.g. for a clipped ReLU) and test with torch.autograd.gradcheck", p: "BUILD", d: "M" }
          ],
          notes: [
            "Shape rule of thumb: the gradient of a tensor always has the <b>same shape as the tensor</b>; use that to fix transposes.",
            "Softmax-CE gradient <code>p − y</code> is why the pair is fused: numerically stable (log-sum-exp) and simple.",
            "Reverse mode costs about 1–3x the forward pass; storing activations dominates memory for large models.",
            "Residual <code>y = x + F(x)</code> gives <code>∂y/∂x = I + ∂F/∂x</code> — the identity term keeps gradients alive in deep nets.",
            "PyTorch builds the graph dynamically (define-by-run); <code>.backward()</code> frees it unless <code>retain_graph=True</code>.",
            "Gradients <b>accumulate</b> in <code>.grad</code> by default — that is a feature (gradient accumulation) and a bug source (forgetting <code>zero_grad</code>)."
          ],
          cases: [
            "Node used twice (e.g. <code>x*x</code>) — gradients must be summed; a classic micrograd bug is overwriting with <code>=</code> instead of <code>+=</code>.",
            "Numerical stability: compute softmax as <code>exp(z − max z)</code>; compute log-softmax directly, never <code>log(softmax)</code>.",
            "In-place ops (<code>x += 1</code>, <code>relu_</code>) can break autograd if the original value was needed for backward.",
            "Follow-up: 'Why not forward-mode?' → cost scales with number of inputs (parameters); reverse mode scales with number of outputs (1 loss).",
            "Gradcheck needs float64 and small ε (~1e-6); float32 gives false failures."
          ],
          qa: [
            { q: "Derive the gradient of cross-entropy loss with softmax w.r.t. logits.", a: "<code>L = −Σ y<sub>k</sub> log p<sub>k</sub></code>, <code>p = softmax(z)</code>. Using <code>∂p<sub>k</sub>/∂z<sub>j</sub> = p<sub>k</sub>(δ<sub>kj</sub> − p<sub>j</sub>)</code>: <code>∂L/∂z<sub>j</sub> = −Σ y<sub>k</sub>(δ<sub>kj</sub> − p<sub>j</sub>) = p<sub>j</sub>Σy<sub>k</sub> − y<sub>j</sub> = p<sub>j</sub> − y<sub>j</sub></code> (since <code>Σy=1</code>)." },
            { q: "For Y = XW + b, what are the gradients?", a: "<code>∂L/∂W = X<sup>T</sup>G</code>, <code>∂L/∂X = GW<sup>T</sup></code>, <code>∂L/∂b = Σ<sub>batch</sub> G</code>, where <code>G = ∂L/∂Y</code>. Shapes confirm: X (B,d), W (d,h), G (B,h)." },
            { q: "Why is reverse-mode autodiff used in deep learning?", a: "One backward pass gives the gradient of a scalar loss w.r.t. all N parameters at a cost of a small constant times the forward pass. Forward mode would need N passes (one per input direction)." },
            { q: "What is gradient checkpointing?", a: "Store only some activations during forward; recompute the rest during backward. Cuts activation memory (≈ O(√n) layers for optimal segmenting) at the cost of ~one extra forward pass (~20–30% slower)." }
          ],
          code: `# Minimal micrograd-style Value (scalar autograd)
import math
class Value:
    def __init__(self, data, _children=()):
        self.data, self.grad = data, 0.0
        self._prev, self._backward = set(_children), lambda: None
    def __add__(self, o):
        o = o if isinstance(o, Value) else Value(o)
        out = Value(self.data + o.data, (self, o))
        def _bw():
            self.grad += out.grad          # += : node may be used twice
            o.grad    += out.grad
        out._backward = _bw
        return out
    def __mul__(self, o):
        o = o if isinstance(o, Value) else Value(o)
        out = Value(self.data * o.data, (self, o))
        def _bw():
            self.grad += o.data * out.grad
            o.grad    += self.data * out.grad
        out._backward = _bw
        return out
    def tanh(self):
        t = math.tanh(self.data)
        out = Value(t, (self,))
        def _bw(): self.grad += (1 - t * t) * out.grad
        out._backward = _bw
        return out
    def backward(self):
        topo, seen = [], set()
        def build(v):
            if v not in seen:
                seen.add(v)
                for c in v._prev: build(c)
                topo.append(v)
        build(self)
        self.grad = 1.0
        for v in reversed(topo): v._backward()`
        },
        {
          id: "loss-functions",
          title: "Loss functions: MSE, cross-entropy, focal, contrastive",
          est: "2–3 days",
          why: "'Which loss and why?' comes up in every applied/ML design round; contrastive losses are central to embeddings and RAG.",
          learn: [
            "MSE (L2) vs MAE (L1) vs Huber: robustness to outliers, gradient behaviour near zero.",
            "MSE as Gaussian MLE; cross-entropy as categorical MLE / KL divergence to the label distribution.",
            "Binary cross-entropy vs categorical cross-entropy; <code>BCEWithLogitsLoss</code> vs <code>CrossEntropyLoss</code> in PyTorch.",
            "Label smoothing: target <code>(1−ε)·onehot + ε/K</code>; calibration effects.",
            "Class imbalance: class weights, focal loss <code>FL = −α(1−p<sub>t</sub>)<sup>γ</sup> log p<sub>t</sub></code>.",
            "Contrastive / triplet loss: margin-based pull-positive, push-negative.",
            "InfoNCE / NT-Xent: softmax over one positive and many negatives with temperature τ.",
            "KL divergence for distillation; ranking losses (pairwise, listwise) for retrieval/recsys."
          ],
          practice: [
            { t: "Implement BCE, CE (with log-sum-exp), Huber and focal loss in PyTorch; compare to built-ins", p: "BUILD", d: "M" },
            { t: "Implement InfoNCE loss with in-batch negatives", p: "BUILD", d: "M" },
            { t: "Deep-ML: implement cross-entropy / log-softmax", p: "DML", d: "E", u: "https://www.deep-ml.com/" },
            { t: "Kaggle: imbalanced classification (Credit Card Fraud) — compare weighted CE vs focal loss", p: "KG", d: "M", u: "https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud" },
            { t: "d2l: Softmax regression (loss and information theory)", p: "BOOK", d: "E", u: "https://d2l.ai/chapter_linear-classification/softmax-regression.html" }
          ],
          notes: [
            "Classification with MSE + sigmoid gives tiny gradients when confidently wrong (saturation); CE gives gradient <code>p − y</code>, large when wrong.",
            "Focal loss (RetinaNet) down-weights easy examples; γ=2, α=0.25 were the paper defaults for dense detection.",
            "InfoNCE temperature τ: small τ sharpens the distribution and focuses on hard negatives; typical 0.05–0.1 for sentence embeddings, CLIP learns it.",
            "More in-batch negatives usually improves contrastive learning — why SimCLR/CLIP use huge batches.",
            "Huber = MSE near zero, MAE far away — good default for regression with outliers (and in DQN).",
            "Cross-entropy of a uniform guess over K classes = <code>ln K</code> (e.g. ≈ 2.30 for 10 classes) — a sanity check for initial loss."
          ],
          cases: [
            "Initial loss way above <code>ln K</code> → bad init / overconfident logits (Karpathy's 'fix the init' step).",
            "Passing probabilities into <code>CrossEntropyLoss</code> (double softmax) — trains but badly.",
            "Using <code>BCELoss</code> with sigmoid separately → numerically unstable; prefer <code>BCEWithLogitsLoss</code>.",
            "In-batch negatives can contain false negatives (duplicates) — hurts contrastive training; dedupe or mask.",
            "Imbalanced data: accuracy hides failure; report PR-AUC/F1 and tune threshold separately from the loss."
          ],
          qa: [
            { q: "Why cross-entropy instead of MSE for classification?", a: "CE is the MLE for categorical outputs, is convex in the logits for linear models, and its gradient <code>p − y</code> stays large when the model is confidently wrong. MSE with sigmoid/softmax saturates, giving vanishing gradients and slower learning." },
            { q: "Explain focal loss.", a: "CE scaled by <code>(1 − p<sub>t</sub>)<sup>γ</sup></code>: well-classified examples (p<sub>t</sub>→1) contribute little, so training focuses on hard, often minority-class examples. Introduced for one-stage detectors with extreme foreground/background imbalance." },
            { q: "What is InfoNCE and what does the temperature do?", a: "<code>L = −log( exp(s(q,k<sup>+</sup>)/τ) / Σ<sub>j</sub> exp(s(q,k<sub>j</sub>)/τ) )</code> — a softmax classification of the positive among negatives. Lower τ makes the loss focus on hard negatives and produces a more uniform embedding space; too low becomes unstable." }
          ]
        },
        {
          id: "pytorch-fundamentals",
          title: "PyTorch fundamentals: tensors, autograd, nn.Module, DataLoader, training loop",
          est: "4–5 days",
          why: "Live-coding rounds increasingly ask you to write a full training loop or a module from scratch in PyTorch without docs.",
          learn: [
            "Tensors: dtype, device, shape; broadcasting rules; <code>view</code> vs <code>reshape</code> vs <code>permute</code>, contiguity.",
            "Autograd: <code>requires_grad</code>, <code>.backward()</code>, <code>.grad</code>, <code>torch.no_grad()</code>, <code>detach()</code>, <code>torch.inference_mode()</code>.",
            "<code>nn.Module</code>: <code>__init__</code> registering submodules/parameters, <code>forward</code>, <code>register_buffer</code>, <code>state_dict</code>.",
            "<code>Dataset</code> / <code>DataLoader</code>: <code>__len__</code>, <code>__getitem__</code>, batching, shuffling, <code>num_workers</code>, <code>pin_memory</code>, <code>collate_fn</code> for variable-length data.",
            "The canonical training loop: <code>zero_grad → forward → loss → backward → (clip) → step → (scheduler)</code>.",
            "<code>model.train()</code> vs <code>model.eval()</code> — affects dropout and BatchNorm.",
            "GPU usage: moving model/data to device, <code>non_blocking=True</code>, avoiding host-device syncs (<code>.item()</code> in loop).",
            "Saving/loading checkpoints (model + optimizer + scheduler + step), reproducibility (seeds, determinism flags).",
            "<code>torch.compile</code> basics; einsum for readable tensor algebra."
          ],
          practice: [
            { t: "Write a full training + validation loop for MNIST from memory (no docs), with checkpointing", p: "BUILD", d: "M" },
            { t: "PyTorch: Learn the Basics tutorial", p: "DOC", d: "E", u: "https://pytorch.org/tutorials/beginner/basics/intro.html" },
            { t: "Write a custom Dataset + collate_fn that pads variable-length sequences and returns attention masks", p: "BUILD", d: "M" },
            { t: "Kaggle: Fashion-MNIST CNN in PyTorch", p: "KG", d: "E", u: "https://www.kaggle.com/datasets/zalando-research/fashionmnist" },
            { t: "Profile a DataLoader: find the num_workers that saturates the GPU", p: "BUILD", d: "M" },
            { t: "Deep-ML: implement common tensor ops and a linear layer", p: "DML", d: "E", u: "https://www.deep-ml.com/" }
          ],
          notes: [
            "<code>view</code> needs contiguous memory; after <code>transpose/permute</code> use <code>reshape</code> or <code>.contiguous().view</code>.",
            "<code>optimizer.zero_grad(set_to_none=True)</code> is the default in recent PyTorch and slightly faster.",
            "Store Python floats for logging with <code>loss.item()</code> — but every <code>.item()</code> forces a GPU sync; log every N steps.",
            "<code>torch.no_grad()</code> disables graph building; <code>inference_mode()</code> is stricter and faster for pure inference.",
            "Parameters must be <code>nn.Parameter</code> or inside registered submodules — a plain Python list of layers is invisible; use <code>nn.ModuleList</code>.",
            "Buffers (<code>register_buffer</code>) move with <code>.to(device)</code> and are saved in <code>state_dict</code> but are not trained (e.g. BN running stats, causal masks)."
          ],
          cases: [
            "Forgetting <code>model.eval()</code> at validation → dropout active, BN uses batch stats → noisy / wrong metrics.",
            "Accumulating <code>total_loss += loss</code> (tensor) keeps the whole graph alive → memory leak; use <code>loss.item()</code> or <code>detach()</code>.",
            "Layers stored in a Python list → not moved to GPU, not in optimizer → silent no-training.",
            "Data on CPU, model on GPU → 'Expected all tensors to be on the same device' error.",
            "Shuffling the validation set is harmless but shuffling time-series training data can leak future info.",
            "Follow-up: 'How do you do gradient accumulation?' → divide loss by K, call <code>backward</code> each micro-batch, <code>step</code> + <code>zero_grad</code> every K."
          ],
          qa: [
            { q: "Walk through a PyTorch training step.", a: "<code>optimizer.zero_grad()</code> clears old grads; forward pass builds the graph; compute loss; <code>loss.backward()</code> fills <code>.grad</code> via reverse-mode autodiff; optional gradient clipping; <code>optimizer.step()</code> updates params; <code>scheduler.step()</code> updates LR." },
            { q: "What is the difference between detach(), no_grad() and requires_grad=False?", a: "<code>detach()</code> returns a tensor sharing data but cut from the graph. <code>no_grad()</code> is a context where no ops are recorded. <code>requires_grad=False</code> on a parameter freezes it (used for fine-tuning only some layers)." },
            { q: "Why do we need model.eval()?", a: "It switches Dropout to identity and BatchNorm to using running mean/var instead of batch statistics. It does not disable gradients — combine with <code>torch.no_grad()</code>." },
            { q: "How would you speed up a slow input pipeline?", a: "Increase <code>num_workers</code>, <code>pin_memory=True</code>, <code>persistent_workers</code>, prefetching, pre-tokenise / pre-decode data, use faster formats (WebDataset, memory-mapped arrays), move augmentations to GPU, and check GPU utilisation to confirm the bottleneck." }
          ],
          code: `import torch, torch.nn as nn
from torch.utils.data import DataLoader

device = "cuda" if torch.cuda.is_available() else "cpu"
model = MyModel().to(device)
opt = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.01)
sched = torch.optim.lr_scheduler.OneCycleLR(opt, max_lr=3e-4,
            total_steps=EPOCHS * len(train_loader))
loss_fn = nn.CrossEntropyLoss()

for epoch in range(EPOCHS):
    model.train()
    for x, y in train_loader:
        x, y = x.to(device, non_blocking=True), y.to(device, non_blocking=True)
        opt.zero_grad(set_to_none=True)
        logits = model(x)                 # raw logits, no softmax
        loss = loss_fn(logits, y)
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        opt.step(); sched.step()

    model.eval(); correct = n = 0
    with torch.no_grad():
        for x, y in val_loader:
            x, y = x.to(device), y.to(device)
            correct += (model(x).argmax(-1) == y).sum().item(); n += y.numel()
    print(epoch, correct / n)
    torch.save({"model": model.state_dict(), "opt": opt.state_dict(),
                "sched": sched.state_dict(), "epoch": epoch}, "ckpt.pt")`
        }
      ]
    },
    {
      name: "Intermediate",
      desc: "Making training work (optimisation, normalisation, regularisation), CNNs, RNNs and the Transformer in full detail.",
      topics: [
        {
          id: "optimisation-training",
          title: "Optimisation & training: init, normalisation, regularisation, schedules, mixed precision",
          est: "1 week",
          why: "The 'why does this training trick work?' family of questions — init, BN vs LN, AdamW, warmup, fp16 vs bf16 — appears in nearly every DL interview.",
          learn: [
            "SGD, momentum, Nesterov, RMSProp, Adam (bias correction), <b>AdamW</b> (decoupled weight decay).",
            "Initialisation: why not zeros (symmetry), Xavier/Glorot <code>Var = 2/(n<sub>in</sub>+n<sub>out</sub>)</code>, He/Kaiming <code>Var = 2/n<sub>in</sub></code> for ReLU.",
            "Vanishing/exploding gradients: causes (saturating activations, products of Jacobians), fixes (init, normalisation, residuals, clipping, gating).",
            "BatchNorm (train vs eval, running stats, batch-size dependence) vs LayerNorm vs RMSNorm vs GroupNorm.",
            "Pre-LN vs Post-LN transformers and why Pre-LN trains more stably.",
            "Regularisation: dropout (inverted scaling), weight decay / L2, data augmentation, early stopping, label smoothing, stochastic depth.",
            "LR schedules: step, cosine, linear warmup + cosine/linear decay, OneCycle, LR range test; warmup rationale for Adam.",
            "Gradient clipping by norm vs by value.",
            "Mixed precision: fp16 + loss scaling vs bf16 (same exponent range as fp32); fp32 master weights; TF32 on Ampere+.",
            "Batch size vs LR (linear scaling rule), gradient accumulation, large-batch generalisation."
          ],
          practice: [
            { t: "Train a 20-layer MLP with sigmoid vs ReLU + He init vs + BatchNorm; plot per-layer gradient norms", p: "BUILD", d: "M" },
            { t: "Karpathy: Building makemore Part 3 — Activations & Gradients, BatchNorm", p: "YT", d: "M" },
            { t: "Implement Adam and AdamW from scratch and match torch.optim outputs", p: "BUILD", d: "M" },
            { t: "Implement LayerNorm and RMSNorm from scratch; verify against nn.LayerNorm", p: "BUILD", d: "E" },
            { t: "Deep-ML: implement Adam optimizer / batch normalization", p: "DML", d: "M", u: "https://www.deep-ml.com/" },
            { t: "d2l: Optimization Algorithms chapter", p: "BOOK", d: "M", u: "https://d2l.ai/chapter_optimization/index.html" },
            { t: "Add torch.autocast (bf16) + GradScaler (fp16) to a training loop; measure speed and memory", p: "BUILD", d: "M" },
            { t: "Run an LR range test and pick max_lr for OneCycle", p: "BUILD", d: "E" }
          ],
          notes: [
            "Adam memory: 2 extra fp32 states per parameter (m and v) → with fp32 master weights + grads, mixed-precision Adam ≈ <b>16 bytes/param</b> (2 bf16 weights + 2 bf16 grads + 4 master + 4 m + 4 v). 7B model ≈ 112 GB before activations.",
            "AdamW vs Adam+L2: with Adam, L2 in the gradient gets rescaled by the adaptive denominator; decoupled decay applies <code>θ ← θ − ηλθ</code> uniformly.",
            "Typical LLM recipe: AdamW (β<sub>1</sub>=0.9, β<sub>2</sub>=0.95), weight decay 0.1, warmup 1–2k steps then cosine to 10% of peak, grad clip 1.0, bf16.",
            "BN fails with small/variable batches and in sequence models with padding; LN normalises per-sample across features, so it is batch-independent → transformers.",
            "RMSNorm drops the mean-centering and bias: cheaper, works as well; used in LLaMA-family models.",
            "Dropout is rarely used in large LLM pretraining (data is effectively infinite, single epoch); still common in fine-tuning and smaller models.",
            "fp16 range max ≈ 65504 → overflow/underflow without loss scaling; bf16 has 8 exponent bits like fp32 → no scaling needed, less mantissa precision.",
            "Warmup helps because Adam's variance estimates are noisy early and large initial updates can destabilise (esp. Post-LN)."
          ],
          cases: [
            "BatchNorm with batch size 1–2 → noisy stats; use GroupNorm/LayerNorm or freeze BN in fine-tuning.",
            "Forgetting to exclude biases and norm weights from weight decay — common nit in code reviews.",
            "Loss spikes in long runs → check LR too high, missing warmup, bad data batch, fp16 overflow; remedies: lower LR, clip, skip batch, restart from checkpoint.",
            "Dropout + BatchNorm ordering conflicts ('variance shift'); in practice avoid dropout right before BN.",
            "Follow-up: 'Why does BN help?' — original claim was internal covariate shift; later work argues it smooths the loss landscape. Know both.",
            "Large batch with unchanged LR → slower convergence; scale LR (linear/sqrt rule) with warmup."
          ],
          qa: [
            { q: "Xavier vs He initialisation?", a: "Both keep activation variance roughly constant across layers. Xavier uses <code>Var(W) = 2/(n<sub>in</sub>+n<sub>out</sub>)</code>, derived for linear/tanh. He uses <code>2/n<sub>in</sub></code> because ReLU zeroes half the inputs, halving the variance." },
            { q: "BatchNorm vs LayerNorm — why do transformers use LayerNorm?", a: "BN normalises each feature across the batch (depends on batch size, needs running stats, awkward for variable-length padded sequences and autoregressive inference). LN normalises across features within each token, so it is identical at train and inference time and batch-independent." },
            { q: "fp16 vs bf16 for training?", a: "fp16: 5 exponent / 10 mantissa bits, small range → needs dynamic loss scaling. bf16: 8 exponent / 7 mantissa bits, same range as fp32 → no loss scaling, slightly less precision; default on A100/H100/TPU. Both keep fp32 master weights and do sensitive reductions in fp32." },
            { q: "What is the difference between Adam with L2 and AdamW?", a: "L2 adds <code>λθ</code> to the gradient, which Adam then divides by <code>√v</code>, so parameters with large gradients are regularised less. AdamW applies weight decay directly to the weights, decoupled from the adaptive step — better generalisation and easier tuning." },
            { q: "How do you handle exploding gradients?", a: "Gradient clipping by global norm (e.g. 1.0), lower LR / warmup, proper init, normalisation layers, residual connections, gated RNNs (LSTM/GRU), and check for bad data or fp16 overflow." }
          ],
          code: `# Mixed precision (bf16) + param groups without decay on bias/norm
decay, no_decay = [], []
for n, p in model.named_parameters():
    if not p.requires_grad: continue
    (no_decay if p.ndim < 2 else decay).append(p)   # biases, norm weights
opt = torch.optim.AdamW([{"params": decay, "weight_decay": 0.1},
                         {"params": no_decay, "weight_decay": 0.0}],
                        lr=3e-4, betas=(0.9, 0.95))

for x, y in loader:
    with torch.autocast(device_type="cuda", dtype=torch.bfloat16):
        loss = loss_fn(model(x), y)
    loss.backward()                       # bf16: no GradScaler needed
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    opt.step(); opt.zero_grad(set_to_none=True)

# fp16 variant: scaler = torch.amp.GradScaler()
# scaler.scale(loss).backward(); scaler.unscale_(opt); clip; scaler.step(opt); scaler.update()`
        },
        {
          id: "cnns",
          title: "CNNs: convolution arithmetic, pooling, ResNet, transfer learning",
          est: "4–5 days",
          why: "Still asked for CV and multimodal roles; conv output-size and parameter-count calculations are favourite quick checks, and ResNet's skip connection is a core concept in every modern architecture.",
          learn: [
            "Convolution as local, weight-shared linear op; translation equivariance; receptive field growth.",
            "Output size: <code>⌊(W − K + 2P)/S⌋ + 1</code>; 'same' padding; dilation.",
            "Parameters of a conv layer: <code>K·K·C<sub>in</sub>·C<sub>out</sub> + C<sub>out</sub></code>; FLOPs ≈ params × H<sub>out</sub> × W<sub>out</sub>.",
            "Pooling (max/avg), global average pooling, strided conv as downsampling.",
            "1×1 convs (channel mixing / bottleneck), depthwise-separable convs (MobileNet).",
            "Architecture lineage: LeNet → AlexNet → VGG → Inception → ResNet → EfficientNet → ConvNeXt.",
            "ResNet: residual blocks, bottleneck blocks, why skip connections enable 100+ layers.",
            "Transfer learning: feature extraction vs fine-tuning, freezing layers, discriminative LRs, BN handling.",
            "Data augmentation: flips, crops, color jitter, Mixup, CutMix, RandAugment."
          ],
          practice: [
            { t: "Train a CNN (ResNet-style) on CIFAR-10 to ≥90% test accuracy", p: "BUILD", d: "M" },
            { t: "Implement 2D convolution with loops, then with unfold/im2col; check against nn.Conv2d", p: "BUILD", d: "M" },
            { t: "Kaggle: Dogs vs Cats / any image comp with a fine-tuned pretrained backbone", p: "KG", d: "M", u: "https://www.kaggle.com/competitions/dogs-vs-cats" },
            { t: "CS231n: Convolutional Neural Networks notes", p: "BOOK", d: "E", u: "https://cs231n.github.io/convolutional-networks/" },
            { t: "d2l: Modern CNNs (ResNet section)", p: "BOOK", d: "M", u: "https://d2l.ai/chapter_convolutional-modern/resnet.html" },
            { t: "Deep-ML: simple convolutional 2D layer", p: "DML", d: "M", u: "https://www.deep-ml.com/" },
            { t: "fast.ai Lesson 1–2: transfer learning in a few lines", p: "YT", d: "E" }
          ],
          notes: [
            "Example: 224×224×3 input, conv 7×7, stride 2, pad 3, 64 filters → 112×112×64; params = 7·7·3·64 = 9,408 (no bias).",
            "Two stacked 3×3 convs have the receptive field of one 5×5 with fewer params (18C² vs 25C²) and an extra non-linearity — VGG's insight.",
            "ResNet-50 ≈ 25.6M params, ≈ 4 GFLOPs (multiply-adds) at 224².",
            "Depthwise-separable conv cost ≈ <code>1/C<sub>out</sub> + 1/K²</code> of a standard conv → ~8–9x fewer FLOPs for 3×3.",
            "Fine-tuning rule of thumb: small dataset similar to ImageNet → freeze backbone, train head; large or different dataset → fine-tune all with lower LR for early layers.",
            "CNN inductive bias (locality, weight sharing) wins on small data; ViTs overtake with large data/pretraining."
          ],
          cases: [
            "Off-by-one in output size when stride doesn't divide evenly (floor).",
            "Fine-tuning with BN in train mode on a tiny batch destroys pretrained statistics — freeze BN or use eval mode for BN layers.",
            "Forgetting ImageNet normalisation (mean/std) when using a pretrained model → poor transfer.",
            "Follow-up: 'Is a CNN translation invariant?' → convs are equivariant; pooling/GAP adds approximate invariance.",
            "Augmentation that changes label semantics (e.g. horizontal flip for digit/text recognition)."
          ],
          qa: [
            { q: "Compute output size and parameters: input 32×32×3, conv 5×5, 16 filters, stride 1, no padding.", a: "Output: (32 − 5)/1 + 1 = 28 → 28×28×16. Params: 5·5·3·16 + 16 = 1,216." },
            { q: "Why do residual connections help?", a: "They let a block learn a residual <code>F(x)</code> instead of a full mapping, make identity easy, and give the gradient a direct path (<code>∂y/∂x = I + ∂F/∂x</code>), mitigating vanishing gradients and the degradation problem in very deep nets." },
            { q: "What is a 1×1 convolution used for?", a: "Per-pixel linear mixing of channels: change channel dimension cheaply (bottlenecks in ResNet/Inception), add non-linearity, and implement the pointwise part of depthwise-separable convs." },
            { q: "Feature extraction vs fine-tuning?", a: "Feature extraction freezes the pretrained backbone and trains only a new head — fast, good for small similar datasets. Fine-tuning updates some or all backbone weights with a small LR — better when you have more data or a domain shift." }
          ]
        },
        {
          id: "rnns",
          title: "RNNs, LSTM, GRU & seq2seq",
          est: "3 days",
          why: "Less used in production now, but interviewers use it to test understanding of sequence modelling, BPTT, vanishing gradients and why attention/transformers won.",
          learn: [
            "Vanilla RNN: <code>h<sub>t</sub> = tanh(W<sub>h</sub>h<sub>t−1</sub> + W<sub>x</sub>x<sub>t</sub> + b)</code>; parameter sharing across time.",
            "Backprop through time (BPTT), truncated BPTT; vanishing/exploding via repeated multiplication by <code>W<sub>h</sub></code>.",
            "LSTM: forget, input, output gates, cell state as additive memory path.",
            "GRU: update and reset gates; fewer parameters than LSTM.",
            "Bidirectional and stacked RNNs; teacher forcing; packing padded sequences.",
            "Seq2seq encoder-decoder; the information bottleneck of a fixed context vector → Bahdanau attention.",
            "Decoding: greedy, beam search, length normalisation.",
            "Why transformers replaced RNNs: parallelism over time, long-range dependencies; revival via state-space models (Mamba) and linear RNNs."
          ],
          practice: [
            { t: "Implement an LSTM cell from scratch and train a character-level language model", p: "BUILD", d: "M" },
            { t: "Karpathy: The Unreasonable Effectiveness of RNNs (blog) + min-char-rnn", p: "BOOK", d: "E", u: "https://karpathy.github.io/2015/05/21/rnn-effectiveness/" },
            { t: "d2l: Recurrent Neural Networks and Modern RNNs chapters", p: "BOOK", d: "M", u: "https://d2l.ai/chapter_recurrent-modern/index.html" },
            { t: "Build a seq2seq model with attention for date-format translation", p: "BUILD", d: "M" },
            { t: "Deep-ML: implement a simple RNN / LSTM", p: "DML", d: "M", u: "https://www.deep-ml.com/" }
          ],
          notes: [
            "LSTM params per layer: <code>4·(h·(h + d) + h)</code> (four gates); GRU: <code>3·(...)</code>.",
            "LSTM's cell update <code>c<sub>t</sub> = f⊙c<sub>t−1</sub> + i⊙g</code> is additive → gradient flows through <code>f</code> without repeated matrix multiplication (like a residual).",
            "Initialise LSTM forget-gate bias to 1 so it remembers by default early in training.",
            "RNN inference is O(1) memory per step (fixed state) vs a transformer's growing KV cache — the motivation for SSMs/linear attention in long-context models.",
            "Teacher forcing speeds training but causes exposure bias at inference."
          ],
          cases: [
            "Exploding gradients in RNNs → clip gradient norm; vanishing → LSTM/GRU, shorter dependencies.",
            "Padding without packing/masking → the RNN processes pad tokens and final hidden state is wrong.",
            "Bidirectional RNNs cannot be used for autoregressive generation (they see the future).",
            "Follow-up: 'Why does beam search produce short outputs?' → summing log-probs penalises length; use length normalisation."
          ],
          qa: [
            { q: "Why do vanilla RNNs suffer from vanishing gradients and how does LSTM fix it?", a: "BPTT multiplies the gradient by <code>W<sub>h</sub><sup>T</sup>·diag(tanh')</code> at each step; with spectral radius &lt;1 it shrinks exponentially. LSTM's cell state is updated additively and gated by the forget gate, giving a near-identity gradient path when <code>f≈1</code>." },
            { q: "LSTM vs GRU?", a: "GRU merges the cell and hidden state and uses 2 gates (update, reset) vs LSTM's 3 gates + cell. GRU has ~25% fewer parameters and is often comparable; LSTM can be slightly better on long dependencies." },
            { q: "Why did transformers replace RNNs?", a: "Self-attention processes all positions in parallel (better GPU utilisation), connects any two positions in one step (path length O(1) vs O(n)), and scales better with data and compute. Cost: O(n²) attention and a growing KV cache at inference." }
          ]
        },
        {
          id: "attention-transformer",
          title: "Attention & the Transformer",
          est: "1–1.5 weeks",
          why: "The single most important DL topic for GenAI roles. Expect to derive scaled dot-product attention, write multi-head attention, explain masks, positional encodings (RoPE) and complexity.",
          learn: [
            "Attention as soft lookup: queries, keys, values; <code>softmax(QK<sup>T</sup>/√d<sub>k</sub>)V</code>.",
            "Why scale by <code>√d<sub>k</sub></code>: dot-product variance grows with d<sub>k</sub>, saturating softmax.",
            "Multi-head attention: split d<sub>model</sub> into h heads, attend in parallel, concat, project with W<sub>O</sub>.",
            "Masks: padding mask, causal (look-ahead) mask; additive <code>−inf</code> before softmax.",
            "Transformer block: attention + FFN (4x expansion or SwiGLU ~8/3x), residuals, LayerNorm (Pre-LN).",
            "Positional information: sinusoidal, learned absolute, relative (T5 bias, ALiBi), <b>RoPE</b> (rotate q,k pairs by position-dependent angles).",
            "Encoder-only (bidirectional, BERT), decoder-only (causal, GPT), encoder-decoder (cross-attention, T5).",
            "Complexity: attention O(n²·d) time and O(n²) memory for scores; FFN O(n·d²). Which dominates at what n.",
            "Parameter count: ≈ <code>12·L·d²</code> for a standard GPT block stack (4d² attention + 8d² FFN) plus embeddings.",
            "Training objective for decoder-only: next-token prediction with teacher forcing over all positions in parallel."
          ],
          practice: [
            { t: "Implement multi-head attention in PyTorch from scratch (with causal + padding masks); match nn.MultiheadAttention / F.scaled_dot_product_attention", p: "BUILD", d: "M" },
            { t: "Karpathy: Let's build GPT: from scratch, in code, spelled out", p: "YT", d: "M" },
            { t: "Implement RoPE and verify the relative-position property (q·k depends only on m−n)", p: "BUILD", d: "H" },
            { t: "Build nanoGPT-style char model on Tiny Shakespeare", p: "BUILD", d: "M", u: "https://github.com/karpathy/nanoGPT" },
            { t: "d2l: Attention Mechanisms and Transformers chapter", p: "BOOK", d: "M", u: "https://d2l.ai/chapter_attention-mechanisms-and-transformers/index.html" },
            { t: "Jay Alammar: The Illustrated Transformer", p: "BOOK", d: "E", u: "https://jalammar.github.io/illustrated-transformer/" },
            { t: "Deep-ML: implement self-attention / multi-head attention / positional encoding", p: "DML", d: "M", u: "https://www.deep-ml.com/" },
            { t: "3Blue1Brown: Attention in transformers, visually explained", p: "YT", d: "E" },
            { t: "Count parameters and FLOPs of GPT-2 small (124M) by hand", p: "BUILD", d: "M" }
          ],
          notes: [
            "Shapes: <code>x (B,T,C)</code> → q,k,v <code>(B,h,T,d<sub>h</sub>)</code>, scores <code>(B,h,T,T)</code>, out <code>(B,T,C)</code> with <code>C = h·d<sub>h</sub></code>.",
            "Multi-head costs the same as single-head with full d — heads just partition the dimension.",
            "Attention FLOPs per layer ≈ <code>4·n²·d</code>; projections + FFN ≈ <code>24·n·d²</code> → attention dominates when <code>n &gt; ~6d</code>.",
            "Training compute rule: ≈ <b>6·N·D</b> FLOPs (N params, D tokens); inference ≈ 2·N FLOPs per token.",
            "RoPE: rotate each 2-D pair of q,k by angle <code>m·θ<sub>i</sub></code>, <code>θ<sub>i</sub> = base<sup>−2i/d</sup></code> (base 10000 originally); dot product becomes a function of relative offset; extendable via NTK/YaRN scaling.",
            "Pre-LN (<code>x + Attn(LN(x))</code>) is stable without careful warmup; Post-LN (original paper) can be better-performing but harder to train deep.",
            "Weight tying of input embedding and output projection saves V·d params (common in GPT-2, smaller models).",
            "Use <code>F.scaled_dot_product_attention</code> in practice — dispatches to FlashAttention / memory-efficient kernels."
          ],
          cases: [
            "Forgetting <code>√d<sub>k</sub></code> scaling → peaky softmax, tiny gradients early in training.",
            "Mask applied after softmax, or with 0 instead of <code>−inf</code> → future tokens leak.",
            "Fully masked rows (all padding) → softmax of all <code>−inf</code> = NaN; guard with a large negative number or handle explicitly.",
            "Transformers without positional info are permutation-equivariant — 'dog bites man' = 'man bites dog'.",
            "Follow-up: 'Why is the FFN needed?' → attention is a weighted average (mixes tokens); FFN does per-token non-linear transformation and stores much of the 'knowledge'.",
            "Follow-up: 'Encoder vs decoder at inference?' → decoder generates one token at a time with KV cache; encoder processes the full input once."
          ],
          qa: [
            { q: "Explain scaled dot-product attention and why we scale.", a: "Each query is compared to all keys by dot product, softmaxed into weights, and used to average values: <code>softmax(QK<sup>T</sup>/√d<sub>k</sub>)V</code>. If q,k components have unit variance, <code>q·k</code> has variance d<sub>k</sub>; dividing by √d<sub>k</sub> keeps logits O(1) so softmax doesn't saturate and gradients don't vanish." },
            { q: "Why multi-head attention?", a: "Different heads can attend to different relations (syntax, coreference, position) in different subspaces simultaneously. With <code>d<sub>h</sub> = d/h</code>, cost is the same as one full-width head." },
            { q: "What is the time and memory complexity of self-attention?", a: "O(n²·d) time and O(n²) memory per head for the score matrix (n = sequence length). FlashAttention keeps time O(n²d) but reduces memory to O(n) by tiling and never materialising the full matrix." },
            { q: "Explain RoPE.", a: "Rotary position embedding rotates pairs of query/key dimensions by angles proportional to position. Because rotations compose, <code>⟨R<sub>m</sub>q, R<sub>n</sub>k⟩ = ⟨q, R<sub>n−m</sub>k⟩</code>, so attention depends on relative distance, with no extra parameters. Used in LLaMA, Qwen, Mistral etc., and can be scaled (PI, NTK, YaRN) for longer contexts." },
            { q: "BERT-style encoder vs GPT-style decoder?", a: "Encoder: bidirectional attention, trained with masked LM, great for classification/embeddings/retrieval. Decoder: causal mask, next-token prediction, natively generative; with scale and instruction tuning it handles most tasks, hence dominant for LLMs." },
            { q: "Approximate parameter count of a transformer with L layers and width d?", a: "Per layer: attention 4d² (Q,K,V,O) + FFN 8d² (d→4d→d) ≈ 12d². Total ≈ <code>12·L·d²</code> + embeddings <code>V·d</code>. GPT-2 small: 12·12·768² ≈ 85M + 50257·768 ≈ 39M → ~124M." }
          ],
          code: `import math, torch, torch.nn as nn, torch.nn.functional as F

def scaled_dot_product_attention(q, k, v, mask=None):
    # q,k,v: (B, h, T, d_h); mask: broadcastable to (B, h, T, T), True = keep
    scores = q @ k.transpose(-2, -1) / math.sqrt(q.size(-1))
    if mask is not None:
        scores = scores.masked_fill(~mask, float("-inf"))
    attn = scores.softmax(dim=-1)
    return attn @ v, attn

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads, causal=True, dropout=0.0):
        super().__init__()
        assert d_model % n_heads == 0
        self.h, self.dh, self.causal = n_heads, d_model // n_heads, causal
        self.qkv = nn.Linear(d_model, 3 * d_model, bias=False)
        self.proj = nn.Linear(d_model, d_model, bias=False)
        self.drop = nn.Dropout(dropout)

    def forward(self, x, pad_mask=None):          # x: (B, T, C); pad_mask: (B, T) True = real token
        B, T, C = x.shape
        q, k, v = self.qkv(x).split(C, dim=-1)
        q, k, v = (t.view(B, T, self.h, self.dh).transpose(1, 2) for t in (q, k, v))
        mask = None
        if self.causal:
            mask = torch.tril(torch.ones(T, T, dtype=torch.bool, device=x.device))
        if pad_mask is not None:
            pm = pad_mask[:, None, None, :]          # mask keys
            mask = pm if mask is None else (mask & pm)
        out, _ = scaled_dot_product_attention(q, k, v, mask)
        out = out.transpose(1, 2).contiguous().view(B, T, C)
        return self.drop(self.proj(out))

class Block(nn.Module):                                # Pre-LN transformer block
    def __init__(self, d, h):
        super().__init__()
        self.ln1, self.ln2 = nn.LayerNorm(d), nn.LayerNorm(d)
        self.attn = MultiHeadAttention(d, h)
        self.ffn = nn.Sequential(nn.Linear(d, 4 * d), nn.GELU(), nn.Linear(4 * d, d))
    def forward(self, x):
        x = x + self.attn(self.ln1(x))
        return x + self.ffn(self.ln2(x))

# In production: F.scaled_dot_product_attention(q, k, v, is_causal=True)`
        }
      ]
    },
    {
      name: "Advanced",
      desc: "Modern architectures, representation learning, scaling & efficiency, and debugging real training runs.",
      topics: [
        {
          id: "modern-architectures",
          title: "Modern architectures: ViT, BERT vs GPT vs T5, MoE, diffusion, VAEs & GANs",
          est: "1 week",
          why: "Applied-scientist and GenAI rounds ask you to compare architecture families and explain the generative-model zoo at a whiteboard level.",
          learn: [
            "ViT: patchify (16×16), linear patch embedding, [CLS] token / mean pooling, position embeddings; data hunger vs CNNs; DeiT, Swin.",
            "BERT (encoder, MLM + NSP), GPT (decoder, causal LM), T5 (encoder-decoder, span corruption, text-to-text); when each fits.",
            "Mixture of Experts: router/gating, top-k experts per token, load-balancing loss, capacity factor; total vs active parameters.",
            "VAE: encoder q(z|x), reparameterisation trick, ELBO = reconstruction − KL; blurry samples.",
            "GAN: generator vs discriminator minimax, mode collapse, training instability; WGAN idea.",
            "Diffusion: forward noising process, learn to predict noise ε, denoising sampling; DDPM vs DDIM; classifier-free guidance; latent diffusion.",
            "Flow matching / rectified flow as the newer alternative training objective for image/video generation.",
            "State-space models (Mamba) and hybrid attention-SSM architectures — what problem they target (linear-time long context)."
          ],
          practice: [
            { t: "Implement a ViT for CIFAR-10 (patch embed + transformer encoder) and compare with a ResNet", p: "BUILD", d: "H" },
            { t: "Implement a VAE on MNIST; visualise the latent space", p: "BUILD", d: "M" },
            { t: "Implement a minimal DDPM on MNIST / 2-D toy data", p: "BUILD", d: "H" },
            { t: "Implement a top-2 MoE layer with a load-balancing auxiliary loss", p: "BUILD", d: "H" },
            { t: "UDL book: chapters on VAEs, GANs and diffusion models", p: "BOOK", d: "M", u: "https://udlbook.github.io/udlbook/" },
            { t: "Lilian Weng: What are Diffusion Models?", p: "BOOK", d: "M", u: "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/" },
            { t: "Kaggle: fine-tune a ViT on an image classification dataset", p: "KG", d: "M" }
          ],
          notes: [
            "ViT-B/16 at 224² → (224/16)² = 196 patches + 1 CLS = 197 tokens; ~86M params.",
            "ViTs lack locality bias → need large pretraining (JFT/ImageNet-21k) or strong augmentation/distillation (DeiT) to beat CNNs on small data.",
            "MoE: e.g. 8 experts, top-2 routing → ~2/8 of FFN params active per token; memory still holds all experts. Mixtral 8x7B: ~47B total, ~13B active.",
            "Diffusion loss is simple MSE: <code>‖ε − ε<sub>θ</sub>(x<sub>t</sub>, t)‖²</code>; sampling needs many steps → distillation, DDIM, consistency models reduce steps.",
            "Classifier-free guidance: <code>ε = ε<sub>uncond</sub> + w·(ε<sub>cond</sub> − ε<sub>uncond</sub>)</code>; higher w = more prompt adherence, less diversity.",
            "Reparameterisation trick: <code>z = μ + σ⊙ε, ε~N(0,I)</code> makes sampling differentiable w.r.t. μ, σ.",
            "Generative trade-off triangle: GANs (sharp, fast, unstable, mode collapse), VAEs (stable, fast, blurry), diffusion (sharp, diverse, slow sampling)."
          ],
          cases: [
            "MoE without load balancing → router collapse to a few experts; tokens dropped when experts exceed capacity.",
            "MoE serving: active params set compute, but total params set memory — 'it's a 13B model' is only half true.",
            "GAN mode collapse: generator produces few modes; check sample diversity, not just discriminator loss.",
            "VAE posterior collapse with powerful decoders (KL → 0); mitigate with KL annealing / free bits.",
            "Follow-up: 'Why did T5-style encoder-decoders lose ground to decoder-only?' → simpler scaling, one objective, in-context learning, KV-cache-friendly serving; encoder-decoders still strong for translation/summarisation at small scale."
          ],
          qa: [
            { q: "How does a Vision Transformer work?", a: "Split the image into fixed patches (e.g. 16×16), flatten and linearly project each to d dims, add position embeddings and a CLS token, run a standard transformer encoder, classify from CLS (or mean-pooled) output. Works best with large-scale pretraining." },
            { q: "BERT vs GPT vs T5?", a: "BERT: encoder-only, bidirectional, masked LM — best for understanding tasks/embeddings. GPT: decoder-only, causal LM — generation, in-context learning, today's LLMs. T5: encoder-decoder, text-to-text with span corruption — strong for seq2seq like translation/summarisation." },
            { q: "What is a Mixture of Experts and why use it?", a: "Replace the dense FFN with N expert FFNs and a learned router that sends each token to top-k experts. Increases parameter count (capacity) without proportional compute per token. Challenges: load balancing, communication (expert parallelism), memory, fine-tuning instability." },
            { q: "Explain diffusion models at a high level.", a: "Forward process gradually adds Gaussian noise over T steps until data is pure noise. A network learns to predict the added noise at each step (MSE loss). Generation starts from noise and iteratively denoises. Conditioning (text) is injected via cross-attention; classifier-free guidance trades diversity for adherence." },
            { q: "VAE vs GAN vs diffusion?", a: "VAE: likelihood-based (ELBO), stable, meaningful latent, blurry samples. GAN: adversarial, sharp and fast sampling but unstable, mode collapse. Diffusion: stable MSE training, high quality and diversity, slower sampling (mitigated by fewer-step samplers/distillation)." }
          ]
        },
        {
          id: "representation-learning",
          title: "Representation learning: embeddings, contrastive learning (SimCLR, CLIP), metric learning",
          est: "4–5 days",
          why: "Embeddings power search, RAG, recommendations and multimodal systems; 'how is an embedding model trained?' is a standard GenAI-engineer question.",
          learn: [
            "What an embedding is: learned dense vector where geometry encodes similarity; word2vec (skip-gram, negative sampling) as the classic example.",
            "Self-supervised learning: pretext tasks, contrastive vs non-contrastive (BYOL, SimSiam, DINO), masked modelling (MAE, BERT).",
            "SimCLR: two augmentations of the same image as positives, NT-Xent loss, projection head, large batches.",
            "CLIP: image and text encoders, symmetric InfoNCE over an N×N similarity matrix, learned temperature, zero-shot classification via prompts.",
            "Metric learning: siamese networks, triplet loss with margin, hard/semi-hard negative mining.",
            "Sentence embeddings: bi-encoder (Sentence-BERT style) vs cross-encoder; mean pooling; normalisation.",
            "Training retrieval embedders: in-batch negatives, hard negatives (BM25-mined), Matryoshka embeddings, instruction-prefixed queries.",
            "Evaluating embeddings: recall@k, MRR, nDCG on retrieval benchmarks (MTEB); linear probing."
          ],
          practice: [
            { t: "Implement SimCLR on CIFAR-10 (ResNet-18 encoder) and evaluate with a linear probe", p: "BUILD", d: "H" },
            { t: "Fine-tune a sentence-embedding model on your domain with in-batch + hard negatives; measure recall@10", p: "BUILD", d: "M" },
            { t: "Implement CLIP's symmetric contrastive loss for a batch of image/text embeddings", p: "BUILD", d: "M" },
            { t: "Lilian Weng: Contrastive Representation Learning", p: "BOOK", d: "M", u: "https://lilianweng.github.io/posts/2021-05-31-contrastive/" },
            { t: "Zero-shot classification with an open CLIP model on a custom dataset", p: "BUILD", d: "E" },
            { t: "Kaggle: image similarity / retrieval competition (e.g. Google Landmark Retrieval)", p: "KG", d: "H" }
          ],
          notes: [
            "Normalise embeddings → cosine similarity = dot product; enables MIPS indexes.",
            "SimCLR found the <b>projection head</b> improves representation quality; use the pre-head features downstream.",
            "CLIP was trained on ~400M image-text pairs with a batch of 32k; zero-shot ImageNet via 'a photo of a {label}' prompts.",
            "Bi-encoder: embed once, fast ANN search (recall stage). Cross-encoder: jointly encodes query+doc, slower but more accurate (rerank stage).",
            "Hard negatives matter more than more random negatives once the model is decent; but hard-mined 'negatives' are often false negatives.",
            "Matryoshka training lets you truncate embeddings (e.g. 1024→256) with modest quality loss — big storage/latency savings."
          ],
          cases: [
            "Embedding drift: changing the embedding model requires re-indexing the whole corpus — version your indexes.",
            "Anisotropy: raw BERT [CLS] embeddings occupy a narrow cone; contrastive fine-tuning fixes it.",
            "Contrastive collapse (all embeddings identical) in non-contrastive methods without stop-gradient/predictor/centering tricks.",
            "Query-document asymmetry: short queries vs long passages → use asymmetric/instruction-prefixed embedders.",
            "Follow-up: 'How would you train an embedding model for your company's search?' → mine pairs from click/QA logs, BM25 hard negatives, InfoNCE fine-tune, evaluate recall@k vs baseline."
          ],
          qa: [
            { q: "How does CLIP work?", a: "Two encoders (image, text) map to a shared space. For a batch of N pairs compute the N×N cosine similarity matrix; apply cross-entropy so each image matches its own caption and vice versa (symmetric InfoNCE) with a learned temperature. At inference, compare an image to text prompts of class names for zero-shot classification." },
            { q: "Bi-encoder vs cross-encoder?", a: "Bi-encoder embeds query and document independently → precompute document vectors, fast ANN retrieval, lower accuracy. Cross-encoder feeds query+document together → full token interaction, higher accuracy, but O(N) forward passes per query, so used to rerank top-k." },
            { q: "What are hard negatives and why do they matter?", a: "Negatives that are similar to the query but not relevant (e.g. BM25 top hits that are wrong). Random negatives become trivially easy; hard negatives provide informative gradients and sharpen decision boundaries. Risk: false negatives — filter with a cross-encoder or thresholds." },
            { q: "Why is a projection head used in SimCLR?", a: "The contrastive loss makes the projected space invariant to augmentations, discarding information (colour, orientation) that may be useful downstream. Applying the loss after a small MLP head lets the backbone representation retain more general information." }
          ],
          code: `import torch, torch.nn.functional as F

def clip_loss(img_emb, txt_emb, logit_scale):
    # img_emb, txt_emb: (N, d); logit_scale = exp(learned log temperature)
    img = F.normalize(img_emb, dim=-1)
    txt = F.normalize(txt_emb, dim=-1)
    logits = logit_scale * img @ txt.t()          # (N, N)
    labels = torch.arange(img.size(0), device=img.device)
    return (F.cross_entropy(logits, labels) + F.cross_entropy(logits.t(), labels)) / 2

def info_nce(q, k_pos, tau=0.05):
    # in-batch negatives: every other row's positive is a negative for this row
    q, k = F.normalize(q, dim=-1), F.normalize(k_pos, dim=-1)
    logits = q @ k.t() / tau
    return F.cross_entropy(logits, torch.arange(q.size(0), device=q.device))`
        },
        {
          id: "scaling-efficiency",
          title: "Scaling & efficiency: distributed training, quantization, pruning, distillation",
          est: "1 week",
          why: "Senior AI-engineer interviews probe whether you can train and serve large models: memory math, DDP vs FSDP, and compression trade-offs.",
          learn: [
            "Memory budget of training: weights + gradients + optimizer states + activations; per-parameter bytes for mixed-precision AdamW.",
            "Data parallelism (DDP): replicate model, shard data, all-reduce gradients; bucketing and overlap with backward.",
            "ZeRO stages 1/2/3 and FSDP: shard optimizer states → gradients → parameters; all-gather on demand.",
            "Tensor parallelism (Megatron: column/row-split linear layers within a layer), pipeline parallelism (micro-batches, bubbles, 1F1B), sequence/context parallelism, expert parallelism; 3D parallelism.",
            "Collectives: all-reduce, all-gather, reduce-scatter; NVLink vs inter-node bandwidth and why TP stays inside a node.",
            "Activation checkpointing, gradient accumulation, CPU/NVMe offload.",
            "Quantization: post-training (PTQ) vs quantization-aware (QAT); int8/int4/fp8; per-tensor vs per-channel vs group-wise; weight-only vs weight+activation; outliers.",
            "Pruning: unstructured (sparse, needs hardware support) vs structured (channels/heads/layers); 2:4 sparsity; magnitude pruning, lottery ticket hypothesis.",
            "Knowledge distillation: soft targets with temperature, KL loss, logit vs feature distillation, sequence-level distillation for LLMs.",
            "Scaling laws: loss as a power law in N, D, C; Chinchilla compute-optimal ≈ 20 tokens per parameter."
          ],
          practice: [
            { t: "Convert a single-GPU training script to DDP with torchrun; then to FSDP; compare memory", p: "BUILD", d: "H" },
            { t: "PyTorch: Getting Started with Distributed Data Parallel", p: "DOC", d: "M", u: "https://pytorch.org/tutorials/intermediate/ddp_tutorial.html" },
            { t: "PyTorch: Getting Started with FSDP", p: "DOC", d: "M", u: "https://pytorch.org/tutorials/intermediate/FSDP_tutorial.html" },
            { t: "Distil a ResNet-50 teacher into a ResNet-18 student on CIFAR-100", p: "BUILD", d: "M" },
            { t: "Apply PTQ int8 to a model; measure accuracy drop and latency", p: "BUILD", d: "M" },
            { t: "Hugging Face: The Ultra-Scale Playbook (training on large GPU clusters)", p: "BOOK", d: "H", u: "https://huggingface.co/spaces/nanotron/ultrascale-playbook" },
            { t: "Compute memory needs for full fine-tuning of a 7B / 70B model; pick a parallelism plan for 8×80GB GPUs", p: "BUILD", d: "M" }
          ],
          notes: [
            "Mixed-precision AdamW ≈ <b>16 bytes/param</b> (+ activations). 7B → ~112 GB, so even one 80 GB GPU can't full-fine-tune it without sharding/offload; 8 GPUs with ZeRO-3/FSDP → ~14 GB/GPU for states.",
            "Inference weights only: 2 bytes/param in bf16 → 7B ≈ 14 GB, 70B ≈ 140 GB; int4 → ~0.5 byte/param (70B ≈ 35–40 GB incl. overhead).",
            "Ring all-reduce sends ≈ <code>2·(N−1)/N · size</code> per GPU — nearly independent of GPU count.",
            "Pick: DDP if the model fits on one GPU; FSDP/ZeRO-3 if not; add TP (within node) for very wide layers and PP (across nodes) for very deep models.",
            "Pipeline bubble fraction ≈ <code>(p−1)/(m+p−1)</code> for p stages and m micro-batches → use many micro-batches.",
            "Distillation loss: <code>α·CE(y, s) + (1−α)·T²·KL(softmax(t/T) ‖ softmax(s/T))</code>; T² keeps gradient scale.",
            "LLM weight quantization works well to 4 bits with group-wise scales (e.g. group size 128) and outlier handling; activations are harder because of outlier channels.",
            "Chinchilla: 70B params on 1.4T tokens beat 280B Gopher; modern models over-train well beyond 20 tok/param because inference cost matters more."
          ],
          cases: [
            "DDP hangs: ranks taking different code paths (e.g. conditional layers) or unused parameters → <code>find_unused_parameters</code> or fix the model.",
            "Forgetting <code>DistributedSampler</code> + <code>set_epoch</code> → every rank sees the same data / same shuffle each epoch.",
            "Effective batch size = per-GPU batch × GPUs × accumulation steps — retune LR when it changes.",
            "Unstructured sparsity rarely speeds up inference on GPUs without specialised kernels; structured pruning does.",
            "Quantizing a model then fine-tuning in that precision can diverge — use QAT or LoRA-on-quantized (QLoRA) approaches.",
            "Follow-up: 'Where does the time go in multi-node training?' → communication; check overlap, bucket size, network (InfiniBand), and that TP doesn't cross nodes."
          ],
          qa: [
            { q: "DDP vs FSDP?", a: "DDP replicates the full model, optimizer and gradients on every GPU and all-reduces gradients — simple and fast, but limited to models that fit on one GPU. FSDP (≈ ZeRO-3) shards parameters, gradients and optimizer states across GPUs, all-gathering parameters per layer just in time — trains much larger models at the cost of more communication." },
            { q: "How much GPU memory to fully fine-tune a 7B model with AdamW in mixed precision?", a: "≈16 bytes/param → ~112 GB for weights, grads and optimizer states, plus activations (dependent on batch × seq length, reduced by checkpointing). So it needs multiple GPUs with sharding, or PEFT (LoRA/QLoRA) on a single GPU." },
            { q: "Tensor vs pipeline parallelism?", a: "Tensor parallelism splits individual weight matrices across GPUs (e.g. column-parallel then row-parallel linear), requiring all-reduces every layer — needs fast NVLink, so used within a node. Pipeline parallelism places different layers on different GPUs and streams micro-batches — less communication, but pipeline bubbles; used across nodes." },
            { q: "Explain knowledge distillation.", a: "Train a smaller student to match a teacher's softened output distribution (temperature T &gt; 1 reveals 'dark knowledge' about class similarity), usually combined with the hard-label loss. For LLMs, also sequence-level distillation: fine-tune the student on teacher-generated outputs." },
            { q: "PTQ vs QAT?", a: "PTQ quantizes a trained model using a small calibration set — cheap, good at int8, and at int4 with smart methods (GPTQ/AWQ). QAT simulates quantization (fake-quant with straight-through estimator) during training so the model adapts — higher accuracy at low bit-widths, but needs training." }
          ],
          code: `# torchrun --nproc_per_node=8 train.py
import os, torch, torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
from torch.utils.data import DataLoader, DistributedSampler

dist.init_process_group("nccl")
rank = int(os.environ["LOCAL_RANK"]); torch.cuda.set_device(rank)
model = DDP(MyModel().cuda(rank), device_ids=[rank])
sampler = DistributedSampler(train_ds, shuffle=True)
loader = DataLoader(train_ds, batch_size=32, sampler=sampler, num_workers=4, pin_memory=True)

for epoch in range(EPOCHS):
    sampler.set_epoch(epoch)                  # different shuffle each epoch
    for x, y in loader:
        loss = loss_fn(model(x.cuda(rank)), y.cuda(rank))
        opt.zero_grad(); loss.backward(); opt.step()   # grads all-reduced in backward
    if rank == 0: torch.save(model.module.state_dict(), "ckpt.pt")
dist.destroy_process_group()

# Distillation loss
def kd_loss(s_logits, t_logits, y, T=2.0, alpha=0.5):
    soft = F.kl_div(F.log_softmax(s_logits / T, -1), F.softmax(t_logits / T, -1),
                    reduction="batchmean") * T * T
    return alpha * F.cross_entropy(s_logits, y) + (1 - alpha) * soft`
        },
        {
          id: "debugging-dl",
          title: "Debugging deep learning",
          est: "3–4 days",
          why: "'Your loss isn't decreasing — what do you do?' is one of the most common senior DL questions; it separates people who have trained models from those who have only read about it.",
          learn: [
            "Karpathy's recipe: become one with the data, set up end-to-end skeleton + dumb baselines, overfit, regularise, tune, squeeze.",
            "<b>Overfit a single batch</b> first — if you can't drive loss to ~0, there is a bug.",
            "Sanity checks: initial loss ≈ <code>ln K</code>, input-independent baseline (zeroed inputs) is worse, predictions visualised.",
            "Loss-not-decreasing checklist: LR, zero_grad, eval/train mode, label/input alignment, wrong loss inputs (softmax twice), frozen params, data augmentation bugs.",
            "NaN/Inf hunting: LR too high, log(0), division by zero, fp16 overflow, bad data; <code>torch.autograd.set_detect_anomaly</code>.",
            "Monitoring: loss curves, per-layer gradient norms, update/weight ratio (~1e-3), activation statistics, dead units.",
            "Train/val gaps: overfitting vs underfitting vs data leakage vs distribution shift.",
            "Throughput debugging: GPU utilisation, data loader bottlenecks, host-device syncs, profiler (<code>torch.profiler</code>), MFU.",
            "Reproducibility: seeds, deterministic algorithms, logging configs and data versions."
          ],
          practice: [
            { t: "Take a working training script, inject 5 bugs (missing zero_grad, eval mode, label shuffle, double softmax, wrong LR) and diagnose each from curves", p: "BUILD", d: "M" },
            { t: "Karpathy: A Recipe for Training Neural Networks (blog)", p: "BOOK", d: "E", u: "https://karpathy.github.io/2019/04/25/recipe/" },
            { t: "Profile a training run with torch.profiler; fix the top bottleneck", p: "BUILD", d: "M" },
            { t: "Log per-layer grad norms and update ratios to TensorBoard / W&B and interpret them", p: "BUILD", d: "M" },
            { t: "Google: Deep Learning Tuning Playbook", p: "BOOK", d: "M", u: "https://github.com/google-research/tuning_playbook" },
            { t: "Karpathy: Building makemore Part 3 (diagnostic plots of activations and gradients)", p: "YT", d: "M" }
          ],
          notes: [
            "Order of suspicion when loss is flat: data/labels → loss + output layer mismatch → LR (try 10x up and down) → optimizer setup (params registered? zero_grad?) → architecture/init.",
            "Update-to-weight ratio <code>‖ΔW‖/‖W‖</code> around 1e-3 per step is healthy; much larger → LR too high; much smaller → too low.",
            "Training loss lower than validation loss early on can be due to dropout/augmentation only in training — not necessarily overfitting.",
            "Val loss rising while val accuracy rising → model becoming overconfident (calibration), not necessarily worse.",
            "MFU (model FLOPs utilisation): good large-scale LLM training reaches ~40–55% on modern GPUs; single-digit MFU means a pipeline or communication problem.",
            "GPU at low utilisation with high CPU usage → data loading/augmentation bottleneck."
          ],
          cases: [
            "Labels shuffled independently of inputs (e.g. separate shuffles) → loss stuck at ~<code>ln K</code>.",
            "Data leakage (duplicates across train/test, target-derived features) → suspiciously great validation.",
            "NaN only after many steps → LR too high, fp16 overflow, or a specific bad sample; log the batch that caused it.",
            "Gradient norm spikes before loss spikes — clip and investigate the data batch.",
            "Model works in notebook but not in production → preprocessing mismatch (normalisation, tokenizer version, resize method).",
            "Follow-up: 'Validation accuracy is great but production is bad' → distribution shift, leakage, label definition mismatch; build a production-like eval set."
          ],
          qa: [
            { q: "Your training loss is not decreasing. Walk me through your debugging.", a: "1) Verify data: visualise inputs/labels, check alignment and preprocessing. 2) Check initial loss ≈ ln K. 3) Overfit a single small batch — if it fails, it's a bug: check zero_grad, loss inputs (logits vs probs), params in optimizer, train mode, detach misuse. 4) Sweep LR by 10x. 5) Inspect gradient norms per layer (vanishing/exploding/dead ReLUs). 6) Simplify the model / remove augmentation until it works, then add back." },
            { q: "You get NaN loss. What are the likely causes?", a: "LR too high / exploding gradients, log of zero or negative (use log-softmax, add eps), division by zero in normalisation, fp16 overflow (use bf16 or loss scaling), corrupted inputs (NaN in data), all-masked attention rows. Use anomaly detection, check inputs, clip gradients, lower LR." },
            { q: "How do you tell overfitting from underfitting?", a: "Underfitting: training loss itself is high — increase capacity, train longer, raise LR, reduce regularisation. Overfitting: training loss low but validation loss rising/gap growing — more data/augmentation, regularisation, early stopping, smaller model." },
            { q: "GPU utilisation is 30%. How do you speed up training?", a: "Profile first. Common fixes: more DataLoader workers / pin_memory / prefetch, pre-process offline, remove per-step <code>.item()</code>/prints (syncs), larger batch, mixed precision, <code>torch.compile</code>, fused optimizers, FlashAttention, and overlap communication in distributed runs." }
          ]
        }
      ]
    }
  ]
});
