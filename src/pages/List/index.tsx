import React, { useMemo, useState, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';
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
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear()-1);
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']);

  const movimentType = match.params.type;

  const pageData = useMemo(() => {
    return movimentType === 'entry-balance'
      ?
      {
        title: 'Entrada',
        lineColor: '#4e41f0',
        data: gains
      }
      :
      {
        title: 'Saida',
        lineColor: '#e44c4e',
        data: expenses
      }
  }, [movimentType]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    const { data }  = pageData;

    data.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year)
      }
    });
    return uniqueYears.map(year => {
      return {
        value: year,
        label: year
      }
    })
  }, [data]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index+1,
        label: month
      }
    });
  }, []);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

    if (alreadySelected>= 0) {
      const filtered = frequencyFilterSelected.filter(item => item != frequency);
      setFrequencyFilterSelected(filtered);
    } else {
      setFrequencyFilterSelected(prev => [...prev, frequency])
    }
  }

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error('Invalid month value.');
    }
  }

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error('Invalid year value.');
    }
  }

  useEffect(() => {
    const { data } = pageData;

    const filteredDate = data.filter((item) => {
      const date = new Date(item.date);
      const day = date.getDate();
      const month = date.getMonth()+1;
      const year = date.getFullYear();

      // console.log(month, monthSelected);
      // console.log(year, date)

      return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
    });

    const formatedData = filteredDate.map(item => {
      return {
        id: String(new Date().getTime)+item.amount+Math.random(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#e44c4e'
      }
    })
    setData(formatedData);
  }, [pageData.data, monthSelected, yearSelected, data.length, frequencyFilterSelected])

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <SelectInput options={months} onChange={e => handleMonthSelected(e.target.value)} defaultValue={Number(monthSelected)} />
        <SelectInput options={years} onChange={e => handleYearSelected(e.target.value)} defaultValue={yearSelected} />
      </ContentHeader>

      <Filters>
        <button 
          type='button'
          className={`tag-filter tag-filter-recurrent ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button 
          type='button'
          className={`tag-filter tag-filter-eventual ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('eventual')}
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
              subtitle={item.dateFormatted}
              amount={item.amountFormatted} />
          ))
        }
      </Content>
    </Container>
  );
}

export default List;