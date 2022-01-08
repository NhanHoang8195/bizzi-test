import React, {useMemo, useState} from 'react';
import {useLazyQuery, useQuery, useMutation} from '@apollo/client';
import {GET_POST, GET_POSTS, DELETE_POST, ADD_POST, UPDATE_POST} from 'src/operations/queries/dashboard';
import {debounce} from 'src/ultilities';
import SearchBar from 'src/components/bzInput';
import BzTable from 'src/components/bzTable';
import BzButton from 'src/components/bzButton';
import {handleDeletePost, handleCreatePost} from 'src/operations/cached';
import AddComponent from 'src/containers/dashboard/addComponent';
import {Post} from 'src/models/googleUserProfile';

const INITIAL_PAGE = 1;
const LIMIT_POSTS = 100;


function Dashboard(): React.ReactElement {
  const [searchValue, setSearchValue] = useState('');
  const [searchPost, {data: searchedData, loading: isGettingPost}] = useLazyQuery(GET_POST);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const {data, fetchMore, loading: isGettingPosts} = useQuery(GET_POSTS, {
    variables: {
      options: {
        paginate: {
          page: INITIAL_PAGE,
          limit: LIMIT_POSTS,
        }
      },
    }
  });
  const [deletePost, {loading: isDeleting}] = useMutation(DELETE_POST);
  const [addPost, {loading: isAdding, data: postData, error: addPostError}] = useMutation(ADD_POST);
  const dataTable = useMemo(() => {
    return searchValue ? searchedData?.post?.id ? [searchedData.post] : [] : data?.posts?.data || [];
  }, [data, searchedData]);
  const columns = useMemo(() => [
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
      {
        Header: 'Actions',
        accessor: null,
        Cell: ({row}: any) => <div>
          <BzButton disabled={isDeleting} content={"Delete"} classes={{btn: "btn-danger m-1"}} onClick={() => {
            deletePost({
              variables: {
                id: row.original.id,
              },
              update(cache) {
                handleDeletePost(cache, row.original.id);
              }
            }).then(() => {

            });
          }} />
        </div>,
      },
    ], [isDeleting]);
  const searchPostDebounce = useMemo(() => debounce(searchPost, 500), []);
  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    searchPostDebounce({
      variables: {
        id: newSearchValue,
      },
    });
  }
  function onFetchMore() {
    const nextPage = currentPage + 1;
    fetchMore({
      variables: {
        options: {
          paginate: {
            page: nextPage,
            limit: LIMIT_POSTS,
          }
        },
      }
    }).then(() => {
      setCurrentPage(nextPage);
    });
  }
  function onAddPost(newPost: Post) {
    addPost({
      variables: {
        input: {
          title: newPost.title,
          body: newPost.body,
        },
      },
      update(cache, {data: {createPost}}) {
        handleCreatePost(cache, createPost);
      }
    }).then(() => {
    });
  }
  return (<div className={"p-4"}>
    <SearchBar value={searchValue} name={"search"} label={""} onChange={onSearch} rest={{placeholder: "Search by ID"}} />
    <AddComponent errorMessage={addPostError} successMessage={postData} onSubmit={onAddPost} isSubmitting={isAdding} />
    <BzTable
      total={data?.posts?.meta?.totalCount || 0}
      data={dataTable}
      columns={columns}
      isInfiniteScrolling={data?.posts?.meta?.totalCount >= currentPage * LIMIT_POSTS && !searchValue && dataTable.length <  data.posts.meta.totalCount}
      fetchMore={onFetchMore}
      currentPage={currentPage}
      loading={isGettingPosts || isGettingPost}
    />
  </div>);
}


export default Dashboard;