document.addEventListener('DOMContentLoaded', function() {

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const monthNamesShort = [
    'янв', 'фев', 'март', 'апр', 'май', 'июнь',
    'июль', 'авг', 'сент', 'окт', 'нояб', 'дек'
  ];

  const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const grid = document.getElementById('calendarGrid');
  const monthTitle = document.getElementById('monthTitle');
  const calendarBtn = document.getElementById('buttonCalendar');
  const modal = document.getElementById('modalChooseMonth');
  const modalYear = document.getElementById('modalYear');
  const modalMonths = document.getElementById('modalMonths');

  let selectedMonth = currentMonth;
  let selectedYear = currentYear;

  function isPastMonth(year, month) {
    return year < currentYear || (year === currentYear && month < currentMonth);
  }

  function renderCalendar(year, month) {
    grid.innerHTML = ''; 
    monthTitle.textContent = monthNames[month];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let startDayIndex = new Date(year, month, 1).getDay();
    startDayIndex = (startDayIndex === 0) ? 6 : startDayIndex - 1;

    const isCurrentMonth = (year === currentYear && month === currentMonth);
    const isPast = isPastMonth(year, month);

    for (let i = 0; i < daysInMonth; i++) {
      const dayOfWeekIndex = (startDayIndex + i) % 7;
      const dayName = weekDays[dayOfWeekIndex];
      const dayNumber = i + 1;

      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'day-cell btn modal__btn';

      if (dayOfWeekIndex === 5 || dayOfWeekIndex === 6) {
        cell.classList.add('weekend');
      }

      if (isPast || (isCurrentMonth && dayNumber < currentDay)) {
        cell.classList.add('past');
      }

      if (isCurrentMonth && dayNumber === currentDay) {
        cell.classList.add('today');
      }

      cell.innerHTML = `
        <span class="weekday">${dayName}</span>
        <span class="day-number">${dayNumber}</span>
      `;

      cell.addEventListener('click', () => {

        if (cell.classList.contains('past')) {
            return;
        }

        document.querySelectorAll('.day-cell.active').forEach(el => {
            el.classList.remove('active');
        });

        cell.classList.add('active');
      });

      grid.appendChild(cell);
    }
  }

  function renderMonths(year, month) {
    modalMonths.innerHTML = '';

    monthNamesShort.forEach((name, index) => {
      const monthBtn = document.createElement('button');
      monthBtn.type = 'button';
      monthBtn.className = 'month font-semibold-16 btn modal__btn';
      monthBtn.textContent = name;

      const columnIndex = index % 3;
      if (columnIndex === 0) {
        monthBtn.style.justifyContent = 'start';
      } else if (columnIndex === 2) {
        monthBtn.style.justifyContent = 'end';
      }

      if (isPastMonth(year, index)) {
        monthBtn.classList.add('month__past');
      }

      if (year === selectedYear && index === selectedMonth) {
        monthBtn.classList.add('month__current');
      }

      monthBtn.addEventListener('click', () => {
        const clickedIsPast = isPastMonth(year, index);

        selectedMonth = index;
        selectedYear = year;

        renderMonths(selectedYear, selectedMonth);

        if (clickedIsPast) {
          return;
        }

        renderCalendar(selectedYear, selectedMonth);
        modal.classList.remove('open');
      });

      modalMonths.appendChild(monthBtn);
    });
  }

  renderCalendar(selectedYear, selectedMonth);
  renderMonths(selectedYear, selectedMonth);
  modalYear.textContent = selectedYear;

  monthTitle.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.classList.toggle('open');
  });

  calendarBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!modal.contains(e.target) && e.target !== monthTitle) {
      modal.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.classList.remove('open');
    }
  });

  const btnLeft = modal.querySelector('.modal__btn-arrow-left');
  const btnRight = modal.querySelector('.modal__btn-arrow-right');

  btnLeft.addEventListener('click', () => {
    selectedYear--;
    modalYear.textContent = selectedYear;
    renderMonths(selectedYear, selectedMonth);
  });

  btnRight.addEventListener('click', () => {
    selectedYear++;
    modalYear.textContent = selectedYear;
    renderMonths(selectedYear, selectedMonth);
  });

  const types = ['Концерт', 'Спектакль', 'Мюзикл'];
  const peoples = ['Детский', 'Взрослый'];

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
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'btn modal__btn filter-button__name font-semibold-16';
      item.textContent = option;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log(`Выбрано: ${option}`);
        addItemInMenu(wrapper, option);
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

  function addItemInMenu(wrapper, option) {

    let container = wrapper.querySelector('.choose-filters');
    if (!container) {
        container = document.createElement('div');
        container.className = 'choose-filters';
        wrapper.appendChild(container);
    }

    const existingItems = container.querySelectorAll('.choose-filter__label');
    for (const el of existingItems) {
        if (el.textContent === option) {
            return;
        }
    }

    const chip = document.createElement('div');
    chip.className = 'choose-filter';

    const label = document.createElement('p');
    label.className = 'choose-filter__label font-semibold-14';
    label.textContent = option;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn modal__btn';
    removeBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill="white"/>
            <path d="M18 6L6 18" stroke="#5B0609" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="#5B0609" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;

    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        chip.remove();

        if (container.children.length === 0) {
            container.remove();
        }
    });

    chip.appendChild(label);
    chip.appendChild(removeBtn);
    container.prepend(chip);
  }

  document.getElementById('filterType').addEventListener('click', (e) => {
    e.stopPropagation();
    openFilterMenu(document.getElementById('filterTypeWrapper'), types);
  });

  document.getElementById('forWhom').addEventListener('click', (e) => {
    e.stopPropagation();
    openFilterMenu(document.getElementById('forWhomWrapper'), peoples);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-wrapper')) {
      document.querySelectorAll('.filter-absolute-menu').forEach(m => m.remove());
      document.querySelectorAll('.filter-wrapper').forEach(w => w.classList.remove('open'));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.filter-absolute-menu').forEach(m => m.remove());
      document.querySelectorAll('.filter-wrapper').forEach(w => w.classList.remove('open'));
    }
  });

});