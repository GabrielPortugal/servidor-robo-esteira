# SERVIDOR Controle Remoto p/ Robô Esteira

Servidor com protocolo MQTT para realizar a comunicação do Hardware com o Software 

## 🤖 Projetos complementares
[Controle Remoto](https://github.com/GabrielPortugal/controle-remoto-robo-esteira)

## 🚀 Tecnologias
- [NodeJS](https://nodejs.org/en/)
- [Protocolo MQTT](https://mqtt.org/)

## 💻 Instalar e Rodar

```
npm install
npm start

```
## ⚙️ Configurações
- Modificar o arquivo "index.js" para o seu servidor MQTT
- Modificar TOPICO_ESCUTA_MUDAR, no arquivo index.js, para o tópico que deseja que o servidor fique escutando
- Modificar TOPICO_ENVIA_MUDAR, no arquivo modules/sistema/index.js, para o tópico que deseja que o servidor envie mensagem

## ℹ️ Informações
- Programação muito simples. 
- Sem validação de autenticação
- O arquivo Profcile serve  de configuração para hospedar o sistema no [Heroku](https://www.heroku.com/)

### Criado por
Gabriel Portugal, 12/2020

### Contato
gabrielpguadelupe@gmail.com