import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const LEAFQAbout = (props: RouteComponentProps) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>LEAF-Q</CardTitle>
        <CardText>Kratek opis, barvna lestvica, ...</CardText>
      </CardBody>
    </Card>
  );
};

export default LEAFQAbout;
