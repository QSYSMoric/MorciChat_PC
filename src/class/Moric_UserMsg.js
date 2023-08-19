export default class UserMsg {
    constructor(userId, userName, userEmail, userAge, userSignature, userProfileURL) {
      this.userProfileURL = userProfileURL;
      this.userName = userName;
      this.userId = userId;
      this.userEmail = userEmail;
      this.userAge = userAge;
      this.userSignature = userSignature;
    }
  
    getUserId() {
      return this.userId;
    }
  
    getUserName() {
      return this.userName;
    }
  
    getUserEmail() {
      return this.userEmail;
    }
  
    getUserAge() {
      return this.userAge;
    }
  
    getUserSignature() {
      return this.userSignature;
    }
  
    getUserProfileURL() {
      return this.userProfileURL;
    }
}