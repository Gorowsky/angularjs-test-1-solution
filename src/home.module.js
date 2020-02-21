/**
 * Ważne aby kandydat organizował swój kod. W angularze aplikacje
 * dzieli się na moduły. Tutaj aplikacja jest malutka zatem jest
 * tylko jeden moduł home. Kandydat powinien tutaj zaimportować
 * i wstrzyknąć wszystkie elementy swojej aplikacji takie jak
 * komponenty, serwisy. W angularzejs wersji 1.5.8 wprowadzono
 * komponenty i to ich należy używać. Nie powinno się już tworzyć
 * kontrollerów i wstrzykiwać ich w widoku za pomocą ng-controller.
 */

import angular from 'angular';

// Components
import HomeComponent from './app/components/home/home.component';
import MealListComponent from './app/components/meal-list/meal-list.component';

// Services
import MealsListService from './app/services/meal-list.service';

const appModule = angular
  .module('home', [])
  .config(['$routeProvider', 
    $routeProvider => {
      $routeProvider
        .when('/', {
          template: '<home-component></home-component>'
        })
        .otherwise({
          redirectTo: '/'
        })
    }
  ])
  .component('homeComponent', HomeComponent)
  .component('mealListComponent', MealListComponent)
  .service('mealListService', MealsListService);

export default appModule;