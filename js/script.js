const header = document.querySelector('header')
const paragrafs = document.querySelectorAll('p')
let time = paragrafs[1].querySelector('span')
let score = paragrafs[0].querySelector('span')
const btnStart = document.getElementById('start')

class Bird{
    static time = 60
    static scoreGame = 0
    constructor(img, speed, score, selector){
        this.img = img
        this.spped = speed
        this.score = score
        this.selector = selector
        this.render()
    }
    static timeTick(birds, paragrafs) {
        time.innerHTML = Bird.time--
        setInterval(() => {
            time.innerHTML = Bird.time--;
            if(time.innerHTML === '0'){
                if(score.innerHTML <= 100){
                    header.style.background = 'url(img/lose.jpg)'
                }
                else{
                    header.style.background = 'url(img/win.jpg)'
                }
                Bird.gameOver(birds, paragrafs)
                return
            }
        }, 1000);
    }
    static gameOver(birds, paragrafs){
        birds.forEach((item, i) =>{
            item.getSelectorBird().style.display = 'none'
        })
        paragrafs.forEach((item, i) => {
            item.style.display = 'none'
        })
    }
    getSelectorBird(){
        return document.getElementById(this.selector)
    }// 
    setCoord(birdBlock){
        birdBlock.style.top = Math.random() * 90 + '%'
        birdBlock.style.left = Math.random() * 95 + '%'
    }
    render(){
        let birdBlock = this.getSelectorBird()
        this.setCoord(birdBlock)
        birdBlock.innerHTML = `<image src="img/${this.img}" alt="">`
        setInterval(() => {
            this.setCoord(birdBlock)
        }, this.spped);
    }
    pushBird(score){
        this.getSelectorBird().innerHTML = `<image src="img/bang.png" alt="">`
        Bird.scoreGame += this.score
        score.innerHTML = Bird.scoreGame
        setTimeout(() => {
            this.getSelectorBird().innerHTML = `<image src="img/${this.img}" alt="">`

        }, 700);
    }
}


btnStart.addEventListener('click', ()=>{
    const birds = [
        new Bird('bird_20_points.png', 1000, 20, 'red-bird'),
        new Bird('bird_10_points.png', 800, 10, 'black-bird'),
        new Bird('bird_50_points.png', 500, 50, 'small-bird'),
        new Bird('pig_minus_100_points.png', 1000, -100, 'pig')
    ];
    Bird.timeTick(birds, paragrafs)
    btnStart.style.display = 'none'
    header.style.background = 'url(img/fon.jpg)'
    paragrafs.forEach((item, i) =>{
        item.style.display = 'block'
    })
    birds.forEach((item, i) =>{
        item.getSelectorBird().addEventListener('click', () => {
            item.pushBird(score)
        })
    })
})