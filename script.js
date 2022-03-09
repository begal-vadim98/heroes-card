'use strict'
const boxList = document.querySelector('.box-list');
const btn = document.getElementById('selected');


let selected = [];
let arrElem = [];

// Funtion Отрисовки карточек 
const renderCard = (data) => {

  boxList.innerHTML = '';
  arrElem = [];

  data.forEach(elem => {
    const arr = elem.movies;
    if(arr) 
      arr.forEach(movies => {
        if(btn.options[btn.selectedIndex].value === movies) arrElem.push(elem);
     })
  })
  
  arrElem.forEach(elem => {

    if(!elem.birthDay)  elem.birthDay = "Неизвестно";
    if(!elem.deathDay)  elem.deathDay = "Неизвестно";
    if(!elem.citizenship)  elem.citizenship = "Неизвестно";

  boxList.insertAdjacentHTML('beforeend', `
    <li class="card-box">
   
    <div  class="card-img">
      <img src="./${elem.photo}" alt="">
    </div>

    <div  class="card-name">
      <p>Персонаж: ${elem.name}</p>
    </div>

    <div  class="card-actors">
      <p> Актёр: ${elem.actors}</p>
    </div>

    <div  class="card-movies">
      <p>Фильмы с участием ${elem.movies.join('; ')}</p>
    </div>

    <div  class="card-species">
      <p>Вид: ${elem.species}</p>
    </div>

    <div  class="card-citizenship">
      <p>Гражданство: ${elem.citizenship}</p>
    </div>
    
    <div  class="card-gender">
      <p>Пол: ${elem.gender}</p>
    </div>

    <div  class="card-birthDay">
      <p>Дата рождения: ${elem.birthDay}</p>
    </div>

    <div  class="card-deathDay">
      <p>Дата смерти: ${elem.deathDay}</p>
    </div>

    <div  class="card-status">
      <p>Статус: ${elem.status}</p>
    </div>

  </li>
  `)
  })
}


const renderSelected = (data) => {

  data.forEach(elem => {
    const arr = elem.movies;
    if(arr) arr.forEach(movies => {

      if(!selected.includes(movies)) selected.push(movies)

    })
  })

  selected.forEach(option => {
    btn.insertAdjacentHTML('beforeend', `<option value="${option}">${option}</option>`)
  })
}

// Функция получения данных для отрисовки selected
const getDataMovie = (url) => {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    renderSelected(data)
  })
  .catch(error => console.log("Ошибка получения данных"))
}

const getData = (url) => {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    renderCard(data)
  })
  .catch(error => console.log("Ошибка получения данных"))
}

btn.addEventListener('change', () => getData('dbHeroes.json'));


// Получение и отрисовка selected
getDataMovie('dbHeroes.json');