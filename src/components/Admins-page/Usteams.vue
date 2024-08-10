<template>
  <div class="center">
    <canvas ref="myChart"></canvas>
    <div>
      <button v-for="(action, index) in actions" :key="index" @click="performAction(action)">
        {{ action.name }}/ /
      </button>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
// Import Utils if it's defined in an external module
// import Utils from './utils';

export default {
  data() {
    return {
      actions: [
        {
          name: 'Randomize',
          handler: 'randomizeChart'
        },
        {
          name: 'Add Dataset',
          handler: 'addDataset'
        },
        {
          name: 'Add Data',
          handler: 'addData'
        },
        {
          name: 'Remove Dataset',
          handler: 'removeDataset'
        },
        {
          name: 'Remove Data',
          handler: 'removeData'
        }
      ]
    };
  },
  mounted() {
    const ctx = this.$refs.myChart.getContext('2d');

    const config = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'], // Assuming initial 5 labels
        datasets: [
          {
            label: 'ຍອດຂາຍ',
            data: [-50, 20, -30, 40, 10], // Assuming initial 5 data points
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
          },
          {
            label: 'ຍອດຊື້',
            data: [10, -30, 40, -20, 30], // Assuming initial 5 data points
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  },
  methods: {
    randomizeChart(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = dataset.data.map(() => Math.floor(Math.random() * 200 - 100));
      });
      chart.update();
    },
    addDataset(chart) {
      const data = chart.data;
      const newDataset = {
        label: 'Dataset ' + (data.datasets.length + 1),
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        borderColor: 'green',
        data: Array.from({ length: data.labels.length }, () => Math.floor(Math.random() * 200 - 100)),
      };
      chart.data.datasets.push(newDataset);
      chart.update();
    },
    addData(chart) {
      const data = chart.data;
      if (data.datasets.length > 0) {
        data.labels.push('New Label');
        data.datasets.forEach(dataset => {
          dataset.data.push(Math.floor(Math.random() * 200 - 100));
        });
        chart.update();
      }
    },
    removeDataset(chart) {
      chart.data.datasets.pop();
      chart.update();
    },
    removeData(chart) {
      chart.data.labels.pop(); // Remove the label first
      chart.data.datasets.forEach(dataset => {
        dataset.data.pop();
      });
      chart.update();
    },
    performAction(action) {
      this[action.handler](this.chart);
    }
  }
};
</script>

<style scoped>
.center {
  margin-left: 300px;
  width: 600px;
  height: 400px;
}
</style>
