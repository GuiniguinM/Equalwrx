// Job handling functionality
class JobHandler {
    constructor() {
        this.postedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];
    }

    // Add new job and create its description page
    addJob(jobData) {
        // Generate URL-friendly title
        const urlTitle = jobData.jobTitle.toLowerCase().replace(/\s+/g, '-');
        jobData.jobUrl = `job-description/${urlTitle}.html`;
        
        // Add to posted jobs
        this.postedJobs.push(jobData);
        localStorage.setItem('postedJobs', JSON.stringify(this.postedJobs));

        // Create job description HTML
        this.createJobDescriptionPage(jobData);

        // Update employer stats
        this.updateEmployerStats();
    }

    // Create HTML content for job description
    createJobDescriptionPage(jobData) {
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <title>${jobData.jobTitle}</title>
</head>
<body>
    <div class="container">
        <h1>${jobData.jobTitle}</h1>
        
        <div class="job-details">
            <div class="detail-group">
                <span class="label">Category:</span>
                <span class="value">${this.formatCategory(jobData.category)}</span>
            </div>
            
            <div class="detail-group">
                <span class="label">Employment Type:</span>
                <span class="value">${this.formatEmploymentType(jobData.employmentType)}</span>
            </div>
            
            <div class="detail-group">
                <span class="label">Location:</span>
                <span class="value">${jobData.location}</span>
            </div>
            
            <div class="detail-group">
                <span class="label">Salary Range:</span>
                <span class="value">${jobData.salary}</span>
            </div>
            
            <div class="detail-group">
                <span class="label">Posted:</span>
                <span class="value">${this.formatDate(jobData.datePosted)}</span>
            </div>
        </div>

        <div class="job-section">
            <h2>Job Description</h2>
            <p>${jobData.description}</p>
        </div>

        <div class="job-section">
            <h2>Requirements</h2>
            <p>${jobData.requirements}</p>
        </div>

        <div class="job-section">
            <h2>Benefits</h2>
            <p>${jobData.benefits}</p>
        </div>

        <button type="button" class="apply-btn">Apply Now</button>

        <button type="button" class="back-btn">
            <a href="../joblist.html" class="google-login-btn">
                <i class="fas fa-arrow-left"></i> Back to Job Listings
            </a>
        </button>
    </div>

    <style>
        .job-details {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .detail-group {
            margin: 10px 0;
        }

        .label {
            font-weight: bold;
            margin-right: 10px;
        }

        .job-section {
            margin: 30px 0;
        }

        .job-section h2 {
            color: #333;
            margin-bottom: 15px;
        }

        .apply-btn {
            background: #4CAF50;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1.1em;
            margin: 20px 0;
        }

        .apply-btn:hover {
            background: #45a049;
        }
    </style>
</body>
</html>`;

        // Use the Blob API to create a downloadable HTML file
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        
        // Create download link
        const a = document.createElement('a');
        a.href = url;
        a.download = jobData.jobUrl.split('/').pop(); // Get filename from URL
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Helper methods for formatting
    formatCategory(category) {
        const categories = {
            'salon': 'Salon Services',
            'kitchen': 'Kitchen Staff',
            'education': 'Education'
        };
        return categories[category] || category;
    }

    formatEmploymentType(type) {
        const types = {
            'full-time': 'Full-Time',
            'part-time': 'Part-Time',
            'contract': 'Contract'
        };
        return types[type] || type;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    updateEmployerStats() {
        const employerData = JSON.parse(localStorage.getItem('employerData')) || {};
        employerData.activeJobs = (employerData.activeJobs || 0) + 1;
        localStorage.setItem('employerData', JSON.stringify(employerData));
    }
}

// Export the JobHandler class
window.JobHandler = JobHandler; 