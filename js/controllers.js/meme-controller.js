'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    // resizeCanvas()
    renderMeme()

    // window.addEventListener('resize', () => resizeCanvas())
}

function renderMeme() {
    let selectedMeme = loadFromStorage('selectedMeme')
    if (!selectedMeme) selectedMeme=gMeme

    const img = new Image()
    img.src = `img/${selectedMeme.selectedImgId}.jpg`

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
        drawText(selectedMeme.lines[0].txt , 200, 50)
    } 
    
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'orange'

    gCtx.fillStyle = 'lightsteelblue'

    gCtx.font = '30px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onWritingTxt(elInput){
    setLineTxt(elInput.value)
    renderMeme()
}



