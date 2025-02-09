import { useDispatch, useSelector } from "react-redux"
import { selectFlatData, selectIsModal } from "../../redux/flats/selectors";
import FlatForm from "../FlatForm/FlatForm";
import css from './FlatEditModal.module.css'
import clsx from "clsx";
import { toggleModal } from "../../redux/flats/flatsSlice";
import { IoAdd } from "react-icons/io5";
const FlatEditModal = () => {
    const flatData = useSelector(selectFlatData)
    const isModal = useSelector(selectIsModal)
    const dispatch = useDispatch();
    return (
        < div className={clsx(css.modalOverlayContainer, isModal && css.isOpen)}>
            <button onClick={() => dispatch(toggleModal())}>
                <IoAdd className={css.iconAdd} size="50" />

            </button>
            <div className={css.formContainer}>
                <FlatForm selectedInitialValues={flatData} variant={"modal"}/>
            </div>
        </div >
    )
}

export default FlatEditModal