const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-3');
let img = document.createElement('img');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = '';
            return messageTwo.textContent = data.error;
        };
        img.src = undefined;
        switch (data.wdescriptions) {
            case 'Sunny':
                img.src = '../img/sun.png';
                document.querySelector('body').appendChild(img);
                break;
            case 'Clear':
                img.src = '../img/desert.png';
                document.querySelector('body').appendChild(img);
                break;
            default:
                break;
        }
        messageOne.textContent = data.wdescriptions + '';
        messageOne.textContent += data.forecast + '. ';
        messageOne.textContent += data.location + '. ';
    });
});
})