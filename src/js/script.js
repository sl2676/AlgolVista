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
   Light Mode Toggle Functionality with Persistence
========================================= */
(function() {
    const lightModeSwitch = document.getElementById('lightModeSwitch');

    // Function to enable light mode
    const enableLightMode = () => {
        document.body.classList.add('light-mode');
        localStorage.setItem('lightMode', 'enabled');
    };

    // Function to disable light mode
    const disableLightMode = () => {
        document.body.classList.remove('light-mode');
        localStorage.setItem('lightMode', 'disabled');
    };

    // Check localStorage on page load
    const lightMode = localStorage.getItem('lightMode');
    if (lightMode === 'enabled') {
        enableLightMode();
        if (lightModeSwitch) {
            lightModeSwitch.checked = true;
        }
    } else {
        disableLightMode();
        if (lightModeSwitch) {
            lightModeSwitch.checked = false;
        }
    }

    // Event Listener for toggle switch
    if (lightModeSwitch) {
        lightModeSwitch.addEventListener('change', () => {
            if (lightModeSwitch.checked) {
                enableLightMode();
            } else {
                disableLightMode();
            }
        });
    } else {
        console.warn('Light mode switch element not found on this page.');
    }
})();



/* =========================================
   Dark Mode Toggle Functionality with Persistence
   ========================================= */
(function() {
    const darkModeSwitch = document.getElementById('darkModeSwitch');

    // Function to enable dark mode
    const enableDarkMode = () => {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    };

    // Function to disable dark mode
    const disableDarkMode = () => {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    };

    // Check localStorage on page load
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        enableDarkMode();
        if (darkModeSwitch) {
            darkModeSwitch.checked = true;
        }
    }

    // Event Listener for toggle switch
    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', () => {
            if (darkModeSwitch.checked) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    } else {
        console.warn('Dark mode switch element not found on this page.');
    }
})();


