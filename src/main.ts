const addOnClickCopyTitle = (title: HTMLSpanElement): void => {
  title.addEventListener('click', () => {
    const trimmedText = title.innerText.trim()
    navigator.clipboard.writeText(trimmedText)
  })
}

const makeButton = (originalEditButton: HTMLButtonElement): HTMLButtonElement => {
  const button = document.createElement('button')
  button.classList.add('btn', 'btn-sm', 'easy-action')
  button.textContent = 'Edit'
  button.style.marginLeft = '0.5rem'
  button.style.float = 'right'
  button.addEventListener('click', () => {
    originalEditButton?.click()
  })
  return button
}

window.setInterval(() => {
  const existEasyActionButton = !!document.querySelector('button.easy-action')
  if (existEasyActionButton) return
  // TODO: ブラウザのリロードせずにコメントが増えた場合にもボタンがつくように対応する
  // resolved になっているコメントはボタンつける必要はないかも？

  const title = document.querySelector('span.js-issue-title')
  if (title instanceof HTMLSpanElement) addOnClickCopyTitle(title)

  const originalButtons = document.querySelectorAll(
    '.dropdown-item.btn-link.js-comment-edit-button'
  )
  if (!originalButtons) return

  originalButtons.forEach((button, index, buttons) => {
    const editButton = makeButton(button as HTMLButtonElement)
    const parent = buttons[index]?.parentNode?.parentNode?.parentNode?.parentNode
    const refChild = parent?.childNodes[3]
    if (refChild) parent?.insertBefore(editButton, refChild)
  })
}, 3000)
