import React, { ReactElement } from 'react';

import { TableProps } from './Table-props';
import { TableItem } from './TableList/TableList';
import { DataPerson } from '../../models/DataModel';

export const Table = (props: TableProps): ReactElement => {
  const searchLogo =
    'https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png';
  // TODO: Change to a filtered table in parent component
  const filteredTable =
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

  return (
    <div className="container">
      <div className="table__header">
        <div className="table--search-bar">
          <input
            className="table-search-bar"
            placeholder={props.searchBarPlaceholder}
            onChange={props.searchBarText}
          />
          <span>
            <img src={searchLogo} />
          </span>
        </div>
        <div className="table--title">
          <h1> {props.tableTitle} </h1>
          <h2> {props.tableSubText} </h2>
        </div>
      </div>
      <div className="table__container">
        {props.oompasData &&
          filteredTable.map((item: DataPerson) => (
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
  searchBarPlaceholder: 'Search',
};
