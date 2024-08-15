$(function() {

    $("input[type='password'][data-eye]").each(function(i) {
        var $this = $(this),
            id = 'eye-password-' + i,
            toggleId = 'passeye-toggle-' + i,
            hiddenInputId = 'passeye-' + i;

        $this.wrap($("<div/>", {
            style: 'position:relative',
            id: id
        })).css({
            paddingRight: 60
        }).after($("<div/>", {
            html: 'Show',
            class: 'btn btn-primary btn-sm',
            id: toggleId
        }).css({
            position: 'absolute',
            right: 10,
            top: ($this.outerHeight() / 2) - 12,
            padding: '2px 7px',
            fontSize: 12,
            cursor: 'pointer'
        })).after($("<input/>", {
            type: 'hidden',
            id: hiddenInputId
        }));

        var invalid_feedback = $this.parent().parent().find('.invalid-feedback');

        if (invalid_feedback.length) {
            $this.after(invalid_feedback.clone());
        }

        $this.on("keyup paste", function() {
            $("#" + hiddenInputId).val($(this).val());
        });

        $("#" + toggleId).on("click", function() {
            if ($this.hasClass("show")) {
                $this.attr('type', 'password').removeClass("show");
                $(this).removeClass("btn-outline-primary");
            } else {
                $this.attr('type', 'text').val($("#" + hiddenInputId).val()).addClass("show");
                $(this).addClass("btn-outline-primary");
            }
        });
    });

    $(".login-validation").submit(function(event) {
        var form = $(this);
        event.preventDefault();
        event.stopPropagation();

        if (form[0].checkValidity() !== false) {
            window.location.href = 'initial.html';
        }

        form.addClass('was-validated');
    });
});


function loadPage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('menu_direito').innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar a página:', error));
}

function salvar() {
    const form = document.getElementById('cadastroClienteForm');
    const formData = new FormData(form);
    let data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log('Dados do formulário:', data);
    alert('Dados salvos com sucesso!');
}

function limpar() {
    document.getElementById('cadastroClienteForm').reset();
}

function toggleSubMenu(element) {
    const subMenu = element.nextElementSibling;
    const isActive = element.classList.contains('active');

    document.querySelectorAll('.cadastro').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.sub_menu_cadastro').forEach(item => item.style.display = 'none');

    if (!isActive) {
        element.classList.add('active');
        subMenu.style.display = 'block';
    }
}

function updateDropdownLabel(option) {
    event.preventDefault(); // Prevenir comportamento padrão
    document.getElementById('dropdownMenuChave').textContent = option;
}

document.getElementById('toggleSwitch').addEventListener('change', function() {
    const inputField = document.getElementById('ie');
    inputField.disabled = !this.checked;
});

document.getElementById('menu_esquerdo').addEventListener('mouseenter', function() {
    this.classList.remove('collapsed');
});

document.getElementById('menu_esquerdo').addEventListener('mouseleave', function() {
    this.classList.add('collapsed');
});

let button = document.getElementById("button");

button.addEventListener('mousemove', (e) => {
    x = e.offsetX;
    y = e.offsetY;
    button.style.setProperty('--mouse-x', x + "px");
    button.style.setProperty('--mouse-y', y + "px");
});


