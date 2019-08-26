import React, {Component} from 'react';

import './item-list.css';

export default class ItemList extends Component {

  calculateSalary = (salary) => {
    if (salary === null) {

      return 'Заработная плата не указана'

    } else {

      const currency = this.transformCurrency(salary.currency)
      const salaryFrom = salary.from ? `от ${salary.from}` : '';
      const salaryTo = salary.to ? `до ${salary.to}` : '';

      return `Заработная плата ${salaryFrom}${salaryFrom === '' ? '' : currency}  ${salaryTo}${salaryTo === '' ? '' : currency}`;

    }
  }

  transformCurrency = (currency) => {
    if(currency === 'RUR') return '₽';
    else if (currency === 'USD') return '$';
    else if (currency === 'EUR') return '€';
    return currency;
  }

  renderRequirementList = (requirement, listHeader) => {
    if (requirement === null) return;

    return (
      <span>
        <b>{listHeader}:</b>

        <ul>
          {requirement.split('. ').map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </span>
    )
  }

  renderItems(arr) {
    return arr.map((item) => {
      const {
        id,
        name,
        area: {name: areaName},
        employer: {name: employerName, alternate_url: employerUrl},
        salary,
        snippet: {requirement, responsibility}
      } = item;

      return (
        <li key={id}>
          <div className="card mb-3">
            <span className="card-header">{name}</span>
            <div className="d-flex flex-column card-body">
              <a href={employerUrl} target="blank">{employerName}</a>
              <span>Город: {areaName}</span>
              <span>{this.calculateSalary(salary)}</span>
              {this.renderRequirementList(requirement, 'Требования')}
              {this.renderRequirementList(responsibility, 'Обязанности')}
            </div>
          </div>
        </li>
      )
    })
  }

  render() {
    const {itemList} = this.props;

    if(!itemList) return <span>Загрузка...</span>

    const items = this.renderItems(itemList);

    return (
      <ul className="item-list">
        {items}
      </ul>
    );
  }
};
