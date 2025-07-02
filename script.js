/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 91, maxDegree: 135, value: "8 - Buy 4 Bras and Get a 15% off" }, 
  { minDegree: 46, maxDegree: 90, value: "1 - Buy any two sleepwear products and get a Tunic free" },
  { minDegree: 0, maxDegree: 45, value: "2 - Buy a Thong pack and get another Thong pack Free" },
  { minDegree: 316, maxDegree: 360, value: "3 - Buy any two sleepwear products and get a Tunic free" },
  { minDegree: 271, maxDegree: 315, value: "4 - Buy any two Athleisure products and get a Tank free" },
  { minDegree: 226, maxDegree: 270, value: "5 - Buy 4 Bras and Get a 15% off" },
  { minDegree: 181, maxDegree: 225, value: "6 - Buy a Thong pack and get another Thong pack Free" },
  { minDegree: 136, maxDegree: 180, value: "7 - Buy any two Athleisure products and get a Tank free" },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [15, 15, 15, 15, 15, 15, 15, 15];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#000000",
  "#FF0303",
  "#000000",
  "#FF0303",
  "#000000",
  "#FF0303",
  "#000000",
  "#FF0303",
  "#000000",
  "#FF0303",
  "#000000",
  "#FF0303",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { 
          size: 72,
          family: "Arial Black"
        },
        anchor: "end",  // Moves labels closer to the edge
        align: "end",    // Aligns labels towards the outer edge
        offset: -130       // Increases spacing from the center
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p id="display-value">🔴 ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = '<p id="spinning-code-phrase">Best Of Luck!</p>';
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */