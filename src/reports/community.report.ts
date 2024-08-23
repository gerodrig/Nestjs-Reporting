import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = (): TDocumentDefinitions => {
  const docDefiniton: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      // Logo - Address - Order number
      {
        columns: [
          {
            image: 'src/assets/logo.png',
            width: 50,
          },
          {
            alignment: 'center',
            text: `Forest Admin Community SAP\n VAT: 44.123.1233\nMountain Road, km 14\nPhone: 323.3123.123`,
          },
          {
            alignment: 'right',
            width: 140,
            layout: 'borderBlue',
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['Invoice No:', '123-456'],
                        ['Date:', '2021-09-01'],
                        ['Version:', '2024-001'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },

      // Horizontal Line
      {
        margin: [0, 5],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#3A4546',
          },
        ],
      },

      // Customer Details
      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Customer Details',
                fillColor: '#5775e1',
                color: 'white',
                colSpan: 4,
              },
              {},
              {},
              {},
            ],

            // Company Name
            [
              {
                text: 'Company Name',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: 'Company XYZ',
                fillColor: 'white',
              },
              {
                text: 'Address',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: '123 Fake Street',
                fillColor: 'white',
              },
            ],
            [
              {
                text: 'VAT',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Phone',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
            [
              {
                text: 'Business Type',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Payment Terms',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
          ],
        },
      },
    ],
  };

  return docDefiniton;
};
