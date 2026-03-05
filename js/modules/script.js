// SPA Navegação
function activateNavSection(buttonElement) {
    if (!buttonElement) {
        return;
    }
    document.querySelectorAll('.nav-item').forEach(function (navButton) {
        navButton.classList.remove('active');
    });
    buttonElement.classList.add('active');

    var sectionId = buttonElement.getAttribute('data-section');
    document.querySelectorAll('.spa-section').forEach(function (section) {
        section.classList.remove('active');
    });
    var sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
        sectionElement.classList.add('active');
    }
    window.scrollTo(0, 0);
}

document.querySelectorAll('.nav-item').forEach(function (btn) {
    btn.onclick = function () {
        activateNavSection(this);
    };
});

var linksUteisNavButton = document.querySelector('.nav-item[data-section="linksuteis"]');
var inicioNavButton = document.querySelector('.nav-item[data-section="inicio"]');
var linksUteisSection = document.getElementById('linksuteis');
var linksUteisReturnTimer = null;
var isHoveringLinksButton = false;
var isHoveringLinksSection = false;

function clearLinksUteisReturnTimer() {
    if (linksUteisReturnTimer) {
        clearTimeout(linksUteisReturnTimer);
        linksUteisReturnTimer = null;
    }
}

function scheduleReturnToInicioFromLinks() {
    clearLinksUteisReturnTimer();
    linksUteisReturnTimer = setTimeout(function () {
        if (isHoveringLinksButton || isHoveringLinksSection) {
            return;
        }
        if (linksUteisNavButton && linksUteisNavButton.classList.contains('active')) {
            activateNavSection(inicioNavButton);
        }
    }, 450);
}

if (linksUteisNavButton) {
    linksUteisNavButton.addEventListener('mouseenter', function () {
        isHoveringLinksButton = true;
        clearLinksUteisReturnTimer();
        activateNavSection(linksUteisNavButton);
    });

    linksUteisNavButton.addEventListener('mouseleave', function () {
        isHoveringLinksButton = false;
        scheduleReturnToInicioFromLinks();
    });
}

if (linksUteisSection) {
    linksUteisSection.addEventListener('mouseenter', function () {
        isHoveringLinksSection = true;
        clearLinksUteisReturnTimer();
    });

    linksUteisSection.addEventListener('mouseleave', function () {
        isHoveringLinksSection = false;
        scheduleReturnToInicioFromLinks();
    });
}

