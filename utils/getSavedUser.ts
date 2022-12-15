

function getSavedUser(): null | string {
    return window.localStorage.getItem("UUID")
}

export default getSavedUser