class TimeTablesWindow extends View {
    constructor(child){
        this.checkViewComponents(child);
        super(child.view);
    }

    wrapView(child){
        let tablesWindow = document.createElement("div");
        tablesWindow.className = "tables-window"
    }
}
