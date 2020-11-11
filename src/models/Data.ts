export interface Data {
  current: number;
  total: number;
  results: Person[];
  date?: number;
}

export interface Person {
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
