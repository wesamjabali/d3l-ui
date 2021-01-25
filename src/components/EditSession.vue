<template>
  <div>
      <v-dialog
        v-model="editSessionDialog"
        persistent
        max-width="500px"
      >
      <v-card>
      <v-card-title> Edit Session </v-card-title>
        <!-- In Date Text Area and Dialog -->
        <v-card-text>
            <v-dialog
            ref="inDateDialog"
            v-model="inDateDialog"
            :return-value.sync="newInDate"
            persistent
            width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="newInDate"
                  label="In Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-if="inDateDialog"
                v-model="newInDate"
                width="290px"
                no-title
                scrollable
                :min="'2020-12-27'" 
              >
              <!-- min = origin pay period start date -->
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="inDateDialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.inDateDialog.save(newInDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>

            <!-- In Time Text Area and Dialog -->
            <v-dialog
            ref="inTimeDialog"
            v-model="inTimeDialog"
            :return-value.sync="inTime"
            persistent
            width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="inTime"
                  label="In Time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="inTimeDialog"
                v-model="inTime"
                width="290px"
                :max="this.outTime"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="inTimeDialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.inTimeDialog.save(inTime)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>

            <!-- Out Time Text Area and Dialog -->
            <v-dialog
            ref="outTimeDialog"
            v-model="outTimeDialog"
            :return-value.sync="outTime"
            persistent
            width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="outTime"
                  label="Out Time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="outTimeDialog"
                v-model="outTime"
                width="290px"
                :min="inTime"

              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="outTimeDialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.outTimeDialog.save(outTime)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
        </v-card-text>
          <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text color="red" @click="deleteSession();"> Delete </v-btn>
                  <v-btn text color="primary" @click="$emit('cancel')"> Cancel </v-btn>
                  <v-btn text color="primary" @click="submit();"> Save </v-btn>
          </v-card-actions>
      </v-card>
      </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'EditSession',
  data() {
    return {
      editSessionDialog: true,
      inTimeDialog: false,
      outTimeDialog: false,
      inDateDialog: false,

      inTime: moment(this.sessionData.dateObjIn).toString().substr(16, 5),
      outTime: moment(this.sessionData.dateObjIn).add(this.sessionData.secondsworked, 'seconds').toString().substr(16, 5),
      newInDate: moment(this.sessionData.dateObjIn).format('YYYY-MM-DD')
    };
  },

  props: {
    sessionData: Object,
  },
  methods: {
    async submit() {
      let inDateParse = this.newInDate.split('-');
      let inTimeParse = this.inTime.split(':');
      let outTimeParse = this.outTime.split(':');
      let inTime = new Date(
        inDateParse[0],
        inDateParse[1] - 1,
        inDateParse[2],
        inTimeParse[0],
        inTimeParse[1],
      );
      let outTime = new Date(
        inDateParse[0],
        inDateParse[1] - 1,
        inDateParse[2],
        outTimeParse[0],
        outTimeParse[1],
      );
      let sessionID = this.sessionData.id;
      this.$axios.post('account/clock/editSession', {
        inTime,
        outTime,
        sessionID
      }).then(() => {
        this.$emit('done');
      });
    },
  async deleteSession() {
    this.$axios.post('account/clock/deleteSession', {
      data: {
        punchID: this.sessionData.id 
      }}).then(() => {
        this.$emit('done');
      });
  },
  },
};
</script>

<style></style>
