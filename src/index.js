import './style.css';

const getLink = 'Hi Aku and Zachee';
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