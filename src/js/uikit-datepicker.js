function plugin(UIkit) {

    if (plugin.installed) {
        return;
    }

    UIkit.component('datepicker', {

        mixins: [UIkit.mixin.class],

        attrs: true,

        props: {
            weekstart: Number,
            format: String,
            minDate: String,
            maxDate: String
        },

        defaults: {
            weekstart: 1,
            format: 'YYYY-MM-DD',
            minDate: false,
            maxDate: false
        },

        computed: {

            date() {
                return Date.parse(this.$props.date);
            },

            days() {
                return this.$el.find(this.clsWrapper.replace('%unit%', 'days'));
            },

            hours() {
                return this.$el.find(this.clsWrapper.replace('%unit%', 'hours'));
            },

            minutes() {
                return this.$el.find(this.clsWrapper.replace('%unit%', 'minutes'));
            },

            seconds() {
                return this.$el.find(this.clsWrapper.replace('%unit%', 'seconds'));
            },

            units() {
                return ['days', 'hours', 'minutes', 'seconds'].filter(unit => this[unit].length);
            }

        },

        connected() {
            this.start();
        },

        disconnected() {
            this.stop();
            this.units.forEach(unit => this[unit].empty());
        },

        update: {

            write() {

                var timespan = getTimeSpan(this.date);

                if (timespan.total <= 0) {

                    this.stop();

                    timespan.days
                        = timespan.hours
                        = timespan.minutes
                        = timespan.seconds
                        = 0;
                }

                this.units.forEach(unit => {

                    var digits = String(Math.floor(timespan[unit]));

                    digits = digits.length < 2 ? `0${digits}` : digits;

                    if (this[unit].text() !== digits) {
                        var el = this[unit];
                        digits = digits.split('');

                        if (digits.length !== el.children().length) {
                            el.empty().append(digits.map(() => '<span></span>').join(''));
                        }

                        digits.forEach((digit, i) => el[0].childNodes[i].innerText = digit);
                    }

                });

            }

        },

        methods: {

            start() {

                this.stop();

                if (this.date && this.units.length) {
                    this.$emit();
                    this.timer = setInterval(() => this.$emit(), 1000);
                }

            },

            stop() {

                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }

            }

        }

    });

}

if (!BUNDLED && typeof window !== 'undefined' && window.UIkit) {
    window.UIkit.use(plugin);
}

export default plugin;
