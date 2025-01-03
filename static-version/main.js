document.addEventListener('DOMContentLoaded', () => {
  // Initialize drag and drop functionality
  const dropArea = document.querySelector('.drag-drop-area');
  
  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea?.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Handle the generate button click
  const generateButton = document.querySelector('button');
  generateButton?.addEventListener('click', () => {
    const input = document.querySelector('input');
    if (input?.value) {
      console.log('Generating with prompt:', input.value);
      // Add visual feedback
      generateButton.textContent = 'Generating...';
      setTimeout(() => {
        generateButton.textContent = 'Generate';
      }, 2000);
    }
  });
});