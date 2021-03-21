document.addEventListener('DOMContentLoaded', () => {
  const arr = document.querySelector('.arr')
  const width = 8
  const candies = []

  // Make my board
  function drawBoard () {
    for (let i = 0; i < Math.pow(width, 2); i++) {
      const candy = document.createElement('div')
      arr.appendChild(candy)
      candies.push(candy)
    }
  }

  drawBoard()
})
