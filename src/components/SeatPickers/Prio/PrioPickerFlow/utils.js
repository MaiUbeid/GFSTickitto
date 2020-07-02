export const getSelectedPerfomanceData = (
  sessionAvailbility,
  selectedPerformanceId
) => {
  const selectedPerfAvailability = sessionAvailbility.availability.find(
    ticket => {
      return ticket.availability_id === selectedPerformanceId;
    }
  );

  return selectedPerfAvailability;
};

/*
  returns the raw api data that the booking endpoint needs for prio
  {
    “booking_external_reference”: “BOOK_123456788990”,
    “booking_language”: “en”,
    “product_id”: “2433”,
    “product_pickup_point_id”: “”,
    “product_availability_id”: “20200701090018006997”,
    “product_type_details”: [
        {
          “product_type_id”: “121302",
          “product_type_count”: 2,
        }
    ],
    “booking_reservation_reference”: “”
  }
*/
export const buildSelectionsObjectForAPI = (
  sessionAvailbility,
  selectedPerformanceId,
  ticketSelections,
  optionSelections = null,
  pickupSelection
) => {
  const selectedPerfAvailability = getSelectedPerfomanceData(
    sessionAvailbility,
    selectedPerformanceId
  );
  const builtTicketData = {
    booking_external_reference: sessionAvailbility.basket_id,
    booking_language: 'en',
    product_id: selectedPerfAvailability.availability_product_id,
    product_availability_id: selectedPerfAvailability.availability_id,
    product_type_details: ticketSelections,
  };

  if (pickupSelection != null) {
    builtTicketData.product_pickup_point_id = pickupSelection;
  }

  if (optionSelections != null) {
    builtTicketData.product_options = optionSelections.product_options;
  }

  return builtTicketData;
};

/* returns the data required by the front end to display a certain selection, which can be an array,
  each array element will be displayed at checkoput as a single item that a user selected
  [
    {
      name: String,
      quantity: String,
      location?: String,
      price: {
        value: Number,
        currency: String
      }
    }
  ],
*/
// export const buildSelectionsObjectForDisplay = () =>
//   // sessionAvailbility,
//   // selectedPerformanceId,
//   // ticketSelections
//   {
//     // const selectedPerfAvailability = getSelectedPerfomanceData(
//     //   sessionAvailbility,
//     //   selectedPerformanceId
//     // );

//     // const selections = [];

//     // ticketSelections.forEach(concession => { });

//     // return selections;
//     return null;
//   };
