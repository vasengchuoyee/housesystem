<template>
  <div class="center">
    <h2>ຍອດນິຍົມຂອງແບບເຮືອນ</h2>
    <canvas ref="myChart"></canvas>
    <!-- <br>
    <hr>
    <v-btn color="green">Add new</v-btn>
    <v-table height="300px">
      <thead>
        <tr class="bg-yellow">
          <th class="text-left">
            Full_Name
          </th>
          <th class="text-left">
            Adress
          </th>
          <th class="text-left">
            price
          </th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>Mr: forest</td>
        <td>Luangphabang</td>
        <td>3000000</td>
      </tr>
    </tbody>
    </v-table> -->
    

  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  mounted() {
    const ctx = this.$refs.myChart.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['ເຮືອນທົ່ວໄປ', 'ເຮືອນຊັ້ນໜື່ງ', 'ເຮືອນສອງຊັ້ນ', 'ເຮືອນຫຼຸບ', 'ຮ້ານອາຫານ', 'ໂຮງແຮມ'],
        datasets: [{
          label: '# ຂາຍດີ',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
</script>

<style scoped>
.center {
  height: 1000px;
  width: 1000px;
}
</style>
