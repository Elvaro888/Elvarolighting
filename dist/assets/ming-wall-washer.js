const finishButtons = document.querySelectorAll('[data-ming-finish]');
const productImage = document.querySelector('#ming-main');
const finishLabel = document.querySelector('#ming-finish');
for (const button of finishButtons) {
  button.addEventListener('click', () => {
    const photo = button.querySelector('img');
    productImage.src = photo.src;
    productImage.alt = photo.alt;
    finishLabel.textContent = photo.alt;
    for (const option of finishButtons) {
      option.setAttribute('aria-pressed', String(option === button));
    }
  });
}
