//FUNCTION CONVERT FORMAT DATE FROM ISO 8601 (2023-12-27T16:46:42.208Z) TO DD/MM/YYYY
function formatDate(date) {
  const dateSplit = date.split('T');
  const dateSplit2 = dateSplit[0].split('-');
  return `${dateSplit2[2]}/${dateSplit2[1]}/${dateSplit2[0]}`;
}

//FUNCTION TO CAPITALIZE FIRST LETTER OF A STRING
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { formatDate, capitalizeFirstLetter };
