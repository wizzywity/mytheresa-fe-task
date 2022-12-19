import React from "react";
import { render, screen} from '@testing-library/react';
import Header from "../components/Header";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../components/Drawer", () => () => {
    return <mock-drawer data-testid="drawer"/>;
});
jest.mock("../components/Wishlist", () => () => {
    return <mock-wishlist data-testid="wishlist"/>;
});

describe('Testing Header component',  () => {

    it('should render with header component', async () => {
        render(
            <Router>
                <Header />
            </Router>
            ,
        );

        expect(screen.getByText("MYTHERESA")).toBeInTheDocument()
        expect(screen.getByRole("button")).toBeInTheDocument()
        expect(screen.getByText("Wishlist")).toBeInTheDocument()
    })
})
