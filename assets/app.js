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

const interestForm = document.querySelector('#interest-form');
const interestEmail = document.querySelector('#interest-email');
const interestMessage = document.querySelector('#interest-message');

function setInterestMessage(text, status) {
  if (!interestMessage) return;
  interestMessage.textContent = text;
  interestMessage.dataset.status = status;
}

if (interestForm && interestEmail) {
  interestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = interestEmail.value.trim();

    if (!value) {
      setInterestMessage('Enter your email address', 'error');
      interestEmail.focus();
      return;
    }

    if (!interestEmail.checkValidity()) {
      setInterestMessage('Please enter a valid email address', 'error');
      interestEmail.focus();
      return;
    }

    setInterestMessage('Prototype only — project updates are not wired to a backend yet', 'info');
  });
}
