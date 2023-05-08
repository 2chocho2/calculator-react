import axios from "axios";
import { useState } from "react";
import calimg from "./img/Calculator1.png"
import './salary.css';

function Salary() {

    const [inputPay, setInputPay] = useState('');                       // 연봉
    const [taxFree, setTaxFree] = useState('100000');                   // 비과세액
    const [dependent, setDependent] = useState(1);                    // 부양가족 수(본인 포함 - 기본 1명)
    const [underTwenty, setUnderTwenty] = useState(0);                 // 20세 이하 자녀 수
    const [choosePeriod, setChoosePeriond] = useState('0');              // 급여 기준(연봉/ 월급)
    const [retirementInclude, setRetirementInclude] = useState('0');     // 퇴직금(별도/ 포함)
    const [card, setCard] = useState('');                               // 카드값

    const [result, setResult] = useState({});                            // 결과값

    const handlerChanage = e => {
        setInputPay(e.target.value.replaceAll(",", ""));
    };

    const onIncrease = () => {
        setDependent(dependent + 1);
    }

    const onDecrease = () => {
        setDependent(dependent - 1);
    }

    const onIncreaseTwen = () => {
        setUnderTwenty(underTwenty + 1);
    }

    const onDecreaseTwen = () => {
        setUnderTwenty(underTwenty - 1);
    }


    //토글
    const [selectedButton, setSelectedButton] = useState('myButton1'); // 기본값으로 'myButton1' 설정
    const [selectedButton2, setSelectedButton2] = useState('myButton3'); // 기본값으로 'myButton1' 설정

    //급여 기준
    const handleButtonClick = (buttonId) => {
        let selectedValue;
        if (buttonId === 'myButton1') {
            selectedValue = 0; // 연봉 선택한 경우
        } else {
            selectedValue = 1; // 월급 선택한 경우
        }

        // 선택된 항목이 이미 있는 경우, 선택 해제
        if (selectedButton === buttonId) {
            setSelectedButton(null);
            setChoosePeriond(null);
        } else {
            setSelectedButton(buttonId);
            setChoosePeriond(selectedValue);
        }
    };

    const handleButtonClick2 = (buttonId) => {
        let selectedValue;
        if (buttonId === 'myButton4') {
            selectedValue = 1; // 포함 선택한 경우
        } else {
            selectedValue = 0; // 별도 선택한 경우
        }

        // 선택된 항목이 이미 있는 경우, 선택 해제
        if (selectedButton2 === buttonId) {
            setSelectedButton2(null);
            setRetirementInclude(null);
        } else {
            setSelectedButton2(buttonId);
            setRetirementInclude(selectedValue);
        }
    };


    const handlerChangeTax = e => setTaxFree(e.target.value);
    const handlerChangeDependent = e => setDependent(e.target.value);
    const handlerChangeUnderTwenty = e => setUnderTwenty(e.target.value);
    const handlerChangeCard = e => setCard(e.target.value);

    const handlerClick = () => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/salaryCal/${inputPay}/${taxFree}/${dependent}/${underTwenty}/${choosePeriod}/${retirementInclude}`)
            .then(response => {
                console.log(response.data);
                setResult(response.data);
            })
            .catch(error => console.log(error));
    };

    const [selectedButton5, setSelectedButton5] = useState('myButton6'); // 기본값으로 'myButton1' 설정

    const handleClick2 = (buttonId) => {
        let selectedValue;
        if (buttonId === 'myButton5') {
            selectedValue = "/HoliCal"; // 포함 선택한 경우
            window.location.href = '/HoliCal'
        } else {
            selectedValue = "/Salary";
            window.location.href = '/Salary'; // 별도 선택한 경우
        }

        // 선택된 항목이 이미 있는 경우, 선택 해제
        if (selectedButton5 === buttonId) {
            setSelectedButton5(null);
        } else {
            setSelectedButton5(buttonId);
        }
    };

    return (
        <>
            <div className="salary_container">
                <div className="paycheck-container">
                    <div className="cal_title">
                        <img className="circle" src={calimg}></img>
                        <h2 className="title">연봉 연차 계산기</h2>
                    </div>
                    <button className="salary_salary_btn" id="myButton5" onClick={() => handleClick2('myButton5')}
                        style={{
                            backgroundColor: selectedButton5 === 'myButton5' ? 'black' : 'initial',
                            color: selectedButton5 === 'myButton5' ? 'white' : 'initial'
                        }}
                    >연차</button>
                    <div className="paycheck-box">
                        연봉
                        <input type="text" value={inputPay} onChange={handlerChanage} placeholder="연봉" />
                        비과세액
                        <input type="text" value={taxFree} onChange={handlerChangeTax} placeholder="비과세액" />
                        <div className="form_field">
                            <span class="spin_button number">
                                부양가족 수 <br />
                                <button type="button" onClick={onDecrease} class="minus" id="dependent_btn">▼</button>
                                <input type="text" id="dependent" value={dependent} maxLength="2" onChange={handlerChangeDependent} />
                                <button type="button" onClick={onIncrease} class="plus" id="dependent_btn">▲</button>
                            </span>
                        </div>
                        <div className="form_field_2">
                            <span class="spin_button number_2">
                                20세 이하 자녀 수  <br />
                                <button type="button" onClick={onIncreaseTwen} class="plus" id="dependent_btn">▲</button>
                                <input type="text" id="dependent" value={underTwenty} maxLength="2" onChange={handlerChangeUnderTwenty} />
                                <button type="button" onClick={onDecreaseTwen} class="minus" id="dependent_btn">▼</button>
                            </span>
                        </div>
                        <div className="form_field_3">
                            <span class="spin_button number_3">
                                급여 기준 <br />
                                <button id="myButton1" onClick={() => handleButtonClick('myButton1')} style={{
                                    backgroundColor: selectedButton === 'myButton1' ? 'black' : 'initial',
                                    color: selectedButton === 'myButton1' ? 'white' : 'initial'
                                }}>연봉</button>
                                <button id="myButton2" onClick={() => handleButtonClick('myButton2')} style={{
                                    backgroundColor: selectedButton === 'myButton2' ? 'black' : 'initial',
                                    color: selectedButton === 'myButton2' ? 'white' : 'initial'
                                }}>월급</button>
                            </span>
                            
                        </div>
                        <div className="form_field_4" >
                            <span class="spin_button number_4">
                                퇴직금 <br />
                                <button id="myButton4" onClick={() => handleButtonClick2('myButton4')} style={{
                                    backgroundColor: selectedButton2 === 'myButton4' ? 'black' : 'initial',
                                    color: selectedButton2 === 'myButton4' ? 'white' : 'initial'
                                }}>포함</button>
                                <button id="myButton3" onClick={() => handleButtonClick2('myButton3')} style={{
                                    backgroundColor: selectedButton2 === 'myButton3' ? 'black' : 'initial',
                                    color: selectedButton2 === 'myButton3' ? 'white' : 'initial'
                                }}>별도</button>
                               
                            </span>
                        </div>
                        <div className="form_field_5">
                            카드값 <input type="text" value={card} onChange={handlerChangeCard} placeholder="카드값" />
                        </div>
                        <button className="cal-btn" onClick={handlerClick}>계산하기</button>
                    </div>
                </div>




                <div className="result-container">
                    <button className="salary_holi_btn" id="myButton6" onClick={() => handleClick2('myButton6')}
                        style={{
                            backgroundColor: selectedButton5 === 'myButton6' ? 'black' : 'initial',
                            color: selectedButton5 === 'myButton6' ? 'white' : 'initial'
                        }}
                    >연봉</button>
                    <div className="result-box-all">
                        <div className="blue-box"></div>
                        <div className="result-box">
                            {result && result.data &&
                                <ul>
                                    <h1>PayDay</h1>
                                    <dl>건강보험  {result.data.health_insurance}원</dl><hr />
                                    <dl>소득세  {result.data.income_tax}원</dl><hr />
                                    <dl>장기요양  {result.data.longterm_care_insurance}원</dl><hr />
                                    <dl>국민연금  {result.data.national_pension}원</dl><hr />
                                    <dl>지방소득세  {result.data.residence_tax}원</dl><hr />
                                    <dl>고용보험  {result.data.unemployment_insurance}원</dl><hr />
                                    <dl>공제액 합계  {result.data.total_tax_deduction}원</dl><hr />
                                    <dl>카드값  {card}원</dl><hr />
                                    <dl className="pay_result">월 예상 실 수령액  <br />{result.data.after_tax_income - card}원</dl>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Salary;