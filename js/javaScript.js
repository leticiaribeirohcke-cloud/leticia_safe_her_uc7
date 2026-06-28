// ======================================================
// SAFEHER
// PARTE 1
// Cadastro • Login • Recuperar Senha • Perfil • Logout
// ======================================================



// ======================================================
// CADASTRO
// ======================================================

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    formCadastro.addEventListener("submit", function (e) {

        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("emailCadastro").value.trim();
        const senha = document.getElementById("senhaCadastro").value;
        const confirmar = document.getElementById("confirmarSenha").value;
        const telefone = document.getElementById("telefone").value.trim();

        if (senha !== confirmar && senha !== "") {

            alert("As senhas não coincidem.");
            return;

        }

        const usuario = {

            nome: nome || "Usuária",
            email: email || "email@email.com",
            senha: senha,
            telefone: telefone || "(00) 00000-0000"

        };

        localStorage.setItem(
            "usuarioSafeHer",
            JSON.stringify(usuario)
        );

        window.location.href = "pagina_sos.html";

    });

}



// ======================================================
// LOGIN
// ======================================================

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;

        const usuario = JSON.parse(
            localStorage.getItem("usuarioSafeHer")
        );

        // Permite acessar mesmo sem cadastro
        if (!usuario) {

            window.location.href = "pagina_sos.html";
            return;

        }

        if (

            email === "" ||

            senha === "" ||

            (

                email === usuario.email &&

                senha === usuario.senha

            )

        ) {

            window.location.href = "pagina_sos.html";

        }

        else {

            alert("Email ou senha incorretos.");

        }

    });

}



// ======================================================
// RECUPERAR SENHA
// ======================================================

const formRecuperarSenha =
document.getElementById("formRecuperarSenha");

if (formRecuperarSenha) {

    formRecuperarSenha.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
        document.getElementById("emailRecuperacao").value.trim();

        const usuario = JSON.parse(

            localStorage.getItem("usuarioSafeHer")

        );

        if (!usuario) {

            alert("Nenhum usuário cadastrado.");
            return;

        }

        if (email === usuario.email) {

            alert("Sua senha é: " + usuario.senha);

        }

        else {

            alert("Email não encontrado.");

        }

    });

}



// ======================================================
// PERFIL
// ======================================================

const nomePerfil =
document.getElementById("nomePerfil");

if (nomePerfil) {

    const usuario = JSON.parse(

        localStorage.getItem("usuarioSafeHer")

    );

    if (usuario) {

        document.getElementById("nomePerfil").textContent =
        usuario.nome || "Usuária";

        document.getElementById("emailPerfil").textContent =
        usuario.email || "email@email.com";

        document.getElementById("telefonePerfil").textContent =
        usuario.telefone || "(00) 00000-0000";

    }

    else {

        document.getElementById("nomePerfil").textContent =
        "Usuária";

        document.getElementById("emailPerfil").textContent =
        "email@email.com";

        document.getElementById("telefonePerfil").textContent =
        "(00) 00000-0000";

    }

}



// ======================================================
// LOGOUT
// ======================================================

const btnLogout =
document.getElementById("btnLogout");

if (btnLogout) {

    btnLogout.addEventListener("click", function () {

        const sair = confirm(

            "Deseja realmente sair da conta?"

        );

        if (sair) {

            window.location.href =

            "pagina_login.html";

        }

    });

}

// ======================================================
// SOS
// ======================================================

const btnSOS = document.getElementById("btnSOS");
const popupSOS = document.getElementById("popupSOS");

if (btnSOS && popupSOS) {

    btnSOS.addEventListener("click", function () {

        popupSOS.style.display = "flex";

    });

}



// ======================================================
// FECHAR POPUP
// ======================================================

const btnCancelarPopup =
document.getElementById("btnCancelarPopup");

if (btnCancelarPopup && popupSOS) {

    btnCancelarPopup.addEventListener("click", function () {

        popupSOS.style.display = "none";

    });

}


// Fecha clicando fora do popup

if (popupSOS) {

    popupSOS.addEventListener("click", function (e) {

        if (e.target === popupSOS) {

            popupSOS.style.display = "none";

        }

    });

}



// ======================================================
// ENVIAR ALERTA
// ======================================================

const btnEnviarAlerta =
document.getElementById("btnEnviarAlerta");

if (btnEnviarAlerta) {

    btnEnviarAlerta.addEventListener("click", function () {

        let historico = JSON.parse(

            localStorage.getItem("historicoAlertas")

        ) || [];

        historico.unshift({

            tipo: "enviado",

            titulo: "Alerta enviado",

            icone: "🚨",

            data: new Date().toLocaleString("pt-BR")

        });

        localStorage.setItem(

            "historicoAlertas",

            JSON.stringify(historico)

        );

        window.location.href =

        "pagina_sos_alerta_enviado.html";

    });

}



