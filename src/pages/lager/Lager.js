import { TextField, Stack, Typography } from "@mui/material";
import React from "react";
import LagerCom from "../../components/LagerCom";

const Lager = () => {
  return (
    <Stack>
      <Typography textalign={"center"}>In Lager</Typography>
      <LagerCom addField={false} />
    </Stack>
  );
};

export default Lager;