var appData = window.APP_DATA || {};
var noticiasPool = appData.noticiasPool || [];
var dicasPool = appData.dicasPool || [];
var appUtils = window.APP_UTILS || {};
var appRender = window.APP_RENDER || {};
var bindClickById = appUtils.bindClickById || function (id, handler) {
    var element = document.getElementById(id);
    if (element) {
        element.onclick = handler;
    }
};
var defaultMessages = {
    searchInvalid: 'Informe uma cidade ou bairro válido.',
    imcInvalid: 'Preencha peso e altura válidos. Altura deve ser em centímetros (ex: 175).',
    allTipsShown: 'Todas as dicas já foram exibidas! 🎉',
    updateNewsPrefix: 'Última atualização: ',
    newTipPrefix: 'Nova dica adicionada às ',
    autoUpdateOn: '⏰ Auto-Update: ON',
    autoUpdateOff: '⏰ Auto-Update: OFF',
    appointmentScheduled: 'Consulta agendada!',
    diarySaved: 'Entrada registrada!',
    waterRegistered: 'Quantidade registrada!',
    medicineAdded: 'Medicamento adicionado!',
    coletaSaved: 'Registro salvo com sucesso.',
    coletaCleared: 'Histórico de coleta limpo.',
    coletaEmptyExport: 'Não há registros para exportar em PDF.',
    hidratacaoUpdated: 'Hidratação atualizada.',
    hidratacaoReset: 'Hidratação diária reiniciada.',
    medicamentosCleared: 'Lista de medicamentos limpa.',
    medicamentoTaken: 'Dose marcada como tomada.',
    medicamentoUntaken: 'Dose desmarcada.',
    medicamentoRemoved: 'Medicamento removido.',
    consultaSaved: 'Consulta salva com sucesso.',
    consultasCleared: 'Todas as consultas foram removidas.',
    consultaRemoved: 'Consulta removida.',
    consultaInvalidCpf: 'CPF inválido. Verifique os dígitos informados.',
    consultaInvalidPhone: 'Telefone inválido. Use DDD + número (10 ou 11 dígitos).',
    consultaInvalidCep: 'CEP inválido. Use 8 dígitos (ex: 01001-000).',
    consultaInvalidState: 'Estado inválido. Informe a UF com 2 letras (ex: SP).'
};
var appMessages = Object.assign({}, defaultMessages, window.APP_MESSAGES || {});
var defaultConfig = {
    initialNewsCount: 3,
    initialTipsCount: 6,
    maxTipsDisplayed: 8,
    newsUpdateIntervalMs: 30000,
    newsLoadingDelayMs: 1500,
    newNewsHighlightDurationMs: 3000,
    tipHighlightDurationMs: 3000,
    defaultHydrationGoalMl: 2000,
    maxColetaRecords: 60,
    maxConsultasRecords: 120
};
var appConfig = Object.assign({}, defaultConfig, window.APP_CONFIG || {});
var renderNewsCardsHtml = appRender.renderNewsCardsHtml || function (noticias) {
    var html = '';
    noticias.forEach(function (noticia) {
        html += '<div class="tip-card news-item new"><h4>' + noticia.titulo + '</h4><p>' + noticia.descricao + '</p><small class="news-meta">' + noticia.tempo + ' • ' + noticia.fonte + '</small></div>';
    });
    return html;
};
var renderTipsCardsHtml = appRender.renderTipsCardsHtml || function (dicas) {
    var html = '';
    dicas.forEach(function (dica) {
        html += '<div class="tip-card dica-item"><h4>' + dica.titulo + '</h4><p>' + dica.dica + '</p></div>';
    });
    return html;
};
var removeClassAfterDelay = appUtils.removeClassAfterDelay || function (selector, className, delayMs) {
    setTimeout(function () {
        document.querySelectorAll(selector).forEach(function (element) {
            element.classList.remove(className);
        });
    }, delayMs);
};
var STORAGE_KEYS = {
    consultas: 'ods3_consultas_registros',
    coleta: 'ods3_coleta_registros',
    hidratacao: 'ods3_hidratacao_diaria',
    medicamentos: 'ods3_medicamentos'
};

function getTodayISO() {
    return new Date().toISOString().slice(0, 10);
}

function readStorage(key, fallbackValue) {
    try {
        var raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallbackValue;
    } catch (error) {
        return fallbackValue;
    }
}

function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function updateStatusById(id, message) {
    var element = document.getElementById(id);
    if (element) {
        element.textContent = message;
    }
}

function onlyDigits(value) {
    return (value || '').replace(/\D/g, '');
}

function formatCPF(value) {
    var digits = onlyDigits(value).slice(0, 11);
    if (digits.length <= 3) {
        return digits;
    }
    if (digits.length <= 6) {
        return digits.slice(0, 3) + '.' + digits.slice(3);
    }
    if (digits.length <= 9) {
        return digits.slice(0, 3) + '.' + digits.slice(3, 6) + '.' + digits.slice(6);
    }
    return digits.slice(0, 3) + '.' + digits.slice(3, 6) + '.' + digits.slice(6, 9) + '-' + digits.slice(9, 11);
}

function formatPhoneBR(value) {
    var digits = onlyDigits(value).slice(0, 11);
    if (digits.length <= 2) {
        return digits;
    }

    if (digits.length <= 6) {
        return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
    }

    if (digits.length <= 10) {
        return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
    }

    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7, 11);
}

function formatCEP(value) {
    var digits = onlyDigits(value).slice(0, 8);
    if (digits.length <= 5) {
        return digits;
    }
    return digits.slice(0, 5) + '-' + digits.slice(5);
}

function isValidCPF(cpfValue) {
    var cpf = onlyDigits(cpfValue);
    if (cpf.length !== 11 || /(\d)\1{10}/.test(cpf)) {
        return false;
    }

    var sum = 0;
    var remainder = 0;
    var index = 0;

    for (index = 1; index <= 9; index++) {
        sum += parseInt(cpf.substring(index - 1, index), 10) * (11 - index);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(9, 10), 10)) {
        return false;
    }

    sum = 0;
    for (index = 1; index <= 10; index++) {
        sum += parseInt(cpf.substring(index - 1, index), 10) * (12 - index);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }

    return remainder === parseInt(cpf.substring(10, 11), 10);
}

