import React from 'react';
import { Router, RouteComponentProps, Link, redirectTo } from "@reach/router"

import { Container, Row, Col, Progress } from 'reactstrap';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { useLocalStorage } from '@rehooks/local-storage';
import Gauge from '../Widgets/gauge'

const Home = (props: RouteComponentProps) => {
  const [scores] = useLocalStorage<any>('scores', { psqi: null, dass: null, leafq: null });

  return (
    <Container>
      <Row>
        <Col>
          <h1>Self assessment questioners</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <QuestionerCard
            linkTo="/assessment/psqi"
            title="PSQI"
            text="Pittsburg Sleep Quality Index"
            maxScore={21}
            lastScore={scores.psqi} />
        </Col>
        <Col>
          <QuestionerCard
            linkTo="/assessment/dass"
            title="DASS"
            text="..."
            maxScore={21}
            lastScore={scores.dass} />
        </Col>
        <Col>
          <QuestionerCard
            linkTo="/assessment/leafq"
            title="LEAF-Q"
            text="The low energy availability in females questionnaire (LEAF –Q), focuses on physiological symptoms of insufficient energy intake."
            maxScore={21}
            lastScore={scores.leafq} />
        </Col>
      </Row>
    </Container>
  );
};

type QuestionerCardProps = {
  title: string
  text: string
  linkTo: string
  lastScore: number | null
  maxScore: number
}

const QuestionerCard = (props: QuestionerCardProps) => {
  return (
    <Card style={{height: '100%'}}>
      <CardBody style={{height: '100%', display: 'flex', flexFlow: 'column nowrap'}}>
        <CardTitle>{props.title}</CardTitle>
        <CardText style={{flexGrow: 2}}>{props.text}</CardText>
        <Gauge lastScore={props.lastScore} maxScore={props.maxScore} color={'info'}/>
        <Link to={props.linkTo} className="btn btn-primary">Get assessment</Link>
      </CardBody>
    </Card>
  );
}

export default Home;