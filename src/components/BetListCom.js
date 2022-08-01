import { Delete, Edit, Key } from "@mui/icons-material";
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const BetListCom = ({ call, key, onClick }) => {
  // console.log(setEdtiNum);
  console.log(key);
  return (
    <Stack direction={"row"} width={"100%"} justifyContent={"space-around"}>
      <Typography padding={1}>{call.number}</Typography>
      <Typography padding={1}>{call.amount}</Typography>
      <Stack direction={"row"}>
        <Button size="small" onClick={onClick}>
          <Edit fontSize="18" />
        </Button>
      </Stack>
    </Stack>
  );
};

export default BetListCom;
