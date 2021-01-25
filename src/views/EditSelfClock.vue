<template>
<div>
  <EditSession v-if="editSessionDialog" :sessionData=selectedPunch[0] @cancel="editSessionDialog=false" @done="getSessions(); editSessionDialog=false;" />
      <!-- Sessions Table -->
      <div>
        <v-data-table
          class="elevation-1"
          v-model="selectedPunch"
          :headers="headers"
          :items="punchData"
          item-key="id"
          :sortBy="['dateObjIn']"
          :sort-desc="[true]"
          :mobile-breakpoint="0"
          :single-select="true"
          :items-per-page="200"
          height="50vh"
          fixed-header
          dense
          show-select
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title
                >Edit Sessions</v-toolbar-title
              >
              <v-spacer></v-spacer>
<v-btn>sadfasdf</v-btn>
              <!-- Edit Session Button -->
              <div>
                <v-btn
                  :class="
                    !$vuetify.breakpoint.xsOnly == true
                      ? 'mx-4'
                      : 'mx-2'
                  "
                  :disabled="!selectedPunch[0]"
                  color="blue-grey lighten-1"
                  @click="editSessionDialog = true;"
                >
                  {{
                    $vuetify.breakpoint.xsOnly == true
                      ? 'edit'
                      : 'Edit'
                  }}
                </v-btn>
              </div>
              <v-divider
                v-if="!$vuetify.breakpoint.xsOnly"
                class="mx-4"
                inset
                vertical
              ></v-divider>

              <!-- Add Session button -->
              <div>
                <v-dialog
                  v-model="newSessionDialog"
                  persistent
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      class="mx-auto"
                      >{{
                        $vuetify.breakpoint.xsOnly == true
                          ? 'add'
                          : 'new session'
                      }}</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      New Session
                    </v-card-title>
                    <v-card-text>
                            <v-dialog
                              ref="dateDialog"
                              v-model="dateDialog"
                              :return-value.sync="newPunchDate"
                              width="290px"
                            >
                              <template
                                v-slot:activator="{ on, attrs }"
                              >
                                <v-text-field
                                  v-model="newPunchDate"
                                  label="Date of session"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="newPunchDate"
                                @input="
                                  $refs.dateDialog.save(newPunchDate)
                                "
                                no-title
                                scrollable
                                :min="'2020-12-27'" 
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="dateDialog = false"
                                  >Cancel</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
                            <v-dialog
                              ref="timeInDialog"
                              v-model="timeInDialog"
                              :close-on-content-click="false"
                              :return-value.sync="newPunchTimeIn"
                              width="290px"
                              persistent
                            >
                              <template
                                v-slot:activator="{ on, attrs }"
                              >
                                <v-text-field
                                  v-model="newPunchTimeIn"
                                  label="Time in"
                                  prepend-icon="mdi-clock-in"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-time-picker v-model="newPunchTimeIn">
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="timeInDialog = false"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="
                                    $refs.timeInDialog.save(
                                      newPunchTimeIn,
                                    )
                                  "
                                  >OK</v-btn
                                >
                              </v-time-picker>
                            </v-dialog>

                            <v-dialog
                              ref="timeOutDialog"
                              v-model="timeOutDialog"
                              :close-on-content-click="false"
                              :return-value.sync="newPunchTimeOut"
                              width="290px"
                              persistent
                            >
                              <template
                                v-slot:activator="{ on, attrs }"
                              >
                                <v-text-field
                                  :disabled="!newPunchTimeIn"
                                  v-model="newPunchTimeOut"
                                  label="Time out"
                                  prepend-icon="mdi-clock-out"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                :min="newPunchTimeIn"
                                v-model="newPunchTimeOut"
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="timeOutDialog = false"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="
                                    $refs.timeOutDialog.save(
                                      newPunchTimeOut,
                                    )
                                  "
                                  >OK</v-btn
                                >
                              </v-time-picker>
                            </v-dialog>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="newSessionDialog = false"
                        >Close</v-btn
                      >
                      <v-btn
                        :disabled="
                          !newPunchTimeOut ||
                            !newPunchDate ||
                            newPunchTimeOut.localeCompare(
                              newPunchTimeIn,
                            ) < 0
                        "
                        color="blue darken-1"
                        text
                        @click="
                          newSessionDialog = false;
                          makeNewSession();
                        "
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-toolbar>
          </template>

          <!-- Next/Prev Buttons in footer of table -->
          <template v-slot:footer>
            <v-divider></v-divider>
            <v-card tile elevation="0" class="d-flex justify-center">
              <v-card-actions>
                <v-btn
                  @click="prevPayPeriod"
                  :disabled="payPeriodNumber == 0"
                  color="primary"
                  >Previous</v-btn
                >
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-btn
                  @click="nextPayPeriod"
                  :disabled="payPeriodNumber == latestPayPeriod"
                  color="primary"
                  >Next</v-btn
                >
              </v-card-actions>
            </v-card>
          </template>
          <!-- End footer -->
        </v-data-table>
      </div>

      <!-- Amount Earned Card -->
      <div class="d-flex">
        <v-card elevation="2" class="mx-auto mt-4">
          <v-card-subtitle class="black--text">
            <div>Amount Earned: ${{ amountEarned.toFixed(2) }}</div>
            <div>Week 1 Hours: {{ week1HoursWorked.toFixed(2) }}</div>
            <div>Week 2 Hours: {{ week2HoursWorked.toFixed(2) }}</div>
          </v-card-subtitle>
        </v-card>
      </div>
