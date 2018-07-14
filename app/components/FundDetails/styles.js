import styled from 'styled-components';

export const Header = styled.div`
  color: #FFF;
  line-height: 30px;
  background: #75b1d8;
  font-weight: bold;
  font-size: 14px;
  padding: 0 10px;
  width: 200px;
  margin-bottom: 10px;
`;

export const PropertyWrapper = styled.div`
  border-bottom: 1px solid #d7eaf7;
  font-size: 13px;
  padding: ${(props) => (props.header ? '5px' : '2px 5px;')};
`;

export const Name = styled.div`
  display:inline-block;
  width: 50%;
  font-weight: ${(props) => (props.header ? 'bold' : '')};
`;

export const Value = styled.div`
  display:inline-block;
  width: 50%;
  font-weight: ${(props) => (props.header ? 'bold' : '')};
`;

export const DetailItem = styled.div`
  padding:10px 0;
`;

export const DetailsWrapper = styled.div`
  padding: 10px;
`
