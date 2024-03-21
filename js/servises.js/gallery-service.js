'use strict'

let nextId = 1

function createImgs() {
    gImgs = loadFromStorage('imgsDB')
    if (!gImgs || gImgs.length === 0) {
        gImgs = [
            _createImg(nextId++, 'img/1.jpg', ['funny', 'celebrity']),
            _createImg(nextId++, 'img/2.jpg', ['cute', 'pet']),
            _createImg(nextId++, 'img/3.jpg', ['funny', 'baby', 'pet']),
            _createImg(nextId++, 'img/4.jpg', ['cute', 'pet']),
            _createImg(nextId++, 'img/5.jpg', ['funny', 'baby']),
            _createImg(nextId++, 'img/6.jpg', ['happy', 'celebrity']),
            _createImg(nextId++, 'img/7.jpg', ['funny', 'baby', 'pet']),
            _createImg(nextId++, 'img/8.jpg', ['happy', 'celebrity']),
            _createImg(nextId++, 'img/9.jpg', ['cute', 'funny']),
            _createImg(nextId++, 'img/10.jpg', ['happy', 'celebrity']),
            _createImg(nextId++, 'img/11.jpg', ['funny', 'celebrity']),
            _createImg(nextId++, 'img/12.jpg', ['celebrity']),
            _createImg(nextId++, 'img/13.jpg', ['crazy', 'celebrity']),
            _createImg(nextId++, 'img/14.jpg', ['celebrity']),
            _createImg(nextId++, 'img/15.jpg', ['celebrity']),
            _createImg(nextId++, 'img/16.jpg', ['celbrity', 'happy']),
            _createImg(nextId++, 'img/17.jpg', ['crazy', 'celebrity']),
            _createImg(nextId++, 'img/18.jpg', ['cartoon', 'funny']),
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

function _createImg(id, url = `img/${id}.jpg`, keywords) {
    return {
        id,
        url,
        keywords: keywords || ['cute', 'baby']
    }
}

function addImgToList(id, url, keyword) {

    var id = gImgs.length + 1
    const img = _createImg(id, url, keyword)
    gImgs.push(img)
    _saveImgs()
}

function getImgs(filterBy) {
    if (!filterBy) return gImgs

    const filter = filterBy.toLowerCase()
    const filteredImgs = gImgs.filter(img => img.keywords.some(keyword => keyword.toLowerCase().includes(filter)))

    return filteredImgs
}



function _saveImgs() {
    saveToStorage('imgsDB', gImgs)
}


