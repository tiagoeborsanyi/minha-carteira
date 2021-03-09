import React, { useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import logoImg from '../../assets/logo.svg';
import {
  Container,
  Logo,
  Form,
  FormTitle
} from './styles';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { signIn } = useAuth();

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt='logo' />
        <h2>Minha Carteira</h2>
      </Logo>

      <Form onSubmit={() => signIn(email, password)}>
        <FormTitle>
          Entrar
        </FormTitle>

        <Input 
          type="text"
          required={true}
          placeholder='e-mail'
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type='password'
          required={true}
          placeholder='senha'
          onChange={e => setPassword(e.target.value)}
        />

        <Button type='submit'>
          Acessar
        </Button>
      </Form>
    </Container>
  );
}

export default SignIn;