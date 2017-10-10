import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Path from 'path'; 

const test = Path.dirname()

export default class SingleAlbum extends Component {
  constructor() {
    super();
    this.state = {
      selectedAlbum: {}
    }
  }

  componentDidMount () {
    axios.get(`/api/albums/${+this.props.match.params.albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: album
      }));
  }

  render () {
    const album = this.state.selectedAlbum;
    console.log(this.props)
    console.log('***dirname: ',test)
    return (
      <div className="album">
        <div>
          <h3>
            { album.name }&nbsp;
            <a href={`mailto:?subject=${album.name}&body=Check out this album http://${window.location.host}/#${this.props.location.pathname}`}>
              <button className="btn btn-default btn-xs">
                <span className="glyphicon glyphicon-share">
                </span>
              </button>
            </a>  
          </h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
