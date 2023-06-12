export class FirstComment {    
    _msg:string = "";
    _userName:string = "";
    _foto:string = "https://placekitten.com/250/250";
    _rating:number = 0;
    _favorite:boolean = false;
    _time:string = "";    
    _id:string|number = 0;    

    constructor(userName:string, 
        msg:string, 
        foto:string = "", 
        rating:number = 0, 
        favorite:boolean = false, 
        time:string = "", 
        id:string|number="" ) {
        
        this._msg = msg;
        this._userName = userName;
        this._foto = foto;
        this._rating = rating;
        this._favorite = favorite;
        this._id = (id == "") ? +new Date() : id;
        this._time = (time == "") ? new Date(this._id).toLocaleDateString() +' '+new Date(this._id).toLocaleTimeString() : time;        
    }

    getJson() {
        let json = {
            userName: this._userName,
            msg: this._msg,
            foto: this._foto,
            rating: this._rating,
            favorite: this._favorite,
            time: this._time,
            id: this._id
        };
        return json;
    }
    plus() {
        this._rating += 1;
    }
    minus() {
        if (this._rating>-10)
        this._rating -= 1;
    }
    favorites():void {
        this._favorite = !this._favorite;

    }

    render(parent:HTMLElement|undefined, replase:boolean = false):HTMLElement|void {
        let firstCommentDom = document.createElement("DIV");
        firstCommentDom.classList.add('first_comment');
        firstCommentDom.id = 'fc'+this._id;
        let innerHTMLDOM =
        `
            <img class="mob foto" src="${this._foto}" alt="${this._foto}">
            
            <div id="first_comment_sub" class="first_comment_sub">
                <div class="first_comment_header">
                    <img class="web foto" src="${this._foto}" alt="${this._foto}">
    
                    <div class="first_comment-group">
                        <div class="first_comment_group_header">
                            <label class="font_name" for="msg">${this._userName}</label>
                            <span class="font_small_italic">${this._time}</label>
                        </div>
                    </div>
                </div>
    
                <p class="first_comment_txt font_msg">${this._msg}</p>
    
                <div class="first_comment_futter">
                    <div class="back" data-action="answer" data-iddom="${this._id}">
                        <img class="icon" src="./images/back.svg" alt="back.svg" data-action="answer" data-iddom="${this._id}">
                        <p class="back_answer font_btn" data-action="answer" data-iddom="${this._id}">Ответить</p>
                    </div> 
    
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
              
            </div>`;
           
        firstCommentDom.innerHTML = innerHTMLDOM;
        if (replase) {  
            let firstCommentDomReplase =  document.getElementById('fc'+this._id);
            if (!firstCommentDomReplase) return;    
            let parent = firstCommentDomReplase.parentElement;                      
            if (!parent) return;
            parent.insertBefore(firstCommentDom,firstCommentDomReplase);
            parent.removeChild(firstCommentDomReplase);        
        }
        if (!parent) return;
        else  parent.appendChild(firstCommentDom);
        
        return firstCommentDom;
    }        
    remove(){
        let firstCommentDomReplase =  document.getElementById('fc'+this._id);
        if (!firstCommentDomReplase) return;
              
        let parent = firstCommentDomReplase.parentElement;    
        if (!parent) return;
        parent.removeChild(firstCommentDomReplase);           
    }
}
