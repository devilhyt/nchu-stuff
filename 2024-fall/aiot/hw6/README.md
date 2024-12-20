# HW6: Transfer Learning and Hugging Face

| **HW6-1 Face mask detection** | **HW6-2 Stable-Diffusion** |
| :---------: | :---------: |
| ![face-mask-detection](image/face-mask-detection.png) | ![stable-diffusion](image/stable-diffusion.png) |


## Overview

The [`hw6-1.ipynb`](hw6-1.ipynb) and [`hw6-2.ipynb`](hw6-2.ipynb) files are the primary submission for the assignment, developed with the assistance of **GitHub Copilot**.


## Environment Setup

### The environment used in this assignment:
  - OS: Linux Mint 22
  - Python: 3.11.10

### Step 1. Clone this folder with `sparse-checkout`.
  ```bash
  git clone --depth 1 --no-checkout https://github.com/devilhyt/nchu-stuff.git

  cd nchu-stuff
  git sparse-checkout init --cone
  git sparse-checkout set "2024-fall/aiot/hw6"
  git checkout
  
  cd 2024-fall/aiot/hw6
  ```

### Step 2. Check the Python version.
  ```bash
  python --version
  ```
### Step 3. Install all dependencies.
  ```bash
  pip install -r requirements.txt
  ```
### Step 4. Download the dataset.
  ```bash
  git clone --depth 1 https://github.com/chauhanarpit09/Face-Mask-Detection-.git
  ```

### Step 5. Open and view the [`hw6-1.ipynb`](hw6-1.ipynb) and [`hw6-2.ipynb`](hw6-2.ipynb) files.
  These files are the primary submission for the assignment.

  > [!NOTE]
  > To visualize the training process and results, use `TensorBoard`.
