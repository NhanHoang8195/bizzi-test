import React from 'react';
import {useTable} from 'react-table';
import './styles.scss';
import BzButton from 'src/components/bzButton';

type BzTableProps = {
  columns: Array<any>,
  data: Array<any>,
  isInfiniteScrolling?: boolean,
  fetchMore?: () => void,
  total?: number,
  currentPage?: number,
  loading?: boolean,
  error?: any,
};

function BzTable(props: BzTableProps) {
  const { columns, data, isInfiniteScrolling, fetchMore = () => {}, loading, error } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()} className={"bz-table"}>
      <thead className={"bz-table-header"}>
      {headerGroups.map(headerGroup => (
        <tr className={"bz-table-row"} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th className={"bz-table-col"} {...column.getHeaderProps()}>{column.render('Header')}</th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()} className={"bz-table-body"}>
      {rows.map((row, i) => {
        prepareRow(row)
        return (
          <tr className={"bz-table-row"} {...row.getRowProps()}>
            {row.cells.map(cell => {
              return <td className={"bz-table-col"} {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
          </tr>
        )
      })}
      {!loading && data.length === 0 &&  <tr>
        <td colSpan={columns.length} className={"text-center"}>No results</td>
      </tr>}
      {loading && <tr>
        <td colSpan={columns.length} className={"text-center"}>Loading...</td>
      </tr>}
      {error && <tr>
        <td colSpan={columns.length} className={"text-center text-danger"}>Sorry, an error has occured!</td>
      </tr>}
      {isInfiniteScrolling && <tr>
        <td colSpan={columns.length}><BzButton classes={{btn: "w-100"}} content={"Load more"} onClick={fetchMore} /></td>
      </tr>}
      </tbody>
    </table>
  );
}

export default BzTable;