import React, { useRef, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Input from '~/components/Input';
import { updateCarWash } from '~/store/modules/auth/actions';
import { Container, NewFormcontent } from '~/styles/default';

import TextArea from '~/components/TextArea';

export default function CarWash() {
  const formRef = useRef(null);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);
  const carwash = useSelector(state => state.auth.carwash);

  async function handleSubmit({ name, address, phone, prices_list }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string(),
        address: Yup.string(),
        phone: Yup.string(),
        prices_list: Yup.string()
      });

      await schema.validate(
        {
          name,
          address,
          phone,
          prices_list
        },
        {
          abortEarly: false
        }
      );

      dispatch(updateCarWash(name, address, phone, prices_list, carwash.id));

      setEdit(false);
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

  function handleEdite() {
    setEdit(!edit);
    if (edit) window.location.reload();
  }

  return (
    <Container>
      <NewFormcontent ref={formRef} onSubmit={handleSubmit}>
        {!edit ? (
          <button
            type="button"
            onClick={() => handleEdite()}
            className="editProfile"
          >
            <MdEdit size={20} color="#FFF" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleEdite()}
            className="editProfileClose"
          >
            <MdClose size={20} color="#FFF" />
          </button>
        )}

        <label>
          NOME
          <Input
            type="text"
            name="name"
            placeholder={carwash.name}
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
          />
        </label>

        <label>
          ENDEREÇO
          <Input
            type="text"
            name="address"
            placeholder={carwash.address}
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
          />
        </label>

        <label>
          TELEFONE
          <Input
            type="text"
            name="phone"
            placeholder={carwash.phone}
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
          />
        </label>

        <label>
          LISTA DE PREÇO
          <TextArea
            rows="4"
            cols="35"
            name="prices_list"
            placeholder={carwash.prices_list}
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
          />
        </label>

        {edit && (
          <button type="submit">
            {loading ? 'Carregando...' : 'Editar lavajato'}
          </button>
        )}
      </NewFormcontent>
    </Container>
  );
}
