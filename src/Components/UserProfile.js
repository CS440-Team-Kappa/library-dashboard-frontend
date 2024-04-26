var UserProfile = (function() {
    var name = "";
    var email = ""
  
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
  
    return {
      getName: getName,
      setName: setName,
      isLoggedIn: isLoggedIn
    };
})();

export default UserProfile;