let colorInput = document.getElementById("colorInput")
const colorButton = document.getElementById("colorSubmit")
const colorChoices = ["monochrome", "monochrome-dark" , "monochrome-light", "analogic-complement", "triad","quad"]
const colorScheme = document.getElementById("colorScheme")
const colorNumberOf = document.getElementById("colorNumberOf")
const colorForm = document.getElementById("colorForm")
const colorMenu = document.getElementById("colorMenu")
const alertMsg = document.getElementById("customAlert")

getColors('FFD700', 'monochrome', 5)
    .then(data => setColors(data))

// Set colorScheme Options in HTML
for (let color of colorChoices){
    colorScheme.innerHTML += `<option value="${color}">${color}</option>`
}
// Form input Values
colorForm.addEventListener("submit", function(e){
    e.preventDefault()
    const colorFormData = new FormData(colorForm)
    const colorVal = colorFormData.get(`color`).replace('#', '')
    const colorSchemeVal = colorFormData.get(`colorScheme`)
    const colorsAmount = colorFormData.get('colorNumberOf')
    const colorCount = ''
    getColors(colorVal, colorSchemeVal,colorsAmount)
        .then(data => setColors(data))
})

// Add color to clipboard.
colorMenu.addEventListener("click", function(e){
    let textToCopy = ``
    if (e.target.localName === "h2"){
        textToCopy = e.target.parentElement.id
    } else {
        textToCopy = e.target.id
    }
    navigator.clipboard.writeText(textToCopy)
    selectedElement = document.getElementById(e.target.id)
    showAlert(selectedElement)
    // alert("Color Copied: "  + textToCopy)
})


function getColors(color, colorScheme, colorCount){
    let fetchColors = []
    return fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${colorScheme}&count=${colorCount}`)
        .then(res => {
            if (!res.ok){
                throw new Error(`HTTP error! Status: ${res.status}`)
            }
            else {
                return res.json()
            }
        })
        .then(data => data.colors)
        .then(colors => {colors.forEach(color => {
                let finalColor = {}
                finalColor.name = color.name.value
                finalColor.hex = color.hex.value
                fetchColors.push(finalColor)
            })
            return fetchColors
        })
        .catch(error => console.error("Fetch error:", error));
}

function setColors(colorsList){
    colorMenu.innerHTML = ''
    colorsList.forEach(color => {
        colorMenu.innerHTML += 
        `<div id="${color.hex}">
            <h2> ${color.name} </h2>
        </div>`
        document.getElementById(`${color.hex}`).style.backgroundColor = `${color.hex}`
    })
}

function showAlert(el){
    let bb = el.getBoundingClientRect()
    console.log(bb)
    let top = bb.top + window.scrollY
    let left = bb.left
    // console.log(typeof(bb.top))
    // console.log(typeof(window.scrollY))
    // console.log(bb.top)
    // console.log(window.scrollY)
    alertMsg.classList.toggle("selected")
    alertMsg.style.display = "block"
    alertMsg.style.top = `${top + (bb.height / 2)}`
    alertMsg.style.left = `${left}`
    // alertMsg.style.width = `${bb.width}`

    setTimeout(() => {
        alertMsg.style.display = "none"
    }, 2000)

}