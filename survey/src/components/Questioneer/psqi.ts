interface IPSQIResponse {
  q1: number
  q2: number
  q3: number
  q4: number

  q5: {
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

  q6: number
  q7: number
  q8: number
  q9: number
};

const defaultResponse: IPSQIResponse = {
  q1: 0,
  q2: 0,
  q3: 0,
  q4: 0,

  q5: {
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

  q6: 0,
  q7: 0,
  q8: 0,
  q9: 0,
};

class PSQI {
  static calculateScore(response: IPSQIResponse) {
    response.q5 = {...defaultResponse.q5, ...response.q5}
    response = {...defaultResponse, ...response};

    var c1 = +response.q9;
    var c2 = Math.ceil((
        (+response.q2) +
        (+response.q5.a)
      ) / 2);
    var c3 = +response.q4;
    var c4 = 0;
    var c5 = Math.ceil((
        (+response.q5.b) +
        (+response.q5.c) +
        (+response.q5.d) +
        (+response.q5.e) +
        (+response.q5.f) +
        (+response.q5.g) +
        (+response.q5.h) +
        (+response.q5.i) +
        (+response.q5.j)
      ) / 9);
    var c6 = +response.q6;
    var c7 = Math.ceil((
        (+response.q7) +
        (+response.q8)
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
  }
}

export default PSQI;