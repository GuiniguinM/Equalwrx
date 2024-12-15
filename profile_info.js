// Get stored profile data or redirect if none exists
let profileData = JSON.parse(localStorage.getItem('profileData'));

// If no profile data exists, redirect to profile creation
if (!profileData) {
    window.location.href = 'profile.html';
}

// Elements
const profileView = document.getElementById('profileView');
const profileForm = document.getElementById('profileForm');
const editProfileForm = document.getElementById('editProfileForm');
const editButton = document.getElementById('editButton');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayProfileData();
    
    // Pre-fill form with existing data
    if (profileData) {
        Object.keys(profileData).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                input.value = profileData[key];
            }
        });
    }
});

// Display profile data
function displayProfileData() {
    if (!profileData || Object.keys(profileData).length === 0) {
        profileView.innerHTML = '<p class="no-data">No profile information available. Click Edit Profile to add your information.</p>';
        return;
    }

    const fields = {
        'first-name': 'First Name',
        'last-name': 'Last Name',
        'mid-name': 'Middle Name',
        'age': 'Age',
        'sex': 'Sex',
        'address': 'Address',
        'disability': 'Disability'
    };

    let html = '<div class="profile-info">';
    Object.entries(fields).forEach(([key, label]) => {
        if (profileData[key]) {
            html += `
                <div class="info-group">
                    <span class="info-label">${label}:</span>
                    <span class="info-value">${profileData[key]}</span>
                </div>
            `;
        }
    });
    html += '</div>';
    profileView.innerHTML = html;
}

// Toggle between view and edit mode
function toggleEditMode() {
    profileView.classList.toggle('hidden');
    profileForm.classList.toggle('hidden');
    editButton.classList.toggle('hidden');
}

// Handle form submission
editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Update profile data
    const formData = new FormData(editProfileForm);
    formData.forEach((value, key) => {
        profileData[key] = value;
    });

    // Save to localStorage
    localStorage.setItem('profileData', JSON.stringify(profileData));

    // Update display and return to view mode
    displayProfileData();
    toggleEditMode();
}); 