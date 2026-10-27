/**
 * Delta Transit Pulse - Driver Trip Console Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. End Trip Modal handling
  const endTripBtn = document.getElementById('btn-end-trip');
  const modal = document.getElementById('end-trip-modal');
  const cancelModal = document.getElementById('modal-cancel-end');
  const confirmModal = document.getElementById('modal-confirm-end');

  if (endTripBtn && modal && cancelModal && confirmModal) {
    endTripBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
    cancelModal.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
    confirmModal.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      showToast('تم إنهاء الرحلة بنجاح وحفظ سجل الحضور في الخادم المركزي للجامعة.', 'success');
    });
  }

  // 2. Emergency / Maintenance Request
  const emergencyBtn = document.getElementById('btn-emergency');
  if (emergencyBtn) {
    emergencyBtn.addEventListener('click', () => {
      const confirmed = confirm('هل تريد إرسال نداء استغاثة ودعم فني فوري لغرفة العمليات المركزية والمشرف؟');
      if (confirmed) {
        showToast('تم إرسال إحداثيات الحافلة DL-104 إلى مشرف العمليات والدعم الفني بنجاح 🚨', 'error');
      }
    });
  }

  // 3. Interactive Scan Simulation
  const scanSimBtn = document.getElementById('btn-simulate-scan');
  const manualScanBtn = document.getElementById('btn-manual-scan');
  const resultCard = document.getElementById('scan-result-card');
  const studentNameEl = document.getElementById('res-student-name');
  const studentCodeEl = document.getElementById('res-student-code');
  const seatInfoEl = document.getElementById('res-seat-info');

  // Load dynamically booked student if available
  const storedStudent = DeltaStorage.getStudent();
  const sampleStudents = [
    { 
      name: storedStudent.name || "أحمد محمود مصطفى", 
      id: storedStudent.id || "20210452", 
      seat: `مقعد ${storedStudent.seat || '14'}`, 
      stop: "سندوب (المنصورة)",
      time: "07:28:44 ص" 
    },
    { 
      name: "محمود حسن السيد", 
      id: "20218840", 
      seat: "مقعد 09", 
      stop: "موقف المنصورة الرئيسي",
      time: "07:31:12 ص" 
    },
    { 
      name: "مريم خالد الشناوي", 
      id: "20229012", 
      seat: "مقعد 21", 
      stop: "طلخا كوبري الجامعة",
      time: "07:32:04 ص" 
    }
  ];
  let sampleIdx = 0;

  if (scanSimBtn && resultCard) {
    scanSimBtn.addEventListener('click', () => {
      sampleIdx = (sampleIdx + 1) % sampleStudents.length;
      const current = sampleStudents[sampleIdx];

      // Visual indicator ping
      resultCard.classList.add('ring-4', 'ring-secondary-container');
      
      if (studentNameEl) studentNameEl.textContent = current.name;
      if (studentCodeEl) studentCodeEl.textContent = `كود الطالب: ${current.id} | كلية الهندسة`;
      if (seatInfoEl) seatInfoEl.innerHTML = `${current.seat} <span class="font-label-sm text-label-sm text-secondary font-normal">(نافذة)</span>`;

      showToast(`تم مسح كود الراكب: ${current.name} (${current.seat}) بنجاح`, 'success');

      setTimeout(() => {
        resultCard.classList.remove('ring-4', 'ring-secondary-container');
      }, 700);
    });
  }

  // 4. Manual Scan Prompt
  if (manualScanBtn) {
    manualScanBtn.addEventListener('click', () => {
      const code = prompt('أدخل كود الطالب الجامعي أو رقم المقعد:');
      if (code && code.trim()) {
        showToast(`تم التحقق من الرمز: ${code.trim()} - صالح ومطابق للسجل الجامعي ✅`, 'success');
      }
    });
  }

  // 5. Confirm Boarding Trigger
  const confirmBoardingBtn = document.getElementById('btn-confirm-boarding');
  if (confirmBoardingBtn) {
    confirmBoardingBtn.addEventListener('click', () => {
      showToast('تم تأكيد صعود الراكب وتحديث الكشف اللحظي', 'success');
    });
  }

  // 6. Passenger Manifest Live Filter
  const searchInput = document.getElementById('passenger-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }
});
