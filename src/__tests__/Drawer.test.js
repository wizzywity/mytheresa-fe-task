import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import Drawer from "../components/Drawer";

describe('Testing Header component',  () => {
    const onClose = jest.fn();
    it('should render drawer when open is true and close when clicking backdrop', async () => {
        render(
            <Drawer isOpen onClose={onClose}>
                <p>Testing drawer</p>
            </Drawer>
        );
        const drawer = screen.getByTestId('drawer')
        expect(drawer).toBeInTheDocument()
        expect(screen.getByText('Testing drawer')).toBeInTheDocument()
        const backdrop = screen.getByTestId('backdrop')
        fireEvent.click(backdrop)
        expect(onClose).toHaveBeenCalled()
    })
})