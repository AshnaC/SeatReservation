/**
*
* FundExplorer
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import FundCompare from '../FundCompare';
import FundList from '../FundList';
import Button from '../Button';
import LoadingIndicator from '../LoadingIndicator';

import {
  SearchResultDropDown,
  CompareListWrapper,
  SearchInputWrapper,
  SpinnerContainer,  
  ContentContainer,
  ContentWrapper,
  CompareItem,
  SearchItem,
  FundName,
  CloseLink,
  BackDrop,
  ShowMore,
  NoData,
  Input,
} from './styles';

class FundExplorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { compareList: [], showSearchDropDown: true };
    this.onInputClick = this.onInputClick.bind(this);    
    this.addToCompare = this.addToCompare.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onFundsCompare = this.onFundsCompare.bind(this);
    this.getFundDetails = this.getFundDetails.bind(this);
    this.searchFunds = debounce(this.onSearchInputChange, 1000);    
    this.onDisableComparePage = this.onDisableComparePage.bind(this);
    this.disableSearchDropDown = this.disableSearchDropDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.fundListFetched && this.props.fundListFetched) {
      this.setState({ showSearchDropDown: true });
    }
    if (!prevProps.loadCompare && this.props.loadCompare) {
      this.setState({ loadComparePage: true });
    }
  }

  onSearchInputChange(searchParam) {
    this.props.getFundList({ search: searchParam });
    this.setState({ searchParam });
  }

  onDisableComparePage() {
    this.setState({ loadComparePage: false });
  }

  onFundsCompare() {
    const fundsToFetch = [];
    const fundsToCompare = this.state.compareList;
    fundsToCompare.map((fund) => {
      if (!this.props.fundDetailsList[fund.details_id]) {
        fundsToFetch.push(fund.details_id);
      }
    });
    if (fundsToFetch.length > 0) {
      this.props.getFundDetailsList(fundsToFetch);
    }
    else {
      this.setState({ loadComparePage: true });
    }
  }

  getFundDetails(detailsId) {
    if (detailsId === this.state.selectedFundId) {
      this.setState({ selectedFundId: '' }); 
    }
    else {
      this.setState({ selectedFundId: detailsId });
      if (!this.props.fundDetailsList[detailsId]) {
        this.props.getFundDetails(detailsId);
      }
    }
  }

  disableSearchDropDown() {
    this.setState({ showSearchDropDown: false });
  }

  handleSearch(event) {
    const value = event.target.value;
    if (value && value.length > 2 && value !== this.state.value) {
      this.searchFunds(value);
    }
    // to handle 3 char when same data is entered after dropdown disabled
    if (value === this.state.searchParam) {
      this.setState({ showSearchDropDown: true });
    }
  }

  onInputClick() {
    if( this.props.fundList && this.props.fundList.search_results ){
      this.setState({ showSearchDropDown: true });
    }
  }

  showResults = (detailsId) => () => {
    let displayList = undefined;
    if(detailsId) {
      displayList = this.props.fundList.search_results.filter((fund) => fund.details_id === detailsId);
      this.getFundDetails(detailsId);
    }
    else{
      displayList = this.props.fundList.search_results;
    }
    this.setState({ showResult: true, displayList, showSearchDropDown: false });
  }
  
  addToCompare(fund) {
    this.setState((prevState) => {
      const compareList = [...prevState.compareList];
      if (!compareList.find((item) => item.details_id === fund.details_id)) {
        compareList.push(fund);
      }
      return { compareList };
    });
  }

  removeFromCompare = (fund) => () => {
    this.setState((prevState) => {
      const compareList = [...prevState.compareList];
      const newList = compareList.filter((item) => item.details_id !== fund.details_id);
      return { compareList: newList };
    });
  }

  render() {
    const funds = (this.props.fundList && this.props.fundList.search_results);
    return (
      <ContentContainer>
        {this.props.fecthingDetails && 
        <SpinnerContainer><LoadingIndicator /></SpinnerContainer>}
        <ContentWrapper>
          <SearchInputWrapper>
            <Input large onKeyUp={this.handleSearch} onClick ={this.onInputClick}/>
            {funds && this.state.showSearchDropDown &&
              <SearchResultDropDown>
                <BackDrop onClick={this.disableSearchDropDown} />
                {funds.length === 0 ? <NoData>No matching results</NoData> :
                  <div>
                    {funds.slice(0, 9).map((fund) => {
                      return (
                        <SearchItem key={fund.details_id} onClick={this.showResults(fund.details_id)}>
                          {fund.name}
                        </SearchItem>);})}
                    {funds.length > 0 && <ShowMore onClick={this.showResults()}>Show More</ShowMore>}
                  </div>}
              </SearchResultDropDown>}
          </SearchInputWrapper>
          {this.state.showResult && this.state.displayList && !this.state.loadComparePage &&
            <FundList
              fundList={this.state.displayList}
              selectedFundId={this.state.selectedFundId}
              addToCompare={this.addToCompare}
              getFundDetails={this.getFundDetails}
              fundDetailsList={this.props.fundDetailsList} />}
          {this.state.loadComparePage &&
            <FundCompare
              compareList={this.state.compareList}
              onBack={this.onDisableComparePage}
              fundDetailsList={this.props.fundDetailsList} />}
        </ContentWrapper>
        {this.state.compareList.length > 0 &&
          <CompareListWrapper>
            {this.state.compareList.map((fundToCompare) => {
              return (
                <CompareItem key={fundToCompare.details_id}>
                  <FundName>{fundToCompare.name}</FundName>
                  <CloseLink onClick={this.removeFromCompare(fundToCompare)}>&times;</CloseLink>
                </CompareItem>);})}
            {this.state.compareList.length > 1 &&
              <ShowMore compare onClick={this.onFundsCompare}>Compare</ShowMore>}
          </CompareListWrapper>}
      </ContentContainer>
    );
  }
}

FundExplorer.propTypes = {
  fundList: PropTypes.object,
  fundListFetched: PropTypes.bool,
  fundDetailsList: PropTypes.object,
  getFundDetails: PropTypes.func,
  getFundList: PropTypes.func,
  getFundDetailsList: PropTypes.func,
  fecthingDetails: PropTypes.bool,
};

export default FundExplorer;
