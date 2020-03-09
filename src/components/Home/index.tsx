import React from 'react';
import { RouteComponentProps, Router } from "@reach/router"
import { Container, Row, Col, Alert } from 'reactstrap';
import { useLocalStorage } from '@rehooks/local-storage';
import QuestionerCard from '../Widgets/questionerCard';
import About from '../About';
import { SurveyId } from '../Assessment/metadata';

const Home = (props: RouteComponentProps) => {
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
          <QuestionerCard surveyId={SurveyId.PSQI} />
        </Col>
        <Col>
          <QuestionerCard surveyId={SurveyId.DASS} />
        </Col>
        <Col>
          <QuestionerCard surveyId={SurveyId.LEAFQ} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Router>
            <About path="/about/:surveyId" />
          </Router>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;