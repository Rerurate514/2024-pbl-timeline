class BusInfoGroupCreater {
    constructor(busTypeArg, busRootArg) {
        this._busType = busTypeArg;
        this._busRoot = busRootArg;
    }

    createBusInfo() {
        const busInfoGroup = document.createElement("div");
        busInfoGroup.className = "busInfoGroup"

        //busInfoGroup.appendChild(this._createBusType());
        busInfoGroup.appendChild(this._createBusRoot());

        busInfoGroup.style.height = "86px";
        busInfoGroup.style.display = "flex";
        busInfoGroup.style.justifyContent = "center";
        busInfoGroup.style.alignItems = "center";
        return busInfoGroup;
    }

    _createBusType() {
        const busTypeText = document.createElement("div");
        const title = document.createElement("h5");

        busTypeText.className = "busType";

        title.textContent = this._busType; //csvから取得した系統をここに
        busTypeText.appendChild(title);

        return busTypeText;
    }

    _createBusRoot() {
        const busRootText = document.createElement("div");
        const title = document.createElement("h4");

        busRootText.className = "busRoot";

        title.textContent = this._busRoot; //csvから取得した行先をここに
        busRootText.appendChild(title);

        return busRootText;
    }
}