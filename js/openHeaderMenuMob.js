document.addEventListener('DOMContentLoaded', () => {
  const headerBtnMob = document.getElementById('header-btn-mob');
  const mobMenuHeader = document.querySelector('.mob-menu-header');
  const menuOpenIcon = headerBtnMob.querySelector('.menu-open');
  const menuCloseIcon = headerBtnMob.querySelector('.menu-close');
  const body = document.body;

  mobMenuHeader.style.display = 'none';

  function openMenu() {
    mobMenuHeader.style.display = 'flex';
    menuOpenIcon.style.display = 'none';
    menuCloseIcon.style.display = 'block';
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobMenuHeader.style.display = 'none';
    menuOpenIcon.style.display = 'block';
    menuCloseIcon.style.display = 'none';
    body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = mobMenuHeader.style.display === 'flex';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  headerBtnMob.addEventListener('click', toggleMenu);

  const mobMenuItems = document.querySelectorAll('.mob-button-menu');
  mobMenuItems.forEach((item) => {
    item.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 965) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
});