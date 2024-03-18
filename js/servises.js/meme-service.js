'use strict'

let gNextY = 70
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Write down your text here',
            x: 200,
            y: 50,
            strokeColor: 'black',
            fillColor: 'orange',
            fontSize: 35,
            fontFamily: 'Arial',
            isSelected: true,
        },
        {
            txt: 'Write down your text here',
            x: 200,
            y: 60,
            strokeColor: 'black',
            fillColor: 'orange',
            fontSize: 35,
            fontFamily: 'Arial',
            isSelected: false,
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function setLineTxt(val) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = val
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

// function changeStrokeColor(val) {
//     const lineIdx = gMeme.selectedLineIdx
//     gMeme.lines[lineIdx].storkeColor = val
//     _saveSelectedImg()
// }

// function changeFillColor(val) {
//     const lineIdx = gMeme.selectedLineIdx
//     gMeme.lines[lineIdx].fillColor = val
//     _saveSelectedImg()
// }

function changeColor(val, name) {
    const lineIdx = gMeme.selectedLineIdx;
    if (name === "stroke-color") {
        gMeme.lines[lineIdx].strokeColor = val;
    } else if (name === "fill-color") {
        gMeme.lines[lineIdx].fillColor = val;
    }
    _saveSelectedImg();
}

function changeTxtSize(val) {
    const lineIdx = gMeme.selectedLineIdx
    if (val === 'increase') gMeme.lines[lineIdx].fontSize += 2
    else (gMeme.lines[lineIdx].fontSize -= 2)
    _saveSelectedImg()
}


function addLine() {
    debugger
    gMeme.selectedLineIdx = gMeme.lines.length
    gMeme.lines.push({
        txt: 'Write down your text here',
        x: 200,
        y: gNextY,
        strokeColor: 'black', // Corrected typo in property name
        fillColor: 'orange',
        fontSize: 35,
        fontFamily: 'Arial',
        isSelected: true
    })

    gNextY += 10 // Increase y coordinate for the next line
    _saveSelectedImg()
}

function switchLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx = 0

    gMeme.lines[gMeme.selectedLineIdx].isSelected = 'true'
    _saveSelectedImg()
}

function cleanSelected() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        gMeme.lines[i].isSelected = false
    }
    _saveSelectedImg()
}