import {
  AddSharp,
  Delete,
  List,
  MenuBook,
  Settings,
  Star,
} from "@mui/icons-material";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Axios from "../../shared/Axios";

const Lottery = () => {
  const [lottery, setLottery] = useState([]);
  useEffect(() => {
    Axios.get("/lottery")
      .then((res) => {
        setLottery(res.data.lotteries);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(lottery);
  return (
    <Stack direction={"column"} spacing={1}>
      {lottery.length &&
        lottery.map((l) => {
          const date = new Date(l._date);
          return (
            <Stack
              direction={"row"}
              // display="flex"
              justifyContent={"space-between"}
              sx={{ borderRadius: 2 }}
              boxShadow={1}
              padding={1}
            >
              {/* { lottery.length && lottery.map(l=>)} */}
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Avatar
                  sizes={"small"}
                  sx={{
                    border: 3,
                    borderColor: l.play ? "green" : "red",
                    backgroundColor: red[100],
                    color: "black",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {l.pout_tee !== null ? l.pout_tee : "-"}
                </Avatar>
                <Typography>
                  {/* {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`} */}{" "}
                  {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `}
                </Typography>
                <Typography fontWeight={"bold"}>{l._time}</Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                padding={1}
                spacing={1}
              >
                {/* <NavLink
                  to={`/reports/agent/${l._id}`}
                  state={{ lotteryId: l._id }}
                >
                  <IconButton size="small" sx={{ color: "black" }}>
                    <MenuBook fontSize="small" />
                  </IconButton>
                </NavLink> */}
                <NavLink to={`/lottery/lager/${l._id}`} state={{ _date: date }}>
                  <IconButton size="small" sx={{ color: "black" }}>
                    <Star fontSize="small" />
                  </IconButton>
                </NavLink>
                <NavLink to={`/lottery/calls/${l._id}`}>
                  <IconButton size="small" sx={{ color: "black" }}>
                    <List fontSize="small" />
                  </IconButton>
                </NavLink>
                <NavLink to={`/lottery/bet/${l._id}`}>
                  <IconButton size="small" sx={{ color: "black" }}>
                    <AddSharp fontSize="small" />
                  </IconButton>
                </NavLink>
              </Stack>
            </Stack>
          );
        })}
    </Stack>
  );
};

export default Lottery;
