import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  overflow: auto;
  height: 100%;
  background: #009fe3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  max-height: 650px;
  text-align: center;
  background: #fff;
  padding: 10px 35px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      margin-top: 5px;
      padding: 5px;
      text-align: left;
      font-size: 14px;
      color: #444;
    }

    span {
      font-size: 12px;
      color: red;
      margin: 0 0 10px;
    }

    input {
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid #aaa;
      border-radius: 4px;
      height: 45px;
      width: 300px;
      padding: 0 15px;
      font-size: 16px;
      color: #444;
      margin: 0 0 10px;

      &::placeholder {
        color: #999;
      }
    }

    input.checkbox {
      width: 15px;
      height: 15px;
      padding: 0;
      margin: 0;
      vertical-align: bottom;
      position: relative;
      top: -1px;
      *overflow: hidden;
    }

    div.checkboxDiv {
      display: flexbox;
      justify-content: center;
      align-items: center;

      margin: 0 auto 10px;
      padding: 0;

      > strong {
        font-size: 12px;
        display: block;
        padding-left: 15px;
        text-indent: -15px;
      }
    }

    button {
      margin: 5px 0 0;
      height: 45px;
      width: 300px;
      background: #009fe3;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#009fe3')};
      }
    }

    .register {
      margin-top: 10px;
      color: #009fe3;

      &:hover {
        color: ${darken(0.25, '#009fe3')};
      }
    }
  }
`;
