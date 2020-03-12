import React from 'react';
import { Progress, Badge } from 'reactstrap';
import './psqi.scss';

type GaugeProps = {
  total: number
} | null;

const Gauge = (props: GaugeProps) => {
  return (
    <div className="pass-gauge">
      <div className="scale-annotations">
        <div className="annotation">
          BEST
        </div>
        <div className="score">
          YOUR SCORE<br />
          <Badge>{props?.total ?? '/'}</Badge>
        </div>
        <div className="annotation">
          WORST
        </div>
      </div>
      <div className="scale">
        <div className="value">0</div>
        <Progress max={21} value={props?.total ?? 0} />
        <div className="value">21</div>
      </div>
    </div>
  );
}

export default Gauge;