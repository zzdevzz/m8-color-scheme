fetch("https://www.thecolorapi.com/id?hex=b36b6b&format=json&mode=monochrome-light&count=6")
    .then(res => res.json())
    .then(data.map(item) => console.log(item)
    })
