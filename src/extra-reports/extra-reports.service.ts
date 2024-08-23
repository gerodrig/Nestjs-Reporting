import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { footerSection, getCommunityReport, headerSection } from 'src/reports';
import { getHtmlContent } from 'src/helpers';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  async getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');

    const content = getHtmlContent(html, {
      client: 'Benito Martinez',
      title: 'HTML to PDFMake',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HTML to PDFMake',
        subTitle: 'Convert HTML to PDFMake',
      }),
      footer: footerSection,
      content: content,
    };

    return this.printerService.createPdf(docDefinition);
  }

  async getCommunity() {
    const docDefinition = getCommunityReport();

    return this.printerService.createPdf(docDefinition);
  }

  getCustomSize() {
    const doc = this.printerService.createPdf({
      // pageSize: 'TABLOID',
      pageSize: {
        width: 150,
        height: 300,
      },
      content: [
        {
          qr: 'https://gerar.ca',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'Report with custom size',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    });

    return doc;
  }
}
