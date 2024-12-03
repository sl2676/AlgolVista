// script.js

/* =========================================
   1. Sliding Navigation Bar Functionality
   ========================================= */
(function() {
    // Get the navigation bar and buttons
    const sideNav = document.getElementById('sideNav');
    const openNavBtn = document.getElementById('openNav');
    const closeNavBtn = document.getElementById('closeNav');

    // Function to open the side navigation
    const openNav = () => {
        if (sideNav) {
            sideNav.style.width = '250px';
        } else {
            console.warn('sideNav element not found.');
        }
    };

    // Function to close the side navigation
    const closeNav = () => {
        if (sideNav) {
            sideNav.style.width = '0';
        } else {
            console.warn('sideNav element not found.');
        }
    };

    // Attach event listeners if elements exist
    if (openNavBtn && closeNavBtn && sideNav) {
        openNavBtn.addEventListener('click', openNav);
        closeNavBtn.addEventListener('click', closeNav);
    } else {
        console.warn('Navigation elements not found. Ensure IDs are correct.');
    }
})();

/* =========================================
   4. Data Structure Explorer
   ========================================= */
(function() {
    // Supported Data Structures
    const dataStructures = [
        'Binary Tree',
        'Binary Search Tree',
        'Linked List',
        'Stack',
        'Queue',
        'Graph',
        'Heap',
        'Hash Table',
        'Trie',
        'Red-Black Tree'
    ];

    const treeContainer = document.getElementById('tree-container');
    const structureSelect = document.getElementById('data-structure-select');
    const descriptionContainer = document.getElementById('data-structure-description');

    if (treeContainer && structureSelect && descriptionContainer) {
        // Sample Data for Different Data Structures
        const data = {
            'Binary Tree': {
                name: "Root",
                children: [
                    {
                        name: "Left Child",
                        children: [
                            { name: "Left Grandchild" },
                            { name: "Right Grandchild" }
                        ]
                    },
                    { name: "Right Child" }
                ]
            },
            'Binary Search Tree': {
                name: "50",
                children: [
                    {
                        name: "30",
                        children: [
                            { name: "20" },
                            { name: "40" }
                        ]
                    },
                    {
                        name: "70",
                        children: [
                            { name: "60" },
                            { name: "80" }
                        ]
                    }
                ]
            },
            'Linked List': {
                name: "Head",
                children: [
                    { name: "Node 1" },
                    { name: "Node 2" },
                    { name: "Node 3" },
                    { name: "Tail" }
                ]
            },
            'Stack': {
                name: "Top",
                children: [
                    { name: "Element 3" },
                    { name: "Element 2" },
                    { name: "Element 1" }
                ]
            },
            'Queue': {
                name: "Front",
                children: [
                    { name: "Element 1" },
                    { name: "Element 2" },
                    { name: "Element 3" },
                    { name: "Rear" }
                ]
            },
            'Graph': {
                nodes: [
                    { id: "A" },
                    { id: "B" },
                    { id: "C" },
                    { id: "D" },
                    { id: "E" }
                ],
                links: [
                    { source: "A", target: "B" },
                    { source: "A", target: "C" },
                    { source: "B", target: "D" },
                    { source: "C", target: "D" },
                    { source: "D", target: "E" }
                ]
            },
            'Heap': {
                name: "100",
                children: [
                    {
                        name: "50",
                        children: [
                            { name: "30" },
                            { name: "20" }
                        ]
                    },
                    {
                        name: "40",
                        children: [
                            { name: "35" },
                            { name: "10" }
                        ]
                    }
                ]
            },
            'Hash Table': {
                name: "Hash Table",
                children: [
                    { name: "Index 0: Key1" },
                    { name: "Index 1: Key2" },
                    { name: "Index 2: Key3" },
                    { name: "Index 3: Key4" }
                ]
            },
            'Trie': {
                name: "",
                children: [
                    {
                        name: "a",
                        children: [
                            { name: "p", children: [{ name: "p", children: [{ name: "l", children: [{ name: "e", isWord: true }] }] }] },
                            { name: "n", children: [{ name: "t", isWord: true }] }
                        ]
                    },
                    {
                        name: "b",
                        children: [
                            { name: "a", children: [{ name: "t", isWord: true }] }
                        ]
                    }
                ]
            },
            'Red-Black Tree': {
                name: "10 (Black)",
                children: [
                    {
                        name: "5 (Red)",
                        children: [
                            { name: "3 (Black)" },
                            { name: "7 (Black)" }
                        ]
                    },
                    {
                        name: "15 (Red)",
                        children: [
                            { name: "13 (Black)" },
                            { name: "17 (Black)" }
                        ]
                    }
                ]
            }
        };

        // Descriptions for Data Structures
        const descriptions = {
            'Binary Tree': 'A tree data structure in which each node has at most two children, referred to as the left child and the right child.',
            'Binary Search Tree': 'A binary tree where the left subtree contains only nodes with keys less than the parent node, and the right subtree only nodes with keys greater than the parent node.',
            'Linked List': 'A linear collection of data elements where each element points to the next, allowing for efficient insertion and removal of elements.',
            'Stack': 'A linear data structure that follows the Last In First Out (LIFO) principle.',
            'Queue': 'A linear data structure that follows the First In First Out (FIFO) principle.',
            'Graph': 'A collection of nodes connected by edges.',
            'Heap': 'A special tree-based data structure that satisfies the heap property.',
            'Hash Table': 'A data structure that implements an associative array, a structure that can map keys to values.',
            'Trie': 'A tree-like data structure used to store dynamic sets or associative arrays where the keys are usually strings.',
            'Red-Black Tree': 'A type of self-balancing binary search tree where each node has an extra bit for denoting the color of the node, either red or black.'
        };

        // Event Listener for Data Structure Selection
        structureSelect.addEventListener('change', (e) => {
            const selectedStructure = e.target.value;
            if (selectedStructure !== '') {
                // Update Description
                descriptionContainer.innerHTML = `
                    <h4>Description:</h4>
                    <p>${descriptions[selectedStructure]}</p>
                `;

                // Create Visualization
                createDataStructure(selectedStructure, 'tree-container');
            } else {
                // Clear Visualization and Description
                treeContainer.innerHTML = '';
                descriptionContainer.innerHTML = `
                    <h4>Description:</h4>
                    <p>Select a data structure to view its description and usage scenarios.</p>
                `;
            }
        });

        // Function to create Data Structure Visualization using D3.js
        const createDataStructure = (structure, containerId) => {
            const container = document.getElementById(containerId);
            if (!container) {
                console.warn(`Container with ID '${containerId}' not found.`);
                return;
            }

            const structureData = data[structure];

            if (!structureData) {
                console.warn(`Data for '${structure}' not found.`);
                return;
            }

            // Clear existing SVG
            container.innerHTML = '';

            if (structure === 'Graph') {
                createGraph(structureData, containerId);
            } else {
                createTree(structureData, containerId);
            }
        };

        // Function to create Tree Structures with Zoom and Pan
        const createTree = (data, containerId) => {
            const container = document.getElementById(containerId);
            const width = container.clientWidth;
            const height = 500;

            // Create SVG and attach zoom behavior
            const svg = d3.select(`#${containerId}`)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .call(d3.zoom().on("zoom", function (event) {
                    g.attr("transform", event.transform);
                }));

            const g = svg.append("g"); // Container for all elements

            const root = d3.hierarchy(data);

            const treeLayout = d3.tree().size([height - 100, width - 100]);

            treeLayout(root);

            // Draw links
            g.selectAll('.link')
                .data(root.links())
                .enter()
                .append('path')
                .attr('class', 'link')
                .attr('d', d3.linkVertical()
                    .x(d => d.x)
                    .y(d => d.y))
                .attr('stroke', '#6B5B95')
                .attr('stroke-width', 2)
                .attr('fill', 'none');

            // Draw nodes
            const node = g.selectAll('.node')
                .data(root.descendants())
                .enter()
                .append('g')
                .attr('class', 'node')
                .attr('transform', d => `translate(${d.x},${d.y})`)
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

            node.append('circle')
                .attr('r', 20)
                .attr('fill', d => {
                    if (d.data.name && d.data.name.includes('(Red)')) {
                        return '#FF6F61'; // Red-Black Tree Red Node
                    } else if (d.data.name && d.data.name.includes('(Black)')) {
                        return '#000000'; // Red-Black Tree Black Node
                    } else {
                        return '#6B5B95';
                    }
                })
                .attr('stroke', '#B3A2C7')
                .attr('stroke-width', 2);

            node.append('text')
                .attr('dy', 5)
                .attr('text-anchor', 'middle')
                .text(d => d.data.name.replace(/\s*\(Red\)|\s*\(Black\)/, ''))
                .attr('fill', '#fff')
                .style('pointer-events', 'none');

            // Drag functions for nodes
            function dragstarted(event, d) {
                event.sourceEvent.stopPropagation();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
                d3.select(this).attr('transform', `translate(${d.fx},${d.fy})`);
            }

            function dragended(event, d) {
                d.fx = null;
                d.fy = null;
            }
        };

        // Function to create Graph Structures with Zoom and Pan
        const createGraph = (data, containerId) => {
            const container = document.getElementById(containerId);
            const width = container.clientWidth;
            const height = 500;

            // Create SVG and attach zoom behavior
            const svg = d3.select(`#${containerId}`)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .call(d3.zoom().on("zoom", function (event) {
                    g.attr("transform", event.transform);
                }));

            const g = svg.append("g"); // Container for all elements

            const simulation = d3.forceSimulation(data.nodes)
                .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
                .force("charge", d3.forceManyBody().strength(-400))
                .force("center", d3.forceCenter(width / 2, height / 2));

            // Draw links
            const link = g.selectAll(".link")
                .data(data.links)
                .enter()
                .append("line")
                .attr("class", "link")
                .attr("stroke", "#999")
                .attr("stroke-width", 2);

            // Draw nodes
            const node = g.selectAll(".node")
                .data(data.nodes)
                .enter()
                .append("g")
                .attr("class", "node")
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

            node.append("circle")
                .attr("r", 20)
                .attr("fill", "#6B5B95");

            node.append("text")
                .attr("dy", 5)
                .attr("text-anchor", "middle")
                .text(d => d.id)
                .attr("fill", '#fff')
                .style('pointer-events', 'none');

            simulation
                .nodes(data.nodes)
                .on("tick", ticked);

            simulation.force("link")
                .links(data.links);

            function ticked() {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                node
                    .attr("transform", d => `translate(${d.x},${d.y})`);
            }

            // Drag functions for nodes
            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
        };
    } else {
        console.warn('Data Structure Explorer elements not found on this page.');
    }
})();


