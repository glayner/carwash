import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import api from '~/services/api';
import history from '~/services/history';
import { Container, NewFormcontent } from '~/styles/default';
import ReactSelect from '~/components/InputSelect';
import Input from '~/components/Input';
import { signOut } from '~/store/modules/auth/actions';

export default function ChangeStatusReserve({ match }) {
  const formRef = useRef(null);
  const { id } = match.params;

  const dispatch = useDispatch();

  const [reserve, setReserve] = useState({});

  async function loadReserve() {
    try {
      const response = await api.get(`reserves/${id}`);

      const data = {
        status: response.data.status,
        amount: response.data.amount
      };

      setReserve(data);
    } catch (e) {
      if (e.response && e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e);
      }
    }
  }

  useEffect(() => {
    loadReserve();
  }, []); // eslint-disable-line

  async function handleSubmit({ status, amount }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        status: Yup.string('selecione o staus')
          .nullable()
          .required('selecione o staus'),
        amount: Yup.number('valor deve ser um numeral').nullable()
      });

      await schema.validate(
        {
          status,
          amount
        },
        {
          abortEarly: false
        }
      );

      const requestData = {
        status
      };

      if (amount && amount !== '0') requestData.amount = amount;

      await api
        .put(`status/${id}`, requestData)
        .then(() => {
          toast.success('Status de reserva alterado com sucesso');
          history.push('/carwashreserve');
        })
        .catch(error => {
          toast.error(error.response.data.error);
        });
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
  const statusOptions = [
    { value: 'disponível', label: 'disponível' },
    { value: 'reservado', label: 'reservado' },
    { value: 'bloqueado', label: 'bloqueado' },
    { value: 'esperando', label: 'esperando' },
    { value: 'lavando', label: 'lavando' },
    { value: 'finalizado', label: 'finalizado' },
    { value: 'entregue', label: 'entregue' }
  ];

  return (
    <Container>
      <NewFormcontent ref={formRef} onSubmit={handleSubmit}>
        <label>
          <strong> STATUS</strong>
          <ReactSelect
            name="status"
            options={statusOptions}
            placeholder={reserve.status}
          />
        </label>
        <label>
          <strong> VALOR</strong>
          <Input name="amount" defaultValue={reserve.amount} />
        </label>

        <button type="submit">Alterar</button>
      </NewFormcontent>
    </Container>
  );
}

ChangeStatusReserve.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }).isRequired
  }).isRequired
};
