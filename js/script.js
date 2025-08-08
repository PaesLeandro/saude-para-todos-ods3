// SPA Navegação
document.querySelectorAll('.nav-item').forEach(function (btn) {
    btn.onclick = function () {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        var sec = this.getAttribute('data-section');
        document.querySelectorAll('.spa-section').forEach(s => s.classList.remove('active'));
        document.getElementById(sec).classList.add('active');
        window.scrollTo(0, 0);
    };
});

// DADOS DAS NOTÍCIAS
var noticiasPool = [
    { titulo: "Nova vacina contra dengue aprovada", descricao: "ANVISA aprova nova vacina que promete reduzir em 80% os casos graves da doença.", fonte: "MS Brasil", tempo: "Hoje" },
    { titulo: "Telemedicina cresce 300% no Brasil", descricao: "Modalidade se consolidou como alternativa eficaz para consultas de rotina.", fonte: "CFM", tempo: "Ontem" },
    { titulo: "Descoberta promissora no Alzheimer", descricao: "Novo medicamento em testes clínicos mostra resultados animadores.", fonte: "FAPESP", tempo: "2 dias atrás" },
    { titulo: "Brasil reduz mortalidade infantil em 15%", descricao: "Políticas públicas de saúde materna mostram resultados positivos.", fonte: "IBGE", tempo: "3 dias atrás" },
    { titulo: "Campanha nacional contra diabetes", descricao: "Testes gratuitos serão realizados em todo território nacional.", fonte: "SBD", tempo: "4 dias atrás" },
    { titulo: "Novo protocolo de vacinação COVID-19", descricao: "Atualização inclui novos grupos prioritários e intervalos entre doses.", fonte: "MS Brasil", tempo: "5 dias atrás" },
    { titulo: "Inteligência Artificial no diagnóstico", descricao: "Hospitais adotam IA para acelerar diagnósticos com precisão de 95%.", fonte: "Hospital Sírio-Libanês", tempo: "1 semana atrás" },
    { titulo: "Programa Brasil Sorridente expandido", descricao: "Atendimento odontológico gratuito chega a mais 500 municípios.", fonte: "SUS", tempo: "1 semana atrás" }
];

// DADOS DAS DICAS
var dicasPool = [
    { titulo: "💧 Hidratação", dica: "Beba pelo menos 2 litros de água por dia para manter seu corpo hidratado." },
    { titulo: "🏃‍♂️ Exercício Regular", dica: "Pratique pelo menos 150 minutos de atividade física moderada por semana." },
    { titulo: "🥗 Alimentação Balanceada", dica: "Consuma 5 porções de frutas e vegetais diariamente." },
    { titulo: "😴 Sono Reparador", dica: "Durma de 7-9 horas por noite para se recuperar e regenerar." },
    { titulo: "🧘‍♀️ Saúde Mental", dica: "Pratique meditação ou mindfulness por 10 minutos diários." },
    { titulo: "🩺 Prevenção", dica: "Realize check-ups médicos regulares e mantenha suas vacinas em dia." },
    { titulo: "🚶‍♀️ Caminhada Diária", dica: "Caminhe pelo menos 10.000 passos por dia para melhorar a saúde cardiovascular." },
    { titulo: "🧴 Protetor Solar", dica: "Use protetor solar FPS 30+ diariamente, mesmo em dias nublados." },
    { titulo: "🥛 Vitamina D", dica: "Exponha-se ao sol por 15-20 minutos diários para sintetizar vitamina D." },
    { titulo: "🧠 Exercício Mental", dica: "Mantenha o cérebro ativo com leitura, jogos e quebra-cabeças." },
    { titulo: "🤝 Relacionamentos", dica: "Cultive relacionamentos saudáveis para melhorar o bem-estar emocional." },
    { titulo: "📱 Limite de Telas", dica: "Evite telas pelo menos 1 hora antes de dormir para melhor qualidade do sono." }
];

var noticiasAtuais = noticiasPool.slice(0, 3);
var dicasAtuais = dicasPool.slice(0, 6);
var autoUpdateNoticias = false;
var intervalNoticias = null;

// FUNCIONALIDADES DAS NOTÍCIAS
function atualizarNoticias() {
    var loading = document.getElementById('loading-noticias');
    var container = document.getElementById('noticias-container');

    loading.style.display = 'block';
    container.style.opacity = '0.5';

    setTimeout(function () {
        var novasNoticias = noticiasPool.sort(function () { return Math.random() - 0.5; }).slice(0, 3);
        var html = '';

        novasNoticias.forEach(function (noticia) {
            html += '<div class="tip-card news-item new"><h4>' + noticia.titulo + '</h4><p>' + noticia.descricao + '</p><small style="color: #64748b;">' + noticia.tempo + ' • ' + noticia.fonte + '</small></div>';
        });

        container.innerHTML = html;
        document.getElementById('ultima-atualizacao-noticias').textContent = 'Última atualização: ' + new Date().toLocaleTimeString();

        loading.style.display = 'none';
        container.style.opacity = '1';

        // Remover classe "new" após 3 segundos
        setTimeout(function () {
            document.querySelectorAll('.news-item.new').forEach(function (item) {
                item.classList.remove('new');
            });
        }, 3000);
    }, 1500);
}

