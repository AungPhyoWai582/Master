import { TextField, Stack } from "@mui/material";
import React from "react";

const BetCom = ({
  style,
  label,
  onChange,
  name,
  value,
  required,
  type,
  sx,
}) => {
  return (
    <Stack sx={style}>
      <TextField
        display={sx}
        type={type}
        name={name}
        value={value}
        required={required}
        variant={"outlined"}
        onChange={onChange}
        label={label}
        size={"small"}
      />
    </Stack>
  );
};

export default BetCom;
