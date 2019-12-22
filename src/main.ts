const addOnClickCopyTitle = (title: HTMLSpanElement): void => {
  title.addEventListener('click', () => {
    const trimmedText = title.innerText.trim()
    navigator.clipboard.writeText(trimmedText)
  })
}

const addOnClickEditButton = (editButton: HTMLButtonElement): void => {
  editButton.addEventListener('click', () => {
    const originalEditButton = document.querySelector('button.js-comment-edit-button')
    ;(originalEditButton as HTMLButtonElement)?.click()
  })
}

window.setInterval(() => {
  const existEasyActionButton = !!document.querySelector('button.easy-action')

  if (existEasyActionButton) return
  // TODO: コメントが複数ある場合考える

  const title = document.querySelector('span.js-issue-title')
  if (title && title instanceof HTMLSpanElement) addOnClickCopyTitle(title)

  const editButton = document.createElement('button')
  editButton.classList.add('btn', 'btn-sm', 'easy-action')
  editButton.textContent = 'Edit'
  addOnClickEditButton(editButton)

  const parent = document.querySelector('div.timeline-comment-header')
  const refChild = document.querySelector('h3.timeline-comment-header-text')
  parent?.insertBefore(editButton, refChild)
}, 3000)
