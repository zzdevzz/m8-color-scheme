let colorInput = document.getElementById("colorInput")
const colorButton = document.getElementById("colorSubmit")
const colorChoices = ["monochrome", "monochrome-dark" , "monochrome-light", "analogic-complement", "triad","quad"]
const colorScheme = document.getElementById("colorScheme")
const colorNumberOf = document.getElementById("colorNumberOf")
const colorForm = document.getElementById("colorForm")
const colorMenu = document.getElementById("colorMenu")

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
    const colorCount = ''
    // console.log(colorVal)
    // console.log(colorSchemeVal)
    getColors(colorVal, colorSchemeVal,6)
        .then(data => console.log(data))
        .then(data => data.forEach(item => {console.log(item)}))
})




function getColors(color, colorScheme, colorCount){
    return fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${colorScheme}&count=${colorCount}`)
        .then(res => {
            
            if (!res.ok){
                throw new Error(`HTTP error! Status: ${res.status}`)
            }
            else {
                let fetchColors= [] 
                res.json()
                .then(data => data.colors)
                .then(colors => colors.forEach((color) => {
                    let finalColor = {}
                    finalColor.name = color.name.value
                    finalColor.hex = color.hex.value
                    fetchColors.push(finalColor)
                }))
                return fetchColors
            }
        })
        .catch(error => console.error("Fetch error:", error));
}

// function setColors(colorsList){
//     colorsList.forEach((color) => {
//         console.log(color)
//         colorMenu.innerHTML += colorMenu.innerHTML + 
//         `<div id="${color.hex}">
//         <h2> ${color.name} </h2>
//         </div>`
//     })
// }
