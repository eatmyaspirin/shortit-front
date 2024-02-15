<template>
  <div class="manage">
    <div class="wrapper">
      <div class="left">
        <DataTable
          class="grid"
          :value="products"
          tableStyle="min-width: 50rem"
          :scrollable="true"
          v-model:selection="selected"
          selectionMode="single"
          scrollHeight="flex"
          :metaKeySelection="true"
        >
          <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <span class="text-xl text-900 font-bold">My Pastes</span>
            </div>
          </template>
          <Column selectionMode="single" headerStyle="width: 3rem"></Column>
          <Column field="id" header="S.No."></Column>
          <Column field="isUrl" header="Type"></Column>
          <Column field="pasteData" header="Data"></Column>
          <Column field="shortUrl" header="Short URL"></Column>
          <Column field="urlId" header="Paste ID"></Column>
          <Column field="createdDate" header="Created On"></Column>
          <Column>
            <template #body>
              <button @click="onClickCopy" style="margin-right: 8px;">Copy</button>
              <button @click="onClickDelete" >Delete</button>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="right">
        <div class="stats">
          <Chart type="pie" :data="chartData" :options="chartOptions" />
        </div>
        <div class="content">
          <Chart type="line" :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from '@/axios.config'
const products = ref([])
const selected = ref();
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
  const response = await axios.get('/user/getMyUrls')
  products.value = response.data.data.map((item, index) => {
    item.isUrl = item.isUrl ? 'Url' : 'Paste';
    item.pasteData = item.url ? item.url : item.pasteData.length > 15 ? item.pasteData.slice(0, 15) + '...' : item.pasteData;
    item.createdDate = new Date(item.createdDate).toGMTString();
    item.id = index + 1;
    return item
  })
}

const onClickDelete = async (e) => {
  e.srcElement.parentNode.click();
  await axios.post('/user/delete', {'urlId': selected.value.urlId})
}

const onClickCopy = (e) => {
  e.srcElement.parentNode.click();
  console.log(selected.value)
  navigator.clipboard.writeText(selected.value.isUrl != 'Url' ? 'http://localhost:5173/' + selected.value.shortUrl: axios.defaults.baseURL + '/' + selected.value.shortUrl);
}
</script>

<style scoped>
.manage {
  height: 100%;
  margin-top: 52px;
  padding-top: 16px;
  background-color: #021810;
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
  padding: 16px 0 16px 8px;
}
.right {
  /* padding-left: 100px; */
  display: flex;
  flex-direction: column;
  width: 100%;
}

.stats {
  height: 47%;
}

.content {
  height: 47%;
}

.grid {
  height: 99%;
  width: 100%;
}

.stats {
  height: 45vh;
}

.p-chart {
  height: 95%;
}

</style>
