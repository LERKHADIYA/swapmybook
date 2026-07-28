// ===== SwapMyBook — shared behavior =====
document.addEventListener('DOMContentLoaded', () => {

  if (window.AOS) {
    AOS.init({ duration: 650, once: true, easing: 'ease-out-cubic', offset: 60 });
  }

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = navToggle.querySelector('i');
      if (icon) icon.classList.toggle('fa-bars'), icon.classList.toggle('fa-xmark');
    });
  }

  // Password show/hide toggles
  document.querySelectorAll('[data-toggle-pass]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-toggle-pass');
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      }
    });
  });

  // File input: show chosen filename
  document.querySelectorAll('.file-input').forEach(input => {
    input.addEventListener('change', () => {
      const label = document.querySelector(`[data-file-label="${input.id}"]`);
      if (label) label.textContent = input.files.length ? input.files[0].name : 'Choose File';
    });
  });

  // Star rating (feedback form)
  document.querySelectorAll('.star-rating').forEach(group => {
    const stars = group.querySelectorAll('.star');
    const hiddenInput = document.getElementById(group.getAttribute('data-input'));
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const val = Number(star.getAttribute('data-value'));
        if (hiddenInput) hiddenInput.value = val;
        stars.forEach(s => s.classList.toggle('filled', Number(s.getAttribute('data-value')) <= val));
      });
    });
  });

  // Lightweight front-end-only form feedback (no backend wired up)
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const toastText = form.getAttribute('data-success-text') || 'Submitted successfully!';
      showToast(toastText);
      form.reset();
      document.querySelectorAll('.star.filled').forEach(s => s.classList.remove('filled'));
      document.querySelectorAll('[data-file-label]').forEach(l => l.textContent = 'Choose File');
    });
  });

  function showToast(text) {
    let toast = document.getElementById('swapToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'swapToast';
      toast.className = 'fixed bottom-6 right-6 z-50 bg-white border border-[#e3eeec] shadow-xl rounded-xl px-5 py-4 flex items-center gap-3 translate-y-24 opacity-0 transition-all duration-300';
      toast.innerHTML = '<i class="fa-solid fa-circle-check text-[#2e7d32] text-lg"></i><span class="font-medium text-sm"></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector('span').textContent = text;
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-24', 'opacity-0');
    });
    clearTimeout(window.__swapToastTimer);
    window.__swapToastTimer = setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 2600);
  }
});
