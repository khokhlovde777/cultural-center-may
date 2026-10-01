document.addEventListener('DOMContentLoaded', function () {
  const tabsContainer = document.querySelector('.doc-tabs');
  if (!tabsContainer) return;

  const buttons = tabsContainer.querySelectorAll('.doc__button');
  const contents = document.querySelectorAll('.doc-content-info .doc-item');
  if (!buttons.length) return;

  function activateTab(index) {
    // Кнопки: активна только нажатая
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    // Первый таб ("Все документы") — показать все блоки
    if (index === 0) {
      contents.forEach(block => block.classList.remove('no-visible'));
      return;
    }

    // Остальные — показать только соответствующий блок
    // doc-button-2 -> doc-item[0], doc-button-3 -> doc-item[1], doc-button-4 -> doc-item[2]
    const targetContentIndex = index - 1;
    contents.forEach((block, i) => {
      block.classList.toggle('no-visible', i !== targetContentIndex);
    });
  }

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(index));
  });

  // По умолчанию — первый таб (все документы видны)
  activateTab(0);
});