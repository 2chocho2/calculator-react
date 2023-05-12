import { useState } from "react";
import Moment from "react-moment";
import axios from "axios";
import "./holi.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import calimg from "./img/Calculator1.png"

function Holi() {

  const [nowTime, setNowTime] = useState(Date.now())
  const [startDate, setStartDate] = useState(nowTime);
  const [result, setResult] = useState({});

  const [workDay, setWorkDay] = useState('');

  const handlerChange = e => {
    setStartDate(e.target.value.replaceAll("-", ""));
  };

  const handlerClick = () => {
    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/calcurate/${startDate}`)
      .then(response => {
        console.log(response.data);
        setResult(response.data);

        console.log(response.data.data.work_day)
        setWorkDay(response.data.data.work_day);

      })
      .catch(error => console.log(error));
  };

  const [selectedButton, setSelectedButton] = useState('myButton1'); // 기본값으로 'myButton1' 설정

  const handleClick = (buttonId) => {
    let selectedValue;
    if (buttonId === 'myButton1') {
      selectedValue = "/HoliCal"; // 포함 선택한 경우
    } else {
      selectedValue = "/Salary";
      window.location.href = '/Salary'; // 별도 선택한 경우
    }

    // 선택된 항목이 이미 있는 경우, 선택 해제
    if (selectedButton === buttonId) {
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonId);
    }
  };


  return (
    <>
      <div className="holi_container">
        <div className="cal_title">
          <div className="circle"></div>
          <img className="circle" src={calimg}></img>
          <h2 className="title">연봉 연차 계산기</h2>
        </div>
        <div class="toggle_button_container">
          <button className="holi_salary_btn" id="myButton1" onClick={() => handleClick('myButton1')}
            style={{
              backgroundColor: selectedButton === 'myButton1' ? 'black' : 'initial',
              color: selectedButton === 'myButton1' ? 'white' : 'initial'
            }}
          >연차</button>
          <button className="holi_holi_btn" id="myButton2" onClick={() => handleClick('myButton2')}
            style={{
              backgroundColor: selectedButton === 'myButton2' ? 'black' : 'initial',
              color: selectedButton === 'myButton2' ? 'white' : 'initial'
            }}
          >연봉</button>
        </div>
        {/* ---------------- 공통 타이틀 end ---------------- */}


        <div className="holical">
          <div>
            <p className="join_date_text">입사일</p>
            <p className="worked_date_text">근무 일수</p>
          </div>
          <div className="join_date">
            <input type="date" className="calender" onChange={handlerChange} placeholder="입사일" />
          </div>
          <div className="worked_date">
            <input type="text" className="calender_2" placeholder="근무일수" readOnly value={workDay} />
          </div>
          <button onClick={handlerClick} className="cal-btn_2">계산하기</button>
        </div>

        <div className="holiresult">
          {result && result.data &&
            <ul>
              {/* <li>근무일수: { result.data.work_day}일</li> */}
              <Moment format={"yyyy/MM/DD"} className={'moment-box'}>{nowTime}</Moment> 기준으로 <br />
              총 연차일수는  {result.data.holi_day}일 입니다.
              <li>본 연봉계산기는 가장 범용적인 기준으로 만들었으나, 연봉 지급 조건과 상황에 따라 약간의 오차가 발생할 수 있으니 참고용으로 활용하시기 바랍니다.<br />
                본 계산기는 모의계산 결과로 법적 효력이 없습니다.</li>
            </ul>
          }
        </div>
      </div>
    </>
  );

}

export default Holi;