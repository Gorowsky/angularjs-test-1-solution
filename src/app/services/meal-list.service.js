class MealListService {
  constructor($http) {
    this.http = $http;
  }

  /**
   * Skorzystanie z wbudowanego serwisu angularowego $http
   * jest tutaj wręcz obligatoryjne. W przeciwnym razie po
   * przypisaniu wyniku metody getMeals do zmiennej w komponencie
   * widok się nie zupdatuje i będzie trzeba korzystać z
   * niezalecanych rozwiązań typu $scope.$apply() albo $watcherów.
   * Także fetch jest raczej złym wyborem tak samo jak i
   * XMLHttpRequest. Metody serwisu $http zwracają promise-like
   * dlatego można to zrobić tak jak ja poniżej bądź użyć
   * async/await.
   */
  getMeals() {
    return this.http.get('/api/salads.json')
      .then(res => res.data);
  }
}

export default MealListService;