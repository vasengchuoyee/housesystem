<template>
    <div>
        <v-hover v-slot="{ isHovering, props }">
            <v-card class="mx-auto" color="grey-lighten-4" max-width="400" v-bind="props">
                <v-img :aspect-ratio="16 / 9" cover src="0001.jpg">
                    <v-expand-transition>
                        <div v-if="isHovering"
                            class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                            style="height: 40%;">
                            $14.99
                            <br>
                            <v-btn class="bg-green"
                                href="https://api.whatsapp.com/send?phone=2028742080&text= [ສະບາຍດີ.!! ພວກເຮົາມີຄຳປຶກສາກ່ຽວກັບເຮືອນ ຢາກໃຫ້ທ່ານຊ່ວຍປຶກສາ] ">contact
                                us</v-btn>
                        </div>
                    </v-expand-transition>
                </v-img>

                <v-card-text class="pt-6">
                    <h8 class="text-red">THE BEST SELLER</h8><br>

                    <h10> examples name </h10>
                    <router-link to="/prod001">
                        <v-btn class="bg-orange">see more info</v-btn>
                    </router-link>

                    <v-containers class="style">
                        <p class="text-grey">(ເນື້ອທີ່ ຂະໜາດ 40x30) ຫ້ອງນອນ 4, ຫ້ອງນໍ້າ 4, ຫ້ອງຮັບແຂກ 1, ຫ້ອງຄົວ 2 ຫ້ອງ,
                            ສະຖານທີ່ຈອດລົດ 6 ຄັນ.</p>

                        <b class="text-">Price:$14.99 </b><br>
                        <span class="text-blue text-subtitle-2">30 Reviews <v-btn variant="text"
                                :class="fav ? 'text-primary' : ''" icon="mdi-heart" @click="fav = !fav"></v-btn></span>
                        <v-col cols="2" sm="1">
                            <v-rating :model-value="4" dense color="orange" background-color="orange" hover></v-rating>
                        </v-col>
                    </v-containers>
                </v-card-text>
            </v-card>
        </v-hover>
    </div>
</template>

<script>
export default {
    name: 'admins',
    components: {

    },

    data() {
        return {
            fav: true,

        }
    }
}
</script>
<style>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
}

.bg-green {
    margin-left: 20px;
}
</style>