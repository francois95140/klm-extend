
const statusSelec = document.getElementById("status") as HTMLSelectElement;

// Récupération des éléments du DOM
const distanceInput = document.getElementById("distance") as HTMLInputElement;
const priceInput = document.getElementById("price") as HTMLInputElement;
const resultElement = document.getElementById("result") as HTMLElement;
const calculateButton = document.getElementById("calculate") as HTMLButtonElement;
const statusSection = document.getElementById("status-section") as HTMLElement;
const calculatorSection = document.getElementById("calculator-section") as HTMLElement;
const statusSelect = document.getElementById("status") as HTMLSelectElement;
const saveStatusButton = document.getElementById("save-status") as HTMLButtonElement;

// Fonction de calcul des Miles et XP
function calculateMilesAndXP(distance: number, status: string, price: number) {
    let miles:number;
    let xp:number;
    switch (status) {
        case 'ivory':
            miles = price*4;
            break;
        case 'silver':
            miles = price*5;
            break;
        case 'gold':
            miles = price*6;
            break;
        case 'platinum':
            miles = price*7;
            break;
        default:
            miles=10
            break;
    }

  if(distance<2000){
    xp = 5
  }else if (distance>=2000 && distance<3500) {
    xp = 8
  }else if (distance>=3500 && distance<5000) {
    xp = 10
  }else if (distance>=5000 ) {
    xp = 12
  }else {
    xp = 2
    }
  
    return{miles,xp}
}

// Vérifie le statut Flying Blue de l'utilisateur
function checkUserStatus() {
  chrome.storage.local.get("flyingBlueStatus", (data) => {
    if (!data.flyingBlueStatus) {
      // Première utilisation, on affiche le formulaire de statut
      statusSection.style.display = "block";
      calculatorSection.style.display = "none";
    } else {
      // Utilisation suivante, on masque le formulaire de statut
      statusSection.style.display = "none";
      calculatorSection.style.display = "block";
    }
  });
  
}

// Enregistre le statut sélectionné par l'utilisateur
saveStatusButton.addEventListener("click", () => {
  const selectedStatus = statusSelect.value;
  chrome.storage.local.set({ flyingBlueStatus: selectedStatus }, () => {
    console.log(`Statut Flying Blue enregistré : ${selectedStatus}`);
    statusSection.style.display = "none";
    calculatorSection.style.display = "block";
    alert(`Bienvenue, utilisateur ${selectedStatus}`);
  });
});

// Appelle la fonction lors du chargement de la page
checkUserStatus();

// Écouteur d'événement pour le bouton de calcul
calculateButton.addEventListener("click", () => {
  const distance = parseFloat(distanceInput.value);
  const price = parseFloat(priceInput.value);

  if (isNaN(distance) || distance <= 0) {
    resultElement.innerText = "Veuillez entrer une distance valide.";
    return;
  }

  chrome.storage.local.get("flyingBlueStatus", (data) => {
    const status = data.flyingBlueStatus || "silver"; // Statut par défaut si non défini
    const reult = calculateMilesAndXP(distance, status, price);

    resultElement.innerText = `Miles cumulés : ${reult.miles}\nXP cumulés : ${reult.xp}`;
  });
});
