class BiometricAuth {
    constructor() {
        this.isAvailable = false;
        console.log('BiometricAuth initialized');
        this.init();
    }

    async init() {
        // Check if WebAuthn is supported
        if (!window.PublicKeyCredential) {
            console.log('WebAuthn is not supported in this browser');
            return;
        }

        try {
            // Check if platform authenticator is available
            const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            console.log('Biometric availability:', available);
            this.isAvailable = available;
            
            if (available) {
                this.addBiometricButton();
            }
        } catch (error) {
            console.error('Error checking biometric availability:', error);
        }
    }

    addBiometricButton() {
        const form = document.getElementById('loginForm');
        if (!form) {
            console.error('Login form not found');
            return;
        }

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'biometric-container';
        
        const biometricButton = document.createElement('button');
        biometricButton.type = 'button';
        biometricButton.className = 'biometric-button';
        biometricButton.setAttribute('aria-label', 'Sign in with biometrics');
        biometricButton.innerHTML = `
            🔐 Use Biometrics
            <span class="sr-only">Sign in using fingerprint or face recognition</span>
        `;
        
        biometricButton.addEventListener('click', () => this.authenticate());
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            .biometric-container {
                margin: 20px 0;
                text-align: center;
            }
            .biometric-button {
                padding: 12px 24px;
                background-color: #28a745;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin: 0 auto;
            }
            .biometric-button:hover {
                background-color: #218838;
            }
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                border: 0;
            }
        `;
        document.head.appendChild(styles);
        
        buttonContainer.appendChild(biometricButton);
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) {
            console.error('Submit button not found');
            form.appendChild(buttonContainer);
            return;
        }
        form.insertBefore(buttonContainer, submitButton);
    }

    async authenticate() {
        try {
            // Create challenge
            const challenge = new Uint8Array(32);
            window.crypto.getRandomValues(challenge);

            // Create authentication options
            const options = {
                publicKey: {
                    challenge,
                    timeout: 60000,
                    userVerification: "required",
                    rpId: window.location.hostname
                }
            };

            // Start authentication
            const credential = await navigator.credentials.get(options);
            
            if (credential) {
                // Success! Redirect to profile page
                window.location.href = 'profile.html';
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Biometric authentication failed. Please try again or use email/password.');
        }
    }
} 