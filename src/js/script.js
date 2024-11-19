// script.js

// Throttle function to limit event firing
function throttle(fn, wait) {
    let time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn.apply(this, arguments);
            time = Date.now();
        }
    }
}

// Function to create a tree using d3.forceSimulation()
const createTree = (data, containerId, treeColor) => {
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

    // Create simulation
    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id).distance(150).strength(1))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(50));

    // Convert data to flat structure
    const root = d3.hierarchy(data);
    const nodes = root.descendants().map(d => Object.assign({}, d));
    const links = root.links().map(d => Object.assign({}, d));

    // Assign unique IDs
    nodes.forEach((d, i) => { d.id = `${containerId}-node-${i}`; });

    // Create links
    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", treeColor.linkColor || "#808782")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.6);

    // Create nodes
    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", d => 15 + d.depth * 5) // Variable node sizes based on depth
        .attr("fill", treeColor.nodeColor || "#A6D3A0")
        .attr("stroke", treeColor.borderColor || "#B3FFB3")
        .attr("stroke-width", 2)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleClick);

    // Create labels
    const label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("text-anchor", "middle")
        .attr("dy", 5)
        .attr("fill", "#656565")
        .attr("pointer-events", "none") // Allow mouse events to pass through labels to circles
        .text(d => d.data.name);

    // Define gradient for nodes
    const defs = svg.append("defs");

    const gradient = defs.append("linearGradient")
        .attr("id", `${containerId}-gradient`)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", treeColor.nodeColor);

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", treeColor.hoverColor);

    // Update node fill to use gradient
    node.attr("fill", `url(#${containerId}-gradient)`);

    // Start simulation
    simulation
        .nodes(nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(links);

    // Tick function to update positions
    function ticked() {
        // Update link positions
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        // Update node positions
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        // Update label positions
        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    }

    // Drag functions
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

    // Mouseover and mouseout handlers for node interaction
    function handleMouseOver(event, d) {
        d3.select(this).attr("fill", treeColor.hoverColor || "#B3FFB3");
        // Temporarily increase repulsion
        simulation.force("charge").strength(-500);
        simulation.alpha(1).restart();
    }

    function handleMouseOut(event, d) {
        d3.select(this).attr("fill", `url(#${containerId}-gradient)`); // Revert to gradient
        // Reset repulsion strength
        simulation.force("charge").strength(-300);
        simulation.alpha(1).restart();
    }

    // Click handler to open modal or display node info
    function handleClick(event, d) {
        // Implement modal functionality
        modalTitle.textContent = `Node: ${d.data.name}`;
        modalBody.textContent = `Details about ${d.data.name} will appear here. You can expand this section to include more information about the node, its connections, and related algorithms or data structures.`;
        modal.style.display = 'block';
    }
};

// Example Tree Data for Left Tree
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

// Example Tree Data for Right Tree
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

// Initialize Trees with Correct Colors
document.addEventListener('DOMContentLoaded', () => {
    createTree(treeDataLeft, 'tree-container', {
        nodeColor: '#FF6F61', // Coral for Left Tree
        linkColor: '#FF6F61',
        borderColor: '#FFB6B3',
        hoverColor: '#FF8C69'
    });

    createTree(treeDataRight, 'tree-container', {
        nodeColor: '#6B5B95', // Indigo for Right Tree
        linkColor: '#6B5B95',
        borderColor: '#B3A2D0',
        hoverColor: '#8365C9'
    });
});

// Modal Functionality
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

