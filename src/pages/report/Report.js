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
import { grey, teal } from "@mui/material/colors";
import { useLocation, NavLink } from "react-router-dom";
import Axios from "../../shared/Axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Report = () => {
  const location = useLocation();
  // const { lotteryId } = location.state;
  // console.log(lotteryId);

  const [report, setReport] = useState({ me: {}, memberReport: [] });

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log(startDate);
  console.log(endDate);
  // const [open, setOpen] = useState(false);
  const DiaOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    Axios.get(`/reports/members-collections`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data.report);
      const { me, memberReport } = res.data.report;
      console.log(me, memberReport);
      // setReport(res.data.report);
      setReport({ me: me, memberReport: memberReport });
    });
  }, []);
  console.log(report);
  return (
    <Stack>
      <Stack direction={"row"} spacing={2} padding={2} justifyContent={"start"}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size={"small"} sx={{ width: 130 }} />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
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
        <TableHead sx={{ bgcolor: "success.light", fontSize: 12 }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
              Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Bet</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
              Comission
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
              Win/Lose
            </TableCell>
            {/* <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
              More
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflow: "scroll" }}>
          {report &&
            [...report.memberReport].map((rp) => {
              return (
                <TableRow>
                  <TableCell>{rp.name.toString()}</TableCell>
                  <TableCell>{rp.totalAmount.toString()}</TableCell>
                  <TableCell>{rp.totalCommission.toString()}</TableCell>
                  <TableCell>{rp.totalWin.toString()}</TableCell>
                  {/* <TableCell> */}
                  {/* <IconButton color="success">
                    <NavLink
                    // to={`/reports/agent/${rp.userId._id}/calls/${lotteryId}`}
                    // state={{ lotteryId: lotteryId }}
                    >
                      <VisibilityOutlined />
                    </NavLink>
                  </IconButton> */}
                  {/* </TableCell> */}
                </TableRow>
              );
            })}
          <TableRow
            // sx={{ fontSize: 12, fontWeight: "bold" }}
            style={{
              backgroundColor: grey[300],
            }}
          >
            <TableCell sx={{ fontSize: 16, fontWeight: 600 }}>Total</TableCell>
            <TableCell sx={{ fontSize: 16, fontWeight: 500 }}>
              {report.me.totalAmount}
            </TableCell>
            <TableCell sx={{ fontSize: 16, fontWeight: 500 }}>
              {report.me.totalCommission}
            </TableCell>
            <TableCell sx={{ fontSize: 16, fontWeight: 500 }}>
              {report.me.totalWin}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* </TableContainer> */}
    </Stack>
  );
};

export default Report;
