import { Line, Bar, Pie, HorizontalBar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export const getChart = type => {
  const charts = { Line, Bar, Pie, HorizontalBar };
  const chart = {
    mixins: [reactiveProp],
    props: ["options"],
    mounted() {
      this.renderChart(this.chartData, this.options);
    }
  };
  chart.extends = charts[type];
  return chart;
};
