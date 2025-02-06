import { Field, Form, Formik } from 'formik'
import React from 'react'

const FlatForm = () => {
    return (
        <Formik initialValues={{}} onSubmit={() => { }}>
            <Form>
                <Field name="title" />
                <button type="submit">Submit</button>

            </Form>
        </Formik >
    )
}

export default FlatForm;