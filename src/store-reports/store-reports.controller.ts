import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { StoreReportsService } from './store-reports.service';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async getOrderReport(
    @Param('orderId') orderId: string,
    @Res() response: Response,
  ) {
    const pdfDoc = await this.storeReportsService.getOrderByIdReport(+orderId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Order Report.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
  @Get('svg-charts')
  async getSvgChart(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getSvgChart();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Order Report.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('statistics')
  async getStatistics(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getStatistics();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Order Report.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
