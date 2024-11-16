/**
 * Viewクラス - abstruct ---
 * 必ずwrapViewをオーバーライドしてViewをカスタマイズしてください。
 */
class View {
    constructor(child) {
        if (this.constructor === View) {
            throw new TypeError('このクラスをインスタンス化しないでください。');
        }
        
        let wrapView = this.createWrapView();
        this._checkHTMLElement(wrapView, "createWrapView");

        let styledView = this.styledView(wrapView);
        this._checkHTMLElement(styledViewView, "styledView");

        let embededView = this.embedScriptToView(styledView);
        this._checkHTMLElement(embededView, "embedScriptToView");

        this.view = embededView.appendChild(child);
    }

    _checkHTMLElement(child, msg){
        if(typeof child !== HTMLElement){
            throw new TypeError(msg + "には必ずHTMLElenmentオブジェクトを格納してください。")
        }
    }

    /**
     * 必ずこのwrapViewをオーバーライドしてViewのコンテナを設定してください
     * @returns HTMLElement
     */
    createWrapView(){
        throw new TypeError("createWrapViewメソッドを必ずオーバーライドして、HTMLElement型を返り値に設定してください。");
    }
    
    /**
     * @param {HTMLElenment} element
     * 
     * ここで引数にスタイルを設定してください
     */
    styledView(element) {
        return element;
    }

    /**
     * @param {HTMLElenment} element
     * 
     * ここでスクリプトを埋め込んでください
     */
    embedScriptToView(element) {
        return element;
    }
 }
