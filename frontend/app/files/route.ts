/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { readdirSync, statSync } from 'fs';
import path from 'path';

import { NextResponse } from 'next/server';

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const getAllFiles = (dir: string): string[] => {
  return readdirSync(dir).reduce<any>((files, file) => {
    const filePath = path.join(dir, file);
    const isDirectory = statSync(filePath).isDirectory();
    return isDirectory
      ? shuffle([...files, shuffle([...getAllFiles(filePath)])])
      : shuffle([...files, `./${filePath.replaceAll('\\', '/')}`]);
  }, []);
};

export async function GET() {
  return NextResponse.json({ training: getAllFiles('./videos/training'), rating: getAllFiles('./videos/rating') });
}
