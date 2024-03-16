'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    let selectedMeme = loadFromStorage('selectedMeme')
    if (selectedMeme) gMeme = selectedMeme
    // resizeCanvas()
    renderMeme()

    document.body.addEventListener('click', closeMenuOnClickOutside)

    // window.addEventListener('resize', () => resizeCanvas())
}

function renderMeme() {
    const selectedMeme = gMeme

    const img = new Image()
    img.src = `img/${selectedMeme.selectedImgId}.jpg`

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
        selectedMeme.lines.forEach((line, index) => {
            drawText(line.txt, line.x, line.y + index * 50, line.storkeColor, line.fillColor, line.fontSize, line.fontFamily) // Pass stroke and fill colors
        })
    }
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(text, x, y, strokeColor = 'black', fillColor = 'orange', fontSize = 30, fontFamily = 'Arial') {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${fontSize}px ${fontFamily}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


function onWritingTxt(elInput) {
    setLineTxt(elInput.value)
    renderMeme()
}

function onDownloadMeme(elLink) {
    const canvas = document.querySelector('.canvas-container canvas')
    const dataURL = canvas.toDataURL('myMeme/gif') // Specify image format if needed

    elLink.href = dataURL
}

function onChangeStrokeColor() {
    const elStrokeColor = document.querySelector('[name="stroke-color"]').value
    changeStrokeColor(elStrokeColor)
    renderMeme()
}

function onChangeFillColor() {
    const elFillColor = document.querySelector('[name="fill-color"]').value
    changeFillColor(elFillColor)
    renderMeme()
}

function onChangeTxtSize(val){
    changeTxtSize(val)
    renderMeme()
}




