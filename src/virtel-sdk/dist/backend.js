import axios from 'axios';

const getURL = (options) => {
  const { backend_url, organization, database, object, params } = options;
  const { filterBy, filterValue, page, pageSize } = params;
  const filter =
    filterBy && filterValue
      ? `&filterBy=${filterBy}&filterValue=${filterValue}`
      : '';
  const pagination = page ? `&page=${page}` : '';
  const numrecords = pageSize ? `&pageSize=${pageSize}` : '';
  return `${backend_url}${organization}/${database}/${object}?${filter}${pagination}${numrecords}`;
};

const getRecords = async (options) => {
  const { api_key } = options;
  const url = getURL(options);
  try {
    const response = await axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${api_key}`,
      },
    });

    const records = response.data || null;

    return records;
  } catch (error) {
    //console.error(error);
    return null;
  }
};

export { getRecords };
