import React, { Component } from 'react';
import styled from 'styled-components';
import styleVariables from "../styleVariables";

// width allowance for buttons. hardcoded for now. TODO: to be made dynamic
const buttonsOffsetWidth = 64;

const CarouselDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

// the inner carousel has the width of the viewport minus the buttons
const CarouselInner = styled.div`
  overflow: hidden;
  width: calc(100vw - ${buttonsOffsetWidth}px);
`;

const CarouselStrip = styled.div`
  white-space: nowrap;
  font-size: 0;
  transition: transform 230ms ease-in;
  transform: translateX(${props => props.position || 0}px);
  width: ${props => props.width}px;
`;

const CarouselItem = styled.div`
  display: inline-block;
  padding: 5px;
  width: ${props => props.width}px;
`;

const CarouselImg = styled.img`
    width: 100%;
    display: block;
`;

const CarouselNavButton = styled.button`
  align-self: center;
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 1px 0;
  font-size: 18px;
  line-height: 1.428571429;
  border-radius: 15px;
  visibility: ${props => props.hide ? 'hidden' : 'visible'};
`;

// hardcoded here for now. could be received as props to configure component
// number of images visible at one time
const IMAGES_MOBILE = 2;
const IMAGES_DESKTOP = 5;


class Carousel extends Component {
  state = {
    position: 0,
    itemWidth: 0,
    viewportWidth: 0,
    imagesVisible: 0
  };

  prevClickHandler = () => {
    let position = this.state.position + this.state.itemWidth;
    if (position > 0) {
      position = 0;
    }
    this.setState({
      position
    });
  };

  nextClickHandler = () => {
    let position = this.state.position - this.state.itemWidth;
    const stripWidth = this.state.itemWidth * this.props.items.length;
    const translateEnd = this.getTranslateEnd(
      this.state.viewportWidth,
      stripWidth
    );

    if (position < translateEnd) {
      position = translateEnd;
    }

    this.setState({
      position
    });
  };

  // translateEnd is the max translateX position
  getTranslateEnd(viewportWidth, stripWidth) {
    return viewportWidth - stripWidth - buttonsOffsetWidth;
  }

  // make sure we get the viewport width first before rendering the carousel
  // carousel cannot handle dynamic resizing of the browser screen at the moment
  componentDidMount() {
    const viewportWidth = window.innerWidth;
    const carouselInnerWidth = viewportWidth - buttonsOffsetWidth;

    let isMobile = true;

    if (viewportWidth >= styleVariables.desktopBreakPoint) {
      isMobile = false;
    }

    const imagesVisible = isMobile ? IMAGES_MOBILE : IMAGES_DESKTOP;
    const itemWidth = carouselInnerWidth / imagesVisible; // have to detect browser here

    this.setState({
      itemWidth,
      viewportWidth,
      imagesVisible
    });
  }

  // if refreshKey changes, we want to reset the position to the beginning
  componentWillReceiveProps(nextProps) {
      if (nextProps.refreshKey !== this.props.refreshKey) {
        this.setState({
            position: 0
        });
      }
  }

  render() {
    // dont render if stripWidth is still not calculated
    if (this.state.itemWidth === 0) {
      return null;
    }
        
    const stripWidth = this.props.items.length * this.state.itemWidth;
    const translateEnd = this.getTranslateEnd(
      this.state.viewportWidth,
      stripWidth
    );

    // hide the previous button when the position is 0
    const hidePrevButton = this.state.position === 0;

    // hide the next button when the translate position is at maximum or when there's less items
    // than the max visible
    const hideNextButton =
      this.props.items.length < this.state.imagesVisible ||
      this.state.position === translateEnd;

    const carouselItems = this.props.items.map(item => (
      <CarouselItem
        width={this.state.itemWidth}
        key={item.id}
        onClick={() => this.props.click(item.id)}
      >
        <CarouselImg src={item.src} />
      </CarouselItem>
    ));

    return (
      <CarouselDiv>
        <CarouselNavButton
          hide={hidePrevButton}
          onClick={this.prevClickHandler}
        >
          &lsaquo;
        </CarouselNavButton>
        <CarouselInner>
          <CarouselStrip position={this.state.position} width={stripWidth}>
            {carouselItems}
          </CarouselStrip>
        </CarouselInner>
        <CarouselNavButton
          hide={hideNextButton}
          onClick={this.nextClickHandler}
        >
          &rsaquo;
        </CarouselNavButton>
      </CarouselDiv>
    );
  }
}

export default Carousel;