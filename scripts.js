(function() {
    const tableButton = document.getElementByClassName(".show-bus-table");

    tableButton.addEventListener("click", function () {
        //ここがエントリポイントとして作成    

        let controller = new TimeLineController();
        controller.show();

        console.log("sas")
    })
})
