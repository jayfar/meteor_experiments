 Accounts.validateNewUser(function (user) {
    if (user.username && user.username.length >= 3)
      return true;
    throw new Meteor.Error(403, "Username must have at least 3 characters");
  });
  
  // Validate username, without a specific error message.
  Accounts.validateNewUser(function (user) {
    return user.username !== "root";
  });

  Accounts.onCreateUser(function(options, user) {
    var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
    user.dexterity = d6() + d6() + d6();
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
      user.profile = options.profile;
    return user;
  });