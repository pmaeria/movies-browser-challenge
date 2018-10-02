import React from 'react';
import styled from 'styled-components';

const Strong = styled.strong`
    display: inline-block;
    margin-right: 5px;
`;

// helper component to filter out N/A
const MetaDataField = ({ label, value }) => {
    if(value === 'N/A') {
        return (null);
    }
    return <li>
        <Strong>{label}:</Strong><span>{value}</span>
    </li>;
};

export default ({ movie }) => {

    const website = movie.Website !== 'N/A' ? <li><a href={movie.Website}>Website</a></li> : null;

    return <div className="movie-metadata">
        <ul>
            <MetaDataField label="Year" value={movie.Year}></MetaDataField>
            <MetaDataField label="Rated" value={movie.Rated}></MetaDataField>
            <MetaDataField label="Director" value={movie.Director}></MetaDataField>
            <MetaDataField label="Writer" value={movie.Writer}></MetaDataField>
            <MetaDataField label="Actors" value={movie.Actors}></MetaDataField>
            <MetaDataField label="Plot" value={movie.Plot}></MetaDataField>
            <MetaDataField label="Language" value={movie.Language}></MetaDataField>
            <MetaDataField label="Country" value={movie.Country}></MetaDataField>
            <MetaDataField label="Awards" value={movie.Awards}></MetaDataField>
            <MetaDataField label="Metascore" value={movie.Metascore}></MetaDataField>
            <MetaDataField label="Rating" value={movie.Rating}></MetaDataField>
            <MetaDataField label="Votes" value={movie.Votes}></MetaDataField>
            <MetaDataField label="Id" value={movie.Id}></MetaDataField>
            <MetaDataField label="Type" value={movie.Type}></MetaDataField>
            <MetaDataField label="DVD" value={movie.DVD}> </MetaDataField>
            <MetaDataField label="BoxOffice" value={movie.BoxOffice}></MetaDataField>
            <MetaDataField label="Production" value={movie.Production}></MetaDataField>
            {website}
        </ul>
      </div>;
}