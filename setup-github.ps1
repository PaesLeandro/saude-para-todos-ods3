# Script para configurar e enviar o projeto para o GitHub
# Execute este script no PowerShell dentro da pasta do projeto

Write-Host "🚀 Configurando repositório Git local..." -ForegroundColor Green

# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "🎉 Primeira versão: Plataforma Saúde para Todos - ODS 3

✨ Funcionalidades incluídas:
- Calculadora de IMC
- Busca de postos de saúde
- Sistema de notícias dinâmicas
- Dicas de saúde interativas
- Links úteis para órgãos de saúde
- Interface responsiva e moderna
- Navegação SPA (Single Page Application)

🎯 Objetivos do ODS 3:
- Acesso universal à saúde
- Promoção de bem-estar
- Prevenção de doenças
- Redução de desigualdades"

Write-Host "✅ Repositório local configurado!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host "1. Criar repositório no GitHub (https://github.com/new)" -ForegroundColor White
Write-Host "2. Copiar a URL do repositório criado" -ForegroundColor White
Write-Host "3. Executar os comandos abaixo (substitua 'SEU-USUARIO' e 'NOME-DO-REPO'):" -ForegroundColor White
Write-Host ""
Write-Host "git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git" -ForegroundColor Cyan
Write-Host "git branch -M main" -ForegroundColor Cyan
Write-Host "git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Após o push, ative o GitHub Pages nas configurações do repositório!" -ForegroundColor Green
