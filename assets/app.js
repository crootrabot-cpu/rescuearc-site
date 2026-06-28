const buttons = Array.from(document.querySelectorAll('[data-toggle]'));
const views = Array.from(document.querySelectorAll('[data-view]'));

function setView(key) {
  buttons.forEach((button) => {
    button.classList.toggle('active', button.dataset.toggle === key);
  });
  views.forEach((view) => {
    view.classList.toggle('active', view.dataset.view === key);
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => setView(button.dataset.toggle));
});
