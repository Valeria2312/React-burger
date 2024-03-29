import React, {useEffect, ReactNode} from "react";
import ReactDOM from "react-dom";
import StyleModal from "./Modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("react-modals")as HTMLElement;

type TElementProps = {
    close?: () => void;
    children: ReactNode;
};

export const Modal = ({close, children}: TElementProps) => {
    const closeModal = () => {
        if (close) {
            close();
        }
    };

    function closeByEsc(evt: KeyboardEvent) {
        if (evt.key === "Escape") {
            if (close) {
                close();
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", closeByEsc);
        return () => {
            document.removeEventListener("keydown", closeByEsc);
        };
    }, [closeByEsc]);

    return ReactDOM.createPortal(
        <>
            <div className={`${StyleModal.container}`}>
                <button className={`${StyleModal.btn}`} onClickCapture={closeModal} data-id="modal-close-icon">
                    <CloseIcon type="primary"/>
                </button>
                {children}
            </div>
            <ModalOverlay close={closeModal}/>
        </>,
        modalRoot
    );
}