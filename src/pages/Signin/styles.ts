import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.primary};
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  > h2 {
    color:${props => props.theme.colors.white};
    margin-left: 7px;
  }

  > img {
    height: 40px;
    width: 40px;
  }
`;

export const Form = styled.div`
  height: 300px;
  width: 300px;
  padding: 30px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.tertiary};
`;

export const FormTitle = styled.h1`
  color:${props => props.theme.colors.white};

  &::after {
    content: '';
    display: block;
    width: 55px;
    border-bottom: 10px solid ${props => props.theme.colors.warning};
  }
`;