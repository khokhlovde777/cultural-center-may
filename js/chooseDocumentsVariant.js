document.addEventListener('DOMContentLoaded', function () {

  const types = [
    'Все документы',
    'Нормативные документы',
    'Положения',
    'Лицензии'
  ];

  const contents = document.querySelectorAll('.doc-content-info .doc-item');

  const desktopTabsContainer = document.querySelector('.doc-tabs');

  function activateTab(index) {
    if (desktopTabsContainer) {
      const buttons = desktopTabsContainer.querySelectorAll('.doc__button');
      buttons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });
    }
    contents.forEach((block, i) => {
      if (index === 0) {
        block.classList.remove('no-visible');
      } else {
        block.classList.toggle('no-visible', i !== index - 1);
      }
    });
  }

  if (desktopTabsContainer) {
    const buttons = desktopTabsContainer.querySelectorAll('.doc__button');
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => activateTab(index));
    });
  }

  function createOptionButton(option, index, onClick) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'btn modal__btn filter-button__name font-semibold-16';
    item.id = `doc-button-${index + 1}`;
    item.textContent = option.trim();
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick(option);
    });
    return item;
  }

  function openFilterMenu(wrapper, options) {
    const existing = wrapper.querySelector('.filter-absolute-menu');
    if (existing) {
      existing.remove();
      wrapper.classList.remove('open');
      return;
    }

    document.querySelectorAll('.filter-absolute-menu').forEach(m => m.remove());
    document.querySelectorAll('.filter-wrapper').forEach(w => w.classList.remove('open'));

    const menu = document.createElement('div');
    menu.className = 'filter-absolute-menu';

    options.forEach((option, i) => {
      const item = createOptionButton(option, i, (selectedOption) => {
        addItemInMenu(wrapper, selectedOption);
        menu.remove();
        wrapper.classList.remove('open');
      });
      menu.appendChild(item);

      if (i < options.length - 1) {
        const hr = document.createElement('hr');
        hr.className = 'filter-menu__devider';
        menu.appendChild(hr);
      }
    });

    wrapper.appendChild(menu);
    menu.classList.add('open');
    wrapper.classList.add('open');
  }

  function updateFilterButtonText(wrapper, text) {
    const mainButton = wrapper.querySelector('#filterType');
    if (mainButton) {
      const textEl = mainButton.querySelector('.filter-button__name');
      if (textEl) textEl.textContent = text.trim();
    }
  }

  function addItemInMenu(wrapper, option) {
    updateFilterButtonText(wrapper, option);

    const index = types.indexOf(option.trim());
    if (index !== -1) activateTab(index);
  }

  const filterTypeBtn = document.getElementById('filterType');
  const filterWrapper = document.getElementById('filterTypeWrapper');

  if (filterTypeBtn && filterWrapper) {
    filterTypeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openFilterMenu(filterWrapper, types);
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('#filterTypeWrapper')) return;
    if (e.target.closest('.filter-absolute-menu')) return;

    document.querySelectorAll('.filter-absolute-menu').forEach(m => m.remove());
    document.querySelectorAll('.filter-wrapper').forEach(w => w.classList.remove('open'));
    if (filterWrapper) filterWrapper.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.filter-absolute-menu').forEach(m => m.remove());
      document.querySelectorAll('.filter-wrapper').forEach(w => w.classList.remove('open'));
      if (filterWrapper) filterWrapper.classList.remove('open');
    }
  });

  if (filterWrapper) {
    updateFilterButtonText(filterWrapper, types[0]);
  }
  activateTab(0);
});