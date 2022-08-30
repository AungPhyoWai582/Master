// import { Call } from "@mui/icons-material";

export const startStar = (onChange) => {
  console.log(onChange);
  return [
    { number: "00", amount: onChange.amount },
    { number: "11", amount: onChange.amount },
    { number: "22", amount: onChange.amount },
    { number: "33", amount: onChange.amount },
    { number: "44", amount: onChange.amount },
    { number: "55", amount: onChange.amount },
    { number: "66", amount: onChange.amount },
    { number: "77", amount: onChange.amount },
    { number: "88", amount: onChange.amount },
    { number: "99", amount: onChange.amount },
  ];
};
