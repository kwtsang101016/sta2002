const FILENAME = "STA2002-Confidence-Intervals.pdf";

type StyleSnapshot = {
  transform: string;
  maxHeight: string;
  overflow: string;
  zIndex: string;
};

function prepareMountForCapture(source: HTMLElement): { mount: HTMLElement; previous: StyleSnapshot } | null {
  const mount = source.closest("[data-handout-mount]") as HTMLElement | null;
  if (!mount) return null;
  const previous: StyleSnapshot = {
    transform: mount.style.transform,
    maxHeight: mount.style.maxHeight,
    overflow: mount.style.overflow,
    zIndex: mount.style.zIndex,
  };
  // Bring on-screen (still behind the UI) so html2canvas can measure and paint.
  mount.style.transform = "none";
  mount.style.maxHeight = "none";
  mount.style.overflow = "visible";
  mount.style.zIndex = "-1";
  return { mount, previous };
}

function restoreMount(prepared: { mount: HTMLElement; previous: StyleSnapshot } | null): void {
  if (!prepared) return;
  const { mount, previous } = prepared;
  mount.style.transform = previous.transform;
  mount.style.maxHeight = previous.maxHeight;
  mount.style.overflow = previous.overflow;
  mount.style.zIndex = previous.zIndex;
}

export async function downloadHandoutPdf(source: HTMLElement): Promise<void> {
  const { default: html2pdf } = await import("html2pdf.js");
  const prepared = prepareMountForCapture(source);

  // Allow layout to settle after revealing the mount.
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  try {
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
          windowWidth: Math.max(source.scrollWidth, 1120),
          backgroundColor: "#fff4d2",
          onclone: (_document: Document, element: HTMLElement) => {
            element.style.visibility = "visible";
            element.style.opacity = "1";
            element.style.transform = "none";
            let node: HTMLElement | null = element;
            while (node) {
              node.style.visibility = "visible";
              node.style.opacity = "1";
              node = node.parentElement;
            }
          },
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      } as Record<string, unknown>)
      .from(source)
      .save();
  } finally {
    restoreMount(prepared);
  }
}

export async function printHandout(source: HTMLElement): Promise<void> {
  const printWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!printWindow) {
    throw new Error("Pop-up blocked. Allow pop-ups, or use Download PDF instead.");
  }

  const styles = [...document.querySelectorAll("style")].map((node) => node.outerHTML).join("");
  printWindow.document.write(`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${FILENAME.replace(".pdf", "")}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
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
