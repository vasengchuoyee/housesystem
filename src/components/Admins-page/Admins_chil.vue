<template>
  <div class="dashboard">
    <!-- Metric Cards -->
    <div class="metrics">
      <div class="metric-card">
        <h3>{{ totalEmployees }}</h3>
        <p>Total Employees</p>
        
      </div>
      <div class="metric-card">
        <h3>{{ totalUsers }}</h3>
        <p>Total Users</p>
      </div>
      <div class="metric-card">
        <h3>{{ totalHouses }}</h3>
        <p>Total Houses </p>
      </div>
      <div class="metric-card">
        <h3>1.200.000 ₭</h3>
        <p>Price order <span class="positive">+2%</span></p>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts">
      <div class="chart-container">
        <h4>Costs</h4>
        <p>$120,640.50 Total costs</p>
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
import axios from 'axios';

ChartJS.register(...registerables);

export default {
  name: 'Dashboard',
  components: {
    VueDoughnutChart: Doughnut,
    VueBarChart: Bar,
  },
  data() {
    return {
      totalEmployees: 0,
      totalUsers: 0,
      totalHouses: 0,
      filteredData: [],
      costChartData: {
        labels: ['Cost in time frame', 'Cost per application', 'Cost per sale'],
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
    async fetchAllData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.$router.push("/login");
          return;
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        };

        // Fetch employee
        const employeeResponse = await axios.get('http://localhost:3000/api/employee', { headers });
        this.totalEmployees = Array.isArray(employeeResponse.data) ?
        employeeResponse.data.length :
          (employeeResponse.data.data?.length || employeeResponse.data.total || 0);

        // Fetch users
        const usersResponse = await axios.get('http://localhost:3000/api/user', { headers });
        this.totalUsers = Array.isArray(usersResponse.data) ?
          usersResponse.data.length :
          (usersResponse.data.data?.length || usersResponse.data.total || 0);

        // Fetch houses
        const housesResponse = await axios.get('http://localhost:3000/api/house', { headers });
        this.totalHouses = Array.isArray(housesResponse.data) ?
          housesResponse.data.length :
          (housesResponse.data.data?.length || housesResponse.data.total || 0);

        // Note: totalEmployees will be updated via the event from Employees.vue
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        this.totalUsers = 0;
        this.totalHouses = 0;
      }
    },
    updateTotalEmployees(total) {
      this.totalEmployees = total; // Update totalEmployees when event is received
    }
  },
  async mounted() {
    await this.fetchAllData();
  },
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