'use client';

import { FC, Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { IconButton } from '$lib/pages/rating/components/IconButton';
import { PlayButton } from '$lib/pages/rating/components/PlayButton';
import { RatingDisplay } from '$lib/pages/rating/components/RatingDisplay';
import { VerticalSlider } from '$lib/pages/rating/components/VerticalSlider';
import { debounce } from '$lib/utils/debounce';
import { generateSimpleId } from '$lib/utils/random';

interface Props {
  videos: string[][];
}

export const RatingScreen: FC<Props> = ({ videos }) => {
  const [currentSet, setCurrentSet] = useState(0);
  const [rangeValues, setRangeValues] = useState([0, 0, 0, 0, 0]);
  const sliderMoved = useRef([false, false, false, false, false]);
  const user = useRef<null | string>(null);

  const localKey = `set-${currentSet}`;
  const isAtStart = currentSet === 0;
  const isAtEnd = currentSet === videos.length - 1;
  const hasEverySliderMoved = sliderMoved.current.every((element) => element);

  const updateLocalStorage = useMemo(
    () =>
      debounce((set: number, range: number[], moved: boolean[], onUpdate?: () => void) => {
        localStorage.setItem(localKey, JSON.stringify({ rangeValues: range, sliderMoved: moved }));
        localStorage.setItem('set', set.toString());
        onUpdate?.call(this);
      }, 100),
    [localKey]
  );

  useEffect(() => {
    const localUser = localStorage.getItem('user');

    if (localUser) {
      user.current = localUser;
    } else {
      localStorage.setItem('user', generateSimpleId());
    }

    const local = localStorage.getItem(localKey);
    const localSet = localStorage.getItem('set');

    if (local) {
      const parsed = JSON.parse(local);
      setRangeValues(parsed.rangeValues);
      sliderMoved.current = parsed.sliderMoved;
      if (localSet) setCurrentSet(parseInt(localSet, 10));
    } else {
      setRangeValues([50, 50, 50, 50, 50]);
    }
  }, [localKey, currentSet]);

  const updateSliderValue = (i: number, val: string) => {
    sliderMoved.current[i] = true;
    setRangeValues((values) => values!.map((original, position) => (i === position ? parseInt(val, 10) : original)));
    updateLocalStorage(currentSet, rangeValues, sliderMoved.current);
  };

  const startNextSet = () => {
    const newSet = currentSet - 1 < 0 ? 0 : currentSet - 1;
    updateLocalStorage(newSet, rangeValues, sliderMoved.current, () => setCurrentSet(newSet));
  };

  const startPrevSet = () => {
    const newSet = currentSet + 1 > videos.length - 1 ? videos.length - 1 : currentSet + 1;
    updateLocalStorage(newSet, rangeValues, sliderMoved.current, () => setCurrentSet(newSet));
  };

  const playVideo = (id: string) => {
    fetch('/player', { method: 'POST', body: JSON.stringify({ file: id }) });
  };

  return (
    <div className='flex flex-col gap-10 items-center'>
      <div className='w-96 h-96 rotate-[270deg] grid grid-rows-5 grid-cols-[1fr_5fr_1fr] gap-x-5 gap-y-10 items-center justify-center'>
        {videos[currentSet].map((id, index) => {
          return (
            <Fragment key={id}>
              <PlayButton className={`row-start-${index + 1} col-start-3`} onClick={() => playVideo(id)} />
              <VerticalSlider
                className={`row-start-${index + 1} col-start-2`}
                value={rangeValues![index]}
                onChange={(e) => updateSliderValue(index, e.currentTarget.value)}
              />
              <RatingDisplay className={`row-start-${index + 1} col-start-1`} value={rangeValues![index]} />
            </Fragment>
          );
        })}
      </div>

      <div className='flex gap-5'>
        <IconButton icon='first_page' onClick={startNextSet} disabled={isAtStart} />
        <IconButton icon='last_page' onClick={startPrevSet} disabled={isAtEnd || !hasEverySliderMoved} />
      </div>
    </div>
  );
};
