const addOnClickEvent = (title: HTMLSpanElement) => {
  title.addEventListener('click', async () => {
    const trimmedText = title.innerText.trim()
    await navigator.clipboard.writeText(trimmedText)
  })
}

window.setInterval(() => {
  let title = document.querySelector('span.js-issue-title')
  if (title && title instanceof HTMLSpanElement) addOnClickEvent(title)
}, 3000)
