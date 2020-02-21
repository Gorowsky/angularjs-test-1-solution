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
  /**
   * Użyłem tutaj opcji 'resolve' routera angularowego. Można tutaj
   * dodać zależności (asynchroniczne np. wywołania http) które
   * wywołają się przed zainicjalizowaniem komponentu i tym samym
   * będą od razu dostępne w komponencie. Jest to w tej chwili
   * najschludniejsze rozwiązanie. Kandydat może również
   * wysłać zapytanie wewnątrz komponentu poprzez stworzony serwis
   * (taki jaki stworzyłem ja - mealListService), ale musi wtedy 
   * zadbać o to żeby widok się przeładował po requestcie. 
   * Wbudowane serwisy angularowe dbają o to same i należy w takim 
   * wypadku posłużyć się serwisem $http. 
   * Są również inne opcje jak $watch, $scope.$apply() 
   * bądź $timeout, ale te mają więcej wad i kandydat powinien 
   * ich unikać.
   */
  .config(['$routeProvider', 
    $routeProvider => {
      $routeProvider
        .when('/', {
          template: '<home-component meals="$resolve.meals"></home-component>',
          resolve: {
            meals: mealListService => mealListService.getMeals()
          }
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