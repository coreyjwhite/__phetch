/**
 * @category Components
 * @module ChartTooltip
 */

import Tooltip from "components/containers/Tooltip";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledTooltip = styled.div`
  border-radius: ${s.borderRadius};
  font-size: 5px;
  padding: 0 0.25rem 0.25rem;
  height: 300px;
  width: 500px;
  box-shadow: ${s.elev2};
  background-color: green;
`;

export default function ChartTooltip(props) {
  return (
    <g style={{ pointerEvents: "none" }}>
      <foreignObject x={props.x} y={props.y} width="150" height="100">
        <StyledTooltip className="tool">
          <p>{props.children}</p>
        </StyledTooltip>
      </foreignObject>
    </g>
  );
}
