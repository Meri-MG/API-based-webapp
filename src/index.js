import './style.css';

const getLink = 'Hi Aku and Zachee';
const getImage = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-07-08';
const main = document.getElementById('addToScreen');

const getScores = async (url) => {
  const response = await fetch(url);
  return response.json();
};

function addToScoreBord(img, title) {
  const div = document.createElement('div');
  div.classList.add('cardContainer');
  div.innerHTML = `
        <div class="imgcontainer">
          <img src="${img}" alt="">
        </div>
        <div class="title">
          <h3>${title}</h3>
          <span><i class="far fa-star"></i>
          </span>
          <small>0 likes</small> 
        </div>
        <input type="button" value="Comments">
        `;
  main.appendChild(div);
}

function displayScores() {
  getScores(getLink)
    .then((data) => {
      main.innerHTML = '';
      data.forEach((elem) => addToScoreBord(elem.hdurl, elem.title));
    });
}

displayScores();

function displayPopup(img, title, description) {
  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popupContainer');
  popupDiv.innerHTML = `<div class="header-popup">
    <img src="${img}" class="whatever" alt="close-icon">
  </div>
  <h2>${title}</h2>
  <p class="description">${description}</p>
  <div>
      <h2 class="comments">Comments</h2>
      <ul class="commentsContainer">
          <li class="comment"></li>
      </ul>
    </div>
    <form action="post">
      <input type="text" placeholder="Your Name">
      <textarea name="text" id="insights" cols="30" rows="10" placeholder="Your insights"></textarea>
      <input type="button" value="Comment">
    </form>
  </div>`;
  main.appendChild(popupDiv);
}

function displayImage() {
  getScores(getImage)
    .then((data) => {
      displayPopup(data.hdurl, data.title, data.explanation);
    });
}

displayImage();
