import React, { ReactElement } from 'react';
import { SearchBarProps } from './Search-props';

export const SearchBar = (props: SearchBarProps): ReactElement => {
  const searchLogo =
    'https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png';
  return (
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
  );
};

SearchBar.defaultProps = {
  searchBarPlaceholder: 'Search',
};
