import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Input from '~/components/Input';
import TextArea from '~/components/TextArea';
import { createCarWash } from '~/store/modules/auth/actions';
import { Container, NewFormcontent } from '~/styles/default';

export default function CreateCarWash() {
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);
  const profileId = useSelector(state => state.auth.profile.id);

  async function handleSubmit({ name, address, phone, prices_list }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        address: Yup.string().required('O endereço é obrigatório'),
        phone: Yup.string().required('O telefone é obrigatório'),
        prices_list: Yup.string().required('Lista de preço obirgatória')
      });

      await schema.validate(
        {
          name,
          phone,
          address,
          prices_list
        },
        {
          abortEarly: false
        }
      );

      dispatch(createCarWash(name, address, phone, prices_list, profileId));
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
    <Container>
      <NewFormcontent ref={formRef} onSubmit={handleSubmit}>
        <label>
          NOME
          <Input type="text" name="name" placeholder="Lavajato do Fulano" />
        </label>

        <label>
          ENDEREÇO
          <Input
            type="text"
            name="address"
            placeholder="SGAN Quadra 906 Conj. A"
          />
        </label>

        <label>
          TELEFONE
          <Input type="text" name="phone" placeholder="6134474442" />
        </label>

        <label>
          LISTA DE PREÇO
          <TextArea
            rows="4"
            cols="35"
            name="prices_list"
            placeholder="Simples R$50,00 - Completa R$90,00"
          />
        </label>

        <button type="submit">
          {loading ? 'Carregando...' : 'Criar lavajato'}
        </button>
      </NewFormcontent>
    </Container>
  );
}
