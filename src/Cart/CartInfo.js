var CartInfo = (function () {
    var selectedBookCopies = [];

    var getSelectedBookCopies = function () {
        return selectedBookCopies;
    }

    var setSelectedBookCopies = function (bookCopies) {
        selectedBookCopies = bookCopies;
    }

    var updateSelectedBookCopies = function (copyID) {
        const isSelected = selectedBookCopies.includes(copyID);
        if (isSelected) {
            setSelectedBookCopies(selectedBookCopies.filter(id => id !== copyID));
        }
        else {
            setSelectedBookCopies([...selectedBookCopies, copyID]);
        }
    }

    return {
        getSelectedBookCopies: getSelectedBookCopies,
        updateSelectedBookCopies: updateSelectedBookCopies
    };
})();

export default CartInfo;