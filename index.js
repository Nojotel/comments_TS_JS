import { FirstComment } from "./components/FirstComment.js";
import { SecondComment } from "./components/SecondComment.js";
import { NavigatorDOM } from "./components/NavigatorDOM.js";
import { InputDOM } from "./components/InputDOM.js";
import { myName, myFoto } from "./components/User.js";
let firstComments = [];
let secondComments = [];
export const parent = document.getElementById('parent');
const navigator = new NavigatorDOM();
const input = new InputDOM(myName, myFoto);
function initBlock() {
    navigator.init();
    navigator.render();
    input.render(parent);
    let firstCommentsLength = localStorage.getItem('firstComments_length');
    firstCommentsLength = (firstCommentsLength == null) ? 0 : Number(firstCommentsLength);
    for (let indF = 0; indF < firstCommentsLength; indF++) {
        let coment_ = localStorage.getItem("firstComment" + indF);
        if (coment_ == null)
            continue;
        let jsonF = JSON.parse(coment_);
        let firstComment = new FirstComment(jsonF.userName, jsonF.msg, jsonF.foto, jsonF.rating, jsonF.favorite, jsonF.time, jsonF.id);
        firstComments.push(firstComment);
    }
    let secondCommentsLength = localStorage.getItem('secondComments_length');
    secondCommentsLength = (secondCommentsLength == null) ? 0 : Number(secondCommentsLength);
    for (let indS = 0; indS < secondCommentsLength; indS++) {
        let coment__ = localStorage.getItem("secondComment" + indS);
        if (coment__ == null)
            continue;
        let jsonS = JSON.parse(coment__);
        let secondComment = new SecondComment(jsonS.firstCommentid, jsonS.firstCommentUserName, jsonS.userName, jsonS.msg, jsonS.foto, jsonS.rating, jsonS.favorite, jsonS.time, jsonS.id);
        secondComments.push(secondComment);
    }
    renderComments();
}
;
function renderComments(onlyFavorites = false) {
    firstComments.forEach(firstComment => {
        if (onlyFavorites && !firstComment.getJson().favorite) {
        }
        else {
            if (!parent)
                return;
            let firstCommentDOM = firstComment.render(parent);
            let secondCommentsOfFirst = secondComments.filter(secondComment => Number(secondComment.getJson().firstCommentid) == Number(firstComment.getJson().id));
            secondCommentsOfFirst.forEach(secondComment => {
                if (onlyFavorites && !secondComment.getJson().favorite) { }
                else
                    secondComment.render(firstCommentDOM);
            });
        }
    });
}
function clearComments() {
    firstComments.forEach(firstComment => { firstComment.remove(); });
    secondComments.forEach(secondComment => { secondComment.remove(); });
}
function answer(id) {
    let fcParent = document.getElementById('fc' + id);
    let inputAnswer = new InputDOM(myName, myFoto);
    inputAnswer.render(parent, fcParent);
}
;
function processSetAtributes(id, action) {
    let coment = firstComments.find(firstComment => +firstComment.getJson().id == id);
    if (!coment) {
        coment = secondComments.find(secondComment => +secondComment.getJson().id == id);
    }
    if (coment) {
        switch (action) {
            case 'favorites':
                coment.favorites();
                break;
            case 'plus':
                coment.plus();
                break;
            case 'minus':
                coment.minus();
                break;
            default:
                break;
        }
        coment.render(undefined, true);
        saveLocalStorage();
        return;
    }
}
;
const sortData = (a, b) => {
    const idA = a.getJson().id;
    const idB = b.getJson().id;
    if (idA > idB) {
        return -1;
    }
    if (idA < idB) {
        return 1;
    }
    return 0;
};
const sortEsteeme = (a, b) => {
    const raitA = a.getJson().rating;
    const raitB = b.getJson().rating;
    if (raitA > raitB) {
        return -1;
    }
    if (raitA < raitB) {
        return 1;
    }
    return 0;
};
const sortActual = (a, b) => {
    let maxidA = 0;
    let maxidB = 0;
    let secondCommentsOfFirstA = secondComments.filter(secondComment => secondComment.getJson().firstCommentid == a.getJson().id);
    secondCommentsOfFirstA.forEach(secondComment => { maxidA = Math.max(maxidA, Number(secondComment.getJson().id)); });
    let secondCommentsOfFirstB = secondComments.filter(secondComment => secondComment.getJson().firstCommentid == b.getJson().id);
    secondCommentsOfFirstB.forEach(secondComment => { maxidB = Math.max(maxidB, Number(secondComment.getJson().id)); });
    if (maxidA > maxidB) {
        return -1;
    }
    if (maxidA < maxidB) {
        return 1;
    }
    return 0;
};
const sortNumberAnsver = (a, b) => {
    let maxA = secondComments.filter(secondComment => secondComment.getJson().firstCommentid == a.getJson().id).length;
    let maxB = secondComments.filter(secondComment => secondComment.getJson().firstCommentid == b.getJson().id).length;
    if (maxA > maxB) {
        return -1;
    }
    if (maxA < maxB) {
        return 1;
    }
    return 0;
};
function saveLocalStorage() {
    localStorage.setItem('firstComments_length', String(firstComments.length));
    firstComments.forEach((firstComment, ind) => {
        localStorage.setItem("firstComment" + ind, JSON.stringify(firstComment.getJson()));
    });
    localStorage.setItem('secondComments_length', String(secondComments.length));
    secondComments.forEach((secondComment, ind) => {
        localStorage.setItem("secondComment" + ind, JSON.stringify(secondComment.getJson()));
    });
}
function addComment(msg, id = "") {
    if (id == "") {
        let coment = new FirstComment(myName, msg, myFoto);
        if (!firstComments)
            return;
        firstComments.push(coment);
        if (!parent)
            return;
        coment.render(parent);
        navigator.increaseNumberComments();
        saveLocalStorage();
    }
    else {
        let firstComment = firstComments.find(firstComment => +firstComment.getJson().id == id);
        if (!firstComment)
            return;
        if (msg != "") {
            let coment = new SecondComment(id, firstComment.getJson().userName, myName, msg, myFoto);
            if (!secondComments)
                return;
            secondComments.push(coment);
            let firstCommentDom = document.getElementById('fc' + id);
            if (!firstCommentDom)
                return;
            coment.render(firstCommentDom);
        }
        let inpDOM = document.getElementById('input' + id);
        if (!inpDOM)
            return;
        inpDOM.remove();
        saveLocalStorage();
    }
}
document.addEventListener("DOMContentLoaded", function () {
    initBlock();
});
document.addEventListener("click", function (ev) {
    if (!ev)
        return;
    let target = ev.target;
    let action = "";
    if (target.dataset.action != undefined) {
        action = target.dataset.action;
    }
    let idDOM = "";
    if (target.dataset.iddom != undefined) {
        idDOM = target.dataset.iddom;
    }
    if (action == "addComment") {
        let inputElement = target.parentElement;
        if (!inputElement)
            return;
        for (let elem of inputElement.children) {
            if (elem.id == 'msg') {
                let inpEl = elem;
                let msg = inpEl.value;
                addComment(msg, idDOM);
                inpEl.value = '';
            }
        }
    }
    if (action == "answer") {
        answer(idDOM);
    }
    if (action == "favorites" || action == "plus" || action == "minus") {
        processSetAtributes(idDOM, action);
    }
    if (action == "clickSort") {
        navigator.clickSort();
    }
    if (action == "clicFavorites") {
        clearComments();
        navigator.clicFavorites();
        renderComments(navigator.getJson().onlyFavorites);
    }
    if (action == "sortData" || action == "sortEsteeme" || action == "sortActual" || action == "sortNumberAnsver") {
        switch (action) {
            case 'sortData':
                firstComments.sort(sortData);
                navigator.setSort('По дате');
                break;
            case 'sortEsteeme':
                firstComments.sort(sortEsteeme);
                navigator.setSort('По количеству оценок');
                break;
            case 'sortActual':
                firstComments.sort(sortActual);
                sortActual;
                navigator.setSort('По актуальности');
                break;
            case 'sortNumberAnsver':
                firstComments.sort(sortNumberAnsver);
                navigator.setSort('По количеству ответов');
                break;
            default:
                break;
        }
        clearComments();
        renderComments();
    }
});
