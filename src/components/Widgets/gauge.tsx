import React from 'react';
import { Progress, Badge } from 'reactstrap';


// type GaugeProps = {
//   lastScore: number | null
//   cmap: {
//     to: number
//     color: string
//   }[]
// };

// const Gauge = (props: GaugeProps) => {
//   let bars = [];
//   let total = props.cmap.reduce((agg, x) => agg + x.to, 0);

//   let prev = 0;
//   for (const bar of props.cmap) {
//     if (!props.lastScore || bar.to < props.lastScore) continue;
//     bars.push(<Progress bar color={bar.color} value={bar.to-prev} max={bar.to-prev} />)
//     prev = bar.to;
//   }

//   return (
//     <div style={{padding: '5px'}}>
//       <div className="text-center">
//         <Badge  color="secondary">{props.lastScore ?? '/'}</Badge>
//       </div>
//       <Progress multi max={total}>{bars}</Progress>
//     </div>
//   );
// }

type GaugeProps = {
  lastScore: number | null
  maxScore: number
  color: string
};

const Gauge = (props: GaugeProps) => {
  return (
    <div style={{padding: '5px'}}>
      <div className="text-center">
        <h6>Your score: <br />
          <Badge  color="secondary">{props.lastScore ?? '/'}</Badge>
        </h6>
      </div>
      <Progress max={props.maxScore} value={props.lastScore ?? 0} color={props.color} />
    </div>
  );
}

export default Gauge;