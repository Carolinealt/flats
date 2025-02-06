import css from './FlatItem.module.css'
const FlatItem = ({ data }) => {
    const { title, description, rooms, price } = data;

    return (
        <div className={css.itemContainer}>
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