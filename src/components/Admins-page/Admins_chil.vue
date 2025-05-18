<template>
  <div class="dashboard">
    <!-- Metric Cards -->

    <div class="metrics">
      <div class="metric-card">
        <h3>{{ employeeCount }}</h3>
        <p>Total Employees</p>
      </div>
      <div class="metric-card">
        <h3>{{ userCount }}</h3>
        <p>Total Users</p>
      </div>
      <div class="metric-card">
        <h3>{{ houseCount }}</h3>
        <p>Total Houses</p>
      </div>
      <div class="metric-card">
        <h3>{{ formatCurrency(totalOrder) }} ₭</h3>
        <p>Total Orders <span class="positive">+2%</span></p>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts">
      <div class="chart-container">
        <h4>ຍອດຂາຍທັງໝົດ</h4>
        <p>ຈຳນວນ: {{ formatCurrency(totalOrder) }} ₭</p>
        <vue-doughnut-chart :data="costChartData" :options="chartOptions" />
      </div>
      <div class="chart-container">
        <h4>Leads</h4>
        <p>3,587 Total leads / 3,587 Bad leads</p>
        <vue-bar-chart :data="leadsChartData" :options="barChartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut, Bar } from 'vue-chartjs';
import authService from '@/services/auth';

ChartJS.register(...registerables);

export default {
  name: 'Dashboard',
  components: {
    VueDoughnutChart: Doughnut,
    VueBarChart: Bar,
  },
  data() {
    return {
      api: null,
       employeeCount: 0,
      userCount: 0,
      houseCount: 0,
      totalOrder: 0,
      filteredData: [],
      costChartData: {
        labels: ['ເຮືອນທົ່ວໄປ', 'ເຮືອນສອງຊັ້ນ', 'ຮ້ານອາຫານ - ເຮືອນຫຼູບ'],
        datasets: [{
          data: [541017.77, 579077.44, 21715.29],
          backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623'],
          borderWidth: 0,
        }],
      },
      leadsChartData: {
        labels: ['Abstengo', 'Acme Co.', 'Barone', 'Biffco En...', 'Big Kahu...'],
        datasets: [
          {
            label: 'Total leads',
            data: [1000, 600, 300, 800, 900],
            backgroundColor: '#D3D3D3',
            barThickness: 20,
          },
          {
            label: 'Bad leads',
            data: [600, 400, 200, 500, 600],
            backgroundColor: '#4A90E2',
            barThickness: 20,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { x: { stacked: false }, y: { stacked: false, beginAtZero: true } },
      },
    };
  },
  methods: {

     formatCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
    async fetchReportData() {
      try {
        const api = authService.getApi();
        const token = authService.getToken();

        if (!token) {
          console.warn('No token found, redirecting to login');
          this.$router.push('/');
          return;
        }

        const response = await api.get('http://localhost:3000/api/report');
        const { data } = response.data;
        
        this.employeeCount = data.employeeCount;
        this.userCount = data.userCount;
        this.houseCount = data.houseCount;
        this.totalOrder = data.totalOrder;
      } catch (error) {
        console.error('API Error:', error);
        if (error.response?.status === 401) {
          authService.removeToken();
          this.$router.push('/');
        }
      }
    }
  },

 async created() {
    if (!authService.getToken()) {
      this.$router.push('/');
      return;
    }
    await this.fetchReportData();
  }
};
</script>

<style scoped>
/* Style remains unchanged */
.dashboard {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.metrics {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 20px;
}

.metric-card {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
}

.metric-card h3 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.metric-card p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}

.positive { color: #50E3C2; }
.negative { color: #FF6B6B; }

.charts {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.chart-container {
  width: 48%;
  background: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
}

.chart-container h4 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #333;
}

.chart-container p {
  margin: 0 0 10px;
  font-size: 14px;
  color: #666;
}

.chart-container {
  position: relative;
  height: 300px;
}
</style>