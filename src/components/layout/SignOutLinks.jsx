import React from 'react';
import { Links, StyledLink } from '../common/LinksStyle';
import login from '../../imgs/login.png';
import register from '../../imgs/register.png';

const SignOutLinks = () => {
  return (
    <Links>
      <StyledLink to="/login">
        登入
        <img src={login} alt="" />
      </StyledLink>
      <StyledLink to="/register">
        註冊
        <img src={register} alt="" />
      </StyledLink>
    </Links>
  );
};

export default SignOutLinks;
