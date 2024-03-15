'use strict'


function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    const elImgContainer = document.querySelector('.select-img-container')
    const imgs = getImgs()
    const strHtmls = imgs.map(img =>
        `<img src="${img.url}" alt="" onclick="onSelectImg(this)">`
    )
    elImgContainer.innerHTML = strHtmls.join('')
}

function onSelectImg(elImg) {
    const imgUrl = elImg.src
    const imgId = parseInt(imgUrl.split('/').pop().split('.')[0])

    setImg(imgId)
    _saveSelectedMeme()

    window.location.href = 'index.html'
}