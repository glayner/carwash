import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import InputDatePicker from '~/components/InputDatePicker';
import InputTimePicker from '~/components/InputTimePicker';
import { Container, NewFormcontent } from '~/styles/default';

export default function CreateReserve() {
  const formRef = useRef(null);

  const carwashId = useSelector(state => state.auth.carwash.id);

  async function handleSubmit({ date, time }) {
    const arrayTime = time.split(':');
    const formatDate = format(
      new Date(new Date(date.setHours(arrayTime[0])).setMinutes(arrayTime[1])),
      'yyyy-MM-dd HH:mm'
    );

    // eslint-disable-next-line no-console
    console.log(formatDate, time, carwashId);
  }
  return (
    <Container>
      <NewFormcontent ref={formRef} onSubmit={handleSubmit}>
        <label className="datetime">
          <div>
            DATA
            <InputDatePicker name="date" />
          </div>
          <div>
            HORA
            <InputTimePicker name="time" className="timepicker" />
          </div>
        </label>

        <button type="submit">Criar reserva</button>
      </NewFormcontent>
    </Container>
  );
}
