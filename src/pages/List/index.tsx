import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { Container, Content } from './styles';

const List: React.FC = () => {
  const options = [
    {value: 'Caio', label: 'Caio'},
    {value: 'Marisa', label: 'Marisa'},
    {value: 'Julio', label: 'Julio'}
  ]

  return (
    <Container>
      <ContentHeader title='Saidas' lineColor='#e44c4e'>
        <SelectInput options={options} />
      </ContentHeader>

      <Content>
        <HistoryFinanceCard
          tagColor='#e44c4e'
          title='Conta de Luz'
          subtitle='27/07/2021'
          amount='R$ 130,00' />
      </Content>
    </Container>
  );
}

export default List;