</div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import EditSession from '@/components/EditSession';

export default {
  name: 'EditSelfClock',
  components: {
    EditSession,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    payPeriodEnd() {
      return moment(this.payPeriodBegin)
        .add(2, 'weeks')
        .subtract(1, 'second')
        .toDate();
    },
  },
  data() {
    return {
      newPunchUserID: null,
      newPunchDate: null,
      newPunchTimeIn: null,
      newPunchTimeOut: null,
      dateDialog: false,
      timeInDialog: false,
      timeOutDialog: false,
      newSessionDialog: false,
      editSessionDialog: false,

      originPayPeriodBegin: new Date('December 27, 2020 00:00:00'),
      payPeriodBegin: null,
      payPeriodNumber: 0,
      latestPayPeriod: 0,
      tableLoading: true,
      buttonsLoading: true,

      selectedPunch: [],
      userID: '',
      punchData: [],
      amountEarned: 0,
      week1HoursWorked: 0,
      week2HoursWorked: 0,
      headers: [
        { text: 'In Time', value: 'intime', groupable: false },
        { text: 'Out Time', value: 'outtime', groupable: false },
        { text: 'Date', value: 'date', groupable: false },
      ],
    };
  },
  mounted() {
    this.getCurrentPayPeriod();
  },
  watch: {
    async payPeriodEnd() {
      await this.getSessions();
    },
    async userID() {
      this.getCurrentPayPeriod();
    },
  },
  methods: {
    async getCurrentPayPeriod() {
      this.payPeriodBegin = moment(
        this.originPayPeriodBegin,
      ).toDate();
      let now = moment();
      this.payPeriodNumber = Math.floor(
        moment
          .duration(now.diff(moment(this.originPayPeriodBegin)))
          .asWeeks() / 2,
      );
      this.latestPayPeriod = this.payPeriodNumber;

      this.goToPayPeriod(this.latestPayPeriod);

      this.tableLoading = false;
    },
    nextPayPeriod() {
      this.payPeriodNumber++;
      this.payPeriodBegin = moment(this.originPayPeriodBegin)
        .add(2 * this.payPeriodNumber, 'weeks')
        .toDate();
    },
    prevPayPeriod() {
      this.payPeriodNumber--;
      this.payPeriodBegin = moment(this.originPayPeriodBegin)
        .add(2 * this.payPeriodNumber, 'weeks')
        .toDate();
    },
    goToPayPeriod(goto = this.latestPayPeriod) {
      this.payPeriodNumber = goto;
      this.payPeriodBegin = moment(this.originPayPeriodBegin)
        .add(2 * this.payPeriodNumber, 'weeks')
        .toDate();
    },
    async makeNewSession() {
      let inDateParse = this.newPunchDate.split('-');
      let inTimeParse = this.newPunchTimeIn.split(':');
      let outTimeParse = this.newPunchTimeOut.split(':');
      this.newPunchDate = null;
      this.newPunchTimeIn = null;
      this.newPunchTimeOut = null;
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
      this.$axios.post('account/clock/newSession', {
        inTime,
        outTime,
      }).
      then(() => {this.getSessions();});
    },

async getSessions() {
      let sessions = await this.$axios.get(
        'account/clock/getSessions',
        {
          params: {
            payPeriodBegin: this.payPeriodBegin,
            payPeriodEnd: this.payPeriodEnd,
          },
        },
      );
      this.amountEarned = 0;
      this.week1HoursWorked = 0;
      this.week2HoursWorked = 0;
      this.punchData = [];
      let payPeriodRate = 0;
      let week1End = moment(this.payPeriodBegin).add(7, 'days');
      _.forEach(sessions.data, session => {
        payPeriodRate = session.payrate;
        session.dateObjIn = session.intime;

        session.date = moment(session.intime).format(
          'dddd, MMM Do YYYY',
        );
        if (session.outtime) {
          session.outtime = moment(session.outtime).format(
            'hh:mm:ss A',
          );
          let computedHours = new Date(null);
          computedHours.setSeconds(session.secondsworked); //for display in table
          session.hours = computedHours.toISOString().substr(11, 8);
          if (!moment(session.dateObjIn).isAfter(week1End)) {
            //if in week 1
            this.week1HoursWorked += session.secondsworked / 3600;
          } else {
            this.week2HoursWorked += session.secondsworked / 3600;
          }
        }
        session.intime = moment(session.intime).format('hh:mm:ss A');
      });

      if (this.week1HoursWorked > 45) {
        let hoursAfter45 = this.week1HoursWorked - 45;
        this.amountEarned += payPeriodRate * 45;
        this.amountEarned += hoursAfter45 * (payPeriodRate * 1.5);
      } else {
        this.amountEarned += this.week1HoursWorked * payPeriodRate;
      }
      if (this.week2HoursWorked > 45) {
        let hoursAfter45 = this.week2HoursWorked - 45;
        this.amountEarned += payPeriodRate * 45;
        this.amountEarned += hoursAfter45 * (payPeriodRate * 1.5);
      } else {
        this.amountEarned += this.week2HoursWorked * payPeriodRate;
      }
      this.punchData = sessions.data;
    },
  },
};
</script>
