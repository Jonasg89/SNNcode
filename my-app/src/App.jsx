import React, { useState } from 'react';


import './style/style.css';

import jsPDF from "jspdf";

function PlanForm({ type, onBack }) {
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
    <div className="container">
    <form id="fripp-form">
      <fieldset className="category">
        <legend>Rubrik på den pedagogiska planeringen</legend>
        <input type="text" placeholder={`t.ex ${type} - Rymden`} />
      </fieldset>

      <fieldset className="category">
        <legend>Nulägesbeskrivning / kartläggning</legend>
        <textarea placeholder="Vilka av elevernas intressen, initiativ och behov kan integreras i området?" rows="4" />
      </fieldset>

      <fieldset className="category">
        <legend>Mål</legend>
        <textarea placeholder="Vad ska eleven lära sig, förmå och förstå efteråt?" rows="4" />
      </fieldset>

      <fieldset className="category">
        <legend>Hur gör vi?</legend>
        <textarea placeholder="Beskriv hur ni ska gå tillväga." rows="4" />
      </fieldset>

      <fieldset className="category">
        <legend>Aktiviteter</legend>
        <textarea placeholder="Beskriv planerade aktiviteter." rows="4" />
      </fieldset>

      <div className="button-container">
        <button type="submit">Spara</button>
        <button type="button" onClick={handleGeneratePDF}>Skapa PDF</button>
        <button type="button" onClick={onBack}>Tillbaka</button>
      </div>
    </form>
    </div>
  );
}

export default PlanForm;
