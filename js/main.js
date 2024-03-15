'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    // resizeCanvas()
    renderImg()

    // window.addEventListener('resize', () => resizeCanvas())
}



// Cover a fixed-width canvas using an img
// by changing the canvas height

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth
}