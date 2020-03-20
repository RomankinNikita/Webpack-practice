<template>
    <div>
        <p class="hello-world">NAME: {{message}}</p>
    </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      message: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello-world {
        font-size: 20px;
        color: brown;
    }
</style>