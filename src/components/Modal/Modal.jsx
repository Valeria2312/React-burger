import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import StyleModal from "./Modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

export const Modal = ({close, children}) => {

    const closeModal = () => {
        close();
    };

    function closeByEsc(evt) {
        if (evt.key === "Escape") {
            closeModal();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", closeByEsc);
        return () => {
            document.removeEventListener("keydown", closeByEsc);
        };
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className={`${StyleModal.container}`}>
                <button className={`${StyleModal.btn}`} onClickCapture={closeModal}>
                    <CloseIcon type="primary"/>
                </button>
                {children}
            </div>
            <ModalOverlay close={closeModal}/>
        </>,
        modalRoot
    );
}

Modal.propTypes = {
    close: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
}