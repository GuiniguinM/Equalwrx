// Text to Speech functionality
class TextToSpeech {
    constructor() {
        this.isReading = false;
        this.utterance = null;
        
        // Create TTS button
        this.button = document.createElement('button');
        this.button.innerHTML = '🔊 Read Page';
        this.button.className = 'tts-button';
        this.button.setAttribute('aria-label', 'Read page content aloud');
        
        // Add button styles
        const styles = document.createElement('style');
        styles.textContent = `
            .tts-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                z-index: 1000;
            }
            .tts-button:hover {
                background-color: #0056b3;
            }
        `;
        document.head.appendChild(styles);
        
        // Add click handler
        this.button.addEventListener('click', () => this.toggleReading());
        
        // Add to page
        document.body.appendChild(this.button);
    }

    getPageContent() {
        // Get main content, excluding navigation and buttons
        const contentElements = document.querySelectorAll('.container');
        let content = '';
        
        contentElements.forEach(element => {
            // Skip navigation and button text
            const text = element.innerText.replace(/Back to .+|Apply Now|Login with Google/g, '');
            content += text + ' ';
        });
        
        return content;
    }

    toggleReading() {
        if (this.isReading) {
            window.speechSynthesis.cancel();
            this.isReading = false;
            this.button.innerHTML = '🔊 Read Page';
        } else {
            const content = this.getPageContent();
            this.utterance = new SpeechSynthesisUtterance(content);
            
            // Set up completion handler
            this.utterance.onend = () => {
                this.isReading = false;
                this.button.innerHTML = '🔊 Read Page';
            };
            
            window.speechSynthesis.speak(this.utterance);
            this.isReading = true;
            this.button.innerHTML = '⏹️ Stop Reading';
        }
    }
} 