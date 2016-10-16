import React, { PropTypes, Component } from 'react'
import {Button} from 'react-bootstrap';
import request from 'superagent';

class MatchingList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            myid: ""
        }
    }

    getList(twitterId) {
        console.log(twitterId);
        return new Promise((resolve,reject) => {
            // request.get("https://bocchi-japan.herokuapp.com/tweet_demo?id=" + twitterId)
            request.get("https://bocchi-japan.herokuapp.com/tweet?id=" + twitterId)
            .end(
                (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                }
            );
        });
    }

    onMyidChange(e) {
        this.setState({myid: e.target.value});
    }

    onGetButtonClick() {
        if(this.state.myid) {
            // this.getList("83496671")
            this.getList(this.state.myid)
            .then(
                (response) => {
                    console.log(Object.keys(response).length);
                    if(Object.keys(response).length > 0) {
                        this.setState({data: response});
                    } else {
                        alert("マッチングしませんでした。");
                    }
                }
            ).catch(
                (err) => { console.error(err); }
            );
        } else {
            alert("ツイッターIDを入力してください。");
        }
    }

    render() {
        // console.log(this.state.data.user.id);
        let youid = "";
        let place = "取得ボタンをおしてね！";
        let match = "Find me!!";
        if(this.state.data) {
            youid = this.state.data.user.screen_name;
            place = this.state.data.place.country + " " + this.state.data.place.name + "now!!";
            match = "MATCH!";
            // console.log(this.state.data);
        }
        return (
            <div className="wrapper">
                <div className="logo">
                    <p className="logo-text">Bocchi Japan</p>
                    <p><input className="myid" type="text" placeholder="input twitter id." value={this.state.myid} onChange={this.onMyidChange.bind(this)}/></p>
                    <p><Button bsStyle="warning" onClick={this.onGetButtonClick.bind(this)}>Matiching!!</Button></p>
                </div>
                <div className="match_area">
            		<p className="place"><span className="text2">{place}</span></p>
                </div>
                <span className="match"><p className="text3">{youid}</p><p className="text">{match}</p></span>
                <p className="img">
                    <img className="pumpkin" src="src/img/pumpkin-human.png" alt="かぼちゃマスクをかぶった品源人間"/>
                </p>
                <div className="matching-view-area">
                </div>
            </div>

        )
    }
}
export default MatchingList
