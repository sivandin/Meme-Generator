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
        renderText(selectedMeme.lines)
        renderBorders(selectedMeme.lines)
    }
}

function renderText(lines) {
    lines.forEach((line, index) => {
        drawText(line.txt, line.x, line.y + index * 50, line.storkeColor, line.fillColor, line.fontSize, line.fontFamily)
    })
}

function renderBorders(lines) {
    lines.forEach((line, index) => {
        if (line.isSelected) {
            const lineWidth = 1
            const lineColor = 'black'
            drawBorder(line.x, line.y + index * 50, line, lineWidth, lineColor)
        } else {
            const lineWidth = 0
            const lineColor = 'rgb(0,0,0,0)'
            drawBorder(line.x, line.y + index * 50, line, lineWidth, lineColor)

        }
    })
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

function drawBorder(x, y, line, lineWidth, lineColor) {
    const textWidth = gCtx.measureText(line.txt).width
    const padding = 5
    gCtx.lineWidth = lineWidth
    gCtx.strokeStyle = lineColor
    gCtx.strokeRect(x - textWidth / 2 - padding, y - line.fontSize / 2 - padding, textWidth + 2 * padding, line.fontSize + 2 * padding)
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

function onChangeTxtSize(val) {
    changeTxtSize(val)
    renderMeme()
}

function onAddLine() {

    onCleanSelected()
    // debugger
    addLine()
    renderPlaceholder()

    renderMeme()
}

function onSwitchLine() {
    onCleanSelected()
    switchLine()
    renderPlaceholder()

    renderMeme()
}

function renderPlaceholder() {
    const elTxt = document.querySelector('[name = "userTxt"]')
    const currLineIdx = gMeme.selectedLineIdx
    elTxt.placeholder = gMeme.lines[currLineIdx].txt
    elTxt.value = gMeme.lines[currLineIdx].txt
}

function onCleanSelected() {
    cleanSelected()
    renderMeme()
}

function isTxtClicked(line, clickX, clickY) {
    debugger
    const textWidth = gCtx.measureText(line.txt).width
    const padding = 5
    const minX = line.x - textWidth / 2 - padding
    const maxX = line.x + textWidth / 2 + padding
    const minY = line.y - line.fontSize / 2 - padding
    const maxY = line.y + line.fontSize / 2 + padding

    return clickX >= minX && clickX <= maxX && clickY >= minY && clickY <= maxY
}

function onCanvasClick(ev) {
    debugger
    const canvasRect = gElCanvas.getBoundingClientRect()
    const mouseX = ev.clientX - canvasRect.left
    const mouseY = ev.clientY - canvasRect.top

    // Iterate over each text line
    gMeme.lines.forEach((line, idx) => {
        console.log(line, 'line', idx, 'idx')
        // Check if the click coordinates are inside the bounding box of the text line
        if (isTxtClicked(line, mouseX, mouseY)) {
            console.log('txt clicked')
            gMeme.selectedLineIdx = idx
            renderPlaceholder()
            renderMeme()
        }
    })
}