// ======================================================
// CANCELAR ALERTA
// ======================================================

const btnCancelarAlerta =
document.getElementById("btnCancelarAlerta");

if (btnCancelarAlerta) {

    btnCancelarAlerta.addEventListener("click", function () {

        let historico = JSON.parse(

            localStorage.getItem("historicoAlertas")

        ) || [];

        historico.unshift({

            tipo: "cancelado",

            titulo: "Alerta cancelado",

            icone: "❌",

            data: new Date().toLocaleString("pt-BR")

        });

        localStorage.setItem(

            "historicoAlertas",

            JSON.stringify(historico)

        );

        alert("Alerta cancelado.");

        window.location.href = "pagina_sos.html";

    });

}



// ======================================================
// HISTÓRICO
// ======================================================

const listaAlertas =
document.getElementById("listaAlertas");

if (listaAlertas) {

    const historico = JSON.parse(

        localStorage.getItem("historicoAlertas")

    ) || [];



    function criarCard(alerta) {

        return `

        <div class="alerta-card">

            <div class="icone-alerta">

                ${alerta.icone}

            </div>

            <div class="dados-alerta">

                <h3>

                    ${alerta.titulo}

                </h3>

                <p>

                    ${alerta.data}

                </p>

            </div>

            <span class="${

                alerta.tipo === "enviado"

                ? "status-concluido"

                : "status-cancelado"

            }">

                ${

                    alerta.tipo === "enviado"

                    ? "Enviado"

                    : "Cancelado"

                }

            </span>

        </div>

        `;

    }



    function mostrarHistorico(lista) {

        listaAlertas.innerHTML = "";



        if (lista.length === 0) {

            listaAlertas.innerHTML = `

            <div class="alerta-card vazio">

                <h3>Nenhum alerta encontrado.</h3>

            </div>

            `;

            return;

        }



        lista.forEach(alerta => {

            listaAlertas.innerHTML += criarCard(alerta);

        });

    }



    mostrarHistorico(historico);



    const btnTodos =
    document.getElementById("btnTodos");

    const btnEnviados =
    document.getElementById("btnEnviados");

    const btnCancelados =
    document.getElementById("btnCancelados");



    function atualizarBotoes(botao) {

        if (!btnTodos || !btnEnviados || !btnCancelados) return;

        btnTodos.classList.remove("ativo");
        btnEnviados.classList.remove("ativo");
        btnCancelados.classList.remove("ativo");

        botao.classList.add("ativo");

    }



    if (btnTodos) {

        btnTodos.addEventListener("click", function () {

            atualizarBotoes(btnTodos);

            mostrarHistorico(historico);

        });

    }



    if (btnEnviados) {

        btnEnviados.addEventListener("click", function () {

            atualizarBotoes(btnEnviados);

            mostrarHistorico(

                historico.filter(

                    alerta => alerta.tipo === "enviado"

                )

            );

        });

    }



    if (btnCancelados) {

        btnCancelados.addEventListener("click", function () {

            atualizarBotoes(btnCancelados);

            mostrarHistorico(

                historico.filter(

                    alerta => alerta.tipo === "cancelado"

                )

            );

        });

    }

}

// ======================================================
// ADICIONAR CONTATO
// ======================================================

const formContato = document.getElementById("formContato");

if (formContato) {

    formContato.addEventListener("submit", function (e) {

        e.preventDefault();

        const nome = document.getElementById("nomeContato").value.trim();
        const telefone = document.getElementById("telefoneContato").value.trim();
        const email = document.getElementById("emailContato").value.trim();

        if (nome === "" || telefone === "") {

            alert("Preencha nome e telefone.");
            return;

        }

        let contatos = JSON.parse(
            localStorage.getItem("contatosSafeHer")
        ) || [];

        contatos.push({

            nome,
            telefone,
            email

        });

        localStorage.setItem(
            "contatosSafeHer",
            JSON.stringify(contatos)
        );

        alert("Contato adicionado com sucesso!");

        window.location.href = "pagina_contatos.html";

    });

}



// ======================================================
// LISTAR CONTATOS
// ======================================================

const listaContatos =
document.getElementById("listaContatos");

