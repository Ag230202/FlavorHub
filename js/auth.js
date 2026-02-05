// Authentication Module
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthMode = 'login'; // 'login' or 'register'
        this.init();
    }

    init() {
        // Load user from localStorage
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }

        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Sign In button
        const signInBtn = document.getElementById('signInBtn');
        if (signInBtn) {
            signInBtn.addEventListener('click', () => this.openAuthModal('login'));
        }

        // Get Started button
        const getStartedBtn = document.getElementById('getStartedBtn');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => this.openAuthModal('register'));
        }

        // Close modal
        const closeBtn = document.getElementById('closeAuthModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeAuthModal());
        }

        // Click outside modal
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAuthModal();
                }
            });
        }

        // Switch mode button
        const switchBtn = document.getElementById('switchModeBtn');
        if (switchBtn) {
            switchBtn.addEventListener('click', () => this.switchMode());
        }

        // Form submit
        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.addEventListener('submit', (e) => this.handleAuthSubmit(e));
        }
    }

    openAuthModal(mode) {
        this.isAuthMode = mode;
        this.updateModalUI();
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.classList.remove('active');
        }
        // Reset form
        const form = document.getElementById('authForm');
        if (form) form.reset();
    }

    switchMode() {
        this.isAuthMode = this.isAuthMode === 'login' ? 'register' : 'login';
        this.updateModalUI();
    }

    updateModalUI() {
        const titleEl = document.getElementById('authModalTitle');
        const submitBtn = document.getElementById('authSubmitBtn');
        const switchText = document.getElementById('switchText');
        const switchBtn = document.getElementById('switchModeBtn');
        const usernameGroup = document.getElementById('usernameGroup');

        if (this.isAuthMode === 'login') {
            if (titleEl) titleEl.textContent = 'Sign In';
            if (submitBtn) submitBtn.textContent = 'Sign In';
            if (switchText) switchText.textContent = "Don't have an account?";
            if (switchBtn) switchBtn.textContent = 'Sign up';
            if (usernameGroup) usernameGroup.style.display = 'none';
        } else {
            if (titleEl) titleEl.textContent = 'Create Account';
            if (submitBtn) submitBtn.textContent = 'Create Account';
            if (switchText) switchText.textContent = 'Already have an account?';
            if (switchBtn) switchBtn.textContent = 'Sign in';
            if (usernameGroup) usernameGroup.style.display = 'block';
        }
    }

    async handleAuthSubmit(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;

        if (this.isAuthMode === 'register') {
            await this.register(email, password, username);
        } else {
            await this.login(email, password);
        }
    }

    async register(email, password, username) {
        // In a real app, this would call the backend API
        // For demo, we'll simulate with localStorage
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if user exists
            if (users.find(u => u.email === email)) {
                alert('User already exists with this email');
                return;
            }

            const newUser = {
                id: Date.now(),
                email,
                username: username || email.split('@')[0],
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Auto login
            this.currentUser = newUser;
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            this.updateUI();
            this.closeAuthModal();
            alert('Account created successfully!');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    }

    async login(email, password) {
        // In a real app, this would call the backend API
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email);

            if (!user) {
                alert('User not found. Please register first.');
                return;
            }

            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            this.updateUI();
            this.closeAuthModal();
            alert('Logged in successfully!');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUI();
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    }

    updateUI() {
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions) return;

        if (this.currentUser) {
            headerActions.innerHTML = `
                <div class="user-menu">
                    <button class="btn btn-outline" id="userMenuBtn">
                        <div style="width: 1.75rem; height: 1.75rem; border-radius: 50%; background-color: var(--primary); display: flex; align-items: center; justify-content: center;">
                            <span style="font-size: 0.75rem; font-weight: 600; color: var(--primary-foreground);">
                                ${this.currentUser.username?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <span style="font-weight: 500;">${this.currentUser.username}</span>
                    </button>
                    <div class="user-dropdown" id="userDropdown" style="display: none;">
                        <button class="dropdown-item" id="profileBtn">Profile Settings</button>
                        <button class="dropdown-item" id="logoutBtn" style="color: var(--destructive);">Sign Out</button>
                    </div>
                </div>
            `;

            // Add event listeners for user menu
            const userMenuBtn = document.getElementById('userMenuBtn');
            const userDropdown = document.getElementById('userDropdown');
            const logoutBtn = document.getElementById('logoutBtn');

            if (userMenuBtn) {
                userMenuBtn.addEventListener('click', () => {
                    if (userDropdown) {
                        userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
                    }
                });
            }

            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => this.logout());
            }

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (userDropdown && !e.target.closest('.user-menu')) {
                    userDropdown.style.display = 'none';
                }
            });
        } else {
            headerActions.innerHTML = `
                <button class="btn btn-ghost" id="signInBtn">Sign In</button>
                <button class="btn btn-primary" id="getStartedBtn">Get Started</button>
            `;
            
            // Re-attach event listeners
            this.setupEventListeners();
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize auth manager
const auth = new AuthManager();

// Export for use in other scripts
window.auth = auth;
