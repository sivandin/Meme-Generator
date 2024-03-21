'use strict'

let gNextY = 70
var gTxtLines

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
            align: 'center',
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
            align: 'center',
            isSelected: false,
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 7, 'pet': 4, 'baby': 3, 'celebrity': 11, 'cute':3, 'happy':4,
'crazy':2, 'cartoon':1 }

function getMeme() {
    return gMeme
}

function setLineTxt(val) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = val
    _saveSelectedMeme()
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    _saveSelectedMeme()
}

function _saveSelectedMeme() {
    const meme = getMeme()
    console.log(gMeme)
    saveToStorage('selectedMeme', meme)
}

function changeColor(val, name) {
    const lineIdx = gMeme.selectedLineIdx
    if (name === "stroke-color") {
        gMeme.lines[lineIdx].strokeColor = val
    } else if (name === "fill-color") {
        gMeme.lines[lineIdx].fillColor = val
    }
    _saveSelectedMeme()
}

function changeTxtSize(val) {
    const lineIdx = gMeme.selectedLineIdx
    if (val === 'increase') gMeme.lines[lineIdx].fontSize += 2
    else (gMeme.lines[lineIdx].fontSize -= 2)
    _saveSelectedMeme()
}

function addLine(type = 'line', txt='Write down your text here', fontSize = 35, x=200, y=gNextY) {
    gMeme.selectedLineIdx = gMeme.lines.length
    gMeme.lines.push({
        txt,
        x,
        y,
        strokeColor: 'black', 
        fillColor: 'orange',
        fontSize,
        fontFamily: 'Arial',
        align: 'center',
        isSelected: true
    })
    if (type === 'line') gNextY += 10 // Increase y coordinate for the next line
    _saveSelectedMeme()
}

function switchLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx = 0

    gMeme.lines[gMeme.selectedLineIdx].isSelected = 'true'
    _saveSelectedMeme()
}

function delteLine() {
    const idx = gMeme.selectedLineIdx
    gMeme.lines.splice(idx, 1)
    console.log(gMeme)
    _saveSelectedMeme()
}

function alignTxt(direction) {
    const currLineIdx = gMeme.selectedLineIdx
    if (direction === 'right') gMeme.lines[currLineIdx].align = 'right'
    else if (direction === 'left') gMeme.lines[currLineIdx].align = 'left'
    else gMeme.lines[currLineIdx].align = 'center'
    _saveSelectedMeme()
}

function cleanSelected() {
    gMeme.lines.forEach(line => line.isSelected = false)
    _saveSelectedMeme()
}

function fontFamChange(font) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].fontFamily = font
    _saveSelectedMeme()
}

function fontSizeSelect(size) {
    const idx = gMeme.selectedLineIdx
    const oldFontSize = gMeme.lines[idx].fontSize
    const newSize = parseInt(size) 
    const diff = newSize - oldFontSize 

    gMeme.lines[idx].fontSize = newSize
    _saveSelectedMeme()

    return diff 
}

function chooseRandomImgId() {
    var randomId = getRandomIntInclusive(1, 18)
    gMeme.selectedImgId = randomId
}

function chooseRandomLine() {
    var randomLineIdx = getRandomIntInclusive(1, 16)
    return gTxtLines[randomLineIdx]
}

function deleteLines() {
    gMeme.lines=[]
}

