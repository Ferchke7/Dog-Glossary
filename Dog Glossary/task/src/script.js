document.querySelector('#button-random-dog').addEventListener('click', randomClick)
document.querySelector('#button-show-breed').addEventListener('click', breedClick)
document.querySelector('#button-show-sub-breed').addEventListener('click',subBreedList)
document.querySelector('#button-show-all').addEventListener('click',showAllBreeds)
async function randomClick() {
    let response = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await response.json()
    document.querySelector('#content').innerHTML = `<img alt="image" id="imageOfDog" src="${data.message}">`
}
async function breedClick() {
    try {
        let response = await fetch(`https://dog.ceo/api/breed/${document.
        querySelector('#input-breed').value}/images/random`.toLowerCase())

        if (response.ok) {
            const data = await response.json()
            document.querySelector('#content').innerHTML = `<img alt="dog image" src="${data.message}">`
        } else {
            document.querySelector('#content').innerHTML = `<p>Breed not found!</p>`
        }

    } catch (e) {
        console.log(e.error)
    }
}
async function subBreedList() {
    const breedListContainer = document.getElementById('content')
    try {
        let response = await fetch(` https://dog.ceo/api/breeds/list/all`);
        const data = await response.json()
        const breeds = data.message
        const specificBreed = breeds[`${document.querySelector('#input-breed').value}`.toLowerCase()]
        if (specificBreed.length > 1) {
            let list ='';
            for (const breed of specificBreed) {
                list += `<li>${breed}</li>`;
            }
            breedListContainer.innerHTML = `<ol type="1">${list}</ol>`
        }
        else {
            breedListContainer.innerHTML = `<p>No sub-breeds found!</p>`
        }
    }
    catch (e) {
        breedListContainer.innerHTML = `<p>Breed not found!</p>`
    }

}


async function showAllBreeds() {
    const listAllDogsBreed = "https://dog.ceo/api/breeds/list/all";
    const content = document.getElementById('content');
    content.innerHTML = "";
    const resp = await fetch(listAllDogsBreed);
    const data = await resp.json();

    const breedsList = document.createElement("ol");

    for (const breed in data.message) {
        const breedItem = document.createElement("li");
        breedItem.textContent = breed;

        const subBreeds = data.message[breed];
        if (subBreeds.length > 0) {
            const subBreedsList = document.createElement("ul");
            subBreeds.forEach((subBreed) => {
                const subBreedItem = document.createElement("li");
                subBreedItem.textContent = subBreed;
                subBreedsList.appendChild(subBreedItem);
            });
            breedItem.appendChild(subBreedsList);
        }

        breedsList.appendChild(breedItem);
    }
    content.appendChild(breedsList);
}
