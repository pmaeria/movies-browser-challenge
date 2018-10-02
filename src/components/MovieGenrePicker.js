import React from 'react';
import styled from 'styled-components';

import styleVariables from '../styleVariables';

const MovieGenrePicker = styled.div`
  text-align: center;

  @media (min-width: ${styleVariables.desktopBreakPoint}px) {
    text-align: right;
  }
`;

export default ({ change, genres }) => {
    const options = genres.map(genre => (
        <option key={genre} value={genre}>{genre}</option>
    ));

    return <MovieGenrePicker className="movie-genre-picker">
        <select defaultValue="" onChange={e => change(e.target.value)}>
            <option value="">All</option>
            {options}
        </select>
    </MovieGenrePicker>
};