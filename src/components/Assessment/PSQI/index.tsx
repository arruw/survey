import React, { useContext, useEffect } from 'react';
import questions from './questions';
import * as Survey from 'survey-react';
import { useLocalStorage } from '@rehooks/local-storage';
import { RouteComponentProps, navigate } from "@reach/router"
import { FirebaseContext } from '../../Firebase'
import { calculateScore, castSurveyData } from './utils';
// import 'jquery-bar-rating/dist/themes/bars-movie.css'
// import * from 'jquery-bar-rating';

import "survey-react/survey.css";
import "jquery-bar-rating/dist/themes/bars-movie.css";
// import "jquery-bar-rating/dist/themes/bars-1to10.css";

import $ from "jquery";
import "jquery-bar-rating";
import './br-widget-overrides.scss'

//@ts-ignore
import * as widgets from "surveyjs-widgets";

//@ts-ignore
window["$"] = window["jQuery"] = $;

widgets.jquerybarrating(Survey, $);

const PSQI = (props: RouteComponentProps) => {
  const firebase = useContext(FirebaseContext);
  const [scores, setScores] = useLocalStorage<any>('scores', { psqi: null, dass: null, leafq: null });

  useEffect(() => {
    if (scores.psqi) navigate('/');
  });

  const onComplete = (survey: Survey.SurveyModel) => {
    // survey.sendResult('22847fab-5387-43d8-98b7-0983d1bbee1b');
    
    let response = castSurveyData(survey.data);
    response.timestamp = new Date();
    response.scoring = calculateScore(survey.data);
  
    console.log(response);
  
    firebase.saveResponse(response)
      .then((docRef: any) => {
        console.log('Saved response with id: ' + docRef);
      })
      .catch((error: Error) => {
        console.log(error);
      })
      .finally(() => {
        setScores({...scores, psqi: response?.scoring?.total ?? 0});
      });
 
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