import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Axios from "../../shared/Axios";

const Lager = () => {
  const { lotteryId } = useParams();
  const location = useLocation();
  const { _date } = location.state;
  const date = new Date(_date);

  const [Lager, setLager] = useState([]);
  useEffect(() => {
    Axios.get(`/call/${lotteryId}/lager`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data);
      setLager(res.data);
      // const { _id, _date, _time, totalAmount, call } = res.data.data;
      // setLager({
      //   info: { id: _id, date: _date, time: _time, totalAmount: totalAmount },
      //   call: call.map((c) => {
      //     return { number: c.number, amount: Number(c.amount) };
      //   }),
      // });
    });
  }, []);
  // console.log(Lager);
  // console.log(Lager.call);
  // const date = new Date(Lager.info.date);

  //   const call = Lager.call.map((c) => {
  //     return { number: c.number, amount: Number(c.amount) };
  //   });
  //   const sort = call.sort((a, b) => b.amount - a.amount);
  //   console.log(sort);
  return (
    <Stack
      width={{ xs: "100%", md: "50%" }}
      margin={{ md: "auto" }}
      //   component={"table"}
      boxShadow={1}
    >
      <Stack direction={"row"} justifyContent={"space-between"} padding={2}>
        {/* <Stack direction={"row"}>
          <Typography>{Lager.info.id}</Typography>
        </Stack> */}
        <Stack direction={"row"}>
          <Typography>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Typography>
        </Stack>
        <Stack direction={"row"}>
          <Typography>Total &nbsp;</Typography>
          <Typography> {Lager.totalAmount}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"column"} padding={2}>
        {Lager.lager &&
          Lager.lager
            .sort((a, b) => b.amount - a.amount)
            .map((c) => (
              <Stack
                direction={"row"}
                padding={1}
                justifyContent="space-between"
                borderBottom={1}
                borderColor={grey[400]}
              >
                <Typography>{c.number}</Typography>
                <Typography>{c.amount}</Typography>
              </Stack>
            ))}
      </Stack>
    </Stack>
  );
};

export default Lager;
