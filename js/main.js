'use strict'

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

// Cover a fixed-width canvas using an img
// by changing the canvas height

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth
}

function closeMenuOnClickOutside(event) {
    var nav = document.querySelector('.main-nav');
    var toggleMenuBtn = document.querySelector('.toggle-menu-btn');
    // Close the menu if it's open and the click is outside of the navigation menu and toggle button
    if (event.target !== nav && event.target !== toggleMenuBtn && !nav.contains(event.target)) {
        var body = document.querySelector('body');
        body.classList.remove('menu-open');
    }
}