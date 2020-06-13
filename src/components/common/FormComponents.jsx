import styled from 'styled-components';

export const FormWrapper = styled.div`
  height: calc(100vh - 142px);
`;

export const Label = styled.label`
  font-size: 20px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  font-size: 18px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #000;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 23%;
  margin: 1%;
`;

export const InputWrapperCenter = styled.div`
  display: flex;
  flex-direction: column;
  width: 23%;
  margin: 15px auto 0 auto;
`;

export const Err = styled.p`
  text-align: center;
  color: red;
`;