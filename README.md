# Dashboard Excel - Central de Manifesto

Dashboard completo com integração Excel para monitoramento de atendimentos em tempo real.

## 🚀 Características

- **Integração Excel**: Carregue dados diretamente de planilhas Excel (.xlsx, .xls)
- **Tempo Real**: Atualização automática dos dados a cada minuto
- **Responsivo**: Interface adaptável para diferentes tamanhos de tela
- **GitHub Ready**: Pronto para deploy no GitHub Pages ou Vercel

## 📊 Funcionalidades

### Dashboard Principal
- Métricas de atendimento em tempo real
- Gráficos interativos por hora
- Ranking de performance dos atendentes
- Status da equipe online
- Alertas do sistema
- Análise de clientes

### Integração Excel
- Upload de planilhas Excel
- Processamento automático dos dados
- Estrutura flexível de abas
- Fallback para dados de demonstração

## 🛠️ Instalação

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/seu-usuario/dashboard-excel-github.git
cd dashboard-excel-github
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Execute o projeto:
\`\`\`bash
npm run dev
\`\`\`

4. Acesse: `http://localhost:3000`

## 📋 Estrutura da Planilha Excel

Para que o dashboard funcione corretamente, sua planilha Excel deve conter as seguintes abas:

### Aba "Atendentes"
| Nome | Atendimentos | TempoMedio | Status | Satisfacao | Eficiencia |
|------|-------------|------------|---------|------------|------------|
| João Silva | 45 | 8m 30s | online | 5 | 92 |

### Aba "Estatisticas"
| TotalAtendimentos | ChamadosFinalizados | ChamadosEmAtendimento | TaxaResolucao | FilaEspera | TempoMedioEspera |
|-------------------|--------------------|-----------------------|---------------|------------|------------------|
| 322 | 298 | 18 | 92.5 | 6 | 2m 15s |

### Aba "GraficoHora"
| Hora | Atendimentos |
|------|-------------|
| 08:00 | 15 |
| 09:00 | 28 |

### Aba "Clientes"
| Cliente | Atendimentos | Porcentagem |
|---------|-------------|-------------|
| Spal Transportes | 95 | 75 |

### Aba "Alertas"
| Tipo | Mensagem |
|------|----------|
| success | Sistema funcionando normalmente |
| warning | Fila de espera acima da média |

## 🚀 Deploy

### GitHub Pages
1. Faça push do código para seu repositório GitHub
2. Vá em Settings > Pages
3. Selecione a branch main
4. Seu dashboard estará disponível em: `https://seu-usuario.github.io/dashboard-excel-github`

### Vercel
1. Conecte seu repositório GitHub ao Vercel
2. Deploy automático a cada push
3. URL personalizada disponível

## 🎨 Personalização

- **Cores**: Modifique as classes Tailwind nos componentes
- **Métricas**: Adicione novas métricas no arquivo `types/dashboard.ts`
- **Gráficos**: Customize os gráficos no componente Dashboard
- **Alertas**: Configure novos tipos de alerta

## 📱 Responsividade

O dashboard é totalmente responsivo e funciona em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔧 Tecnologias

- **Next.js 14**: Framework React
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **Lucide React**: Ícones
- **XLSX**: Processamento de planilhas Excel

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, abra uma issue no GitHub.
