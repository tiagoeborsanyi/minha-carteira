import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import {
  Container,
  Logo,
  Form,
  FormTitle
} from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Logo>
        <img src={logoImg} alt='logo' />
        <h2>Minha Carteira</h2>
      </Logo>

      <Form onSubmit={() => {}}>
        <FormTitle>
          Entrar
        </FormTitle>

        <Input 
          type="email"
          required
          placeholder='e-mail'
        />
        <Input
          type='password'
          required
          placeholder='senha'
        />

        <Button type='submit'>
          Acessar
        </Button>
      </Form>
    </Container>
  );
}

export default SignIn;