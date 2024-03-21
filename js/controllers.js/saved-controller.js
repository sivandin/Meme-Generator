'use strict'

function onInitSaved() {
    let savedMemes = loadFromStorage('savedGallery')
    if (savedMemes) gSavedMemes = savedMemes

    createImgs()
    console.log(gSavedMemes)
    renderSavedMemes()
    document.body.addEventListener('click', closeMenuOnClickOutside)
}


function renderSavedMemes() {
    const savedContainer = document.querySelector('.saved-container')
    savedContainer.innerHTML = ''
    gSavedMemes.forEach((meme, index) => {
        const memeContainer = createMemeContainer()
        const canvas = createCanvas()
        const deleteButton = createDeleteButton(index)

        appendElementsToContainer(memeContainer, canvas, deleteButton)
        savedContainer.appendChild(memeContainer)
        const ctxSaved = canvas.getContext('2d')
        renderMeme(meme, ctxSaved, canvas)

        canvas.addEventListener('click', () => {
            const clickedMeme = gSavedMemes[index]
            moveMemeToMainCanvas(clickedMeme)
        })
    })
}

function createMemeContainer() {
    const memeContainer = document.createElement('div')
    memeContainer.classList.add('saved-meme-container')
    return memeContainer
}

function createCanvas() {
    const canvas = document.createElement('canvas')
    canvas.classList.add('saved-meme-canvas')
    canvas.width = 300
    canvas.height = 300
    return canvas
}

function createDeleteButton(index) {
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'X'
    deleteButton.classList.add('delete-button')
    deleteButton.addEventListener('click', () => onDeleteSavedMeme(index))
    return deleteButton
}

function appendElementsToContainer(container, ...elements) {
    elements.forEach(element => container.appendChild(element))
}

function moveMemeToMainCanvas(meme) {
    gMeme = meme
    _saveSelectedMeme()
    
    renderMeme()

    const mainPageURL = 'index.html'
    window.location.href = mainPageURL
}

function onDeleteSavedMeme(memeIdx){
deleteSavedMeme(memeIdx)
renderSavedMemes()
}