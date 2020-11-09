import { DataPerson } from 'src/models/Data';
import { Filters } from 'src/models/Filters';

export interface TableProps {
  oompasData: DataPerson[];
  tableTitle?: string;
  tableSubText?: string;
  filters?: Filters;
}
