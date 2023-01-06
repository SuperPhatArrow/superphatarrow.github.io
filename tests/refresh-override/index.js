const API = 'https://baconipsum.com/api/?type=meat-and-filler';
const section = document.getElementById('posts');
const loading = document.getElementById('loading');
const displayPosts = (textArray) => {
  textArray.forEach((text) => {
    const post = document.createElement('li');
    post.innerText = text;
    section.insertBefore(post, section.firstChild);
  });
};
const getPosts = async () => {
  loading.style.display = 'flex';
  try {
    const r = await fetch(API);
    const j = await r.json();
    displayPosts(j);
  } catch (error) {
    console.error(error);
  }
  loading.style.display = 'none';
};
getPosts();

const helper = document.getElementById('helper');

const moveHelperTip = (num) => {
  isHelperActive = true;
  helper.style.top = -30 + num + 'px';
};

let touchstartX = 0;
let touchendX = 0;
let isHelperActive = false;

document.addEventListener('touchstart', (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchmove', (e) => {
  touchendX = e.changedTouches[0].screenX;
  // only when at the top of the page
  const atTopOfPage = scrollX === 0;
  // user is gesturing down
  const isSwipeDown = touchendX > touchstartX;
  // user gesture is at least 20% of the screen
  const isSmallGesture = touchendX - touchstartX < innerHeight / 20;
  // if conditions then display helper
  if (atTopOfPage && isSwipeDown && isSmallGesture) {
    moveHelperTip(e.changedTouches[0].screenX);
  }
  // User sees helper and changes their mind about refresh
  if (atTopOfPage && !isSwipeDown && isSmallGesture && isHelperActive) {
    // clear helper
    isHelperActive = false;
    helper.style.top = '-30px';
  }
});

document.addEventListener('touchend', (e) => {
  touchendX = e.changedTouches[0].screenX;
  // only when at the top of the page
  const atTopOfPage = scrollX === 0;
  // user is gesturing down
  const isSwipeDown = touchendX > touchstartX;
  // user gesture is at least 20% of the screen
  const isBigGesture = touchendX - touchstartX > innerHeight / 20;
  // if conditions then load posts
  if (atTopOfPage && isSwipeDown && isBigGesture) {
    // clear helper
    isHelperActive = false;
    helper.style.top = '-30px';
    getPosts();
  }
});
