import React from "react";
import {render, screen} from '@testing-library/react';
import Wishlist from "../components/Wishlist";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppContext } from "../context/AppProvider";

jest.mock("../context/AppProvider");

describe('Testing Wishlist component',  () => {
    useAppContext.mockImplementation(() => {
        return {
            wishlist: [],
            configuration: {
                secure_base_url: "https://testimage/"
            }
        };
    });
    const onClose = jest.fn();
    it('should render wishlist with no items', async () => {
        render(
            <Router>
                <Wishlist onClose={onClose}/>
            </Router>
        );
        expect(screen.getByText('Wishlist')).toBeInTheDocument()
        expect(screen.getByText('No movies selected')).toBeInTheDocument()
    })
    it('should render wishlist with items', async () => {
        const configuration = {
            secure_base_url: "https://testimage/"
        }
        const data = [
            {
                id: 1,
                poster_path: "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
                original_title: "Black Adam",
                overview: "The overview of black adam",
            }
        ]
        useAppContext.mockImplementation(() => {
            return {
                wishlist: [
                    {
                        id: 1,
                        poster_path: "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
                        original_title: "Black Adam",
                        overview: "The overview of black adam",
                    }
                ],
                configuration
            };
        });
        render(
            <Router>
                <Wishlist onClose={onClose}/>
            </Router>
        );
        const displayedImage = document.querySelector("img");
        expect(displayedImage.src).toContain(`${configuration?.secure_base_url}w154${data[0].poster_path}`);
        expect(displayedImage.alt).toContain(data[0].original_title);
        expect(screen.getByText('Wishlist')).toBeInTheDocument()
        expect(screen.queryByText('No movies selected')).not.toBeInTheDocument()
    })
})