function isValidPhoneBR(phoneValue) {
    var phone = onlyDigits(phoneValue);
    if (!(phone.length === 10 || phone.length === 11)) {
        return false;
    }

    var ddd = phone.substring(0, 2);
    if (/^0/.test(ddd)) {
        return false;
    }

    if (phone.length === 11 && phone.charAt(2) !== '9') {
        return false;
    }

    return true;
}

function isValidCEP(cepValue) {
    return /^\d{5}-?\d{3}$/.test((cepValue || '').trim());
}

function isValidUF(ufValue) {
    return /^[A-Za-z]{2}$/.test((ufValue || '').trim());
}

var noticiasAtuais = noticiasPool.slice(0, appConfig.initialNewsCount);
var dicasAtuais = dicasPool.slice(0, appConfig.initialTipsCount);
var autoUpdateNoticias = false;
var intervalNoticias = null;
var consultasRegistros = readStorage(STORAGE_KEYS.consultas, []);
var coletaRegistros = readStorage(STORAGE_KEYS.coleta, []);
var medicamentosRegistros = readStorage(STORAGE_KEYS.medicamentos, []);
var hidratacaoState = readStorage(STORAGE_KEYS.hidratacao, {
    date: getTodayISO(),
    goal: appConfig.defaultHydrationGoalMl,
    consumed: 0
});

if (hidratacaoState.date !== getTodayISO()) {
    hidratacaoState = {
        date: getTodayISO(),
        goal: hidratacaoState.goal || appConfig.defaultHydrationGoalMl,
        consumed: 0
    };
    writeStorage(STORAGE_KEYS.hidratacao, hidratacaoState);
}

// FUNCIONALIDADES DAS NOTÍCIAS
function atualizarNoticias() {
    var loading = document.getElementById('loading-noticias');
    var container = document.getElementById('noticias-container');

    loading.style.display = 'block';
    container.style.opacity = '0.5';

    setTimeout(function () {
        var novasNoticias = noticiasPool.sort(function () { return Math.random() - 0.5; }).slice(0, appConfig.initialNewsCount);
        container.innerHTML = renderNewsCardsHtml(novasNoticias);
        document.getElementById('ultima-atualizacao-noticias').textContent = appMessages.updateNewsPrefix + new Date().toLocaleTimeString();

        loading.style.display = 'none';
        container.style.opacity = '1';

        // Remover classe "new" após duração configurada
        removeClassAfterDelay('.news-item.new', 'new', appConfig.newNewsHighlightDurationMs);
    }, appConfig.newsLoadingDelayMs);
}

function toggleAutoUpdateNoticias() {
    var btn = document.getElementById('btn-auto-update');

    if (autoUpdateNoticias) {
        clearInterval(intervalNoticias);
        autoUpdateNoticias = false;
        btn.textContent = appMessages.autoUpdateOff;
        btn.style.background = 'var(--secondary)';
    } else {
        intervalNoticias = setInterval(atualizarNoticias, appConfig.newsUpdateIntervalMs);
        autoUpdateNoticias = true;
        btn.textContent = appMessages.autoUpdateOn;
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
        alert(appMessages.allTipsShown);
        return;
    }

    var novaDica = dicasDisponiveis[Math.floor(Math.random() * dicasDisponiveis.length)];
    dicasAtuais.push(novaDica);

    if (dicasAtuais.length > appConfig.maxTipsDisplayed) {
        dicasAtuais.shift();
    }

    atualizarDicasContainer();
    document.getElementById('ultima-atualizacao-dicas').textContent = appMessages.newTipPrefix + new Date().toLocaleTimeString();
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

    // Remove destaque após duração configurada
    setTimeout(function () {
        dicaAleatoria.classList.remove('destacada');
    }, appConfig.tipHighlightDurationMs);
}

function atualizarDicasContainer() {
    var container = document.getElementById('dicas-container');
    container.innerHTML = renderTipsCardsHtml(dicasAtuais);
}

