import GenericDB from './generic-db'

export default class EventsDb extends GenericDB {
  constructor() {
    super(`${process.env.VUE_APP_DB_PREFIX || ''}events`)
  }

  // Here you can extend EventsDB with custom methods
}
