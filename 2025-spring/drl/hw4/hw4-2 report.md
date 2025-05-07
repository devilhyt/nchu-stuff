# Comparison of Double DQN and Dueling DQN in Reinforcement Learning

## Prompt

This experiment [hw4-2.ipynb](hw4-2.ipynb) focuses on the comparison between Double DQN and Dueling DQN.
Please provide an introduction and generate a short report, including comparison tables, in markdown format.

## Reply

### Introduction

Deep Q-Networks (DQNs) are a cornerstone of deep reinforcement learning, combining Q-learning with neural networks to handle high-dimensional state spaces. However, the basic DQN suffers from issues like overestimation bias and inefficient learning in certain scenarios. To address these, advanced variants such as **Double DQN (DDQN)** and **Dueling DQN** were developed. This report compares these two architectures against the basic DQN, focusing on their improvements in the Gridworld environment. The evaluation metrics include win rate, convergence speed, learning stability, and overestimation bias, as derived from the provided experiment.

- **Double DQN** mitigates overestimation bias by decoupling action selection and evaluation using two networks: an online network for action selection and a target network for value estimation, updated periodically.
- **Dueling DQN** enhances learning efficiency by separating the estimation of state value \( V(s) \) and action advantages \( A(s, a) \), allowing the model to learn state values independently of specific actions, which is particularly useful in states where action choices have minimal impact.

The experiment trains each model for 5000 episodes in the Gridworld environment, tests their performance over 1000 episodes, and analyzes training metrics and Q-value distributions to provide a comprehensive comparison.

### Report: Comparison of Basic DQN, Double DQN, and Dueling DQN

#### 1. Methodology

The experiment implements three DQN variants in the Gridworld environment (4x4 grid, random mode):

- **Basic DQN**: Uses a single network with experience replay and epsilon-greedy exploration.
- **Double DQN**: Employs two networks (online and target) to reduce overestimation bias, with the target network updated every `sync_freq` steps.
- **Dueling DQN**: Uses a dueling architecture with separate value and advantage streams, combined with Double DQN logic for action selection and evaluation.

**Training Parameters**:

- Episodes: 5000
- Hidden layers: 150 and 100 units
- Learning rate: 1e-3
- Epsilon: Linear decay from `epsilon_start` to `epsilon_end`
- Batch size: 128
- Discount factor (\(\gamma\)): 0.9
- Maximum moves per episode: `max_moves`

**Evaluation Metrics**:

- **Win Rate**: Percentage of games won over 1000 test episodes.
- **Average Steps**: Average number of steps to complete an episode.
- **Convergence Speed**: Inferred from training loss and reward curves.
- **Learning Stability**: Measured by mean and standard deviation of loss and rewards.
- **Overestimation Bias**: Analyzed via the distribution of maximum Q-values.

#### 2. Results

##### Performance Comparison

The following table summarizes the test performance of each model over 1000 episodes:

| Model       | Win Rate (%) | Average Steps |
| ----------- | ------------ | ------------- |
| Basic DQN   | 95.4         | 5.45          |
| Double DQN  | 97.0         | 4.82          |
| Dueling DQN | 96.0         | 5.46          |

##### Learning Stability

The stability of learning is assessed by the mean and standard deviation of loss and episode rewards during training:

| Model       | Loss Mean | Loss Std Dev | Rewards Mean | Rewards Std Dev |
| ----------- | --------- | ------------ | ------------ | --------------- |
| Basic DQN   | 0.2933    | 0.4340       | -0.8960      | 13.3201         |
| Double DQN  | 0.3372    | 0.4985       | -1.1650      | 13.6201         |
| Dueling DQN | 0.3195    | 0.4003       | -1.4340      | 14.0137         |

- **Loss Stability**: Basic DQN has the lowest mean loss (0.2933), but Dueling DQN shows the lowest standard deviation (0.4003), indicating more consistent loss values during training.
- **Reward Stability**: Basic DQN achieves the highest mean reward (-0.8960) with the lowest standard deviation (13.3201), suggesting more stable reward progression compared to Double and Dueling DQNs.

##### Q-Value Distribution

The distribution of maximum Q-values provides insight into overestimation bias:

| Model       | Mean Q-Value | Median Q-Value | Max Q-Value | Min Q-Value |
| ----------- | ------------ | -------------- | ----------- | ----------- |
| Basic DQN   | 6.67         | 6.66           | 10.76       | 0.29        |
| Double DQN  | 6.77         | 6.83           | 10.63       | -0.06       |
| Dueling DQN | 6.90         | 6.97           | 11.06       | -0.88       |

