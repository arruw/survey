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