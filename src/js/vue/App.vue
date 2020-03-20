<template>
    <div>
        <p>Hi, my name is {{name}}!</p>
        <HelloWorld message="Hello there!"/>
    </div>
</template>

<script>
  import HelloWorld from "./HelloWorld";

  export default {
    name: 'App',
    components: {
      HelloWorld
    },
    data() {
      return {
        name: 'Nikita'
      }
    }
  }
</script>