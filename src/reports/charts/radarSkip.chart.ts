import * as Utils from 'src/helpers/chart-utils';

export const getRadarSkipChart = async (): Promise<string> => {
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const labels = Utils.months({ count: 7 });
  const dataFirstSkip = Utils.numbers(NUMBER_CFG);
  const dataMiddleSkip = Utils.numbers(NUMBER_CFG);
  const dataLastSkip = Utils.numbers(NUMBER_CFG);

  dataFirstSkip[0] = null;
  dataMiddleSkip[(dataMiddleSkip.length / 2, 10)] = null;
  dataLastSkip[dataLastSkip.length - 1] = null;

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Skip first dataset',
        data: dataFirstSkip,
        borderColor: Utils.NAMED_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.red, 0.5),
      },
      {
        label: 'Skip mid dataset',
        data: dataMiddleSkip,
        borderColor: Utils.NAMED_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
      },
      {
        label: 'Skip last dataset',
        data: dataLastSkip,
        borderColor: Utils.NAMED_COLORS.green,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.green, 0.5),
      },
    ],
  };

  const config = {
    type: 'radar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Radar Skip Points Chart',
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};
