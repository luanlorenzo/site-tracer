'use strict';
(function(){

class UserComponent {

  constructor($http, Auth, $state) {
    this.Auth = Auth;
    this.$http = $http;
    this.$state = $state;
    this.users = [];
  }

  $onInit() {
    this.$http.get('/api/users').then(response => {
      this.users = response.data;
    });
  }

}

class ManageUserComponent {
  /*var errors: [];
  var submitted: false;*/

  constructor($http, Auth, $state) {
    this.Auth = Auth;
    this.$http = $http;
    this.$state = $state;

    if(this.$state.params.id) {
      this.$http.get('/api/users/' + this.$state.params.id)
      .then(response => {
        this.user = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  addUser(form) {
    this.submitted = true;
    this.Auth.createUser({
      name: this.user.name,
      email: this.user.email,
      password: this.user.password
    })
    .then(() => {
      // Account created, redirect to home
      this.$state.go('user');
    })
    .catch(err => {
      err = err.data;
      this.errors = {};

      // Update validity of form fields that match the mongoose errors
      angular.forEach(err.errors, (error, field) => {
        form[field].$setValidity('mongoose', false);
        this.errors[field] = error.message;
      });

    });
  }

  saveUser(form) {
    this.submitted = true;

    this.$http.put('/api/users/' + this.$state.params.id, this.user)
    .then(res => {
      this.$state.go('user');
    })
    .catch(err => {
      err = err.data;
      this.errors = {};

      // Update validity of form fields that match the mongoose errors
      angular.forEach(err.errors, (error, field) => {
        form[field].$setValidity('mongoose', false);
        this.errors[field] = error.message;
      });
    });

  }
}

angular.module('siteCurApp')
.component('user', {
  templateUrl: 'app/user/user.html',
  controller: UserComponent
})
.component('newuser', {
  templateUrl: 'app/user/new_user.html',
  controller: ManageUserComponent
})
.component('edituser', {
  templateUrl: 'app/user/edit_user.html',
  controller: ManageUserComponent
});

})();
