document.addEventListener('DOMContentLoaded', () => {
  const arr = document.querySelector('.arr')
  const width = 8
  const candies = []

  const candyColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

  // Make my board
  function drawBoard () {
    for (let i = 0; i < Math.pow(width, 2); i++) {
      const candy = document.createElement('div')
      candy.setAttribute('draggable', true)
      candy.setAttribute('id', i)
      let randomizeColors = Math.floor(Math.random() * candyColors.length)
      candy.style.backgroundColor = candyColors[randomizeColors]
      arr.appendChild(candy)
      candies.push(candy)
    }
  }

  drawBoard()

  // Move candies
  let colorPicked
  let colorToSwap
  let candyIdPicked
  let candyIdSwapped

  candies.forEach(candy => candy.addEventListener('dragstart', dragStart))
  candies.forEach(candy => candy.addEventListener('dragend', dragEnd))
  candies.forEach(candy => candy.addEventListener('dragover', dragOver))
  candies.forEach(candy => candy.addEventListener('dragenter', dragEnter))
  candies.forEach(candy => candy.addEventListener('dragleave', dragLeave))
  candies.forEach(candy => candy.addEventListener('drop', dragDrop))

  function dragStart () {
    colorPicked = this.style.backgroundColor
    candyIdPicked = parseInt(this.id)
    console.log(this.id, 'dragstart')
  }

  function dragEnd () {
    console.log(this.id, 'dragend')
  }

  function dragOver () {
    console.log(this.id, 'dragover')
  }

  function dragEnter () {
    console.log(this.id, 'dragenter')
  }

  function dragLeave () {
    console.log(this.id, 'dragleave')
  }

  function dragDrop () {
    console.log(this.id, 'dragdrop')
    colorToSwap = this.style.backgroundColor
    candyIdSwapped = parseInt(this.id)
    candies[candyIdPicked].style.backgroundColor = colorToSwap
  }
})
