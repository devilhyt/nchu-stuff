Create a Flask App for Reinforcement Learning Grid Map

Feature Requirements:
1. Map Generation
  - Users can input the map size n (range: 3 to 9) to generate an n*n grid map.

2. Map Editing
  - Users can click on the grid cells to set the starting point, endpoint, and obstacles:
    - Starting Point (Green, 1 item)
    - Endpoint (Red, 1 item)
    - Obstacles (Gray, n-2 items)

3. Reward Settings
  - Endpoint: 20
  - Obstacles: -5
  - Others: -0.1

4. Optimal Path Calculation
  - Use Value Function and Value Iteration to compute the value of each grid cell.
  - Generate the optimal movement policy based on the computed results.

5. Result Display
  - Button: CALC
    - Upon clicking, calculate the optimal path.
  - Button: GO
    - Upon clicking, the robot moves from the starting point to the endpoint according to the optimal policy and displays the movement process (with optional animations).
  - Button: RESET
    - Upon clicking, the map resets to its initial state, allowing users to reselect the starting point, endpoint, and obstacles.
    - If pressed during the GO process, the robot immediately stops moving and is removed, and the map returns to its initial state.

6. Result Visualization
  - Value Function Map: Display a map showing the computed value of each grid cell (with numerical labels).
  - Policy Map: Display a map indicating the optimal movement direction for each grid cell (with arrow markers).

7. UI Enhancement
  - Use Bootstrap for UI styling.
  - Automatically adapt to different screen sizes and aspect ratios.
  - Add CSS animations where appropriate.
