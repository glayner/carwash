import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #f2f2f2;

  h1 {
    font-size: 24px;
    color: #444;
    font-weight: bold;
  }

  a.register {
    background: #009fe3;
    padding: 10px 20px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    height: 36px;
    transition: background 0.2s;
    justify-content: space-around;

    &:hover {
      background: ${darken(0.1, '#009fe3')};
    }

    > span {
      font-size: 14px;
      color: #fff;
      margin-left: 8px;
    }
  }
`;
