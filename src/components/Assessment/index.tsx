import React, { useContext, useEffect } from 'react';
import metadataCollection, { SurveyId } from './metadata';
import * as Survey from 'survey-react';
import { useLocalStorage } from '@rehooks/local-storage';
import { RouteComponentProps, navigate } from "@reach/router"
import { FirebaseContext } from '../Firebase'
import { castSurveyData } from './utils';

import "survey-react/survey.css";
import "jquery-bar-rating/dist/themes/bars-movie.css";

import $ from "jquery";
import "jquery-bar-rating";
import './assessment.scss'

//@ts-ignore
import * as widgets from "surveyjs-widgets";

//@ts-ignore
window["$"] = window["jQuery"] = $;

widgets.jquerybarrating(Survey, $);

interface IAssessmetProps {
  surveyId: SurveyId
};

const Assessment = (props: RouteComponentProps<IAssessmetProps>) => {
  if (!props.surveyId) throw new Error('SurveyId not set.');

  const firebase = useContext(FirebaseContext);
  const [scores, setScores] = useLocalStorage<any>('scores', { psqi: null, dass: null, leafq: null });
  const [_, setShowThankYou] = useLocalStorage<boolean>('showThankYou', false);

  const metadata = metadataCollection[props.surveyId];

  if (!metadata.enabled || (scores[metadata.id] && process.env.NODE_ENV) === 'production') navigate(`/about/${metadata.id}`);

  const onComplete = (survey: Survey.SurveyModel) => {
    const response = {
      ...castSurveyData(survey.data),
      scoring: metadata.scorer<any, any>(survey.data)
    };
  
    console.log(response);
  
    firebase.saveSurveyResponse(metadata.id, response)
      .then(() => console.log(`Saved assessment ${metadata.id}.`))
      .catch((error: Error) => console.log(error))
      .finally(() => {
        setScores({...scores, psqi: response?.scoring?.total ?? 0});
        setShowThankYou(true);
        firebase.logEvent('assessment_completed', {
          surveyId: metadata.id
        });
        navigate(`/about/${metadata.id}`);
      });
  };

  return (
    <Survey.Survey
      json={metadata.questions}
      onComplete={onComplete}
      showCompletedPage={false} />
  );
};

export default Assessment;