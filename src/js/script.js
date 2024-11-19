// script.js

// ---------------------------
// Sliding Navigation Bar Functionality
// ---------------------------

// Get the navigation bar
const sideNav = document.getElementById('sideNav');

// Get the open and close buttons
const openNavBtn = document.getElementById('openNav');
const closeNavBtn = document.getElementById('closeNav');

// Function to open the side navigation
const openNav = () => {
    sideNav.style.width = '250px';
};

// Function to close the side navigation
const closeNav = () => {
    sideNav.style.width = '0';
};

// Event listeners for open and close buttons
openNavBtn.addEventListener('click', openNav);
closeNavBtn.addEventListener('click', closeNav);

// ---------------------------
// Modal Functionality
// ---------------------------

const modal = document.getElementById('nodeModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeButton = document.querySelector('.close-button');

// Close modal when the close button is clicked
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// ---------------------------
// 1. Interactive Algorithm Visualizer: Bubble Sort
// ---------------------------

const bubbleSortContainer = document.getElementById('bubble-sort-container');
let array = [];

// Initialize the array with random values
const initializeArray = (size = 20) => {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
    renderArray();
};

// Render the array as bars
const renderArray = () => {
    bubbleSortContainer.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 2}px`;
        bar.style.width = `${Math.floor(bubbleSortContainer.clientWidth / array.length) - 4}px`;
        bar.style.margin = '2px';
        bar.style.backgroundColor = 'var(--tree-color-right)'; // Indigo
        bar.setAttribute('data-index', index);
        bubbleSortContainer.appendChild(bar);
    });
};

// Bubble Sort Algorithm with Visualization
const bubbleSort = async () => {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            // Highlight the bars being compared
            bars[j].style.backgroundColor = 'var(--tree-color-left)'; // Coral
            bars[j + 1].style.backgroundColor = 'var(--tree-color-left)'; // Coral

            await sleep(300); // Pause for visualization

            if (array[j] > array[j + 1]) {
                // Swap in the array
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                // Swap in the DOM
                bars[j].style.height = `${array[j] * 2}px`;
                bars[j + 1].style.height = `${array[j + 1] * 2}px`;
            }

            // Reset the color
            bars[j].style.backgroundColor = 'var(--tree-color-right)'; // Indigo
            bars[j + 1].style.backgroundColor = 'var(--tree-color-right)'; // Indigo
        }
        // Mark the last element as sorted
        bars[array.length - i - 1].style.backgroundColor = 'var(--soft-green)'; // Soft Green
    }
};

// Utility function to pause execution
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Event Listeners for Buttons
const startSortBtn = document.getElementById('start-sort');
const resetSortBtn = document.getElementById('reset-sort');

if (startSortBtn && resetSortBtn) {
    startSortBtn.addEventListener('click', () => {
        bubbleSort();
    });

    resetSortBtn.addEventListener('click', () => {
        initializeArray();
    });
}

// Initialize on page load
if (bubbleSortContainer) {
    initializeArray();
}

// ---------------------------
// 2. Data Structure Explorer: Binary Trees using D3.js
// ---------------------------

const binaryTreeContainer = document.getElementById('binary-tree-container');

// Sample Binary Tree Data
const treeDataLeft = {
    name: "Root A",
    children: [
        { name: "Child A1" },
        { 
            name: "Child A2",
            children: [
                { name: "Grandchild A2.1" },
                { name: "Grandchild A2.2" }
            ]
        }
    ]
};

const treeDataRight = {
    name: "Root B",
    children: [
        { name: "Child B1" },
        { 
            name: "Child B2",
            children: [
                { name: "Grandchild B2.1" },
                { name: "Grandchild B2.2" }
            ]
        }
    ]
};

// Function to create a Binary Tree
const createBinaryTree = (data, containerId, treeColor) => {
    const container = document.getElementById(containerId);
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Remove any existing SVG (to prevent duplication)
    container.innerHTML = '';

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "transparent");

    const root = d3.hierarchy(data);

    const treeLayout = d3.tree().size([width - 100, height - 100]);

    treeLayout(root);

    // Draw links (edges)
    svg.selectAll('.link')
        .data(root.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x))
        .attr('stroke', treeColor.linkColor)
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    // Draw nodes
    const node = svg.selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`)
        .on('click', (event, d) => {
            openModal(d.data);
        });

    node.append('circle')
        .attr('r', 20)
        .attr('fill', treeColor.nodeColor)
        .attr('stroke', treeColor.borderColor)
        .attr('stroke-width', 2);

    node.append('text')
        .attr('dy', 5)
        .attr('text-anchor', 'middle')
        .text(d => d.data.name)
        .attr('fill', '#656565')
        .style('pointer-events', 'none');
};

