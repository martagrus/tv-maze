import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ShowPreview.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import moment from 'moment';

export class ShowPreview extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        selectedShow: null
      }

      this.displayShowPreview = this.displayShowPreview.bind(this);
    }
  
    componentDidMount() {
      axios.get(`http://api.tvmaze.com/shows/${this.props.match.params.id}`).then((show) => {
        this.setState({selectedShow: show.data})
      })
  
    }
  
    displayHeader(selectedShow) {
      return (
        <header className='showHeader' style={{backgroundImage: "url('" + selectedShow.image.original + "')"}}></header>
        )
    }

    displayMainInfo(selectedShow) {
      let date = new Date(selectedShow.premiered);


      return (
        <main className='show-desc'> 
          <h1>{selectedShow.name}</h1>
          <div className='coolness-meter'>
            <div style={{width: selectedShow.rating.average * 10 + '%' }}>
            {selectedShow.rating.average * 10}%
            </div>
          </div>
          <h2>Premiere date: {moment(date).format("DD MMM YYYY")}</h2>
          <h2>Genre: {selectedShow.genres[0]}</h2>
          <p className='show-summary-long'>{selectedShow.summary.replace(/(<([^>]+)>)/ig, '')}</p>
          <a className='btn' target='_blank' href={`https://www.imdb.com/title/${selectedShow.externals.imdb}`}>Read more on IMDB</a>
        </main>
      )
    }

    displayShowPreview() {
        const {selectedShow} = this.state;

        return (
            <section className='show-preview'>
                {this.displayHeader(selectedShow)}
                {this.displayMainInfo(selectedShow)}
            </section>
        )
    }

    render() {
      let showPreview;
  
      if (this.state.selectedShow) {
        showPreview = this.displayShowPreview();
      } else {
        showPreview = (
            <div className='loader'>
                <Spinner></Spinner>
            </div>
        )
      }
  
      return  (
        <div className="shows-list">
          <Link to="/"><button className='btn'>Back</button></Link>
          <h1>{showPreview}</h1>
        </div>
      );
    }
  }
  
  export default ShowPreview;
  