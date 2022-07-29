import { Delete } from "@mui/icons-material";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const BetListCom = ({ call }) => {
  return (
    <Stack direction={"row"} width={"100%"} justifyContent={"space-around"}>
      <Typography padding={1}>{call.number}</Typography>
      <Typography padding={1}>{call.amount}</Typography>
      <IconButton size="small">
        <Delete fontSize="18" />
      </IconButton>
    </Stack>
  );
};

export default BetListCom;
