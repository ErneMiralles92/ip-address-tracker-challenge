<template>
  <div>
    <v-toolbar
      prominent
      src="/images/pattern-bg.png"
      extended
      :extension-height="`${$vuetify.breakpoint.mdAndUp ? 140 : 240 }`"
    >
      <v-col cols="12">
        <v-row justify="center" class="pt-8">
          <h2 class="white--text it-font-weight-medium">
            IP Address Tracker
          </h2>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" lg="4">
            <v-hover>
              <template v-slot="{ hover }">
                <v-text-field
                  v-model="ipSearch"
                  height="56"
                  solo
                  class="search-btn it-font-weight-medium subtitle-1"
                  label="Search for any IP address or domain"
                  hide-details
                  :elevation="hover ? 24 : 0"
                  :class="{'elevation-24': hover}"
                >
                  <template v-slot:label>
                    <span class="darkGrayColor--text it-font-weight-medium">Search for any IP address or domain</span>
                  </template>
                  <template v-slot:append>
                    <v-btn :disabled="!validIp" color="veryDarkGrayColor" class="btn-append" height="56">
                      <v-img src="/images/icon-arrow.svg" height="12" contain />
                    </v-btn>
                  </template>
                </v-text-field>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-toolbar>
    <v-row justify="center" class="px-4">
      <v-col cols="12" md="8" class="cardFloating">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card class="ip-info-card" :elevation="hover ? 24 : 6">
              <v-card-text class="py-0">
                <v-row>
                  <v-col cols="12" md="3">
                    <v-row no-gutters justify="center" justify-md="start">
                      <span class="darkGrayColor--text it-font-weight-medium caption">IP ADDRESS</span>
                    </v-row>
                    <v-row no-gutters justify="center" justify-md="start">
                      <span class="veryDarkGrayColor--text it-font-weight-medium title">192.2.34.56</span>
                    </v-row>
                  </v-col>
                  <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical class="ml-n1" />
                  <v-col cols="12" md="3">
                    <v-row no-gutters justify="center" justify-md="start">
                      <span class="darkGrayColor--text it-font-weight-medium caption">LOCATION</span>
                    </v-row>
                    <v-row no-gutters justify="center" justify-md="start">
                      <span class="veryDarkGrayColor--text it-font-weight-medium title">Brooklyn, New York</span>
                    </v-row>
                  </v-col>
                  <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical class="ml-n1" />
                  <v-col cols="12" md="3">
                    <v-row no-gutters justify="center" justify-md="start">
                      <span class="darkGrayColor--text it-font-weight-medium caption">TIMEZONE</span>
                    </v-row>
                    <v-row no-gutters justify="center" justify-md="start">
                      <span class="veryDarkGrayColor--text it-font-weight-medium title">UTC-05:00</span>
                    </v-row>
                  </v-col>
                  <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical class="ml-n1" />
                  <v-col cols="12" md="3">
                    <v-row no-gutters justify="center" justify-md="start">
                      <span class="darkGrayColor--text it-font-weight-medium caption">ISP</span>
                    </v-row>
                    <v-row no-gutters justify="center" justify-md="start">
                      <span class="veryDarkGrayColor--text it-font-weight-medium title">Space X</span>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    <div id="map-wrap" :style="`height: ${ $vuetify.breakpoint.mdAndUp ? 'calc(100vh - 268px)' : '600px'}`">
      <client-only>
        <l-map :zoom="13" :center="[55.9464418,8.1277591]" :options="{ zoomControl: false }">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="[55.9464418,8.1277591]" :icon="markerIcon" />
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from '@vue/composition-api'

export default defineComponent({
  setup (_, ctx) {
    const ipSearch = ref('')
    const validIp = computed(() => {
      const entries = ipSearch.value.split('.')
      return entries.length === 4 && entries.filter(entry => entry !== '' && +entry >= 0 && +entry <= 255).length === 4
    })

    const markerIcon = ref({})
    onMounted(() => {
      const L = ctx.root.$L
      markerIcon.value = L.icon({
        iconUrl: '/images/icon-location.svg',
        iconSize: [42, 56]
      })
    })
    return {
      ipSearch,
      validIp,
      markerIcon
    }
  }
})
</script>

<style lang="scss" scoped>
$radius: 14px;

.row-back {
  background-image: url('/images/pattern-bg.png');
  background-size: cover;
}

.search-btn {
  border-radius: $radius $radius $radius $radius;
}

.btn-append {
  margin-right: -12px;
  border-radius: 0 $radius $radius 0;
}

.ip-info-card {
  border-radius: $radius $radius $radius $radius !important;
}

.cardFloating {
  position: absolute;
  top: 180px;
  z-index: 1000;
}
</style>
