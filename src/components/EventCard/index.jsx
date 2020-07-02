/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from '../ContextProviders/ThemeProvider';
import Icon from '../Icon';

import './style.scss';

export default function EventCard({
  sectionTitle,
  children,
  containList,
  list,
}) {
  const theme = useContext(ThemeContext);
  let listClass = '';
  return (
    <div className="event__card">
      <div className="event__card-title">
        <h2>{sectionTitle}</h2>
        {children}
        <div
          className={
            containList && list[0].name === 'included'
              ? 'event__card-section'
              : ''
          }
        >
          {containList &&
            list.map(listItem => {
              switch (listItem.name) {
                case 'included':
                  listClass = 'event__lists-included';
                  break;
                default:
                  listClass = 'event__lists';
              }
              return (
                <div className={listClass} key={listItem.id}>
                  {listItem.items.map((item, key) =>
                    item.length !== 0 ? (
                      <li key={key} className="event__lists-item">
                        <span>
                          <Icon
                            id="checkCircle"
                            iconStyle="event__lists-icon"
                            color={theme['primary-color']}
                          />
                        </span>
                        {item}
                      </li>
                    ) : (
                      <p className="event__lists-text" key={key}>
                        No entry notes
                      </p>
                    )
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

EventCard.defaultProps = {
  children: null,
  containList: false,
  list: null,
};

EventCard.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  children: PropTypes.node,
  containList: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.object.isRequired),
};
