import React from "react";
import { connect } from "react-redux";


import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal"
import AddProfileModal from "./AddProfileModal"


const modalLookup = {
  LoginModal,
  SignUpModal,
  AddProfileModal
};

const mapState = state => ({
  currentModal: state.modals
});

const ModalManager = ({ currentModal }) => {
  let renderModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderModal}</span>;
};

export default connect(mapState)(ModalManager);
