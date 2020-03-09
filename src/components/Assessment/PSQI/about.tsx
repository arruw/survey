import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const PSQIAbout = (props: RouteComponentProps) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>PSQI - Pittsburgh Sleep Quality Index</CardTitle>
        <CardText>Kratek opis, barvna lestvica, ...</CardText>
      </CardBody>
    </Card>
  );
};

export default PSQIAbout;
