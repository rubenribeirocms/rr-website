import prisma from "@/lib/prisma";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET(req, { params }) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { customer: true, user: true },
  });

  if (!invoice) {
    return new Response("Invoice not found", { status: 404 });
  }

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  const gold = rgb(212 / 255, 175 / 255, 55 / 255);

  let y = 800;

  page.drawText("Ruben Ribeiro", { x: 50, y, size: 28, font, color: gold });
  page.drawText("Bespoke Hair Restoration", { x: 50, y: y - 30, size: 12, font });

  y -= 70;

  page.drawText(`Invoice #${invoice.id.slice(0, 8)}`, { x: 50, y, size: 18, font });
  page.drawText(new Date(invoice.date).toLocaleDateString("en-GB"), { x: 400, y, size: 12, font });

  y -= 60;

  page.drawText("Bill To:", { x: 50, y, size: 14, font, color: gold });
  y -= 20;
  page.drawText(invoice.customer.name, { x: 50, y, size: 14, font });

  y -= 40;
  page.drawText("Items:", { x: 50, y, size: 14, font, color: gold });
  y -= 20;

  invoice.items.forEach((item) => {
    page.drawText(item.name, { x: 50, y, size: 12, font });
    page.drawText(`${invoice.currency} ${item.price.toFixed(2)}`, { x: 400, y, size: 12, font });
    y -= 20;
  });

  y -= 30;

  page.drawText("VAT:", { x: 50, y, size: 12, font });
  page.drawText(`${invoice.currency} ${invoice.vat.toFixed(2)}`, { x: 400, y, size: 12, font });

  y -= 30;

  page.drawText("Total:", { x: 50, y, size: 14, font, color: gold });
  page.drawText(`${invoice.currency} ${invoice.total.toFixed(2)}`, { x: 400, y, size: 16, font, color: gold });

  const pdfBytes = await pdf.save();

  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${invoice.id}.pdf`
    }
  });
}
