<template>
  <div>
    <v-col cols="12" sm="8">
      <h1 class="mt-8">Send your message</h1>
      <v-divider></v-divider>
      <span class="text-caption"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt fugiat
        officia, odio eaque exercitationem libero nesciunt placeat, repellat
        obcaecati sed tenetur! Est labore aliquam amet consequatur
        necessitatibus fugit obcaecati facilis!</span
      >

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
        class="mx-auto"
        style="width: 600px"
      ></v-textarea>
      <v-btn color="#4b0f89" class="mt-2" @click="conCat(message)"
        >Send message</v-btn
      >
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
    conCat(message) {
      if (confirm("Your message will send to the Admin ")) {
        try {
          let Str = `Name: ${this.message1} \n Message: ${this.message}`;
          let link = "";
          link = "http://web";
          // link += this.isMobile() ? "api" : "web";
          link +=
            ".whatsapp.com/send?phone=" +
            "856" +
            "2028742080" +
            "&text=" +
            encodeURI(Str);
          window.open(link);
        } catch (error) {
          console.log(error);
        }
      } else {
        $router.push("/");
      }
    },
  },
};
</script>

<style></style>
