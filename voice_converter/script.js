if ('speechSynthesis' in window) {
    var synthesis = window.speechSynthesis;


    // Initialize the voices array
    var voices = [];

    // Wait for the voices to be loaded
    synthesis.onvoiceschanged = function() {
        voices = synthesis.getVoices();
        
        // Populate the select input with voice options
        var voiceSelect = document.getElementById('voiceSelect');
        
        if (voices.length === 0) {
            // If no voices are available, provide a default option
            var defaultOption = document.createElement('option');
            defaultOption.textContent = 'No voices available';
            voiceSelect.appendChild(defaultOption);
            voiceSelect.disabled = true;
        } else {
            voiceSelect.disabled = false;
            voices.forEach(function(voice, index) {
                var option = document.createElement('option');
                option.value = index;
                option.textContent = voice.name + ' (' + voice.lang + ')';
                voiceSelect.appendChild(option);
            });
        }
    };

    function speakText() {
        var text = document.getElementById('textToSpeak').value;

        if (voices.length === 0) {
            alert('No voices available. Please check your browser and operating system settings.');
            return;
        }
        
        // Get the selected voice
        var selectedVoice = voices[voiceSelect.value];
        
        var utterance = new SpeechSynthesisUtterance(text);
        
        utterance.rate = 1.0; // Normal speech rate

        // Set the selected voice
        utterance.voice = selectedVoice;

        utterance.onerror = function(event) {
            console.error('Speech synthesis error:', event.error);
        };
        
        synthesis.speak(utterance);
    }
} else {
    alert('Your browser does not support the SpeechSynthesis API.');
}


