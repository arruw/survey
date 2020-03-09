import React from 'react';
import { RouteComponentProps, Router } from "@reach/router"
import { Container, Row, Col, Alert } from 'reactstrap';
import { useLocalStorage } from '@rehooks/local-storage';
import QuestionerCard from '../Widgets/questionerCard';
import { PSQIAbout, DASSAbout, LEAFQAbout } from '../Assessment';

const Home = (props: RouteComponentProps) => {
  const [scores] = useLocalStorage<any>('scores', { psqi: null, dass: null, leafq: null });
  const [showThankYou, setShowThankYou] = useLocalStorage<boolean>('showThankYou', false);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Self assessment questioners</h1>
        </Col>
      </Row>
      { showThankYou &&
      <Row>
        <Col>
          <Alert color="success" isOpen={showThankYou} toggle={() => setShowThankYou(false)}>Thank you for your time!</Alert>
        </Col>
      </Row> }
      <Row>
        <Col>
          <QuestionerCard
            assessmentLink="/assessment/psqi"
            aboutLink="/assessment/psqi/about"
            title="PSQI"
            text="Pittsburg Sleep Quality Index"
            maxScore={21}
            lastScore={scores.psqi} />
        </Col>
        <Col>
          <QuestionerCard
            assessmentLink="/assessment/dass"
            aboutLink="/assessment/dass/about"
            title="DASS"
            text="..."
            maxScore={21}
            lastScore={scores.dass} />
        </Col>
        <Col>
          <QuestionerCard
            assessmentLink="/assessment/leafq"
            aboutLink="/assessment/leafq/about"
            title="LEAF-Q"
            text="The low energy availability in females questionnaire (LEAF –Q), focuses on physiological symptoms of insufficient energy intake."
            maxScore={21}
            lastScore={scores.leafq} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Router>
            <PSQIAbout path="/assessment/psqi/about" />
            <DASSAbout path="/assessment/dass/about" />
            <LEAFQAbout path="/assessment/leafq/about" />
          </Router>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;