function renderConsultasLista() {
    var container = document.getElementById('consultas-lista');
    if (!container) {
        return;
    }

    if (!consultasRegistros.length) {
        container.innerHTML = '<div class="health-item"><p>Nenhuma consulta agendada.</p></div>';
        return;
    }

    var html = '';
    consultasRegistros.forEach(function (consulta) {
        html += '<div class="health-item">' +
            '<div>' +
            '<h4>' + consulta.especialidade + ' • ' + consulta.data + ' às ' + consulta.hora + '</h4>' +
            '<p><strong>Paciente:</strong> ' + consulta.nome + ' | <strong>Contato:</strong> ' + consulta.telefone + '</p>' +
            '<p><strong>CEP:</strong> ' + (consulta.cep || '-') + ' | <strong>Endereço:</strong> ' + (consulta.endereco || '-') + '</p>' +
            '<p><strong>Bairro:</strong> ' + (consulta.bairro || '-') + ' | <strong>Cidade/UF:</strong> ' + (consulta.cidade || '-') + '/' + (consulta.estado || '-') + '</p>' +
            '<p><strong>Unidade:</strong> ' + consulta.unidade + (consulta.profissional ? ' | <strong>Profissional:</strong> ' + consulta.profissional : '') + '</p>' +
            '<p><strong>CPF:</strong> ' + (consulta.cpf || '-') + '</p>' +
            '<p><strong>Observações:</strong> ' + (consulta.observacoes || '-') + '</p>' +
            '</div>' +
            '<div class="health-item-actions">' +
            '<button class="mini-btn danger" data-action="remove-consulta" data-id="' + consulta.id + '">Excluir</button>' +
            '</div>' +
            '</div>';
    });
    container.innerHTML = html;
}

function persistirConsultas() {
    writeStorage(STORAGE_KEYS.consultas, consultasRegistros);
    renderConsultasLista();
    updateStatusById('consultas-status', 'Total de consultas: ' + consultasRegistros.length + '.');
}

function salvarConsulta(event) {
    event.preventDefault();
    var nome = document.getElementById('consulta-nome').value.trim();
    var cpf = document.getElementById('consulta-cpf').value.trim();
    var telefone = document.getElementById('consulta-telefone').value.trim();
    var cep = document.getElementById('consulta-cep').value.trim();
    var endereco = document.getElementById('consulta-endereco').value.trim();
    var bairro = document.getElementById('Bairro').value.trim();
    var cidade = document.getElementById('cidade').value.trim();
    var estado = document.getElementById('estado').value.trim().toUpperCase();
    var data = document.getElementById('consulta-data').value;
    var hora = document.getElementById('consulta-hora').value;
    var especialidade = document.getElementById('consulta-especialidade').value;
    var unidade = document.getElementById('consulta-unidade').value.trim();
    var profissional = document.getElementById('consulta-profissional').value.trim();
    var observacoes = document.getElementById('consulta-observacoes').value.trim();

    if (!nome || !telefone || !cep || !endereco || !bairro || !cidade || !estado || !data || !hora || !especialidade || !unidade) {
        updateStatusById('consultas-status', 'Preencha os campos obrigatórios da consulta.');
        return;
    }

    if (cpf && !isValidCPF(cpf)) {
        updateStatusById('consultas-status', appMessages.consultaInvalidCpf);
        return;
    }

    if (!isValidPhoneBR(telefone)) {
        updateStatusById('consultas-status', appMessages.consultaInvalidPhone);
        return;
    }

    if (!isValidCEP(cep)) {
        updateStatusById('consultas-status', appMessages.consultaInvalidCep);
        return;
    }

    if (!isValidUF(estado)) {
        updateStatusById('consultas-status', appMessages.consultaInvalidState);
        return;
    }

    consultasRegistros.unshift({
        id: Date.now(),
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        data: data,
        hora: hora,
        especialidade: especialidade,
        unidade: unidade,
        profissional: profissional,
        observacoes: observacoes
    });

    consultasRegistros = consultasRegistros.slice(0, appConfig.maxConsultasRecords);
    persistirConsultas();
    updateStatusById('consultas-status', appMessages.consultaSaved);
    document.getElementById('form-consulta').reset();
}

function acaoConsulta(event) {
    var target = event.target;
    if (!target || !target.dataset || target.dataset.action !== 'remove-consulta') {
        return;
    }

    var id = parseInt(target.dataset.id, 10);
    consultasRegistros = consultasRegistros.filter(function (consulta) {
        return consulta.id !== id;
    });
    persistirConsultas();
    updateStatusById('consultas-status', appMessages.consultaRemoved);
}

