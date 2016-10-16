import React, { PropTypes, Component } from 'react'

import imgTest from '../../img/test.png'

class MatchingView extends Component {
  render() {
    return (
        <div className="wrapper">
            <div className="logo">
                 <p>bocchi Japan</p>
            </div>
            <div className="match_area">
        		<p className="place"></p>
            </div>
            <span className="match"><p className="text">MATCH!</p></span>
            <p className="img">
                <img src="src/img/pumpkin-human.png" alt="かぼちゃマスクをかぶった品源人間"/>
            </p>
            <div className="match_area_id">
                <input className="myid" type="text" placeholder="input twitter id."/>
                <span className="youid">hoge</span>
            </div>
        </div>
    )
  }
}
export default MatchingView
