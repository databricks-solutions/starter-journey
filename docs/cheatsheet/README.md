# Databricks Cheatsheet: source

This folder holds the source of the Databricks Cheatsheet PDF. The site serves the PDF from `docs/starter-journey/static/pdfs/Databricks-Cheatsheet-2026-Ready.pdf`.

The first edition (Jan 2026) by Lingeshwaran Kanniappan came from Canva. The Nov 2026 edition is HTML and CSS, so that a text edit is sufficient for the next update.

## Files

| Path | Content |
| --- | --- |
| `cheatsheet.html` | All slides. One `<section class="slide">` is one PDF page (900 x 1125 pt). |
| `cheatsheet.css` | Layout, colors and type. The colors and the DM Sans font come from the first edition. |
| `assets/icons/` | Product icons from the first edition. |
| `assets/diagrams/` | Diagrams from the first edition that are still correct. |
| `fonts/` | DM Sans and DM Mono, under the SIL Open Font License (`fonts/OFL.txt`). |
| `build.sh` | Builds the PDF with headless Chrome. |
| `check.sh` | Reports slides where the content goes into the footer. |

## Update the PDF

Requirement: Google Chrome or Chromium. Set `CHROME=/path/to/chrome` if the script does not find it.

1. Edit `cheatsheet.html`.
2. Run `./check.sh`. The result must be `LAYOUT OK`.
3. Run `./build.sh`. The script writes the PDF to `docs/starter-journey/static/pdfs/`.
4. Open the PDF and look at each changed page.
5. Change the date in `data-edition` on the `<body>` tag and on the cover.

## Content rules

- Use the current product names. Check them on the [product name changes](https://docs.databricks.com/aws/en/resources/product-name-changes) page.
- Add a status pill (`ga`, `preview`, `beta`) only when an official Databricks page or release note confirms the status.
- Use the `sl` pill for features that are only available on serverless compute.
- Keep the footer and the page numbers. The script at the end of `cheatsheet.html` adds them.
