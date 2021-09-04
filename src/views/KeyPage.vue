<template>
  <div class="Link2">
    <router-link :to="{ name: 'Home' }"> Home </router-link>
    <router-link :to="{ name: 'Events' }"> Events </router-link>
    <router-link :to="{ name: 'Events_id', params: { id: 1 } }">
      EventsID
    </router-link>
    <router-link :to="{ name: 'Login' }"> LoginAdmin </router-link>
    <router-link :to="{ name: 'NewEvent' }"> NewEvent </router-link>
    <router-link :to="{ name: 'People' }"> People </router-link>
    <router-link :to="{ name: 'People_id', params: { id: 1 } }">
      PeopleID
    </router-link>
    <router-link :to="{ name: 'Presensi' }"> Presensi </router-link>
    <router-link :to="{ name: 'PresensiTanpa' }"> PresensiTanpa </router-link>
    <router-link :to="{ name: 'Events_id', params: { id: 1 } }">
      EventsID
    </router-link>
    <router-link :to="{ name: 'Register' }"> Register </router-link>
    <router-link :to="{ name: 'People_id_update', params: { id: 1 } }">
      RegisterUpdate
    </router-link>
    <router-link :to="{ name: 'Sync' }"> Sync </router-link>
    <router-link to="/notfound404"> NotFound </router-link>
  </div>
</template>>

