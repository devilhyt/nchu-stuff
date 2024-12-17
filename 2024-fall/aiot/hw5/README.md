# HW5: Deep Learning basics

![mnist](image/mnist.png)
![cifar10](image/cifar10.png)

## Overview

The [`hw5-1.ipynb`](hw5-1.ipynb), [`hw5-2.ipynb`](hw5-2.ipynb) and [`hw5-3.ipynb`](hw5-3.ipynb) files are the primary submission for the assignment, developed with the assistance of **GitHub Copilot**.


## Environment Setup

### The environment used in this assignment:
  - OS: Linux Mint 22
  - Python: 3.11.10

### Step 1. Clone this folder with `sparse-checkout`.
  ```bash
  git clone --depth 1 --no-checkout https://github.com/devilhyt/nchu-stuff.git

  cd nchu-stuff
  git sparse-checkout init --cone
  git sparse-checkout set "2024-fall/aiot/hw5"
  git checkout
  
  cd 2024-fall/aiot/hw5
  ```

### Step 2. Check the Python version.
  ```bash
  python --version
  ```
### Step 3. Install all dependencies.
  ```bash
  pip install -r requirements.txt
  ```
### Step 4. Open and view the [`hw5-1.ipynb`](hw5-1.ipynb), [`hw5-2.ipynb`](hw5-2.ipynb) and [`hw5-3.ipynb`](hw5-3.ipynb) files.
  These files are the primary submission for the assignment.

  > [!NOTE]
  > To visualize the training process and results, use `TensorBoard`. Logs for each sub-task are stored in the respective `logs5-*` folders.
