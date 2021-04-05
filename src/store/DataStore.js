import {makeAutoObservable, toJS} from 'mobx'


class State {

    startFilter = {}

    filter = {
        title: '',
        countries: [],
        maxkCal: '',
        minkCal: ''
    }
    data = []

    recipe = {}

    constructor() {
        makeAutoObservable(this)
    }

    getData(callback) {
        fetch('https://test.kode-t.ru/list.json')
            .then(response => response.json())
            .then(response => this.data = response['recipes'])
            .then(response => this.data.map(item => {
                item.cookTime = this.setTime(item.cookTime)
            }))
            .then(() => this.setStarFilter())
            .then(() => callback())
    }

    setTime(time) {
        if (Math.ceil(time / 60) > 60) {
            return `${time / 3600} hours`
        } else {
            return `${Math.ceil(time / 60)} min`
        }
    }

    changeFilter(text) {
        this.filter.title = text
    }

    setFilter(countries, maxkCal, minkCal) {
        this.filter.countries = countries
        this.filter.maxkCal = maxkCal
        this.filter.minkCal = minkCal

    }

    async getRecipe(id, callback) {
        fetch(`https://test.kode-t.ru/detail_${id}.json`)
            .then(response => response.json())
            .then(response => this.recipe = response['recipe'])
            .then(() => callback())
    }

    setStarFilter() {
        const countries = toJS(this.data).map(item => item['cuisine']['title'])
        const uniqCountries = countries.filter(function (item, pos) {
            return countries.indexOf(item) === pos;
        })
        let calories = toJS(this.data).map(item => item['caloricity'])
        const maxCal = Math.max(...calories)
        const minCal = Math.min(...calories)
        this.setFilter(uniqCountries, maxCal, minCal)
        this.startFilter = Object.assign({}, toJS(this.filter))
    }


}


export default new State()