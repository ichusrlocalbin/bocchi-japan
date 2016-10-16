import React, { PropTypes, Component } from 'react'
import {Button} from 'react-bootstrap';
import request from 'superagent';

class MatchingList extends Component {

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

        console.log(response.user);

        return new Promise((resolve,reject) => {
            request.get("https://bocchi-japan.herokuapp.com/tweet_demo?id=" + twitterId)
            .end(
                (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(res.text));
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
            (obj) => {
                console.debug(obj);
            }
        ).catch(
            (err) => { console.error(err); }
        );
    }

    render() {
        return (
            <div className="matching-view-area">
                <Button onClick={this.onGetButtonClick.bind(this)}>取得</Button>
            </div>
        )
    }
}
export default MatchingList
