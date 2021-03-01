import React from 'react';

import { Container } from './styles';

interface IMessageBoxProps {
  title: string | undefined;
  description: string | undefined;
  footerText: string | undefined;
  icon: string | undefined;
}

const MessageBox: React.FC<IMessageBoxProps> = ({
  title,
  description,
  footerText,
  icon
}) => {
  return (
    <Container>
      <header>
          <h1>
            {title}
            <img src={icon} alt={title}/>
          </h1>
          <p>
            {description}
          </p>
      </header>
      <footer>
        <span>{footerText}</span>
      </footer>
    </Container>
  );
}

export default MessageBox;