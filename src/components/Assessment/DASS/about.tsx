import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const DASSAbout = (props: RouteComponentProps) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>DASS</CardTitle>
        <CardText>Kratek opis, barvna lestvica, ...</CardText>
      </CardBody>
    </Card>
  );
};

export default DASSAbout;
