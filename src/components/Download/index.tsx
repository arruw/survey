import React from 'react';
import { RouteComponentProps } from '@reach/router';

const Download = (props: RouteComponentProps) => {
  return (
    <div>
      <h3>Download responses:</h3>
      <ul>
        <li><a href="https://storage.cloud.google.com/development-269916-shared/surveys/psqi.csv">psqi.csv</a></li>
        <li><a href="https://storage.cloud.google.com/development-269916-shared/surveys/dass.csv">dass.csv</a></li>
        <li><a href="https://storage.cloud.google.com/development-269916-shared/surveys/leafq.csv">leafq.csv</a></li>
      </ul>
    </div>
  );
};

export default Download;
