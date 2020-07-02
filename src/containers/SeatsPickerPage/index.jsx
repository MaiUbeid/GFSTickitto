import React from 'react';
import './style.scss';
import TicketPickWidget from '../../components/SeatPickers/Widget';

export default function SeatsPickerPage() {
  return (
    <div className="seats-picker-page">
      <TicketPickWidget />
    </div>
  );
}
