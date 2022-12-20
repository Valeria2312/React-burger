import React from "react";
import StyleModalOverlay from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

export const ModalOverlay = (props) => {

    const closeModal = (e) => {
        if (e.target.id === "overlay") {
            props.close();
        }
    };

    return (
        <div className={`${StyleModalOverlay.overlay}`} onClickCapture={closeModal} id="overlay"></div>
    )
}
ModalOverlay.propTypes = {
    props: PropTypes.func,
}