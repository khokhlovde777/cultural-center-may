document.addEventListener('DOMContentLoaded', function () {
  const tabsContainer = document.querySelector('.doc-tabs');
  if (!tabsContainer) return;

  const buttons = tabsContainer.querySelectorAll('.doc__button');
  const contents = document.querySelectorAll('.doc-content-info .doc-item');
  if (!buttons.length) return;

  function activateTab(index) {
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    if (index === 0) {
      contents.forEach(block => block.classList.remove('no-visible'));
      return;
    }

    const targetContentIndex = index - 1;
    contents.forEach((block, i) => {
      block.classList.toggle('no-visible', i !== targetContentIndex);
    });
  }

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(index));
  });

  activateTab(0);
});