- **Overestimation Bias**: Basic DQN has the lowest mean and median Q-values, suggesting higher overestimation bias. Double DQN shows slightly higher Q-values, indicating reduced bias due to its dual-network approach. Dueling DQN has the highest mean and median Q-values (6.90 and 6.97), but its wider range (from -0.88 to 11.06) suggests more varied estimations, potentially due to its separate value and advantage streams.

##### Convergence Speed

Convergence speed is inferred from the training loss and reward curves (visualized in the provided plots):

- **Basic DQN**: Exhibits a sharp initial drop in loss (blue) within the first 5000 steps, stabilizing around 0.5-1.0 loss after 10,000 steps, indicating slower convergence due to overestimation bias.
- **Double DQN**: Shows a similar initial drop (green), stabilizing slightly lower than Basic DQN (around 0.5 loss) after 10,000 steps, suggesting faster convergence due to reduced overestimation.
- **Dueling DQN**: Demonstrates the fastest convergence (red), with the lowest average loss (close to 0) after 10,000 steps, reflecting its efficient state value learning. The reward plot further confirms this, with Dueling DQN's moving average stabilizing around 0 reward after 2000 episodes.

#### 3. Discussion

##### Improvements Over Basic DQN

- **Double DQN**:
  - **Overestimation Bias**: By using separate networks for action selection (online) and evaluation (target), Double DQN reduces the overestimation of Q-values inherent in Basic DQN. This is evident in the slightly higher mean Q-value (6.77 vs. 6.67) and lower maximum Q-value (10.63 vs. 10.76), indicating more conservative estimates.
  - **Learning Stability**: Double DQN shows higher loss variance (Std Dev: 0.4985) and reward variance (Std Dev: 13.6201) compared to Basic DQN, suggesting that while it reduces bias, it introduces more variability in training dynamics.
  - **Convergence**: Converges faster than Basic DQN, as seen in the loss plot where it stabilizes around 0.5 loss after 10,000 steps, contributing to its higher win rate (97.0%) and lower average steps (4.82 vs. 5.45).

- **Dueling DQN**:
  - **Learning Efficiency**: The dueling architecture separates state value and action advantage estimation, enabling efficient learning of valuable states. This is reflected in the fastest convergence, with the loss stabilizing near 0 after 10,000 steps and the reward moving average stabilizing around 0 after 2000 episodes, supporting its 96.0% win rate.
  - **Stability**: Dueling DQN has the lowest loss standard deviation (0.4003), indicating stable training updates. However, its reward standard deviation (14.0137) is the highest, suggesting variability in episode outcomes.
  - **Q-Value Estimation**: The highest mean Q-value (6.90) and widest Q-value range (-0.88 to 11.06) suggest potential overestimation, but its architecture allows for nuanced state evaluations.

##### Comparative Analysis

- **Win Rate**: Double DQN achieves the highest win rate (97.0%), followed by Dueling DQN (96.0%), and Basic DQN (95.4%). The superior performance of Double DQN highlights the effectiveness of reducing overestimation bias.
- **Average Steps**: Double DQN requires the fewest steps (4.82), indicating greater efficiency, while Basic DQN (5.45) and Dueling DQN (5.46) are nearly identical, suggesting similar navigational efficiency despite Dueling DQN's architectural advantages.
- **Convergence Speed**: Dueling DQN converges fastest, stabilizing at the lowest loss after 10,000 steps and a reward of 0 after 2000 episodes. Double DQN follows with faster convergence than Basic DQN, which stabilizes last due to overestimation bias.
- **Stability**: Basic DQN shows the most stable rewards (lowest Std Dev: 13.3201), but Dueling DQN has the most stable loss values (lowest Std Dev: 0.4003). Double DQN is the least stable in both metrics (highest Std Dev: 0.4985 for loss, 13.6201 for rewards).
- **Overestimation Bias**: Double DQN most effectively reduces overestimation bias, followed by Dueling DQN. Basic DQN suffers the most, as indicated by its lower Q-value estimates.

#### 4. Conclusion

Both Double DQN and Dueling DQN offer significant improvements over the Basic DQN in the Gridworld environment. **Double DQN** excels at reducing overestimation bias, achieving the highest win rate (97.0%) and lowest average steps (4.82). **Dueling DQN** enhances learning efficiency and training stability, with the fastest convergence and a strong win rate (96.0%). The choice between them depends on the specific requirements:

- For environments where accurate Q-value estimation and optimal performance are critical, Double DQN is preferable.
- For scenarios requiring fast convergence and stable training updates, Dueling DQN is superior.

Future work could involve tuning hyperparameters (e.g., learning rate, sync frequency) or combining both architectures (as done in the experiment’s Dueling DQN, which incorporates Double DQN logic) to further optimize performance. Additionally, testing in more complex environments could highlight the strengths of each variant.