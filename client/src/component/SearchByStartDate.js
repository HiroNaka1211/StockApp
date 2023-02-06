import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function SearchByStartDate(props) {
  const Today = new Date();
  const stockdata = Object.create(props.data[0]);
  let minimumDate;
  let maximumDate;

  stockdata.sort(function (a, b) {
    if (a.date > b.date) return 1;
    if (b.date > a.date) return -1;

    return 0;
  });
  minimumDate = new Date(stockdata[0].date);
  if (props.data[2] !== "") {
    maximumDate = props.data[2];
  } else {
    maximumDate = Today;
  }

  const [date, setDate] = useState(minimumDate);

  const handleChange = (event) => {
    setDate(event);
    props.getTime(event);
  };

  return (
    <div>
      <label>{props.data[3]}</label>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={date}
        minDate={minimumDate}
        maxDate={maximumDate}
        onChange={handleChange}
      />
    </div>
  );
}
