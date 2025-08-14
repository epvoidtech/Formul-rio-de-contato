// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }

    // Fechar menu mobile ao clicar
    document.getElementById('menu-links').classList.remove('active')
  })
})

// Toggle do menu no mobile
const toggleBtn = document.getElementById('menu-toggle')
const menuLinks = document.getElementById('menu-links')

toggleBtn.addEventListener('click', () => {
  menuLinks.classList.toggle('active')
})

// ScrollSpy: destacando seção atual no menu
const sections = document.querySelectorAll("main section")
const navLinks = document.querySelectorAll("#menu-links a")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach(section => {
    const sectionTop = section.offsetTop
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach(link => {
    link.classList.remove("active")
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active")
    }
  })
})
