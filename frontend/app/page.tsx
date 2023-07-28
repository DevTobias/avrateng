'use client';

import { Fragment, useState } from 'react';

import { PlayButton } from '$lib/components/PlayButton';
import { RatingDisplay } from '$lib/components/RatingDisplay';
import { VerticalSlider } from '$lib/components/VerticalSlider';
import { VideoDialog } from '$lib/components/VideoDialog';

const videos = ['video1', 'video2', 'video3', 'video4', 'video5'];

// jeden slider mind. 1 mal bewegen

export default function Home() {
  const [modalOpen, setModelOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [rangeValues, setRangeValues] = useState([50, 50, 50, 50, 50]);

  const showVideoModal = (i: number) => {
    setModelOpen(true);
    setCurrentVideo(videos[i]);
  };

  const updateSliderValue = (i: number, val: string) => {
    setRangeValues((values) => {
      return values.map((original, position) => (i === position ? parseInt(val, 10) : original));
    });
  };

  return (
    <>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='flex flex-col gap-10 items-center'>
          <div className='w-96 h-96 rotate-[270deg] grid grid-rows-5 grid-cols-[1fr_5fr_1fr] gap-x-5 gap-y-10 items-center justify-center'>
            {videos.map((id, index) => {
              return (
                <Fragment key={id}>
                  <PlayButton className={`row-start-${index + 1} col-start-3`} onClick={() => showVideoModal(index)} />
                  <VerticalSlider
                    className={`row-start-${index + 1} col-start-2`}
                    value={rangeValues[index]}
                    onChange={(e) => updateSliderValue(index, e.currentTarget.value)}
                  />
                  <RatingDisplay className={`row-start-${index + 1} col-start-1`} value={rangeValues[index]} />
                </Fragment>
              );
            })}
          </div>
          <div className='flex gap-5'>
            <button className='btn btn-sm btn-square btn-outline b'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='btn btn-sm btn-square btn-outline'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <VideoDialog open={modalOpen} video={currentVideo} />
    </>
  );
}
