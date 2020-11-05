export function signRequest(cpf, password) {
  return {
    type: '@auth/SIGN_REQUEST',
    payload: { cpf, password }
  };
}

export function signUpRequest(
  username,
  cpf,
  password,
  phone,
  address,
  car_washer
) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { username, cpf, password, phone, address, car_washer }
  };
}

export function signUpSuccess() {
  return {
    type: '@auth/SIGN_UP_SUCCESS'
  };
}

export function signSuccess(token, user, carwash, car) {
  return {
    type: '@auth/SIGN_SUCCESS',
    payload: { token, user, carwash, car }
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT'
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE'
  };
}

export function createCarWash(name, address, phone, prices_list, user_id) {
  return {
    type: '@auth/CREATE_CARWASH',
    payload: { name, address, phone, prices_list, user_id }
  };
}

export function createCarWashSuccess(carwash) {
  return {
    type: '@auth/CREATE_CARWASH_SUCCESS',
    payload: { carwash }
  };
}

export function createCarWashFail() {
  return {
    type: '@auth/CREATE_CARWASH_FAIL'
  };
}

export function createCar(model, brand, license_plate, user_id) {
  return {
    type: '@auth/CREATE_CAR',
    payload: { model, brand, license_plate, user_id }
  };
}

export function createCarSuccess(car) {
  return {
    type: '@auth/CREATE_CAR_SUCCESS',
    payload: { car }
  };
}

export function createCarFail() {
  return {
    type: '@auth/CREATE_CAR_FAIL'
  };
}
