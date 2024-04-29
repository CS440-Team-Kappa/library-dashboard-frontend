var UserProfile = (function() {
    var name = "";
    var email = "";
    var isEmployee = true;
    var libraryIDs = [1];
  
    var getName = function() {
      return name;
    }
  
    var setName = function(newName) {
      name = newName;
    }

    var getEmail = function() {
        return email;
    }

    var setEmail = function(newEmail) {
        email = newEmail;
    }
  
    var isLoggedIn = function() {
      return name !== "";
    }

    var setLibraryIDs = function (libraryIDs) {
        libraryIDs = libraryIDs;
    }

    var getLibraryIDs = function () {
        return libraryIDs;
    }

    var setIsEmployee = function (isEmployee) {
        isEmployee = isEmployee;
    }

    var getIsEmployee = function () {
        return isEmployee;
    }
  
    return {
      getName: getName,
      setName: setName,
      isLoggedIn: isLoggedIn,
      isEmployee: getIsEmployee,
      getLibraryIDs: getLibraryIDs
    };
})();

export default UserProfile;