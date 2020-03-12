export interface IDASSResponse {
  q01: {
    s01: number
    a02: number
    d03: number
    a04: number
    d05: number
    s06: number
    a07: number
    s08: number
    a09: number
    d10: number
    s11: number
    s12: number
    d13: number
    s14: number
    a15: number
    d16: number
    d17: number
    s18: number
    a19: number
    a20: number
    d21: number
  }
};

export interface IDASSScore {
  depression: number
  anxiety: number
  stress: number
}

const calculateScore = (response: IDASSResponse): IDASSScore => {
  const scores = {
    d: 0,
    s: 0,
    a: 0,
  };

  for (const key in response.q01) {
    const [section] = key.split('');
    console.log(key, section);
    //@ts-ignore
    scores[section] += (+response.q01[key]);
  }

  return {
    depression: scores.d,
    anxiety: scores.a,
    stress: scores.a
  };
};

export default {
  calculateScore
};