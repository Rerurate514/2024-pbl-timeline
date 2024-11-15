/**
 * Viewクラス - abstruct ---
 * 必ずwrapViewをオーバーライドしてViewをカスタマイズしてください。
 */
class View {
    constructor(child) {
        if (this.constructor === View) {
            throw new TypeError('このクラスをインスタンス化しないでください。これは抽象クラスです。');
        }
        
        let wrapView = this.wrapView();

        if (wrapView !== View) {
            throw new Error('wrapViewメソッドでは必ずViewクラスを戻り値として設定してください');
        }

        this.view = wrapView.appendChild(child);
    }

    checkViewComponents(child){
        if(typeof child !== View){
            throw new Error("childプロパティには必ずViewオブジェクトを格納してください。")
        }
    }

    /**
     * 必ずこのwrapViewをオーバーライドしてViewをカスタマイズしてください。
     * @returns View
     */
    wrapView(){ }
}
