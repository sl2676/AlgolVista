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
   2. Modal Functionality
   ========================================= */
(function() {
    const modal = document.getElementById('nodeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeButton = document.querySelector('.close-button');

    // Function to open modal with node details
    const openModal = (data) => {
        if (modal && modalTitle && modalBody) {
            modalTitle.textContent = `Node: ${data.name}`;
            modalBody.textContent = `Details about ${data.name} will appear here. You can expand this section to include more information about the node, its connections, and related algorithms or data structures.`;
            modal.style.display = 'block';
        } else {
            console.warn('Modal elements not found.');
        }
    };

    // Close modal when the close button is clicked
    if (closeButton && modal) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (modal && event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Expose openModal to global scope for use in other modules
    window.openModal = openModal;
})();

/* =========================================
   3. Algorithm Visualizer
   ========================================= */
/*
(function() {
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
        'Cocktail Shaker Sort'
    ];

    // Initialize Array and Visualization Elements
    const sortContainer = document.getElementById('bubble-sort-container'); // Default container
    const startSortBtn = document.getElementById('start-sort');
    const resetSortBtn = document.getElementById('reset-sort');
    const algorithmSelect = document.getElementById('algorithm-select'); // Dropdown to select algorithm

    if (sortContainer && startSortBtn && resetSortBtn && algorithmSelect) {
        // Populate Algorithm Dropdown
        sortingAlgorithms.forEach(algo => {
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
            sortArray.forEach((value, index) => {
                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${value * 3}px`;
                bar.style.width = `${Math.floor(sortContainer.clientWidth / sortArray.length) - 2}px`;
                bar.style.margin = '1px';
                bar.style.backgroundColor = '#6B5B95'; // Indigo
                bar.setAttribute('data-index', index);
                sortContainer.appendChild(bar);
            });
        };

        // Utility function to pause execution
        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };

        // Sorting Algorithms Implementations

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
        const quickSort = async () => {
            await quickSortHelper(0, sortArray.length - 1);
        };

        const quickSortHelper = async (low, high) => {
            if (low < high) {
                let pi = await partition(low, high);
                await quickSortHelper(low, pi - 1);
                await quickSortHelper(pi + 1, high);
            }
        };

        const partition = async (low, high) => {
            let pivot = sortArray[high];
            let i = low - 1;
            const bars = document.querySelectorAll('.bar');

            for (let j = low; j < high; j++) {
                // Highlight bars being compared
                bars[j].style.backgroundColor = '#FF6F61'; // Coral
                bars[high].style.backgroundColor = '#FF6F61'; // Coral (pivot)

                await sleep(50);

                if (sortArray[j] < pivot) {
                    i++;
                    // Swap in array
                    [sortArray[i], sortArray[j]] = [sortArray[j], sortArray[i]];
                    // Swap in DOM
                    bars[i].style.height = `${sortArray[i] * 3}px`;
                    bars[j].style.height = `${sortArray[j] * 3}px`;
                }

                // Reset color
                bars[j].style.backgroundColor = '#6B5B95'; // Indigo
                bars[high].style.backgroundColor = '#6B5B95'; // Indigo
            }

            // Swap pivot to correct position
            [sortArray[i + 1], sortArray[high]] = [sortArray[high], sortArray[i + 1]];
            bars[i + 1].style.height = `${sortArray[i + 1] * 3}px`;
            bars[high].style.height = `${sortArray[high] * 3}px`;

            // Reset color
            bars[i + 1].style.backgroundColor = '#A6D3A0'; // Soft Green
            bars[high].style.backgroundColor = '#6B5B95'; // Indigo

            return i + 1;
        };

        // 3. Merge Sort
        const mergeSort = async () => {
            await mergeSortHelper(0, sortArray.length - 1);
            // Mark all as sorted
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.style.backgroundColor = '#A6D3A0'); // Soft Green
        };

        const mergeSortHelper = async (left, right) => {
            if (left < right) {
                let mid = Math.floor((left + right) / 2);
                await mergeSortHelper(left, mid);
                await mergeSortHelper(mid + 1, right);
                await merge(left, mid, right);
            }
        };

        const merge = async (left, mid, right) => {
            let n1 = mid - left + 1;
            let n2 = right - mid;

            let L = [];
            let R = [];

            for (let i = 0; i < n1; i++) L.push(sortArray[left + i]);
            for (let j = 0; j < n2; j++) R.push(sortArray[mid + 1 + j]);

            let i = 0, j = 0, k = left;
            const bars = document.querySelectorAll('.bar');

            while (i < n1 && j < n2) {
                // Highlight bars being compared
                bars[k].style.backgroundColor = '#FF6F61'; // Coral

                await sleep(50);

                if (L[i] <= R[j]) {
                    sortArray[k] = L[i];
                    bars[k].style.height = `${sortArray[k] * 3}px`;
                    i++;
                } else {
                    sortArray[k] = R[j];
                    bars[k].style.height = `${sortArray[k] * 3}px`;
                    j++;
                }

                // Reset color
                bars[k].style.backgroundColor = '#6B5B95'; // Indigo
                k++;
            }

            while (i < n1) {
                bars[k].style.backgroundColor = '#FF6F61'; // Coral
                sortArray[k] = L[i];
                bars[k].style.height = `${sortArray[k] * 3}px`;
                await sleep(50);
                bars[k].style.backgroundColor = '#6B5B95'; // Indigo
                i++;
                k++;
            }

            while (j < n2) {
                bars[k].style.backgroundColor = '#FF6F61'; // Coral
                sortArray[k] = R[j];
                bars[k].style.height = `${sortArray[k] * 3}px`;
                await sleep(50);
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

                // Highlight the key bar
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

                // Reset color
                bars[i].style.backgroundColor = '#6B5B95'; // Indigo
            }

            // Mark all as sorted
            bars.forEach(bar => bar.style.backgroundColor = '#A6D3A0'); // Soft Green
        };

        // 5. Selection Sort
        const selectionSort = async () => {
            const bars = document.querySelectorAll('.bar');
            for (let i = 0; i < sortArray.length; i++) {
                let minIdx = i;
                bars[minIdx].style.backgroundColor = '#FF6F61'; // Coral

                for (let j = i + 1; j < sortArray.length; j++) {
                    bars[j].style.backgroundColor = '#FF6F61'; // Coral
                    await sleep(50);

                    if (sortArray[j] < sortArray[minIdx]) {
                        bars[minIdx].style.backgroundColor = '#6B5B95'; // Indigo
                        minIdx = j;
                        bars[minIdx].style.backgroundColor = '#FF6F61'; // Coral
                    } else {
                        bars[j].style.backgroundColor = '#6B5B95'; // Indigo
                    }
                }

                if (minIdx !== i) {
                    // Swap in array
                    [sortArray[i], sortArray[minIdx]] = [sortArray[minIdx], sortArray[i]];
                    // Swap in DOM
                    bars[i].style.height = `${sortArray[i] * 3}px`;
                    bars[minIdx].style.height = `${sortArray[minIdx] * 3}px`;
                }

                bars[minIdx].style.backgroundColor = '#6B5B95'; // Indigo
                bars[i].style.backgroundColor = '#A6D3A0'; // Soft Green
            }
        };

        // 6. Heap Sort
        const heapSort = async () => {
            const bars = document.querySelectorAll('.bar');

            // Build heap (rearrange array)
            for (let i = Math.floor(sortArray.length / 2) - 1; i >= 0; i--) {
                await heapify(sortArray.length, i, bars);
            }

            // One by one extract elements
            for (let i = sortArray.length - 1; i > 0; i--) {
                // Move current root to end
                [sortArray[0], sortArray[i]] = [sortArray[i], sortArray[0]];
                bars[0].style.height = `${sortArray[0] * 3}px`;
                bars[i].style.height = `${sortArray[i] * 3}px`;
                bars[i].style.backgroundColor = '#A6D3A0'; // Soft Green

                // Call max heapify on the reduced heap
                await heapify(i, 0, bars);
            }

            // Mark all as sorted
            bars.forEach(bar => bar.style.backgroundColor = '#A6D3A0'); // Soft Green
        };

        const heapify = async (n, i, bars) => {
            let largest = i; // Initialize largest as root
            let l = 2 * i + 1; // left = 2*i + 1
            let r = 2 * i + 2; // right = 2*i + 2

            // If left child is larger than root
            if (l < n && sortArray[l] > sortArray[largest]) {
                largest = l;
            }

            // If right child is larger than largest so far
            if (r < n && sortArray[r] > sortArray[largest]) {
                largest = r;
            }

            // If largest is not root
            if (largest !== i) {
                bars[i].style.backgroundColor = '#FF6F61'; // Coral
                bars[largest].style.backgroundColor = '#FF6F61'; // Coral

                await sleep(50);

                // Swap in array
                [sortArray[i], sortArray[largest]] = [sortArray[largest], sortArray[i]];
                // Swap in DOM
                bars[i].style.height = `${sortArray[i] * 3}px`;
                bars[largest].style.height = `${sortArray[largest] * 3}px`;

                bars[i].style.backgroundColor = '#6B5B95'; // Indigo
                bars[largest].style.backgroundColor = '#6B5B95'; // Indigo

                // Recursively heapify the affected sub-tree
                await heapify(n, largest, bars);
            }
        };

        // 7. Counting Sort
        const countingSort = async () => {
            const bars = document.querySelectorAll('.bar');
            let max = Math.max(...sortArray);
            let count = new Array(max + 1).fill(0);

            // Store count of each element
            for (let i = 0; i < sortArray.length; i++) {
                count[sortArray[i]]++;
                bars[i].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(30);
                bars[i].style.backgroundColor = '#6B5B95'; // Indigo
            }

            // Change count[i] so that count[i] contains actual position of this digit in output[]
            for (let i = 1; i <= max; i++) {
                count[i] += count[i - 1];
            }

            // Build the output array
            let output = new Array(sortArray.length);
            for (let i = sortArray.length - 1; i >= 0; i--) {
                output[count[sortArray[i]] - 1] = sortArray[i];
                count[sortArray[i]]--;
                bars[i].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(30);
                bars[i].style.backgroundColor = '#6B5B95'; // Indigo
            }

            // Copy the output array to sortArray
            for (let i = 0; i < sortArray.length; i++) {
                sortArray[i] = output[i];
                bars[i].style.height = `${sortArray[i] * 3}px`;
                bars[i].style.backgroundColor = '#A6D3A0'; // Soft Green
                await sleep(10);
            }
        };

        // 8. Radix Sort
        const radixSort = async () => {
            const bars = document.querySelectorAll('.bar');
            const max = Math.max(...sortArray);
            let exp = 1;

            while (Math.floor(max / exp) > 0) {
                await countingSortRadix(exp, bars);
                exp *= 10;
            }

            // Mark all as sorted
            bars.forEach(bar => bar.style.backgroundColor = '#A6D3A0'); // Soft Green
        };

        const countingSortRadix = async (exp, bars) => {
            let n = sortArray.length;
            let output = new Array(n).fill(0);
            let count = new Array(10).fill(0);

            // Store count of occurrences in count[]
            for (let i = 0; i < n; i++) {
                let index = Math.floor(sortArray[i] / exp) % 10;
                count[index]++;
                bars[i].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(10);
                bars[i].style.backgroundColor = '#6B5B95'; // Indigo
            }

            // Change count[i] so that count[i] contains actual position of this digit in output[]
            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1];
            }

            // Build the output array
            for (let i = n - 1; i >= 0; i--) {
                let index = Math.floor(sortArray[i] / exp) % 10;
                output[count[index] - 1] = sortArray[i];
                count[index]--;
                bars[i].style.backgroundColor = '#FF6F61'; // Coral
                await sleep(10);
                bars[i].style.backgroundColor = '#6B5B95'; // Indigo
            }

            // Copy the output array to sortArray
            for (let i = 0; i < n; i++) {
                sortArray[i] = output[i];
                bars[i].style.height = `${sortArray[i] * 3}px`;
                bars[i].style.backgroundColor = '#A6D3A0'; // Soft Green
                await sleep(5);
            }
        };

        // 9. Shell Sort
        const shellSort = async () => {
            const bars = document.querySelectorAll('.bar');
            let n = sortArray.length;
            // Start with a big gap, then reduce the gap
            for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
                // Do a gapped insertion sort for this gap size.
                for (let i = gap; i < n; i++) {
                    // add sortArray[i] to the elements that have been gap sorted
                    let temp = sortArray[i];
                    let j;
                    // shift earlier gap-sorted elements up until the correct location for sortArray[i] is found
                    for (j = i; j >= gap && sortArray[j - gap] > temp; j -= gap) {
                        sortArray[j] = sortArray[j - gap];
                        bars[j].style.height = `${sortArray[j] * 3}px`;
                        bars[j].style.backgroundColor = '#FF6F61'; // Coral
                        await sleep(30);
                        bars[j].style.backgroundColor = '#6B5B95'; // Indigo
                    }
                    // put temp (the original sortArray[i]) in its correct location
                    sortArray[j] = temp;
                    bars[j].style.height = `${sortArray[j] * 3}px`;
                }
            }

            // Mark all as sorted
            bars.forEach(bar => bar.style.backgroundColor = '#A6D3A0'); // Soft Green
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
            bars.forEach(bar => bar.style.backgroundColor = '#A6D3A0'); // Soft Green
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
        if (startSortBtn && algorithmSelect) {
            startSortBtn.addEventListener('click', () => {
                const selectedAlgo = algorithmSelect.value;
                if (selectedAlgo === '') {
                    alert('Please select a sorting algorithm.');
                    return;
                }
                executeSort(selectedAlgo);
            });
        }

        // Event Listener for Reset Sort Button
        if (resetSortBtn) {
            resetSortBtn.addEventListener('click', () => {
                initializeSortArray();
            });
        }

        // Initialize on page load
        if (sortContainer && algorithmSelect) {
            initializeSortArray();
        }
    } else {
        console.warn('Algorithm Visualizer elements not found on this page.');
    }
})();
*/
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

        // Sorting Algorithms Implementations
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

        const executeSort = async (algorithm) => {
            switch (algorithm) {
                case 'Bubble Sort':
                    await bubbleSort();
                    break;
                case 'Quick Sort':
                    alert('Quick Sort not implemented yet.');
                    break;
                case 'Merge Sort':
                    alert('Merge Sort not implemented yet.');
                    break;
                case 'Insertion Sort':
                    alert('Insertion Sort not implemented yet.');
                    break;
                case 'Selection Sort':
                    alert('Selection Sort not implemented yet.');
                    break;
                case 'Heap Sort':
                    alert('Heap Sort not implemented yet.');
                    break;
                case 'Counting Sort':
                    alert('Counting Sort not implemented yet.');
                    break;
                case 'Radix Sort':
                    alert('Radix Sort not implemented yet.');
                    break;
                case 'Shell Sort':
                    alert('Shell Sort not implemented yet.');
                    break;
                case 'Cocktail Shaker Sort':
                    alert('Cocktail Shaker Sort not implemented yet.');
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


/* =========================================
   4. Data Structure Explorer
   ========================================= */
(function() {
    // Supported Data Structures
    const dataStructures = [
        'Binary Tree',
        'Binary Search Tree',
        'AVL Tree',
        'Heap',
        'Linked List',
        'Doubly Linked List',
        'Graph',
        'Stack',
        'Queue',
        'Hash Table'
    ];

    const treeContainer = document.getElementById('binary-tree-container'); // Default container
    const structureSelect = document.getElementById('structure-select'); // Dropdown to select data structure

    if (treeContainer && structureSelect) {
        // Populate Data Structure Dropdown
        dataStructures.forEach(ds => {
            const option = document.createElement('option');
            option.value = ds;
            option.textContent = ds;
            structureSelect.appendChild(option);
        });

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
            'AVL Tree': {
                name: "30",
                children: [
                    {
                        name: "20",
                        children: [
                            { name: "10" },
                            { name: "25" }
                        ]
                    },
                    {
                        name: "40",
                        children: [
                            { name: "35" },
                            { name: "50" }
                        ]
                    }
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
            'Linked List': {
                name: "1",
                children: [
                    { name: "2" },
                    { name: "3" },
                    { name: "4" },
                    { name: "5" }
                ]
            },
            'Doubly Linked List': {
                name: "A",
                children: [
                    { name: "B" },
                    { name: "C" },
                    { name: "D" },
                    { name: "E" }
                ]
            },
            'Graph': {
                name: "A",
                children: [
                    { name: "B" },
                    { name: "C" },
                    { name: "D" }
                ]
            },
            'Stack': {
                name: "Top",
                children: [
                    { name: "Element 2" },
                    { name: "Element 1" }
                ]
            },
            'Queue': {
                name: "Front",
                children: [
                    { name: "Element 1" },
                    { name: "Element 2" },
                    { name: "Rear" }
                ]
            },
            'Hash Table': {
                name: "Key1: Value1",
                children: [
                    { name: "Key2: Value2" },
                    { name: "Key3: Value3" },
                    { name: "Key4: Value4" }
                ]
            }
        };

        // Define Color Schemes for Each Data Structure
        const colorSchemes = {
            'Binary Tree': { nodeColor: '#FF6F61', linkColor: '#FF6F61', borderColor: '#FFB6B3' },
            'Binary Search Tree': { nodeColor: '#6B5B95', linkColor: '#6B5B95', borderColor: '#B3A2D0' },
            'AVL Tree': { nodeColor: '#FFA07A', linkColor: '#FFA07A', borderColor: '#FF7F50' },
            'Heap': { nodeColor: '#20B2AA', linkColor: '#20B2AA', borderColor: '#3CB371' },
            'Linked List': { nodeColor: '#9370DB', linkColor: '#9370DB', borderColor: '#8A2BE2' },
            'Doubly Linked List': { nodeColor: '#FF69B4', linkColor: '#FF69B4', borderColor: '#FF1493' },
            'Graph': { nodeColor: '#00CED1', linkColor: '#00CED1', borderColor: '#48D1CC' },
            'Stack': { nodeColor: '#FFD700', linkColor: '#FFD700', borderColor: '#FFA500' },
            'Queue': { nodeColor: '#00FA9A', linkColor: '#00FA9A', borderColor: '#32CD32' },
            'Hash Table': { nodeColor: '#DC143C', linkColor: '#DC143C', borderColor: '#B22222' }
        };

        // Function to create Data Structure Visualization using D3.js
        const createDataStructure = async (structure, containerId) => {
            const container = document.getElementById(containerId);
            if (!container) {
                console.warn(`Container with ID '${containerId}' not found.`);
                return;
            }

            const structureData = data[structure];
            const treeColor = colorSchemes[structure];

            if (!structureData || !treeColor) {
                console.warn(`Data or color scheme for '${structure}' not found.`);
                return;
            }

            const width = container.clientWidth;
            const height = container.clientHeight;

            // Clear existing SVG
            container.innerHTML = '';

            const svg = d3.select(`#${containerId}`)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background", "#f9f9f9");

            const root = d3.hierarchy(structureData);

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
                .attr('fill', '#fff')
                .style('pointer-events', 'none');
        };

        // Event Listener for Data Structure Selection
        structureSelect.addEventListener('change', (e) => {
            const selectedStructure = e.target.value;
            if (selectedStructure !== '') {
                createDataStructure(selectedStructure, 'binary-tree-container');
            }
        });

        // Initialize with default Data Structure if applicable
        // Example: Initialize with Binary Tree
        const defaultStructure = 'Binary Tree';
        structureSelect.value = defaultStructure;
        createDataStructure(defaultStructure, 'binary-tree-container');
    } else {
        console.warn('Data Structure Explorer elements not found on this page.');
    }
})();

/* =========================================
   5. Complexity Comparison Dashboard
   ========================================= */
(function() {
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
        "Insertion Sort": {
            time: "O(n²)",
            space: "O(1)"
        },
        "Selection Sort": {
            time: "O(n²)",
            space: "O(1)"
        },
        "Heap Sort": {
            time: "O(n log n)",
            space: "O(1)"
        },
        "Counting Sort": {
            time: "O(n + k)",
            space: "O(k)"
        },
        "Radix Sort": {
            time: "O(nk)",
            space: "O(n + k)"
        },
        "Shell Sort": {
            time: "O(n(log n)²)",
            space: "O(1)"
        },
        "Cocktail Shaker Sort": {
            time: "O(n²)",
            space: "O(1)"
        }
    };

    // Utility function to parse Big O Notation to numerical values for visualization
    const parseComplexity = (notation) => {
        // Mapping for common Big O notations
        const mapping = {
            "O(1)": 1,
            "O(log n)": 2,
            "O(n)": 3,
            "O(n log n)": 4,
            "O(n²)": 5,
            "O(n³)": 6,
            "O(nk)": 7,
            "O(n + k)": 8,
            "O(n(log n)²)": 9
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
            7: "O(nk)",
            8: "O(n + k)",
            9: "O(n(log n)²)"
        };
        return reverseMapping[value] || '';
    };

    // Initialize Chart.js Charts
    let timeChart, spaceChart;

    const initializeCharts = () => {
        const ctxTime = document.getElementById('time-complexity-chart').getContext('2d');
        const ctxSpace = document.getElementById('space-complexity-chart').getContext('2d');

        // Time Complexity Chart
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
                            },
                            stepSize: 1,
                            max: 9 // Adjust based on mapping
                        }
                    }
                }
            }
        });

        // Space Complexity Chart
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
                            },
                            stepSize: 1,
                            max: 9 // Adjust based on mapping
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

    // Event Listener for Compare Button
    const compareBtn = document.getElementById('compare-button');

    if (compareBtn) {
        compareBtn.addEventListener('click', compareComplexities);
    }

    // Initialize Charts on page load if in Complexity Dashboard page
    const timeChartCtx = document.getElementById('time-complexity-chart');
    const spaceChartCtx = document.getElementById('space-complexity-chart');

    if (timeChartCtx && spaceChartCtx) {
        initializeCharts();
    } else {
        console.warn('Chart.js elements not found on this page.');
    }
})();

