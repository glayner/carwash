import React, { useRef, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Input from '~/components/Input';
import { updateCar } from '~/store/modules/auth/actions';
import { Container, NewFormcontent } from '~/styles/default';

export default function Car() {
  const formRef = useRef(null);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);
  const car = useSelector(state => state.auth.car);

  async function handleSubmit({ model, brand, license_plate }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        model: Yup.string(),
        brand: Yup.string(),
        license_plate: Yup.string()
      });

      await schema.validate(
        {
          model,
          brand,
          license_plate
        },
        {
          abortEarly: false
        }
      );

      dispatch(updateCar(model, brand, license_plate, car.id));
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
          <strong> MODELO</strong>
          <Input
            type="text"
            name="model"
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
            placeholder={car.model}
          />
        </label>

        <label>
          <strong>MARCA</strong>
          <Input
            type="text"
            name="brand"
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
            placeholder={car.brand}
          />
        </label>

        <label>
          <strong>PLACA</strong>
          <Input
            type="text"
            name="license_plate"
            className={!edit ? 'readOnly' : ''}
            disabled={!edit}
            placeholder={car.license_plate}
          />
        </label>

        {edit && (
          <button type="submit">
            {loading ? 'Carregando...' : 'Salvar alterações'}
          </button>
        )}
      </NewFormcontent>
    </Container>
  );
}
