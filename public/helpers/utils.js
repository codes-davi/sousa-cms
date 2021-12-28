const confirmDelete = (event) =>{
    let decision = confirm('Sure?');
    if (decision) {
        return;
    } else {
        event.preventDefault();
    }
};

const createEditionForm = (button) =>{
    let form = selectForm(button);
    let id = button.parentElement.parentElement.childNodes[1].innerText;
    let staticTh = document.querySelector(`#static-edit-${id}`);
    staticTh.classList.add('d-none');
    form.classList.remove('d-none');
    changeBtn(id);
};

const sendRequest = (button) =>{
    let form = selectForm(button);
    form.submit();
};

const selectForm = (button) =>{
    let id = button.parentElement.parentElement.childNodes[1].innerText;
    return document.querySelector(`#edit-category-${id}`);
};

const changeBtn = (id) =>{
    let bttns = selectButtons(id);
    bttns[1].classList.remove('d-none');
    bttns[0].classList.add('d-none');
};

const saveBtnAction = (button) =>{
    let id = button.parentElement.parentElement.childNodes[1].innerText;
    let bttns = selectButtons(id);
    bttns[0].classList.remove('d-none');
    bttns[1].classList.add('d-none');
    sendRequest(button);
};

const selectButtons = (id) =>{
    let btnSave = document.querySelector(`#save-btn-${id}`);
    let btnEdit = document.querySelector(`#edit-btn-${id}`);
    return [btnEdit,btnSave];
};