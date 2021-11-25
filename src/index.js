import './style.css';

const getLink = 'https://api.nasa.gov/planetary/apod?api_key=4SuCuNxM0J6w1FmjQokTcawsubomH7aV4ep60VgT&start_date=2020-07-15&end_date=2020-07-20';
const getImage = 'https://api.nasa.gov/planetary/apod?api_key=4SuCuNxM0J6w1FmjQokTcawsubomH7aV4ep60VgT&date=2020-07-21';
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
  return response;
};

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
        <small></small>
        <input type="button" value="Comments" id="${index}" class="comment">
        `;
  main.appendChild(div);
}

function closePopup(target) {
  target.parentElement.parentElement.parentElement.remove();
}

function displayPopup(img, title, description) {
  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popupWindow');
  popupDiv.innerHTML = `
  <div class="popupContainer">
   <span><i class="fas fa-times" id="close"></i>
   </span>
   <div class="header-popup">
     <img src="${img}" class="popup-image" alt="close-icon">
   </div>
   <h2>${title}</h2>
   <p class="description">${description}</p>
   <div>
       <h2 class="comments">Comments</h2>
       <ul id="comment-link">
       </ul>
     </div>
     <form action="post">
       <input type="text" placeholder="Your Name" id="userName">
       <textarea name="text" id="insights" cols="30" rows="10" placeholder="Your insights"></textarea>
       <input type="button" value="Comment" id="popupComment">
     </form>
   </div>
   </div>`;
  main.appendChild(popupDiv);
}

function showComment(id, user, str) {
  const ulCont = document.querySelector('#comment-link');
  const li = document.createElement('li');
  li.setAttribute('id', id);
  li.innerHTML = `${user} : ${str}`;
  ulCont.appendChild(li);
}

function displayComments() {
  getScores(commentLink)
    .then((data) => data.forEach((elem) => showComment(elem.item_id, elem.userName, elem.comment)));
}

function addComment(id, user, str) {
  const ulChild = document.querySelector('#comment-link').childElementCount;
  const data = {
    item_id: `${ulChild}comment`,
    username: user,
    comment: str,
  };
  postScores(starLink, data)
    .then((data) => {
      if (data.status === 201) {
        showComment(id, user, str);
      }
    });
}

function displayImage() {
  getScores(getImage)
    .then((data) => displayPopup(data.hdurl, data.title, data.explanation))
    .then(() => {
      displayComments();
      const closeBtn = document.getElementById('close');
      closeBtn.addEventListener('click', () => {
        closePopup(closeBtn);
      });
    });
}

const splitStars = (id, stars) => {
  const small = document.getElementById(id);
  small.parentElement.nextElementSibling.innerHTML = `${stars} stars`;
};

function displayStars() {
  getScores(starLink)
    .then((data) => data.forEach((elem) => splitStars(elem.item_id, elem.likes)));
}

function displayScores() {
  getScores(getLink)
    .then((data) => data.forEach((elem, index) => addToScoreBord(elem.hdurl, elem.title, index)))
    .then(() => displayStars());
}

function giveStar(id, stars) {
  const data = { item_id: id };
  postScores(starLink, data)
    .then((data) => {
      if (data.status === 201) {
        splitStars(id, stars);
      }
    });
}

displayScores();

main.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-star')) {
    e.preventDefault();
    const sC = parseInt(e.target.parentElement.parentElement.nextElementSibling.textContent, 10);
    const stars = sC + 1;
    giveStar(e.target.parentElement.id, stars);
  }
  if (e.target.classList.contains('comment')) {
    displayImage();
  }
  if (e.target.id === 'popupComment') {
    e.preventDefault();
    const userName = document.getElementById('userName');
    const comment = document.getElementById('insights');
    addComment(userName.value, comment.value);
    userName.innerHTML = '';
    comment.innerHTML = '';
  }
});
