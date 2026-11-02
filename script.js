/*
  WEDE5020 PoE - Ous Ma'mikis WhatsApp Café
  Part 3: JavaScript, forms and interactive functionality
  Replace BUSINESS_WHATSAPP with the confirmed business number before public launch.
*/
'use strict';

const BUSINESS_WHATSAPP = '27110000000'; // Demo placeholder: South African format, no + or spaces.
const DEMO_WHATSAPP = '27110000000';

function showToast(message) {
  let toast = document.querySelector('.toast-message');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Menu search and category filtering
const menuSearch = document.getElementById('menu-search');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const menuItems = [...document.querySelectorAll('.menu-item')];
const menuResults = document.getElementById('menu-results');
let currentFilter = 'all';

function filterMenu() {
  if (!menuItems.length) return;
  const query = (menuSearch?.value || '').trim().toLowerCase();
  let visible = 0;
  menuItems.forEach(item => {
    const categoryMatch = currentFilter === 'all' || item.dataset.category === currentFilter;
    const searchMatch = !query || item.dataset.name.includes(query) || item.textContent.toLowerCase().includes(query);
    item.hidden = !(categoryMatch && searchMatch);
    if (!item.hidden) visible += 1;
  });
  if (menuResults) menuResults.textContent = `${visible} menu item${visible === 1 ? '' : 's'} shown.`;
}

if (menuSearch) menuSearch.addEventListener('input', filterMenu);
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  currentFilter = button.dataset.filter;
  filterMenu();
}));
filterMenu();

// Simple cart, stored in localStorage so a refresh does not immediately lose the order.
const cartOverlay = document.getElementById('cart-overlay');
const openCartButton = document.getElementById('open-cart');
const closeCartButton = document.getElementById('close-cart');
const cartItemsNode = document.getElementById('cart-items');
const cartTotalNode = document.getElementById('cart-total');
const cartCountNode = document.getElementById('cart-count');
let cart = [];

try { cart = JSON.parse(localStorage.getItem('ousMamikisCart') || '[]'); } catch { cart = []; }

function saveCart() {
  try { localStorage.setItem('ousMamikisCart', JSON.stringify(cart)); } catch { /* storage may be disabled */ }
}

function renderCart() {
  if (!cartItemsNode) return;
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (cartCountNode) cartCountNode.textContent = count;
  if (cartTotalNode) cartTotalNode.textContent = `R${total.toFixed(2)}`;

  if (!cart.length) {
    cartItemsNode.innerHTML = '<p class="results-note">Your order is empty. Add a meal from the menu.</p>';
    return;
  }

  cartItemsNode.innerHTML = cart.map((item, index) => `
    <div class="cart-entry">
      <div><strong>${item.name}</strong><br><small>R${item.price.toFixed(2)} each</small>
        <div class="qty-row"><button type="button" data-cart-action="minus" data-index="${index}" aria-label="Reduce ${item.name} quantity">−</button><span>${item.qty}</span><button type="button" data-cart-action="plus" data-index="${index}" aria-label="Increase ${item.name} quantity">+</button></div>
      </div>
      <strong>R${(item.price * item.qty).toFixed(2)}</strong>
    </div>`).join('');
}

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) existing.qty += 1;
  else cart.push({ name, price, qty: 1 });
  saveCart(); renderCart(); showToast(`${name} added to your order.`);
}

document.querySelectorAll('.add-to-cart').forEach(button => button.addEventListener('click', () => {
  addToCart(button.dataset.name, Number(button.dataset.price));
}));

if (cartItemsNode) cartItemsNode.addEventListener('click', event => {
  const btn = event.target.closest('button[data-cart-action]');
  if (!btn) return;
  const index = Number(btn.dataset.index);
  if (!cart[index]) return;
  cart[index].qty += btn.dataset.cartAction === 'plus' ? 1 : -1;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart(); renderCart();
});