/* =========================================
   6. Interactive Code Editor
   ========================================= */
(function() {
    const runCodeBtn = document.getElementById('run-code');
    const outputContainer = document.getElementById('output');
    const editorElement = document.getElementById('code'); // Textarea for CodeMirror

    if (runCodeBtn && outputContainer && editorElement) {
        // Initialize CodeMirror Editor
        const editor = CodeMirror.fromTextArea(editorElement, {
            lineNumbers: true,
            mode: "javascript",
            theme: "material",
            autoCloseBrackets: true,
            matchBrackets: true
        });

        // Run Code Functionality
        runCodeBtn.addEventListener('click', () => {
            const userCode = editor.getValue();
            try {
                const result = eval(userCode);
                outputContainer.textContent = result !== undefined ? result : 'Code executed successfully.';
            } catch (error) {
                outputContainer.textContent = `Error: ${error.message}`;
            }
        });
    } else {
        console.warn('Interactive Code Editor elements not found on this page.');
    }
})();

/* =========================================
   7. Graph Algorithms Visualizer (Optional Enhancement)
   ========================================= */
(function() {
    const graphContainer = document.getElementById('graph-container'); // Assuming a container exists
    const bfsBtn = document.getElementById('bfs-button');
    const dfsBtn = document.getElementById('dfs-button');

    if (graphContainer) {
        // Sample Graph Data
        const sampleGraph = {
            nodes: [
                { id: 'A' },
                { id: 'B' },
                { id: 'C' },
                { id: 'D' },
                { id: 'E' },
                { id: 'F' },
                { id: 'G' },
                { id: 'H' },
                { id: 'I' },
                { id: 'J' }
            ],
            links: [
                { source: 'A', target: 'B' },
                { source: 'A', target: 'C' },
                { source: 'B', target: 'D' },
                { source: 'B', target: 'E' },
                { source: 'C', target: 'F' },
                { source: 'C', target: 'G' },
                { source: 'D', target: 'H' },
                { source: 'E', target: 'I' },
                { source: 'F', target: 'J' }
            ]
        };

        // Function to create Graph Visualization
        const createGraph = async (data, containerId) => {
            const container = document.getElementById(containerId);
            if (!container) {
                console.warn(`Container with ID '${containerId}' not found.`);
                return;
            }

            const width = container.clientWidth;
            const height = container.clientHeight;

            // Clear existing SVG
            container.innerHTML = '';

            const svg = d3.select(`#${containerId}`)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background", "#f0f8ff");

            const simulation = d3.forceSimulation(data.nodes)
                .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
                .force("charge", d3.forceManyBody().strength(-400))
                .force("center", d3.forceCenter(width / 2, height / 2));

            // Draw links
            const link = svg.selectAll(".link")
                .data(data.links)
                .enter()
                .append("line")
                .attr("class", "link")
                .attr("stroke", "#999")
                .attr("stroke-width", 2);

            // Draw nodes
            const node = svg.selectAll(".node")
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
                .attr("fill", "#6B5B95")
                .on('click', (event, d) => {
                    openModal(d);
                });

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
        };

        // Function to perform BFS visualization
        const bfs = async (graph, start) => {
            const visited = {};
            const queue = [];
            queue.push(start);
            visited[start] = true;

            const nodes = document.querySelectorAll('.node');
            const nodeMap = {};
            nodes.forEach(node => {
                const id = node.querySelector('circle').__data__.id;
                nodeMap[id] = node;
            });

            while (queue.length > 0) {
                const current = queue.shift();
                // Highlight current node
                if (nodeMap[current]) {
                    nodeMap[current].querySelector('circle').setAttribute('fill', '#FFD700'); // Gold
                    await sleep(500);
                }

                // Find neighbors
                const neighbors = graph.links
                    .filter(link => link.source.id === current || link.target.id === current)
                    .map(link => link.source.id === current ? link.target.id : link.source.id);

                neighbors.forEach(neighbor => {
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        queue.push(neighbor);
                        // Highlight the edge
                        d3.selectAll('.link')
                            .filter(d => (d.source.id === current && d.target.id === neighbor) || (d.source.id === neighbor && d.target.id === current))
                            .attr('stroke', '#FFD700'); // Gold
                    }
                });
            }
        };

        // Function to perform DFS visualization
        const dfs = async (graph, start) => {
            const visited = {};
            const stack = [];
            stack.push(start);
            visited[start] = true;

            const nodes = document.querySelectorAll('.node');
            const nodeMap = {};
            nodes.forEach(node => {
                const id = node.querySelector('circle').__data__.id;
                nodeMap[id] = node;
            });

            while (stack.length > 0) {
                const current = stack.pop();
                // Highlight current node
                if (nodeMap[current]) {
                    nodeMap[current].querySelector('circle').setAttribute('fill', '#ADFF2F'); // GreenYellow
                    await sleep(500);
                }

                // Find neighbors
                const neighbors = graph.links
                    .filter(link => link.source.id === current || link.target.id === current)
                    .map(link => link.source.id === current ? link.target.id : link.source.id)
                    .reverse(); // Reverse for correct DFS order

                neighbors.forEach(neighbor => {
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        stack.push(neighbor);
                        // Highlight the edge
                        d3.selectAll('.link')
                            .filter(d => (d.source.id === current && d.target.id === neighbor) || (d.source.id === neighbor && d.target.id === current))
                            .attr('stroke', '#ADFF2F'); // GreenYellow
                    }
                });
            }
        };

        // Utility function to pause execution
        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };

        // Event Listener for Graph Controls (Assuming buttons exist)
        if (bfsBtn && dfsBtn) {
            // Sample Graph Data (Should match the one used in createGraph)
            const sampleGraph = {
                nodes: [
                    { id: 'A' },
                    { id: 'B' },
                    { id: 'C' },
                    { id: 'D' },
                    { id: 'E' },
                    { id: 'F' },
                    { id: 'G' },
                    { id: 'H' },
                    { id: 'I' },
                    { id: 'J' }
                ],
                links: [
                    { source: 'A', target: 'B' },
                    { source: 'A', target: 'C' },
                    { source: 'B', target: 'D' },
                    { source: 'B', target: 'E' },
                    { source: 'C', target: 'F' },
                    { source: 'C', target: 'G' },
                    { source: 'D', target: 'H' },
                    { source: 'E', target: 'I' },
                    { source: 'F', target: 'J' }
                ]
            };

            // Attach event listeners
            bfsBtn.addEventListener('click', () => {
                bfs(sampleGraph, 'A');
            });

            dfsBtn.addEventListener('click', () => {
                dfs(sampleGraph, 'A');
            });
        } else {
            console.warn('Graph control buttons not found on this page.');
        }

        // Initialize Graph Visualization on page load
        if (graphContainer) {
            createGraph(sampleGraph, 'graph-container');
        }
    } else {
        console.warn('Graph Algorithms Visualizer elements not found on this page.');
    }
})();

/* =========================================
   8. Responsive Design Handling
   ========================================= */
(function() {
    // Handle window resize for responsive visualizations
    window.addEventListener('resize', () => {
        // Re-render Data Structures
        const structureSelect = document.getElementById('structure-select');
        const treeContainer = document.getElementById('binary-tree-container');
        if (structureSelect && treeContainer) {
            const selectedStructure = structureSelect.value;
            if (selectedStructure !== '') {
                createDataStructure(selectedStructure, 'binary-tree-container');
            }
        }

        // Re-render Sorting Bars
        const sortContainer = document.getElementById('bubble-sort-container');
        if (sortContainer) {
            // Re-rendering the sort array with updated container width
            // Note: Ensure that the sortArray is accessible here or restructure the code accordingly
            // For simplicity, assuming sortArray is accessible
            // This might require additional restructuring
        }

        // Re-render Graphs
        const graphContainer = document.getElementById('graph-container');
        if (graphContainer) {
            // Recreate the graph with updated dimensions
            // This might require storing the graph data globally or passing it accordingly
        }
    });
})();

/* =========================================
   9. Initialization on Page Load
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Any additional initialization can be performed here
    console.log('AlgoVista script loaded successfully.');
});

