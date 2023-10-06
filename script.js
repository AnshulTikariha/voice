const startButton = document.getElementById('startButton');
const txtLabelDiv = document.getElementById('txtLabel');
const chatbox = document.getElementById("chatbox");

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onstart = () => {
        txtLabelDiv.textContent = 'Listening...';
    };
    
    recognition.onresult = (event) => {

        const result = event.results[event.results.length - 1][0].transcript;
        const currentInput = result;
        console.log(currentInput);

        if (currentInput.trim() !== "") {
            const messageElement = document.createElement("div");
            messageElement.textContent = currentInput;
            messageElement.classList.add("message");
            messageElement.classList.add("typewriter");
            chatbox.appendChild(messageElement);
            chatbox.scrollTop = chatbox.scrollHeight; 
        }
          
        if (currentInput.includes('clean my screen')) {
            console.log("debug",currentInput);
            chatbox.innerHTML = '';
        }
        
    };
    
    recognition.onend = () => {
        txtLabelDiv.textContent = 'Stopped listening';
        if (isListening) {
            recognition.start();
        }
    };
    
    let isListening = false;

    startButton.addEventListener('click', () => 
    {
        if (!isListening) {
            recognition.start();
            startButton.textContent = 'Stop Listening';
        } else {
            recognition.stop();
            startButton.textContent = 'Start Listening';
        }
        isListening = !isListening;
    });

} else {
    chatbox.innerHTML = 'Speech recognition not supported in this browser.';
}

