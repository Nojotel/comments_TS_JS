var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _InputDOM_DOM;
export class InputDOM {
    constructor(userName, foto = "") {
        _InputDOM_DOM.set(this, document.createElement("DIV"));
        this.userName = "";
        this.foto = "https://placekitten.com/250/250";
        this.userName = userName;
        this.foto = foto;
    }
    render(parent, firstCommentDom = null) {
        let id = '';
        if (firstCommentDom != null)
            id = firstCommentDom.id.replace('fc', '');
        __classPrivateFieldSet(this, _InputDOM_DOM, document.createElement("DIV"), "f");
        __classPrivateFieldGet(this, _InputDOM_DOM, "f").classList.add('input');
        __classPrivateFieldGet(this, _InputDOM_DOM, "f").id = 'input' + id;
        let innerHTMLDOM = `<img class="mob foto" src="${this.foto}" alt="foto_user1">
        
        <div class="input_sub">
            <div class="input_group_header">
                <img class="web foto" src="${this.foto}" alt="foto_user1">                
                <label class="font_name" for="msg">${this.userName}</label>
                <span class="mob left_orient font_small_italic">Макс. 1000 символов</span>                
            </div>
    
            <form action="form" class="mob form">
                <input class="inp font_btn" type="text" maxlength="1000" minlength="10" aria-multiline="true"
                    placeholder="Введите текст сообщения..." id="msg" name="msg">
                <button class="btn font_btn" type="button" data-action="addComment" data-iddom="${id}">Отправить</button>
            </form>
    
    
            <span class="web left_orient font_small_italic">Макс. 1000 символов</span>
    
            <form action="form" class="web form">
                <input class="web inp font_btn" type="text" maxlength="1000" minlength="10" aria-multiline="true"
                    placeholder="Введите текст сообщения..." id="msg" name="msg">    
                <button  class="web btn font_btn" type="button" data-action="addComment" data-iddom="${id}">Отправить</button>
            </form>
        </div>`;
        __classPrivateFieldGet(this, _InputDOM_DOM, "f").innerHTML = innerHTMLDOM;
        if (firstCommentDom != null)
            firstCommentDom.after(__classPrivateFieldGet(this, _InputDOM_DOM, "f"));
        else {
            if (!parent)
                return;
            parent.appendChild(__classPrivateFieldGet(this, _InputDOM_DOM, "f"));
        }
        ;
    }
}
_InputDOM_DOM = new WeakMap();
