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

const makeSVG = (isActivatedWIP: boolean): Element => {
  const svgNS = 'http://www.w3.org/2000/svg'
  const dPath =
    'M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttributeNS(null, 'width', '12')
  svg.setAttributeNS(null, 'height', '12')
  svg.setAttributeNS(null, 'viewBox', '0 0 512 512')
  if (!isActivatedWIP) svg.classList.add('invisible')
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('d', dPath)
  path.setAttribute('fill', 'currentColor')
  svg.appendChild(path)

  return svg
}

const makeWIPToggleButton = (isActivatedWIP: boolean): HTMLButtonElement => {
  const button = document.createElement('button')
  button.classList.add('btn', 'btn-sm', 'easy-action')
  if (isActivatedWIP) button.classList.add('btn-primary')
  button.style.display = 'inline-flex'
  button.style.alignItems = 'center'
  button.style.marginLeft = '0.5rem'
  const span = document.createElement('span')
  span.textContent = 'WIP'
  span.style.marginLeft = '0.25rem'
  button.appendChild(span)

  const svg = makeSVG(isActivatedWIP)
  button.prepend(svg)

  button.addEventListener('click', () => {
    button.querySelector('svg')?.classList.toggle('invisible')
    button.classList.toggle('btn-primary')

    const title = document.querySelector('#issue_title') as HTMLInputElement
    const replaceText = title.value.startsWith('[WIP]')
      ? title.value.slice(5)
      : `[WIP] ${title.value}`

    title.value = replaceText
    const saveButton = document.querySelector(
      'form[id^=edit_header] > div > button'
    ) as HTMLButtonElement
    saveButton.click()
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

  const isActivatedWIP = (document.querySelector(
    '#issue_title'
  ) as HTMLInputElement)?.value.startsWith('[WIP]')

  const WIPToggleButton = makeWIPToggleButton(isActivatedWIP)
  const parent = document.querySelector('#partial-discussion-header > div.gh-header-show > h1')
  parent?.appendChild(WIPToggleButton)
}, 3000)
