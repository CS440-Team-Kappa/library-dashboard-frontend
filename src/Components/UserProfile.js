var UserProfile = (function() {
    var name = "";
    var email = "";
    var isEmployee = true;
  
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
      isEmployee: getIsEmployee
    };
})();

export default UserProfile;