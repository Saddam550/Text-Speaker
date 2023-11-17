console.clear()
const speak = document.getElementById('speak-btn')
const stops = document.getElementById('stop-btn')
const input = document.getElementById('text-box')
const voicseList = document.getElementById('voicseList')

const synht = window.speechSynthesis

let voices = []
let speaking = false
getVoice()
speechSynthesis.onvoiceschanged = getVoice

speak.addEventListener(
  'click', // Text to speech function
  () => {
    // If speaking, exit function
    if (speaking) {
      return
    }

    // Get text input value
    const text = input.value

    // If text exists, create speech synthesis utterance
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text)

      // Get selected voice name from dropdown
      let selectvoiceName =
        voicseList.selectedOptions[0].getAttribute('data-name')

      // Loop through voices and set the voice to the selected one
      voices.forEach((voice) => {
        if (voice.name == selectvoiceName) {
          utterance.voice = voice
          synht.speak(utterance)
        }
      })

      // Set speaking to true
      speaking = true

      // Enable stop button and disable speak button when speaking starts
      utterance.onend = () => {
        speaking = false
        speak.disabled = false
        stops.disabled = true
      }

      // Disable speak button and enable stop button
      speak.disabled = true
      stops.disabled = false
    }
  }
)

stops.addEventListener('click', () => {
  if (speaking) {
    // Cancel the ongoing speech synthesis
    synht.cancel()
    // Update the speaking state
    speaking = false
    // Enable the speak button and disable the stop button
    speak.disabled = false
    stops.disabled = true
  }
})

function getVoice() {
  // Retrieve all voices from synthetics
  voices = synht.getVoices()
  // Empty the current voice list
  voicseList.innerHTML = ''
  // Loop through all voices and add them to the list
  voices.forEach((voice_a) => {
    const createItem = document.createElement('option')
    createItem.textContent = voice_a.name
    createItem.setAttribute('data-lang', voice_a.lang)
    createItem.setAttribute('data-name', voice_a.name)
    voicseList.appendChild(createItem)
  })
  // Set the first voice as selected
  voicseList.selectedIndex = 0
}
