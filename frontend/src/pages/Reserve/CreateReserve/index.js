import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import InputDatePicker from '~/components/InputDatePicker';
import InputTimePicker from '~/components/InputTimePicker';
import { Container, NewFormcontent } from '~/styles/default';
import history from '~/services/history';
import api from '~/services/api';

export default function CreateReserve() {
  const formRef = useRef(null);

  const carwashId = useSelector(state => state.auth.carwash.id);

  async function handleSubmit({ date, time }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        date: Yup.string('selecione a data')
          .nullable()
          .required('A data é obrigatória'),
        time: Yup.string('digite a hora')
          .nullable()
          .required('A hora é obrigatória')
      });

      await schema.validate(
        {
          date,
          time
        },
        {
          abortEarly: false
        }
      );

      const arrayTime = time.split(':');
      const formatDate = format(
        new Date(
          new Date(date.setHours(arrayTime[0])).setMinutes(arrayTime[1])
        ),
        'yyyy-MM-dd HH:mm'
      );

      await api.post('reserves', {
        reserve_date: formatDate,
        car_wash_id: carwashId
      });

      toast.success('Horário de reserva criado com sucesso');
      history.push('/reserve');
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
          <strong> DATA</strong>
          <InputDatePicker name="date" />
          <strong>HORA</strong>
          <InputTimePicker name="time" className="timepicker" />
        </label>

        <button type="submit">Criar reserva</button>
      </NewFormcontent>
    </Container>
  );
}
