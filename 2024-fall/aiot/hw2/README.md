# HW2: Logistic regression - titanic or others (kaggle practice and confusion matrix)

![Kaggle Titanic](image/kaggle-titanic.png)

## Overview


The [`main.ipynb`](main.ipynb) file is the primary submission for the assignment, developed with the assistance of **GitHub Copilot**.


## Environment Setup

### The environment used in this assignment:
  - OS: Ubuntu 22.04.3 LTS
  - Python: 3.10.15

### Step 1. Clone this folder with `sparse-checkout`.
  ```bash
  git clone --depth 1 --no-checkout https://github.com/devilhyt/nchu-stuff.git

  cd nchu-stuff
  git sparse-checkout init --cone
  git sparse-checkout set "2024-fall/aiot/hw2"
  git checkout
  
  cd 2024-fall/aiot/hw2
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

## Result

### Kaggle Leaderboard
  ![score](image/score.png)

### Confusion matrix for the Test set (split from train.csv)
  ![Confusion matrix](image/confusion-matrix.png)
