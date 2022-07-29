import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { blue, blueGrey, cyan, teal } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../shared/Axios";

const CallDetail = ({ authUser }) => {
  const [call, setCall] = useState([]);
  const [numbers, setNumbers] = useState([]);
  // console.log(localStorage.getItem("access-token"));

  let { callId, lotteryId, agentId } = useParams();
  useEffect(() => {
    console.log("Report Call detail");

    Axios.get(`/reports/agent/${agentId}/calls/${lotteryId}/${callId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setCall(res.data.data);
        setNumbers(res.data.data.numbers);
      })
      .catch((err) => console.log(err.message));
  }, []);
  console.log(numbers);

  return (
    <>
      <Box boxShadow={1} margin={"auto"} padding={1}>
        <Paper sx={{ backgroundColor: "success.light" }}>
          <Stack
            direction={"row"}
            padding={1}
            spacing={3}
            justifyContent={"space-around"}
          >
            <Stack spacing={2} padding={1} direction={"column"}>
              <Stack direction={"row"} spacing={2}>
                <Typography fontWeight={"bold"}>BetId :</Typography>
                <Typography> {call._id}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Typography fontWeight={"bold"}>Time :</Typography>
                <Typography> {call.betTime}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Typography fontWeight={"bold"}>Call :</Typography>
                <Typography> {call.callname}</Typography>
              </Stack>
            </Stack>
            <Stack spacing={2} padding={1} direction={"column"}></Stack>
            <Stack spacing={2} padding={1} direction={"column"}>
              <Stack direction={"row"} spacing={2}>
                <Typography fontWeight={"bold"}>Total :</Typography>
                <Typography> {call.totalAmount}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Typography fontWeight={"bold"}>Status :</Typography>
                <Typography> {call.status}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Typography fontWeight={"bold"}>User Win :</Typography>
                <Typography> {call.win}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            // padding={1}
            fullWidth
            // justifyContent={"flex-end"}
          >
            {/* <TableContainer sx={{ backgroundColor: "white" }}> */}
            <Table sx={{ backgroundColor: "white" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography fontWeight="bold">No</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">Number</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">Amount</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {numbers.map((cal, key) => (
                  <TableRow key={key}>
                    <TableCell align="center">{key + 1}</TableCell>
                    <TableCell align="center">{cal.number}</TableCell>
                    <TableCell align="center">{cal.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* </TableContainer> */}
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default CallDetail;
