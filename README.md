# NICU Dose Helper Prototype

Static medicine-math app scaffold for bedside double-checking, starting with cefotaxime from the uploaded local sheet.

## What it does

- Calculates cefotaxime `mg per dose` from weight and age band.
- Shows `mL to draw up` from an editable working concentration.
- Shows the selected frequency text and estimated daily total.
- Encodes the current form into the URL so the result can be shared as a link.
- Includes in-app notes showing where the uploaded sheet and external references differ.

## TypeScript setup

- Source lives in `src/app.ts`
- Build output is `dist/app.js`
- TypeScript config is `tsconfig.json`

### Commands

- `npm.cmd run build`
- `npm.cmd run serve`

`build` creates a complete static publish folder at `dist/`.

`serve` builds first, then starts a small Node static server for the built site at `http://localhost:8081`.

## Render Static Site

This repo is now set up for a Render Static Site.

- Build command: `npm install && npm run build`
- Publish directory: `dist`

There is also a `render.yaml` in the repo root so you can deploy it as a Blueprint instead of entering settings manually.

## Why the concentration is editable

The uploaded sheet states:

- `500 mg vial`
- `reconstitute with 1.7 mL water for injection`
- `250 mg/mL solution`

External references reviewed on `2026-04-03` do not all match that concentration. For example:

- DailyMed product labeling shows `500 mg vial` reconstitution at approximately `230 mg/mL` for IM and `50 mg/mL` for IV.
- Leeds Teaching Hospitals' neonatal guide warns that different brands have different displacement values and says brand-specific preparation instructions should be checked.

That is why the calculator exposes concentration as an editable field instead of silently hardcoding it.

## Files

- `index.html` - UI shell
- `styles.css` - responsive styling
- `src/app.ts` - typed calculator logic and documentation rendering
- `dist/app.js` - compiled browser script
- `dist/index.html` - deployable static page
- `dist/styles.css` - deployable stylesheet
- `scripts/build.mjs` - static-site build that copies the publishable files into `dist`
- `scripts/serve.mjs` - localhost server on port `8081`
- `docs/cefotaxime-references.md` - external documentation notes and links

## External clinical references

See `docs/cefotaxime-references.md` for the reviewed sources and the specific mismatches that drove the safety notes in the UI.

## Safety

This is a prototype and should not be used as a prescribing authority or as a substitute for:

- the written drug chart
- independent nurse double-check
- consultant instruction
- pharmacy guidance
- local dilution and administration policy
- renal dosing review
- compatibility checks
