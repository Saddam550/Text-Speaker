function getVoice() {
  voices = synht.getVoices()
  voicseList.innerHTML = ''
  voices.forEach((voice_a) => {
    const createItem = document.createElement('option')
    createItem.textContent = voice_a.name
    createItem.attributes('data-lang', voice_a.lang)
    createItem.attributes('data-name', voice_a.name)
    voicseList.appendChild(createItem)
  })
  voicseList.selectedIndex = 0
}
