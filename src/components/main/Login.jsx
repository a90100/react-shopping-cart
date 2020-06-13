import React from 'react';
import styled from 'styled-components';
import { YellowBtn } from '../common/Button';
import {
  Label,
  Input,
  InputWrapperCenter,
  FormWrapper,
  Err
} from '../common/FormComponents';
import { login } from '../../store/actions/authAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const H2 = styled.h2`
  margin-left: 1%;
  text-align: center;
`;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    if (this.props.auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <FormWrapper>
        <H2>用戶登入</H2>
        <form onSubmit={this.handleSubmit}>
          <InputWrapperCenter>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" autoComplete="off" onChange={this.handleChange} />
          </InputWrapperCenter>
          <InputWrapperCenter>
            <Label htmlFor="password">密碼</Label>
            <Input type="password" id="password" autoComplete="off" onChange={this.handleChange} />
            <YellowBtn style={{ marginTop: '40px' }}>登入</YellowBtn>
          </InputWrapperCenter>
        </form>
        { this.props.authError ? <Err>{this.props.authError}</Err> : null }
      </FormWrapper>
    );
  }
};

const mapStateToProps = (state) => ({
  authError: state.auth.authError,
  auth: state.firebase.auth
});

export default connect(mapStateToProps, { login })(Login);
