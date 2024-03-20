'use strict'

function deleteSavedMeme(idx) {
gSavedMemes.splice(idx, 1)
saveMemeToSaved()
}

function saveMemeToSaved() {
    saveToStorage('savedGallery', gSavedMemes)
}
