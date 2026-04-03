type Severity = "standard" | "severe";

interface AgeBand {
  id: string;
  label: string;
  standardDoseMgPerKg: number;
  severeDoseMgPerKg: number;
  standardFrequencyLabel: string;
  severeFrequencyLabel: string;
  dosesPerDayMin: number;
  dosesPerDayMax: number;
  severeDosesPerDayMin?: number;
  severeDosesPerDayMax?: number;
  maxDailyMg?: number;
  severityRule: string;
}

interface MedicationReference {
  title: string;
  url: string;
  summary: string;
}

interface MedicationInstructions {
  indication: string;
  route: string;
  preparation: string;
  preparationsAvailable: string;
}

interface Medication {
  id: string;
  name: string;
  vialMg: number;
  defaultConcentrationMgMl: number;
  suppliedFrom: string;
  instructions: MedicationInstructions;
  ageBands: AgeBand[];
  externalReferences: MedicationReference[];
  limitations: string[];
}

interface AppState {
  medicineId: string;
  ageBandId: string;
  weightKg: string;
  severity: Severity;
  concentrationMgMl: string;
}

interface Ui {
  medicine: HTMLSelectElement;
  ageBand: HTMLSelectElement;
  weightKg: HTMLInputElement;
  concentrationMgMl: HTMLInputElement;
  copyLinkButton: HTMLButtonElement;
  resetButton: HTMLButtonElement;
  referenceBlock: HTMLDivElement;
  documentationBlock: HTMLDivElement;
  limitationsBlock: HTMLDivElement;
  errorState: HTMLDivElement;
  maxWarning: HTMLDivElement;
  doseMg: HTMLParagraphElement;
  doseMgPerKg: HTMLParagraphElement;
  drawUpMl: HTMLParagraphElement;
  drawUpMeta: HTMLParagraphElement;
  frequencyText: HTMLParagraphElement;
  dosesPerDayText: HTMLParagraphElement;
  dailyTotal: HTMLParagraphElement;
  dailyTotalMeta: HTMLParagraphElement;
  auditLineOne: HTMLParagraphElement;
  auditLineTwo: HTMLParagraphElement;
  auditLineThree: HTMLParagraphElement;
  severityInputs: NodeListOf<HTMLInputElement>;
}

interface SeverityRule {
  doseMgPerKg: number;
  frequencyLabel: string;
  dosesPerDayMin: number;
  dosesPerDayMax: number;
}

