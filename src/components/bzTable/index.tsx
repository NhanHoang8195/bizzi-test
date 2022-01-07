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
};

function BzTable(props: BzTableProps) {
  const { columns, data, isInfiniteScrolling, fetchMore = () => {} } = props;
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
      {isInfiniteScrolling && <tr>
        <td colSpan={3}><BzButton content={"Load more"} onClick={fetchMore} /></td>
      </tr>}
      </tbody>
    </table>
  );
}

export default BzTable;