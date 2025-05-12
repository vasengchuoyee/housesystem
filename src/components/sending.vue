<template>
  <div>
    <v-col cols="12" sm="8">
      <h1 class="mt-8 text-sm" cols="12" sm="2" md="6" sx="2">Send your message</h1>
      <v-divider></v-divider>
      <span class="text-caption">
        ພວກເຮົາຍິນດີຕອນຮັບທຸກໆທ່ານທີ່ຕິດຕໍ່ເຂົ້າມາ
      </span>

      <v-row class="mt-10">
        <v-col cols="12" sm="6">
          <v-text-field
            label="Name"
            persistent-hint
            variant="outlined"
            v-model="message1"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-textarea
        label="Message"
        persistent-hint
        variant="outlined"
        v-model="message"
      ></v-textarea>
      <v-btn color="#4b0f89" class="mt-2" @click="conCat(message)"
        >Send message</v-btn>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      message1: "",
    };
  },
  methods: {
    conCat() {
      // Check if name or message is empty
      if (!this.message1 || !this.message) {
        alert("Please enter name or message.!");
        return;
      }

      if (confirm("Your message will be sent to the Admin")) {
        try {
          let Str = `Name: ${this.message1} \n Message: ${this.message}`;
          let link = "http://web";
          link += ".whatsapp.com/send?phone=8562028742080&text=" + encodeURI(Str);
          window.open(link);
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
