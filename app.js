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
  function moveCandyDown () {
    for (i = 0; i < 55; i++) {
      if (candies[i + width].style.backgroundColor === '') {
        candies[i + width].style.backgroundColor = candies[i].style.backgroundColor
        candies[i].style.backgroundColor = ''
        const rowOne = [0,1,2,3,4,5,6,7]
        const isRowOne = rowOne.includes(i)
        if (isRowOne && (candies[i].style.backgroundColor === '')) {
          let colorRandom = Math.floor(Math.random() * candyColors.length)
          candies[i].style.backgroundColor = candyColors[colorRandom]
        }
      }
    }
  }

  // Sets of functions to find matches
  // four needed, find rows and columns of both three and four in a row

  // row of three
  function checkRowForThree () {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2]
      let decideColor = candies[i].style.backgroundColor
      const blank = candies[i].style.backgroundColor === ''
      const invalid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
      if (invalid.includes(i)) continue
      if (rowOfThree.every(index => candies[index].style.backgroundColor === decideColor && !blank)) {
        score += 3
        displayScore.innerHTML = score
        rowOfThree.forEach(index => { candies[i].style.backgroundColor = '' })
      }
    }
  }
  checkRowForThree()

  // column of three
  function checkColumnForThree () {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2]
      let decideColor = candies[i].style.backgroundColor
      const blank = candies[i].style.backgroundColor === ''
      if (columnOfThree.every(index => candies[index].style.backgroundColor === decideColor && !blank)) {
        score += 3
        displayScore.innerHTML = score
        columnOfThree.forEach(index => { candies[index].style.backgroundColor = '' })
      }
    }
  }
  checkColumnForThree()

  // row of four
  function checkRowForFour () {
    for (let i = 0; i < 60; i++) {
      let rowOfFour = [i, i+1, i+2, i+3]
      let decideColor = candies[i].style.backgroundColor
      const blank = candies[i].style.backgroundColor === ''
      const invalid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
      if (invalid.includes(i)) continue
      if (rowOfFour.every(index => candies[index].style.backgroundColor === decideColor && !blank)) {
        score += 4
        displayScore.innerHTML = score
        rowOfFour.forEach(index => { candies[index].style.backgroundColor = '' })
      }
    }
  }
  checkRowForFour()

  // column of four
  function checkColumnForFour () {
    for (let i = 0; i < 39; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      let decideColor = candies[i].style.backgroundColor
      const blank = candies[i].style.backgroundColor === ''
      if (columnOfFour.every(index => candies[index].style.backgroundColor === decideColor && !blank)) {
        score += 4
        displayScore.innerHTML = score
        columnOfFour.forEach(index => { candies[index].style.backgroundColor = '' })
      }
    }
  }
  checkColumnForFour()

  // run each check, update score, then fill in blanks
  window.setInterval(function () {
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
    moveCandyDown()
  }, 100)
})
