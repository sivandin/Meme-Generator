'use strict'


function onInitGallery() {
    createImgs()
    renderGallery()
    document.body.addEventListener('click', closeMenuOnClickOutside)
}

function renderGallery() {
    const elImgContainer = document.querySelector('.select-img-container')
    const imgs = getImgs(gFilterBy)
    const strHtmls = imgs.map(img =>
        `<img src="${img.url}" alt="" onclick="onSelectImg(this)">`
    )
    elImgContainer.innerHTML = strHtmls.join('')
}

function onSelectImg(elImg) {
    const imgUrl = elImg.src
    const imgId = parseInt(imgUrl.split('/').pop().split('.')[0])

    setImg(imgId)
    window.location.href = 'index.html'
}

function openGallery() {
    const elDialog = document.querySelector('.gallery-dialog')
    elDialog.showModal()
    elDialog.classList.add('open')

    renderGallery()
  }


  
  function closeGallery() {
    const elDialog = document.querySelector('.gallery-dialog')
    elDialog.classList.remove('open');
    elDialog.close()
  }

  function onImgsFilter() {
    const input = document.querySelector('.gallery-dialog input')
    gFilterBy= input.value
    
    renderGallery()
  }

  function onClearFilter() {
    gFilterBy=''
    renderGallery()
  }

  

  

  