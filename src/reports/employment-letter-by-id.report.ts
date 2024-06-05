import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { DateFormatter } from 'src/helpers';

type ReportValues = {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
};

const style: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    alignment: 'center',
    margin: [40, 100, 20, 20],
  },
  body: {
    fontSize: 12,
    alignment: 'justify',
    margin: [0, 0, 0, 70],
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
  },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 20, 0, 0],
  },
};

export const getEmploymentLetterReportById = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
  } = values;
  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 40, 40, 60],
    header: headerSection({
      showDate: true,
      showLogo: true,
    }),
    content: [
      {
        text: 'EMPLOYMENT LETTER',
        style: 'header',
      },
      {
        text: `${employerName} This is to certify that ${employeeName} is employed as a ${employeePosition} at ${employeePosition} with effect from ${employeeStartDate}. His hours of work are ${employeeHours}. His work is ${employeeWorkSchedule} He is entitled to 14 days of paid leave per year. He is required to work 40 hours per week.\n\n`,
        style: 'body',
      },
      {
        text: `Kind Regards,`,
        style: 'signature',
      },
      { text: employerName, style: 'signature' },
      { text: employerPosition, style: 'signature' },
      { text: employerCompany, style: 'signature' },
      { text: DateFormatter.getDDMMMMYYYY(new Date()), style: 'signature' },
    ],
    footer: {
      text: 'This is a computer-generated letter and does not require a signature.',
      style: 'footer',
      alignment: 'center',
      margin: [0, 20, 0, 0],
    },
  };

  return docDefinition;
};
