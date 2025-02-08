import { useSelector } from 'react-redux'
import { selectFlatsList, selectIsModal } from '../../redux/flats/selectors'
import FlatItem from '../FlatItem/FlatItem';
import css from './FlatsList.module.css'
import FlatEditModal from '../FlatEditModal/FlatEditModal';
const FlatsList = () => {
    const flats = useSelector(selectFlatsList);
    const isModal = useSelector(selectIsModal)

    return (
        <div>
            {isModal && <FlatEditModal />}
            <ul className={css.flatsList}>
                {flats.map(el =>
                    <li key={el._id} className={css.flatsItem}>
                        <FlatItem data={el} />
                    </li>)}
            </ul>
        </div>
    )
}

export default FlatsList;