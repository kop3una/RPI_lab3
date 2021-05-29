const microButton = document.querySelector('.microButton');

window.SpeechRecognition = window.SpeechRecognition || window.
    webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'ru-RU';

microButton.addEventListener('click', () => {

    if(microButton.classList.contains('off')) {
        microButton.classList.remove('off');
        recognition.start();
    } else {
        microButton.classList.add('off');
        recognition.stop();
    }


    recognition.addEventListener('end', e => {
        microButton.classList.add('off');
    });

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        

            searchInput.value =  transcript;
             searchButton.click();
             microButton.classList.add('off');
    });
});