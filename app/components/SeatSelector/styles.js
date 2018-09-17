import styled from "styled-components";
import myImage from "../../images/background.jpg";

export const Theater = styled.div`
  position: relative;
  top: 0;
  left: 0;
  min-height: 100%;
  min-width: 100%;
  background-image: url(${myImage});
  padding-bottom: 50px;
`;

export const ContentWrapper = styled.div`
  width: 800px;
  margin: auto;
`;

export const Seat = styled.div`
  height: 25px;
  width: 25px;
  margin: 10px;
  background: ${props =>
    (props.reserved && "#FF0000") ||
    (props.selected && "#32CD32") ||
    "#FFFFFF"};
  cursor: ${props => (props.selectable ? "pointer" : "default")};
  margin-right: ${props => (props.index === 5 ? "50px" : "auto")};
  border: 2px solid #c8c8c8;
`;

export const Screen = styled.div`
  line-height: 30px;
  text-align: center;
  width: 700px;
  background-color: #106fb1;
  margin-bottom: 50px;
  margin: auto;
  color: #FFF;
`;

export const SeatLayout = styled.div`
  width: 700px;
  margin: auto;
  margin-top: 30px;
  position: relative;
  padding-bottom: 50px;
`;
export const SeatRow = styled.div`
  text-align: center;
  &:last-child {
    padding-bottom:20px;
  }
`;

export const RowNumber = styled.div`
  left: -10px;
  position: absolute;
  top: 10px;
  font-size: 14px;
  font-weight: bold;
  line-height: 25px;
`;

export const ColNumber = styled.div`
  position: absolute;
  top: -15px;
  width: 25px;
  left: 10px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
`;

export const SeatWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const PreloaderWrapper = styled.div`
  position: absolute;
  top: 35%;
  left: 33%;
`;

export const   SeatLabelWrapper= styled.div`
  display: inline-block;
  vertical-align: middle;
  padding-left: 70px;`;

export const   SeatLabel= styled.div`
 display: inline-block;
  padding-right: 10px;
`;

export const   SeatType= styled.div`
  font-size: 14px;
  color: #FFF;
  font-weight:bold;
  position: relative;
  right: 5px;
`;