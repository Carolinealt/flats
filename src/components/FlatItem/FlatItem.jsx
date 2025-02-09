import css from './FlatItem.module.css'
import clsx from 'clsx';
import { IoAdd } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { deleteFlat } from '../../redux/flats/operations';
import { useId } from 'react';
import { editFlatData, toggleModal } from '../../redux/flats/flatsSlice';
import BasicSlider from '../BasicSlider/BasicSlider';


const FlatItem = ({ data }) => {
    const { title, description, rooms, price, photos, _id } = data;
    const dispatch = useDispatch();
    const galleryId = useId();


    const editBtn = () => {
        dispatch(toggleModal());
        dispatch(editFlatData(data));

    };

    const deleteItem = () => dispatch(deleteFlat(_id));

    return (
        <div className={css.itemContainer}>
            {/* <ul className={css.galleryList} id={galleryId}>

                {photos.map(el => {
                    return <li key={el} className={css.galleyItem}>
                        <a className="gallery-link" onClick={() => toShowImgModal(el)}>
                            <img key={el} src={el} className={css.flatPhoto} />
                        </a>

                    </li>
                })}
            </ul> */}
            <div className={css.itemContainer}>
                <BasicSlider photos={photos} />
            </div>

            <ul className={css.btnList}>
                <li className={css.btnListItem}>
                    <button onClick={editBtn} className={clsx(css.btn, css.editBtn)}>
                        <IoAdd className={css.iconAdd} size="50" />
                    </button>
                </li>
                <li className={css.btnListItem}>
                    <button onClick={deleteItem} className={clsx(css.btn, css.deleteBtn)}>
                        <IoAdd className={css.iconAdd} size="50" />
                    </button>
                </li>
            </ul>

            <h4>{title}</h4>
            <div className='descContainer'>
                <p>{description}</p>
                <p>Rooms: {rooms}</p>
                <p>Price: {price}</p>
            </div>
        </div>
    )
}

export default FlatItem