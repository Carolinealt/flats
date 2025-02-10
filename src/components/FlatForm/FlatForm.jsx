import { Field, Form, Formik } from 'formik'
import { useId, useState } from 'react';
import * as Yup from "yup";
import css from './FlatForm.module.css';
import clsx from 'clsx';
import { IoAdd } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { addFlat, patchFlat } from '../../redux/flats/operations';
import { selectFlatData } from '../../redux/flats/selectors';
import { toggleModal } from '../../redux/flats/flatsSlice';

const FlatSchema = Yup.object().shape({
    title: Yup.string().max(90, "Too long").required("Required field"),
    description: Yup.string().max(335, "Too long").required("Required field"),
    rooms: Yup.number().oneOf([1, 2, 3]).required("Required field"),
    price: Yup.number().required("Required field"),
    photos: Yup.mixed().required("Required field")
})

let initialValues = {
    title: "", description: "", rooms: 1, price: "", photos: [],
};

const FlatForm = ({ selectedInitialValues, variant, variantSubmit }) => {
    const titleFieldId = useId();
    const descriptionFieldId = useId();
    const roomsFieldId = useId();
    const priceFieldId = useId();
    const dispatch = useDispatch();
    const { _id } = useSelector(selectFlatData)
    const [preview, setPreview] = useState([]);

    if (selectedInitialValues?.title) {
        initialValues = selectedInitialValues;
    }

    const makeSpecificRequest = (formData, arrayOfPhoto) => {
        if (selectedInitialValues?.title) {
            formData.delete("photos");
            for (const file of arrayOfPhoto) {
                formData.append("photos", file);
            }
            dispatch(patchFlat({ _id, formData }));
            dispatch(toggleModal())
            return;
        }
        dispatch(addFlat(formData));
        return;
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={FlatSchema}
            onSubmit={(values, actions) => {
                let formData = new FormData();
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("rooms", values.rooms);
                formData.append("price", values.price);
                values.photos.forEach((file) => {
                    formData.append("photos", file);

                });

                makeSpecificRequest(formData, values.photos);

                setPreview([]);
                actions.resetForm();
            }}>
            {({ setFieldValue }) => (
                <Form className={clsx(css.formContainer)}>
                    <div className={css.toAddContainer}>
                        <div className={css.inputsContainer}>
                            <div className={css.fieldContainer}>
                                <label htmlFor={titleFieldId}>Title</label>
                                <Field type="text" name="title" id={titleFieldId} className={css.textField} />
                            </div>

                            <div className={css.fieldContainer}>
                                <label htmlFor={descriptionFieldId}>Description</label>
                                <Field as="textarea" rows="5" name="description" id={descriptionFieldId} className={clsx(css.textField, css.textAreaField)} />
                            </div>

                            <div className={css.fieldContainer}>
                                <label htmlFor={descriptionFieldId}>Rooms</label>
                                <Field as="select" id={roomsFieldId} name='rooms' className={clsx(css.textField, css.optionField)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Field>
                            </div>

                            <div className={css.fieldContainer}>
                                <label htmlFor={titleFieldId}>Price</label>
                                <Field type="text" name="price" id={priceFieldId} className={css.textField} />
                            </div>


                        </div>

                        {/* Форма загрузки фото */}
                        <div className={clsx(css.btnContainer, css[variant])}>
                            <input
                                type="file"
                                accept="image/*"
                                multiple

                                onChange={(event) => {
                                    const files = Array.from(event.currentTarget.files);
                                    setFieldValue("photos", files);

                                    const previews = files.map((file) => URL.createObjectURL(file));
                                    setPreview(() => previews);
                                    // setPreview((prev) => [...prev, ...previews]);
                                }}
                                hidden
                                id="photoUpload"
                            />
                            <label htmlFor="photoUpload" className={css.addPhotoBtn}>
                                <IoAdd className={css.iconAdd} size="50" />
                            </label>
                        </div>

                        {/* Превью изображений */}
                        <div className={css.previewContainer}>
                            {preview.map((src, index) => (
                                <img key={index} src={src} alt={`Preview ${index}`} className={css.previewImage} />
                            ))}
                        </div>

                    </div>
                    <button type="submit" className={clsx(css.btnSubmit, css[variantSubmit])}>Add</button>
                </Form>
            )}
        </Formik >
    )
}

export default FlatForm;