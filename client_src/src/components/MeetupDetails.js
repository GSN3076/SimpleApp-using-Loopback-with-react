import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class MeetupDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: ''
        }
    }

    componentWillMount() {
        this.getupMeetup();

    }
    getupMeetup() {
        let meetupID = this.props.match.params.id;
        axios.get(`http://localhost:3000/api/meetupzs/${meetupID}`)
            .then(response => {
                this.setState({ details: response.data }, () => {
                    console.log(this.state);

                })
            })
            .catch(err => console.log(err));
    }

    onDelete(){
        let meetupID =this.state.details.id;
        axios.delete(`http://localhost:3000/api/meetupzs/${meetupID}`)
        .then(response => {
            this.props.history.push('/');
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <br />
                <Link className="btn grey" to='/'>Back</Link>
                <h1>{this.state.details.name}</h1>
                <ul className="collection">
                    <li className="collection-item">City: <h5>{this.state.details.city}</h5></li>
                    <li className="collection-item">Address:<h5>{this.state.details.address}</h5></li>
                </ul>
                <Link className="btn" to={`/meetups/edit/${this.state.details.id}`}>Edit</Link>
                <button onClick={this.onDelete.bind(this)} className="btn red right" >Delete</button>
            </div>
        )
    }
}

export default MeetupDetails;
