import React from 'react';
import PropTypes from 'prop-types';
import SVGInliner from 'react-inlinesvg';
import icons from './data';
import { uuid } from '../../utils/index';

const svgFormatter = (svgCode, color, newClassId, keepOriginal) => {
  let newCode = svgCode;
  if (!keepOriginal) {
    newCode = svgCode
      .replace(/fill:[^transparent].*?;/g, `fill:${color}`) // replace the color set in an embedded stylesheet, but ignore when it contains transparent
      .replace(/fill=["'][^transparent].*?["']/g, `fill="${color}"`); // replace the color set inline in the svg
  }
  // uniqiify all of the classes of thesvg emebedded stylesheet
  let uniqClassesCode = `${newCode}`;
  const allClasses = `${newCode}`.match(/class="[^"]*/g);
  const uniqueClasses = [...new Set(allClasses)];

  uniqueClasses.forEach(elem => {
    const uniqeName = `svgClass${uuid()}`;
    const className = elem.substring(elem.indexOf('"') + 1, elem.length);
    if (newCode.includes(`.${className}{`)) {
      uniqClassesCode = uniqClassesCode
        .replace(new RegExp(`.${className}{`, 'g'), `.${uniqeName}{`)
        .replace(
          new RegExp(`class="${className}"`, 'g'),
          `class="${uniqeName}"`
        );
    }
  });

  return uniqClassesCode;
};

export default function Icon({ id, iconStyle, color, keepOriginal }) {
  const { src, alt } = icons[id];
  return (
    <SVGInliner
      key={id + iconStyle + color}
      className={iconStyle}
      src={src}
      alt={alt}
      uniquifyIDs
      onError={e => {
        console.error(`svg-inliner ${id} error:`, e);
      }}
      preProcessor={code => svgFormatter(code, color, id, keepOriginal)}
    />
  );
}

Icon.defaultProps = {
  iconStyle: 'icon',
  color: null,
  keepOriginal: false,
};

Icon.propTypes = {
  id: PropTypes.string.isRequired,
  iconStyle: PropTypes.string,
  color: PropTypes.string, // TODO will need to be required when we implement theaming the webapp
  keepOriginal: PropTypes.bool,
};
