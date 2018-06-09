import styled from "styled-components";

export const StyledButtom = styled.div`
  color: #ffffff;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};  
  margin-left: ${props => props.leftMargin};
  line-height: 36px;
  width: 150px;
  border-radius: 6px;
  background-color: #106fb1;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
`;
