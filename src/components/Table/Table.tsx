import React, { ReactElement, useEffect, useState } from 'react';

import { TableProps } from './Table-props';
import { TableItem } from './TableList/TableList';
import { DataPerson } from '../../models/Data';

export const Table = (props: TableProps): ReactElement => {
  const [filteredTable, setFilteredTable] = useState<DataPerson[]>(
    props.oompasData
  );

  useEffect(() => {
    const filteredTable: DataPerson[] =
      props.oompasData &&
      props.oompasData.filter((item) => {
        return (
          item.first_name
            .concat(item.last_name)
            .toLowerCase()
            .includes(props.filters.searchText) ||
          item.last_name
            .concat(item.first_name)
            .toLowerCase()
            .includes(props.filters.searchText) ||
          item.profession.toLowerCase().includes(props.filters.searchText)
        );
      });
    setFilteredTable(filteredTable);
  }, [props.filters.searchText, props.oompasData]);

  return (
    <div className="container">
      <div className="table__header">
        <div className="table--title">
          <h1> {props.tableTitle} </h1>
          <h2> {props.tableSubText} </h2>
        </div>
      </div>
      <div className="table__container">
        {filteredTable.map((item: DataPerson) => (
          <React.Fragment key={item.id}>
            <TableItem singleItem={item} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

Table.defaultProps = {
  tableTitle: 'Find your Oompa Loompa',
  tableSubText: 'There are more than 100k',
};
