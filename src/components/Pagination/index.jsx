import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as AntdPagination } from 'antd';

import Dropdown from '../Dropdown';

import './style.scss';

export default function Pagination({
  totalPages,
  cardsPerPage,
  onPageChange,
  changePageNumbers,
  position,
}) {
  return (
    <div>
      <AntdPagination
        defaultCurrent={1}
        pageSize={cardsPerPage}
        total={totalPages}
        responsive
        className="pagination"
        onChange={onPageChange}
        data-testid="pagination"
      />
      <div
        className={
          position === 'top'
            ? 'pagination-options pagination-options--top'
            : 'pagination-options'
        }
        data-testid="paginationOptions"
      >
        <span className="pagination-options__text" data-testid="paginationText">
          Show
        </span>
        <Dropdown
          options={[
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '16', value: '16' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
          ]}
          onSelect={changePageNumbers}
          iconColor="#7A49A0"
          placeholder={`${cardsPerPage}`}
          dropdownStyle="pagination-options__dropdown"
          testid="paginationDropdown"
        />
        <span className="pagination-options__text" data-testid="paginationText">
          results per page
        </span>
      </div>
    </div>
  );
}

Pagination.defaultProps = {
  position: 'bottom',
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  cardsPerPage: PropTypes.number.isRequired,
  position: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
  changePageNumbers: PropTypes.func.isRequired,
};
