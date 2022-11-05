<template>
  <Header :component_name="$route.name" />
  <div class="w-full">
    <Body>
      <Transaction
        @close-form="closeModal()"
        v-show="showModal"
        :transaction_details="transaction_details"
      />
      <Table label="Transaction Information">
        <TableHead>
          <TableData v-for="tableLabel in tableLabels">{{
            tableLabel
          }}</TableData>
        </TableHead>
        <TableBody v-for="transaction in transactions">
          <!-- loop -->
          <tr
            class="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition"
          >
            <TableData>{{ transaction.transaction_id }}</TableData>
            <TableData>{{ transaction.type }}</TableData>
            <TableData>{{ transaction.price }}</TableData>
            <TableData class="uppercase">{{ transaction.status }}</TableData>
            <TableData>{{ transaction.date_purchased }}</TableData>
            <TableData>
              <button @click="viewTransaction(transaction.id)">
                <i class="fa-solid fa-eye text-blue-900 cursor-pointer"></i>
              </button>
            </TableData>
          </tr>
          <!-- endloop -->
        </TableBody>
      </Table>
    </Body>
  </div>
</template>

<script>
import Header from "../../components/layout/Header.vue";
import Body from "../../components/layout/Body.vue";
import Transaction from "./Transaction.vue";
import Table from "../../components/layout/table/Table.vue";
import TableHead from "../../components/layout/table/TableHead.vue";
import TableBody from "../../components/layout/table/TableBody.vue";
import TableData from "../../components/layout/table/TableData.vue";
export default {
  name: "Transactions",
  components: {
    Header,
    Body,
    Transaction,
    Table,
    TableHead,
    TableBody,
    TableData,
  },
  data() {
    return {
      showModal: false,
      transaction_details: [],
      tableLabels: [
        "Transaction Number",
        "Type",
        "Price",
        "Status",
        "Date Purchased",
        "Actions",
      ],
      transactions: [
        {
          id: 1,
          transaction_id: "TRS-0001",
          date_purchased: "September 19, 2022",
          type: "VIP",
          price: 11500,
          status: "paid",
        },
        {
          id: 2,
          transaction_id: "TRS-0002",
          date_purchased: "September 19, 2022",
          type: "PREMIUM",
          price: 7500,
          status: "used",
        },
        {
          id: 3,
          transaction_id: "TRS-0003",
          date_purchased: "September 19, 2022",
          type: "VIP",
          price: 11500,
          status: "paid",
        },
      ],
    };
  },
  methods: {
    viewTransaction(id) {
      this.transaction_details = this.transactions.find((x) => x.id === id);
      this.showModal = !this.showModal;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