function openCart() { if (cartOverlay) { cartOverlay.classList.add('open'); cartOverlay.setAttribute('aria-hidden', 'false'); closeCartButton?.focus(); } }
function closeCart() { if (cartOverlay) { cartOverlay.classList.remove('open'); cartOverlay.setAttribute('aria-hidden', 'true'); openCartButton?.focus(); } }
openCartButton?.addEventListener('click', openCart);
closeCartButton?.addEventListener('click', closeCart);
cartOverlay?.addEventListener('click', event => { if (event.target === cartOverlay) closeCart(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeCart(); closeLightbox(); } });
renderCart();

function makeOrderText() {
  if (!cart.length) return '';
  const name = document.getElementById('cart-name')?.value.trim() || 'Customer';
  const phone = document.getElementById('cart-phone')?.value.trim() || 'Not provided';
  const notes = document.getElementById('cart-notes')?.value.trim() || 'None';
  const lines = cart.map(item => `• ${item.qty} × ${item.name} = R${(item.qty * item.price).toFixed(2)}`);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return `Hello Ous Ma'mikis! I would like to place an order enquiry.\n\nName: ${name}\nMobile: ${phone}\n\n${lines.join('\n')}\n\nTotal: R${total.toFixed(2)}\nNotes: ${notes}`;
}

function openWhatsApp(text) {
  if (BUSINESS_WHATSAPP === DEMO_WHATSAPP) showToast('Demo WhatsApp number is still configured. Replace it before public launch.');
  window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}

document.getElementById('whatsapp-cart')?.addEventListener('click', () => {
  const text = makeOrderText();
  if (!text) return showToast('Add at least one meal before sending an order.');
  openWhatsApp(text);
});
document.getElementById('general-whatsapp')?.addEventListener('click', () => {
  openWhatsApp("Hello Ous Ma'mikis! I would like to see today's menu and ask a question.");
});

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
if (lightboxImage) lightboxImage.addEventListener('error', () => { lightboxImage.src = 'assets/food-placeholder.svg'; });
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}
document.querySelectorAll('.gallery-item').forEach(button => button.addEventListener('click', () => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = button.dataset.full;
  lightboxImage.alt = button.dataset.alt || '';
  if (lightboxCaption) lightboxCaption.textContent = button.querySelector('span')?.textContent || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightboxClose?.focus();
}));
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });

// Accessible client-side form validation + Netlify-compatible submission.
function errorMessage(field) {
  if (field.validity.valueMissing) return 'This field is required.';
  if (field.validity.typeMismatch) return 'Please enter a valid value.';
  if (field.validity.patternMismatch) return 'Please check the format and try again.';
  return 'Please check this field.';
}

function validateField(field) {
  const error = field.closest('.field')?.querySelector('.error');
  const valid = field.checkValidity();
  field.setAttribute('aria-invalid', String(!valid));
  if (error) error.textContent = valid ? '' : errorMessage(field);
  return valid;
}

document.querySelectorAll('.validate-form').forEach(form => {
  form.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validateField(field); });
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const required = [...form.querySelectorAll('input[required], textarea[required], select[required]')];
    const valid = required.map(validateField).every(Boolean);
    const status = form.querySelector('.form-status');
    if (!valid) {
      if (status) status.textContent = 'Please correct the highlighted fields.';
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    if (status) status.textContent = 'Submitting…';
    const isLocal = location.protocol === 'file:' || ['localhost','127.0.0.1'].includes(location.hostname);
    if (isLocal) {
      if (status) status.textContent = 'Form is valid. Netlify will capture this submission after deployment with form detection enabled.';
      showToast('Local prototype validation passed.');
      return;
    }

    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (status) status.textContent = 'Thank you. Your message was submitted successfully.';
      form.reset();
      form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
    } catch (error) {
      if (status) status.textContent = 'The form could not be submitted. Please try WhatsApp or try again later.';
      console.error('Form submission failed:', error);
    }
  });
});
