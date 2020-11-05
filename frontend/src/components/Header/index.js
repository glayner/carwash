import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logoImage from '~/assets/logoImage.png';

import { Container, Content } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.profile);

  function handleSignOut() {
    dispatch(signOut());
  }
  const urlsize = document.URL.split('/').length - 1;
  const newUrl = document.URL.split('/')[urlsize];

  return (
    <Container>
      <Content>
        <nav>
          <div>
            <img src={logoImage} alt="carWash" />
            <span>CARWASH</span>
          </div>
          <Link
            className={newUrl === 'reserve' ? 'selected' : ''}
            to="/reserve"
          >
            RESERVA
          </Link>
          <Link className={newUrl === 'plan' ? 'selected' : ''} to="/plan">
            MINHAS RESERVAS
          </Link>
          <Link
            className={newUrl === 'myreserve' ? 'selected' : ''}
            to="/myreserve"
          />
          <Link
            className={newUrl === 'profile' ? 'selected' : ''}
            to="/profile"
          >
            PERFIL
          </Link>
        </nav>
        <aside>
          <span>{profile ? profile.username : ''}</span>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
