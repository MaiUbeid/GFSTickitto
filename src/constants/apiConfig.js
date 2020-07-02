export const supplierNames = {
  PRIO: 'prio',
  INGRESSO: 'ingresso',
};

/*
1. Date entry: only a date selection is required for this admission type. (calendar components) 
2. Slot Entry: here a date selection is needed and a time slots (09:00-12:00) need to be selected
3. Timed-entry: Date and time selection required. 
4. Open-entry: Ticket is valid with no restrictions and no selection needed. only selection is the number of ticket to be purchased
Best, 
*/
export const entryTypes = {
  TIMED: 'timed_entry',
  DATE: 'date_entry',
  SLOT: 'date_entry',
  OPEN: 'open_entry',
};
