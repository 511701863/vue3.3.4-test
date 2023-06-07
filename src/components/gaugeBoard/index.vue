<script lang="ts" setup>
import mapIconDownUrl from '@/assets/images/icon_map_fold.png';
import mapIconUpUrl from '@/assets/images/icon_map_unfold.png';
import carPanelImageUrl from '@/assets/images/image_dashboard_vehicle.png';
interface Props {
  rSpeed?: number;
  dSpeed?: number;
  milleage?: number;
}
const props = withDefaults(defineProps<Props>(), {
  rSpeed: 0,
  dSpeed: 0,
  milleage: 0
});
const refOption = reactive({
  mWidth: 700,
  cWidth: 0, //宽度为浏览器宽度
  cHeight: 220, //初始化高度
  trackBoardDisplay: false
});
const { rSpeed, dSpeed, milleage } = toRefs(props);
const { mWidth, cWidth, cHeight, trackBoardDisplay } = toRefs(refOption);

const init = () => {
  const boardCanvas = document.getElementById('boardCanvas') as HTMLCanvasElement;
  const bc = boardCanvas.getContext('2d') as CanvasRenderingContext2D;
  bc.clearRect(0, 0, cWidth.value, cHeight.value);
  drawRightBG(cWidth.value, cHeight.value, mWidth.value);
  drawLeftBG(cWidth.value, cHeight.value, mWidth.value);
  drawLeftDial(cWidth.value, cHeight.value, mWidth.value, rSpeed.value);
  drawRightDial(cWidth.value, cHeight.value, mWidth.value, dSpeed.value);
};
//绘制左边仪表盘背景;
const drawLeftBG = (cWidth:number, cHeight:number, mWidth:number) => {
  const boardCanvas = document.getElementById('boardCanvas') as HTMLCanvasElement;
  const bc = boardCanvas.getContext('2d') as CanvasRenderingContext2D;
  bc.arc(((cWidth - mWidth) / 2 - cHeight - 100), (cHeight / 2), (cHeight / 2) - 10, 0, 360, false);
  bc.fillStyle = '#364C5B';
  bc.fill();
  bc.closePath();
  bc.restore();
};
//绘制右边仪表盘背景;
const drawRightBG = (cWidth:number, cHeight:number, mWidth:number) => {
  const boardCanvas = document.getElementById('boardCanvas') as HTMLCanvasElement;
  const bc = boardCanvas.getContext('2d') as CanvasRenderingContext2D;
  bc.arc(mWidth - cHeight / 2 + 80, cHeight / 2, (cHeight / 2) - 10, 0, 360, false);
  bc.fillStyle = '#364C5B';
  bc.fill();
  bc.closePath();
  bc.restore();
};
//绘制左侧表盘
const drawLeftDial = (cWidth:number, cHeight:number, mWidth:number, num: number) => {
  const number = num * 1000;
  const scaleRev = 9000 / 360; //一个刻度代表的转速25
  const revSpeed = number / scaleRev;
  const opaRound = number / (9000 / Math.PI / 2);
  const boardCanvas = document.getElementById('boardCanvas') as HTMLCanvasElement;
  const bc = boardCanvas.getContext('2d') as CanvasRenderingContext2D;

  //刻度
  bc.save();
  bc.translate(((cWidth - mWidth) / 2 - cHeight - 100), (cHeight / 2));
  bc.rotate(Math.PI / 2);

  for (let i = 0; i < 360; i++) {
    bc.rotate(2 * Math.PI / 360);
    bc.beginPath();
    if(i < revSpeed) {
      bc.save();
      bc.lineWidth = 1;
      bc.strokeStyle = '#0799E4';
      bc.shadowOffsetX = 0;
      bc.shadowOffsetY = 1;
      bc.shadowColor = '#139EB2';
      bc.shadowBlur = 2;
      bc.moveTo(((cHeight / 2) - 17), 0);
      bc.lineTo(((cHeight / 2) - 8), 0);
      bc.stroke();
      bc.closePath();
      bc.restore();
    }else if(i === revSpeed) {
      bc.save();
      bc.lineWidth = 2;
      bc.strokeStyle = '#F7D13B';
      bc.shadowOffsetX = 2;
      bc.shadowOffsetY = 1;
      bc.shadowColor = '#B97247';
      bc.shadowBlur = 2;
      bc.moveTo(((cHeight / 2) - 43), 0);
      bc.lineTo(((cHeight / 2) - 3), 0);
      bc.stroke();
      bc.closePath();
      bc.restore();
    }else{
      bc.lineWidth = 1;
      bc.strokeStyle = '#687E8E';
      bc.moveTo(((cHeight / 2) - 15), 0);
      bc.lineTo(((cHeight / 2) - 10), 0);
      bc.stroke();
      bc.closePath();
    }
  }
  bc.restore();

  //刻度数字
  bc.save();
  bc.translate(((cWidth - mWidth) / 2 - cHeight - 100), (cHeight / 2));
  bc.rotate(Math.PI * 2);
  for (let i = 0; i < 360; i++) {
    bc.rotate(2 * Math.PI / 360);
    if(i % 40 === 0) {
      bc.fillStyle = '#687E8E';
      bc.font = '10px Microsoft yahei';
      bc.textAlign = 'center';
      bc.fillText((i / 40).toString(), 0, (cHeight / 2 - 25));
    }
  }
  bc.restore();
  //中间数字
  bc.save();
  bc.translate(((cWidth - mWidth) / 2 - cHeight - 100), (cHeight / 2));
  bc.fillStyle = '#fff';
  bc.font = '44px Microsoft yahei';
  bc.textAlign = 'center';
  bc.textBaseLine = 'top';
  bc.fillText(num.toString(), 0, 0);
  bc.font = '16px Microsoft yahei';
  bc.fillText('rpm*1000', 0, 17);
  bc.restore();
  //内层阴影
  bc.save();
  bc.translate(((cWidth - mWidth) / 2 - cHeight - 100), (cHeight / 2));
  bc.rotate(Math.PI / 2);
  bc.beginPath();
  bc.lineWidth = 25;
  bc.strokeStyle = 'rgba(2,161,251,.2)';
  bc.arc(0, 0, cHeight / 2 - 30, 0, opaRound, false);
  bc.stroke();
  bc.restore();
};
//绘制右侧表盘
const drawRightDial = (cWidth:number, cHeight:number, mWidth:number, num: number) => {
  const number = num;
  const scaleRev = 240 / 360;
  const revSpeed = (number / scaleRev);
  const opaRound = number / (240 / Math.PI / 2);
  const boardCanvas = document.getElementById('boardCanvas') as HTMLCanvasElement;
  const bc = boardCanvas.getContext('2d') as CanvasRenderingContext2D;
  //刻度
  bc.save();
  bc.translate((mWidth - cHeight / 2 + 80), (cHeight / 2));
  bc.rotate(Math.PI / 2);
  for (let i = 0; i < 360; i++) {
    bc.rotate(2 * Math.PI / 360);
    bc.beginPath();
    if(i < revSpeed) {
      bc.save();
      bc.lineWidth = 1;
      bc.strokeStyle = '#0799E4';
      bc.shadowOffsetX = 0;
      bc.shadowOffsetY = 1;
      bc.shadowColor = '#139EB2';
      bc.shadowBlur = 2;
      bc.moveTo(((cHeight / 2) - 17), 0);
      bc.lineTo(((cHeight / 2) - 8), 0);
      bc.stroke();
      bc.closePath();
      bc.restore();
    }else if(i === revSpeed) {
      bc.save();
      bc.lineWidth = 2;
      bc.strokeStyle = '#F7D13B';
      bc.shadowOffsetX = 2;
      bc.shadowOffsetY = 1;
      bc.shadowColor = '#B97247';
      bc.shadowBlur = 2;
      bc.moveTo(((cHeight / 2) - 43), 0);
      bc.lineTo(((cHeight / 2) - 3), 0);
      bc.stroke();
      bc.closePath();
      bc.restore();
    }else{
      bc.lineWidth = 1;
      bc.strokeStyle = '#687E8E';
      bc.moveTo(((cHeight / 2) - 15), 0);
      bc.lineTo(((cHeight / 2) - 10), 0);
      bc.stroke();
      bc.closePath();
    }
  }
  bc.restore();
  //刻度数字
  bc.save();
  bc.translate((mWidth - cHeight / 2 + 80), (cHeight / 2));
  bc.rotate(Math.PI * 2);
  for (let i = 0; i < 360; i++) {
    bc.rotate(2 * Math.PI / 360);
    if(i % 45 === 0) {
      bc.fillStyle = '#687E8E';
      bc.font = '10px Microsoft yahei';
      bc.textAlign = 'center';
      bc.fillText((i / 45 * 30).toString(), 0, (cHeight / 2 - 25));
    }
  }
  bc.restore();
  //中间数字
  bc.save();
  bc.translate((mWidth - cHeight / 2 + 80), (cHeight / 2));
  bc.fillStyle = '#fff';
  bc.font = '44px Microsoft yahei';
  bc.textAlign = 'center';
  bc.textBaseLine = 'top';
  bc.fillText(num.toString(), 0, 0);
  bc.font = '16px Microsoft yahei';
  bc.fillText('km/h', 0, 17);
  bc.restore();
  //内层阴影
  bc.save();
  bc.translate((mWidth - cHeight / 2 + 80), (cHeight / 2));
  bc.rotate(Math.PI / 2);
  bc.beginPath();
  bc.lineWidth = 25;
  bc.strokeStyle = 'rgba(2,161,251,.2)';
  bc.arc(0, 0, cHeight / 2 - 30, 0, opaRound, false);
  bc.stroke();
  bc.restore();

};
watch(() => rSpeed.value, (val) => {
  init();
});
watch(() => dSpeed.value, (val) => {
  init();
});

