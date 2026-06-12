import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function combinePDFs() {
  const generatedAt = new Date();
  const formattedDate = generatedAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const START_YEAR = 2023;
  const endYear = generatedAt.getFullYear();
  const copyrightYears =
    endYear === START_YEAR ? `${START_YEAR}` : `${START_YEAR}-${endYear}`;
  const copyrightNotice =
    `© ${copyrightYears} Alexander Ulbrich. Licensed under CC BY-SA 4.0.`;

  // Support passing lists via CLI flags so we don't duplicate content lists in multiple scripts.
  // Flags accepted (comma-separated values):
  // --lectures, --activities, --labs, --assignments, --practicalities

  function parseCsvFlag(name) {
    const arg = process.argv.find((a) => a.startsWith(`--${name}=`));
    if (!arg) return null;
    const val = arg.split("=")[1] || "";
    return val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // Read lists from CLI or fall back to empty arrays. Passing values is strongly encouraged
  // to avoid duplicated lists across scripts.
  const lectureTopics = parseCsvFlag("lectures") || [];
  const activities = parseCsvFlag("activities") || [];
  const labs = parseCsvFlag("labs") || [];
  const assignments = parseCsvFlag("assignments") || [];
  const practicalities = parseCsvFlag("practicalities") || [];

  // Resolve script location and repository root so we reliably operate on the
  // `pdf/` and `pdf/temp` folders inside the repository regardless of the
  // current working directory.
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const REPO_ROOT = path.resolve(__dirname, "..");
  const PDF_DIR = path.join(REPO_ROOT, "pdf");
  const TMP_DIR = path.join(PDF_DIR, "temp");

  console.log("Combine: using the following lists:");
  console.log("  lectures:   ", lectureTopics.length ? lectureTopics.join(", ") : "(none)");
  console.log("  activities: ", activities.length ? activities.join(", ") : "(none)");
  console.log("  labs:       ", labs.length ? labs.join(", ") : "(none)");
  console.log("  assignments:", assignments.length ? assignments.join(", ") : "(none)");
  console.log("  practicalities:", practicalities.length ? practicalities.join(", ") : "(none)");

  // Create new PDF document
  const mergedPdf = await PDFDocument.create();

  // Add metadata
  mergedPdf.setTitle("CS312 Complete Course Materials");
  mergedPdf.setAuthor("Alex Ulbrich");
  mergedPdf.setSubject("System Administration");
  mergedPdf.setCreationDate(generatedAt);

  // --- Title / cover page ---
  // Create a title page at the beginning of the PDF so the combined output
  // always starts with a nicely formatted cover. We use a default page size
  // (US Letter) so the cover is well-proportioned even if the merged PDFs
  // later use other sizes.
  const COVER_WIDTH = 612; // 8.5in * 72
  const COVER_HEIGHT = 792; // 11in * 72

  // Add a single cover page and draw the main text centered
  const coverPage = mergedPdf.addPage([COVER_WIDTH, COVER_HEIGHT]);
  const coverFont = await mergedPdf.embedFont(StandardFonts.HelveticaBold);
  const coverSubFont = await mergedPdf.embedFont(StandardFonts.Helvetica);

  const titleText = "CS 312 Complete Course Materials";
  const subtitleText = "System Administration";
  const authorText = "Alex Ulbrich";
  const generatedDate = `Generated: ${formattedDate}`;

  // Large title centered vertically
  const titleSize = 28;
  const subtitleSize = 14;
  const authorSize = 12;

  const titleWidth = coverFont.widthOfTextAtSize(titleText, titleSize);
  const subtitleWidth = coverSubFont.widthOfTextAtSize(subtitleText, subtitleSize);
  const authorWidth = coverSubFont.widthOfTextAtSize(authorText, authorSize);

  coverPage.drawText(titleText, {
    x: (COVER_WIDTH - titleWidth) / 2,
    y: COVER_HEIGHT - 260,
    size: titleSize,
    font: coverFont,
    color: rgb(0.05, 0.18, 0.4),
  });

  coverPage.drawText(subtitleText, {
    x: (COVER_WIDTH - subtitleWidth) / 2,
    y: COVER_HEIGHT - 300,
    size: subtitleSize,
    font: coverSubFont,
    color: rgb(0.15, 0.15, 0.15),
  });

  coverPage.drawText(authorText, {
    x: (COVER_WIDTH - authorWidth) / 2,
    y: COVER_HEIGHT - 340,
    size: authorSize,
    font: coverSubFont,
    color: rgb(0.15, 0.15, 0.15),
  });

  // small date near the bottom of the cover page
  const dateSize = 10;
  const dateWidth = coverSubFont.widthOfTextAtSize(generatedDate, dateSize);
  coverPage.drawText(generatedDate, {
    x: (COVER_WIDTH - dateWidth) / 2,
    y: 60,
    size: dateSize,
    font: coverSubFont,
    color: rgb(0.25, 0.25, 0.25),
  });

  // Function to add PDF with section header
  async function addPDFSection(filename, sectionTitle) {
    try {
      if (!fs.existsSync(filename)) {
        console.log(`Skipping ${filename} - file not found`);
        return;
      }

      const pdfBytes = fs.readFileSync(filename);
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      // Add all pages from the PDF
      pages.forEach((page) => mergedPdf.addPage(page));

      console.log(`Added: ${sectionTitle} (${pages.length} pages)`);
    } catch (error) {
      console.error(`Error adding ${filename}:`, error.message);
    }
  }

  // Add lecture notes
  for (const topic of lectureTopics) {
    await addPDFSection(
      path.join(TMP_DIR, `lecture-notes-${topic}.pdf`),
      `Lecture: ${topic.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
    );
  }

  // Add activity PDFs
  for (const topic of activities) {
    await addPDFSection(
      path.join(TMP_DIR, `activity-${topic}.pdf`),
      `Activity: ${topic.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
    );
  }

  // Add lab PDFs
  for (const topic of labs) {
    await addPDFSection(
      path.join(TMP_DIR, `lab-${topic}.pdf`),
      `Lab: ${topic.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
    );
  }

  // Add assignments
  for (const topic of assignments) {
    await addPDFSection(
      path.join(TMP_DIR, `assignment-${topic}.pdf`),
      `Assignment: ${topic.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
    );
  }

  // Add practicalities
  for (const topic of practicalities) {
    await addPDFSection(
      path.join(TMP_DIR, `practicalities-${topic}.pdf`),
      `Practicalities: ${topic.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
    );
  }

  // Add headers and footers to all pages
  const pages = mergedPdf.getPages();
  const font = await mergedPdf.embedFont(StandardFonts.Helvetica);
  const totalPages = pages.length;
  // Match Puppeteer header/footer templates which use `margin-inline: 1cm`.
  // pdf-lib coordinates are in PDF points (72 points per inch).
  const HEADER_FOOTER_INSET = 72 / 2.54; // 1cm
  // Content pages exclude the cover (first page). Page numbers shown to users
  // should start at 1 for the first content page. When there are no content
  // pages (only the cover), contentPageCount will be 0.
  const contentPageCount = Math.max(totalPages - 1, 0);

  pages.forEach((page, index) => {
    // Skip header/footer on the cover page (index 0)
    if (index === 0) return;
    const { width, height } = page.getSize();

    // Header
    page.drawText("CS 312 System Administration", {
      x: HEADER_FOOTER_INSET,
      y: height - 30,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });

    const dateText = `Generated: ${formattedDate}`;
    const dateTextWidth = font.widthOfTextAtSize(dateText, 10);
    page.drawText(dateText, {
      x: width - dateTextWidth - HEADER_FOOTER_INSET,
      y: height - 30,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });

    // Footer
    page.drawText(copyrightNotice, {
      x: HEADER_FOOTER_INSET,
      y: 20,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });

    // For the content pages we want numbering starting at 1 and not include
    // the cover in the human-visible count.
    const pageText = `Page ${index} of ${contentPageCount}`;
    const pageTextWidth = font.widthOfTextAtSize(pageText, 10);
    page.drawText(pageText, {
      x: width - pageTextWidth - HEADER_FOOTER_INSET,
      y: 20,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  });

  // Save the merged PDF into the repository `pdf/` folder so the result is
  // colocated with the other generated PDFs regardless of working directory.
  const outPath = path.join(PDF_DIR, "cs312-complete-course-materials.pdf");

  // Ensure output directory exists
  fs.mkdirSync(PDF_DIR, { recursive: true });

  const pdfBytes = await mergedPdf.save();
  fs.writeFileSync(outPath, pdfBytes);

  console.log(`\nCombined PDF created: ${outPath}`);
  console.log(`Total pages: ${totalPages}`);
}

// Run the function
combinePDFs().catch(console.error);
