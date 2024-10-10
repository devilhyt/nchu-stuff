# HW1-1: write python to solve simple linear regression problem, following CRISP-DM

## Overview

The main program is located in [`main.ipynb`](main.ipynb), using **GitHub Copilot** for assistance.

Since the assignment requires setting up a Flask server, some of the code is placed in [`app.py`](app.py). For more details, please refer to the description in [`main.ipynb`](main.ipynb).

## Environment Setup

- The environment used in this project:
  - OS：Ubuntu 22.04.3 LTS
  - Python：3.10.15

- Check the Python version
  ```bash
  python --version
  ```
- Install all dependencies
  ```bash
  pip install -r requirements.txt
  ```
- Run Flask Server

  Before running this command. Please ensure that you are in the directory where [`app.py`](app.py) is located.
  ```bash
  flask run 
  ```
  The server is running on http://127.0.0.1:5000