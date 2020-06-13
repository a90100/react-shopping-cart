import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  box-shadow: none;
  font-family: 'Noto Sans TC', sans-serif;
  border-radius: 5px;
  border: 1px solid #000;
`;

export const NormalBtn = styled(Button)`
  font-size: 16px;
  padding: 4px 7px;
`;

export const LargeBtn = styled(Button)`
  font-size: 18px;
  padding: 8px 15px;
`;

export const YellowBtn = styled(LargeBtn)`
  background-color: #ffda49;
`;

export const GreenBtn = styled(NormalBtn)`
  background-color: #67fc6e;
`;

export const RedBtn = styled(NormalBtn)`
  background-color: #ff3d3d;
  color: #fff;
`;

export const BlueBtn = styled(NormalBtn)`
  background-color: #1c8dff;
  color: #fff;
`;