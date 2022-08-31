// import { Call } from "@mui/icons-material";

import { PlaylistAddCheckCircleRounded } from "@mui/icons-material";

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

export const k = (onChange) => {
  return [
    { number: "07", amount: onChange.amount },
    { number: "70", amount: onChange.amount },
    { number: "18", amount: onChange.amount },
    { number: "81", amount: onChange.amount },
    { number: "24", amount: onChange.amount },
    { number: "42", amount: onChange.amount },
    { number: "35", amount: onChange.amount },
    { number: "53", amount: onChange.amount },
    { number: "69", amount: onChange.amount },
    { number: "96", amount: onChange.amount },
  ];
};

export const p = (onChange) => {
  return [
    { number: "05", amount: onChange.amount },
    { number: "50", amount: onChange.amount },
    { number: "16", amount: onChange.amount },
    { number: "61", amount: onChange.amount },
    { number: "27", amount: onChange.amount },
    { number: "72", amount: onChange.amount },
    { number: "38", amount: onChange.amount },
    { number: "83", amount: onChange.amount },
    { number: "49", amount: onChange.amount },
    { number: "94", amount: onChange.amount },
  ];
};

export const b = (onChange) => {
  return [
    { number: "01", amount: onChange.amount },
    { number: "10", amount: onChange.amount },
    { number: "12", amount: onChange.amount },
    { number: "21", amount: onChange.amount },
    { number: "23", amount: onChange.amount },
    { number: "32", amount: onChange.amount },
    { number: "34", amount: onChange.amount },
    { number: "43", amount: onChange.amount },
    { number: "45", amount: onChange.amount },
    { number: "54", amount: onChange.amount },
    { number: "56", amount: onChange.amount },
    { number: "65", amount: onChange.amount },
    { number: "67", amount: onChange.amount },
    { number: "76", amount: onChange.amount },
    { number: "78", amount: onChange.amount },
    { number: "87", amount: onChange.amount },
    { number: "89", amount: onChange.amount },
    { number: "98", amount: onChange.amount },
    { number: "09", amount: onChange.amount },
    { number: "90", amount: onChange.amount },
    { number: "49", amount: onChange.amount },
    { number: "94", amount: onChange.amount },
  ];
};

export const Breaks = (onChange) => {
  let arrx = Array.from(Array(10), (_, x) => x);
  let arry = Array.from(Array(10), (_, x) => x);
  let result = [];
  arrx.map((l, key) => {
    arry.map((ll, key) => {
      if (
        (l + ll).toString() == onChange.number[0].toString() ||
        (l + ll).toString() == `1${onChange.number[0]}`
      ) {
        console.log("Ok");
        result.push({
          number: l.toString() + ll.toString(),
          amount: onChange.amount,
        });
      }
    });
  });
  console.log(result);
  return result;
};

export const aper = (onChange) => {
  let output = [];
  let arr = Array.from(Array(10), (_, x) => x);
  arr.map((ar, key) => {
    console.log(key);
    if (onChange.number[0] !== key.toString()) {
      output.push(
        {
          number: onChange.number[0].toString() + key.toString(),
          amount: onChange.amount,
        },
        {
          number: key.toString() + onChange.number[0].toString(),
          amount: onChange.amount,
        }
      );
    } else
      output.push({
        number: onChange.number[0].toString() + key.toString(),
        amount: onChange.amount,
      });
  });
  return output;
};

export const padatha = (onChange) => {
  let result = [];
  let arr = Array.from(Array(10), (_, x) => x);
  let arry = Array.from(Array(10), (_, x) => x);

  arr.map((x, key) => {
    arry.map((y, key) => {
      if (
        (y.toString() === onChange.number[0] ||
          y.toString() === onChange.number[1] ||
          y.toString() === onChange.number[2] ||
          y.toString() === onChange.number[3] ||
          y.toString() === onChange.number[4]) &&
        x.toString() !== y.toString()
      ) {
        result.push({
          number: y.toString() + x.toString(),
          amount: onChange.amount,
        });
      }
    });
  });
  console.log(result);
  return result;
};

export const r = (onChange) => {
  return [
    {
      number: `${onChange.number[0]}${onChange.number[1]}`,
      amount: onChange.amount,
    },
    {
      number: `${onChange.number[1]}${onChange.number[0]}`,
      amount: onChange.amount,
    },
  ];
};

export const masone = (onChange) => {
  let ma = [];
  let sone = [];
  let result = [];
  Array.from(Array(10), (_, x) => x).map((arr, key) => {
    arr % 2 !== 0 ? ma.push(arr) : sone.push(arr);
  });
  ma.map((m, key) => {
    sone.map((s, key) => {
      result.push({
        number: m.toString() + s.toString(),
        amount: onChange.amount,
      });
    });
  });
  // console.log(sone);
  return result;
};

export const sonema = (onChange) => {
  let ma = [];
  let sone = [];
  let result = [];
  Array.from(Array(10), (_, x) => x).map((arr, key) => {
    arr % 2 !== 0 ? ma.push(arr) : sone.push(arr);
  });
  ma.map((m, key) => {
    sone.map((s, key) => {
      result.push({
        number: s.toString() + m.toString(),
        amount: onChange.amount,
      });
    });
  });
  // console.log(sone);
  return result;
};

// export const mmss = (onChange) => {
//   let ma = [];
//   let sone = [];
//   Array.from(Array(10), (_, x) => x).map((arr, key) => {
//     arr % 2 !== 0 ? ma.push(arr) : sone.push(arr);
//   });
//   let Output =
//     (onchange.number[0]("M") || onchange.number[0]("m")) &&
//     (onchange.number[1]("M") || onchange.number[1]("m"))
//       ? ma.map((m, key) => {
//           return ma.map((m1, key) => {
//             return {
//               number: m.toString() + m1.toString(),
//               amount: onChange.amount,
//             };
//           });
//         })
//       : sone.map((s, key) => {
//           return sone.map((s1, key) => {
//             return {
//               number: s.toString() + s1.toString(),
//               amount: onChange.amount,
//             };
//           });
//         });
//   return Output;
// };