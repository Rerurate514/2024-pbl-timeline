class TimeTables{
    constructor(weekdayTimeTable, saturdayTimeTable, holidayTimeTable){
        this.weekdayTimeTable = _formatTimeTable(weekdayTimeTable);
        this.saturdayTimeTable = _formatTimeTable(saturdayTimeTable);
        this.holidayTimeTable = _formatTimeTable(holidayTimeTable);
    }

    _formatTimeTable(timeTable){
        let formatter = new TimeTableFormatter();
        let formattedTimeTable = formatter.format();
        return formattedTimeTable;
    }
}
