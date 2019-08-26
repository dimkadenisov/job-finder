export default class DataFetcher {
  _apiBase = 'https://api.hh.ru';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error (`
        Не удалось получить данные с адреса ${this._apiBase}${url}
        Статус: ${res.status}
      `)
    }

    return await res.json();
  }

  getVacancies = async (vacanciesAmount = 50) => {
    if (typeof vacanciesAmount !== 'number'
      || Math.floor(vacanciesAmount) - vacanciesAmount !== 0
      || vacanciesAmount <= 0) {
      throw new Error ('Неверные входные параматры функции getVacancies. Пожалуйста, введите целое число > 0')
    };

    const res = await this.getResource(`/vacancies?per_page=${vacanciesAmount}`);
    return res.items;
  }
}
