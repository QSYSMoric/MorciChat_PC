const distance = 50;

export default {
    async mounted(el) {
      let index = Number(el.getAttribute("index")) + 1;
      if (index % 2 == 0) {
        await animateOne(el);
      } else {
        await animateTwo(el);
      }
    },
};

async function animateOne(el) {
    await el.animate([{
        opacity: 0,
        transform: `translate(-${distance}px,${distance}px)`,
    },{
        opacity: 1,
        transform: `translate(0,0)`,
    }],{
        duration: 500,
        easing: "linear",
        fill: "both",
    }).finished;
}
  
async function animateTwo(el) {
    await el.animate([{
        opacity: 0,
        transform: `translate(${distance}px,${distance}px)`,
    },{
        opacity: 1,
        transform: `translate(0,0)`,
    }],{
        duration: 500,
        easing: "linear",
        fill: "both",
    }).finished;
}