import {fireEvent, render, screen} from '@testing-library/react';
import Carousel from "../components/Carousel";
import AppProvider from "../context/AppProvider";

describe('Testing Carousel component',  () => {
    it('should render with label', async () => {
        render(
            <AppProvider>
                <Carousel data={[]} label={"Latest Movie"} onClick={() => {}} />
            </AppProvider>,
        );

        expect(screen.getByText("Latest Movie")).toBeInTheDocument()
    })
    it('should call the onclick function when an item is clicked', async () => {
        const onClick = jest.fn();
        const data = [
            {id: 1}
        ]

        render(
            <AppProvider>
                <Carousel data={data} label={"Latest Movie"} onClick={onClick} category="secondary"/>
            </AppProvider>,
        );
        const items = await screen.getAllByTestId('item')
        expect(items.length).toBe(1)
        fireEvent.click(items[0]);
        expect(onClick).toHaveBeenCalled()
    })

    it('should render item with details on each card', async () => {
        const data = [
            {
                id: 1,
                poster_path: "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
                original_title: "Black Adam",
                overview: "The overview of black adam",
                release_date: "22-10-2022",
                vote_count: 557
            }
        ]

        render(
            <AppProvider>
                <Carousel data={data} label={"Latest Movie"} />
            </AppProvider>,
        );
        const displayedImage = document.querySelector("img");
        expect(displayedImage.src).toContain(data[0].poster_path);
        expect(displayedImage.alt).toContain(data[0].original_title);
        expect(screen.getByText(data[0].original_title)).toBeInTheDocument();
        expect(screen.getByText(data[0].overview)).toBeInTheDocument();
        expect(screen.getByText(data[0].release_date)).toBeInTheDocument();
        expect(screen.getByText(data[0].vote_count)).toBeInTheDocument();
    })
})