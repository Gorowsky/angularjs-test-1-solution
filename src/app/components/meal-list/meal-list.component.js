/**
 * Jeżel kandydat zdecyduje się na wykorzystanie scss to
 * bardzo dobrze. Ja zastosowałem css, bo stylowania nie ma
 * za wiele i nawet nie byłoby widać przewagi scss nad css.
 */
import './meal-list.component.css';

/**
 * Wykorzystuje es6 gdyż, jest on już zaimplementowany w całości
 * we wszystkich znaczących przeglądarkach i to jego należy
 * używać, gdyż wprowadza on znajomy z innych języków syntax
 * oraz wiele udogodnień (klasy, strukturyzacje, consty, lety,
 * krótkie funkcje () => {} itd.)
 * https://kangax.github.io/compat-table/es6/
 */
class MealListCtrl {
  constructor(mealListService) {
    this.mealList = [];
    /**
     * Zamiast resolve można też użyć serwisu który odpytuje
     * API to również jest dobre rozwiązanie. Jednak kandydat
     * powinien stworzyć taki serwis, a nie tworzyć zapytania
     * wewnątrz komponentu. W myśl zasad tworzenia aplikacji
     * w angularze, serwisy odpowiadają za ciężką logikę, a 
     * komponenty służą do zarządzania widokiem. Pozostała część
     * zamieszczona tutaj nie nadaje się na wydzielenie do serwisu,
     * gdyż zachodzi tu głównie interakcja z widokiem za pomocą
     * kliknięć, mapowań i filtrowania. Jedynie liczenie sumy
     * możnaby wydzielić, ale jest to na tyle drobna logika, że
     * tworzenie serwisu dla niej mijałoby się z celem. Natomiast
     * komuinikacja z API zawsze powinna być obsłużona przez 
     * osobny serwis.
     * mealListService.getMeals()
     *   .then(meals => this.mealList = meals);
     */
  }

  /**
   * do inicjalizacji wartości kandydat powinien skorzystać
   * z konstruktora, a do rozpoczęcia pisania logiki z lifecycle
   * hooków. Idealnym będzie $onInit który zapewnia że komponent
   * jest już zainicjalizowany i wszystkie jego zależności są
   * gotowe do użytku.
   */
  $onInit() {
    this.sum = 0;

    /**
     * Tutaj oczywiście dowolność interpretacji w jaki sposób
     * kandydat rozwiąże zadanie, ale pisanie mnóstwa for loopów
     * i tworzenia dodatkowych side effectów należy unikać.
     * Javascript jest stworzony do programowania funkcyjnego
     * i największe jego zalety widać własnie wtedy. Metody
     * map, filter, reduce itd. są świetnym narzędziem do tego.
     */
    this.mealList = this.meals
      .map((mealName, i) => {
        return {
          index: (i+1),
          name: mealName,
          price: this.getPrice(i, mealName),
          isChecked: false
        };
      });
  }

  getPrice(index, mealName) {
    const firstLetter = mealName[0];
    if (index % 3 === 0) {
      return 15;
    } else if (
      firstLetter === "E" ||
      firstLetter === "R" ||
      firstLetter === "G"
      ) {
      return 10;
    }
      
    return 20;
  }

  /**
   * Tutaj jest pewna podchwytliwość chciałem, żeby kandydat
   * pomyślał o performance. Zorganizowałem dane dla 100 rekordów,
   * ale miało to sygnalizować wielkość listy. Jest to opcjonalne,
   * ale jeżeli kandydat by wpadł na to żeby nie bindować do każdego
   * rekordu eventu ng-click, tylko zastosować jeden na
   * rodzicu, a następnie dostać się do klikniętego dziecka to byłby 
   * to duży plus. Oczywiście rozwiązanie z bindowaniem ng-clicka 
   * do każdego elementu też jest poprawne, ale przy dużych listach 
   * 30k+ zaczyna być dostrzegalna różnica. Ja zastosowałem to
   * docelowe rozwiązanie.
   */
  toggleMeal(evt) {
    if (evt.target === evt.currentTarget) {
      return null;
    }

    const mealIndex = this.getIndexOfChildNode(evt.target);

    this.mealList = this.mealList
      .map((meal, i) => this.toggleMealItem(meal, i, mealIndex));

    /**
     * Tutaj widać tą potęgę programowania funkcyjnego. Jeżeli
     * kandydat zdecyduje się na rozwiązania najprostsze czyli
     * for loopy to kod znacznie ucierpi na czytelności i długosci.
     */
    this.sum = this.mealList
      .filter(meal => meal.isChecked)
      .map(meal => meal.price)
      .reduce((mealPrice, sum) => mealPrice + sum, 0);
  }

  toggleMealItem(meal, index, mealIndex) {
    const { isChecked } = meal;
    const isIndexMatched = index === mealIndex;

    return {
      ...meal, 
      isChecked: isIndexMatched? !isChecked : isChecked
    };
  }

  getIndexOfChildNode(child) {
    let i = 0;

    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        i++;
      }
    }

    return i;
  }
}

const MealList = {
  templateUrl: './components/meal-list/meal-list.component.html',
  controller: MealListCtrl,
  controllerAs: '$ctrl',
  bindings: {
    meals: '<'
  }
};

export default MealList;