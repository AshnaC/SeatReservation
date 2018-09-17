/**
 *
 * SeatSelector
 *
 */

import React from "react";
import PropTypes from "prop-types";

import {
  Seat,
  SeatRow,
  Screen,
  Theater,
  ContentWrapper,
  SeatLayout,
  RowNumber,
  ColNumber,
  SeatWrapper,
  PreloaderWrapper,
  SeatLabelWrapper,
  SeatLabel,
  SeatType,
} from "./styles";
import Button from "../Button";
import Preloader from "../LoadingIndicator";
import CustomerList from "../CustomerList";

class SeatSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeats: this.props.slectedSeats || [],
    };
    this.addReservation = this.addReservation.bind(this);
    this.onBack = this.onBack.bind(this);
  }
  onBack() {
    this.props.loadInitialPage();
  }

  onSeatSelection = (row, col) => () => {
    this.setState(pevState => {
      const seatId = `${row}${col}`;
      let selectedSeats = pevState.selectedSeats;
      if (selectedSeats.includes(seatId)) {
        selectedSeats = selectedSeats.filter(item => item !== seatId);
      } else {
        selectedSeats.push(seatId);
      }
      return { selectedSeats };
    });
  };

  addReservation() {
    const userDetails = {
      name: this.props.userDetails.customerName,
      seats: this.state.selectedSeats,
    };
    this.props.addReservation(userDetails);
  }

  render() {
    const cols = [...Array(this.props.noOfCols)].map((q, w) => w + 1);
    const rows = [...Array(this.props.noOfRows)].map((q, w) => String.fromCharCode(w + 65));
    const allowBooking =
      this.props.userDetails.seatsCount === this.state.selectedSeats.length &&
      !this.props.seatBooked;
    return (
      <Theater>
        <ContentWrapper>
          <Screen>SCREEN</Screen>
          <SeatLayout>
            {this.props.enablePreloader && (
              <PreloaderWrapper>
                <Preloader />
              </PreloaderWrapper>
            )}
            {rows.map(row => {
              return (
                <SeatRow key={row}>
                  {cols.map(col => {
                    const seatId = `${row}${col}`;
                    const isReserved = this.props.bookedSeats.includes(seatId);
                    const isSelectable =
                      (this.props.userDetails.seatsCount >
                        this.state.selectedSeats.length ||
                        this.state.selectedSeats.includes(seatId)) &&
                      !isReserved && !this.props.enablePreloader;
                    return (
                      <SeatWrapper key={col}>
                        {row === "A" && <ColNumber>{col}</ColNumber>}
                        {col === 1 && <RowNumber>{row}</RowNumber>}
                        <Seat
                          index={col}
                          selectable={isSelectable}
                          reserved={isReserved}
                          selected={this.state.selectedSeats.includes(seatId)}
                          onClick={isSelectable && this.onSeatSelection(row, col)}
                        />
                      </SeatWrapper>
                    );
                  })}
                </SeatRow>
              );
            })}
            <Button
              label="Confirm Selection"
              disabled={!allowBooking}
              onClick={allowBooking && this.addReservation}
              leftMargin="50px"
            />
            <SeatLabelWrapper>
              <SeatLabel>
                <Seat selected/>
                <SeatType>Selected</SeatType>
              </SeatLabel>
              <SeatLabel>
                <Seat reserved/>
                <SeatType>Reserved</SeatType>
              </SeatLabel>
              <SeatLabel>
                <Seat selectable/>
                <SeatType>Available</SeatType>
              </SeatLabel>
            </SeatLabelWrapper>
            <Button onClick={this.onBack} label="Back" leftMargin="25px" />            
          </SeatLayout>
        </ContentWrapper>
        {this.props.reserveList.length && <CustomerList reserveList={this.props.reserveList} /> || ''}
      </Theater>
    );
  }
}

SeatSelector.propTypes = {
  reserveList: PropTypes.array,
  bookedSeats: PropTypes.array,
  addReservation: PropTypes.func,
  enablePreloader: PropTypes.bool,
  seatBooked: PropTypes.bool,
  noOfCols: PropTypes.number,
  slectedSeats: PropTypes.array,
  noOfRows: PropTypes.number,
  userDetails: PropTypes.object,
  loadInitialPage: PropTypes.func,
};

export default SeatSelector;
