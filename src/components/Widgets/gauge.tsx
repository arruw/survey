import React from 'react';
import { Progress, Badge } from 'reactstrap';
import './gauge.scss';

type GaugeProps = {
  lastScore: number | null
  maxScore: number
  color: string
};

const Gauge = (props: GaugeProps) => {
  return (
    <div className="gauge">
      {/* <div className="text-center">
        <h6>YOUR SCORE</h6>
      </div> */}
      <div className="scale-annotations">
        <div className="annotation">
          BEST
        </div>
        <div className="score">
          YOUR SCORE <br />
          <Badge>{props.lastScore ?? '/'}</Badge>
        </div>
        <div className="annotation">
          WORST
        </div>
      </div>
      <div className="scale">
        <div className="value">0</div>
        <Progress max={props.maxScore} value={props.lastScore ?? 0} color={props.color} />
        <div className="value">{props.maxScore}</div>
      </div>
    </div>
  );
}

export default Gauge;