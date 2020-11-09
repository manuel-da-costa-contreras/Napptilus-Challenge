import { get, URL } from './base';

export async function getData(page?: number): Promise<any> {
  const response = await get(`${URL}/${page && `?page=${page}`}`);

  return response;
}

export async function getDetailedData(id: number): Promise<any> {
  const response = await get(`${URL}/${id}`);

  return response;
}
