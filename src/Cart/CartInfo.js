var CartInfo = (function () {
    var selectedBookCopies = [];
    var updateElementFcn = null;

    var getSelectedBookCopies = function () {
        return selectedBookCopies;
    }

    var setSelectedBookCopies = function (bookCopies) {
        selectedBookCopies = bookCopies;
        if (updateElementFcn)
            updateElementFcn(selectedBookCopies); //Update another element's data using a function given
    }

    var updateSelectedBookCopies = function (copyID) {
        const isSelected = selectedBookCopies.includes(copyID);
        if (isSelected) {
            setSelectedBookCopies(selectedBookCopies.filter(id => id !== copyID));
        }
        else {
            setSelectedBookCopies([...selectedBookCopies, copyID]);
        }
        console.log("Selected BookCopies: " + selectedBookCopies);
    }

    var setUpdateElementFcn = function (elementUpdateFcn) {
        updateElementFcn = elementUpdateFcn;
    }

    return {
        getSelectedBookCopies: getSelectedBookCopies,
        updateSelectedBookCopies: updateSelectedBookCopies,
        setUpdateElementFcn: setUpdateElementFcn
    };
})();

export default CartInfo;