const main = document.getElementById('main')
const main2 = document.getElementById('main-2')
document.getElementById('next').addEventListener('click', (ev) => {
    main.classList = 'fade-out'
    setTimeout( () => {
        main2.style.display = 'block'
        main2.style.opacity = '0'
        main2.classList='fade-in'
        main2.style.opacity = '1'
    },1000)
})

const nextproject = document.getElementById('next-project');

nextproject.addEventListener('click', (ev) => {
    const projects = document.getElementsByClassName('project')
    for (let i = 0;i<projects.length; i++) {
        const currentp = projects[i];
        if (getComputedStyle(currentp).display!=='none'&&(parseInt(currentp.classList[0].split('-')[1]))!==projects.length) {
            currentp.style.display = 'none'
            console.log('project-'+(parseInt(currentp.classList[0].split('-')[1])+1))
            document.getElementsByClassName('project-'+
            (parseInt(currentp.classList[0].split('-')[1])+1)
            )[0].style.display='block'
            break;
        }
    }
})
function doScrolling(elementY, duration) { 
    var startingY = window.pageYOffset;
    var diff = elementY - startingY;
    var start;
  
    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      // Elapsed milliseconds since start of scrolling.
      var time = timestamp - start;
      // Get percent of completion in range [0, 1].
      var percent = Math.min(time / duration, 1);
  
      window.scrollTo(0, startingY + diff * percent);
  
      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    })
  }
  

document.getElementById('make-scroll').addEventListener('click', (e)=>{
    document.body.style.overflowY = 'scroll';
    main2.classList = 'fade-out';
    setTimeout( () => {
        main2.style.opacity = '0'
        doScrolling(document.getElementById('scroll-div').getBoundingClientRect().top, 2500)
    },1000)
})

