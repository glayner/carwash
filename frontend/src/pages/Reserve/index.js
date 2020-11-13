import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Cover, Title } from '~/styles/default';
import history from '~/services/history';

export default function Reserve() {
  const dispatch = useDispatch();
  const isWasher = useSelector(state => state.auth.profile.car_washer);
  const myWasher = useSelector(state => state.auth.carwash);
  const myCar = useSelector(state => state.auth.car);

  const [reserves, setReserves] = useState([]);

  async function loadReserves() {
    try {
      const response = await api.get('reserves?type=vacant');

      const data = response.data.map(reserve => ({
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
    if (isWasher && !myWasher) {
      history.push('/createcarwash');
    } else if (!isWasher && !myCar) {
      history.push('/createcar');
    }
    loadReserves();
  }, []); // eslint-disable-line

  return (
    <Container>
      <Cover>
        <Title>
          <h1>Vagas para lavagem</h1>
          {!!isWasher && (
            <Link className="register" to="/reservecreate">
              <MdAdd size={20} color="#FFF" /> <span> CADASTRAR</span>
            </Link>
          )}
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>RESERVA</td>
                <td>STATUS</td>
                <td>LAVAJATO</td>
                <td>ENDEREÇO</td>
                <td>DETALHES</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {reserves.map(reserve => (
                <tr key={reserve.id}>
                  <td>{reserve.reserveDateFormatted}</td>
                  <td>{reserve.status}</td>
                  <td>{reserve.carWashers.name}</td>
                  <td>{reserve.carWashers.address}</td>
                  <td>{reserve.carWashers.prices_list}</td>
                  <td>
                    {!isWasher && (
                      <a
                        className="reservemake"
                        href={`/reservemake/${reserve.id}`}
                      >
                        RESERVAR
                      </a>
                    )}
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
