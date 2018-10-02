import React from 'react';
import styled from 'styled-components';
import MovieHeader from './MovieHeader';
import MovieImage from './MovieImage';
import MovieMetaData from './MovieMetaData';

import styleVariables from '../styleVariables';

const MovieDetails = styled.div`
    padding: 0 35px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: max-content;
    grid-gap: 16px;
    grid-template-areas: 'header header'
                        'image metadata';
    @media (min-width : ${() => styleVariables.desktopBreakPoint}px) {
        & {
            grid-template-columns: 1fr 2fr;
            grid-template-rows: auto;
            grid-template-areas: 'image header'
                                'image metadata'
        }
    }
    & .movie-header {
        grid-area: header;
    }
    & .movie-image {
        grid-area: image;
    }
    & .movie-metadata {
        grid-area: metadata;
    }
`;

export default ({ movie }) => {
    return <MovieDetails>
        <MovieHeader 
            title={movie.Title} 
            runtime={movie.Runtime} 
            genre={movie.Genre} 
            released={movie.Released} />
        <MovieImage src={movie.Poster} />
        <MovieMetaData movie={movie}></MovieMetaData>
      </MovieDetails>;
};