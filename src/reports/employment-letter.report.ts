import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

const style: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
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
};

export const getEmploymentLetterReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: style,
    content: [
      {
        text: 'EMPLOYEMENT LETTER',
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
  };

  return docDefinition;
};
