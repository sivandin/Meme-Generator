'use strict'





// Cover a fixed-width canvas using an img
// by changing the canvas height

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth
}