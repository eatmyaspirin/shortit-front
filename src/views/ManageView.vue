<template>
  <div class="manage">
    <div class="wrapper">
      <div class="left">
        <DataTable
          class="grid"
          :value="products"
          tableStyle="min-width: 50rem"
          :scrollable="true"
          scrollHeight="flex"
        >
          <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <span class="text-xl text-900 font-bold">My Pastes</span>
            </div>
          </template>
          <Column field="isUrl" header="Type"></Column>
          <Column field="pasteData" header="Data"></Column>
          <Column field="shortUrl" header="Short URL"></Column>
          <Column field="urlId" header="Paste ID"></Column>
          <Column field="createdDate" header="Created On"></Column>
        </DataTable>
      </div>
      <div class="right">
        <div class="stats">
          <Chart type="bar" :data="chartData" :options="chartOptions" />
        </div>
        <div class="content">Content</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Axios from '@/axios.config'
const products = ref([])

onMounted(() => {
  getMyUrls()
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})
const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Sales',
                data: [540, 325, 702, 620],
                backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
                borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                borderWidth: 1
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

const getMyUrls = async () => {
  const response = await Axios.get('/user/getMyUrls')
  products.value = response.data.data.map((item) => {
    item.isUrl = item.isUrl ? 'Url' : 'Paste';
    item.pasteData = item.url ? item.url : item.pasteData.slice(0, 15) + '...';
    item.createdDate = new Date(item.createdDate).toGMTString();
    return item
  })
}
</script>

<style scoped>
.manage {
  height: 100%;
  padding-top: 8%;
  background-color: #18181b;
}
.wrapper {
  display: flex;
  height: 100%;
  padding: 0 5px;
}
.left {
  display: flex;
  flex-direction: column;
  height: 94%;
  width: 100%;
  padding: 10px;
  background-color: white;
}
.right {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.stats {
  height: 400px;
}

.content {
  height: 400px;
}

.grid {
  height: 90%;
  width: 50%;
  max-width: 50%;
}

</style>
