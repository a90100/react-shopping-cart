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
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../store/actions/authAction';

const H2 = styled.h2`
  margin-left: 1%;
  text-align: center;
`;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: ''
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  };

  render() {
    if (this.props.auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <FormWrapper>
        <H2>用戶註冊</H2>
        <form onSubmit={this.handleSubmit}>
          <InputWrapperCenter>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" autoComplete="off" onChange={this.handleInput} />
          </InputWrapperCenter>
          <InputWrapperCenter>
            <Label htmlFor="password">密碼</Label>
            <Input type="password" id="password" autoComplete="off" onChange={this.handleInput} />
          </InputWrapperCenter>
          <InputWrapperCenter>
            <Label htmlFor="name">用戶名字</Label>
            <Input type="text" id="name" autoComplete="off" onChange={this.handleInput} />
            <YellowBtn style={{ marginTop: '40px' }} type="submit">註冊</YellowBtn>
          </InputWrapperCenter>
        </form>
        { this.props.authError ? <Err>{this.props.authError}</Err> : null }
      </FormWrapper>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  authError: state.auth.authError
});

export default connect(mapStateToProps, { register })(Register);