/* =========================================
   3. Complexity Comparison Dashboard
   ========================================= */
(function() {
    const complexityData = {
        "Bubble Sort": {
            time: "O(n²)",
            space: "O(1)",
            timeFunction: (n) => n ** 2,
            spaceFunction: () => 1
        },
        "Quick Sort": {
            time: "O(n log n)",
            space: "O(log n)",
            timeFunction: (n) => n * Math.log2(n),
            spaceFunction: (n) => Math.log2(n)
        },
        "Merge Sort": {
            time: "O(n log n)",
            space: "O(n)",
            timeFunction: (n) => n * Math.log2(n),
            spaceFunction: (n) => n
        },
        // Add more algorithms as needed
        "Insertion Sort": {
            time: "O(n²)",
            space: "O(1)",
            timeFunction: (n) => n ** 2,
            spaceFunction: () => 1
        },
        "Selection Sort": {
            time: "O(n²)",
            space: "O(1)",
            timeFunction: (n) => n ** 2,
            spaceFunction: () => 1
        },
        "Heap Sort": {
            time: "O(n log n)",
            space: "O(1)",
            timeFunction: (n) => n * Math.log2(n),
            spaceFunction: () => 1
        },
        "Counting Sort": {
            time: "O(n + k)",
            space: "O(k)",
            timeFunction: (n, k) => n + k,
            spaceFunction: (k) => k
        },
        "Radix Sort": {
            time: "O(nk)",
            space: "O(n + k)",
            timeFunction: (n, k) => n * k,
            spaceFunction: (n, k) => n + k
        },
        "Shell Sort": {
            time: "O(n (log n)²)",
            space: "O(1)",
            timeFunction: (n) => n * (Math.log2(n)) ** 2,
            spaceFunction: () => 1
        },
        "Cocktail Shaker Sort": {
            time: "O(n²)",
            space: "O(1)",
            timeFunction: (n) => n ** 2,
            spaceFunction: () => 1
        }
    };

    // Generate Algorithm List in Sidebar
    const algorithmList = document.getElementById('algorithm-checkboxes');
    const selectedAlgorithms = [];

    if (algorithmList) {
        for (let algo in complexityData) {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = algo;
            checkbox.id = `checkbox-${algo.replace(/\s+/g, '-')}`;
            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = algo;
            li.appendChild(checkbox);
            li.appendChild(label);
            algorithmList.appendChild(li);

            // Event Listener for Checkbox
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    selectedAlgorithms.push(algo);
                } else {
                    const index = selectedAlgorithms.indexOf(algo);
                    if (index > -1) {
                        selectedAlgorithms.splice(index, 1);
                    }
                }
                updateChart();
                updateBigONotation();
            });
        }
    } else {
        console.warn('Algorithm list element not found.');
    }

    // Initialize Chart.js Chart
    let complexityChart;

    const initializeChart = () => {
        const ctx = document.getElementById('complexity-chart');
        if (ctx) {
            complexityChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [], // Input sizes
                    datasets: []
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Input Size (n)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Operations Count'
                            },
                            type: 'logarithmic',
                            min: 1,
                            ticks: {
                                callback: function(value, index, values) {
                                    return Number(value.toString());
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    return `${context.dataset.label}: ${Math.round(context.parsed.y)}`;
                                }
                            }
                        }
                    }
                }
            });
        } else {
            console.warn('Complexity chart canvas not found.');
        }
    };

    // Function to Update Chart
    const updateChart = () => {
        if (!complexityChart) return;

        const nValues = [];
        for (let i = 10; i <= 1000; i += 10) {
            nValues.push(i);
        }

        complexityChart.data.labels = nValues;
        complexityChart.data.datasets = [];

        selectedAlgorithms.forEach(algo => {
            const algoData = complexityData[algo];
            const dataPoints = nValues.map(n => {
                if (algo === 'Counting Sort' || algo === 'Radix Sort') {
                    // Assume k = n for simplicity
                    return algoData.timeFunction(n, n);
                } else {
                    return algoData.timeFunction(n);
                }
            });

            complexityChart.data.datasets.push({
                label: `${algo}`,
                data: dataPoints,
                borderColor: getRandomColor(),
                fill: false
            });
        });

        complexityChart.update();
    };

    // Function to Update Big O Notation Display
    const updateBigONotation = () => {
        const bigOContainer = document.getElementById('big-o-container');
        if (!bigOContainer) {
            console.warn('Big O container not found.');
            return;
        }
        bigOContainer.innerHTML = '';

        selectedAlgorithms.forEach(algo => {
            const algoData = complexityData[algo];
            const card = document.createElement('div');
            card.classList.add('big-o-card');
            const title = document.createElement('h5');
            title.textContent = algo;
            const timeComplexity = document.createElement('p');
            timeComplexity.innerHTML = `<strong>Time Complexity:</strong> ${algoData.time}`;
            const spaceComplexity = document.createElement('p');
            spaceComplexity.innerHTML = `<strong>Space Complexity:</strong> ${algoData.space}`;
            card.appendChild(title);
            card.appendChild(timeComplexity);
            card.appendChild(spaceComplexity);
            bigOContainer.appendChild(card);
        });
    };

    // Utility Function to Get Random Color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Initialize Chart on Page Load
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('complexity-chart')) {
            initializeChart();
        }
    });
})();


