<script setup lang = "ts">
</script>

<template lang="">
  <div class="item-description">
    <h1 class="item-name">
      <slot name="item-name" />
    </h1>

    <h3 class="owner-name">
      <slot name="owner-name" />
    </h3>

    <p class="description">
      <slot name="description" />
    </p>

    <div class="sizing">
      <h3>SIZING</h3>
      <h3><slot name="sizing" /></h3>
    </div>

    <div class="table">
      <table>
        <tr>
          <th><p>Chest</p></th>
          <th><p><slot name="chest-size" /></p></th>
          <th><p>Neck</p></th>
          <th><p><slot name="neck-size" /></p></th>
        </tr>
        <tr>
          <th><p>Waist</p></th>
          <th><p><slot name="waist-size" /></p></th>
          <th><p>Arm Length</p></th>
          <th><p><slot name="arm-size" /></p></th>
        </tr>
      </table>
    </div>
  </div>
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">
.item-description {
    display: flex;
    flex-direction: column;
    color: $clr-secondary;
    margin-top: 1.5em;
    width: auto;
    .item-name, .owner-name, .description {
        margin-block: 0.25em;
    }

    .sizing {
        display: flex;
        flex-direction: row;
        margin-top: 1em;
        gap: 0.5em;
    }

    table {
        border: 1px solid;
        border-collapse: collapse;
        margin-bottom: 1em;

        th {
            border: 1px solid;
            padding-inline: 1.49em;
            padding-block: 0.25em;
            text-align: left;

            p {
                margin: auto;
            }
        }
    }

    @include media (tablet) {
        margin-top: 0%;
    }
}

</style>
