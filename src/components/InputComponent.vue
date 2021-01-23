<template>
  <div class="container-i">

    <select v-model="vModelStatus">
      <option value=1>Новый</option>
      <option value=2>Назначено собеседование</option>
      <option value=3>Принят</option>
      <option value=4>Отказ</option>
    </select>

    <input class="form-control" type="text" v-model="vModelProfession" placeholder="профессия">
    

     <input type="form-control" placeholder="Город" v-model="vModelCity" list="cities" />

      <datalist id="cities">
        <option v-for="item in cities" :key="item" :value="item" />
      </datalist>

    <input class="form-control" type="text" v-model="vModelPhotoURL" placeholder="Ссылка на картинку">
    <input class="form-control" type="text" v-model="vModelFullname" placeholder="ФИО">
    <input class="form-control" type="text" v-model="vModelPhone" placeholder="Телефон">
    <input class="form-control" type="email" v-model="vModelEmail" placeholder="Email">
    <input class="form-control" type="text" v-model="vModelBirthdayData" placeholder="Дата рождения">
    <input class="form-control" type="text" v-model="vModelEducation" placeholder="Образование">
    <select v-model="selected" @change="emitChange">
      <option disabled value="">Уровень образования</option>
      <option value=1 >Среднее</option>
      <option value=2>Среднее специальное</option>
      <option value=3>Неоконченное высшее</option>
      <option value=4>Высшее</option>
    </select>

    <div v-show="isVisible">

      <div class="education-institution">
        <hr size='3px'>
        <div class="form-row-loop" v-for="(educationdata, index) in vModelEducationList" :key="index">
          <div class="form-group">
            <input list="eductList" placeholder="Учебное заведени" v-model="educationdata.educInstit"  />

            <datalist id="eductList">
              <option v-for="item in eductList" :key="item" :value="item" />
            </datalist>
            <!-- <label>Учебное заведение</label> -->
            <!-- <input v-model="educationdata.educInstit" :name="`vModelEducationList[${index}][educInstit]`" type="text" class="form-control" placeholder="Учебное заведени"> -->
          </div>
          <div class="form-group">
            <label>Факультет</label>
            <input v-model="educationdata.faculty" :name="`vModelEducationList[${index}][faculty]`" type="text" class="form-control" placeholder="Факультет">
          </div>
          <div class="form-group">
            <label>Специализация</label>
            <input v-model="educationdata.specialization" :name="`vModelEducationList[${index}][specialization]`" type="text" class="form-control" placeholder="Специализация">
          </div>
          <div class="form-group">
            <label>Год окончания</label>
            <input v-model="educationdata.endingYear" :name="`vModelEducationList[${index}][endingYear]`" type="text" class="form-control" placeholder="Год окончания">
          </div>
          <button type="button" class="btn btn-default btn-sm" @click="deleteItem(index)">
            <span class="glyphicon glyphicon-remove"></span> Удалить
          </button>
        </div>
        <br>
      </div>
      <div class="form-group">
        <button @click="addEducationalInstitution" type="button" class="btn btn-secondary">Добавить образование</button>
      </div>
    </div>

    <input class="form-control" type="text" v-model="vModelSalary" placeholder="Зарплата">
    <input class="form-control" type="text" v-model="vModelKeySkils" placeholder="Скилы">
    <label for="form-control">О себе</label>
      <textarea class="form-control" v-model="vModelAbout" id="textareaid" rows="5"></textarea>
    <div id="button">
      <button v-on:click="updateResumeTemplate">Применить изменения</button>
    </div>
  </div>
</template>

<script>
import { api_key } from '../store/tokens';


