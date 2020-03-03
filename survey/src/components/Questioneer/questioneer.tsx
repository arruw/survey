import React from 'react';
import  { FirebaseContext } from '../Firebase';
import questions from './questions';
import * as Survey from 'survey-react';
import { SSL_OP_PKCS1_CHECK_2 } from 'constants';
import PSQI from './psqi';

Survey.StylesManager.applyTheme("bootstrap");

export default class Questioneer extends React.Component {
  static contextType = FirebaseContext;
  context!: React.ContextType<typeof FirebaseContext>;

  constructor() {
    super({});

    this.onComplete = this.onComplete.bind(this);
  }

  render() {
    return (
      <div>
        <Survey.Survey json={questions} onComplete={this.onComplete}/>
      </div>
    );
  }

  onComplete(survey: Survey.SurveyModel, options: any) {
    survey.sendResult('22847fab-5387-43d8-98b7-0983d1bbee1b');

    var response = survey.data;
    response.timestamp = new Date();
    response.scoring = PSQI.calculateScore(survey.data);

    console.log(response);

    this.context.saveResponse(response)
      .then((docRef: any) => {
        console.log('Saved response with id: ' + docRef);
      })
      .catch((error: Error) => {
        console.log(error);
      });;
  }

}
