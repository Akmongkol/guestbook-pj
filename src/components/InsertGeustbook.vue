<script setup>
import { reactive, ref, computed } from "vue"
import { useDate } from "vuetify"
import Swal from 'sweetalert2'

const formreset = ref()
const e1 = ref(1)
const station = ref(null)
const checkdate = ref(null)
const signature1 = ref(null)
const imageData = ref(null)
const persons = ref([])
const dialog = ref(false)
const project = ref('')
const suggest = ref('')
const signame = ref('')
const sigpositon = ref('')
// ฟังก์ชัน format รูปแบบเวลา
const date = useDate()
const state = reactive({
  count: 0,
  option: {
    penColor: "blue",
    backgroundColor: "rgb(255,255,255)",
  },
  disabled: false,
})
//เพิ่ม input ผู้ตรวจเยี่ยม
const addpersons = () => {
  persons.value.push({ name: "", position: "" });
}
//ลบ input ผู้ตรวจเยี่ยม
const removepersons = (index) => {
  persons.value.splice(index, 1);
}

//ลบลายเซ้นต์
const clear = () => {
  signature1.value.clear();
}

//ตรวจสอบข้อมูลสมุดตรวจเยี่ยม
const check = (t) => {
  dialog.value = true
  imageData.value = signature1.value.save(t)
}

//บันทึกข้อมูลสมุดตรวจเยี่ยม
const savebook = (t) => {
  dialog.value = false
  Swal.fire({
    title: "ต้องการบันทึกข้อมูลหรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "บันทึกข้อมูล",
    cancelButtonText: "ยกเลิก"
  }).then((result) => {
    if (result.isConfirmed) {
      const form = persons.value.map((field, index) => ({
        visitor: {
          name: field.name,
          position: field.position,
          key: index,
        }
      }));
      const keyborddate = date.format(checkdate.value, "keyboardDate")
      console.log(form, keyborddate, signature1.value.save(t))
      Swal.fire({
        title: "บันทึกข้อมูลเรียบร้อย!",
        icon: "success"
      })
      signature1.value.clear();
      formreset.value.reset()
      persons.value.length = 0;
    }
  })
}

// ฟังก์ชัน resize pad ลายเซ็นต์
const width = ref("700px")
const height = ref("200px")
const responsive = () => {
  if (window.innerWidth <= 600) {
    width.value = "100%"
    height.value = "200px"
  } else if (window.innerWidth <= 900) {
    width.value = "80%"
    height.value = "180px"
  } else {
    width.value = "700px"
    height.value = "200px"
  }
}
window.addEventListener("resize", responsive)

// check stepper 1
/*const validstepone = computed(() => {
  return station.value //&& checkdate.value
})*/

</script>

<script>
import { VDateInput } from "vuetify/labs/VDateInput"
export default {
  components: {
    VDateInput,
  },
}
</script>