function limparConsultas() {
    consultasRegistros = [];
    persistirConsultas();
    updateStatusById('consultas-status', appMessages.consultasCleared);
}

function renderColetaHistorico() {
    var container = document.getElementById('coleta-historico');
    if (!container) {
        return;
    }

    if (!coletaRegistros.length) {
        container.innerHTML = '<div class="health-item"><p>Nenhum registro diário encontrado.</p></div>';
        return;
    }

    var html = '';
    coletaRegistros.forEach(function (registro) {
        html += '<div class="health-item"><div><h4>' + registro.nome + ' • ' + registro.data + '</h4>' +
            '<p>Idade: ' + registro.idade + ' | Cidade: ' + (registro.cidade || '-') + '</p>' +
            '<p>Humor: ' + (registro.humor || '-') + ' | Sono: ' + (registro.sono || '-') + 'h | Água: ' + (registro.agua || '-') + ' ml</p>' +
            '<p><strong>Sintomas:</strong> ' + registro.sintomas + '</p></div></div>';
    });

    container.innerHTML = html;
}

function salvarColeta(event) {
    event.preventDefault();

    var nome = document.getElementById('coleta-nome').value.trim();
    var idade = document.getElementById('coleta-idade').value.trim();
    var cidade = document.getElementById('coleta-cidade').value.trim();
    var sono = document.getElementById('coleta-sono').value.trim();
    var humor = document.getElementById('coleta-humor').value;
    var aguaDia = document.getElementById('coleta-agua-dia').value.trim();
    var sintomas = document.getElementById('coleta-sintomas').value.trim();

    if (!nome || !idade || !sintomas) {
        updateStatusById('coleta-status', 'Preencha nome, idade e sintomas para salvar.');
        return;
    }

    var novoRegistro = {
        id: Date.now(),
        data: new Date().toLocaleString(),
        nome: nome,
        idade: idade,
        cidade: cidade,
        sono: sono,
        humor: humor,
        agua: aguaDia,
        sintomas: sintomas
    };

    coletaRegistros.unshift(novoRegistro);
    coletaRegistros = coletaRegistros.slice(0, appConfig.maxColetaRecords);
    writeStorage(STORAGE_KEYS.coleta, coletaRegistros);
    renderColetaHistorico();
    updateStatusById('coleta-status', appMessages.coletaSaved + ' Total: ' + coletaRegistros.length + '.');
    document.getElementById('form-coleta').reset();
}

function limparHistoricoColeta() {
    coletaRegistros = [];
    writeStorage(STORAGE_KEYS.coleta, coletaRegistros);
    renderColetaHistorico();
    updateStatusById('coleta-status', appMessages.coletaCleared);
}

function exportarColetaPdf() {
    if (!coletaRegistros.length) {
        alert(appMessages.coletaEmptyExport);
        return;
    }

    var rows = coletaRegistros.map(function (registro) {
        return '<tr>' +
            '<td>' + registro.data + '</td>' +
            '<td>' + registro.nome + '</td>' +
            '<td>' + registro.idade + '</td>' +
            '<td>' + (registro.humor || '-') + '</td>' +
            '<td>' + (registro.sono || '-') + '</td>' +
            '<td>' + (registro.agua || '-') + '</td>' +
            '<td>' + (registro.sintomas || '-') + '</td>' +
            '</tr>';
    }).join('');

    var printWindow = window.open('', '_blank');
    if (!printWindow) {
        updateStatusById('coleta-status', 'Permita pop-ups para exportar PDF.');
        return;
    }

    printWindow.document.write('<html><head><title>Relatório de Saúde</title><style>body{font-family:Arial,sans-serif;padding:24px;}h1{color:#2563eb;}table{width:100%;border-collapse:collapse;font-size:12px;}th,td{border:1px solid #cbd5e1;padding:6px;text-align:left;vertical-align:top;}th{background:#eff6ff;}</style></head><body><h1>Relatório de Coleta de Saúde</h1><p>Gerado em: ' + new Date().toLocaleString() + '</p><table><thead><tr><th>Data</th><th>Nome</th><th>Idade</th><th>Humor</th><th>Sono(h)</th><th>Água(ml)</th><th>Sintomas</th></tr></thead><tbody>' + rows + '</tbody></table></body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(function () {
        printWindow.print();
    }, 250);
}

