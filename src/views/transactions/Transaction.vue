<template>
  <Modal @close-modal="onClose()" label="Transaction Details" size="modal-xl">
    <div class="grid grid-cols-2 gap-2">
      <span>Transaction ID:</span>
      <span class="font-semibold">
        {{ transaction_details && transaction_details.transaction_id }}
      </span>
      <span>Type:</span>
      <span class="font-semibold">
        {{ transaction_details && transaction_details.type }}
      </span>
      <span>Price:</span>
      <span class="font-semibold">
        {{ transaction_details && transaction_details.price }}
      </span>
      <span>Status:</span>
      <span class="font-semibold uppercase">
        {{ transaction_details && transaction_details.status }}
      </span>
    </div>
    <div class="border border-black mt-5 py-2 px-3 bg-blue-100">
      <span class="font-semibold">Payment Details</span>
      <div class="grid grid-cols-2 gap-2 my-1 px-3">
        <span>Gcash Name:</span>
        <span class="font-semibold"> Harvey Aya-ay </span>
        <span>Gcash Number:</span>
        <span class="font-semibold"> 09511084232 </span>
        <span>Payment Reference Number:</span>
        <span class="font-semibold"> 4223 3213 0008 3144 </span>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "../../components/layout/Modal.vue";
import Textbox from "../../components/layout/Textbox.vue";
import Dropdown from "../../components/layout/Dropdown.vue";
export default {
  name: "Transaction",
  components: {
    Modal,
    Textbox,
    Dropdown,
  },
  props: {
    label: String,
    transaction_details: Object,
  },
  data() {
    return {
      roles: [],
    };
  },
  methods: {
    onClose() {
      this.$emit("close-form");
    },
  },
};
</script>
