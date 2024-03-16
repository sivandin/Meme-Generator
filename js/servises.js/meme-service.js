'use strict'

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Write down your text here',
            x: 200,
            y: 50,
            storkeColor: 'black',
            fillColor: 'orange',
            fontSize: 35,
            fontFamily: 'Arial',
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function setLineTxt(val) {
    gMeme.lines[0].txt = val
    _saveSelectedImg()
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    _saveSelectedImg()
}

function _saveSelectedImg() {
    const meme = getMeme()
    console.log(gMeme)
    saveToStorage('selectedMeme', meme)
}

function changeStrokeColor(val){
    gMeme.lines[0].storkeColor=val
    _saveSelectedImg()
}

function changeFillColor(val){
    gMeme.lines[0].fillColor=val
    _saveSelectedImg()
}





