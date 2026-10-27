/**
 * Delta Transit Pulse - Student Portal & Seat Booking Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  let studentData = DeltaStorage.getStudent();
  let selectedSeat = studentData.seat || "14";
  let totalSeconds = 24 * 60 + 18;

  // 1. Initialize UI with saved student data
  updateTicketDisplay(studentData);

  // 2. Dynamic Countdown Timer
  const timerElement = document.getElementById('countdownTimer');
  if (timerElement) {
    const countdownInterval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(countdownInterval);
        timerElement.textContent = '⚠️ انتهت صلاحية الكود - يُرجى التحديث';
        timerElement.classList.remove('bg-tertiary');
        timerElement.classList.add('bg-error');
        return;
      }
      totalSeconds--;
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      const formatted = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
      timerElement.textContent = '⏱️ ينتهي الكود خلال: ' + formatted + ' دقيقة';

      // Pulse red when under 5 minutes
      if (totalSeconds < 300) {
        timerElement.classList.add('bg-error', 'animate-pulse');
      }
    }, 1000);
  }

  // 3. Interactive Seat Matrix Click Handling
  const seatGrid = document.getElementById('seatGrid');
  if (seatGrid) {
    const seatButtons = seatGrid.querySelectorAll('button');
    seatButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Skip occupied seats
        if (btn.classList.contains('cursor-not-allowed') || btn.classList.contains('bg-error')) {
          showToast('هذا المقعد محجوز مسبقاً لطالب آخر!', 'warning');
          return;
        }

        // Get seat number
        const seatNumSpan = btn.querySelector('span:first-child');
        const seatNum = seatNumSpan ? seatNumSpan.textContent.trim() : '';

        if (!seatNum || seatNum === selectedSeat) return;

        // Reset previous selected button
        seatButtons.forEach(b => {
          if (b.dataset.seat === selectedSeat || (b.textContent.includes(selectedSeat) && b.classList.contains('bg-secondary-container'))) {
            b.className = 'h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary flex flex-col items-center justify-center font-label-md text-label-md font-bold shadow-sm transition-transform active:scale-95';
            b.innerHTML = `<span>${selectedSeat}</span><span class="text-[9px] font-normal leading-none">متاح</span>`;
            b.title = `مقعد ${selectedSeat} - متاح`;
          }
        });

        // Set new selected seat
        selectedSeat = seatNum;
        btn.dataset.seat = selectedSeat;
        btn.className = 'h-11 rounded-lg bg-secondary-container text-on-secondary-container flex flex-col items-center justify-center font-label-md text-label-md font-bold shadow-md ring-4 ring-secondary-container/40 animate-pulse relative';
        btn.innerHTML = `
          <span class="flex items-center gap-0.5">
            <span class="material-symbols-outlined text-[13px]">check_circle</span>
            ${selectedSeat}
          </span>
          <span class="text-[9px] font-bold leading-none">مقعدك</span>
        `;
        btn.title = `مقعد ${selectedSeat} - مقعدك الحالي المحدد`;

        // Update current seat display in status footer
        const currentSeatEl = document.getElementById('current-seat-display');
        if (currentSeatEl) {
          currentSeatEl.textContent = `المقعد الحالي: رقم ${selectedSeat} (بجوار النافذة)`;
        }

        // Update ticket preview
        const ticketSeatEl = document.getElementById('ticket-seat-number');
        if (ticketSeatEl) {
          ticketSeatEl.textContent = `${selectedSeat} (نافذة)`;
        }

        showToast(`تم تحديد المقعد رقم (${selectedSeat})، اضغط "تثبيت الحجز" لحفظه`, 'info');
      });
    });
  }

  // 4. Confirm Booking Button
  const confirmBtn = document.getElementById('btn-confirm-booking');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      studentData.seat = selectedSeat;
      studentData.status = 'مؤكدة';
      studentData.bookedAt = Date.now();
      DeltaStorage.saveStudent(studentData);

      updateTicketDisplay(studentData);
      showToast(`تم تأكيد حجز المقعد (${selectedSeat}) بنجاح وإصدار التذكرة!`, 'success');
    });
  }

  // 5. Cancel Booking Button
  const cancelBtn = document.getElementById('btn-cancel-booking');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      const confirmCancel = confirm('هل أنت متأكد من رغبتك في إلغاء حجز المقعد وتذكرة الصعود؟');
      if (confirmCancel) {
        studentData.status = 'ملغاة';
        studentData.seat = 'غير محدد';
        DeltaStorage.saveStudent(studentData);
        updateTicketDisplay(studentData);
        showToast('تم إلغاء حجز التذكرة بنجاح', 'warning');
      }
    });
  }

  // 6. Download / Print Ticket Button
  const downloadBtn = document.getElementById('btn-download-ticket');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      showToast('جاري تجهيز بطاقة الصعود للطباعة والحفظ...', 'info');
      setTimeout(() => {
        window.print();
      }, 500);
    });
  }

  // 7. Route Selector Dropdown Handling
  const routeSelect = document.getElementById('route-select');
  if (routeSelect) {
    const routeInfo = {
      '0': { line: 'المنصورة ⇋ جامعة الدلتا', bus: 'DL-104', time: '07:45 ص', gate: 'بوابة C' },
      '1': { line: 'طلخا (موقف الإستاد) ⇋ جامعة الدلتا', bus: 'DL-108', time: '08:15 ص', gate: 'بوابة A' },
      '2': { line: 'دمياط الجديدة (المجمع) ⇋ جامعة الدلتا', bus: 'DL-203', time: '08:45 ص', gate: 'بوابة B' },
      '3': { line: 'بلقاس (الميدان) ⇋ جامعة الدلتا', bus: 'DL-312', time: '09:15 ص', gate: 'بوابة C' }
    };

    routeSelect.addEventListener('change', (e) => {
      const selected = routeInfo[e.target.selectedIndex] || routeInfo['0'];
      studentData.line = selected.line;
      studentData.bus = selected.bus;
      studentData.time = selected.time;
      studentData.gate = selected.gate;
      DeltaStorage.saveStudent(studentData);

      updateTicketDisplay(studentData);
      showToast(`تم تغيير الخط إلى: ${selected.line}`, 'info');
    });
  }

  // Helper to update ticket text elements
  function updateTicketDisplay(data) {
    const ticketSeat = document.getElementById('ticket-seat-number');
    const ticketLine = document.getElementById('ticket-route-line');
    const ticketBus = document.getElementById('ticket-bus-gate');
    const ticketTime = document.getElementById('ticket-departure-time');
    const ticketStatus = document.getElementById('ticket-status-badge');
    const studentName = document.getElementById('ticket-student-name');
    const studentCode = document.getElementById('ticket-student-code');

    if (ticketSeat && data.seat) ticketSeat.textContent = `${data.seat} (نافذة)`;
    if (ticketLine && data.line) ticketLine.textContent = data.line;
    if (ticketBus) ticketBus.textContent = `${data.bus} | ${data.gate}`;
    if (ticketTime && data.time) ticketTime.textContent = `${data.time} (مؤكد)`;
    if (studentName && data.name) studentName.textContent = data.name;
    if (studentCode && data.id) studentCode.textContent = `كود: ${data.id}`;
    
    if (ticketStatus) {
      if (data.status === 'ملغاة') {
        ticketStatus.textContent = 'ملغاة';
        ticketStatus.className = 'bg-error text-on-error font-label-md text-label-md font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1';
      } else {
        ticketStatus.textContent = 'مؤكدة';
        ticketStatus.className = 'bg-secondary-container text-on-secondary-container font-label-md text-label-md font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1';
      }
    }
  }
});
