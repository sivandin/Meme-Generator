'use strict'
var gImgs
var gImg
var gTxtLines
let nextId = 1
createImgs()

function createImgs() {
    gImgs = loadFromStorage('imgsDB')
    if (!gImgs || gImgs.length === 0) {
        gImgs = [
            _createImg(nextId++, ['funny', 'celebrity']),
            _createImg(nextId++, ['cute', 'pet']),
            _createImg(nextId++, ['funny', 'baby', 'pet']),
            _createImg(nextId++, ['cute', 'pet']),
            _createImg(nextId++, ['funny', 'baby']),
            _createImg(nextId++, ['happy', 'celebrity']),
            _createImg(nextId++, ['funny', 'baby', 'pet']),
            _createImg(nextId++, ['happy', 'celebrity']),
            _createImg(nextId++, ['cute', 'funny']),
            _createImg(nextId++, ['happy', 'celebrity']),
            _createImg(nextId++, ['funny', 'celebrity']),
            _createImg(nextId++, ['celebrity']),
            _createImg(nextId++, ['crazy', 'celebrity']),
            _createImg(nextId++, ['celebrity']),
            _createImg(nextId++, ['celebrity']),
            _createImg(nextId++, ['celbrity', 'happy']),
            _createImg(nextId++, ['crazy', 'celebrity']),
            _createImg(nextId++, ['cartoon', 'funny']),
        ]
        _saveImgs()
    }
}

gTxtLines = [
    "I'm not lazy, I'm on energy-saving mode.",
    "I'm not clumsy, I'm gravity-challenged.",
    "I'm not arguing, I'm just explaining why I'm right.",
    "I'm not a complete idiot, some parts are missing.",
    "I'm not bossy, I just know what you should be doing.",
    "I'm not a morning person, I'm a coffee person.",
    "I'm not always late, but when I am, I'm fashionably late.",
    "I'm not old, I'm vintage.",
    "I'm not fat, I'm just easy to see.",
    "I'm not forgetful, I'm just focusing on more important things.",
    "I'm not a control freak, but can I show you the right way to do that?",
    "I'm not clumsy, I'm just in sync with gravity's mood swings.",
    "I'm not short, I'm fun-sized.",
    "I'm not a pessimist, I'm just a realist in denial.",
    "I'm not antisocial, I'm selectively social.",
    "I'm not late, the clock is just early."
]

function _createImg(id, keywords) {
    return {
        id,
        url: `img/${id}.jpg`,
        keywords: keywords || ['cute', 'baby']
    }
}

function getImgs(gFilterBy) {
    return gImgs
}

function _saveImgs() {
    saveToStorage('imgsDB', gImgs)
}

function chooseRandomId() {
    var randomId = getRandomIntInclusive(1, 18)
    gMeme.selectedImgId = randomId
}

function chooseRandomLine() {
    var randomLine = getRandomIntInclusive(1, 16)
    gMeme.lines.forEach(line => line.txt = '')
    gMeme.lines[0].txt = gTxtLines[randomLine]
    gMeme.lines[0].fontSize = '24'
}

