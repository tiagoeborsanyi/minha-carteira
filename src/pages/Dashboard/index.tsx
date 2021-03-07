import React, { useMemo, useState } from 'react';

import SelectInput from '../../components/SelectInput';
import ContentHeader from '../../components/ContentHeader';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';
import { 
  Container,
  Content
} from './styles';
import { BarChart } from 'recharts';

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear()-1);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach(item => {
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
  }, []);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index+1,
        label: month
      }
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth()+1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Invalid amount.');
        }
      }
    })
    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth()+1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Invalid amount.');
        }
      }
    })
    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Que triste',
        description: 'Neste mês, você gastou mais do que deveria.',
        footerText: 'Verifique seus gastos e tente cortar algumas coisas desnecessárias.',
        icon: sadImg
      }
    } else if (totalBalance === 0) {
      return {
        title: 'Ufa',
        description: 'Neste mês, você gastou exatamente o que ganhou.',
        footerText: 'Tenha cuidade. No próximo mes tente poupar seu dinheiro.',
        icon: happyImg
      }
    } else if (totalBalance > 0) {
      return {
        title: 'Muito bem',
        description: 'Sua carteira esta positiva.',
        footerText: 'Continue assim. COnsidere investir.',
        icon: happyImg
      }
    }
  }, [totalBalance]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGain = (totalGains / total) * 100;
    const percentExpenses = (totalExpenses / total) * 100;

    const data = [
      {
        name: 'Entradas',
        value: totalGains,
        percent: Number(percentGain.toFixed(1)),
        color: '#e44c4e'
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(1)),
        color: '#f7931b'
      }
    ]

    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return listOfMonths.map((_, month) => {

      let amountEntry = 0;
      gains.forEach(gain => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = date.getFullYear();

        if (gainMonth === month && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount);
          } catch {
            throw new Error('amount entry is invalid.');
          }
        }
      });

      let amountOutput = 0;
      expenses.forEach(expense => {
        const date = new Date(expense.date);
        const expenseMonth = date.getMonth();
        const expenseYear = date.getFullYear();

        if (expenseMonth === month && expenseYear === yearSelected) {
          try {
            amountOutput += Number(expense.amount);
          } catch {
            throw new Error('amountOutpu is invalid.');
          }
        }
      });

      return {
        monthNumber: month,
        month: listOfMonths[month].substr(0, 3),
        amountEntry,
        amountOutput
      }
    }).filter(item => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
    });
  }, [yearSelected]);

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
    .filter(expense => {
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const month = date.getMonth()+1;

      return month === monthSelected && year === yearSelected
    })
    .forEach(expense => {
      if (expense.frequency === 'recorrente') {
        return amountRecurrent += Number(expense.amount);
      }
      if (expense.frequency === 'eventual') {
        return amountEventual += Number(expense.amount);
      }
    });

    const total = amountRecurrent + amountEventual;
    const recurrentPercent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: "#f7931b"
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: "#e44c4e"
      }
    ]
  }, [, monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
    .filter(gain => {
      const date = new Date(gain.date);
      const year = date.getFullYear();
      const month = date.getMonth()+1;

      return month === monthSelected && year === yearSelected
    })
    .forEach(gain => {
      if (gain.frequency === 'recorrente') {
        return amountRecurrent += Number(gain.amount);
      }
      if (gain.frequency === 'eventual') {
        return amountEventual += Number(gain.amount);
      }
    });

    const total = amountRecurrent + amountEventual;

    const recurrentPercent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: "#f7931b"
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: "#e44c4e"
      }
    ]
  }, [, monthSelected, yearSelected]);

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

  return (
    <Container>
      <ContentHeader title='Dashboard' lineColor='#f7931b'>
      <SelectInput options={months} onChange={e => handleMonthSelected(e.target.value)} defaultValue={Number(monthSelected)} />
        <SelectInput options={years} onChange={e => handleYearSelected(e.target.value)} defaultValue={yearSelected} />
      </ContentHeader>
      <Content>
        <WalletBox 
          title='saldo'
          amount={totalBalance}
          footerlabel='Atualizado nas entradas e saidas'
          icon='dolar'
          color='#4e41f0'
        />
        <WalletBox 
          title='entradas'
          amount={totalGains}
          footerlabel='Atualizado nas entradas e saidas'
          icon='arrowUp'
          color='#f7931b'
        />
        <WalletBox 
          title='saidas'
          amount={totalExpenses}
          footerlabel='Atualizado nas entradas e saidas'
          icon='arrowDown'
          color='#e44c4e'
        />
        <MessageBox 
          title={message?.title}
          description={message?.description}
          footerText={message?.footerText}
          icon={message?.icon}
        />
        <PieChartBox data={relationExpensesVersusGains} />
        <HistoryBox 
          data={historyData}
          lineColorAmountEntry="#f7931b"
          lineColorAmountOutput="#e44c4e"
        />
        <BarChartBox
          title='Saidas'
          data={relationExpensevesRecurrentVersusEventual}
        />
        <BarChartBox 
          title='Entradas'
          data={relationGainsRecurrentVersusEventual}
        />
      </Content>
    </Container>
  );
}

export default Dashboard;