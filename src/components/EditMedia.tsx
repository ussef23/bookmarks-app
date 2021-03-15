import React, { useContext } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MediaContext } from "../context/media-context";
import { Imedia } from "../models/media.model";
import { Types } from "../reducers/mediaReducer";

import "./EditMedia.css";

interface EditMediaProps {
    media: Imedia;
    closeModal: () => void;
  }

const LoginPage: React.FC<EditMediaProps> = ({media , closeModal}) => {
    const { dispatch } = useContext(MediaContext);
  return (
    <Formik
      initialValues={{
        title: media.title,
        author_name: media.author_name,
        width: media.width,
        height: media.height,
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Title is required"),
        author_name: Yup.string().required("Author name is required"),
        width: Yup.number().required("Width is required"),
        height: Yup.number().required("height is required"),
      })}
      onSubmit={async (fields, action) => {
        dispatch({
            type: Types.Edit,
            payload: { update : {...media, ...fields}}
        })
        closeModal()
        action.setSubmitting(false);
      }}
    >
      {({ errors, status, touched, isSubmitting }) => (
        <div className="edit-form">
          <div className="title">Edit Media</div>

          <Form>
            <label>title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error-msg" />
            <label>Author</label>
            <Field type="text" name="author_name" placeholder="Author" />
            <ErrorMessage
              name="author_name"
              component="div"
              className="error-msg"
            />
            <label>Height</label>
            <Field type="text" name="height" placeholder="Height" />
            <ErrorMessage name="height" component="div" className="error-msg" />
            <label>Width</label>
            <Field type="text" name="width" placeholder="Width" />
            <ErrorMessage name="width" component="div" className="error-msg" />
            <button type="submit" color="primary" disabled={isSubmitting}>
              VALIDATE
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
