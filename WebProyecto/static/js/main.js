document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            if (files.length > 2) {
                alert('Por favor, seleccione máximo 2 archivos complementarios');
                e.target.value = '';
            }
        });
    }

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const form = document.getElementById('projectForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (form.checkValidity()) {
                submitForm();
            }
            form.classList.add('was-validated');
        });
    }
});

function submitForm() {
    const formData = new FormData();
    formData.append('project_name', document.getElementById('projectName').value);
    formData.append('authors', document.getElementById('authors').value);

    fetch('/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Proyecto guardado exitosamente');
        } else {
            alert('Error al guardar el proyecto: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar el formulario');
    });
}