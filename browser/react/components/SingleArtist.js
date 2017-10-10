import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        console.log(this.state)
        return (
            <div>
                <h3>{this.state.selectedArtist.name}</h3>
                <h4>Albums</h4>
                <AllAlbums albums={this.state.selectedArtistAlbums} />
                <h4>Songs</h4>
                <Songs songs={this.state.selectedArtistSongs}/>
            </div>
        )
    }
}