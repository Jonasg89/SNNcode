import React, { useState } from "react";
import "./style/style.css";
import jsPDF from "jspdf";

function PlanForm() {
  const [currentView, setCurrentView] = useState("menu");

  const handleButtonClick = (target) => {
    setCurrentView(target);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Exempeldata från formuläret
    const title = "Rubrik: Pedagogisk Planering";
    const interests = "Nulägesbeskrivning: Exempelbeskrivning av elevernas intressen.";
    const goal = "Mål: Exempel på mål.";
    const how = "Hur gör vi?: Exempel på metoder.";
    const activities = "Aktiviteter: Exempel på aktiviteter.";

    // Lägga till text i PDF
    doc.text(title, 10, 10);
    doc.text(interests, 10, 20);
    doc.text(goal, 10, 30);
    doc.text(how, 10, 40);
    doc.text(activities, 10, 50);

    // Spara PDF-filen
    doc.save("pedagogisk-planering.pdf");
  };

  return (
    <div id="container">
      <h1>Pedagogisk Planering</h1>

      {/* Menyn */}
      {currentView === "menu" && (
        <div id="menu">
          <button
            className="menu-button"
            onClick={() => handleButtonClick("fritids")}
          >
            Fritids
          </button>
          <button
            className="menu-button"
            onClick={() => handleButtonClick("bibliotek")}
          >
            Bibliotek
          </button>
        </div>
      )}

      {/* Fritids Form */}
      {currentView === "fritids" && (
        <div className="container">
          <form id="fripp-form">
            <fieldset className="category" id="rubrik">
              <legend>Rubrik på den pedagogiska planeringen</legend>
              <input type="text" id="plan-title" placeholder="t.ex Fripp - Rymden" />
            </fieldset>

            <fieldset className="category" id="kartlaggning">
              <legend>Nulägesbeskrivning / kartläggning</legend>
              <textarea
                id="interests"
                placeholder="Vilka av elevernas intressen, initiativ och behov kan integreras i området? Vilka förmågor ska eleverna utveckla?"
                rows="4"
              ></textarea>
            </fieldset>

            <fieldset className="category" id="mål">
              <legend>Mål</legend>
              <textarea
                id="goal-description"
                placeholder="Vad ska eleven lära sig, förmå och förstå efteråt? Varför ska eleverna lära sig detta? Vem är Mottagare? Skriv Kopplingar till styrdokument."
                rows="4"
              ></textarea>
              <div id="goal-dropdowns">
                <div className="dropdown-container">
                  <label htmlFor="central-content">Centralt innehåll:</label>
                  <select className="central-content">
                    <option value="">Välj centralt innehåll</option>
                  </select>
                  <label htmlFor="sub-content">Läroplans mål:</label>
                  <select className="sub-content">
                    <option value="">Välj läroplans mål</option>
                  </select>
                  <button type="button" className="remove-dropdown">
                    <img src="trash-icon.png" alt="Ta bort" />
                  </button>
                </div>
              </div>
              <button type="button" id="add-dropdown">
                Lägg till fler mål
              </button>
            </fieldset>
            <fieldset className="category" id="hur">
              <legend>Hur gör vi?</legend>
              <textarea id="how" placeholder="Beskriv hur ni ska gå tillväga." rows="4"></textarea>
            </fieldset>

            <fieldset className="category" id="aktiviteter">
              <legend>Aktiviteter</legend>
              <textarea id="activities" placeholder="Beskriv planerade aktiviteter." rows="4"></textarea>
            </fieldset>

            <fieldset className="category" id="metoder">
              <legend>Metoder</legend>
              <textarea id="methods" placeholder="Beskriv vilka metoder ni ska använda." rows="4"></textarea>
            </fieldset>

            <fieldset className="category" id="larandemiljo">
              <legend>Lärandemiljö</legend>
              <textarea id="environment" placeholder="Plats, material och tekniker." rows="4"></textarea>
            </fieldset>

            <fieldset className="category" id="forhallningssatt">
              <legend>Personalens förhållningssätt</legend>
              <select id="approach">
                <option value="klassiskt">Klassiskt didaktiskt</option>
                <option value="processorienterad">Processorienterad</option>
                <option value="kaotiskt">Kaotiskt/kreativt</option>
              </select>
            </fieldset>

            <fieldset className="category" id="uppfoljning">
              <legend>Uppföljning</legend>
              <textarea id="follow-up" placeholder="När?" rows="4"></textarea>
            </fieldset>

            <fieldset className="category" id="utvardering">
              <legend>Utvärdering</legend>
              <textarea id="evaluation" placeholder="Hur blev det? Hur vet vi att vi bidragit till elevernas lärande? Hur ska utvärderingarna göras med eleverna?" rows="4"></textarea>
            </fieldset>

            <button type="button" id="save-plan">
              Spara
            </button>
            <button type="button" onClick={handleGeneratePDF}>
              Skapa PDF
            </button>
            <button onClick={() => handleButtonClick("menu")}>Tillbaka till menyn</button>
          </form>
          
        </div>
      )}

      {/* Bibliotek */}
      {currentView === "bibliotek" && (
        <div id="biblioteket">
          <h2>Mina sparade pedagogiska planeringar</h2>
          <h3>Fritids</h3>
          <ul id="saved-plans-fritids">
            <li>Exempel på sparad plan för Fritids</li>
          </ul>
          <button onClick={() => handleButtonClick("menu")}>
            Tillbaka till menyn
          </button>
        </div>
      )}
    </div>
  );
}

export default PlanForm;
