/**
 * @module Modal
 * @category Containers
 * @description A styled react-modal component
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import ReactModal from "react-modal";
import camelize from "libs/camelize";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Column from "components/containers/Column";
import Row from "components/containers/Row";

const StyledModal = styled.div.attrs((props) => ({
  id: `${camelize(props.label)}`,
  className: "modal",
}))`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-flow: column nowrap;
  align-items: space-between;
  justify-content: space-between;
  padding: ${m.sp6};
  background-color: white;
  box-shadow: ${s.elev5};
  color: ${c.gray2};
  @media (min-width: ${m.devMd}) {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: ${s.borderRadius};
  }
`;

const StyledOverlay = styled.div.attrs((props) => ({
  id: `${camelize(props.label)}ModalOverlay`,
  className: "modalOverlay",
}))`
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: hsla(0, 0%, 0%, 0.2);
`;

const ModalHeading = styled.div.attrs((props) => ({
  id: `${camelize(props.label)}ModalHeading`,
  className: "modalHeading",
}))`
  display: flex;
  width: ${m.col12};
  h3 {
    margin: 0 ${m.sp4} 0;
    font-weight: 600;
  }
`;

export default function Modal(props) {
  var label = props.label;
  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      className="modal"
      overlayClassName="modalOverlay"
      overlayElement={(props, contentElement) => (
        <StyledOverlay {...props}>{contentElement}</StyledOverlay>
      )}
      closeTimeoutMS={200}
    >
      <StyledModal
        label={label}
        width={props.width}
        height={props.height}
        htmlOpenClassName="overflow-hidden"
      >
        <Column
          label={`${label} Main`}
          height={m.col12}
          justify="space-between"
        >
          <ModalHeading label={label}>
            <h3>{label}</h3>
          </ModalHeading>
          {props.children}
          <Row label="Modal Buttons" justify="flex-end">
            {props.buttons}
          </Row>
        </Column>
      </StyledModal>
    </ReactModal>
  );
}

Modal.propTypes = {
  buttons: PropTypes.array,
  height: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  width: PropTypes.string,
};

Modal.defaultProps = {
  height: m.sp15,
  width: m.sp17,
};
