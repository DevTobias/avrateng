'use client';

import { Fragment } from 'react';

import { ClientOnly } from '$lib/components/ClientOnly';
import { HorizontalLines } from '$lib/pages/rating/components/HorizontalLines';
import { IconButton } from '$lib/pages/rating/components/IconButton';
import { PlayButton } from '$lib/pages/rating/components/PlayButton';
import { RatingDisplay } from '$lib/pages/rating/components/RatingDisplay';
import { ScalaLabels } from '$lib/pages/rating/components/ScalaLabels';
import { VerticalSlider } from '$lib/pages/rating/components/VerticalSlider';
import { useRatingStore } from '$lib/pages/rating/store/useStore';

export const RatingScreen = () => {
  const { changeCurrentImageSet, setRating, currentImageSet, ratings, isFirstSet, isLastSet, hasEverySliderMoved, videos } =
    useRatingStore((s) => s);

  const playVideo = (id: string) => {
    fetch('/player', { method: 'POST', body: JSON.stringify({ file: id }) });
  };

  return (
    <div className='flex flex-col gap-10 items-center'>
      <div className='col-start-1 row-start-1 w-[35rem] h-[35rem] rotate-[270deg] grid grid-rows-[1fr_2fr_2fr_2fr_2fr_2fr_2fr] grid-cols-[1fr_1fr_5fr_1fr] gap-x-5 gap-y-10 items-center justify-center'>
        <div className='row-start-1 col-start-3 row-[span_7_/_span_7] h-full flex justify-between'>
          <HorizontalLines />
        </div>

        <div className='row-start-2 col-start-3 flex justify-between'>
          <ScalaLabels />
        </div>

        <ClientOnly>
          {videos[currentImageSet].map((id, index) => {
            return (
              <Fragment key={id}>
                <PlayButton className={`row-start-${index + 3} col-start-4`} onClick={() => playVideo(id)} />
                <VerticalSlider
                  className={`row-start-${index + 3} col-start-3`}
                  value={ratings[currentImageSet][index]}
                  onChange={({ currentTarget }) => setRating(index, currentTarget.value)}
                />
                <RatingDisplay className={`row-start-${index + 3} col-start-2`} value={ratings[currentImageSet][index]} />
              </Fragment>
            );
          })}
        </ClientOnly>

        <div className='flex gap-3 row-start-5 col-start-1 rotate-90'>
          <IconButton icon='first_page' onClick={() => changeCurrentImageSet(-1)} disabled={isFirstSet()} />
          <IconButton icon='last_page' onClick={() => changeCurrentImageSet(1)} disabled={isLastSet() || !hasEverySliderMoved()} />
        </div>
      </div>
    </div>
  );
};
