import { FirstComment } from "../components/FirstComment.js";
export class SecondComment extends FirstComment {

    #firstCommentid:string|number = "";
    #firstCommentUserName:string = "";

    constructor(
        firstCommentid:string|number, 
        firstCommentUserName:string, 
        userName:string, 
        msg:string, 
        foto:string = "", 
        rating:number = 0, 
        favorite:boolean = false, 
        time:string = "", 
        id:string|number = "") {

        let id1:string|number = (id == "") ? +new Date() : id;
        let time1:string = (time == "") ? new Date(id1).toLocaleDateString() + ' ' + new Date(id1).toLocaleTimeString() : time;

        super(userName, msg, foto, rating, favorite, time1, id1);

        this.#firstCommentid = firstCommentid;
        this.#firstCommentUserName = firstCommentUserName;
    }

    getJson() {
        let json = {
            userName: this._userName,
            msg: this._msg,
            foto: this._foto,
            rating: this._rating,
            favorite: this._favorite,
            time: this._time,
            id: this._id,
            firstCommentid: this.#firstCommentid,
            firstCommentUserName: this.#firstCommentUserName
        };
        return json;
    }

    plus() {super.plus(); }
    minus() {super.minus();}
    favorites(): void {super.favorites();}

    render(previousCommentDom:HTMLElement|undefined = undefined, replase:boolean = false): HTMLElement|void{

        let secondCommentDom = document.createElement("DIV");
        secondCommentDom.classList.add('second_comment');
        secondCommentDom.id = 'sc' + this._id;

        let innerHTMLDOM =

        `<img class=" mob foto" src="${this._foto}" alt="${this._foto}">
        <div class="second_comment_sub">
            <div class="second_comment_header">
                <img class="web foto" src="${this._foto}" alt="${this._foto}">

                <div class="sesecond_comment_group">

                    <div class="second_comment_group_header">
                        <div class="font_name">${this._userName}</div>
                        <img class="mob icon" src="./images/back.svg" alt="back.svg">
                        <p class="mob back_answer font_btn">${this.#firstCommentUserName}</p>
                        <span class="font_small_italic">${this._time}</span>
                    </div>

                    <div class="web back">
                        <img class="web icon" src="./images/back.svg" alt="back.svg">
                        <p class="web back_answer font_btn">${this.#firstCommentUserName}</p>
                    </div>

                </div>
            </div>

            <p class="second_comment_txt font_msg">${this._msg}</p>

            <div class="second_comment_futter">
                
                <div  class="favorites" data-action="favorites" data-iddom="${this._id}">
                    <img class="icon" src="${this._favorite ? "./images/gray_hard.svg" : "./images/white_hard.svg"}" alt="hard.svg" data-action="favorites" data-iddom="${this._id}">
                    <p class="favorites_in font_btn" data-action="favorites" data-iddom="${this._id}">${this._favorite ? "В избранном" : "В избранноe"}</p>
                </div>
            
                <div class="plus_minus">
                    <img  class="icon" src="./images/minus.svg" alt="minus.svg" data-action="minus" data-iddom="${this._id}">
                    <p class="plus_minus_count font_btn">${this._rating}</p>
                    <img  class="icon" src="./images/plus.svg" alt="plus.svg" data-action="plus" data-iddom="${this._id}">
                </div>
                
            </div>
        </div>`
        secondCommentDom.innerHTML = innerHTMLDOM;

        if (replase) {
            let secondCommentReplaseDom:HTMLElement | null = document.getElementById('sc' + this._id);
            if (!secondCommentReplaseDom) return
            let parent = secondCommentReplaseDom.parentElement;
            if (!parent) return
            parent.insertBefore(secondCommentDom, secondCommentReplaseDom);
            parent.removeChild(secondCommentReplaseDom);
        }
        else

            if (previousCommentDom) previousCommentDom.after(secondCommentDom);
    }
    remove() {
        let secondCommentReplaseDom = document.getElementById('sc' + this._id);
        if (!secondCommentReplaseDom) return;
        let parent = secondCommentReplaseDom.parentElement;
        if (!parent) return  
        parent.removeChild(secondCommentReplaseDom);
    }
}