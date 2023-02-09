import React, {SyntheticEvent} from "react";
import StyleModalOverlay from "./ModalOverlay.module.css";

type TElementProps = {
    close: () => void;
};

export const ModalOverlay = (props: TElementProps) => {

    const closeModal = (e: SyntheticEvent) => {
        if ((e.target as HTMLDivElement).id === "overlay") {
            props.close();
        }
    };

    return (
        <div className={`${StyleModalOverlay.overlay}`} onClickCapture={closeModal} id="overlay"></div>
    )
}