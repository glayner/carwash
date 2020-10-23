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

export function signSuccess(token, user) {
  return {
    type: '@auth/SIGN_SUCCESS',
    payload: { token, user }
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
