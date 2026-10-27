/**
 * Delta Transit Pulse - Main Application Controller
 * Handles Navigation, State Persistence, Notifications, and Common Interactivity
 */

// 1. Shared Storage Manager
const DeltaStorage = {
  KEYS: {
    STUDENT: 'delta_bus_student',
    ALLOCATIONS: 'delta_bus_allocations',
    NOTIFICATIONS: 'delta_bus_notifications',
    TRIP_STATUS: 'delta_bus_trip_status'
  },

  getDefaultStudent() {
    return {
      name: "أحمد محمود مصطفى",
      id: "20210452",
      faculty: "كلية الهندسة (مستوى 4)",
      seat: "14",
      seatType: "نافذة يمين",
      line: "المنصورة ⇋ جامعة الدلتا",
      routeKey: "mansoura",
      bus: "DL-104",
      gate: "بوابة C",
      time: "07:45 ص",
      status: "مؤكدة",
      hash: "DELTA-2024-9982-14DL",
      bookedAt: Date.now()
    };
  },

  getStudent() {
    try {
      const data = localStorage.getItem(this.KEYS.STUDENT);
      return data ? JSON.parse(data) : this.getDefaultStudent();
    } catch (e) {
      return this.getDefaultStudent();
    }
  },

  saveStudent(studentData) {
    try {
      localStorage.setItem(this.KEYS.STUDENT, JSON.stringify(studentData));
      window.dispatchEvent(new CustomEvent('studentUpdated', { detail: studentData }));
    } catch (e) {
      console.error('Failed to save student data', e);
    }
  },

  getAllocations() {
    try {
      const data = localStorage.getItem(this.KEYS.ALLOCATIONS);
      return data ? JSON.parse(data) : {
        mansoura: 14,
        tanta: 10,
        damietta: 8,
        belqas: 6,
        kafr: 10
      };
    } catch (e) {
      return { mansoura: 14, tanta: 10, damietta: 8, belqas: 6, kafr: 10 };
    }
  },

  saveAllocations(allocations) {
    try {
      localStorage.setItem(this.KEYS.ALLOCATIONS, JSON.stringify(allocations));
      window.dispatchEvent(new CustomEvent('allocationsUpdated', { detail: allocations }));
    } catch (e) {
      console.error('Failed to save allocations', e);
    }
  }
};

// 2. Toast Notification Function
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconName = 'info';
  if (type === 'success') iconName = 'check_circle';
  if (type === 'warning') iconName = 'warning';
  if (type === 'error') iconName = 'error';

  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px]">${iconName}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px) scale(0.95)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
}

// 3. Navigation Highlighting & Mobile Drawer
document.addEventListener('DOMContentLoaded', () => {
  // Determine current page from body attribute or URL
  const currentPath = window.location.pathname.toLowerCase();
  let currentPage = document.body.dataset.page;

  if (!currentPage) {
    if (currentPath.includes('student')) currentPage = 'student';
    else if (currentPath.includes('driver')) currentPage = 'driver';
    else if (currentPath.includes('supervisor')) currentPage = 'supervisor';
    else currentPage = 'index';
  }

  // Highlight Desktop Navigation Links
  const navLinks = document.querySelectorAll('#main-nav .nav-link, nav .nav-link');
  navLinks.forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // Highlight Mobile Navigation Links
  const mobileLinks = document.querySelectorAll('#mobile-drawer .mobile-nav-link');
  mobileLinks.forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile Menu Drawer Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('hidden');
      const icon = mobileBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = mobileDrawer.classList.contains('hidden') ? 'menu' : 'close';
      }
    });

    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileDrawer.classList.add('hidden');
        const icon = mobileBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      }
    });
  }

  // Notifications Dropdown Toggle
  const notifBtn = document.getElementById('btn-notifications');
  const notifDropdown = document.getElementById('notifications-dropdown');

  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
        notifDropdown.classList.add('hidden');
      }
    });
  }
});
