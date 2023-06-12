export class InputDOM {
    #DOM = document.createElement("DIV");
    userName = ""
    foto = "https://placekitten.com/250/250";

    constructor(userName:string, foto:string = "") {
        this.userName = userName;
        this.foto = foto;
    }

    render(parent:HTMLElement | null, firstCommentDom:HTMLElement | null = null) {

        let id = '';
        if (firstCommentDom != null)
            id = firstCommentDom.id.replace('fc', '');


        this.#DOM = document.createElement("DIV");
        this.#DOM.classList.add('input');
        this.#DOM.id = 'input' + id;


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

        this.#DOM.innerHTML = innerHTMLDOM;

        if (firstCommentDom != null)
            firstCommentDom.after(this.#DOM);
        else {
            if (!parent) return;
            parent.appendChild(this.#DOM)
        };

    }

}
