import psqiQuestions from './questions/psqi';
import dassQuestions from './questions/dass';
import leafqQuestions from './questions/leafq';
import psqiScorer from './scorers/psqi';
import dassScorer from './scorers/dass';
import psqiGauge from './gauges/psqi';
import dassGauge from './gauges/dass';

const metadataCollection: SurveyMetadataCollection = {
  psqi: {
    id: 'psqi',
    title: 'PSQI',
    description: 'Pittsburg Sleep Quality Index',
    gaugeComponent: psqiGauge,
    questions: psqiQuestions,
    scorer: psqiScorer.calculateScore,
    enabled: true,
  } as ISurveyMetadata,
  dass: {
    id: 'dass',
    title: 'DASS',
    description: '...',
    gaugeComponent: dassGauge,
    questions: dassQuestions,
    scorer: dassScorer.calculateScore,
    enabled: true,
  } as ISurveyMetadata,
  leafq: {
    id: 'leafq',
    title: 'LEAF-Q',
    description: 'The low energy availability in females questionnaire (LEAF –Q), focuses on physiological symptoms of insufficient energy intake.',
    // gaugeComponent: null,
    questions: leafqQuestions,
    enabled: false,
  } as ISurveyMetadata
};

export interface ISurveyMetadata {
  id: SurveyId,
  title: string,
  description: string,
  gaugeComponent: GaugeComponent,
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

export type SurveyScoreCollection = { [surveyId in SurveyId]: any; };

export type Scorer = <TResponse, TScoring>(response: TResponse) => TScoring

export type GaugeComponent = <TProps>(props: TProps) => JSX.Element

export default metadataCollection;