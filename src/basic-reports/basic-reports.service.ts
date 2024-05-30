import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Database');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }
  constructor(private printerService: PrinterService) {
    super();
  }

  hello() {
    const documentDefinition = getHelloWorldReport({ name: 'Benito Martinez' });
    const document = this.printerService.createPdf(documentDefinition);

    return document;
  }
}
