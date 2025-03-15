document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let gridSize = 5;
    let gridData = [];
    let startSet = false;
    let endSet = false;
    let obstacleCount = 0;
    let maxObstacles = 0;
    let calculationDone = false;
    let robotAnimationId = null;
    let valueMap = [];
    let policyMap = [];
    let path = [];
    
    // DOM elements
    const gridSizeInput = document.getElementById('gridSize');
    const generateBtn = document.getElementById('generateBtn');
    const gridContainer = document.getElementById('gridContainer');
    const valueContainer = document.getElementById('valueContainer');
    const policyContainer = document.getElementById('policyContainer');
    const calcBtn = document.getElementById('calcBtn');
    const goBtn = document.getElementById('goBtn');
    const resetBtn = document.getElementById('resetBtn');
    const messageBox = document.getElementById('messageBox');
    
    // Initialize app
    generateBtn.addEventListener('click', generateGrid);
    calcBtn.addEventListener('click', calculateOptimalPolicy);
    goBtn.addEventListener('click', startRobotAnimation);
    resetBtn.addEventListener('click', resetGrid);
    
    // Generate initial grid
    generateGrid();
    
    // Function to generate the grid
    function generateGrid() {
        // Get grid size from input
        gridSize = parseInt(gridSizeInput.value);
        
        // Validate grid size
        if (isNaN(gridSize) || gridSize < 3 || gridSize > 9) {
            showMessage('Please enter a valid grid size between 3 and 9.', 'danger');
            return;
        }
        
        // Reset variables
        startSet = false;
        endSet = false;
        obstacleCount = 0;
        maxObstacles = gridSize - 2;
        calculationDone = false;
        valueMap = [];
        policyMap = [];
        path = [];
        
        // Reset grid data
        gridData = Array(gridSize).fill(null).map(() => Array(gridSize).fill('empty'));
        
        // Clear containers
        gridContainer.innerHTML = '';
        valueContainer.innerHTML = '';
        policyContainer.innerHTML = '';
        
        // Set grid template
        const gridTemplate = `repeat(${gridSize}, 1fr)`;
        gridContainer.style.gridTemplateColumns = gridTemplate;
        valueContainer.style.gridTemplateColumns = gridTemplate;
        policyContainer.style.gridTemplateColumns = gridTemplate;
        
        // Create grid cells
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                // Main grid
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', handleCellClick);
                gridContainer.appendChild(cell);
                
                // Value grid (placeholder)
                const valueCell = document.createElement('div');
                valueCell.className = 'grid-cell';
                valueCell.dataset.row = i;
                valueCell.dataset.col = j;
                valueContainer.appendChild(valueCell);
                
                // Policy grid (placeholder)
                const policyCell = document.createElement('div');
                policyCell.className = 'grid-cell';
                policyCell.dataset.row = i;
                policyCell.dataset.col = j;
                policyContainer.appendChild(policyCell);
            }
        }
        
        // Reset buttons
        goBtn.disabled = true;
        
        showMessage('Grid generated. Click on cells to set start, end, and obstacles.', 'info');
    }
    
    // Handle cell click to set start, end, and obstacles
    function handleCellClick(event) {
        if (calculationDone) {
            showMessage('Please reset the grid before making changes.', 'warning');
            return;
        }
        
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        
        // If cell already has a type, return
        if (gridData[row][col] !== 'empty') {
            return;
        }
        
        // Set cell type based on the current state
        if (!startSet) {
            gridData[row][col] = 'start';
            event.target.classList.add('start');
            startSet = true;
            showMessage('Start position set. Click to set end position.', 'info');
        } else if (!endSet) {
            gridData[row][col] = 'end';
            event.target.classList.add('end');
            endSet = true;
            showMessage(`End position set. Click to add obstacles (${obstacleCount}/${maxObstacles}).`, 'info');
        } else if (obstacleCount < maxObstacles) {
            gridData[row][col] = 'obstacle';
            event.target.classList.add('obstacle');
            obstacleCount++;
            
            if (obstacleCount === maxObstacles) {
                showMessage('All obstacles placed. Click CALC to calculate the optimal policy.', 'success');
            } else {
                showMessage(`Obstacle added. Remaining: ${maxObstacles - obstacleCount}`, 'info');
            }
        } else {
            showMessage('Maximum number of obstacles reached. Click CALC to proceed.', 'warning');
        }
    }
    
    // Calculate optimal policy
    function calculateOptimalPolicy() {
        // Check if start and end positions are set
        if (!startSet || !endSet) {
            showMessage('Please set both start and end positions before calculating.', 'warning');
            return;
        }
        
        // Send grid data to server for calculation
        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gridSize: gridSize,
                gridData: gridData
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server error');
            }
            return response.json();
        })
        .then(data => {
            // Update value and policy maps
            valueMap = data.valueMap;
            policyMap = data.policyMap;
            path = data.path;
            
            // Display value map
            updateValueMap();
            
            // Display policy map
            updatePolicyMap();
            
            // Enable GO button
            goBtn.disabled = false;
            calculationDone = true;
            
            showMessage('Calculation complete. Click GO to start the robot.', 'success');
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during calculation.', 'danger');
        });
    }
    
    // Update value map display
    function updateValueMap() {
        const valueCells = valueContainer.querySelectorAll('.grid-cell');
        
        valueCells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            // Display cell value
            const valueDiv = document.createElement('div');
            valueDiv.className = 'cell-value';
            valueDiv.textContent = valueMap[row][col].toFixed(2);
            
            cell.innerHTML = '';
            cell.appendChild(valueDiv);
            
            // Add background color based on value
            const normalizedValue = (valueMap[row][col] + 5) / 25; // Normalize to 0-1 range
            const r = Math.floor(255 * (1 - normalizedValue));
            const g = Math.floor(255 * normalizedValue);
            cell.style.backgroundColor = `rgba(${r}, ${g}, 200, 0.7)`;
        });
    }
    
    // Update policy map display
    function updatePolicyMap() {
        const policyCells = policyContainer.querySelectorAll('.grid-cell');
        
        policyCells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            // Display arrow for policy direction
            const arrow = document.createElement('div');
            arrow.className = 'arrow';
            
            switch (policyMap[row][col]) {
                case 'up':
                    arrow.innerHTML = '&#8593;'; // Up arrow
                    break;
                case 'right':
                    arrow.innerHTML = '&#8594;'; // Right arrow
                    break;
                case 'down':
                    arrow.innerHTML = '&#8595;'; // Down arrow
                    break;
                case 'left':
                    arrow.innerHTML = '&#8592;'; // Left arrow
                    break;
                default:
                    arrow.innerHTML = '&#9673;'; // Circle for end or obstacle
            }
            
            cell.innerHTML = '';
            cell.appendChild(arrow);
            
            // Color based on the original grid
            if (gridData[row][col] === 'start') {
                cell.style.backgroundColor = '#28a745';
            } else if (gridData[row][col] === 'end') {
                cell.style.backgroundColor = '#dc3545';
            } else if (gridData[row][col] === 'obstacle') {
                cell.style.backgroundColor = '#6c757d';
            } else {
                cell.style.backgroundColor = '#ffffff';
            }
        });
    }
    
    // Start robot animation
    function startRobotAnimation() {
        if (!calculationDone) {
            showMessage('Please calculate the optimal policy first.', 'warning');
            return;
        }
        
        // Clear any previous path highlights
        document.querySelectorAll('.path-highlight').forEach(cell => {
            cell.classList.remove('path-highlight');
        });
        
        // Disable buttons during animation
        goBtn.disabled = true;
        calcBtn.disabled = true;
        
        // Remove any existing robot
        const existingRobot = document.querySelector('.robot');
        if (existingRobot) {
            existingRobot.remove();
        }
        
        // Find start position
        let startRow, startCol;
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (gridData[i][j] === 'start') {
                    startRow = i;
                    startCol = j;
                    break;
                }
            }
        }
        
        // Create robot
        const robot = document.createElement('div');
        robot.className = 'robot';
        
        // Get the start cell
        const startCell = gridContainer.querySelector(`[data-row="${startRow}"][data-col="${startCol}"]`);
        startCell.appendChild(robot);
        
        // Animate robot along the path
        let pathIndex = 0;
        
        function animateRobot() {
            if (pathIndex < path.length - 1) {
                pathIndex++;
                const [nextRow, nextCol] = path[pathIndex];
                
                // Remove robot from current cell
                robot.remove();
                
                // Add robot to next cell
                const nextCell = gridContainer.querySelector(`[data-row="${nextRow}"][data-col="${nextCol}"]`);
                nextCell.appendChild(robot);
                
                // Highlight path
                if (gridData[nextRow][nextCol] !== 'end') {
                    nextCell.classList.add('path-highlight');
                }
                
                // Continue animation after delay
                robotAnimationId = setTimeout(animateRobot, 250);
            } else {
                showMessage('Robot reached the destination!', 'success');
                goBtn.disabled = false;
                calcBtn.disabled = false;
            }
        }
        
        // Start animation
        robotAnimationId = setTimeout(animateRobot, 250);
    }
    
    // Reset the grid
    function resetGrid() {
        // Stop robot animation if running
        if (robotAnimationId) {
            clearTimeout(robotAnimationId);
            robotAnimationId = null;
        }
        
        // Remove robot if exists
        const existingRobot = document.querySelector('.robot');
        if (existingRobot) {
            existingRobot.remove();
        }
        
        // Clear value and policy containers
        valueContainer.innerHTML = '';
        policyContainer.innerHTML = '';
        
        // Reset variables
        calculationDone = false;
        
        // Re-generate grid with current size
        generateGrid();
        
        showMessage('Grid reset. Start building your new grid world!', 'info');
    }
    
    // Show message in message box
    function showMessage(message, type) {
        messageBox.textContent = message;
        messageBox.className = `alert alert-${type}`;
        messageBox.style.display = 'block';
    }
});
