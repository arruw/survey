import React from 'react';
import './dass.scss';

type GaugeProps = {
  depression: number
  anxiety: number
  stress: number
} | null;

const Gauge = (props: GaugeProps) => {
  return (
    <div className="dass-gauge">
      <div>YOUR SCORE</div>
      <div className="scores">
        <div className="section">
          <div className="label">Depression</div>
          <div className="value">{props?.depression ?? '/'}</div>
        </div>
        <div className="section">
          <div className="label">Anxiety</div>
          <div className="value">{props?.anxiety ?? '/'}</div>
        </div>
        <div className="section">
          <div className="label">Stress</div>
          <div className="value">{props?.stress ?? '/'}</div>
        </div>
      </div>
    </div>
  );
}

export default Gauge;