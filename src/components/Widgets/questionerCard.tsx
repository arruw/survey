import React, { useContext } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from '@reach/router';
import { Gauge } from '.';
import './questionerCard.scss';
import { FirebaseContext } from '../Firebase';
import metadataCollection, { SurveyId } from '../Assessment/metadata';
import useLocalStorage from '@rehooks/local-storage';

const QuestionerCard = (props: QuestionerCardProps) => {
  const [scores] = useLocalStorage<any>('scores', { psqi: null, dass: null, leafq: null });
  const firebase = useContext(FirebaseContext);
  const metadata = metadataCollection[props.surveyId];
  const lastScore = scores[metadata.id];

  return (
    <Card style={{height: '100%'}}>
      <CardBody style={{height: '100%', display: 'flex', flexFlow: 'column nowrap'}}>
        <CardTitle>
          <div>{metadata.title}</div>
          <div><Link to={`/about/${metadata.id}`} className={'btn btn-outline-secondary btn-sm rounded-circle'}>?</Link></div>
        </CardTitle>
        <CardText style={{flexGrow: 2}}>{metadata.description}</CardText>
        { lastScore && 
           <Gauge lastScore={lastScore} maxScore={metadata.maxScore} color={'info'}/> }
        { (!lastScore || process.env.NODE_ENV === 'development') && 
          <Link to={`/assessment/${metadata.id}`} className={'btn btn-outline-primary ' + (!metadata.enabled ? 'disabled' : '')} onClick={() => {
            firebase.logEvent('assessment_started', {
              surveyId: metadata.id
            });
          }}>Get assessment</Link> }
      </CardBody>
    </Card>
  );
}

export type QuestionerCardProps = {
  surveyId: SurveyId
}

export default QuestionerCard;