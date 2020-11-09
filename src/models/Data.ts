export interface DataModel {
  current: number;
  total: number;
  results: DataPerson[];
  date?: number;
}

export interface DataPerson {
  first_name: string;
  last_name: string;
  favorite: {
    color: string;
    food: string;
    random_string: string;
    song: string;
  };
  gender: string;
  image: string;
  profession: string;
  email: string;
  age: number;
  country: string;
  height: number;
  id?: number;
  description?: string;
  date?: number;
}
