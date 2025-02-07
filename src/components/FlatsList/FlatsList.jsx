import { useSelector } from 'react-redux'
import { selectFlatsList } from '../../redux/flats/selectors'
import FlatItem from '../FlatItem/FlatItem';
import css from './FlatsList.module.css'
const FlatsList = () => {
    const flats = useSelector(selectFlatsList);

    return (
        <ul className={css.flatsList}>{flats.map(el => <li key={el._id} className={css.flatsItem}>
            <FlatItem data={el} />
        </li>)}</ul>
    )
}

export default FlatsList;