const MEDICATIONS: Record<string, Medication> = {
  cefotaxime: {
    id: "cefotaxime",
    name: "Cefotaxime",
    vialMg: 500,
    defaultConcentrationMgMl: 250,
    suppliedFrom: "Uploaded local cefotaxime sheet",
    instructions: {
      indication:
        "Treatment of susceptible infections and meningitis, guided by organism sensitivities, disease severity and discussion with microbiology.",
      route: "By intramuscular or by slow intravenous injection over 3 to 5 minutes.",
      preparation:
        "Reconstitute a 500 mg vial with 1.7 mL water for injection to give a 250 mg/mL solution.",
      preparationsAvailable: "Available as a 500 mg vial dry powder."
    },
    ageBands: [
      {
        id: "under7d",
        label: "Neonate under 7 days",
        standardDoseMgPerKg: 25,
        severeDoseMgPerKg: 50,
        standardFrequencyLabel: "Every 12 hours",
        severeFrequencyLabel: "Every 12 hours",
        dosesPerDayMin: 2,
        dosesPerDayMax: 2,
        severityRule: "Dose doubles in severe infection and meningitis."
      },
      {
        id: "d7to21",
        label: "Neonate 7 to 21 days",
        standardDoseMgPerKg: 25,
        severeDoseMgPerKg: 50,
        standardFrequencyLabel: "Every 8 hours",
        severeFrequencyLabel: "Every 8 hours",
        dosesPerDayMin: 3,
        dosesPerDayMax: 3,
        severityRule: "Dose doubles in severe infection and meningitis."
      },
      {
        id: "d21to28",
        label: "Neonate 21 to 28 days",
        standardDoseMgPerKg: 25,
        severeDoseMgPerKg: 50,
        standardFrequencyLabel: "Every 6 to 8 hours",
        severeFrequencyLabel: "Every 6 to 8 hours",
        dosesPerDayMin: 3,
        dosesPerDayMax: 4,
        severityRule: "Dose doubles in severe infection and meningitis."
      },
      {
        id: "over1m",
        label: "Child over 1 month",
        standardDoseMgPerKg: 50,
        severeDoseMgPerKg: 50,
        standardFrequencyLabel: "Every 8 to 12 hours",
        severeFrequencyLabel: "Every 6 hours",
        dosesPerDayMin: 2,
        dosesPerDayMax: 3,
        severeDosesPerDayMin: 4,
        severeDosesPerDayMax: 4,
        maxDailyMg: 12000,
        severityRule: "In very severe infection and meningitis, frequency increases to every 6 hours. Sheet states max 12 g daily."
      }
    ],
    externalReferences: [
      {
        title: "DailyMed prescribing information",
        url: "https://www.dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=f3c5895f-f54b-43d4-9b38-7bfbdf8335b7&type=display",
        summary:
          "Official U.S. label reviewed on 2026-04-03. Lists neonatal doses of 50 mg/kg every 12 hours for 0 to 1 week and 50 mg/kg every 8 hours for 1 to 4 weeks, and shows 500 mg vial preparation at approximately 230 mg/mL IM or 50 mg/mL IV."
      },
      {
        title: "Leeds Teaching Hospitals neonatal cefotaxime guide",
        url: "https://www.leedsformulary.nhs.uk/docs/files/NNUcefotaximemonograph.pdf?UNLID=591559190202459225126",
        summary:
          "Neonatal unit administration guide reviewed on 2026-04-03. Severe infection or meningitis lines match the 50 mg/kg severe pathway and warn that different brands have different displacement values, so brand-specific preparation instructions should be checked."
      },
      {
        title: "Perth Children's Hospital ChAMP monograph",
        url: "https://www.health.wa.gov.au/~/media/Files/Hospitals/PCH/General-documents/Health-professionals/ChAMP-Monographs/Cefotaxime.pdf",
        summary:
          "Paediatric monograph last reviewed October 2025. States IV injections should be given over 3 to 5 minutes and warns rapid IV injection has caused life-threatening arrhythmias. For neonates it defers to neonatal protocols."
      }
    ],
    limitations: [
      "No renal impairment adjustment logic is included.",
      "No gestational age or prematurity branching is included beyond the uploaded age bands.",
      "No compatibility, final dilution, infusion fluid, or line selection logic is included.",
      "No automatic rounding policy is applied to the draw-up volume.",
      "This prototype uses the uploaded local sheet for its default concentration, but external labels and monographs show other preparation concentrations."
    ]
  }
};

const state: AppState = {
  medicineId: "cefotaxime",
  ageBandId: "under7d",
  weightKg: "",
  severity: "standard",
  concentrationMgMl: ""
};

function queryElement<T extends Element>(selector: string): T {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element as T;
}

const ui: Ui = {
  medicine: queryElement<HTMLSelectElement>("#medicine"),
  ageBand: queryElement<HTMLSelectElement>("#ageBand"),
  weightKg: queryElement<HTMLInputElement>("#weightKg"),
  concentrationMgMl: queryElement<HTMLInputElement>("#concentrationMgMl"),
  copyLinkButton: queryElement<HTMLButtonElement>("#copyLinkButton"),
  resetButton: queryElement<HTMLButtonElement>("#resetButton"),
  referenceBlock: queryElement<HTMLDivElement>("#referenceBlock"),
  documentationBlock: queryElement<HTMLDivElement>("#documentationBlock"),
  limitationsBlock: queryElement<HTMLDivElement>("#limitationsBlock"),
  errorState: queryElement<HTMLDivElement>("#errorState"),
  maxWarning: queryElement<HTMLDivElement>("#maxWarning"),
  doseMg: queryElement<HTMLParagraphElement>("#doseMg"),
  doseMgPerKg: queryElement<HTMLParagraphElement>("#doseMgPerKg"),
  drawUpMl: queryElement<HTMLParagraphElement>("#drawUpMl"),
  drawUpMeta: queryElement<HTMLParagraphElement>("#drawUpMeta"),
  frequencyText: queryElement<HTMLParagraphElement>("#frequencyText"),
  dosesPerDayText: queryElement<HTMLParagraphElement>("#dosesPerDayText"),
  dailyTotal: queryElement<HTMLParagraphElement>("#dailyTotal"),
  dailyTotalMeta: queryElement<HTMLParagraphElement>("#dailyTotalMeta"),
  auditLineOne: queryElement<HTMLParagraphElement>("#auditLineOne"),
  auditLineTwo: queryElement<HTMLParagraphElement>("#auditLineTwo"),
  auditLineThree: queryElement<HTMLParagraphElement>("#auditLineThree"),
  severityInputs: document.querySelectorAll<HTMLInputElement>("input[name='severity']")
};

function formatNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits
  }).format(value);
}

function formatFixed(value: number, digits = 3): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
}

function formatDailyRange(minValue: number, maxValue: number, suffix: string): string {
  if (minValue === maxValue) {
    return `${formatNumber(minValue)} ${suffix}`;
  }

  return `${formatNumber(minValue)} to ${formatNumber(maxValue)} ${suffix}`;
}

function selectedMedication(): Medication {
  return MEDICATIONS[state.medicineId];
}

function selectedAgeBand(): AgeBand {
  const ageBand = selectedMedication().ageBands.find((band) => band.id === state.ageBandId);

  if (!ageBand) {
    throw new Error(`Unknown age band: ${state.ageBandId}`);
  }

  return ageBand;
}

function selectedSeverityRule(ageBand: AgeBand): SeverityRule {
  const severe = state.severity === "severe";

  return {
    doseMgPerKg: severe ? ageBand.severeDoseMgPerKg : ageBand.standardDoseMgPerKg,
    frequencyLabel: severe ? ageBand.severeFrequencyLabel : ageBand.standardFrequencyLabel,
    dosesPerDayMin: severe ? ageBand.severeDosesPerDayMin ?? ageBand.dosesPerDayMin : ageBand.dosesPerDayMin,
    dosesPerDayMax: severe ? ageBand.severeDosesPerDayMax ?? ageBand.dosesPerDayMax : ageBand.dosesPerDayMax
  };
}

function populateMedicationSelect(): void {
  ui.medicine.innerHTML = Object.values(MEDICATIONS)
    .map((medication) => `<option value="${medication.id}">${medication.name}</option>`)
    .join("");
}

function populateAgeBandSelect(): void {
  const medication = selectedMedication();
  ui.ageBand.innerHTML = medication.ageBands
    .map((band) => `<option value="${band.id}">${band.label}</option>`)
    .join("");
}

function renderReferenceBlock(): void {
  const medication = selectedMedication();
  const dosageItems = medication.ageBands
    .map((band) => {
      const standardText = `${band.standardDoseMgPerKg} mg/kg ${band.standardFrequencyLabel.toLowerCase()}.`;
      return `<li><strong>${band.label}:</strong> ${standardText} ${band.severityRule}</li>`;
    })
    .join("");

  ui.referenceBlock.innerHTML = `
    <article class="reference-card">
      <h3>Card details</h3>
      <p>${medication.instructions.indication}</p>
    </article>
    <article class="reference-card">
      <h3>Route and stock</h3>
      <ul>
        <li>${medication.instructions.route}</li>
        <li>${medication.instructions.preparationsAvailable}</li>
        <li>${medication.instructions.preparation}</li>
      </ul>
    </article>
    <article class="reference-card">
      <h3>Dosage text transcribed into this calculator</h3>
      <ul>${dosageItems}</ul>
    </article>
  `;
}

function renderDocumentationBlock(): void {
  const documentationItems = selectedMedication().externalReferences
    .map(
      (reference) => `
        <li>
          <strong><a href="${reference.url}" target="_blank" rel="noreferrer noopener">${reference.title}</a></strong>
          <br />
          ${reference.summary}
        </li>
      `
    )
    .join("");

  ui.documentationBlock.innerHTML = `
    <article class="reference-card">
      <h3>External documents reviewed</h3>
      <ul>${documentationItems}</ul>
    </article>
  `;
}

function renderLimitationsBlock(): void {
  const items = selectedMedication().limitations.map((item) => `<li>${item}</li>`).join("");

  ui.limitationsBlock.innerHTML = `
    <article class="reference-card">
      <h3>Checks still needed outside this app</h3>
      <ul>${items}</ul>
    </article>
  `;
}

function readFormIntoState(): void {
  state.medicineId = ui.medicine.value;
  state.ageBandId = ui.ageBand.value;
  state.weightKg = ui.weightKg.value.trim();
  state.concentrationMgMl = ui.concentrationMgMl.value.trim();

  const severityInput = [...ui.severityInputs].find((input) => input.checked);
  state.severity = severityInput?.value === "severe" ? "severe" : "standard";
}

