
export interface IPSQIResponse {
  q01: string
  q02: number
  q03: string
  q04: number

  q05: {
    a: number
    b: number
    c: number
    d: number
    e: number
    f: number
    g: number
    h: number
    i: number
    j: number
  }

  q06: number
  q07: number
  q08: number
  q09: number
};

export interface IPSQIScore {
    c1: number
    c2: number
    c3: number
    c4: number
    c5: number
    c6: number
    c7: number
    total: number
}

const defaultResponse: IPSQIResponse = {
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

export const calculateScore = (response: IPSQIResponse): IPSQIScore => {
  response.q05 = {...defaultResponse.q05, ...response.q05}
  response = {...defaultResponse, ...response};

  var c1 = +response.q09;
  var c2 = Math.ceil((
      (+response.q02) +
      (+response.q05.a)
    ) / 2);
  var c3 = +response.q04;
  var c4 = c4scorer((7-(+response.q04)) / hoursInBed(response.q01, response.q03));
  var c5 = Math.ceil((
      (+response.q05.b) +
      (+response.q05.c) +
      (+response.q05.d) +
      (+response.q05.e) +
      (+response.q05.f) +
      (+response.q05.g) +
      (+response.q05.h) +
      (+response.q05.i) +
      (+response.q05.j)
    ) / 9);
  var c6 = +response.q06;
  var c7 = Math.ceil((
      (+response.q07) +
      (+response.q08)
    ) / 2);

  return {
    c1: c1,
    c2: c2,
    c3: c3,
    c4: c4,
    c5: c5,
    c6: c6,
    c7: c7,
    total: c1 + c2 + c3 + c4 + c5 + c6 + c7,
  };
};

export const hoursInBed = (q01: string, q03: string): number => {
  const bedIn = q01.split(':').map(x => +x);
  const bedOut = q03.split(':').map(x => +x);

  let totlaHours = 0;
  let hour = bedIn[0];
  while(hour % 24 !== bedOut[0]) {
    hour++;
    totlaHours++;
  }
  if (bedIn[0] === bedOut[0]) {
    totlaHours = 24;
  }

  if (bedIn[1]  === 30) totlaHours -= 0.5;
  if (bedOut[1] === 30) totlaHours += 0.5;

  return totlaHours;
}

export const c4scorer = (value: number) => {
  if (0.85 <= value)                  return 0;
  if (0.75 <= value && value < 0.85)  return 1;
  if (0.65 <= value && value < 0.75)  return 2;
  return 3;
}