import React, {useEffect, useMemo, useState} from "react";
import "./style.scss";
import { useParams, useLocation } from 'react-router-dom';
import cn from 'classnames';
import {apiClient} from "../../service";
import {useAppContext} from "../../context/AppProvider";
import dayjs from "dayjs";
import {toast} from "react-toastify";


const Details = () => {
    const { configuration, addToWishlist } = useAppContext()
    const [item, setItem] = useState({})
    const { detailsId } = useParams();
    const {state} = useLocation()

    const className = useMemo(() => {
        switch (state?.category) {
            case 'secondary':
                return 'secondary'
            case 'tertiary':
                return 'tertiary'
            default:
                return ''
        }
    },[state?.category])

    useEffect(() => {
        apiClient.get(`movie/${detailsId}`).then((res) => {
            setItem(() => res?.data)
        }).catch(console.log)
    },[detailsId])


    return (
        <div className={cn('container', className)}>
            <div className="container__img-group">
                <img src={`${configuration?.secure_base_url}original${item?.poster_path}`} alt={item?.original_title}/>
                <div className="container__img-group__button--group">
                    <h3>{item?.original_title}</h3>
                    <small><strong><i>{item?.tagline}</i></strong></small>
                    <br/>
                    <p>{item?.overview}</p>
                    <div className="details">
                        <p><span>Genre: </span>{item?.genres?.map(g => g.name).join(', ')}</p>
                        <p><span>Status: </span>{item?.status}</p>
                        <p><span>Release date: </span>{dayjs(item?.release_date).format('MMM DD, YYYY')}</p>
                        <p><span>Vote count: </span>{item?.vote_count}</p>
                    </div>
                    <button className={className} onClick={() => {
                        addToWishlist({...item, category: state?.category})
                        toast.success(`👏🏽 ${item.original_title} added to wishlist!`)
                    }}>Add to wishlist</button>
                </div>
            </div>
            <div className="container__img-group__additional_info">
                <h2>Additional Information</h2>
                <p><span>Spoken languages: </span>{item?.spoken_languages?.map(l => l.english_name).join(', ')}</p>
                <p><span>Video Length: </span>{item?.runtime} minutes</p>
            </div>
        </div>
    )
}

export default Details