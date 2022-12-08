// Inicialização e configuração
const express = require('express');
const routes = express.Router();

// Importação dos Middlewares
const authMiddleware = require('./middlewares/auth');

//Importação dos controllers a serem utilizados
const TypeUserController = require('./controllers/params/Type_userControlleer');
const BeltController = require('./controllers/params/BeltController');
const SchoolController = require('./controllers/params/SchoolController');
const TypeNoticesController = require('./controllers/params/Type_noticeController');
const StatusUserController = require('./controllers/params/Status_userController');
const TypeFeedBackTeacher = require('./controllers/params/Type_feedback_teacherController');
const Class = require('./controllers/ClassController');
const User = require('./controllers/UserController');
const Feed = require('./controllers/FeedController');
const WeeksFeedbackTeacher = require('./controllers/WeekFeedBackTeacherController');
const Payment = require('./controllers/PaymentController');
const HistoricUser = require('./controllers/HistoricUserController');
const Challenge = require('./controllers/ChallengeController');
const Notice = require('./controllers/NoticeController');
const ResultChallenge = require('./controllers/ResultChallengeController');
const UserWeekFeedback = require('./controllers/UserWeekFeedbackController');
const Presence = require('./controllers/PresenceController');
const SessionController = require('./controllers/SessionController');


// teste
const TesteController = require('./controllers/TesteController');



// ROTAS DE TESTE API NO AR
routes.get('/', (req, res) => {
    return res.json({message: 'Api rodando!'})
})

// ###  ROTAS DE TABELAS PARAMETROS  ####  
// ######################################

// rotas do model/tabela Type_users
routes.get('/params/type_users', TypeUserController.index);
routes.post('/params/type_users', TypeUserController.store);
routes.put('/params/type_users/:type_user_id', TypeUserController.update);
routes.delete('/params/type_users/:type_user_id', TypeUserController.delete);

// rotas do model/tabela Belts
routes.get('/params/belts', BeltController.index);
routes.post('/params/belts', BeltController.store);
routes.put('/params/belts/:belt_id', BeltController.update);
routes.delete('/params/belts/:belt_id', BeltController.delete);

// rotas do model/tabela Schools
routes.get('/params/schools', SchoolController.index);
routes.post('/params/schools', SchoolController.store);
routes.put('/params/schools/:school_id', SchoolController.update);
routes.delete('/params/schools/:school_id', SchoolController.delete);

// rotas do model/tabela Type Notices
routes.get('/params/type_notices', TypeNoticesController.index);
routes.post('/params/type_notices', TypeNoticesController.store);
routes.put('/params/type_notices/:type_notice_id', TypeNoticesController.update);
routes.delete('/params/type_notices/:type_notice_id', TypeNoticesController.delete);

// rotas do model/tabela Status User
routes.get('/params/status_user', StatusUserController.index);
routes.post('/params/status_user', StatusUserController.store);
routes.put('/params/status_user/:status_user_id', StatusUserController.update);
routes.delete('/params/status_user/:status_user_id', StatusUserController.delete);

// rotas do model/tabela Feedback Teacher
routes.get('/params/type_feedback_teacher', TypeFeedBackTeacher.index);
routes.post('/params/type_feedback_teacher', TypeFeedBackTeacher.store);
routes.put('/params/type_feedback_teacher/:type_feedback_id', TypeFeedBackTeacher.update);
routes.delete('/params/type_feedback_teacher/:type_feedback_id', TypeFeedBackTeacher.delete);

// ******  FIM DAS ROTAS DE TABELAS PARAMETROS  *****  

// ##### ROTA DE LOGIN/SESSÃO E CRIAÇÃO DE USUÁRIOS ######## ATÉ AQUI SÃO ROTAS QUE NÃO PRECISAM DE TOKEN
routes.post('/sessions', SessionController.store);

routes.post('/users', User.store);

// ##### FIM DA ROTA DE LOGIN/SESSÃO E CRIAÇÃO DE USUÁRIOS ########


