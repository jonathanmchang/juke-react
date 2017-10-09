import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                <div className="col-xs-10">
                    <h4>Albums</h4>
                    {this.state.selectedArtistAlbums.map(album => (
                        <div className="col-xs-4" key={ album.id }>
                        <Link to={`/albums/${album.id}`} className="thumbnail">
                            <img src={ album.imageUrl } />
                            <div className="caption">
                            <h5>
                                <span>{ album.name }</span>
                            </h5>
                            <small>{ album.songs.length } songs</small>
                            </div>
                        </Link>
                        </div>
                    ))}
                  </div>
                <h4>SONGS</h4>
                <Songs songs={this.state.selectedArtistSongs}/>
            </div>
        )
    }
}