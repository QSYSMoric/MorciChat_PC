<template>
    <div class="MoricHome_hamburgButton" @click="hamburgButtonFn">
        <span class="MoricHome_hamburgButton_content" :class="clickEdClass"> 
        &nbsp;
        </span>
    </div>
</template>

<script>
import { reactive } from 'vue';
export default {
    name:"MoricHomeHamburgButton",
    props:['clickFn'],
    setup(props){
      const clickEdClass = reactive({
          clickedButton:false,
          buttonHover:true,
      });
      function hamburgButtonFn(){
          clickEdClass.clickedButton = !clickEdClass.clickedButton;
          clickEdClass.buttonHover = !clickEdClass.buttonHover;
          props.clickFn();
      };
      return{
          clickEdClass,
          hamburgButtonFn
      }
    }
}
</script>

<style scoped>
  .MoricHome_hamburgButton{
    position:absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    right: 1em;
    top: 1em;
    padding: 1em;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    background: #ffff;
    z-index: 2;  
    box-shadow: 2px 2px 5px rgba(5, 38, 48,.4);
    cursor: pointer;
  }
  @media(max-width:767px){
    .MoricHome_hamburgButton{
        right: 2em;
        top: 3em;
    }
  }
  .MoricHome_hamburgButton_content,
  .MoricHome_hamburgButton_content::before,
  .MoricHome_hamburgButton_content::after{
    width: 1em;
    height: 2px;
    background: #333;
    display:block;
    transition: all .2s linear;
  }
  .MoricHome_hamburgButton_content{
    position: relative;
  }
  .MoricHome_hamburgButton_content::before,
  .MoricHome_hamburgButton_content::after{
    content: "";
    position: absolute;
    left: 0;
  }
  .MoricHome_hamburgButton_content::before{
    top: -.4em;
  }
  .MoricHome_hamburgButton_content::after{
    top: .4em;
  }
  .buttonHover:hover .MoricHome_hamburgButton_content::before{
    top: -.8em;
  }
  .buttonHover:hover .MoricHome_hamburgButton_content::after{
    top: .8em;
  }
  .clickedButton{
    background: transparent;
  }
  .clickedButton::before{
    top: 0;
    transform: rotate(135deg);    
  }
  .clickedButton::after{
    top: 0;
    transform: rotate(-135deg);
  }
  .clickedButton:hover .clickedButton::before{
    top: 0;
  }
  .clickedButton:hover .clickedButton::after{
    top: 0;
  }
</style>