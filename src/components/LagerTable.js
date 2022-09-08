import { Height } from "@mui/icons-material";
import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

function createObj(row, col) {
  return { number: col.toString() + row.toString(), amount: "1110" };
}
const lagerData = Array.prototype.concat.apply(
  [],
  Array.from(Array(10), (_, x) => x).map((col) => {
    return Array.from(Array(10), (_, x) => x).map((row) => {
      return createObj(row, col);
    });
  })
);
const LagerTable = (hot) => {
  console.log(hot);
  const [dataLag, setDataLag] = useState(lagerData);
  return (
    <Box>
      <Stack
        border={0.5}
        flexDirection={"row"}
        flexWrap={"wrap"}
        // flexBasis={{ width: "100%" }}
      >
        <Stack
          // display={"block"}
          overflow={"scroll"}
          flex={1}
          flexDirection={"colunm"}
          flexWrap={"wrap"}
          justifyContent={"space-around"}
          height={{ xs: 550, sm: 550, md: 550, xl: "100%" }}
        >
          {dataLag &&
            dataLag.map((dlag, key) => {
              return (
                <TableRow style={{ display: "flex" }}>
                  <TableCell>
                    {hot.includes((n, k) => n.number === dlag.number) ? (
                      <span style={{ color: "red" }}>{dlag.number}</span>
                    ) : (
                      <span>{dlag.number}</span>
                    )}
                  </TableCell>
                  <TableCell>{dlag.amount}</TableCell>
                </TableRow>
              );
            })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default LagerTable;
