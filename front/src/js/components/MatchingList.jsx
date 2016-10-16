import React, { PropTypes, Component } from 'react'
import {Button} from 'react-bootstrap';
import request from 'superagent';

class MatchingList extends Component {

    getList(twitterId) {
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
