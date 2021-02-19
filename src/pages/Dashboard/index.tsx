import React from 'react';

import SelectInput from '../../components/SelectInput';
import ContentHeader from '../../components/ContentHeader';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  const options = [
    {value: 'Caio', label: 'Caio'},
    {value: 'Marisa', label: 'Marisa'},
    {value: 'Julio', label: 'Julio'}
  ]

  return (
    <Container>
      <ContentHeader title='Dashboard' lineColor='#f793dc'>
        <SelectInput options={options} />
      </ContentHeader>
    </Container>
  );
}

export default Dashboard;