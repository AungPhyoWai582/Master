import React, { useEffect, useState } from "react";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  TableBody,
  TableRow,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { useLocation, NavLink } from "react-router-dom";
import Axios from "../../shared/Axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Report = () => {
  const location = useLocation();
  // const { lotteryId } = location.state;
  // console.log(lotteryId);

  const [report, setReport] = useState([]);

  //pdf
  const [open, setOpen] = useState(false);
  //
  // const a = [{ "A"}, { "B"}, { "C"}];
  const [detailreportopen, setDetailreportopen] = useState(false);

  //in/out autocomplete
  const selectType = [{ label: "In" }, { label: "Out" }];
  const [inLag, setInLag] = useState([]);
  const [outLag, setOutLag] = useState([]);
  const changeInOut = (e) => {
    console.log(e.target.innerText);
  };

  //date picker
  const [value, setValue] = React.useState(null);
  // const [open, setOpen] = useState(false);
  const DiaOpen = () => {
    setOpen(!open);
  };

  // useEffect(() => {
  //   Axios.get(`/reports/agent/${lotteryId}`, {
  //     headers: {
  //       authorization: `Bearer ` + localStorage.getItem("access-token"),
  //     },
  //   }).then((res) => {
  //     setReport(res.data.resReport);
  //   });
  // }, []);
  return (
    <Stack>
      <Stack direction={"row"} spacing={2} padding={2} justifyContent={"start"}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size={"small"} sx={{ width: 130 }} />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="End Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size={"small"} sx={{ width: 130 }} />
            )}
          />
        </LocalizationProvider>

        <Autocomplete
          onChange={changeInOut}
          size={"small"}
          id="combo-box-demo"
          options={selectType}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select In/Out"
              size={"small"}
              sx={{ width: 150 }}
            />
          )}
        />
      </Stack>
      {/* <TableContainer component={Paper} sx={{ padding: "1px" }}> */}
      <Table
        // sx={{ minWidth: "max-content" }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead sx={{ bgcolor: "success.light" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Bet</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Comission</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Win/Lose</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflow: "scroll" }}>
          {/* {report.map((rp) => {
            return (
              <TableRow>
                <TableCell>{rp.userId.username}</TableCell>
                <TableCell>{rp.bet}</TableCell>
                <TableCell>{rp.commission}</TableCell>
                <TableCell>{rp.win}</TableCell>
                <TableCell>
                  <IconButton color="success">
                    <NavLink
                      to={`/reports/agent/${rp.userId._id}/calls/${lotteryId}`}
                      // state={{ lotteryId: lotteryId }}
                    >
                      <VisibilityOutlined />
                    </NavLink>
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })} */}
        </TableBody>
      </Table>
      {/* </TableContainer> */}
    </Stack>
  );
};

export default Report;
