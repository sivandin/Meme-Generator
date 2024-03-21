'use strict'

let gElCanvas
let gCtx
const gBorders = []
let gSavedMemes = []
let gFilterBy = ''
var gImgs


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    let selectedMeme = loadFromStorage('selectedMeme')
    if (selectedMeme) gMeme = selectedMeme

    let savedMemes = loadFromStorage('savedGallery')
    if (savedMemes) gSavedMemes = savedMemes

    createImgs()
    // resizeCanvas()
    renderMeme()
    renderGallery()

    document.body.addEventListener('click', closeMenuOnClickOutside)
    addClickOutsideListener()

    // window.addEventListener('resize', () => resizeCanvas())
}

function addClickOutsideListener() {
    document.body.addEventListener('click', (event) => {
        const clickedElement = event.target
        const canvas = document.querySelector('canvas')

        // Check if the clicked element is the canvas
        if (clickedElement !== canvas) {
            cleanSelected()
            renderMeme()
        }
    })
}

function renderMeme(selectedMeme = gMeme, ctx = gCtx, canvas = gElCanvas) {
    const img = new Image()
    const imgIdx= selectedMeme.selectedImgId-1
    const imgSrc = gImgs[imgIdx].url
    img.src = `${imgSrc}`

    img.onload = () => {
        canvas.height = (img.naturalHeight / img.naturalWidth) * canvas.width

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        renderText(selectedMeme.lines, ctx)
        renderBorders(selectedMeme.lines, ctx)
    }
}

    function renderText(lines, ctx) {
        lines.forEach((line, index) => {
            drawText(line.txt, line.x, line.y + index * 50, line.strokeColor, line.fillColor, line.fontSize, line.fontFamily, line.align, ctx)
        })
    }

    function renderBorders(lines, ctx) {
        gBorders.length = 0

        lines.forEach((line, index) => {
            let rect = null

            if (line.isSelected) {
                const lineWidth = 2
                const lineColor = 'black'
                rect = drawBorder(line.x, line.y + index * 50, line, lineWidth, lineColor, ctx)
            } else {
                const lineWidth = 0
                const lineColor = 'rgb(0,0,0,0)'
                rect = drawBorder(line.x, line.y + index * 50, line, lineWidth, lineColor, ctx)
            }
            gBorders.push(rect)
        })
    }


    function coverCanvasWithImg(elImg) {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }


    function drawText(text, x, y, strokeColor = 'black', fillColor = 'orange', fontSize = 30, fontFamily = 'Arial', align = 'center', ctx = gCtx) {
        ctx.lineWidth = 1
        ctx.strokeStyle = strokeColor
        ctx.fillStyle = fillColor
        ctx.font = `${fontSize}px ${fontFamily}`
        ctx.textAlign = align
        ctx.textBaseline = 'middle'

        ctx.fillText(text, x, y)
        ctx.strokeText(text, x, y)
    }


    function drawBorder(x, y, line, lineWidth, lineColor, ctx = gCtx) {
        console.log(line)
        const textWidth = ctx.measureText(line.txt).width
        const paddingPercentage = 0.01 // Adjust as needed (10% padding)
        const fontSize = +line.fontSize
        const rectPadding = textWidth * paddingPercentage
        console.log(textWidth, 'textwidth', rectPadding, 'rectpadding')

        const rect = {
            x: x - textWidth / 2 - rectPadding,
            y: y - fontSize / 2 - rectPadding,
            width: textWidth + rectPadding,
            height: fontSize + 2 * rectPadding
        }
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = lineColor
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
        return rect
    }

    function onWritingTxt(elInput) {
        setLineTxt(elInput.value)
        renderMeme()
    }

    function onDownloadMeme(elLink) {
        cleanSelected()
        renderMeme()
        const canvas = document.querySelector('.canvas-container canvas')
        const dataURL = canvas.toDataURL('myMeme/gif') // Specify image format if needed

        elLink.href = dataURL
    }

    function onChangeColor(colorName, brushClassName, elColor) {
        const colorVal = elColor.value
        const elBrush = document.querySelector(`.${brushClassName}`)
        elBrush.style.color = colorVal
        changeColor(colorVal, colorName)
        renderMeme()
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

    function onDeleteLine() {
        onCleanSelected()
        delteLine()
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

    function onAddEmoji(elBtn) {
        cleanSelected()
        var x = getRandomIntInclusive(100, 200)
        var y = getRandomIntInclusive(100, 200)
        addLine('emoji', elBtn.value, 35, x, y)
        renderMeme()
    }

    function onFontFamChange(elFontSelect) {
        fontFamChange(elFontSelect.value)
        renderMeme()
    }

    function onFontSizeSelect(elFontSize) {
        fontSizeSelect(elFontSize.value)
        renderMeme()
    }

    function onAlignTxt(direction) {
        const elBtnLeft = document.querySelector('.align-left')
        const elBtnRight = document.querySelector('.align-right')

        if (direction === 'right') elBtnRight.classList.add('.btn-clicked')
        if (direction === 'left') elBtnLeft.classList.add('.btn-clicked')

        alignTxt(direction)
        renderMeme()
    }

    function onChooseRandomMeme() {
        deleteLines()
        var line = chooseRandomLine()
        addLine('line', line, 22)
        chooseRandomImgId()
        renderPlaceholder()
        renderMeme()
    }

    function onSaveMeme() {
        cleanSelected()

        gSavedMemes.push({ ...gMeme })
        saveMemeToSaved()

        const savedPageURL = 'saved.html'
        window.location.href = savedPageURL
    }
