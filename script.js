document.addEventListener('DOMContentLoaded', function() {
    // Adicionar Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
    
    // Efeito de rolagem no header
    const header = document.querySelector('header');
    const scrollThreshold = 50;
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Slider de Depoimentos
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    if (dots.length > 0 && prevBtn && nextBtn) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Auto-rotação de depoimentos
        let testimonialInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
        
        // Pausar auto-rotação ao interagir com controles
        const testimonialControls = document.querySelector('.testimonial-controls');
        if (testimonialControls) {
            testimonialControls.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            
            testimonialControls.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    showTestimonial(currentIndex);
                }, 5000);
            });
        }
    }
    
    // Validação de Formulário
    const contactForm = document.getElementById('consultation-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formFields = contactForm.querySelectorAll('input, select, textarea');
            
            formFields.forEach(field => {
                const formGroup = field.closest('.form-group');
                
                // Remover estados de erro anteriores
                formGroup.classList.remove('error');
                const existingError = formGroup.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                // Verificar campos obrigatórios
                if (field.hasAttribute('required') && !field.value.trim()) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Este campo é obrigatório';
                    formGroup.appendChild(errorMessage);
                    formGroup.classList.add('error');
                    isValid = false;
                }
                
                // Validar formato de e-mail
                if (field.type === 'email' && field.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value.trim())) {
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Por favor, insira um e-mail válido';
                        formGroup.appendChild(errorMessage);
                        formGroup.classList.add('error');
                        isValid = false;
                    }
                }
                
                // Validar formato de telefone
                if (field.type === 'tel' && field.value.trim()) {
                    const phonePattern = /^[0-9\-\+\s\(\)]{8,20}$/;
                    if (!phonePattern.test(field.value.trim())) {
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Por favor, insira um número de telefone válido';
                        formGroup.appendChild(errorMessage);
                        formGroup.classList.add('error');
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // Em uma implementação real, você enviaria os dados do formulário para um servidor
                // Para este exemplo, apenas mostraremos uma mensagem de sucesso
                
                // Remover mensagem de sucesso existente
                const existingSuccess = contactForm.querySelector('.form-success');
                if (existingSuccess) {
                    existingSuccess.remove();
                }
                
                const formSuccess = document.createElement('div');
                formSuccess.className = 'form-success';
                formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Obrigada pela sua mensagem! Entrarei em contato em breve.';
                
                contactForm.prepend(formSuccess);
                
                // Atraso para permitir que o DOM seja atualizado antes de adicionar a classe show
                setTimeout(() => {
                    formSuccess.classList.add('show');
                }, 10);
                
                contactForm.reset();
                
                // Remover mensagem de sucesso após 5 segundos
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                    setTimeout(() => {
                        formSuccess.remove();
                    }, 500);
                }, 5000);
            }
        });
    }
    
    // Animação de elementos ao rolar
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos para animar ao rolar
    const animatedElements = document.querySelectorAll('.service-card, .approach-item, .contact-card, .faq-item');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});