# 📊 Dashboard Excel - Sistema de Monitoramento em Tempo Real

**Dashboard profissional com integração Excel para monitoramento de atendimentos e performance da equipe.**

🔗 **[ACESSE O DASHBOARD AO VIVO](https://seu-usuario.github.io/dashboard-excel-github)**

![Dashboard Preview](https://via.placeholder.com/800x400/1e293b/64748b?text=Dashboard+Excel+Preview)

## ⚡ Funcionalidades Principais

### 🎯 **Dashboard em Tempo Real**
- **Métricas Instantâneas**: Total de atendimentos, fila de espera, taxa de resolução
- **Performance da Equipe**: Ranking de atendentes com eficiência e satisfação
- **Gráficos Interativos**: Visualização por hora dos atendimentos
- **Status Online**: Monitoramento em tempo real da equipe
- **Sistema de Alertas**: Notificações automáticas de status

### 📈 **Análise de Dados**
- **Clientes Top**: Ranking dos principais clientes por volume
- **Estatísticas Avançadas**: Tempo médio, taxa de resolução, pendências
- **Histórico por Hora**: Gráfico de barras com picos de atendimento
- **Indicadores Visuais**: Status coloridos para fácil identificação

### 📊 **Integração Excel**
- **Upload Direto**: Arraste e solte sua planilha Excel
- **Processamento Automático**: Leitura de 5 abas diferentes
- **Dados Dinâmicos**: Atualização automática a cada minuto
- **Modo Demonstração**: Funciona sem planilha com dados simulados

## 🚀 Como Usar

### 1. **Acesso Imediato**
\`\`\`
https://seu-usuario.github.io/dashboard-excel-github
\`\`\`
O dashboard já funciona com dados de demonstração!

### 2. **Upload de Planilha Excel**
1. Clique no botão "Excel" no canto superior direito
2. Arraste sua planilha Excel ou clique para selecionar
3. Os dados serão processados automaticamente
4. Dashboard atualizado em tempo real

### 3. **Estrutura da Planilha**
Sua planilha deve ter estas 5 abas:

**📋 Aba "Atendentes"**
\`\`\`
Nome | Atendimentos | TempoMedio | Status | Satisfacao | Eficiencia
João Silva | 45 | 8m 30s | online | 5 | 92
\`\`\`

**📊 Aba "Estatisticas"**
\`\`\`
TotalAtendimentos | ChamadosFinalizados | FilaEspera | TaxaResolucao
322 | 298 | 6 | 92.5
\`\`\`

**⏰ Aba "GraficoHora"**
\`\`\`
Hora | Atendimentos
08:00 | 15
09:00 | 28
\`\`\`

**👥 Aba "Clientes"**
\`\`\`
Cliente | Atendimentos | Porcentagem
Spal Transportes | 95 | 75
\`\`\`

**🚨 Aba "Alertas"**
\`\`\`
Tipo | Mensagem
success | Sistema funcionando normalmente
warning | Fila de espera acima da média
\`\`\`

## 🛠️ Instalação Local

\`\`\`bash
# Clone o repositório
git clone https://github.com/seu-usuario/dashboard-excel-github.git
cd dashboard-excel-github

# Instale as dependências
npm install

# Execute o projeto
npm run dev

# Acesse: http://localhost:3000
\`\`\`

## 🎨 Interface do Dashboard

### **Barra de Status Superior**
- ✅ Meta diária atingida/pendente
- 📊 Status da fila (normal/acima do normal)
- 🟢 Sistema online/offline
- 📈 Contador de atualizações
- ⏱️ Tempo online do sistema

### **Métricas Principais**
- **Total de Atendimentos**: Contador em tempo real
- **Chamados Finalizados**: Com taxa de resolução
- **Fila de Espera**: Número atual + tempo médio
- **Chamados em Atendimento**: Status ativo

### **Ranking de Atendentes**
- Nome completo do atendente
- Número de atendimentos realizados
- Tempo médio por atendimento
- Nota de satisfação (1-5 estrelas)
- Status atual (online/ocupado/pausa)
- Porcentagem de eficiência

### **Gráfico por Hora**
- Visualização em barras dos atendimentos
- Horário de 08:00 às 21:00
- Identificação de picos de demanda
- Cores dinâmicas baseadas no volume

### **Top Clientes**
- Ranking dos principais clientes
- Número de atendimentos
- Porcentagem do total
- Barra de progresso visual

## 🚀 Deploy Automático

### **GitHub Pages** (Recomendado)
1. Fork este repositório
2. Vá em Settings > Pages
3. Selecione branch `main`
4. Seu dashboard estará em: `https://seu-usuario.github.io/dashboard-excel-github`

### **Vercel** (Alternativo)
1. Conecte seu GitHub ao Vercel
2. Deploy automático a cada commit
3. URL personalizada disponível

## 📱 Totalmente Responsivo

- **Desktop**: Layout completo com todas as métricas
- **Tablet**: Adaptação inteligente dos gráficos
- **Mobile**: Interface otimizada para toque

## 🔧 Tecnologias

- **Next.js 14**: Framework React moderno
- **TypeScript**: Tipagem estática completa
- **Tailwind CSS**: Estilização responsiva
- **Recharts**: Gráficos interativos
- **XLSX**: Processamento de planilhas Excel
- **Lucide React**: Ícones profissionais

## 📊 Recursos Avançados

- **Atualização Automática**: A cada 60 segundos
- **Animações Suaves**: Transições profissionais
- **Modo Escuro**: Interface moderna
- **Indicadores Visuais**: Status coloridos
- **Feedback em Tempo Real**: Loading states
- **Dados Persistentes**: Mantém dados entre sessões

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 📞 Suporte

- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/dashboard-excel-github/issues)
- 📧 **Email**: seu-email@exemplo.com
- 💬 **Discussões**: [GitHub Discussions](https://github.com/seu-usuario/dashboard-excel-github/discussions)

---

**⭐ Se este projeto foi útil, deixe uma estrela no GitHub!**
