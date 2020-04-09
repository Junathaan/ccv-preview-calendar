<template>
  <div class="page-wrapper">
    <div v-if="eventsMain.length" class="item-container">
      <p class="item-container__sub-title">🚲 Vélo 1</p>
      <CalendarContainer :events="eventsMain" />
    </div>

    <div v-if="events.length" class="item-container">
      <p class="item-container__sub-title">🚲 Vélo 2</p>
      <CalendarContainer :events="events" />
    </div>
  </div>
</template>

<script>
import CalendarContainer from './CalendarContainer';
import Events from '@/firebase/events-db';

const eventsDb = new Events();

export default {
  components: {CalendarContainer},

  data() {
    return {
      events: [],
      eventsMain: [],
    }
  },

  created() {
    this.getEvents();
  },

  methods: {
    async getEvents() {
      const events = await eventsDb.readAll([
        ['calendarId', '==', 'ccavrac2@gmail.com'],
      ]);

      const eventsMain = await eventsDb.readAll([
        ['calendarId', '==', 'ccavrac@gmail.com'],
      ]);

      this.events = events;
      this.eventsMain = eventsMain;
    },
  
  }
}
</script>

<style lang="scss" scoped>
  .item-container {
    display: inline-block;
    vertical-align: top;
    position: relative;

    &__sub-title {
      position: absolute;
      font-weight: bold;
      top: 30px;
      right: 20px;
    }
  }
</style>
