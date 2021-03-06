
const hexInput = document.getElementById("hexInput")
const inputColor = document.getElementById("inputColor")
const sliderText = document.getElementById("sliderText")
const slider = document.getElementById("slider")
const alteredColor = document.getElementById("alteredColor")
const alteredColorText = document.getElementById("alteredColorText")
const lightenText = document.getElementById("lightenText")
const darkenText = document.getElementById("darkenText")
const toggleBtn = document.getElementById('toggleBtn')
const invalidHex = document.getElementById("invalidHex")

invalidHex.style.display = 'none'

toggleBtn.addEventListener('click', () => {
  if (toggleBtn.classList.contains('toggled')){
    toggleBtn.classList.remove('toggled')
    lightenText.classList.remove('unselected')
    darkenText.classList.add('unselected')
  } else {
    toggleBtn.classList.add('toggled')
    lightenText.classList.add('unselected')
    darkenText.classList.remove('unselected')
  }
  reset()
})

hexInput.addEventListener('keyup', () => {
  const hex = hexInput.value 
  if (!isValidHex(hex)) {
    invalidHex.style.display = 'inline' 
    return;
  }

  const strippedHex = hex.replace('#', '')

  inputColor.style.backgroundColor = '#' + strippedHex
  invalidHex.style.display = 'none'
  reset()
})

const isValidHex = (hex) => {
  if (!hex) return false

  const strippedHex = hex.replace('#', '')

  //hexdecimal validation
  const regExp = /^[0-9a-fA-F]+$/
  if (!regExp.test(strippedHex)) return false

  return strippedHex.length === 3 || strippedHex.length === 6
 }

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

function rgbToHex(r,g,b) {
  const redHex = ("0"+ r.toString(16)).slice(-2)
  const greenHex = ("0"+ g.toString(16)).slice(-2)
  const blueHex = ("0"+ b.toString(16)).slice(-2)
  
  let hex = "#" + redHex + greenHex + blueHex

  return hex
}

// console.log(rgbToHex(428,15,173))

function alterColor(hex, percent) {
  const {r,g,b} = hexToRgb(hex)
  const addValue = Math.floor((percent/100)*255)

  const newRed =  increaseWithin0To255(r, addValue)
  const newGreen = increaseWithin0To255(g, addValue)
  const newBlue = increaseWithin0To255(b, addValue)

  return rgbToHex(newRed, newGreen, newBlue)
}

const increaseWithin0To255 = (hex, addValue) => {
   const newHex = hex + addValue
   if (newHex > 255) return 255
   if (newHex < 0) return 0
   return newHex
}

slider.addEventListener('input', () => {
  if (!isValidHex(hexInput.value)) return

  sliderText.textContent = `${slider.value}%`
  const strippedHex = hexInput.value.replace('#', '')
  
  let updatedHex
  if (toggleBtn.classList.contains('toggled')){
    updatedHex = alterColor(strippedHex, -slider.value)
  } else {
    updatedHex = alterColor(strippedHex, slider.value)
  }
  
  alteredColor.style.backgroundColor = updatedHex
  alteredColorText.innerText = `Altered Color ${updatedHex}`
})

const reset = () => {
  slider.value = 0
  sliderText.innerText = '0%'
  invalidHex.style.display = 'none'
  const strippedHex = hexInput.value.replace('#', '')
  alteredColor.style.backgroundColor = `#${strippedHex}`
  alteredColorText.innerText = `Altered Color ${strippedHex}`
}