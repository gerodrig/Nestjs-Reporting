import fs from 'fs';
import * as Utils from '../helpers';

import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';

const svgContent = fs.readFileSync('src/assets/chinchilla.svg', 'utf8');

const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Add labels to the chart
      datasets: [
        {
          label: 'My First Graph', // Create the 'Users' dataset
          data: [65, 59, 80, 81, 56, 55, 40], // Add data to the chart
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Add custom color background
          borderColor: 'rgba(255, 99, 132, 1)', // Add custom color border
          borderWidth: 1, // Add custom border width
        },
      ],
    },
  };

  return Utils.chartJsToImage(chartConfig);
};

const generateDoughnut = async () => {
  const DATA_COUNT = 5;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};

export const getBasicChartSvgReport =
  async (): Promise<TDocumentDefinitions> => {
    try {
      const [chart, chartDonut] = await Promise.all([
        generateChartImage(),
        generateDoughnut(),
      ]);
      return {
        content: [
          {
            svg: svgContent,
            width: 150,
            fit: [100, 100],
          },
          {
            image: chart,
            width: 500,
          },
          {
            image: chartDonut,
            width: 500,
          },
        ],
      };
    } catch (error) {
      // Handle the error here
      console.error('Error generating chart image:', error);
      throw new HttpException(
        'Error generating chart image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  };
