import React, { useState } from 'react';
import { InstantSearch, Hits, SearchBox, Configure } from 'react-instantsearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { envSearch } from '@/config';
import Hit from './Hit';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setQuery } from '@/lib/features/searchQuery/searchQuerySlice';

const algoliaClient = algoliasearch(
  envSearch.appId as string,
  envSearch.searchKey as string
);

const searchClient = {
  ...algoliaClient,
};

const SearchOnPage = () => {
  const { query } = useAppSelector((state) => state.query);
  const dispatch = useAppDispatch();
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={envSearch.indexName}
      stalledSearchDelay={1000}
      searchFunction={(helper) => {
        if (helper.state.query === '') {
          dispatch(setQuery(''));
          return;
        }
        dispatch(setQuery(helper.state.query as string));
        helper.search();
      }}
    >
      <Configure hitsPerPage={5} />
      <div className="flex flex-col relative">
        <SearchBox
          classNames={{
            form: 'flex justify-center items-center gap-',
            input: 'input input-bordered input-accent flex items-center',
            submit: 'visibility-hidden',
          }}
        />
        {query.trim() !== '' && (
          <div className="dropdown dropdown-open dropdown-end relative">
            <Hits
              className="menu flex flex-col gap-2 dropdown-content w-full p-2 shadow-lg bg-base-200 rounded-box z-50"
              hitComponent={Hit}
            />
          </div>
        )}
      </div>
    </InstantSearch>
  );
};

export default SearchOnPage;
