import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ShowList.css';
import Spinner from '../Spinner/Spinner';

export class ShowList extends React.Component {
  constructor() {
      super()

      this.state= {
        shows: []
      }

      this.setTitleFilter = this.setTitleFilter.bind(this)
  }

componentDidMount() {
    axios.get('http://api.tvmaze.com/shows').then(res => {
      let shows = res.data.map(show => {
        return {
          id: show.id,
          name: show.name,
          desc: show.summary.replace(/(<([^>]+)>)/ig, '').substring(0, 100) + '...',
          img: show.image.medium
        }
      })


      this.setState({shows, showsToDisplay: shows})
    })
}

displayShows() {
  if (this.state.showsToDisplay === 0) {
    return <div className='loader'>No match</div>
  } else if (this.state.shows.length > 0) {
      return this.state.showsToDisplay.map((show, key)=> (
      <div className="card" key={key}>
          <img src={show.img} className="card-img-top" alt="Show poster"></img>
          <div className="card-body">
            <h5 className="card-title">{show.name}</h5>
            <p className="card-text">{show.desc}</p>
            <Link className="btn btn-primary" to={`show/${show.id}`}>Read More</Link>
          </div>
        </div>
      ))
    } else {
      return (
        <div className='loader'>
          <Spinner></Spinner>
        </div>
      )}
}

setTitleFilter(ev) {
  const {shows} = this.state;

  let showsToDisplay = shows.filter(show => {
    return show.name.toLowerCase().startsWith(ev.target.value.toLowerCase)
  })

  this.setState({showsToDisplay})
}

  render() {
    return (
      <div className='flex-container'>
        <div className='show-search'>
          <h4>Find your favourite show</h4>
          <input type='text' placeholder='Type the title here' onKeyUp={this.setTitleFilter}></input>
        </div>
        <section className='show-list'>
          {this.displayShows()}
        </section>
      </div>
    );
    }
}

export default ShowList;
