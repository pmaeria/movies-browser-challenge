import React from 'react';
import styled from 'styled-components';

const Figure = styled.figure`
    margin: 0;
`;
const Img = styled.img`
    display: block;
    width: 100%;
`;

export default (props) => {
    return <div className="movie-image">
        <Figure>
          <Img src={props.src} />
        </Figure>
      </div>;
};