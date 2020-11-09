import { DataPerson } from 'src/models/DataModel';
import { Filters } from 'src/models/FiltersModel';

export interface TableProps {
  oompasData: DataPerson[];
  tableTitle?: string;
  tableSubText?: string;
  filters?: Filters;
}