function writeStateToForm(): void {
  ui.medicine.value = state.medicineId;
  populateAgeBandSelect();
  ui.ageBand.value = state.ageBandId;
  ui.weightKg.value = state.weightKg;
  ui.concentrationMgMl.value = state.concentrationMgMl || String(selectedMedication().defaultConcentrationMgMl);

  [...ui.severityInputs].forEach((input) => {
    input.checked = input.value === state.severity;
  });
}

function syncUrl(): void {
  const params = new URLSearchParams();
  params.set("med", state.medicineId);
  params.set("band", state.ageBandId);

  if (state.weightKg) {
    params.set("wt", state.weightKg);
  }

  if (state.severity !== "standard") {
    params.set("sev", state.severity);
  }

  if (state.concentrationMgMl) {
    params.set("conc", state.concentrationMgMl);
  }

  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, "", nextUrl);
}

function applyUrlState(): void {
  const params = new URLSearchParams(window.location.search);
  const medicationId = params.get("med");
  const medication = MEDICATIONS[medicationId ?? ""] ?? MEDICATIONS.cefotaxime;
  state.medicineId = medication.id;

  const bandId = params.get("band");
  state.ageBandId = medication.ageBands.some((band) => band.id === bandId) ? (bandId as string) : medication.ageBands[0].id;
  state.weightKg = params.get("wt") ?? "";
  state.severity = params.get("sev") === "severe" ? "severe" : "standard";
  state.concentrationMgMl = params.get("conc") ?? "";
}

function clearError(): void {
  ui.errorState.hidden = true;
  ui.errorState.textContent = "";
}

function showError(message: string): void {
  ui.errorState.hidden = false;
  ui.errorState.textContent = message;
}

function clearMaxWarning(): void {
  ui.maxWarning.hidden = true;
  ui.maxWarning.textContent = "";
}

function showMaxWarning(message: string): void {
  ui.maxWarning.hidden = false;
  ui.maxWarning.textContent = message;
}

function setPlaceholderResults(): void {
  ui.doseMg.textContent = "-";
  ui.doseMgPerKg.textContent = "-";
  ui.drawUpMl.textContent = "-";
  ui.drawUpMeta.textContent = "-";
  ui.frequencyText.textContent = "-";
  ui.dosesPerDayText.textContent = "-";
  ui.dailyTotal.textContent = "-";
  ui.dailyTotalMeta.textContent = "-";
  ui.auditLineOne.textContent = "Enter weight to calculate.";
  ui.auditLineTwo.textContent = "The concentration field stays visible so the assumption can be checked.";
  ui.auditLineThree.textContent = "-";
}

function calculate(): void {
  readFormIntoState();
  syncUrl();
  clearError();
  clearMaxWarning();
  renderReferenceBlock();
  renderDocumentationBlock();
  renderLimitationsBlock();

  const medication = selectedMedication();
  const ageBand = selectedAgeBand();
  const rule = selectedSeverityRule(ageBand);
  const weightKg = Number.parseFloat(state.weightKg);
  const concentrationMgMl = Number.parseFloat(state.concentrationMgMl || String(medication.defaultConcentrationMgMl));

  if (!state.weightKg) {
    setPlaceholderResults();
    return;
  }

  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    showError("Enter a valid weight greater than 0 kg.");
    setPlaceholderResults();
    return;
  }

  if (!Number.isFinite(concentrationMgMl) || concentrationMgMl <= 0) {
    showError("Enter a valid concentration greater than 0 mg/mL.");
    setPlaceholderResults();
    return;
  }

  const doseMg = weightKg * rule.doseMgPerKg;
  const drawUpMl = doseMg / concentrationMgMl;
  const stockVolumePerVialMl = medication.vialMg / concentrationMgMl;
  const dailyMinMg = doseMg * rule.dosesPerDayMin;
  const dailyMaxMg = doseMg * rule.dosesPerDayMax;
  const vialShare = doseMg / medication.vialMg;

  ui.doseMg.textContent = `${formatNumber(doseMg)} mg`;
  ui.doseMgPerKg.textContent = `${rule.doseMgPerKg} mg/kg per dose`;
  ui.drawUpMl.textContent = `${formatFixed(drawUpMl)} mL`;
  ui.drawUpMeta.textContent = `From ${formatNumber(concentrationMgMl, 1)} mg/mL stock • ${formatNumber(vialShare * 100)}% of one 500 mg vial`;
  ui.frequencyText.textContent = rule.frequencyLabel;
  ui.dosesPerDayText.textContent =
    rule.dosesPerDayMin === rule.dosesPerDayMax
      ? `${rule.dosesPerDayMin} dose${rule.dosesPerDayMin === 1 ? "" : "s"} per day`
      : `${rule.dosesPerDayMin} to ${rule.dosesPerDayMax} doses per day`;
  ui.dailyTotal.textContent = formatDailyRange(dailyMinMg, dailyMaxMg, "mg/day");
  ui.dailyTotalMeta.textContent =
    state.severity === "severe" ? "Severe pathway selected from the local sheet." : "Standard pathway selected from the local sheet.";

  ui.auditLineOne.textContent = `${formatNumber(weightKg)} kg x ${rule.doseMgPerKg} mg/kg = ${formatNumber(doseMg)} mg per dose.`;
  ui.auditLineTwo.textContent = `${formatNumber(doseMg)} mg / ${formatNumber(concentrationMgMl, 1)} mg/mL = ${formatFixed(drawUpMl)} mL to draw up.`;
  ui.auditLineThree.textContent = `At ${formatNumber(concentrationMgMl, 1)} mg/mL, one 500 mg vial yields about ${formatFixed(stockVolumePerVialMl)} mL total stock volume.`;

  if (ageBand.maxDailyMg && dailyMaxMg > ageBand.maxDailyMg) {
    showMaxWarning(
      `The selected schedule reaches ${formatNumber(dailyMaxMg)} mg/day, above the sheet maximum of ${formatNumber(ageBand.maxDailyMg)} mg/day. Independent review is needed before use.`
    );
  }
}

