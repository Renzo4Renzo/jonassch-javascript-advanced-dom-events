'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
  // const section1Coords = section1.getBoundingClientRect();
  // console.log(section1Coords);
  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////// LECTURES //////////////////////////////
const titleh1 = document.querySelector('h1');

//Old school way!
// titleh1.onmouseenter = function (event) {
//   console.log('onMouseEnter: Great! You are reading the heading :D');
// };

//New way!
const consoleMessageh1 = function (event) {
  console.log('addEventListener: Great! You are reading the heading :D');
  // titleh1.removeEventListener('mouseenter', consoleMessageh1);
};

titleh1.addEventListener('mouseenter', consoleMessageh1);

setTimeout(
  () => titleh1.removeEventListener('mouseenter', consoleMessageh1),
  4000
);
