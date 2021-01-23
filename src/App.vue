<template>
<div class="container-fluid">
	<div class="row">
		<div class="col-md-6">
      <InputComponent/>
		</div>
		<div class="col-md-6">
       <TemplateComponent/>
		</div>
	</div>
</div>
</template>

<script>
import InputComponent from './components/InputComponent.vue'
import TemplateComponent from './components/TemplateComponent.vue'

export default {
  name: 'App',
  components: {
    InputComponent,
    TemplateComponent
  }
}
</script>
