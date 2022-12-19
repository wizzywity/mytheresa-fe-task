import React, {useEffect, useState} from "react";
import Carousel from "../../components/Carousel";
import {apiClient} from "../../service";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [nowPlaying, setNowPlaying] = useState([])
    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([])

    useEffect(() => {
        loadMovies('/movie/now_playing', (results) => {
            setNowPlaying(() => results)
        })
        loadMovies('/movie/popular', (results) => {
            setPopular(() => results)
        })
        loadMovies('/movie/top_rated', (results) => {
            setTopRated(() => results)
        })
    },[])

    const loadMovies = (url, callback) => {
        apiClient.get(url).then((res) => {
            callback(res?.data?.results)
        }).catch(console.log)
    }

    const onClick = (detailsId, category) => {
        navigate(`/details/${detailsId}`, {
            state: {
                category
            }
        })
    }

    return (
        <>
            <Carousel label="Now Playing" data={nowPlaying} onClick={onClick}/>
            <Carousel label="Top Rated Movies" data={topRated} category="secondary" onClick={onClick}/>
            <Carousel label="Popular Movies" data={popular} category="tertiary" onClick={onClick}/>
        </>
    )
}

export default Home
