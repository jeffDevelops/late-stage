export const disableInteractablesWhile = async <T>(func: () => Promise<T>): Promise<T> => {
  const interactables = document.querySelectorAll(
    'button:not(:disabled), form:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a',
  )

  // Disable all interactables on the page
  interactables.forEach((node) => {
    node.setAttribute('disabled', 'true')
    node.classList.add('disabled')
    ;(node as HTMLElement).style.pointerEvents = 'none'
    ;(node as HTMLElement).style.cursor = 'not-allowed'
  })

  // Run the consumer's function
  const returnValue: T = await func()

  // Re-enable all interactables
  interactables.forEach((node) => {
    node.removeAttribute('disabled')
    node.classList.remove('disabled')
    ;(node as HTMLElement).style.pointerEvents = 'auto'
    ;(node as HTMLElement).style.cursor = 'default'

    if (
      node.tagName === 'INPUT' ||
      node.tagName === 'TEXTAREA' ||
      node.getAttribute('contenteditable')
    ) {
      ;(node as HTMLElement).style.cursor = 'text'
    }

    if (node.tagName === 'FORM' || node.tagName === 'SELECT') {
      ;(node as HTMLElement).style.cursor = 'default'
    }

    if (node.tagName === 'BUTTON' || node.tagName === 'A') {
      ;(node as HTMLElement).style.cursor = 'pointer'
    }
  })

  return returnValue
}
