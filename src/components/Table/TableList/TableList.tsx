import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { TableListProps } from './TableList-props';

export const TableItem = (props: TableListProps): ReactElement => (
  <div className="table--column">
    <Link to={`/view/${props.singleItem.id}`}>
      <img src={props.singleItem.image} />
      <h3>
        {props.singleItem.first_name} {props.singleItem.last_name}
      </h3>
      <p>{props.singleItem.gender == 'M' ? 'Man' : 'Woman'}</p>
      <p>{props.singleItem.profession}</p>
    </Link>
  </div>
);

TableItem.defaultProps = {
  editButtonName: 'Edit',
  removeButtonName: 'Delete',
};
