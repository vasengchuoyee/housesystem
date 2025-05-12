<template>
  <div id="app" class="container">
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>UserName</th>
          <th>Title</th>
          <th>Price</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.id">
          <td>{{ index + 1 }}</td>
          <td>{{ order.user_tb ? `${order.user_tb.firstName} ${order.user_tb.lastName}` : 'N/A' }}</td>
          <td>{{ order.house_tb ? order.house_tb.name : 'N/A' }}</td>
          <td>₭{{ order.house_tb ? order.house_tb.sale_price.toLocaleString() : 'N/A' }}</td>
          <td>
            <span :class="getStatusClass(order.status)">
              {{ order.status }}
            </span>
          </td>
          <td>
            <button 
              v-if="order.status === 'pending'"
              class="reject-btn" 
              @click="rejectOrder(order.id)"
            >
              Reject
            </button>
            <button 
              v-if="order.status === 'pending'"
              class="confirm-btn" 
              @click="confirmOrder(order.id)"
            >
              Confirm
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Loading and Error States -->
    <div v-if="loading" class="loading">
      Loading orders...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      loading: false,
      error: null
    };
  },
  
  created() {
    this.fetchOrders();
  },

  methods: {
    getStatusClass(status) {
      return {
        'status-pending': status === 'pending',
        'status-confirmed': status === 'confirmed',
        'status-rejected': status === 'rejected'
      }
    },

    async fetchOrders() {
      this.loading = true;
      this.error = null;
      
      try {
        const token = localStorage.getItem('token');
        
        // Check if token exists
        if (!token) {
          this.error = 'Not authenticated. Please login again.';
          return;
        }

        const response = await axios.get('http://localhost:3000/api/order', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.data) {
          this.orders = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        if (error.response) {
          // Handle specific error cases
          switch (error.response.status) {
            case 401:
              this.error = 'Session expired. Please login again.';
              localStorage.removeItem('token'); // Clear invalid token
              break;
            case 403:
              this.error = 'You do not have permission to view orders.';
              break;
            default:
              this.error = 'Failed to load orders. Please try again later.';
          }
        } else {
          this.error = 'Network error. Please check your connection.';
        }
      } finally {
        this.loading = false;
      }
    },

    async confirmOrder(orderId) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:3000/api/order/approved-rejected/${orderId}`,
          { status: "approved" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Update the local order status directly
        const orderIndex = this.orders.findIndex(
          (order) => order.id === orderId
        );
        if (orderIndex !== -1) {
          this.orders[orderIndex].status = "approved"; 
        }

        this.$emit("order-status-updated");
        alert("Order approved successfully!");
      } catch (error) {
        console.error("Error approving order:", error);
        alert("Failed to approve order. Please try again.");
      }
    },

    async rejectOrder(orderId) {
      if (confirm("Are you sure you want to reject this order?")) {
        try {
          const token = localStorage.getItem("token");
          await axios.put(
            `http://localhost:3000/api/order/approved-rejected/${orderId}`,
            { status: "rejected" },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          // Update the local order status directly
          const orderIndex = this.orders.findIndex(
            (order) => order.id === orderId
          );
          if (orderIndex !== -1) {
            this.orders[orderIndex].status = "rejected"; 
          }

          this.$emit("order-status-updated");
          alert("Order rejected successfully!");
        } catch (error) {
          console.error("Error rejecting order:", error);
          alert("Failed to reject order. Please try again.");
        }
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.create-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
th {
  background-color: #f4f4f4;
}
.confirm-btn {
  background-color: #f9a704;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 10px;
}
.reject-btn {
  background-color: #fb5263;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  text-align: center;
  padding: 20px;
  color: #dc3545;
  background-color: #f8d7da;
  border-radius: 5px;
  margin: 10px 0;
}

.status-pending {
  color: #f9a704;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(249, 167, 4, 0.1);
}

.status-confirmed {
  color: #28a745;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(40, 167, 69, 0.1);
}

.status-rejected {
  color: #dc3545;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(220, 53, 69, 0.1);
}
</style>
