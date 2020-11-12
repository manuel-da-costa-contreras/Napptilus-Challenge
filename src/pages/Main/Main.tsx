import React, { ReactElement, useState, useEffect } from 'react';

import Loader from 'react-spinners/RotateLoader';

import { Data, Person } from 'src/models/Data';
import { Filters } from 'src/models/Filters';
import { Table } from '../../components/Table/Table';
import { getData } from '../../api/data';

import { useScroll } from '../../shared/hooks/useScroll';
import { SearchBar } from '../../components/Search/Search';

export function MainLayout(): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({
    searchText: '',
  });
  const [oompas, setOompas] = useState<Person[]>([]);
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
    const localItem: Data = JSON.parse(json);
    const date = new Date().getDate();
    let maxHeight = document.body.offsetHeight;

    const scrollLength = 1600;

    if (maxHeight <= y + scrollLength) {
      setMaxTop(true);
      if (maxTop) {
        (async (): Promise<void> => {
          if (localItem.current !== localItem.current + 1) {
            const data: Data = await getData(localItem.current + 1);

            const newData: Data = {
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
    const localItem: Data = JSON.parse(json);
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
