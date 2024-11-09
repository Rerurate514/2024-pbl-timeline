class CSVFetcher{
    constructor(){
        this.originAndCsvPath = window.location.origin;
    }

    async fetchTimeTableData(csv_name){
        try {
          const response = await fetch(`${this.originAndCsvPath}/csv/${csv_name}.csv`);
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.text();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
}

class CSVConverter{
    constructor(responsedCSVTextArg){
        this._formattedCSVArray = this._formatCSV(responsedCSVTextArg);
    }

    _formatCSV(responsedCSVTextArg){
        return responsedCSVTextArg.split("\n");
    }

    convertCSVToArray(){
        let convertedCSVArray = [];
        let formattedCSVArray = this._formattedCSVArray;

        for(let i = 0; i < formattedCSVArray.length - 1; ++i){
            convertedCSVArray[i] = formattedCSVArray[i].split(',');
        }

        return convertedCSVArray;
    }
}

//PID zi 系統 行先 時 分 平日
const PID = 0;
const BUS_TYPE = 2;
const BUS_ROOT = 3;
const HOUR_COLUMN = 4;
const MINUTE_COLUMN = 5;
const DAY_TYPE = 6;

class CSVDayDivider{
    constructor(convertedCSVArrayArg){
        this._convertedCSVArray = convertedCSVArrayArg;
    }

    devideForStation(){
        let convertedArray = this._convertedCSVArray;
        let devidedForStationMap = {};

        convertedArray.forEach(element => {
            let stationName = element[BUS_ROOT];
            let dayType = element[DAY_TYPE];

            if(!(stationName in devidedForStationMap)) devidedForStationMap[stationName] = {};

            switch(dayType){
                case "平日\r":
                case "平日"  : {
                    if(!(TimeTableDayType.WEEKDAY in devidedForStationMap[stationName])) devidedForStationMap[stationName][TimeTableDayType.WEEKDAY] = [];
                    devidedForStationMap[stationName][TimeTableDayType.WEEKDAY].push(element);
                    break;
                }

                case "土曜\r":
                case "土曜"  : {
                    if(!(TimeTableDayType.SATURDAY in devidedForStationMap[stationName])) devidedForStationMap[stationName][TimeTableDayType.SATURDAY] = [];
                    devidedForStationMap[stationName][TimeTableDayType.SATURDAY].push(element);
                    break;
                }
                
                case "休日\r":
                case "休日"  : {
                    if(!(TimeTableDayType.HOLIDAY in devidedForStationMap[stationName])) devidedForStationMap[stationName][TimeTableDayType.HOLIDAY] = [];
                    devidedForStationMap[stationName][TimeTableDayType.HOLIDAY].push(element);
                    break;
                }
            }
        });

        return devidedForStationMap;
    }
}

class TimeTableInfoGenerator{
    constructor(devidedForStationMapArg){
        this._devidedForStationMap = devidedForStationMapArg;

        let selectedTimeTableInfo = new SelectedTimeTableInfo();
        selectedTimeTableInfo.setBusStopList(this._devidedForStationMap);
    }

    * generate(){
        let stationMap = this._devidedForStationMap;

        for(let stationName in stationMap){
            let id = stationMap[stationName][TimeTableDayType.WEEKDAY][PID][PID];
            let busType = stationMap[stationName][TimeTableDayType.WEEKDAY][PID][BUS_TYPE];
            let busRoot = stationMap[stationName][TimeTableDayType.WEEKDAY][PID][BUS_ROOT];

            let weekdayTimeArray = this._formatDayArray(
                stationMap[stationName][TimeTableDayType.WEEKDAY]
            );
            let saturdayTimeTableArray = this._formatDayArray(
                stationMap[stationName][TimeTableDayType.SATURDAY]
            );
            let holidayTimeArray = this._formatDayArray(
                stationMap[stationName][TimeTableDayType.HOLIDAY]
            );
    
            let timeTableInfo = new TimeTableInfo(
                id, 
                weekdayTimeArray, 
                saturdayTimeTableArray, 
                holidayTimeArray, 
                busType, 
                busRoot
            );

            yield timeTableInfo;
        }
    }

    _formatDayArray(unformattedDayArrayArg){
        let formattedDayArray = [];

        for(let num in unformattedDayArrayArg){
            let hour = unformattedDayArrayArg[num][HOUR_COLUMN];
            let minute = unformattedDayArrayArg[num][MINUTE_COLUMN];
            
            minute = this._trimNonNumericCharacters(minute);

            if(hour.length == 1) hour = "0" + hour;
            if(minute.length == 1) minute = "0" + minute;
            
            formattedDayArray.push(hour + ":" + minute);
        }

        return formattedDayArray;
    }

    _trimNonNumericCharacters(input) {
        return input.replace(/\D/g, '');
    }
}