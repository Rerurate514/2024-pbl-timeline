class TimeLineController{
    show(){
        let assembler = new ViewAssembler();
        let timeline = assembler.assembleView();

        let container = document.getElementById("timeline-Container");
        container.appendChild(timeline);
    }
}
