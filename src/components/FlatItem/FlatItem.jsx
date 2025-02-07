import css from './FlatItem.module.css'
const FlatItem = ({ data }) => {
    const { title, description, rooms, price, photos } = data;

    return (
        <div className={css.itemContainer}>
            {photos.map(el => {
                return <img key={el.originalname} alt={el.originalname} src={el.path} />
                // console.log(el)
            })}

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