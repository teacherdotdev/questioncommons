// Copy the install command when its button is pressed.
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  const label = button.querySelector('.copy')
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? '')
      if (label) label.textContent = 'copied'
    } catch {
      if (label) label.textContent = 'select to copy'
    }
    setTimeout(() => {
      if (label) label.textContent = 'copy'
    }, 1600)
  })
}
