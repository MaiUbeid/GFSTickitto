const data = [
  {
    id: 1,
    link: '',
    imgUrl: 'https://i.imgur.com/Th1NCXc.png',
    name: 'Name of attraction',
    date: '22 Nov 2019',
    ticketsNo: 2,
    ticketType: 'Adults',
    currency: 'GBP',
    ticketPrice: '20.00',
    total(param1, param2) {
      return param1 * param2;
    },
  },
  {
    id: 2,
    link: '',
    imgUrl: 'https://i.imgur.com/Th1NCXc.png',
    name: 'Name of attraction',
    date: '22 Nov 2019',
    ticketsNo: 2,
    ticketType: 'Adults',
    currency: 'GBP',
    ticketPrice: '20.00',
    total(param1, param2) {
      return param1 * param2;
    },
  },
];

export default data;
