import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css'

interface ModalProps {
    children: ReactNode;
}

const overlay = document.getElementById("overlays")!;

const Modal = ({children}:ModalProps) => {
    const content = <div className={classes.backdrop}>
            <div className={classes.modal}>
                {children}
            </div>
        </div>;
    return createPortal(content, overlay);
}

export default Modal;