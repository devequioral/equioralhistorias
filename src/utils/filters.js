//IF USERID IS NULL, GET ALL RECORDS (AVAILABLE ONLY FOR ADMIN USERS)
const filterBy = (userid, status, id) => {
  return [userid && 'userid', status !== 'all' && 'status', id && 'id']
    .filter(Boolean)
    .join(',');
};
const filterValue = (userid, status, id) => {
  return [userid && userid, status !== 'all' && status, id && id]
    .filter(Boolean)
    .join(',');
};

export { filterBy, filterValue };
