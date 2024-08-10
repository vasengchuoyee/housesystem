<template>
  <v-stepper model-value="3">
    <v-stepper-header class="text-color">
      <v-stepper-item title="ເລືອກແບບ" value="1" complete></v-stepper-item>

      <v-divider></v-divider>
      <!-- subtitle="Missing Details" -->
      <v-stepper-item
        :rules="[() => true]"
        title="ການຊຳລະສິ້ນຄ້າ"
        value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item title="ຢືນຢັນການຊຳລະ" value="3"></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item title="ດາວໂລດແບບ" value="4"></v-stepper-item>
      <v-divider></v-divider>

      <v-stepper-item title="ສຳເລັດ" value="5"></v-stepper-item>
    </v-stepper-header>
  </v-stepper>
</template>

<style scoped>
.text-color {
 color: green;
}
</style>
