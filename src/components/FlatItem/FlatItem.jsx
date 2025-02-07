import css from './FlatItem.module.css'
import * as basicLightbox from 'basiclightbox'

const FlatItem = ({ data }) => {
    const { title, description, rooms, price, photos } = data;
    const toShowModal = (url) => {
        const instance = basicLightbox.create(`
            <div class="modal">
                 <img src=${url} className={css.flatPhoto} />
            </div>
        `)
        instance.show()

    }
    return (
        <div className={css.itemContainer}>
            <ul className={css.galleryList}>
                {photos.map(el => {
                    return <li key={el} className={css.galleyItem}>
                        <a className="gallery-link" onClick={() => toShowModal(el)}>
                            <img key={el} src={el} className={css.flatPhoto} />
                        </a>

                    </li>
                })}
                {photos.map(el => {
                    return <li key={el} className={css.galleyItem}>
                        <a className="gallery-link" onClick={() => toShowModal(el)}>
                            <img key={el} src={el} className={css.flatPhoto} />
                        </a>

                    </li>
                })}
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