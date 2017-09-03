import { $, isTouch, query } from '../../node_modules/uikit/src/js/util/index';

function plugin(UIkit) {

    if (plugin.installed) {
        return;
    }

    UIkit.component('datepicker', UIkit.components.drop.extend({

        mixins: [UIkit.mixin.class],

        attrs: true,

        props: {
            weekstart: Number,
            format: String,
            minDate: String,
            maxDate: String
        },

        defaults: {
            mobile: false,
            weekstart: 1,
            format: 'YYYY-MM-DD',
            minDate: false,
            maxDate: false,
            cls: 'uk-active',
            clsDatepicker: false
        },

        init() {
            // use native datepicker on touch devices
            if (this.$el.attr('type') == 'date' && !this.$props.mobile) {
                return;
            }

            this.clsDatepicker = this.clsDatepicker || `uk-${this.$options.name}`;

            this.$addClass(this.clsDatepicker);
        },

        ready() {

            console.log('Datepicker is ready!');

        },

        events: [

            {

                name: 'click focus',

                delegate() {
                    return `.${this.clsDrop}-close`;
                },

                handler(e) {
                    e.preventDefault();
                    this.hide(false);
                }

            },

            {

                name: 'click focus',

                delegate() {
                    return 'a[href^="#"]';
                },

                handler(e) {

                    if (e.isDefaultPrevented() || isTouch(e)) {
                        return;
                    }

                    var id = e.target.hash;

                    if (!id) {
                        e.preventDefault();
                    }

                    if (!id || !isWithin(id, this.$el)) {
                        this.hide(false);
                    }
                }

            },

            {

                name: 'toggle',

                handler(e, toggle) {

                    if (toggle && !this.$el.is(toggle.target)) {
                        return;
                    }

                    e.preventDefault();

                    if (this.isToggled()) {
                        this.hide(false);
                    } else {
                        this.show(toggle, false);
                    }
                }

            }

        ],

        methods: {

            initialize() {

                Drop(this.$el);

            },

            show() {

                // show datepicker

            },

            hide() {

                // hide datepicker

            }

        }

    }));

}

if (!BUNDLED && typeof window !== 'undefined' && window.UIkit) {
    window.UIkit.use(plugin);
}

export default plugin;
