import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useLazyQuery, useQuery} from '@apollo/client';
import {GET_POST, GET_POSTS} from 'src/operations/queries/dashboard';
import {debounce} from 'src/ultilities';
import SearchBar from 'src/components/bzInput';
import BzTable from 'src/components/bzTable';

const INITIAL_PAGE = 1;
const LIMIT_POSTS = 30;


function Dashboard(): React.ReactElement {
  const [searchValue, setSearchValue] = useState('');
  const [searchPost, {data: searchedData}] = useLazyQuery(GET_POST);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const {data, fetchMore} = useQuery(GET_POSTS, {
    variables: {
      options: {
        paginate: {
          page: INITIAL_PAGE,
          limit: LIMIT_POSTS,
        }
      },
    }
  });
  const dataTable = useMemo(() => {
    return searchValue ? searchedData?.post ? [searchedData.post] : [] : data?.posts?.data || [];
  }, [data, searchedData]);
  const columns = useMemo(() => {
    return [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Body',
        accessor: 'body',
      },
    ];
  }, []);
  const searchPostDebounce = useMemo(() => debounce(searchPost, 500), []);
  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    searchPostDebounce({
      variables: {
        id: e.target.value,
      },
    });
  }
  function onFetchMore() {
    fetchMore({
      variables: {
        options: {
          paginate: {
            page: currentPage + 1,
            limit: LIMIT_POSTS,
          }
        },
      }
    }).then(() => {
      setCurrentPage(currentPage + 1);
    });
  }
  return (<div className={"p-4"}>
    <SearchBar value={searchValue} name={"search"} label={""} onChange={onSearch} rest={{placeholder: "Search by ID"}} />
    <BzTable
      total={data?.posts?.meta?.totalCount || 0}
      data={dataTable}
      columns={columns}
      isInfiniteScrolling={data?.posts?.meta?.totalCount > currentPage * LIMIT_POSTS}
      fetchMore={onFetchMore}
      currentPage={currentPage}
    />
  </div>);
}


export default Dashboard;