'use strict'

function saveToStorage(key, value) {
    const valStr = JSON.stringify(value)
    localStorage.setItem(key, valStr)
}

function loadFromStorage(key) {
    const valStr = localStorage.getItem(key)
    return JSON.parse(valStr)
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }