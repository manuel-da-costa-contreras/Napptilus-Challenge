import { Person } from 'src/models/Data';
import { Filters } from 'src/models/Filters';

export interface TableProps {
  oompasData: Person[];
  tableTitle?: string;
  tableSubText?: string;
  filters?: Filters;
}
