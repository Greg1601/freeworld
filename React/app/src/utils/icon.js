import Leaflet from 'leaflet';

const myIcon = (categoryId) => {
  const bankIcon = new Leaflet.Icon({
    iconUrl: '../images/bank.png',
  });
  const foodIcon = new Leaflet.Icon({
    iconUrl: '../images/food.png',
  });
  const governmentIcon = new Leaflet.Icon({
    iconUrl: '../images/government.png',
  });
  const healthIcon = new Leaflet.Icon({
    iconUrl: '../images/health.png',
  });
  const hotelIcon = new Leaflet.Icon({
    iconUrl: '../images/hotel.png',
  });
  const leisureIcon = new Leaflet.Icon({
    iconUrl: '../images/leisure.png',
  });
  const miscIcon = new Leaflet.Icon({
    iconUrl: '../images/misc.png',
  });
  const schoolIcon = new Leaflet.Icon({
    iconUrl: '../images/school.png',
  });
  const shoppingIcon = new Leaflet.Icon({
    iconUrl: '../images/shopping.png',
  });
  const sportIcon = new Leaflet.Icon({
    iconUrl: '../images/sport.png',
  });
  const tourismIcon = new Leaflet.Icon({
    iconUrl: '../images/tourism.png',
  });
  const transportIcon = new Leaflet.Icon({
    iconUrl: '../images/transport.png',
  });
  switch (categoryId) {
    case 1:
      return transportIcon;
    case 2:
      return foodIcon;
    case 3:
      return leisureIcon;
    case 4:
      return bankIcon;
    case 5:
      return schoolIcon;
    case 6:
      return shoppingIcon;
    case 7:
      return sportIcon;
    case 8:
      return tourismIcon;
    case 9:
      return hotelIcon;
    case 10:
      return miscIcon;
    case 11:
      return governmentIcon;
    case 12:
      return healthIcon;
    default:
      return null;
  }
};

export default myIcon;