cWidth.value = window.innerWidth - 160;

window.onresize = () => {
  cWidth.value = window.innerWidth - 160;
};
onMounted(() => {
  init();
});
</script>

<template>
  <div class="track-board-wrapper overflow-x-hidden">
    <div class="middle-content">
      <n-image
        :src="trackBoardDisplay ? mapIconUpUrl : mapIconDownUrl"
        :preview-disabled="true"
        class="middle-btn"
        @click="trackBoardDisplay = !trackBoardDisplay"
      />
      <div
        v-show="trackBoardDisplay"
        class="middle-content-body"
      >
        <div class="middle-top">
          D
        </div>
        <div class="middle-title">
          总里程
        </div>
        <div class="middle-data">
          {{ milleage }} <span>km</span>
        </div>
        <n-image
          :src="carPanelImageUrl"
          :preview-disabled="true"
          class="panel-image"
        />
      </div>
    </div>
    <div v-show="trackBoardDisplay">
      <n-grid
        x-gap="12"
        class="gaugeBoard-wrapper"
      >
        <n-gi
          :span="12"
          :offset="6"
          style="background:rgba(35,54,68,0.8);border-top-left-radius:12px;border-top-right-radius:12px;"
        >
          <canvas
            id="boardCanvas"
            :width="cWidth"
            :height="cHeight"
          ></canvas>
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .gaugeBoard-wrapper{
    width: 100%;
    position: relative;
  }
  .track-board-wrapper{
    position: absolute;
    bottom:0;
    width: 100%;
    .middle-content{
      display: flex;
      justify-content: center;
      .middle-content-body{
        position: absolute;
        top: 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 10;
        .middle-top{
          width: 20px;
          height: 20px;
          line-height: 20px;
          color: #87a3b0;
          text-align: center;
          font-size: 16px;
          background: #1f2f39;
          border-radius:4px;
          border:1px solid #184e37;
        }
        .middle-title{
          margin: 4px;
          font-size:12px;
          font-weight:400;
          color: white;
        }
        .middle-data{
          font-size: 30px;
          font-weight:bold;
          color: white;
          text-align:center;
          justify-content: center;
          & > span{
            font-size: 14px;
          }
        }
        .panel-image{
          height: 112px;
        }
      }

      .middle-btn{
        position: relative;
        width: 35px;
        top: 0px;
      }
    }
  }
</style>

