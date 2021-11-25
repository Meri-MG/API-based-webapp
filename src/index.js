import './style.css';

const getLink = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=2020-07-15&end_date=2020-07-20';
const getImage = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2020-07-21';
const main = document.getElementById('addToScreen');
const starLink = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9mAPgvMc6PjOJk4JU1ZU/likes/';
const commentLink = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9mAPgvMc6PjOJk4JU1ZU/comments';

const getScores = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const postScores = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// to give a star



function addToScoreBord(img, title, index) {
  const div = document.createElement('div');
  div.classList.add('cardContainer');
  div.innerHTML = `
        <div class="imgcontainer">
          <img src="${img}" alt="">
        </div>
        <div class="title">
          <h3>${title}</h3>
          <a href="#" id="${index}star" class="stars"><i class="far fa-star"></i></a>
        </div>
        <small>0 <i>likes</i></small> 
        <input type="button" value="Comments" id="${index}" class="comment">
        `;
  main.appendChild(div);
}

function closePopup(target) {
  target.parentElement.parentElement.remove();
}

function displayPopup(img, title, description) {
  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popupContainer');
  popupDiv.innerHTML = `
   <span><i class="fas fa-times" id="close"></i>
   </span>
   <div class="header-popup">
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
    .then((data) => displayPopup(data.hdurl, data.title, data.explanation))
    .then(() => {
      const closeBtn = document.getElementById('close');
      closeBtn.addEventListener('click', () => {
        closePopup(closeBtn);
      });
    })
    .catch((error) => console.log(error));
}

// stars must be number or string
function increaseStars(element, stars) {
  // const small = parseInt(element.parentElement.nextSibling.innerText)+1;// Check this !!!!!!
  element.parentElement.nextSibling.innerHTML = stars;
}

// WORK ON THIS
function displayStars() {
  getScores(starLink)
    .then((data) => data.forEach((elem, index) => increaseStars(elem.hdurl, elem.title, index)))
}

function displayScores() {
  getScores(getLink)
    .then((data) => data.forEach((elem, index) => addToScoreBord(elem.hdurl, elem.title, index)))
    .then(() => {
      // WE must to give proper count of our stars 
      displayStars();// function GET      
    })
}

displayScores();

function giveStar(id, element) {
  postScores(starLink, data = {"item_id": id})
    .then(increaseStars(element));
}


main.addEventListener('click', (e) => {
  if (e.target.classList.contains('stars')) {
    giveStar(e.target.id, e.target);
  }
  if (e.target.classList.contains('comment')) {
    displayImage();
  }  
})