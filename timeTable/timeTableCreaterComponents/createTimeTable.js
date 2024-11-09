class TimeTableCreater{
    constructor(
        weekdayTimeTableArrayArg,
        saturdayTimeTableArrayArg,
        holidayTimeTableArrayArg,
    ){
        this._weekdayTimetableArray = weekdayTimeTableArrayArg;
        this._saturdayTimetableArray = saturdayTimeTableArrayArg;
        this._holidayTimetableArray = holidayTimeTableArrayArg;
    }

    //todo
    createBusTable(modeArg) {
        const timeTableContainer = document.createElement("div");
        timeTableContainer.className = "timeTableContainer";

        timeTableContainer.style.display = "flex";
        timeTableContainer.style.justifyContent = "center";
        timeTableContainer.style.alignItems = "center";
    
        switch (modeArg) {
            case TimeTableDayType.WEEKDAY: {
                const timeTable = this._createWeekTimeTable(this._weekdayTimetableArray);
                timeTableContainer.appendChild(timeTable);
                break;
            }
            case TimeTableDayType.SATURDAY: {
                const timeTable = this._createWeekTimeTable(this._saturdayTimetableArray);
                timeTableContainer.appendChild(timeTable);
                break;
            }
            case TimeTableDayType.HOLIDAY: {
                const timeTable = this._createWeekTimeTable(this._holidayTimetableArray);
                timeTableContainer.appendChild(timeTable);
                break;
            }
            default: {
                throw new Error("Failed to catch timetable type of bus in [craeteBusTable] method. Invalid Value.")
            }
        }
    
        return timeTableContainer;
    }
    
    _createWeekTimeTable(timeTableArrArg) {
        let timeTable = document.createElement("div");
        timeTable.className = "timeTable"
        timeTable.style.textAlign = "center";
        timeTable.style.justifyContent = "center";

        const fixedWeekdayTimeArray = this._divideTimeStrArray(timeTableArrArg);
    
        fixedWeekdayTimeArray.forEach((hourGroupArrArg) => {
            let hourGroupContainer = this._createhourGroupContainer();
    
            let timeHour = hourGroupArrArg[0].substring(0, 2);
            let hourDiv = this._createHourDiv(timeHour);
            let minutesDivContainer = document.createElement("div");
            let border = this._createBorder();

            hourGroupContainer.style.display = "flex";

            hourDiv.className = "hourContainer";
            minutesDivContainer.className = "minutesGroupContainer";
    
            hourGroupArrArg.forEach((minutesArrayArg) => {
                let timeMinutes = minutesArrayArg.substring(3, 5);
                let minutesDiv = this._createMinDiv(timeMinutes);
                minutesDivContainer.appendChild(minutesDiv);
            });
    
            hourGroupContainer.appendChild(hourDiv);
            hourGroupContainer.appendChild(border);
            hourGroupContainer.appendChild(minutesDivContainer);
    
            timeTable.appendChild(hourGroupContainer);
        });
    
        return timeTable;
    }

    _createhourGroupContainer(){
        let hourGroupContainer = document.createElement("div");

        hourGroupContainer.className = "hourGroupContainer";
        hourGroupContainer.style.marginTop = "4px";

        return hourGroupContainer;
    }
    
    _createHourDiv(hourStrArg) {
        let hourDiv = document.createElement("div");

        hourDiv.textContent = hourStrArg;

        return hourDiv;
    }
    
    _createBorder() {
        let border = document.createElement("div");
        border.className = "hAndMBorder";
        border.className = "shine";

        border.style.width = "3px";
        border.style.marginLeft = "3px";
        border.style.marginRight = "3px";
        border.style.marginTop= "1px";
        border.style.marginBottom = "1px";
        border.style.backgroundColor = "#000000";

        return border;
    }
    
    _createMinDiv(minutesStrArg) {
        let minutesDiv = document.createElement("div");

        minutesDiv.textContent = minutesStrArg;

        return minutesDiv;
    }
    
    _divideTimeStrArray(timeStrArrayInputArg) {
        let dividedTimeArrays = [];
        let currentIndex = 0;
    
        while (currentIndex < timeStrArrayInputArg.length) {
            let sameHourTimeArray = [];
            sameHourTimeArray.push(timeStrArrayInputArg[currentIndex]);
    
            let currentHourValue = parseInt(timeStrArrayInputArg[currentIndex].substring(0, 2));
    
            for (let nextIndex = currentIndex + 1; nextIndex < timeStrArrayInputArg.length; nextIndex++) {
                let nextHourValue = parseInt(timeStrArrayInputArg[nextIndex].substring(0, 2));
                if (currentHourValue !== nextHourValue) break;
                sameHourTimeArray.push(timeStrArrayInputArg[nextIndex]);
                currentIndex = nextIndex;
            }
    
            dividedTimeArrays.push(sameHourTimeArray);
            currentIndex++;
        }
    
        return dividedTimeArrays;
    }
}