<template>
  <!-- v-window -->
  <v-window v-model="e1">
    <v-window-item :value="1">
      <!-- สถานีและวันที่ตรวจ -->
      <div class="pa-5 mx-auto">
        <v-form ref="formreset">
          <div class="text-h6 font-weight-medium">สถานีและวันที่ตรวจ</div>
          <v-text-field v-model="station" label="ระบุสถานี*" variant="underlined" :disabled="true"
            menu-icon=""></v-text-field>
          <v-text-field v-model="checkdate" label="ระบุวันที่ตรวจ*" prepend-icon="" append-inner-icon="$calendar"
            variant="underlined" :disabled="true"></v-text-field>
          <!-- งาน/โครงการที่ตรวจ คำแนะนำหรือข้อสั่งการของผู้ตรวจ -->
          <div class="text-h6 font-weight-medium mb-3">
            งาน/โครงการที่ตรวจ คำแนะนำหรือข้อสั่งการของผู้ตรวจ
          </div>
          <v-textarea label="งาน/โครงการที่ตรวจของผู้ตรวจ" v-model="project"></v-textarea>
          <v-textarea label="คำแนะนำหรือการสั่งการของผู้ตรวจ" v-model="suggest"></v-textarea>
          <div class="text-h6 font-weight-medium mb-3">ผู้ลงนาม</div>
          <v-row>
            <v-col cols="12" md="6"><v-text-field label="ชื่อ-นามสกุล" v-model="signame"></v-text-field></v-col>
            <v-col cols="12" md="6"><v-text-field label="ตำแหน่ง" v-model="sigpositon"></v-text-field></v-col>
          </v-row>
          <div class="text-h6 font-weight-medium mr-2">ผู้ตรวจเยียม</div>
          <v-btn class="mb-3" color="green-lighten-1" prepend-icon="mdi-plus" @click="addpersons"
            block>เพิ่มผู้ตรวจเยี่ยม</v-btn>
          <div v-for="(field, index) in persons" :key="index">
            <div class="d-flex justify-start">
              <v-text-field class="mr-5" v-model="field.name" label="ชื่อ-นามสกุล"></v-text-field>
              <v-text-field class="mr-1" v-model="field.position" label="ตำแหน่ง"></v-text-field>
              <v-btn icon="mdi-delete" variant="text" size="large" @click="removepersons"></v-btn>
            </div>
          </div>
        </v-form>
      </div>
      <!-- end วันและสถานที่ตรวจ && งาน/โครงการที่ตรวจ คำแนะนำหรือข้อสั่งการของผู้ตรวจ -->
    </v-window-item>
    <v-window-item :value="2">
      <!-- ลายเซ็นต์ผู้ลงนาม -->
      <div class="pa-5">
        <div class="text-h6 font-weight-medium mr-2">ลายเซ็นต์ผู้ลงนาม</div>
        <Vue3Signature ref="signature1" :sigOption="state.option" :w="width" :h="height" :disabled="state.disabled"
          class="signature mb-3"></Vue3Signature>
        <div class="d-flex justify-center mb-4">
          <v-btn color="primary" @click="clear">ลบ</v-btn>
        </div>
      </div>
      <!-- end ลายเซ็นต์ผู้ลงนาม -->
    </v-window-item>
  </v-window>
  <!-- end v-window -->


  <!-- bottom-navigation step 1 -->
  <div v-if="e1 == 1">
    <v-bottom-navigation class="rounded-t-xl" height="70" grow>
      <v-row>
        <v-col cols="3">
          <v-btn class="mt-3 ml-3" height="50" width="90%" variant="outlined" border="grey sm" rounded="lg"> <v-icon
              icon="mdi-arrow-left" size="x-large"></v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn class="next-button mt-3 ml-n1" height="50" width="96%" variant="outlined" rounded="lg" @click="e1 = 2">
            <div class="d-flex">
              <div class="mt-1">ขั้นตอนถัดไป</div><v-icon icon="mdi-arrow-right" end></v-icon>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </v-bottom-navigation>
  </div>
  <!-- end bottom-navigation step 1 -->

  <!-- bottom-navigation step 2 -->
  <div v-else>
    <v-bottom-navigation class="rounded-t-xl" height="70" grow>
      <v-row>
        <v-col cols="3">
          <v-btn @click="e1 = 1" class="mt-3 ml-3" height="50" width="90%" variant="outlined" border="grey sm"
            rounded="lg"> <v-icon icon="mdi-arrow-left" size="x-large"></v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn class="check-button mt-3 ml-n1" height="50" width="96%" rounded="lg" @click="check('image/jpeg')">
            <div class="d-flex">
              <v-icon icon="mdi-content-save-check-outline" start></v-icon>
              <div class="mt-1">ตรวจสอบข้อมูล</div>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </v-bottom-navigation>
    <!-- end bottom-navigation step 2 -->
  </div>
  <!-- end v-stepper -->

  <!-- dialog checkform -->
  <div class="pa-4">
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card>
        <v-card-item>
          <v-card-title class="text-center">
            ตรวจสอบข้อมูล
          </v-card-title>
        </v-card-item>
        <v-card-text>
          <div>งาน/โครงการที่ตรวจของผู้ตรวจ</div>
          <div>- {{ project }}</div>
          <div>คำแนะนำหรือการสั่งการของผู้ตรวจ</div>
          <div>- {{ suggest }}</div>
          <div>ผู้ลงนาม</div>
          <div>- ชื่อ {{ signame }} ตำแหน่ง {{ sigpositon }}</div>
          <div>ลายเซ็นต์ผู้ลงนาม</div>
          <div class="d-flex justify-center">
            <v-img :width="200" :src="imageData" alt="signatureImaage"></v-img>
          </div>
        </v-card-text>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn @click="savebook('image/jpeg')">
            บันทึกข้อมูล
          </v-btn>
          <v-btn @click="dialog = false">
            ยกเลิก
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
  <!-- end dialog checkform -->
</template>

<style scoped>
.signature {
  margin: 0 auto;
  border-radius: 8px;
  border: 2px solid blue;
}

.check-button,
.next-button {
  background: #4CAF50;
  color: white;
}
</style>
