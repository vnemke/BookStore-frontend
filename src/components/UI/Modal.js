import { Fragment } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalOvarlay = (props) => {
  return (
    <div className="modal_container">
      <div>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOvarlay>{props.children}</ModalOvarlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
