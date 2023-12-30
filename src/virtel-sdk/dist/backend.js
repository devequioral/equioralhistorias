import axios from 'axios';

const getURL = (options) => {
  const { backend_url, organization, database, object, params } = options;
  const { filterBy, filterValue, page, pageSize } = params;
  return `${backend_url}${organization}/${database}/${object}?filterBy=${filterBy}&filterValue=${filterValue}&page=${page}&pageSize=${pageSize}`;
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
    console.error(error);
    return null;
  }
};

export { getRecords };
