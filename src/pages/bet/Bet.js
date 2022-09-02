import {
  Add,
  AddSharp,
  ArrowBack,
  ArrowForward,
  Close,
  Delete,
  Edit,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Pagination,
  PaginationItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { blue, green, grey, red, yellow } from "@mui/material/colors";
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactFileReader from "react-file-reader";
import { useLocation, useParams } from "react-router-dom";
import BetButtonCom from "../../components/BetButtonCom";
import BetCom from "../../components/BetCom";
import BetListCom from "../../components/BetListCom";
import LagerCom from "../../components/LagerCom";
import TwoDSign from "../../components/TwoDSign";
import Axios from "../../shared/Axios";
import Lager from "../../pages/lager/Lager";
import "./Bet.css";
import {
  startStar,
  k,
  p,
  b,
  Breaks,
  aper,
  padatha,
  r,
  masone,
  sonema,
  mm,
  ss,
  spu,
  mpu,
  backpate,
  forwardPate,
} from "./Betsign";

const Bet = () => {
  // For input refs
  const textFieldForNumber = useRef(null);
  const textFieldForAmount = useRef(null);

  // const [inOutCtl, setInOutCtl] = useState();
  // const [singleBetCleanctlr, setSingleBetCleanctlr] = useState(false);
  const [callTotal, setCallTotal] = useState(0);

  //loading
  const [loading, setLoading] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);

  // autocompleter ctrl
  const [autocompleteCtrl, setAutoCompleteCtrl] = useState(false);

  const [selectChoice, setSelectChoice] = useState();
  const [enternumtol, setEnternumtol] = useState({ number: "", total: "" });

  const [beterrorcontrol, setBeterrorcontrol] = useState(false);
  const [callandBetlistctleff, setCallandBetlistctleff] = useState(true);

  const [agentcalls, setAgentcalls] = useState([]);
  const [callcrud, setCallcrud] = useState(null);
  const [lager, setLager] = useState();
  const [call, setCall] = useState({
    agent: "",
    numbers: [],
  });
  const [callList, setCallList] = useState([]);

  const [agents, setAgents] = useState([]);

  const showCalls = [];

  const { lotteryId } = useParams();
  const location = useLocation();
  const { hot_tees } = location.state;

  console.log(hot_tees);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //callList crud
  const [editCtlBtn, setEditCtlBtn] = useState(false);
  const [agentcallcrud, setAgentCallCrud] = useState({ id: "", numbers: [] });
  const [keydemo, setKeyDemo] = useState();
  //For twoD sign state
  const [autoCompleteValue, setAutoCompleteValue] = useState("");

  const [onchange, setOnchange] = useState({
    number: "",
    amount: "",
  });
  // console.log(agents);
  //lager open
  const [lagerOpen, setLagerOpen] = useState(false);

  //Lager Break
  const [lagerBreak, setLagerBreak] = useState("0");
  const [demoLager, setDemolager] = useState();
  const [callDemo, setCallDemo] = useState([]);
  //calllist control state
  const [calllistctrl, setCalllistctrl] = useState(false);

  const [agentTotalData, setAgentTotalData] = useState({
    numsData: [],
    numsTotal: 0,
  });
  useEffect(() => {
    // console.log(hot_tees);
    // console.log(lotteryId);
    Axios.get(`/agents`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        // console.log(res.data);
        const agents = res.data.data;
        // console.log(agents);

        if (agents) {
          setAgents([...agents]);
          setAutoCompleteValue(agents[0]);
          // setCalllistctrl(true);
        }
      })
      .catch((err) => console.log(err));

    Axios.get(`/lagers/${lotteryId}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setLager(res.data.data);
        setCallList(res.data.data.in.read);
        // setSuccess(false);
      })
      .catch((err) => console.log(err));
    Axios.get(`/call/${lotteryId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data.data);
      setAgentcalls(res.data.data);
    });
    if (call.agent) {
      console.log(call.agent);
      Axios.get(`/call/${lotteryId}/call-numbers-total/${call.agent}`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }).then((res) => {
        console.log(res.data);
        setAgentTotalData({
          numsData: res.data.numsData,
          numsTotal: res.data.numsTotal,
        });
      });
    }
    setCalllistctrl(false);
  }, [calllistctrl]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(value);

    // [...agentTotalData.numsData].map((agenTol, key) => {
    //   //Check for input total
    //   if (agentTotalData.numsData.map((ag) => ag.number).includes(value)) {
    //     const index = agentTotalData.numbers.findIndex(
    //       (obj) => obj.number === value
    //     );
    //     console.log(index, agentTotalData.numsData[index]);
    //     // update setstate
    //     setEnternumtol({
    //       number: agentTotalData.numsData[index].number,
    //       total: agentTotalData.numsData[index].amount,
    //     });
    //   } else {
    //     setEnternumtol({
    //       number: "",
    //       total: "",
    //     });
    //   }
    // });
    setOnchange({
      ...onchange,
      [name]: value,
    });
  };

  // console.log(agentTotalData);
  // console.log(enternumtol);
  const choice = (e) => {
    e.preventDefault();

    if (
      (onchange.number.length > 1 ||
        onchange.number === "k" ||
        onchange.number === "K" ||
        onchange.number === "p" ||
        onchange.number === "P" ||
        onchange.number === "b" ||
        onchange.number === "B") &&
      onchange.number.length < 3 &&
      onchange.amount.length > 2
    ) {
      if (onchange.number === "k" || onchange.number === "K") {
        const R = k(onchange);
        setCall({ ...call, numbers: R });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number === "p" || onchange.number === "P") {
        const P = p(onchange);
        setCall({ ...call, numbers: P });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number === "b" || onchange.number === "B") {
        const B = b(onchange);
        setCall({ ...call, numbers: B });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number[1] === "/") {
        const BR = Breaks(onchange);
        console.log(BR);
        setCall({ ...call, numbers: BR });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number[1] === "-") {
        const AP = aper(onchange);
        setCall({ ...call, numbers: AP });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (
        onchange.number === "mm" ||
        onchange.number === "MM" ||
        onchange.number === "Mm" ||
        onchange.number === "mM"
      ) {
        const MAMA = mm(onchange);
        setCall({ ...call, numbers: MAMA });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (
        onchange.number === "ss" ||
        onchange.number === "SS" ||
        onchange.number === "Ss" ||
        onchange.number === "sS"
      ) {
        const SS = ss(onchange);
        setCall({ ...call, numbers: SS });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (
        onchange.number[1] === "*" &&
        onchange.number[0] !== "s" &&
        onchange.number[0] !== "S" &&
        onchange.number[0] !== "m" &&
        onchange.number[0] !== "M" &&
        onchange.number[0] !== "*"
      ) {
        const BPate = backpate(onchange);
        setCall({ ...call, numbers: BPate });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (
        onchange.number[0] === "*" &&
        onchange.number[1] !== "s" &&
        onchange.number[1] !== "S" &&
        onchange.number[1] !== "m" &&
        onchange.number[1] !== "M" &&
        onchange.number[1] !== "*"
      ) {
        const FPate = forwardPate(onchange);
        setCall({ ...call, numbers: FPate });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number === "**") {
        const apu = startStar(onchange);
        setCall({ ...call, numbers: apu });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number === "s*" || onchange.number === "S*") {
        const SPU = spu(onchange);
        setCall({ ...call, numbers: SPU });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number === "m*" || onchange.number === "M*") {
        const SPU = mpu(onchange);
        setCall({ ...call, numbers: SPU });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (
        onchange.number === "MS" ||
        onchange.number === "ms" ||
        onchange.number === "Ms" ||
        onchange.number === "mS"
      ) {
        const MS = masone(onchange);
        // console.log(MS);
        setCall({ ...call, numbers: MS });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (
        onchange.number === "SM" ||
        onchange.number === "sm" ||
        onchange.number === "Sm" ||
        onchange.number === "sM"
      ) {
        const SM = sonema(onchange);
        // console.log(MS);
        setCall({ ...call, numbers: SM });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else {
        setCall({
          ...call,
          numbers: [...call.numbers, onchange],
        });

        setOnchange({ number: "", amount: onchange.amount });
        setBeterrorcontrol(false);

        setEditCtlBtn(false);
        setCallandBetlistctleff(false);
        setAutoCompleteCtrl(false);
      }
    } else if (
      onchange.number.length === 3 &&
      (onchange.number.endsWith("R") || onchange.number.endsWith("r"))
    ) {
      const R = r(onchange);
      setCall({ ...call, numbers: R });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    } else if (onchange.number.length < 6 && onchange.amount.length) {
      const PDT = padatha(onchange);
      setCall({ ...call, numbers: PDT });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    } else {
      setBeterrorcontrol(true);
    }
  };

  const handleFiles = (e) => {
    // console.log(file.base64);
    // console.log(file.fileList);

    const reader = new FileReader();
    reader.onload = (e) => {
      const ReadData = [];

      const text = e.target.result;
      console.log(text);
      const cells = text.split("\n").map((el) => el.split(/\s+/));
      // console.log(cells);
      const headings = cells.shift();
      console.log(cells);
      // console.log(headings);

      cells.map((el) => ReadData.push({ number: el[0], amount: el[1] }));

      console.log(ReadData);
      if (ReadData.length) {
        setCall({ ...call, numbers: ReadData });
      }
    };

    // setCall({ ...call, numbers: ReadData });

    reader.readAsText(e.target.files[0]);
  };

  console.log(call);

  const bet = (e) => {
    e.preventDefault();
    console.log(call);
    if (call.numbers.length === 0 && loading === false) {
      setBeterrorcontrol(true);
      return;
    }
    Axios.post(`/call/${lotteryId}`, call, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res.data);

        setSuccess(true);
        setLoading(true);
        setCall({
          agent: "",
          numbers: [],
        });
        setOnchange({
          number: "",
          amount: "",
        });
        setCalllistctrl(true);
      })
      .then((res) => {
        setSuccess(false);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  // console.log(la);
  //crud delete
  const agcallcrud = (cal) => {
    console.log(cal);
    setAgentCallCrud({ id: cal._id, numbers: cal.numbers });
    // setAutoCompleteCtrl(true);
  };
  const agentcallDelete = (key, calcrud) => {
    console.log(calcrud);
    // const enumbers = [...calcrud];

    // console.log(index);
  };
  const editHandle = (cal, key) => {
    console.log(key);
    setEditCtlBtn(true);
    setOnchange({
      number: cal.number,
      amount: cal.amount,
    });
  };
  // console.log(callcrud);
  //editReading
  const updateCall = () => {
    console.log(onchange);
    console.log(agentcallcrud);
    const numbers = [...agentcallcrud.numbers];
    const index = numbers.findIndex((obj) => obj.number == onchange.number);
    console.log(numbers[index]);
    numbers[index] = onchange;
    console.log(numbers);
    // setAgentCallCrud({ ...agentcallcrud, numbers: numbers });
    Axios.put(
      `/call/${lotteryId}/${agentcallcrud.id}`,
      {
        numbers: numbers,
      },
      {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }
    ).then((res) => {
      console.log(res.data.data);
      setAgentCallCrud({ id: "", numbers: [] });
      setEditCtlBtn(false);
    });
  };

  const setBreak = () => {
    console.log(demoLager);
    console.log(lagerBreak);
    const extraArray = [];
    demoLager.map((demol, key) => {
      if (Number(demol.amount) > Number(lagerBreak)) {
        // console.log(Number(demol.amount) - Number(lagerBreak));
        let obj = {
          number: demol.number,
          amount: Number(demol.amount) - Number(lagerBreak),
        };
        extraArray.push(obj);
      }
      // console.log(array);
    });
    console.log(extraArray);
    setCallDemo(extraArray);
    // setDemolager(callDemo);
    setLagerOpen(false);
  };
  // console.log(callDemo);
  // console.log(agentcallcrud);

  // call
  // useEffect(() => {
  //   Axios.get(`/call/${lotteryId}`, {
  //     headers: {
  //       authorization: `Bearer ` + localStorage.getItem("access-token"),
  //     },
  //   }).then((res) => {
  //     console.log(res.data.data);
  //     setAgentcalls(res.data.data);
  //   });

  //   Axios.get(`/call/${lotteryId}/call-numbers-total/${call.agent}`, {
  //     headers: {
  //       authorization: `Bearer ` + localStorage.getItem("access-token"),
  //     },
  //   }).then((res) => {
  //     console.log(res.data);
  //     setCalllistctrl(false);
  //   });
  // }, [calllistctrl]);

  //CallOutLager
  const changeInOut = (e) => {
    setSelectChoice(e.target.value);
    console.log(selectChoice);
  };

  console.log(agentTotalData.numsData);

  // get autocomplete option function
  const getAutoChoCus = (cus) => {
    return cus.username;
  };
  return (
    <Stack height={"100%"}>
      {success && (
        <Alert
          severity="success"
          sx={{
            color: "green",
            // fontWeight: "bold",
            bgcolor: green[200],
          }}
          action={
            <IconButton
              aria-label="close"
              color="success"
              size="small"
              onClick={() => {
                setSuccess(false);
              }}
            >
              <Close fontSize="12" />
            </IconButton>
          }
        >
          Lottery Updated !
        </Alert>
      )}
      {error && (
        <Alert
          severity="error"
          sx={{
            color: "red",
            // fontWeight: "bold",
            bgcolor: red[200],
          }}
          action={
            <IconButton
              aria-label="close"
              color="error"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <Close fontSize="12" />
            </IconButton>
          }
        >
          Error
        </Alert>
      )}
      {beterrorcontrol === true && (
        <Alert
          variant="filled"
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="error"
              size="small"
              onClick={() => {
                setBeterrorcontrol(false);
              }}
            >
              <Close fontSize="12" />
            </IconButton>
          }
        >
          This is bet error alert — check it out!
        </Alert>
      )}
      <Stack
        padding={1}
        spacing={1}
        direction={"row"}
        justifyContent={"center"}
        boxShadow={1}
      >
        {/* <Autocomplete
          onChange={changeInOut}
          size="small"
          id="combo-box-demo"
          // sx={{ width: 50 }}
          options={selectType}
          renderInput={(params) => (
            <TextField
              {...params}
              label="In/Out"
              size={"small"}
              sx={{ width: 100 }}
            />
          )}
        /> */}

        <Autocomplete
          size="small"
          // options={selectChoice && selectChoice === "Out" ? agents : "0"
          options={agents}
          isOptionEqualToValue={(option, value) =>
            option.username === value.username
          }
          sx={{ width: 200 }}
          getOptionLabel={(cus) => getAutoChoCus(cus)}
          onChange={(e, value) => {
            console.log(value);
            setAutoCompleteValue(value);
            setCall({ ...call, agent: value._id });
            setCalllistctrl(true);
            setAutoCompleteCtrl(true);
            setCall({ agent: value._id, numbers: [] });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ fontSize: 8 }}
              label="Agent"
              size="small"
              color={"success"}
              // defaultValue={agents}
            />
          )}
        />

        <Button
          onClick={handleFiles}
          variant="contained"
          component="label"
          color="success"
          size="small"
          // sx={{ fontSize: 14 }}
        >
          <Typography fontSize={{ xs: 8, sm: 10, md: 12 }}>Read</Typography>
          <input hidden accept={"All/*"} multiple type="file" />
        </Button>

        <Stack direction={"row"} spacing={1}>
          <Button
            variant={"contained"}
            size={"small"}
            color={"success"}
            onClick={() => {
              setLagerOpen(true);
              setDemolager(lager.in.numbers);
            }}
          >
            <Typography
              fontSize={{ xs: 8, sm: 10, md: 12 }}
              variant={"caption"}
              fontWeight={100}
            >
              Lager
            </Typography>
          </Button>
        </Stack>
        {/* <Stack direction={"row"}>
          <FormControl size="small">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="In"
                control={
                  <Radio
                    size="small"
                    color="success"
                    onChange={(e) => changeInOut(e)}
                  />
                }
                label="In"
              />
              <FormControlLabel
                value="Out"
                control={
                  <Radio
                    size="small"
                    color="success"
                    onChange={(e) => console.log(e.target.value)}
                  />
                }
                label="Out"
              />
            </RadioGroup>
          </FormControl>
        </Stack> */}
      </Stack>
      <Stack
        padding={1}
        spacing={1}
        direction={"row"}
        justifyContent={"center"}
        boxShadow={1}
      >
        <BetCom
          width={50}
          text={"number"}
          name="number"
          autoFocus={true}
          value={onchange.number}
          onChange={onChangeHandler}
          inputRef={textFieldForNumber}
          style={{ position: "relative" }}
          // numTotalCheck={
          //   <Chip sx={{ position: "absolute", right: 0 }} label="a" />
          // }
          onKeyDown={(event) => {
            if (event.key.toLowerCase() === "enter") {
              console.log(event.target);
              textFieldForAmount.current.focus();
              // event.target.value.select();
              //  const form = event.target.form;
              //  const index = [...form].indexOf(event.target);
              //  form.elements[index + 1].focus();
              event.preventDefault();
            }
          }}
          label={"နံပါတ်"}
        >
          {agentTotalData.numsData
            .map((num) => num.number)
            .includes(onchange.number) && (
            <Chip
              label={
                agentTotalData.numsData[
                  agentTotalData.numsData.findIndex(
                    (obj) => obj.number === onchange.number
                  )
                ].amount
              }
              sx={{
                position: "absolute",
                right: 4,
                top: 4,
                backgroundColor: green[300],
              }}
            />
          )}
        </BetCom>

        {/* <TwoDSign /> */}
        <BetCom
          text={"number"}
          name="amount"
          value={onchange.amount}
          onChange={onChangeHandler}
          inputRef={textFieldForAmount}
          onFocus={(event) => event.target.select()}
          onKeyDown={(event) => {
            console.log(event.key);

            if (
              event.key.toLowerCase() === "enter" ||
              event.key.toLowerCase() === "numpadenter"
            ) {
              choice(event);
              textFieldForNumber.current.focus();
              event.target.value.select();
              event.preventDefault();
            }
          }}
          // onFocus={false}
          label={"ထိုးငွေ"}
        />
        <Stack alignItems={"center"}>
          {editCtlBtn ? (
            <IconButton onClick={updateCall} size={"small"}>
              <Edit fontSize="8" />
            </IconButton>
          ) : (
            <IconButton
              onClick={bet}
              size={"small"}
              sx={{ bgcolor: green[700] }}
            >
              <Add fontSize="8" />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <Stack justifyContent={"right"} width={"100%"}>
        <Pagination
          size="small"
          page={call.numbers}
          count={call.numbers}
          boundaryCount={2}
          siblingCount={-1}
          renderItem={(item) => (
            <PaginationItem
              size="small"
              components={{ previous: ArrowBack, next: ArrowForward }}
              {...item}
            />
          )}
        />
      </Stack>

      <Stack direction={"row"} spacing={{ xs: 0.5, sm: 1, md: 1 }}>
        <Stack
          // display={{ md: "none" }}
          bgcolor={grey[300]}
          spacing={3}
          direction={"row"}
          justifyContent={"center"}
          width={{ xs: 30, sm: "20%", md: "25%" }}
        >
          {hot_tees &&
            hot_tees.map((hot, key) => {
              console.log(hot);
              return (
                <Typography
                  color={"red"}
                  fontSize={18}
                  fontWeight={600}
                  textAlign={"center"}
                >
                  {hot}
                </Typography>
              );
            })}
        </Stack>

        <Stack
          // display={"block"}
          // position={"initial"}
          // direction={"column"}
          alignItems={"center"}
          width={"40%"}
          maxHeight={400}
          minHeight={400}
          overflow={"auto"}
          // boxShadow={1}
          // borderBottom={1}
          // padding={1}
          // spacing={1}
        >
          {call.agent && autocompleteCtrl === false && call.numbers.length
            ? call.numbers.map((cal, key) => (
                // <Stack
                //   width={"100%"}
                //   alignItems={"center"}
                //   bgcolor={"ActiveBorder"}
                // >
                <Stack
                  direction={"row"}
                  // width={{ sx: 180 }}
                  marginY={0.3}
                  justifyContent={{
                    sx: "space-between",
                    sm: "space-around",
                    md: "space-around",
                  }}
                >
                  <BetListCom call={cal} key={key} />
                  {/* </Stack> */}
                </Stack>
              ))
            : autoCompleteValue &&
              agentcalls
                .filter(
                  (ag, key) => ag.agent._id.toString() == call.agent.toString()
                )
                .map((cal, key) => {
                  // console.log(key);
                  // console.log(cal);

                  return (
                    <Stack
                      bgcolor={`${key % 2 == 0 ? green[200] : ""}`}
                      borderLeft={0.5}
                      borderRight={0.5}
                      justifyContent={"space-around"}
                      // component={"button"}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setAgentCallCrud({ id: cal._id, numbers: cal.numbers });
                        setCallTotal(cal.totalAmount);
                        setAutoCompleteCtrl(true);
                      }}
                    >
                      {cal.numbers.map((ca, key) => {
                        return <BetListCom call={ca} key={key} />;
                      })}
                    </Stack>
                  );
                })
                .reverse()}
        </Stack>
        <Stack
          alignItems={"center"}
          // width={"30%"}
          maxHeight={400}
          minHeight={400}
          overflow={"scroll"}
          boxShadow={1}
          // borderBottom={1}
          // padding={1}
          // justifyContent={"space-between"}
        >
          {/* <Stack justifyContent="normal" width={"100%"}>
            <Stack width={"30%"}>
              <Button variant="contained" size="small">
                Delete
              </Button>
            </Stack>
          </Stack> */}
          {/* {agentcallcrud && agentcallcrud.length === null */}
          {!agentcallcrud.numbers.length
            ? callDemo.map((calc, key) => {
                <Stack
                  borderLeft={0.5}
                  borderRight={0.5}
                  // padding={1}
                  // direction={"row"}
                  justifyContent={"space-around"}
                >
                  <BetListCom call={calc} key={key} />;
                </Stack>;
              })
            : autocompleteCtrl === true &&
              agentcallcrud.numbers.map((calcrud, key) => {
                return (
                  <BetListCom call={calcrud}>
                    <Stack
                      direction={"row"}
                      onClick={() => editHandle(calcrud, key)}
                    >
                      <IconButton size="small">
                        <Edit fontSize="6" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => agentcallDelete(key, calcrud)}
                      >
                        <Delete fontSize="6" />
                      </IconButton>
                    </Stack>
                  </BetListCom>
                );
              })}
        </Stack>
      </Stack>
      <Stack
        padding={1}
        border={1}
        direction={"row"}
        justifyContent={{
          xs: "space-between",
          sm: "space-between",
          md: "flex-start",
        }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Typography fontWeight={900}>
          <span style={{ color: "red" }}>Call Total</span> :{" "}
          {callTotal.toString()}
        </Typography>
        <Typography fontWeight={900}>
          <span style={{ color: "red" }}>Net Total</span> :{" "}
          {agentTotalData.numsTotal.toString()}
        </Typography>
      </Stack>

      <Dialog fullScreen open={lagerOpen}>
        <Stack alignItems={"end"}>
          <IconButton onClick={() => setLagerOpen(false)}>
            <Close />
          </IconButton>
        </Stack>
        <Stack maxWidth={"100%"} padding={1}>
          <Stack direction={"row"} padding={1}>
            <TextField
              value={lagerBreak}
              label={"Break Amount"}
              size={"small"}
              onChange={(e) => setLagerBreak(e.target.value)}
            />
            <Button
              size="small"
              variant={"contained"}
              color={"success"}
              onClick={setBreak}
            >
              Set
            </Button>
          </Stack>
          <LagerCom />
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default Bet;
