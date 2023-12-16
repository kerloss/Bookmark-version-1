var siteNameInput = document.getElementById('bookMarkName');
var siteURLInput = document.getElementById('siteURL');

var bookMarkList = [];

if (localStorage.getItem('myBookmark')) {
    bookMarkList = JSON.parse(localStorage.getItem('myBookmark'));
    displayBookMark();
}

function mainBookMark() {
    addBookmark();
    displayBookMark();
    // clear();
};

/** this function to take value from user and push to arraylist */
function addBookmark() {
    var bookMark = {
        siteName: siteNameInput.value,
        siteURL: siteURLInput.value
    }
    bookMarkList.push(bookMark);
    localStorage.setItem('myBookmark', JSON.stringify(bookMarkList));
}

/** this function to display data to user in  html */
function displayBookMark() {
    var newBookMark = ``;
    for (let i = 0; i < bookMarkList.length; i++) {
        newBookMark += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookMarkList[i].siteName}</td>
                <td>${bookMarkList[i].siteURL}</td>
                <td>
                    <button onclick="visitToLink(this)" value="${bookMarkList[i].siteURL}" class="btn btn-success">
                        <i class="fa-solid fa-eye px-1"></i>
                        Visit
                    </button>
                </td>
                <td>
                    <button onclick="deleteBookMark(${i})" class="btn btn-danger">
                        <i class="fa-solid fa-trash px-1"></i>
                        Delete
                    </button>
                </td>
            </tr>
        `
    }
    document.getElementById('tableContact').innerHTML = newBookMark;
};

function clear() {
    siteNameInput.value = "";
    siteURLInput.value = "";
}

function deleteBookMark(index) {
    var check = confirm('Are you sure to delete this bookmark');
    if (check == true) {
        bookMarkList.splice(index, 1);
        localStorage.setItem('myBookmark', JSON.stringify(bookMarkList));
        displayBookMark();
    }
    else {
        window.alert('unable to delete bookmark')
    }
}

function visitToLink(link) {
    // location.href = 'https://' + link.value;  //over write tab
    if ((link.value.includes('https://') || (link.value.includes('http://')) || (link.value.includes('HTTPS://'))) == true) {
        window.open(link.value);
    }
    else {
        window.open('https://' + link.value);   //new tab open
    }
}