document.addEventListener("DOMContentLoaded", function(){
    fetchDog();
    document.querySelector("#good-dog-filter").addEventListener("click", e => filterDog(e.target));
})

function fetchDog() {
    fetch("http://localhost:3000/pups")
    .then (resp => resp.json())
    .then (data => data.forEach(dog => renderDogBar(dog)))
}

function renderDogBar(dog) {
    //const dogData = dog
    const p = document.createElement("p")
    p.innerHTML = `<span>${dog.name}</span>`
    p.addEventListener("click", e => renderDog(dog))
    document.querySelector("#dog-bar").append(p)
}

function renderDog(dog) {
    //console.log(dog)
    const div = document.querySelector("#dog-info")
    div.innerHTML = `
        <img src="${dog.image}" />
        <h2>${dog.name}</h2>
        <button>${goodOrBad(dog.isGoodDog)}</button>`  
    div.querySelector("button").addEventListener("click", e => toggleButton(e.target, dog))
}  

function goodOrBad(isGoodDog) {
    return (isGoodDog ? "Good Dog" : "Bad Dog")
}

function toggleButton(button, dog) {
    if (button.textContent === "Good Dog") {
        button.textContent = "Bad Dog"
        dog.isGoodDog = false
        patchDog(dog)
    }
    else {
        button.textContent = "Good Dog"
        dog.isGoodDog = true
        patchDog(dog)}
}

function patchDog(dog) {
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dog)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

function filterDog(button){
    if (button.textContent === "Filter good dogs: OFF") {
        button.textContent = "Filter good dogs: ON"
        document.querySelector("#dog-bar").textContent = ""
        fetchFilter()
    }
    else{
        button.textContent = "Filter good dogs: OFF";
        document.querySelector("#dog-bar").textContent = ""
        fetchDog()
    }
}

function fetchFilter() {
    fetch("http://localhost:3000/pups")
    .then (resp => resp.json())
    .then (data => data.filter((dog)=> dog.isGoodDog === true))
    .then (goodDogs => goodDogs.forEach(dog => renderDogBar(dog)))
}
