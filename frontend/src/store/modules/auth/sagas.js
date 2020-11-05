import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  signSuccess,
  signFailure,
  signUpSuccess,
  createCarWashSuccess,
  createCarWashFail,
  createCarFail,
  createCarSuccess
} from './actions';

export function* sign({ payload }) {
  try {
    const { cpf, password } = payload;

    const response = yield call(api.post, 'sessions', {
      cpf,
      password
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token.token}`;

    let carwash = null;
    let car = null;

    if (user.car_washer) {
      try {
        const responseMyCarWash = yield call(api.get, `mycarwashes/${user.id}`);
        carwash = responseMyCarWash.data;
      } catch (err) {
        toast.warn('Deve ser feito o cadastro do lavajato');
      }
    } else {
      try {
        const responseMyCar = yield call(api.get, `mycar/${user.id}`);
        car = responseMyCar.data;
      } catch (err) {
        toast.warn('Deve ser feito o cadastro do carro');
      }
    }

    yield put(signSuccess(token.token, user, carwash, car));

    history.push('/reserve');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { username, cpf, password, phone, address, car_washer } = payload;

    yield call(api.post, 'users', {
      username,
      cpf,
      password,
      phone,
      address,
      car_washer
    });

    toast.success('Cadastrado com sucesso, agora efetue o login');

    yield put(signUpSuccess());

    history.push('/');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* createCarWash({ payload }) {
  try {
    const { name, address, phone, prices_list, user_id } = payload;

    const response = yield call(api.post, 'carwashes', {
      name,
      address,
      phone,
      prices_list,
      user_id
    });

    toast.success('Lavajato cadastrado com sucesso!');

    yield put(createCarWashSuccess(response.data));

    history.push('/reserve');
  } catch (err) {
    toast.error('Erro no cadastro, verifique seus dados');
    yield put(createCarWashFail());
  }
}

export function* createCar({ payload }) {
  try {
    const { model, brand, license_plate, user_id } = payload;

    const response = yield call(api.post, 'cars', {
      model,
      brand,
      license_plate,
      user_id
    });

    toast.success('Carro cadastrado com sucesso!');

    yield put(createCarSuccess(response.data));

    history.push('/reserve');
  } catch (err) {
    toast.error('Erro no cadastro, verifique seus dados');
    yield put(createCarFail());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_REQUEST', sign),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/CREATE_CARWASH', createCarWash),
  takeLatest('@auth/CREATE_CAR', createCar)
]);
