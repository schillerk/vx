import React from 'react';
import { Arc } from '@vx/shape';
import { Group } from '@vx/group';
import { Chord, Ribbon } from '@vx/chord';
import { scaleOrdinal } from '@vx/scale';
import { LinearGradient } from '@vx/gradient';

const pink = '#ff2fab';
const orange = '#ffc62e';
const purple = '#dc04ff';
const purple2 = '#7324ff';
const red = '#d04376';
const green = '#52f091';
const blue = '#04a6ff';
const lime = '#00ddc6';
const bg = '#e4e3d8';

const matrix = [
  [11975, 5871, 8916, 2868],
  [1951, 10048, 2060, 6171],
  [8010, 16145, 8090, 8045],
  [1013, 990, 940, 6907],
];

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

const color = scaleOrdinal({
  domain: [1, 2, 3, 4],
  range: ['url(#gpinkorange)', 'url(#gpurplered)', 'url(#gpurplegreen)', 'url(#gbluelime)'],
});

export default ({ width, height, centerSize = 20, events = false }) => {
  if (width < 10) return null;

  const outerRadius = Math.min(width, height) * 0.5 - (centerSize + 10);
  const innerRadius = outerRadius - centerSize;

  return (
    <div className="Chords">
      <svg width={width} height={height}>
        <LinearGradient id="gpinkorange" from={pink} to={orange} vertical={false} />
        <LinearGradient id="gpurplered" from={purple} to={red} vertical={false} />
        <LinearGradient id="gpurplegreen" from={purple2} to={green} vertical={false} />
        <LinearGradient id="gbluelime" from={blue} to={lime} vertical={false} />
        <rect width={width} height={height} fill={bg} rx={14} />
        <Group top={height / 2} left={width / 2}>
          <Chord matrix={matrix} padAngle={0.05} sortSubgroups={descending}>
            {({ chords }) => {
              return (
                <g>
                  {chords.groups.map((group, i) => {
                    return (
                      <Arc
                        key={`key-${i}`}
                        data={group}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        fill={color(i)}
                        onClick={() => {
                          if (!events) return;
                          alert(`${JSON.stringify(group)}`);
                        }}
                      />
                    );
                  })}
                  {chords.map((chord, i) => {
                    return (
                      <Ribbon
                        key={`ribbon-${i}`}
                        chord={chord}
                        radius={innerRadius}
                        fill={color(i)}
                        fillOpacity={0.75}
                        onClick={() => {
                          alert(`${JSON.stringify(chord)}`);
                        }}
                      />
                    );
                  })}
                </g>
              );
            }}
          </Chord>
        </Group>
      </svg>
      <div className="deets">
        <div>
          Based on Mike Bostock's <a href="https://bl.ocks.org/mbostock/4062006">Chord Diagram</a>
        </div>
      </div>

      <style jsx>{`
        .Chords {
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        svg {
          margin: 1rem 0;
          cursor: pointer;
        }

        .deets {
          display: flex;
          flex-direction: row;
          font-size: 12px;
        }
        .deets > div {
          margin: 0.25rem;
        }
      `}</style>
    </div>
  );
};
