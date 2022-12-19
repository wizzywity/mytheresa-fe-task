import React from "react";
import {render, screen} from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home";
import {act} from "react-dom/test-utils";

jest.mock("../service",() => ({
    __esModule: true,
    apiClient: {
        get: () => Promise.resolve({
            data: {
                results: []
            }
        })
    },
}));

const configuration = {
    secure_base_url: "https://testimage/"
}

jest.mock("../context/AppProvider",() => ({
    __esModule: true,
    useAppContext: () => {
        return {
            configuration,
        };
    },
}));

describe('Testing Home page',  () => {
    it('should render home page with all category of carousels', async () => {
        const promise = Promise.resolve()
        render(
            <Router>
                <Home />
            </Router>
        );
        await act(async () => {
            await promise
        })

        expect(screen.getByText('Now Playing')).toBeInTheDocument()
        expect(screen.getByText('Top Rated Movies')).toBeInTheDocument()
        expect(screen.getByText('Popular Movies')).toBeInTheDocument()
    })
})