/* =========================================
   2. Algorithm Visualizer
   ========================================= */
(function () {
    // Supported Sorting Algorithms
    const sortingAlgorithms = [
        'Bubble Sort',
        'Quick Sort',
        'Merge Sort',
        'Insertion Sort',
        'Selection Sort',
        'Heap Sort',
        'Counting Sort',
        'Radix Sort',
        'Shell Sort',
        'Cocktail Shaker Sort',
    ];

    // Initialize Array and Visualization Elements
    const sortContainer = document.getElementById('visualizer-container'); // Matches HTML
    const startSortBtn = document.getElementById('start-visualizer'); // Matches HTML
    const resetSortBtn = document.getElementById('reset-visualizer'); // Matches HTML
    const algorithmSelect = document.getElementById('algorithm-select'); // Matches HTML

    if (sortContainer && startSortBtn && resetSortBtn && algorithmSelect) {
        // Populate Algorithm Dropdown
        sortingAlgorithms.forEach((algo) => {
            const option = document.createElement('option');
            option.value = algo;
            option.textContent = algo;
            algorithmSelect.appendChild(option);
        });

        let sortArray = [];

        // Initialize the array with random values
        const initializeSortArray = (size = 50) => {
            sortArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
            renderSortArray();
        };

        // Render the array as bars
        const renderSortArray = () => {
            sortContainer.innerHTML = '';
            const containerWidth = sortContainer.clientWidth;
            const barWidth = Math.floor(containerWidth / sortArray.length) - 2;

            sortArray.forEach((value) => {
                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${value * 3}px`;
                bar.style.width = `${barWidth}px`;
                bar.style.margin = '1px';
                bar.style.backgroundColor = '#6B5B95'; // Indigo
                sortContainer.appendChild(bar);
            });
        };

        // Utility function to pause execution
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        // Sorting Algorithm Implementations

        // 1. Bubble Sort
        const bubbleSort = async () => {
            const bars = document.querySelectorAll('.bar');
            for (let i = 0; i < sortArray.length; i++) {
                for (let j = 0; j < sortArray.length - i - 1; j++) {
                    // Highlight bars being compared
                    bars[j].style.backgroundColor = '#FF6F61'; // Coral
                    bars[j + 1].style.backgroundColor = '#FF6F61'; // Coral

                    await sleep(50);

                    if (sortArray[j] > sortArray[j + 1]) {
                        // Swap in array
                        [sortArray[j], sortArray[j + 1]] = [sortArray[j + 1], sortArray[j]];
                        // Swap in DOM
                        bars[j].style.height = `${sortArray[j] * 3}px`;
                        bars[j + 1].style.height = `${sortArray[j + 1] * 3}px`;
                    }

                    // Reset color
                    bars[j].style.backgroundColor = '#6B5B95'; // Indigo
                    bars[j + 1].style.backgroundColor = '#6B5B95'; // Indigo
                }
                // Mark the last element as sorted
                bars[sortArray.length - i - 1].style.backgroundColor = '#A6D3A0'; // Soft Green
            }
        };

        // 2. Quick Sort
        const quickSort = async (start = 0, end = sortArray.length - 1) => {
            if (start < end) {
                const pivotIndex = await partition(start, end);
                await quickSort(start, pivotIndex - 1);
                await quickSort(pivotIndex + 1, end);
            }
        };

        const partition = async (start, end) => {
            const bars = document.querySelectorAll('.bar');
            let pivotValue = sortArray[end];
            bars[end].style.backgroundColor = '#FFA500'; // Orange for pivot
            let pivotIndex = start;
            for (let i = start; i < end; i++) {
                bars[i].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(50);
                if (sortArray[i] < pivotValue) {
                    // Swap elements
                    [sortArray[i], sortArray[pivotIndex]] = [sortArray[pivotIndex], sortArray[i]];
                    // Swap in DOM
                    bars[i].style.height = `${sortArray[i] * 3}px`;
                    bars[pivotIndex].style.height = `${sortArray[pivotIndex] * 3}px`;
                    pivotIndex++;
                }
                bars[i].style.backgroundColor = '#6B5B95'; // Reset color
            }
            // Swap pivot with element at pivotIndex
            [sortArray[pivotIndex], sortArray[end]] = [sortArray[end], sortArray[pivotIndex]];
            bars[pivotIndex].style.height = `${sortArray[pivotIndex] * 3}px`;
            bars[end].style.height = `${sortArray[end] * 3}px`;

            bars[end].style.backgroundColor = '#6B5B95'; // Reset color
            bars[pivotIndex].style.backgroundColor = '#A6D3A0'; // Mark as sorted

            return pivotIndex;
        };

        // 3. Merge Sort
        const mergeSort = async (left = 0, right = sortArray.length - 1) => {
            if (left >= right) {
                return;
            }
            const mid = Math.floor((left + right) / 2);
            await mergeSort(left, mid);
            await mergeSort(mid + 1, right);
            await merge(left, mid, right);
        };

        const merge = async (left, mid, right) => {
            const bars = document.querySelectorAll('.bar');

            const n1 = mid - left + 1;
            const n2 = right - mid;

            const leftArray = [];
            const rightArray = [];

            for (let i = 0; i < n1; i++) {
                leftArray[i] = sortArray[left + i];
            }
            for (let j = 0; j < n2; j++) {
                rightArray[j] = sortArray[mid + 1 + j];
            }

            let i = 0;
            let j = 0;
            let k = left;

            while (i < n1 && j < n2) {
                bars[k].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(50);

                if (leftArray[i] <= rightArray[j]) {
                    sortArray[k] = leftArray[i];
                    bars[k].style.height = `${sortArray[k] * 3}px`;
                    i++;
                } else {
                    sortArray[k] = rightArray[j];
                    bars[k].style.height = `${sortArray[k] * 3}px`;
                    j++;
                }
                bars[k].style.backgroundColor = '#6B5B95'; // Indigo
                k++;
            }

            while (i < n1) {
                bars[k].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(50);
                sortArray[k] = leftArray[i];
                bars[k].style.height = `${sortArray[k] * 3}px`;
                bars[k].style.backgroundColor = '#6B5B95'; // Indigo
                i++;
                k++;
            }

            while (j < n2) {
                bars[k].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(50);
                sortArray[k] = rightArray[j];
                bars[k].style.height = `${sortArray[k] * 3}px`;
                bars[k].style.backgroundColor = '#6B5B95'; // Indigo
                j++;
                k++;
            }
        };

        // 4. Insertion Sort
        const insertionSort = async () => {
            const bars = document.querySelectorAll('.bar');
            for (let i = 1; i < sortArray.length; i++) {
                let key = sortArray[i];
                let j = i - 1;
                bars[i].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(50);
                while (j >= 0 && sortArray[j] > key) {
                    sortArray[j + 1] = sortArray[j];
                    bars[j + 1].style.height = `${sortArray[j + 1] * 3}px`;
                    bars[j].style.backgroundColor = '#FF6F61'; // Coral
                    await sleep(50);
                    bars[j].style.backgroundColor = '#6B5B95'; // Indigo
                    j--;
                }
                sortArray[j + 1] = key;
                bars[j + 1].style.height = `${sortArray[j + 1] * 3}px`;
                bars[i].style.backgroundColor = '#6B5B95'; // Reset color
            }
            // Mark all as sorted
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = '#A6D3A0'; // Soft Green
                await sleep(20);
            }
        };

        // 5. Selection Sort
        const selectionSort = async () => {
            const bars = document.querySelectorAll('.bar');
            for (let i = 0; i < sortArray.length; i++) {
                let minIndex = i;
                bars[minIndex].style.backgroundColor = '#FF6F61'; // Coral
                for (let j = i + 1; j < sortArray.length; j++) {
                    bars[j].style.backgroundColor = '#FF6F61'; // Coral
                    await sleep(50);
                    if (sortArray[j] < sortArray[minIndex]) {
                        bars[minIndex].style.backgroundColor = '#6B5B95'; // Reset previous min
                        minIndex = j;
                        bars[minIndex].style.backgroundColor = '#FF6F61'; // New min
                    } else {
                        bars[j].style.backgroundColor = '#6B5B95'; // Reset color
                    }
                }
                if (minIndex !== i) {
                    [sortArray[i], sortArray[minIndex]] = [sortArray[minIndex], sortArray[i]];
                    bars[i].style.height = `${sortArray[i] * 3}px`;
                    bars[minIndex].style.height = `${sortArray[minIndex] * 3}px`;
                }
                bars[minIndex].style.backgroundColor = '#6B5B95'; // Reset color
                bars[i].style.backgroundColor = '#A6D3A0'; // Mark as sorted
                await sleep(50);
            }
        };

        // 6. Heap Sort
        const heapSort = async () => {
            const bars = document.querySelectorAll('.bar');
            let n = sortArray.length;

            // Build heap (rearrange array)
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                await heapify(n, i);
            }

            // One by one extract an element from heap
            for (let i = n - 1; i > 0; i--) {
                // Move current root to end
                [sortArray[0], sortArray[i]] = [sortArray[i], sortArray[0]];
                bars[0].style.height = `${sortArray[0] * 3}px`;
                bars[i].style.height = `${sortArray[i] * 3}px`;
                bars[i].style.backgroundColor = '#A6D3A0'; // Mark as sorted
                await heapify(i, 0);
            }
            bars[0].style.backgroundColor = '#A6D3A0'; // Mark as sorted
        };

        const heapify = async (n, i) => {
            const bars = document.querySelectorAll('.bar');
            let largest = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (left < n && sortArray[left] > sortArray[largest]) {
                largest = left;
            }

            if (right < n && sortArray[right] > sortArray[largest]) {
                largest = right;
            }

            if (largest !== i) {
                bars[i].style.backgroundColor = '#FF6F61'; // Coral
                bars[largest].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(50);

                [sortArray[i], sortArray[largest]] = [sortArray[largest], sortArray[i]];
                bars[i].style.height = `${sortArray[i] * 3}px`;
                bars[largest].style.height = `${sortArray[largest] * 3}px`;

                bars[i].style.backgroundColor = '#6B5B95'; // Reset color
                bars[largest].style.backgroundColor = '#6B5B95'; // Reset color

                await heapify(n, largest);
            }
        };

        // 7. Counting Sort
        const countingSort = async () => {
            const bars = document.querySelectorAll('.bar');
            let max = Math.max(...sortArray);
            let min = Math.min(...sortArray);
            let range = max - min + 1;
            let count = new Array(range).fill(0);
            let output = new Array(sortArray.length).fill(0);

            for (let i = 0; i < sortArray.length; i++) {
                count[sortArray[i] - min]++;
                bars[i].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(20);
                bars[i].style.backgroundColor = '#6B5B95'; // Indigo
            }

            for (let i = 1; i < count.length; i++) {
                count[i] += count[i - 1];
            }

            for (let i = sortArray.length - 1; i >= 0; i--) {
                output[count[sortArray[i] - min] - 1] = sortArray[i];
                count[sortArray[i] - min]--;
            }

            for (let i = 0; i < sortArray.length; i++) {
                sortArray[i] = output[i];
                bars[i].style.height = `${sortArray[i] * 3}px`;
                bars[i].style.backgroundColor = '#A6D3A0'; // Soft Green
                await sleep(20);
            }
        };

        // 8. Radix Sort
        const radixSort = async () => {
            const bars = document.querySelectorAll('.bar');
            let max = Math.max(...sortArray);
            let exp = 1;
            while (Math.floor(max / exp) > 0) {
                await countingSortRadix(exp);
                exp *= 10;
            }
            // Mark all as sorted
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = '#A6D3A0'; // Soft Green
                await sleep(20);
            }
        };

        const countingSortRadix = async (exp) => {
            const bars = document.querySelectorAll('.bar');
            let n = sortArray.length;
            let output = new Array(n).fill(0);
            let count = new Array(10).fill(0);

            for (let i = 0; i < n; i++) {
                let index = Math.floor(sortArray[i] / exp) % 10;
                count[index]++;
                bars[i].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(10);
                bars[i].style.backgroundColor = '#6B5B95'; // Indigo
            }

            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1];
            }

            for (let i = n - 1; i >= 0; i--) {
                let index = Math.floor(sortArray[i] / exp) % 10;
                output[count[index] - 1] = sortArray[i];
                count[index]--;
            }

            for (let i = 0; i < n; i++) {
                sortArray[i] = output[i];
                bars[i].style.height = `${sortArray[i] * 3}px`;
                bars[i].style.backgroundColor = '#6B5B95'; // Indigo
                await sleep(10);
            }
        };

        // 9. Shell Sort
        const shellSort = async () => {
            const bars = document.querySelectorAll('.bar');
            let n = sortArray.length;
            for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
                for (let i = gap; i < n; i++) {
                    let temp = sortArray[i];
                    let j;
                    for (j = i; j >= gap && sortArray[j - gap] > temp; j -= gap) {
                        sortArray[j] = sortArray[j - gap];
                        bars[j].style.height = `${sortArray[j] * 3}px`;
                        bars[j].style.backgroundColor = '#FF6F61'; // Coral
                        await sleep(30);
                        bars[j].style.backgroundColor = '#6B5B95'; // Indigo
                    }
                    sortArray[j] = temp;
                    bars[j].style.height = `${sortArray[j] * 3}px`;
                }
            }
            // Mark all as sorted
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = '#A6D3A0'; // Soft Green
                await sleep(20);
            }
        };

        // 10. Cocktail Shaker Sort
        const cocktailShakerSort = async () => {
            const bars = document.querySelectorAll('.bar');
            let swapped = true;
            let start = 0;
            let end = sortArray.length - 1;

            while (swapped) {
                swapped = false;

                // Forward pass
                for (let i = start; i < end; i++) {
                    bars[i].style.backgroundColor = '#FF6F61'; // Coral
                    bars[i + 1].style.backgroundColor = '#FF6F61'; // Coral

                    await sleep(50);

                    if (sortArray[i] > sortArray[i + 1]) {
                        [sortArray[i], sortArray[i + 1]] = [sortArray[i + 1], sortArray[i]];
                        bars[i].style.height = `${sortArray[i] * 3}px`;
                        bars[i + 1].style.height = `${sortArray[i + 1] * 3}px`;
                        swapped = true;
                    }

                    bars[i].style.backgroundColor = '#6B5B95'; // Indigo
                    bars[i + 1].style.backgroundColor = '#6B5B95'; // Indigo
                }

                if (!swapped) break;

                swapped = false;
                end--;

                // Backward pass
                for (let i = end; i > start; i--) {
                    bars[i].style.backgroundColor = '#FF6F61'; // Coral
                    bars[i - 1].style.backgroundColor = '#FF6F61'; // Coral

                    await sleep(50);

                    if (sortArray[i] < sortArray[i - 1]) {
                        [sortArray[i], sortArray[i - 1]] = [sortArray[i - 1], sortArray[i]];
                        bars[i].style.height = `${sortArray[i] * 3}px`;
                        bars[i - 1].style.height = `${sortArray[i - 1] * 3}px`;
                        swapped = true;
                    }

                    bars[i].style.backgroundColor = '#6B5B95'; // Indigo
                    bars[i - 1].style.backgroundColor = '#6B5B95'; // Indigo
                }

                start++;
            }
            // Mark all as sorted
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = '#A6D3A0'; // Soft Green
                await sleep(20);
            }
        };

        // Function to execute selected sorting algorithm
        const executeSort = async (algorithm) => {
            switch (algorithm) {
                case 'Bubble Sort':
                    await bubbleSort();
                    break;
                case 'Quick Sort':
                    await quickSort();
                    break;
                case 'Merge Sort':
                    await mergeSort();
                    break;
                case 'Insertion Sort':
                    await insertionSort();
                    break;
                case 'Selection Sort':
                    await selectionSort();
                    break;
                case 'Heap Sort':
                    await heapSort();
                    break;
                case 'Counting Sort':
                    await countingSort();
                    break;
                case 'Radix Sort':
                    await radixSort();
                    break;
                case 'Shell Sort':
                    await shellSort();
                    break;
                case 'Cocktail Shaker Sort':
                    await cocktailShakerSort();
                    break;
                default:
                    alert('Please select a valid sorting algorithm.');
            }
        };

        // Event Listener for Start Sort Button
        startSortBtn.addEventListener('click', () => {
            const selectedAlgo = algorithmSelect.value;
            if (selectedAlgo === '') {
                alert('Please select a sorting algorithm.');
                return;
            }
            executeSort(selectedAlgo);
        });

        // Event Listener for Reset Sort Button
        resetSortBtn.addEventListener('click', initializeSortArray);

        // Initialize on page load
        initializeSortArray();
    } else {
        console.warn('Algorithm Visualizer elements not found on this page.');
    }
})();

