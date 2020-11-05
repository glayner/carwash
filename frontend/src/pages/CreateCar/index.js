import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Input from '~/components/Input';
import { createCar } from '~/store/modules/auth/actions';
import { Container, NewFormcontent } from '~/styles/default';

export default function CreateCar() {
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);
  const profileId = useSelector(state => state.auth.profile.id);

  async function handleSubmit({ model, brand, license_plate }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        model: Yup.string().required('O modelo é obrigatório'),
        brand: Yup.string().required('A marca é obrigatória'),
        license_plate: Yup.string().required('A placa é obrigatória')
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

      dispatch(createCar(model, brand, license_plate, profileId));
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
          MODELO
          <Input type="text" name="model" placeholder="Ka" />
        </label>

        <label>
          MARCA
          <Input type="text" name="brand" placeholder="FORD" />
        </label>

        <label>
          PLACA
          <Input type="text" name="license_plate" placeholder="JKA5568" />
        </label>

        <button type="submit">
          {loading ? 'Carregando...' : 'Criar carro'}
        </button>
      </NewFormcontent>
    </Container>
  );
}
