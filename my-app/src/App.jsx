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
    <div class="container">
     

      {/* Menyn */}
      {currentView === "menu" && (
        <div id="menu">
           <h1>Pedagogisk Planering</h1>
          <div className="containerForButtons">
            
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
          <div className="description">
            <h2>Vad är en pedagogisk planering i fritidshemmet?</h2>
            
            <p>
              En pedagogisk planering i fritidshemmet är ett verktyg som hjälper pedagoger att skapa en genomtänkt och strukturerad verksamhet. Den används för att planera aktiviteter och undervisning som är meningsfulla, roliga och utvecklande för eleverna. Planeringen utgår från läroplanens mål för fritidshemmet och anpassas efter barnens intressen, behov och förutsättningar.
            </p>
            <p>
              I fritidshemmet handlar pedagogisk planering om att skapa en balans mellan lek, lärande, vila och aktivitet. Den hjälper oss att säkerställa att verksamheten både är trygg och stimulerande, samtidigt som vi stödjer barnens sociala, språkliga och kreativa utveckling.
            </p>
            <h2>Vad innehåller en pedagogisk planering i fritidshemmet?</h2>
            <p><strong>
              En pedagogisk planering kan se lite olika ut beroende på aktivitetens syfte, men brukar innehålla följande delar:
              </strong></p>
            <ul>
              <li><strong>Syfte:</strong> Varför gör vi detta? Här beskriver vi målet med aktiviteten, till exempel att utveckla samarbete, kreativitet eller rörelseglädje.</li>
              <li><strong>Mål:</strong> Vad vill vi att eleverna ska utveckla eller lära sig? Målen kan kopplas till fritidshemmets läroplan, till exempel att stärka sociala förmågor eller använda estetiska uttryck.</li>
              <li><strong>Aktiviteter och metoder:</strong> Hur ska vi göra? Här beskriver vi vilka aktiviteter som ska genomföras och vilka metoder som ska användas, till exempel lekar, skapande, diskussioner eller uteaktiviteter.</li>
              <li><strong>Anpassningar:</strong> Hur säkerställer vi att alla kan delta? Här tänker vi på hur vi kan anpassa aktiviteterna så att de passar barn med olika behov och förmågor.</li>
              <li><strong>Tid och plats:</strong> När och var ska aktiviteten genomföras? Det kan vara under en specifik tidpunkt, en viss dag i veckan eller i en specifik miljö, till exempel ute på gården eller i ett skapande rum.</li>
              <li><strong>Utvärdering och reflektion:</strong> Hur gick det? Efter aktiviteten reflekterar vi över resultatet tillsammans med barnen och kollegorna. Vad fungerade bra? Vad kan vi göra annorlunda nästa gång?</li>
            </ul>
            <h2>Varför är pedagogisk planering viktigt i fritidshemmet?</h2>
            <p>
              I fritidshemmet är flexibilitet och barns inflytande centrala, men en bra planering ger oss en tydlig riktning att arbeta mot. Den säkerställer att aktiviteterna är kopplade till läroplanens mål och att vi skapar en meningsfull verksamhet som stödjer barnens utveckling. Samtidigt blir det lättare att samarbeta i arbetslaget och att utvärdera vårt arbete.
            </p>
            <p>
              Med en genomtänkt pedagogisk planering kan vi skapa en miljö där barnen får leka, lära och växa – på sina villkor, men med vår vägledning. Det hjälper oss att förena struktur med kreativitet och se till att alla barn får en rolig och utvecklande tid på fritids!
            </p>
          </div>
        </div>
      )}

      {/* Fritids Form */}
      {currentView === "fritids" && (
        <div className="container-fripp">
          <form id="fripp-form">
            <h3>Planering</h3>
            <fieldset className="category" id="rubrik">
              <h4>Rubrik på den pedagogiska planeringen</h4>
              <input type="text" id="plan-title" placeholder="t.ex Fripp - Rymden" />
            </fieldset>

            <fieldset className="category" id="kartlaggning">
              <h4>Nulägesbeskrivning / kartläggning</h4>
              <textarea
                id="interests"
                placeholder="Vilka av elevernas intressen, initiativ och behov kan integreras i området? Vilka förmågor ska eleverna utveckla?"
                rows="4"
              ></textarea>
            </fieldset>

            <fieldset className="category" id="mål">
              <h4>Mål</h4>
              <textarea
                id="goal-description"
                placeholder="Vad ska eleven lära sig, förmå och förstå efteråt? Varför ska eleverna lära sig detta? Vem är Mottagare? Skriv Kopplingar till styrdokument."
                rows="4"
              ></textarea>

              <div id="goal-dropdowns">
                
                <div className="dropdown-container">
                 
                  <label htmlFor="central-content" >Centralt innehåll:</label>
                  <select id="">
                    <option value="">Välj centralt innehåll</option>
                  </select>
                  
                  <label htmlFor="sub-content">Läroplans mål:</label>
                  <select>
                    <option value="">Välj läroplans mål</option>
                  </select>
                  
                  <button type="button" className="remove-dropdown">
                   Ta bort mål
                  </button>
                </div>
              </div>
              <button type="button" id="add-dropdown">
                Lägg till fler mål
              </button>
            </fieldset>
            
            <fieldset className="category" id="hur">
              <h4>Hur gör vi?</h4>
              <textarea id="how" placeholder="Beskriv hur ni ska gå tillväga." rows="4"></textarea>
            </fieldset>

            <fieldset className="category" id="aktiviteter">
              <h4>Aktiviteter</h4>
              <textarea id="activities" placeholder="Beskriv planerade aktiviteter." rows="4"></textarea>
            </fieldset>

            <fieldset className="category" id="metoder">
              <h4>Metoder</h4>
              <textarea id="methods" placeholder="Beskriv vilka metoder ni ska använda." rows="4"></textarea>
            </fieldset>

            <fieldset className="category" id="larandemiljo">
              <h4>Lärandemiljö</h4>
              <textarea id="environment" placeholder="Plats, material och tekniker." rows="4"></textarea>
            </fieldset>

            <fieldset className="category" id="forhallningssatt">
              <h4>Personalens förhållningssätt</h4>
              <select id="approach">
                <option value="klassiskt">Klassiskt didaktiskt</option>
                <option value="processorienterad">Processorienterad</option>
                <option value="kaotiskt">Kaotiskt/kreativt</option>
              </select>
            </fieldset>

            <fieldset className="category" id="uppfoljning">
              <h4>Uppföljning</h4>
              <textarea id="follow-up" placeholder="När?" rows="4"></textarea>
            </fieldset>

            <fieldset className="category" id="utvardering">
              <h4>Utvärdering</h4>
              <textarea id="evaluation" placeholder="Hur blev det? Hur vet vi att vi bidragit till elevernas lärande? Hur ska utvärderingarna göras med eleverna?" rows="4"></textarea>
            </fieldset>
           <div className="down-buttons">
            <button type="button" id="save-plan">
              Spara
            </button>
            <button type="button" id="save-as-pdf" onClick={handleGeneratePDF}>
              Skapa PDF
            </button>
            <button onClick={() => handleButtonClick("menu")}>Tillbaka till menyn</button>
            </div>
          </form>
          
        </div>
      )}

      {/* Bibliotek */}
      {currentView === "bibliotek" && (
        <div className="biblioteket-container">
        <div className="biblioteket">
          <h4>Mina sparade pedagogiska planeringar</h4>
          <h3>Fritids</h3>
          <ul id="saved-plans-fritids">
            <li>Exempel på sparad plan för Fritids</li>
          </ul>
          <button onClick={() => handleButtonClick("menu")}>
            Tillbaka till menyn
          </button>
        </div>
        </div>
        
      )}
    </div>
  );
}

export default PlanForm;
