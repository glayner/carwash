import { Form, Input } from '@rocketseat/unform';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '~/assets/logo.png';
import { signRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  cpf: Yup.string()
    .min(11, 'minimo 11 caracteres')
    .max(11, 'maximo 11 caracteres')
    .required('O cpf é obrigatório'),
  password: Yup.string()
    .min(6, 'minimo 6 caracteres')
    .required('A senha é obrigatória')
});

export default function Sign() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ cpf, password }) {
    dispatch(signRequest(cpf, password));
  }
  return (
    <>
      <img src={logo} alt="CarWash" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <strong> SEU CPF</strong>
        <Input type="text" name="cpf" placeholder="12345678909" />

        <strong>SUA SENHA</strong>
        <Input type="password" name="password" placeholder="**********" />

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>

        <Link className="register" to="/register">
          Criar cadastro
        </Link>
      </Form>
    </>
  );
}
