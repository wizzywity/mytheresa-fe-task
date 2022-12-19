import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import LeftArrow from "../../assets/left-arrow.svg";
import RightArrow from "../../assets/right-arrow.svg";
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiUpvote } from 'react-icons/bi';
import {useAppContext} from "../../context/AppProvider";


const Carousel = ({data, label, onClick, category}) => {
    const { configuration } = useAppContext()

    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src={LeftArrow} alt="prevArrow" {...props} />
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img src={RightArrow} alt="nextArrow" {...props} />
    );

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
    };

    return (
        <div className="card__container">
            <h2>{label}</h2>
            <Slider {...settings} className="card__container--inner">
                {data?.map((item) => (
                    <div
                        className="card__container--inner--card" key={item?.id} onClick={() => onClick(item?.id, category)} data-testid="item">

                        <img src={`${configuration?.secure_base_url}w500${item?.poster_path}`} alt={item?.original_title} />

                        <div className="card__container--inner--card--date_time">
                            <AiOutlineCalendar color="#0a9e88" size="20"/>
                            <p style={{marginRight: 30}}>{item?.release_date}</p>

                            <BiUpvote color="#0a9e88" size="20" />
                            <p>{item?.vote_count}</p>
                        </div>


                        <h2>{item?.original_title}</h2>
                        <p>{item?.overview}</p>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Carousel
