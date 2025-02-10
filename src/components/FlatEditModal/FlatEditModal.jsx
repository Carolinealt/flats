import { useDispatch, useSelector } from "react-redux"
import { selectFlatData, selectIsModal } from "../../redux/flats/selectors";
import FlatForm from "../FlatForm/FlatForm";
import css from './FlatEditModal.module.css'
import clsx from "clsx";
import { toggleModal } from "../../redux/flats/flatsSlice";
import { IoAdd } from "react-icons/io5";
import { CgCloseO } from "react-icons/cg";
const FlatEditModal = () => {
    const flatData = useSelector(selectFlatData)
    const isModal = useSelector(selectIsModal)
    const dispatch = useDispatch();
    return (
        < div className={clsx(css.modalOverlayContainer, isModal && css.isOpen)}>
            <div className={css.relativeContainer}>
                <button onClick={() => dispatch(toggleModal())} className={css.closeModalBtn}>
                    <CgCloseO className={css.iconAdd} size="25" />

                </button>

                <div className={css.formContainer}>
                    <FlatForm selectedInitialValues={flatData} variant={"modal"} variantSubmit="submitModal" />
                </div>
            </div>
        </div >
    )
}

export default FlatEditModal