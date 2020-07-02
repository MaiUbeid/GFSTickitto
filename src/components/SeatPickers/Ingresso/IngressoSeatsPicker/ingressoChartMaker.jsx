import React, { useEffect, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import IngressoFeathersLib from './ingressoFeathersLibrary';

/* test events list
 eventID: '19Z3Y',
 perfID: '19Z3Y-2',

 eventID: 'W9A8',
 perfID: 'W9A8-8M',

 eventID: 'YH1C',
 perfID: 'YH1C-8V',
*/

function IngressoChartMaker({
  eventData,
  seatColors,
  isShowingControls,
  token,
}) {
  const chart = useRef(null);
  const widgetSelector = 'ing-widget';

  const chartConfig = {
    selector: `#${widgetSelector}`,
    domain: 'https://b2b.ticketswitch.com',
    silenceWarnings: true,
    token,
    ...eventData,
  };

  useEffect(() => {
    if (chart.current == null) {
      chart.current = new IngressoFeathersLib();

      if (seatColors != null) {
        chart.current.changeColorScheme(seatColors);
      }

      if (isShowingControls) {
        chart.current.showControls();
      }
      chart.current.showLegend();

      chart.current.init(chartConfig);
    }

    return () => {
      chart.current = null;
    };
  }, [chartConfig, isShowingControls, seatColors]);

  return (
    <div className="ing-seats-picker">
      <div
        id={widgetSelector}
        className="ing-seats-picker__widget-selector"
        data-testid="ing-widget"
      />
    </div>
  );
}

IngressoChartMaker.defaultProps = {
  isShowingControls: true,
  seatColors: null,
};

IngressoChartMaker.propTypes = {
  token: PropTypes.string.isRequired,
  eventData: PropTypes.shape({
    eventID: PropTypes.string.isRequired, // demo event
    perfID: PropTypes.string.isRequired,
  }).isRequired,
  isShowingControls: PropTypes.bool,
  seatColors: PropTypes.arrayOf(
    (propValue, key, componentName, location, propFullName) => {
      if (propValue.length !== 10) {
        return new Error(
          `Invalid prop \`${propFullName}\` supplied to` +
            ` \`${componentName}\`. Number of colors in the array is not 10.`
        );
      }
      return true;
    }
  ), // array of hex values, they change the seat colors in order by distance from tehe stage
};

export default memo(IngressoChartMaker);
