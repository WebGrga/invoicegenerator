// src/utils/pdf.js
import { jsPDF } from "jspdf";

export const generateInvoicePDF = (invoice) => {
  const doc = new jsPDF();

  // Add invoice details
  doc.text("Invoice", 10, 10);
  doc.text(`Invoice #${invoice.id}`, 10, 20);
  doc.text(`Date: ${invoice.date}`, 10, 30);

  // You can add more invoice details here, like items, total amount, etc.
  doc.text(`Total: $${invoice.total}`, 10, 40);

  doc.save(`invoice_${invoice.id}.pdf`);
};