# HW3: Explore and Exploit for Arm-Bandit Problem

![algo-comparision](image/algo-comparision.png)

## Overview

The [`main.ipynb`](main.ipynb) is the primary submission for the assignment, developed with the assistance of **GitHub Copilot** and **Grok**.

> [!NOTE]
> 1. I’ve also provided the [`main.pdf`](main.pdf) in case you prefer to view the assignment in PDF format. The PDF is exported directly from the [`main.ipynb`](main.ipynb) notebook.
> 2. The LaTeX equations in the notebook and PDF are rendered using [Overleaf](https://www.overleaf.com/). The LaTeX source code is in the [`alog.tex`](alog.tex)

## Environment Setup

### The environment used in this assignment:

- OS: Linux Mint 22
- Python: 3.11.11

### Step 1. Clone this folder with `sparse-checkout`.

```bash
git clone --depth 1 --no-checkout https://github.com/devilhyt/nchu-stuff.git

cd nchu-stuff
git sparse-checkout init --cone
git sparse-checkout set "2025-spring/drl/hw3"
git checkout

cd 2025-spring/drl/hw3
```

### Step 2. Check the Python version.

```bash
python --version
```

### Step 3. Install all dependencies.

```bash
pip install -r requirements.txt
```

### Step 4. Open and view the [`main.ipynb`](main.ipynb) file.

This is the primary submission for the assignment.
