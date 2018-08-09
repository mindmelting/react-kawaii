import React, { Component } from 'react';
import PropTypes from 'prop-types';
import paths from './paths';
import Face from '../common/face/Face';
import Wrapper from '../common/wrapper/Wrapper';

class AnimatePlanet extends Component {
  componentDidUpdate() {
    if (this.svgAnimate) {
      this.svgAnimate.beginElement();
    }
  }

  render() {
    const { color, mood, size, scale } = this.props;
    // Default to new color as the existing From Color
    let fromColor = color;
    if (this.svgAnimate) {
      const existingToColor = this.svgAnimate.getAttribute('to');
      if (existingToColor) {
        fromColor = existingToColor;
      }
    }

    return (
      <Wrapper
        style={{ width: size, height: size }}
        width={size}
        height={size}
        color={color}
      >
        <svg
          width={size}
          height={size}
          version="1.1"
          viewBox="0 0 134 134"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path d={paths.shape} id="kawaii-planet__shape--path" />
            <path d={paths.shadow} id="kawaii-planet__shadow--path" />
          </defs>
          <g id="kawaii-planet">
            <g id="kawaii-planet__body">
              <mask id="mask-2" fill="#fff">
                <use xlinkHref="#kawaii-planet__shape--path" />
              </mask>
              <use
                id="kawaii-planet__shape"
                xlinkHref="#kawaii-planet__shape--path"
                fill={fromColor}
              >
                <animate
                  ref={el => (this.svgAnimate = el)}
                  attributeName="fill"
                  attributeType="css"
                  dur="0.3s"
                  from={fromColor}
                  to={color}
                  fill="freeze"
                />
              </use>
              <mask id="mask-4" fill="#fff">
                <use xlinkHref="#kawaii-planet__shadow--path" />
              </mask>
              <use
                id="kawaii-planet__shadow"
                fill="#000000"
                opacity=".1"
                xlinkHref="#kawaii-planet__shadow--path"
              />
            </g>
            <Face
              animateSmile
              scale={scale}
              mood={mood}
              transform="translate(34 57)"
            />
          </g>
        </svg>
      </Wrapper>
    );
  }
}

AnimatePlanet.propTypes = {
  /**
   * Size of the width
   * */
  size: PropTypes.number,
  mood: PropTypes.oneOf(['sad', 'shocked', 'happy', 'blissful', 'lovestruck']),
  /**
   * Hex color
   */
  color: PropTypes.string,
  scale: PropTypes.number,
};

AnimatePlanet.defaultProps = {
  size: 150,
  mood: 'blissful',
  color: '#FCCB7E',
  scale: 1,
};

export default AnimatePlanet;
