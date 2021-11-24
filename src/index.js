import './style.css';
// import Image from './nasa2.png';

const getLink = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=2018-07-15&end_date=2018-07-20';
const main = document.getElementById('addToScreen');
// const logo = document.querySelector('.logo');

// function showImage() {
//   const myImage = new Image();
//   myImage.src = Image;
//   return myImage;
// }

// logo.appendChild(showImage());

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
          <p><i class="far fa-star"></i></p>
        </div>
        <small>0 likes</small> 
        <input type="button" value="Comments" class="comment">
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