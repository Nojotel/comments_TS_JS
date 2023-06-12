export class NavigatorDOM {

    #DOM:HTMLElement|null = null;
    #numberComments:number = 0;
    #curentSort:string = "";
    #blockNavigation:string= "";
    #blocSortDropDown:string = "";
    #onlyFavorites:boolean = false;
  
    constructor() {}
   
    getJson(){
        let json = {
            numberComments: this.#numberComments,
            onlyFavorites: this.#onlyFavorites,
            curentSort: this.#curentSort            
        };
        return json;
    }

    #createDom() {
        this.#blocSortDropDown = ` 
    <div class="menu_item_sort_list">
        <button class="menu_item_btn" data-action="sortData">
           ${this.#curentSort == 'По дате' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortData">' : '&nbsp  &nbsp'}
            <span class="dropdown_tem font_menu_small" data-action="sortData" >По дате</span>
        </button>
        <button class="menu_item_btn" data-action="sortEsteeme">
            ${this.#curentSort == 'По количеству оценок' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortEsteeme">' : '&nbsp  &nbsp'} 
            <span class="dropdown_tem font_menu_small" data-action="sortEsteeme">По количеству оценок</span>
        </button>
        <button class="menu_item_btn" data-action="sortActual">
            ${this.#curentSort == 'По актуальности' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortActual">' : '&nbsp  &nbsp'}             
            <span class="dropdown_tem font_menu_small" data-action="sortActual">По актуальности</span>
        </button>
        <button class="menu_item_btn" data-action="sortNumberAnsver">
            ${this.#curentSort == 'По количеству ответов' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortNumberAnsver" >' : '&nbsp  &nbsp'}                         
            <span class="dropdown_tem font_menu_small" data-action="sortNumberAnsver" >По количеству ответов</span>
        </button>
    </div>`;

        this.#blockNavigation = `
    <button id ="numberComments" class="menu_item_btn menu_item_comments">
        <span class="font_menu_big_active">Комментарии &nbsp</span>
        <span class="font_menu_big">${this.#numberComments}&nbsp </span>
    </button>
    <!-- здесь надо обьединить две кнопки фильтра -->    
    <div class="comment">
        <div class="menu_item_sort">
            <button class="menu_item_btn" data-action="clickSort">
                <span class="font_menu_small" data-action="clickSort">${this.#curentSort} &nbsp</span>
                <img class="icon triangle" src="./images/triangle.svg" alt="triangle.svg" data-action="clickSort">
            </button>                 
        </div>
        ${this.#blocSortDropDown}
        <button class="menu_item_btn menu_item_favorites" data-action="clicFavorites">
            <span class=" font_menu_small" data-action="clicFavorites">Избранное &nbsp</span>
            <img class="icon circle-hard" src="./images/circle-hard-white.svg" alt="circle-hard.svg" data-action="clicFavorites">
        </button>
    </div>`;
    }
    init(){        
        this.#curentSort = 'По дате';
        try { this.#numberComments = Number(localStorage.getItem('firstComments_length'))}
        catch (e) { this.#numberComments = 0; }
        this.#createDom();
    }

    render() {
        this.#DOM = document.querySelector(".comments_stion");
        if (this.#DOM) this.#DOM.innerHTML = this.#blockNavigation;
    }
    
    clickSort():void {
        let dropDownList:HTMLElement|null = document.querySelector(".menu_item_sort_list");
        if (!dropDownList) return
        if (dropDownList.style.display == 'flex') dropDownList.style.display = 'none';
        else dropDownList.style.display = 'flex';

        let triangle:HTMLElement|null = document.querySelector(".triangle");
        if (!triangle) return
        if (triangle.style.transform == 'rotate(180deg)') triangle.style.transform = 'none';
        else triangle.style.transform = 'rotate(180deg)';
    }

    increaseNumberComments() {
        this.#numberComments += 1;        
        const numberCommentsDOM = document.getElementById('numberComments');
        
        let innerHTML = 
        `<span class="font_menu_big_active">Комментарии &nbsp</span>
        <span class="font_menu_big">${this.#numberComments}&nbsp </span>`;
         if (numberCommentsDOM) {        
            numberCommentsDOM.innerHTML = innerHTML;
         }
    };
    
    setSort(action:string) {
        this.#curentSort = action;
        this.#createDom();
        this.render();
    }
    
    clicFavorites():void {             
        let imgDom:HTMLImageElement|null = document.querySelector(".circle-hard");
        if (!imgDom) return
        this.#onlyFavorites = !this.#onlyFavorites;
        imgDom.src=(this.#onlyFavorites) ? "./images/circle-hard.svg" : "./images/circle-hard-white.svg";         
    
    }
}
