//FUNCTION CONVERT FORMAT DATE FROM ISO 8601 (2023-12-27T16:46:42.208Z) TO DD/MM/YYYY OR YYYY-MM-DD
function formatDate(date, format = 'DD/MM/YYYY') {
  if (!date) return;
  const dateSplit = date.split('T');
  const dateSplit2 = dateSplit[0].split('-');
  if (format == 'DD/MM/YYYY')
    return `${dateSplit2[2]}/${dateSplit2[1]}/${dateSplit2[0]}`;
  else if (format == 'YYYY-MM-DD')
    return `${dateSplit2[0]}-${dateSplit2[1]}-${dateSplit2[2]}`;
}

//FUNCTION CONVERT FORMAT DD/MM/YYYY TO YYYY-MM-DD
function formatDateToISOSM(date) {
  if (!date) return;
  const dateSplit = date.split('/');
  return `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
}

//FUNCTION TO CAPITALIZE FIRST LETTER OF A STRING
function capitalizeFirstLetter(string) {
  if (string == null || string == undefined) return;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//FUNCTION FOR SHORT UUID
function shortUUID(uuid) {
  return `${uuid.substring(0, 5)}...${uuid.substring(uuid.length - 5)}`;
}

export { formatDate, formatDateToISOSM, capitalizeFirstLetter, shortUUID };
