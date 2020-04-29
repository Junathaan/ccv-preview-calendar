<template>
  <div class="page-wrapper">
    <div v-if="eventsMain.length" class="item-container">
      <div class="item-container__sub-title"><img src="@/assets/Picto_velo_1.svg" /> <p>Vélo 1</p></div>
      <CalendarContainer :events="eventsMain" />
    </div>

    <div v-if="events.length" class="item-container">
      <div class="item-container__sub-title"><img src="@/assets/Picto_velo_2.svg" /> <p>Vélo 2</p></div>
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
      let date = new Date().toLocaleString().split('/');

      let newDate = date[2].split(' ')[0] + date[1] + date[0]; 

      const events = await eventsDb.readAll([
        ['calendarId', '==', 'ccavrac2@gmail.com'],
        ['idDate', '>=', newDate],
      ]);

      const eventsMain = await eventsDb.readAll([
        ['calendarId', '==', 'ccavrac@gmail.com'],
        ['idDate', '>=', newDate],
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

    &:nth-of-type(2) { 
      @media (min-width: 740px) {
        margin-left: 20px; 
      }
    }

    &__sub-title {
      text-align: center;
      position: absolute;
      font-weight: bold;
      top: 5px;
      right: 20px;

      img { width: 70px; margin-bottom: -12px; }
      p { text-align: center; }
    }
  }
</style>
