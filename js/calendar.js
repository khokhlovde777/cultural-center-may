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
        alert(`Выбрано: ${dayNumber} ${monthNames[month].toLowerCase()} ${year}`);
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
});