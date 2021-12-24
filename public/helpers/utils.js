const confirmDelete = (event) =>{
    let decision = confirm("Sure?");
    if (decision) {
        return;
    } else {
        event.preventDefault();
    }
};