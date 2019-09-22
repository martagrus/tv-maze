import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ShowPreview.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

export class ShowPreview extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        selectedShow: []
      }

      this.displayShowPreview = this.displayShowPreview.bind(this);
    }
  
    componentDidMount() {
      axios.get(`http://api.tvmaze.com/shows/${this.props.match.params.id}`).then((show) => {
        this.setState({selectedShow: show.data})
      })
  
    }
  
    // displayHeader(selectedShow) {
    //     return <header className='showHeader' style={{backgroundImage: "url('" + selectedShow.image.original + "')"}}></header>
    // }

    // displayMainInfo(selectedShow) {

    // }

    // displayShowPreview() {
    //     const {selectedShow} = this.state;

    //     return (
    //         <section>
    //             {this.displayHeader(selectedShow)}
    //             {this.displayMainInfo(selectedShow)}
    //         </section>
    //     )
    // }

    render() {
    //   let showPreview;
  
    //   if (this.state.selectedShow) {
    //     showPreview = this.displayShowPreview();
    //   } else {
    //     showPreview = (
    //         <div className='loader'>
    //             <Spinner></Spinner>
    //         </div>
    //     )
    //   }
  
      return  (
        <div className="shows-list">
          <Link to="/"><button>Back</button></Link>
          {/* <h1>{showPreview}</h1> */}
        </div>
      );
    }
  }
  
  export default ShowPreview;
  