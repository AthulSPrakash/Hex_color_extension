const lighten = document.querySelector('.mode1')
const darken = document.querySelector('.mode2')
const slideValue = document.querySelector("#span")
const inputSlide = document.querySelector("#input-slider")
const color = document.querySelector('#color')
const input = document.querySelector('#input-color')
const output = document.querySelector('#output-color')
const outputColorValue = document.querySelector('#output')
const validity = document.querySelector('#validity')
const toggleBtn = document.querySelector('#toggle')
let text = false
let toggle = ''

//toggle light/dark
toggleBtn.addEventListener('click', () => {
    document.querySelector('.switch').classList.toggle('toggle-on')
    if(toggle==='-'){
        toggle = ''
    }else{
        toggle = '-'
    }
    toggleText()
    displayColor()
})
const toggleText = () => {
    if(text===true){
        lighten.classList.toggle('toggle-text')
        text = false
    }
    darken.classList.toggle('toggle-text')
    text = true
}
toggleText()

color.addEventListener('keyup',() => {
    validityCheck()
    displayColor()
})

//checking input hex characters validity
function validityCheck() {
    
    let regex = color.value
    regex = regex.replace(/^\s*#|\s*$/g,'')
    const arr = /[-+_?,.'"/:>|)(*^%$@!~`{}=<]+|[g-z]+/ig

    if(arr.test(regex)===true){
        validity.textContent = 'Invalide Hex character'
    }
    else if(regex.length>6){
        validity.textContent = 'Too long'
    }
    else if(regex.length<3){
        validity.textContent = 'Too short'
    }
    else if(regex.length<6 && regex.length>3){
        validity.textContent = 'must be 3/6 characters long'
    }
    else{
        validity.textContent = ''
    }
}


function displayColor() {
    const {r, g, b} = hexToRgb(color.value)
    input.style.backgroundColor = `rgb(${r},${g},${b})`
    const newColor = alterColor(color.value, toggle+inputSlide.value)
    output.style.background = newColor
    outputColorValue.textContent = newColor
}

//creating hex to rgb
function hexToRgb(hex) {

    let hexCode = isHex(hex)

    //converting hex 3 to 6          E0F => EE00FF
    if(hexCode.length===3){
        hexCode.replace(/(.)/ig, '$1$1')
    }
    hexCode = hexCode.toString()
    const r = parseInt(hexCode.substr(0,2), 16)
    const g = parseInt(hexCode.substr(2,2), 16)
    const b = parseInt(hexCode.substr(4,5), 16) 
    const input = {r, g, b}

    return input
}

//hex check
function isHex(hex) {
    if(!hex) return false
    // strip the leading # and empty space if it's there
    const hexCode = hex.replace(/^\s*#|\s*$/g,'')
    return hexCode
}

//convert rgb to hex
function rgbToHex(r,g,b) {

    const firstPair = ('0' + r.toString(16)).slice(-2)
    const secondPair = ('0' + g.toString(16)).slice(-2)
    const thirdPair = ('0' + b.toString(16)).slice(-2)
    hexCode = '#' + firstPair + secondPair + thirdPair

    return hexCode
}

//alter color
function alterColor(hex, percent) {

    const {r, g, b} = hexToRgb(hex)
    const amount = Math.floor((percent/100)*255)
    const newR = Math.min(255, Math.max(0, r + amount))
    const newG = Math.min(255, Math.max(0, g + amount))
    const newB = Math.min(255, Math.max(0, b + amount))

    return rgbToHex(newR, newG, newB)
}

//-----------slider-------------------------------------
inputSlide.oninput = (() =>{
    let value = inputSlide.value
    slideValue.textContent = value
    slideValue.style.left = value + "%" 
    slideValue.classList.add("show")
    inputSlide.style.background = `linear-gradient(to right, rgb(51, 43, 75) 0%, rgb(51, 43, 75) ${inputSlide.value}%, grey ${inputSlide.value}%, grey 100%)`
    //altering color
    const newColor = alterColor(color.value, toggle+inputSlide.value)
    outputColorValue.textContent = newColor
    output.style.background = newColor
});

inputSlide.onblur = (() => {
    slideValue.classList.remove("show")
});
//------------------------------------------------------