'use strict'

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') 

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
    
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}


function onImgInput(ev) {
    loadImageFromInput(ev)
}

function loadImageFromInput(ev) {
    const reader = new FileReader();

    reader.onload = ev => {
        const img = new Image();
        img.src = ev.target.result;

        // Add the image to the imgsDb
        addImgToList(gImgs.length + 1, img.src, ['my images']);
        // Set the selected image ID in the gMeme object
        gMeme.selectedImgId = gImgs.length;

        // Render the meme with the uploaded image
        img.onload = () => renderMeme(gMeme, gCtx, img);
    };

    reader.readAsDataURL(ev.target.files[0]);
}

function renderImg(img) {
    // Adjust the canvas to the new image size

    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}