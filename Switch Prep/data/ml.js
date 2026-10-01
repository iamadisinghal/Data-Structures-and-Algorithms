PREP.add({
  id: 'ml',
  order: 110,
  group: 'AI / ML',
  title: 'Machine Learning',
  short: 'Machine learning',
  blurb: 'Math, classical algorithms, evaluation — the depth behind ML interviews.',
  intro: [
    "ML interviews at product companies (and applied-scientist / ML-engineer loops in India) usually contain three kinds of rounds: <b>ML breadth / theory</b> (rapid-fire: bias-variance, regularisation, why logistic regression uses log-loss, how boosting differs from bagging, which metric for imbalance), <b>ML coding</b> (implement logistic regression, k-means, kNN, a decision-tree split or metrics in NumPy in 30-45 minutes, sometimes a pandas/feature-engineering task), and <b>ML case discussion</b> (design an approach for fraud / churn / recommendations: problem framing, data, features, model, metric, offline vs online evaluation, failure modes).",
    "A resume deep-dive is almost always included: be ready to defend every modelling choice in your past projects (why that model, that metric, how you validated, what you would do differently). GenAI roles still ask classical ML - it is the shared vocabulary.",
    "How to use this tab: Beginner gives the math the interviewer assumes; Intermediate is the algorithm core - be able to derive and implement; Advanced covers practice-of-ML topics that dominate case rounds. For each algorithm learn: intuition, objective/loss, how it is optimised, hyperparameters, assumptions, complexity, when it fails."
  ],
  resources: [
    { n: 'ISLR / ISLP - An Introduction to Statistical Learning', u: 'https://www.statlearning.com/', d: 'Free book (R and Python editions). Clear treatment of regression, classification, resampling, trees, SVM, unsupervised.' },
    { n: 'Hands-On Machine Learning (Aurelien Geron)', u: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/', d: 'Practical scikit-learn + deep learning; end-to-end project chapter is a great case-round template.' },
    { n: 'StatQuest with Josh Starmer (YouTube)', u: 'https://www.youtube.com/@statquest', d: 'Best intuition videos: gradient boosting, XGBoost, ROC/AUC, PCA, regularisation.' },
    { n: 'Andrew Ng - Machine Learning Specialization', u: 'https://www.coursera.org/specializations/machine-learning-introduction', d: 'Foundations refresher: regression, classification, neural nets, trees, recsys, unsupervised.' },
    { n: 'Chip Huyen - Introduction to ML Interviews book', u: 'https://huyenchip.com/ml-interviews-book/', d: 'Free; interview process, ML theory questions and practice question banks.' },
    { n: 'Deep-ML', u: 'https://www.deep-ml.com/', d: 'LeetCode-style problems: implement ML/linear algebra/stats algorithms from scratch in NumPy.' },
    { n: 'Kaggle Learn', u: 'https://www.kaggle.com/learn', d: 'Short hands-on courses: Intermediate ML, Feature Engineering, ML Explainability.' },
    { n: 'scikit-learn user guide', u: 'https://scikit-learn.org/stable/user_guide.html', d: 'Precise descriptions of algorithms, metrics, cross-validation and pipelines.' },
    { n: 'Mathematics for Machine Learning (Deisenroth, Faisal, Ong)', u: 'https://mml-book.github.io/', d: 'Free book: linear algebra, calculus, probability, PCA, GMM, SVM derivations.' }
  ],
  levels: [
    {
      name: 'Beginner · Math & foundations',
      desc: 'Probability, statistics, linear algebra, calculus and the core concepts every ML question builds on.',
      topics: [
        {
          id: 'ml-prob-stats',
          title: 'Probability & statistics for ML',
          est: '5-6 days',
          why: 'Bayes, MLE/MAP and A/B testing are asked in almost every applied-scientist and data-heavy ML loop; product companies love experiment-design questions.',
          learn: [
            "Random variables, PMF/PDF/CDF, expectation, variance, covariance, correlation; linearity of expectation; <code>Var(aX+b) = a^2 Var(X)</code>.",
            "Key distributions and where they appear: Bernoulli/Binomial (clicks), Poisson (counts per time), Geometric, Uniform, Normal, Exponential, Beta (conversion-rate prior), Multinomial/Categorical (softmax output).",
            "Conditional probability, independence, <b>Bayes theorem</b> <code>P(A|B) = P(B|A) P(A) / P(B)</code>, law of total probability; base-rate fallacy.",
            "<b>MLE</b>: choose parameters maximising <code>Π p(x<sub>i</sub>|θ)</code> (maximise log-likelihood). <b>MAP</b>: maximise likelihood x prior; Gaussian prior = L2, Laplace prior = L1.",
            "Law of large numbers and <b>Central Limit Theorem</b>: sample mean is approx <code>N(μ, σ<sup>2</sup>/n)</code> for large n regardless of the population distribution (finite variance).",
            "Hypothesis testing: null/alternative, p-value, significance level α, Type I/II errors, power (1-β), confidence intervals; z-test, t-test, chi-square test, Mann-Whitney.",
            "<b>A/B testing</b>: randomisation unit, primary + guardrail metrics, sample size from baseline rate, MDE, α and power; avoid peeking; multiple-testing correction (Bonferroni, Benjamini-Hochberg).",
            "Bias of estimators, sample variance with <code>n-1</code>, bootstrap for confidence intervals.",
            "Practical pitfalls: Simpson's paradox, novelty effect, network effects / interference, sample ratio mismatch (SRM)."
          ],
          practice: [
            { t: 'StatQuest: Maximum Likelihood, clearly explained', p: 'YT', d: 'E' },
            { t: 'StatQuest: p-values, clearly explained', p: 'YT', d: 'E' },
            { t: 'Deep-ML: probability / statistics problems (e.g. Poisson, binomial, normal PDF)', p: 'DML', d: 'E' },
            { t: 'Derive the MLE of Bernoulli p and Gaussian μ, σ^2 on paper', p: 'BUILD', d: 'M' },
            { t: 'Simulate the CLT: sample means of exponential draws, plot for n = 1, 5, 30', p: 'BUILD', d: 'E' },
            { t: 'Write an A/B test analyser: two-proportion z-test, CI, and required sample size for a given MDE', p: 'BUILD', d: 'M' },
            { t: 'Bootstrap a 95% CI for the median and for an AUC difference', p: 'BUILD', d: 'M' },
            { t: 'Solve 10 Bayes problems (disease test, spam filter, two-child, Monty Hall)', p: 'BUILD', d: 'M' },
            { t: 'Chip Huyen ML interviews book - probability & statistics chapter questions', p: 'BOOK', d: 'M', u: 'https://huyenchip.com/ml-interviews-book/' }
          ],
          notes: [
            "Bayes intuition: posterior is proportional to likelihood x prior. Rare-disease test with 99% sensitivity/specificity and 1% prevalence gives only ~50% posterior - the base rate dominates.",
            "Log-likelihood turns products into sums (numerically stable, easy gradients). Minimising MSE = MLE under Gaussian noise; minimising cross-entropy = MLE for Bernoulli/categorical outputs.",
            "Sample size per arm for proportions (two-sided): <code>n ≈ (z<sub>1-α/2</sub> + z<sub>1-β</sub>)<sup>2</sup> · 2p(1-p) / δ<sup>2</sup></code>; for α=0.05, power=0.8 that is about <code>16 p(1-p)/δ<sup>2</sup></code>.",
            "p-value = probability of data at least this extreme <i>if H<sub>0</sub> is true</i>. It is NOT the probability that H<sub>0</sub> is true.",
            "Standard error of a mean: <code>σ/√n</code> - to halve the CI width you need 4x the data.",
            "Beta-Binomial conjugacy: prior Beta(a,b) + k successes in n trials gives posterior Beta(a+k, b+n-k) - basis of Bayesian A/B testing and Thompson sampling.",
            "Correlation measures linear association only; zero correlation does not imply independence (e.g. Y = X<sup>2</sup>, X symmetric)."
          ],
          cases: [
            "Peeking at an A/B test daily and stopping when p<0.05 inflates false positives - use fixed horizon or sequential tests.",
            "Wrong answer: 'p = 0.03 means a 97% chance the treatment works'.",
            "Randomising by session when the metric is per-user leads to correlated samples and too-narrow CIs; analysis unit must match randomisation unit (or use delta method).",
            "Testing 20 metrics at α=0.05 - expect one false positive; correct for multiplicity or pre-register a primary metric.",
            "Simpson's paradox: treatment wins in every segment but loses overall due to different segment mix.",
            "Follow-up: 'The test is significant but the effect is tiny - ship?' - statistical vs practical significance; consider cost, guardrails, long-term effects."
          ],
          qa: [
            { q: 'MLE vs MAP?', a: "MLE picks θ maximising the likelihood <code>p(data|θ)</code>. MAP maximises the posterior <code>p(data|θ) p(θ)</code>, i.e. adds a log-prior term to the objective. With a Gaussian prior MAP equals L2-regularised MLE; with a Laplace prior it equals L1. As data grows, the prior matters less and MAP approaches MLE." },
            { q: 'Explain the Central Limit Theorem and why it matters.', a: "The (standardised) mean of n i.i.d. samples with finite variance converges in distribution to a normal as n grows, whatever the original distribution. It justifies normal-based confidence intervals and z/t tests on means and proportions, e.g. in A/B tests." },
            { q: 'How do you design an A/B test?', a: "Define hypothesis and a primary metric (plus guardrails), choose randomisation unit, compute sample size from baseline, MDE, α (0.05) and power (0.8), run for full weekly cycles, check SRM and data quality, then analyse with the appropriate test and CI, accounting for multiple comparisons, novelty effects and segment heterogeneity." },
            { q: 'What are Type I and Type II errors?', a: "Type I: rejecting a true null (false positive), probability α. Type II: failing to reject a false null (false negative), probability β; power = 1-β. Increasing sample size reduces β for fixed α." },
            { q: 'What is a p-value?', a: "The probability, assuming the null hypothesis is true, of observing a test statistic at least as extreme as the one observed. Small p-values indicate the data are unlikely under H<sub>0</sub>; it says nothing directly about effect size or the probability H<sub>0</sub> is true." }
          ],
          code: String.raw`import numpy as np
from scipy import stats

def two_prop_ztest(x1, n1, x2, n2):
    p1, p2 = x1 / n1, x2 / n2
    p = (x1 + x2) / (n1 + n2)
    se = np.sqrt(p * (1 - p) * (1 / n1 + 1 / n2))
    z = (p2 - p1) / se
    pval = 2 * (1 - stats.norm.cdf(abs(z)))
    se_diff = np.sqrt(p1 * (1 - p1) / n1 + p2 * (1 - p2) / n2)
    ci = (p2 - p1 - 1.96 * se_diff, p2 - p1 + 1.96 * se_diff)
    return z, pval, ci

def sample_size_per_arm(p, mde, alpha=0.05, power=0.8):
    za, zb = stats.norm.ppf(1 - alpha / 2), stats.norm.ppf(power)
    return int(np.ceil((za + zb) ** 2 * 2 * p * (1 - p) / mde ** 2))

def bootstrap_ci(x, stat=np.median, B=5000, rng=np.random.default_rng(0)):
    boots = [stat(rng.choice(x, size=len(x), replace=True)) for _ in range(B)]
    return np.percentile(boots, [2.5, 97.5])

print(sample_size_per_arm(0.10, 0.01))   # ~14.7k per arm`
        },
        {
          id: 'ml-linalg-calc',
          title: 'Linear algebra & calculus for ML',
          est: '4-5 days',
          why: 'Needed to derive gradients, explain PCA/SVD, reason about shapes in ML coding rounds and answer "why does this optimiser behave like that?".',
          learn: [
            "Vectors, dot product (<code>a·b = |a||b|cos θ</code>), norms (L1, L2, L∞), cosine similarity, projections.",
            "Matrix ops: multiplication as composition, shapes rule <code>(m×n)(n×p) = (m×p)</code>, transpose, inverse, rank, determinant, trace; solving <code>Ax = b</code>.",
            "Special matrices: identity, diagonal, symmetric, orthogonal (<code>Q<sup>T</sup>Q = I</code>), positive (semi-)definite - covariance matrices and Hessians of convex losses are PSD.",
            "<b>Eigendecomposition</b> <code>Av = λv</code>; symmetric matrices have real eigenvalues and orthogonal eigenvectors (<code>A = QΛQ<sup>T</sup></code>).",
            "<b>SVD</b> <code>X = UΣV<sup>T</sup></code> for any matrix; link to PCA, low-rank approximation (Eckart-Young), pseudo-inverse, matrix factorisation in recsys.",
            "Derivatives, partial derivatives, <b>gradient</b> (direction of steepest ascent), Jacobian, Hessian; Taylor expansion intuition for optimisation.",
            "<b>Chain rule</b> - the basis of backpropagation; computational graphs.",
            "Matrix calculus essentials: <code>∇<sub>w</sub>(w<sup>T</sup>x) = x</code>, <code>∇<sub>w</sub>(w<sup>T</sup>Aw) = (A + A<sup>T</sup>)w</code>, <code>∇<sub>w</sub>||Xw - y||<sup>2</sup> = 2X<sup>T</sup>(Xw - y)</code>.",
            "Convexity: convex functions have a single global minimum; MSE for linear regression and log-loss for logistic regression are convex in the weights, neural nets are not."
          ],
          practice: [
            { t: 'Deep-ML: Matrix times Vector', p: 'DML', d: 'E' },
            { t: 'Deep-ML: Calculate Covariance Matrix', p: 'DML', d: 'E' },
            { t: 'Deep-ML: Calculate Eigenvalues of a Matrix', p: 'DML', d: 'M' },
            { t: 'Deep-ML: SVD / singular value decomposition problem', p: 'DML', d: 'H' },
            { t: '3Blue1Brown - Essence of Linear Algebra (playlist)', p: 'YT', d: 'E', u: 'https://www.3blue1brown.com/topics/linear-algebra' },
            { t: 'Derive the normal equation w = (X^T X)^-1 X^T y from the gradient of MSE', p: 'BUILD', d: 'M' },
            { t: 'Derive the gradient of logistic log-loss: X^T (σ(Xw) - y) / n', p: 'BUILD', d: 'M' },
            { t: 'Implement numerical gradient checking (central differences) and verify an analytic gradient', p: 'BUILD', d: 'M' },
            { t: 'Compress an image with truncated SVD for k = 5, 20, 50 and plot reconstruction error', p: 'BUILD', d: 'M' }
          ],
          notes: [
            "Think in shapes: X is (n, d), w is (d,), predictions Xw are (n,), gradient X<sup>T</sup>r is (d,). Shape-checking catches most derivation errors.",
            "PCA via SVD of centred X: principal directions are columns of V, explained variance <code>σ<sub>i</sub><sup>2</sup>/(n-1)</code>.",
            "Condition number <code>σ<sub>max</sub>/σ<sub>min</sub></code> large means ill-conditioned: unstable inverse, slow gradient descent - fix with scaling or regularisation (ridge adds λI).",
            "Never compute an explicit inverse in practice - use <code>np.linalg.solve</code>, <code>lstsq</code> or QR/Cholesky.",
            "Gradient of softmax + cross-entropy w.r.t. logits is simply <code>p - y</code> (predicted probs minus one-hot) - memorise it.",
            "Sigmoid derivative <code>σ'(z) = σ(z)(1 - σ(z))</code>; tanh derivative <code>1 - tanh<sup>2</sup>(z)</code>.",
            "Rank of X<sup>T</sup>X less than d (collinear or d > n) means no unique OLS solution - ridge or pseudo-inverse."
          ],
          cases: [
            "Confusing element-wise <code>*</code> with matrix product <code>@</code> in NumPy.",
            "Using eigendecomposition on a non-square or non-symmetric data matrix for PCA - use SVD of the centred data or eig of the covariance.",
            "Forgetting to centre data before PCA - first component points at the mean.",
            "Calling X<sup>T</sup>X invertible when features are perfectly collinear (dummy-variable trap).",
            "Follow-up: 'What does a negative eigenvalue of the Hessian tell you?' - not a minimum in that direction (saddle point or maximum)."
          ],
          qa: [
            { q: 'What is SVD and how does it relate to PCA?', a: "Any matrix X factors as <code>UΣV<sup>T</sup></code> with orthonormal U, V and non-negative singular values Σ. For centred data, the columns of V are the principal directions, the projections are <code>UΣ</code>, and the variance along component i is <code>σ<sub>i</sub><sup>2</sup>/(n-1)</code>. Truncating to the top k singular values gives the best rank-k approximation." },
            { q: 'Why is the chain rule central to deep learning?', a: "A network is a composition of functions; the chain rule expresses the gradient of the loss w.r.t. early parameters as a product of local derivatives. Backpropagation applies it efficiently in reverse order, reusing intermediate results, so all gradients cost about as much as one forward pass." },
            { q: 'What does it mean for a matrix to be positive semi-definite and why care?', a: "<code>x<sup>T</sup>Ax ≥ 0</code> for all x (equivalently all eigenvalues ≥ 0 for symmetric A). Covariance matrices and kernel matrices are PSD; a PSD Hessian everywhere means the function is convex, so gradient methods find the global minimum." },
            { q: 'Derive the closed-form solution of linear regression.', a: "Minimise <code>L(w) = ||Xw - y||<sup>2</sup></code>. Gradient <code>2X<sup>T</sup>(Xw - y) = 0</code> gives the normal equation <code>X<sup>T</sup>Xw = X<sup>T</sup>y</code>, so <code>w = (X<sup>T</sup>X)<sup>-1</sup>X<sup>T</sup>y</code> when X<sup>T</sup>X is invertible. Ridge: <code>w = (X<sup>T</sup>X + λI)<sup>-1</sup>X<sup>T</sup>y</code>. Cost O(nd<sup>2</sup> + d<sup>3</sup>)." }
          ],
          code: String.raw`import numpy as np

def num_grad(f, w, eps=1e-6):
    g = np.zeros_like(w)
    for i in range(w.size):
        e = np.zeros_like(w); e[i] = eps
        g[i] = (f(w + e) - f(w - e)) / (2 * eps)
    return g

X = np.random.randn(100, 3); y = X @ np.array([1., -2., .5]) + .1 * np.random.randn(100)
loss = lambda w: np.mean((X @ w - y) ** 2)
grad = lambda w: 2 * X.T @ (X @ w - y) / len(y)
w0 = np.random.randn(3)
assert np.allclose(num_grad(loss, w0), grad(w0), atol=1e-5)

w_ols = np.linalg.solve(X.T @ X, X.T @ y)          # not inv()

def pca(X, k):
    Xc = X - X.mean(0)
    U, S, Vt = np.linalg.svd(Xc, full_matrices=False)
    explained = S ** 2 / (len(X) - 1)
    return Xc @ Vt[:k].T, Vt[:k], explained[:k] / explained.sum()`
        },
        {
          id: 'ml-basics',
          title: 'ML basics: bias-variance, generalisation, validation, leakage',
          est: '3 days',
          why: 'Opening questions of most ML rounds; also the lens for every case discussion ("your model does great offline but poorly in prod - why?").',
          learn: [
            "Supervised (regression, classification), unsupervised (clustering, dimensionality reduction, density estimation), self-supervised, semi-supervised, reinforcement learning - with examples.",
            "Parametric vs non-parametric models; generative (<code>p(x, y)</code>, e.g. Naive Bayes, GMM) vs discriminative (<code>p(y|x)</code>, e.g. logistic regression).",
            "<b>Bias-variance decomposition</b>: expected test MSE = bias<sup>2</sup> + variance + irreducible noise.",
            "Underfitting (high bias: train and val error both high) vs overfitting (high variance: low train, high val error); learning curves to diagnose.",
            "Remedies: more data, regularisation, simpler/complex model, feature selection, early stopping, ensembling (bagging reduces variance, boosting reduces bias).",
            "Train / validation / test split purposes; never tune on test. Stratified splits for classification, group splits (same user in one fold), time-based splits for temporal data.",
            "<b>Cross-validation</b>: k-fold, stratified k-fold, GroupKFold, TimeSeriesSplit, nested CV for unbiased model-selection estimates; LOOCV trade-offs.",
            "<b>Data leakage</b>: target leakage (features computed with future/label info) and train-test contamination (fitting scalers/encoders on all data, duplicates across splits).",
            "No free lunch theorem; curse of dimensionality; i.i.d. assumption and distribution shift (covariate, label, concept drift)."
          ],
          practice: [
            { t: 'StatQuest: Machine Learning Fundamentals: Bias and Variance', p: 'YT', d: 'E' },
            { t: 'StatQuest: Machine Learning Fundamentals: Cross Validation', p: 'YT', d: 'E' },
            { t: 'Kaggle Learn - Intermediate Machine Learning (pipelines, CV, leakage lessons)', p: 'KG', d: 'E', u: 'https://www.kaggle.com/learn/intermediate-machine-learning' },
            { t: 'Titanic - Machine Learning from Disaster (first end-to-end pipeline + CV)', p: 'KG', d: 'E', u: 'https://www.kaggle.com/competitions/titanic' },
            { t: 'Plot learning curves and validation curves (polynomial degree) to show under/overfitting', p: 'BUILD', d: 'M' },
            { t: 'Implement k-fold cross-validation from scratch (with shuffling and stratification)', p: 'BUILD', d: 'M' },
            { t: 'Demonstrate leakage: scale before vs after split / target-encode on full data, compare CV vs holdout', p: 'BUILD', d: 'M' },
            { t: 'Simulate bias-variance: fit many models on bootstrap samples and estimate bias^2 and variance', p: 'BUILD', d: 'H' }
          ],
          notes: [
            "Diagnose with two numbers: train error and validation error. Big gap = variance; both high = bias; both low but production bad = leakage or distribution shift.",
            "k in k-fold: 5 or 10 is standard; larger k means less bias in the estimate but more variance and compute.",
            "Put all preprocessing in a scikit-learn <code>Pipeline</code> so it is refit inside each CV fold - the cleanest leakage prevention.",
            "Time series: train on past, validate on future (expanding or sliding window). Random k-fold on temporal data is optimistic.",
            "Model complexity knobs: tree depth, k in kNN (small k = high variance), polynomial degree, regularisation strength λ (bigger λ = more bias).",
            "Double descent: heavily over-parameterised models (deep nets) can generalise well past the interpolation threshold - classical U-curve is not the whole story."
          ],
          cases: [
            "Leaky features in real projects: 'number of support calls' when predicting churn computed after the churn date; 'refund issued' when predicting fraud.",
            "Duplicate or near-duplicate rows (same user, augmented images) across train and test inflate scores - split by group.",
            "Tuning hyperparameters on the test set and then reporting test score - optimistic bias.",
            "Oversampling (SMOTE) before splitting leaks synthetic copies of test points into training.",
            "Follow-up: 'Validation AUC 0.99 on the first try - what do you check?' - leakage (feature importance, timestamps), duplicates, label definition.",
            "Follow-up: 'Offline metrics improved but online A/B is flat' - offline/online metric mismatch, distribution shift, feedback loops, serving skew."
          ],
          qa: [
            { q: 'Explain the bias-variance trade-off.', a: "Prediction error decomposes into bias<sup>2</sup> (error from wrong assumptions - model too simple), variance (sensitivity to the particular training sample - model too flexible) and irreducible noise. Increasing complexity lowers bias and raises variance; we choose complexity (via regularisation, validation) to minimise total error." },
            { q: 'How do you detect and fix overfitting?', a: "Detect: training error much lower than validation error, or validation error rising while training keeps falling (learning curves). Fix: more/augmented data, regularisation (L1/L2, dropout), simpler model or fewer features, early stopping, bagging/ensembles, better CV." },
            { q: 'What is data leakage? Give examples.', a: "Information unavailable at prediction time leaking into training, producing optimistic offline results. Examples: features derived from the target or from the future, fitting a scaler/imputer/target-encoder on the full dataset before splitting, random splits on time series, the same entity in train and test." },
            { q: 'Why do we need a separate validation and test set?', a: "The validation set (or CV) is used repeatedly for model selection and tuning, so it becomes optimistically biased. The test set is touched once at the end to get an unbiased estimate of generalisation." },
            { q: 'Generative vs discriminative models?', a: "Generative models learn the joint <code>p(x, y)</code> (or <code>p(x|y)p(y)</code>) and can generate data - Naive Bayes, GMM, HMM. Discriminative models learn <code>p(y|x)</code> or a decision boundary directly - logistic regression, SVM, trees. Discriminative usually wins with lots of data; generative can do better with little data and handles missing features naturally." }
          ]
        }
      ]
    },
    {
      name: 'Intermediate · Classical algorithms',
      desc: 'The algorithms you must be able to derive, implement, compare and tune - plus the metrics to evaluate them.',
      topics: [
        {
          id: 'ml-linear-logistic',
          title: 'Linear & logistic regression',
          est: '4 days',
          why: 'The most-asked derivation and the most-asked from-scratch implementation in ML coding rounds; the base for regularisation and GLM questions.',
          learn: [
            "Linear regression: model <code>ŷ = Xw + b</code>, MSE loss, closed form (normal equation) vs gradient descent; assumptions (linearity, independent errors, homoscedasticity, normal errors for inference, no perfect multicollinearity).",
            "Interpreting coefficients, R<sup>2</sup> and adjusted R<sup>2</sup>, residual plots; multicollinearity and VIF.",
            "Logistic regression: <code>p = σ(w<sup>T</sup>x + b)</code>, <code>σ(z) = 1/(1+e<sup>-z</sup>)</code>; log-odds are linear in x; decision boundary is linear.",
            "Log-loss (binary cross-entropy) <code>L = -(1/n) Σ [y log p + (1-y) log(1-p)]</code> derived from Bernoulli MLE; gradient <code>X<sup>T</sup>(p - y)/n</code>.",
            "Why not MSE for logistic regression: non-convex with sigmoid and weak gradients when confidently wrong.",
            "<b>Regularisation</b>: L2/Ridge (shrinks weights, handles collinearity, closed form), L1/Lasso (sparse - feature selection), Elastic Net; always scale features first; do not regularise the bias.",
            "Gradient descent variants: batch, mini-batch, SGD; learning rate choice; convergence; feature scaling effect on contours.",
            "Multiclass: one-vs-rest vs softmax (multinomial) regression with cross-entropy.",
            "Interpretation: odds ratio <code>e<sup>w<sub>j</sub></sup></code> per unit increase in feature j; class weights and threshold tuning for imbalance."
          ],
          practice: [
            { t: 'Deep-ML: Linear Regression Using Normal Equation', p: 'DML', d: 'E' },
            { t: 'Deep-ML: Linear Regression Using Gradient Descent', p: 'DML', d: 'E' },
            { t: 'Deep-ML: Sigmoid Activation Function', p: 'DML', d: 'E' },
            { t: 'Deep-ML: Softmax Activation Function', p: 'DML', d: 'E' },
            { t: 'Deep-ML: logistic regression / binary classification from scratch problem', p: 'DML', d: 'M' },
            { t: 'StatQuest: Regularization Part 1: Ridge (L2) Regression', p: 'YT', d: 'E' },
            { t: 'StatQuest: Logistic Regression (playlist)', p: 'YT', d: 'E' },
            { t: 'House Prices - Advanced Regression Techniques (ridge/lasso baseline)', p: 'KG', d: 'M', u: 'https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques' },
            { t: 'Implement logistic regression with L2, mini-batch GD and early stopping in NumPy; match sklearn', p: 'BUILD', d: 'M' },
            { t: 'Implement softmax regression for 3+ classes from scratch', p: 'BUILD', d: 'M' },
            { t: 'Show Lasso path: number of non-zero coefficients vs alpha', p: 'BUILD', d: 'E' }
          ],
          notes: [
            "Why L1 gives sparsity: the L1 ball has corners on the axes, so the loss contour typically touches it where some weights are exactly 0; L2 ball is round, so weights shrink but rarely hit 0. Subgradient view: L1 applies a constant pull toward 0.",
            "Ridge closed form <code>(X<sup>T</sup>X + λI)<sup>-1</sup>X<sup>T</sup>y</code> is always invertible for λ > 0.",
            "Logistic regression outputs are reasonably calibrated by construction (log-loss is a proper scoring rule) - unlike SVM or boosted trees.",
            "Perfect separation makes unregularised logistic weights diverge to infinity - regularisation fixes it.",
            "Numerical stability: compute log-loss via log-sum-exp / <code>np.logaddexp</code> or clip p to [eps, 1-eps].",
            "Linear models need feature engineering for non-linearity: interactions, polynomials, splines, binning, log transforms.",
            "Multicollinearity does not hurt prediction much but makes coefficients unstable and uninterpretable."
          ],
          cases: [
            "Forgetting to scale features before L1/L2 - penalty unfairly hits small-scale features.",
            "Interpreting coefficients causally or comparing unscaled coefficient magnitudes as importance.",
            "Using accuracy and a 0.5 threshold on imbalanced data - tune the threshold on validation for the business metric.",
            "Shape bug: y shaped (n,1) and predictions (n,) - broadcast to (n,n) gradients.",
            "Regularising the intercept term - shifts predictions toward 0.",
            "Follow-up: 'What if the relationship is non-linear?' - feature transforms, GAMs, trees/boosting, kernels.",
            "Follow-up: 'Why is logistic regression a linear classifier if the sigmoid is non-linear?' - the decision boundary <code>w<sup>T</sup>x + b = 0</code> is a hyperplane."
          ],
          qa: [
            { q: 'Derive the gradient of logistic regression.', a: "<code>L = -(1/n) Σ[y log p + (1-y) log(1-p)]</code>, <code>p = σ(z)</code>, <code>z = Xw</code>. Using <code>σ'(z) = p(1-p)</code>, <code>∂L/∂z = (p - y)/n</code>, so <code>∇<sub>w</sub>L = X<sup>T</sup>(p - y)/n</code> and <code>∂L/∂b = mean(p - y)</code>. Same form as linear regression with p in place of ŷ." },
            { q: 'L1 vs L2 regularisation?', a: "L1 (Lasso) adds <code>λΣ|w|</code>: produces sparse solutions (feature selection), no closed form, unstable among correlated features (picks one). L2 (Ridge) adds <code>λΣw<sup>2</sup></code>: shrinks all weights smoothly, handles collinearity, closed form, corresponds to Gaussian prior. Elastic Net combines both." },
            { q: 'Why log-loss instead of MSE for classification?', a: "Log-loss is the negative Bernoulli log-likelihood, so minimising it is MLE; with a sigmoid it is convex in w and gives strong gradients when the model is confidently wrong. MSE with sigmoid is non-convex and its gradient vanishes when predictions saturate." },
            { q: 'What are the assumptions of linear regression?', a: "Linear relationship between features and target, independent errors, constant error variance (homoscedasticity), no perfect multicollinearity, and (for p-values/CIs) normally distributed errors. Violations mostly affect inference; prediction may still be fine." },
            { q: 'How do you interpret a logistic regression coefficient?', a: "A one-unit increase in feature j (others fixed) changes the log-odds by w<sub>j</sub>, i.e. multiplies the odds by <code>e<sup>w<sub>j</sub></sup></code>. E.g. w = 0.69 means odds roughly double." }
          ],
          code: String.raw`import numpy as np

def sigmoid(z):
    return np.where(z >= 0, 1 / (1 + np.exp(-z)), np.exp(z) / (1 + np.exp(z)))

class LogisticRegression:
    def __init__(self, lr=0.1, l2=0.0, epochs=1000, batch=None, tol=1e-6):
        self.lr, self.l2, self.epochs, self.batch, self.tol = lr, l2, epochs, batch, tol

    def fit(self, X, y):
        n, d = X.shape
        self.w, self.b = np.zeros(d), 0.0
        rng = np.random.default_rng(0)
        prev = np.inf
        for _ in range(self.epochs):
            idx = rng.permutation(n)
            bs = self.batch or n
            for s in range(0, n, bs):
                j = idx[s:s + bs]
                p = sigmoid(X[j] @ self.w + self.b)
                err = p - y[j]
                gw = X[j].T @ err / len(j) + self.l2 * self.w   # no penalty on b
                gb = err.mean()
                self.w -= self.lr * gw
                self.b -= self.lr * gb
            loss = self.loss(X, y)
            if abs(prev - loss) < self.tol:
                break
            prev = loss
        return self

    def predict_proba(self, X):
        return sigmoid(X @ self.w + self.b)

    def loss(self, X, y, eps=1e-12):
        p = np.clip(self.predict_proba(X), eps, 1 - eps)
        return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p)) + 0.5 * self.l2 * self.w @ self.w

def ridge_closed_form(X, y, lam):
    Xb = np.c_[np.ones(len(X)), X]
    I = np.eye(Xb.shape[1]); I[0, 0] = 0          # do not penalise intercept
    return np.linalg.solve(Xb.T @ Xb + lam * I, Xb.T @ y)`
        },
        {
          id: 'ml-trees',
          title: 'Tree models: decision trees, random forest, gradient boosting, XGBoost/LightGBM',
          est: '5 days',
          why: 'Gradient-boosted trees are the default for tabular data in industry (fraud, ranking, risk); "bagging vs boosting" and "how does XGBoost work" are guaranteed questions.',
          learn: [
            "Decision tree: greedy recursive binary splits maximising impurity reduction; <b>Gini</b> <code>1 - Σp<sub>k</sub><sup>2</sup></code>, <b>entropy</b> <code>-Σp<sub>k</sub> log p<sub>k</sub></code>, information gain; variance/MSE reduction for regression.",
            "Stopping and pruning: max_depth, min_samples_leaf, min_impurity_decrease, cost-complexity pruning (ccp_alpha). Trees overfit easily (high variance).",
            "Trees handle mixed feature types and non-linearities, need no scaling, are invariant to monotonic transforms, but are unstable and extrapolate poorly (piecewise constant).",
            "<b>Bagging</b> and <b>Random Forest</b>: bootstrap samples + random feature subset per split (max_features ~ √d for classification) to decorrelate trees; averaging reduces variance; out-of-bag (OOB) error.",
            "<b>Boosting</b>: AdaBoost (reweight misclassified samples) and <b>gradient boosting</b> - sequentially fit trees to the negative gradient (pseudo-residuals) of the loss; shrinkage (learning rate) and subsampling.",
            "<b>XGBoost</b>: second-order (gradient + Hessian) Taylor approximation, regularised objective (<code>γT + ½λΣw<sub>j</sub><sup>2</sup></code>), optimal leaf weight <code>-G/(H+λ)</code>, split gain formula, sparsity-aware split finding, column subsampling.",
            "<b>LightGBM</b>: histogram-based splits, leaf-wise growth (num_leaves), GOSS and EFB; <b>CatBoost</b>: ordered target statistics for categoricals, symmetric trees.",
            "Key hyperparameters: n_estimators + learning_rate (with early stopping), max_depth / num_leaves, min_child_weight, subsample, colsample_bytree, reg_lambda/alpha.",
            "Feature importance: split count vs gain vs permutation vs SHAP (see explainability topic)."
          ],
          practice: [
            { t: 'StatQuest: Decision and Classification Trees, Clearly Explained', p: 'YT', d: 'E' },
            { t: 'StatQuest: Random Forests Part 1', p: 'YT', d: 'E' },
            { t: 'StatQuest: Gradient Boost Part 1-4 (regression + classification)', p: 'YT', d: 'M' },
            { t: 'StatQuest: XGBoost Part 1-4', p: 'YT', d: 'M' },
            { t: 'Deep-ML: Calculate entropy / Gini impurity / decision tree learning problems', p: 'DML', d: 'M' },
            { t: 'Spaceship Titanic (LightGBM/XGBoost with early stopping)', p: 'KG', d: 'M', u: 'https://www.kaggle.com/competitions/spaceship-titanic' },
            { t: 'Implement the best-split search (Gini) for one feature in O(n log n) with sorting + prefix counts', p: 'BUILD', d: 'M' },
            { t: 'Implement a regression tree + gradient boosting (MSE) from scratch with shrinkage', p: 'BUILD', d: 'H' },
            { t: 'Compare RF vs XGBoost vs LightGBM on a tabular dataset: accuracy, training time, sensitivity to hyperparameters', p: 'BUILD', d: 'M' },
            { t: 'XGBoost docs - Introduction to Boosted Trees (derivation)', p: 'DOC', d: 'M', u: 'https://xgboost.readthedocs.io/en/stable/tutorials/model.html' }
          ],
          notes: [
            "Bagging reduces <b>variance</b> (average of decorrelated high-variance learners); boosting reduces <b>bias</b> (adds weak learners to fix residual errors) and can overfit if run too long.",
            "Gradient boosting with MSE: pseudo-residual = <code>y - F(x)</code>; with log-loss: <code>y - p</code>. Update <code>F<sub>m</sub> = F<sub>m-1</sub> + η·h<sub>m</sub></code>.",
            "XGBoost split gain: <code>½[G<sub>L</sub><sup>2</sup>/(H<sub>L</sub>+λ) + G<sub>R</sub><sup>2</sup>/(H<sub>R</sub>+λ) - (G<sub>L</sub>+G<sub>R</sub>)<sup>2</sup>/(H<sub>L</sub>+H<sub>R</sub>+λ)] - γ</code>.",
            "Lower learning rate + more trees + early stopping on a validation set = the standard recipe.",
            "RF rarely overfits by adding trees (more trees only reduce variance); boosting does overfit with too many rounds.",
            "Single-tree split search complexity: O(d · n log n) per node with sorting (histograms make it O(d · bins)).",
            "Trees for tabular, deep learning for unstructured (text, images, audio) - still the industry rule of thumb."
          ],
          cases: [
            "Impurity-based feature importance is biased toward high-cardinality / continuous features - use permutation importance or SHAP.",
            "Trees cannot extrapolate: predicting prices beyond the training range gives flat predictions.",
            "One-hot encoding high-cardinality categoricals for trees creates sparse, weak splits - use target encoding (out-of-fold) or native categorical handling (LightGBM/CatBoost).",
            "Leaf-wise LightGBM overfits on small data unless num_leaves / min_data_in_leaf are constrained.",
            "Early stopping on the test set = leakage; use a separate validation split.",
            "Follow-up: 'Why does random forest use feature subsampling?' - to decorrelate trees; averaging correlated trees barely reduces variance.",
            "Follow-up: 'Can gradient boosting work with any loss?' - any differentiable loss (XGBoost needs a second derivative too)."
          ],
          qa: [
            { q: 'Bagging vs boosting?', a: "Bagging trains models independently on bootstrap samples and averages them - reduces variance, parallelisable, robust (Random Forest). Boosting trains models sequentially, each correcting the errors of the current ensemble (fitting gradients of the loss) - reduces bias, usually more accurate but more sensitive to noise and hyperparameters, sequential (XGBoost, LightGBM)." },
            { q: 'How does gradient boosting work?', a: "Start with a constant prediction. At each round compute the negative gradient of the loss w.r.t. current predictions (pseudo-residuals), fit a small regression tree to them, set leaf values to minimise the loss, and add the tree scaled by a learning rate. Repeat for M rounds with early stopping." },
            { q: 'What makes XGBoost different from vanilla gradient boosting?', a: "Uses a second-order Taylor expansion (gradients and Hessians) to compute optimal leaf weights and split gains; adds explicit regularisation on number of leaves and leaf weights; sparsity-aware default directions for missing values; column/row subsampling; approximate/histogram split finding, cache-aware and parallel implementation." },
            { q: 'Gini vs entropy?', a: "Both measure node impurity and are maximal for uniform class mix; they usually give very similar trees. Gini is slightly faster (no log) and the sklearn default; entropy is tied to information gain and is slightly more sensitive to small probability changes." },
            { q: 'How do trees handle missing values?', a: "Classic CART uses surrogate splits; sklearn trees (1.3+) and XGBoost/LightGBM learn a default direction for missing values at each split by trying both sides and keeping the better gain. Otherwise impute (plus a missing indicator)." }
          ],
          code: String.raw`import numpy as np

def gini(y):
    _, c = np.unique(y, return_counts=True)
    p = c / c.sum()
    return 1 - np.sum(p ** 2)

def best_split_feature(x, y):
    """Best threshold on one feature for binary y using sorting + prefix sums: O(n log n)."""
    order = np.argsort(x); x, y = x[order], y[order]
    n = len(y)
    left_pos = np.cumsum(y)[:-1]                  # positives in left part, sizes 1..n-1
    left_n = np.arange(1, n)
    right_pos = y.sum() - left_pos
    right_n = n - left_n
    def g(pos, cnt):
        p = pos / cnt
        return 1 - p ** 2 - (1 - p) ** 2
    w_imp = (left_n * g(left_pos, left_n) + right_n * g(right_pos, right_n)) / n
    valid = x[1:] != x[:-1]                       # only split between distinct values
    if not valid.any():
        return None, np.inf
    i = np.argmin(np.where(valid, w_imp, np.inf))
    return (x[i] + x[i + 1]) / 2, w_imp[i]

class GBRegressor:            # gradient boosting with MSE, using sklearn trees as base learners
    def __init__(self, n=200, lr=0.1, depth=3):
        from sklearn.tree import DecisionTreeRegressor
        self.n, self.lr, self.mk = n, lr, lambda: DecisionTreeRegressor(max_depth=depth)
    def fit(self, X, y):
        self.f0 = y.mean(); F = np.full(len(y), self.f0); self.trees = []
        for _ in range(self.n):
            r = y - F                               # negative gradient of 1/2 (y-F)^2
            t = self.mk().fit(X, r)
            F += self.lr * t.predict(X); self.trees.append(t)
        return self
    def predict(self, X):
        return self.f0 + self.lr * sum(t.predict(X) for t in self.trees)`
        },
        {
          id: 'ml-svm-knn-nb',
          title: 'SVM, kNN, Naive Bayes',
          est: '3 days',
          why: 'Standard breadth questions ("what is the kernel trick", "why is Naive Bayes naive", "how does kNN scale") and quick from-scratch coding tasks (kNN, Gaussian NB).',
          learn: [
            "<b>SVM</b>: maximum-margin hyperplane; hard margin vs soft margin with hinge loss <code>max(0, 1 - y·f(x))</code> and C (small C = wider margin, more regularisation).",
            "Support vectors: only points on/inside the margin determine the boundary; primal vs dual formulation.",
            "<b>Kernel trick</b>: replace dot products with <code>K(x, x')</code> to get non-linear boundaries without explicit feature maps; linear, polynomial, RBF <code>exp(-γ||x - x'||<sup>2</sup>)</code>; γ controls locality.",
            "SVM practicalities: needs scaling, O(n<sup>2</sup>)-O(n<sup>3</sup>) training for kernels (does not scale to millions), no native probabilities (Platt scaling).",
            "<b>kNN</b>: lazy, non-parametric; choice of k (small k = high variance), distance metric (Euclidean, Manhattan, cosine), weighting by distance; requires scaling.",
            "kNN cost: O(1) train, O(nd) per query brute force; KD-tree/ball tree for low d; approximate nearest neighbours (HNSW, IVF, FAISS) for high-dim embeddings - the same machinery behind vector databases.",
            "<b>Naive Bayes</b>: <code>p(y|x) ∝ p(y) Π p(x<sub>j</sub>|y)</code> assuming conditional independence; Gaussian, Multinomial (word counts), Bernoulli variants; Laplace smoothing.",
            "Curse of dimensionality: distances concentrate in high dimensions, hurting kNN and RBF kernels."
          ],
          practice: [
            { t: 'StatQuest: Support Vector Machines Part 1 (and the kernel trick parts)', p: 'YT', d: 'E' },
            { t: 'StatQuest: Naive Bayes, Clearly Explained', p: 'YT', d: 'E' },
            { t: 'StatQuest: K-nearest neighbors, Clearly Explained', p: 'YT', d: 'E' },
            { t: 'Deep-ML: kNN / Naive Bayes / SVM (Pegasos kernel SVM) problems', p: 'DML', d: 'M' },
            { t: 'Implement kNN classifier fully vectorised (no Python loop over test points)', p: 'BUILD', d: 'E' },
            { t: 'Implement Multinomial Naive Bayes with Laplace smoothing for spam classification (log-space)', p: 'BUILD', d: 'M' },
            { t: 'Implement a linear SVM with hinge loss + L2 via sub-gradient descent', p: 'BUILD', d: 'M' },
            { t: 'Grid-search C and γ for an RBF SVM and plot the decision boundaries', p: 'BUILD', d: 'E' }
          ],
          notes: [
            "Soft-margin SVM objective: <code>min ½||w||<sup>2</sup> + C Σ max(0, 1 - y<sub>i</sub>(w<sup>T</sup>x<sub>i</sub> + b))</code> - this is L2-regularised hinge loss.",
            "Hinge vs log-loss: hinge is zero for confidently correct points (sparse support vectors), log-loss never exactly zero (all points contribute, gives probabilities).",
            "RBF γ large = very wiggly boundary (overfit), small = nearly linear.",
            "Naive Bayes works surprisingly well for text classification despite the wrong independence assumption - ranking is often right even when probabilities are badly calibrated (overconfident).",
            "Compute NB in log-space: <code>log p(y) + Σ log p(x<sub>j</sub>|y)</code> to avoid underflow.",
            "kNN with k=1 has zero training error; error rate is at most twice the Bayes error asymptotically (Cover-Hart)."
          ],
          cases: [
            "Not scaling features for SVM/kNN - large-range features dominate distances.",
            "Zero-frequency problem in Naive Bayes: unseen word gives probability 0 - use Laplace/additive smoothing.",
            "Trusting Naive Bayes or SVM scores as calibrated probabilities - calibrate first.",
            "Using exact kNN on 100M embeddings - use ANN indexes (HNSW/IVF-PQ) and accept recall trade-off.",
            "Even k in binary kNN causes ties - use odd k or distance weighting.",
            "Follow-up: 'When would you pick SVM over logistic regression?' - small/medium data, high-dimensional sparse features (text) or need a non-linear kernel; otherwise LR is faster and gives probabilities."
          ],
          qa: [
            { q: 'What is the kernel trick?', a: "Many algorithms (SVM, kernel ridge, PCA) only use inner products between samples. Replacing <code>x<sup>T</sup>x'</code> with a kernel <code>K(x, x') = φ(x)<sup>T</sup>φ(x')</code> computes inner products in a high (even infinite) dimensional feature space without constructing φ, giving non-linear decision boundaries at the cost of an n×n kernel matrix." },
            { q: 'Why is Naive Bayes called naive and why does it still work?', a: "It assumes features are conditionally independent given the class, which is rarely true. It still works because classification only needs the correct argmax, not accurate probabilities; it has low variance, trains in one pass, and handles high-dimensional sparse data (text) well." },
            { q: 'How does k affect kNN?', a: "Small k gives flexible, noisy boundaries (low bias, high variance); large k smooths the boundary (higher bias, lower variance), and k = n predicts the majority class. Choose k by cross-validation, usually odd for binary problems." },
            { q: 'What is the role of C in SVM?', a: "C trades off margin width against training violations. Large C penalises misclassification heavily - narrow margin, fits training data closely (risk of overfitting). Small C allows more violations - wider margin, more regularisation." }
          ],
          code: String.raw`import numpy as np

def knn_predict(Xtr, ytr, Xte, k=5):
    d2 = (Xte ** 2).sum(1)[:, None] + (Xtr ** 2).sum(1)[None, :] - 2 * Xte @ Xtr.T
    nn = np.argpartition(d2, k, axis=1)[:, :k]          # (m, k)
    votes = ytr[nn]
    return np.array([np.bincount(v).argmax() for v in votes])

class MultinomialNB:
    def fit(self, X, y, alpha=1.0):                      # X: (n, V) counts
        self.classes = np.unique(y)
        self.log_prior = np.log(np.array([(y == c).mean() for c in self.classes]))
        counts = np.array([X[y == c].sum(0) for c in self.classes]) + alpha
        self.log_lik = np.log(counts / counts.sum(1, keepdims=True))
        return self
    def predict(self, X):
        return self.classes[np.argmax(X @ self.log_lik.T + self.log_prior, axis=1)]

def linear_svm(X, y, C=1.0, lr=1e-3, epochs=500):        # y in {-1, +1}
    w, b = np.zeros(X.shape[1]), 0.0
    for _ in range(epochs):
        m = y * (X @ w + b)
        viol = m < 1
        gw = w - C * (y[viol, None] * X[viol]).sum(0)
        gb = -C * y[viol].sum()
        w -= lr * gw; b -= lr * gb
    return w, b`
        },
        {
          id: 'ml-unsupervised',
          title: 'Unsupervised learning: clustering & dimensionality reduction',
          est: '4 days',
          why: 'k-means from scratch is a top-3 ML coding question; PCA and clustering appear in case rounds (customer segmentation, embedding analysis, anomaly detection).',
          learn: [
            "<b>k-means</b> (Lloyd's algorithm): assign to nearest centroid, recompute means, repeat; minimises within-cluster sum of squares (inertia); converges to a local optimum; O(n k d) per iteration.",
            "k-means++ initialisation, choosing k (elbow, silhouette score, gap statistic, business constraints); assumes spherical, similar-size clusters; sensitive to scaling and outliers. Mini-batch k-means for scale.",
            "<b>Hierarchical clustering</b>: agglomerative with linkage (single, complete, average, Ward); dendrograms; O(n<sup>2</sup>) memory.",
            "<b>DBSCAN</b>: density-based with eps and min_samples; core, border, noise points; finds arbitrary shapes and outliers, no k needed; struggles with varying densities (HDBSCAN fixes).",
            "<b>GMM + EM</b>: soft assignments; E-step computes responsibilities, M-step updates means/covariances/weights; k-means is the hard-assignment, equal-spherical-covariance limit. Choose components with BIC/AIC.",
            "<b>PCA</b>: orthogonal directions of maximum variance via eigenvectors of the covariance (or SVD); explained variance ratio; standardise first; linear only.",
            "<b>t-SNE</b> and <b>UMAP</b>: non-linear embeddings for visualisation; preserve local neighbourhoods; t-SNE distances between clusters and cluster sizes are not meaningful; perplexity / n_neighbors hyperparameters.",
            "Anomaly detection basics: Isolation Forest, one-class SVM, reconstruction error (autoencoders/PCA), density-based scores."
          ],
          practice: [
            { t: 'StatQuest: K-means clustering', p: 'YT', d: 'E' },
            { t: 'StatQuest: Principal Component Analysis (PCA), Step-by-Step', p: 'YT', d: 'E' },
            { t: 'StatQuest: t-SNE, Clearly Explained', p: 'YT', d: 'E' },
            { t: 'StatQuest: Clustering with DBSCAN, Clearly Explained', p: 'YT', d: 'E' },
            { t: 'Deep-ML: K-Means Clustering', p: 'DML', d: 'M' },
            { t: 'Deep-ML: Principal Component Analysis (PCA) Implementation', p: 'DML', d: 'M' },
            { t: 'Implement k-means with k-means++ init, empty-cluster handling and convergence check', p: 'BUILD', d: 'M' },
            { t: 'Implement EM for a 1-D (then d-D) Gaussian mixture', p: 'BUILD', d: 'H' },
            { t: 'Cluster sentence embeddings, visualise with UMAP, label clusters with top terms', p: 'BUILD', d: 'M' },
            { t: 'Implement DBSCAN with a neighbour query (brute force)', p: 'BUILD', d: 'H' }
          ],
          notes: [
            "k-means objective: <code>Σ<sub>i</sub> ||x<sub>i</sub> - μ<sub>c(i)</sub>||<sup>2</sup></code>; each step never increases it, so it converges (to a local minimum) - run several inits (n_init).",
            "Silhouette for a point: <code>(b - a)/max(a, b)</code>, a = mean intra-cluster distance, b = mean distance to nearest other cluster; ranges -1 to 1.",
            "PCA for preprocessing: decorrelates and compresses features; keep components explaining ~90-95% variance; check if it helps the downstream metric.",
            "GMM gives probabilities and handles elliptical clusters; k-means is faster and simpler.",
            "DBSCAN eps choice: k-distance plot (distance to the min_samples-th neighbour, look for the knee).",
            "Use t-SNE/UMAP for visualisation, not as features for distance-based downstream tasks (UMAP is somewhat better at global structure)."
          ],
          cases: [
            "Not scaling before k-means/PCA - dominated by large-range features.",
            "k-means on non-convex shapes (moons, rings) fails - use DBSCAN/spectral clustering.",
            "Empty cluster during k-means iterations - reinitialise that centroid (e.g. to the farthest point).",
            "Reading cluster distances/sizes from t-SNE plots as meaningful.",
            "PCA on categorical one-hot data or with outliers can mislead - consider MCA or robust PCA.",
            "Follow-up: 'How do you evaluate clustering without labels?' - silhouette, Davies-Bouldin, stability across seeds/subsamples, and most importantly business usefulness/interpretability."
          ],
          qa: [
            { q: 'Explain the k-means algorithm and its limitations.', a: "Initialise k centroids (k-means++), assign each point to its nearest centroid, recompute centroids as cluster means, repeat until assignments stop changing. Limitations: need to choose k, local optima (use multiple inits), assumes spherical equal-variance clusters, sensitive to scale and outliers, only Euclidean geometry." },
            { q: 'How does PCA work?', a: "Centre (and usually standardise) the data, compute the covariance matrix or SVD, take eigenvectors with the largest eigenvalues as principal components - orthogonal directions of maximum variance - and project the data onto the top k. Eigenvalues give the variance explained by each component." },
            { q: 'k-means vs GMM?', a: "k-means makes hard assignments with spherical clusters and minimises squared distances. GMM is a probabilistic model fitted with EM: soft assignments (responsibilities), full covariances (elliptical clusters), cluster weights, and a likelihood usable for model selection (BIC) and density estimation. k-means is the limit of GMM with equal spherical covariances going to zero." },
            { q: 'When would you use DBSCAN?', a: "When clusters have arbitrary shapes, the number of clusters is unknown and you need explicit noise/outlier labels - e.g. geospatial points. Avoid when densities vary a lot or in very high dimensions where distances concentrate." }
          ],
          code: String.raw`import numpy as np

def kmeans(X, k, iters=100, tol=1e-6, rng=np.random.default_rng(0)):
    # k-means++ init
    C = [X[rng.integers(len(X))]]
    for _ in range(1, k):
        d2 = np.min(((X[:, None] - np.array(C)[None]) ** 2).sum(-1), axis=1)
        C.append(X[rng.choice(len(X), p=d2 / d2.sum())])
    C = np.array(C)
    for _ in range(iters):
        D = ((X[:, None, :] - C[None, :, :]) ** 2).sum(-1)    # (n, k)
        labels = D.argmin(1)
        newC = np.array([X[labels == j].mean(0) if np.any(labels == j)
                         else X[D.min(1).argmax()]            # re-seed empty cluster
                         for j in range(k)])
        if np.linalg.norm(newC - C) < tol:
            break
        C = newC
    inertia = ((X - C[labels]) ** 2).sum()
    return labels, C, inertia

def pca(X, k):
    Xc = (X - X.mean(0)) / X.std(0)
    cov = Xc.T @ Xc / (len(X) - 1)
    vals, vecs = np.linalg.eigh(cov)                          # ascending
    idx = np.argsort(vals)[::-1][:k]
    return Xc @ vecs[:, idx], vals[idx] / vals.sum()`
        },
        {
          id: 'ml-metrics',
          title: 'Evaluation metrics',
          est: '3-4 days',
          why: 'Every case round asks "which metric and why"; ROC-AUC vs PR-AUC for imbalance and precision-recall trade-offs are near-certain questions; computing AUC from scratch is a common coding task.',
          learn: [
            "Confusion matrix: TP, FP, TN, FN; <b>precision</b> <code>TP/(TP+FP)</code>, <b>recall</b> (TPR, sensitivity) <code>TP/(TP+FN)</code>, specificity <code>TN/(TN+FP)</code>, FPR <code>FP/(FP+TN)</code>.",
            "<b>F1</b> = harmonic mean <code>2PR/(P+R)</code>; F-beta (β > 1 weights recall); macro vs micro vs weighted averaging for multiclass.",
            "Threshold-free metrics: <b>ROC-AUC</b> (TPR vs FPR; = probability a random positive is scored above a random negative) vs <b>PR-AUC</b> / average precision (precision vs recall; baseline = positive rate).",
            "Log-loss and Brier score (proper scoring rules); <b>calibration</b>: reliability diagrams, expected calibration error, Platt scaling, isotonic regression, temperature scaling.",
            "Regression metrics: MSE/RMSE (penalises large errors), MAE (robust, median-optimal), MAPE/sMAPE (scale-free but unstable near 0), R<sup>2</sup>, Huber, quantile (pinball) loss.",
            "Ranking metrics: Precision@k, Recall@k, MRR, <b>MAP</b>, <b>NDCG@k</b> (<code>DCG = Σ (2<sup>rel</sup> - 1)/log<sub>2</sub>(i+1)</code>, normalised by ideal DCG), hit rate.",
            "Choosing a metric for <b>imbalance</b>: avoid accuracy; prefer PR-AUC, recall at fixed precision (or vice versa), F-beta, cost-weighted metrics tied to business cost of FP vs FN.",
            "Threshold selection: maximise F1 / expected profit on validation; operating points; offline metrics vs online business metrics (CTR, revenue, retention)."
          ],
          practice: [
            { t: 'StatQuest: ROC and AUC, Clearly Explained', p: 'YT', d: 'E' },
            { t: 'StatQuest: The Confusion Matrix / Sensitivity and Specificity', p: 'YT', d: 'E' },
            { t: 'Deep-ML: Calculate F1 Score / Precision / Recall / confusion matrix problems', p: 'DML', d: 'E' },
            { t: 'Deep-ML: ROC AUC or other evaluation metric problems', p: 'DML', d: 'M' },
            { t: 'Implement ROC-AUC in O(n log n) via ranks (Mann-Whitney) and verify with sklearn', p: 'BUILD', d: 'M' },
            { t: 'Implement precision@k, average precision, MAP and NDCG@k for a batch of queries', p: 'BUILD', d: 'M' },
            { t: 'Credit Card Fraud dataset: compare ROC-AUC vs PR-AUC, pick a threshold by cost', p: 'KG', d: 'M', u: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud' },
            { t: 'Plot a reliability diagram for XGBoost; calibrate with isotonic and Platt; compare Brier score', p: 'BUILD', d: 'M' },
            { t: 'scikit-learn docs - Metrics and scoring', p: 'DOC', d: 'E', u: 'https://scikit-learn.org/stable/modules/model_evaluation.html' }
          ],
          notes: [
            "With 1% positives, a model predicting all negatives has 99% accuracy - accuracy is meaningless under imbalance.",
            "ROC-AUC is insensitive to class ratio, so it can look great (0.95) while precision at useful recall is poor; PR-AUC exposes this - use PR-AUC when positives are rare and you care about them.",
            "Precision answers 'of flagged, how many are right' (cost of false alarms); recall answers 'of all positives, how many did we catch' (cost of misses). Cancer screening: recall; spam to inbox filter: precision.",
            "AUC = <code>(R<sub>pos</sub> - n<sub>pos</sub>(n<sub>pos</sub>+1)/2) / (n<sub>pos</sub> · n<sub>neg</sub>)</code>, R<sub>pos</sub> = sum of ranks of positives (ties get average rank).",
            "RMSE ≥ MAE always; a big gap means a few large errors. MSE is optimised by the mean, MAE by the median.",
            "NDCG handles graded relevance and position discount; MAP assumes binary relevance; MRR only cares about the first relevant item (good for QA/search 'first answer').",
            "Calibration matters whenever scores are used as probabilities: bidding (pCTR x bid), risk thresholds, combining models, expected-value decisions.",
            "Macro-averaging treats classes equally (highlights minority performance); micro-averaging is dominated by frequent classes (equals accuracy for single-label multiclass)."
          ],
          cases: [
            "Reporting accuracy on imbalanced fraud data.",
            "Calibrating on the training set - calibrate on held-out data.",
            "Oversampling changes the base rate, so predicted probabilities are miscalibrated - correct or recalibrate.",
            "MAPE explodes when actuals are near zero and is asymmetric (penalises over-forecasts more).",
            "Comparing AUCs across test sets with different positive rates for PR-AUC - its baseline differs.",
            "Choosing threshold 0.5 by default - choose based on business costs and validation curves.",
            "Follow-up: 'Model A has higher AUC but lower precision at our operating point - which do you ship?' - the one better at the operating point that matters to the business."
          ],
          qa: [
            { q: 'ROC-AUC vs PR-AUC - when to use which?', a: "ROC-AUC measures ranking quality across all thresholds using TPR and FPR; it is insensitive to class imbalance and can look optimistic when negatives vastly outnumber positives. PR-AUC (average precision) focuses on the positive class and reflects the cost of false positives among predicted positives; prefer it for rare-event problems (fraud, anomaly, retrieval)." },
            { q: 'Precision vs recall - give examples where each matters more.', a: "Precision matters when false positives are costly: blocking legitimate transactions, spam filtering important mail, recommending irrelevant items. Recall matters when misses are costly: cancer screening, fraud where losses are large, safety content moderation. F-beta or a cost function formalises the trade-off." },
            { q: 'What does an AUC of 0.8 mean?', a: "If you pick a random positive and a random negative, the model scores the positive higher 80% of the time. 0.5 is random ranking; it says nothing about calibration or performance at a specific threshold." },
            { q: 'How do you compute NDCG@k?', a: "For the top-k ranked items compute <code>DCG@k = Σ<sub>i=1..k</sub> (2<sup>rel<sub>i</sub></sup> - 1)/log<sub>2</sub>(i + 1)</code>, compute IDCG@k for the ideal ordering of the same items, and NDCG = DCG/IDCG (0 to 1). Average across queries; define NDCG = 0 when there are no relevant items (or exclude them, consistently)." },
            { q: 'What is model calibration and how do you fix it?', a: "A model is calibrated if among items scored 0.7, about 70% are positive. Check with a reliability diagram / ECE / Brier score. Fix with post-hoc calibration on a held-out set: Platt scaling (logistic on scores), isotonic regression (non-parametric, needs more data), or temperature scaling for neural nets." }
          ],
          code: String.raw`import numpy as np
from scipy.stats import rankdata

def prf(y, yhat):
    tp = np.sum((y == 1) & (yhat == 1)); fp = np.sum((y == 0) & (yhat == 1))
    fn = np.sum((y == 1) & (yhat == 0))
    p = tp / (tp + fp) if tp + fp else 0.0
    r = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * p * r / (p + r) if p + r else 0.0
    return p, r, f1

def roc_auc(y, s):
    r = rankdata(s)                          # average ranks for ties
    npos = y.sum(); nneg = len(y) - npos
    return (r[y == 1].sum() - npos * (npos + 1) / 2) / (npos * nneg)

def average_precision(y, s):
    order = np.argsort(-s); y = y[order]
    hits = np.cumsum(y)
    prec_at_i = hits / np.arange(1, len(y) + 1)
    return (prec_at_i * y).sum() / max(y.sum(), 1)

def ndcg_at_k(rels_in_ranked_order, k):
    rel = np.asarray(rels_in_ranked_order, float)
    disc = 1 / np.log2(np.arange(2, k + 2))
    dcg = ((2 ** rel[:k] - 1) * disc[:len(rel[:k])]).sum()
    ideal = np.sort(rel)[::-1][:k]
    idcg = ((2 ** ideal - 1) * disc[:len(ideal)]).sum()
    return dcg / idcg if idcg > 0 else 0.0`
        }
      ]
    },
    {
      name: 'Advanced · Practice of ML',
      desc: 'Data issues, optimisation, recommenders, time series, from-scratch coding and explainability - the material of case rounds and ML coding rounds.',
      topics: [
        {
          id: 'ml-features',
          title: 'Feature engineering & data issues',
          est: '4 days',
          why: 'Case rounds spend most time on data: missing values, categorical encoding, imbalance and leakage. Real-world signal of seniority.',
          learn: [
            "Missing values: understand mechanism (MCAR, MAR, MNAR); drop, mean/median/mode impute, model-based (KNN, iterative) imputation; add missing-indicator features; trees can handle natively.",
            "Categorical encoding: one-hot (low cardinality), ordinal, <b>target/mean encoding</b> (with out-of-fold + smoothing to avoid leakage), frequency/count encoding, hashing trick, learned embeddings for high cardinality.",
            "Scaling: standardisation (z-score), min-max, robust scaler (median/IQR), log/Box-Cox/Yeo-Johnson for skew; which models need it (linear, SVM, kNN, NN, PCA) and which do not (trees).",
            "Numeric features: binning, interactions, ratios, polynomial, date/time decomposition (hour, weekday, cyclical sin/cos), aggregations (user-level counts, recency/frequency/monetary).",
            "Text and embeddings as features: TF-IDF, pretrained sentence embeddings; images via pretrained CNN/ViT features.",
            "<b>Class imbalance</b>: class weights / cost-sensitive loss, undersampling, oversampling, <b>SMOTE</b> (interpolates minority neighbours), focal loss, threshold tuning, appropriate metrics; resample only the training fold.",
            "Outliers: detection (IQR, z-score, isolation forest), capping/winsorising, robust losses (Huber).",
            "Feature selection: filter (correlation, mutual information), wrapper (RFE), embedded (L1, tree importance); remove leaky and unstable features.",
            "Train-serving skew and feature stores: same transformation code offline and online, point-in-time correct joins for historical features."
          ],
          practice: [
            { t: 'Kaggle Learn - Feature Engineering course', p: 'KG', d: 'E', u: 'https://www.kaggle.com/learn/feature-engineering' },
            { t: 'House Prices - feature engineering (skew, missing, encoding) to beat a baseline', p: 'KG', d: 'M', u: 'https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques' },
            { t: 'Spaceship Titanic - engineer group/cabin features from IDs and strings', p: 'KG', d: 'M', u: 'https://www.kaggle.com/competitions/spaceship-titanic' },
            { t: 'Implement out-of-fold target encoding with smoothing and compare vs naive target encoding (leak!)', p: 'BUILD', d: 'M' },
            { t: 'Build a scikit-learn ColumnTransformer pipeline (impute + scale + one-hot) inside CV', p: 'BUILD', d: 'E' },
            { t: 'Imbalance experiment: class_weight vs undersampling vs SMOTE (imblearn pipeline) vs threshold tuning on PR-AUC', p: 'BUILD', d: 'M' },
            { t: 'Implement SMOTE from scratch with kNN interpolation', p: 'BUILD', d: 'M' },
            { t: 'Case practice: list 30 candidate features for a food-delivery ETA model, mark which are leaky', p: 'BUILD', d: 'M' }
          ],
          notes: [
            "Smoothed target encoding: <code>enc = (n·mean<sub>cat</sub> + m·mean<sub>global</sub>)/(n + m)</code>, computed out-of-fold on training data, applied to val/test with full-train statistics.",
            "SMOTE: for a minority sample pick one of its k minority neighbours and create <code>x + u·(x<sub>nn</sub> - x)</code>, u ~ U(0,1). Works poorly with high-dimensional or categorical data; often class weights + threshold tuning are just as good.",
            "Cyclical encoding for hour: <code>sin(2π h/24), cos(2π h/24)</code> so 23:00 and 00:00 are close.",
            "Fit every transformation on training data only (inside the Pipeline) - scalers, imputers, encoders, PCA, feature selection.",
            "Log-transform skewed targets (prices) and invert predictions (beware: exp of mean log is the geometric mean - bias correction if needed).",
            "Missing indicator often carries signal (e.g. 'income not provided' correlates with default).",
            "Point-in-time correctness: a feature like 'user's 30-day spend' must be computed as of the prediction timestamp, not as of today."
          ],
          cases: [
            "Target-encoding on the full dataset before CV - severe leakage, especially for rare categories.",
            "Applying SMOTE before the train/test split, or evaluating on the resampled distribution.",
            "One-hot encoding unseen categories at inference - use <code>handle_unknown='ignore'</code> or an 'other' bucket.",
            "Mean imputation on time series using future data.",
            "Features available in historical data but not at serving time (e.g. delivered_at for ETA).",
            "Follow-up: 'You have 10,000 categories in a feature - how do you encode it?' - target encoding (OOF + smoothing), frequency encoding, hashing, embeddings, group rare levels into 'other'.",
            "Follow-up: '0.1% positive rate - what do you do?' - more positives/labels, PR-AUC, class weights or focal loss, negative downsampling with probability correction, threshold by business cost, anomaly detection framing."
          ],
          qa: [
            { q: 'How do you handle missing data?', a: "First understand why it is missing (MCAR/MAR/MNAR) and how much. Options: drop rows/columns if small or useless; simple imputation (median, mode) fitted on train; model-based imputation; add a missing-indicator feature; or use models that handle missing natively (XGBoost/LightGBM). Validate the choice by CV, and keep the same logic at serving time." },
            { q: 'How do you handle class imbalance?', a: "Use the right metric (PR-AUC, recall at precision, cost) and stratified splits; then try class weights / cost-sensitive loss, resampling (undersample majority, oversample/SMOTE minority) applied only to training folds, focal loss for neural nets, and tune the decision threshold on validation. If you downsample negatives, recalibrate probabilities." },
            { q: 'What is target encoding and its risk?', a: "Replacing a category with the mean target for that category. Risk: target leakage and overfitting, especially for rare categories - the encoding contains the row's own label. Mitigate with out-of-fold computation, smoothing toward the global mean, and noise." },
            { q: 'Which models need feature scaling?', a: "Gradient-descent-based and distance/margin-based models: linear/logistic regression with regularisation, SVM, kNN, k-means, PCA, neural networks. Tree-based models (decision trees, RF, gradient boosting) are invariant to monotonic scaling." }
          ],
          code: String.raw`import numpy as np, pandas as pd
from sklearn.model_selection import KFold

def oof_target_encode(train, test, col, target, m=20, n_splits=5, seed=0):
    g = train[target].mean()
    tr_enc = pd.Series(np.nan, index=train.index)
    for tr_idx, va_idx in KFold(n_splits, shuffle=True, random_state=seed).split(train):
        stats = train.iloc[tr_idx].groupby(col)[target].agg(['mean', 'count'])
        smooth = (stats['count'] * stats['mean'] + m * g) / (stats['count'] + m)
        tr_enc.iloc[va_idx] = train.iloc[va_idx][col].map(smooth).fillna(g).values
    stats = train.groupby(col)[target].agg(['mean', 'count'])
    smooth = (stats['count'] * stats['mean'] + m * g) / (stats['count'] + m)
    return tr_enc, test[col].map(smooth).fillna(g)

def smote(X_min, n_new, k=5, rng=np.random.default_rng(0)):
    d2 = ((X_min[:, None] - X_min[None]) ** 2).sum(-1)
    np.fill_diagonal(d2, np.inf)
    nn = np.argsort(d2, 1)[:, :k]
    i = rng.integers(len(X_min), size=n_new)
    j = nn[i, rng.integers(k, size=n_new)]
    u = rng.random((n_new, 1))
    return X_min[i] + u * (X_min[j] - X_min[i])

# sklearn pipeline keeps preprocessing inside CV:
# from sklearn.compose import ColumnTransformer; from sklearn.pipeline import make_pipeline
# pre = ColumnTransformer([('num', make_pipeline(SimpleImputer(strategy='median'), StandardScaler()), num_cols),
#                          ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)])
# model = make_pipeline(pre, LogisticRegression(class_weight='balanced'))`
        },
        {
          id: 'ml-optim',
          title: 'Optimisation: SGD, momentum, Adam, learning-rate schedules',
          est: '2-3 days',
          why: '"Explain Adam", "why does my loss diverge / plateau", "batch size vs learning rate" - common in ML and deep-learning rounds, and crucial for fine-tuning LLMs.',
          learn: [
            "Gradient descent update <code>w ← w - η∇L(w)</code>; batch vs mini-batch vs stochastic; noise of SGD as implicit regularisation.",
            "Learning rate effects: too high diverges/oscillates, too low is slow or stuck; LR range test.",
            "<b>Momentum</b>: <code>v ← βv + ∇L; w ← w - ηv</code> - accelerates along consistent directions, dampens oscillation; Nesterov look-ahead.",
            "Adaptive methods: AdaGrad (accumulates squared grads - LR decays to zero), RMSProp (EMA of squared grads), <b>Adam</b> (momentum + RMSProp + bias correction), <b>AdamW</b> (decoupled weight decay - default for transformers).",
            "Learning rate schedules: step decay, exponential, cosine annealing, <b>linear warmup</b> + cosine/linear decay (standard for transformers), one-cycle, reduce-on-plateau.",
            "Convergence: convex vs non-convex, local minima vs saddle points in high dimensions, conditioning and feature scaling, gradient clipping for exploding gradients.",
            "Second-order ideas: Newton's method (Hessian), why it is impractical at scale; L-BFGS for small/medium convex problems (sklearn logistic regression default solver lbfgs).",
            "Batch size trade-offs: larger batch = less noisy gradients, better hardware utilisation, may need higher LR (linear scaling rule) and warmup; gradient accumulation to simulate large batches.",
            "Early stopping, checkpointing, mixed precision (loss scaling) as practical training controls."
          ],
          practice: [
            { t: 'Deep-ML: Implement gradient descent variants (batch / SGD / mini-batch)', p: 'DML', d: 'M' },
            { t: 'Deep-ML: Adam optimizer implementation', p: 'DML', d: 'M' },
            { t: 'StatQuest: Gradient Descent, Step-by-Step', p: 'YT', d: 'E' },
            { t: 'StatQuest: Stochastic Gradient Descent, Clearly Explained', p: 'YT', d: 'E' },
            { t: 'Implement SGD, momentum, RMSProp and Adam on the Rosenbrock function; plot trajectories', p: 'BUILD', d: 'M' },
            { t: 'Implement warmup + cosine decay schedule and plot LR vs step', p: 'BUILD', d: 'E' },
            { t: 'Show effect of feature scaling on GD convergence speed for linear regression', p: 'BUILD', d: 'E' },
            { t: 'Read: Adam paper (Kingma & Ba) and AdamW (Loshchilov & Hutter) - summarise in 5 lines each', p: 'BOOK', d: 'M' }
          ],
          notes: [
            "Adam: <code>m = β<sub>1</sub>m + (1-β<sub>1</sub>)g</code>, <code>v = β<sub>2</sub>v + (1-β<sub>2</sub>)g<sup>2</sup></code>, <code>m̂ = m/(1-β<sub>1</sub><sup>t</sup>)</code>, <code>v̂ = v/(1-β<sub>2</sub><sup>t</sup>)</code>, <code>w -= η m̂/(√v̂ + ε)</code>; defaults β<sub>1</sub>=0.9, β<sub>2</sub>=0.999, ε=1e-8.",
            "Bias correction matters early: m and v start at 0 so raw estimates are biased toward 0.",
            "L2 regularisation inside Adam is not equivalent to weight decay (the penalty gradient gets rescaled by the adaptive denominator); AdamW applies decay directly to weights.",
            "Warmup stabilises early training when Adam's second-moment estimates are noisy and weights are random (important for transformers / large LR).",
            "Debug recipe: loss NaN - lower LR, gradient clipping, check data/labels, mixed-precision overflow; loss flat - LR too low, dead activations, bug in labels/shuffling; train ok but val bad - overfitting.",
            "SGD + momentum often generalises slightly better than Adam in vision CNNs; Adam/AdamW is the default for transformers and fast convergence."
          ],
          cases: [
            "Forgetting to zero gradients between steps (PyTorch) - gradients accumulate.",
            "Not shuffling data each epoch - SGD sees correlated batches (all one class) and oscillates.",
            "Using the same LR when increasing batch size 8x - under-trains; scale LR and add warmup.",
            "Applying weight decay to biases and LayerNorm parameters - usually excluded.",
            "Follow-up: 'Why not use Newton's method for neural nets?' - Hessian is p×p (billions of params), O(p<sup>3</sup>) inversion, and non-convexity makes it head to saddle points.",
            "Follow-up: 'Training loss decreasing but extremely slowly - what do you try?' - LR range test, normalise inputs, better init, batch norm/layer norm, Adam, check gradient magnitudes."
          ],
          qa: [
            { q: 'Explain Adam.', a: "Adam keeps exponential moving averages of the gradient (first moment, like momentum) and of the squared gradient (second moment, like RMSProp), bias-corrects both, and updates each parameter by <code>η m̂/(√v̂ + ε)</code>. This gives momentum plus per-parameter adaptive step sizes, making it robust to scaling and sparse gradients. AdamW decouples weight decay from the adaptive update." },
            { q: 'Why does momentum help?', a: "It accumulates a velocity from past gradients, so consistent directions speed up while oscillating components (across narrow ravines) cancel out. This improves convergence in ill-conditioned landscapes and helps pass through flat regions and shallow local minima." },
            { q: 'What is a learning rate warmup and why use it?', a: "Starting with a small LR and increasing it linearly over the first few hundred/thousand steps before the main schedule. Early gradients and adaptive statistics are unreliable and large updates on random weights can destabilise training (especially transformers with Adam); warmup avoids early divergence and allows a higher peak LR." },
            { q: 'Batch GD vs SGD vs mini-batch?', a: "Batch uses all data per step: exact gradient, expensive, smooth. SGD uses one example: cheap, very noisy, can escape shallow minima. Mini-batch (32-4096) balances gradient noise and hardware efficiency (vectorisation/GPU) and is the standard." }
          ],
          code: String.raw`import numpy as np

class Adam:
    def __init__(self, params, lr=1e-3, b1=0.9, b2=0.999, eps=1e-8, wd=0.0):
        self.p, self.lr, self.b1, self.b2, self.eps, self.wd = params, lr, b1, b2, eps, wd
        self.m = [np.zeros_like(x) for x in params]
        self.v = [np.zeros_like(x) for x in params]
        self.t = 0
    def step(self, grads):
        self.t += 1
        for i, (w, g) in enumerate(zip(self.p, grads)):
            self.m[i] = self.b1 * self.m[i] + (1 - self.b1) * g
            self.v[i] = self.b2 * self.v[i] + (1 - self.b2) * g * g
            mh = self.m[i] / (1 - self.b1 ** self.t)
            vh = self.v[i] / (1 - self.b2 ** self.t)
            w -= self.lr * (mh / (np.sqrt(vh) + self.eps) + self.wd * w)   # AdamW-style decay

def sgd_momentum(w, g, v, lr=0.01, beta=0.9):
    v = beta * v + g
    return w - lr * v, v

def warmup_cosine(step, total, warmup, peak_lr, min_lr=0.0):
    if step < warmup:
        return peak_lr * (step + 1) / warmup
    prog = (step - warmup) / max(1, total - warmup)
    return min_lr + 0.5 * (peak_lr - min_lr) * (1 + np.cos(np.pi * prog))`
        },
        {
          id: 'ml-recsys',
          title: 'Recommendation systems',
          est: '4 days',
          why: 'The most common ML case-study domain at product companies (e-commerce, food delivery, OTT, social feeds); two-tower retrieval also underpins RAG retrieval.',
          learn: [
            "Problem framing: explicit (ratings) vs implicit feedback (clicks, watch time, purchases); objectives (CTR, conversion, watch time, diversity, long-term retention).",
            "Content-based filtering (item features / embeddings similarity) vs <b>collaborative filtering</b> (user-user, item-item similarity on the interaction matrix).",
            "<b>Matrix factorisation</b>: <code>r̂<sub>ui</sub> = p<sub>u</sub><sup>T</sup>q<sub>i</sub> + b<sub>u</sub> + b<sub>i</sub> + μ</code>, optimised with SGD or ALS; regularisation; implicit-feedback MF (weighted ALS, BPR pairwise loss).",
            "<b>Two-tower models</b>: separate user and item encoders producing embeddings, trained with in-batch negatives / sampled softmax; item embeddings indexed in an ANN index (FAISS, ScaNN, HNSW) for retrieval.",
            "<b>Multi-stage architecture</b>: candidate generation (thousands from millions: two-tower, item-item, popularity, co-visitation) -> ranking (hundreds: GBDT or deep models like Wide&Deep, DCN, DLRM with rich features) -> re-ranking (diversity, freshness, business rules).",
            "Cold start: new users (popularity, onboarding questions, context features) and new items (content features, exploration / bandits).",
            "Evaluation: offline (Recall@k, NDCG@k, MAP, hit rate, coverage, novelty) with time-based splits; online A/B tests (CTR, conversion, dwell); position bias and feedback loops.",
            "Negative sampling, popularity bias correction (logQ correction for sampled softmax), exploration vs exploitation (epsilon-greedy, Thompson sampling).",
            "Sequence-aware recommenders (GRU4Rec, SASRec / transformer-based) and LLM-based recommenders - at least name them."
          ],
          practice: [
            { t: 'Google ML - Recommendation Systems course', p: 'DOC', d: 'E', u: 'https://developers.google.com/machine-learning/recommendation' },
            { t: 'MovieLens dataset - build item-item CF and MF baselines', p: 'BUILD', d: 'M', u: 'https://grouplens.org/datasets/movielens/' },
            { t: 'Implement matrix factorisation with biases via SGD in NumPy; report RMSE on a time split', p: 'BUILD', d: 'M' },
            { t: 'Implement BPR loss for implicit feedback and evaluate Recall@10', p: 'BUILD', d: 'H' },
            { t: 'Train a small two-tower model (PyTorch) with in-batch negatives; index items in FAISS', p: 'BUILD', d: 'H' },
            { t: 'Case practice: design "people you may know" / "restaurants for you" end-to-end in 45 minutes', p: 'BUILD', d: 'H' },
            { t: 'Deep-ML: recommendation / similarity related problems (e.g. cosine similarity)', p: 'DML', d: 'E' },
            { t: 'H&M Personalized Fashion Recommendations (study top solutions: candidate gen + ranking)', p: 'KG', d: 'H', u: 'https://www.kaggle.com/competitions/h-and-m-personalized-fashion-recommendations' }
          ],
          notes: [
            "MF SGD update with error <code>e = r - r̂</code>: <code>p<sub>u</sub> += η(e·q<sub>i</sub> - λp<sub>u</sub>)</code>, <code>q<sub>i</sub> += η(e·p<sub>u</sub> - λq<sub>i</sub>)</code>.",
            "ALS alternates closed-form ridge solves for users and items - parallelisable, good for implicit feedback at scale (Spark).",
            "BPR: maximise <code>log σ(r̂<sub>ui</sub> - r̂<sub>uj</sub>)</code> for observed i and unobserved j - optimises ranking directly.",
            "Two-tower cannot use user-item cross features (scores are a dot product) - that is why a heavier ranker follows retrieval.",
            "Missing interactions in implicit data are not negatives - they are unknown; sample negatives carefully (hard negatives help, false negatives hurt).",
            "Offline-online gap is large in recsys: offline metrics on logged data are biased by what the old system showed; use A/B tests and counterfactual methods (IPS).",
            "Business-aware re-ranking: diversity (MMR), freshness, fairness to sellers/creators, de-duplication."
          ],
          cases: [
            "Random train/test split of interactions leaks future behaviour - use time-based splits.",
            "Optimising pure CTR leads to clickbait; combine with dwell time, satisfaction, long-term retention.",
            "Feedback loop: the model only learns from items it showed - add exploration.",
            "Popularity bias: model recommends the same top items to everyone; measure coverage and use logQ correction.",
            "Ignoring latency: ranking 10M items with a heavy model per request is impossible - multi-stage pipeline.",
            "Follow-up: 'How do you handle a new item with no interactions?' - content-based embedding from the item tower using metadata/text/image, exploration slots, bandits.",
            "Follow-up: 'How would you evaluate the recommender before A/B testing?' - offline Recall/NDCG on a time split, replay/IPS estimates, shadow deployment, sanity checks on coverage and diversity."
          ],
          qa: [
            { q: 'Explain collaborative filtering vs content-based filtering.', a: "Collaborative filtering uses only the user-item interaction matrix - users who behaved similarly like similar items (user-user, item-item, matrix factorisation); it captures taste but suffers from cold start and sparsity. Content-based uses item (and user) features to recommend items similar to what the user liked; it handles new items but is limited to feature similarity. Production systems combine both." },
            { q: 'How does matrix factorisation work for recommendations?', a: "Represent each user and item with a k-dimensional latent vector so that the dot product (plus biases) approximates the observed rating/preference. Learn vectors by minimising squared error on observed entries plus L2 regularisation via SGD or ALS; for implicit feedback use weighted ALS or pairwise losses like BPR." },
            { q: 'Describe a two-tower model and why it is used for retrieval.', a: "A user/query tower and an item tower each map features to embeddings; relevance is their dot product. Trained with contrastive/sampled-softmax loss using in-batch negatives. Because item embeddings are independent of the user, they can be precomputed and indexed in an ANN index, so retrieval over millions of items takes milliseconds." },
            { q: 'Why are recommender systems multi-stage?', a: "Scoring every item with an expressive model is too slow. Candidate generation narrows millions of items to hundreds/thousands with cheap models (ANN on embeddings, heuristics); a ranker with rich cross features scores those precisely; re-ranking applies diversity and business rules. Each stage trades recall, precision and latency." }
          ],
          code: String.raw`import numpy as np

def mf_sgd(triples, n_users, n_items, k=32, lr=0.01, reg=0.05, epochs=20, seed=0):
    """triples: array of (u, i, r). Returns P, Q, bu, bi, mu."""
    rng = np.random.default_rng(seed)
    P = 0.1 * rng.standard_normal((n_users, k))
    Q = 0.1 * rng.standard_normal((n_items, k))
    bu, bi = np.zeros(n_users), np.zeros(n_items)
    mu = triples[:, 2].mean()
    for _ in range(epochs):
        for u, i, r in triples[rng.permutation(len(triples))]:
            u, i = int(u), int(i)
            e = r - (mu + bu[u] + bi[i] + P[u] @ Q[i])
            bu[u] += lr * (e - reg * bu[u]); bi[i] += lr * (e - reg * bi[i])
            pu = P[u].copy()
            P[u] += lr * (e * Q[i] - reg * P[u])
            Q[i] += lr * (e * pu - reg * Q[i])
    return P, Q, bu, bi, mu

def recall_at_k(recommended, relevant, k=10):
    return len(set(recommended[:k]) & set(relevant)) / max(len(relevant), 1)

def in_batch_softmax_loss(U, V, temp=0.05):
    """U, V: (B, d) L2-normalised user and positive-item embeddings."""
    logits = U @ V.T / temp                           # (B, B); diagonal = positives
    logits -= logits.max(1, keepdims=True)
    logp = logits - np.log(np.exp(logits).sum(1, keepdims=True))
    return -np.mean(np.diag(logp))`
        },
        {
          id: 'ml-timeseries',
          title: 'Time series basics',
          est: '3 days',
          why: 'Demand forecasting, ETA, capacity planning and anomaly detection are common at Indian product companies (quick commerce, fintech, logistics); leakage-free validation is the key test.',
          learn: [
            "Components: trend, seasonality (possibly multiple: daily, weekly, yearly), cycles, noise; additive vs multiplicative decomposition (STL).",
            "<b>Stationarity</b>: constant mean/variance/autocovariance over time; tests (ADF, KPSS); differencing, log transforms to stabilise.",
            "ACF and PACF plots to identify AR and MA orders.",
            "<b>ARIMA(p, d, q)</b>: AR terms (lags of y), d differences, MA terms (lags of errors); SARIMA for seasonality; exponential smoothing / Holt-Winters; Prophet as a practical baseline.",
            "Baselines first: naive (last value), seasonal naive (same time last week), moving average - surprisingly hard to beat.",
            "ML approach: <b>lag features</b>, rolling statistics (mean/std over windows, computed with shift to avoid leakage), calendar features, holidays/events, exogenous variables; GBDT (LightGBM) dominates many forecasting competitions.",
            "Multi-step forecasting strategies: recursive, direct, multi-output; global models across many series vs local per-series models.",
            "<b>Backtesting</b>: rolling-origin / expanding-window evaluation (TimeSeriesSplit) with a gap; never shuffle.",
            "Metrics: MAE, RMSE, MAPE/sMAPE, MASE (scaled by naive forecast), WAPE for aggregated retail demand; prediction intervals via quantile regression."
          ],
          practice: [
            { t: 'Store Sales - Time Series Forecasting', p: 'KG', d: 'M', u: 'https://www.kaggle.com/competitions/store-sales-time-series-forecasting' },
            { t: 'M5 Forecasting - Accuracy (study top LightGBM solutions)', p: 'KG', d: 'H', u: 'https://www.kaggle.com/competitions/m5-forecasting-accuracy' },
            { t: 'Kaggle Learn - Time Series course', p: 'KG', d: 'E', u: 'https://www.kaggle.com/learn/time-series' },
            { t: 'Forecasting: Principles and Practice (Hyndman, free online)', p: 'BOOK', d: 'M', u: 'https://otexts.com/fpp3/' },
            { t: 'Build lag + rolling features with pandas groupby/shift and a LightGBM forecaster; backtest with 3 folds', p: 'BUILD', d: 'M' },
            { t: 'Fit ARIMA/SARIMA with statsmodels; compare with seasonal-naive and LightGBM using MASE', p: 'BUILD', d: 'M' },
            { t: 'Implement rolling-origin backtesting with a gap from scratch', p: 'BUILD', d: 'M' }
          ],
          notes: [
            "Rolling features must use only the past: <code>df.groupby('id')['y'].shift(1).rolling(7).mean()</code> - shift BEFORE rolling.",
            "When forecasting h steps ahead, lags shorter than h are unavailable at prediction time (unless recursive) - use lags ≥ h for direct models.",
            "MASE = MAE / MAE of in-sample (seasonal) naive forecast; < 1 means better than naive; works across series of different scales.",
            "Differencing removes trend (d=1) or seasonality (seasonal difference at lag m).",
            "Tree models cannot extrapolate trends - detrend first or predict differences/ratios.",
            "Hierarchical forecasting (SKU -> store -> region) needs reconciliation (bottom-up, top-down, MinT)."
          ],
          cases: [
            "Random k-fold CV on time series - future leaks into training, metrics are optimistic.",
            "Computing rolling means including the current target value (forgetting to shift).",
            "Scaling/normalising using statistics from the whole series, including test period.",
            "Ignoring holidays / promotions / stock-outs (zero sales due to no stock is not zero demand).",
            "MAPE with many zero-demand days - undefined/explodes; use WAPE or MASE.",
            "Follow-up: 'How would you forecast demand for a brand-new product?' - similar-product analogues, hierarchical/global models with product attributes, priors from category curves."
          ],
          qa: [
            { q: 'What is stationarity and why does it matter?', a: "A series is (weakly) stationary if its mean, variance and autocovariance do not change over time. Classical models like ARMA assume it so that past patterns generalise; non-stationary series are transformed via differencing, detrending or log transforms. Check with plots, ADF/KPSS tests." },
            { q: 'Explain ARIMA(p, d, q).', a: "d is the number of differences applied to make the series stationary; p is the number of autoregressive lags of the (differenced) series; q is the number of lagged forecast-error (moving-average) terms. Orders are chosen from ACF/PACF patterns or by AIC; SARIMA adds seasonal (P, D, Q, m) terms." },
            { q: 'How do you validate a forecasting model?', a: "Backtesting with rolling-origin (expanding or sliding window) splits: train on data up to time t, forecast the next horizon, roll forward, average errors. Add a gap equal to any feature-availability delay, compare against naive and seasonal-naive baselines, and use scale-free metrics like MASE/WAPE." },
            { q: 'Classical (ARIMA) vs ML (GBDT) forecasting?', a: "ARIMA/ETS: per-series, interpretable, good for few series with clear structure and short history, gives intervals naturally. GBDT with lag/calendar/exogenous features: one global model across thousands of series, captures non-linear effects and covariates (price, promos), usually wins in retail/demand competitions, but needs careful feature leakage control and cannot extrapolate trends." }
          ],
          code: String.raw`import numpy as np, pandas as pd

def add_ts_features(df, id_col='store_item', t_col='date', y='sales', horizon=1):
    df = df.sort_values([id_col, t_col]).copy()
    g = df.groupby(id_col)[y]
    for lag in [horizon, horizon + 6, horizon + 13, horizon + 27]:
        df[f'lag_{lag}'] = g.shift(lag)
    shifted = g.shift(horizon)
    for w in [7, 28]:
        df[f'roll_mean_{w}'] = shifted.groupby(df[id_col]).transform(lambda s: s.rolling(w, 1).mean())
    d = pd.to_datetime(df[t_col])
    df['dow'] = d.dt.dayofweek; df['month'] = d.dt.month
    df['dow_sin'] = np.sin(2 * np.pi * df.dow / 7); df['dow_cos'] = np.cos(2 * np.pi * df.dow / 7)
    return df

def rolling_origin_splits(dates: pd.Series, n_folds=3, horizon=28, gap=0):
    """Expanding-window backtest: yields (train_mask, test_mask), oldest fold first."""
    u = np.sort(dates.unique())
    for k in range(n_folds, 0, -1):
        test_start = len(u) - k * horizon
        train_mask = dates < u[test_start - gap]          # gap days dropped before test
        test_mask = dates.isin(u[test_start:test_start + horizon])
        yield train_mask, test_mask

def mase(y, yhat, y_train, m=7):
    scale = np.mean(np.abs(y_train[m:] - y_train[:-m]))
    return np.mean(np.abs(y - yhat)) / scale`
        },
        {
          id: 'ml-from-scratch',
          title: 'ML coding from scratch (NumPy)',
          est: '5-7 days',
          why: 'The "ML coding" round: implement an algorithm in 30-45 minutes with clean, vectorised, correct NumPy, then discuss complexity and extensions. Practise until each is a 15-minute exercise.',
          learn: [
            "Interview template: clarify inputs/outputs and shapes, write the class skeleton (<code>fit / predict</code>), implement the core vectorised, add a tiny test, then discuss complexity, edge cases and extensions.",
            "Linear regression (closed form + gradient descent, with optional L2) and R<sup>2</sup>.",
            "Logistic regression with stable sigmoid, log-loss, mini-batch GD, L2, predict_proba / threshold.",
            "Softmax regression / softmax + cross-entropy with the <code>p - y</code> gradient.",
            "k-means (with k-means++), kNN classifier/regressor fully vectorised distance matrix.",
            "Decision-tree split finding (Gini / entropy / MSE) and a small recursive tree with max_depth.",
            "Metrics: confusion matrix, precision/recall/F1, ROC-AUC, log-loss, RMSE, NDCG@k.",
            "Neural-net basics: 2-layer MLP forward + backward pass with ReLU and softmax; numerical gradient check.",
            "Also commonly asked: PCA via SVD, Naive Bayes, train/test split + k-fold, standard scaler, cosine similarity top-k, attention (scaled dot-product) for GenAI roles."
          ],
          practice: [
            { t: 'Deep-ML: Linear Regression Using Gradient Descent', p: 'DML', d: 'E' },
            { t: 'Deep-ML: K-Means Clustering', p: 'DML', d: 'M' },
            { t: 'Deep-ML: Single Neuron / backpropagation problems', p: 'DML', d: 'M' },
            { t: 'Deep-ML: Implement Self-Attention / scaled dot-product attention', p: 'DML', d: 'M' },
            { t: 'Deep-ML: Decision Tree Learning', p: 'DML', d: 'H' },
            { t: 'Timed drill (25 min): logistic regression class with fit/predict_proba + test on make_classification', p: 'BUILD', d: 'M' },
            { t: 'Timed drill (20 min): k-means with convergence + inertia', p: 'BUILD', d: 'M' },
            { t: 'Timed drill (15 min): vectorised kNN classifier', p: 'BUILD', d: 'E' },
            { t: 'Timed drill (30 min): decision tree classifier (Gini, max_depth, min_samples)', p: 'BUILD', d: 'H' },
            { t: 'Timed drill (30 min): 2-layer MLP with backprop on a toy dataset + gradient check', p: 'BUILD', d: 'H' },
            { t: 'Timed drill (15 min): ROC-AUC, F1 and NDCG@k functions with tests', p: 'BUILD', d: 'M' },
            { t: 'Timed drill (15 min): softmax, cross-entropy and its gradient, numerically stable', p: 'BUILD', d: 'E' }
          ],
          notes: [
            "Always state shapes in comments: <code># X: (n, d), W: (d, k), logits: (n, k)</code>.",
            "Numerical stability checklist: subtract max before exp, clip probabilities in logs, use <code>np.logaddexp</code>, avoid explicit inverses.",
            "Vectorise the inner loop: pairwise distances via <code>||a||<sup>2</sup> + ||b||<sup>2</sup> - 2a·b</code>; one-hot via indexing; class counts via <code>np.bincount</code>.",
            "Set a seed (<code>np.random.default_rng(0)</code>) and write a 3-line test (compare with sklearn or a known toy answer).",
            "Talk through complexity: logistic GD O(epochs · n · d); k-means O(iters · n · k · d); kNN query O(n · d); tree building O(d · n log n · depth).",
            "Know follow-ups: how to add regularisation, handle multiclass, support sparse input, scale to data that does not fit in memory (mini-batches), parallelise."
          ],
          cases: [
            "Shape mismatch (n,) vs (n,1) silently broadcasting in the loss/gradient.",
            "Forgetting the bias term, or regularising it.",
            "Not normalising the gradient by n - learning rate behaves differently with dataset size.",
            "Integer arrays: <code>X = np.array([[1, 2]])</code> then in-place float updates truncate - cast to float.",
            "k-means empty cluster producing NaN centroid (mean of empty slice).",
            "Tree split: considering thresholds between equal values; not handling a node where all labels are the same.",
            "Follow-up: 'Make it work for 100 GB of data' - streaming mini-batch SGD, partial_fit, mini-batch k-means, distributed (Spark/Dask)."
          ],
          qa: [
            { q: 'Walk me through implementing logistic regression from scratch.', a: "Initialise w (d,) and b to zero. Loop over epochs (and shuffled mini-batches): compute <code>p = σ(Xw + b)</code> stably, gradient <code>X<sup>T</sup>(p - y)/n + λw</code> and <code>mean(p - y)</code>, update with learning rate, track log-loss for early stopping. predict_proba returns p, predict thresholds it. Complexity O(epochs·n·d)." },
            { q: 'What is the gradient of softmax cross-entropy w.r.t. logits?', a: "For logits z, <code>p = softmax(z)</code>, one-hot y, <code>L = -Σ y<sub>k</sub> log p<sub>k</sub></code>; then <code>∂L/∂z = p - y</code>. For a batch, average over n; the weight gradient is <code>X<sup>T</sup>(P - Y)/n</code>." },
            { q: 'How do you compute pairwise distances efficiently in NumPy?', a: "Use <code>D<sup>2</sup> = ||A||<sup>2</sup>[:, None] + ||B||<sup>2</sup>[None, :] - 2 A B<sup>T</sup></code>, clip at 0 before sqrt. It uses one matrix multiply (BLAS) and O(mn) memory instead of the O(mnd) memory of naive broadcasting." },
            { q: 'How do you verify your from-scratch implementation is correct?', a: "Numerical gradient check with central differences, compare outputs with scikit-learn on a synthetic dataset, test edge cases (single class, duplicate points, k=1), and check loss decreases monotonically for small learning rates." }
          ],
          code: String.raw`import numpy as np

def softmax(Z):
    Z = Z - Z.max(1, keepdims=True); E = np.exp(Z)
    return E / E.sum(1, keepdims=True)

class SoftmaxRegression:
    def fit(self, X, y, k, lr=0.1, epochs=500, l2=1e-4):
        n, d = X.shape
        self.W, self.b = np.zeros((d, k)), np.zeros(k)
        Y = np.eye(k)[y]                                  # one-hot (n, k)
        for _ in range(epochs):
            P = softmax(X @ self.W + self.b)              # (n, k)
            G = (P - Y) / n
            self.W -= lr * (X.T @ G + l2 * self.W)
            self.b -= lr * G.sum(0)
        return self
    def predict(self, X):
        return (X @ self.W + self.b).argmax(1)

class MLP:                                                # 2-layer, ReLU, softmax
    def __init__(self, d, h, k, seed=0):
        r = np.random.default_rng(seed)
        self.W1 = r.standard_normal((d, h)) * np.sqrt(2 / d); self.b1 = np.zeros(h)
        self.W2 = r.standard_normal((h, k)) * np.sqrt(2 / h); self.b2 = np.zeros(k)
    def step(self, X, y, lr=0.1):
        n = len(X)
        H = X @ self.W1 + self.b1; A = np.maximum(H, 0)   # forward
        P = softmax(A @ self.W2 + self.b2)
        loss = -np.log(P[np.arange(n), y] + 1e-12).mean()
        dZ2 = P.copy(); dZ2[np.arange(n), y] -= 1; dZ2 /= n   # backward
        dW2 = A.T @ dZ2; db2 = dZ2.sum(0)
        dA = dZ2 @ self.W2.T; dH = dA * (H > 0)
        dW1 = X.T @ dH; db1 = dH.sum(0)
        for p, g in ((self.W1, dW1), (self.b1, db1), (self.W2, dW2), (self.b2, db2)):
            p -= lr * g
        return loss

def attention(Q, K, V, mask=None):                       # (n, d), (m, d), (m, dv)
    S = Q @ K.T / np.sqrt(Q.shape[-1])
    if mask is not None:
        S = np.where(mask, S, -1e9)
    return softmax(S) @ V

def train_test_split(X, y, test=0.2, seed=0):
    idx = np.random.default_rng(seed).permutation(len(X)); c = int(len(X) * (1 - test))
    return X[idx[:c]], X[idx[c:]], y[idx[:c]], y[idx[c:]]`
        },
        {
          id: 'ml-explain',
          title: 'Explainability & fairness',
          est: '2 days',
          why: 'Fintech, lending, insurance and healthcare interviews ask "how would you explain this model to a regulator / PM?"; SHAP and importance pitfalls are frequent follow-ups to tree-model questions.',
          learn: [
            "Global vs local explanations; intrinsically interpretable models (linear, GAMs, small trees) vs post-hoc explanations of black boxes.",
            "Feature importance types: impurity (MDI), gain/split count, <b>permutation importance</b> (on validation data), drop-column importance.",
            "<b>SHAP</b>: Shapley values from cooperative game theory - fair attribution of the prediction minus the baseline (expected value) to features; properties (local accuracy/efficiency, consistency, missingness); TreeSHAP (exact, fast for trees), KernelSHAP (model-agnostic, slow), DeepSHAP.",
            "SHAP plots: summary/beeswarm (global), dependence (interactions), waterfall/force (single prediction).",
            "<b>LIME</b>: fit a simple interpretable surrogate (sparse linear) on perturbed samples around one instance, weighted by proximity; instability across runs.",
            "Partial dependence plots (PDP) and individual conditional expectation (ICE); accumulated local effects (ALE) for correlated features.",
            "Counterfactual explanations ('what minimal change flips the decision') - used for adverse-action reasons in lending.",
            "<b>Fairness</b>: sources of bias (historical, sampling, label, measurement); metrics - demographic parity, equal opportunity (equal TPR), equalised odds, calibration within groups; impossibility results (cannot satisfy all when base rates differ).",
            "Mitigation: pre-processing (reweighing), in-processing (fairness constraints), post-processing (group-specific thresholds); dropping a sensitive attribute is not enough (proxies)."
          ],
          practice: [
            { t: 'Kaggle Learn - Machine Learning Explainability (permutation importance, PDP, SHAP)', p: 'KG', d: 'E', u: 'https://www.kaggle.com/learn/machine-learning-explainability' },
            { t: 'Interpretable Machine Learning (Christoph Molnar, free online book)', p: 'BOOK', d: 'M', u: 'https://christophm.github.io/interpretable-ml-book/' },
            { t: 'SHAP documentation - intro notebooks', p: 'DOC', d: 'E', u: 'https://shap.readthedocs.io/en/latest/' },
            { t: 'StatQuest: SHAP / Shapley values video', p: 'YT', d: 'M' },
            { t: 'Train XGBoost on a credit dataset; compare MDI vs permutation vs SHAP rankings; add a random noise feature and see where it ranks', p: 'BUILD', d: 'M' },
            { t: 'Compute exact Shapley values by brute force for a 3-feature model and check against shap', p: 'BUILD', d: 'H' },
            { t: 'Audit a classifier for equal opportunity across a sensitive group; fix with group thresholds; report the accuracy trade-off', p: 'BUILD', d: 'M' }
          ],
          notes: [
            "Shapley value of feature i: average over all feature orderings of the marginal contribution of adding i - <code>φ<sub>i</sub> = Σ<sub>S</sub> |S|!(M-|S|-1)!/M! · [f(S∪{i}) - f(S)]</code>; exponential cost, so approximations are used.",
            "SHAP local accuracy: <code>f(x) = E[f(X)] + Σφ<sub>i</sub></code> - the contributions sum to the prediction (in log-odds space for classifiers by default).",
            "Permutation importance on validation data measures reliance on a feature for generalisation; correlated features share/hide importance (permuting one, the model uses its twin).",
            "Explanations describe the <i>model</i>, not causal effects in the world.",
            "For regulated decisions prefer intrinsically interpretable or monotonic-constrained models (XGBoost/LightGBM support monotone constraints) plus reason codes.",
            "Equal opportunity = equal TPR across groups; equalised odds = equal TPR and FPR; demographic parity = equal positive rate."
          ],
          cases: [
            "Trusting impurity-based importance: biased toward high-cardinality and continuous features; can rank a random ID column highly.",
            "Interpreting SHAP or PDP causally ('increasing income by X will reduce default by Y').",
            "PDPs on correlated features evaluate unrealistic combinations - use ALE or conditional methods.",
            "LIME explanations change across runs and kernel widths - report stability.",
            "Removing the protected attribute and declaring the model fair - proxies (pincode, name) leak it; you also lose the ability to measure bias.",
            "Follow-up: 'SHAP says feature X is most important but permutation importance says it is useless - why?' - SHAP measures contribution to predictions (including on training data and correlated substitutes), permutation measures loss increase on validation; correlation and overfitting explain disagreement."
          ],
          qa: [
            { q: 'What are SHAP values?', a: "Per-prediction feature attributions based on Shapley values: each feature's contribution is its average marginal effect on the prediction over all possible feature coalitions, relative to a baseline (expected model output). They are additive (sum to prediction minus baseline) and consistent. TreeSHAP computes them exactly and quickly for tree ensembles; aggregated absolute SHAP gives global importance." },
            { q: 'SHAP vs LIME?', a: "LIME fits a local linear surrogate on perturbed samples around one instance - fast, model-agnostic, but unstable and depends on kernel and sampling choices. SHAP has a game-theoretic foundation with guarantees (local accuracy, consistency), exact fast algorithms for trees, and consistent global views; KernelSHAP is slower. Both are post-hoc and can mislead with correlated features." },
            { q: 'Why can built-in feature importance of a random forest be misleading?', a: "Mean decrease in impurity is computed on training data and favours features with many possible split points (continuous, high-cardinality IDs), even if they are noise; it also splits importance between correlated features. Permutation importance on a validation set or SHAP is more reliable." },
            { q: 'How would you check a credit model for fairness?', a: "Define sensitive groups and the relevant fairness criterion with stakeholders (e.g. equal opportunity for qualified applicants). Compute per-group metrics (approval rate, TPR, FPR, calibration), check for proxies, analyse error sources (label bias, sampling). Mitigate by reweighing, constraints or group-aware thresholds, and document the trade-offs and residual disparities." }
          ],
          code: String.raw`import numpy as np
from itertools import combinations
from math import factorial

def exact_shapley(f, x, background):
    """f: model on (n, M) arrays; x: (M,); background: (b, M) reference data."""
    M = len(x)
    def value(S):
        Z = background.copy()
        if S:
            Z[:, list(S)] = x[list(S)]
        return f(Z).mean()
    phi = np.zeros(M)
    for i in range(M):
        others = [j for j in range(M) if j != i]
        for r in range(M):
            for S in combinations(others, r):
                w = factorial(len(S)) * factorial(M - len(S) - 1) / factorial(M)
                phi[i] += w * (value(S + (i,)) - value(S))
    return phi            # phi.sum() == f(x) - E[f(background)]

def permutation_importance(model, X, y, metric, n_repeats=5, rng=np.random.default_rng(0)):
    base = metric(y, model.predict(X))
    imp = np.zeros(X.shape[1])
    for j in range(X.shape[1]):
        scores = []
        for _ in range(n_repeats):
            Xp = X.copy(); Xp[:, j] = rng.permutation(Xp[:, j])
            scores.append(base - metric(y, model.predict(Xp)))
        imp[j] = np.mean(scores)
    return imp

def group_rates(y, yhat, g):
    out = {}
    for grp in np.unique(g):
        m = g == grp
        tpr = ((yhat == 1) & (y == 1) & m).sum() / max(((y == 1) & m).sum(), 1)
        fpr = ((yhat == 1) & (y == 0) & m).sum() / max(((y == 0) & m).sum(), 1)
        out[grp] = dict(pos_rate=yhat[m].mean(), tpr=tpr, fpr=fpr)
    return out`
        }
      ]
    }
  ]
});
