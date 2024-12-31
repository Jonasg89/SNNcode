document.addEventListener("DOMContentLoaded", function() {
    const { jsPDF } = window.jspdf;
  
    const contentOptions = {
      fritids: {
        "Språk och kommunikation": [
          "Samtala, lyssna, ställa frågor samt framföra egna tankar, åsikter och argument om olika områden, till exempel etiska frågor och vardagliga händelser.",
          "Samtala om olika typer av texter.",
          "Digitala verktyg och medier för kommunikation.",
          "Säker och ansvarsfull kommunikation, även i digitala sammanhang.",
          "Ord och begrepp som uttrycker behov, känslor, kunskaper och åsikter. Hur ord och yttranden kan uppfattas av och påverka en själv och andra."
        ],
        "Skapande och estetiska uttrycksformer": [
          "Skapande genom olika estetiska uttrycksformer, till exempel lek, bild, musik, dans och drama.",
          "Olika material, redskap och tekniker för att skapa och uttrycka sig.",
          "Tolka och samtala om olika estetiska uttryck.",
          "Digitala verktyg för framställning av olika estetiska uttryck."
        ],
        "Natur och samhälle": [
          "Olika sätt att utforska företeelser och samband i natur, teknik och samhälle, till exempel genom samtal, studiebesök och digitala medier. Hur företeelser och samband kan beskrivas, till exempel med ord och bilder.",
          "Matematik som redskap för att beskriva vardagliga företeelser och för att lösa vardagliga problem.",
          "Byggande och konstruktion med hjälp av olika material, redskap och tekniker.",
          "Normer och regler i elevernas vardag, till exempel i lekar och spel, och varför regler kan behövas.",
          "Etnicitet, könsroller, kroppsideal och konsumtion samt kritisk granskning av hur dessa företeelser framställs i medier och populärkultur.",
          "Demokratiska värderingar och principer, i sammanhang som är bekanta för eleverna. Hur gemensamma beslut kan fattas och hur konflikter kan hanteras på ett konstruktivt sätt.",
          "Barnets rättigheter i enlighet med konventionen om barnets rättigheter (barnkonventionen).",
          "Hur människors olika val i vardagen kan bidra till en hållbar utveckling.",
          "Närsamhällets och föreningslivets utbud av aktiviteter och platser för kultur, fritid och rekreation.",
          "Orientera sig i närmiljön och hur man beter sig i trafiken på ett säkert sätt."
        ],
        "Lekar, fysiska aktiviteter och utevistelse": [
          "Initiera, organisera och delta i lekar av olika slag.",
          "Idrotter och andra fysiska aktiviteter inomhus och utomhus under olika årstider och i olika väder.",
          "Utevistelse under olika årstider, samt närmiljöns möjligheter till vistelse i naturen och på andra platser för fysisk aktivitet och naturupplevelser.",
          "Säkerhet och hänsyn till miljö och andra människor vid vistelse i olika naturmiljöer. Rättigheter och skyldigheter i naturen enligt allemansrätten.",
          "Livsstilens betydelse för hälsan, till exempel hur kost, sömn och balansen mellan fysisk aktivitet och vila påverkar det psykiska och fysiska välbefinnandet."
        ]
      },
      forskola: {
        "Språk och kommunikation": [
          "Utveckla sin förmåga att kommunicera med andra genom tal, gester och kroppsspråk.",
          "Utveckla sin förståelse för språk och texter genom berättelser, sång och rim."
        ],
        "Skapande och estetiska uttrycksformer": [
          "Utveckla sin förmåga att uttrycka sig genom bild, musik, dans och drama.",
          "Skapa och uppleva olika former av konst och kultur."
        ],
        "Natur och teknik": [
          "Utforska och upptäcka naturen och dess växter och djur.",
          "Förstå grundläggande tekniska lösningar i vardagen."
        ],
        "Lekar och fysiska aktiviteter": [
          "Delta i lekar och fysiska aktiviteter som stimulerar motorik och rörelseglädje.",
          "Utforska närmiljön och utveckla en förståelse för hållbarhet och miljö."
        ]
      }
    };
  
    function addDropdown(target) {
      const goalDropdowns = document.getElementById("goal-dropdowns");
  
      const dropdownContainer = document.createElement("div");
      dropdownContainer.classList.add("dropdown-container");
  
      const centralContentSelect = document.createElement("select");
      centralContentSelect.classList.add("central-content");
      centralContentSelect.innerHTML = `
        <option value="">Välj centralt innehåll</option>
        ${Object.keys(contentOptions[target]).map(content => `<option value="${content}">${content}</option>`).join('')}
      `;
  
      const subContentSelect = document.createElement("select");
      subContentSelect.classList.add("sub-content");
      subContentSelect.innerHTML = `<option value="">Välj läroplans mål</option>`;
  
      centralContentSelect.addEventListener("change", function() {
        const selectedCategory = this.value;
        const subContentOptions = contentOptions[target][selectedCategory] || [];
        
        subContentSelect.innerHTML = `<option value="">Välj läroplans mål</option>`;
        subContentOptions.forEach(option => {
          const optionElement = document.createElement("option");
          optionElement.value = option;
          optionElement.textContent = option;
          subContentSelect.appendChild(optionElement);
        });
      });
  
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.classList.add("remove-dropdown");
      removeButton.innerHTML = '<img src="trash-icon.png" alt="Ta bort">';
      removeButton.addEventListener("click", function() {
        dropdownContainer.remove();
      });
  
      dropdownContainer.appendChild(centralContentSelect);
      dropdownContainer.appendChild(subContentSelect);
      dropdownContainer.appendChild(removeButton);
      goalDropdowns.appendChild(dropdownContainer);
    }
  
    document.getElementById("add-dropdown").addEventListener("click", function() {
      const target = document.querySelector(".menu-button.active").getAttribute("data-target");
      addDropdown(target);
    });
  
    // Menu navigation
    document.querySelectorAll(".menu-button").forEach(button => {
      button.addEventListener("click", function() {
        document.querySelectorAll(".menu-button").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        document.getElementById("menu").classList.add("hidden");
  
        const target = this.getAttribute("data-target");
        if (target === 'bibliotek') {
          loadSavedPlans();
          document.getElementById("biblioteket").classList.remove("hidden");
          document.getElementById("fripp-form").classList.add("hidden");
          document.getElementById("plan-display").classList.add("hidden");
        } else {
          document.getElementById("fripp-form").classList.remove("hidden");
          document.getElementById("biblioteket").classList.add("hidden");
          document.getElementById("plan-display").classList.add("hidden");
          document.getElementById("goal-dropdowns").innerHTML = ''; // Clear previous dropdowns
          addDropdown(target); // Add the first dropdown pair for the selected target
        }
      });
    });
  
    // Save plan
    document.getElementById("save-plan").addEventListener("click", function() {
      const title = document.getElementById("plan-title").value;
      const interests = document.getElementById("interests").value;
      const goalDescription = document.getElementById("goal-description").value;
      const how = document.getElementById("how").value;
      const activities = document.getElementById("activities").value;
      const methods = document.getElementById("methods").value;
      const environment = document.getElementById("environment").value;
      const approach = document.getElementById("approach").value;
      const followUp = document.getElementById("follow-up").value;
      const evaluation = document.getElementById("evaluation").value;
  
      const goals = [];
      document.querySelectorAll(".dropdown-container").forEach(container => {
        const centralContent = container.querySelector(".central-content").value;
        const subContent = container.querySelector(".sub-content").value;
        if (centralContent && subContent) {
          goals.push({ centralContent, subContent });
        }
      });
  
      const plan = { title, interests, goalDescription, goals, how, activities, methods, environment, approach, followUp, evaluation };
  
      let savedPlans = JSON.parse(localStorage.getItem('savedPlans')) || { fritids: [], forskola: [] };
      const target = document.querySelector(".menu-button.active").getAttribute("data-target");
      if (target === 'fritids') {
        savedPlans.fritids.push(plan);
      } else if (target === 'forskola') {
        savedPlans.forskola.push(plan);
      }
      localStorage.setItem('savedPlans', JSON.stringify(savedPlans));
      alert('Planen är sparad!');
    });
  
    // Load saved plans
    function loadSavedPlans() {
      const savedPlansFritidsList = document.getElementById("saved-plans-fritids");
      const savedPlansForskolaList = document.getElementById("saved-plans-forskola");
      savedPlansFritidsList.innerHTML = '';
      savedPlansForskolaList.innerHTML = '';
  
      const savedPlans = JSON.parse(localStorage.getItem('savedPlans')) || { fritids: [], forskola: [] };
      savedPlans.fritids.forEach((plan, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = plan.title;
        listItem.addEventListener("click", function() {
          displayPlan(plan);
        });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Radera";
        deleteButton.addEventListener("click", function(event) {
          event.stopPropagation();
          savedPlans.fritids.splice(index, 1);
          localStorage.setItem('savedPlans', JSON.stringify(savedPlans));
          loadSavedPlans();
        });
        listItem.appendChild(deleteButton);
        savedPlansFritidsList.appendChild(listItem);
      });
      savedPlans.forskola.forEach((plan, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = plan.title;
        listItem.addEventListener("click", function() {
          displayPlan(plan);
        });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Radera";
        deleteButton.addEventListener("click", function(event) {
          event.stopPropagation();
          savedPlans.forskola.splice(index, 1);
          localStorage.setItem('savedPlans', JSON.stringify(savedPlans));
          loadSavedPlans();
        });
        listItem.appendChild(deleteButton);
        savedPlansForskolaList.appendChild(listItem);
      });
    }
  
    function displayPlan(plan) {
      document.getElementById("menu").classList.add("hidden");
      document.getElementById("fripp-form").classList.add("hidden");
      document.getElementById("biblioteket").classList.add("hidden");
      document.getElementById("plan-display").classList.remove("hidden");
  
      const displayContent = document.getElementById("display-content");
      displayContent.innerHTML = `
        <h3>${plan.title}</h3>
        <p><strong>Nulägesbeskrivning / kartläggning:</strong> ${plan.interests}</p>
        <p><strong>Mål:</strong> ${plan.goalDescription}</p>
        ${plan.goals.map(goal => `<p><strong>${goal.centralContent}:</strong> ${goal.subContent}</p>`).join('')}
        <p><strong>Hur gör vi?:</strong> ${plan.how}</p>
        <p><strong>Aktiviteter:</strong> ${plan.activities}</p>
        <p><strong>Metoder:</strong> ${plan.methods}</p>
        <p><strong>Lärandemiljö:</strong> ${plan.environment}</p>
        <p><strong>Personalens förhållningssätt:</strong> ${plan.approach}</p>
        <p><strong>Uppföljning:</strong> ${plan.followUp}</p>
        <p><strong>Utvärdering:</strong> ${plan.evaluation}</p>
      `;
    }
  
    // Back to menu
    document.getElementById("back-to-menu").addEventListener("click", function() {
      document.getElementById("menu").classList.remove("hidden");
      document.getElementById("biblioteket").classList.add("hidden");
      document.getElementById("fripp-form").classList.add("hidden");
    });
  
    document.getElementById("back-to-bibliotek").addEventListener("click", function() {
      document.getElementById("menu").classList.add("hidden");
      document.getElementById("biblioteket").classList.remove("hidden");
      document.getElementById("fripp-form").classList.add("hidden");
      document.getElementById("plan-display").classList.add("hidden");
    });
  
    // PDF generation and email sending
    document.getElementById("generate-pdf").addEventListener("click", function() {
      const email = prompt("Ange din e-postadress där PDF-filen ska skickas:");
      if (email) {
        const doc = new jsPDF();
  
        const title = document.getElementById("plan-title").value;
        doc.text(title, 10, 10);
  
        doc.text("Nulägesbeskrivning / kartläggning", 10, 20);
        doc.text(document.getElementById("interests").value, 10, 30);
  
        doc.text("Mål", 10, 50);
        doc.text(document.getElementById("goal-description").value, 10, 60);
        const dropdownContainers = document.querySelectorAll(".dropdown-container");
        let yPosition = 80;
        dropdownContainers.forEach(container => {
          const centralContent = container.querySelector(".central-content").value;
          const subContent = container.querySelector(".sub-content").value;
          if (centralContent) {
            doc.text(centralContent, 10, yPosition);
            yPosition += 10;
          }
          if (subContent) {
            doc.text(subContent, 10, yPosition);
            yPosition += 10;
          }
        });
  
        doc.text("Hur gör vi?", 10, yPosition + 10);
        doc.text(document.getElementById("how").value, 10, yPosition + 20);
  
        yPosition += 50;
        doc.text("Aktiviteter", 10, yPosition);
        doc.text(document.getElementById("activities").value, 10, yPosition + 10);
  
        yPosition += 40;
        doc.text("Metoder", 10, yPosition);
        doc.text(document.getElementById("methods").value, 10, yPosition + 10);
  
        yPosition += 40;
        doc.text("Lärandemiljö", 10, yPosition);
        doc.text(document.getElementById("environment").value, 10, yPosition + 10);
  
        yPosition += 40;
        doc.text("Personalens förhållningssätt", 10, yPosition);
        doc.text(document.getElementById("approach").value, 10, yPosition + 10);
  
        yPosition += 40;
        doc.text("Uppföljning", 10, yPosition);
        doc.text(document.getElementById("follow-up").value, 10, yPosition + 10);
  
        yPosition += 40;
        doc.text("Utvärdering", 10, yPosition);
        doc.text(document.getElementById("evaluation").value, 10, yPosition + 10);
  
        const pdfData = doc.output('datauristring');
  
        // Send PDF via EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
          to_email: email,
          pdf_data: pdfData,
          message: 'Här är din PDF-fil för den pedagogiska planeringen.'
        })
        .then(function(response) {
          alert('PDF-filen har skickats till din e-postadress.');
        }, function(error) {
          alert('Det uppstod ett problem när PDF-filen skulle skickas: ' + JSON.stringify(error));
        });
      }
    });
  
    // Initialize EmailJS
    emailjs.init('YOUR_USER_ID');
  });
  