import { useSelector } from "react-redux"
import { selectFlatData } from "../../redux/flats/selectors";
import FlatForm from "../FlatForm/FlatForm";

const FlatEditModal = () => {
    const flatData = useSelector(selectFlatData)

    return (
        < div >
            <FlatForm selectedInitialValues={flatData} />
        </div >
    )
}

export default FlatEditModal