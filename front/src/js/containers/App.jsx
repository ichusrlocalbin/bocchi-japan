import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Logo from '../components/Logo'
import MatchingView from '../components/MatchingView'
import MatchingList from '../components/MatchingList'
import * as CounterActions from '../actions/counter'

class App extends Component {
  render() {
    const { value, actions } = this.props;
    return (
        <div>
            <Logo/>
            <MatchingView/>
            <MatchingList/>
        </div>
    )
  }
}

App.propTypes = {
  value: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}

// Appコンポーネントにstateを流し込む
function mapStateToProps(state) {
  return state.counter
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CounterActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
