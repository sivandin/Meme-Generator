'use strict'

var gImgs = [{id: 3, url: 'img/3.jpg', keywords: ['cute', 'baby']}]
var gMeme = {
 selectedImgId: 2,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'Write down your text here',
 size: 20,
 color: 'red'
 }
 ]
}
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

function getMeme() {
    return gMeme
}

function setLineTxt(val) {
gMeme.lines[0].txt = val
}
