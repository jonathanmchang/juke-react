import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios';
import { Link, Route, NavLink } from 'react-router-dom';
import AllAlbums from './AllAlbums';

export default class SingleArtist extends Component {
    constructor() {
        super();
        this.state = {
            selectedArtist: {},
            selectedArtistAlbums: [],
            selectedArtistSongs: []
        }
    }


    componentDidMount () {
        const artistId = +this.props.match.params.artistId
        // const artist = axios.get(`/api/artists/${artistId}`)
        // const album = axios.get(`/api/artists/${artistId}/albums`)
        // const song = axios.get(`/api/artists/${artistId}/songs`)
        // Promise.all([artist,album,song])
        //     .then(res => {
        //         return res.map((res) => {
        //             return res.data
        //         }
        //     )})
        //     .then((artist) => {
        //         console.log(artist)
        //         this.setState({
        //             selectedArtist: artist
        //         })
        //     })
            
        axios.get(`/api/artists/${artistId}`)
          .then(res => res.data)
          .then(artist => this.setState({
            selectedArtist: artist
          }));
        axios.get(`/api/artists/${artistId}/albums`)
          .then(res => res.data)
          .then(albums => this.setState ({
              selectedArtistAlbums: albums
          }));
        axios.get(`/api/artists/${artistId}/songs`)
        .then(res => res.data)
        .then(songs => this.setState ({
            selectedArtistSongs: songs
        }));

          
    }

    render() {
        const artist = this.state.selectedArtist;
        const artistId = this.state.selectedArtist.id 
        const albumRoute = `/artists/${artistId}/albums`
        const songRoute = `/artists/${artistId}/songs`
          return (
            <div>
              <h3>{ artist.name }</h3>
              <ul className="nav nav-tabs">
                <li><NavLink to={albumRoute} activeClassName="active">ALBUMS</NavLink></li>
                <li><NavLink to={songRoute} activeClassName="active">SONGS</NavLink></li>
              </ul>
        
              {
                <div>
                    <Route path={albumRoute} render = {() => <AllAlbums albums = {this.state.selectedArtistAlbums}/>}/>
                    <Route path={songRoute} render = {() => <Songs songs = {this.state.selectedArtistSongs}/>}/>  
                </div>
                }
            </div>
          );
        
    }
}
