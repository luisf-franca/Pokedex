document.getElementById("pokemonForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const pokemonName = document.getElementById("pokemonName").value;

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      const pokemonInfo = document.getElementById("pokemonInfo");
      pokemonInfo.style.display = "block"; // Exibe o conteúdo

      // Exibe informações gerais
      const generalInfo = `
    <p class="info-label">Nome:</p>
    <p class="info-value">${data.name}</p>
    <p class="info-label">ID:</p>
    <p class="info-value">${data.id}</p>
    <p class="info-label">Tipos:</p>
    <p class="info-value">${data.types.map((type) => type.type.name).join(", ")}</p>
    <p class="info-label">Peso:</p>
    <p class="info-value">${data.weight / 10} kg</p> 
    <p class="info-label">Altura:</p>
    <p class="info-value">${data.height / 10} m</p>
`;


      const movesInfo = `
    <p class="info-label">Movimentos:</p>
    <ul class="moves-list">
        ${data.moves.slice(0, 5).map((move) => `<li class="move-item">${move.move.name}</li>`).join("")}
    </ul>
`;


      const hp = data.stats.find((stat) => stat.stat.name === "hp").base_stat;


      const hpInfo = `
    <p class="info-label">HP:</p>
    <p class="info-value">${hp}</p>
`;

      const pokemonImage = document.createElement("img");
      pokemonImage.src = data.sprites.front_default;
      pokemonImage.alt = `Imagem de ${data.name}`;

      pokemonInfo.innerHTML = generalInfo + movesInfo + hpInfo;
      pokemonInfo.appendChild(pokemonImage);

    })
    .catch(() => {
      const pokemonInfo = document.getElementById("pokemonInfo");
      pokemonInfo.style.display = "block";
      pokemonInfo.innerHTML = '<p class="error">Não foi possível encontrar informações sobre o Pokémon.</p>';
    });
});

document.getElementById("pokemonForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const pokemonName = document.getElementById("pokemonName").value;


  document.getElementById("statusMessage").textContent = "";
  document.getElementById("statusMessage").classList.add("hidden");

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
    })
    .catch(() => {

      const pokemonInfo = document.getElementById("pokemonInfo");
      const statusMessage = document.getElementById("statusMessage");
      statusMessage.textContent = "Não foi possível encontrar informações sobre o Pokémon.";
      statusMessage.classList.remove("hidden");
      pokemonInfo.style.display = "none";
    });
});

document.getElementById("clearButton").addEventListener("click", function() {
  document.getElementById("pokemonName").value = "";
  document.getElementById("pokemonInfo").style.display = "none";
  document.getElementById("statusMessage").classList.add("hidden");
});

document.getElementById("helpLink").addEventListener("click", function(e) {
  e.preventDefault();
  showHelpModal();
});

function showHelpModal() {
  const helpModal = document.getElementById("helpModal");
  helpModal.style.display = "block";
}

function closeHelpModal() {
  const helpModal = document.getElementById("helpModal");
  helpModal.style.display = "none";
}    
