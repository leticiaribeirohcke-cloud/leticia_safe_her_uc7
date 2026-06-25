// =========================
// CADASTRO
// =========================

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    formCadastro.addEventListener("submit", function(event){

        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("emailCadastro").value;
        const senha = document.getElementById("senhaCadastro").value;
        const confirmar = document.getElementById("confirmarSenha").value;
        const telefone = document.getElementById("telefone").value;

        if(senha !== confirmar){
            alert("As senhas não coincidem.");
            return;
        }

        const usuario = {
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone
        };

        localStorage.setItem(
            "usuarioSafeHer",
            JSON.stringify(usuario)
        );

        alert("Conta criada com sucesso!");

        window.location.href = "pagina_sos.html";

    });

}


// =========================
// LOGIN
// =========================

const formLogin = document.getElementById("formLogin");

if(formLogin){

    formLogin.addEventListener("submit", function(e){

        e.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const usuarioSalvo =
            JSON.parse(
                localStorage.getItem("usuarioSafeHer")
            );

        if(!usuarioSalvo){

            alert(
                "Nenhuma conta cadastrada. Faça seu cadastro primeiro."
            );

            return;
        }

        if(
            email === usuarioSalvo.email &&
            senha === usuarioSalvo.senha
        ){

            alert("Login realizado com sucesso!");

            window.location.href =
                "pagina_sos.html";

        }
        else{

            alert(
                "Email ou senha incorretos."
            );

        }

    });

}


// =========================
// RECUPERAR SENHA
// =========================

const formRecuperarSenha =
    document.getElementById("formRecuperarSenha");

if(formRecuperarSenha){

    formRecuperarSenha.addEventListener("submit", function(e){

        e.preventDefault();

        const email =
            document.getElementById(
                "emailRecuperacao"
            ).value;

        const usuario =
            JSON.parse(
                localStorage.getItem("usuarioSafeHer")
            );

        if(!usuario){

            alert(
                "Nenhum usuário cadastrado."
            );

            return;
        }

        if(email === usuario.email){

            alert(
                "Sua senha é: " +
                usuario.senha
            );

        }
        else{

            alert(
                "Email não encontrado."
            );

        }

    });

}


// =========================
// PERFIL
// =========================

const nomePerfil =
    document.getElementById("nomePerfil");

if(nomePerfil){

    const usuario =
        JSON.parse(
            localStorage.getItem("usuarioSafeHer")
        );

    if(usuario){

        document.getElementById(
            "nomePerfil"
        ).textContent =
            usuario.nome;

        document.getElementById(
            "emailPerfil"
        ).textContent =
            usuario.email;

        document.getElementById(
            "telefonePerfil"
        ).textContent =
            usuario.telefone;

    }

}


// =========================
// LOGOUT
// =========================

const btnLogout =
    document.getElementById("btnLogout");

if(btnLogout){

    btnLogout.addEventListener("click", function(){

        if(confirm("Deseja sair da conta?")){

            window.location.href =
                "pagina_login.html";

        }

    });

}


// =========================
// SOS
// =========================

const btnSOS =
    document.getElementById("btnSOS");

const popupSOS =
    document.getElementById("popupSOS");

if(btnSOS){

    btnSOS.addEventListener("click", function(){

        popupSOS.style.display =
            "flex";

    });

}

const btnCancelarPopup =
    document.getElementById(
        "btnCancelarPopup"
    );

if(btnCancelarPopup){

    btnCancelarPopup.addEventListener("click", function(){

        popupSOS.style.display =
            "none";

    });

}

const btnEnviarAlerta =
    document.getElementById(
        "btnEnviarAlerta"
    );

if(btnEnviarAlerta){

    btnEnviarAlerta.addEventListener("click", function(){

        let historico =
            JSON.parse(
                localStorage.getItem(
                    "historicoAlertas"
                )
            ) || [];

        historico.push({
            tipo: "enviado",
            data: new Date().toLocaleString()
        });

        localStorage.setItem(
            "historicoAlertas",
            JSON.stringify(historico)
        );

        window.location.href =
            "pagina_sos_alerta_enviado.html";

    });

}


// =========================
// CANCELAR ALERTA
// =========================

const btnCancelarAlerta =
    document.getElementById(
        "btnCancelarAlerta"
    );

if(btnCancelarAlerta){

    btnCancelarAlerta.addEventListener("click", function(){

        let historico =
            JSON.parse(
                localStorage.getItem(
                    "historicoAlertas"
                )
            ) || [];

        historico.push({
            tipo: "cancelado",
            data: new Date().toLocaleString()
        });

        localStorage.setItem(
            "historicoAlertas",
            JSON.stringify(historico)
        );

        window.location.href =
            "pagina_sos.html";

    });

}


// =========================
// ADICIONAR CONTATO
// =========================

const formContato =
    document.getElementById(
        "formContato"
    );

