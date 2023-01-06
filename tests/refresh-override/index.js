const API = 'https://baconipsum.com/api/?type=meat-and-filler';
const Starter = [
  'Id est exercitation, chislic ham biltong anim in lorem swine.  Laboris chicken jerky dolor excepteur strip steak in esse shank tongue irure capicola.  Cupidatat ground round irure filet mignon.  T-bone pig lorem tail turkey veniam drumstick cupidatat ribeye do mollit kielbasa enim ground round.',
  'Pancetta beef bacon ipsum shank.  Meatball sed consectetur, drumstick fatback commodo nisi laboris jowl veniam dolor ipsum.  Ball tip pancetta magna dolor commodo in.  Hamburger lorem velit turducken aliqua cupidatat.  Tempor magna drumstick incididunt ipsum, beef nisi enim ut consequat sed pork belly in.',
  'Pastrami ribeye do pork loin spare ribs beef dolore reprehenderit.  T-bone meatloaf ea short ribs sint hamburger eu bacon.  Sirloin aute do spare ribs landjaeger reprehenderit.  Anim non laboris do sausage cillum boudin andouille exercitation hamburger ullamco bresaola doner est quis.  In anim hamburger, lorem ground round consectetur bacon shank est turkey dolore.  Cupim doner enim picanha occaecat minim culpa filet mignon id shank veniam ground round andouille deserunt pig.',
  'Sausage cupim ut cupidatat minim, jowl non ullamco prosciutto incididunt do ut jerky exercitation.  Ham hock officia pancetta, strip steak qui pariatur duis cillum.  Sint cow minim, et nulla fugiat adipisicing dolore ball tip in.  Duis irure sint ut nostrud t-bone corned beef velit strip steak occaecat cupim chuck veniam.  Veniam tempor consequat incididunt qui adipisicing est lorem ea t-bone non buffalo tongue.',
  'Aliqua sunt velit sausage picanha, capicola fugiat.  Nulla ut ex pork chop rump filet mignon alcatra.  Picanha landjaeger jowl consectetur reprehenderit.  Beef ribs consequat ribeye bresaola capicola qui in ham nostrud dolore fatback pancetta deserunt quis shoulder.  Fugiat consectetur landjaeger deserunt meatball ham hock beef et frankfurter duis veniam consequat.  Qui cupim aliqua magna ullamco dolore duis dolore ad salami elit culpa tail eiusmod.  Shankle filet mignon eiusmod, consequat kielbasa short loin labore eu salami ball tip tail consectetur dolore aute beef ribs.',
];
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
displayPosts(Starter);

let touchstartY = 0;
let touchendY = 0;

document.addEventListener('touchstart', (e) => {
  touchstartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
  touchendY = e.changedTouches[0].screenY;
  // only when at the top of the page
  const atTopOfPage = scrollY === 0;
  // user is gesturing down
  const isSwipeDown = touchendY > touchstartY;
  // user gesture is at least 10% of the screen
  const isBigGesture = touchendY - touchstartY > innerHeight / 10;
  if (atTopOfPage && isSwipeDown && isBigGesture) {
    getPosts();
  }
});
