'use strict'
var gImgs
let nextId = 1
_createImgs()

function _createImgs() {
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