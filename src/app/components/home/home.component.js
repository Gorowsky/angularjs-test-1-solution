class HomeComponentCtrl { }

const HomeComponent = {
  templateUrl: './components/home/home.component.html',
  controller: HomeComponentCtrl,
  controllerAs: '$ctrl',
  bindings: {
    meals: '<'
  }
};

export default HomeComponent;