function toggleAutoUpdateNoticias() {
    var btn = document.getElementById('btn-auto-update');

    if (autoUpdateNoticias) {
        clearInterval(intervalNoticias);
        autoUpdateNoticias = false;
        btn.textContent = '⏰ Auto-Update: OFF';
        btn.style.background = 'var(--secondary)';
    } else {
        intervalNoticias = setInterval(atualizarNoticias, 30000); // 30 segundos
        autoUpdateNoticias = true;
        btn.textContent = '⏰ Auto-Update: ON';
        btn.style.background = '#ef4444';
    }
}

// FUNCIONALIDADES DAS DICAS
function adicionarNovaDica() {
    var dicasDisponiveis = dicasPool.filter(function (dica) {
        return !dicasAtuais.some(function (atual) {
            return atual.titulo === dica.titulo;
        });
    });

    if (dicasDisponiveis.length === 0) {
        alert('Todas as dicas já foram exibidas! 🎉');
        return;
    }

    var novaDica = dicasDisponiveis[Math.floor(Math.random() * dicasDisponiveis.length)];
    dicasAtuais.push(novaDica);

    if (dicasAtuais.length > 8) {
        dicasAtuais.shift(); // Remove a primeira dica se há mais de 8
    }

    atualizarDicasContainer();
    document.getElementById('ultima-atualizacao-dicas').textContent = 'Nova dica adicionada às ' + new Date().toLocaleTimeString();
}

function dicaAleatoria() {
    var container = document.getElementById('dicas-container');
    var dicas = container.querySelectorAll('.dica-item');

    // Remove destaque anterior
    dicas.forEach(function (dica) {
        dica.classList.remove('destacada');
    });

    // Adiciona destaque aleatório
    var dicaAleatoria = dicas[Math.floor(Math.random() * dicas.length)];
    dicaAleatoria.classList.add('destacada');

    // Remove destaque após 3 segundos
    setTimeout(function () {
        dicaAleatoria.classList.remove('destacada');
    }, 3000);
}

function atualizarDicasContainer() {
    var container = document.getElementById('dicas-container');
    var html = '';

    dicasAtuais.forEach(function (dica) {
        html += '<div class="tip-card dica-item"><h4>' + dica.titulo + '</h4><p>' + dica.dica + '</p></div>';
    });

    container.innerHTML = html;
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function () {
    // Busca posto de saúde
    var buscaForm = document.getElementById('form-busca');
    if (buscaForm) {
        buscaForm.onsubmit = function (e) {
            e.preventDefault();
            var local = document.getElementById('busca-local').value.trim();
            var erro = document.getElementById('busca-erro');
            erro.textContent = '';
            if (!local || local.length < 2) {
                erro.textContent = 'Informe uma cidade ou bairro válido.';
                return false;
            }
            window.open('https://www.google.com/maps/search/posto+de+saúde+' + encodeURIComponent(local), '_blank');
            return false;
        };
    }

    // IMC
    var imcForm = document.getElementById('form-imc');
    if (imcForm) {
        imcForm.onsubmit = function (e) {
            e.preventDefault();
            var peso = parseFloat(document.getElementById('peso').value.replace(',', '.'));
            var altura = parseFloat(document.getElementById('altura').value.replace(',', '.')) / 100;
            var erro = document.getElementById('imc-erro');
            var res = document.getElementById('imc-resultado');
            erro.textContent = '';
            res.textContent = '';
            if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0 || altura > 2.5) {
                erro.textContent = 'Preencha peso e altura válidos. Altura deve ser em centímetros (ex: 175).';
                return false;
            }
            var imc = peso / (altura * altura);
            var cat = '';
            if (imc < 18.5) cat = 'Abaixo do peso';
            else if (imc < 25) cat = 'Peso normal';
            else if (imc < 30) cat = 'Sobrepeso';
            else cat = 'Obesidade';
            res.innerHTML = 'IMC: <b>' + imc.toFixed(1) + '</b><br>Categoria: <b>' + cat + '</b>';
            return false;
        };
    }

    // Botões de notícias
    document.getElementById('btn-atualizar-noticias').onclick = atualizarNoticias;
    document.getElementById('btn-auto-update').onclick = toggleAutoUpdateNoticias;

    // Botões de dicas
    document.getElementById('btn-atualizar-dicas').onclick = adicionarNovaDica;
    document.getElementById('btn-dica-aleatoria').onclick = dicaAleatoria;
});
