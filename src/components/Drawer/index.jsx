import React, { useRef, useEffect, } from 'react';
import cn from 'classnames';
import './style.scss';
import { createPortal } from 'react-dom';

function createPortalRoot() {
    const drawerRoot = document.createElement('div');
    drawerRoot.setAttribute('id', 'drawer-root');

    return drawerRoot;
}

const Drawer = ({ isOpen, children, className, onClose, position = 'left' }) => {
    const portalRootRef =
        useRef(document.getElementById('drawer-root') || createPortalRoot());
    const bodyRef = useRef(document.querySelector('body'));

    // Append portal root on mount
    useEffect(() => {
        bodyRef.current.appendChild(portalRootRef.current);
        const portal = portalRootRef.current;
        const bodyEl = bodyRef.current;

        return () => {
            // Clean up the portal when drawer component unmounts
            portal.remove();
            // Ensure scroll overflow is removed
            bodyEl.style.overflow = '';
        }
    }, []);

    useEffect(() => {
        const updatePageScroll = () => {
            if (isOpen) {
                bodyRef.current.style.overflow = 'hidden';
            } else {
                bodyRef.current.style.overflow = '';
            }
        };

        updatePageScroll();
    }, [isOpen]);

    useEffect(() => {
        const onKeyPress = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        if (isOpen) {
            window.addEventListener('keyup', onKeyPress);
        }

        return () => {
            window.removeEventListener('keyup', onKeyPress);
        }
    }, [isOpen, onClose]);

    return createPortal(
        <div
            aria-hidden={isOpen ? 'false' : 'true'}
            className={cn('drawer-container', {
                open: isOpen,
                className,
            })}
            data-testid="drawer"
        >
            <div
                className={cn('drawer', position)}
                role="dialog"
            >
                {children}
            </div>
            <div className="backdrop" onClick={onClose} data-testid="backdrop"/>
        </div>
        ,
        portalRootRef.current,
    );
}

export default Drawer;
