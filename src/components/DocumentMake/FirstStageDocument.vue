<template>
  <div>
    <title-field/>
    <type-field />
    <div style="clear: both">
      <button @click="$emit('next')">Ok</button>
    </div>
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