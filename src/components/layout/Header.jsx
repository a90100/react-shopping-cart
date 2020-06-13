import styled from 'styled-components';

const Header = styled.div`
  background-color: #ffda49;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 3px 3px 3px grey;
  
  .header-title {
    font-size: 26px;
    text-decoration: none;
    color: #000;
    padding: 12px;
  }
`;

export default Header;