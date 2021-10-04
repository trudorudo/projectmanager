import React, { useEffect } from 'react';
import reactDOM from 'react-dom';
import './modal.scss';

const ModalContainer = document.getElementById('modalRoot');

const ModalElement = document.createElement('div');

const Modal = ({ children, onClose, title }) => {
    useEffect(() => {
        ModalContainer.appendChild(ModalElement)
        return () => {
            ModalContainer.removeChild(ModalElement)
        }
    }, [])

    const content = <div className='modal__container' onClick={onClose}>
        <div className='modal__content' onClick={(evt) => evt.stopPropagation()}>
            <div className='modal__title'>
                <h2>modal</h2>
                <h3>{title}</h3>
                <span onClick={onClose}>X</span>
            </div>
            {children}
        </div>
    </div>

    return reactDOM.createPortal(content, ModalElement);
}

export default Modal;