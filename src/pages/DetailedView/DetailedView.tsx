import React, { ReactElement, useEffect, useState } from 'react';

import Parser from 'html-react-parser';

import { getDetailedData } from '../../api';
import { Person } from '../../models';
import { DetailedViewProps } from './DetailedView-props';
import Loader from 'react-spinners/RotateLoader';

interface DetailedViewModel {
  person: Person;
  date?: number;
  id?: number;
}

const DetailedView = (props: DetailedViewProps): ReactElement => {
  const [person, setPerson] = useState<Person>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Only to check if data is from today.
  useEffect(() => {
    const json = localStorage.getItem('detailed-view');
    const data: Array<DetailedViewModel> = JSON.parse(json);
    const date = new Date().getDate();

    if (data && data[0].date !== date) {
      localStorage.removeItem('detailed-view');
    }
  }, []);

  /**
   * Check if data exists in local storage, if not, makes the call with the ID and
   * saves it in local storage.
   */
  useEffect(() => {
    const json = localStorage.getItem('detailed-view');
    const id = props.match.params.id;
    const storageItem: Array<DetailedViewModel> = JSON.parse(json) || [];
    const item = storageItem.find((item) => item.id == id);
    const date = new Date().getDate();
    try {
      if (item && item.date == date) {
        setPerson(item.person);
      } else {
        (async (): Promise<void> => {
          const data: Person = await getDetailedData(id);

          setPerson(data);
          storageItem.push({ person: data, date, id });
          localStorage.setItem('detailed-view', JSON.stringify(storageItem));
        })();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [props.match.params.id]);

  // Early Return
  if (loading) {
    return (
      <div className="loader__wrapper">
        <Loader size={15} loading={loading} />
      </div>
    );
  }

  return (
    <div className="container">
      {person && (
        <div className="detailed__wrapper">
          {person.image && <img className="img__wrapper" src={person.image} />}
          <div className="title__wrapper">
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
