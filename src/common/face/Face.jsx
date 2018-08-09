import React, { Component } from 'react';
import PropTypes from 'prop-types';
import paths from './paths';

// Expects a scale between 0 and 1 - where 1 = happy
function getScaleSmilePath(scale) {
  const factor = scale * 2 - 1; // i.e sad = -1, happy = +1
  const p1 = { x: 0, y: -5 * factor };
  const c1 = { x: 0, y: 5 * factor };
  const p2 = { x: 15, y: -5 * factor };
  const c2 = { x: 15, y: 5 * factor };
  const points = [p1, c1, c2, p2];
  const p = point => `${point.x},${point.y}`; // write a point as a coord
  return `M${p(points[0])} C${p(points[1])} ${p(points[2])} ${p(points[3])}`;
}

class Face extends Component {
  componentDidUpdate() {
    if (this.svgSmileAnimate) {
      this.svgSmileAnimate.beginElement();
    }
  }
  render() {
    const { mood, animateSmile, scale, ...rest } = this.props;

    let animateSmileFromPath;
    let animateSmileToPath;

    if (animateSmile) {
      const toPath = getScaleSmilePath(scale);
      animateSmileFromPath = this.svgSmileAnimate
        ? this.svgSmileAnimate.getAttribute('to')
        : toPath;
      animateSmileToPath = toPath;
    }

    return (
      <g id="kawaii-face" {...rest}>
        <defs>
          <path d={paths.defs} id="kawaii-face__path-1" />
        </defs>

        {!animateSmile && (
          <g
            id="kawaii-face__mouth"
            transform="translate(18.000000, 16.000000)"
          >
            {(mood === 'blissful' || mood === 'lovestruck') && (
              <g
                id="kawaii-face__mouth__joy"
                transform="translate(0.000000, 1.000000)"
              >
                <mask id="kawaii-face__mask-2" fill="white">
                  <use xlinkHref="#kawaii-face__path-1" />
                </mask>
                <use
                  id="Combined-Shape"
                  fill="#000000"
                  xlinkHref="#kawaii-face__path-1"
                />
                <path
                  d={paths.tongue}
                  id="kawaii-face__tongue"
                  fill="#E74144"
                  mask="url(#kawaii-face__mask-2)"
                  transform="translate(15.000000, 11.431885) scale(1, -1)
            translate(-15.000000, -11.431885)"
                />
              </g>
            )}
            {mood === 'happy' && (
              <path
                d={paths.happy}
                id="kawaii-face__mouth__happy"
                fill="#000000"
              />
            )}
            {mood === 'shocked' && (
              <ellipse
                id="kawaii-face__mouth__shocked"
                cx="15"
                cy="14"
                rx="9"
                ry="10"
                fill="#000000"
              />
            )}
            {mood === 'sad' && (
              <path
                d={paths.sad}
                id="kawaii-face__mouth__sad"
                fill="#000000"
                transform="translate(14.999999, 5.500000) scale(1, -1) translate(-14.999999, -5.500000)" // eslint-disable-line max-len
              />
            )}
          </g>
        )}

        {animateSmile && (
          <g
            id="kawaii-face__mouth"
            transform="translate(25.000000, 21.000000)"
          >
            <path
              id="kawaii-face__mouth__animated"
              fill="none"
              stroke="#000000"
              strokeWidth="3"
              strokeLinecap="round"
              d={animateSmileFromPath}
            >
              <animate
                ref={el => (this.svgSmileAnimate = el)}
                attributeName="d"
                attributeType="XML"
                dur="0.3s"
                repeatCount="1"
                from={animateSmileFromPath}
                to={animateSmileToPath}
                fill="freeze"
              />
            </path>
          </g>
        )}

        <g
          id="kawaii-face__blush"
          transform="translate(0.000000, 15.000000)"
          fill="#000000"
          opacity="0.2"
        >
          <circle id="Oval" cx="3" cy="3" r="3" />
          <circle id="Oval" cx="63" cy="3" r="3" />
        </g>
        <g
          id="kawaii-face__eyes"
          transform="translate(2.000000, 0.000000)"
          fill="#000000"
        >
          {mood === 'blissful' && (
            <g
              id="kawaii-face__eyes__arc"
              transform="translate(1.000000, 0.000000)"
            >
              <path d={paths.bliss1} id="Fill-5" />
              <path d={paths.bliss2} id="Fill-5" />
            </g>
          )}
          {(mood === 'happy' || mood === 'sad' || mood === 'shocked') && (
            <g
              id="kawaii-face__eyes__circle"
              transform="translate(1.000000, 2.000000)"
            >
              <circle id="Oval-3" cx="4.5" cy="4.5" r="4.5" />
              <circle id="Oval-3" cx="56.5" cy="4.5" r="4.5" />
            </g>
          )}
          {mood === 'lovestruck' && (
            <g
              id="kawaii-face__eyes__heart"
              transform="translate(0.000000, 2.000000)"
              fillRule="nonzero"
            >
              <path d={paths.lovestruck1} id="Shape" />
              <path d={paths.lovestruck2} id="Shape" />
            </g>
          )}
        </g>
      </g>
    );
  }
}

Face.propTypes = {
  mood: PropTypes.oneOf(['sad', 'shocked', 'happy', 'blissful', 'lovestruck']),
  animateSmile: PropTypes.bool,
  scale: PropTypes.number,
};

Face.defaultProps = {
  mood: 'blissful',
  animateSmile: false,
  scale: 1,
};

export default Face;
