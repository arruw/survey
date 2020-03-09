import psqiQuestions from './questions/psqi';
import dassQuestions from './questions/dass';
import leafqQuestions from './questions/leafq';
import psqiScorer from './scorers/psqi';

const metadataCollection: SurveyMetadataCollection = {
  psqi: {
    id: 'psqi',
    title: 'PSQI',
    description: 'Pittsburg Sleep Quality Index',
    minScore: 0,
    maxScore: 21,
    questions: psqiQuestions,
    scorer: psqiScorer.calculateScore,
    enabled: true,
  } as ISurveyMetadata,
  dass: {
    id: 'dass',
    title: 'DASS',
    description: '...',
    minScore: 0,
    maxScore: 21,
    questions: dassQuestions,
    enabled: false,
  } as ISurveyMetadata,
  leafq: {
    id: 'leafq',
    title: 'LEAF-Q',
    description: 'The low energy availability in females questionnaire (LEAF –Q), focuses on physiological symptoms of insufficient energy intake.',
    minScore: 0,
    maxScore: 21,
    questions: leafqQuestions,
    enabled: false,
  } as ISurveyMetadata
};

export interface ISurveyMetadata {
  id: SurveyId,
  title: string,
  description: string,
  minScore: number,
  maxScore: number,
  questions: any,
  scorer: Scorer,
  enabled: boolean,
}

export enum SurveyId {
  PSQI = 'psqi',
  DASS = 'dass',
  LEAFQ = 'leafq',
};

export type SurveyMetadataCollection = { [surveyId in SurveyId]: ISurveyMetadata; };

export type Scorer = <TResponse, TScoring>(response: TResponse) => TScoring

export default metadataCollection;