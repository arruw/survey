
interface IPSQIResponse {
  q01: number
  q02: number
  q03: number
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

interface IPSQIScore {
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
  q01: 0,
  q02: 0,
  q03: 0,
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
  var c4 = 0;
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

export const castSurveyData = (obj: any): any => {
  let newObj: any = {};
  for (const key in obj) {
    let value = obj[key];
    
    if (value instanceof Object) {
      value = castSurveyData(value);
    } else if (value != null && !isNaN(value)) {
      value = +value;
    }

    newObj[key] = value;
  }
  return newObj;
};