/* =========================================
   Interactive Code Editor
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Supported Languages and their Judge0 IDs and CodeMirror Modes
    const languages = {
        javascript: { id: 63, mode: 'javascript', name: 'JavaScript' },
        python: { id: 71, mode: 'python', name: 'Python 3' },
        java: { id: 62, mode: 'text/x-java', name: 'Java' },
        cpp: { id: 54, mode: 'text/x-c++src', name: 'C++' },
        c: { id: 50, mode: 'text/x-csrc', name: 'C' },
        csharp: { id: 51, mode: 'text/x-csharp', name: 'C#' },
        typescript: { id: 74, mode: 'javascript', name: 'TypeScript' },
        go: { id: 20, mode: 'go', name: 'Go' }
    };

    const editorElement = document.getElementById('code');
    const outputElement = document.getElementById('output');
    const runCodeBtn = document.getElementById('run-code');
    const resetCodeBtn = document.getElementById('reset-code');
    const languageSelect = document.getElementById('language-select');
    const themeSelect = document.getElementById('theme-select');
    const fontSizeRange = document.getElementById('font-size-range');

    if (editorElement && outputElement && runCodeBtn && languageSelect) {
        // Initialize CodeMirror Editor
        let editor = CodeMirror.fromTextArea(editorElement, {
            lineNumbers: true,
            mode: languages[languageSelect.value].mode,
            theme: themeSelect.value,
            autoCloseBrackets: true,
            matchBrackets: true,
            tabSize: 4,
            indentUnit: 4,
            indentWithTabs: true,
        });

        // Function to get placeholder code based on language
        const getPlaceholderCode = (lang) => {
            switch (lang) {
                case 'javascript':
                    return `// JavaScript\nconsole.log('Hello, World!');`;
                case 'python':
                    return `# Python 3\nprint('Hello, World!')`;
                case 'java':
                    return `// Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`;
                case 'cpp':
                    return `// C++\n#include <iostream>\nint main() {\n    std::cout << "Hello, World!\\n";\n    return 0;\n}`;
                case 'c':
                    return `// C\n#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`;
                case 'csharp':
                    return `// C#\nusing System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}`;
                case 'typescript':
                    return `// TypeScript\nconsole.log('Hello, World!');`;
                case 'go':
                    return `// Go\npackage main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}`;
                default:
                    return '';
            }
        };

        // Set initial placeholder code
        editor.setValue(getPlaceholderCode(languageSelect.value));

        // Function to update editor mode
        const updateEditorMode = () => {
            const selectedLang = languageSelect.value;
            editor.setOption('mode', languages[selectedLang].mode);
            editor.setValue(getPlaceholderCode(selectedLang));
        };

        // Function to update editor theme
        const updateEditorTheme = () => {
            const theme = themeSelect.value;
            editor.setOption('theme', theme);
        };

        // Function to update font size
        const updateFontSize = () => {
            const fontSize = fontSizeRange.value + 'px';
            editor.getWrapperElement().style.fontSize = fontSize;
            editor.refresh();
        };

        // Update Editor Mode and Placeholder Code on Language Change
        languageSelect.addEventListener('change', updateEditorMode);

        // Update Editor Theme on Theme Change
        themeSelect.addEventListener('change', updateEditorTheme);

        // Update Font Size on Range Change
        fontSizeRange.addEventListener('input', updateFontSize);

        // Reset Code Button Click
        resetCodeBtn.addEventListener('click', () => {
            const language = languageSelect.value;
            editor.setValue(getPlaceholderCode(language));
        });

        // Run Code Functionality
        runCodeBtn.addEventListener('click', () => {
            const userCode = editor.getValue();
            const selectedLang = languageSelect.value;
            const languageId = languages[selectedLang].id;

            outputElement.textContent = 'Running...';

            const payload = {
                source_code: userCode,
                language_id: languageId,
                stdin: '',
            };

            fetch('/run-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                if (data.stderr) {
                    outputElement.textContent = data.stderr;
                } else if (data.compile_output) {
                    outputElement.textContent = data.compile_output;
                } else if (data.stdout) {
                    outputElement.textContent = data.stdout;
                } else {
                    outputElement.textContent = 'Execution finished with no output.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                outputElement.textContent = 'An error occurred while running the code.';
            });
        });

        // Initialize Font Size
        updateFontSize();
    } else {
        console.warn('Code Editor elements not found on this page.');
    }
});



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
    const descriptionTab = document.getElementById('description-tab');
    const operationsTab = document.getElementById('operations-tab');
    const complexitiesTab = document.getElementById('complexities-tab');
    const tabLinks = document.querySelectorAll('.tab-link');

    if (treeContainer && structureSelect && descriptionTab && operationsTab && complexitiesTab) {
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

        // Operations for Data Structures
        const operations = {
            'Binary Tree': [
                'Insertion',
                'Traversal (In-order, Pre-order, Post-order)',
                'Deletion'
            ],
            'Binary Search Tree': [
                'Insertion',
                'Search',
                'Deletion',
                'Traversal'
            ],
            'Linked List': [
                'Insertion',
                'Deletion',
                'Traversal',
                'Search'
            ],
            'Stack': [
                'Push',
                'Pop',
                'Peek',
                'IsEmpty'
            ],
            'Queue': [
                'Enqueue',
                'Dequeue',
                'Peek',
                'IsEmpty'
            ],
            'Graph': [
                'Add Vertex',
                'Add Edge',
                'Traversal (DFS, BFS)',
                'Shortest Path'
            ],
            'Heap': [
                'Insert',
                'Delete',
                'Heapify',
                'Extract Max/Min'
            ],
            'Hash Table': [
                'Insert',
                'Delete',
                'Search',
                'Hash Function'
            ],
            'Trie': [
                'Insert',
                'Search',
                'Delete',
                'Prefix Search'
            ],
            'Red-Black Tree': [
                'Insertion',
                'Deletion',
                'Search',
                'Balancing'
            ]
        };

        // Complexities for Data Structures
        const complexities = {
            'Binary Tree': {
                'Insertion': 'O(n)',
                'Search': 'O(n)',
                'Deletion': 'O(n)'
            },
            'Binary Search Tree': {
                'Insertion': 'O(log n)',
                'Search': 'O(log n)',
                'Deletion': 'O(log n)'
            },
            'Linked List': {
                'Insertion': 'O(1)',
                'Deletion': 'O(1)',
                'Traversal': 'O(n)',
                'Search': 'O(n)'
            },
            'Stack': {
                'Push': 'O(1)',
                'Pop': 'O(1)',
                'Peek': 'O(1)'
            },
            'Queue': {
                'Enqueue': 'O(1)',
                'Dequeue': 'O(1)',
                'Peek': 'O(1)'
            },
            'Graph': {
                'Add Vertex': 'O(1)',
                'Add Edge': 'O(1)',
                'Traversal': 'O(V + E)',
                'Shortest Path': 'O(E + V log V)'
            },
            'Heap': {
                'Insert': 'O(log n)',
                'Delete': 'O(log n)',
                'Heapify': 'O(n)',
                'Extract Max/Min': 'O(log n)'
            },
            'Hash Table': {
                'Insert': 'O(1)',
                'Delete': 'O(1)',
                'Search': 'O(1)'
            },
            'Trie': {
                'Insert': 'O(m)',
                'Search': 'O(m)',
                'Delete': 'O(m)',
                'Prefix Search': 'O(m)'
            },
            'Red-Black Tree': {
                'Insertion': 'O(log n)',
                'Deletion': 'O(log n)',
                'Search': 'O(log n)'
            }
        };

        // Event Listener for Data Structure Selection
        structureSelect.addEventListener('change', (e) => {
            const selectedStructure = e.target.value;
            if (selectedStructure !== '') {
                // Update Description Tab
                descriptionTab.innerHTML = `
                    <h4>Description:</h4>
                    <p>${descriptions[selectedStructure]}</p>
                `;

                // Update Operations Tab
                operationsTab.innerHTML = `
                    <h4>Common Operations:</h4>
                    <ul>
                        ${operations[selectedStructure].map(op => `<li>${op}</li>`).join('')}
                    </ul>
                `;
                // Update Complexities Tab
                const complexityEntries = complexities[selectedStructure];
                complexitiesTab.innerHTML = `
                    <h4>Time Complexities:</h4>
                    <ul>
                        ${Object.entries(complexityEntries).map(([op, comp]) => `<li><strong>${op}:</strong> ${comp}</li>`).join('')}
                    </ul>
                `;
				activateTab('description');
                // Create Visualization
                createDataStructure(selectedStructure, 'tree-container');
            } else {
                // Clear Visualization and Tabs
                treeContainer.innerHTML = '';
                descriptionTab.innerHTML = `
                    <h4>Description:</h4>
                    <p>Select a data structure to view its description and usage scenarios.</p>
                `;
                operationsTab.innerHTML = `
                    <h4>Operations:</h4>
                    <p>Select a data structure to view its common operations.</p>
                `;
                complexitiesTab.innerHTML = `
                    <h4>Complexities:</h4>
                    <p>Select a data structure to view its time and space complexities.</p>
                `;
           	 	deactivateAllTabs();
			 }
        });


		tabLinks.forEach(tab => {
            tab.addEventListener('click', () => {
                activateTab(tab.dataset.tab);
            });
        });


		const activateTab = (tabName) => {
            // Remove 'active' class from all tabs and contents
            tabLinks.forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Add 'active' class to the selected tab and content
            const selectedTabLink = document.querySelector(`.tab-link[data-tab="${tabName}"]`);
            const selectedTabContent = document.getElementById(`${tabName}-tab`);

            if (selectedTabLink && selectedTabContent) {
                selectedTabLink.classList.add('active');
                selectedTabContent.classList.add('active');
            } else {
                console.warn(`Tab or content not found for '${tabName}'`);
            }
        };


		 // Function to Deactivate All Tabs
        const deactivateAllTabs = () => {
            tabLinks.forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        };

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

        // Function to create Tree Structures with Zoom, Pan, and Tooltips
        const createTree = (data, containerId) => {
            const container = document.getElementById(containerId);
            const width = container.clientWidth;
            const height = container.clientHeight;

            // Create SVG and attach zoom behavior
            const svg = d3.select(`#${containerId}`)
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            const g = svg.append("g"); // Container for all elements

            const root = d3.hierarchy(data);

            const treeLayout = d3.tree().size([width - 100, height - 100]);

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
                .attr('transform', d => `translate(${d.x},${d.y})`);

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

            // Tooltip
            const tooltip = d3.select('body').append('div')
                .attr('class', 'node-tooltip');

            node.on('mouseover', (event, d) => {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', 1);
                tooltip.html(`<strong>${d.data.name}</strong>`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 20) + 'px');
            }).on('mouseout', () => {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', 0);
            });

            // Zoom and Pan
            const zoom = d3.zoom()
                .scaleExtent([0.5, 2])
                .on('zoom', (event) => {
                    g.attr('transform', event.transform);
                });

            svg.call(zoom);

            // Zoom Controls
            const zoomInBtn = document.getElementById('zoom-in');
            const zoomOutBtn = document.getElementById('zoom-out');
            const resetZoomBtn = document.getElementById('reset-zoom');

            if (zoomInBtn && zoomOutBtn && resetZoomBtn) {
                zoomInBtn.addEventListener('click', () => {
                    svg.transition().call(zoom.scaleBy, 1.2);
                });

                zoomOutBtn.addEventListener('click', () => {
                    svg.transition().call(zoom.scaleBy, 0.8);
                });

                resetZoomBtn.addEventListener('click', () => {
                    svg.transition().call(zoom.scaleTo, 1);
                    svg.transition().call(zoom.translateTo, width / 2, height / 2);
                });
            }
        };

        // Function to create Graph Structures with Zoom, Pan, and Tooltips
        const createGraph = (data, containerId) => {
            const container = document.getElementById(containerId);
            const width = container.clientWidth;
            const height = container.clientHeight;

            // Create SVG and attach zoom behavior
            const svg = d3.select(`#${containerId}`)
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            const g = svg.append("g"); // Container for all elements

            const simulation = d3.forceSimulation(data.nodes)
                .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
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

            // Tooltip
            const tooltip = d3.select('body').append('div')
                .attr('class', 'node-tooltip');

            node.on('mouseover', (event, d) => {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', 1);
                tooltip.html(`<strong>Node: ${d.id}</strong>`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 20) + 'px');
            }).on('mouseout', () => {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', 0);
            });

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

            // Zoom and Pan
            const zoom = d3.zoom()
                .scaleExtent([0.5, 2])
                .on('zoom', (event) => {
                    g.attr('transform', event.transform);
                });

            svg.call(zoom);

            // Zoom Controls
            const zoomInBtn = document.getElementById('zoom-in');
            const zoomOutBtn = document.getElementById('zoom-out');
            const resetZoomBtn = document.getElementById('reset-zoom');

            if (zoomInBtn && zoomOutBtn && resetZoomBtn) {
                zoomInBtn.addEventListener('click', () => {
                    svg.transition().call(zoom.scaleBy, 1.2);
                });

                zoomOutBtn.addEventListener('click', () => {
                    svg.transition().call(zoom.scaleBy, 0.8);
                });

                resetZoomBtn.addEventListener('click', () => {
                    svg.transition().call(zoom.scaleTo, 1);
                    svg.transition().call(zoom.translateTo, width / 2, height / 2);
                });
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

    // Input Size Range Slider
    const inputSizeRange = document.getElementById('input-size-range');
    const inputSizeValue = document.getElementById('input-size-value');

    let maxInputSize = 500; // Default value

    if (inputSizeRange && inputSizeValue) {
        inputSizeRange.addEventListener('input', () => {
            maxInputSize = parseInt(inputSizeRange.value);
            inputSizeValue.textContent = maxInputSize;
            updateChart();
        });
    } else {
        console.warn('Input size range elements not found.');
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
        const stepSize = Math.floor(maxInputSize / 50);
        for (let i = stepSize; i <= maxInputSize; i += stepSize) {
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
        do {
            color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        } while (color === '#FFFFFF' || color === '#000000'); // Avoid white and black colors
        return color;
    };

    // Toggle Scale Button
    const toggleScaleBtn = document.getElementById('toggle-scale');
    let isLogScale = true;

    if (toggleScaleBtn) {
        toggleScaleBtn.addEventListener('click', () => {
            isLogScale = !isLogScale;
            complexityChart.options.scales.y.type = isLogScale ? 'logarithmic' : 'linear';
            toggleScaleBtn.textContent = isLogScale ? 'Switch to Linear Scale' : 'Switch to Logarithmic Scale';
            complexityChart.update();
        });
    }

    // Initialize Chart on Page Load
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('complexity-chart')) {
            initializeChart();
        }
    });
})();

/* =========================================
   Algorithm Visualizer
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const visualizerContainer = document.getElementById('visualizer-container');
    const algorithmSelect = document.getElementById('algorithm-select');
    const startSortBtn = document.getElementById('start-sort-btn');
    const resetSortBtn = document.getElementById('reset-sort-btn');

    // Tab Elements
    const tabLinks = document.querySelectorAll('.tab-link');
    const descriptionTab = document.getElementById('description-tab');
    const pseudocodeTab = document.getElementById('pseudocode-tab');
    const complexityTab = document.getElementById('complexity-tab');

    if (visualizerContainer && algorithmSelect && startSortBtn && resetSortBtn) {
        let sortArray = [];
        let isSorting = false;

        // Algorithm Details
        const algorithmDetails = {
            'Bubble Sort': {
                description: 'Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
                pseudocode: `for i from 1 to N
    for j from 0 to N - i
        if array[j] > array[j + 1]
            swap(array[j], array[j + 1])`,
                complexity: {
                    time: 'O(n²)',
                    space: 'O(1)'
                }
            },
            'Quick Sort': {
                description: 'Quick Sort is a divide-and-conquer algorithm that selects a pivot element and partitions the array around the pivot, sorting elements recursively.',
                pseudocode: `function quickSort(arr, left, right)
    if left < right
        pivotIndex = partition(arr, left, right)
        quickSort(arr, left, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, right)`,
                complexity: {
                    time: 'O(n log n)',
                    space: 'O(log n)'
                }
            },
            'Merge Sort': {
                description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts them recursively, and then merges the sorted halves.',
                pseudocode: `function mergeSort(arr)
    if length of arr > 1
        mid = length of arr / 2
        left = arr[0...mid]
        right = arr[mid...end]
        mergeSort(left)
        mergeSort(right)
        merge(left, right, arr)`,
                complexity: {
                    time: 'O(n log n)',
                    space: 'O(n)'
                }
            },
            'Insertion Sort': {
                description: 'Insertion Sort builds the final sorted array one item at a time, inserting elements into their correct position.',
                pseudocode: `for i from 1 to N
    key = array[i]
    j = i - 1
    while j >= 0 and array[j] > key
        array[j + 1] = array[j]
        j = j - 1
    array[j + 1] = key`,
                complexity: {
                    time: 'O(n²)',
                    space: 'O(1)'
                }
            },
            'Selection Sort': {
                description: 'Selection Sort divides the array into sorted and unsorted parts, repeatedly selecting the minimum element from the unsorted part and moving it to the end of the sorted part.',
                pseudocode: `for i from 0 to N - 1
    minIndex = i
    for j from i + 1 to N
        if array[j] < array[minIndex]
            minIndex = j
    swap(array[i], array[minIndex])`,
                complexity: {
                    time: 'O(n²)',
                    space: 'O(1)'
                }
            },
            'Heap Sort': {
                description: 'Heap Sort utilizes a binary heap data structure to sort elements. It involves building a max heap and then repeatedly extracting the maximum element.',
                pseudocode: `function heapSort(arr)
    buildMaxHeap(arr)
    for i from N - 1 downto 1
        swap(arr[0], arr[i])
        heapSize = heapSize - 1
        maxHeapify(arr, 0)`,
                complexity: {
                    time: 'O(n log n)',
                    space: 'O(1)'
                }
            },
            'Counting Sort': {
                description: 'Counting Sort counts the number of objects that have distinct key values, then doing arithmetic to calculate the positions of each key.',
                pseudocode: `function countingSort(arr, k)
    count = array of zeros, size k
    for i from 0 to N
        count[arr[i]] += 1
    for i from 1 to k
        count[i] += count[i - 1]
    for i from N - 1 downto 0
        output[count[arr[i]] - 1] = arr[i]
        count[arr[i]] -= 1`,
                complexity: {
                    time: 'O(n + k)',
                    space: 'O(n + k)'
                }
            },
            'Radix Sort': {
                description: 'Radix Sort processes digits of numbers starting from least significant digit to most significant digit using a stable sort like counting sort.',
                pseudocode: `function radixSort(arr)
    max = findMax(arr)
    for exp = 1; max/exp > 0; exp *= 10
        countingSortByDigit(arr, exp)`,
                complexity: {
                    time: 'O(nk)',
                    space: 'O(n + k)'
                }
            },
            'Shell Sort': {
                description: 'Shell Sort is an extension of insertion sort that allows the exchange of items that are far apart. It uses a gap sequence to determine which elements to compare.',
                pseudocode: `for gap = N/2 downto 1
    for i from gap to N
        temp = array[i]
        j = i
        while j >= gap and array[j - gap] > temp
            array[j] = array[j - gap]
            j = j - gap
        array[j] = temp`,
                complexity: {
                    time: 'O(n log n)',
                    space: 'O(1)'
                }
            },
            'Cocktail Shaker Sort': {
                description: 'Cocktail Shaker Sort is a variation of Bubble Sort that sorts in both directions on each pass through the list.',
                pseudocode: `do
    swapped = false
    for i from left to right
        if array[i] > array[i + 1]
            swap(array[i], array[i + 1])
            swapped = true
    if not swapped
        break
    swapped = false
    for i from right - 1 downto left
        if array[i] > array[i + 1]
            swap(array[i], array[i + 1])
            swapped = true
while swapped`,
                complexity: {
                    time: 'O(n²)',
                    space: 'O(1)'
                }
            }
        };

        // Event Listener for Algorithm Selection
        algorithmSelect.addEventListener('change', () => {
            const selectedAlgorithm = algorithmSelect.value;
            if (selectedAlgorithm !== '') {
                // Update Tabs with Algorithm Details
                updateAlgorithmDetails(selectedAlgorithm);
                resetVisualizer();
            } else {
                // Clear Tabs
                descriptionTab.innerHTML = `<h4>Description:</h4><p>Select an algorithm to view its description and usage scenarios.</p>`;
                pseudocodeTab.innerHTML = `<h4>Pseudocode:</h4><pre><code>Select an algorithm to view its pseudocode.</code></pre>`;
                complexityTab.innerHTML = `<h4>Complexity:</h4><p>Select an algorithm to view its time and space complexities.</p>`;
            }
        });

        // Function to Update Algorithm Details in Tabs
        const updateAlgorithmDetails = (algorithm) => {
            const details = algorithmDetails[algorithm];
            if (details) {
                descriptionTab.innerHTML = `<h4>Description:</h4><p>${details.description}</p>`;
                pseudocodeTab.innerHTML = `<h4>Pseudocode:</h4><pre><code>${details.pseudocode}</code></pre>`;
                complexityTab.innerHTML = `<h4>Complexity:</h4><p><strong>Time Complexity:</strong> ${details.complexity.time}<br><strong>Space Complexity:</strong> ${details.complexity.space}</p>`;
            }
        };

        // Tabs Functionality
        tabLinks.forEach(tab => {
            tab.addEventListener('click', () => {
                activateTab(tab.dataset.tab);
            });
        });

        const activateTab = (tabName) => {
            // Remove 'active' class from all tabs and contents
            tabLinks.forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Add 'active' class to the selected tab and content
            document.querySelector(`.tab-link[data-tab="${tabName}"]`).classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        };

        // Initialize Visualizer Array
        const initializeSortArray = () => {
            sortArray = [];
            visualizerContainer.innerHTML = '';
            const arraySize = 50;
            for (let i = 0; i < arraySize; i++) {
                const value = Math.floor(Math.random() * 100) + 1;
                sortArray.push(value);
                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${value * 3}px`;
                visualizerContainer.appendChild(bar);
            }
        };

        // Reset Visualizer
        const resetVisualizer = () => {
            if (isSorting) return;
            initializeSortArray();
        };

        resetSortBtn.addEventListener('click', resetVisualizer);

        // Start Sorting
        startSortBtn.addEventListener('click', () => {
            const selectedAlgorithm = algorithmSelect.value;
            if (selectedAlgorithm === '') {
                alert('Please select a sorting algorithm.');
                return;
            }
            if (isSorting) return;
            isSorting = true;
            executeSort(selectedAlgorithm).then(() => {
                isSorting = false;
            });
        });

        // Sorting Algorithms Implementation
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const executeSort = async (algorithm) => {
            switch (algorithm) {
                case 'Bubble Sort':
                    await bubbleSort();
                    break;
                case 'Quick Sort':
                    await quickSort(0, sortArray.length - 1);
                    break;
                case 'Merge Sort':
                    await mergeSort(0, sortArray.length - 1);
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
                    alert('Selected algorithm is not implemented yet.');
                    isSorting = false;
            }
        };

        // Implementations of the sorting algorithms

        // Bubble Sort
        const bubbleSort = async () => {
            const bars = document.querySelectorAll('.bar');
            for (let i = 0; i < sortArray.length; i++) {
                for (let j = 0; j < sortArray.length - i - 1; j++) {
                    bars[j].style.backgroundColor = '#FF6F61'; // Comparing
                    bars[j + 1].style.backgroundColor = '#FF6F61';
                    await sleep(20);
                    if (sortArray[j] > sortArray[j + 1]) {
                        [sortArray[j], sortArray[j + 1]] = [sortArray[j + 1], sortArray[j]];
                        bars[j].style.height = `${sortArray[j] * 3}px`;
                        bars[j + 1].style.height = `${sortArray[j + 1] * 3}px`;
                    }
                    bars[j].style.backgroundColor = '#6B5B95'; // Reset color
                    bars[j + 1].style.backgroundColor = '#6B5B95';
                }
                bars[sortArray.length - i - 1].style.backgroundColor = '#A6D3A0'; // Sorted
            }
        };

        // Quick Sort
        const quickSort = async (low, high) => {
            if (low < high) {
                const pi = await partition(low, high);
                await quickSort(low, pi - 1);
                await quickSort(pi + 1, high);
            }
        };

        const partition = async (low, high) => {
            const bars = document.querySelectorAll('.bar');
            const pivotValue = sortArray[high];
            bars[high].style.backgroundColor = '#FF6F61'; // Pivot
            let i = low - 1;
            for (let j = low; j < high; j++) {
                bars[j].style.backgroundColor = '#FF6F61'; // Comparing
                await sleep(50);
                if (sortArray[j] < pivotValue) {
                    i++;
                    [sortArray[i], sortArray[j]] = [sortArray[j], sortArray[i]];
                    bars[i].style.height = `${sortArray[i] * 3}px`;
                    bars[j].style.height = `${sortArray[j] * 3}px`;
                }
                bars[j].style.backgroundColor = '#6B5B95'; // Reset color
            }
            [sortArray[i + 1], sortArray[high]] = [sortArray[high], sortArray[i + 1]];
            bars[i + 1].style.height = `${sortArray[i + 1] * 3}px`;
            bars[high].style.height = `${sortArray[high] * 3}px`;
            bars[high].style.backgroundColor = '#6B5B95'; // Reset color
            return i + 1;
        };

        // Merge Sort
        const mergeSort = async (left, right) => {
            if (left >= right) return;
            const mid = Math.floor((left + right) / 2);
            await mergeSort(left, mid);
            await mergeSort(mid + 1, right);
            await merge(left, mid, right);
        };

        const merge = async (left, mid, right) => {
            const bars = document.querySelectorAll('.bar');
            let n1 = mid - left + 1;
            let n2 = right - mid;
            let leftArray = sortArray.slice(left, mid + 1);
            let rightArray = sortArray.slice(mid + 1, right + 1);
            let i = 0, j = 0, k = left;

            while (i < n1 && j < n2) {
                bars[k].style.backgroundColor = '#FF6F61'; // Comparing
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
                bars[k].style.backgroundColor = '#6B5B95'; // Reset color
                k++;
            }
            while (i < n1) {
                sortArray[k] = leftArray[i];
                bars[k].style.height = `${sortArray[k] * 3}px`;
                i++;
                k++;
            }
            while (j < n2) {
                sortArray[k] = rightArray[j];
                bars[k].style.height = `${sortArray[k] * 3}px`;
                j++;
                k++;
            }
        };

        // Insertion Sort
        const insertionSort = async () => {
            const bars = document.querySelectorAll('.bar');
            for (let i = 1; i < sortArray.length; i++) {
                let key = sortArray[i];
                let j = i - 1;
                bars[i].style.backgroundColor = '#FF6F61'; // Key element
                await sleep(50);
                while (j >= 0 && sortArray[j] > key) {
                    sortArray[j + 1] = sortArray[j];
                    bars[j + 1].style.height = `${sortArray[j + 1] * 3}px`;
                    j--;
                }
                sortArray[j + 1] = key;
                bars[j + 1].style.height = `${sortArray[j + 1] * 3}px`;
                bars[i].style.backgroundColor = '#6B5B95'; // Reset color
            }
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = '#A6D3A0'; // Sorted
            }
        };

        // Selection Sort
        const selectionSort = async () => {
            const bars = document.querySelectorAll('.bar');
            for (let i = 0; i < sortArray.length; i++) {
                let minIndex = i;
                bars[minIndex].style.backgroundColor = '#FF6F61'; // Current min
                for (let j = i + 1; j < sortArray.length; j++) {
                    bars[j].style.backgroundColor = '#FF6F61'; // Comparing
                    await sleep(50);
                    if (sortArray[j] < sortArray[minIndex]) {
                        bars[minIndex].style.backgroundColor = '#6B5B95'; // Reset previous min
                        minIndex = j;
                        bars[minIndex].style.backgroundColor = '#FF6F61'; // New min
                    } else {
                        bars[j].style.backgroundColor = '#6B5B95'; // Reset color
                    }
                }
                [sortArray[i], sortArray[minIndex]] = [sortArray[minIndex], sortArray[i]];
                bars[i].style.height = `${sortArray[i] * 3}px`;
                bars[minIndex].style.height = `${sortArray[minIndex] * 3}px`;
                bars[minIndex].style.backgroundColor = '#6B5B95'; // Reset color
                bars[i].style.backgroundColor = '#A6D3A0'; // Sorted
            }
        };

        // Heap Sort
        const heapSort = async () => {
            const bars = document.querySelectorAll('.bar');
            const n = sortArray.length;

            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                await heapify(n, i);
            }

            for (let i = n - 1; i > 0; i--) {
                [sortArray[0], sortArray[i]] = [sortArray[i], sortArray[0]];
                bars[0].style.height = `${sortArray[0] * 3}px`;
                bars[i].style.height = `${sortArray[i] * 3}px`;
                bars[i].style.backgroundColor = '#A6D3A0'; // Sorted
                await heapify(i, 0);
            }
            bars[0].style.backgroundColor = '#A6D3A0'; // Sorted
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
                bars[i].style.backgroundColor = '#FF6F61'; // Swapping
                bars[largest].style.backgroundColor = '#FF6F61';
                await sleep(50);
                [sortArray[i], sortArray[largest]] = [sortArray[largest], sortArray[i]];
                bars[i].style.height = `${sortArray[i] * 3}px`;
                bars[largest].style.height = `${sortArray[largest] * 3}px`;
                bars[i].style.backgroundColor = '#6B5B95'; // Reset color
                bars[largest].style.backgroundColor = '#6B5B95';
                await heapify(n, largest);
            }
        };

        // Counting Sort
        const countingSort = async () => {
            const bars = document.querySelectorAll('.bar');
            let max = Math.max(...sortArray);
            let min = Math.min(...sortArray);
            let range = max - min + 1;
            let count = new Array(range).fill(0);
            let output = new Array(sortArray.length).fill(0);

            for (let i = 0; i < sortArray.length; i++) {
                count[sortArray[i] - min]++;
                bars[i].style.backgroundColor = '#FF6F61'; // Counting
                await sleep(10);
                bars[i].style.backgroundColor = '#6B5B95'; // Reset color
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
                bars[i].style.backgroundColor = '#A6D3A0'; // Sorted
                await sleep(10);
            }
        };

        // Radix Sort
        const radixSort = async () => {
            const bars = document.querySelectorAll('.bar');
            let max = Math.max(...sortArray);
            for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
                await countingSortByDigit(exp);
            }
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = '#A6D3A0'; // Sorted
            }
        };

        const countingSortByDigit = async (exp) => {
            const bars = document.querySelectorAll('.bar');
            let output = new Array(sortArray.length).fill(0);
            let count = new Array(10).fill(0);

            for (let i = 0; i < sortArray.length; i++) {
                count[Math.floor(sortArray[i] / exp) % 10]++;
                bars[i].style.backgroundColor = '#FF6F61'; // Counting
                await sleep(5);
                bars[i].style.backgroundColor = '#6B5B95'; // Reset color
            }

            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1];
            }

            for (let i = sortArray.length - 1; i >= 0; i--) {
                let index = Math.floor(sortArray[i] / exp) % 10;
                output[count[index] - 1] = sortArray[i];
                count[index]--;
            }

            for (let i = 0; i < sortArray.length; i++) {
                sortArray[i] = output[i];
                bars[i].style.height = `${sortArray[i] * 3}px`;
                await sleep(5);
            }
        };

        // Shell Sort
        const shellSort = async () => {
            const bars = document.querySelectorAll('.bar');
            let n = sortArray.length;
            for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
                for (let i = gap; i < n; i++) {
                    let temp = sortArray[i];
                    let j;
                    bars[i].style.backgroundColor = '#FF6F61'; // Key element
                    await sleep(20);
                    for (j = i; j >= gap && sortArray[j - gap] > temp; j -= gap) {
                        sortArray[j] = sortArray[j - gap];
                        bars[j].style.height = `${sortArray[j] * 3}px`;
                        await sleep(20);
                    }
                    sortArray[j] = temp;
                    bars[j].style.height = `${sortArray[j] * 3}px`;
                    bars[i].style.backgroundColor = '#6B5B95'; // Reset color
                }
            }
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = '#A6D3A0'; // Sorted
            }
        };

        // Cocktail Shaker Sort
        const cocktailShakerSort = async () => {
            const bars = document.querySelectorAll('.bar');
            let start = 0;
            let end = sortArray.length - 1;
            let swapped = true;

            while (swapped) {
                swapped = false;
                for (let i = start; i < end; i++) {
                    bars[i].style.backgroundColor = '#FF6F61'; // Comparing
                    bars[i + 1].style.backgroundColor = '#FF6F61';
                    await sleep(20);
                    if (sortArray[i] > sortArray[i + 1]) {
                        [sortArray[i], sortArray[i + 1]] = [sortArray[i + 1], sortArray[i]];
                        bars[i].style.height = `${sortArray[i] * 3}px`;
                        bars[i + 1].style.height = `${sortArray[i + 1] * 3}px`;
                        swapped = true;
                    }
                    bars[i].style.backgroundColor = '#6B5B95'; // Reset color
                    bars[i + 1].style.backgroundColor = '#6B5B95';
                }
                if (!swapped) break;
                swapped = false;
                end--;
                for (let i = end - 1; i >= start; i--) {
                    bars[i].style.backgroundColor = '#FF6F61'; // Comparing
                    bars[i + 1].style.backgroundColor = '#FF6F61';
                    await sleep(20);
                    if (sortArray[i] > sortArray[i + 1]) {
                        [sortArray[i], sortArray[i + 1]] = [sortArray[i + 1], sortArray[i]];
                        bars[i].style.height = `${sortArray[i] * 3}px`;
                        bars[i + 1].style.height = `${sortArray[i + 1] * 3}px`;
                        swapped = true;
                    }
                    bars[i].style.backgroundColor = '#6B5B95'; // Reset color
                    bars[i + 1].style.backgroundColor = '#6B5B95';
                }
                start++;
            }
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = '#A6D3A0'; // Sorted
            }
        };

        // Initialize on page load
        initializeSortArray();
    } else {
        console.warn('Algorithm Visualizer elements not found on this page.');
    }
});

/* =========================================
   Educational Resources Functionality
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const educationalContent = {
        algorithms: [
			{
            name: "Brent's Algorithm",
            type: "Algorithm",
            description: "Finds a cycle in function value iterations using only two iterators.",
            pseudocode: `function brentsCycleFinding(f, x0):
    power = lam = 1
    tortoise = x0
    hare = f(x0)
    while tortoise != hare:
        if power == lam: // power is doubled
            tortoise = hare
            power *= 2
            lam = 0
        hare = f(hare)
        lam += 1
    return lam`,
            complexities: { time: "O(μ + λ)", space: "O(1)" }
        },
        {
            name: "Floyd's Cycle-Finding Algorithm",
            type: "Algorithm",
            description: "Finds a cycle in function value iterations by using two pointers moving at different speeds.",
            pseudocode: `function floydCycleFinding(f, x0):
    tortoise = f(x0)
    hare = f(f(x0))
    while tortoise != hare:
        tortoise = f(tortoise)
        hare = f(f(hare))
    mu = 0
    tortoise = x0
    while tortoise != hare:
        tortoise = f(tortoise)
        hare = f(hare)
        mu += 1
    lam = 1
    hare = f(tortoise)
    while tortoise != hare:
        hare = f(hare)
        lam += 1
    return (mu, lam)`,
            complexities: { time: "O(μ + λ)", space: "O(1)" }
        },
        {
            name: "Gale–Shapley Algorithm",
            type: "Algorithm",
            description: "Solves the stable marriage problem by finding a stable matching.",
            pseudocode: `function galeShapley(preferences):
    while any free man m who still has a woman w to propose to:
        w = next woman on m's list
        if w is free:
            (m, w) become engaged
        else if w prefers m over her current partner m':
            m' becomes free
            (m, w) become engaged
        else:
            m remains free`,
            complexities: { time: "O(n^2)", space: "O(n)" }
        },
        {
            name: "ACORN Generator",
            type: "Algorithm",
            description: "A pseudorandom number generator based on recursive modular arithmetic.",
            pseudocode: null, // Detailed pseudocode unavailable for brevity
            complexities: { time: "O(n)", space: "O(1)" }
        },
        {
            name: "Blum Blum Shub",
            type: "Algorithm",
            description: "A cryptographically secure pseudorandom number generator.",
            pseudocode: `function BBS(seed, n):
    x = seed
    for i in range(n):
        x = (x * x) mod M
        output x mod 2`,
            complexities: { time: "O(n)", space: "O(1)" }
        },
        {
            name: "Lagged Fibonacci Generator",
            type: "Algorithm",
            description: "Generates pseudorandom numbers based on Fibonacci relations.",
            pseudocode: `function laggedFibonacci(seed, j, k, n):
    for i in range(n):
        x = (seed[j] + seed[k]) mod m
        output x`,
            complexities: { time: "O(n)", space: "O(k)" }
        },
        {
            name: "Linear Congruential Generator",
            type: "Algorithm",
            description: "Generates a sequence of pseudorandom numbers using a linear congruence relation.",
            pseudocode: `function LCG(seed, a, c, m, n):
    x = seed
    for i in range(n):
        x = (a * x + c) mod m
        output x`,
            complexities: { time: "O(n)", space: "O(1)" }
        },
        {
            name: "Mersenne Twister",
            type: "Algorithm",
            description: "A fast and efficient pseudorandom number generator with a long period.",
            pseudocode: null, // Detailed pseudocode unavailable for brevity
            complexities: { time: "O(n)", space: "O(1)" }
        },
            {
                name: "Bubble Sort",
                type: "Algorithm",
                description: "Bubble Sort is a simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
                pseudocode: `for i from 1 to N\n    for j from 0 to N - i - 1\n        if array[j] > array[j + 1]\n            swap(array[j], array[j + 1])`,
                complexities: { time: "O(n²)", space: "O(1)" }
            },
            {
                name: "Quick Sort",
                type: "Algorithm",
                description: "Quick Sort selects a pivot and partitions the array around the pivot, sorting elements recursively.",
                pseudocode: `function quickSort(arr, left, right)\n    if left < right\n        pivotIndex = partition(arr, left, right)\n        quickSort(arr, left, pivotIndex - 1)\n        quickSort(arr, pivotIndex + 1, right)`,
                complexities: { time: "O(n log n)", space: "O(log n)" }
            }
        ],
		dataStructures: [
			{
            name: "Array",
            type: "Data Structure",
            description: "A collection of elements identified by index or key, stored in contiguous memory locations.",
            operations: ["Access", "Search", "Insertion", "Deletion"],
            complexities: { access: "O(1)", search: "O(n)", insertion: "O(n)", deletion: "O(n)" }
        },
        {
            name: "Associative Array",
            type: "Data Structure",
            description: "A collection of key-value pairs where keys are unique and used for fast retrieval of values.",
            operations: ["Insert", "Delete", "Search"],
            complexities: { insertion: "O(1)", deletion: "O(1)", search: "O(1)" }
        },
        {
            name: "Bit Array",
            type: "Data Structure",
            description: "An array that compactly stores bits and allows efficient bitwise operations.",
            operations: ["Set", "Clear", "Flip", "Test"],
            complexities: { set: "O(1)", clear: "O(1)", flip: "O(1)", test: "O(1)" }
        },
        {
            name: "Circular Buffer",
            type: "Data Structure",
            description: "A fixed-size buffer that wraps around when the end is reached.",
            operations: ["Enqueue", "Dequeue", "Peek"],
            complexities: { enqueue: "O(1)", dequeue: "O(1)", peek: "O(1)" }
        },
        {
            name: "Dynamic Array",
            type: "Data Structure",
            description: "An array that resizes dynamically to accommodate more elements as needed.",
            operations: ["Access", "Search", "Insertion", "Deletion"],
            complexities: { access: "O(1)", search: "O(n)", insertion: "O(1) amortized", deletion: "O(n)" }
        },
        {
            name: "Gap Buffer",
            type: "Data Structure",
            description: "A dynamic array with a gap in the middle to facilitate efficient insertions and deletions.",
            operations: ["Insert", "Delete", "Move Gap"],
            complexities: { insert: "O(n)", delete: "O(n)", moveGap: "O(1)" }
        },
        {
            name: "Hashed Array Tree",
            type: "Data Structure",
            description: "A dynamic array optimized for storage efficiency by splitting into fixed-size segments.",
            operations: ["Access", "Insertion", "Deletion"],
            complexities: { access: "O(1)", insertion: "O(1) amortized", deletion: "O(1) amortized" }
        },
        {
            name: "Matrix",
            type: "Data Structure",
            description: "A two-dimensional array that represents rows and columns of elements.",
            operations: ["Access", "Row Operations", "Column Operations"],
            complexities: { access: "O(1)", rowOperations: "O(n)", columnOperations: "O(m)" }
        },
        {
            name: "Parallel Array",
            type: "Data Structure",
            description: "A collection of arrays where each array stores the same logical data item for parallel processing.",
            operations: ["Access", "Search", "Insertion"],
            complexities: { access: "O(1)", search: "O(n)", insertion: "O(n)" }
        },
        {
            name: "Sorted Array",
            type: "Data Structure",
            description: "An array that maintains elements in sorted order.",
            operations: ["Binary Search", "Insertion", "Deletion"],
            complexities: { binarySearch: "O(log n)", insertion: "O(n)", deletion: "O(n)" }
        },
        {
            name: "Sparse Matrix",
            type: "Data Structure",
            description: "A matrix with a large number of zero or default values stored efficiently.",
            operations: ["Access", "Insertion", "Deletion"],
            complexities: { access: "O(1)", insertion: "O(1)", deletion: "O(1)" }
        },
        {
            name: "Variable-Length Array",
            type: "Data Structure",
            description: "An array with a size that can be defined or resized at runtime.",
            operations: ["Access", "Resize", "Insertion"],
            complexities: { access: "O(1)", resize: "O(n)", insertion: "O(1) amortized" }
        }
		]
    };

    const algorithmsGrid = document.getElementById('algorithms-grid');
    const searchInput = document.getElementById('educational-search'); // Correctly define searchInput
	  const dataStructuresGrid = document.getElementById('data-structures-grid');
    const modal = document.getElementById('educational-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    // Function to Open Modal
    const openModal = (item) => {
        modalTitle.textContent = item.name;
        modalContent.innerHTML = `
            <p>${item.description}</p>
            ${item.pseudocode ? `<h5>Pseudocode:</h5><pre>${item.pseudocode}</pre>` : ''}
            ${item.complexities ? `<h5>Complexities:</h5><ul>${Object.entries(item.complexities).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}</ul>` : ''}
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Function to Close Modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Attach Close Event to Modal Close Button
    document.querySelector('.modal-close-btn').addEventListener('click', closeModal);

    // Function to Create a Card
    const createCard = (item) => {
        const card = document.createElement('div');
        card.className = 'educational-card';
        card.innerHTML = `
            <h4>${item.name}</h4>
            <div class="description">${item.description}</div>
        `;
        card.addEventListener('click', () => openModal(item));
        return card;
    };

    // Render Cards
    const renderCards = (items, container) => {
        container.innerHTML = '';
        items.forEach(item => {
            const card = createCard(item);
            container.appendChild(card);
        });
    };

	const searchContent = (query) => {
        const lowerCaseQuery = query.toLowerCase();

        // Filter algorithms and data structures based on query
        const filteredAlgorithms = educationalContent.algorithms.filter((item) =>
            item.name.toLowerCase().includes(lowerCaseQuery) ||
            item.description.toLowerCase().includes(lowerCaseQuery)
        );
        const filteredDataStructures = educationalContent.dataStructures.filter((item) =>
            item.name.toLowerCase().includes(lowerCaseQuery) ||
            item.description.toLowerCase().includes(lowerCaseQuery)
        );

        // Render the filtered results
        renderCards(filteredAlgorithms, algorithmsGrid);
        renderCards(filteredDataStructures, dataStructuresGrid);
    };

    // Add Event Listener for Search Input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            searchContent(query);
        });
    } else {
        console.error("Search input element with id 'educational-search' not found.");
    }

    // Render Content
    renderCards(educationalContent.algorithms, algorithmsGrid);
    renderCards(educationalContent.dataStructures, dataStructuresGrid);

});


