import { format, parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Cover, Title } from '~/styles/default';

export default function MyReserve() {
  const dispatch = useDispatch();
  const myCar = useSelector(state => state.auth.car);

  const [reserves, setReserves] = useState([]);

  async function loadReserves() {
    try {
      const response = await api.get(`cars/${myCar.id}`);

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
                <td>CARRO</td>
                <td>STATUS</td>
                <td>LAVAJATO</td>
                <td>ENDEREÇO</td>
                <td>DETALHES</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {reserves.map(reserve => (
                <tr key={reserve.id} className={classReserve[reserve.id]}>
                  <td>{reserve.reserveDateFormatted}</td>
                  <td>
                    {myCar.model} - {myCar.brand} - {myCar.license_plate}
                  </td>
                  <td>{reserve.status}</td>
                  <td>{reserve.carWashers.name}</td>
                  <td>{reserve.carWashers.address}</td>
                  <td>{reserve.carWashers.prices_list}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      </Cover>
    </Container>
  );
}