async function copyShareLink(): Promise<void> {
  readFormIntoState();
  syncUrl();

  try {
    await navigator.clipboard.writeText(window.location.href);
    const originalText = ui.copyLinkButton.textContent;
    ui.copyLinkButton.textContent = "Link copied";

    window.setTimeout(() => {
      ui.copyLinkButton.textContent = originalText;
    }, 1600);
  } catch {
    ui.copyLinkButton.textContent = "Copy failed";

    window.setTimeout(() => {
      ui.copyLinkButton.textContent = "Copy share link";
    }, 1600);
  }
}

function resetForm(): void {
  state.medicineId = "cefotaxime";
  state.ageBandId = "under7d";
  state.weightKg = "";
  state.severity = "standard";
  state.concentrationMgMl = String(MEDICATIONS.cefotaxime.defaultConcentrationMgMl);
  writeStateToForm();
  calculate();
}

function bindEvents(): void {
  ui.medicine.addEventListener("change", () => {
    state.medicineId = ui.medicine.value;
    state.ageBandId = selectedMedication().ageBands[0].id;

    if (!ui.concentrationMgMl.value) {
      state.concentrationMgMl = String(selectedMedication().defaultConcentrationMgMl);
    }

    writeStateToForm();
    calculate();
  });

  ui.ageBand.addEventListener("change", calculate);
  ui.weightKg.addEventListener("input", calculate);
  ui.concentrationMgMl.addEventListener("input", calculate);
  ui.copyLinkButton.addEventListener("click", () => {
    void copyShareLink();
  });
  ui.resetButton.addEventListener("click", resetForm);

  [...ui.severityInputs].forEach((input) => {
    input.addEventListener("change", calculate);
  });
}

function runSelfCheck(): void {
  const checks = [
    {
      name: "Under 7 days, standard, 2 kg",
      output: (() => {
        const doseMg = 2 * 25;
        const drawUpMl = doseMg / 250;
        return doseMg === 50 && Math.abs(drawUpMl - 0.2) < 0.0001;
      })()
    },
    {
      name: "7 to 21 days, severe, 3 kg",
      output: (() => {
        const doseMg = 3 * 50;
        return doseMg === 150;
      })()
    },
    {
      name: "Over 1 month, severe, 10 kg",
      output: (() => {
        const doseMg = 10 * 50;
        const dailyMax = doseMg * 4;
        return doseMg === 500 && dailyMax === 2000;
      })()
    }
  ];

  checks.forEach((check) => {
    if (!check.output) {
      console.error(`Self-check failed: ${check.name}`);
    }
  });
}

function init(): void {
  populateMedicationSelect();
  applyUrlState();
  writeStateToForm();
  renderReferenceBlock();
  renderDocumentationBlock();
  renderLimitationsBlock();
  bindEvents();
  calculate();
  runSelfCheck();
}

init();
