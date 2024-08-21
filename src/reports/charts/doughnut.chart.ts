import * as Utils from 'src/helpers/chart-utils';

type DoughnutEntry = {
  label: string;
  value: number;
};

type DoughnutOptions = {
  position?: 'left' | 'right' | 'top' | 'bottom';
  entries: DoughnutEntry[];
};

export const getDoughnutChart = async (
  options: DoughnutOptions,
): Promise<string> => {
  const data = {
    labels: options.entries.map(({ label }) => label),
    datasets: [
      {
        label: 'Dataset 1',
        data: options.entries.map(({ value }) => value),
        // backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: options.position ?? 'top',
      },
      plugins: {
        datalabels: {
          color: 'white',
          //   text: 'Chart.js Doughnut Chart',
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};
