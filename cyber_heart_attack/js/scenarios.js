// Spillets tilstand
let antivirusInstalled = false;
let totalPlays = 0;
let totalWins = 0;
let totalLosses = 0;

// Starter spillet og nulstiller relevant tilstand
function startGame() {
  document.getElementById("datebox").style.display = "none";
  totalPlays++;
  antivirusInstalled = false; // ← Her nulstilles den rigtigt

  setNarrator("Sådan! Du har scoret den hotteste date med skolens lækreste fyr... online.<br><br><em>Bare husk: online-dating kan være fyldt med skjulte farer. Stol på dine instinkter!</em><br><br>Er du klar til daten?");
  setChoices([
    { text: "Ja", action: waitForCallJa },
    { text: "Nej", action: waitForCallNej }
  ]);
}

// Første valgmulighed, hvis spilleren vælger "Ja"
function waitForCallJa() {
  setNarrator("Hey! Du har udskudt at installere antivirus-programmet i et stykke tid nu, hvad med at gøre det mens vi venter?");
  setChoices([
    { text: "Installer Antivirus", action: () => installAntivirusScene(callScene) },

    { text: "Spring over", action: callScene }
  ]);
}

// Alternativ intro hvis spilleren vælger "Nej"
function waitForCallNej() {
    setNarrator("Bare rolig - Det er helt naturligt at være nervøs. </em><br><br> Hmm... Du har udskudt at installere antivirus-programmet i et stykke tid nu, hvad med at gøre det mens vi venter?");
    setChoices([
      { text: "Installer Antivirus", action: () => installAntivirusScene(callScene) },

      { text: "Spring over", action: callScene }
    ]);
}

// Simulerer installation af antivirus med progress bar
function installAntivirusScene(callScene) {
  setNarrator("Installationen er i gang...");
  document.getElementById("progressWindow").classList.remove("hidden");


  let progress = 0;
  const progressBar = document.getElementById("progressBar");

  const interval = setInterval(() => {
    progress += 1;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      document.getElementById("progressWindow").classList.add("hidden"); // skjul progress bar
      progressBar.style.width = "0%"; // nulstil progressbaren

      antivirusInstalled = true;
      setNarrator("Antivirus er installeret! Du er nu beskyttet.");
      setChoices([
        { text: "Fortsæt", action: callScene  }
      ]);
    }
  }, 30); // Hastigheden på installationen
}

// Efter installation eller valg af "spring over"
function callScene() {
  setNarrator("Din date har sendt en besked!");
  setChoices([
    { text: "Læs beskeden!", action: dateChat }
  ]);
}

// Viser chat med date og tilbyder valgmuligheder
function dateChat() {
  document.getElementById("datebox").style.display = "block";

  setNarrator('<em>Han virker sød... men links fra fremmede kan være farlige!</em>');
  setDate('"Hej smukke! Jeg har en virkelig sjov video du skal se. Jeg sender dig lige et link på chat!"<br><br>');

  const choices = [
    { text: "Klik på linket", action: clickLink },
    { text: "Nægt at trykke", action: denyLink }
  ];

  // Mulighed hvis antivirus er installeret
  if (antivirusInstalled === true) {
    choices.push({ text: "Scan link med antivirus", action: scanLink });
  }

  setChoices(choices);
}

// Muligheder  -- skal måske slette denne passage
function afterCallScene() {
  setNarrator("Du har modtaget et link fra daten. Hvad vil du gøre?");

  const choices = [];

  choices.push({
    text: "Klik på linket",
    action: clickLink
  });

  if (antivirusInstalled) {
    choices.push({
      text: "Scan linket med antivirus",
      action: scanLink
    });
  }

  choices.push({
    text: "Ignorér linket",
    action: denyLink
  });

  setChoices(choices);
}

// Handling når brugeren klikker på linket
function clickLink() {

    if (antivirusInstalled) {
      setNarrator("Vent venligt mens Antivirus scanner beskeden..."); 
  
      setTimeout(() => {
        setNarrator("Antivirus fandt en (1) trussel og blokerede linket! Du er sikker!");
        setChoices([
          { text: "Fortsæt", action: safeEnding }
        ]);

      }, 2000);

    } else {
      setNarrator("Du klikker på linket...");
      setTimeout(() => {
      badEnding(); // kalder badEnding efter den angivne tidsramme 2 sek
      }, 2000);
    }
}

// Hvis brugeren nægter at trykke 
function denyLink() {
  mediumEnding();
}

// Hvis brugeren vælger at scanne linket
function scanLink() {
  setNarrator("Vent venligst mens antivirus scanner beskeden... ");
  setTimeout(safeEnding, 2000);
}


// -- SLUTNINGER -- //
function badEnding() {
  totalLosses++;
  setNarrator(`<strong>Åh nej du er blevet hacket! </strong><br><br> Fordi linket var en virus har hackeren nu adgang til alle dine billeder, kontakter og beskeder. De bruger måske endda  <i>din <i> identitet til at hacke andre!<br><br> Heldigvis var dette blot en simulation, så husk at være varsom næste gang!!<br> Spillet er slut ${totalPlays} gange.<br> Du har vundet ${totalWins} gang(e) og tabt ${totalLosses} gang(e).<br><br> Prøv igen?`);
  setChoices([{ text: "Prøv igen", action: startGame }
  ]);
}

function mediumEnding() {
  document.getElementById("datebox").style.display = "block";
  setNarrator('Øv altså! Nu gik det ellers lige så godt...<br>Men måske er der flere fisk i havet <br><br><em>Lær: Kritisk tænkning er vigtigt!</em><br><br>Vil du prøve igen?');
  setDate('"Ej, hvor er du bare nederen! Næste gang jeg ringer, har du bare at være sjovere!"<br><br>');
  setChoices([
  { text: "Prøv igen", action: startGame }]);
}

function safeEnding() {
  totalWins++;
  setNarrator(`<strong>Tillykke!</strong> Din kritiske tænkning og cybersikkerhed reddede dig!<br><br><em>Hurtige tips:</em><ul style='text-align:left;'><li>Klik aldrig på links fra fremmede.</li><li>Brug antivirus og hold det opdateret.</li><li>Stol på dine instinkter!</li></ul><br>Du klarede det!<br> Spillet er gennemført ${totalPlays} gange.<br> Du har vundet ${totalWins} gang(e) og tabt ${totalLosses} gang(e).<br><br> Prøv igen?`);
  setChoices([
    { text: "Prøv igen", action: startGame }]);
}


// -- HJÆLPEFUNKTIONER -- //
function setNarrator(text) {
  document.getElementById('narrator').innerHTML = text;
}

function setDate(text) {
  document.getElementById('date').innerHTML = text;
}

function setChoices(choices) {
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.innerText = choice.text;
    button.onclick = choice.action;
    choicesDiv.appendChild(button);
  });
}

// Rydder knapper
function clearChoices() {
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
}