import React, { useState } from "react";
import { Alert, Check } from "baseui/icon";
import {
  StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  NumericalColumn,
  StringColumn,
  NUMERICAL_FORMATS,
  BatchActionT,
  RowActionT,
} from "baseui/data-table";

interface TableProps {
  cols: any;
  drows: any;
}

export const Table: React.FC<TableProps> = ({ drows, cols }) => {
  const [rows, setRows] = useState(drows);
  function flagRows(ids: Array<string | number>) {
    const nextRows = rows.map((row) => {
      if (ids.includes(row.id)) {
        const nextData = [...row.data];
        nextData[1] = !nextData[1];
        return { ...row, data: nextData };
      }
      return row;
    });
    setRows(nextRows);
  }
  function flagRow(id: string | number) {
    flagRows([id]);
  }
  function removeRows(ids: Array<string | number>) {
    const nextRows = rows.filter((row) => !ids.includes(row.id));
    setRows(nextRows);
  }
  function removeRow(id: string | number) {
    removeRows([id]);
  }

  const batchActions: BatchActionT[] = [
    {
      label: "Download",
      onClick: ({ clearSelection, selection }) => {
        console.log(selection);
        clearSelection();
      },
    },
  ];
  const rowActions: RowActionT[] = [
    {
      label: "Check",
      onClick: ({ row }) => flagRow(row.id),
      renderIcon: Check,
    },
    {
      label: "Remove",
      onClick: ({ row }) => removeRow(row.id),
      renderIcon: Alert,
    },
  ];

  return (
    <div style={{ height: "500px" }}>
      <StatefulDataTable
        batchActions={batchActions}
        columns={cols}
        rows={rows}
      />
    </div>
  );
};
