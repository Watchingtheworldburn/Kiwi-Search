document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const aboutButton = document.getElementById('about-button');
  const donateButton = document.getElementById('donate-button');
  const closeButtons = document.querySelectorAll('.close-button');
  const modals = document.querySelectorAll('.modal');
  const aboutModal = document.getElementById('about-modal');
  const donateModal = document.getElementById('donate-modal');

  aboutButton.addEventListener('click', () => {
    aboutModal.classList.add('show');
  });

  donateButton.addEventListener('click', () => {
    donateModal.classList.add('show');
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      modals.forEach(modal => {
        modal.classList.remove('show');
      });
    });
  });

  window.addEventListener('click', (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  });

  // Handle donation options
  const donationOptions = document.querySelectorAll('.donation-option');
  const donateSubmit = document.querySelector('.donate-submit');
  let selectedAmount = null;

  donationOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove selected class from all options
      donationOptions.forEach(opt => opt.classList.remove('selected'));
      // Add selected class to clicked option
      option.classList.add('selected');
      selectedAmount = option.dataset.amount;
    });
  });

  donateSubmit.addEventListener('click', () => {
    if (!selectedAmount) {
      alert('Please select a donation amount');
      return;
    }
    // Replace this with your actual payment processing logic
    window.location.href = `https://buymeacoffee.com/kiwisearch/e/${selectedAmount}`;
  });
});