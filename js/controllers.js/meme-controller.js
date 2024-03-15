'use strict'

function renderImg() {
    const img = new Image()
    img.src = 'img/3.jpg'

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
        drawText('Write down your text here', 200, 50)
    }

    
}

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
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
