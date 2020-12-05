<template>
  <div class="home">

    <section class="frame" id="intro">
      <h1 class="section-heading">Organisation</h1>
      <div class="section-content">
        content
      </div>
    </section>

    <section class="frame" id="simple">
      <h1 class="section-heading">Simple</h1>
      <div class="section-content">
        content
      </div>
      <div class="section-content-mid">
        content
      </div>
    </section>

    <section class="frame" id="powerful">
      <h1 class="section-heading">Powerful</h1>
      <div class="section-content">
        content
      </div>
    </section>

    <section class="frame" id="dynamic">
      <h1 class="section-heading">Dynamic</h1>
      <div class="section-content">
        content
      </div>
    </section>

  </div>

</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="scss">

.home{
  z-index: 2;
}

.frame{
  width: 100%;
  height: 100vh;
  background-color: #42b983;
}

#intro{
  background: rgb(83,160,232);
  background: linear-gradient(205deg, rgba(83,160,232,1) 49.6%, rgba(0,0,0,0.5) 50%, rgba(255,255,255,1) 50%);

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  padding-top: 10vh;

  .section-heading{
    color: white;
    grid-area: 1 / 3 / 2 / 4;
  }
  .section-content{
    grid-area: 2 / 1 / 5 / 3;
    border: solid black 1px; // debug
    margin: 0vh 5vw;
  }
}

#simple{
  background: rgb(83,160,232);
  background: linear-gradient(350deg, rgba(83,160,232,1) 39.6%, rgba(0,0,0,0.5) 40%, rgba(255,255,255,1) 40%);

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  padding-top: 10vh;

  .section-heading{
    color: white;
    grid-area: 4 / 3 / 5 / 4;
  }
  .section-content{
    grid-area: 1 / 1 / 3 / 4;
    border: solid black 1px; // debug
    margin: 0vh 5vw;
  }
  .section-content-mid{
    grid-area: 5 / 1 / 5 / 4;
    margin: 0vh 5vw;
    border: black solid 1px;
  }
}

#powerful{
  background: rgb(83,160,232);
  background: linear-gradient(180deg, rgba(83,160,232,1) 9.6%, rgba(0,0,0,0.5) 10%, rgba(255,255,255,1) 10%);

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  padding-top: 10vh;

  .section-heading{
    color: black;
    grid-area: 2 / 2 / 3 / 3;
  }
  .section-content{
    grid-area: 3 / 1 / 5 / 4;
    border: solid black 1px; // debug
    margin: 0vh 5vw;
  }
}

#dynamic{
  background: rgb(255,255,255);
  background: linear-gradient(10deg, rgba(255,255,255,1) 56.8%, rgba(0,0,0,0.5) 56%, rgba(83,160,232,1) 57%, rgba(83,160,232,1) 70.7%, rgba(0,0,0,0.5) 71%, rgba(255,255,255,1) 70.9%);

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  padding-top: 10vh;

  .section-heading{
    color: black;
    grid-area: 5 / 1 / 6 / 4;
    border: solid black 1px; // debug

  }
  .section-content{
    grid-area: 1 / 1 / 4 / 4;
    border: solid black 1px; // debug
    margin: 0vh 5vw;
  }
}



</style>