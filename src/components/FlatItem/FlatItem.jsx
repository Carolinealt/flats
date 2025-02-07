import css from './FlatItem.module.css'
const FlatItem = ({ data }) => {
    const { title, description, rooms, price, photos } = data;
    if (photos) { console.log(photos) }

    return (
        <div className={css.itemContainer}>
            {/* {photos.length !== 0 && photos.map(el)=>console.log(el)} */}
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