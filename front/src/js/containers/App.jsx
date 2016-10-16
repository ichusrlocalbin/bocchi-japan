import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MatchingList from '../components/MatchingList'
import * as DummyActions from '../actions/dummy'

class App extends Component {
  render() {
    const { value, actions } = this.props;
    return (
        <div>
            <MatchingList/>
        </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
}

// Appコンポーネントにstateを流し込む
function mapStateToProps(state) {
  return state.counter
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DummyActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
