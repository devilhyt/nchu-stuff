# HW4-3: Enhance DQN for random mode With Training Tips

## Introduction

In this experiment, we refactor the classic Deep Q-Network (DQN) agent for the Gridworld environment using PyTorch Lightning. The main improvements over the baseline implementation are:

- **PyTorch Lightning Integration:** Modularizes training, improves reproducibility, and simplifies experiment management.
- **Deeper Network Architecture:** Adds an extra linear layer to the Q-network for better representation learning.
- **Learning Rate Scheduler:** Reduces the learning rate by half at 4/5 of the total epochs to fine-tune the model and stabilize convergence.
- **Experience Replay & Wall Penalty:** Retains the improved experience replay and wall-avoidance mechanism from the enhanced DQN (程式 3.5 改良版).

## Experiment Summary

| Feature                 | Baseline DQN (程式 3.5 改良版) | Enhanced DQN (This Work) |
| ----------------------- | ------------------------------ | ------------------------ |
| Framework               | PyTorch                        | PyTorch Lightning        |
| Network Depth           | 3 Linear Layers                | 4 Linear Layers          |
| Experience Replay       | Yes                            | Yes                      |
| Wall Penalty            | Yes                            | Yes                      |
| Learning Rate Scheduler | No                             | Yes (0.5× at 4/5 epochs) |
| Training Management     | Manual                         | Automated (Lightning)    |
| Logging                 | Manual print/plot              | Lightning logging        |

## Training Results

- **Loss Curve:** The training loss decreases over time, indicating successful learning and convergence.
- **Win Rate:** After training, the enhanced DQN achieves a high win percentage in the random Gridworld mode.

| Metric         | Baseline DQN (程式 3.5 改良版) | Enhanced DQN (This Work) |
| -------------- | ------------------------------ | ------------------------ |
| Final Win Rate | ~97%                           | ~98%                     |
| Total Epochs   | 5000                           | 5000                     |
| Final LR       | 0.001 (fixed)                  | 0.0005 (after decay)     |

## Key Takeaways

- **PyTorch Lightning** streamlines the training loop, making the code more maintainable and scalable for future experiments.
- **Deeper Q-Networks** can capture more complex state-action relationships, potentially improving policy quality.
- **Learning Rate Scheduling** helps avoid local minima and overfitting, especially in the later stages of training.
- **Wall Penalty** encourages the agent to avoid invalid moves, speeding up learning.

## Conclusion

This experiment demonstrates that combining PyTorch Lightning, deeper networks, and training techniques like learning rate scheduling can significantly enhance DQN performance and code quality for reinforcement learning tasks in Gridworld.
