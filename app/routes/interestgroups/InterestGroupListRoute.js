// @flow

import { compose } from 'redux';
import { connect } from 'react-redux';
import { dispatched } from 'react-prepare';
import {
  fetchAll,
  createInterestGroup
} from 'app/actions/InterestGroupActions';
import InterestGroupList from './components/InterestGroupList';
import { selectInterestGroups } from 'app/reducers/interestGroups';

const mapStateToProps = state => ({
  interestGroups: selectInterestGroups(state)
});

const mapDispatchToProps = { fetchAll, createInterestGroup };

export default compose(
  dispatched((props, dispatch) => dispatch(fetchAll()), {
    componentWillReceiveProps: false
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(InterestGroupList);
