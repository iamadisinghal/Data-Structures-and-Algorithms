// Free "Read & watch" references for the Python (py) and Classical ML (ml) tabs.
// Videos without u become YouTube searches; articles without u become web searches.

PREP.add({ id: "py", refs: {
  "py-data-model": [
    { n: "Python docs — Data model (Language Reference ch. 3)", u: "https://docs.python.org/3/reference/datamodel.html", k: "docs", d: "objects, values, types; full list of special (dunder) methods" },
    { n: "Ned Batchelder — Facts and myths about Python names and values", u: "https://nedbatchelder.com/text/names.html", k: "article", d: "the clearest explanation of names bound to objects, mutability" },
    { n: "Ned Batchelder — Facts and Myths about Python Names and Values (PyCon 2015)", k: "video", d: "talk version of the article above" },
    { n: "Python docs — Built-in Types", u: "https://docs.python.org/3/library/stdtypes.html", k: "docs", d: "mutable vs immutable sequences, hashing, dict/set semantics" },
    { n: "mCoding — Python dunder methods / data model explained", k: "video", d: "how operators map to special methods" },
    { n: "Fluent Python 2e (Luciano Ramalho) — Ch. 1 The Python Data Model (paid, optional)", k: "book", d: "the classic chapter on dunder methods" }
  ],
  "py-functions": [
    { n: "Real Python — Python Scope & the LEGB Rule", u: "https://realpython.com/python-scope-legb-rule/", k: "article", d: "LEGB, global / nonlocal, closures" },
    { n: "Python docs — Execution model: naming and binding", u: "https://docs.python.org/3/reference/executionmodel.html", k: "docs", d: "the formal scoping rules (why UnboundLocalError happens)" },
    { n: "Python docs tutorial — More on Defining Functions", u: "https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions", k: "docs", d: "default args, positional-only /, keyword-only *, *args/**kwargs" },
    { n: "Corey Schafer — Python Tutorial: Variable Scope - Understanding the LEGB rule and global/nonlocal statements", k: "video" },
    { n: "Corey Schafer — Programming Terms: Closures - How to Use Them and Why They Are Useful", k: "video" },
    { n: "Corey Schafer — Programming Terms: First-Class Functions", k: "video" },
    { n: "Fluent Python 2e — Ch. 7 Functions as First-Class Objects & Ch. 9 Decorators and Closures (paid, optional)", k: "book" }
  ],
  "py-iter": [
    { n: "Python docs — Functional Programming HOWTO", u: "https://docs.python.org/3/howto/functional.html", k: "docs", d: "iterators, generators, generator expressions, itertools, functools" },
    { n: "Python docs — itertools (with recipes)", u: "https://docs.python.org/3/library/itertools.html", k: "docs", d: "read the Itertools Recipes section at the end" },
    { n: "Python docs — functools", u: "https://docs.python.org/3/library/functools.html", k: "docs", d: "lru_cache, cache, partial, reduce, wraps, singledispatch" },
    { n: "Real Python — How to Use Generators and yield in Python", u: "https://realpython.com/introduction-to-python-generators/", k: "article" },
    { n: "Corey Schafer — Python Tutorial: Iterators and Iterables - What Are They and How Do They Work?", k: "video" },
    { n: "Corey Schafer — Python Tutorial: Generators - How to use them and the benefits you receive", k: "video" },
    { n: "David Beazley — Generator Tricks for Systems Programmers / Generators: The Final Frontier (PyCon)", k: "video", d: "deep dive into generator pipelines and yield from" }
  ],
  "py-decorators": [
    { n: "Real Python — Primer on Python Decorators", u: "https://realpython.com/primer-on-python-decorators/", k: "article", d: "covers decorators with arguments, class decorators, functools.wraps" },
    { n: "PEP 318 — Decorators for Functions and Methods", u: "https://peps.python.org/pep-0318/", k: "docs", d: "why the @ syntax exists" },
    { n: "Python docs — functools.wraps", u: "https://docs.python.org/3/library/functools.html#functools.wraps", k: "docs" },
    { n: "Corey Schafer — Python Tutorial: Decorators - Dynamically Alter The Functionality Of Your Functions", k: "video" },
    { n: "Corey Schafer — Python Tutorial: Decorators With Arguments", k: "video" },
    { n: "mCoding — Decorators in Python (the ultimate guide)", k: "video" },
    { n: "Fluent Python 2e — Ch. 9 Decorators and Closures (paid, optional)", k: "book" }
  ],
  "py-context-exceptions": [
    { n: "Python docs tutorial — Errors and Exceptions", u: "https://docs.python.org/3/tutorial/errors.html", k: "docs", d: "try/except/else/finally, raise from, exception groups" },
    { n: "Python docs — contextlib", u: "https://docs.python.org/3/library/contextlib.html", k: "docs", d: "contextmanager, suppress, ExitStack" },
    { n: "PEP 343 — The \"with\" Statement", u: "https://peps.python.org/pep-0343/", k: "docs", d: "the exact __enter__/__exit__ expansion" },
    { n: "Real Python — Context Managers and Python's with Statement", u: "https://realpython.com/python-with-statement/", k: "article" },
    { n: "Corey Schafer — Python Tutorial: Context Managers - Efficiently Managing Resources", k: "video" },
    { n: "Corey Schafer — Python Tutorial: Using Try/Except Blocks for Error Handling", k: "video" },
    { n: "Fluent Python 2e — Ch. 18 with, match, and else Blocks (paid, optional)", k: "book" }
  ],
  "py-oop": [
    { n: "Python docs tutorial — Classes", u: "https://docs.python.org/3/tutorial/classes.html", k: "docs", d: "class vs instance attributes, inheritance, name mangling" },
    { n: "Python docs — Descriptor HowTo Guide (Raymond Hettinger)", u: "https://docs.python.org/3/howto/descriptor.html", k: "docs", d: "how property, classmethod, staticmethod really work" },
    { n: "Python docs — The Python 2.3 Method Resolution Order (C3)", u: "https://docs.python.org/3/howto/mro.html", k: "docs", d: "MRO / C3 linearisation" },
    { n: "Raymond Hettinger — Python's super() considered super!", u: "https://rhettinger.wordpress.com/2011/05/26/super-considered-super/", k: "blog" },
    { n: "Real Python — Python's Instance, Class, and Static Methods Demystified", u: "https://realpython.com/instance-class-and-static-methods-demystified/", k: "article" },
    { n: "Corey Schafer — Python OOP Tutorials (Working with Classes)", k: "playlist", d: "6 short videos: classes, class vars, classmethods, inheritance, dunders, property" },
    { n: "Raymond Hettinger — Python's Class Development Toolkit (PyCon 2013)", k: "video" }
  ],
  "py-typing": [
    { n: "Python docs — typing", u: "https://docs.python.org/3/library/typing.html", k: "docs", d: "Protocol, TypeVar, generics, TypedDict, Literal" },
    { n: "Python docs — dataclasses", u: "https://docs.python.org/3/library/dataclasses.html", k: "docs", d: "field(default_factory=...), frozen, slots, __post_init__" },
    { n: "Real Python — Python Type Checking (Guide)", u: "https://realpython.com/python-type-checking/", k: "article" },
    { n: "Real Python — Data Classes in Python (Guide)", u: "https://realpython.com/python-data-classes/", k: "article" },
    { n: "Pydantic docs — Concepts (models, validators)", u: "https://docs.pydantic.dev/latest/", k: "docs" },
    { n: "ArjanCodes — If you're not using Python DATA CLASSES yet, you should", k: "video" },
    { n: "ArjanCodes — Protocols vs ABCs in Python / Pydantic tutorial", k: "video", d: "structural typing and runtime validation" }
  ],
  "py-memory": [
    { n: "Real Python — Memory Management in Python", u: "https://realpython.com/python-memory-management/", k: "article", d: "CPython allocator, reference counting" },
    { n: "Real Python — Pointers in Python: What's the Point?", u: "https://realpython.com/pointers-in-python/", k: "article", d: "names vs objects, interning, is vs ==" },
    { n: "Real Python — Shallow vs Deep Copying of Python Objects", u: "https://realpython.com/copying-python-objects/", k: "article" },
    { n: "Python docs — gc (garbage collector interface)", u: "https://docs.python.org/3/library/gc.html", k: "docs", d: "cyclic GC, generations, gc.collect" },
    { n: "Python docs — copy (shallow and deep copy)", u: "https://docs.python.org/3/library/copy.html", k: "docs" },
    { n: "Ned Batchelder — Facts and Myths about Python Names and Values (PyCon 2015)", k: "video" },
    { n: "Fluent Python 2e — Ch. 6 Object References, Mutability, and Recycling (paid, optional)", k: "book" }
  ],
  "py-concurrency": [
    { n: "Python docs glossary — global interpreter lock", u: "https://docs.python.org/3/glossary.html#term-global-interpreter-lock", k: "docs" },
    { n: "Python docs — Python support for free threading (3.13+)", u: "https://docs.python.org/3/howto/free-threading-python.html", k: "docs", d: "the no-GIL build (PEP 703)" },
    { n: "Real Python — What Is the Python Global Interpreter Lock (GIL)?", u: "https://realpython.com/python-gil/", k: "article" },
    { n: "Real Python — Speed Up Your Python Program With Concurrency", u: "https://realpython.com/python-concurrency/", k: "article", d: "threading vs multiprocessing vs asyncio, with benchmarks" },
    { n: "Python docs — concurrent.futures", u: "https://docs.python.org/3/library/concurrent.futures.html", k: "docs", d: "ThreadPoolExecutor / ProcessPoolExecutor" },
    { n: "Corey Schafer — Python Threading Tutorial / Python Multiprocessing Tutorial", k: "video" },
    { n: "David Beazley — Understanding the Python GIL (PyCon 2010)", k: "video", d: "the canonical deep dive" }
  ],
  "py-asyncio": [
    { n: "Python docs — asyncio", u: "https://docs.python.org/3/library/asyncio.html", k: "docs" },
    { n: "Python docs — Coroutines and Tasks", u: "https://docs.python.org/3/library/asyncio-task.html", k: "docs", d: "gather, TaskGroup, wait_for, timeouts, cancellation" },
    { n: "Real Python — Async IO in Python: A Complete Walkthrough", u: "https://realpython.com/async-io-python/", k: "article" },
    { n: "PEP 492 — Coroutines with async and await syntax", u: "https://peps.python.org/pep-0492/", k: "docs" },
    { n: "Łukasz Langa — import asyncio: Learn Python's AsyncIO (EdgeDB series)", k: "playlist", d: "from the event loop up, by a CPython core dev" },
    { n: "David Beazley — Python Concurrency From the Ground Up: LIVE! (PyCon 2015)", k: "video", d: "builds an event loop live; great intuition" },
    { n: "Fluent Python 2e — Ch. 21 Asynchronous Programming (paid, optional)", k: "book" }
  ],
  "py-perf": [
    { n: "Python docs — The Python Profilers (cProfile, pstats)", u: "https://docs.python.org/3/library/profile.html", k: "docs" },
    { n: "Python docs — timeit", u: "https://docs.python.org/3/library/timeit.html", k: "docs" },
    { n: "Real Python — Profiling in Python: How to Find Performance Bottlenecks", u: "https://realpython.com/python-profiling/", k: "article" },
    { n: "Numba docs — A ~5 minute guide to Numba", u: "https://numba.readthedocs.io/en/stable/user/5minguide.html", k: "docs" },
    { n: "Jake VanderPlas — Losing your Loops: Fast Numerical Computing with NumPy (PyCon 2015)", k: "video", d: "ufuncs, aggregations, broadcasting, masking" },
    { n: "mCoding — Python profiling / speeding up Python code", k: "video" },
    { n: "Cython docs — Basic Tutorial", u: "https://cython.readthedocs.io/en/latest/src/tutorial/cython_tutorial.html", k: "docs" }
  ],
  "py-numpy-pandas": [
    { n: "NumPy docs — Broadcasting", u: "https://numpy.org/doc/stable/user/basics.broadcasting.html", k: "docs" },
    { n: "NumPy docs — NumPy: the absolute basics for beginners", u: "https://numpy.org/doc/stable/user/absolute_beginners.html", k: "docs" },
    { n: "pandas docs — User Guide", u: "https://pandas.pydata.org/docs/user_guide/index.html", k: "docs", d: "read groupby, merging/join, reshaping, time series sections" },
    { n: "Jake VanderPlas — Python Data Science Handbook (free online)", u: "https://jakevdp.github.io/PythonDataScienceHandbook/", k: "book", d: "ch. 2 NumPy and ch. 3 pandas" },
    { n: "Real Python — Look Ma, No for Loops: Array Programming With NumPy", u: "https://realpython.com/numpy-array-programming/", k: "article" },
    { n: "Corey Schafer — Pandas Tutorials", k: "playlist" },
    { n: "Keith Galli — Complete Python Pandas Data Science Tutorial", k: "video" }
  ],
  "py-tooling": [
    { n: "uv docs (Astral)", u: "https://docs.astral.sh/uv/", k: "docs", d: "projects, uv.lock, uv run" },
    { n: "Python Packaging User Guide — Packaging Python Projects", u: "https://packaging.python.org/en/latest/tutorials/packaging-projects/", k: "docs", d: "pyproject.toml, build, wheels" },
    { n: "pytest docs — Get started / fixtures", u: "https://docs.pytest.org/en/stable/", k: "docs" },
    { n: "Python docs — Logging HOWTO", u: "https://docs.python.org/3/howto/logging.html", k: "docs" },
    { n: "FastAPI — Tutorial / User Guide", u: "https://fastapi.tiangolo.com/tutorial/", k: "docs" },
    { n: "Real Python — Effective Python Testing With pytest", u: "https://realpython.com/pytest-python-testing/", k: "article" },
    { n: "Corey Schafer — Python Tutorial: VENV / Logging Basics", k: "video" },
  ]
}});

