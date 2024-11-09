const TimeTableDayType = {
    WEEKDAY : "weekday",
    SATURDAY : "saturday",
    HOLIDAY : "holiday",
}

const TIME_TABLES_CONTAINER = ".time-tables-container";

class TimeTableGenerator{
    constructor(
        timeTableInfoArg
    ){
        this._weekdayTimetableArray = timeTableInfoArg.weekdayTimeTableArray;
        this._saturdayTimetableArray = timeTableInfoArg.saturdayTimeTableArray;
        this._holidayTimetableArray = timeTableInfoArg.holidayTimeTableArray;

        this._busType = timeTableInfoArg.busType;
        this._busRoot = timeTableInfoArg.busRoot;
    }

    generateBusTableDiv() {
        const busInfoGroupCreater = new BusInfoGroupCreater(this._busType, this._busRoot);
        const timeTableCreater = new TimeTableCreater(
            this._weekdayTimetableArray, 
            this._saturdayTimetableArray,
            this._holidayTimetableArray
        );
        const radioBtnCreater = new RadioButtonCreater(timeTableCreater);

        const timetableDiv = this._createTimetableDiv();
    
        const radioBtn = radioBtnCreater.createSwitchingRadioBtn();
        const busInfoGroup = busInfoGroupCreater.createBusInfo();
        const busTable = timeTableCreater.createBusTable(TimeTableDayType.WEEKDAY);
    
        timetableDiv.appendChild(radioBtn);
        timetableDiv.appendChild(busInfoGroup);
        timetableDiv.appendChild(busTable);

        return timetableDiv;
    }
    
    _createTimetableDiv() {
        const timeTableContainerDiv = document.createElement("div");

        timeTableContainerDiv.className = "timeTableDiv";
        timeTableContainerDiv.style.margin = "16px";
        timeTableContainerDiv.style.padding = "8px";
        timeTableContainerDiv.style.borderWidth = "2px";
        timeTableContainerDiv.style.borderRadius = "8px";

        timeTableContainerDiv.style.width = "175px";
        timeTableContainerDiv.style.color = "#000";
    
        return timeTableContainerDiv;
    }
}