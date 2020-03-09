import psqi, { IPSQIResponse, IPSQIScore } from './psqi';

it ('scoring best', () => {
  expect(psqi.calculateScore(responseBest)).toEqual(scoringBest);
});

it ('scoring worst', () => {
  expect(psqi.calculateScore(responseWorst)).toEqual(scoringWorst);
});

it ('hoursInBed', () => {
  expect(psqi.hoursInBed('22:00', '06:00')).toEqual(8);
  expect(psqi.hoursInBed('22:30', '06:30')).toEqual(8);
  expect(psqi.hoursInBed('22:30', '06:00')).toEqual(7.5);
  expect(psqi.hoursInBed('22:00', '06:30')).toEqual(8.5);
  expect(psqi.hoursInBed('02:00', '05:00')).toEqual(3);
  expect(psqi.hoursInBed('02:00', '02:00')).toEqual(24);
  expect(psqi.hoursInBed('00:00', '02:00')).toEqual(2);
  expect(psqi.hoursInBed('23:30', '02:00')).toEqual(2.5);
});

it ('c4scorer', () => {
  expect(psqi.c4scorer((7-(+3)) / 8)).toEqual(3);
});

const responseBest: IPSQIResponse = {
  q01: '22:00',
  q02: 0,
  q03: '6:00',
  q04: 0,

  q05: {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
  },

  q06: 0,
  q07: 0,
  q08: 0,
  q09: 0,
};

const scoringBest: IPSQIScore = {
  c1: 0,
  c2: 0,
  c3: 0,
  c4: 0,
  c5: 0,
  c6: 0,
  c7: 0,
  total: 0
}

const responseWorst: IPSQIResponse = {
  q01: '23:00',
  q02: 3,
  q03: '06:00',
  q04: 3,

  q05: {
    a: 3,
    b: 3,
    c: 3,
    d: 3,
    e: 3,
    f: 3,
    g: 3,
    h: 3,
    i: 3,
    j: 3,
  },

  q06: 3,
  q07: 3,
  q08: 3,
  q09: 3,
};

const scoringWorst: IPSQIScore = {
  c1: 3,
  c2: 3,
  c3: 3,
  c4: 3,
  c5: 3,
  c6: 3,
  c7: 3,
  total: 21
}

export const tests = null;