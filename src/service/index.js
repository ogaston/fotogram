
function validation (token){
    if (token) return true
    return false
}

function loadedPage(el) {
    el.addClass('loaded');
}

export { loadedPage, validation };