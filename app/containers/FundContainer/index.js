/**
 *
 * FundContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectFundContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getFundList, getFundDetails, getFundDetailsList } from './actions';

import FundExplorer from '../../components/FundExplorer';
import ErrorPage from '../../components/ErrorPage';

export class FundContainer extends React.Component {
  render() {
    return (
      this.props.error ?
      <ErrorPage/> :
      <FundExplorer
        fundList={this.props.fundList}
        loadCompare={this.props.loadCompare}
        getFundList={this.props.getFundList}
        getFundDetails={this.props.getFundDetails}
        fecthingDetails={this.props.fecthingDetails}
        fundListFetched={this.props.fundListFetched}
        getFundDetailsList={this.props.getFundDetailsList}
        fundDetailsList={this.props.fundDetailsList || {}}
      />
    );
  }
}

FundContainer.propTypes = {
  error: PropTypes.bool,
  fundList: PropTypes.object,
  loadCompare: PropTypes.bool,
  fundListFetched: PropTypes.bool,
  fecthingDetails: PropTypes.bool,
  fundDetailsList: PropTypes.object,
  getFundDetailsList: PropTypes.func,
  getFundList: PropTypes.func.isRequired,  
};

const mapStateToProps = makeSelectFundContainer();

function mapDispatchToProps(dispatch) {
  return {
    getFundList: (param) => dispatch(getFundList(param)),
    getFundDetails: (detailsId) => dispatch(getFundDetails(detailsId)),
    getFundDetailsList: (detailsIds) => dispatch(getFundDetailsList(detailsIds)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'fundContainer', reducer });
const withSaga = injectSaga({ key: 'fundContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FundContainer);
