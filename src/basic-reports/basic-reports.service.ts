import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrinterService } from 'src/printer/printer.service';
import {
  getCountryReport,
  getEmploymentLetterReport,
  getEmploymentLetterReportById,
  getHelloWorldReport,
} from 'src/reports';

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

  employmentLetter() {
    const documentDefinition = getEmploymentLetterReport();

    const document = this.printerService.createPdf(documentDefinition);

    return document;
  }

  async employmentLetterById(employeeId: number) {
    //get employee details from the database
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const documentDefinition = getEmploymentLetterReportById({
      employerName: 'Chinchilla Inc.',
      employerPosition: 'Manager',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Chinchilla Inc.',
    });

    const document = this.printerService.createPdf(documentDefinition);

    return document;
  }

  async getCountries() {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });
    const docDefinition = getCountryReport({ countries });

    return this.printerService.createPdf(docDefinition);
  }
}
