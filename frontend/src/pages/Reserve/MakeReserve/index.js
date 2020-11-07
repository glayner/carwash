import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Cover, Title } from '~/styles/default';

export default function MakeReserve({ match }) {
  const dispatch = useDispatch();
  const profileId = useSelector(state => state.auth.profile.id);

  const { id } = match.params;

  const [cars, setCars] = useState([]);
  const [reserve, setReserve] = useState({});
  const [carWashers, setCarWashers] = useState({});

  useEffect(() => {
    async function loadMakeReserve() {
      try {
        const reserveData = await api
          .get(`reserves/${id}`)
          .then(r => r.data)
          .then(d => ({
            ...d,
            reserveDateFormatted: format(
              parseISO(d.reserve_date),
              "dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
              {
                locale: pt
              }
            )
          }));

        setReserve(reserveData);

        setCarWashers(reserveData.carWashers);

        const loadCars = await api
          .get(`users/${profileId}`)
          .then(r => r.data)
          .then(u => u.cars);

        setCars(loadCars);
      } catch (e) {
        if (e.response && e.response.data.error === 'Token invalid') {
          dispatch(signOut());
        } else {
          toast.error(e.response.data.error);
        }
      }
    }

    loadMakeReserve();
  }, [id]);// eslint-disable-line



  async function handleReserve(car_id) {
    try {
      // eslint-disable-next-line no-alert
      const result = window.confirm('Certeza que deseja reservar?');
      if (result) {
        await api.put(`reserves/${id}`, {
          car_id
        });
        toast.success('successfully reseved');
        history.push('/reserve');
      }
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  return (
    <Container>
      <Cover>
        <Title>
          <h1>Reserva escolhida</h1>
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
              <tr key={reserve.id}>
                <td>{reserve.reserveDateFormatted}</td>
                <td>{reserve.status}</td>
                <td>{carWashers.name}</td>
                <td>{carWashers.address}</td>
                <td>{carWashers.prices_list}</td>
              </tr>
            </tbody>
          </table>
          <Title>
            <h1>Selecione o seu carro para resevar</h1>
          </Title>
          <table>
            <thead>
              <tr>
                <td>MODELO</td>
                <td>MARCA</td>
                <td>PLACA</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car.id}>
                  <td>{car.model}</td>
                  <td>{car.brand}</td>
                  <td>{car.license_plate}</td>
                  <td>
                    <button
                      className="reservemake"
                      type="button"
                      onClick={() => handleReserve(car.id)}
                    >
                      RESERVAR
                    </button>
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

MakeReserve.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }).isRequired
  }).isRequired
};
