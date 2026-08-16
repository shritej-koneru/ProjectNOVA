export interface PaletteDef {
  name: string;
  stops: string[];
}

export const palettes: PaletteDef[] = [
  {
    name: 'Purple Navy',
    stops: [
      '0 0% 92%',
      '249 47% 85%',
      '265 17% 46%',
      '221 30% 27%',
      '197 47% 18%',
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
