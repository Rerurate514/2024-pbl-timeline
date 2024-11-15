/**
 * Viewクラス - abstruct ---
 * 必ずwrapViewをオーバーライドしてViewをカスタマイズしてください。
 */
class View {
    constructor(child) {
        if (this.constructor === View) {
            throw new TypeError('このクラスをインスタンス化しないでください。これは抽象クラスです。');
        }

        this.view = this.wrapView(child)
    }

    checkViewComponents(child){
        if(typeof child !== View){
            throw new Error("childプロパティには必ずViewオブジェクトを格納してください。")
        }
    }

    /**
     * 必ずこのwrapViewをオーバーライドしてViewをカスタマイズしてください。
     * 
     * @param {View} child
     * @returns View
     */
    wrapView(child){ }
}
