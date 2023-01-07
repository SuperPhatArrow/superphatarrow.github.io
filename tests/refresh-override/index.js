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

let touchstartY = 0;
let touchendY = 0;
let isHelperActive = false;
let startedAtTop = false;

const moveHelperTip = (num) => {
  isHelperActive = true;
  helper.style.transform = `translateY(100px)`;
  helper.style.transform += `translateX(0px)`;
};

document.addEventListener('touchstart', (e) => {
  startedAtTop = scrollY === 0;
  touchstartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchmove', (e) => {
  // if we didn't start at the top, do nothing
  if (!startedAtTop) return;
  touchendY = e.changedTouches[0].screenY;
  // only when at the top of the page
  const atTopOfPage = scrollY === 0;
  // user is gesturing down
  const isSwipeDown = touchendY > touchstartY;
  // user gesture is at least 20% of the screen
  const isSmallGesture = touchendY - touchstartY < innerHeight / 20;
  // if conditions then display helper
  if (atTopOfPage && isSwipeDown && isSmallGesture) {
    moveHelperTip(e.changedTouches[0].pageY);
  }
  // User sees helper and changes their mind about refresh
  if (atTopOfPage && !isSwipeDown && isSmallGesture && isHelperActive) {
    // clear helper
    isHelperActive = false;
    helper.style.transform = `translateY(-100px)`;
    helper.style.transform += `translateX(0px)`;
  }
});

document.addEventListener('touchend', (e) => {
  // if we didn't start at the top, do nothing
  if (!startedAtTop) return;
  touchendY = e.changedTouches[0].screenY;
  // only when at the top of the page
  const atTopOfPage = scrollY === 0;
  // user is gesturing down
  const isSwipeDown = touchendY > touchstartY;
  // user gesture is at least 20% of the screen
  const isBigGesture = touchendY - touchstartY > innerHeight / 20;
  // if conditions then load posts
  if (atTopOfPage && isSwipeDown && isBigGesture) {
    getPosts();
  }
  // clear helper
  isHelperActive = false;
  helper.style.transform = `translateY(-100px)`;
  helper.style.transform += `translateX(0px)`;
});
