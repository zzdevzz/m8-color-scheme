// lets og

let colorInput = document.getElementById("colorInput")
const colorButton = document.getElementById("colorSubmit")
const colorChoices = ["monochrome", "monochrome-dark" , "monochrome-light", "analogic complement", "analogic-complement", "triad","quad"]
const colorScheme = document.getElementById("colorScheme")
const colorForm = document.getElementById("colorForm")

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
    console.log(colorVal)
    console.log(colorSchemeVal)
    getColors(colorVal, colorSchemeVal, 6)
        .then(data=>colors = data)
        .then(()=>console.log(colors))
})




function getColors(color, colorScheme, colorCount){
    return fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${colorScheme}&count=${colorCount}`)
        .then(res => {
            
            if (!res.ok){
                throw new Error(`HTTP error! Status: ${res.status}`)
            }
            else return res.json()
        })
        .catch(error => console.error("Fetch error:", error));
}
