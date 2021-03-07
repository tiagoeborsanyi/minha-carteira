import styled from 'styled-components';

interface ILegendProps {
  color: string;
}

export const Container = styled.div`
  width: 48%;
  min-height: 260px;
  margin: 10px 0;

  display: flex;

  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.white};
  border-radius: 7px;
`;

export const SideLeft = styled.aside`
  flex: 1;
  padding: 30px 20px;

  > h2 {
    padding-left: 16px;
    margin-bottom: 20px;
  }
`;

export const SideRight = styled.main`
  flex: 1;
  min-height: 150px;

  display: flex;
  justify-content: center;
  padding-top: 35px;

`;

export const LegendContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
`;

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  margin-left: 7px;
  padding-left: 16px;

  > div {
    width: 40px;
    height: 40px;
    border-radius: 3px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;

    background-color: ${props => props.color};
  }

  > span {
    margin-left: 5px;
  }
`;