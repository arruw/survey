import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { SurveyId } from '../Assessment/metadata';

const Download = (props: RouteComponentProps) => {
  const storageBaseUrl = process.env.REACT_APP_STORAGE_BASE_URL;

  return (
    <div>
      <h3>Download responses:</h3>
      <ul>
        <li><a href={`${storageBaseUrl}/${SurveyId.PSQI}.csv`}>psqi.csv</a></li>
        <li><a href={`${storageBaseUrl}/${SurveyId.DASS}.csv`}>dass.csv</a></li>
        <li><a href={`${storageBaseUrl}/${SurveyId.LEAFQ}.csv`}>leafq.csv</a></li>
      </ul>
    </div>
  );
};

export default Download;
