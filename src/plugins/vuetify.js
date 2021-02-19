import Vue from "vue";
import Vuetify from "vuetify/lib";


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                success: '#388E3C',
                error: '#D32F2F'
            }
        }
    }
});
