export default function hoursConvertor(data) {
  const newOne = data.split(':');

  const hour = newOne[0] > 12 ? newOne[0] - 12 : newOne[0];

  return `${hour}:${newOne[1]} ${ newOne[0] > 12 ? 'PM' : 'AM'}`
}
