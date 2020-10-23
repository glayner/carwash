import { Form, Input } from '@rocketseat/unform';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { signUpRequest } from '~/store/modules/auth/actions';

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
  address: Yup.string().required('O endereço é obrigatório')
  // car_washer: Yup.string()
});

export default function Sign() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ username, cpf, password, phone, address }) {
    dispatch(signUpRequest(username, cpf, password, phone, address));
  }
  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
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

        {/* <div className="checkboxDiv">
          <strong> É LAVAJATO</strong>
          <Input type="checkbox" className="checkbox" name="car_washer" />
        </div> */}

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
