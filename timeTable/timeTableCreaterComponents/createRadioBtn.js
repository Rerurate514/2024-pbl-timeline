let radioID = 0;

class RadioButtonCreater{
    constructor(timeTableCreaterArg){
        this._timeTableCreater = timeTableCreaterArg;
    }

    //todo
    createSwitchingRadioBtn(){
        const weekdayRadioBtnCreater = new WeekdayRadioBtnCreater();
        const saturdayRadioBtnCreater = new SaturdayRadioBtnCreater();
        const holidayRadioBtnCreater = new HolidayRadioBtnCreater();

        const resultForm = document.createElement("form");

        const weekSaturDiv = document.createElement("div");
        const holiDiv = document.createElement("div");

        const weekdayLabelDiv = weekdayRadioBtnCreater.createRadioBtn(this._setEventListenerToRadioBtn);
        const saturdayLabelDiv = saturdayRadioBtnCreater.createRadioBtn(this._setEventListenerToRadioBtn);
        const holidayLabelDiv = holidayRadioBtnCreater.createRadioBtn(this._setEventListenerToRadioBtn);

        resultForm.className = "radioButtonGruop";
        weekSaturDiv.className = "inline-radio";
        holiDiv.className = "inline-radio";

        weekSaturDiv.appendChild(weekdayLabelDiv);
        weekSaturDiv.appendChild(saturdayLabelDiv);
        holiDiv.appendChild(holidayLabelDiv);
    
        resultForm.appendChild(weekSaturDiv);
        resultForm.appendChild(holiDiv);
    
        return resultForm;
    }
    
    _setEventListenerToRadioBtn = (radioBtnArg) => {
        radioBtnArg.addEventListener("change", (e) => {   
            if (e.target.checked) {
                this._changeTimeTableFromRadiobtn(radioBtnArg, e);
            }
        });
    }
    
    //todo
    _changeTimeTableFromRadiobtn(radioBtnArg, e){
        const label = radioBtnArg.parentElement;
        const btnDiv = label.parentElement;
        const btnForm = btnDiv.parentElement;
        const tableContainer = btnForm.parentElement;
        const timeTableToRemove = tableContainer.querySelector(".timeTableContainer");

        if (timeTableToRemove) tableContainer.removeChild(timeTableToRemove);
        
        switch(e.target.value){
            case TimeTableDayType.WEEKDAY:{
                tableContainer.appendChild(
                    this._timeTableCreater.createBusTable(TimeTableDayType.WEEKDAY)
                );
                break;
            }
            case TimeTableDayType.SATURDAY:{
                tableContainer.appendChild(
                    this._timeTableCreater.createBusTable(TimeTableDayType.SATURDAY)
                );
                break;
            }
            case TimeTableDayType.HOLIDAY:{
                tableContainer.appendChild(
                    this._timeTableCreater.createBusTable(TimeTableDayType.HOLIDAY)
                );
                break;
            }
        }
    }
}

class WeekdayRadioBtnCreater{
    createRadioBtn(setEventListenerToRadioBtnCallbackArg){
        const _creater = new _RadioBtnCreater();
        return _creater.createRadioBtn(
            "weekdayLabel",
            "平日",
            TimeTableDayType.WEEKDAY,
            setEventListenerToRadioBtnCallbackArg,
            true
        );
    }
}

class SaturdayRadioBtnCreater{
    createRadioBtn(setEventListenerToRadioBtnCallbackArg){
        const _creater = new _RadioBtnCreater();
        return _creater.createRadioBtn(
            "saturdayLabel",
            "土曜",
            TimeTableDayType.SATURDAY,
            setEventListenerToRadioBtnCallbackArg,
            false
        );
    }
}

class HolidayRadioBtnCreater{
    createRadioBtn(setEventListenerToRadioBtnCallbackArg){
        const _creater = new _RadioBtnCreater();
        return _creater.createRadioBtn(
            "holidayLabel",
            "日・祝",
            TimeTableDayType.HOLIDAY,
            setEventListenerToRadioBtnCallbackArg,
            false
        );
    }
}

class _RadioBtnCreater{
    createRadioBtn(
        labelClassNameArg, 
        labelTextArg, 
        timeTableDayTypeArg, 
        setEventListenerToRadioBtnCallbackArg,
        isCheckedArg
    ){
        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.position = "relative";
        
        const radioBtn = document.createElement("input");
        radioBtn.type = "radio";
        radioBtn.name = "selectWeek";
        radioBtn.value = timeTableDayTypeArg;
        radioBtn.checked = isCheckedArg; 
        radioBtn.id = timeTableDayTypeArg + radioID;
        setEventListenerToRadioBtnCallbackArg(radioBtn);

        radioBtn.style.display = "none";
        radioBtn.style.top = "0";
        radioBtn.style.position = "absolute";

        const label = document.createElement("label");
        label.className = labelClassNameArg;
        label.setAttribute("for", timeTableDayTypeArg + radioID);

        const labelTextDiv = document.createTextNode(labelTextArg);
        label.appendChild(labelTextDiv);

        div.appendChild(radioBtn);
        div.appendChild(label);

        radioID++;
        
        return div;
    }
}

// const label = document.createElement("label");
// label.className = labelClassName;

// const radioBtn = document.createElement("input");
// radioBtn.type = "radio";
// radioBtn.name = "selectWeek";
// radioBtn.value = timeTableDayType;
// radioBtn.checked = false; 

// radioBtn.style.width = "0%";
// radioBtn.style.height = "0%";
// radioBtn.style.opacity = "0";

// setEventListenerToRadioBtnCallbackArg(radioBtn);

// const labelTextDiv = document.createTextNode(labelText);
// label.appendChild(radioBtn);
// label.appendChild(labelTextDiv);

// return label;