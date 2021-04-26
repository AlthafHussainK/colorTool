
const hexInput = document.getElementById("hexInput")
const inputColor = document.getElementById("inputColor")

hexInput.addEventListener('keyup', () => {
  const hex = hexInput.value 

  if (!isValidHex(hex)) return;

  const strippedHex = hex.replace('#', '')

  inputColor.style.background = '#' + strippedHex

})

const isValidHex = (hex) => {
  if (!hex) return false

  const strippedHex = hex.replace('#', '')
  return strippedHex.length === 3 || strippedHex.length === 6
 }
 //challenge: check for invalid chars in hex

// convert hex to rgb
function hexToRgb(hex) {
  if (!isValidHex(hex)) return null

  // converting to 6 value hex code ie. #abc -> #aabbcc
  if (hex.length === 3){
    hex = hex.split('').map(a => a.repeat(2)).join('')
  }

  const r = parseInt(hex.slice(0,2), 16)
  const g = parseInt(hex.slice(2,4), 16)
  const b = parseInt(hex.slice(4,6), 16)

  return {r,g,b}
}


const rgbval = hexToRgb(hexInput.value)
console.log(rgbval)

function rgbToHex(rgb) {
  let backHex = rgb.r.toString(16) + rgb.g.toString(16) + rgb.b.toString(16)

  if(backHex.length === 3){
    backHex = backHex.split('').map(a => a.repeat(2)).join('')
  }

  console.log("#"+backHex)
}

function rgbToHex1(r,g,b) {
  const redHex = ("0"+ r.toString(16)).slice(-2)
  const greenHex = ("0"+ g.toString(16)).slice(-2)
  const blueHex = ("0"+ b.toString(16)).slice(-2)
  
  let backHex = "#" + redHex + greenHex + blueHex
  
  return backHex
}

console.log(rgbToHex1(0,15,173))

rgbToHex(rgbval)
