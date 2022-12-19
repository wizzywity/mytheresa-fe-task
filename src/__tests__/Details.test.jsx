import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import Details from "../pages/Details";
import {act} from "react-dom/test-utils";
import dayjs from "dayjs";
import {ToastContainer} from "react-toastify";

const data = {
    id: 1,
    poster_path: "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
    original_title: "Black Adam",
    overview: "The overview of black adam",
    tagline: "The anti villain",
    genres: [
        {name: "Action"},
        {name: "Drama"},
    ],
    status: "Released",
    release_date: "2022-10-19",
    vote_count: 567,
    runtime: 195,
    spoken_languages: [
        {english_name: "English"},
        {english_name: "French"},
    ]
}
jest.useFakeTimers()

const configuration = {
    secure_base_url: "https://testimage/"
}

jest.mock("react-router-dom",() => ({
    __esModule: true,
    useParams: () => {
        return {
            detailsId: 1
        };
    },
    useLocation: () => {
        return {
            state: {
                category: 'secondary'
            }
        }
    }
}));

jest.mock("../service",() => ({
    __esModule: true,
    apiClient: {
        get: () => Promise.resolve({
            data: data
        })
    },
}));

const mockAddToWishlist = jest.fn();
jest.mock("../context/AppProvider",() => ({
    __esModule: true,
    useAppContext: () => {
        return {
            configuration,
            addToWishlist: mockAddToWishlist
        };
    },
}));

describe('Testing Details page',  () => {
    it('should render details of a movie and add to wishlist button action should be triggered', async () => {
        const promise = Promise.resolve()
        render(
            <>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <Details />
            </>
        );

        await act(async () => {
            await promise
        })
        const displayedImage = document.querySelector("img");
        expect(displayedImage.src).toContain(`${configuration.secure_base_url}original${data.poster_path}`);
        expect(displayedImage.alt).toContain(data.original_title);
        expect(screen.getByText(data.original_title)).toBeInTheDocument()
        expect(screen.getByText(data.tagline)).toBeInTheDocument()
        expect(screen.getByText(data.overview)).toBeInTheDocument()
        expect(screen.getByText(data.genres?.map(g => g.name).join(', '))).toBeInTheDocument()
        expect(screen.getByText(data?.spoken_languages?.map(l => l.english_name).join(', '))).toBeInTheDocument()
        expect(screen.getByText(data.status)).toBeInTheDocument()
        expect(screen.getByText(dayjs(data.release_date).format('MMM DD, YYYY'))).toBeInTheDocument()
        expect(screen.getByText(data.vote_count)).toBeInTheDocument()
        expect(screen.getByText(`${data.runtime} minutes`)).toBeInTheDocument()

        fireEvent.click(screen.getByText('Add to wishlist'))
        await act(() => {
            jest.advanceTimersByTime(1000);
        })
        expect(mockAddToWishlist).toHaveBeenCalledWith({...data, category: "secondary"})
        expect(screen.getByRole('alert')).toBeInTheDocument()
    })
})
