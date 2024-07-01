$(function() {

	$("input[type='password'][data-eye]").each(function(i) {
		var $this = $(this),
			id = 'eye-password-' + i,
			el = $('#' + id);

		$this.wrap($("<div/>", {
			style: 'position:relative',
			id: id
		}));

		$this.css({
			paddingRight: 60
		});
		$this.after($("<div/>", {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: 'passeye-toggle-'+i,
		}).css({
				position: 'absolute',
				right: 10,
				top: ($this.outerHeight() / 2) - 12,
				padding: '2px 7px',
				fontSize: 12,
				cursor: 'pointer',
		}));

		$this.after($("<input/>", {
			type: 'hidden',
			id: 'passeye-' + i
		}));

		var invalid_feedback = $this.parent().parent().find('.invalid-feedback');

		if(invalid_feedback.length) {
			$this.after(invalid_feedback.clone());
		}

		$this.on("keyup paste", function() {
			$("#passeye-"+i).val($(this).val());
		});
		$("#passeye-toggle-"+i).on("click", function() {
			if($this.hasClass("show")) {
				$this.attr('type', 'password');
				$this.removeClass("show");
				$(this).removeClass("btn-outline-primary");
			}else{
				$this.attr('type', 'text');
				$this.val($("#passeye-"+i).val());				
				$this.addClass("show");
				$(this).addClass("btn-outline-primary");
			}
		});
	});

	$(".login-validation").submit(function() {
		var form = $(this);

		event.preventDefault();
		event.stopPropagation();
        if (form[0].checkValidity() != false) {
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

document.getElementById('toggleSwitch').addEventListener('change', function() {
	const inputField = document.getElementById('ie');
	inputField.disabled = !this.checked;
});