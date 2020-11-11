import { format, parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Cover, Title } from '~/styles/default';

export default function CarWashReserve() {
  const dispatch = useDispatch();
  const carWash = useSelector(state => state.auth.carwash);

  const [reserves, setReserves] = useState([]);

  async function loadReserves() {
    try {
      const response = await api.get(`carwashes/${carWash.id}`);

      const data = response.data.reserves.map(reserve => ({
        ...reserve,
        reserveDateFormatted: format(
          parseISO(reserve.reserve_date),
          "dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
          {
            locale: pt
          }
        )
      }));

      setReserves(data);
    } catch (e) {
      if (e.response && e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e);
      }
    }
  }

  useEffect(() => {
    loadReserves();
  }, []); // eslint-disable-line

  const classReserve = useMemo(() => {
    const data = {};

    reserves.forEach(reserve => {
      data[reserve.id] = '';

      if (reserve.status === 'finalizado' || reserve.status === 'entregue') {
        data[reserve.id] = 'reserveDone';
      } else if (isBefore(parseISO(reserve.reserve_date), new Date())) {
        data[reserve.id] = 'reservePassed';
      } else if (reserve.status === 'lavando') {
        data[reserve.id] = 'reserveDoing';
      }
    });

    return data;
  }, [reserves]);

  return (
    <Container>
      <Cover>
        <Title>
          <h1>Minhas Reservas</h1>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>RESERVA</td>
                <td>STATUS</td>
                <td>VALOR</td>
                <td>MODELO</td>
                <td>MARCA</td>
                <td>PLACA</td>
                <td>DONO</td>
                <td>TELEFONE</td>
                <td>ENDEREÇO</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {reserves.map(reserve => (
                <tr key={reserve.id} className={classReserve[reserve.id]}>
                  <td>{reserve.reserveDateFormatted}</td>
                  <td>{reserve.status}</td>
                  <td>
                    {reserve.amount === 0 ? 'não definido' : reserve.amount}
                  </td>
                  <td>{reserve.cars ? reserve.cars.model : ''}</td>
                  <td>{reserve.cars ? reserve.cars.brand : ''}</td>
                  <td>{reserve.cars ? reserve.cars.license_plate : ''}</td>
                  <td>{reserve.cars ? reserve.cars.users.username : ''}</td>
                  <td>{reserve.cars ? reserve.cars.users.phone : ''}</td>
                  <td>{reserve.cars ? reserve.cars.users.address : ''}</td>
                  <td>
                    <a
                      className="reservestatus"
                      href={`/changestatusreserve/${reserve.id}`}
                    >
                      ALTERAR
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      </Cover>
    </Container>
  );
}