PREP.add({ id: "ml", refs: {
  "ml-prob-stats": [
    { n: "Mathematics for Machine Learning (Deisenroth, Faisal, Ong) — Ch. 6 Probability and Distributions (free PDF)", u: "https://mml-book.github.io/", k: "book" },
    { n: "Seeing Theory (Brown University) — visual probability & statistics", u: "https://seeing-theory.brown.edu/", k: "visual" },
    { n: "Harvard Stat 110 (Joe Blitzstein) — Probability lectures", k: "playlist", d: "the best rigorous probability course; free book too" },
    { n: "StatQuest — Statistics Fundamentals", k: "playlist", d: "distributions, p-values, MLE, Bayes" },
    { n: "3Blue1Brown — Bayes theorem, the geometry of changing beliefs", k: "video" },
    { n: "3Blue1Brown — But what is the Central Limit Theorem?", k: "video" },
    { n: "Bishop — Pattern Recognition and Machine Learning, Ch. 1-2 (free PDF from Microsoft Research)", u: "https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/", k: "book", d: "MLE vs MAP, Gaussian, conjugate priors" }
  ],
  "ml-linalg-calc": [
    { n: "Mathematics for Machine Learning — Ch. 2-5 Linear Algebra, Geometry, Matrix Decompositions, Vector Calculus (free PDF)", u: "https://mml-book.github.io/", k: "book" },
    { n: "3Blue1Brown — Essence of linear algebra", k: "playlist", d: "geometric intuition for matrices, determinants, eigenvectors" },
    { n: "3Blue1Brown — Essence of calculus", k: "playlist" },
    { n: "MIT 18.06 Linear Algebra (Gilbert Strang) — OCW", u: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", k: "course" },
    { n: "Stanford CS229 — Linear Algebra Review and Reference (Zico Kolter)", k: "notes", d: "compact refresher incl. matrix calculus" },
    { n: "Terence Parr & Jeremy Howard — The Matrix Calculus You Need For Deep Learning", u: "https://explained.ai/matrix-calculus/", k: "article" },
    { n: "Krish Naik / CampusX — Linear algebra for ML (Hindi-friendly)", k: "playlist" }
  ],
  "ml-basics": [
    { n: "ISLP (James, Witten, Hastie, Tibshirani, Taylor) — Ch. 2 Statistical Learning & Ch. 5 Resampling Methods (free PDF)", u: "https://www.statlearning.com/", k: "book", d: "bias-variance trade-off, CV, bootstrap" },
    { n: "ESL (Hastie, Tibshirani, Friedman) — Ch. 7 Model Assessment and Selection (free PDF)", u: "https://hastie.su.domains/ElemStatLearn/", k: "book", d: "the rigorous treatment" },
    { n: "scikit-learn — Cross-validation: evaluating estimator performance", u: "https://scikit-learn.org/stable/modules/cross_validation.html", k: "docs", d: "KFold, StratifiedKFold, GroupKFold, TimeSeriesSplit" },
    { n: "scikit-learn — Common pitfalls and recommended practices (data leakage)", u: "https://scikit-learn.org/stable/common_pitfalls.html", k: "docs" },
    { n: "MLU-Explain — The Bias Variance Tradeoff", u: "https://mlu-explain.github.io/bias-variance/", k: "visual" },
    { n: "StatQuest — Machine Learning Fundamentals: Bias and Variance / Cross Validation", k: "video" },
    { n: "CampusX — 100 Days of Machine Learning", k: "playlist", d: "Hindi-friendly, end-to-end" }
  ],
  "ml-linear-logistic": [
    { n: "ISLP — Ch. 3 Linear Regression, Ch. 4 Classification, Ch. 6 Regularization (free PDF)", u: "https://www.statlearning.com/", k: "book" },
    { n: "Stanford CS229 lecture notes — Supervised learning: linear regression, logistic regression, GLMs", u: "https://cs229.stanford.edu/", k: "notes", d: "derive normal equation and logistic gradient" },
    { n: "scikit-learn — Linear Models", u: "https://scikit-learn.org/stable/modules/linear_model.html", k: "docs", d: "OLS, Ridge, Lasso, ElasticNet, LogisticRegression" },
    { n: "MLU-Explain — Linear Regression / Logistic Regression", u: "https://mlu-explain.github.io/logistic-regression/", k: "visual" },
    { n: "StatQuest — Linear Regression, Clearly Explained / Logistic Regression / Regularization: Ridge, Lasso", k: "playlist" },
    { n: "Andrew Ng — CS229 Lecture 2-3: Linear Regression, Gradient Descent, Locally Weighted & Logistic Regression", k: "video" },
    { n: "Google ML Crash Course — Linear regression & Logistic regression modules", u: "https://developers.google.com/machine-learning/crash-course", k: "course" }
  ],
  "ml-trees": [
    { n: "ISLP — Ch. 8 Tree-Based Methods (free PDF)", u: "https://www.statlearning.com/", k: "book", d: "trees, bagging, RF, boosting, BART" },
    { n: "ESL — Ch. 9.2 Trees, Ch. 10 Boosting, Ch. 15 Random Forests (free PDF)", u: "https://hastie.su.domains/ElemStatLearn/", k: "book" },
    { n: "scikit-learn — Ensembles: gradient boosting, random forests, bagging", u: "https://scikit-learn.org/stable/modules/ensemble.html", k: "docs" },
    { n: "XGBoost docs — Introduction to Boosted Trees", u: "https://xgboost.readthedocs.io/en/stable/tutorials/model.html", k: "docs", d: "second-order objective, regularised split gain" },
    { n: "Terence Parr & Jeremy Howard — How to explain gradient boosting", u: "https://explained.ai/gradient-boosting/", k: "article" },
    { n: "StatQuest — Decision Trees, Random Forests, AdaBoost, Gradient Boost (Parts 1-4), XGBoost (Parts 1-4)", k: "playlist" },
    { n: "Google — Decision Forests course", u: "https://developers.google.com/machine-learning/decision-forests", k: "course" }
  ],
  "ml-svm-knn-nb": [
    { n: "ISLP — Ch. 9 Support Vector Machines; Ch. 4 (Naive Bayes, kNN) (free PDF)", u: "https://www.statlearning.com/", k: "book" },
    { n: "Stanford CS229 lecture notes — Support Vector Machines & Generative Learning (GDA, Naive Bayes)", u: "https://cs229.stanford.edu/", k: "notes", d: "primal/dual, KKT, kernels" },
    { n: "scikit-learn — Support Vector Machines", u: "https://scikit-learn.org/stable/modules/svm.html", k: "docs" },
    { n: "scikit-learn — Nearest Neighbors / Naive Bayes", u: "https://scikit-learn.org/stable/modules/naive_bayes.html", k: "docs" },
    { n: "MIT 6.034 (Patrick Winston) — Lecture 16: Learning: Support Vector Machines", k: "video", d: "legendary derivation of the margin" },
    { n: "StatQuest — Support Vector Machines Part 1-3 / Naive Bayes, Clearly Explained / K-nearest neighbors", k: "playlist" },
    { n: "Mathematics for Machine Learning — Ch. 12 Classification with SVMs (free PDF)", u: "https://mml-book.github.io/", k: "book" }
  ],
  "ml-unsupervised": [
    { n: "ISLP — Ch. 12 Unsupervised Learning (free PDF)", u: "https://www.statlearning.com/", k: "book", d: "PCA, k-means, hierarchical clustering" },
    { n: "Mathematics for Machine Learning — Ch. 10 PCA & Ch. 11 Gaussian Mixture Models (free PDF)", u: "https://mml-book.github.io/", k: "book" },
    { n: "scikit-learn — Clustering", u: "https://scikit-learn.org/stable/modules/clustering.html", k: "docs", d: "the comparison grid of algorithms is gold" },
    { n: "scikit-learn — Decomposing signals in components (PCA, SVD, NMF)", u: "https://scikit-learn.org/stable/modules/decomposition.html", k: "docs" },
    { n: "Distill — How to Use t-SNE Effectively", u: "https://distill.pub/2016/misread-tsne/", k: "visual" },
    { n: "StatQuest — K-means clustering / Hierarchical Clustering / DBSCAN / PCA Step-by-Step / t-SNE / UMAP", k: "playlist" },
    { n: "Google — Clustering course", u: "https://developers.google.com/machine-learning/clustering", k: "course" }
  ],
  "ml-metrics": [
    { n: "scikit-learn — Metrics and scoring: quantifying the quality of predictions", u: "https://scikit-learn.org/stable/modules/model_evaluation.html", k: "docs" },
    { n: "Google ML Crash Course — Classification: accuracy, precision, recall, ROC and AUC", u: "https://developers.google.com/machine-learning/crash-course", k: "course" },
    { n: "MLU-Explain — ROC & AUC", u: "https://mlu-explain.github.io/roc-auc/", k: "visual" },
    { n: "Wikipedia — Precision and recall", u: "https://en.wikipedia.org/wiki/Precision_and_recall", k: "article", d: "the confusion-matrix table of every derived metric" },
    { n: "scikit-learn — Probability calibration", u: "https://scikit-learn.org/stable/modules/calibration.html", k: "docs" },
    { n: "StatQuest — ROC and AUC, Clearly Explained! / Sensitivity and Specificity / The Confusion Matrix", k: "video" },
    { n: "Krish Naik — Precision, Recall, F1, ROC-AUC (Hindi-friendly)", k: "video" }
  ],
  "ml-features": [
    { n: "Kuhn & Johnson — Feature Engineering and Selection (free online)", u: "http://www.feat.engineering/", k: "book", d: "encodings, missing data, interactions, selection" },
    { n: "Kaggle Learn — Feature Engineering", u: "https://www.kaggle.com/learn/feature-engineering", k: "course", d: "mutual information, target encoding, PCA features" },
    { n: "Kaggle Learn — Intermediate Machine Learning (missing values, categorical vars, pipelines, data leakage)", u: "https://www.kaggle.com/learn/intermediate-machine-learning", k: "course" },
    { n: "scikit-learn — Preprocessing data", u: "https://scikit-learn.org/stable/modules/preprocessing.html", k: "docs" },
    { n: "scikit-learn — Imputation of missing values", u: "https://scikit-learn.org/stable/modules/impute.html", k: "docs" },
    { n: "Google — Rules of Machine Learning (Martin Zinkevich)", u: "https://developers.google.com/machine-learning/guides/rules-of-ml", k: "article" },
    { n: "CampusX — Feature Engineering (100 Days of ML)", k: "playlist", d: "Hindi-friendly" }
  ],
  "ml-optim": [
    { n: "Sebastian Ruder — An overview of gradient descent optimization algorithms", u: "https://arxiv.org/abs/1609.04747", k: "paper", d: "momentum, Nesterov, Adagrad, RMSprop, Adam in one place" },
    { n: "Distill — Why Momentum Really Works (Gabriel Goh)", u: "https://distill.pub/2017/momentum/", k: "visual" },
    { n: "Dive into Deep Learning — Ch. Optimization Algorithms", u: "https://d2l.ai/chapter_optimization/index.html", k: "book", d: "SGD, momentum, Adam, LR scheduling with code" },
    { n: "Kingma & Ba — Adam: A Method for Stochastic Optimization", u: "https://arxiv.org/abs/1412.6980", k: "paper" },
    { n: "Mathematics for Machine Learning — Ch. 7 Continuous Optimization (free PDF)", u: "https://mml-book.github.io/", k: "book" },
    { n: "DeepLearningAI (Andrew Ng) — Improving Deep Neural Networks: Momentum, RMSprop, Adam, Learning Rate Decay", k: "playlist" },
    { n: "StatQuest — Gradient Descent, Step-by-Step / Stochastic Gradient Descent", k: "video" }
  ],
  "ml-recsys": [
    { n: "Google — Recommendation Systems course", u: "https://developers.google.com/machine-learning/recommendation", k: "course", d: "candidate generation, matrix factorization, two-tower, ranking" },
    { n: "Mining of Massive Datasets (Leskovec, Rajaraman, Ullman) — Ch. 9 Recommendation Systems (free PDF)", u: "http://www.mmds.org/", k: "book" },
    { n: "Koren, Bell, Volinsky — Matrix Factorization Techniques for Recommender Systems (IEEE Computer 2009)", k: "paper" },
    { n: "Cheng et al. — Wide & Deep Learning for Recommender Systems", u: "https://arxiv.org/abs/1606.07792", k: "paper" },
    { n: "Eugene Yan — System Design for Recommendations and Search", k: "blog" },
    { n: "Stanford CS246 (Jure Leskovec) — Recommender Systems lectures", k: "video" },
    { n: "Krish Naik — Recommendation system (collaborative filtering) tutorial", k: "video" }
  ],
  "ml-timeseries": [
    { n: "Hyndman & Athanasopoulos — Forecasting: Principles and Practice, 3rd ed. (free online)", u: "https://otexts.com/fpp3/", k: "book", d: "decomposition, stationarity, ARIMA, ETS, evaluation" },
    { n: "statsmodels — Time Series Analysis (tsa)", u: "https://www.statsmodels.org/stable/tsa.html", k: "docs" },
    { n: "Kaggle Learn — Time Series", u: "https://www.kaggle.com/learn/time-series", k: "course", d: "lag features, trend/seasonality with ML models" },
    { n: "scikit-learn — TimeSeriesSplit (cross-validation of time series data)", u: "https://scikit-learn.org/stable/modules/cross_validation.html#time-series-split", k: "docs" },
    { n: "ritvikmath — Time Series Talk", k: "playlist", d: "stationarity, ACF/PACF, AR/MA/ARIMA intuition" },
    { n: "Krish Naik — Time series forecasting (ARIMA, SARIMA) tutorial", k: "video" }
  ],
  "ml-from-scratch": [
    { n: "Erik Linder-Norén — ML-From-Scratch (GitHub)", u: "https://github.com/eriklindernoren/ML-From-Scratch", k: "notes", d: "readable NumPy implementations of most classic models" },
    { n: "Patrick Loeber (AssemblyAI) — Machine Learning From Scratch", k: "playlist", d: "kNN, linear/logistic regression, NB, trees, k-means, PCA in NumPy" },
    { n: "Stanford CS229 lecture notes (derivations to implement)", u: "https://cs229.stanford.edu/", k: "notes" },
    { n: "Deep-ML — ML coding practice problems", u: "https://www.deep-ml.com/", k: "course" },
    { n: "NumPy docs — Broadcasting", u: "https://numpy.org/doc/stable/user/basics.broadcasting.html", k: "docs", d: "vectorise distances, softmax, gradients" },
    { n: "Andrej Karpathy — The spelled-out intro to neural networks and backpropagation: building micrograd", k: "video", d: "gold-standard from-scratch coding style" }
  ],
  "ml-explain": [
    { n: "Christoph Molnar — Interpretable Machine Learning (free online book)", u: "https://christophm.github.io/interpretable-ml-book/", k: "book", d: "PDP, ICE, permutation importance, LIME, SHAP" },
    { n: "Lundberg & Lee — A Unified Approach to Interpreting Model Predictions (SHAP)", u: "https://arxiv.org/abs/1705.07874", k: "paper" },
    { n: "Ribeiro et al. — \"Why Should I Trust You?\" (LIME)", u: "https://arxiv.org/abs/1602.04938", k: "paper" },
    { n: "SHAP docs", u: "https://shap.readthedocs.io/en/latest/", k: "docs" },
    { n: "scikit-learn — Permutation feature importance", u: "https://scikit-learn.org/stable/modules/permutation_importance.html", k: "docs", d: "and why impurity importance is biased" },
    { n: "Barocas, Hardt, Narayanan — Fairness and Machine Learning (free book)", u: "https://fairmlbook.org/", k: "book" },
    { n: "DeepFindr — Explainable AI explained: SHAP", k: "video" }
  ]
}});
