document.addEventListener('DOMContentLoaded', () => {
  const arr = document.querySelector('.arr')
  const width = 8
  const candies = []

  const candyColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

  // Make my board
  function drawBoard () {
    for (let i = 0; i < Math.pow(width, 2); i++) {
      const candy = document.createElement('div')
      let randomizeColors = Math.floor(Math.random() * candyColors.length)
      candy.style.background = candyColors[randomizeColors]
      arr.appendChild(candy)
      candies.push(candy)
    }
  }

  drawBoard()
})
