import { Paper, Stack, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useLocation } from "react-router-dom";

const MemberDetail = () => {
  const location = useLocation();
  const { user } = location.state;

  console.log(user);
  return (
    <Stack>
      <Stack direction={"column"} padding={2} bgcolor={grey[200]}>
        <Stack>
          <Typography variant={"h6"}>Basic Info</Typography>
        </Stack>
        <Stack bgcolor={"white"} padding={1} width={"50%"}>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Name</Typography>
            <Typography>{user.name}</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Username</Typography>
            <Typography>{user.username}</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Phone</Typography>
            <Typography>{user.phone}</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Role</Typography>
            <Typography>{user.role}</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Commission</Typography>
            <Typography>{user.commission}</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Divider</Typography>
            <Typography>{user.divider}</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>TwoDZ</Typography>
            <Typography>{user.twoDZ}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack padding={2} bgcolor={grey[200]}>
        <Stack>
          <Typography variant={"h6"}>Limitations</Typography>
        </Stack>
        <Stack bgcolor={"white"} padding={1}>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Acc Limits</Typography>
            <Typography>
                <TextField />
            </Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>HOTS</Typography>
            <Typography></Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MemberDetail;
