class TimeTablesWindow extends View {
    constructor(child){
        super(child.view);
    }

    wrapView(){
        let tablesWindow = document.createElement("div");
        return tablesWindow;
    }

    styledView(element){
        element.className = "tables-window"

        return element;
    }
}
