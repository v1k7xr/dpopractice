<template>
  <div class="t-container">
       <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="text-center">
                                <img alt="Bootstrap Image Preview" :src=updated.photoURL width="200" height="255"/>
                              </div>
                            
                            <h3 class="text-center">
                                {{ updated.profession }}
                            </h3> 
                            <address>
                                <br /> Город: {{updated.city}}<br /> <abbr title="Phone">Телефон:</abbr> {{ updated.phone }} <br>
                                <abbr title="Email">Email:</abbr> {{updated.email}}
                            </address>
                        </div>
                        <div class="col-md-6">
                            <h3 class="text-center">
                                {{ updated.fullname}}
                            </h3>
                            <!-- <h3 class="text-center">
                                h3. Lorem ipsum dolor sit amet.
                            </h3> -->
                        </div>
                    </div>
                    <dl>
                        <dt>
                            Дата рождения:
                        </dt>
                        <dd>
                            {{ updated.birthdayData }}
                        </dd>
                        <dt>
                            Образование:
                            <div class="form-row-loop" v-for="(educationdata, index) in updated.educationList" :key="index">
                                <p> ВО №{{ index + 1}} </p>
                                <p> Институт: {{ educationdata.educInstit }} </p>
                                <p> Факультет: {{ educationdata.faculty }} </p>
                                <p> Специальность: {{ educationdata.specialization }} </p>
                                <p> Год получения: {{ educationdata.endingYear }} </p> 
                            </div> <br>
                        </dt>
                        <dd>
                            {{ updated.education }}
                        </dd>
                        <dt>
                            Желаемая зарплата:
                        </dt>
                        <dd>
                            {{ updated.salary }}
                        </dd>
                        <dt>
                            Ключевые навыки:
                        </dt>
                        <dd>
                            {{ updated.keySkils }}
                        </dd>
                    </dl>
                    <h3>
                        О себе:
                    </h3>
                    <p  style="white-space: pre-line;">
                        {{ updated.about }}
                    </p>
                </div>
  </div>
</template>

<script>

export default {
  name: 'TemplateComponent',
  props: {
    msg: String
  },

  data () {
      return {
           educationList : [],
      }
  },

  computed: {
      updated() {

          console.log(this.$store.state.educationInstitutionList);

          return {
            profession : this.$store.state.profession,
            city : this.$store.state.city,
            fullname : this.$store.state.fullname,
            photoURL : this.$store.state.photoURL,
            phone : this.$store.state.phone,
            email : this.$store.state.email,
            birthdayData : this.$store.state.birthdayData,
            education : this.$store.state.education,
            salary : this.$store.state.salary,
            keySkils : this.$store.state.keySkils,
            about : this.$store.state.about,
            educationList : this.$store.state.educationInstitutionList,
            };

      }
  }
}
</script>

