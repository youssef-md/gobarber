## Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha

**RNF**

- Utilizar mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano(background job);

**RN**

- O link enviado por email para resetar senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

## Atualização de perfil

**RF**

- O usuário deve poder atualizar seu perfil(nome, email e senha);

**RN**

- O usuário nao pode alterar para um email já utilizado por outro usuário;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário deve confirmar sua senha;

## Painel do prestador

**RF**

- O prestador deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache(invalidar sempre que houver um novo agendamento do usuário);
- As notificações devem ser armazenadas no MongoDB;
- As notificações devem ser enviadas em tempo real utilizando socket.io

**RN**

- A notificação deve ter um status de lida e não lida para que o prestador possa controlar;

## Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços;
- O usuário deve poder visualizar os dias de um mês com os horários disponíveis de um prestador específico;
- O usuário deve poder realizar um agendamento com um pretador;

**RNF**

- Listagem de prestadores devem ser armazenadas em cache(invalidar sempre que um novo prestador de serviço ser cadastrado);

**RN**

- Cada agendamento deve durar 1h;
- Os agendamentos devem estar disponíveis entre 8h às 17h;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário passado;
- O usuário não pode agendar serviços com você mesmo;
