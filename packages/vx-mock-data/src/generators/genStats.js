import { randomNormal } from 'd3-random';

const random = randomNormal(4, 3);
const randomOffset = () => Math.random() * 10;
const sampleSize = 1000;

export default function genStats(number) {
  const data = [];
  let i;
  for (i = 0; i < number; i += 1) {
    const points = [];
    let j;
    const offset = randomOffset();
    for (j = 0; j < sampleSize; j += 1) {
      points.push(offset + random());
    }

    points.sort((a, b) => a - b);

    const firstQuartile = points[Math.round(sampleSize / 4)];
    const thirdQuartile = points[Math.round((3 * sampleSize) / 4)];
    const IQR = thirdQuartile - firstQuartile;

    const min = firstQuartile - 1.5 * IQR;
    const max = thirdQuartile + 1.5 * IQR;

    const outliers = points.filter(p => p < min || p > max);
    const binWidth = 2 * IQR * (sampleSize - outliers.length) ** (-1 / 3);
    const binNum = Math.round((max - min) / binWidth);
    const actualBinWidth = (max - min) / binNum;

    const bins = new Array(binNum + 2).fill(0);
    const values = new Array(binNum + 2).fill(min);

    for (let ii = 1; ii <= binNum; ii += 1) {
      values[ii] += actualBinWidth * (ii - 0.5);
    }

    values[values.length - 1] = max;

    points
      .filter(p => p >= min && p <= max)
      .forEach(p => {
        bins[Math.floor((p - min) / actualBinWidth) + 1] += 1;
      });

    const binData = values.map((v, index) => ({
      value: v,
      count: bins[index],
    }));

    const boxPlot = {
      x: `Statistics ${i}`,
      min,
      firstQuartile,
      median: points[Math.round(sampleSize / 2)],
      thirdQuartile,
      max,
      outliers,
    };

    data.push({
      boxPlot,
      binData,
    });
  }
  return data;
}
