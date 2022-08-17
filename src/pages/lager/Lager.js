import { TextField, Stack } from "@mui/material";
import React from "react";
import LagerCom from "../../components/LagerCom";

const Lager = () => {
  return (
    <Stack>
      <LagerCom addField={true} />
    </Stack>
  );
};

export default Lager;
