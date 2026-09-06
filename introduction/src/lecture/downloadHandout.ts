/**
 * PDF handout export.
 * html2canvas often paints blank pages when the source lives under
 * `visibility: hidden` / far off-screen — especially with KaTeX and many slides.
 * We temporarily move the live handout DOM into an on-page host for capture.
 */

const FILENAME = "STA2002-Lecture1-Introduction-Preliminary.pdf";

export async function downloadHandoutPdf(source: HTMLElement): Promise<void> {
  const { default: html2pdf } = await import("html2pdf.js");

  const home = source.parentElement;
  if (!home) {
    throw new Error("Handout container is missing.");
  }

  const host = document.createElement("div");
  host.setAttribute("data-pdf-export-host", "true");
  Object.assign(host.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: "1120px",
    margin: "0",
    padding: "0",
    background: "#fff4d2",
    visibility: "visible",
    opacity: "1",
    pointerEvents: "none",
    zIndex: "2147483646",
    overflow: "visible",
  } as Partial<CSSStyleDeclaration>);

  // Move (not clone) so KaTeX-rendered nodes and CSS-module classes stay intact.
  host.appendChild(source);
  document.body.appendChild(host);

  try {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    await html2pdf()
      .set({
        margin: [10, 10, 12, 10],
        filename: FILENAME,
        image: { type: "jpeg", quality: 0.92 },
        html2canvas: {
          scale: 1.5,
          useCORS: true,
          logging: false,
          scrollX: 0,
          scrollY: 0,
          backgroundColor: "#fff4d2",
          windowWidth: 1120,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      } as Record<string, unknown>)
      .from(source)
      .save();
  } finally {
    home.appendChild(source);
    host.remove();
  }
}

export async function printHandout(source: HTMLElement): Promise<void> {
  const printWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!printWindow) {
    throw new Error("Pop-up blocked. Allow pop-ups, or use Download PDF instead.");
  }

  const styles = [...document.querySelectorAll("style")].map((node) => node.outerHTML).join("");
  const stylesheetLinks = [...document.querySelectorAll('link[rel="stylesheet"]')]
    .map((node) => node.outerHTML)
    .join("");

  printWindow.document.write(`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${FILENAME.replace(/\.pdf$/i, "")}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
  ${stylesheetLinks}
  ${styles}
  <style>
    @page { size: A4; margin: 12mm; }
    body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, sans-serif; color: #16213c; background: #fff4d2; }
  </style>
</head>
<body>${source.outerHTML}</body>
</html>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.onload = () => {
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };
}
