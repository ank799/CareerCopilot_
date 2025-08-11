// CareerCopilot Application JavaScript
class CareerCopilotApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'landing';
        this.isAuthenticated = false;
        this.theme = 'light';
        
        // Sample data from the provided JSON
        this.sampleJobs = [
            {
                id: 1,
                title: "Senior Software Engineer",
                company: "TechCorp Inc",
                location: "San Francisco, CA",
                salary: "$120,000 - $160,000",
                type: "Full-time",
                remote: true,
                posted: "2 days ago",
                description: "We are looking for a senior software engineer to join our growing team. You will work on cutting-edge technologies and help build scalable systems that serve millions of users.",
                requirements: ["5+ years experience", "React.js", "Node.js", "PostgreSQL"],
                status: "active"
            },
            {
                id: 2,
                title: "Product Manager",
                company: "InnovateLabs",
                location: "New York, NY",
                salary: "$100,000 - $140,000",
                type: "Full-time",
                remote: false,
                posted: "1 day ago",
                description: "Join our product team to drive innovation and growth. Lead cross-functional teams to deliver exceptional user experiences.",
                requirements: ["3+ years PM experience", "Agile methodologies", "Data analysis"],
                status: "active"
            },
            {
                id: 3,
                title: "Data Scientist",
                company: "DataDriven Solutions",
                location: "Austin, TX",
                salary: "$90,000 - $130,000",
                type: "Full-time",
                remote: true,
                posted: "3 days ago",
                description: "Seeking a data scientist to work on machine learning projects that drive business insights and automation.",
                requirements: ["Python", "Machine Learning", "SQL", "Statistics"],
                status: "active"
            },
            {
                id: 4,
                title: "UX Designer",
                company: "Design Studio Pro",
                location: "Seattle, WA",
                salary: "$80,000 - $110,000",
                type: "Full-time",
                remote: true,
                posted: "1 week ago",
                description: "Create amazing user experiences for our digital products. Work with product managers and engineers to design intuitive interfaces.",
                requirements: ["Figma", "User Research", "Prototyping", "Design Systems"],
                status: "active"
            },
            {
                id: 5,
                title: "DevOps Engineer",
                company: "CloudScale Systems",
                location: "Denver, CO",
                salary: "$95,000 - $125,000",
                type: "Full-time",
                remote: true,
                posted: "4 days ago",
                description: "Help us build and maintain scalable cloud infrastructure. Work with modern DevOps tools and practices.",
                requirements: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
                status: "active"
            },
            {
                id: 6,
                title: "Frontend Developer",
                company: "WebCraft Studios",
                location: "Los Angeles, CA",
                salary: "$75,000 - $105,000",
                type: "Full-time",
                remote: true,
                posted: "5 days ago",
                description: "Build responsive and interactive web applications using modern frontend technologies.",
                requirements: ["React", "TypeScript", "CSS", "JavaScript", "Git"],
                status: "active"
            }
        ];

        this.userApplications = [
            {
                id: 1,
                jobId: 1,
                jobTitle: "Senior Software Engineer",
                company: "TechCorp Inc",
                appliedDate: "2025-01-07",
                status: "Applied",
                source: "LinkedIn",
                notes: "Automated application sent successfully"
            },
            {
                id: 2,
                jobId: 2,
                jobTitle: "Product Manager",
                company: "InnovateLabs",
                appliedDate: "2025-01-06",
                status: "Interview Scheduled",
                source: "Indeed",
                notes: "Phone interview scheduled for next week"
            },
            {
                id: 3,
                jobId: 3,
                jobTitle: "Data Scientist",
                company: "DataDriven Solutions",
                appliedDate: "2025-01-05",
                status: "Viewed",
                source: "Company Website",
                notes: "Application was viewed by recruiter"
            },
            {
                id: 4,
                jobId: 4,
                jobTitle: "UX Designer",
                company: "Design Studio Pro",
                appliedDate: "2025-01-03",
                status: "Rejected",
                source: "Glassdoor",
                notes: "Not a good fit according to feedback"
            }
        ];

        this.dashboardStats = {
            totalApplications: 47,
            responsesReceived: 12,
            interviewsScheduled: 3,
            successRate: "25.5%",
            activeApplications: 28,
            thisWeekApplications: 8
        };

        this.filteredJobs = [...this.sampleJobs];
        this.filteredApplications = [...this.userApplications];
    }

    init() {
        this.createDemoPage();
        this.setupEventListeners();
        this.updateNavigation();
        this.renderCurrentPage();
        this.initTheme();
        this.setupGlobalFunctions();
    }

    createDemoPage() {
        // Create demo page HTML if it doesn't exist
        if (!document.getElementById('demoPage')) {
            const mainContent = document.getElementById('mainContent');
            const demoPageHTML = `
                <div class="page hidden" id="demoPage">
                    <div class="container">
                        <div class="demo-header">
                            <h1>Product Demo</h1>
                            <p>See how CareerCopilot automates your job search</p>
                        </div>
                        <div class="demo-content">
                            <div class="demo-video" style="background: var(--color-bg-1); padding: 60px; text-align: center; border-radius: var(--radius-lg); margin-bottom: 32px;">
                                <h3>🎬 Demo Video Coming Soon</h3>
                                <p>Watch how our AI-powered system automatically applies to jobs matching your criteria</p>
                                <button class="btn btn--primary" onclick="navigateTo('register')">Start Your Free Trial</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            mainContent.insertAdjacentHTML('beforeend', demoPageHTML);
        }
    }

    setupGlobalFunctions() {
        // Make functions globally available
        window.navigateTo = (page) => {
            console.log('Global navigateTo called with:', page);
            this.navigateTo(page);
        };
        window.app = this;
    }

    setupEventListeners() {
        // Wait for DOM to be fully loaded
        document.addEventListener('click', (e) => {
            // Handle navigation clicks
            if (e.target.matches('a[onclick*="navigateTo"]')) {
                e.preventDefault();
                return; // Let onclick handle it
            }

            // Handle CTA buttons on landing page
            if (e.target.matches('.hero-actions .btn--primary') || 
                (e.target.classList.contains('btn') && e.target.textContent.includes('Start Free Trial'))) {
                e.preventDefault();
                console.log('Start Free Trial clicked');
                this.navigateTo('register');
                return;
            }

            if (e.target.matches('.hero-actions .btn--outline') || 
                (e.target.classList.contains('btn') && e.target.textContent.includes('Watch Demo'))) {
                e.preventDefault();
                console.log('Watch Demo clicked');
                this.navigateTo('demo');
                return;
            }

            // Handle pricing buttons
            if (e.target.classList.contains('btn') && e.target.textContent === 'Contact Sales') {
                e.preventDefault();
                this.showNotification('Please contact sales at sales@careercopilot.com');
                return;
            }

            // Handle job application buttons
            if (e.target.textContent === 'Quick Apply' && e.target.onclick) {
                return; // Let the onclick handler work
            }

            if (e.target.textContent === 'View Details' && e.target.onclick) {
                return; // Let the onclick handler work
            }
        });

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }

        // Auth button
        const authButton = document.getElementById('authButton');
        if (authButton) {
            authButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleAuthClick();
            });
        }

        // Form submissions
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => this.handleProfileSave(e));
        }

        const automationForm = document.getElementById('automationForm');
        if (automationForm) {
            automationForm.addEventListener('submit', (e) => this.handleAutomationSave(e));
        }

        // Setup search and filter listeners
        this.setupSearchListeners();
    }

    setupSearchListeners() {
        // Job search and filters
        const jobSearchInput = document.getElementById('jobSearchInput');
        if (jobSearchInput) {
            jobSearchInput.addEventListener('input', () => this.filterJobs());
        }

        const locationFilter = document.getElementById('locationFilter');
        if (locationFilter) {
            locationFilter.addEventListener('change', () => this.filterJobs());
        }

        const salaryFilter = document.getElementById('salaryFilter');
        if (salaryFilter) {
            salaryFilter.addEventListener('change', () => this.filterJobs());
        }

        const typeFilter = document.getElementById('typeFilter');
        if (typeFilter) {
            typeFilter.addEventListener('change', () => this.filterJobs());
        }

        // Application filters
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterApplications());
        }

        const applicationSearchInput = document.getElementById('applicationSearchInput');
        if (applicationSearchInput) {
            applicationSearchInput.addEventListener('input', () => this.filterApplications());
        }

        // Quality threshold slider
        const qualityThreshold = document.getElementById('qualityThreshold');
        if (qualityThreshold) {
            qualityThreshold.addEventListener('input', (e) => {
                const rangeValue = document.querySelector('.range-value');
                if (rangeValue) {
                    rangeValue.textContent = e.target.value + '%';
                }
            });
        }
    }

    initTheme() {
        this.setTheme(this.theme);
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        this.showNotification(`Switched to ${newTheme} theme`);
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-color-scheme', theme);
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    navigateTo(page) {
        console.log('Navigating to:', page);
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.add('hidden');
        });
        
        // Show target page
        const targetPage = document.getElementById(`${page}Page`);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            this.currentPage = page;
            console.log('Successfully navigated to:', page);
        } else {
            console.warn(`Page not found: ${page}Page`);
            return;
        }

        // Update navigation
        this.updateNavigation();

        // Render page-specific content
        this.renderCurrentPage();

        // Scroll to top
        window.scrollTo(0, 0);
    }

    updateNavigation() {
        const navbarNav = document.getElementById('navbarNav');
        const authButton = document.getElementById('authButton');

        if (!navbarNav || !authButton) {
            console.warn('Navigation elements not found');
            return;
        }

        if (this.isAuthenticated) {
            navbarNav.innerHTML = `
                <a href="#" onclick="navigateTo('dashboard')" class="${this.currentPage === 'dashboard' ? 'active' : ''}">Dashboard</a>
                <a href="#" onclick="navigateTo('jobs')" class="${this.currentPage === 'jobs' ? 'active' : ''}">Jobs</a>
                <a href="#" onclick="navigateTo('applications')" class="${this.currentPage === 'applications' ? 'active' : ''}">Applications</a>
                <a href="#" onclick="navigateTo('analytics')" class="${this.currentPage === 'analytics' ? 'active' : ''}">Analytics</a>
                <a href="#" onclick="navigateTo('profile')" class="${this.currentPage === 'profile' ? 'active' : ''}">Profile</a>
                <a href="#" onclick="navigateTo('automation')" class="${this.currentPage === 'automation' ? 'active' : ''}">Automation</a>
                <a href="#" onclick="navigateTo('settings')" class="${this.currentPage === 'settings' ? 'active' : ''}">Settings</a>
            `;
            authButton.textContent = 'Logout';
            authButton.onclick = (e) => {
                e.preventDefault();
                this.handleLogout();
            };
        } else {
            navbarNav.innerHTML = `
                <a href="#" onclick="navigateTo('landing')" class="${this.currentPage === 'landing' ? 'active' : ''}">Home</a>
                <a href="#" onclick="navigateTo('demo')" class="${this.currentPage === 'demo' ? 'active' : ''}">Demo</a>
            `;
            authButton.textContent = 'Login';
            authButton.onclick = (e) => {
                e.preventDefault();
                this.navigateTo('login');
            };
        }
    }

    renderCurrentPage() {
        console.log('Rendering page:', this.currentPage);
        switch (this.currentPage) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'jobs':
                this.renderJobs();
                break;
            case 'applications':
                this.renderApplications();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
            default:
                break;
        }
    }

    renderDashboard() {
        // Update stats
        const elements = {
            totalApplications: document.getElementById('totalApplications'),
            responsesReceived: document.getElementById('responsesReceived'),
            interviewsScheduled: document.getElementById('interviewsScheduled'),
            successRate: document.getElementById('successRate')
        };

        if (elements.totalApplications) elements.totalApplications.textContent = this.dashboardStats.totalApplications;
        if (elements.responsesReceived) elements.responsesReceived.textContent = this.dashboardStats.responsesReceived;
        if (elements.interviewsScheduled) elements.interviewsScheduled.textContent = this.dashboardStats.interviewsScheduled;
        if (elements.successRate) elements.successRate.textContent = this.dashboardStats.successRate;

        // Render activity feed
        const activityFeed = document.getElementById('activityFeed');
        if (activityFeed) {
            const recentActivities = [
                { title: 'Applied to Senior Software Engineer at TechCorp', time: '2 hours ago' },
                { title: 'Interview scheduled with InnovateLabs', time: '1 day ago' },
                { title: 'Application viewed by DataDriven Solutions', time: '2 days ago' },
                { title: 'Profile updated', time: '3 days ago' },
                { title: 'Automation settings configured', time: '4 days ago' }
            ];

            activityFeed.innerHTML = recentActivities.map(activity => `
                <div class="activity-item">
                    <h4>${activity.title}</h4>
                    <p>${activity.time}</p>
                </div>
            `).join('');
        }
    }

    renderJobs() {
        const jobsList = document.getElementById('jobsList');
        if (!jobsList) return;

        if (this.filteredJobs.length === 0) {
            jobsList.innerHTML = '<div class="loading">No jobs found matching your criteria</div>';
            return;
        }

        jobsList.innerHTML = this.filteredJobs.map(job => `
            <div class="job-card">
                <div class="job-header">
                    <div>
                        <h3 class="job-title">${job.title}</h3>
                        <div class="job-company">${job.company}</div>
                    </div>
                    <div class="job-salary">${job.salary}</div>
                </div>
                <div class="job-meta">
                    <span>📍 ${job.location}</span>
                    <span>💼 ${job.type}</span>
                    <span>${job.remote ? '🏠 Remote' : '🏢 On-site'}</span>
                    <span>🕒 ${job.posted}</span>
                </div>
                <div class="job-description">${job.description}</div>
                <div class="job-requirements">
                    ${job.requirements.map(req => `<span class="requirement-tag">${req}</span>`).join('')}
                </div>
                <div class="job-actions">
                    <button class="btn btn--primary" onclick="app.applyToJob(${job.id})">Quick Apply</button>
                    <button class="btn btn--outline" onclick="app.viewJobDetails(${job.id})">View Details</button>
                </div>
            </div>
        `).join('');

        // Re-setup search listeners after rendering
        setTimeout(() => this.setupSearchListeners(), 100);
    }

    renderApplications() {
        const applicationsTable = document.getElementById('applicationsTable');
        if (!applicationsTable) return;

        if (this.filteredApplications.length === 0) {
            applicationsTable.innerHTML = '<div class="loading">No applications found</div>';
            return;
        }

        applicationsTable.innerHTML = this.filteredApplications.map(app => `
            <div class="application-row">
                <div>
                    <div class="application-job">${app.jobTitle}</div>
                    <div class="application-company">${app.company}</div>
                </div>
                <div>${app.appliedDate}</div>
                <div class="application-status status-${app.status.toLowerCase().replace(' ', '-')}">${app.status}</div>
                <div>${app.source}</div>
                <div>
                    <button class="btn btn--outline btn--sm" onclick="app.viewApplication(${app.id})">View</button>
                </div>
            </div>
        `).join('');

        // Re-setup search listeners after rendering
        setTimeout(() => this.setupSearchListeners(), 100);
    }

    renderAnalytics() {
        setTimeout(() => {
            const canvas = document.getElementById('successChart');
            if (!canvas || !window.Chart) return;

            const ctx = canvas.getContext('2d');
            
            if (window.myChart) {
                window.myChart.destroy();
            }
            
            window.myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    datasets: [{
                        label: 'Applications Sent',
                        data: [12, 15, 18, 14, 20, 8],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true
                    }, {
                        label: 'Responses Received',
                        data: [2, 4, 3, 5, 4, 2],
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }, 100);
    }

    filterJobs() {
        const searchInput = document.getElementById('jobSearchInput');
        const locationFilter = document.getElementById('locationFilter');
        const salaryFilter = document.getElementById('salaryFilter');
        const typeFilter = document.getElementById('typeFilter');

        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const locationValue = locationFilter ? locationFilter.value : '';
        const salaryValue = salaryFilter ? salaryFilter.value : '';
        const typeValue = typeFilter ? typeFilter.value : '';

        this.filteredJobs = this.sampleJobs.filter(job => {
            const matchesSearch = !searchTerm || 
                                job.title.toLowerCase().includes(searchTerm) || 
                                job.company.toLowerCase().includes(searchTerm) ||
                                job.description.toLowerCase().includes(searchTerm);
            
            const matchesLocation = !locationValue || 
                                  (locationValue === 'remote' && job.remote) ||
                                  job.location.toLowerCase().includes(locationValue.replace('-', ' '));
            
            const matchesType = !typeValue || job.type.toLowerCase() === typeValue;
            
            return matchesSearch && matchesLocation && matchesType;
        });

        this.renderJobs();
        this.showNotification(`Found ${this.filteredJobs.length} matching jobs`);
    }

    filterApplications() {
        const statusFilter = document.getElementById('statusFilter');
        const searchInput = document.getElementById('applicationSearchInput');

        const statusValue = statusFilter ? statusFilter.value : '';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        this.filteredApplications = this.userApplications.filter(app => {
            const matchesStatus = !statusValue || app.status.toLowerCase().includes(statusValue);
            const matchesSearch = !searchTerm || 
                                app.jobTitle.toLowerCase().includes(searchTerm) ||
                                app.company.toLowerCase().includes(searchTerm);

            return matchesStatus && matchesSearch;
        });

        this.renderApplications();
    }

    handleAuthClick() {
        if (this.isAuthenticated) {
            this.handleLogout();
        } else {
            this.navigateTo('login');
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value : 'user@example.com';
        
        this.isAuthenticated = true;
        this.currentUser = { email: email, name: 'John Doe' };
        
        this.showNotification('Login successful!');
        this.navigateTo('dashboard');
    }

    handleRegister(e) {
        e.preventDefault();
        const emailInput = e.target.querySelector('input[type="email"]');
        const nameInput = e.target.querySelector('input[type="text"]');
        
        this.isAuthenticated = true;
        this.currentUser = { 
            email: emailInput ? emailInput.value : 'user@example.com',
            name: nameInput ? nameInput.value : 'John Doe'
        };
        
        this.showNotification('Account created successfully!');
        this.navigateTo('profile');
    }

    handleLogout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.showNotification('Logged out successfully');
        this.navigateTo('landing');
    }

    handleProfileSave(e) {
        e.preventDefault();
        this.showNotification('Profile updated successfully!');
        this.navigateTo('dashboard');
    }

    handleAutomationSave(e) {
        e.preventDefault();
        this.showNotification('Automation settings saved!');
    }

    applyToJob(jobId) {
        const job = this.sampleJobs.find(j => j.id === jobId);
        if (!job) return;

        const alreadyApplied = this.userApplications.some(app => app.jobId === jobId);
        if (alreadyApplied) {
            this.showNotification('You have already applied to this job', 'error');
            return;
        }

        const newApplication = {
            id: this.userApplications.length + 1,
            jobId: jobId,
            jobTitle: job.title,
            company: job.company,
            appliedDate: new Date().toISOString().split('T')[0],
            status: 'Applied',
            source: 'CareerCopilot',
            notes: 'Application submitted via automated system'
        };

        this.userApplications.push(newApplication);
        this.filteredApplications = [...this.userApplications];
        this.dashboardStats.totalApplications++;
        
        this.showNotification(`Applied to ${job.title} at ${job.company}!`);
    }

    viewJobDetails(jobId) {
        const job = this.sampleJobs.find(j => j.id === jobId);
        if (!job) return;

        alert(`Job Details:\n\nTitle: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}\nSalary: ${job.salary}\n\nDescription: ${job.description}\n\nRequirements:\n${job.requirements.join(', ')}`);
    }

    viewApplication(appId) {
        const application = this.userApplications.find(app => app.id === appId);
        if (!application) return;

        alert(`Application Details:\n\nJob: ${application.jobTitle}\nCompany: ${application.company}\nApplied: ${application.appliedDate}\nStatus: ${application.status}\nSource: ${application.source}\n\nNotes: ${application.notes}`);
    }

    showNotification(message, type = 'success') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    window.app = new CareerCopilotApp();
    window.app.init();
});

// Export for global access
window.CareerCopilotApp = CareerCopilotApp;