<template>
  <div>
    <h4>stage 1</h4>
    <title-field/>
    <type-field />
    <button @click="$emit('next')">Ok</button>
  </div>
</template>

<script>
import TitleField from "@/components/DocumentMake/Fields/TitleField";
import TypeField from "@/components/DocumentMake/Fields/TypeField";
export default {
  emits:['next'],
  name: "DocumentType",
  components: {TypeField, TitleField}
}
</script>

<style scoped>

</style>