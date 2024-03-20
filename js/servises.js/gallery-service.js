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
    "Not a morning person, a coffee person.",
    "I'm not late, I'm fashionable",
    "I'm not old, I'm vintage.",
    "I'm not short, I'm fun-sized.",
    "I speak fluent sarcasm.",
    "Wine o'clock is my favorite.",
    "My bed is my happy place.",
    "My life is a mess!",
    "Not today, adulting!",
    "I'm not weird, I'm limited edition.",
    "My hobbies include overthinking.",
    "Introverted but willing to discuss dogs.",
    "I'm silently correcting your grammar.",
    "Exercise? I thought you said extra fries!",
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


