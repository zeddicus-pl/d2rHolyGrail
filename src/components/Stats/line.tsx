import { TableCell, TableRow } from "@mui/material";
import { Stats } from "../../@types/main";

type StatisticsLineProps = {
  title: string,
  stats: Stats,
  bold?: boolean,
  bolder?: boolean,
}

export function StatisticsLine({ title, stats, bold, bolder }: StatisticsLineProps) {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      style={Object.assign(
        {},
        bold ? { background: '#222', fontWeight: 'bold' } : {},
        bolder ? { background: '#333' } : {}
      )}
    >
      <TableCell>{title}</TableCell>
      <TableCell>{stats.exists}</TableCell>
      <TableCell>{stats.owned}</TableCell>
      <TableCell>{stats.remaining}</TableCell>
      <TableCell>{stats.percent} %</TableCell>
    </TableRow>
  );
}