/**
 * Delta Transit Pulse - Supervisor Fleet Management Controller
 */

// Global Allocation State
let allocationState = DeltaStorage.getAllocations();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Clock Ticker
  const clockEl = document.getElementById('clock-display');
  if (clockEl) {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      clockEl.textContent = timeStr;
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  // 2. Initialize Allocation UI from saved state
  initAllocationUI();
  recalculateTotal();

  // 3. Modal Event Listeners
  const modal = document.getElementById('emergency-modal');
  const openModalBtn = document.getElementById('btn-open-dispatch');
  const closeModalBtn = document.getElementById('btn-close-dispatch');
  const cancelModalBtn = document.getElementById('btn-cancel-dispatch');
  const confirmModalBtn = document.getElementById('btn-confirm-dispatch');

  if (openModalBtn) openModalBtn.addEventListener('click', dispatchEmergencyModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeDispatchModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeDispatchModal);
  if (confirmModalBtn) confirmModalBtn.addEventListener('click', confirmEmergencyDispatch);

  // 4. Alert Action Buttons
  const approveAlertBtn = document.getElementById('approve-btn');
  const dismissAlertBtn = document.getElementById('btn-dismiss-alert');
  if (approveAlertBtn) approveAlertBtn.addEventListener('click', approveExtraBus);
  if (dismissAlertBtn) dismissAlertBtn.addEventListener('click', dismissAlert);
});

// Initialize Allocation counts in HTML
function initAllocationUI() {
  for (const [route, count] of Object.entries(allocationState)) {
    const el = document.getElementById(`alloc-${route}`);
    if (el) el.textContent = count;
  }
}

// Adjust allocation +1 / -1
window.adjustAllocation = function(routeKey, delta) {
  if (allocationState[routeKey] !== undefined) {
    const newVal = Math.max(1, allocationState[routeKey] + delta);
    allocationState[routeKey] = newVal;
    DeltaStorage.saveAllocations(allocationState);

    const targetElem = document.getElementById(`alloc-${routeKey}`);
    if (targetElem) {
      targetElem.textContent = newVal;
      targetElem.classList.add('scale-125', 'text-secondary');
      setTimeout(() => {
        targetElem.classList.remove('scale-125', 'text-secondary');
      }, 200);
    }
    recalculateTotal();
    showToast(`تم تحديث حصة خط (${getRouteName(routeKey)}) إلى ${newVal} حافلات`, 'info');
  }
};

// Recalculate total buses allocated
function recalculateTotal() {
  const total = Object.values(allocationState).reduce((a, b) => a + b, 0);
  const totalElem = document.getElementById('total-allocated-sum');
  if (totalElem) {
    totalElem.textContent = total + ' حافلة';
  }
}

// Helper to get Arabic name of route
function getRouteName(key) {
  const map = {
    mansoura: 'المنصورة السريع',
    tanta: 'طنطا المركزي',
    damietta: 'دمياط الجديدة',
    belqas: 'بلقاس وشربين',
    kafr: 'كفر الشيخ'
  };
  return map[key] || key;
}

// Modal Handlers
window.dispatchEmergencyModal = function() {
  const modal = document.getElementById('emergency-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeDispatchModal = function() {
  const modal = document.getElementById('emergency-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.confirmEmergencyDispatch = function() {
  const select = document.getElementById('modal-route-select');
  const routeVal = select ? select.value : 'mansoura';
  window.adjustAllocation(routeVal, 1);
  closeDispatchModal();
  showToast('تم تفويج الحافلة الاحتياطية DL-402 بنجاح وإرسال إشعار الانطلاق للسائق وتحديث جداول الطلاب! 🚨', 'success');
};

// Alert Actions
window.approveExtraBus = function() {
  window.adjustAllocation('mansoura', 1);
  const btn = document.getElementById('approve-btn');
  if (btn) {
    btn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check</span><span>تم التفويج بنجاح</span>';
    btn.classList.remove('bg-primary');
    btn.classList.add('bg-secondary');
    btn.disabled = true;
  }
  showToast('تم اعتماد إضافة الحافلة الإضافية لخط المنصورة بنجاح', 'success');
  setTimeout(() => {
    dismissAlert();
  }, 1500);
};

window.dismissAlert = function() {
  const alertBox = document.getElementById('urgent-alert-box');
  if (alertBox) {
    alertBox.style.transition = 'all 0.4s ease';
    alertBox.style.opacity = '0';
    alertBox.style.maxHeight = '0px';
    alertBox.style.padding = '0px';
    setTimeout(() => alertBox.remove(), 400);
  }
};
