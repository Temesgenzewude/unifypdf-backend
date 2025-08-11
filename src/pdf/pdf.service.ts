import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';

@Injectable()
export class PdfService {
  async mergePdfBuffers(pdfBuffers: Buffer[]): Promise<Uint8Array> {
    if (!Array.isArray(pdfBuffers) || pdfBuffers.length === 0) {
      throw new Error('No PDF files provided');
    }

    const mergedPdf = await PDFDocument.create();

    for (const buffer of pdfBuffers) {
      const pdf = await PDFDocument.load(buffer);
      const pageIndices = pdf.getPageIndices();
      const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);
      for (const page of copiedPages) {
        mergedPdf.addPage(page);
      }
    }

    return mergedPdf.save();
  }
}

