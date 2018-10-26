const CategoryName = (categoryId) => {
  switch (categoryId) {
    case 1:
      return 'Public Transport';
    case 2:
      return 'Food';
    case 3:
      return 'Leisure';
    case 4:
      return 'Bank / Post office';
    case 5:
      return 'Education';
    case 6:
      return 'Shopping';
    case 7:
      return 'Sport';
    case 8:
      return 'Tourism';
    case 9:
      return 'Accomodation';
    case 10:
      return 'Miscellaneous';
    case 11:
      return 'Government';
    case 12:
      return 'Healt';
    default:
      return null;
  }
};

export default CategoryName;
