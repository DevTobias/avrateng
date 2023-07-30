'use client';

import { useRouter } from 'next/navigation';
import { FC, Fragment } from 'react';

import { useMounted } from '$lib/hooks/useMounted';
import { HorizontalLines } from '$lib/pages/rating/components/HorizontalLines';
import { IconButton } from '$lib/pages/rating/components/IconButton';
import { PlayButton } from '$lib/pages/rating/components/PlayButton';
import { RatingDisplay } from '$lib/pages/rating/components/RatingDisplay';
import { ScalaLabels } from '$lib/pages/rating/components/ScalaLabels';
import { VerticalSlider } from '$lib/pages/rating/components/VerticalSlider';
import { useRatingStore } from '$lib/pages/rating/store/useStore';
import { useUserStore } from '$lib/store/useUserStore';

interface Props {
  isTraining?: boolean;
}

export const RatingScreen: FC<Props> = ({ isTraining = false }) => {
  const mounted = useMounted();
  const router = useRouter();
  const {
    changeCurrentImageSet,
    setRating,
    currentImageSet,
    ratings,
    isFirstSet,
    isLastSet,
    everySliderMoved,
    videos,
    setPlayedVideo,
    everyVideoPlayed,
  } = useRatingStore((s) => s);
  const { userID, hasCompletedTraining, setCompletedTraining } = useUserStore((s) => s);

  if (mounted && (!userID || (!isTraining && !hasCompletedTraining))) router.replace('/');

  const playVideo = async (index: number, id: string) => {
    await fetch('/player', { method: 'POST', body: JSON.stringify({ file: id }) });
    setPlayedVideo(index);
  };

  const nextSet = async () => {
    if (!isTraining) {
      await fetch('/ratings', {
        method: 'POST',
        body: JSON.stringify(
          ratings[currentImageSet].map((rating, i) => ({
            id: `${userID}-${currentImageSet}-${videos[currentImageSet][i].split('/').at(-1)}`,
            videoID: videos[currentImageSet][i].split('/').at(-1),
            groupID: videos[currentImageSet][i].split('/').at(-2),
            rating,
            userID,
          }))
        ),
      });
    }

    if (isLastSet() && isTraining) {
      setCompletedTraining();
      router.replace('/rating');
    } else if (isLastSet() && !isTraining) {
      router.replace('/rating/finish');
    } else changeCurrentImageSet(1);
  };

  return (
    <div className='flex flex-col items-center gap-10'>
      <div className='w-1/2 flex flex-col items-center gap-2'>
        <progress className='progress progress-accent ' value={currentImageSet + 1} max={videos.length}></progress>
        <span>
          {currentImageSet + 1} / {videos.length}
        </span>
      </div>

      <div className='col-start-1 row-start-1 w-[40rem] h-[40rem] rotate-[270deg] grid grid-rows-[1fr_2fr_2fr_2fr_2fr_2fr_2fr] grid-cols-[1fr_1fr_5fr_1fr] gap-x-5 gap-y-10 items-center justify-center'>
        <div className='row-start-1 col-start-3 row-[span_7_/_span_7] h-full flex justify-between'>
          <HorizontalLines />
        </div>

        <div className='row-start-2 col-start-3 flex justify-between'>
          <ScalaLabels />
        </div>

        {mounted &&
          videos[currentImageSet].map((id, index) => {
            return (
              <Fragment key={id}>
                <PlayButton className={`row-start-${index + 3} col-start-4`} onClick={() => playVideo(index, id)} />
                <VerticalSlider
                  className={`row-start-${index + 3} col-start-3`}
                  value={ratings[currentImageSet][index]}
                  onChange={({ currentTarget }) => setRating(index, currentTarget.value)}
                />
                <RatingDisplay className={`row-start-${index + 3} col-start-2`} value={ratings[currentImageSet][index]} />
              </Fragment>
            );
          })}

        <div className='flex gap-3 row-start-5 col-start-1 rotate-90 h-full w-full'>
          <IconButton icon='first_page' onClick={() => changeCurrentImageSet(-1)} disabled={mounted ? isFirstSet() : true} />
          <IconButton icon='last_page' onClick={nextSet} disabled={mounted ? !everySliderMoved() || !everyVideoPlayed() : true} />
        </div>
      </div>
    </div>
  );
};
