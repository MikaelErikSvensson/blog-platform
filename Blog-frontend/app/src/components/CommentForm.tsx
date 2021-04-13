import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { CommentFormProps } from '../types/main';

const CommentForm = ({ user }: CommentFormProps) => {
  let history = useHistory();

  const [name, setName] = useState<string>();
  const [body, setBody] = useState<string>();

  return (
    <div>
      <div className="form-container">
        <Formik
          initialValues={{
            author: '',
            body: '',
            error: null,
          }}
          validationSchema={Yup.object().shape({
            author: Yup.string().required('Author is required'),
            body: Yup.string().required('Body is required'),
          })}
          onSubmit={(fields) => {
            console.log(fields);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-row"></div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <Field name="author" type="text" className={'form-control' + (errors.author && touched.author ? ' is-invalid' : '')} />
                <ErrorMessage name="author" component="div" className="invalid-feedback" />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="body">Body</label>
                  <Field
                    as="textarea"
                    name="body"
                    type="body"
                    className={'form-control' + (errors.body && touched.body ? ' is-invalid' : '')}
                  />
                  <ErrorMessage name="body" component="div" className="invalid-feedback" />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default CommentForm;