// Initialize both Binary Trees
const initializeBinaryTrees = () => {
    if (binaryTreeContainer) {
        createBinaryTree(treeDataLeft, 'binary-tree-container', {
            nodeColor: '#FF6F61', // Coral
            linkColor: '#FF6F61',
            borderColor: '#FFB6B3'
        });

        createBinaryTree(treeDataRight, 'binary-tree-container', {
            nodeColor: '#6B5B95', // Indigo
            linkColor: '#6B5B95',
            borderColor: '#B3A2D0'
        });
    }
};

// Initialize Binary Trees on page load
initializeBinaryTrees();

// ---------------------------
// 3. Complexity Comparison Dashboard using Chart.js
// ---------------------------

// Complexity Data
const complexityData = {
    "Bubble Sort": {
        time: "O(n²)",
        space: "O(1)"
    },
    "Quick Sort": {
        time: "O(n log n)",
        space: "O(log n)"
    },
    "Merge Sort": {
        time: "O(n log n)",
        space: "O(n)"
    },
    // Add more algorithms and their complexities here
};

// Initialize Chart.js Charts
let timeChart, spaceChart;

const initializeCharts = () => {
    const ctxTime = document.getElementById('time-complexity-chart').getContext('2d');
    const ctxSpace = document.getElementById('space-complexity-chart').getContext('2d');

    timeChart = new Chart(ctxTime, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Time Complexity',
                data: [],
                backgroundColor: '#6B5B95', // Indigo
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            return `${label}: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Big O Notation'
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            const notation = reverseParseComplexity(value);
                            return notation;
                        }
                    }
                }
            }
        }
    });

    spaceChart = new Chart(ctxSpace, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Space Complexity',
                data: [],
                backgroundColor: '#FF6F61', // Coral
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            return `${label}: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Big O Notation'
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            const notation = reverseParseComplexity(value);
                            return notation;
                        }
                    }
                }
            }
        }
    });
};

// Function to Compare Complexities
const compareComplexities = () => {
    const algo1 = document.getElementById('algorithm-select-1').value;
    const algo2 = document.getElementById('algorithm-select-2').value;

    if (!algo1 || !algo2) {
        alert('Please select two algorithms to compare.');
        return;
    }

    const labels = [algo1, algo2];
    const timeData = [parseComplexity(complexityData[algo1].time), parseComplexity(complexityData[algo2].time)];
    const spaceData = [parseComplexity(complexityData[algo1].space), parseComplexity(complexityData[algo2].space)];

    // Update Time Complexity Chart
    timeChart.data.labels = labels;
    timeChart.data.datasets[0].data = timeData;
    timeChart.update();

    // Update Space Complexity Chart
    spaceChart.data.labels = labels;
    spaceChart.data.datasets[0].data = spaceData;
    spaceChart.update();
};

// Utility function to parse Big O Notation to numerical values for visualization
const parseComplexity = (notation) => {
    // Simple mapping for demonstration purposes
    const mapping = {
        "O(1)": 1,
        "O(log n)": 2,
        "O(n)": 3,
        "O(n log n)": 4,
        "O(n²)": 5,
        "O(n³)": 6,
        // Add more mappings as needed
    };
    return mapping[notation] || 0;
};

// Reverse mapping to display Big O Notation on y-axis
const reverseParseComplexity = (value) => {
    const reverseMapping = {
        1: "O(1)",
        2: "O(log n)",
        3: "O(n)",
        4: "O(n log n)",
        5: "O(n²)",
        6: "O(n³)",
        // Add more mappings as needed
    };
    return reverseMapping[value] || '';
};

// Event Listener for Compare Button
const compareBtn = document.getElementById('compare-button');

if (compareBtn) {
    compareBtn.addEventListener('click', compareComplexities);
}

// Initialize Charts on page load
initializeCharts();

// ---------------------------
// 3. Data Structure Explorer: Binary Trees using D3.js
// ---------------------------

// Note: Binary Trees are already initialized earlier in the script.

// ---------------------------
// 4. Complexity Comparison Dashboard
// ---------------------------

// The complexity dashboard functionalities are handled above.

// ---------------------------
// 5. Initialize Other Functionalities on Specific Pages
// ---------------------------

// For pages like algorithm-visualizer.html, data-structure-explorer.html, etc., ensure that their specific scripts are initialized there.

// Example for algorithm-visualizer.html:

/*
// Inside algorithm-visualizer.html
<script src="js/script.js"></script>
<script>
    // Initialize specific functionalities if needed
</script>
*/


