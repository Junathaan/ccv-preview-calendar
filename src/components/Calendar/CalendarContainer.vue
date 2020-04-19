<template>
  <div class="calendar">
    <div v-for="(calendar, id) in events" :key="id" class="calendar__container">
      <CalendarItem :events="calendar.events" v-if="id === currentDay">
        <h1 class="calendar__container__title" :class="'calendar__container__title--' + calendar.day">
          {{ calendar.day }}
          <span class="calendar__container__title__date">{{ calendar.date.slice(0, 5) }}</span>
        </h1>
        <p class="calendar__container__sub-title" v-html="corner[calendar.day]"></p>

        <div class="calendar__container__buttons">
          <button :disabled="currentDay === 0" @click="prevDay">&lsaquo; Jour précédent</button>
          <button :disabled="currentDay === (events.length - 1)" @click="nextDay">Jour suivant &rsaquo;</button>  
        </div>
      </CalendarItem>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex';
import CalendarItem from './CalendarItem';

export default {
  components: {CalendarItem},

  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      currentDay: 0,
      corner: {
        lundi: '&bull;&nbsp;Lille-Moulins &bull;&nbsp;Lille-Sud',
        mardi: '&bull;&nbsp;Vauban Esquermes &bull;&nbsp;Bois Blanc &bull;&nbsp;Faubourg de Béthune',
        mercredi: '&bull;&nbsp;St Maurice Pellevoisin &bull;&nbsp;Vieux-Lille',
        jeudi: '&bull;&nbsp;Fives',
        vendredi: '&bull;&nbsp;Wazemmes &bull;&nbsp;Lille-centre',
      }
    };
  },

  methods: {
    prettyDate(date) {
      return (new Date(date)).toLocaleString('fr-fr', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    nextDay() {
      this.currentDay += 1;
    },

    prevDay() {
      this.currentDay -= 1;
    },
  }
}
</script>
