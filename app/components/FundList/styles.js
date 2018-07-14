import styled from 'styled-components';

export const ListWrapper = styled.div`
  padding:10px;
`;

export const ListItem = styled.div`
  padding: 5px 10px;
  border: 1px solid #c8c8c8;
  margin: 10px 0;
  background: #FFF;
  border-radius: 6px;
`;

export const FundInfo = styled.div`
  line-height: 31px;
`;

export const FundName = styled.div`
  font-size: 14px;
  font-weight: bold;
  width: 60%;
  display : inline-block;
  color: #666;
  cursor: pointer;
`;

export const AddToCompareIcon = styled.img`
  width: 20px;
  height: 20px;
  position: relative;
  top: -4px;
  cursor: pointer;
`;

export const RatingContainer = styled.div`
  display : inline-block;
  width: calc(40% - 40px);
  position: relative;
  top: 5px;
`;