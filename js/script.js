document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const elements = {
        roomFileInput: document.getElementById('roomFileInput'),
        tileFileInput: document.getElementById('tileFileInput'),
        previewGrid: document.getElementById('previewGrid'),
        imagePreview: document.getElementById('imagePreview'),
        tilePreview: document.getElementById('tilePreview'),
        analyzeBtn: document.getElementById('analyzeBtn'),
        resultsPlaceholder: document.getElementById('resultsPlaceholder'),
        loadingIndicator: document.getElementById('loadingIndicator'),
        tileResults: document.getElementById('tileResults'),
        aiMessage: document.getElementById('aiMessage'),
        viewerPlaceholder: document.getElementById('viewerPlaceholder'),
        viewer3d: document.getElementById('viewer3d'),
        aiResponseText: document.getElementById('aiResponseText')
    };

    // State
    const state = {
        roomImageUploaded: false,
        tileImageUploaded: false
    };

    // Messages
    const messages = {
        aiMessages: [
            "Analyzing room dimensions and lighting conditions...",
            "Processing tile texture and pattern...",
            "Applying tile to room surfaces...",
            "Calculating optimal placement...",
            "Rendering 3D visualization...",
            "Finalizing lighting and shadows..."
        ],
        aiResponses: [
            "The tile complements your room's lighting and dimensions well. The pattern creates a sense of space and matches the room's aesthetic.",
            "This tile selection works perfectly with your room's color scheme and lighting conditions, creating a harmonious look.",
            "The tile's texture and color bring out the best features of your room, enhancing its overall appearance."
        ],
        singleImageResponse: "Only one image was uploaded. For best results, upload both a room and a tile image to see a complete 3D visualization."
    };

    // Event listeners
    function setupEventListeners() {
        elements.roomFileInput.addEventListener('change', () => handleFileUpload('room'));
        elements.tileFileInput.addEventListener('change', () => handleFileUpload('tile'));
        elements.analyzeBtn.addEventListener('click', analyzeImages);
    }

    // File upload handler
    function handleFileUpload(type) {
        const fileInput = type === 'room' ? elements.roomFileInput : elements.tileFileInput;
        const previewElement = type === 'room' ? elements.imagePreview : elements.tilePreview;
        
        if (!fileInput.files.length) return;
        
        const file = fileInput.files[0];
        if (!file.type.match('image.*')) {
            alert('Please upload an image file');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            previewElement.src = e.target.result;
            state[`${type}ImageUploaded`] = true;
            
            // Show preview grid and enable analyze button if at least one image is uploaded
            if (state.roomImageUploaded || state.tileImageUploaded) {
                elements.previewGrid.style.display = 'grid';
                elements.analyzeBtn.disabled = false;
            }
        };
        reader.readAsDataURL(file);
    }

    // Analyze images
    function analyzeImages() {
        if (!state.roomImageUploaded && !state.tileImageUploaded) {
            alert('Please upload at least one image (room or tile) to proceed');
            return;
        }
        
        showLoadingState();
        simulateProcessing();
    }

    // Show loading state
    function showLoadingState() {
        elements.resultsPlaceholder.style.display = 'none';
        elements.loadingIndicator.style.display = 'block';
        elements.tileResults.style.display = 'none';
        
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            elements.aiMessage.textContent = messages.aiMessages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.aiMessages.length;
        }, 2000);
        
        setTimeout(() => {
            clearInterval(messageInterval);
            showResults();
        }, 6000);
    }

    // Show results
    function showResults() {
        elements.loadingIndicator.style.display = 'none';
        elements.tileResults.style.display = 'block';
        elements.viewerPlaceholder.style.display = 'none';
        elements.viewer3d.style.display = 'block';
        
        // In a real implementation, this would initialize a 3D viewer
        elements.viewer3d.innerHTML = `
            <div class="viewer-content">
                <i class="fas fa-cube"></i>
                <p>3D Visualization of Your Room with Selected Tile</p>
                <p class="viewer-note">(In a real implementation, this would show an interactive 3D view)</p>
            </div>
        `;
        
        // Show AI response based on whether one or both images are uploaded
        if (state.roomImageUploaded && state.tileImageUploaded) {
            elements.aiResponseText.textContent = messages.aiResponses[
                Math.floor(Math.random() * messages.aiResponses.length)
            ];
        } else {
            elements.aiResponseText.textContent = messages.singleImageResponse;
        }
    }

    // Initialize
    function init() {
        setupEventListeners();
        elements.analyzeBtn.disabled = true;
        elements.previewGrid.style.display = 'none';
    }

    init();
});