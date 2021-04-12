import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../api/backend';
import { LoginProps, User } from '../types/main';
import { useHistory } from 'react-router-dom';

const Login = ({ onLogin }: LoginProps) => {
  let history = useHistory();

  return (
    <div>
      <div className="form-container">
        <Formik
          initialValues={{
            email: '',
            password: '',
            error: null,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Email is invalid').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
          })}
          onSubmit={(fields) => {
            login(fields)
              .then((response) => {
                if (response.data.token) {
                  onLogin(response.data);
                  localStorage.setItem('jwt', JSON.stringify(response.data));
                  alert('Successfully logged in');
                  history.push('/dashboard'); //Sätt delay på pushen?
                }
              })
              .catch((error) => {
                console.log(error);
                alert('Email or password incorrect');
              });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-row"></div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
