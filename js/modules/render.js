window.APP_RENDER = {
    renderNewsCardsHtml: function (noticias) {
        var html = '';

        noticias.forEach(function (noticia) {
            html += '<div class="tip-card news-item new"><h4>' + noticia.titulo + '</h4><p>' + noticia.descricao + '</p><small class="news-meta">' + noticia.tempo + ' • ' + noticia.fonte + '</small></div>';
        });

        return html;
    },
    renderTipsCardsHtml: function (dicas) {
        var html = '';

        dicas.forEach(function (dica) {
            html += '<div class="tip-card dica-item"><h4>' + dica.titulo + '</h4><p>' + dica.dica + '</p></div>';
        });

        return html;
    }
};
