import { get } from './base';

export async function getData(page?: number): Promise<any> {
  const response = await get(
    `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas${
      page && `?page=${page}`
    }`
  );

  return response;
}

export async function getDetailedData(id: number): Promise<any> {
  const response = await get(
    `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`
  );

  return response;
}
