import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Text = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
`;

const Logout = (props) => {
  setTimeout(() => {
    props.history.push('/');
  }, 1000);

  return <Text>您已登出，請待畫面跳轉...</Text>;
};

export default withRouter(Logout);