export default {
  name: 'InputComponent',
  props: {
    msg: String
  },

  data () {
    return {
      vModelProfession: '',
      vModelCity: '',
      vModelPhotoURL: '',
      vModelFullname: '',
      vModelPhone: '',
      vModelEmail: '',
      vModelBirthdayData: '',
      vModelEducation: '',
      vModelEducationList: [],
      vModelSalary: '',
      vModelKeySkils: '',
      vModelAbout: '',
      vModelStatus: '',

      cities: [],
      eductList: [],
      cityName: '',

      id : 0,
      listEducationalInstitution : '',
      faculty : '',
      specialization : '',
      endingYear : '',

      selected: '',

      isVisible : false,

      regEmail : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      regPhone : /^[\d]{6,10}$/,
    }
  },

  methods: {
    updateResumeTemplate: function (event) {

      // if(!this.checkCorrectEmail()) {
      //   alert('Incorrect email');
      //   return;
      // }

      // if (!this.checkCorrectPhone()) {
      //   alert('Incorrect phone');
      //   return;
      // }

      console.log(api_key);

      this.$store.state.profession = this.vModelProfession;
      this.$store.state.city = this.vModelCity;
      this.$store.state.photoURL = this.vModelPhotoURL;
      this.$store.state.fullname = this.vModelFullname;
      this.$store.state.phone = this.vModelPhone;
      this.$store.state.email = this.vModelEmail;
      this.$store.state.birthdayData = this.vModelBirthdayData;
      this.$store.state.education = this.vModelEducation;
      this.$store.state.salary = this.vModelSalary;
      this.$store.state.keySkils = this.vModelKeySkils;
      this.$store.state.about = this.vModelAbout;
      this.$store.state.educationInstitutionList = [...this.vModelEducationList];
    },

    checkCorrectEmail : function() {

      if (!this.email) {
        return false;
      } else if (!this.validEmail(this.vModelEmail)) {
        return false;
      }

      return true;
    },

    checkCorrectPhone: function() {

      if (this.vModelPhone == null || this.vModelPhone == '') {
        return false;
      } else if(!this.regPhone.test(this.vModelPhone)) {
        return false;
      }

      return true;

    },

    emitChange(e) {
      if (this.selected == 1) {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    },

    addEducationalInstitution() {

      if (this.vModelCity != this.cityName) {
        this.cityName = this.vModelCity;

        this.eductList = [];

        var value = this.vModelCity;

        var urlGet = `https://api.vk.com/method/database.getUniversities?country_id=1&need_all=0&count=100&v=5.59&q=${value}&access_token=${api_key}`;

        axios
        .get(urlGet)
        .then(response => {

          for (let i = 0; i < response.data.response.items.length; i++) {
            this.eductList.push(response.data.response.items[i]['title']);
          }

        })
      }
      
      this.vModelEducationList.push({
        educInstit: '',
        faculty: '',
        specialization: '',
        endingYear: '',
      })

      console.log(this.vModelEducationList);

    },

    deleteItem(index) {
      this.vModelEducationList.splice(index, 1);
    },

    init() {
      this.vModelStatus = 'Новый';
    }
  },

  watch: {
    vModelCity(value) {

      this.cities = [];

      var urlGet = `https://api.vk.com/method/database.getCities?country_id=1&need_all=0&count=10&v=5.59&q=${value}&access_token=${api_key}`;

      axios
      .get(urlGet)
      .then(response => {

        let tempStrAddress = '';

        for (let i = 0; i < response.data.response.items.length; i++) {

          tempStrAddress = response.data.response.items[i]['title'];

          if (response.data.response.items[i]['area'] != null)
            tempStrAddress += ' ' + response.data.response.items[i]['area'];

          if (response.data.response.items[i]['region'] != null)
            tempStrAddress += ' ' + response.data.response.items[i]['region'];


          this.cities.push(tempStrAddress);
        }

      })
    }
  }, 

  mounted() {
    this.init();
  }
}
</script>

<style>

.form-row-loop {
    border: 4px double black; /* Параметры границы */
    background: rgb(8, 202, 228); /* Цвет фона */
    padding: 10px; /* Поля вокруг текста */
   }

</style>