// Function to save resume data and sync between both pages
function saveAndSyncResume(data) {
    // Save to localStorage
    localStorage.setItem('resumeData', JSON.stringify(data));
    
    // Save the last updated timestamp
    localStorage.setItem('lastResumeUpdate', new Date().toISOString());
}

// Function to load resume data
function loadResumeData() {
    const savedResume = JSON.parse(localStorage.getItem('resumeData'));
    if (savedResume) {
        Object.keys(savedResume).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (element.hasAttribute('contenteditable')) {
                    element.innerHTML = savedResume[id];
                } else {
                    element.value = savedResume[id];
                }
            }
        });
    }

    // Load profile picture if exists
    const savedPic = localStorage.getItem('profilePicture');
    if (savedPic) {
        const profilePicElement = document.getElementById('profilePic');
        if (profilePicElement) {
            profilePicElement.src = savedPic;
        }
    }
}

// Function to collect form data
function collectFormData() {
    const formData = {};
    
    // Handle contenteditable elements
    document.querySelectorAll('[contenteditable="true"]').forEach(element => {
        formData[element.id] = element.innerHTML;
    });
    
    // Handle form inputs
    document.querySelectorAll('input, textarea').forEach(element => {
        if (element.name && element.value) {
            formData[element.name] = element.value;
        }
    });
    
    return formData;
} 