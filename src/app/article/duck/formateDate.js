export default rawDate => {
  const date = new Date(rawDate).toDateString();
  return {
    weekDay: date.slice(0, 3),
    month: date.slice(4, 7),
    day: date.slice(8, 10),
    year: date.slice(11, 15),
  };
};
