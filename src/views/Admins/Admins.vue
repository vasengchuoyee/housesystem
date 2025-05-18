<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer class="bg-sidebar">
      <v-list>
        <img src="/iimg.png" alt="Logo" class="image-width" />

        <!-- Main Menu Items -->
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :class="{ 'active-item': selectedTab === item.page }"
          @click="changePage(item.page)"
        >
          <v-list-item-title>
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>

        <!-- Manage All House Dropdown -->
        <v-list-item
          @click="toggleDropdown"
          :class="{ 'active-item': isDropdownActive }"
        >
          <v-list-item-title>
            <v-icon>mdi-home-outline</v-icon>
            ຂໍ້ມູນແບບເຮືອນ
            <v-icon>{{
              isDropdownOpen ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-list-item-title>
        </v-list-item>

        <v-list v-show="isDropdownOpen" class="dropdown-menu">
          <v-list-item
            v-for="dropdownItem in dropdownItems"
            :key="dropdownItem.title"
            :class="{ 'active-item': selectedTab === dropdownItem.page }"
            @click="changePage(dropdownItem.page)"
          >
            <v-list-item-title
              ><v-icon>{{ dropdownItem.icon }}</v-icon
              >{{ dropdownItem.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>

        <!-- Manage Employees Dropdown -->
        <v-list-item
          @click="toggleEmployeeDropdown"
          :class="{ 'active-item': isEmployeeDropdownActive }"
        >
          <v-list-item-title>
            <v-icon>mdi-account</v-icon>
            ຂໍ້ມູນພະນັກງານ
            <v-icon>{{
              isEmployeeDropdownOpen ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-list-item-title>
        </v-list-item>

        <v-list v-show="isEmployeeDropdownOpen" class="dropdown-menu">
          <v-list-item
            v-for="employeeItem in employeeDropdownItems"
            :key="employeeItem.title"
            :class="{ 'active-item': selectedTab === employeeItem.page }"
            @click="changePage(employeeItem.page)"
          >
            <v-list-item-title
              ><v-icon>{{ employeeItem.icon }}</v-icon
              >{{ employeeItem.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-list>
      <div class="version">Version:1.0.0</div>
    </v-navigation-drawer>

    <v-app-bar title="Application bar" class="app-bar">
      <div class="rounded logout-btn" @click="dialog = true">
        <img src="/iimg.png" alt="Admin Icon" class="logouts" />
        <div>
          Admins
          <v-icon>mdi-logout</v-icon>
        </div>
      </div>
    </v-app-bar>

    <v-main class="main-class">
      <v-container class="container">
        <v-row justify="center">
          <v-col cols="12">
            <div v-if="selectedTab === 0"><Admins_chil /></div>
            <div v-if="selectedTab === 1"><House_up /></div>
            <div v-if="selectedTab === 2"><Allhouses /></div>
            <div v-if="selectedTab === 3"><Employees /></div>
            <div v-if="selectedTab === 4"><ManageEmployee /></div>
            <div v-if="selectedTab === 5"><Addcategory /></div>
            <div v-if="selectedTab === 6"><Userlogin /></div>
            <div v-if="selectedTab === 7"><Comfrim /></div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Logout Confirmation Dialog -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card class="text-center">
        <v-card-title class="headline">Confirm Logout</v-card-title>
        <img src="/thinking.jpg" alt="" class="thinkings" />
        <v-card-text>Are you sure you want to log out?</v-card-text>
        <v-card-actions>
          <v-btn color="grey" text @click="dialog = false">NO</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="confirmLogout">YES</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Allhouses from "../../components/Admins-page/Allhouses.vue";
import House_up from "../../components/Admins-page/House_up.vue";
import Admins_chil from "../../components/Admins-page/Admins_chil.vue";
import Addcategory from "../../components/Admins-page/Addcategory.vue";
import Employees from "../../components/Admins-page/Employees.vue";
import ManageEmployee from "../../components/Admins-page/ManageEmployee.vue";
import Userlogin from "../../components/Admins-page/Userlogin.vue";
import Comfrim from "../../components/Admins-page/Comfrim.vue";
import Cookies from "js-cookie";

export default {
  name: "Admins",
  components: {
    Allhouses,
    House_up,
    Admins_chil,
    Addcategory,
    Employees,
    ManageEmployee,
    Userlogin,
    Comfrim,
  },
  data: () => ({
    drawer: false,
    selectedTab: parseInt(localStorage.getItem("selectedTab")) || 0,
    selectedTab: 0,
    isDropdownOpen: false,
    isEmployeeDropdownOpen: false,
    dialog: false,
    menuItems: [
      { title: "Dashboard", icon: "mdi-monitor-multiple", page: 0 },
      { title: "ເພີ່ມປະເພດເຮືອນ", icon: "mdi-buffer", page: 5 },
      { title: "ຢືນຢັນລາຍການ", icon: "mdi-clipboard-text", page: 7 },
    ],
    dropdownItems: [
      { title: "ເພີ່ມລາຍການແບບເຮືອນ", icon: "mdi-home", page: 1 },
      { title: "ຈັດການແບບເຮືອນທັງໝົດ", icon: "mdi-home-assistant", page: 2 },
    ],
    employeeDropdownItems: [
      { title: "ເພີ່ມພະນັກງານ", icon: "mdi-account-plus", page: 3 },
      { title: "ຈັດການພະນັກງານ", icon: "mdi-account-edit", page: 4 },
      { title: "ຜູ້ໃຊ້", icon: "mdi-account-multiple-outline", page: 6 },
    ],
  }),

  computed: {
    isDropdownActive() {
      return this.dropdownItems.some((item) => item.page === this.selectedTab);
    },
    isEmployeeDropdownActive() {
      return this.employeeDropdownItems.some(
        (item) => item.page === this.selectedTab
      );
    },
  },

  created() {
    // Restore the selected tab from localStorage
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab !== null) {
      this.selectedTab = parseInt(savedTab);

      // Auto-open the relevant dropdown based on the selected tab
      if (this.dropdownItems.some((item) => item.page === this.selectedTab)) {
        this.isDropdownOpen = true;
      }
      if (
        this.employeeDropdownItems.some(
          (item) => item.page === this.selectedTab
        )
      ) {
        this.isEmployeeDropdownOpen = true;
      }
    }
  },

  methods: {

    changePage(page) {
      this.selectedTab = page;
      localStorage.setItem("selectedTab", page.toString());
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      // Save dropdown state
      localStorage.setItem("dropdownOpen", this.isDropdownOpen.toString());
    },

    toggleEmployeeDropdown() {
      this.isEmployeeDropdownOpen = !this.isEmployeeDropdownOpen;
      // Save employee dropdown state
      localStorage.setItem(
        "employeeDropdownOpen",
        this.isEmployeeDropdownOpen.toString()
      );
    },

    confirmLogout() {
      Cookies.remove("token");
      localStorage.removeItem("token");
      this.$router.push("/");
      this.dialog = false;
    },
  },
};
</script>
<style scoped>
.image-width {
  width: 60px;
  margin-left: 40px;
}
.app-bar {
  background: linear-gradient(
    to right,
    rgba(244, 193, 9, 0.5),
    rgba(244, 244, 245, 0.5)
  );
}

.bg-sidebar {
  background: #f6bf48;
}
.rounded {
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.logout-btn {
  padding: 8px;
  gap: 8px;
}
.logouts {
  width: 40px;
  height: 40px;
}

/* Dropdown Menu Styling */
.dropdown-menu {
  padding-left: 20px;
}

.main-class {
  background-color: rgb(253, 248, 250);
  height: 95vh;
  margin-bottom: 30px;
  margin-top: 16px;
  /* padding: 20px; */
  overflow-y: auto;
}
.active-item {
  background-color: #ffffff;
  color: #e69f04;
  font-weight: bold;
  border-left: 4px solid #e69f04;
}
.version {
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  color: white;
}
.thinkings {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: auto;
}
</style>