if(formContato){

    formContato.addEventListener("submit", function(e){

        e.preventDefault();

        const nome =
            document.getElementById(
                "nomeContato"
            ).value;

        const telefone =
            document.getElementById(
                "telefoneContato"
            ).value;

        const email =
            document.getElementById(
                "emailContato"
            ).value;

        let contatos =
            JSON.parse(
                localStorage.getItem(
                    "contatosSafeHer"
                )
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

        alert(
            "Contato adicionado com sucesso!"
        );

        window.location.href =
            "pagina_contatos.html";

    });

}


// =========================
// EXIBIR CONTATOS
// =========================

const listaContatos =
    document.getElementById(
        "listaContatos"
    );

if(listaContatos){

    const contatos =
        JSON.parse(
            localStorage.getItem(
                "contatosSafeHer"
            )
        ) || [];

    contatos.forEach(contato => {

        listaContatos.innerHTML += `
        <div class="contato">
            <div>
                <h3>${contato.nome}</h3>
                <p>${contato.telefone}</p>
            </div>
        </div>
        `;

    });

}


// =========================
// HISTÓRICO
// =========================

const listaAlertas =
    document.getElementById(
        "listaAlertas"
    );

if(listaAlertas){

    const historico =
        JSON.parse(
            localStorage.getItem(
                "historicoAlertas"
            )
        ) || [];

    mostrarHistorico(historico);

    function mostrarHistorico(lista){

        listaAlertas.innerHTML = "";

        lista.forEach(alerta => {

            listaAlertas.innerHTML += `
            <div class="alerta-card">

                <div class="dados-alerta">

                    <h3>
                        Alerta ${alerta.tipo}
                    </h3>

                    <p>
                        ${alerta.data}
                    </p>

                </div>

            </div>
            `;

        });

    }

    const btnTodos =
        document.getElementById(
            "btnTodos"
        );

    const btnEnviados =
        document.getElementById(
            "btnEnviados"
        );

    const btnCancelados =
        document.getElementById(
            "btnCancelados"
        );

    if(btnTodos){

        btnTodos.addEventListener("click", ()=>{

            mostrarHistorico(historico);

        });

    }

    if(btnEnviados){

        btnEnviados.addEventListener("click", ()=>{

            mostrarHistorico(
                historico.filter(
                    a => a.tipo === "enviado"
                )
            );

        });

    }

    if(btnCancelados){

        btnCancelados.addEventListener("click", ()=>{

            mostrarHistorico(
                historico.filter(
                    a => a.tipo === "cancelado"
                )
            );

        });

    }

}


// =========================
// LOCALIZAÇÃO
// =========================

const localizacaoAtual =
    document.getElementById(
        "localizacaoAtual"
    );

if(localizacaoAtual){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(

            function(posicao){

                localizacaoAtual.textContent =
                    "Latitude: " +
                    posicao.coords.latitude +
                    " | Longitude: " +
                    posicao.coords.longitude;

            },

            function(){

                localizacaoAtual.textContent =
                    "Não foi possível obter localização.";

            }

        );

    }

}


// =========================
// COMPARTILHAR LOCALIZAÇÃO
// =========================

const btnCompartilharLocalizacao =
    document.getElementById(
        "btnCompartilharLocalizacao"
    );

if(btnCompartilharLocalizacao){

    btnCompartilharLocalizacao.addEventListener("click", function(){

        alert(
            "Localização compartilhada com seus contatos."
        );

    });

}


// =========================
// GRAVADOR
// =========================

const btnIniciarGravacao =
    document.getElementById(
        "btnIniciarGravacao"
    );

if(btnIniciarGravacao){

    btnIniciarGravacao.addEventListener("click", function(){

        alert(
            "Gravação iniciada."
        );

    });

}

const btnPararGravacao =
    document.getElementById(
        "btnPararGravacao"
    );

if(btnPararGravacao){

    btnPararGravacao.addEventListener("click", function(){

        alert(
            "Gravação salva."
        );

    });

}


// =========================
// CONFIGURAÇÕES
// =========================

const btnSalvarConfig =
    document.getElementById(
        "btnSalvarConfig"
    );

if(btnSalvarConfig){

    btnSalvarConfig.addEventListener("click", function(){

        const config = {

            notificacoes:
                document.getElementById(
                    "notificacoes"
                ).checked,

            compartilhamento:
                document.getElementById(
                    "compartilhamento"
                ).checked

        };

        localStorage.setItem(
            "configuracoesSafeHer",
            JSON.stringify(config)
        );

        alert(
            "Configurações salvas."
        );

    });

}


// =========================
// GOOGLE (SIMULAÇÃO)
// =========================

const btnGoogleLogin =
    document.getElementById(
        "btnGoogleLogin"
    );

if(btnGoogleLogin){

    btnGoogleLogin.addEventListener("click", function(){

        alert(
            "Integração com Google disponível apenas online."
        );

    });

}

const btnGoogleCadastro =
    document.getElementById(
        "btnGoogleCadastro"
    );

if(btnGoogleCadastro){

    btnGoogleCadastro.addEventListener("click", function(){

        alert(
            "Integração com Google disponível apenas online."
        );

    });

}