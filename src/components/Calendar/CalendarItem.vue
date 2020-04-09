<template>
  <div class="calendar__day">
    <slot/>
    <div v-if="events.length">
      <div v-for="(event, id) in events" :key="id" class="calendar__entry">
        <div class="calendar__entry__hour">
          <p>{{ event.hour || 'Non défini' }}</p>
          <p v-if="event.endHour">
            <span>{{ event.endHour }}</span>
          </p>
        </div>
        <div class="calendar__entry__location">
          <p v-html="filterAddress(event.location || 'Adresse manquante')"></p>
        </div>
      </div>
    </div>
    <div v-else>
        <p>Il n'y a pas encore de réservation.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    filterAddress(address) {
      return `${address.split(',')[0] || ''} <br/>${address.split(',')[1] || ''}`;
    }
  } 
}
</script>
