import React, { useRef, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Input from '~/components/Input';
import { updateProfile } from '~/store/modules/auth/actions';
import { Container, NewFormcontent } from '~/styles/default';

export default function Profile() {
  const formRef = useRef(null);
  const [edit, setEdit] = useState(false);
  // const [usernameData, setUsernameData] = useState();
  // const [cpfData, setCpfData] = useState();
  // const [passwordData, setPasswordData] = useState();
  // const [phoneData, setPhoneData] = useState();
  // const [addressData, setAddressData] = useState();

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);
  const profile = useSelector(state => state.auth.profile);

  async function handleSubmit({ username, cpf, password, phone, address }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string(),
        cpf: Yup.string(),
        password: Yup.string(),
        phone: Yup.string(),
        address: Yup.string()
      });

      await schema.validate(
        {
          username,
          cpf,
          password,
          phone,
          address
        },
        {
          abortEarly: false
        }
      );

      // eslint-disable-next-line no-console
      console.log({ username, cpf, password, phone, address });

      dispatch(
        updateProfile(username, cpf, password, phone, address, profile.id)
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
          <strong> SEU NOME</strong>
          <Input
            type="text"
            name="username"
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
            placeholder={profile.username}
          />
        </label>

        <label>
          <strong> SEU CPF</strong>
          <Input
            type="text"
            name="cpf"
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
            placeholder={profile.cpf}
          />
        </label>

        <label>
          <strong>SUA SENHA</strong>
          <Input
            type="password"
            name="password"
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
            placeholder="**********"
          />
        </label>

        <label>
          <strong> SEU TELEFONE</strong>
          <Input
            type="text"
            name="phone"
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
            placeholder={profile.phone}
          />
        </label>

        <label>
          <strong> SEU ENDEREÇO</strong>
          <Input
            type="text"
            name="address"
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
            placeholder={profile.address}
          />
        </label>

        {edit && (
          <button type="submit">
            {loading ? 'Carregando...' : 'Salvar alteração'}
          </button>
        )}
      </NewFormcontent>
    </Container>
  );
}
