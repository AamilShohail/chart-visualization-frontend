import BarChart from "./bar/BarChart";
import MixedChart from "./mix/MixedChart";
import StackChart from "./area/StackChart";
function ChartFactory({ type }) {
  switch (type) {
    case Bar:
      return <BarChart />;
    case Mix:
      return <MixedChart />;
    case Stack:
      return <StackChart />;
    
    default:
      console.error("No Chart type found");
      return null;
  }
}

export default ChartFactory;
export const Bar = "bar"
export const Mix = "mix"
export const Stack = "stack"

