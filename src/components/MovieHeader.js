import React from 'react';
import styled from 'styled-components';

const MovieHeader = styled.header`
    text-align: center;
`;

const MovieTitle = styled.h1`
    margin: 0;
`;

const MetaDataList = styled.ul`
    display: flex;
    justify-content: center;
`;

const MetaDataItem = styled.ul`
    padding: 0 5px;
    border-left: 1px solid currentColor;

    &:first-child {
        border: 0;
    }
`;

export default (props) => {
    return <MovieHeader className="movie-header">
        <MovieTitle>{props.title}</MovieTitle>
        <MetaDataList>
          <MetaDataItem>{props.runtime}</MetaDataItem>
          <MetaDataItem>{props.genre}</MetaDataItem>
          <MetaDataItem>{props.released}</MetaDataItem>
        </MetaDataList>
      </MovieHeader>;
};
