const saveTask = async (data) => {
  // //CREATE A TEMP PROMISE FOR TEST
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({ ok: true });
  //   }, 2000);
  // });

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/notifications/${
    data.id ? 'update' : 'new'
  }`;
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ record: data }),
  });
};

const deleteTask = async (data) => {
  // //CREATE A TEMP PROMISE FOR TEST
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({ ok: true });
  //   }, 2000);
  // });

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/notifications/delete`;
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ record: data }),
  });
};

export { saveTask, deleteTask };