function renderHidratacao() {
    var goalInput = document.getElementById('meta-agua');
    var progressBar = document.getElementById('progresso-hidratacao-bar');
    var progressText = document.getElementById('progresso-hidratacao-text');
    if (!goalInput || !progressBar || !progressText) {
        return;
    }

    goalInput.value = hidratacaoState.goal;
    var percent = Math.min(100, Math.round((hidratacaoState.consumed / hidratacaoState.goal) * 100));
    progressBar.style.width = percent + '%';
    progressText.textContent = hidratacaoState.consumed + ' ml de ' + hidratacaoState.goal + ' ml (' + percent + '%)';
}

function registrarHidratacao(event) {
    event.preventDefault();
    var goalValue = parseInt(document.getElementById('meta-agua').value, 10);
    var consumedValue = parseInt(document.getElementById('agua').value, 10);

    if (!isNaN(goalValue) && goalValue > 0) {
        hidratacaoState.goal = goalValue;
    }
    if (!isNaN(consumedValue) && consumedValue > 0) {
        hidratacaoState.consumed += consumedValue;
    }

    hidratacaoState.date = getTodayISO();
    writeStorage(STORAGE_KEYS.hidratacao, hidratacaoState);
    renderHidratacao();
    updateStatusById('progresso-hidratacao-text', document.getElementById('progresso-hidratacao-text').textContent + ' • ' + appMessages.hidratacaoUpdated);
    document.getElementById('agua').value = '';
}

function resetarHidratacao() {
    hidratacaoState = {
        date: getTodayISO(),
        goal: parseInt(document.getElementById('meta-agua').value, 10) || appConfig.defaultHydrationGoalMl,
        consumed: 0
    };
    writeStorage(STORAGE_KEYS.hidratacao, hidratacaoState);
    renderHidratacao();
    updateStatusById('progresso-hidratacao-text', document.getElementById('progresso-hidratacao-text').textContent + ' • ' + appMessages.hidratacaoReset);
}

function renderMedicamentos() {
    var container = document.getElementById('medicamentos-lista');
    if (!container) {
        return;
    }

    if (!medicamentosRegistros.length) {
        container.innerHTML = '<div class="health-item"><p>Nenhum medicamento cadastrado.</p></div>';
        return;
    }

    var html = '';
    medicamentosRegistros.forEach(function (item) {
        var status = item.tomado ? '✅ Tomado' : '⏰ Pendente';
        html += '<div class="health-item"><div><h4>' + item.nome + ' • ' + item.horario + '</h4><p>Status: ' + status + '</p></div>' +
            '<div class="health-item-actions">' +
            '<button class="mini-btn secondary" data-action="toggle" data-id="' + item.id + '">Tomado</button>' +
            '<button class="mini-btn danger" data-action="remove" data-id="' + item.id + '">Excluir</button>' +
            '</div></div>';
    });

    container.innerHTML = html;
}

function salvarMedicamentos() {
    writeStorage(STORAGE_KEYS.medicamentos, medicamentosRegistros);
    renderMedicamentos();
    updateStatusById('medicamentos-status', 'Total: ' + medicamentosRegistros.length + ' medicamento(s).');
}

function adicionarMedicamento(event) {
    event.preventDefault();
    var nome = document.getElementById('medicamento-nome').value.trim();
    var horario = document.getElementById('medicamento-horario').value;
    if (!nome || !horario) {
        updateStatusById('medicamentos-status', 'Informe nome e horário para adicionar.');
        return;
    }

    medicamentosRegistros.push({
        id: Date.now(),
        nome: nome,
        horario: horario,
        tomado: false
    });
    salvarMedicamentos();
    updateStatusById('medicamentos-status', appMessages.medicineAdded);
    document.getElementById('form-medicamento').reset();
}

function acaoMedicamento(event) {
    var target = event.target;
    if (!target || !target.dataset || !target.dataset.action) {
        return;
    }

    var id = parseInt(target.dataset.id, 10);
    if (target.dataset.action === 'toggle') {
        medicamentosRegistros = medicamentosRegistros.map(function (item) {
            if (item.id === id) {
                item.tomado = !item.tomado;
                updateStatusById('medicamentos-status', item.tomado ? appMessages.medicamentoTaken : appMessages.medicamentoUntaken);
            }
            return item;
        });
        salvarMedicamentos();
        return;
    }

    if (target.dataset.action === 'remove') {
        medicamentosRegistros = medicamentosRegistros.filter(function (item) {
            return item.id !== id;
        });
        salvarMedicamentos();
        updateStatusById('medicamentos-status', appMessages.medicamentoRemoved);
    }
}

