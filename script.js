'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const navBar = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const headerElement = document.querySelector('.header');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');
const allSections = document.querySelectorAll('.section');
const imageTargets = document.querySelectorAll('img[data-src]');

const slides = document.querySelectorAll('.slide');
const btnLeftSlide = document.querySelector('.slider__btn--left');
const btnRightSlide = document.querySelector('.slider__btn--right');

// Modal window
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

navLinks.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.classList.contains('nav__link')) {
    const navigationId = event.target.getAttribute('href');
    document.querySelector(navigationId).scrollIntoView({ behavior: 'smooth' });
  }
});

//Button scrolling
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

// Tabbed component
tabsContainer.addEventListener('click', function (event) {
  const tabClicked = event.target.closest('.operations__tab');
  if (!tabClicked) return; //Guard clause

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabClicked.classList.add('operations__tab--active');

  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${tabClicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation
const handleMenuHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const linkOver = event.target;
    const linkSiblings = linkOver
      .closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');

    linkSiblings.forEach(element => {
      if (element !== linkOver) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

navBar.addEventListener('mouseover', handleMenuHover.bind(0.5));
navBar.addEventListener('mouseout', handleMenuHover.bind(1));

//Sticky Navigation
const stickyNavigation = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navBar.classList.add('sticky');
  else navBar.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0,
  rootMargin: `-${getComputedStyle(navBar).height}`, // nav.getBoundingClientRect().height;
});

headerObserver.observe(headerElement);

//Reveal Sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//Lazy loading images
const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '-100px',
});

imageTargets.forEach(image => imageObserver.observe(image));

//Slider
let currentSlide = 0;
const maxSlide = slides.length - 1;

const goToSlide = function (currentSlide) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlide) currentSlide = 0;
  else currentSlide++;
  goToSlide(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) currentSlide = maxSlide;
  else currentSlide--;
  goToSlide(currentSlide);
};

btnLeftSlide.addEventListener('click', previousSlide);
btnRightSlide.addEventListener('click', nextSlide);

////////////////////////////// LECTURES //////////////////////////////
