//nav menu
const menuAppear = document.querySelector(".menu")
const onClick = document.querySelector('.navMenu')
menuAppear.addEventListener('click', function() {
  console.log('appear')
  onClick.className = "navMenu openState"
})


const menuDissappear = document.querySelector(".close")
const closeClick = document.querySelector('.navMenu')
menuDissappear.addEventListener('click', function() {
  console.log('dissappear')
  onClick.className = "navMenu closedState"
})
