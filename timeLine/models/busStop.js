class BusStop{
    constructor(id, name, timeTables, busRoot){
        if(typeof timeTables !== TimeTables){
            throw new Error("BusStopクラスのtimetablesプロパティにはTimeTablesクラスのみ受け付けています。 渡された型：", typeof timeTables)
        }

        this.id = id;
        this.name = name;
        this.timeTables = timeTables;
        this.busRoot = busRoot;
    }
}
