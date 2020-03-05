import React, { useContext } from 'react';
import questions from './questions';
import * as Survey from 'survey-react';
import { useLocalStorage } from '@rehooks/local-storage';
import { RouteComponentProps, redirectTo } from "@reach/router"
import { FirebaseContext } from '../../Firebase'
import { calculateScore } from './utils';



const PSQI = (props: RouteComponentProps) => {
  const firebase = useContext(FirebaseContext);
  const [scores, setScores] = useLocalStorage<any>('scores', { psqi: null, dass: null, leafq: null });

  const onComplete = (survey: Survey.SurveyModel) => {
    survey.sendResult('22847fab-5387-43d8-98b7-0983d1bbee1b');
    
    let response = survey.data;
    response.timestamp = new Date();
    response.scoring = calculateScore(survey.data);
  
    console.log(response);
  
    setScores({...scores, psqi: response?.scoring?.total ?? 0});

    firebase.saveResponse(response)
      .then((docRef: any) => {
        console.log('Saved response with id: ' + docRef);
      })
      .catch((error: Error) => {
        console.log(error);
      });
    
    redirectTo('/');
  };

  Survey.StylesManager.applyTheme("bootstrap");

  return (
    <Survey.Survey
      json={questions}
      onComplete={onComplete}
      showCompletedPage={false} />
  );
}

export default PSQI;