import { Edit } from "@mui/icons-material";
import { IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useLocation } from "react-router-dom";

const MemberDetail = () => {
  const location = useLocation();
  const { user } = location.state;

  console.log(user);
  return (
    <Stack spacing={1}>
      <Stack direction={"column"} padding={2} bgcolor={grey[200]} alignItems='center'>
        <Stack>
          <Typography variant={"h6"}>Basic Info</Typography>
        </Stack>
        <Stack bgcolor={"white"} padding={1} width={"50%"} margin={'auto'}>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Name</Typography>
            <Typography>{user.name}<IconButton size="small" color="success"><Edit /></IconButton></Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Username</Typography>
            <Typography>{user.username}<IconButton size="small" color="success"><Edit /></IconButton></Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Phone</Typography>
            <Typography>{user.phone}<IconButton size="small" color="success"><Edit /></IconButton></Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Role</Typography>
            <Typography>{user.role}<IconButton size="small" color="success"><Edit /></IconButton></Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Commission</Typography>
            <Typography>{user.commission}<IconButton size="small" color="success"><Edit /></IconButton></Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>Divider</Typography>
            <Typography>{user.divider}<IconButton size="small" color="success"><Edit /></IconButton></Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between" spacing={1}>
            <Typography fontWeight={"bold"}>TwoDZ</Typography>
            <Typography>{user.twoDZ}<IconButton size="small" color="success"><Edit /></IconButton></Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack padding={2} bgcolor={grey[200]} alignItems='center'>
        <Stack>
          <Typography variant={"h6"}>Limitations</Typography>
        </Stack>
        <Stack bgcolor={"white"} padding={1} width={'50%'} margin={'auto'}>
    
          <Stack direction={"row"} justifyContent="space-between" spacing={5} >
            <Typography fontWeight={"bold"}>Acc Limits</Typography>
            <Typography fontWeight={"bold"}>Acc : <span style={{color:'red',fontSize:18}}>8</span></Typography>
            <Typography>
                < TextField color="success" value={19} variant="standard" /><IconButton size="small" color="success"><Edit /></IconButton>
            </Typography>
          </Stack>
          {/* <Stack direction={"row"} justifyContent="flex-start" spacing={1}>
            <Typography fontWeight={"bold"}>HOTS</Typography>
            <Typography></Typography>
          </Stack> */}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MemberDetail;
