'use strict'

let gElCanvas
let gCtx
const gBorders = []

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
        drawText(line.txt, line.x, line.y + index * 50, line.strokeColor, line.fillColor, line.fontSize, line.fontFamily)
    })
}

function renderBorders(lines) {
    gBorders.length = 0

    lines.forEach((line, index) => {
        let rect = null

        if (line.isSelected) {
            const lineWidth = 2
            const lineColor = 'black'
            rect = drawBorder(line.x, line.y + index * 50, line, lineWidth, lineColor)
        } else {
            const lineWidth = 0
            const lineColor = 'rgb(0,0,0,0)'
            rect = drawBorder(line.x, line.y + index * 50, line, lineWidth, lineColor)
        }
        gBorders.push(rect)
    })
}


function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}


function drawText(text, x, y, strokeColor = 'black', fillColor = 'orange', fontSize = 30, fontFamily = 'Arial') {
    debugger
    gCtx.lineWidth = 1
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${fontSize}px ${fontFamily}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


function drawBorder(x, y, line, lineWidth, lineColor, diff=2) {
    const textWidth = gCtx.measureText(line.txt).width;
    const paddingPercentage = 0.01 // Adjust as needed (10% padding)
    const fontSize = line.fontSize

    const rectPadding = diff 

    gCtx.lineWidth = lineWidth
    gCtx.strokeStyle = lineColor
    const rect = {
        x: x - textWidth / 2 - rectPadding,
        y: y - fontSize / 2 - rectPadding,
        width: textWidth + 2 * rectPadding,
        height: fontSize + 2 * rectPadding
    }
    gCtx.strokeRect(rect.x, rect.y, rect.width, rect.height)
    return rect
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

function onChangeColor(colorName, brushClassName, elColor) {
    const colorVal = elColor.value;
    const elBrush = document.querySelector(`.${brushClassName}`);
    elBrush.style.color = colorVal;
    changeColor(colorVal, colorName);
    renderMeme();
}

function onChangeTxtSize(val) {
    changeTxtSize(val)
    renderMeme()
}

function onAddLine() {
    onCleanSelected()
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

function onCanvasClick(ev) {
    const clickX = ev.offsetX
    const clickY = ev.offsetY

    for (let i = 0; i < gBorders.length; i++) {
        const rect = gBorders[i]
        if (clickX >= rect.x && clickX <= rect.x + rect.width
            && clickY >= rect.y && clickY <= rect.y + rect.height) {
            cleanSelected()
            gMeme.selectedLineIdx = i
            gMeme.lines[i].isSelected = true
            renderPlaceholder()
            renderMeme()
            return
        }
    }
    return false // Click is not inside any rectangle
}

function onFontFamChange(elFontSelect) {
    fontFamChange(elFontSelect.value)
    renderMeme()
}

function onFontSizeSelect(elFontSize) {
    fontSizeSelect(elFontSize.value)
    renderMeme()
}