function limparMedicamentos() {
    medicamentosRegistros = [];
    salvarMedicamentos();
    updateStatusById('medicamentos-status', appMessages.medicamentosCleared);
}

function setupLinksMenu() {
    var menu = document.querySelector('.links-menu');
    if (!menu) {
        return;
    }

    var groups = Array.prototype.slice.call(menu.querySelectorAll('.links-menu-group'));

    groups.forEach(function (group) {
        group.addEventListener('toggle', function () {
            if (!group.open) {
                return;
            }
            groups.forEach(function (otherGroup) {
                if (otherGroup !== group) {
                    otherGroup.open = false;
                }
            });
        });
    });

    document.addEventListener('click', function (event) {
        if (menu.contains(event.target)) {
            return;
        }
        groups.forEach(function (group) {
            group.open = false;
        });
    });
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function () {
    var cpfInput = document.getElementById('consulta-cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function () {
            cpfInput.value = formatCPF(cpfInput.value);
        });
    }

    var telefoneInput = document.getElementById('consulta-telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function () {
            telefoneInput.value = formatPhoneBR(telefoneInput.value);
        });
    }

    var cepInput = document.getElementById('consulta-cep');
    if (cepInput) {
        cepInput.addEventListener('input', function () {
            cepInput.value = formatCEP(cepInput.value);
        });
    }

    var estadoInput = document.getElementById('estado');
    if (estadoInput) {
        estadoInput.addEventListener('input', function () {
            estadoInput.value = estadoInput.value.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 2);
        });
    }

    // Busca posto de saúde
    var buscaForm = document.getElementById('form-busca');
    if (buscaForm) {
        buscaForm.onsubmit = function (e) {
            e.preventDefault();
            var local = document.getElementById('busca-local').value.trim();
            var erro = document.getElementById('busca-erro');
            erro.textContent = '';
            if (!local || local.length < 2) {
                erro.textContent = appMessages.searchInvalid;
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
                erro.textContent = appMessages.imcInvalid;
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
    bindClickById('btn-atualizar-noticias', atualizarNoticias);
    bindClickById('btn-auto-update', toggleAutoUpdateNoticias);

    // Botões de dicas
    bindClickById('btn-atualizar-dicas', adicionarNovaDica);
    bindClickById('btn-dica-aleatoria', dicaAleatoria);

    // Consultas
    var formConsulta = document.getElementById('form-consulta');
    if (formConsulta) {
        formConsulta.addEventListener('submit', salvarConsulta);
    }
    var consultasLista = document.getElementById('consultas-lista');
    if (consultasLista) {
        consultasLista.addEventListener('click', acaoConsulta);
    }
    bindClickById('btn-limpar-consultas', limparConsultas);
    renderConsultasLista();

    // Diário de coleta e exportação PDF
    var formColeta = document.getElementById('form-coleta');
    if (formColeta) {
        formColeta.addEventListener('submit', salvarColeta);
    }
    bindClickById('btn-limpar-coleta', limparHistoricoColeta);
    bindClickById('btn-exportar-pdf', exportarColetaPdf);
    renderColetaHistorico();

    // Hidratação
    var formHidratacao = document.getElementById('form-hidratacao');
    if (formHidratacao) {
        formHidratacao.addEventListener('submit', registrarHidratacao);
    }
    bindClickById('btn-reset-hidratacao', resetarHidratacao);
    renderHidratacao();

    // Medicamentos
    var formMedicamento = document.getElementById('form-medicamento');
    if (formMedicamento) {
        formMedicamento.addEventListener('submit', adicionarMedicamento);
    }
    var medicamentosLista = document.getElementById('medicamentos-lista');
    if (medicamentosLista) {
        medicamentosLista.addEventListener('click', acaoMedicamento);
    }
    bindClickById('btn-limpar-medicamentos', limparMedicamentos);
    renderMedicamentos();

    // Links úteis em modo menu (fecha ao clicar fora)
    setupLinksMenu();
});
