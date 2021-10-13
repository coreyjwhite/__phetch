import styled from "styled-components";
import Button from "components/input/Button";
import m from "styles/measures";

const StyledImg = styled.img.attrs((props) => ({
  height: props.imgHeight ? props.imgHeight : "20",
  width: props.imgHeight ? props.imgHeight : "20",
}))``;

const StyledButton = styled(Button)`
  min-width: ${m.sp9};
  min-height: ${m.sp9};
`;

function handleClick(action, target = null) {
  if (action == "print") {
    return toPDF(target);
  }
}

export default function ActionButton(props) {
  return (
    <StyledButton className="tertiary">
      <StyledImg src="/icons/printer-fill.svg" />
    </StyledButton>
  );
}
