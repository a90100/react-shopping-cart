import React from 'react';
import { Links, StyledLink } from '../common/LinksStyle';
import cart from '../../imgs/cart.png';
import user from '../../imgs/user.png';
import logout from '../../imgs/logout.png';
import { connect } from 'react-redux';
import { signout } from '../../store/actions/authAction';

const SignInLinks = props => {
  return (
    <Links>
      <StyledLink to="/myCart">
        購物籃
        <img src={cart} alt="" />
      </StyledLink>
      <StyledLink to="/user">
        使用者
        <img src={user} alt="" />
      </StyledLink>
      <StyledLink to="/logout" onClick={props.signout}>
        登出
        <img src={logout} alt="" />
      </StyledLink>
    </Links>
  );
};

export default connect(null, { signout })(SignInLinks);