if (listaContatos) {

    const contatos = JSON.parse(

        localStorage.getItem("contatosSafeHer")

    ) || [];

    contatos.forEach(contato => {

        listaContatos.innerHTML += `

        <div class="card-contato">

            <div class="foto-contato">

                👤

            </div>

            <div class="dados-contato">

                <h3>${contato.nome}</h3>

                <p>${contato.telefone}</p>

            </div>

            <button class="opcoes-contato">

                ⋮

            </button>

        </div>

        `;

    });

}



// ======================================================
// BOTÃO ADICIONAR CONTATO
// ======================================================

const btnAdicionarContato =
document.getElementById("btnAdicionarContato");

if (btnAdicionarContato) {

    btnAdicionarContato.addEventListener("click", function () {

        window.location.href =
        "pagina_adicionar_contato.html";

    });

}



// ======================================================
// LOCALIZAÇÃO
// ======================================================

const localizacaoAtual =
document.getElementById("localizacaoAtual");

if (localizacaoAtual) {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function (posicao) {

                localizacaoAtual.innerHTML =

                `<strong>Latitude:</strong>
                ${posicao.coords.latitude.toFixed(5)}

                <br>

                <strong>Longitude:</strong>
                ${posicao.coords.longitude.toFixed(5)}`;

            },

            function () {

                localizacaoAtual.textContent =

                "Não foi possível obter sua localização.";

            }

        );

    }

}



const btnCompartilharLocalizacao =
document.getElementById("btnCompartilharLocalizacao");

if (btnCompartilharLocalizacao) {

    btnCompartilharLocalizacao.addEventListener("click", function () {

        alert(

            "Localização compartilhada com seus contatos de confiança."

        );

    });

}



// ======================================================
// GRAVADOR
// ======================================================

const btnIniciarGravacao =
document.getElementById("btnIniciarGravacao");

const btnPararGravacao =
document.getElementById("btnPararGravacao");

const statusGravacao =
document.querySelector(".status-gravacao");

if (btnIniciarGravacao) {

    btnIniciarGravacao.addEventListener("click", function () {

        if (statusGravacao) {

            statusGravacao.innerHTML =

            "🔴 Gravando...";

        }

    });

}

if (btnPararGravacao) {

    btnPararGravacao.addEventListener("click", function () {

        if (statusGravacao) {

            statusGravacao.innerHTML =

            "✅ Gravação finalizada";

        }

        alert("Áudio salvo com sucesso!");

    });

}



// ======================================================
// CONFIGURAÇÕES
// ======================================================

const btnSalvarConfig =
document.getElementById("btnSalvarConfig");

if (btnSalvarConfig) {

    const notificacoes =
    document.getElementById("notificacoes");

    const compartilhamento =
    document.getElementById("compartilhamento");

    const configuracoes = JSON.parse(

        localStorage.getItem("configuracoesSafeHer")

    );

    if (configuracoes) {

        notificacoes.checked =
        configuracoes.notificacoes;

        compartilhamento.checked =
        configuracoes.compartilhamento;

    }

    btnSalvarConfig.addEventListener("click", function () {

        localStorage.setItem(

            "configuracoesSafeHer",

            JSON.stringify({

                notificacoes: notificacoes.checked,

                compartilhamento: compartilhamento.checked

            })

        );

        alert("Configurações salvas com sucesso!");

    });

}



// ======================================================
// BOTÕES GOOGLE
// ======================================================

const btnGoogleLogin =
document.getElementById("btnGoogleLogin");

if (btnGoogleLogin) {

    btnGoogleLogin.addEventListener("click", function () {

        alert("Login com Google indisponível nesta versão.");

    });

}



const btnGoogleCadastro =
document.getElementById("btnGoogleCadastro");

if (btnGoogleCadastro) {

    btnGoogleCadastro.addEventListener("click", function () {

        alert("Cadastro com Google indisponível nesta versão.");

    });

}

/* =========================================
   SAFEHER - NAVEGAÇÃO SOS
========================================= */


/* Botão SOS */

const botaoSOS = document.getElementById("btnSOS");

if (botaoSOS) {

    botaoSOS.addEventListener("click", function () {

        window.location.href = "pagina_mensagem_sos.html";

    });

}




/* Botão enviar alerta */

const botaoEnviarAlerta = document.getElementById("btnEnviarAlerta");

if (botaoEnviarAlerta) {

    botaoEnviarAlerta.addEventListener("click", function () {

        window.location.href = "pagina_sos_alerta_enviado.html";

    });

}




/* Botão cancelar mensagem SOS */

const botaoCancelarSOS = document.getElementById("btnCancelarSOS");

if (botaoCancelarSOS) {

    botaoCancelarSOS.addEventListener("click", function () {

        window.location.href = "pagina_sos.html";

    });

}
