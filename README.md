# recuperação de senha

**RF**

- O usuario deve poder recuperar sua senha informando o seu e-mail;
- O usuario deve receber um e-mail com instruçoes de recuperação de senha;
- O usuario deve resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amason SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuario precisa confirmar a nova senha ao resetar sua senha;

# Atualização de perfil

**RF**

- O usuario deve poder atualizar seu nome, email e senha;

**RNF**

**RN**

- O usuario não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuario deve informar sua senha antiga;
- Para atualizar sua senha, o usuario precisa confirmar a nova senhha;

# Painel do prestador

**RF**

- O usuario deve pooder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia deve ser armazenado em cache;
- As notificações do prestador devem ser armazendas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notifiação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviço

**RF**

- O usuario deve poder listar todos prestadores de serviço cadastrados;
- O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador;
- O usuario deve poder listar os horarios disponiveis em um dia especifico de um prestador;
- O usuario deve poder realizar um novo agendamento com umn prestador;

**RNF**

- A lsitagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h as 18h (Primeiro horariuo as 8H, ultimo as 17);
- O usuario não pode agendar em um horario já ocupado;
- O usuario não pode agendar em um horario que já passou;
- O usuario não pode agendar serviço com sigo mesmo;
