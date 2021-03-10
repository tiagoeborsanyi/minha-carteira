import styled, { css } from 'styled-components';

interface ICOntainerProps {
  menuIsOpen: boolean;
}

export const Container = styled.div<ICOntainerProps>`
  grid-area: AS;
  
  background-color: ${props => props.theme.colors.secondary};
  padding-left: 20px;
  border-right: 1px solid ${props => props.theme.colors.gray};

  position: relative;

  @media(max-width: 600px) {
    padding-left: 7px;
    position: fixed;
    z-index: 2;

    height: ${props => props.menuIsOpen ? '100vh' : '70px'};
    overflow: hidden;

    ${props => !props.menuIsOpen && css `
      border: none;
      border-bottom: 1px solid ${props => props.theme.colors.gray};
    `};
  }
`;

export const Header = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
`;

export const LogoImg  = styled.img`
  height: 40px;
  width: 40px;

  @media(max-width: 600px) {
    height: 30px;
    width: 30px;
  }
`;

export const Title  = styled.h3`
  color: ${props => props.theme.colors.white};
  margin-left: 10px;

  @media(max-width: 600px) {
    display: none;
  }
`;

export const MenuContainer  = styled.nav`
  display: flex;
  flex-direction: column;

  margin-top: 50px;
`;

export const MenuItemLink = styled.a`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.info};
  text-decoration: none;
  margin: 7px 0;
  transition: opacity .3s;

  &:hover {
    opacity: .7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

export const MenuItemButton = styled.button`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.info};
  font-size: 16px;
  border: none;
  background: none;
  text-decoration: none;
  margin: 7px 0;
  transition: opacity .3s;
  cursor: pointer;

  &:hover {
    opacity: .7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;