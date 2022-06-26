import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, Form, Row, Col } from 'react-bootstrap';
import './style.css';
import apiService from '../../services/api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
	const api = apiService.get()

	const [errors, setErrors] = useState('');

	const { register, handleSubmit } = useForm();

	const toastId = React.useRef(null);

	const notify = () => {
		toastId.current = toast("Aguarde...", {
			type: toast.TYPE.INFO,
		    autoClose: false,
		    closeButton: false // Remove the closeButton
	    });
	}

	const showNotifyError = (message) => {
		toast.update(toastId.current, {
			render: message,
	    	type: toast.TYPE.ERROR,
	    	autoClose: 3000,
	    	closeButton: null,
	    });
	}

	const login = data => {
		notify();
		api.defaults.withCredentials = true;
		api.get("/sanctum/csrf-cookie").then((response) => {
			api.post('api/auth/login', data)
			.then(resp => {
				const {data} = resp;
				if (data) {

					const dataUser = {
				        id: data.data.user.id,
				        name: data.data.user.name,
				        email: data.data.user.email,
				        role: data.data.user.role,
				        permissions: data.data.user.permissions,
				        token: btoa(unescape(encodeURIComponent(data.data.token))),
					}

					localStorage.setItem('dataUser', JSON.stringify(dataUser));
					window.location = '/dashboard';
				}
			})
			.catch(error =>{
				if(error?.response?.data?.data?.errors){
					showNotifyError('Alguns dados estão incorretos!');
					setErrors(error?.response?.data?.data?.errors);
				}

				if(error?.response?.data?.message !== null)
					showNotifyError(error?.response?.data?.message);
			});
		});
	}

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<div className="login-auth">
				<div className="container mx-auto w-25 mb-3">
					<Form onSubmit={handleSubmit(login)} className="form-register">
						<Row className="mb-3">
							<Col sm="12">
								{/*<img className="logo-login" src={`${process.env.PUBLIC_URL}/eassit-logo.png`} alt="logo" />*/}
							</Col>
						</Row>
						<h1 className="mx-auto text-center">Acesso Interno</h1>
						<Row className="mb-3">
							<Col sm="12">
								<Form.Group>
								    <label htmlFor="email" className="form-label">Email:</label>
								    <input type="email" name="email" className="form-control" id="email" {...register("email")} />
								    <span className="error-message">
								    	{errors?.email ? errors.email[0] : null}
								    </span>
								</Form.Group>
							</Col>
						</Row>

						<Row className="mb-3">
							<Col sm="12">
								<Form.Group>
								    <label htmlFor="password" className="form-label">Senha:</label>
								    <input type="password" name="password" className="form-control" id="password" {...register("password")} />
								    <span className="error-message">
								    	{errors?.password ? errors.password[0] : null}
								    </span>
								</Form.Group>
							</Col>
						</Row>

						<Row className="mb-3">
							<Col sm="12">
								<Button type="submit" className="btn btn-primary w-100">Entrar</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</div>
		</>
	);
};

export default Login;