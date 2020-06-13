import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Links = styled.div`
  display: flex;

  img {
    width: 30px;
    height: 30px;
    margin-left: 5px;
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 62px;
  margin-right: 20px;
  text-decoration: none;
  color: #000;
`;