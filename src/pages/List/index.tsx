import React, { useMemo, useState, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import { Container, Content, Filters } from './styles';

interface IRouteParams {
  match: {
    params: {
      type: string
    }
  }
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dataFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()-1));

  const { type } = match.params; 

  const title = useMemo(() => {
    return type === 'entry-balance' ? 'Entrada' : 'Saida'
  }, [type]);

  const lineColor = useMemo(() => {
    return type === 'entry-balance' ? '#f7931b' : '#e44c4e'
  }, [type]);

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses;
  }, [type]);

  const months = [
    {value: 2, label: 'Fevereiro'},
    {value: 3, label: 'Março'},
    {value: 8, label: 'Agosto'},
    {value: 7, label: 'Julho'},
    {value: 9, label: 'Setembro'}
  ]

  const years = [
    {value: 2020, label: 2020},
    {value: 2019, label: 2019},
    {value: 2018, label: 2018}
  ]

  useEffect(() => {

    const filteredDate = listData.filter((item) => {
      const date = new Date(item.date);
      const day = date.getDate();
      const month = String(date.getMonth()+1);
      const year = String(date.getFullYear());

      // console.log(month, monthSelected);
      // console.log(year, date)

      return month === monthSelected && year === yearSelected;
    });

    const formatedData = filteredDate.map(item => {
      return {
        id: String(new Date().getTime)+item.amount+Math.random(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#e44c4e'
      }
    })
    setData(formatedData);
  }, [listData, monthSelected, yearSelected, data.length])

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={months} onChange={e => setMonthSelected(e.target.value)} defaultValue={Number(monthSelected)} />
        <SelectInput options={years} onChange={e => setYearSelected(e.target.value)} defaultValue={yearSelected} />
      </ContentHeader>

      <Filters>
        <button 
          type='button'
          className='tag-filter tag-filter-recurrent'
        >
          Recorrentes
        </button>
        <button 
          type='button'
          className='tag-filter tag-filter-eventual'
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {
          data.map(item => (
            <HistoryFinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dataFormatted}
              amount={item.amountFormatted} />
          ))
        }
      </Content>
    </Container>
  );
}

export default List;