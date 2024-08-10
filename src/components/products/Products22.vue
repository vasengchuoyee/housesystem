<template>
    <v-container-fluid>
        <v-row>
            <v-col cols="12" sm="6" class="text-center">
                <div class="myvideos">
                    <video autoplay muted style="width: 100%; height: 100%;">
                        <source src="/myvideo.mp4" type="video/mp4" cover>
                    </video>
                </div><br>

                <h2>ງານອອກແບບອາຄານເຮືອນ,ອອກແບບໂມດິວເຮືອນແມ່ນສິ່ງທ້າທາຍສຳລັບຫຼາຍໆຄົນ,
                    ແຕ່ທາງທີມງານສາມາດຊ່ວຍທ່ານໄດ້ພຽງແຕ່ທ່ານຕິດຕໍ່ຫາພວກເຮົາ.</h2>
            </v-col>
            <v-col v-for="item in products" :key="item.id" cols="12" sm="6" md="4" lg="3">
                <v-card class="borders">
                    <v-hover v-slot="{ isHovering, props }">
                        <router-link to="/prod001">
                            <img class="align-center" style="width: 100%; height: 40%;" :src="item.image" cover
                                @mouseover="hovered = true" @mouseleave="hovered = false" alt="Hover Image">
                        </router-link>
                    </v-hover>
                    <v-containers>
                        <h8>{{ item.name }}</h8>
                        <p class="text-grey">
                            (ເນື້ອທີ່ ຂະໜາດ {{ item.area }}) ຫ້ອງນອນ {{ item.debroom }}, ຫ້ອງນໍ້າ {{ item.toilet }},
                            ຫ້ອງຮັບແຂກ {{ item.classroom }}, ຫ້ອງຄົວ 1 ຫ້ອງ, ສະຖານທີ່ຈອດລົດ 2 ຄັນ.
                        </p>
                        <b class="text-red">Price:{{ item.price }} ₭</b><br>
                        <span class="text-green text-subtitle-2">20 Reviews <v-btn variant="text"
                                :class="fav ? 'text-red' : ''" icon="mdi-heart-outline" @click="fav = !fav"></v-btn></span>
                        <v-rating :model-value="2" size="small" dense color="orange" background-color="orange"
                            hover></v-rating>
                    </v-containers>
                </v-card>
            </v-col>
        </v-row>
    </v-container-fluid>
</template>

<script>
import siglepro from '../siglepro.vue';
export default {
    name: 'Products',
    components: {
        siglepro
    },

    data() {
        return {

            fav: true,
            hovered: false,
            defaultImageSrc: 'path/to/default-image.jpg',
            hoverImageSrc: 'path/to/hover-image.jpg',

            products: [
                {
                    id: 1,
                    name: "Coffee",
                    price: 30000,
                    image: "0001.jpg",
                    area: "20x20",
                    debroom: 2,
                    toilet: 2,
                    classroom: 3,
                    active: false,
                },
                {
                    id: 2,
                    name: "Green coffee",
                    price: 40000,
                    image: "0002.jpg",
                    area: "20x20",
                    debroom: 2,
                    toilet: 2,
                    classroom: 3,
                    active: false,
                },
                {
                    id: 3,
                    name: "Orangejuie",
                    price: 25000,
                    image: "0003.jpg",
                    area: "20x20",
                    debroom: 2,
                    toilet: 2,
                    classroom: 3,
                    active: false,
                },
                {
                    id: 4,
                    name: "Orangejuie",
                    price: 25000,
                    image: "0003.jpg",
                    area: "20x20",
                    debroom: 2,
                    toilet: 2,
                    classroom: 3,
                    active: false,
                },
                {
                    id: 5,
                    name: "Orangejuie",
                    price: 25000,
                    image: "0003.jpg",
                    area: "20x20",
                    debroom: 2,
                    toilet: 2,
                    classroom: 3,
                    active: false,
                },
                {
                    id: 6,
                    name: "Orangejuie",
                    price: 25000,
                    image: "0003.jpg",
                    active: false,
                },
                {
                    id: 7,
                    name: "Orangejuie",
                    price: 25000,
                    image: "0003.jpg",
                    active: false,
                },
                {
                    id: 8,
                    name: "Orangejuie",
                    price: 25000,
                    image: "0003.jpg",
                    active: false,
                },
            ]
        }
    },

    mothods: {
        chages: function () {
            this.chages = true
        }
    }
}
</script>

<style scoped>
.borders {
    width: 300px;
    height: 350px;
    text-align: start;
    border-radius: 20px 20px;
    border: 0.5px;
    padding: 10px;
    box-shadow: 0px 2px 2px #888888;
    background-color: #f1f1f1;
    font-family: 'Noto Sans Lao', sans-serif;
    margin: 0px;
    margin-left: 38px;
    justify-content: center;
}
</style>