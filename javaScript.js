// ==========================
// LOGIN
// ==========================

const formLogin = document.getElementById("formLogin");

if(formLogin){

    formLogin.addEventListener("submit", function(event){

        event.preventDefault();

        const emailDigitado =
            document.getElementById("email").value;

        const senhaDigitada =
            document.getElementById("senha").value;

        const emailSalvo =
            localStorage.getItem("usuarioEmail");

        const senhaSalva =
            localStorage.getItem("usuarioSenha");

        if(!emailSalvo){

            alert(
                "Nenhuma conta cadastrada. Faça seu cadastro primeiro."
            );

            return;
        }

        if(
            emailDigitado === emailSalvo &&
            senhaDigitada === senhaSalva
        ){

            alert("Login realizado com sucesso!");

            window.location.href = "pagina_sos.html";

        }else{

            alert(
                "Email ou senha incorretos."
            );

        }

    });

}


// ==========================
// CADASTRO
// ==========================

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    formCadastro.addEventListener("submit", function(event){

        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("emailCadastro").value;
        const senha = document.getElementById("senhaCadastro").value;
        const confirmar = document.getElementById("confirmarSenha").value;

        if(senha !== confirmar){

            alert("As senhas não coincidem!");
            return;

        }

        localStorage.setItem("usuarioNome", nome);
        localStorage.setItem("usuarioEmail", email);
        localStorage.setItem("usuarioSenha", senha);

        alert("Conta criada com sucesso!");

        window.location.href = "pagina_login.html";

    });

}



// ==========================
// POPUP SOS
// ==========================

const btnSOS = document.getElementById("btnSOS");
const popupSOS = document.getElementById("popupSOS");
const btnCancelarPopup = document.getElementById("btnCancelarPopup");
const btnEnviarAlerta = document.getElementById("btnEnviarAlerta");

if (btnSOS) {

    btnSOS.addEventListener("click", function () {

        popupSOS.style.display = "flex";

    });

}

if (btnCancelarPopup) {

    btnCancelarPopup.addEventListener("click", function () {

        popupSOS.style.display = "none";

    });

}

if (btnEnviarAlerta) {

    btnEnviarAlerta.addEventListener("click", function () {

        window.location.href =
            "pagina_sos_alerta_enviado.html";

    });

}


// ==========================
// CANCELAR ALERTA
// ==========================

const btnCancelarAlerta =
    document.getElementById("btnCancelarAlerta");

if (btnCancelarAlerta) {

    btnCancelarAlerta.addEventListener("click", function () {

        const confirmar = confirm(
            "Deseja cancelar o alerta?"
        );

        if (confirmar) {

            alert("Alerta cancelado.");

            window.location.href =
                "pagina_sos.html";
        }

    });

}


// ==========================
// CONTATOS
// ==========================

const btnAdicionarContato =
    document.getElementById("btnAdicionarContato");

if (btnAdicionarContato) {

    btnAdicionarContato.addEventListener("click", function () {

        const nome =
            prompt("Digite o nome do contato:");

        if (!nome) return;

        const telefone =
            prompt("Digite o telefone:");

        if (!telefone) return;

        const lista =
            document.getElementById("listaContatos");

        const novoContato =
            document.createElement("div");

        novoContato.classList.add("contato");

        novoContato.innerHTML = `
            <div>
                <h3>${nome}</h3>
                <p>${telefone}</p>
            </div>

            <span class="menu-contato">
                ⋮
            </span>
        `;

        lista.appendChild(novoContato);

        alert("Contato adicionado com sucesso!");

    });

}


// ==========================
// HISTÓRICO DE ALERTAS
// ==========================

const filtros =
    document.querySelectorAll(".filtros button");

if (filtros.length > 0) {

    filtros.forEach(botao => {

        botao.addEventListener("click", function () {

            filtros.forEach(item => {
                item.classList.remove("ativo");
            });

            this.classList.add("ativo");

        });

    });

}


// ==========================
// BOTÕES EM CONSTRUÇÃO
// ==========================

const btnLocalizacao =
    document.getElementById("btnLocalizacao");

if (btnLocalizacao) {

    btnLocalizacao.addEventListener("click", function (e) {

        e.preventDefault();

        alert(
            "Compartilhamento de localização será implementado em breve."
        );

    });

}

const btnGravador =
    document.getElementById("btnGravador");

if (btnGravador) {

    btnGravador.addEventListener("click", function (e) {

        e.preventDefault();

        alert(
            "Gravador de voz será implementado em breve."
        );

    });

}

const btnConfiguracoes =
    document.getElementById("btnConfiguracoes");

if (btnConfiguracoes) {

    btnConfiguracoes.addEventListener("click", function (e) {

        e.preventDefault();

        alert(
            "Configurações serão implementadas em breve."
        );

    });

}

const btnPerfil =
    document.getElementById("btnPerfil");

if (btnPerfil) {

    btnPerfil.addEventListener("click", function (e) {

        e.preventDefault();

        alert(
            "Tela de perfil será implementada em breve."
        );

    });

}

const btnGoogleLogin =
    document.getElementById("btnGoogleLogin");

if (btnGoogleLogin) {

    btnGoogleLogin.addEventListener("click", function () {

        alert(
            "Login com Google indisponível nesta versão."
        );

    });

}

const btnGoogleCadastro =
    document.getElementById("btnGoogleCadastro");

if (btnGoogleCadastro) {

    btnGoogleCadastro.addEventListener("click", function () {

        alert(
            "Cadastro com Google indisponível nesta versão."
        );

    });

}
