import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Nav>
      <Logo onClick={() => navigate('/')}>FlowSense</Logo>
      <NavLinks>
        <NavLink onClick={() => navigate('/about')}>About</NavLink>
        <NavLink onClick={() => navigate('/features')}>Features</NavLink>
        <NavLink onClick={() => navigate('/contact')}>Contact</NavLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #181C96;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
`;

const NavLink = styled.li`
  font-size: 18px;
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;