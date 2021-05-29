const updateButton = document.querySelector('.updateButton');
const body = document.querySelector('body');

updateButton.addEventListener('click', () => {
    setBackgroundImage();
});

async function setBackgroundImage() {
    const url = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=-h8j6fTklvEDYQrPY83uI38daGiTlNYI_V_e_q6h3IQ';
    const res = await fetch(url);
    const data = await res.json();
    body.style.backgroundImage = `url(${data.urls.regular})`;
};

setBackgroundImage()