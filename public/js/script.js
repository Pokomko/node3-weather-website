const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-3');
const weatherIcon = document.querySelectorAll('.icon_weather'); 

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location).then((response) => {
        weatherIcon.forEach((icon) => {icon.style.display = "none";});
        response.json().then((data) => {
            console.log(weatherIcon);
            console.log(data.wdescriptions);
            if (data.error) {
                messageOne.textContent = '';
                return messageTwo.textContent = data.error;
            };
            switch (data.wdescriptions) {
                case 'Sunny':
                case 'Clear':
                    const sun = document.querySelector('.sun');
                    sun.style.display = "block";
                    break;
                case 'Cloudy':
                    const cloud = document.querySelector('.cloud');
                    cloud.style.display = "block";
                    break;
                case 'Partly cloudy':
                    const partlyCloud = document.querySelector('.partly_cloud');
                    partlyCloud.style.display = "block";
                    break;
                case 'Snow':
                case 'Heavy snow':
                    const snow = document.querySelector('.snow');
                    snow.style.display = "block";
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