// ### A PARTIR DAQUI SÃO ROTAS QUE PRECISAM DE TOKEN, OU SEJA, O USUÁRIO ESTÁ LOGADO
routes.use(authMiddleware.verifySession)

// rotas do model/tabela Classes
routes.get('/classes', Class.index);
routes.post('/classes', Class.store);
routes.put('/classes/:class_id', Class.update);
routes.delete('/classes/:class_id', Class.delete);
routes.get('/:school_id/classes', Class.classesSchool);


// rotas do model/tabela Users
routes.get('/users', User.index);
routes.put('/users', User.update);
routes.delete('/users/:user_id', User.delete);
routes.get('/users/:user_id/feed', Feed.feedUser);
routes.get('/users/:user_id/payments', Payment.paymentUser);
routes.get('/users/:user_id/historic', HistoricUser.historictUser);
routes.get('/users/:user_id/challenges', Challenge.challengersUser);
routes.post('/users/:user_id/viewNotices', User.viewNotice);
routes.get('/users/:user_id/resultChampion', ResultChallenge.ResultsUser);
routes.get('/users/:user_id/classes', User.classesUser);
routes.get('/users/:user_id/weeklyfeedbackteachers', WeeksFeedbackTeacher.WeekFeedBackTeacherUser);


// rotas do model/tabela Notices
routes.get('/notices', Notice.index);
routes.post('/notices', Notice.store);
routes.put('/notices/:notice_id', Notice.update);
routes.delete('/notices/:notice_id', Notice.delete);


// rotas do model/tabela WeekFeedbackTeachers
routes.get('/weeklyfeedbackteachers', WeeksFeedbackTeacher.index);
routes.post('/weeklyfeedbackteachers', WeeksFeedbackTeacher.store);
routes.put('/weeklyfeedbackteachers/:week_feedback_id', WeeksFeedbackTeacher.update);
routes.delete('/weeklyfeedbackteachers/:week_feedback_id', WeeksFeedbackTeacher.delete);


// rotas do model/tabela Payments
routes.get('/payments', Payment.index);
routes.post('/payments', Payment.store);
routes.put('/payments/:payment_id', Payment.update);
routes.delete('/payments/:payment_id', Payment.delete);

// rotas do model/tabela HistoricUsers
routes.get('/historic_users', HistoricUser.index);
routes.post('/historic_users', HistoricUser.store);
routes.put('/historic_users/:historic_id', HistoricUser.update);
routes.delete('/historic_users/:historic_id', HistoricUser.delete);

// rotas do model/tabela Challenges
routes.get('/challenges', Challenge.index);
routes.post('/challenges', Challenge.store);
routes.put('/challenges/:challenge_id', Challenge.update);
routes.delete('/challenges/:challenge_id', Challenge.delete);

// rotas do model/tabela Results Challenges
routes.get('/restulsChallenges', ResultChallenge.index);
routes.post('/resultChallenges', ResultChallenge.store);
routes.put('/resultChallenges/:result_challenge_id', ResultChallenge.update);
routes.delete('/resultChallenges/:result_challenge_id', ResultChallenge.delete);

// rotas do model/tabela UserWeekFeedback
routes.get('/userWeeksFeedback', UserWeekFeedback.userWeeklyFeedback);
routes.post('/userWeeksFeedback/:week_feedback_id', UserWeekFeedback.store);
routes.put('/userWeeksFeedback/:userWeeekFeedbac_Id', UserWeekFeedback.update);
routes.delete('/userWeeksFeedback/:userWeeekFeedbac_Id', UserWeekFeedback.delete);

// rotas do model/tabela Feed
routes.get('/feed', Feed.index);
routes.post('/feed', Feed.store);
routes.put('/feed/:feed_id', Feed.update);
routes.delete('/feed/:feed_id', Feed.delete);

// rotas do model/tabela Presences
routes.post('/presences/:class_id', Presence.store);



// ############## TESTES ####################
routes.get('/:user_id/teste', TesteController.index)
//routes.post('/:user_id/testeNotice', Notice.teste)

// ################ FIM TESTE #################



module.exports = routes;