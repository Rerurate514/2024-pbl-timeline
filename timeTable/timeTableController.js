class TimeTableController{
    constructor() {
        this.checkbox;
    }
    async show(csvNameArg){
        let fetcher= new CSVFetcher();
        let resText = await fetcher.fetchTimeTableData(csvNameArg);
        
        let selectedTimeTableInfo = new SelectedTimeTableInfo();
        selectedTimeTableInfo.setCSVName(csvNameArg);
    
        let converter = new CSVConverter(resText);
        let convertedArray = converter.convertCSVToArray();

        let devider = new CSVDayDivider(convertedArray);
        let devidedMap = devider.devideForStation();

        let infoGenerator = new TimeTableInfoGenerator(devidedMap);

        overlayPopup.resizePopup(95,95);
        overlayPopup.insertDOM(await this._createTimetablesContainer(infoGenerator)); 
        overlayPopup.insertDOM_prepend(this.mylistSpace);
    }
    
    async _createTimetablesContainer(infoGeneratorArg){

        let tablesContainer = document.createElement("div");

        tablesContainer.className = "tables-container";
        tablesContainer.style.display = "flex";
        tablesContainer.style.width = "10000px";
        this._addMyListCheckBox();

        for(let timeTableInfoArg of await infoGeneratorArg.generate()) {
            let timeTableGenerator = new TimeTableGenerator(timeTableInfoArg);

            let timeTableDiv = timeTableGenerator.generateBusTableDiv();
            
            tablesContainer.appendChild(timeTableDiv);
        }

        return tablesContainer;
        //return tablesContainer.outerHTML;
    }

    initializeMyListCheckBox(dataPass,dataname){
        dataPass = encodeURIComponent(dataPass);//エンコード
        dataname = encodeURIComponent(dataname);//エンコード
        this.checkbox = document.createElement("input");
        this.checkbox.setAttribute("type", "checkbox");
        this.checkbox.setAttribute("id", "mylistCheckbox");
        this.checkbox.setAttribute("name", "scales");
        this.checkbox.style.marginLeft="16px";
        var arr = getCookieArray();
        this.checkbox.addEventListener("click", function () {
            if (this.checked) {
                let expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 365);
                document.cookie = `basuID(${dataPass})=${dataPass}; expires=${expirationDate.toUTCString()}`;
                document.cookie = `stop_nameID(${dataPass})=${dataname}; expires=${expirationDate.toUTCString()}`;
            } else {
                document.cookie = `basuID(${dataPass})=; max-age=0`;
                document.cookie = `stop_nameID(${dataPass})=; max-age=0`;
            }
            var currentPageURL = window.location.href;
            // 参照元が".html"で終わるかどうかを判定
            if (currentPageURL.endsWith("mylist.html")) {
                document.getElementById("mylists").innerHTML="";//mylists表示内容初期化
                createMyLists();
            }
        });

        for (let key in arr) {
            if (key.includes('basuID') && arr[key] == dataPass) {
                this.checkbox.setAttribute("checked","true");
            }
        }

        this.label = document.createElement("label");
        this.label.setAttribute("for", "mylistCheckbox");
        this.label.setAttribute("id", "mylistCheckbox-label");
        this.label.textContent = "マイリストに登録する";
    }
    _addMyListCheckBox(){
        this.label.prepend(this.checkbox);
        this.mylistSpace = document.createElement("div");
        this.mylistSpace.className = "mylistSpace";
        this.mylistSpace.appendChild(this.label);
    }
}
class SelectedTimeTableInfo{
    constructor(){
        if(!SelectedTimeTableInfo.instance){
            SelectedTimeTableInfo.instance = this;
        }

        return SelectedTimeTableInfo.instance;
    }

    setCSVName(csvNameArg){
        this.csvName = csvNameArg;
    }

    setBusStopList(busStopListArg){
        this.busStopList = busStopListArg;
    }
}
class SelectedTimeTableInfo{
    constructor(){
        if(!SelectedTimeTableInfo.instance){
            SelectedTimeTableInfo.instance = this;
        }

        return SelectedTimeTableInfo.instance;
    }

    setCSVName(csvNameArg){
        this.csvName = csvNameArg;
    }

    setbusNameList(busNameArg){
        this.busName = busNameArg;
    }
}

class TimeTableInfo{
    constructor(
        idArg,
        weekdayTimeTableArrayArg,
        saturdayTimeTableArrayArg,
        holidayTimeTableArrayArg,
        busTypeArg,
        busRootArg
    ){
        this.id = idArg;
        this.weekdayTimeTableArray = weekdayTimeTableArrayArg;
        this.saturdayTimeTableArray = saturdayTimeTableArrayArg;
        this.holidayTimeTableArray = holidayTimeTableArrayArg;
        this.busType = busTypeArg;
        this.busRoot = busRootArg;
    }
}