var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _NavigatorDOM_instances, _NavigatorDOM_DOM, _NavigatorDOM_numberComments, _NavigatorDOM_curentSort, _NavigatorDOM_blockNavigation, _NavigatorDOM_blocSortDropDown, _NavigatorDOM_onlyFavorites, _NavigatorDOM_createDom;
export class NavigatorDOM {
    constructor() {
        _NavigatorDOM_instances.add(this);
        _NavigatorDOM_DOM.set(this, null);
        _NavigatorDOM_numberComments.set(this, 0);
        _NavigatorDOM_curentSort.set(this, "");
        _NavigatorDOM_blockNavigation.set(this, "");
        _NavigatorDOM_blocSortDropDown.set(this, "");
        _NavigatorDOM_onlyFavorites.set(this, false);
    }
    getJson() {
        let json = {
            numberComments: __classPrivateFieldGet(this, _NavigatorDOM_numberComments, "f"),
            onlyFavorites: __classPrivateFieldGet(this, _NavigatorDOM_onlyFavorites, "f"),
            curentSort: __classPrivateFieldGet(this, _NavigatorDOM_curentSort, "f")
        };
        return json;
    }
    init() {
        __classPrivateFieldSet(this, _NavigatorDOM_curentSort, 'По дате', "f");
        try {
            __classPrivateFieldSet(this, _NavigatorDOM_numberComments, Number(localStorage.getItem('firstComments_length')), "f");
        }
        catch (e) {
            __classPrivateFieldSet(this, _NavigatorDOM_numberComments, 0, "f");
        }
        __classPrivateFieldGet(this, _NavigatorDOM_instances, "m", _NavigatorDOM_createDom).call(this);
    }
    render() {
        __classPrivateFieldSet(this, _NavigatorDOM_DOM, document.querySelector(".comments_navigation"), "f");
        if (__classPrivateFieldGet(this, _NavigatorDOM_DOM, "f"))
            __classPrivateFieldGet(this, _NavigatorDOM_DOM, "f").innerHTML = __classPrivateFieldGet(this, _NavigatorDOM_blockNavigation, "f");
    }
    clickSort() {
        let dropDownList = document.querySelector(".menu_item_sort_list");
        if (!dropDownList)
            return;
        if (dropDownList.style.display == 'flex')
            dropDownList.style.display = 'none';
        else
            dropDownList.style.display = 'flex';
        let triangle = document.querySelector(".triangle");
        if (!triangle)
            return;
        if (triangle.style.transform == 'rotate(180deg)')
            triangle.style.transform = 'none';
        else
            triangle.style.transform = 'rotate(180deg)';
    }
    increaseNumberComments() {
        __classPrivateFieldSet(this, _NavigatorDOM_numberComments, __classPrivateFieldGet(this, _NavigatorDOM_numberComments, "f") + 1, "f");
        const numberCommentsDOM = document.getElementById('numberComments');
        let innerHTML = `<span class="font_menu_big_active">Комментарии &nbsp</span>
        <span class="font_menu_big">${__classPrivateFieldGet(this, _NavigatorDOM_numberComments, "f")}&nbsp </span>`;
        if (numberCommentsDOM) {
            numberCommentsDOM.innerHTML = innerHTML;
        }
    }
    ;
    setSort(action) {
        __classPrivateFieldSet(this, _NavigatorDOM_curentSort, action, "f");
        __classPrivateFieldGet(this, _NavigatorDOM_instances, "m", _NavigatorDOM_createDom).call(this);
        this.render();
    }
    clicFavorites() {
        let imgDom = document.querySelector(".circle-hard");
        if (!imgDom)
            return;
        __classPrivateFieldSet(this, _NavigatorDOM_onlyFavorites, !__classPrivateFieldGet(this, _NavigatorDOM_onlyFavorites, "f"), "f");
        imgDom.src = (__classPrivateFieldGet(this, _NavigatorDOM_onlyFavorites, "f")) ? "./images/circle-hard.svg" : "./images/circle-hard-white.svg";
    }
}
_NavigatorDOM_DOM = new WeakMap(), _NavigatorDOM_numberComments = new WeakMap(), _NavigatorDOM_curentSort = new WeakMap(), _NavigatorDOM_blockNavigation = new WeakMap(), _NavigatorDOM_blocSortDropDown = new WeakMap(), _NavigatorDOM_onlyFavorites = new WeakMap(), _NavigatorDOM_instances = new WeakSet(), _NavigatorDOM_createDom = function _NavigatorDOM_createDom() {
    __classPrivateFieldSet(this, _NavigatorDOM_blocSortDropDown, ` 
    <div class="menu_item_sort_list">
        <button class="menu_item_btn" data-action="sortData">
           ${__classPrivateFieldGet(this, _NavigatorDOM_curentSort, "f") == 'По дате' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortData">' : '&nbsp  &nbsp'}
            <span class="dropdown_tem font_menu_small" data-action="sortData" >По дате</span>
        </button>
        <button class="menu_item_btn" data-action="sortEsteeme">
            ${__classPrivateFieldGet(this, _NavigatorDOM_curentSort, "f") == 'По количеству оценок' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortEsteeme">' : '&nbsp  &nbsp'} 
            <span class="dropdown_tem font_menu_small" data-action="sortEsteeme">По количеству оценок</span>
        </button>
        <button class="menu_item_btn" data-action="sortActual">
            ${__classPrivateFieldGet(this, _NavigatorDOM_curentSort, "f") == 'По актуальности' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortActual">' : '&nbsp  &nbsp'}             
            <span class="dropdown_tem font_menu_small" data-action="sortActual">По актуальности</span>
        </button>
        <button class="menu_item_btn" data-action="sortNumberAnsver">
            ${__classPrivateFieldGet(this, _NavigatorDOM_curentSort, "f") == 'По количеству ответов' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortNumberAnsver" >' : '&nbsp  &nbsp'}                         
            <span class="dropdown_tem font_menu_small" data-action="sortNumberAnsver" >По количеству ответов</span>
        </button>
    </div>`, "f");
    __classPrivateFieldSet(this, _NavigatorDOM_blockNavigation, `
    <button id ="numberComments" class="menu_item_btn menu_item_comments">
        <span class="font_menu_big_active">Комментарии &nbsp</span>
        <span class="font_menu_big">${__classPrivateFieldGet(this, _NavigatorDOM_numberComments, "f")}&nbsp </span>
    </button>
    <!-- здесь надо обьединить две кнопки фильтра -->    
    <div class="comment">
        <div class="menu_item_sort">
            <button class="menu_item_btn" data-action="clickSort">
                <span class="font_menu_small" data-action="clickSort">${__classPrivateFieldGet(this, _NavigatorDOM_curentSort, "f")} &nbsp</span>
                <img class="icon triangle" src="./images/triangle.svg" alt="triangle.svg" data-action="clickSort">
            </button>                 
        </div>
        ${__classPrivateFieldGet(this, _NavigatorDOM_blocSortDropDown, "f")}
        <button class="menu_item_btn menu_item_favorites" data-action="clicFavorites">
            <span class=" font_menu_small" data-action="clicFavorites">Избранное &nbsp</span>
            <img class="icon circle-hard" src="./images/circle-hard-white.svg" alt="circle-hard.svg" data-action="clicFavorites">
        </button>
    </div>`, "f");
};
