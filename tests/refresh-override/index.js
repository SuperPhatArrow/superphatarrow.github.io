// Lorem ipsum api to get fake posts
const API = 'https://baconipsum.com/api/?type=meat-and-filler';
// The ordered list to hold posts
const postList = document.getElementById('posts');
// The loading screen
const loading = document.getElementById('loading');
// takes an array of text and adds each to the DOM
const displayPosts = (textArray) => {
  textArray.forEach((text) => {
    const post = document.createElement('li');
    post.innerText = text;
    postList.insertBefore(post, postList.firstChild);
  });
};
// fetch text from api
const getPosts = async () => {
  // display loading screen
  loading.style.display = 'flex';
  // fetch posts
  try {
    const r = await fetch(API);
    const j = await r.json();
    displayPosts(j);
  } catch (error) {
    console.error(error);
  }
  // hide loading screen
  loading.style.display = 'none';
};
// fetch some posts to start the page
getPosts();
//as you drag down a bit, display a helper that
// tells you that the action will refresh the list
const helper = document.getElementById('helper');
// store the first touch point of the Y axis
let touchstartY = 0;
// store the last touch point of the Y axis
let touchendY = 0;
// flag to know if the helper is on screen
let isHelperActive = false;
// make sure we are at the top of the screen
// when we start the gesture
let startedAtTop = false;

const activateHelper = () => {
  // set flag to true
  isHelperActive = true;
  // move the helper down from -50px to +50px
  helper.style.transform = `translateY(100px)`;
  helper.style.transform += `translateX(0px)`;
};
const deactivateHelper = () => {
  // set flag to false
  isHelperActive = false;
  // move the helper up from 50px to -50px
  helper.style.transform = `translateY(-100px)`;
  helper.style.transform += `translateX(0px)`;
};
// add an event listener for the first touch
document.addEventListener('touchstart', (e) => {
  // set flag as true if we are at the top
  startedAtTop = scrollY === 0;
  // set the starting touch point Y value
  touchstartY = e.changedTouches[0].screenY;
});
// add an event listener for touch move
document.addEventListener('touchmove', (e) => {
  // if we didn't start at the top, do nothing
  if (!startedAtTop) return;
  // this is actually our current touch Y value
  touchendY = e.changedTouches[0].screenY;
  // only when at the top of the page
  const atTopOfPage = scrollY === 0;
  // user is gesturing down
  const isSwipeDown = touchendY > touchstartY;
  // user gesture is less than 20% of the screen
  const isSmallGesture = touchendY - touchstartY < innerHeight / 20;
  // if conditions then display helper
  if (atTopOfPage && isSwipeDown && isSmallGesture) {
    activateHelper();
  }
  // User sees helper and changes their mind about refresh
  // they can move finger back up to cancel
  if (atTopOfPage && !isSwipeDown && isSmallGesture && isHelperActive) {
    // clear helper
    deactivateHelper();
  }
});
// final touch event listener
document.addEventListener('touchend', (e) => {
  // if we didn't start at the top, do nothing
  if (!startedAtTop) return;
  // save the final touch point
  touchendY = e.changedTouches[0].screenY;
  // only when at the top of the page now
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
  deactivateHelper();
});
