'use client';

import Plot from 'react-plotly.js';
import useSWR from 'swr';

export default function Statistics() {
  const { data, error, isLoading } = useSWR('/ratings', () => fetch('/ratings').then((res) => res.json()));
  if (error || isLoading) return <span className='loading loading-dots loading-lg'></span>;

  const group = data
    .filter((element) => element.groupID === 'set_1')
    .sort((one, two) => one.videoID.localeCompare(two.videoID, undefined, { numeric: true }));

  return (
    <Plot
      data={[
        {
          x: group.map((element) => element.videoID),
          y: group.map((element) => element.rating),
          type: 'box',
          boxpoints: 'all',
          marker: {
            color: '#1fb2a6',
          },
        },
      ]}
      layout={{
        title: 'Test',
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent',
        font: { color: '#fff' },
      }}
    />
  );
}
