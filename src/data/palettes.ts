export interface PaletteDef {
  name: string;
  stops: string[];
}

export const palettes: PaletteDef[] = [
  {
    name: 'Deep Ocean',
    stops: [
      '222 40% 22%',
      '213 52% 30%',
      '200 50% 33%',
      '188 42% 32%',
      '172 38% 32%',
    ],
  },
  {
    name: 'Warm Taupe',
    stops: [
      '342 12% 27%',
      '347 4% 41%',
      '60 6% 60%',
      '83 28% 77%',
      '0 13% 87%',
    ],
  },
  {
    name: 'Dusty Rose',
    stops: [
      '332 21% 37%',
      '225 3% 75%',
      '150 1% 34%',
      '214 3% 56%',
      '15 69% 87%',
    ],
  },
];
