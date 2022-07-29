import { Delete, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";

const CallComponent = ({ subopen, key, cal, subMember }) => {
  return (
    <Stack
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      flexWrap={"wrap"}
      justifyContent="space-between"
      alignItems={"center"}
    >
      {/* <Typography width={{ sm: "25%", md: "25%" }}>{cal._id}</Typography> */}
      <Typography
        // width={{ xs: "30%", md: "30%" }}
        // bgcolor={"red"}
        textAlign={"left"}
      >
        {cal.customer.name}
      </Typography>
      <Typography>{cal.commission}</Typography>
      <Typography>{cal.totalAmount}</Typography>
      <Stack direction={"row"}>
        <IconButton size="small">
          <Edit fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <Delete fontSize="small" />
        </IconButton>
        {/* <IconButton onClick={subMember}>
          {subopen.checked ? <ExpandLess /> : <ExpandMore />}
        </IconButton> */}
      </Stack>
    </Stack>
  );
};

export default CallComponent;
