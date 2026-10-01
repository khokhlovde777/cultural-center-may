document.addEventListener('DOMContentLoaded', function () {
  const tabsContainer = document.querySelector('.iv__tabs');
  if (!tabsContainer) return;

  const buttons = tabsContainer.querySelectorAll('.iv__button');
  const contents = document.querySelectorAll('.content-cards');
  if (!buttons.length) return;

  // Сколько табов — столько и контентов (по совпадению индексов)
  function activateTab(index) {
    // Кнопки
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    // Контент
    contents.forEach((block, i) => {
      block.classList.toggle('no-visible', i !== index);
    });
  }

  // Клики по кнопкам
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(index));
  });

  // По умолчанию — первый таб
  activateTab(0);
});