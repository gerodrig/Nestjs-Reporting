import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDoughnutChart } from './charts/doughnut.chart';
import { headerSection } from './sections/header.section';
import { getLineChart } from './charts/line.chart';
import { getBarChart } from './charts/bar.chart';
import { footerSection } from './sections/footer.section';
import { getRadarSkipChart } from './charts/radarSkip.chart';

interface TopCountry {
  country: string;
  customers: number;
}

type ReportOptions = {
  title?: string;
  subtitle?: string;
  topCountries?: TopCountry[];
};

export const getStatisticsReport = async ({
  topCountries,
  title,
  subtitle,
}: ReportOptions = {}): Promise<TDocumentDefinitions> => {
  const [doughnutChart, lineChart, barChart1, radarSkipChart] =
    await Promise.all([
      getDoughnutChart({
        entries: topCountries.map(({ country, customers }) => ({
          label: country,
          value: customers,
        })),
        position: 'left',
      }),
      getLineChart(),
      getBarChart(),
      getRadarSkipChart(),
    ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 150, 40, 60],
    header: headerSection({
      title: title ?? 'Statistics Report',
      subTitle: subtitle ?? 'This is the statistics report',
    }),
    footer: footerSection,
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: 'Statistics Report',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 10],
              },
              {
                image: doughnutChart,
                width: 200,
              },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['Country', 'Customers'],
                ...topCountries.map((country) => [
                  country.country,
                  country.customers,
                ]),
              ],
            },
          },
        ],
      },
      {
        image: lineChart,
        width: 400,
        height: 200,
        margin: [0, 20],
      },
      {
        columnGap: 10,
        columns: [
          {
            image: barChart1,
            width: 250,
            margin: [0, 20],
          },
          {
            image: radarSkipChart,
            width: 250,
            margin: [0, 20],
          },
        ],
      },
    ],
  };

  return docDefinition;
};
