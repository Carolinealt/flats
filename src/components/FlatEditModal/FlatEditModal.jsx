import { useDispatch, useSelector } from "react-redux"
import { selectFlatData, selectIsModal } from "../../redux/flats/selectors";
import FlatForm from "../FlatForm/FlatForm";
import css from './FlatEditModal.module.css'
import clsx from "clsx";
import { toggleModal } from "../../redux/flats/flatsSlice";
import { CgCloseO } from "react-icons/cg";
import { useRef } from "react";
const FlatEditModal = () => {
    const flatData = useSelector(selectFlatData)
    const isModal = useSelector(selectIsModal)
    const dispatch = useDispatch();
    const overlayRef = useRef(null);

    // useEffect(() => {
    //     const handleEscapePress = (event) => {
    //         if (event.key === "Escape") {
    //             dispatch(toggleModal());
    //         }
    //     };

    //     const handleOverlayClick = (event) => {
    //         if (overlayRef.current && event.target === overlayRef.current) {
    //             dispatch(toggleModal());
    //         }
    //     };

    //     if (isModal) {
    //         window.addEventListener("keydown", handleEscapePress);
    //         window.addEventListener("click", handleOverlayClick);
    //     }

    //     return () => {
    //         window.removeEventListener("keydown", handleEscapePress);
    //         window.removeEventListener("click", handleOverlayClick);
    //     };
    // }, [isModal, dispatch]);

    return (
        < div ref={overlayRef} className={clsx(css.modalOverlayContainer, isModal && css.isOpen)
        }>
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