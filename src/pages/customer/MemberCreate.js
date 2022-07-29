import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const MemberCreate = () => {
  const [cusCreate, setCusCreate] = useState();
  const [cusName, setCusName] = useState();
  const CustomerCreate = () => {};
  return (
    <Stack>
      <Stack padding={2} direction={"row"} spacing={2}>
        <TextField
          variant={"outlined"}
          size={"small"}
          label={"Name"}
          color={"success"}
        />
        <TextField
          variant={"outlined"}
          size={"small"}
          label={"Commission"}
          color={"success"}
        />
        <Button variant={"contained"} size={"small"} color={"success"}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default MemberCreate;
