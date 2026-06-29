const toggleButtons = Array.from(document.querySelectorAll('[data-toggle-group]'));
const toggleViews = Array.from(document.querySelectorAll('[data-group][data-view]'));

function setView(group, key) {
  toggleButtons
    .filter((button) => button.dataset.toggleGroup === group)
    .forEach((button) => {
      const isActive = button.dataset.toggle === key;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });

  toggleViews
    .filter((view) => view.dataset.group === group)
    .forEach((view) => {
      view.classList.toggle('active', view.dataset.view === key);
    });
}

toggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setView(button.dataset.toggleGroup, button.dataset.toggle);
  });
});

const waitlistForm = document.querySelector('#waitlist-form');
const waitlistEmail = document.querySelector('#waitlist-email');
const waitlistMessage = document.querySelector('#waitlist-message');

function setWaitlistMessage(text, status) {
  if (!waitlistMessage) return;
  waitlistMessage.textContent = text;
  waitlistMessage.dataset.status = status;
}

if (waitlistForm && waitlistEmail) {
  waitlistForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = waitlistEmail.value.trim();

    if (!value) {
      setWaitlistMessage('Enter your email address', 'error');
      waitlistEmail.focus();
      return;
    }

    if (!waitlistEmail.checkValidity()) {
      setWaitlistMessage('Please enter a valid email address', 'error');
      waitlistEmail.focus();
      return;
    }

    setWaitlistMessage('Prototype only — waitlist submission is not wired yet', 'info');
  });
}
