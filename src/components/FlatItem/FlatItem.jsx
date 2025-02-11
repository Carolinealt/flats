import css from './FlatItem.module.css'
import clsx from 'clsx';
import { IoAdd } from 'react-icons/io5';
import { CgCloseO } from "react-icons/cg";

import { useDispatch } from 'react-redux';
import { deleteFlat } from '../../redux/flats/operations';
import { editFlatData, toggleModal } from '../../redux/flats/flatsSlice';
import BasicSlider from '../BasicSlider/BasicSlider';


const FlatItem = ({ data }) => {
    const { title, description, rooms, price, photos, _id } = data;
    const dispatch = useDispatch();


    const editBtn = () => {
        dispatch(toggleModal());
        dispatch(editFlatData(data));

    };

    const deleteItem = () => dispatch(deleteFlat(_id));

    return (
        <div className={css.itemContainer}>
            <ul className={css.btnList}>
                <li className={css.btnListItem}>
                    <button onClick={editBtn} className={clsx(css.btn, css.editBtn)}>
                        <IoAdd className={css.iconAdd} size="50" />
                    </button>
                </li>
                <li className={css.btnListItem}>
                    <button onClick={deleteItem} className={clsx(css.btn, css.deleteBtn)}>
                        <CgCloseO className={css.iconAdd} size="50" />
                    </button>
                </li>
            </ul>
            <div className={css.sliderContainer}>
                <BasicSlider photos={photos} />
            </div>



            <div className='descContainer'>
            <h4 className={css.header}>{title}</h4>
                <p>{description}</p>
                <p>Rooms: {rooms}</p>
                <p>Price: {price}</p>
            </div>
        </div>
    )
}

export default FlatItem