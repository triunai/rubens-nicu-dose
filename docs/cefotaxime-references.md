# Cefotaxime References Reviewed

Reviewed on `2026-04-03` while building this prototype.

## Uploaded local sheet used for the calculator default

- `500 mg` vial dry powder
- reconstitute with `1.7 mL` water for injection
- resulting concentration `250 mg/mL`
- neonatal base dose `25 mg/kg`
- severe infection and meningitis pathway doubles the neonatal dose
- child over 1 month uses `50 mg/kg`

## External references reviewed

### 1. DailyMed prescribing information

Link:
https://www.dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=f3c5895f-f54b-43d4-9b38-7bfbdf8335b7&type=display

Key points used:

- neonatal dosing in the U.S. label is `50 mg/kg per dose every 12 hours` from `0 to 1 week`
- neonatal dosing in the U.S. label is `50 mg/kg per dose every 8 hours` from `1 to 4 weeks`
- the label lists `500 mg vial` preparation at approximately `230 mg/mL` for IM and `50 mg/mL` for IV
- the label states the maximum daily dosage should not exceed `12 grams`
- the label says IV administration over `3 to 5 minutes`

Why it matters here:

- this does not match the uploaded `250 mg/mL` assumption, so the app keeps concentration editable

### 2. Leeds Teaching Hospitals neonatal cefotaxime monograph

Link:
https://www.leedsformulary.nhs.uk/docs/files/NNUcefotaximemonograph.pdf?UNLID=591559190202459225126

Key points used:

- severe infection or meningitis lines show `50 mg/kg` with neonatal bands `12 hourly`, `8 hourly`, and `6 to 8 hourly`
- child over `28 days` is shown as `50 mg/kg 6 hourly`
- route is IV injection over `3 to 5 minutes`
- the guide explicitly says different brands have different displacement values and brand-specific preparation instructions should be checked

Why it matters here:

- this supports leaving concentration and preparation assumptions visible instead of hardcoding one hidden answer

### 3. Perth Children's Hospital ChAMP cefotaxime monograph

Link:
https://www.health.wa.gov.au/~/media/Files/Hospitals/PCH/General-documents/Health-professionals/ChAMP-Monographs/Cefotaxime.pdf

Key points used:

- for children `>= 4 weeks`, usual dose is `50 mg/kg/dose 8 hourly`
- severe infections are `50 mg/kg/dose 6 hourly`
- IV injections should be given over `3 to 5 minutes`
- rapid IV injection has resulted in life-threatening arrhythmias
- neonates are referred out to dedicated neonatal medication protocols

Why it matters here:

- it reinforces the route warning and highlights that neonatal dosing often lives in separate unit-specific protocols

## Design decisions taken from the above

- default to the uploaded local sheet, not to an external label
- keep concentration editable
- show audit math instead of only the final answer
- show a hard warning that renal adjustment, line compatibility, and final dilution are not included
