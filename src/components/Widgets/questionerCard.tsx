import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from '@reach/router';
import { Gauge } from '.';
import './questionerCard.scss';

const QuestionerCard = (props: QuestionerCardProps) => {
  return (
    <Card style={{height: '100%'}}>
      <CardBody style={{height: '100%', display: 'flex', flexFlow: 'column nowrap'}}>
        <CardTitle>
          <div>{props.title}</div>
          <div><Link to={props.aboutLink}>?</Link></div>
        </CardTitle>
        <CardText style={{flexGrow: 2}}>{props.text}</CardText>
        { props.lastScore && 
           <Gauge lastScore={props.lastScore} maxScore={props.maxScore} color={'info'}/> }
        { (!props.lastScore || process.env.NODE_ENV === 'development') && 
          <Link to={props.assessmentLink} className="btn btn-primary">Get assessment</Link> }
      </CardBody>
    </Card>
  );
}

type QuestionerCardProps = {
  title: string
  text: string
  assessmentLink: string
  aboutLink: string
  lastScore: number | null
  maxScore: number
}

export default QuestionerCard;