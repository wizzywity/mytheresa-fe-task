import React from "react";
import './style.scss'
import { useAppContext } from "../../context/AppProvider";
import {useNavigate} from "react-router-dom";


const Wishlist = ({onClose}) => {
    const navigate = useNavigate();
    const { wishlist, configuration } = useAppContext()
    const onClick = (item) => {
        navigate(`/details/${item?.id}`, {
            state: {
                category: item?.category
            }
        })
        onClose?.()
    }
    return (
        <div className="wish__container">
            <h2>Wishlist</h2>
            {!wishlist.length && (
                <p>No movies selected</p>
            )}

            {wishlist?.map((item) => (
                <React.Fragment key={item?.id}>
                    <div className="item" onClick={() => onClick(item)}>
                        <img alt={item?.original_title} src={`${configuration?.secure_base_url}w154${item?.poster_path}`}/>
                        <div className="item__text__group">
                            <h3>{item?.original_title}</h3>
                            <p>{item?.overview}</p>
                        </div>
                    </div>
                    <hr/>
                </React.Fragment>
            ))}
        </div>
    )
}

export default Wishlist
