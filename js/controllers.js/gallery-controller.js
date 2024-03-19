'use strict'


function onInitGallery() {
    renderGallery()
    document.body.addEventListener('click', closeMenuOnClickOutside)
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
    _saveSelectedImg()

    window.location.href = 'index.html'
}

function openGallery() {
    const elDialog = document.querySelector('.gallery-dialog')
    elDialog.showModal()
    renderGallery()
  }
  
  function closeGallery() {
    const elDialog = document.querySelector('.gallery-dialog')
    elDialog.close()
  }