document.addEventListener('DOMContentLoaded', () => {
  const arr = document.querySelector('.arr')
  const displayScore = document.getElementById('score')
  const width = 8
  const candies = []
  let score = 0

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
  }

  function dragEnd () {
    // Check to see if a valid move or not
    let holdValid = [candyIdPicked - 1, candyIdPicked - width, candyIdPicked + 1, candyIdPicked + width]
    let isValid = holdValid.includes(candyIdSwapped)

    if (candyIdSwapped && isValid) {
      candyIdSwapped = null
    } else if (candyIdSwapped && !isValid) {
      candies[candyIdSwapped].style.backgroundColor = colorToSwap
      candies[candyIdPicked].style.backgroundColor = colorPicked
    } else {
      candies[candyIdPicked].style.backgroundColor = colorPicked
    }
  }

  function dragOver (e) {
    e.preventDefault()
  }

  function dragEnter (e) {
    e.preventDefault()
  }

  function dragLeave () {
    this.style.backgroundColor = ''
  }

  function dragDrop () {
    colorToSwap = this.style.backgroundColor
    candyIdSwapped = parseInt(this.id)
    this.style.backgroundColor = colorPicked
    candies[candyIdPicked].style.backgroundColor = colorToSwap
  }

  // make more candies once selection has been cleared
})
