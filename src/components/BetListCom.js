import { Delete, Edit, Key } from "@mui/icons-material";
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const BetListCom = ({ call, key, onClick, children }) => {
  // console.log(setEdtiNum);
  // console.log(call);
  return (
    <Stack direction={"row"} justifyContent={"space-around"}>
      <Typography padding={0.3} width={"30%"} textAlign={"center"}>
        {call.number}
      </Typography>
      <Typography padding={0.3} width={"40%"} textAlign={"center"}>
        {call.amount}
      </Typography>

      {/* <Stack direction={"row"} width={"60%"}>
        <Button size="small" onClick={onClick}>
          <Edit fontSize="18" />
        </Button>
      </Stack> */}
      {children}
    </Stack>
  );
};

export default BetListCom;
