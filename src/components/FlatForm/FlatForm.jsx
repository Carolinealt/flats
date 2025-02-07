import { Field, Form, Formik } from 'formik'
import { useId, useState } from 'react';
import * as Yup from "yup";
import css from './FlatForm.module.css';
import clsx from 'clsx';
import { IoAdd } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { addFlat } from '../../redux/flats/operations';

const FlatSchema = Yup.object().shape({
    title: Yup.string().max(90, "Too long").required("Required field"),
    description: Yup.string().max(335, "Too long").required("Required field"),
    rooms: Yup.number().oneOf([1, 2, 3]).required("Required field"),
    price: Yup.number().required("Required field"),
    photos: Yup.mixed().required("Required field")
})

const initialValues = {
    title: "", description: "", rooms: 1, price: "", photos: [],
};

const FlatForm = () => {
    const titleFieldId = useId();
    const descriptionFieldId = useId();
    const roomsFieldId = useId();
    const priceFieldId = useId();
    const photoFieldId = useId();

    const dispatch = useDispatch();

    const [preview, setPreview] = useState([]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={FlatSchema}
            onSubmit={(values, actions) => {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("rooms", values.rooms);
                formData.append("price", values.price);

                values.photos.forEach((file, index) => {
                    formData.append(`photos`, file);
                });  // Отправляем файл

                dispatch(addFlat(values));  // Отправляем в Redux action

                // dispatch(addFlat(values))
                actions.resetForm();
            }}>
            {({ setFieldValue }) => (
                <Form className={css.formContainer}>

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
                        <div className={css.btnContainer}>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(event) => {
                                    const files = Array.from(event.currentTarget.files);
                                    setFieldValue("photos", [...event.currentTarget.files]); // Сохраняем файлы в formik

                                    // Генерируем превью для отображения
                                    const previews = files.map((file) => URL.createObjectURL(file));
                                    setPreview((prev) => [...prev, ...previews]);
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

                    <button type="submit" className={css.btnSubmit}>Add</button>
                </Form>
            )}
        </Formik >
    )
}

export default FlatForm;