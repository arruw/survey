import React from 'react';
import { RouteComponentProps } from '@reach/router';
import metadataCollection, { SurveyId } from '../Assessment/metadata';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

interface IAboutProps {
  surveyId: SurveyId
};

const About = (props: RouteComponentProps<IAboutProps>) => {
  if (!props.surveyId) throw new Error('SurveyId not set.');
  const metadata = metadataCollection[props.surveyId];

  return (
    <Card>
      <CardBody>
        <CardTitle>{metadata.title}</CardTitle>
        <CardText>Short description, color scale legend...</CardText>
      </CardBody>
    </Card>
  );
};

export default About;
