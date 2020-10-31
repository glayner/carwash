import { Form } from '@unform/web';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { signUpRequest } from '~/store/modules/auth/actions';
import CheckboxInput from '~/components/inputCheckbox';
import Input from '~/components/Input';

export default function Sign() {
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const checkboxOptions = [
    { id: 'carWasher', value: 'carWasher', label: 'É lavajato' }
  ];

  async function handleSubmit({
    username,
    cpf,
    password,
    phone,
    address,
    car_washer
  }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string().required('O nome é obrigatório'),
        cpf: Yup.string()
          .max(11)
          .min(11)
          .required('O cpf é obrigatório'),
        password: Yup.string()
          .min(6, 'minimo 6 caracteres')
          .required('A senha é obrigatória'),
        phone: Yup.string().required('O telefone é obrigatório'),
        address: Yup.string().required('O endereço é obrigatório'),
        car_washer: Yup.array()
      });

      await schema.validate(
        {
          username,
          cpf,
          password,
          phone,
          address,
          car_washer
        },
        {
          abortEarly: false
        }
      );

      dispatch(
        signUpRequest(username, cpf, password, phone, address, !!car_washer[0])
      );
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }
  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <strong> SEU NOME</strong>
        <Input type="text" name="username" placeholder="Fulano de tal" />

        <strong> SEU CPF</strong>
        <Input type="text" name="cpf" placeholder="12345678909" />

        <strong>SUA SENHA</strong>
        <Input type="password" name="password" placeholder="**********" />

        <strong> SEU TELEFONE</strong>
        <Input type="text" name="phone" placeholder="6134474442" />

        <strong> SEU ENDEREÇO</strong>
        <Input
          type="text"
          name="address"
          placeholder="SGAN Quadra 906 Conj. A "
        />

        <CheckboxInput name="car_washer" options={checkboxOptions} />

        <button type="submit">
          {loading ? 'Carregando...' : 'Criar conta'}
        </button>

        <Link className="register" to="/">
          Já tenho cadastro
        </Link>
      </Form>
    </>
  );
}
