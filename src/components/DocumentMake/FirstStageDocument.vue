<template>
  <div>
    <h4>stage 1</h4>
    <title-field/>
    <type-field />
    <button @click="go()">Ok</button>
  </div>
</template>

<script>
import TitleField from "@/components/DocumentMake/Fields/TitleField";
import TypeField from "@/components/DocumentMake/Fields/TypeField";
export default {
  name: "DocumentType",
  components: {TypeField, TitleField}
}
</script>

<style scoped>

</style>