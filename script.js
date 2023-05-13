'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const navBar = document.querySelector('.nav');
const headerElement = document.querySelector('.header');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('nav__link')) {
      const navigationId = event.target.getAttribute('href');
      document
        .querySelector(navigationId)
        .scrollIntoView({ behavior: 'smooth' });
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

const stickyNavigation = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) navBar.classList.add('sticky');
  else navBar.classList.remove('sticky');
};

const headerObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${getComputedStyle(navBar).height}`, // nav.getBoundingClientRect().height;
};

const headerObserver = new IntersectionObserver(
  stickyNavigation,
  headerObserverOptions
);

headerObserver.observe(headerElement);

////////////////////////////// LECTURES //////////////////////////////
