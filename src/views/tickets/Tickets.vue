<template>
  <Header :component_name="$route.name" />
  <div class="w-full">
    <Body>
      <Table label="Tickets Information">
        <TableHead>
          <TableData v-for="tableLabel in tableLabels">{{
            tableLabel
          }}</TableData>
        </TableHead>
        <TableBody v-for="ticket in tickets">
          <!-- loop -->
          <tr
            class="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition"
          >
            <TableData>{{ ticket.type }}</TableData>
            <TableData>{{ ticket.price }}</TableData>
            <TableData>{{ ticket.quantity }}</TableData>
            <TableData>N/A</TableData>
            <TableData>N/A</TableData>
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
import Table from "../../components/layout/table/Table.vue";
import TableHead from "../../components/layout/table/TableHead.vue";
import TableBody from "../../components/layout/table/TableBody.vue";
import TableData from "../../components/layout/table/TableData.vue";
export default {
  name: "Tickets",
  components: {
    Header,
    Body,
    Table,
    TableHead,
    TableBody,
    TableData,
  },
  data() {
    return {
      showModal: true,
      tableLabels: ["Type", "Price", "Quantity", "Sold", "Remaining"],
      tickets: [
        {
          id: 1,
          type: "VIP",
          price: 11500,
          quantity: 100,
          same_day: false,
        },
        {
          id: 2,
          type: "PREMIUM",
          price: 7500,
          quantity: 250,
          same_day: false,
        },
        {
          id: 3,
          type: "GEN AD",
          price: 3500,
          quantity: 300,
          same_day: false,
        },
      ],
    };
  },
};
</script>
