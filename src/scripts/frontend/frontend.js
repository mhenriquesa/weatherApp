const form = document.querySelector('form');
const input = document.querySelector('input');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');
const message3 = document.getElementById('message-3');
const icon = document.getElementById('icon');

form.addEventListener('submit', e => {
  e.preventDefault();
  const location = input.value;
  icon.setAttribute('src', ``);
  message1.innerText = 'Buscando localização...';
  message2.innerText = '';
  message3.innerText = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      console.log(data);

      if (data.error) return (message1.innerText = data.error);

      icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.icon}@2x.png`);
      message1.innerText = data.local;
      message2.innerText = data.forecast;
      message3.innerText = Math.round(data.temp) + 'ºC';
    });
  });
});
