/**
 * PDF handout export — capture one slide at a time.
 *
 * Capturing the full off-screen handout in one html2pdf pass often yields blank
 * PDFs on STA2002 decks (KaTeX + many slides). Cloning each [data-handout-slide]
 * into a short-lived on-screen host avoids that.
 */

const FILENAME = "STA2002-Confidence-Intervals.pdf";
const SLIDE_WIDTH_PX = 900;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function downloadHandoutPdf(source: HTMLElement): Promise<void> {
  const html2canvas = (await import("html2canvas")).default;
  const { jsPDF } = await import("jspdf");

  const slides = [...source.querySelectorAll<HTMLElement>("[data-handout-slide]")];
  if (slides.length === 0) {
    throw new Error("No handout slides found to export.");
  }

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const host = document.createElement("div");
  host.setAttribute("data-pdf-export-host", "true");
  Object.assign(host.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: `${SLIDE_WIDTH_PX}px`,
    margin: "0",
    padding: "0",
    background: "#fff4d2",
    visibility: "visible",
    opacity: "1",
    pointerEvents: "none",
    zIndex: "2147483646",
    overflow: "visible",
  } as Partial<CSSStyleDeclaration>);
  document.body.appendChild(host);

  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const maxW = pageW - margin * 2;
  const maxH = pageH - margin * 2;

  try {
    for (let index = 0; index < slides.length; index += 1) {
      host.replaceChildren();
      const clone = slides[index].cloneNode(true) as HTMLElement;
      clone.style.width = `${SLIDE_WIDTH_PX}px`;
      clone.style.background = "#fff4d2";
      clone.style.boxSizing = "border-box";
      host.appendChild(clone);

      await sleep(30);

      const canvas = await html2canvas(clone, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#fff4d2",
        windowWidth: SLIDE_WIDTH_PX,
        scrollX: 0,
        scrollY: 0,
      });

      const img = canvas.toDataURL("image/jpeg", 0.92);
      let drawW = maxW;
      let drawH = (canvas.height * drawW) / canvas.width;
      if (drawH > maxH) {
        drawH = maxH;
        drawW = (canvas.width * drawH) / canvas.height;
      }

      if (index > 0) pdf.addPage();
      pdf.addImage(img, "JPEG", margin, margin, drawW, drawH);
    }

    pdf.save(FILENAME);
  } finally {
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
