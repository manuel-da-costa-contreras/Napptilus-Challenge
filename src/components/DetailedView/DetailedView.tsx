import React, { ReactElement, useEffect, useState } from 'react';

import Parser from 'html-react-parser';

import { getDetailedData } from '../../api';
import { DataPerson } from '../../models';
import { DetailedViewProps } from './DetailedView-props';

const DetailedView = (props: DetailedViewProps): ReactElement => {
  const [person, setPerson] = useState<DataPerson>(null);

  useEffect(() => {
    const json = localStorage.getItem('detailed-view');
    const id = props.match.params.id;
    const storageItem: Array<DataPerson> = JSON.parse(json) || [];
    const item = storageItem.find((item) => item.id == id);

    if (item) {
      setPerson(item);
    } else {
      (async (): Promise<void> => {
        const data: DataPerson = await getDetailedData(id);

        setPerson(data);
        storageItem.push({ ...data, id });
        localStorage.setItem('detailed-view', JSON.stringify(storageItem));
      })();
    }
  }, [props.match.params.id]);

  return (
    <div className="container">
      {person && (
        <div className="detailed__wrapper">
          {person.image && <img className="img--wrapper" src={person.image} />}
          <div className="title--wrapper">
            <div>
              <h3>
                {person.first_name && person.first_name}{' '}
                {person.last_name && person.last_name}
              </h3>
              {person.gender && <p>{person.gender == 'M' ? 'Man' : 'Woman'}</p>}
              {person.profession && <p>{person.profession}</p>}
            </div>
            <div>{person.description && Parser(person.description)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export { DetailedView };
