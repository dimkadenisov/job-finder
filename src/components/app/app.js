import React, {Component} from 'react';

import ItemList from '../item-list';
import SearchPanel from '../search-panel';
import DataFetcher from '../../services/data-fetcher';

export default class App extends Component {
  dataFetcher = new DataFetcher();

  state = {
    itemList: [],
    term: ''
  }

  componentDidMount() {
    const {getVacancies} = this.dataFetcher;

    getVacancies()
      .then(itemList => {
        this.setState({
          itemList
        });
      });
  }

  onSearchChange = (term) => {
    this.setState({ term });
  }

  search = (itemList, term) => {
    return itemList.filter((item) => {
      return item.name.toLowerCase().indexOf(term.trim().toLowerCase()) > -1;
    });
  }

  render() {
    const { itemList, term } = this.state;

    const visibleItems = this.search(itemList, term);

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Вакансии для Вас:</h1>
              <SearchPanel onSearchChange = { this.onSearchChange } term = {this.state.term }/>
              <ItemList itemList = { visibleItems }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
