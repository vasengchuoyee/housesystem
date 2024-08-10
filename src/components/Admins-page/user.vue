<template>
  <v-card class="mt-10">
    <v-div>
      <v-btn color="green">Add new</v-btn>
    </v-div>
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
            Phone
          </th>
          <th class="text-left">
            date
          </th>
          <th class="text-left">
            order-price
          </th>
          <th class="text-left">
            orther
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.adress }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.calories }}</td>
          <td><v-btn color="red">Edit</v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          adress: 'Luangphabang',
          phone: '02077777777',
          date: '05.02.2024',
          calories: '150000',
        },
        {
          name: 'Frozen Yogurt',
          adress: 'Luangphabang',
          phone: '02077777777',
          date: '05.02.2024',
          calories: '150000',
        },
        {
          name: 'Frozen Yogurt',
          adress: 'Luangphabang',
          phone: '02077777777',
          date: '05.02.2024',
          calories: '150000',
        },
        {
          name: 'Frozen Yogurt',
          adress: 'Luangphabang',
          phone: '02077777777',
          date: '05.02.2024',
          calories: '150000',
        },
      ],
    }
  },
}
</script>