import React, { ReactElement, useState, useEffect } from 'react';

import Loader from 'react-spinners/RotateLoader';

import { DataModel, DataPerson } from 'src/models/DataModel';
import { Filters } from 'src/models/FiltersModel';
import { Table } from '../Table/Table';
import { getData } from '../../api/data';

import { useScroll } from '../../shared/hooks/useScroll';
import { SearchBar } from '../Search/Search';

export function CatalogueApp(): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({
    searchText: '',
  });
  const [oompas, setOompas] = useState<DataPerson[]>([]);
  const [maxTop, setMaxTop] = useState<boolean>(false);
  const { y } = useScroll();

  const onChangeTextFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      searchText: e.target.value.toLowerCase().replace(/\s/g, ''),
    });
  };

  /**
   * Effect to listen to the scroll, as soon as it reaches the end
   * calls for new data
   */

  useEffect(() => {
    const json = localStorage.getItem('data');
    const localItem: DataModel = JSON.parse(json);
    const date = new Date().getDate();
    let winScroll = y;
    let height = document.body.offsetHeight;

    if (height < winScroll + height / 5) {
      setMaxTop(true);
      if (maxTop) {
        (async (): Promise<void> => {
          if (localItem.current !== localItem.current + 1) {
            const data: DataModel = await getData(localItem.current + 1);

            const newData: DataModel = {
              current: data.current,
              total: data.total,
              results: [...localItem.results, ...data.results],
              date: date,
            };

            setOompas([...oompas, ...data.results]);
            localStorage.setItem('data', JSON.stringify(newData));
            setMaxTop(false);
          }
        })();
      }
    }
  }, [y]);

  /**
   * Initialization Effect
   * Load data directly from local storage if exists, if not,
   * loads data directly from the API
   */

  useEffect(() => {
    const json = localStorage.getItem('data');
    const localItem: DataModel = JSON.parse(json);
    const date = new Date().getDate();

    if (
      localItem &&
      date === localItem.date &&
      [].concat(!oompas).filter(Boolean)
    ) {
      try {
        setOompas(localItem.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      (async (): Promise<void> => {
        try {
          const data = await getData(1);

          setOompas(data.results);
          localStorage.setItem('data', JSON.stringify({ ...data, date }));
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [!oompas]);

  // Early Return
  if (loading) {
    return (
      <div className="loader__wrapper">
        <Loader size={15} loading={loading} />
      </div>
    );
  }

  return (
    <div>
      <SearchBar searchBarText={onChangeTextFilter} />
      <Table filters={filters} oompasData={oompas} />
    </div>
  );
}