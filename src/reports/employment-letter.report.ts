import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';

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

export const getEmploymentLetterReport = (): TDocumentDefinitions => {
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
        text: `This is to certify that Mr. John Doe is employed as a Software Engineer at Acme Inc. with effect from 1st January 2021. His annual salary is $120,000.00. He is entitled to 14 days of paid leave per year. He is required to work 40 hours per week.\n\n`,
        style: 'body',
      },
      {
        text: `Kind Regards,`,
        style: 'signature',
      },
      { text: '[Employer Name]', style: 'signature' },
      { text: '[Job Title]', style: 'signature' },
      { text: '[Company Name]', style: 'signature' },
      { text: '[Date]', style: 'signature' },
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
