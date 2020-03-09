import React, { useContext, useEffect } from 'react';
import questions from './questions';
import * as Survey from 'survey-react';
import { useLocalStorage } from '@rehooks/local-storage';
import { RouteComponentProps, navigate } from "@reach/router"
import { FirebaseContext } from '../../Firebase'
import { calculateScore } from './scoring';
import { castSurveyData } from '../utils';

import "survey-react/survey.css";
import "jquery-bar-rating/dist/themes/bars-movie.css";

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
  const [_, setShowThankYou] = useLocalStorage<boolean>('showThankYou', false);

  useEffect(() => {
    if (scores.psqi && process.env.NODE_ENV === 'production') navigate('/assessment/psqi/about');
  });

  const onComplete = (survey: Survey.SurveyModel) => {
    let response = castSurveyData(survey.data);
    response.scoring = calculateScore(survey.data);
  
    console.log(response);
  
    firebase.saveSurveyResponse('psqi', response)
      .then(() => console.log('Saved.'))
      .catch((error: Error) => console.log(error))
      .finally(() => {
        setScores({...scores, psqi: response?.scoring?.total ?? 0});
        setShowThankYou(true);
        navigate('/assessment/psqi/about');
      });
  };

  return (
    <Survey.Survey
      json={questions}
      onComplete={onComplete}
      showCompletedPage={false} />
  );
}

export default PSQI;