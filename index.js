/* DOM data */

const pokemonContainer = document.querySelector(".pkm-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const spinner = document.querySelector("#spinner");

let offset = 1;
let limit = 11;

/* Pokemon API Functions */


async function getPkm(id) {
    /*
    con fetch sin async/await
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => showPkmHTML(data))
    */

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json();
        showPkmHTML(data);
        spinner.style.display = "none";

    } catch (error) {
        console.log(err);
    }
}

async function showAllPkm(offset, limit) {
    spinner.style.display = "flex";
    for (let i = offset; i <= offset + limit; i++) {
        await getPkm(i);

    }
}


function showPkmHTML(pokemon) {

    const divPkmCard = document.createRange().createContextualFragment(`
        <div class="pkm-card" id="${pokemon.id}">
            <button class="shiny-btn" onclick="showShiny('${pokemon.name}','${pokemon.id}')"><i class="fa-solid fa-star" id="shiny-star-${pokemon.name}"></i></button>
            <div class="img-container">
                <img id="${pokemon.name}-picture" src=https://img.pokemondb.net/sprites/home/normal/1x/${pokemon.name}.png>
            </div>
            <p>#${pokemon.id.toString().padStart(3, 0)}</p>
            <h1>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <p class="pkm-type ${pokemon.types[0].type.name}">${pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)}</p>
        </div>
        `);

    const main = document.querySelector("main");
    main.append(divPkmCard);

    if (pokemon.types.length == 2) {
        let id = pokemon.id;
        const pkmCard = document.getElementById(id);
        const secondType = document.createElement('p');
        secondType.classList.add('pkm-type', pokemon.types[1].type.name)
        secondType.textContent = `${pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1)}`
        pkmCard.append(secondType)
    }
}


showAllPkm(offset, limit);


function showShiny(name, id) {
    if (document.getElementById(name + "-picture").src == `https://img.pokemondb.net/sprites/home/normal/1x/${name}.png`) {
        document.getElementById(name + "-picture").src = `https://img.pokemondb.net/sprites/home/shiny/1x/${name}.png`;
        document.getElementById('shiny-star-' + name).style.color = "black";
        document.getElementById(id).classList.add('shiny-card')
    } else {
        document.getElementById(name + "-picture").src = `https://img.pokemondb.net/sprites/home/normal/1x/${name}.png`;
        document.getElementById('shiny-star-' + name).style.color = "gold";
        document.getElementById(id).classList.remove('shiny-card')
    }
}


/* Pagination Functions */


previous.addEventListener("click", () => {
    if (offset != 1) {
        offset -= 12;
        removeChildNodes(pokemonContainer);
        showAllPkm(offset, limit);

    }
});

next.addEventListener("click", () => {
    offset += 12;
    removeChildNodes(pokemonContainer);
    showAllPkm(offset, limit);


});

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}