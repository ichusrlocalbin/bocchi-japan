import React, { PropTypes, Component } from 'react'
import {Button} from 'react-bootstrap';
import request from 'superagent';

class MatchingList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null
        }
    }

    getList(twitterId) {
        // const response = {
        //   "full_text": "enjoying coding! #bocchiJapan ",
        //   "lang": "ja",
        //   "create_at": "2016-10-16 04:39:49 +0000",
        //   "user": {
        //     "screen_name": "hasebe_test",
        //     "name": "hasebe_test",
        //     "lang": "ja",
        //     "id": "787511839210901505"
        //   },
        //   "place": {
        //     "name": "Yamato-shi",
        //     "country": "Japan"
        //   }
        // }

        // return new Promise((resolve,reject) => {
        //     resolve(response);
        // });

        return new Promise((resolve,reject) => {
            request.get("https://bocchi-japan.herokuapp.com/tweet_demo?id=" + twitterId)
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

        // let p = new Promise(function(resolve,reject) {
        //     window.setTimeout(function() {
        //         resolve(true);
        //         //reject('error');
        //     },1000);
        // });
        // return new Promise() {
        //     (resolve, reject) => {
        //         request.get("https://bocchi-japan.herokuapp.com/tweet_demo?id=" + twitterId)
        //         .end(
        //             (err, res) => {
        //                 if (err) {
        //                     reject(err);
        //                 } else {
        //                     resolve(JSON.parse(res.text);
        //                 }
        //             }
        //         );
        //     }
        // };


    }

    onGetButtonClick() {
        console.log("hoge");
        this.getList("83496671")
        .then(
            (response) => {
                console.log(response);
                this.setState({data: response});
            }
        ).catch(
            (err) => { console.error(err); }
        );
    }

    render() {
        // console.log(this.state.data.user.id);
        let youid = "";
        let place = "取得ボタンをおしてね！";
        if(this.state.data) {
            youid = this.state.data.user.screen_name;
            place = this.state.data.place.country + " " + this.state.data.place.name + "now!!";
            console.log(this.state.data);
        }

        return (
            <div className="wrapper">
                <div className="logo">
                     <p>bocchi Japan</p>
                </div>
                <div className="match_area">
            		<p className="place"><span className="text2">{place}</span></p>
                </div>
                <span className="match"><p className="text">MATCH!</p></span>
                <p className="img">
                    <img src="src/img/pumpkin-human.png" alt="かぼちゃマスクをかぶった品源人間"/>
                </p>
                <div className="match_area_id">
                    <input className="myid" type="text" placeholder="input twitter id."/>
                    <span className="youid">{youid}</span>
                </div>
                <div className="matching-view-area">
                    <Button onClick={this.onGetButtonClick.bind(this)}>取得</Button>
                </div>
            </div>

        )
    }
}
export default MatchingList
