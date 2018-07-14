/**
*
* FundDetails
*
*/

import React from 'react';

import {
  Header,
  PropertyWrapper,
  DetailsWrapper,
  DetailItem,
  Name,
  Value,
} from './styles';

class FundDetails extends React.PureComponent {
  render() {
    const data = this.props.details.data;
    const details = this.props.details.data.mutual_fund.details;
    return (
      <DetailsWrapper>
        <DetailItem>
          <PropertyWrapper>
            <Name>AMC</Name>
            <Value>{details.amc.name}</Value>
          </PropertyWrapper>
          <PropertyWrapper>
            <Name>Benchmark</Name>
            <Value>{details.benchmark_text}</Value>
          </PropertyWrapper>
          <PropertyWrapper>
            <Name>Category</Name>
            <Value>{details.category}</Value>
          </PropertyWrapper>
          <PropertyWrapper>
            <Name>Scheme Type</Name>
            <Value>{details.scheme_type}</Value>
          </PropertyWrapper>
          <PropertyWrapper>
            <Name>Risk</Name>
            <Value>{details.riskometer}</Value>
          </PropertyWrapper>
        </DetailItem>
        <DetailItem>
          <Header>Top Holdings</Header>
          <PropertyWrapper>
            <Name header>{data.holdings.top_10_holdings.header.script}</Name>
            <Value header>{data.holdings.top_10_holdings.header.allocation_percentage}</Value>
          </PropertyWrapper>
          {data.holdings.top_10_holdings.values.map((holding, i) => {
            return (<PropertyWrapper key={`${holding.script}_${i}`}>
              <Name>{holding.script}</Name>
              <Value>{holding.allocation_percentage}</Value>
            </PropertyWrapper>);
          })}
        </DetailItem>
        <DetailItem>
          <Header>Top Sectors</Header>
          <PropertyWrapper>
            <Name header>{data.holdings.top_5_sectors.header.sector}</Name>
            <Value header>{data.holdings.top_5_sectors.header.allocation_percentage}</Value>
          </PropertyWrapper>
          {data.holdings.top_5_sectors.values.map((holding, i) => {
            return (<PropertyWrapper key={`${holding.sector}_${i}`}>
              <Name>{holding.sector}</Name>
              <Value>{holding.allocation_percentage}</Value>
            </PropertyWrapper>);
          })}
        </DetailItem>
        <DetailItem>
          <Header>NAV Details</Header>
          <PropertyWrapper>
            <Name>NAV</Name>
            <Value>{data.mutual_fund.nav}</Value>
          </PropertyWrapper>
          <PropertyWrapper>
            <Name>Latest NAV</Name>
            <Value>{data.mutual_fund.last_day_nav}</Value>
          </PropertyWrapper>
          <PropertyWrapper>
            <Name>Change %</Name>
            <Value>{data.mutual_fund.nav_change_percentage}</Value>
          </PropertyWrapper>
        </DetailItem>
        <DetailItem>
          <Header>Performance</Header>
          <PropertyWrapper>
            <Name>One year return</Name>
            <Value>{details.yoy_return}%</Value>
          </PropertyWrapper>
          <PropertyWrapper>
            <Name>Three year return</Name>
            <Value>{details.return_3yr}%</Value>
          </PropertyWrapper>
          <PropertyWrapper>
            <Name>Five year return</Name>
            <Value>{details.return_5yr}%</Value>
          </PropertyWrapper>
        </DetailItem>
      </DetailsWrapper>
    );
  }
}

FundDetails.propTypes = {

};

export default FundDetails;
