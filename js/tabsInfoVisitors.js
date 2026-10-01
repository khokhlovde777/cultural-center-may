document.addEventListener('DOMContentLoaded', function () {
  const tabsContainer = document.querySelector('.iv__tabs');
  if (!tabsContainer) return;

  const buttons = tabsContainer.querySelectorAll('.iv__button');
  const contents = document.querySelectorAll('.content-cards');
  if (!buttons.length) return;

  function activateTab(index) {
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    contents.forEach((block, i) => {
      block.classList.toggle('no-visible', i !== index);
    });
  }

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(index));
  });

  activateTab(0);
});