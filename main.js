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

